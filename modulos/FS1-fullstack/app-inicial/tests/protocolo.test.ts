import { describe, expect, it } from "vitest";
import { PeticionChat, codificarEvento, decodificarLinea } from "@/lib/protocolo";
import { leerEventos } from "@/lib/leerStream";

describe("PeticionChat", () => {
  it("acepta una conversación válida", () => {
    expect(PeticionChat.safeParse({ messages: [{ role: "user", content: "hola" }] }).success).toBe(true);
  });
  it("rechaza roles inventados, vacío y último mensaje del asistente", () => {
    expect(PeticionChat.safeParse({ messages: [{ role: "system", content: "x" }] }).success).toBe(false);
    expect(PeticionChat.safeParse({ messages: [] }).success).toBe(false);
    expect(PeticionChat.safeParse({ messages: [{ role: "assistant", content: "x" }] }).success).toBe(false);
  });
  it("rechaza mensajes enormes", () => {
    const m = [{ role: "user", content: "a".repeat(4001) }];
    expect(PeticionChat.safeParse({ messages: m }).success).toBe(false);
  });
});

describe("NDJSON", () => {
  it("codifica y decodifica; ignora líneas rotas", () => {
    const linea = codificarEvento({ type: "texto", texto: "hola" });
    expect(decodificarLinea(linea.trim())).toEqual({ type: "texto", texto: "hola" });
    expect(decodificarLinea("{no json")).toBeNull();
  });

  it("reensambla líneas partidas entre trozos", async () => {
    const enc = new TextEncoder();
    const completo = codificarEvento({ type: "texto", texto: "ab" }) + codificarEvento({ type: "fin" });
    const corte = 7; // parte la primera línea por la mitad
    const cuerpo = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(enc.encode(completo.slice(0, corte)));
        c.enqueue(enc.encode(completo.slice(corte)));
        c.close();
      },
    });
    const eventos = [];
    for await (const e of leerEventos(cuerpo)) eventos.push(e);
    expect(eventos).toEqual([{ type: "texto", texto: "ab" }, { type: "fin" }]);
  });
});
