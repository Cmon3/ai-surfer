# Plan v2 · Itinerarios por niveles y plataforma web

Este documento propone cómo convertir el curso actual (un programa único de 14 semanas) en una **escuela con itinerarios por niveles** y cómo publicarlo en una **web de aprendizaje práctica**, inspirada en lo que funciona en las plataformas educativas de éxito.

- **Estado:** propuesta para revisar.
- **Fecha:** octubre de 2026.

---

## 1. Resumen

| Decisión | Propuesta |
|---|---|
| Estructura | 4 bloques: **Fundamentos** → **Intermedio** → dos especializaciones a elegir: **Data Science avanzada** o **AI Engineering** |
| Reutilización | Los 10 módulos actuales se reaprovechan casi enteros; se crean 17 módulos nuevos |
| Certificación | Un certificado por bloque, acumulables (al estilo de las «especializaciones» y «tracks» de las grandes plataformas) |
| Web | Fase 1: sitio estático generado desde este repositorio, con código ejecutable en el navegador. Fase 2: cuentas, progreso y pagos. Fase 3: tutor de IA, corrección automática y comunidad |
| REA | No es necesario para este proyecto. Ver la sección 5 |

---

## 2. Nuevo mapa de itinerarios

```
                        ┌──────────────────────────────┐
                        │  N1 · FUNDAMENTOS (6 sem.)   │
                        │  Python · SQL · Estadística  │
                        │  Matemáticas para ML · Git   │
                        └──────────────┬───────────────┘
                                       │
                        ┌──────────────▼───────────────┐
                        │  N2 · INTERMEDIO (10 sem.)   │
                        │  ML supervisado y no superv. │
                        │  Deep learning · Series ·    │
                        │  Proyecto ML de principio a  │
                        │  fin · Intro a LLMs por API  │
                        └───────┬──────────────┬───────┘
                                │              │
          ┌─────────────────────▼───┐      ┌───▼──────────────────────────┐
          │ N3-DS · DATA SCIENCE     │      │ N3-AI · AI ENGINEERING       │
          │ AVANZADA (10 sem.)       │      │ (12 sem.)                    │
          │ Causalidad, experimentos,│      │ Transformers, apps con LLMs, │
          │ bayesiana, recomendación,│      │ RAG y agentes, evaluación,   │
          │ grafos, forecasting,     │      │ fine-tuning, DPO/GRPO,       │
          │ datos a escala           │      │ inferencia, LLMOps y         │
          │                          │      │ seguridad                    │
          └──────────────────────────┘      └──────────────────────────────┘
```

Cada bloque termina con un **proyecto integrador** que va al portafolio del estudiante. Se puede cursar solo un bloque si ya se domina el anterior; para eso hay una **prueba de nivel** (ver la sección 4.2).

### 2.1 N1 · Fundamentos (6 semanas, ~8 h/semana)

Para quien empieza desde cero o necesita una base sólida.

| Código | Módulo | Origen |
|---|---|---|
| F1 | Python para datos | ♻️ Módulo actual 00 |
| F2 | **SQL para análisis de datos** (SELECT, JOIN, agregaciones, funciones de ventana; con DuckDB o SQLite) | 🆕 Imprescindible en cualquier puesto de datos y ausente hoy |
| F3 | Estadística para la toma de decisiones | ♻️ Módulo actual 01 |
| F4 | **Matemáticas para ML** (vectores y matrices, derivadas y gradiente, probabilidad condicionada; todo con NumPy) | 🆕 Base para N2 y para entender el deep learning |
| F5 | **Herramientas del oficio**: terminal, Git y GitHub, entornos, buenas prácticas en notebooks | 🆕 |
| — | **Proyecto N1:** análisis exploratorio completo de un conjunto de datos público, con SQL + pandas + informe | 🆕 |

**Certificado:** *Fundamentos de Ciencia de Datos*.

### 2.2 N2 · Intermedio (10 semanas, ~8 h/semana)

El núcleo de machine learning. Es el programa actual, reorganizado.

