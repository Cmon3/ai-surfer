// Resumen de ventas de TiendaSur en JavaScript.
const VENTAS = [
  ["cafe", 12.50],
  ["te", 7.25],
  ["cafe", 30.00],
  ["menaje", 45.90],
  ["te", 3.10],
];
const UMBRAL = 20;

function media(importes) {
  if (importes.length === 0) {
    return 0;
  }
  let suma = 0;
  for (const importe of importes) {
    suma += importe;
  }
  return suma / importes.length;
}

function totalPorCategoria(ventas) {
  const totales = {};
  for (const [categoria, importe] of ventas) {
    totales[categoria] = (totales[categoria] ?? 0) + importe;
  }
  return totales;
}

const importes = VENTAS.map(([, importe]) => importe);
let grandes = 0;
for (const importe of importes) {
  if (importe > UMBRAL) {
    grandes += 1;
  }
}

console.log(`Ventas: ${VENTAS.length}`);
console.log(`Total: ${importes.reduce((a, b) => a + b, 0).toFixed(2)}`);
console.log(`Media: ${media(importes).toFixed(2)}`);
console.log(`Ventas de mas de ${UMBRAL}: ${grandes}`);
console.log("Por categoria:");
const totales = totalPorCategoria(VENTAS);
for (const categoria of Object.keys(totales).sort()) {
  console.log(`  ${categoria}: ${totales[categoria].toFixed(2)}`);
}
