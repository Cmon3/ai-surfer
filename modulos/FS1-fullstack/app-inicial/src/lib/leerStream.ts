import { decodificarLinea, type EventoServidor } from "./protocolo";

/** Convierte el cuerpo de una respuesta en un flujo de eventos (maneja líneas partidas entre trozos). */
export async function* leerEventos(cuerpo: ReadableStream<Uint8Array>): AsyncGenerator<EventoServidor> {
  const reader = cuerpo.getReader();
  const decoder = new TextDecoder();
  let resto = "";
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      resto += decoder.decode(value, { stream: true });
      const lineas = resto.split("\n");
      resto = lineas.pop() ?? "";
      for (const l of lineas) {
        const ev = l ? decodificarLinea(l) : null;
        if (ev) yield ev;
      }
    }
    const ev = resto ? decodificarLinea(resto) : null;
    if (ev) yield ev;
  } finally {
    reader.releaseLock();
  }
}