| Código | Módulo | Origen |
|---|---|---|
| I1 | Aprendizaje no supervisado: clustering y reducción de dimensión | ♻️ 02 |
| I2 | Regresión y predicción | ♻️ 03 |
| I3 | Clasificación y pruebas de hipótesis | ♻️ 04 |
| I4 | **Ingeniería de variables, pipelines y modelos de gradient boosting** (XGBoost/LightGBM, validación, fuga de datos, interpretabilidad con SHAP) | 🆕 Lo más usado en datos tabulares en la industria |
| I5 | Deep learning con PyTorch | ♻️ 05, ampliado con una lección de transformers y embeddings |
| I6 | Series temporales | ♻️ 08 |
| I7 | **Introducción a los LLMs por API** (prompting, salidas estructuradas, RAG básico) | ♻️ 09 (lecciones 9.1–9.6). La 9.7 pasa a AI3 y la 9.8 a AI8 |
| I8 | **Del notebook a producción** (código modular, tests, API con FastAPI, Docker, seguimiento de experimentos con MLflow) | 🆕 Requisito habitual en las ofertas («beyond notebooks») |
| — | **Proyecto N2:** modelo predictivo desplegado como API, con informe de negocio | ♻️ Adapta el `proyecto-final/` actual |

**Certificado:** *Machine Learning Aplicado*.

### 2.3 N3-DS · Data Science avanzada (10 semanas)

Para analistas y *data scientists* que quieren llegar a puestos *senior*: decisiones de producto, experimentación y modelos a escala.

| Código | Módulo | Origen |
|---|---|---|
| DS1 | **Inferencia causal** (DAGs, emparejamiento, diferencias en diferencias, variables instrumentales, *uplift modeling*) | 🆕 |
| DS2 | **Experimentación avanzada** (CUPED, pruebas secuenciales, *bandits*, métricas de guardarraíl) | 🆕 Amplía 4.7–4.9 |
| DS3 | **Estadística bayesiana** (PyMC, modelos jerárquicos, A/B bayesiano) | 🆕 |
| DS4 | Sistemas de recomendación | ♻️ 06, con una lección nueva de recomendación con embeddings |
| DS5 | Redes y grafos | ♻️ 07, con una lección nueva de introducción a las *graph neural networks* |
| DS6 | **Forecasting avanzado** (muchas series a la vez, modelos globales con ML, jerarquías, modelos fundacionales de series temporales) | 🆕 Amplía 08 |
| DS7 | **Datos a escala** (DuckDB, Polars, Spark; almacenes de datos y dbt a nivel conceptual) | 🆕 |
| DS8 | **Comunicación y producto de datos** (storytelling, dashboards, diseño de métricas) | 🆕 |
| — | **Capstone DS:** problema real con decisión causal o experimental | 🆕 |

**Certificado:** *Data Science Avanzada*.

### 2.4 N3-AI · AI Engineering (12 semanas)

Orientada a puestos como *AI/LLM Engineer*. Está diseñada pensando en ofertas como la de EverAI que analizamos: post-entrenamiento, evaluaciones y producción.

