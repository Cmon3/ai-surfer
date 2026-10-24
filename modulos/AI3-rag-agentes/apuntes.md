# Módulo AI3 · RAG y agentes — Apuntes

> Objetivo: dos patrones distintos y complementarios. **RAG** da conocimiento externo al modelo *antes* de responder. **Agentes** dan acción al modelo *durante* la respuesta. La mitad de la competencia de un AI Engineer es saber **medir** si la recuperación funciona y saber cuándo no hace falta un agente.

---

## 3.1 · Por qué RAG, y por qué lo primero es la evaluación

El modelo escribe con lo que aprendió hace meses. Tus datos (manual de TiendaSur, tickets, documentación interna) no están. Tres opciones:

1. **Fine-tuning (AI5–AI6):** caro, lento, malo para datos que cambian.
2. **Contexto directo:** meter todo en el prompt — caro, limitado por la ventana y se pierde precisión con contextos enormes.
3. **RAG (*Retrieval-Augmented Generation*):** buscar los trozos relevantes y dárselos al modelo en el prompt.

**Flujo completo:**

```
Documentos → chunking → embeddings → base vectorial (+ índice léxico)
Consulta → búsqueda híbrida → reranking → chunks en el prompt → respuesta citada
```

**Ventajas:** barato, actualizable al instante (reindexas y listo), trazable (la respuesta cita su fuente). **Riesgo:** si la recuperación falla, la respuesta falla con total seguridad en sí misma.

### Evaluar primero
Antes de elegir tamaño de chunk o modelo de embeddings, define **qué es acertar**:

- Un conjunto de **preguntas reales** (idealmente de usuarios; si no, redactadas con otras palabras que el documento).
- Para cada pregunta, **la frase del documento que contiene la respuesta**. Un chunk es relevante si la contiene. Así comparas chunkings distintos con el mismo examen.
- **acierto@k:** ¿hay un chunk relevante entre los k primeros? (importa porque pasas k chunks al modelo).
- **MRR** (*Mean Reciprocal Rank*): media de 1/posición del primer acierto; premia que el correcto sea **el primero**.

Con pocas preguntas, una sola mueve la métrica varios puntos. Con 36 preguntas, una pregunta son ~0,03 de MRR: las diferencias menores son ruido. En producción se evalúa con cientos de preguntas reales (los *logs*) y se separa **recuperación** de **generación** (AI4 cubre esto último).

---

## 3.2 · Embeddings: texto → vector

Un **embedding** convierte texto en un vector de R^n (típicamente 384–1536 dimensiones) donde *cercanía = similitud de significado*. La cercanía se mide con el **coseno**: `cos(θ) = (a·b)/(‖a‖‖b‖)`. Con vectores normalizados, el producto punto es el coseno.

**Fuentes de embeddings:**
- **API** (Voyage, OpenAI, Cohere…): calidad alta, coste por token y tus datos viajan fuera. Comprueba proveedor y modelo vigentes.
- **Locales** (`sentence-transformers`, p. ej. familias *e5* o *MiniLM* multilingües): gratis, CPU, pero descargas de ~100 MB a varios cientos y `torch`.
- **LSA (el notebook):** TF-IDF de n-gramas de letras + **SVD**. Vectores densos de 32 dimensiones, sin descargas, entrenados con el propio corpus.

**Por qué LSA en el curso:** el notebook debe correr en cualquier portátil en segundos y sin descargas. LSA es un embedding de verdad (mismo contrato: texto → vector → coseno), capta morfología (`devolver` ≈ `devolución`) pero **no sinónimos que nunca coinciden** (`anular` ≠ `cancelar`), porque aprende solo de tu corpus. Esa limitación es didáctica: muestra *qué* mejora un modelo preentrenado y *por qué* la búsqueda híbrida y el reranking existen.

**Cambiar de modelo no cambia el pipeline:** solo la función `texto → vector`. Reglas: el **mismo modelo** para chunks y consultas; si cambias de modelo, **reindexa todo**; algunos modelos (e5) piden prefijos distintos para consulta y fragmento; la dimensión del modelo fija el tipo de columna (`vector(384)`).

---

## 3.3 · Chunking: trocear sin romper

Mal chunking = RAG malo. Tres estrategias, de peor a mejor para documentos con estructura:

| Estrategia | Cómo | Problema |
|---|---|---|
| **Ventana fija** | N caracteres/tokens seguidos | Parte frases y separa título de contenido |
| **Fija con solape** | Cada ventana repite el 10–20 % de la anterior | Una frase cortada aparece entera en algún chunk, pero hay duplicados |
| **Por estructura** | Una unidad por sección/subsección, con **migas de pan** en el texto | Hay que partir las secciones largas |

