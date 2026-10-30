/**
 * Carga los ejercicios de cada módulo desde ../modulos/<carpeta>/ejercicios.yml
 * en tiempo de build. Si el YAML está mal formado, el build FALLA (a propósito:
 * es mejor que lo detecte el CI a que lo descubra un alumno).
 *
 * Formato (ver web/README.md):
 *   ejercicios:
 *     - id: f1-media            # único dentro del módulo
 *       titulo: ...
 *       nivel: Básico           # opcional (texto libre en una insignia)
 *       tipo: python | sql | javascript   # por defecto python
 *       enunciado: |            # Markdown
 *       inicial: |              # código inicial (no hace falta si hay «pasos»)
 *       pasos:                  # opcional: modo guiado, cada paso tiene su casilla
 *         - explica: ...        # Markdown: qué se hace y por qué
 *           codigo: |           # fragmento que el estudiante copia en su casilla
 *       paquetes: [numpy]       # opcional; se cargan bajo demanda
 *       setup: |                # opcional, oculto: datos, conexión `con` para SQL
 *       tests:                  # {expr, esperado, tol?, nombre?, oculto?} | {asserts, nombre?, oculto?}
 *       pistas: [..., ..., ...] # de la más vaga a la más concreta (no hacen falta si hay «pasos»)
 *       solucion: |             # NO se publica; con «pasos» no se escribe: es la unión de los pasos
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { marked } from "marked";

const RAIZ_MODULOS = path.resolve(process.cwd(), "../modulos");

export interface Test {
  expr?: string;
  esperado?: string;
  asserts?: string;
  tol?: number;
  nombre?: string;
  oculto?: boolean;
}

/** Lo que viaja al navegador (sin la solución). */
export interface EjercicioPublico {
  id: string;
  titulo: string;
  nivel?: string;
  tipo: "python" | "sql" | "javascript";
  enunciadoHtml: string;
  inicial: string;
  paquetes: string[];
  setup?: string;
  tests: Test[];
  pistasHtml: string[];
  /** Modo guiado: una casilla por paso, con su explicación al lado. */
  pasos?: { explicaHtml: string; codigo: string }[];
}

export interface EjerciciosModulo {
  intro: string | null;
  ejercicios: EjercicioPublico[];
}

function fallo(carpeta: string, id: string, msg: string): never {
  throw new Error(`ejercicios.yml de ${carpeta}, ejercicio «${id}»: ${msg}`);
}

export function cargarEjercicios(carpeta: string): EjerciciosModulo | null {
  let crudo: string;
  try {
    crudo = readFileSync(path.join(RAIZ_MODULOS, carpeta, "ejercicios.yml"), "utf8");
  } catch {
    return null;
  }
  const doc = parse(crudo) as { intro?: string; ejercicios?: any[] };
  if (!doc || !Array.isArray(doc.ejercicios) || doc.ejercicios.length === 0) {
    throw new Error(`ejercicios.yml de ${carpeta}: falta la lista «ejercicios»`);
  }
  const vistos = new Set<string>();
  const ejercicios = doc.ejercicios.map((e, i): EjercicioPublico => {
    const id = String(e.id ?? `#${i + 1}`);
    if (!e.id) fallo(carpeta, id, "falta «id»");
    if (vistos.has(id)) fallo(carpeta, id, "«id» repetido");
    vistos.add(id);
    const guiado = Array.isArray(e.pasos);
    for (const campo of guiado ? ["titulo", "enunciado"] : ["titulo", "enunciado", "inicial"]) {
      if (typeof e[campo] !== "string" || !e[campo].trim()) fallo(carpeta, id, `falta «${campo}»`);
    }
    if (guiado) {
      if (e.pasos.length < 2) fallo(carpeta, id, "se esperan al menos 2 «pasos»");
      for (const p of e.pasos) {
        if (typeof p.explica !== "string" || typeof p.codigo !== "string") fallo(carpeta, id, "cada paso necesita «explica» y «codigo»");
      }
    }
    const tipo = e.tipo ?? "python";
    if (!["python", "sql", "javascript"].includes(tipo)) fallo(carpeta, id, "«tipo» debe ser python, sql o javascript");
    if (!Array.isArray(e.tests) || e.tests.length === 0) fallo(carpeta, id, "faltan «tests»");
    for (const t of e.tests) {
      const ok = (typeof t.expr === "string" && typeof t.esperado === "string") || typeof t.asserts === "string";
      if (!ok) fallo(carpeta, id, "cada test necesita {expr, esperado} o {asserts}");
    }
    if (!guiado && (!Array.isArray(e.pistas) || e.pistas.length < 2)) fallo(carpeta, id, "se esperan al menos 2 «pistas»");
    if (!guiado && typeof e.solucion !== "string") fallo(carpeta, id, "falta «solucion» (se usa en CI; no se publica)");
    // En Pyodide 0.28 sqlite3 es un paquete aparte: los ejercicios SQL lo cargan bajo demanda.
    const paquetes: string[] = [...(e.paquetes ?? [])];
    if (tipo === "sql" && !paquetes.includes("sqlite3")) paquetes.push("sqlite3");
    return {
      id,
      titulo: e.titulo,
      nivel: e.nivel,
      tipo,
      enunciadoHtml: marked.parse(e.enunciado, { async: false }) as string,
      inicial: (e.inicial ?? "").replace(/\s+$/, "") + (e.inicial ? "\n" : ""),
      paquetes,
      setup: e.setup,
      tests: e.tests,
      pistasHtml: (e.pistas ?? []).map((p: string) => marked.parseInline(String(p), { async: false }) as string),
      pasos: guiado
        ? e.pasos.map((p: { explica: string; codigo: string }) => ({
            explicaHtml: marked.parse(p.explica, { async: false }) as string,
            codigo: p.codigo.replace(/\s+$/, ""),
          }))
        : undefined,
    };
  });
  return {
    intro: doc.intro ? (marked.parse(doc.intro, { async: false }) as string) : null,
    ejercicios,
  };
}
