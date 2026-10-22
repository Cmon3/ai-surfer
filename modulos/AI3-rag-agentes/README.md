# Módulo AI3 · RAG y agentes

**Semanas 5–6 de N3-AI · ~10 horas** · Cómo dar al LLM conocimiento externo (RAG) y cómo convertirlo en un actor que usa herramientas (agentes) — y cuándo cada patrón falla.

## Objetivos
Al terminar este módulo podrás:
- Explicar el pipeline RAG completo: **chunking → embeddings → índice vectorial → recuperación → generación**.
- Implementar una búsqueda vectorial real (sin librería especializada: NumPy + coseno) sobre tus datos.
- Elegir estrategia de **chunking** según el documento (fijo, por secciones, con solape).
- Definir un **agente**: rol, herramientas, bucle de decisión y límites de iteración.
- Diagnosticar los fallos típicos: recuperación pobre, chunks que cortan contexto, agente en bucle.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 3.1 | Por qué RAG: el conocimiento del modelo acaba y el tuyo importa | 15 min |
| 3.2 | Embeddings: de texto a vectores; similitud coseno | 20 min |
| 3.3 | Chunking: trocear documentos sin romper su sentido | 20 min |
| 3.4 | El índice: similitud, top-k y re-ranking ligero | 15 min |
| 3.5 | Generación con contexto citado | 15 min |
| 3.6 | Agentes: el bucle decide → usa herramienta → observa | 20 min |
| 3.7 | Límites y fallos: cuándo un agente es peor que un script | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`notebook.ipynb`](notebook.ipynb) | Práctica completa: RAG con NumPy + agente con herramientas (sin API key, con fallback) |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — 1) troceas la guía de pedidos de TiendaSur; 2) la vectorizas (TF-IDF como stand-in de embeddings; celda opcional con modelos reales de HF); 3) recuperas top-k por consulta y generas respuesta con contexto citado (con API de Claude si hay clave, mock si no); 4) construyes un agente con 3 herramientas (`buscar_docs`, `get_pedido`, `crear_ticket`) y lo pones a resolver una incidencia.

## Notas de cómputo
- **Todo el RAG corre en CPU con NumPy/sklearn** (sin dependencias de GPU).
- La celda final [API] (generación con Claude) funciona con clave; sin ella, el mock mantiene el flujo.

## Caso práctico (entregable)
1. Coge un documento real tuyo (manual, FAQs, notas) y construye el RAG como en el notebook.
2. Escribe 5 preguntas que un usuario haría y evalúa: ¿recupera el chunk adecuado? (marcar aciertos).
3. Escribe un párrafo: qué preguntas fallan y por qué (chunking, sinónimos, o el texto no dice lo que se pregunta).

**Criterios:** RAG implementado (30 %), evaluación honesta con preguntas (30 %), diagnóstico de fallos (30 %), código limpio (10 %).

## Autoevaluación
1. ¿Por qué dividir en chunks de ~200–500 tokens y no en documentos enteros?
2. Similitud coseno vs. distancia euclídea en embeddings: ¿cuándo da igual y cuándo no?
3. ¿Qué es el *reranking* y por qué mejora sobre el top-k crudo?
4. En un agente, ¿quién decide cuándo parar el bucle de herramientas?
5. Nombra un caso donde una búsqueda por keywords (SQL/LIKE) supere a un RAG con embeddings.

<details><summary>Respuestas</summary>

1. Porque el embedding de un documento entero mezcla temás y diluye la señal; chunks pequeños recuperan trozos concretos. Además, el contexto del LLM es finito.
2. Con embeddings normalizados la coseno y la euclídea ordenan igual (monótonas); con vectores de escala distinta, la coseno ignora magnitud y solo mira dirección.
3. Reordena los top-k con un modelo más preciso (cross-encoder) o con señales adicionales: los embeddings son rápidos pero burdos; el reranker es caro pero fino — se aplica a pocos candidatos.
4. Tu código: el bucle tiene límite de iteraciones y criterios de parada; el modelo solo emite intención. Un agente sin límite es un riesgo de coste y de llamadas infinitas.
5. Cuando la consulta es exacta y estructurada: "facturas de marzo de cliente 7" — el SQL responde exacto y barato; el RAG trae texto plausible pero no garantiza exactitud.
</details>

## Lecturas y recursos
- [Anthropic docs: RAG overview](https://docs.anthropic.com/en/docs/build-with-claude/retrieval-augmented-generation) — patron RAG.
- [Sentence Embeddings](https://www.sbert.net) — la librería estándar de embeddings locales.
- Lilian Weng, [*LLM Powered Autonomous Agents*](https://lilianweng.github.io/posts/2023-06-23-agent) — el mejor mapa conceptual de agentes.
- [Anthropic: Tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) — la base de funciones del AI2 aplicada a agentes.