**Migas de pan:** el texto del chunk empieza por `Devoluciones - Reembolso: …`. El embedding y el BM25 "ven" el tema aunque el cuerpo diga solo «el dinero se devuelve en 10 días». Es la versión simple de lo que Anthropic llama *Contextual Retrieval* (añadir contexto a cada chunk antes de indexarlo; allí lo escribe un LLM).

**Tamaño y solape:** no hay valor universal; ~200–500 tokens es un buen punto de partida y se **ajusta con la evaluación**. Secciones muy largas: se parten **por frases** con una frase de solape.

**Metadatos:** guarda documento y sección por chunk — para citar y para filtrar.

**Cuidado con la métrica:** un chunk muy grande "contiene" la respuesta con más facilidad (sube el MRR), pero entrega al modelo varios temas a la vez: más ruido y más tokens. Mira siempre la **longitud media del contexto** además del acierto.

---

## 3.4 · Bases vectoriales: `sqlite-vec` y pgvector

Tres niveles de almacén vectorial:

1. **NumPy a fuerza bruta:** coseno contra todos los chunks. Vale hasta decenas de miles.
2. **Extensión sin servidor:** `sqlite-vec` (un solo archivo SQLite, `pip install`). Ideal para prototipos, apps locales y para aprender SQL vectorial.
3. **Producción:** **PostgreSQL + pgvector** (la opción por defecto si ya usas Postgres), OpenSearch/Elasticsearch, Qdrant, etc. Aportan índices **aproximados** (HNSW, IVF), filtros, réplicas, permisos y backups.

Diseño común: una tabla de **metadatos** y una de **vectores** unidas por id.

```sql
-- sqlite-vec
CREATE VIRTUAL TABLE vec_chunks USING vec0(embedding float[32] distance_metric=cosine);
SELECT rowid, distance FROM vec_chunks WHERE embedding MATCH ? AND k = 5 ORDER BY distance;

-- pgvector (el mismo diseño)
CREATE TABLE chunks (id bigserial PRIMARY KEY, seccion text, texto text, embedding vector(384));
CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);
SELECT id, 1 - (embedding <=> $1) AS coseno FROM chunks
WHERE seccion = 'Devoluciones' ORDER BY embedding <=> $1 LIMIT 5;
```

`<=>` es la distancia coseno en pgvector (`<->` L2, `<#>` producto interno negativo). **Exacta vs aproximada:** HNSW cambia un poco de exactitud por mucha velocidad; mide el *recall* frente a la búsqueda exacta. **Filtros:** cuidado con filtrar *después* de la búsqueda aproximada (puedes quedarte sin resultados); comprueba cómo lo hace tu motor.

---

## 3.5 · Búsqueda híbrida: BM25 + vector + RRF

- **BM25** (léxica): puntúa por palabras compartidas, dando más peso a las raras (idf) y normalizando por longitud. Gana en **identificadores y cifras exactas** (`BIENVENIDA10`, números de pedido). Falla con sinónimos.
- **Vectorial:** gana en **paráfrasis y morfología**. Falla con códigos raros y puede traer cosas «parecidas pero no».

Como se equivocan en sitios distintos, se combinan. **RRF (*Reciprocal Rank Fusion*)**: cada lista aporta `1/(k + posición)` a cada documento y se suman. Ventajas: solo usa **posiciones** (no hay que calibrar escalas), es robusto y casi no tiene parámetros (`k≈60`). Se pueden ponderar las listas.

```python
puntos[i] += peso / (k + posicion + 1)
```

**En producción:** OpenSearch/Elasticsearch ofrecen híbrida de serie; en Postgres combinas `tsvector` (ojo: `ts_rank` no es BM25; existen extensiones) con pgvector en una consulta SQL (ver notebook). **SQLite FTS5** trae BM25 de fábrica.

**Qué esperar:** la híbrida *no siempre* gana en todas las métricas. Con un corpus pequeño puede igualar a la mejor de las dos. Su valor es la **robustez**: no depende de que una sola señal acierte.

---

## 3.6 · Evaluar la recuperación: leer la tabla

Se compara con el mismo examen: chunkings × variantes. Qué mirar, en orden:

1. **Efecto del chunking** dentro de una variante — suele ser la palanca más grande.
2. **Variantes** entre sí: ¿la híbrida iguala o supera a la mejor? ¿en qué preguntas gana cada una?
3. **Preguntas que fallan:** ¿vocabulario distinto (sinónimos)? ¿información repartida en dos chunks? ¿el documento no lo dice?
4. **Intervalo de confianza / tamaño de muestra:** con pocas preguntas, desconfía de las diferencias pequeñas.

Un fallo típico: el chunk correcto está en la posición 6-10 — la búsqueda "lo tiene" pero mal ordenado. Ese es el caso de uso del *reranking*.

---

## 3.7 · Reranking