| Código | Módulo | Contenido clave | Origen |
|---|---|---|---|
| AI1 | Transformers por dentro | Atención, tokenización, implementación de un GPT mínimo en PyTorch, ecosistema Hugging Face | 🆕 |
| AI2 | Aplicaciones con LLMs | Prompting avanzado, salidas estructuradas, uso de herramientas, *streaming*, gestión de contexto, caché | ♻️ Amplía 09 |
| AI3 | RAG y agentes | Embeddings, bases de datos vectoriales, *chunking*, *reranking*, agentes con herramientas y sus límites | ♻️ Amplía 09 |
| AI4 | **Evaluación de LLMs** | Conjuntos de evaluación, LLM como juez y su calibración, evaluaciones de comportamiento (tono, consistencia de personaje, multilingüe), análisis de fallos | 🆕 Requisito central en la oferta |
| AI5 | **Fine-tuning supervisado** | Preparación de datos, SFT, LoRA y QLoRA con TRL + PEFT, entrenamiento en GPU y depuración, *chat templates* | 🆕 |
| AI6 | **Alineación y post-entrenamiento** | Datos de preferencias, DPO, GRPO con funciones de recompensa, comparación de experimentos y reproducibilidad | 🆕 |
| AI7 | **Inferencia y despliegue** | Cuantización, vLLM, latencia y coste, *batching*, servir modelos ajustados, pruebas de carga | 🆕 |
| AI8 | **Seguridad, moderación y LLMOps** | Clasificadores de moderación, *red teaming*, inyección de instrucciones, observabilidad, regulación (RGPD y Reglamento europeo de IA) | ♻️ Amplía 9.8 |
| AI9 | Multimodal (optativo) | Modelos de visión y lenguaje, voz | 🆕 |
| — | **Capstone AI:** ajustar un modelo abierto pequeño para un caso de uso concreto, con evaluación propia, comparación frente al modelo base y despliegue. Se publica en Hugging Face. | 🆕 |

**Certificado:** *AI Engineering*.

**Requisitos de cómputo:** todos los notebooks de AI5–AI7 deben funcionar con modelos abiertos pequeños (0,5–3 B parámetros) en una GPU gratuita de **Google Colab** (T4) o en la cuota semanal gratuita de GPU de **Kaggle**. Se indicará un presupuesto opcional de GPU en la nube (orientativo: 20–50 € por estudiante) para quien quiera entrenar modelos de 7–8 B. Los modelos concretos se elegirán al preparar cada módulo, entre las familias abiertas vigentes (Qwen, Llama, Gemma, SmolLM…).

### 2.5 Resumen de esfuerzo

| Bloque | Módulos reutilizados | Módulos nuevos | Duración |
|---|---|---|---|
| N1 Fundamentos | 2 | 3 + proyecto | 6 semanas |
| N2 Intermedio | 6 (con ampliaciones) | 2 + proyecto | 10 semanas |
| N3-DS | 2 | 6 + capstone | 10 semanas |
| N3-AI | 3 (el 09, dividido y ampliado en AI2, AI3 y AI8) | 6 (AI9 optativo) + capstone | 12 semanas |
| **Total** | **los 10 actuales** | **17 nuevos** | 26–28 semanas por itinerario completo (N1 + N2 + una especialización) |

Cada módulo nuevo lleva los mismos materiales que los actuales: README, apuntes, diapositivas, guiones, notebook, soluciones, cuestionario y recursos abiertos. Con el método que ya usamos (un agente por módulo y revisión central), cada bloque se puede producir en uno o dos días de trabajo, más la revisión humana.

---

## 3. Reorganización del repositorio

```
.
├── README.md                     ← portada: niveles, itinerarios y cómo empezar
├── itinerarios/
│   ├── n1-fundamentos/           README del bloque + proyecto
│   ├── n2-intermedio/
│   ├── n3-data-science/
│   └── n3-ai-engineering/
├── modulos/                      ← un solo catálogo de módulos con códigos estables
│   ├── F1-python/  F2-sql/  F3-estadistica/ ...
│   ├── I1-no-supervisado/ ... I8-produccion/
│   ├── DS1-causalidad/ ...
│   └── AI1-transformers/ ...
├── web/                          ← código del sitio (sección 4)
├── docs/
└── scripts/
```

- **Códigos estables** (F1, I3, AI5…) en lugar de números: así se puede añadir un módulo sin renumerar el resto.
- Cada `itinerarios/*/README.md` define el orden, las horas, el proyecto y los criterios del certificado, y enlaza a los módulos.
- **Migración:** `git mv` de las carpetas actuales a sus nuevos códigos. Hay que actualizar enlaces y los scripts (`ejecutar_notebooks.py`, `generar_diapositivas.sh`), y dejar en el README una tabla de equivalencias antiguo → nuevo.

---

## 4. La plataforma web

### 4.1 Qué copiar de las plataformas de éxito (patrones, no código ni diseño)

