import { z } from "zod";
import type Anthropic from "@anthropic-ai/sdk";
import { buscarPedido } from "./pedidos";

// 1) El esquema Zod es la ÚNICA fuente de verdad del contrato de la herramienta.
//    Lo que escribe el modelo es entrada no confiable: se valida igual que una petición HTTP.
export const EntradaConsultarPedido = z.object({
  id_pedido: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^TS-\d{4}$/, "El identificador debe tener el formato TS-0000"),
});
export type EntradaConsultarPedido = z.infer<typeof EntradaConsultarPedido>;

// 2) Definición que se envía a Claude (JSON Schema).
export const HERRAMIENTAS: Anthropic.Tool[] = [
  {
    name: "consultar_pedido",
    description:
      "Consulta el estado de un pedido de TiendaSur (artículos, total, fecha de entrega prevista). " +
      "Úsala cuando el cliente mencione un número de pedido con formato TS-0000.",
    input_schema: {
      type: "object",
      properties: {
        id_pedido: {
          type: "string",
          description: "Identificador del pedido, por ejemplo TS-1001",
        },
      },
      required: ["id_pedido"],
    },
  },
];

export interface ResultadoHerramienta {
  contenido: string;
  esError: boolean;
}

// 3) Ejecutor: nunca lanza excepciones hacia el bucle; devuelve un resultado (posiblemente de error)
//    que el modelo puede leer y explicar al cliente.
export function ejecutarHerramienta(nombre: string, entrada: unknown): ResultadoHerramienta {
  if (nombre !== "consultar_pedido") {
    return { contenido: `Herramienta desconocida: ${nombre}`, esError: true };
  }
  const parsed = EntradaConsultarPedido.safeParse(entrada);
  if (!parsed.success) {
    return {
      contenido: `Entrada no válida: ${parsed.error.issues.map((i) => i.message).join("; ")}`,
      esError: true,
    };
  }
  const pedido = buscarPedido(parsed.data.id_pedido);
  if (!pedido) {
    return { contenido: `No existe el pedido ${parsed.data.id_pedido}`, esError: true };
  }
  // Principio de mínimo privilegio: no devolvemos el nombre del cliente al modelo
  // porque la respuesta no lo necesita.
  const { cliente: _cliente, ...publico } = pedido;
  return { contenido: JSON.stringify(publico), esError: false };
}
