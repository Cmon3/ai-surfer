import { buscarPedido } from "./pedidos";
import type { MensajeChat } from "./protocolo";

// Modo simulado: respuestas de prueba sin clave ni red, emitidas por trozos
// para que el navegador vea exactamente el mismo streaming que con Claude.

export function respuestaSimulada(mensajes: MensajeChat[]): string {
  const ultimo = [...mensajes].reverse().find((m) => m.role === "user")?.content ?? "";
  const m = /TS-\d{4}/i.exec(ultimo);
  if (!m) {
    return "Hola, soy el asistente de pedidos de TiendaSur (modo simulado). Dime tu número de pedido, por ejemplo TS-1001, y te cuento cómo va.";
  }
  const id = m[0].toUpperCase();
  const p = buscarPedido(id);
  if (!p) {
    return `No encuentro el pedido ${id}. Revisa el número en el correo de confirmación (modo simulado).`;
  }
  const entrega = p.entregaPrevista ? ` Entrega prevista: ${p.entregaPrevista}.` : "";
  return `Tu pedido ${p.id} está ${p.estado}: ${p.articulos.join(", ")} (${p.totalEuros.toFixed(2)} EUR).${entrega} (modo simulado)`;
}

export function* trocear(texto: string, tamano = 6): Generator<string> {
  for (let i = 0; i < texto.length; i += tamano) yield texto.slice(i, i + tamano);
}

export async function* streamSimulado(
  mensajes: MensajeChat[],
  esperaMs = 15,
): AsyncGenerator<string> {
  for (const trozo of trocear(respuestaSimulada(mensajes))) {
    if (esperaMs > 0) await new Promise((r) => setTimeout(r, esperaMs));
    yield trozo;
  }
}
