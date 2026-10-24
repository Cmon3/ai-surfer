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
 *       tipo: python | sql      # por defecto python
 *       enunciado: |            # Markdown
 *       inicial: |              # código inicial
 *       paquetes: [numpy]       # opcional; se cargan bajo demanda
 *       setup: |                # opcional, oculto: datos, conexión `con` para SQL
 *       tests:                  # {expr, esperado, tol?, nombre?, oculto?} | {asserts, nombre?, oculto?}
 *       pistas: [..., ..., ...] # de la más vaga a la más concreta (Markdown en línea)
 *       solucion: |             # solución de referencia: NO se publica; la usa verificar_ejercicios.py
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
  tipo: "python" | "sql";
  enunciadoHtml: string;
  inicial: string;
  paquetes: string[];
  setup?: string;
  tests: Test[];
  pistasHtml: string[];
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
    for (const campo of ["titulo", "enunciado", "inicial"]) {
      if (typeof e[campo] !== "string" || !e[campo].trim()) fallo(carpeta, id, `falta «${campo}»`);
    }
    const tipo = e.tipo ?? "python";
    if (tipo !== "python" && tipo !== "sql") fallo(carpeta, id, "«tipo» debe ser python o sql");
    if (!Array.isArray(e.tests) || e.tests.length === 0) fallo(carpeta, id, "faltan «tests»");
    for (const t of e.tests) {
      const ok = (typeof t.expr === "string" && typeof t.esperado === "string") || typeof t.asserts === "string";
      if (!ok) fallo(carpeta, id, "cada test necesita {expr, esperado} o {asserts}");
    }
    if (!Array.isArray(e.pistas) || e.pistas.length < 2) fallo(carpeta, id, "se esperan al menos 2 «pistas»");
    if (typeof e.solucion !== "string") fallo(carpeta, id, "falta «solucion» (se usa en CI; no se publica)");
    // En Pyodide 0.28 sqlite3 es un paquete aparte: los ejercicios SQL lo cargan bajo demanda.
    const paquetes: string[] = [...(e.paquetes ?? [])];
    if (tipo === "sql" && !paquetes.includes("sqlite3")) paquetes.push("sqlite3");
    return {
      id,
      titulo: e.titulo,
      nivel: e.nivel,
      tipo,
      enunciadoHtml: marked.parse(e.enunciado, { async: false }) as string,
      inicial: e.inicial.replace(/\s+$/, "") + "\n",
      paquetes,
      setup: e.setup,
      tests: e.tests,
      pistasHtml: e.pistas.map((p: string) => marked.parseInline(String(p), { async: false }) as string),
    };
  });
  return {
    intro: doc.intro ? (marked.parse(doc.intro, { async: false }) as string) : null,
    ejercicios,
  };
}
