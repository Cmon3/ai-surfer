#!/usr/bin/env bash
# Comprueba que el mismo programa da EXACTAMENTE la misma salida en los cuatro lenguajes.
# Uso:  ./verificar.sh                 # los cuatro (necesita python3, node, javac y g++)
#       ./verificar.sh python node     # solo los indicados: python, node, java, cpp
set -euo pipefail
cd "$(dirname "$0")"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
fallos=0

comprobar() {  # nombre, comando...
  local nombre="$1"; shift
  if "$@" > "$TMP/salida.txt" 2>&1 && diff -u salida-esperada.txt "$TMP/salida.txt"; then
    echo "OK    $nombre"
  else
    echo "FALLO $nombre"; cat "$TMP/salida.txt"; fallos=$((fallos + 1))
  fi
}

for lenguaje in "${@:-python node java cpp}"; do
  for l in $lenguaje; do
    case "$l" in
      python) comprobar Python python3 ventas.py ;;
      node)   comprobar JavaScript node ventas.js ;;
      java)   javac -d "$TMP" Ventas.java && comprobar Java java -cp "$TMP" Ventas ;;
      cpp)    g++ -std=c++17 -Wall -o "$TMP/ventas" ventas.cpp && comprobar "C++" "$TMP/ventas" ;;
      *)      echo "Lenguaje desconocido: $l"; exit 2 ;;
    esac
  done
done
exit "$fallos"
