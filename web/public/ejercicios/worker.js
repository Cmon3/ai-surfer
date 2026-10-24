// Web Worker del motor de ejercicios: ejecuta Python (Pyodide) fuera del hilo
// principal para que un bucle infinito no congele la página (el hilo principal
// mata el Worker si tarda demasiado).
//
// Mensajes de entrada : {id, tipo: "ejecutar", cdn, codigo, ejercicio (JSON), paquetes}
// Mensajes de salida  : {id, tipo: "estado", texto} | {id, tipo: "resultado", datos} | {id, tipo: "error", mensaje}

let pyodide = null;
let harnessListo = null;
const paquetesCargados = new Set();

async function iniciar(cdn, aviso) {
  if (pyodide) return pyodide;
  aviso("Cargando Python… (la primera vez tarda ~10 s; después queda en caché)");
  importScripts(cdn + "pyodide.js");
  pyodide = await loadPyodide({ indexURL: cdn });
  const resp = await fetch(new URL("harness.py", self.location.href));
  if (!resp.ok) throw new Error("No se pudo cargar harness.py (" + resp.status + ")");
  pyodide.runPython(await resp.text());
  harnessListo = pyodide.globals.get("ejecutar");
  return pyodide;
}

self.onmessage = async (ev) => {
  const m = ev.data;
  if (m.tipo !== "ejecutar") return;
  const aviso = (texto) => self.postMessage({ id: m.id, tipo: "estado", texto });
  try {
    const py = await iniciar(m.cdn, aviso);
    const nuevos = (m.paquetes || []).filter((p) => !paquetesCargados.has(p));
    if (nuevos.length) {
      aviso("Cargando paquetes: " + nuevos.join(", ") + "…");
      await py.loadPackage(nuevos);
      nuevos.forEach((p) => paquetesCargados.add(p));
    }
    aviso("__ejecutando__");
    const datos = harnessListo(m.codigo, m.ejercicio);
    self.postMessage({ id: m.id, tipo: "resultado", datos });
  } catch (err) {
    self.postMessage({ id: m.id, tipo: "error", mensaje: String((err && err.message) || err) });
  }
};
