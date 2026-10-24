# Módulo AI3 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh AI3`. Ten abierto el notebook; las demos usan el manual de TiendaSur y la base `proyecto-rag/tiendasur.db`. **Regla del módulo:** nunca se enseña una mejora sin enseñar la métrica antes y después.

## 3.1 · Por qué RAG y por qué lo primero es evaluar (15 min)
- [0–3] Gancho: pregunta al modelo por la política de devoluciones de TiendaSur; inventa una.
- [3–7] Las tres opciones (fine-tuning, contexto directo, RAG) y el pipeline completo en un diagrama.
- [7–12] El examen: 36 preguntas escritas «como un cliente» y la frase que contiene la respuesta. Qué es acierto@k y MRR.
- [12–15] Avance: al final del módulo habrá una tabla que compara variantes. Sin tabla no hay mejora, solo opinión.

## 3.2 · Embeddings (20 min)
- [0–5] Mapa semántico: «devolución» cerca de «reembolso»… ¿y si el modelo no lo sabe?
- [5–12] Por qué LSA en el curso (sin descargas, 3 segundos) y qué hace: n-gramas de letras + SVD. Demo de los cosenos.
- [12–17] Lo que LSA **no** capta: anular/cancelar. Enseñar que es una limitación buscada.
- [17–20] Cambiar de modelo = cambiar una función. Reglas: mismo modelo, reindexar, prefijos e5. Celda de Colab.

## 3.3 · Chunking (20 min)
- [0–5] El corte ingenuo en vivo: imprime dos chunks de 200 caracteres y mira dónde se rompen las frases.
- [5–12] Chunking por estructura con migas de pan; partir secciones largas por frases con solape.
- [12–17] Solape: cuándo ayuda y cuándo duplica.
- [17–20] Metadatos para citar y filtrar. Aviso: los chunks grandes inflan la métrica (lo veremos en el ejercicio 1).

## 3.4 · Bases vectoriales (20 min)
- [0–4] Los tres niveles: NumPy, extensión sin servidor, producción.
- [4–12] `sqlite-vec` en vivo: crear tabla, insertar vectores, consulta KNN, comprobar que coincide con NumPy.
- [12–17] Filtro por metadatos con JOIN.
- [17–20] El mismo diseño en pgvector: HNSW, `<=>`, consulta híbrida en SQL. Exacta vs aproximada y filtrar después de la búsqueda aproximada.

## 3.5 · Búsqueda híbrida (20 min)
- [0–6] BM25 desde cero: idf, saturación de frecuencia, longitud. Comparación con FTS5.
- [6–11] Dónde falla cada señal: BM25 con «anular», el vector con códigos.
- [11–17] RRF: ejemplo de dos listas a mano; por qué posiciones y no puntuaciones.
- [17–20] Qué hace cada motor (OpenSearch, Postgres) y cuidado: `ts_rank` no es BM25.

## 3.6 · Evaluar la recuperación (15 min)
- [0–5] Ejecutar la tabla 3×3. Leerla en el orden del apunte: chunking, variantes, preguntas.
- [5–11] Tabla de preguntas que fallan: clasificar cada fallo (vocabulario, información repartida, no está).
- [11–15] Ruido y tamaño de muestra: una pregunta = 0,03 de MRR. Qué haría falta para decidir en serio.

## 3.7 · Reranking (15 min)
- [0–4] Candidatos con recall alto y reranker con precisión. Límite: no rescata lo que no está.
- [4–9] Reranker léxico: resultado nulo o negativo. Por qué.
- [9–13] Reranker con Claude y `messages.parse`; validar ids; caché. Si hay clave, ejecutar y comparar.
- [13–15] Cross-encoder abierto y su tamaño (celda Colab).

## 3.8 · Generación con contexto citado (15 min)
- [0–5] El prompt: solo `<docs>`, citas, «no lo sé».
- [5–11] Umbral de relevancia: calibración con preguntas con y sin respuesta; la trampa de «Francia».
- [11–15] Defensa en dos capas: umbral + prompt. Ejecutar las cuatro preguntas.

## 3.9 · Agentes (20 min)
- [0–5] El bucle y los componentes. Qué añade respecto a AI2.
- [5–15] Código del agente: una `tool_result` por `tool_use` en un único mensaje; límite de vueltas. Incidencia del pedido 1042.
- [15–20] Su herramienta `buscar_docs` es la búsqueda híbrida medida: mejorar el RAG mejora al agente.

## 3.10 · Límites, router y MCP (15 min)
- [0–6] Las tres preguntas antes de crear un agente.
- [6–11] El router determinista en 6 líneas; el agente teatro.
- [11–15] Adelanto de MCP: de herramientas a medida a un servidor reutilizable (módulo AI10). Presentación del caso práctico.

Nota del instructor: las celdas **[API]** se saltan sin clave; el reranking con Claude y el agente solo se ejecutan con ella. Si grabas con clave, deja los resultados del reranker en pantalla y compáralos con los del léxico.
