/** Preguntas de la prueba de nivel: recomiendan por qué bloque empezar. */
export interface Pregunta {
  bloque: "N1" | "N2" | "N3";
  texto: string;
  opciones: string[];
  correcta: number; // índice 0-based
}

export const preguntas: Pregunta[] = [
  // N1 · fundamentos (controlan si se puede empezar en N2)
  { bloque: "N1", texto: "En Python, ¿qué estructura de datos es la adecuada para almacenar pares clave-valor?", opciones: ["Una lista", "Un diccionario", "Una tupla", "Un conjunto"], correcta: 1 },
  { bloque: "N1", texto: "En SQL, ¿qué palabra clave combina filas de dos tablas según una columna común?", opciones: ["UNION", "JOIN", "GROUP BY", "WHERE"], correcta: 1 },
  { bloque: "N1", texto: "Si una muestra de 30 personas muestra un efecto, la media de la población…", opciones: ["Es exactamente igual a la de la muestra", "Tiene un intervalo de confianza alrededor de la media muestral", "Siempre es mayor que la media muestral", "No se puede estimar"], correcta: 1 },
  { bloque: "N1", texto: "El producto de una matriz (3×2) por una (2×4) da una matriz de dimensión…", opciones: ["3×4", "2×2", "6×8", "No se pueden multiplicar"], correcta: 0 },
  // N2 · machine learning (controlan si se puede pasar a una especialización)
  { bloque: "N2", texto: "Un modelo que acierta en entrenamiento pero falla en datos nuevos sufre…", opciones: ["Fuga de datos", "Sobreajuste", "Subajuste", "Colinealidad"], correcta: 1 },
  { bloque: "N2", texto: "En validación cruzada de 5 pliegues, ¿cuántas veces se usa cada observación para validar?", opciones: ["Cinco", "Una", "Ninguna", "Depende del modelo"], correcta: 1 },
  { bloque: "N2", texto: "El gradiente descendente actualiza los parámetros en la dirección…", opciones: ["Del gradiente", "Opuesta al gradiente", "Aleatoria", "De la segunda derivada"], correcta: 1 },
  { bloque: "N2", texto: "K-means agrupa datos minimizando…", opciones: ["La distancia máxima entre clústers", "La inercia (suma de distancias al centroide)", "La entropía", "El área bajo la curva ROC"], correcta: 1 },
  { bloque: "N2", texto: "Para probar si un cambio de web mejora la conversión, lo habitual es…", opciones: ["Un test A/B con hipótesis previa", "Regresión lineal", "Clustering", "Una red neuronal"], correcta: 0 },
  // N3 · pistas de especialización
  { bloque: "N3", texto: "¿Te interesa más… (a) demostrar que una acción de marketing causó las ventas, o (b) ajustar un LLM para que responda con el tono de tu marca?", opciones: ["(a) Causalidad y decisión", "(b) Modelos de lenguaje", "Las dos por igual", "Ninguna"], correcta: -1 },
  { bloque: "N3", texto: "Cuando no se puede hacer un experimento aleatorio, para estimar un efecto causal se puede usar…", opciones: ["Diferencias en diferencias", "Aumentar el tamaño de la muestra", "K-means", "Dropout"], correcta: 0 },
  { bloque: "N3", texto: "En RAG (generation aumentada por recuperación), los documentos se encuentran usando…", opciones: ["Expresiones regulares", "Embeddings y búsqueda vectorial", "SQL con LIKE", "Un test de hipótesis"], correcta: 1 },
];
