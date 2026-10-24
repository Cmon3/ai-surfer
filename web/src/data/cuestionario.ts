/**
 * Parser tolerante de cuestionario.md.
 *
 * Formato actual (módulos nuevos):
 *     **N.** Enunciado…
 *     - a) opción
 *     …
 *     <details><summary>Soluciones</summary>
 *     | # | Respuesta | Por qué |
 *     | 1 | b | Explicación |
 *
 * Los módulos antiguos varían (opciones sin guion, «### Pregunta N», solucionario
 * en línea «1. **b** 2. **c**…» o párrafos «**N → b.** explicación»). Se intenta
 * entender todos; si algo no cuadra (nº de preguntas, opciones o respuestas),
 * parseCuestionario devuelve null y la web muestra el Markdown tal cual.
 */
import { marked } from "marked";

export interface PreguntaQuiz {
  n: number;
  enunciadoHtml: string;
  opcionesHtml: string[]; // índice 0 = a)
  correcta: number; // 0-based
  porQueHtml: string | null;
}

const RE_CAB_PREGUNTA = /^(?:\*\*(\d{1,2})(?:\.|\s*[).:])?\*\*\.?\s*(.*)|\*\*(\d{1,2})\.\s+(.*?)\*\*\s*$|#{2,4}\s*Pregunta\s+(\d{1,2})\b.*)$/;
const RE_OPCION = /^(?:[-*]\s+)?\(?([a-d])\)\s+(.*)$/;

function md(texto: string): string {
  return marked.parse(texto, { async: false }) as string;
}
function mdLinea(texto: string): string {
  return marked.parseInline(texto, { async: false }) as string;
}

