# Módulo I7 · Recursos abiertos

> Verificado el 13/10/2026. Cada enlace se ha comprobado abriendo la página o a través de una fuente oficial que muestra esa URL exacta (p. ej. el README del repositorio del autor). Las licencias se han comprobado en la propia fuente. Cuando un dato (duración, subtítulos) no se ha podido comprobar, se indica "n/d".

## Recomendación por lección

| Lección | Recurso | Tipo | Idioma | Duración aprox. | Licencia | Uso permitido |
|---|---|---|---|---|---|---|
| 9.1, 9.2 | [Hugging Face — LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) (versión en español, parcial: [capítulo 1](https://huggingface.co/course/es/chapter1/1)) | Curso abierto | EN (traducción ES en curso) | Curso completo; cap. 1 recomendado | Apache 2.0 (repositorio `huggingface/course`) | Reutilizar y adaptar citando (comercial OK) |
| 9.2 | [3Blue1Brown — Visual intro to Transformers](https://www.youtube.com/watch?v=wjZofJX0v4M) | Vídeo | EN (subtítulos n/d) | n/d | Licencia estándar de YouTube | Enlazar/insertar |
| 9.2 | [Andrej Karpathy — Let's build the GPT Tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE) | Vídeo (avanzado) | EN (subtítulos n/d) | n/d | Licencia estándar de YouTube | Enlazar/insertar |
| 9.2 | [Andrej Karpathy — Let's build GPT: from scratch, in code, spelled out.](https://www.youtube.com/watch?v=kCc8FmEb1nY) | Vídeo (avanzado, con código) | EN (subtítulos n/d) | n/d | Licencia estándar de YouTube | Enlazar/insertar |
| 9.3 | [Anthropic — Descripción general de la ingeniería de prompts](https://platform.claude.com/docs/es/build-with-claude/prompt-engineering/overview) | Documentación oficial | ES | Lectura breve + enlaces | Sin licencia abierta | Enlazar/insertar |
| 9.3, 9.4, 9.6 | [Anthropic — Cursos educativos (`anthropics/courses`)](https://github.com/anthropics/courses) | Notebooks (5 cursos) | EN | Varias horas | ⚠️ CC BY-NC 4.0 | Reutilizar citando, ⚠️ solo uso NO comercial |
| 9.4 | [Anthropic — Salidas estructuradas](https://platform.claude.com/docs/es/build-with-claude/structured-outputs) | Documentación oficial | ES | Lectura | Sin licencia abierta | Enlazar/insertar |
| 9.4, 9.7 | [Anthropic — Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) | Documentación oficial | EN | Lectura | Sin licencia abierta | Enlazar/insertar |
| 9.5 | [Anthropic — Introducing Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) | Artículo técnico | EN | Lectura | Sin licencia abierta | Enlazar/insertar |
| 9.6 | [Anthropic — Define criterios de éxito y crea evaluaciones](https://platform.claude.com/docs/es/test-and-evaluate/develop-tests) | Documentación oficial | ES | Lectura | Sin licencia abierta | Enlazar/insertar |
| 9.7 | [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Artículo | EN | Lectura | Sin licencia abierta | Enlazar/insertar |
| 9.7 | [Hugging Face — AI Agents Course](https://huggingface.co/learn/agents-course) | Curso abierto | EN | Curso completo (unidades 0–4) | Apache 2.0 (repositorio `huggingface/agents-course`) | Reutilizar y adaptar citando (comercial OK) |
| 9.6, 9.8 | [Anthropic — Reducir las alucinaciones](https://platform.claude.com/docs/es/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) | Documentación oficial | ES | Lectura breve | Sin licencia abierta | Enlazar/insertar |
| 9.8 | [Anthropic — Mitigar jailbreaks e inyecciones de prompts](https://platform.claude.com/docs/es/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) | Documentación oficial | ES | Lectura | Sin licencia abierta | Enlazar/insertar |

> **Nota para instructores (lección 9.8).** Para el marco regulatorio conviene enlazar las fuentes oficiales: el texto del Reglamento (UE) 2024/1689 en EUR-Lex (y su versión consolidada, por si se han modificado plazos), la página de la Comisión Europea sobre el marco regulatorio de la IA y las guías de la AEPD sobre IA y protección de datos. No se han incluido en la tabla porque sus sitios no fueron accesibles desde el entorno de preparación el 13/10/2026 y, por tanto, sus URLs no se han podido verificar. Añádelas tras comprobarlas. Lo mismo aplica a contenidos en español de divulgadores como Dot CSV, que conviene revisar y enlazar si encajan.

## Detalle de los recursos

**Hugging Face — LLM Course.** Curso gratuito y abierto (contenido en el repositorio `huggingface/course`, licencia Apache 2.0) que la propia documentación de la librería Transformers recomienda como punto de partida. El capítulo 1 explica qué son los modelos transformer, cómo funcionan y cómo se usan, a un nivel muy accesible. La traducción al español está marcada como "en curso" (WIP) en el repositorio y cubre algunos capítulos (0, 1, 2, 3, 5, 6 y 8); para este módulo basta con el capítulo 1. Al ser Apache 2.0, se puede reutilizar y adaptar en un curso de pago citando la fuente.

**3Blue1Brown — Visual intro to Transformers.** La mejor explicación visual de cómo un transformer convierte tokens en vectores, cómo fluyen por la red y cómo se obtiene la distribución del siguiente token. Encaja con la lección 9.2 y prepara el terreno para entender la atención. Licencia estándar de YouTube: solo enlazar o insertar. (El código de animación del canal, en `3b1b/videos`, es CC BY-NC-SA, pero eso no afecta a los vídeos de YouTube.)

**Andrej Karpathy — Let's build the GPT Tokenizer.** Construye, con código, un tokenizador por *byte-pair encoding* a nivel de bytes como el de los modelos GPT (el código resultante está en el repositorio `karpathy/minbpe`, que incluye también la lección en texto). Ayuda a entender por qué los modelos tropiezan con letras y números. Recomendado para alumnos con perfil técnico que quieran profundizar en la primera parte de la lección 9.2. Forma parte de la lista *Neural Networks: Zero to Hero*.

**Andrej Karpathy — Let's build GPT: from scratch, in code, spelled out.** Construye un modelo tipo GPT desde cero en PyTorch, incluida la autoatención causal. Es avanzado y largo: proponlo como ampliación opcional a quien haya disfrutado del módulo 05. Es la lección 7 de la serie *Neural Networks: Zero to Hero* (lista completa: [playlist](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ)); el código de la serie está en GitHub con licencia MIT.

**Anthropic — Descripción general de la ingeniería de prompts.** Documentación oficial en español. Insiste en lo mismo que la lección 9.3: antes de pulir un prompt hay que tener criterios de éxito y una forma de medirlos. Enlaza a la guía de buenas prácticas de prompting (la referencia viva para los modelos actuales) y a los tutoriales interactivos.

**Anthropic — Cursos educativos (`anthropics/courses`).** Cinco cursos en notebooks: fundamentos de la API, tutorial interactivo de ingeniería de prompts, prompting en casos reales, evaluaciones de prompts y uso de herramientas. Muy prácticos para los ejercicios 1, 2 y 4. Ojo: usan modelos antiguos para abaratar costes (sustitúyelos por el modelo actual) y la licencia es ⚠️ **CC BY-NC 4.0**: se pueden enlazar y los alumnos pueden usarlos, pero no se puede reutilizar su contenido en un curso de pago sin permiso.

**Anthropic — Salidas estructuradas.** Documentación oficial en español de las dos variantes: respuestas JSON que cumplen un esquema y uso estricto de herramientas. Incluye el patrón `client.messages.parse(..., output_format=ModeloPydantic)` que usa el notebook. Lectura recomendada para el ejercicio 2.

**Anthropic — Tool use with Claude.** Explica el bucle completo de uso de herramientas (`stop_reason: "tool_use"`, bloques `tool_use` y `tool_result`), la diferencia entre herramientas que ejecuta tu aplicación y las que ejecuta el proveedor, y cómo se cobran. Complementa la segunda mitad de la lección 9.4 y sirve de puente con la 9.7.

**Anthropic — Introducing Contextual Retrieval (19/09/2024).** Artículo técnico sobre un problema real de RAG: los fragmentos pierden contexto al trocear. Propone añadir a cada fragmento una breve explicación generada a partir del documento completo, y combinar embeddings con BM25 y reordenación; reporta reducciones del fallo de recuperación de hasta un 67 % en sus pruebas. Ideal para la parte de "troceado y metadatos" y "búsqueda híbrida" de la lección 9.5.

**Anthropic — Define criterios de éxito y crea evaluaciones.** Documentación oficial en español sobre cómo definir criterios medibles y construir evaluaciones: ejemplos de coincidencia exacta, similitud, ROUGE y LLM como juez con escalas tipo Likert, y la recomendación de usar como juez un modelo distinto del evaluado. Acompaña directamente la lección 9.6 y el ejercicio 4.

**Anthropic — Building effective agents (19/12/2024).** Artículo de referencia sobre la distinción entre flujos de trabajo y agentes, los patrones básicos (encadenamiento, enrutamiento, paralelización, orquestador-trabajadores, evaluador-optimizador) y el consejo de empezar por lo simple. Es la base de la lección 9.7.

**Hugging Face — AI Agents Course.** Curso gratuito (Apache 2.0) en cuatro unidades más bonus: introducción a los agentes, frameworks (smolagents, LlamaIndex, LangGraph), RAG agéntico y proyecto final. Para la lección 9.7 basta con la unidad 1; el resto es una buena ampliación para quien quiera construir agentes en su proyecto final.

**Anthropic — Reducir las alucinaciones.** Guía breve en español con técnicas concretas: permitir que el modelo diga "no lo sé", fundamentar en citas textuales, verificar cada afirmación con una referencia y restringir el uso de conocimiento externo. Conecta las lecciones 9.5 (RAG con citas), 9.6 y 9.8.

**Anthropic — Mitigar jailbreaks e inyecciones de prompts.** Documentación en español que distingue inyección directa e indirecta y propone capas de defensa: filtros previos con un modelo ligero, contenido no confiable dentro de resultados de herramientas, política explícita en el prompt de sistema, mínimo privilegio y *red teaming*. Complementa la "Prueba de inyección" del notebook y la lección 9.8.
