// Ejecuta las soluciones de referencia de modulos/*/ejercicios.yml con el Pyodide REAL
// (el mismo que usa la web), no solo con el Python local. Detecta diferencias de versión
// de numpy/pandas/scikit-learn entre tu .venv y el navegador del alumno.
//
// Uso:  cd web && npm run verificar:pyodide [-- CARPETA ...]
// Descarga paquetes de cdn.jsdelivr.net la primera vez (necesita red).
import { loadPyodide, version } from "pyodide";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RAIZ = resolve(WEB, "..");
const configurada = readFileSync(`${WEB}/src/config.ts`, "utf8").match(/PYODIDE_VERSION = "([^"]+)"/)?.[1];
if (configurada !== version) {
  console.error(`La versión de Pyodide de config.ts (${configurada}) no coincide con la instalada para verificar (${version}). Actualiza el devDependency "pyodide".`);
  process.exit(1);
}

const filtro = new Set(process.argv.slice(2));
const py = await loadPyodide();
py.runPython(readFileSync(`${WEB}/public/ejercicios/harness.py`, "utf8"));
const ejecutar = py.globals.get("ejecutar");
let malos = 0, total = 0;
for (const d of readdirSync(`${RAIZ}/modulos`).sort()) {
  const f = `${RAIZ}/modulos/${d}/ejercicios.yml`;
  if (!existsSync(f) || (filtro.size && !filtro.has(d))) continue;
  const doc = parse(readFileSync(f, "utf8"));
  for (const ej of doc.ejercicios) {
    total++;
    // Igual que la web (src/data/ejercicios.ts): los ejercicios SQL necesitan el paquete sqlite3.
    await py.loadPackage([...(ej.paquetes ?? []), ...(ej.tipo === "sql" ? ["sqlite3"] : [])]);
    const r = JSON.parse(ejecutar(ej.solucion, JSON.stringify({ tipo: ej.tipo ?? "python", setup: ej.setup, tests: ej.tests })));
    const ok = !r.error && r.resultados.length && r.resultados.every((x) => x[0]);
    if (ok) console.log(`OK    ${d}/${ej.id} (${r.resultados.length} tests)`);
    else {
      malos++;
      console.log(`FALLO ${d}/${ej.id}`, r.error ?? "");
      for (const [bien, txt] of r.resultados) if (!bien) console.log("      ✗", txt);
    }
  }
}
console.log(`\n${total} ejercicios, ${malos} fallos (Pyodide ${version})`);
process.exit(malos ? 1 : 0);
