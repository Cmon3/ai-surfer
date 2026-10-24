/**
 * Motor de ejercicios (lado navegador). Un único Web Worker con Pyodide
 * compartido por todos los ejercicios de la página. Todo el texto que viene
 * de Python se inserta con textContent: nunca como HTML.
 */

interface DatosEjercicio {
  id: string;
  tipo: string;
  setup?: string;
  paquetes: string[];
  tests: unknown[];
  nPistas: number;
}
interface Config {
  clave: string;
  persistir: boolean;
  cdn: string;
  workerUrl: string;
  timeoutS: number;
  ejercicios: DatosEjercicio[];
}
type Progreso = Record<string, { ok?: boolean; codigo?: string; intentos?: number; pistas?: number }>;

function leerProgreso(clave: string, persistir: boolean): Progreso {
  if (!persistir) return {};
  try {
    return JSON.parse(localStorage.getItem(clave) || "{}") || {};
  } catch {
    return {};
  }
}
function guardarProgreso(clave: string, persistir: boolean, p: Progreso) {
  if (!persistir) return;
  try {
    localStorage.setItem(clave, JSON.stringify(p));
  } catch {
    /* modo privado o almacenamiento bloqueado: seguimos sin guardar */
  }
}

export function iniciarMotor() {
  const nodoCfg = document.getElementById("ej-config");
  if (!nodoCfg) return;
  const cfg: Config = JSON.parse(nodoCfg.textContent || "{}");
  const progreso = leerProgreso(cfg.clave, cfg.persistir);
  const guardar = () => guardarProgreso(cfg.clave, cfg.persistir, progreso);

  // ─── Worker compartido ──────────────────────────────────────────────
  let worker: Worker | null = null;
  let siguienteId = 1;
  function nuevoWorker() {
    worker = new Worker(cfg.workerUrl);
    return worker;
  }

  function ejecutarEnWorker(
    codigo: string,
    ej: DatosEjercicio,
    alEstado: (t: string) => void
  ): Promise<{ resultados: [boolean, string][]; salida: string; error: string | null }> {
    return new Promise((resolve, reject) => {
      const w = worker ?? nuevoWorker();
      const id = siguienteId++;
      let reloj: number | undefined;
      const limpiar = () => {
        if (reloj) clearTimeout(reloj);
        w.removeEventListener("message", alMensaje);
        w.removeEventListener("error", alError);
      };
      const alMensaje = (ev: MessageEvent) => {
        const m = ev.data;
        if (m.id !== id) return;
        if (m.tipo === "estado") {
          if (m.texto === "__ejecutando__") {
            alEstado("Ejecutando…");
            // El reloj solo corre durante la ejecución, no durante la descarga de Python.
            reloj = window.setTimeout(() => {
              limpiar();
              w.terminate();
              worker = null; // el siguiente intento crea uno nuevo
              reject(new Error(`Tiempo agotado (${cfg.timeoutS} s). ¿Hay un bucle infinito? He reiniciado el intérprete.`));
            }, cfg.timeoutS * 1000);
          } else alEstado(m.texto);
        } else if (m.tipo === "resultado") {
          limpiar();
          resolve(JSON.parse(m.datos));
        } else if (m.tipo === "error") {
          limpiar();
          reject(new Error(m.mensaje));
        }
      };
      const alError = (ev: ErrorEvent) => {
        limpiar();
        worker = null;
        reject(new Error("Error del intérprete: " + (ev.message || "no se pudo iniciar el Worker (¿sin conexión al CDN?)")));
      };
      w.addEventListener("message", alMensaje);
      w.addEventListener("error", alError);
      w.postMessage({
        id,
        tipo: "ejecutar",
        cdn: cfg.cdn,
        codigo,
        ejercicio: JSON.stringify({ tipo: ej.tipo, setup: ej.setup, tests: ej.tests }),
        paquetes: ej.paquetes,
      });
    });
  }

  // ─── Resumen global ─────────────────────────────────────────────────
  function pintarResumen() {
    const hechos = cfg.ejercicios.filter((e) => progreso[e.id]?.ok).length;
    document.querySelectorAll("[data-ej-resumen]").forEach((n) => {
      n.textContent = `${hechos}/${cfg.ejercicios.length} ejercicios superados`;
    });
    const barra = document.querySelector<HTMLElement>("[data-ej-barra]");
    if (barra) barra.style.width = (cfg.ejercicios.length ? (100 * hechos) / cfg.ejercicios.length : 0) + "%";
  }

  // ─── Cada ejercicio ─────────────────────────────────────────────────
  for (const ej of cfg.ejercicios) {
    const raiz = document.querySelector<HTMLElement>(`[data-ej-id="${CSS.escape(ej.id)}"]`);
    if (!raiz) continue;
    const area = raiz.querySelector<HTMLTextAreaElement>("textarea")!;
    const salida = raiz.querySelector<HTMLElement>("[data-salida]")!;
    const btnRun = raiz.querySelector<HTMLButtonElement>("[data-run]")!;
    const btnPista = raiz.querySelector<HTMLButtonElement>("[data-pista]")!;
    const btnReset = raiz.querySelector<HTMLButtonElement>("[data-reset]")!;
    const zonaPistas = raiz.querySelector<HTMLElement>("[data-pistas]")!;
    const marca = raiz.querySelector<HTMLElement>("[data-marca]")!;
    const inicial = area.value;
    const pistasHtml = Array.from(raiz.querySelectorAll<HTMLElement>("template[data-pista-html]"));

    const estado = (progreso[ej.id] ??= {});
    if (estado.codigo) area.value = estado.codigo;

    function pintarMarca() {
      marca.textContent = estado.ok ? "✓ superado" : "";
      raiz!.classList.toggle("superado", !!estado.ok);
    }
    function pintarPistas() {
      zonaPistas.replaceChildren();
      const n = estado.pistas ?? 0;
      pistasHtml.slice(0, n).forEach((t, i) => {
        const p = document.createElement("p");
        p.className = "ej-pista";
        const b = document.createElement("strong");
        b.textContent = `Pista ${i + 1}: `;
        p.append(b);
        p.insertAdjacentHTML("beforeend", t.innerHTML); // HTML generado en build desde nuestro YAML
        zonaPistas.append(p);
      });
      btnPista.textContent = n >= pistasHtml.length ? "Sin más pistas" : `Pedir pista (${n}/${pistasHtml.length})`;
      btnPista.disabled = n >= pistasHtml.length;
    }
    pintarMarca();
    pintarPistas();

    let guardarTimer: number | undefined;
    area.addEventListener("input", () => {
      clearTimeout(guardarTimer);
      guardarTimer = window.setTimeout(() => {
        estado.codigo = area.value;
        guardar();
      }, 400);
    });
    area.addEventListener("keydown", (ev) => {
      if (ev.key === "Tab" && !ev.shiftKey) {
        ev.preventDefault();
        const { selectionStart: a, selectionEnd: b } = area;
        area.setRangeText("    ", a, b, "end");
      } else if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
        ev.preventDefault();
        btnRun.click();
      }
    });

    btnPista.addEventListener("click", () => {
      estado.pistas = Math.min((estado.pistas ?? 0) + 1, pistasHtml.length);
      guardar();
      pintarPistas();
    });
    btnReset.addEventListener("click", () => {
      if (area.value !== inicial && !confirm("¿Volver al código inicial? Perderás lo que has escrito.")) return;
      area.value = inicial;
      estado.codigo = undefined;
      guardar();
      salida.replaceChildren();
    });

    btnRun.addEventListener("click", async () => {
      btnRun.disabled = true;
      const aviso = (t: string) => {
        salida.className = "ej-salida";
        salida.textContent = t;
      };
      aviso("Preparando…");
      try {
        const r = await ejecutarEnWorker(area.value, ej, aviso);
        pintarResultado(salida, r);
        estado.intentos = (estado.intentos ?? 0) + 1;
        estado.codigo = area.value;
        const todos = !r.error && r.resultados.length > 0 && r.resultados.every((x) => x[0]);
        if (todos && !estado.ok) {
          estado.ok = true;
          document.dispatchEvent(new CustomEvent("ejercicio-superado", { detail: { id: ej.id } }));
        }
        guardar();
        pintarMarca();
        pintarResumen();
      } catch (err) {
        salida.className = "ej-salida mal";
        salida.textContent = "✗ " + (err as Error).message;
      } finally {
        btnRun.disabled = false;
      }
    });
  }
  pintarResumen();
}

