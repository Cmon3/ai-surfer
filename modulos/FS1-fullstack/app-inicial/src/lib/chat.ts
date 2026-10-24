import type Anthropic from "@anthropic-ai/sdk";
import { HERRAMIENTAS, ejecutarHerramienta } from "./herramientas";
import type { EventoServidor, MensajeChat } from "./protocolo";
import { streamSimulado } from "./simulado";

export const MODELO = "claude-opus-5-5";
export const MAX_TOKENS = 4000;
export const MAX_VUELTAS = 5; // tope del bucle de herramientas: evita bucles infinitos y facturas

export const SISTEMA =
  "Eres el asistente de pedidos de TiendaSur, una tienda de café y menaje. " +
  "Responde en español, de forma breve y amable. Para cualquier dato de un pedido " +
  "usa la herramienta consultar_pedido; nunca inventes estados ni fechas. " +
  "Si no puedes ayudar, dilo y sugiere escribir a atencion@tiendasur.example.";

// Interfaz mínima de lo que necesitamos del SDK. Así el test puede inyectar un doble
// sin red y sin clave (inversión de dependencias).
export interface StreamLLM extends AsyncIterable<Anthropic.RawMessageStreamEvent> {
  finalMessage(): Promise<Pick<Anthropic.Message, "content" | "stop_reason">>;
}
export type CrearStream = (params: {
  messages: Anthropic.MessageParam[];
}) => StreamLLM;

export function crearStreamReal(client: Anthropic): CrearStream {
  return ({ messages }) =>
    client.messages.stream({
      model: MODELO,
      max_tokens: MAX_TOKENS,
      system: SISTEMA,
      tools: HERRAMIENTAS,
      messages,
      output_config: { effort: "low" },
      // OJO: sin temperature/top_p/prefill: los modelos actuales los rechazan.
    });
}

/** Mensaje de error apto para el usuario: nunca filtra detalles internos ni la clave. */
export function mensajeDeError(err: unknown): string {
  const status = (err as { status?: number } | null)?.status;
  // TODO 4: devuelve un mensaje distinto y SEGURO para 401, 429 y 5xx (nunca el texto del error original).
  void status;
  return "Algo ha fallado al generar la respuesta. Inténtalo de nuevo.";
}

export async function* generarRespuesta(
  mensajes: MensajeChat[],
  opts: { crearStream: CrearStream | null; esperaSimuladoMs?: number },
): AsyncGenerator<EventoServidor> {
  try {
    if (!opts.crearStream) {
      for await (const t of streamSimulado(mensajes, opts.esperaSimuladoMs)) {
        yield { type: "texto", texto: t };
      }
      yield { type: "fin" };
      return;
    }

    const historial: Anthropic.MessageParam[] = mensajes.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // TODO 3 (lección FS1.4 y FS1.5): bucle de herramientas con streaming.
    // Ahora solo hay UNA vuelta: se transmite el texto y se termina. Conviértelo en un bucle
    // de hasta MAX_VUELTAS que, mientras final.stop_reason === "tool_use":
    //   1) añada al historial el contenido COMPLETO del asistente (final.content),
    //   2) ejecute ejecutarHerramienta para CADA bloque tool_use (emite {type:"herramienta"}),
    //   3) añada UN solo mensaje de usuario con una tool_result por cada tool_use
    //      (tool_use_id, content, is_error).
    // Si se agotan las vueltas, emite un evento de error.
    void ejecutarHerramienta;
    const stream = opts.crearStream({ messages: historial });
    for await (const ev of stream) {
      if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
        yield { type: "texto", texto: ev.delta.text };
      }
    }
    await stream.finalMessage();
    yield { type: "fin" };
  } catch (err) {
    // El detalle va al log del servidor; al navegador solo un mensaje genérico.
    console.error("[chat] error:", err instanceof Error ? err.message : err);
    yield { type: "error", mensaje: mensajeDeError(err) };
  }
}
