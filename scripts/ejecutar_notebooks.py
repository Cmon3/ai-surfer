"""Ejecuta los notebooks de los módulos (prácticas y soluciones) y comprueba que no fallan.

Uso:
    python scripts/ejecutar_notebooks.py          # todos los módulos
    python scripts/ejecutar_notebooks.py I2 I3    # solo los módulos indicados (por código: F1, I2, DS4...)

Los notebooks se ejecutan en memoria: los archivos del repositorio no se modifican.
Se ejecutan con el mismo intérprete que lanza este script (el de tu .venv), aunque tengas
otro kernel "python3" registrado en el sistema.
"""

import json
import os
import sys
import tempfile
import time
from pathlib import Path

import nbformat
from nbconvert.preprocessors import CellExecutionError, ExecutePreprocessor

RAIZ = Path(__file__).resolve().parents[1]
KERNEL = "curso-ai-surfer"


def registrar_kernel_temporal():
    """Crea un kernelspec que apunta a sys.executable y lo antepone en JUPYTER_PATH,
    que tiene prioridad sobre los kernels de usuario y del sistema."""
    carpeta = Path(tempfile.mkdtemp()) / "kernels" / KERNEL
    carpeta.mkdir(parents=True)
    (carpeta / "kernel.json").write_text(json.dumps({
        "argv": [sys.executable, "-m", "ipykernel_launcher", "-f", "{connection_file}"],
        "display_name": "Python (curso)",
        "language": "python",
    }))
    os.environ["JUPYTER_PATH"] = os.pathsep.join(filter(None, [str(carpeta.parents[1]), os.environ.get("JUPYTER_PATH")]))


def main(filtros):
    notebooks = sorted((RAIZ / "modulos").glob("*/*.ipynb"))
    if filtros:
        notebooks = [nb for nb in notebooks if nb.parent.name.split("-")[0] in filtros]
    if not notebooks:
        sys.exit("No se encontraron notebooks para: " + " ".join(filtros))

    registrar_kernel_temporal()
    print(f"Intérprete: {sys.executable} (Python {sys.version.split()[0]})")
    fallos = []
    for ruta in notebooks:
        inicio = time.time()
        nb = nbformat.read(ruta, as_version=4)
        ejecutor = ExecutePreprocessor(timeout=900, kernel_name=KERNEL)
        try:
            ejecutor.preprocess(nb, {"metadata": {"path": str(ruta.parent)}})
            print(f"OK     {ruta.parent.name + '/' + ruta.name:55s} {time.time() - inicio:6.1f} s")
        except CellExecutionError as error:
            print(f"FALLO  {ruta.parent.name}/{ruta.name}")
            fallos.append((ruta, error))

    for ruta, error in fallos:
        print(f"\n--- {ruta.relative_to(RAIZ)} ---\n{str(error)[-2000:]}")
    sys.exit(1 if fallos else 0)


if __name__ == "__main__":
    main(sys.argv[1:])