/** Separa el cuerpo de preguntas del bloque de soluciones (<details>). */
function partir(fuente: string): { cuerpo: string; soluciones: string } | null {
  const i = fuente.search(/<details>/i);
  if (i < 0) {
    const j = fuente.search(/^#{2,3}\s*Solucionario/im);
    if (j < 0) return null;
    return { cuerpo: fuente.slice(0, j), soluciones: fuente.slice(j) };
  }
  return { cuerpo: fuente.slice(0, i), soluciones: fuente.slice(i) };
}

function parsearPreguntas(cuerpo: string): { n: number; enunciado: string; opciones: string[] }[] | null {
  const lineas = cuerpo.split("\n");
  const preguntas: { n: number; enunciado: string[]; opciones: string[] }[] = [];
  let actual: (typeof preguntas)[number] | null = null;
  let enCodigo = false;
  for (const linea of lineas) {
    if (/^```/.test(linea.trim())) enCodigo = !enCodigo;
    if (!enCodigo) {
      const m = linea.match(RE_CAB_PREGUNTA);
      if (m) {
        const n = Number(m[1] ?? m[3] ?? m[5]);
        const resto = (m[2] ?? m[4] ?? "").trim();
        actual = { n, enunciado: resto ? [resto] : [], opciones: [] };
        preguntas.push(actual);
        continue;
      }
      if (!actual) continue;
      if (/^---+\s*$/.test(linea.trim())) continue;
      const o = linea.trim().match(RE_OPCION);
      if (o && o[1].charCodeAt(0) - 97 === actual.opciones.length) {
        actual.opciones.push(o[2].trim());
        continue;
      }
      // continuación de la última opción (línea sangrada) o del enunciado
      if (actual.opciones.length && /^\s{2,}\S/.test(linea) && linea.trim()) {
        actual.opciones[actual.opciones.length - 1] += " " + linea.trim();
        continue;
      }
    }
    if (actual && actual.opciones.length === 0) actual.enunciado.push(linea);
  }
  if (preguntas.length === 0) return null;
  return preguntas.map((p) => ({ n: p.n, enunciado: p.enunciado.join("\n").trim(), opciones: p.opciones }));
}

type Sol = { letra: string; porQue: string | null };

function parsearSoluciones(texto: string): Map<number, Sol> | null {
  const res = new Map<number, Sol>();
  let conflicto = false;
  const pendientes: [number, string][] = [];
  // Una misma pregunta puede aparecer en una tabla (letra) y en un párrafo
  // (letra + explicación): se fusionan; si las letras discrepan, no nos fiamos.
  const poner = (n: number, letra: string, porQue: string | null) => {
    const nuevoPq = porQue && porQue.trim().length > 3 ? porQue.trim() : null;
    const previo = res.get(n);
    if (!previo) return void res.set(n, { letra, porQue: nuevoPq });
    if (previo.letra !== letra) conflicto = true;
    else if (!previo.porQue && nuevoPq) previo.porQue = nuevoPq;
  };
  const reIn = /(\d{1,2})\.\s*\**([a-d])\**(?=\s|$)/g;
  const reParrafo = /^\s*\*\*(\d{1,2})\s*(?:→|–|—|·|-|\.)\s*\(?([a-d])\)?\.?\*\*\.?\s*(.*)$/;
  const reLista = /^\s*(\d{1,2})\.\s+\*\*\(?([a-d])\)?\.?\*\*\s*[—,:\-–.]?\s*(.*)$/;

  for (const linea of texto.split("\n")) {
    // 1) En línea: «1. **b** 2. **c** …» o «1. b 2. b …» (no se mezcla con la lista numerada)
    const todas = [...linea.matchAll(reIn)];
    if (todas.length >= 5) {
      for (const m of todas) poner(Number(m[1]), m[2], null);
      continue;
    }
    // 2) Tablas: una celda entera (nº) y otra con una letra a-d
    if (linea.trim().startsWith("|")) {
      const celdas = linea.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const iN = celdas.findIndex((c) => /^\d{1,2}$/.test(c));
      const iL = celdas.findIndex((c) => /^\**\(?[a-d]\)?\**$/.test(c));
      if (iN >= 0 && iL >= 0 && iN !== iL) {
        const porQue = celdas.filter((c, i) => i !== iN && i !== iL && c.length > 12).sort((x, y) => y.length - x.length)[0] ?? null;
        poner(Number(celdas[iN]), celdas[iL].match(/[a-d]/)![0], porQue);
      }
      continue;
    }
    // 3a) Nota suelta «- **11:** explicación» (solo añade el porqué a una respuesta ya conocida)
    const nota = linea.match(/^\s*[-*]\s+\*\*(\d{1,2})[:.]\*\*\s*(.+)$/);
    if (nota) {
      pendientes.push([Number(nota[1]), nota[2]]);
      continue;
    }
    // 3) Párrafos «**N → b.** …» y listas «N. **b** — …»
    const m = linea.match(reParrafo) ?? linea.match(reLista);
    if (m) poner(Number(m[1]), m[2], m[3]);
  }
  for (const [n, t] of pendientes) {
    const previo = res.get(n);
    if (previo && !previo.porQue) previo.porQue = t.trim();
  }
  return res.size && !conflicto ? res : null;
}

export function parseCuestionario(fuente: string): PreguntaQuiz[] | null {
  const partes = partir(fuente);
  if (!partes) return null;
  const preguntas = parsearPreguntas(partes.cuerpo);
  const soluciones = parsearSoluciones(partes.soluciones);
  if (!preguntas || !soluciones) return null;

  const salida: PreguntaQuiz[] = [];
  for (const p of preguntas) {
    const s = soluciones.get(p.n);
    if (!s || p.opciones.length < 2 || p.opciones.length > 5 || !p.enunciado) return null;
    const correcta = s.letra.charCodeAt(0) - 97;
    if (correcta >= p.opciones.length) return null;
    salida.push({
      n: p.n,
      enunciadoHtml: md(p.enunciado),
      opcionesHtml: p.opciones.map(mdLinea),
      correcta,
      porQueHtml: s.porQue ? mdLinea(s.porQue) : null,
    });
  }
  // Las preguntas deben ser 1..N sin saltos ni repeticiones.
  if (!salida.every((q, i) => q.n === i + 1)) return null;
  return salida;
}
