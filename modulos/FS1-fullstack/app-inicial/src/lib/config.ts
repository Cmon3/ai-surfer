import Anthropic from "@anthropic-ai/sdk";
import { crearStreamReal, type CrearStream } from "./chat";

/** Devuelve null cuando hay que usar el modo simulado. Solo se ejecuta en el servidor. */
export function obtenerCrearStream(env: Record<string, string | undefined> = process.env): CrearStream | null {
  const clave = env.ANTHROPIC_API_KEY?.trim();
  if (!clave || env.MODO_SIMULADO === "true") return null;
  return crearStreamReal(new Anthropic({ apiKey: clave, maxRetries: 2, timeout: 60_000 }));
}
