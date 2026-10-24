import { describe, expect, it, vi } from "vitest";
import type Anthropic from "@anthropic-ai/sdk";
import { MAX_VUELTAS, generarRespuesta, mensajeDeError, type CrearStream, type StreamLLM } from "@/lib/chat";
import { obtenerCrearStream } from "@/lib/config";
import type { EventoServidor } from "@/lib/protocolo";

const usuario = (content: string) => [{ role: "user" as const, content }];

async function recoger(gen: AsyncGenerator<EventoServidor>) {
  const out: EventoServidor[] = [];
  for await (const e of gen) out.push(e);
  return out;
}

const delta = (text: string) =>
  ({ type: "content_block_delta", index: 0, delta: { type: "text_delta", text } }) as Anthropic.RawMessageStreamEvent;

function falsoStream(textos: string[], content: unknown[], stop_reason: string): StreamLLM {
  return {
    async *[Symbol.asyncIterator]() {
      for (const t of textos) yield delta(t);
    },
    finalMessage: async () => ({ content, stop_reason }) as never,
  };
}

describe("modo simulado", () => {
  it("transmite por trozos y termina con 'fin'", async () => {
    const ev = await recoger(generarRespuesta(usuario("¿Qué pasa con TS-1002?"), { crearStream: null, esperaSimuladoMs: 0 }));
    const textos = ev.filter((e) => e.type === "texto");
    expect(textos.length).toBeGreaterThan(3); // hay streaming real, no un único bloque
    const total = textos.map((e) => (e as { texto: string }).texto).join("");
    expect(total).toContain("preparando");
    expect(ev.at(-1)).toEqual({ type: "fin" });
  });

  it("sin clave, obtenerCrearStream devuelve null; con MODO_SIMULADO también", () => {
    expect(obtenerCrearStream({})).toBeNull();
    expect(obtenerCrearStream({ ANTHROPIC_API_KEY: "  " })).toBeNull();
    expect(obtenerCrearStream({ ANTHROPIC_API_KEY: "sk-x", MODO_SIMULADO: "true" })).toBeNull();
    expect(obtenerCrearStream({ ANTHROPIC_API_KEY: "sk-x" })).not.toBeNull();
  });
});

describe("bucle con herramienta", () => {
  it("ejecuta la herramienta y devuelve una tool_result por cada tool_use", async () => {
    const llamadas: Anthropic.MessageParam[][] = [];
    const uso = (id: string, ped: string) => ({ type: "tool_use", id, name: "consultar_pedido", input: { id_pedido: ped } });
    const crear: CrearStream = vi.fn(({ messages }) => {
      llamadas.push(structuredClone(messages));
      return llamadas.length === 1
        ? falsoStream([], [uso("t1", "TS-1001"), uso("t2", "TS-9999")], "tool_use")
        : falsoStream(["Tu pedido ", "va en camino"], [{ type: "text", text: "x" }], "end_turn");
    });

    const ev = await recoger(generarRespuesta(usuario("pedidos TS-1001 y TS-9999"), { crearStream: crear }));

    expect(ev.filter((e) => e.type === "herramienta")).toHaveLength(2);
    expect(ev.filter((e) => e.type === "texto").map((e) => (e as { texto: string }).texto).join("")).toBe("Tu pedido va en camino");
    expect(ev.at(-1)).toEqual({ type: "fin" });

    const segunda = llamadas[1]!;
    expect(segunda).toHaveLength(3); // user, assistant (completo), user (resultados)
    const resultados = segunda[2]!.content as Anthropic.ToolResultBlockParam[];
    expect(resultados.map((r) => r.tool_use_id)).toEqual(["t1", "t2"]);
    expect(resultados[0]!.is_error).toBe(false);
    expect(resultados[1]!.is_error).toBe(true); // el error también se devuelve al modelo
  });

  it("corta el bucle tras MAX_VUELTAS", async () => {
    const crear: CrearStream = () =>
      falsoStream([], [{ type: "tool_use", id: "t", name: "consultar_pedido", input: { id_pedido: "TS-1001" } }], "tool_use");
    const ev = await recoger(generarRespuesta(usuario("hola"), { crearStream: crear }));
    expect(ev.filter((e) => e.type === "herramienta")).toHaveLength(MAX_VUELTAS);
    expect(ev.at(-1)?.type).toBe("error");
  });
});

describe("errores", () => {
  it("traduce el error de la API a un mensaje seguro (sin filtrar la clave)", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const crear: CrearStream = () => {
      throw Object.assign(new Error("401 invalid x-api-key sk-ant-SECRETO"), { status: 401 });
    };
    const ev = await recoger(generarRespuesta(usuario("hola"), { crearStream: crear }));
    expect(ev).toHaveLength(1);
    expect(JSON.stringify(ev)).not.toContain("SECRETO");
    expect(ev[0]?.type).toBe("error");
    spy.mockRestore();
  });

  it("mensajeDeError distingue 429, 5xx y desconocidos", () => {
    expect(mensajeDeError({ status: 429 })).toContain("demanda");
    expect(mensajeDeError({ status: 503 })).toContain("no responde");
    expect(mensajeDeError(new Error("x"))).toContain("fallado");
  });
});
