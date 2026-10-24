# Plan v3 · De curso a plataforma orientada a empleo

Continúa el [plan v2](plan-v2-itinerarios-y-plataforma.md) (itinerarios y web). Este documento responde a tres preguntas: **qué falta y qué está roto**, **qué pide hoy el mercado laboral** y **qué hay que construir para que AI Surfer sea una plataforma propia de cursos de tecnología que lleve a ofertas reales**.

- **Fecha:** 23 de octubre de 2026.
- **Revisión siguiente:** enero de 2027 (ver la sección 7: el plan caduca rápido).

---

## Estado a 24-10-2026 (ejecución del plan)

Hecho en la segunda revisión, con 12 agentes en paralelo y verificación central (todos los notebooks ejecutados y sus salidas revisadas):

| Del plan | Estado |
|---|---|
| Sección 3, contenido nuevo: **AI10**, **CAR**, **CL1**, **FS1**, **I4**, **AI9** | ✅ Hechos |
| N3-DS: **DS1, DS2, DS3, DS6, DS7, DS8** y **capstone DS** | ✅ Hechos |
| D1: completar AI5–AI8 · D2: AI3 con base vectorial real · D3: proyecto N2 con despliegue · D10 | ✅ Hechos |
| F5.7 (agentes de código) · capstone AI opción B | ✅ Hechos |
| D4 `PROGRAMA.md` · D6 enlaces a Colab (`Cmon3/ai-surfer`) · D7 README de la web · D9 CI del curso · D11 Pyodide | ✅ Hechos |
| Fase 1b de la web: ejercicios en el navegador (34, verificados también en Chrome real), cuestionarios interactivos, página de rutas | ✅ Hechos |
| D5 PDF de las diapositivas · F2 sin diapositivas ni guiones | ⏳ Pendiente |
| D8 licencia · despliegue público de la web · analítica · correo de la lista de espera | ⏳ Pendiente: decisiones tuyas (sección 9) |
| Fase 2 (Supabase, Stripe, certificados) y fase 3 (tutor de IA) | ⏳ Pendiente: requiere crear las cuentas |

**Limitaciones conocidas:** las celdas que llaman a la API de Claude solo se han probado en su camino sin clave; las plantillas de Azure/Terraform (CL1) y los esqueletos para Colab con GPU (AI5–AI7, AI9, DS6) no se han ejecutado; Spark, Airflow y Kafka (DS7) se simulan; las URL de `recursos-abiertos.md` no se han comprobado una a una; la ficha de cumplimiento de AI8 cita artículos del Reglamento europeo de IA que debería revisar un jurista. En macOS, XGBoost y LightGBM (I4) necesitan `brew install libomp`.

## 0. Resumen

| | |
|---|---|
| **Estado** | 22 módulos con material completo o utilizable, de 30 previstos. La web estática compila (73 páginas). Los 40 notebooks se ejecutan sin errores. |
| **Lo que más falta para conseguir empleo** | 1) Producción y MLOps (hecho hoy: I8). 2) Agentes en producción con **MCP** y observabilidad. 3) **Cloud** (AWS/Azure). 4) Preparación de **entrevistas y portafolio**. 5) Soltura con **agentes de código** (Claude Code, Cursor). |
| **Rol emergente que el curso no contempla** | *Forward Deployed Engineer* (FDE): ingeniería de IA de cara al cliente, con full-stack (TypeScript/React) y comunicación. Aparece en 4 de las 27 ofertas revisadas. |
| **Prioridad de contenido** | AI10 (agentes y MCP) → CAR (empleabilidad) → CL1 (cloud) → completar AI5–AI8 → I4 → resto de N3-DS |
| **Prioridad de plataforma** | Terminar la fase 1 (enlaces a Colab reales, ejercicios autocorregidos en el navegador, despliegue, licencia) antes de cuentas y pagos |

