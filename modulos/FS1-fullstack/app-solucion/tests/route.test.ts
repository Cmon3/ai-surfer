import { describe, expect, it, beforeEach } from "vitest";
import { POST } from "@/app/api/chat/route";
import { leerEventos } from "@/lib/leerStream";

beforeEach(() => {
  delete process.env.ANTHROPIC_API_KEY; // fuerza el modo simulado
});

const peticion = (cuerpo: unknown) =>
  new Request("http://localhost/api/chat", { method: "POST", body: typeof cuerpo === "string" ? cuerpo : JSON.stringify(cuerpo) });

describe("POST /api/chat", () => {
  it("400 si el JSON está roto y 422 si el contrato no se cumple", async () => {
    expect((await POST(peticion("{roto"))).status).toBe(400);
    expect((await POST(peticion({ messages: [] }))).status).toBe(422);
  });

  it("responde en streaming NDJSON sin clave", async () => {
    const resp = await POST(peticion({ messages: [{ role: "user", content: "TS-1003" }] }));
    expect(resp.status).toBe(200);
    expect(resp.headers.get("content-type")).toContain("ndjson");
    let texto = "";
    for await (const e of leerEventos(resp.body!)) if (e.type === "texto") texto += e.texto;
    expect(texto).toContain("entregado");
  });
});