function pintarResultado(
  salida: HTMLElement,
  r: { resultados: [boolean, string][]; salida: string; error: string | null }
) {
  salida.replaceChildren();
  const cab = document.createElement("strong");
  if (r.error) {
    salida.className = "ej-salida mal";
    cab.textContent = "✗ Tu código no se ha podido ejecutar";
  } else {
    const ok = r.resultados.filter((x) => x[0]).length;
    const todos = ok === r.resultados.length;
    salida.className = "ej-salida " + (todos ? "bien" : "mal");
    cab.textContent = todos ? `✓ ¡Superado! (${ok}/${r.resultados.length} pruebas)` : `${ok}/${r.resultados.length} pruebas superadas`;
  }
  salida.append(cab);
  const pre = document.createElement("pre");
  const lineas: string[] = [];
  if (r.error) lineas.push(r.error);
  for (const [ok, texto] of r.resultados) lineas.push((ok ? "✓ " : "✗ ") + texto);
  pre.textContent = lineas.join("\n");
  salida.append(pre);
  if (r.salida.trim()) {
    const t = document.createElement("div");
    t.className = "ej-print-titulo";
    t.textContent = "Salida de tu programa (print):";
    const pre2 = document.createElement("pre");
    pre2.textContent = r.salida;
    salida.append(t, pre2);
  }
}