### Hecho en esta revisión
- **Nuevo módulo I8 · Del notebook a producción**: paquete, tests, FastAPI, Docker, GitHub Actions, MLflow, deriva con PSI y `AGENTS.md`. Verificado de punta a punta, incluida la imagen Docker.
- **Migración de AI2–AI4 a la API actual de Claude** (`claude-opus-5-5`). Con el razonamiento siempre activo, `content[0].text` podía fallar; ahora se busca el bloque de texto, se dejan `max_tokens` holgados, se atienden llamadas paralelas a herramientas y el juez usa salidas estructuradas.
- **AI4 ya no enseña `temperature=0`**: la API lo rechaza desde el 21-10-2026. La reproducibilidad se plantea con modelo fijado, prompt versionado y repeticiones.
- **Cuestionarios de AI6, AI7 y AI8 rehechos**: eran afirmaciones con la respuesta marcada, no se podían evaluar.
- **Prueba de nivel**: ningún reto de código podía aprobarse (se comparaba `2.0` con el texto `"2"`). Corregido, junto con pistas que daban la solución y una salida HTML sin escapar.
- **`scripts/ejecutar_notebooks.py`** usaba el kernel `python3` del sistema (Python 3.9), y 8 notebooks fallaban por ello. Ahora usa el intérprete del `.venv`.
- `requirements.txt` (Python ≥ 3.10, `anthropic` 2.x, dependencias de producción) y tabla de estado del README actualizados.

---

## 1. Auditoría del contenido

### 1.1 Estado por módulo

| Bloque | Completo | Utilizable, incompleto | Pendiente |
|---|---|---|---|
| N1 | F1, F3, F4, F5, proyecto N1 | F2 (faltan diapositivas y guiones) | — |
| N2 | I1, I2, I3, I5, I6, I7, **I8** | proyecto N2 (no incluye aún el despliegue que enseña I8) | I4 |
| N3-DS | DS4, DS5 | — | DS1, DS2, DS3, DS6, DS7, DS8, capstone DS |
| N3-AI | AI1, AI2, AI3, AI4 | AI5, AI6, AI7, AI8 (sin apuntes, guiones ni soluciones; notebooks de 10–14 celdas) · capstone AI (solo README) | AI9 (esqueleto) |

### 1.2 Deuda y defectos detectados (pendientes)

| # | Qué | Dónde | Impacto | Esfuerzo |
|---|---|---|---|---|
| D1 | AI5–AI8 en «versión corta»: faltan `apuntes.md`, `guiones.md` y `soluciones.ipynb`; los README son de un tercio de la longitud del resto | `modulos/AI5..AI8` | Alto: es el bloque más vendible | 1–2 días por módulo |
| D2 | AI3 no enseña **MCP** ni bases vectoriales reales (pgvector) ni *reranking* | `modulos/AI3-rag-agentes` | Alto (pedido explícitamente en ofertas) | Ver AI10 |
| D3 | El proyecto N2 no exige despliegue (API + Docker + CI) | `proyecto-final/` | Medio | 0,5 días |
| D4 | `PROGRAMA.md` describe el plan antiguo de 14 semanas | raíz | Bajo (confunde) | 1 h: convertirlo en histórico o reescribirlo por itinerarios |
| D5 | Los módulos nuevos no tienen `diapositivas.pdf` generado | F4, F5, AI*, I8 | Bajo | `scripts/generar_diapositivas.sh` |
| D6 | Enlace a Colab con marcador `[tu-usuario]/[tu-repo]` | `web/src/pages/modulos/[codigo]/apuntes.astro` | Alto en cuanto se publique | 10 min (depende de D8) |
| D7 | `web/README.md` es la plantilla de Astro | `web/` | Bajo | 30 min |
| D8 | Sin `LICENSE` ni repositorio remoto definido | raíz | Bloquea publicar | Decisión tuya (sección 9) |
| D9 | Sin CI del propio curso: nadie detecta que un notebook se rompe | raíz | Medio | Ver sección 7 |
| D10 | AI7: el comentario de la celda de KV-cache dice «linear total» (es O(T) por paso, O(T²) total) | `AI7-inferencia/notebook.ipynb` | Bajo | 5 min, al completar AI7 |
| D11 | El harness de la prueba de nivel ejecuta Pyodide 0.26.2 (2024) | `web/src/pages/prueba-de-nivel.astro` | Bajo | Actualizar con la plataforma de ejercicios (sección 6) |