| Patrón | Plataformas de referencia | Cómo lo aplicamos |
|---|---|---|
| Lecciones cortas con práctica inmediata | DataCamp, Codecademy | Cada lección: vídeo o lectura de 5–15 min + ejercicio de código en la misma página |
| **Código ejecutable en el navegador**, sin instalar nada | DataCamp, Codecademy, Kaggle Learn | **JupyterLite** (Python en el navegador con Pyodide; incluye NumPy, pandas, scikit-learn, matplotlib y statsmodels). Para GPU o PyTorch: botón «Abrir en Colab» |
| Corrección automática con pistas | DataCamp, freeCodeCamp | Tests en cada ejercicio con mensajes de pista. Fase 3: retroalimentación del tutor de IA |
| Itinerarios y certificados acumulables | Coursera, DataCamp, Google Career Certificates | Los 4 bloques de la sección 2, con certificados verificables (Open Badges) |
| Progreso visible, rachas y XP | Duolingo, Platzi | Barra de progreso por módulo y bloque; racha semanal |
| Prueba de nivel | DataCamp (*skill assessments*) | Test de 15–20 preguntas que recomienda por qué bloque empezar |
| Contenido gratuito y certificado o mentoría de pago | Coursera (modalidad oyente), fast.ai, Hugging Face Learn | Contenido abierto; se paga el certificado, la corrección y la cohorte con mentor |
| Cohortes en vivo | Maven, programas universitarios en línea | Ediciones con fechas, sesiones en vivo y grupo (lo que ya define la guía del instructor) |
| Proyectos de portafolio públicos | Kaggle, Hugging Face | Cada proyecto se publica en GitHub o Hugging Face con una plantilla de presentación |
| Tutor de IA | Khan Academy (Khanmigo) | Tutor con Claude que responde con los apuntes del curso (RAG) y da pistas sin dar la solución |
| Comunidad | freeCodeCamp, Platzi | Foro o Discord por módulo |

### 4.2 Arquitectura por fases

**Fase 1 · Sitio de contenidos (MVP, 2–3 semanas, coste ≈ 0 €)**
- Generador de sitio estático a partir del repositorio. Recomendación: **Astro Starlight** o **MkDocs Material** (Markdown nativo, buscador, modo oscuro, multilenguaje). Alternativa muy orientada a notebooks: **Quarto** o **Jupyter Book**.
- Páginas por itinerario, módulo y lección generadas a partir de `apuntes.md`, con las diapositivas en PDF, los vídeos insertados (los externos de `recursos-abiertos.md` mientras no haya propios) y los cuestionarios como componentes interactivos.
- **JupyterLite** desplegado como estático para los notebooks de N1 y N2, más el botón «Abrir en Colab» en todos los notebooks.
- Progreso guardado en el navegador (`localStorage`), sin cuentas.
- Despliegue en **GitHub Pages** o **Vercel**, desde este repositorio, con cada `git push`.
- Página de inicio con propuesta de valor, itinerarios, prueba de nivel y lista de espera.

**Fase 2 · Cuentas, progreso y pagos (4–6 semanas)**
- Autenticación y base de datos con **Supabase** (o Firebase): progreso, resultados de cuestionarios y entregas.
- Pagos con **Stripe**: certificado individual, suscripción mensual y plaza en una cohorte.
- Certificados en PDF con código de verificación y Open Badges.
- Vídeo propio en un servicio con reproductor protegido (Bunny Stream, Mux, Vimeo) cuando se graben los vídeos.
- Panel del estudiante: itinerario, progreso, racha y próximos pasos.

**Fase 3 · Diferenciación (continuo)**
- **Tutor de IA** con la API de Claude y RAG sobre `apuntes.md`: responde dudas, da pistas graduadas y nunca entrega la solución completa de un ejercicio evaluable.
- Corrección automática de ejercicios en el navegador y retroalimentación personalizada.
- Comunidad, ranking de proyectos y *showcase* de portafolios.
- Analítica de aprendizaje: dónde abandonan los estudiantes, qué ejercicios fallan más.

