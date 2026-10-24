/**
 * Rutas por rol (plan v3, sección 4). Los itinerarios N1–N3 ordenan el
 * aprendizaje; las rutas responden a «quiero trabajar de X» y reutilizan los
 * mismos módulos. Aquí solo se listan códigos: el título y el estado salen del
 * catálogo; los módulos que aún no están en el catálogo (AI10, CAR, CL1, FS1)
 * se muestran «en preparación» con el título de `PENDIENTES`. Cuando el
 * coordinador los añada a catalogo.ts, el catálogo manda.
 */
import { itinerarios, type Estado } from "./catalogo";

export interface ModuloRuta {
  codigo: string;
  titulo: string;
  estado: Estado;
  enlazable: boolean; // tiene página en /modulos/
}
export interface Ruta {
  slug: string;
  nombre: string;
  resumen: string;
  color: string;
  grupos: { etiqueta: string; codigos: string[] }[];
  portafolio: string[];
}

const PENDIENTES: Record<string, string> = {
  AI10: "Agentes en producción: MCP, orquestación y observabilidad",
  CAR: "Empleabilidad: portafolio, entrevistas y búsqueda",
  CL1: "Cloud para datos e IA",
  FS1: "Full-stack para AI Engineers",
};

export function resolverModulo(codigo: string): ModuloRuta {
  for (const it of itinerarios) {
    const m = it.modulos.find((x) => x.codigo === codigo);
    if (m) return { codigo, titulo: m.titulo, estado: m.estado, enlazable: !!m.carpeta && m.estado === "disponible" };
  }
  return { codigo, titulo: PENDIENTES[codigo] ?? codigo, estado: "en-preparacion", enlazable: false };
}

const N1 = ["F1", "F2", "F3", "F4", "F5"];
const N2 = ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8"];
const AI_BASE = [
  { etiqueta: "N1 (lo imprescindible)", codigos: ["F1", "F2", "F5"] },
  { etiqueta: "N2 (lo imprescindible)", codigos: ["I3", "I7", "I8"] },
  { etiqueta: "N3-AI", codigos: ["AI1", "AI2", "AI3", "AI4", "AI8", "AI10"] },
  { etiqueta: "Transversal", codigos: ["CL1", "CAR"] },
];

export const rutas: Ruta[] = [
  {
    slug: "data-scientist",
    nombre: "Data Scientist",
    resumen: "Analizar, modelar y medir el impacto de las decisiones: del dato limpio al experimento o estudio causal.",
    color: "#4c9fde",
    grupos: [
      { etiqueta: "N1 · Fundamentos", codigos: N1 },
      { etiqueta: "N2 · Intermedio", codigos: N2 },
      { etiqueta: "N3-DS", codigos: ["DS1", "DS2", "DS3", "DS8"] },
      { etiqueta: "Transversal", codigos: ["CAR"] },
    ],
    portafolio: [
      "Análisis con decisión de negocio (proyecto N1)",
      "Modelo desplegado (I8 / proyecto N2)",
      "Experimento A/B o estudio causal (capstone DS)",
    ],
  },
  {
    slug: "ml-engineer",
    nombre: "ML Engineer / MLOps",
    resumen: "Llevar modelos a producción y mantenerlos: despliegue, monitorización, nube y pipelines de datos.",
    color: "#3da08a",
    grupos: [
      { etiqueta: "N1 · Fundamentos", codigos: N1 },
      { etiqueta: "N2 · Intermedio", codigos: N2 },
      { etiqueta: "Especialización", codigos: ["CL1", "DS7"] },
      { etiqueta: "Transversal", codigos: ["CAR"] },
    ],
    portafolio: [
      "Repositorio de I8 desplegado en la nube con monitorización",
      "Pipeline de datos orquestado",
      "Modelo con CI en verde e informe de negocio",
    ],
  },
  {
    slug: "ai-engineer",
    nombre: "AI Engineer",
    resumen: "Construir sistemas con modelos de lenguaje: aplicaciones, RAG, agentes con herramientas (MCP), evaluación y seguridad.",
    color: "#d4896a",
    grupos: AI_BASE,
    portafolio: [
      "Sistema RAG evaluado",
      "Agente con servidor MCP propio y evals en CI",
      "Capstone AI (opción B: agente con MCP, evaluación y despliegue)",
    ],
  },
  {
    slug: "forward-deployed-engineer",
    nombre: "Forward Deployed Engineer",
    resumen: "AI Engineer de cara al cliente: descubrir el problema, prototipar rápido de extremo a extremo y comunicarlo.",
    color: "#7f77dd",
    grupos: [...AI_BASE, { etiqueta: "Específico del rol", codigos: ["FS1", "AI9"] }],
    portafolio: [
      "Demo full-stack para un «cliente» con discovery documentado",
      "Agente de voz o multimodal (AI9)",
      "Las piezas de la ruta AI Engineer",
    ],
  },
  {
    slug: "llm-post-training",
    nombre: "LLM post-training",
    resumen: "Nicho con plus salarial: ajustar, alinear y servir modelos abiertos con evaluación rigurosa.",
    color: "#b3562a",
    grupos: [...AI_BASE, { etiqueta: "Post-entrenamiento", codigos: ["AI5", "AI6", "AI7"] }],
    portafolio: [
      "Modelo ajustado y publicado en Hugging Face",
      "Evaluación frente al modelo base",
      "Informe de coste y latencia de inferencia (AI7)",
    ],
  },
];
