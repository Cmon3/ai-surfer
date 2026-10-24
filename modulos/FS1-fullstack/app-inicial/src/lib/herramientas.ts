import { z } from "zod";
import type Anthropic from "@anthropic-ai/sdk";
import { buscarPedido } from "./pedidos";

// 1) El esquema Zod es la ÚNICA fuente de verdad del contrato de la herramienta.
//    Lo que escribe el modelo es entrada no confiable: se valida igual que una petición HTTP.
// TODO 1 (lección FS1.5): define el esquema Zod de la entrada.
// Requisitos: un campo `id_pedido` (string), sin espacios sobrantes, en mayúsculas,
// con formato TS-0000 y el mensaje "El identificador debe tener el formato TS-0000".
// Pistas: z.object, z.string().trim().toUpperCase().regex(...)
export const EntradaConsultarPedido = z.object({
  id_pedido: z.string(), // <- reemplaza por la versión estricta
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
  // TODO 2: valida `entrada` con safeParse. Si falla, devuelve esError: true con los mensajes
  // de los issues. Si pasa, busca el pedido con buscarPedido; si no existe, devuelve
  // "No existe el pedido ..." con esError: true. Si existe, devuelve el JSON del pedido
  // SIN el campo `cliente` (mínimo privilegio) con esError: false.
  void buscarPedido;
  void entrada;
  return { contenido: "TODO: herramienta no implementada", esError: true };
}
