#!/usr/bin/env python
"""Comprueba que cada ejercicio de modulos/*/ejercicios.yml es coherente:

  1. La solución de referencia (`solucion`) supera TODOS los tests.
  2. El código inicial (`inicial`) NO los supera todos (si no, el ejercicio no enseña nada).

Usa el MISMO arnés que el navegador (web/public/ejercicios/harness.py), con el
Python local. Para probarlo con el Pyodide real, ver web/README.md.

Uso:  .venv/bin/python web/scripts/verificar_ejercicios.py [CARPETA ...]
Sale con código 1 si algo falla.
"""
import importlib.util
import sys as _s
_s.dont_write_bytecode = True
import json
import sys
import time
from pathlib import Path

import yaml

RAIZ = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("harness", RAIZ / "web" / "public" / "ejercicios" / "harness.py")
harness = importlib.util.module_from_spec(spec)
spec.loader.exec_module(harness)


def solucion_de(ej):
    """Con «pasos», la solución es la unión de los fragmentos que copia el estudiante."""
    if "pasos" in ej:
        return "\n".join(p["codigo"].rstrip() for p in ej["pasos"])
    return ej["solucion"]


def correr(codigo, ej):
    datos = {"tipo": ej.get("tipo", "python"), "setup": ej.get("setup"), "tests": ej["tests"]}
    return json.loads(harness.ejecutar(codigo, json.dumps(datos)))


def main(filtro):
    errores = 0
    total = 0
    for yml in sorted((RAIZ / "modulos").glob("*/ejercicios.yml")):
        carpeta = yml.parent.name
        if filtro and carpeta not in filtro:
            continue
        doc = yaml.safe_load(yml.read_text(encoding="utf8"))
        ids = set()
        for ej in doc["ejercicios"]:
            if ej.get("tipo") == "javascript":
                continue  # los corrige scripts/verificar_ejercicios_js.mjs
            total += 1
            if ej["id"] in ids:
                print(f"FALLO {carpeta}/{ej['id']}: id repetido"); errores += 1
            ids.add(ej["id"])
            t0 = time.time()
            r = correr(solucion_de(ej), ej)
            dt = time.time() - t0
            ok = r["error"] is None and r["resultados"] and all(x[0] for x in r["resultados"])
            if ok:
                print(f"OK    {carpeta}/{ej['id']}  ({len(r['resultados'])} tests, {dt:.1f}s)")
            else:
                errores += 1
                print(f"FALLO {carpeta}/{ej['id']}: la solución de referencia no pasa")
                if r["error"]:
                    print("      error:", r["error"])
                for good, txt in r["resultados"]:
                    if not good:
                        print("      ✗", txt)
            ri = correr(ej.get("inicial", ""), ej)
            if ri["error"] is None and ri["resultados"] and all(x[0] for x in ri["resultados"]):
                errores += 1
                print(f"FALLO {carpeta}/{ej['id']}: el código inicial ya supera todos los tests")
    print(f"\n{total} ejercicios, {errores} problemas")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main(set(sys.argv[1:])))
