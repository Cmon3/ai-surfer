# Programa del curso

**AI Surfer · Ciencia de datos e IA aplicada, por niveles.** Este documento explica cómo se organiza el programa:
cuatro **itinerarios** que ordenan el aprendizaje, cinco **rutas por rol** que lo orientan al empleo y un **catálogo de módulos**
con códigos estables. El plan de trabajo vigente está en [docs/plan-v3-plataforma-y-empleabilidad.md](docs/plan-v3-plataforma-y-empleabilidad.md);
el estado de cada módulo, en el [README](README.md).

> Antes de los itinerarios, el curso era un único programa de 14 semanas. Se conserva como [sección histórica](#histórico-el-programa-original-de-14-semanas) al final.

## Cómo está organizado

```
N1 · FUNDAMENTOS (6 sem.)  →  N2 · INTERMEDIO (10 sem.)  →  N3-DS · Data Science avanzada (10 sem.)
                                                           →  N3-AI · AI Engineering (12 sem.)
```

- **Itinerarios (niveles):** cada uno es un conjunto de módulos con un proyecto integrador para el portafolio y un certificado acumulable.
  Empiezas donde te corresponda (la web incluye una prueba de nivel).
- **Módulos:** la unidad de estudio, con código estable (F1, I3, AI5…). Cada módulo completo trae lecciones en vídeo (guiones),
  apuntes, diapositivas, un notebook de práctica con soluciones, ejercicios de código que se corrigen en el navegador,
  un cuestionario y recursos abiertos.
- **Rutas por rol:** responden a «quiero trabajar de…». Reutilizan los mismos módulos, ordenados para un puesto concreto.

## Itinerarios

| Itinerario | Duración | Módulos | Proyecto | Certificado |
|---|---|---|---|---|
| [N1 · Fundamentos](itinerarios/n1-fundamentos/) | 6 semanas | F1 Python · F2 SQL · F3 Estadística · F4 Matemáticas para ML · F5 Herramientas | Análisis exploratorio completo con SQL + pandas e informe | *Fundamentos de Ciencia de Datos* |
| [N2 · Intermedio](itinerarios/n2-intermedio/) | 10 semanas | I1 No supervisado · I2 Regresión · I3 Clasificación y A/B · I4 Boosting* · I5 Deep learning · I6 Series temporales · I7 LLMs por API · I8 Producción | Modelo predictivo desplegado como API, con informe de negocio | *Machine Learning Aplicado* |
| [N3-DS · Data Science avanzada](itinerarios/n3-data-science/) | 10 semanas | DS1–DS3 Causalidad, experimentación y bayesiana* · DS4 Recomendación · DS5 Redes y grafos · DS6–DS8 Forecasting, datos a escala y comunicación* | Capstone DS: decisión causal o experimental | *Data Science Avanzada* |
| [N3-AI · AI Engineering](itinerarios/n3-ai-engineering/) | 12 semanas | AI1 Transformers · AI2 Apps con LLMs · AI3 RAG y agentes · AI4 Evaluación · AI5 Fine-tuning · AI6 Alineación · AI7 Inferencia · AI8 Seguridad y LLMOps · AI9 Multimodal* | Capstone AI publicado en Hugging Face | *AI Engineering* |

\* En preparación o con material incompleto: el estado exacto de cada módulo está en el [README](README.md).

## Rutas por rol

Cada ruta termina con tres piezas de portafolio que un reclutador puede comprobar abriendo un repositorio. Se muestran,
con el estado de cada módulo, en la página `/rutas/` de la [web](web/README.md). Detalle y justificación en la
[sección 4 del plan v3](docs/plan-v3-plataforma-y-empleabilidad.md).

| Ruta | Módulos | Portafolio mínimo |
|---|---|---|
| **Data Scientist** | N1 + N2 + DS1–DS3, DS8 + CAR | Análisis con decisión de negocio · modelo desplegado · experimento A/B o estudio causal |
| **ML Engineer / MLOps** | N1 + N2 + CL1, DS7 + CAR | I8 desplegado en la nube con monitorización · pipeline de datos orquestado |
| **AI Engineer** | F1, F2, F5 + I3, I7, I8 + AI1–AI4, AI8, AI10 + CL1 + CAR | RAG evaluado · agente con servidor MCP propio y evals en CI · capstone AI |
| **Forward Deployed Engineer** | Ruta AI Engineer + FS1 + AI9 + CAR (énfasis en comunicación) | Demo full-stack para un «cliente» con discovery documentado |
| **LLM post-training** (nicho) | Ruta AI Engineer + AI5–AI7 completos | Modelo ajustado y publicado con evaluación frente al modelo base |

AI10 (agentes en producción, MCP), CAR (empleabilidad), CL1 (cloud) y FS1 (full-stack) son los módulos nuevos del plan v3.

## Cómo se estudia un módulo

| Paso | Actividad | Tiempo aprox. |
|---|---|---|
| 1 | Vídeos y apuntes de las lecciones | 2–3 h |
| 2 | Notebook guiado y **ejercicios de código** (se corrigen solos en el navegador) | 2–3 h |
| 3 | Cuestionario de autoevaluación (corrección inmediata con explicación) | 20 min |
| 4 | Caso práctico entregable, con rúbrica | 1–2 h |
| 5 | Sesión en vivo con mentor (cuando haya cohorte) | 1,5 h |

El ritmo orientativo es de 6–8 h/semana. Cada itinerario indica sus semanas en su propio README.

## Evaluación y certificados

La ponderación y los requisitos están en [docs/evaluacion-y-certificado.md](docs/evaluacion-y-certificado.md); el cálculo de la nota original
(que sigue siendo la base de cada bloque) fue:

| Componente | Peso |
|---|---|
| Cuestionarios semanales | 15 % |
| Casos prácticos semanales | 40 % |
| Participación en sesiones en vivo | 5 % |
| Proyecto final | 40 % |

Para impartirlo como cohorte, véanse [docs/como-lanzar-el-curso.md](docs/como-lanzar-el-curso.md) y [docs/guia-del-instructor.md](docs/guia-del-instructor.md).

---

## Histórico: el programa original de 14 semanas

El curso nació como un programa único de **14 semanas · 6–8 h/semana** (*Ciencia de Datos e IA Aplicada: de los datos a las decisiones*).
Los itinerarios actuales lo han absorbido y ampliado; se conserva el calendario por si ayuda a ver de dónde viene cada módulo.

| Semana(s) | Tema original | Hoy está en |
|---|---|---|
| 0–1 | Fundamentos de Python para datos | F1 (y F2, F5) |
| 2 | Estadística para la toma de decisiones | F3 |
| 3 | Clustering y reducción de dimensión | I1 |
| 4 | Regresión y predicción | I2 |
| 5 | Clasificación y pruebas de hipótesis (incl. A/B) | I3 |
| 6 | Deep learning | I5 |
| 7 | Recuperación y entrega intermedia | (sin módulo propio) |
| 8 | Sistemas de recomendación | DS4 |
| 9 | Redes y grafos | DS5 |
| 10 | Series temporales | I6 |
| 11 | IA generativa y modelos de lenguaje | I7 (y el bloque N3-AI) |
| 12–14 | Proyecto final | [proyecto-final/](proyecto-final/) y los proyectos de cada itinerario |

El ritmo semanal era: lunes vídeos y lecturas (2–3 h) · martes–miércoles notebook guiado (2 h) · jueves sesión en vivo con mentor (1,5 h) ·
domingo entrega del caso práctico y cuestionario (1–2 h).
