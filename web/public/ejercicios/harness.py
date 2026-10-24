"""Arnés de corrección de ejercicios.

Lo carga el Web Worker del navegador (Pyodide) y también el script de
verificación del repositorio (`scripts/verificar_ejercicios.py`), de modo que
el código que corrige a los alumnos es EXACTAMENTE el que se prueba en CI.

Entrada : `ejecutar(codigo, ejercicio_json)`.
Salida  : cadena JSON {"resultados": [[ok, texto], ...], "salida": str, "error": str|None}.

Definición de un ejercicio (campos usados aquí):
  tipo   "python" (por defecto) | "sql"
  setup  código Python oculto que se ejecuta antes (datos, `con` para SQL...)
  tests  lista de pruebas, cada una con UNA de estas formas:
           {expr, esperado, tol?, nombre?, oculto?}   eval(expr) == literal_eval(esperado)
           {asserts, nombre?, oculto?}                bloque Python con `assert`
"""
import ast
import contextlib
import io
import json
import traceback

LIMITE_SALIDA = 4000
LIMITE_REPR = 240


def _corto(texto, limite=LIMITE_REPR):
    texto = str(texto)
    return texto if len(texto) <= limite else texto[: limite - 1] + "…"


def _normaliza(x):
    """Convierte arrays/series/escalares de numpy y tuplas en tipos de Python comparables."""
    if hasattr(x, "tolist") and not isinstance(x, (str, bytes)):
        try:
            return _normaliza(x.tolist())
        except Exception:
            return x
    if isinstance(x, (list, tuple)):
        return [_normaliza(v) for v in x]
    if isinstance(x, dict):
        return {k: _normaliza(v) for k, v in x.items()}
    return x


def _igual(got, esperado, tol=None):
    got, esperado = _normaliza(got), _normaliza(esperado)
    return _igual_n(got, esperado, tol)


def _igual_n(a, b, tol):
    if isinstance(b, bool) or isinstance(a, bool):
        return a is b or (a == b and type(a) == type(b))
    if isinstance(b, (int, float)) and isinstance(a, (int, float)):
        if tol is not None:
            return abs(a - b) <= tol
        return a == b
    if isinstance(b, list):
        return (
            isinstance(a, list)
            and len(a) == len(b)
            and all(_igual_n(x, y, tol) for x, y in zip(a, b))
        )
    if isinstance(b, dict):
        return (
            isinstance(a, dict)
            and a.keys() == b.keys()
            and all(_igual_n(a[k], b[k], tol) for k in b)
        )
    return a == b


def _linea_error(exc):
    """Número de línea dentro del código del alumno, si se puede saber."""
    if isinstance(exc, SyntaxError) and exc.filename == "<tu_codigo>":
        return exc.lineno
    for fr in reversed(traceback.extract_tb(exc.__traceback__)):
        if fr.filename == "<tu_codigo>":
            return fr.lineno
    return None


def _describe(exc):
    linea = _linea_error(exc)
    base = f"{type(exc).__name__}: {exc}"
    return base + (f" (línea {linea} de tu código)" if linea else "")


def ejecutar(codigo, ejercicio_json):
    ej = json.loads(ejercicio_json)
    tipo = ej.get("tipo", "python")
    ns = {"__name__": "__main__"}
    salida = io.StringIO()
    resultados = []
    error = None

    with contextlib.redirect_stdout(salida), contextlib.redirect_stderr(salida):
        # 1) Preparado oculto (datos, conexión SQL...)
        try:
            if ej.get("setup"):
                exec(compile(ej["setup"], "<setup>", "exec"), ns)
        except BaseException as exc:  # error nuestro, no del alumno
            return json.dumps(
                {"resultados": [], "salida": "", "error": "Fallo interno al preparar el ejercicio: " + _describe(exc)},
                ensure_ascii=False,
            )

        # 2) Código del alumno
        try:
            if tipo == "sql":
                cur = ns["con"].execute(codigo)
                ns["columnas"] = [d[0] for d in (cur.description or [])]
                ns["filas"] = cur.fetchall()
            else:
                exec(compile(codigo, "<tu_codigo>", "exec"), ns)
        except BaseException as exc:
            error = _describe(exc)

        # 3) Pruebas (solo si el código se ejecutó)
        if error is None:
            for i, t in enumerate(ej.get("tests", []), 1):
                oculto = bool(t.get("oculto"))
                nombre = t.get("nombre") or ("Prueba oculta %d" % i if oculto else None)
                try:
                    if "asserts" in t:
                        etiqueta = nombre or _corto(t["asserts"].strip().splitlines()[0], 100)
                        try:
                            exec(compile(t["asserts"], "<test>", "exec"), ns)
                            resultados.append([True, etiqueta])
                        except AssertionError as exc:
                            detalle = str(exc)
                            resultados.append([False, etiqueta + (("  ->  " + _corto(detalle)) if detalle else "")])
                    else:
                        etiqueta = nombre or t["expr"]
                        got = eval(t["expr"], ns)
                        esp = ast.literal_eval(t["esperado"])
                        ok = _igual(got, esp, t.get("tol"))
                        if ok:
                            resultados.append([True, etiqueta])
                        elif oculto:
                            resultados.append([False, etiqueta + "  ->  resultado incorrecto"])
                        else:
                            resultados.append(
                                [False, f"{_corto(etiqueta)}\n      obtenido: {_corto(repr(got))}\n      esperado: {_corto(t['esperado'])}"]
                            )
                except BaseException as exc:
                    etiqueta = nombre or t.get("expr") or "prueba"
                    resultados.append([False, f"{_corto(etiqueta)}  ->  error: {type(exc).__name__}: {_corto(exc)}"])

    texto = salida.getvalue()
    if len(texto) > LIMITE_SALIDA:
        texto = texto[:LIMITE_SALIDA] + "\n… (salida recortada)"
    return json.dumps({"resultados": resultados, "salida": texto, "error": error}, ensure_ascii=False)
