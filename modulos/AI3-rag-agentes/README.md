# Módulo AI3 · RAG y agentes

**Semanas 5–6 de N3-AI · ~12 horas** · Cómo dar al LLM conocimiento externo (RAG) con una **recuperación que se mide**, y cómo convertirlo en un actor que usa herramientas (agentes) — y cuándo cada patrón falla.

## Qué piden las ofertas
En las ofertas de *AI Engineer* y *Forward Deployed Engineer* de octubre de 2026, «RAG» ya no significa «metí PDFs en un índice». Se pide: **bases vectoriales reales** (pgvector, OpenSearch, Qdrant…), ***chunking*** razonado, **búsqueda híbrida**, ***reranking***, **evaluación de la recuperación** y, cada vez más, **MCP** (módulo AI10). Este módulo cubre todo menos MCP, y termina en una pieza de portafolio con una tabla de métricas.

## Objetivos
Al terminar este módulo podrás:
- Explicar el pipeline RAG completo: **chunking → embeddings → base vectorial → recuperación → reranking → generación**.
- Montar una **base vectorial real sin servidor** (SQLite + `sqlite-vec`) y escribir el SQL equivalente en **pgvector**.
- Elegir y comparar estrategias de **chunking**: ventana fija, con solape y por estructura (con migas de pan).
- Implementar **BM25** y la **búsqueda híbrida** con fusión **RRF**, y saber cuándo gana cada señal.
- Aplicar **reranking** (léxico, cross-encoder o con un LLM) y entender sus límites.
- **Evaluar la recuperación** con acierto@k y MRR, y decidir con datos qué variante usar.
- Definir un **agente**: rol, herramientas, bucle de decisión y límites de iteración; y reconocer cuándo basta un *router* determinista.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 3.1 | Por qué RAG, y por qué lo primero es la evaluación | 15 min |
| 3.2 | Embeddings: de texto a vectores, y qué modelo elegir | 20 min |
| 3.3 | Chunking: fijo, con solape y por estructura | 20 min |
| 3.4 | Bases vectoriales: `sqlite-vec` y pgvector | 20 min |
| 3.5 | Búsqueda híbrida: BM25 + vector + RRF | 20 min |
| 3.6 | Evaluar la recuperación: acierto@k y MRR | 15 min |
| 3.7 | *Reranking*: cross-encoders y LLM como reranker | 15 min |
| 3.8 | Generación con contexto citado y «no lo sé» | 15 min |
| 3.9 | Agentes: el bucle decide → herramienta → observa | 20 min |
| 3.10 | Límites, router determinista y una nota sobre MCP | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; PDF con `scripts/generar_diapositivas.sh AI3`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada: RAG medido de principio a fin + agente |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos por lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — asistente de soporte de **TiendaSur** sobre un manual de atención al cliente (~1.000 palabras) con 36 preguntas de evaluación redactadas como las escribiría un cliente. Construyes: tres estrategias de *chunking*; embeddings locales (TF-IDF de letras + SVD); una base vectorial en un archivo SQLite con `sqlite-vec`; BM25 desde cero (y comparado con FTS5); fusión RRF; reranking léxico y con Claude; una tabla de acierto@k y MRR para 3 chunkings × 3 variantes; la generación con citas y umbral de «no lo sé»; y un agente con tres herramientas.

**Requisitos:** `pip install sqlite-vec` (unos KB; en Colab, `%pip install sqlite-vec`). Todo corre en CPU, sin descargas y **sin clave de API**; las celdas **[API]** (generación, agente y reranking con Claude) se saltan o simulan sin clave. Escribe la base de datos en `proyecto-rag/`.

## Notas de cómputo
- Embeddings **sin descargas** a propósito (LSA): un modelo multilingüe preentrenado pesa ~120 MB o más y exige `torch`. El notebook trae una celda de Colab para cambiarlo sin tocar el resto del código.
- `sqlite-vec` hace búsqueda **exacta**; en producción (pgvector/HNSW, OpenSearch) la búsqueda es aproximada y escala a millones de vectores.

## Caso práctico (entregable)
Publica en GitHub un **RAG medido** sobre un documento real tuyo (manual, FAQs, apuntes, normativa abierta):
1. Corpus propio y **mínimo 20 preguntas** con la frase donde está la respuesta (como `PREGUNTAS` del notebook).
2. Al menos **dos chunkings** y **tres variantes de recuperación** (BM25, vectorial, híbrida) evaluadas con acierto@k y MRR.
3. Base vectorial persistida (sqlite-vec o pgvector en Docker) con el SQL de la consulta híbrida.
4. Un reranker (el que quieras) y la tabla antes/después, aunque la mejora sea cero o negativa: **cuéntalo**.
5. Un párrafo: qué preguntas fallan y por qué (vocabulario, chunking, el texto no lo dice).

**Criterios:** base vectorial y recuperación híbrida funcionando 30 % · evaluación honesta con métricas 30 % · diagnóstico de fallos 25 % · código y README 15 %.

> Una tabla de métricas honesta distingue un proyecto de portafolio de un tutorial copiado.

## Autoevaluación
1. ¿Por qué se mide la recuperación (acierto@k, MRR) por separado de la calidad de la respuesta final?
2. ¿En qué se diferencia una base vectorial como pgvector de buscar con NumPy?
3. ¿Por qué la fusión RRF usa posiciones y no puntuaciones?
4. ¿Por qué un reranker no puede arreglar una búsqueda que no trajo el chunk correcto?
5. Nombra un caso donde el SQL/BM25 supere a la búsqueda vectorial.

<details><summary>Respuestas</summary>

1. Porque si la respuesta falla necesitas saber **dónde**: si el chunk correcto nunca llegó, el problema es de recuperación; si llegó y el modelo no lo usó, es de generación. Son arreglos distintos.
2. La base vectorial guarda, indexa y filtra los vectores (con metadatos, persistencia, permisos, índices aproximados como HNSW). NumPy a fuerza bruta es perfecto para prototipos y miles de chunks, pero no escala ni persiste.
3. Porque BM25 y el coseno tienen escalas incomparables; las posiciones sí son comparables y RRF no requiere calibrar nada.
4. Porque solo reordena los N candidatos que recibe. Si el correcto no está, no puede aparecer: la búsqueda debe tener recall alto y el reranker, precisión.
5. Identificadores y cifras exactas (`BIENVENIDA10`, números de pedido, referencias), o consultas estructuradas («facturas de marzo del cliente 7»).
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: la documentación de `sqlite-vec` y pgvector, *Contextual Retrieval* de Anthropic y *Building effective agents*.

> **Siguiente paso:** el módulo **AI10** convierte tu búsqueda en un servidor **MCP** reutilizable por cualquier cliente.