---

## 2. Qué pide el mercado (octubre de 2026)

### 2.1 Muestra analizada
27 ofertas relevantes publicadas en España entre febrero y octubre de 2026 (Indeed: búsquedas «AI Engineer LLM», «Data Scientist» en Madrid y «Machine Learning Engineer MLOps» en Barcelona), 8 de ellas leídas en detalle, más informes de tendencias de 2026 ([kodekloud](https://kodekloud.com/blog/ai-engineer-roadmap/), [digitalapplied](https://www.digitalapplied.com/blog/ai-developer-hiring-skills-that-matter-2026), [provn](https://provn.co/roles/ai-software-engineer), [365 Data Science](https://365datascience.com/career-advice/data-scientist-job-market/)). Es una muestra, no un estudio de mercado: sirve para detectar huecos, no para dar porcentajes.

Ofertas leídas en detalle:

| Empresa · puesto | Lo que más pesa |
|---|---|
| [TomTom · AI Engineer (Madrid)](https://to.indeed.com/aasyqkdlfqtf) | RAG, agentes, **evaluación automatizada y guardarraíles**, CI/CD para ML, Docker/Kubernetes, cloud, MLflow |
| [Galadrim · AI/ML Engineer junior (Madrid, 30–35 k€)](https://to.indeed.com/aazqm824wrlf) | 0 años de experiencia; **Cursor o Claude Code** con fluidez; full-stack (React/TS, Node); APIs de LLM; visión (YOLO); explicar conceptos a clientes |
| [Provectus · Junior AI/ML Engineer (remoto)](https://to.indeed.com/aabp2j2njnrc) | RAG en producción, AWS (Lambda, ECS, **Bedrock**), CI/CD, **evaluación de sistemas no deterministas**, coste/latencia, ecosistema Claude (CLAUDE.md, hooks, skills), **MCP**, *spec-driven development*, A2A |
| [HappyRobot · Forward Deployed Engineer](https://to.indeed.com/aadcl28m8lzq) | Full-stack React/TS/Node + Python, LLM prompting, **voz** (transcripción, voces), integraciones con APIs de terceros, trato con cliente |
| [Kabilio · AI Engineer (Barcelona)](https://to.indeed.com/aakpgyr7fb9p) | LLM + RAG, **agentes**, elegir entre ML clásico e IA generativa, procesado de documentos a escala |
| [Wallapop · MLOps Engineer (Barcelona)](https://to.indeed.com/aan7b4bhsct2) | Plataforma ML, AWS SageMaker, Kubernetes, **Kafka**/tiempo real, bases vectoriales/búsqueda semántica, MLflow/Feast/Flyte, Airflow/dbt, Spark |
| [Reale · Data Scientist (Madrid)](https://to.indeed.com/aa7bslz8svxz) | ML/DL + **LLM e IA generativa**, ingeniería de software, **Azure**, ética y uso responsable de la IA, presentar a público no técnico |
| [ICF · Associate Data Scientist (Madrid)](https://to.indeed.com/aazn6tmfvxwq) | Python, estadística, ML con *baselines*, código reproducible, Git, LLMs contrastados con la fuente, comunicación |

Otras ofertas de la muestra: Allianz y Alvarez & Marsal (Forward Deployed Engineer), BCG X (Forward Deployed AI Scientist, también en prácticas), Axmed y Drive Revel (AI Engineer), TomTom (Lead Applied Scientist), Symrise (graduate DS/ML), Linde y Outrigo (AI/ML Engineer), Impress (ML Engineer), Aristocrat, MCEng, Timestamp y Q-tech (MLOps Engineer), BIP (Data & AI Architect), Prima, Santalucía y Rhythm Pharmaceuticals (Data Scientist).

### 2.2 Lo que se repite

1. **Producción por encima de prototipos.** Docker, CI/CD, APIs, monitorización y coste/latencia aparecen en casi todas las ofertas de ingeniería.
2. **Evaluación de sistemas con LLMs** como habilidad diferenciadora (TomTom, Provectus). El curso la cubre bien (AI4).
3. **Agentes + MCP**: Provectus pide explícitamente saber por qué un agente preferiría MCP a una integración REST; las tendencias de 2026 lo describen como el estándar de facto. **El curso no lo menciona.**
4. **Agentes de código** (Claude Code, Cursor) como requisito, no como extra. Algunos procesos permiten usar un asistente en el live coding (Provectus) y otros lo prohíben (ICF): hay que preparar ambas situaciones.
5. **Cloud**: AWS y Azure, sobre todo. Bedrock, SageMaker, Azure ML. **El curso no tiene cloud.**
6. **Full-stack ligero para AI Engineers y FDE**: React/TypeScript/Node para construir demos y productos alrededor del modelo.
7. **Comunicación con negocio y clientes**: presentar a público no técnico, simulaciones comerciales en el proceso de selección (Galadrim), *forward deployed*.
8. **Datos a escala** (MLOps/DS senior): Spark, Kafka, Airflow, dbt, Databricks.
9. **IA responsable y regulación** (Reale, ICF): el curso lo trata en AI8 y en la ficha del modelo de I8.
10. **Inglés B2+** y procesos con partes en inglés.

### 2.3 Matriz de cobertura

| Habilidad | Peso en ofertas | Cobertura actual | Acción |
|---|---|---|---|
| Python, SQL, estadística, ML clásico | Muy alto | ✅ F1–F4, I1–I3 | Mantener; añadir I4 (boosting + SHAP) |
| APIs de LLM, prompting, salidas estructuradas | Muy alto | ✅ I7, AI2 | Mantener al día (sección 7) |
| RAG | Muy alto | 🟡 AI3 con TF-IDF/embeddings en memoria | Añadir pgvector, *chunking* real, *reranking*, búsqueda híbrida |
| Agentes y **MCP** | Alto | 🟡 AI3 (bucle manual), sin MCP | **Nuevo AI10** |
| Evaluación de LLMs | Alto (diferenciador) | ✅ AI4 | Añadir evals en CI y evaluación de agentes (trayectorias) en AI10 |
| FastAPI, Docker, CI/CD, tests | Muy alto | ✅ **I8 (nuevo)** | Exigirlo en el proyecto N2 (D3) |
| MLflow, monitorización, deriva | Alto | ✅ I8 | Ampliar observabilidad de LLMs en AI10 |
| Cloud (AWS / Azure / GCP) | Alto | ❌ | **Nuevo CL1** |
| Agentes de código (Claude Code, Cursor) | Alto y creciente | 🟡 I8.9 | Lección en F5 + práctica guiada en CAR |
| Full-stack (TypeScript/React) | Medio (alto en FDE) | ❌ | **Nuevo FS1** (optativo) |
| Voz y multimodal | Medio | 🚧 AI9 esqueleto | Subir prioridad de AI9, con agentes de voz |
| Fine-tuning, DPO/GRPO, inferencia | Medio (plus salarial) | 🟡 AI5–AI7 versión corta | Completar (D1) |
| Spark, Kafka, Airflow, dbt, Databricks | Medio (MLOps/DS senior) | ❌ | DS7 ampliado |
| Comunicación, storytelling, trato con cliente | Alto | 🟡 informes en proyectos | DS8 + CAR |
| Entrevistas, portafolio, CV | Decisivo | ❌ | **Nuevo CAR** |
| IA responsable, RGPD, Reglamento europeo de IA | Medio | 🟡 AI8, I8 | Mantener |

---

## 3. Contenido nuevo propuesto

| Código | Módulo | Bloque | Contenido clave | Prioridad |
|---|---|---|---|---|
| **AI10** | **Agentes en producción: MCP, orquestación y observabilidad** | N3-AI | Escribir un **servidor MCP** (herramientas, recursos, permisos), consumirlo desde un agente; *tool runner* frente a bucle manual; multiagente (supervisor/trabajadores) y cuándo **no** usarlo; A2A a nivel conceptual; *tracing* con OpenTelemetry; coste y latencia por tarea; **evaluación de trayectorias** y evals en CI; seguridad (inyección por descripciones de herramientas, mínimo privilegio, confirmación humana) | 1 |
| **CAR** | **Empleabilidad: portafolio, entrevistas y búsqueda** | Transversal (una sesión por bloque) | Portafolio en GitHub/Hugging Face con README de producto; CV que pasa filtros automáticos; LinkedIn; tipos de prueba técnica (quiz con tiempo, live coding con y sin IA, caso para casa, diseño de sistemas de ML/LLM, entrevista conductual); simulacros grabados; inglés técnico; salarios y negociación en España; cómo leer una oferta (requisito real vs deseable) | 1 |
| **CL1** | **Cloud para datos e IA** | N2 optativo / N3 | Patrón común (almacenamiento, cómputo, contenedores gestionados, IAM, secretos, costes) en **AWS** (S3, Lambda, ECS/App Runner, Bedrock, SageMaker) y su equivalente en **Azure** (Blob, Functions, Container Apps, Azure ML, Foundry); desplegar la imagen del I8; alarma de presupuesto | 2 |
| **FS1** | **Full-stack para AI Engineers** | N3-AI optativo | TypeScript esencial, una interfaz de chat con *streaming* en Next.js sobre la API del AI2, autenticación básica, despliegue. Pensado para el rol FDE | 3 |
| **I4** | Ingeniería de variables y gradient boosting (ya previsto) | N2 | XGBoost/LightGBM, validación temporal y por grupos, fugas, SHAP | 2 |
| **AI9** | Multimodal (ya previsto, sube de prioridad) | N3-AI | Visión-lenguaje (extracción de facturas), transcripción y **agentes de voz** (latencia, turnos, interrupciones) | 3 |
| **DS7** | Datos a escala (ya previsto, ampliado) | N3-DS | DuckDB/Polars → Spark (o Databricks Free Edition), Airflow, dbt, Kafka a nivel práctico mínimo | 3 |

Cambios en módulos existentes:
- **F5:** lección 5.7 «Tu primer día con un agente de código»: instalar, `CLAUDE.md`/`AGENTS.md`, pedir un cambio pequeño con tests, revisar el diff.
- **AI3:** sustituir el índice en memoria por pgvector (o SQLite + extensión vectorial) y añadir *reranking* y búsqueda híbrida.
- **Proyecto N2:** pasa a ser «modelo desplegado como API con CI en verde e informe de negocio», con la rúbrica del caso práctico de I8.
- **Capstone AI:** añadir una opción B, «agente con MCP + evaluación + despliegue», para quien no vaya a hacer fine-tuning.

---

## 4. Rutas por rol

Los bloques N1–N3 ordenan el aprendizaje; las **rutas** responden a «quiero trabajar de X». Se muestran en la web como filtros sobre el mismo catálogo.

| Ruta | Módulos | Portafolio mínimo |
|---|---|---|
| **Data Scientist** | N1 + N2 + DS1–DS3, DS8, I4 + CAR | Análisis con decisión de negocio (proyecto N1) · modelo desplegado (I8/N2) · experimento A/B o estudio causal (capstone DS) |
| **ML Engineer / MLOps** | N1 + N2 + I4, CL1, DS7 + CAR | Repositorio I8 desplegado en la nube con monitorización · pipeline de datos orquestado |
| **AI Engineer** | N1 (F1, F2, F5) + N2 (I3, I7, I8) + AI1–AI4, AI8, AI10, CL1 + CAR | RAG evaluado · agente con servidor MCP propio y evals en CI · capstone AI |
| **Forward Deployed Engineer** | Ruta AI Engineer + FS1 + AI9 (voz) + CAR con énfasis en comunicación | Demo full-stack para un «cliente» con discovery documentado |
| **LLM post-training** (nicho, plus salarial) | AI Engineer + AI5–AI7 completos | Modelo ajustado y publicado en Hugging Face con evaluación frente al modelo base |

**Criterio de diseño:** cada ruta termina con 3 piezas de portafolio que respondan directamente a requisitos de la sección 2. Un reclutador debería poder comprobar cada línea del CV abriendo un repositorio.

---

## 5. Empleabilidad como producto, no como anexo

Lo que diferencia a una plataforma «que consigue trabajo» de una que «enseña temas»:

1. **Portafolio verificable.** Cada entrega final es un repositorio público con CI en verde. La plataforma muestra el estado del CI en el perfil público del estudiante.
2. **Simulacros de entrevista** por rol, con un banco de preguntas (técnicas, de diseño de sistemas y conductuales) y retos de live coding cronometrados en el navegador, en dos modos: con asistente de IA permitido y sin él.
3. **Revisión de CV y LinkedIn** por mentores (servicio de pago) con una guía y plantillas gratuitas.
4. **Observatorio de ofertas.** Un informe trimestral generado a partir de ofertas reales (sección 7) que alimenta el temario y se publica como contenido gratuito (imán de captación y prueba de que el curso está al día).
5. **Red de empresas.** Acuerdos con empresas que contratan perfiles junior (consultoras, startups de IA) para *demo days* de capstones. Métrica estrella: **tasa de colocación a 6 meses**.
6. **Certificaciones externas**: mapa de qué módulos preparan para las certificaciones de cloud de AWS y Azure en IA/ML y para las certificaciones de proveedores de modelos que ya citan las ofertas. Verificar nombres y vigencia antes de publicarlo: cambian a menudo.

---

## 6. La plataforma

### 6.1 Punto de partida
- **Hecho:** sitio Astro estático generado desde el repositorio (inicio, itinerarios, módulos con apuntes y cuestionario, progreso en `localStorage`, prueba de nivel con retos de Python que se ejecutan en el navegador con Pyodide).
- **Falta de la fase 1 del plan v2:** ejercicios ejecutables en cada lección, enlaces a Colab reales, despliegue público, licencia, analítica.

### 6.2 Fases

**Fase 1b · Cerrar el MVP (2–3 semanas)**
1. Decidir repositorio público y licencia (D8) → enlaces a Colab reales (D6).
2. **Motor de ejercicios en el navegador**: generalizar el arnés de la prueba de nivel (Pyodide + tests en Python) a un componente reutilizable. Los ejercicios se definen en Markdown/YAML dentro de cada módulo (`ejercicios.yml`: enunciado, código inicial, tests, pistas graduadas). Se ejecuta en un Web Worker para no bloquear la página. Cubre F1–F4 e I1–I3 sin servidor.
3. Cuestionarios interactivos a partir de `cuestionario.md` (parseo del formato actual), con corrección y explicación inmediatas.
4. Despliegue en **Vercel** o **GitHub Pages** con cada push a `main`; dominio propio.
5. Analítica respetuosa con la privacidad (sin cookies) para ver dónde abandona la gente.
6. Página de **rutas por rol** (sección 4) y **lista de espera**.

**Fase 2 · Cuentas, progreso y pagos (4–6 semanas)**
- **Supabase** (región UE): autenticación, progreso, resultados de ejercicios y cuestionarios. Seguridad por filas (RLS) desde el primer día: cada estudiante solo lee lo suyo.
- **Stripe**: suscripción mensual, pago por ruta y plaza en cohorte. Facturación con IVA de la UE.
- **Certificados verificables**: PDF con código de verificación + **Open Badges 3.0**.
- **Entregas por GitHub**: el estudiante conecta su repositorio y la plataforma lee el estado del CI (GitHub API) como parte de la corrección. Reutiliza el CI del I8.
- Panel del estudiante: ruta, progreso, racha semanal, siguiente paso.
- Vídeo propio en un servicio con reproductor protegido cuando se graben (guiones ya escritos).

**Fase 3 · Diferenciación (continuo)**
- **Tutor de IA** con la API de Claude y RAG sobre `apuntes.md`: pistas graduadas, nunca la solución de un ejercicio evaluable; límites de coste por usuario; evaluación del tutor con un conjunto propio (aplicar AI4 a tu producto).
- **Corrección asistida de entregas abiertas** (informes, README): rúbrica + LLM como juez calibrado con correcciones humanas, siempre con revisión del mentor antes de la nota final.
- **Simulador de entrevistas** (sección 5).
- Comunidad por cohorte (Discord), *showcase* de portafolios y *demo days*.
- **B2B**: panel para empresas que forman equipos (progreso agregado, rutas a medida).

### 6.3 Arquitectura objetivo

```
Repositorio (fuente de verdad: modulos/, itinerarios/, ejercicios.yml)
   │  build en cada push
   ▼
Astro (estático) ──► CDN (Vercel/Pages)
   │   islas interactivas: ejercicios (Pyodide en Web Worker), cuestionarios, progreso
   ▼
Supabase (UE): auth · Postgres con RLS · storage de entregas
   ├─ Stripe (webhooks → Edge Function → tabla de suscripciones)
   ├─ GitHub API (estado del CI de las entregas)
   └─ Edge Function «tutor» → API de Claude (RAG sobre apuntes; límites por usuario)
```

Decisiones razonadas:
- **Seguir con Astro**: el contenido es Markdown y notebooks; las partes interactivas son islas. No hace falta una SPA.
- **Supabase** porque ya lo usas en otros proyectos (agon, quipu) y da auth + Postgres + RLS + funciones en el mismo sitio.
- **Pyodide para N1–N2, Colab para GPU**: ejecutar PyTorch o modelos grandes en el navegador no es viable; no intentarlo.

### 6.4 Costes orientativos (hasta ~1.000 usuarios activos)
Hosting estático y CDN: 0–20 €/mes · Supabase: 0–25 €/mes · dominio: ~15 €/año · Stripe: comisión por transacción · tutor de IA: el coste variable principal; limitar por usuario y medir con los datos de uso desde el primer día.

---

## 7. Mantenerlo al día (el curso caduca)

En este campo el material envejece en meses: en esta revisión había un modelo retirado del uso recomendado en tres notebooks y una práctica (`temperature=0`) que la API ya no acepta. Proceso propuesto:

| Frecuencia | Tarea | Herramienta |
|---|---|---|
| Cada push | Ejecutar los notebooks afectados y compilar la web | GitHub Actions con `scripts/ejecutar_notebooks.py` (sin clave de API: las celdas [API] se saltan) |
| Semanal | Ejecutar todos los notebooks con dependencias sin fijar, para detectar roturas de librerías antes que los estudiantes | GitHub Actions programado |
| Mensual | Ejecutar las celdas [API] con clave real (coste: céntimos) y revisar avisos de obsolescencia del SDK | Manual o programado con un secreto |
| Trimestral | **Observatorio de ofertas**: 30–50 ofertas reales por rol, actualizar la matriz de la sección 2.3 y este plan | Conector de Indeed o el proyecto `reddit-digest` para tendencias de comunidad |
| Trimestral | Revisar identificadores de modelos, precios y funciones de la API; revisar el calendario del Reglamento europeo de IA | Documentación oficial |
| Por módulo | Añadir «Última revisión: AAAA-MM» en cada README | — |

---

## 8. Hoja de ruta

| Sprint (2 semanas) | Contenido | Plataforma |
|---|---|---|
| 1 | AI10 (agentes, MCP, observabilidad) · proyecto N2 con despliegue (D3) | Licencia + repositorio público (D8) · Colab (D6) · CI del curso (D9) |
| 2 | CAR (empleabilidad) · lección F5.7 (agentes de código) | Motor de ejercicios en el navegador (F1–F3) · despliegue público |
| 3 | Completar AI5 y AI6 (D1) | Cuestionarios interactivos · página de rutas · lista de espera |
| 4 | Completar AI7 y AI8 (D1) · AI3 con pgvector | Ejercicios para I1–I3 · analítica |
| 5 | CL1 (cloud) | Supabase: auth y progreso con RLS |
| 6 | I4 (boosting + SHAP) | Stripe + certificados verificables |
| 7–8 | AI9 (multimodal y voz) · FS1 | Entregas por GitHub · panel del estudiante |
| 9+ | N3-DS (DS1–DS3, DS6–DS8) | Tutor de IA · simulador de entrevistas |
| En paralelo | Grabación de vídeos con los guiones existentes, empezando por N1 (es el embudo de entrada) | Cohorte piloto de 20–30 personas cuando estén N1, N2 y la ruta AI Engineer |

**Por qué este orden:** la ruta AI Engineer es la de mayor demanda y precio, y sus huecos (MCP, cloud, empleabilidad) son pocos y concretos. Cerrarla primero permite lanzar una cohorte piloto con una promesa clara («AI Engineer listo para entrevistas») antes de terminar todo el catálogo.

---

## 9. Decisiones pendientes (tuyas)

1. **Licencia y apertura:** ¿contenido abierto (p. ej. CC BY-NC-SA) y negocio en certificados, mentoría y cohortes, o contenido cerrado? Bloquea publicar.
2. **Primera ruta a lanzar:** recomendación, AI Engineer.
3. **Idioma:** solo español al principio, o español + inglés (las ofertas piden inglés B2: módulos con materiales en inglés serían también práctica).
4. **Modelo de negocio inicial:** freemium (N1 gratis) + suscripción, o cohortes de pago desde el principio.
5. **Nombre y dominio** definitivos (el repositorio usa «AI Surfer»).
6. **¿Rol FDE como ruta propia** o como variante de AI Engineer?

---

## Fuentes

- Ofertas: enlaces de la tabla 2.1 (Indeed España, consultadas el 23-10-2026; pueden caducar).
- [AI Engineer Roadmap 2026 — KodeKloud](https://kodekloud.com/blog/ai-engineer-roadmap/)
- [AI Developer Hiring 2026: Skills That Actually Matter — Digital Applied](https://www.digitalapplied.com/blog/ai-developer-hiring-skills-that-matter-2026)
- [AI Engineer: Role, Skills, Salary & Challenges (2026) — Provn](https://provn.co/roles/ai-software-engineer)
- [Top 13 AI Developer Skills for 2026 — DOIT](https://doit.software/blog/ai-developer-skills)
- [What Employers Want: AI Skills and Certifications in 2026 Job Postings — AI Cert Atlas](https://aicertatlas.com/guides/what-employers-want-ai-skills/)
- [The Data Scientist Job Market in 2026 — 365 Data Science](https://365datascience.com/career-advice/data-scientist-job-market/)
- [Data Scientist Skills 2026 — Interview Query](https://www.interviewquery.com/p/data-scientist-skills-2026)
