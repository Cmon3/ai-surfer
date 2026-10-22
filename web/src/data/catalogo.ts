/**
 * Fuente de verdad de la web: catálogo de módulos e itinerarios.
 * Los materiales viven en ../../modulos/<codigo>/; esta capa solo describe
 * orden, estado y certificados. Ver docs/plan-v2-itinerarios-y-plataforma.md.
 */

export type Estado = "disponible" | "en-preparacion";

export interface Modulo {
  codigo: string;          // F1, I3, AI5...
  carpeta: string | null;  // nombre de la carpeta en modulos/, null si no existe aún
  titulo: string;
  estado: Estado;
}

export interface Itinerario {
  slug: string;
  nombre: string;
  subtitulo: string;
  semanas: string;
  horasSemana?: string;
  descripcion: string;
  certificado: string;
  color: string; // acento para tarjetas y barras
  modulos: (Modulo & { nota?: string })[];
  proyecto: string;
  siguiente?: string; // slugs a los que enlaza
  anterior?: string;
}

export const itinerarios: Itinerario[] = [
  {
    slug: "n1-fundamentos",
    nombre: "N1 · Fundamentos",
    subtitulo: "Python, SQL, estadística, matemáticas y Git",
    semanas: "6 semanas",
    horasSemana: "~8 h/semana",
    descripcion:
      "Para quien empieza desde cero o necesita una base sólida antes del núcleo de machine learning.",
    certificado: "Fundamentos de Ciencia de Datos",
    color: "#7f77dd",
    modulos: [
      { codigo: "F1", carpeta: "F1-python", titulo: "Python para datos", estado: "disponible" },
      { codigo: "F2", carpeta: "F2-sql", titulo: "SQL para análisis de datos", estado: "disponible" },
      { codigo: "F3", carpeta: "F3-estadistica", titulo: "Estadística para la toma de decisiones", estado: "disponible" },
      { codigo: "F4", carpeta: null, titulo: "Matemáticas para ML", estado: "en-preparacion", nota: "Vectores y matrices, derivadas y gradiente, probabilidad; todo con NumPy." },
      { codigo: "F5", carpeta: null, titulo: "Herramientas del oficio", estado: "en-preparacion", nota: "Terminal, Git y GitHub, entornos y buenas prácticas en notebooks." },
    ],
    proyecto: "Análisis exploratorio completo de un conjunto de datos público, con SQL + pandas e informe.",
    siguiente: "n2-intermedio",
  },
  {
    slug: "n2-intermedio",
    nombre: "N2 · Intermedio",
    subtitulo: "El núcleo de machine learning",
    semanas: "10 semanas",
    horasSemana: "~8 h/semana",
    descripcion:
      "Aprendizaje supervisado y no supervisado, deep learning, series temporales, LLMs por API y del notebook a producción.",
    certificado: "Machine Learning Aplicado",
    color: "#4c9fde",
    modulos: [
      { codigo: "I1", carpeta: "I1-no-supervisado", titulo: "Aprendizaje no supervisado", estado: "disponible" },
      { codigo: "I2", carpeta: "I2-regresion", titulo: "Regresión y predicción", estado: "disponible" },
      { codigo: "I3", carpeta: "I3-clasificacion", titulo: "Clasificación y pruebas de hipótesis", estado: "disponible" },
      { codigo: "I4", carpeta: null, titulo: "Ingeniería de variables y gradient boosting", estado: "en-preparacion", nota: "XGBoost/LightGBM, validación, fuga de datos, SHAP." },
      { codigo: "I5", carpeta: "I5-deep-learning", titulo: "Deep learning con PyTorch", estado: "disponible" },
      { codigo: "I6", carpeta: "I6-series-temporales", titulo: "Series temporales", estado: "disponible" },
      { codigo: "I7", carpeta: "I7-llms-api", titulo: "Introducción a los LLMs por API", estado: "disponible" },
      { codigo: "I8", carpeta: null, titulo: "Del notebook a producción", estado: "en-preparacion", nota: "Código modular, tests, FastAPI, Docker y MLflow." },
    ],
    proyecto: "Modelo predictivo desplegado como API, con informe de negocio.",
    anterior: "n1-fundamentos",
    siguiente: "n3-ai-engineering", // y n3-data-science (se muestran ambos)
  },
  {
    slug: "n3-data-science",
    nombre: "N3-DS · Data Science avanzada",
    subtitulo: "Causalidad, experimentación y modelos a escala",
    semanas: "10 semanas",
    descripcion:
      "Para analistas y data scientists que quieren llegar a puestos senior: decisiones de producto, experimentación y modelos a escala.",
    certificado: "Data Science Avanzada",
    color: "#3da08a",
    modulos: [
      { codigo: "DS1", carpeta: null, titulo: "Inferencia causal", estado: "en-preparacion" },
      { codigo: "DS2", carpeta: null, titulo: "Experimentación avanzada", estado: "en-preparacion" },
      { codigo: "DS3", carpeta: null, titulo: "Estadística bayesiana", estado: "en-preparacion" },
      { codigo: "DS4", carpeta: "DS4-recomendacion", titulo: "Sistemas de recomendación", estado: "disponible" },
      { codigo: "DS5", carpeta: "DS5-redes-grafos", titulo: "Redes y grafos", estado: "disponible" },
      { codigo: "DS6", carpeta: null, titulo: "Forecasting avanzado", estado: "en-preparacion" },
      { codigo: "DS7", carpeta: null, titulo: "Datos a escala", estado: "en-preparacion" },
      { codigo: "DS8", carpeta: null, titulo: "Comunicación y producto de datos", estado: "en-preparacion" },
    ],
    proyecto: "Capstone DS: problema real con decisión causal o experimental.",
    anterior: "n2-intermedio",
  },
  {
    slug: "n3-ai-engineering",
    nombre: "N3-AI · AI Engineering",
    subtitulo: "Transformers, RAG, fine-tuning y LLMs en producción",
    semanas: "12 semanas",
    descripcion:
      "Orientada a puestos como AI/LLM Engineer: post-entrenamiento, evaluación y producción de sistemas con modelos de lenguaje.",
    certificado: "AI Engineering",
    color: "#d4896a",
    modulos: [
      { codigo: "AI1", carpeta: null, titulo: "Transformers por dentro", estado: "en-preparacion" },
      { codigo: "AI2", carpeta: null, titulo: "Aplicaciones con LLMs", estado: "en-preparacion" },
      { codigo: "AI3", carpeta: null, titulo: "RAG y agentes", estado: "en-preparacion" },
      { codigo: "AI4", carpeta: null, titulo: "Evaluación de LLMs", estado: "en-preparacion" },
      { codigo: "AI5", carpeta: null, titulo: "Fine-tuning supervisado", estado: "en-preparacion" },
      { codigo: "AI6", carpeta: null, titulo: "Alineación y post-entrenamiento", estado: "en-preparacion" },
      { codigo: "AI7", carpeta: null, titulo: "Inferencia y despliegue", estado: "en-preparacion" },
      { codigo: "AI8", carpeta: null, titulo: "Seguridad, moderación y LLMOps", estado: "en-preparacion" },
      { codigo: "AI9", carpeta: null, titulo: "Multimodal (optativo)", estado: "en-preparacion" },
    ],
    proyecto: "Capstone AI: ajustar un modelo abierto pequeño, con evaluación propia y despliegue. Se publica en Hugging Face.",
    anterior: "n2-intermedio",
  },
];

export function itinerario(slug: string) {
  return itinerarios.find((i) => i.slug === slug);
}

/** Módulos disponibles (con carpeta en modulos/). */
export function modulosDisponibles() {
  return itinerarios.flatMap((i) =>
    i.modulos
      .filter((m) => m.carpeta && m.estado === "disponible")
      .map((m) => ({ ...m, itinerario: i }))
  );
}
