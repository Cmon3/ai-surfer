/** Cuestionario interactivo: corrección inmediata con explicación. */
interface Cfg {
  clave: string;
  correctas: number[];
}

export function iniciarCuestionario() {
  const nodo = document.getElementById("cq-config");
  if (!nodo) return;
  const cfg: Cfg = JSON.parse(nodo.textContent || "{}");
  const preguntas = Array.from(document.querySelectorAll<HTMLElement>("[data-cq]"));
  const resumen = document.querySelector<HTMLElement>("[data-cq-resumen]")!;
  const btnReintentar = document.querySelector<HTMLButtonElement>("[data-cq-reintentar]")!;

  let respuestas: (number | null)[] = cfg.correctas.map(() => null);
  try {
    const guardado = JSON.parse(localStorage.getItem(cfg.clave) || "null");
    if (Array.isArray(guardado) && guardado.length === respuestas.length) respuestas = guardado;
  } catch {
    /* sin almacenamiento: empezamos de cero */
  }
  const guardar = () => {
    try {
      localStorage.setItem(cfg.clave, JSON.stringify(respuestas));
    } catch {
      /* ignorar */
    }
  };

  function pintar() {
    preguntas.forEach((q, i) => {
      const r = respuestas[i];
      const ops = Array.from(q.querySelectorAll<HTMLButtonElement>(".cq-op"));
      const expl = q.querySelector<HTMLElement>(".cq-expl")!;
      ops.forEach((b, j) => {
        b.classList.remove("correcta", "incorrecta");
        b.disabled = r !== null;
        b.setAttribute("aria-pressed", String(r === j));
        if (r !== null) {
          if (j === cfg.correctas[i]) b.classList.add("correcta");
          else if (j === r) b.classList.add("incorrecta");
        }
      });
      expl.hidden = r === null;
      const ok = r === cfg.correctas[i];
      const cab = expl.querySelector<HTMLElement>("[data-cq-veredicto]")!;
      cab.textContent = r === null ? "" : ok ? "✓ Correcto. " : `✗ Incorrecto: la respuesta era ${"abcde"[cfg.correctas[i]]}). `;
    });
    const hechas = respuestas.filter((r) => r !== null).length;
    const aciertos = respuestas.filter((r, i) => r === cfg.correctas[i]).length;
    resumen.textContent =
      hechas === 0
        ? `${cfg.correctas.length} preguntas. Elige una opción para ver la corrección al instante.`
        : hechas < cfg.correctas.length
          ? `Llevas ${hechas}/${cfg.correctas.length} · aciertos: ${aciertos}`
          : `Resultado final: ${aciertos}/${cfg.correctas.length} (${Math.round((100 * aciertos) / cfg.correctas.length)} %). ${
              aciertos === cfg.correctas.length ? "¡Perfecto!" : aciertos >= cfg.correctas.length * 0.7 ? "Buen resultado: repasa las que has fallado." : "Repasa los apuntes del módulo y vuelve a intentarlo."
            }`;
    btnReintentar.hidden = hechas === 0;
  }

  preguntas.forEach((q, i) => {
    q.querySelectorAll<HTMLButtonElement>(".cq-op").forEach((b, j) => {
      b.addEventListener("click", () => {
        if (respuestas[i] !== null) return;
        respuestas[i] = j;
        guardar();
        pintar();
      });
    });
  });
  btnReintentar.addEventListener("click", () => {
    respuestas = respuestas.map(() => null);
    guardar();
    pintar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  pintar();
}