La búsqueda recupera **candidatos** (rápida, recall alto); el **reranker** reordena solo los primeros N (preciso, caro). Ve consulta y fragmento **juntos**, por eso entiende relaciones que los embeddings por separado pierden.

| Reranker | Cuándo |
|---|---|
| **Léxico** (cobertura de palabras, pares) | Sin modelo ni clave. Solo ve palabras compartidas: **no arregla el desfase de vocabulario** (en el notebook no mejora, y lo mides). |
| ***Cross-encoder*** pequeño (open source) | Producción propia. Comprueba el tamaño: los multilingües suelen pesar más de 200 MB; en el curso va como celda de Colab. |
| **LLM** (p. ej. un modelo pequeño de Claude con salida estructurada) | Pocos candidatos, calidad alta; una llamada por consulta (latencia y coste). |

**Límite fundamental:** el reranker solo puede reordenar lo que recibe. Si el chunk correcto no está entre los N candidatos, no hay reranking que lo salve. Pide **recall alto** a la búsqueda y **precisión** al reranker. **Mídelo siempre:** a veces la mejora es nula o negativa.

Con un LLM: pide una lista de ids con `messages.parse` (salida estructurada), **valida** que los ids existen y repón los que falten (un LLM puede olvidar alguno), y cachea.

---

## 3.8 · Generación con contexto citado

```
Responde con la información de los fragmentos entre <docs>.
No uses conocimiento externo. Si no está en los fragmentos, di "no lo sé".
Cita: [id del chunk].
```

**Reglas de oro:** 1) permite al modelo decir «no lo sé»; 2) exige citas — el usuario verifica y tú depuras; 3) ordena los chunks por relevancia.

**Defensa en dos capas para «no lo sé»:**
1. **Umbral de relevancia** antes de llamar al modelo: si el mejor coseno es bajo, responde «no lo sé» sin gastar una llamada.
2. **Prompt:** para lo que pase el umbral (p. ej. «capital de **Francia**» coincide con «envíos a **Francia**»).

El umbral se calibra con preguntas con y sin respuesta; con pocas preguntas está sobreajustado, así que se revisa en producción.

---

## 3.9 · Agentes: el bucle

Un **agente** es un LLM con herramientas que corre en bucle hasta resolver la tarea:

```
Tarea → LLM → ¿herramienta? → resultado → LLM → … → respuesta final
```

**Componentes:** rol y meta; herramientas (`buscar_docs` = tu RAG híbrido, `get_pedido`, `crear_ticket`); bucle con **límite de vueltas**; historial como memoria.

**Reglas de la API:** responder a **todas** las `tool_use` de una respuesta en **un único** mensaje de usuario, con una `tool_result` por cada una; devolver el contenido completo del asistente (`resp.content`) como turno anterior.

**Mejorar el RAG mejora al agente gratis:** su herramienta de búsqueda es la que acabas de medir.

---

## 3.10 · Límites, router determinista y MCP

**Antes de crear un agente, pregunta:**
- ¿Flujo **determinista**? → script (búsqueda → prompt → respuesta).
- ¿Una sola decisión? → *function calling* simple (AI2).
- ¿**Planificación real** (orden impredecible, varias herramientas condicionadas)? → agente.

**Fallos típicos:** bucles infinitos (límite de vueltas y coste), herramientas con descripciones solapadas, y el **«agente teatro»**: un bucle que ya tenías planificado en tu código. Un *router* explícito (si el mejor fragmento es de «Productos dañados», abre ticket; si no, responde) resuelve la mayoría de los casos con cero llamadas de herramienta del modelo.

### Nota sobre MCP
Las herramientas del notebook están definidas a mano en tu código. El **Model Context Protocol (MCP)** es el estándar para exponerlas desde un servidor reutilizable (el mismo `buscar_docs` servirá a Claude Desktop, a un IDE y a tu app). Se estudia en el módulo **AI10**; tu recuperación híbrida es lo que se publicaría detrás.

---

## Glosario
- **RAG:** generación aumentada con recuperación.
- **Chunk:** fragmento de documento que se indexa y recupera.
- **Embedding:** vector que representa el significado de un texto.
- **BM25:** función de ranking léxica estándar.
- **RRF:** fusión de rankings por posiciones.
- **HNSW:** índice de vecinos aproximados basado en grafos.
- **Cross-encoder:** modelo que puntúa el par (consulta, fragmento).
- **acierto@k / MRR:** métricas de recuperación.
- **MCP:** protocolo para exponer herramientas y datos a modelos.

## Resumen del módulo
- Define el examen (preguntas + frase de respuesta) **antes** de optimizar.
- Chunking por estructura con migas de pan; mide también la longitud del contexto.
- Base vectorial real (sqlite-vec / pgvector) con tabla de metadatos.
- Híbrida (BM25 + vector + RRF) por robustez; reranking con medición.
- «No lo sé» con umbral + prompt; agente solo cuando hay planificación real.
