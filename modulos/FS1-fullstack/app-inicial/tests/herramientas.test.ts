import { describe, expect, it } from "vitest";
import { ejecutarHerramienta } from "@/lib/herramientas";

describe("consultar_pedido", () => {
  it("devuelve el pedido sin el nombre del cliente", () => {
    const r = ejecutarHerramienta("consultar_pedido", { id_pedido: "ts-1001" });
    expect(r.esError).toBe(false);
    const datos = JSON.parse(r.contenido);
    expect(datos.estado).toBe("enviado");
    expect(datos.cliente).toBeUndefined();
  });

  it("rechaza identificadores con formato inválido", () => {
    const r = ejecutarHerramienta("consultar_pedido", { id_pedido: "1001; DROP TABLE" });
    expect(r.esError).toBe(true);
    expect(r.contenido).toContain("TS-0000");
  });

  it("rechaza entradas con forma incorrecta", () => {
    expect(ejecutarHerramienta("consultar_pedido", {}).esError).toBe(true);
    expect(ejecutarHerramienta("consultar_pedido", null).esError).toBe(true);
  });

  it("informa de pedidos inexistentes y de herramientas desconocidas", () => {
    expect(ejecutarHerramienta("consultar_pedido", { id_pedido: "TS-9999" }).contenido).toContain("No existe");
    expect(ejecutarHerramienta("borrar_todo", {}).esError).toBe(true);
  });
});
