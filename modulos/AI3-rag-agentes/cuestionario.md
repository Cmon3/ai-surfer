# Módulo AI3 · RAG y agentes — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** El chunking de un manual para RAG es mejor si…
- a) es de longitud fija exacta, p.ej. 512 tokens.
- b) respeta secciones/párrafos con un solape del 10–20 %.
- c) es de 50 tokens siempre.
- d) trocea por bytes.

---

**2.** Para calcular similitud entre el embedding de la consulta y los de los chunks, con vectores ya normalizados, es suficiente…
- a) producto punto (= coseno normalizado).
- b) distancia Manhattan.
- c) TF-IDF.
- d) cross-entropy.

---

**3.** El reranking con cross-encoder mejora porque…
- a) es más barato que el embedding.
- b) ve consulta y chunk **juntos**, lo que captura mejor la relevancia que el embedding por separado.
- c) sustituye al modelo de generación.
- d) reduce el chunking.

---

**4.** En el prompt de RAG, la regla "si no está en los documentos, di no lo sé" existe para…
- a) ahorrar tokens.
- b) reducir hallucinations por cortesía (el modelo inventa antes que admitir vacío).
- c) hacer el prompt más corto.
- d) mejorar el reranking.

---

**5.** En un agente con tools, el límite de vueltas del bucle…
- a) es opcional si el modelo es bueno.
- b) previene llamadas infinitas y coste desbocado.
- c) lo impone la API.
- d) solo es necesario con streaming.

---

**6.** La diferencia clave entre el tool-use del AI2 y un agente del AI3 es…
- a) el tamaño del vocabulario del modelo.
- b) el bucle: en el agente, el modelo planifica varias acciones seguidas.
- c) el coste del embedding.
- d) el número de chunks.

---

**7.** Si los embeddings de los chunks y los de la consulta se cálculan con **modelos distintos**, lo esperado es…
- a) mejor precisión por diversidad.
- b) comparación inválida: espacios vectoriales incompatibles.
- c) error de tipo en NumPy.
- d) nada: cualquier embedding funciona con cualquier embedding.

---

**8.** ¿Cuándo es mejor SQL/LIKE que RAG?
- a) Preguntas semánticas vagas ("¿qué me recomiendas?").
- b) Consultas exactas y estructuradas ("facturas de marzo del cliente 7").
- c) Preguntas con contexto ambiguo.
- d) Nada: RAG siempre.

---

**9.** Guardar metadatos (doc, sección) por chunk sirve para…
- a) acelerar el embedding.
- b) citar la fuente en la respuesta y filtrar (p.ej. buscar solo en facturas).
- c) comprimir el índice.
- d) hacer el chunking más rápido.

---

**10.** "Agentes teatro" es…
- a) un agente con muchas herramientas bien descritas.
- b) un bucle que ya está planificado en tu código y vendido como autónomo.
- c) un agente con límite de vueltas.
- d) un agente que no streaminga.

<details><summary>Soluciones</summary>

1. **b** 2. **a** 3. **b** 4. **b** 5. **b** 6. **b** 7. **b** 8. **b** 9. **b** 10. **b**
</details>
