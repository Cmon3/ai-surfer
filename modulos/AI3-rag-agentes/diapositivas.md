---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI3 · RAG y agentes
## Dar conocimiento y dar acción a un LLM

*AI Surfer · N3-AI Engineering*

---

# Mapa del módulo

| Pieza | Qué aporta |
|---|---|
| RAG | Conocimiento propio, actual, citado |
| Chunking | Recuperación que no rompe el sentido |
| Embeddings + top-k | Buscar por significado |
| Agentes | Bucle de herramientas con planificación |
| Router determinista | El 80 % de los casos, sin LLM en el bucle |

---

<!-- _class: lead -->
# RAG: el pipeline

---

# Pipeline completo

```
Documentos → chunks → embeddings → índice
Consulta → lookup top-k → contexto en el prompt → respuesta citada
```

Ventajas: actualizable al instante, trazable, barato.
Riesgo: si la recuperación falla, la respuesta confía en basura.

---

# Chunking (el detalle que decide la calidad)

- 200–500 tokens por chunk
- **Solape 10–20 %** entre vecinos
- Corta por **estructura** (títulos, secciones), no solo por longitud
- Guarda metadatos (doc, sección) para citar y filtrar

---

# Embeddings

- Texto → vector de ~384–1536 dimensiones
- Cercanía = **similitud semántica** (no palabras)
- **Mismo modelo** para chunks y consulta
- Stand-in del notebook: TF-IDF (cambia solo `encodar()`)

---

# El índice y el reranking

- Lookup top-k con coseno (NumPy para juguete; FAISS/pgvector para millón)
- Embedding = rápido pero **burdo**
- Cross-encoder reordena los k mejores → **fino pero caro**
- Rerank después, no antes

---

# Generación con contexto citado

```
Responde SOLO con lo que esté en <docs>.
Citas: [chunkId]. Si no está: di exactamente "no lo sé".
```

El "no lo sé" salva del hallucination de cortesía.

---

<!-- _class: lead -->
# Agentes

## El bucle de AI2 con planificación

---

# El bucle del agente

```
tarea → LLM decide → herramienta → resultado → LLM → … → respuesta final
```

- Límite de vueltas **siempre** (coste y bucles infinitos)
- El agente sirve cuando la secuencia de acciones no se puede anticipar
- El historial (tool_use + tool_result) es su memoria

---

# El anti-teatro: cuándo NO agente

- Flujo determinista → script normal (el 80 % de los "agentes")
- Una sola decisión → function calling simple (AI2)
- Planificación real → sí, agente

El mejor agente suele ser un buen `if/else`.

---

<!-- _class: lead -->
# Resumen

**Chunking → embeddings → top-k → prompt citado → (si hace falta) agente**

Lo que sigue: AI4 · evaluación de LLMs — porque sin eval, nada de esto se puede mejorar.
