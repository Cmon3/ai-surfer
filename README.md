# Ciencia de Datos e IA Aplicada: escuela por niveles

Escuela online con **itinerarios por niveles**: empiezas donde te corresponde y avanzas hasta data science avanzada o AI engineering. Cada bloque termina con un **proyecto integrador** para tu portafolio y da un **certificado acumulable**.

> Este repositorio contiene **todo el material del curso**: programa, módulos, notebooks ejecutables, ejercicios, rúbricas y la guía para impartirlo. Está pensado para que puedas lanzarlo como tu propio curso (en una plataforma, con cohortes y mentores) o usarlo para estudiar por tu cuenta.

## Itinerarios

```
N1 · FUNDAMENTOS (6 sem.)  →  N2 · INTERMEDIO (10 sem.)  →  N3-DS · Data Science avanzada (10 sem.)
                                                           →  N3-AI · AI Engineering (12 sem.)
```

| Bloque | Para quién | Certificado |
|---|---|---|
| [N1 · Fundamentos](itinerarios/n1-fundamentos/) | Empiezas desde cero o necesitas base sólida (Python, SQL, estadística, matemáticas, Git) | *Fundamentos de Ciencia de Datos* |
| [N2 · Intermedio](itinerarios/n2-intermedio/) | Ya tienes base y quieres el núcleo de ML: supervisado, no supervisado, deep learning, series, LLMs por API y despliegue | *Machine Learning Aplicado* |
| [N3-DS · Data Science avanzada](itinerarios/n3-data-science/) | Camino a puestos senior: causalidad, experimentación, bayesiana, recomendación, grafos, forecasting, datos a escala | *Data Science Avanzada* |
| [N3-AI · AI Engineering](itinerarios/n3-ai-engineering/) | Camino a puestos AI/LLM Engineer: transformers, RAG y agentes, evaluación, fine-tuning, DPO/GRPO, inferencia y LLMOps | *AI Engineering* |

Se puede cursar un bloque directamente si se supera la prueba de nivel correspondiente. El diseño completo (itinerarios, plataforma web y hoja de ruta) está en [docs/plan-v2-itinerarios-y-plataforma.md](docs/plan-v2-itinerarios-y-plataforma.md).

## Módulos

Todos los módulos viven en un único catálogo, `modulos/`, con **códigos estables** (F1, I3, AI5…): así se puede añadir un módulo sin renumerar el resto.

| Código | Módulo | Estado |
|---|---|---|
| F1 | [Python para datos](modulos/F1-python/) | ✅ |
| F2 | [SQL para análisis de datos](modulos/F2-sql/) | ✅ (faltan diapositivas y guiones) |
| F3 | [Estadística para la toma de decisiones](modulos/F3-estadistica/) | ✅ |
| F4 | [Matemáticas para ML](modulos/F4-matematicas-ml/) | ✅ |
| F5 | [Herramientas del oficio](modulos/F5-herramientas/) | ✅ |
| I1 | [Aprendizaje no supervisado](modulos/I1-no-supervisado/) | ✅ |
| I2 | [Regresión y predicción](modulos/I2-regresion/) | ✅ |
| I3 | [Clasificación y pruebas de hipótesis](modulos/I3-clasificacion/) | ✅ |
| I4 | Ingeniería de variables y gradient boosting | 🚧 |
| I5 | [Deep learning con PyTorch](modulos/I5-deep-learning/) | ✅ |
| I6 | [Series temporales](modulos/I6-series-temporales/) | ✅ |
| I7 | [Introducción a los LLMs por API](modulos/I7-llms-api/) | ✅ |
| I8 | [Del notebook a producción](modulos/I8-produccion/) | ✅ |
| DS1–DS3, DS6–DS8 | Especialización Data Science | 🚧 |
| DS4 | [Sistemas de recomendación](modulos/DS4-recomendacion/) | ✅ |
| DS5 | [Redes y grafos](modulos/DS5-redes-grafos/) | ✅ |
| AI1–AI4 | [Transformers](modulos/AI1-transformers/), [apps con LLMs](modulos/AI2-apps-llms/), [RAG y agentes](modulos/AI3-rag-agentes/), [evaluación](modulos/AI4-evaluacion-llms/) | ✅ |
| AI5–AI8 | [Fine-tuning](modulos/AI5-fine-tuning/), [alineación](modulos/AI6-alineacion/), [inferencia](modulos/AI7-inferencia/), [seguridad y LLMOps](modulos/AI8-seguridad/) | 🟡 versión corta: faltan apuntes, guiones y soluciones |
| AI9 | Multimodal (optativo) | 🚧 esqueleto |

✅ material completo · 🟡 utilizable pero incompleto · 🚧 en preparación. Plan de trabajo y prioridades: [docs/plan-v3-plataforma-y-empleabilidad.md](docs/plan-v3-plataforma-y-empleabilidad.md).

Cada módulo incluye:

```
modulos/XX-nombre/
├── README.md                ← objetivos, lecciones, caso práctico, autoevaluación y lecturas
├── apuntes.md               ← teoría completa de cada lección
├── diapositivas.pdf / .md   ← diapositivas (PDF listo para usar; .md editable con Marp)
├── notebook.ipynb           ← práctica guiada, ejecutable en local o en Colab
├── cuestionario.md          ← cuestionario evaluable de 10 preguntas con solucionario
├── recursos-abiertos.md     ← vídeos (YouTube) y lecturas gratuitas, con su licencia
├── guiones.md               ← guiones para grabar los vídeos (instructores)
└── soluciones.ipynb         ← soluciones de los ejercicios (instructores)
```

## Estructura del repositorio

```
.
├── README.md                  ← estás aquí
├── PROGRAMA.md                ← calendario detallado y resultados de aprendizaje
├── requirements.txt           ← dependencias de Python
├── itinerarios/
│   ├── n1-fundamentos/        ← README del bloque + proyecto N1
│   ├── n2-intermedio/         ← README del bloque (el proyecto es proyecto-final/)
│   ├── n3-data-science/
│   └── n3-ai-engineering/
├── modulos/                   ← catálogo único de módulos, con códigos estables
├── proyecto-final/            ← enunciado, hitos, plantilla de informe y rúbrica (proyecto N2)
├── docs/
│   ├── plan-v2-itinerarios-y-plataforma.md ← diseño de itinerarios y web
│   ├── guia-del-instructor.md              ← cómo impartir cada semana y las sesiones en vivo
│   ├── evaluacion-y-certificado.md         ← sistema de calificación y criterios
│   ├── recursos-y-licencias.md             ← qué se puede hacer con cada recurso externo
│   └── como-lanzar-el-curso.md             ← plataforma, precios, mentores, marketing
└── scripts/
    ├── ejecutar_notebooks.py      ← comprueba que todos los notebooks se ejecutan sin errores
    └── generar_diapositivas.sh    ← regenera los PDF de las diapositivas tras editarlas
```

## Cómo empezar (estudiantes)

**Opción A – Google Colab (sin instalar nada):** abre cualquier `notebook.ipynb` en GitHub y pulsa *Open in Colab*, o súbelo en [colab.research.google.com](https://colab.research.google.com).

**Opción B – En tu ordenador:**

```bash
git clone <url-de-este-repositorio>
cd AI-and-Data-Science
python -m venv .venv
source .venv/bin/activate        # en Windows: .venv\Scripts\activate
pip install -r requirements.txt
jupyter lab
```

Todos los notebooks usan conjuntos de datos incluidos en las librerías (scikit-learn, statsmodels, NetworkX) o generados en el propio notebook, así que funcionan sin descargar nada. Requiere **Python ≥ 3.10**. Los módulos I7 y AI2–AI4 necesitan una clave de la API de Anthropic para las celdas que llaman al modelo; sin ella, esas celdas se saltan y el resto del notebook se ejecuta igual.

## Cómo comprobar el material (instructores)

```bash
python scripts/ejecutar_notebooks.py          # ejecuta todos los notebooks (con el Python del .venv)
python scripts/ejecutar_notebooks.py I2 I3    # solo los módulos indicados (por código)
scripts/generar_diapositivas.sh               # regenera los PDF de las diapositivas (requiere Node.js y Chrome)
```

**Vídeos:** el curso todavía no incluye vídeos grabados. Mientras los produces con los `guiones.md` y las diapositivas de cada módulo, puedes usar los vídeos gratuitos enlazados en cada `recursos-abiertos.md`. Antes de hacerlo, revisa [docs/recursos-y-licencias.md](docs/recursos-y-licencias.md) para saber qué permite cada licencia.

## Migración desde el plan único (14 semanas)

Los módulos se han renombrado a códigos estables. Equivalencias:

| Antes | Ahora |
|---|---|
| `modulos/00-fundamentos-python` | `modulos/F1-python` |
| `modulos/01-estadistica` | `modulos/F3-estadistica` |
| `modulos/02-aprendizaje-no-supervisado` | `modulos/I1-no-supervisado` |
| `modulos/03-regresion` | `modulos/I2-regresion` |
| `modulos/04-clasificacion-e-hipotesis` | `modulos/I3-clasificacion` |
| `modulos/05-deep-learning` | `modulos/I5-deep-learning` |
| `modulos/06-sistemas-de-recomendacion` | `modulos/DS4-recomendacion` |
| `modulos/07-redes-y-grafos` | `modulos/DS5-redes-grafos` |
| `modulos/08-series-temporales` | `modulos/I6-series-temporales` |
| `modulos/09-ia-generativa` | `modulos/I7-llms-api` |

El programa original semana a semana sigue en [PROGRAMA.md](PROGRAMA.md); el orden canónico ahora es el de los itinerarios.

## Licencia

El material está pensado para que lo adaptes. Si vas a comercializarlo, elige una licencia explícita (por ejemplo, CC BY-NC-SA 4.0 para el contenido y MIT para el código) y añádela en un archivo `LICENSE`.
