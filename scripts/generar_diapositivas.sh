#!/usr/bin/env bash
# Convierte las diapositivas (Markdown en formato Marp) de cada módulo a PDF.
#
# Requisitos: Node.js 18+ y Google Chrome o Chromium.
# Uso:
#   scripts/generar_diapositivas.sh            # todos los módulos
#   scripts/generar_diapositivas.sh I2 I3      # solo los módulos indicados (por código: F1, I2, DS4...)
#   FORMATO=pptx scripts/generar_diapositivas.sh   # PowerPoint (cada diapositiva como imagen)
#
# Si Chrome no está en una ruta estándar, indícalo con CHROME_PATH=/ruta/a/chrome.
set -euo pipefail

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
FORMATO="${FORMATO:-pdf}"
MARP="npx -y @marp-team/marp-cli@4.1.2"

if [ "$#" -eq 0 ]; then
  carpetas=("$RAIZ"/modulos/*/)
else
  carpetas=()
  for n in "$@"; do carpetas+=("$RAIZ"/modulos/"$n"-*/); done
fi

for carpeta in "${carpetas[@]}"; do
  origen="${carpeta%/}/diapositivas.md"
  [ -f "$origen" ] || { echo "Sin diapositivas: $carpeta"; continue; }
  destino="${carpeta%/}/diapositivas.$FORMATO"
  echo "→ $(basename "$carpeta")"
  $MARP "$origen" "--$FORMATO" --allow-local-files -o "$destino"
done
