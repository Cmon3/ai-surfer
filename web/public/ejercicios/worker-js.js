// Web Worker para ejercicios de JavaScript. Mismo protocolo que worker.js. Va aparte para
// que un bucle infinito se pueda cortar matando el Worker sin congelar la página.
importScripts("harness.js");

self.onmessage = (ev) => {
  const m = ev.data;
  if (m.tipo !== "ejecutar") return;
  self.postMessage({ id: m.id, tipo: "estado", texto: "__ejecutando__" });
  try {
    self.postMessage({ id: m.id, tipo: "resultado", datos: self.ejecutarJS(m.codigo, m.ejercicio) });
  } catch (err) {
    self.postMessage({ id: m.id, tipo: "error", mensaje: String((err && err.message) || err) });
  }
};