**Alternativa sin desarrollo propio:** montar el contenido en una plataforma existente. Open edX es la plataforma de código abierto sobre la que funciona edX; Moodle es otra opción abierta, y también hay alternativas comerciales como Thinkific o LearnWorlds (ver `docs/como-lanzar-el-curso.md`). Es más rápido, pero se pierde la experiencia de código en el navegador integrada y la flexibilidad.

### 4.3 Criterios de calidad de la web
- Funciona bien en el móvil (lectura y cuestionarios; los notebooks, mejor en ordenador).
- Accesible: contraste, subtítulos, navegación con teclado.
- RGPD: cookies mínimas, política de privacidad y datos alojados en la UE si el público es europeo.
- Rápida: páginas estáticas, imágenes optimizadas.

---

## 5. Sobre REA (github.com/morluto/rea)

REA (*Reverse Engineer Anything*) es un servidor MCP y una CLI de licencia MIT para **ingeniería inversa**. Permite que un agente de IA inspeccione binarios nativos, aplicaciones JavaScript o Electron, ensamblados .NET y sitios web sin tener su código fuente, explique cómo funciona una funcionalidad y construya una versión parecida. Para el análisis nativo necesita herramientas como Ghidra, Hopper o IDA.

**Recomendación: no usarlo para este proyecto.**

1. **Riesgo legal.** Los términos de uso de las plataformas educativas comerciales suelen prohibir la ingeniería inversa, el *scraping* y la copia. Reproducir su código, diseño visual, textos o marca podría infringir derechos de autor, de marca o de competencia desleal. Inspirarse en **patrones de producto** (lecciones cortas, código en el navegador, rachas) es legítimo; copiar la implementación no lo es.
2. **No hace falta.** Todo lo que necesitamos ya existe como software abierto y documentado: JupyterLite, Starlight o MkDocs, Supabase, Open edX y Open Badges. No hay nada que descubrir por ingeniería inversa.
3. **Encaje.** REA está pensado para entender aplicaciones y binarios, no para diseñar experiencias de aprendizaje. El trabajo útil aquí es el diseño pedagógico y de producto de la sección 4.1.

Si en algún momento quieres entender en profundidad una herramienta **de código abierto** o **tu propia web** (por ejemplo, depurar cómo se comporta un componente), REA puede ser útil. Revisa siempre la licencia y los términos del objetivo antes de analizarlo.

---

## 6. Hoja de ruta propuesta

| Fase | Duración orientativa | Entregables |
|---|---|---|
| 0 · Reorganización | 1 semana | Repositorio con la estructura de la sección 3; módulos actuales migrados; READMEs de los 4 itinerarios |
| 1 · Web MVP | 2–3 semanas | Sitio estático publicado con los módulos existentes, JupyterLite, cuestionarios interactivos y prueba de nivel |
| 2 · Contenido N1 | 2 semanas | F2 SQL, F4 Matemáticas, F5 Herramientas y proyecto N1 |
| 3 · Contenido N3-AI | 4–6 semanas | AI1–AI8 + capstone, probados en GPU de Colab/Kaggle (prioridad por la demanda del mercado) |
| 4 · Contenido N2 y N3-DS | 4–6 semanas | I4, I8 y DS1–DS8 |
| 5 · Plataforma con cuentas y pagos | 4–6 semanas | Fase 2 de la web |
| 6 · Cohorte piloto | 14 semanas o más | Primera edición con 20–30 estudiantes, encuesta y mejoras |

Las fases 2–4 se pueden hacer en paralelo con la 1 y la 5.

## 7. Decisiones pendientes

1. ¿Qué especialización tiene prioridad: AI Engineering (mayor demanda y precio) o Data Science avanzada?
2. Generador de la web: Astro Starlight (más flexible y moderno) o MkDocs Material (más sencillo, todo en Python).
3. Modelo de negocio inicial: todo gratis para crear audiencia, o freemium (contenido gratis y certificado o mentoría de pago).
4. Idioma: solo español al principio, o español e inglés.
5. Dominio y nombre de la escuela.
