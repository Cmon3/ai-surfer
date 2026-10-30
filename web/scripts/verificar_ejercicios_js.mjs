// Comprueba los ejercicios de JavaScript de modulos/*/ejercicios.yml con el MISMO arnés que el
// navegador (public/ejercicios/harness.js): la solución pasa todos los tests y el código
// inicial no. Un fallo de sintaxis también cuenta como «no pasa».
//
// Uso:  cd web && npm run verificar:js
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RAIZ = resolve(WEB, "..");
await import(`${WEB}/public/ejercicios/harness.js`);
const { ejecutarJS } = globalThis;

let malos = 0, total = 0;
const pasa = (r) => !r.error && r.resultados.length > 0 && r.resultados.every((x) => x[0]);
for (const d of readdirSync(`${RAIZ}/modulos`).sort()) {
  const f = `${RAIZ}/modulos/${d}/ejercicios.yml`;
  if (!existsSync(f)) continue;
  for (const ej of parse(readFileSync(f, "utf8")).ejercicios) {
    if (ej.tipo !== "javascript") continue;
    total++;
    const datos = JSON.stringify({ setup: ej.setup, tests: ej.tests });
    const solucion = ej.pasos ? ej.pasos.map((p) => p.codigo.trimEnd()).join("\n") : ej.solucion;
    const r = JSON.parse(ejecutarJS(solucion, datos));
    if (pasa(r)) console.log(`OK    ${d}/${ej.id} (${r.resultados.length} tests)`);
    else {
      malos++;
      console.log(`FALLO ${d}/${ej.id}: la solución no pasa`, r.error ?? "");
      for (const [bien, txt] of r.resultados) if (!bien) console.log("      ✗", txt);
    }
    if (pasa(JSON.parse(ejecutarJS(ej.inicial ?? "", datos)))) {
      malos++;
      console.log(`FALLO ${d}/${ej.id}: el código inicial ya supera los tests`);
    }
  }
}
console.log(`\n${total} ejercicios de JavaScript, ${malos} problemas`);
process.exit(malos ? 1 : 0);
