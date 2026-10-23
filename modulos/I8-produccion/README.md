# Módulo I8 · Del notebook a producción

**Semana 8 de N2 · ~8 horas** · El módulo que separa «sé entrenar modelos» de «sé entregar modelos». Es, con diferencia, lo que más piden las ofertas de *Data Scientist*, *ML Engineer* y *AI Engineer* que no aparece en un curso típico.

## Objetivos
Al terminar este módulo podrás:
- Convertir un notebook en un **paquete de Python** con funciones testeables y un punto de entrada reproducible.
- Construir **pipelines sin fugas de datos** y guardar el modelo con una **ficha** que permita reproducirlo y auditarlo.
- Servir un modelo con **FastAPI**: contrato de entrada con Pydantic, `/health`, versión del modelo en cada respuesta y logs estructurados.
- Escribir **tests de datos, de modelo y de API** con pytest, incluido un umbral mínimo de calidad.
- Empaquetar el servicio con **Docker** siguiendo buenas prácticas (capas, versiones fijadas, sin root, sin secretos).
- Montar **integración continua** con GitHub Actions: lint → tests → entrenamiento → imagen.
- Registrar y comparar experimentos con **MLflow**.
- Detectar **deriva de datos** con el PSI y decidir cuándo reentrenar.
- Preparar un proyecto para trabajar con **agentes de código** (Claude Code, Cursor) de forma segura: tests como especificación y un `AGENTS.md`.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 8.1 | Del notebook al paquete: estructura `src/`, funciones y `pyproject.toml` | 15 min |
| 8.2 | Pipelines reproducibles, fugas de datos y la ficha del modelo | 15 min |
| 8.3 | Servir el modelo con FastAPI y Pydantic | 20 min |
| 8.4 | Tests para ML: datos, modelo y API | 20 min |
| 8.5 | Docker para científicos de datos | 15 min |
| 8.6 | CI/CD con GitHub Actions (y a dónde desplegar en la nube) | 15 min |
| 8.7 | Seguimiento de experimentos con MLflow | 10 min |
| 8.8 | Monitorización y deriva de datos | 15 min |
| 8.9 | Trabajar con agentes de código sin perder el control | 10 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; el PDF se genera con `scripts/generar_diapositivas.sh`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada: construye el proyecto completo paso a paso |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Documentación y cursos gratuitos recomendados |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — modelo de **abandono de clientes de TiendaSur**. El notebook escribe, archivo a archivo, un repositorio completo en `proyecto-churn/`: paquete `src/tiendasur_churn/` (datos con validación, pipeline, entrenamiento por línea de comandos y API), 11 tests con pytest, `ruff`, `Dockerfile`, flujo de GitHub Actions, registro de experimentos en MLflow, un informe de deriva con PSI y un `AGENTS.md`. Todo se ejecuta en local o en Colab; Docker es opcional.

**Requisitos:** dependencias de `requirements.txt` del curso (incluye FastAPI, pytest, ruff y MLflow). Para construir la imagen, Docker Desktop o equivalente.

## Caso práctico (entregable)
Publica en **GitHub** un repositorio con tu propio modelo (puede ser el de un módulo anterior: I2, I3 o I6) con la estructura de la práctica:
1. Paquete con `datos.py`, `modelo.py`, `entrenar.py` y `api.py`.
2. Al menos 6 tests (datos, modelo con umbral de calidad, API) y lint sin errores.
3. `Dockerfile` que construye y arranca.
4. GitHub Actions en verde (la insignia del README lo demuestra).
5. README con: problema de negocio, cómo ejecutarlo en 3 comandos, métricas, limitaciones y ejemplo de petición `curl`.

**Criterios:** funciona de verdad (CI en verde + imagen que arranca) 35 % · calidad de los tests 25 % · README y ficha del modelo 20 % · limpieza del código (estructura, nombres, sin secretos) 20 %.

> Este repositorio es una pieza de portafolio: es exactamente lo que un reclutador técnico abre cuando lee «MLOps» o «despliegue de modelos» en tu CV.

## Autoevaluación
1. ¿Por qué el preprocesado debe ir dentro del `Pipeline` y no antes del `train_test_split`?
2. ¿Qué información mínima debería acompañar a un modelo guardado y por qué?
3. ¿Qué ventaja tiene validar la entrada con Pydantic en lugar de dentro de la función de predicción?
4. ¿Por qué los tests del CI entrenan su propio modelo en lugar de usar el de `artefactos/`?
5. Tu modelo lleva tres meses en producción sin errores. ¿Cómo sabes si sigue funcionando bien?

<details><summary>Respuestas</summary>

1. Porque si se ajusta con todo el dataset, el preprocesado «ve» el test (fuga de información) y la métrica sale optimista. Además, dentro del pipeline el mismo objeto se usa en entrenamiento y en producción, sin reescribir nada.
2. Métricas, huella (hash) y periodo de los datos, columnas esperadas, versiones de las librerías, umbral de decisión, uso previsto y limitaciones. Sin eso no se puede reproducir, auditar ni depurar.
3. Las entradas inválidas se rechazan con un `422` y un mensaje claro antes de llegar al modelo; el contrato queda documentado automáticamente (OpenAPI en `/docs`); y la lógica de predicción queda limpia.
4. Porque el CI parte de un repositorio limpio sin artefactos, y un test solo es fiable si no depende de nada que no cree él mismo.
5. Con monitorización: salud del servicio (latencia, errores), deriva de las entradas (PSI) y de las predicciones, y la métrica real cuando llegan las etiquetas. «Sin errores» no significa «sin degradación».
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: el tutorial oficial de FastAPI, *Made With ML* (Goku Mohandas) y el curso gratuito *MLOps Zoomcamp* (DataTalks.Club).
