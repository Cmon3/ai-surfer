---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI3 · RAG y agentes
## Recuperación que se mide, y herramientas con límites

*AI Surfer · N3-AI Engineering*

---

# Qué piden las ofertas (oct. 2026)

- RAG con **base vectorial real** (pgvector, OpenSearch…)
- **Chunking** razonado, **búsqueda híbrida**, **reranking**
- **Evaluación** de la recuperación
- Agentes y **MCP** (módulo AI10)

Al terminar: un RAG con **tabla de métricas** para el portafolio.

---

# Mapa del módulo

| Pieza | Qué aporta |
|---|---|
| Examen (preguntas + frase) | Saber si mejoras |
| Chunking por estructura | Recuperar sin romper el sentido |
| `sqlite-vec` / pgvector | Base vectorial persistente y filtrable |
| BM25 + vector + RRF | Robustez |
| Reranking | Precisión en los primeros puestos |
| Agente / router | Acción, con límites |

---

# El pipeline

```
Docs → chunks → embeddings → base vectorial (+ BM25)
Consulta → híbrida → rerank → prompt con citas → respuesta
```

Si la recuperación falla, la respuesta falla… con seguridad.

---

# Primero el examen

- 36 preguntas escritas **como las escribe un cliente**
- Cada una con la frase que contiene la respuesta
- **acierto@k:** ¿hay un correcto entre los k primeros?
- **MRR:** premia que el correcto sea el primero

Una pregunta = ~0,03 de MRR: cuidado con el ruido.

---

# Embeddings sin descargas

- TF-IDF de letras + SVD (**LSA**): 32 dimensiones, segundos
- Capta `devolver` ≈ `devolución`; **no** `anular` ≈ `cancelar`
- Cambiar a un modelo preentrenado = cambiar **una función**
- Mismo modelo para chunks y consultas; si cambias, reindexa

---

# Chunking: tres estrategias

| | Problema |
|---|---|
| Ventana fija | Parte frases |
| Con solape | Duplicados |
| **Por estructura** | Partir lo muy largo |

**Migas de pan** dentro del texto: `Devoluciones - Reembolso: …`

Ojo: chunks grandes inflan la métrica y meten ruido.

---

# Base vectorial real

```sql
-- sqlite-vec
CREATE VIRTUAL TABLE vec_chunks
  USING vec0(embedding float[32] distance_metric=cosine);

-- pgvector (producción)
CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);
SELECT id FROM chunks ORDER BY embedding <=> $1 LIMIT 5;
```

Metadatos en una tabla, vectores en otra, unidas por id.

---

# Búsqueda híbrida

- **BM25:** palabras exactas, códigos, cifras
- **Vector:** paráfrasis y morfología
- **RRF:** `Σ 1/(k + posición)` — sin calibrar escalas

La híbrida da **robustez**, no siempre el mejor número.

---

# Medir: 3 chunkings × 3 variantes

- ¿Qué cambia más: chunking o variante?
- ¿Dónde gana cada señal?
- ¿Qué preguntas fallan y por qué?

Sin tabla no hay mejora, solo opinión.

---

# Reranking

- Búsqueda: recall alto · Reranker: precisión
- Léxico · cross-encoder · LLM
- **No rescata lo que no está** entre los N candidatos
- En el notebook el léxico no mejora: ¿por qué?

---

# Generación con citas

```
Responde SOLO con <docs>. Cita [id].
Si no está: "no lo sé".
```

Dos capas: **umbral de relevancia** + prompt.
La trampa: «capital de **Francia**».

---

<!-- _class: lead -->
# Agentes

---

# El bucle del agente

```
tarea → LLM → herramienta → resultado → LLM → … → respuesta
```

- Una `tool_result` por **cada** `tool_use`, en un solo mensaje
- Límite de vueltas **siempre**
- Su `buscar_docs` es tu búsqueda híbrida

---

# Cuándo NO agente

- Flujo determinista → **script**
- Una decisión → function calling
- Planificación real → agente

El mejor agente suele ser un buen `if`.

**MCP:** herramientas reutilizables como servidor → módulo AI10.

---

<!-- _class: lead -->
# Resumen

**Examen → chunking → base vectorial → híbrida → rerank → citas → (agente)**

Siguiente: AI4 · evaluación de LLMs, y AI10 · MCP.
