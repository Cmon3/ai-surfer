# Módulo AI3 · RAG y agentes — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Para comparar dos estrategias de *chunking* distintas con el mismo examen, conviene marcar en cada pregunta…
- a) el id del chunk correcto.
- b) la frase del documento que contiene la respuesta, y considerar relevante cualquier chunk que la contenga.
- c) solo la sección del manual.
- d) la respuesta que daría el LLM.

**2.** Un chunk empieza por «Devoluciones - Reembolso: …» (título y sección dentro del texto). ¿Para qué sirve?
- a) Para que el chunk ocupe más y se recupere antes.
- b) Para que el embedding y BM25 «vean» el tema aunque el cuerpo no lo repita, y para poder citar.
- c) Para evitar el solape.
- d) Para acelerar la base vectorial.

**3.** Una ventaja de una base vectorial como pgvector frente a calcular el coseno con NumPy es…
- a) que usa otro coseno, más preciso.
- b) que persiste los vectores y permite índices aproximados (HNSW) y filtros por metadatos en SQL.
- c) que no necesita embeddings.
- d) que elimina la necesidad de chunking.

**4.** En pgvector, `ORDER BY embedding <=> $1 LIMIT 5` devuelve…
- a) los 5 vectores más lejanos por distancia coseno.
- b) los 5 más cercanos por distancia coseno.
- c) 5 filas aleatorias.
- d) los 5 con más palabras en común.

**5.** Una consulta contiene el código `BIENVENIDA10`. Es esperable que…
- a) la búsqueda vectorial de un modelo débil lo encuentre mejor que BM25.
- b) BM25 lo encuentre bien porque coincide la palabra exacta (rara, idf alto).
- c) ninguna búsqueda lo encuentre.
- d) solo un reranker lo encuentre.

**6.** RRF combina las listas de BM25 y de la búsqueda vectorial usando…
- a) la media de las puntuaciones originales.
- b) la posición de cada documento en cada lista (`1/(k+posición)`), sin tener que normalizar escalas.
- c) el máximo de las puntuaciones.
- d) la longitud de los chunks.

**7.** En tu tabla de resultados, la búsqueda híbrida no supera a la vectorial en acierto@3 en un corpus de 36 preguntas. La conclusión más sensata es…
- a) la híbrida no sirve; hay que descartarla.
- b) con tan pocas preguntas una sola cambia ~0,03 de MRR; hay que mirar el detalle por pregunta y ampliar el examen antes de decidir.
- c) hay un error en BM25.
- d) hay que aumentar `k` de RRF a 10.000.

**8.** Un reranker (cross-encoder o LLM) aplicado a los 8 primeros candidatos no puede mejorar la recuperación cuando…
- a) la consulta es larga.
- b) el chunk correcto no está entre esos 8 candidatos.
- c) hay más de 3 chunks relevantes.
- d) se usa con BM25.

**9.** ¿Por qué el notebook comprueba que el reranker léxico no mejora y lo cuenta?
- a) Porque el reranker léxico ve las mismas palabras compartidas que BM25 y no arregla el desfase de vocabulario («anular» frente a «cancelar»).
- b) Porque los rerankers nunca mejoran nada.
- c) Porque BM25 ya es un cross-encoder.
- d) Porque la clave de API no estaba configurada.

**10.** En un agente con herramientas, cuando el modelo emite dos `tool_use` en la misma respuesta debes…
- a) ejecutar solo la primera y descartar la segunda.
- b) devolver un único mensaje de usuario con una `tool_result` por cada `tool_use`, enlazadas por `tool_use_id`.
- c) enviar dos mensajes de usuario seguidos, uno por herramienta.
- d) pedir al modelo que use una sola herramienta forzando `tool_choice`.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | Así el examen no depende de cómo se trocea: cualquier chunking que contenga la frase acierta. |
| 2 | b | Las migas de pan dan contexto al chunk (para embedding, BM25 y citas). |
| 3 | b | Persistencia, índices aproximados, filtros y escalado; el coseno es el mismo. |
| 4 | b | `<=>` es la distancia coseno; ordenar ascendente da los más cercanos. |
| 5 | b | Un identificador raro es la señal léxica más fuerte posible. |
| 6 | b | RRF usa solo posiciones, por eso no hay que calibrar escalas distintas. |
| 7 | b | Con muestras pequeñas el ruido domina; se analiza por pregunta y se amplía el examen. |
| 8 | b | El reranker solo reordena lo que recibe: la búsqueda debe traer el correcto entre los N. |
| 9 | a | Misma señal (palabras compartidas) que BM25; hacen falta modelos que entiendan significado. |
| 10 | b | Contrato de la API: todas las `tool_result` juntas en un único mensaje de usuario. |
</details>
