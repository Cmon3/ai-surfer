import { z } from "zod";

// Contrato entre navegador y servidor. Se valida en el servidor: el cliente puede mentir.
export const MensajeChat = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});
export type MensajeChat = z.infer<typeof MensajeChat>;

export const PeticionChat = z.object({
  messages: z
    .array(MensajeChat)
    .min(1)
    .max(30)
    .refine((m) => m[m.length - 1]?.role === "user", "El último mensaje debe ser del usuario"),
});
export type PeticionChat = z.infer<typeof PeticionChat>;

// Eventos que el servidor envía al navegador, uno por línea (NDJSON).
export type EventoServidor =
  | { type: "texto"; texto: string }
  | { type: "herramienta"; nombre: string }
  | { type: "error"; mensaje: string }
  | { type: "fin" };

export function codificarEvento(e: EventoServidor): string {
  return JSON.stringify(e) + "\n";
}

export function decodificarLinea(linea: string): EventoServidor | null {
  try {
    const obj = JSON.parse(linea) as EventoServidor;
    return typeof obj === "object" && obj !== null && "type" in obj ? obj : null;
  } catch {
    return null;
  }
}
