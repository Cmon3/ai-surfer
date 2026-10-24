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
  if (status === 401) return "El servicio no está bien configurado (credenciales). Avisa al equipo.";
  if (status === 429) return "Hay mucha demanda ahora mismo. Inténtalo de nuevo en unos segundos.";
  if (status !== undefined && status >= 500) return "El servicio de IA no responde. Inténtalo más tarde.";
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

    for (let vuelta = 0; vuelta < MAX_VUELTAS; vuelta++) {
      const stream = opts.crearStream({ messages: historial });
      for await (const ev of stream) {
        if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
          yield { type: "texto", texto: ev.delta.text };
        }
      }
      const final = await stream.finalMessage();

      const usos = final.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
      );
      if (final.stop_reason !== "tool_use" || usos.length === 0) {
        yield { type: "fin" };
        return;
      }

      // Regla de la API: devolver el contenido COMPLETO del asistente y una tool_result
      // por CADA tool_use, todas en un único mensaje de usuario.
      historial.push({ role: "assistant", content: final.content as Anthropic.ContentBlockParam[] });
      const resultados: Anthropic.ToolResultBlockParam[] = [];
      for (const uso of usos) {
        yield { type: "herramienta", nombre: uso.name };
        const r = ejecutarHerramienta(uso.name, uso.input);
        resultados.push({
          type: "tool_result",
          tool_use_id: uso.id,
          content: r.contenido,
          is_error: r.esError,
        });
      }
      historial.push({ role: "user", content: resultados });
    }
    yield { type: "error", mensaje: "La consulta ha necesitado demasiados pasos. Reformula la pregunta." };
  } catch (err) {
    // El detalle va al log del servidor; al navegador solo un mensaje genérico.
    console.error("[chat] error:", err instanceof Error ? err.message : err);
    yield { type: "error", mensaje: mensajeDeError(err) };
  }
}
