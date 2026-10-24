import { generarRespuesta } from "@/lib/chat";
import { obtenerCrearStream } from "@/lib/config";
import { PeticionChat, codificarEvento } from "@/lib/protocolo";

// Esta ruta SIEMPRE se ejecuta en el servidor: process.env.ANTHROPIC_API_KEY nunca llega al navegador.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  let cuerpo: unknown;
  try {
    cuerpo = await req.json();
  } catch {
    return Response.json({ error: "JSON no válido" }, { status: 400 });
  }
  const parsed = PeticionChat.safeParse(cuerpo);
  if (!parsed.success) {
    return Response.json(
      { error: "Petición no válida", detalles: parsed.error.issues.map((i) => i.message) },
      { status: 422 },
    );
  }

  const encoder = new TextEncoder();
  const eventos = generarRespuesta(parsed.data.messages, { crearStream: obtenerCrearStream() });

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { value, done } = await eventos.next();
      if (done) controller.close();
      else controller.enqueue(encoder.encode(codificarEvento(value)));
    },
    async cancel() {
      await eventos.return(undefined); // el usuario cerró la pestaña: dejamos de generar
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
    },
  });
}
