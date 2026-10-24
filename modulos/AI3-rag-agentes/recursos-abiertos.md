# Módulo AI3 · Recursos abiertos recomendados

Complemento a los apuntes y al notebook. Todo gratuito. Comprueba que los enlaces y los nombres de modelos siguen vigentes, y revisa la licencia de cada recurso en [docs/recursos-y-licencias.md](../../docs/recursos-y-licencias.md) antes de incrustarlo en una plataforma de pago.

## Por lección

| Lección | Recurso | Tipo |
|---|---|---|
| 3.1 | [Anthropic: Retrieval Augmented Generation](https://docs.anthropic.com/en/docs/build-with-claude/retrieval-augmented-generation) | documentación |
| 3.2 | [Sentence Transformers](https://www.sbert.net) — embeddings locales | documentación/código |
| 3.2 | [MTEB leaderboard](https://huggingface.co/spaces/mteb/leaderboard) — comparar modelos de embeddings (filtra por idioma) | tabla |
| 3.3 | [Anthropic: Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) — contexto por chunk, BM25 + embeddings y reranking | lectura |
| 3.4 | [`sqlite-vec`](https://github.com/asg017/sqlite-vec) — vectores en SQLite, con guía para Python | repositorio/documentación |
| 3.4 | [`pgvector`](https://github.com/pgvector/pgvector) — vectores en PostgreSQL, HNSW e IVFFlat | repositorio/documentación |
| 3.4 | [FAISS wiki](https://github.com/facebookresearch/faiss/wiki) — índices vectoriales en memoria | documentación |
| 3.5 | [Okapi BM25 (Wikipedia)](https://en.wikipedia.org/wiki/Okapi_BM25) — la fórmula y sus parámetros | lectura |
| 3.5 | [SQLite FTS5](https://www.sqlite.org/fts5.html) — búsqueda de texto y `bm25()` incluidos en SQLite | documentación |
| 3.5 | Cormack, Clarke y Büttcher (2009), *Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods* | artículo |
| 3.6 | [Anthropic: Define your success criteria / Develop test cases](https://docs.anthropic.com/en/docs/test-and-evaluate/develop-tests) | documentación |
| 3.7 | [Sentence Transformers: Retrieve & Re-Rank](https://www.sbert.net/examples/applications/retrieve_rerank/README.html) — cross-encoders abiertos | documentación |
| 3.8 | [Anthropic: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) — citas y «no lo sé» | documentación |
| 3.9 | Lilian Weng, [*LLM Powered Autonomous Agents*](https://lilianweng.github.io/posts/2023-06-23-agent) | lectura |
| 3.9 | [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents) | lectura |
| 3.9 | [Anthropic: Tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) | documentación |
| 3.10 | [Model Context Protocol](https://modelcontextprotocol.io) — adelanto de AI10 | documentación |

## Práctica extra (recomendada)
- Sustituye los embeddings LSA por un modelo preentrenado multilingüe (celda de Colab del notebook) y repite la tabla: ¿qué preguntas arregla? ¿cuáles ya fallaban por otra causa?
- Levanta PostgreSQL con pgvector en Docker, crea la tabla del notebook y ejecuta la consulta híbrida con RRF en SQL.
- Amplía tu examen a 100 preguntas sacadas de usuarios reales (o de compañeros) y calcula un intervalo de confianza del MRR por *bootstrap*.
