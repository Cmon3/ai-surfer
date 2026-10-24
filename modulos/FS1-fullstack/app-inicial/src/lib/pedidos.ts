// Datos de ejemplo de TiendaSur. En un proyecto real esto sería una base de datos
// o la API del ERP: aquí lo mantenemos en memoria para centrarnos en el patrón.

export type EstadoPedido = "preparando" | "enviado" | "entregado" | "cancelado";

export interface Pedido {
  id: string;
  cliente: string;
  estado: EstadoPedido;
  articulos: string[];
  totalEuros: number;
  entregaPrevista: string | null; // ISO, null si cancelado
}

export const PEDIDOS: Record<string, Pedido> = {
  "TS-1001": {
    id: "TS-1001",
    cliente: "Lucía Romero",
    estado: "enviado",
    articulos: ["Café de Colombia 1 kg", "Molinillo manual"],
    totalEuros: 48.9,
    entregaPrevista: "2026-10-26",
  },
  "TS-1002": {
    id: "TS-1002",
    cliente: "Marcos Peña",
    estado: "preparando",
    articulos: ["Cafetera italiana 6 tazas"],
    totalEuros: 27.5,
    entregaPrevista: "2026-10-29",
  },
  "TS-1003": {
    id: "TS-1003",
    cliente: "Ana Beltrán",
    estado: "entregado",
    articulos: ["Café de Etiopía 500 g", "Filtros V60 x100"],
    totalEuros: 21.0,
    entregaPrevista: "2026-10-20",
  },
  "TS-1004": {
    id: "TS-1004",
    cliente: "Iván Cruz",
    estado: "cancelado",
    articulos: ["Taza de cerámica x4"],
    totalEuros: 32.0,
    entregaPrevista: null,
  },
};

export function buscarPedido(id: string): Pedido | undefined {
  return PEDIDOS[id];
}
