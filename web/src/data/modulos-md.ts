/**
 * Lee los materiales de los módulos directamente desde ../../modulos/
 * en tiempo de build (Astro es estático: esto no existe en el navegador).
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";

const RAIZ_MODULOS = path.resolve(process.cwd(), "../modulos");

export interface MaterialModulo {
  readmeHtml: string | null;
  apuntesHtml: string | null;
  cuestionarioHtml: string | null;
}

function leerMd(carpeta: string, archivo: string): string | null {
  try {
    const md = readFileSync(path.join(RAIZ_MODULOS, carpeta, archivo), "utf8");
    return marked.parse(md, { async: false }) as string;
  } catch {
    return null;
  }
}

export function material(carpeta: string): MaterialModulo {
  return {
    readmeHtml: leerMd(carpeta, "README.md"),
    apuntesHtml: leerMd(carpeta, "apuntes.md"),
    cuestionarioHtml: leerMd(carpeta, "cuestionario.md"),
  };
}

/** Texto Markdown sin procesar de un archivo del módulo (o null si no existe). */
export function leerFuente(carpeta: string, archivo: string): string | null {
  try {
    return readFileSync(path.join(RAIZ_MODULOS, carpeta, archivo), "utf8");
  } catch {
    return null;
  }
}
