# Proyecto N2 · Modelo predictivo desplegado como API

**Semanas 9–10 de N2 · 20–25 horas** · Individual o en parejas · Entrega final del itinerario N2

El proyecto N2 integra el bloque: plantear un problema real, preparar los datos, elegir y validar un modelo **sin fugas**, **desplegarlo como una API (FastAPI + Docker) con integración continua en verde** y **convencer** a una audiencia no técnica con un informe de negocio. Es también una pieza de portafolio: el repositorio es lo que un reclutador técnico abre cuando lee «despliegue de modelos» o «MLOps» en tu CV (ver el módulo CAR).

> Los criterios del servicio son los del caso práctico del módulo [I8 · Del notebook a producción](../modulos/I8-produccion/README.md), con la misma estructura de repositorio. El I8 trae el proyecto de ejemplo completo (`tiendasur_churn`); el tuyo debe ser **tu propio problema y tu propio modelo**.

## Qué entregas
| # | Entregable | Dónde |
|---|---|---|
| 1 | **Repositorio público en GitHub** con el paquete, los tests, el `Dockerfile` y el flujo de CI | Enlace |
| 2 | **CI en verde** (insignia en el README): lint → tests → entrenamiento → imagen | GitHub Actions |
| 3 | **Informe de negocio** (máx. 4 páginas) con la [plantilla](plantilla-informe.md) | PDF o Markdown en `docs/` |
| 4 | **Notebook** de exploración y modelado que se ejecuta de principio a fin | `notebooks/` |
| 5 | **Presentación** de 10 minutos + 5 de preguntas dirigida a un comité de dirección, con la API funcionando en directo | Sesión |

## Requisitos técnicos del servicio (mínimos)
Estructura de la práctica del I8, adaptada a tu problema:
1. **Paquete** con `datos.py` (carga y validación de esquema), `modelo.py` (pipeline sin fugas), `entrenar.py` (punto de entrada reproducible que guarda el modelo y su **ficha**) y `api.py`.
2. **API con FastAPI**: contrato de entrada validado con Pydantic (`422` ante datos inválidos), `/health`, `/predict`, versión del modelo en cada respuesta y modelo cargado una sola vez al arrancar.
3. **Al menos 6 tests con pytest**: de datos (esquema), de modelo (umbral mínimo de calidad **acordado y justificado**, y un test de comportamiento) y de API. Los tests entrenan su propio modelo: no dependen de artefactos.
4. **Lint** sin errores (`ruff`).
5. **`Dockerfile`** que construye y arranca: dependencias antes del código para aprovechar la caché, versiones fijadas, usuario sin privilegios, sin secretos.
6. **GitHub Actions** con lint, tests, entrenamiento y construcción de imagen, en verde.
7. **README del repositorio** con: problema de negocio, cómo ejecutarlo en 3 comandos (con y sin Docker), métricas frente a la línea base, limitaciones y un ejemplo de petición `curl`.
8. **Plan de monitorización**: qué se vigila (salud, deriva con PSI, métrica real cuando llegan etiquetas) y cuándo se reentrena. Basta con un informe de deriva calculado sobre un periodo simulado o real y el plan escrito.
9. Opcional (suma, no es obligatorio): registro de experimentos con MLflow; despliegue en un servicio gratuito en la nube.

## Elige tu problema
### Opción A · Proyecto propio (recomendada)
Un problema de tu trabajo o sector con datos a los que tengas acceso (anonimizados si es necesario). Debe aprobarse con la [propuesta](#hito-0--propuesta). Tiene que ser un **modelo predictivo** (clasificación, regresión o previsión) cuya predicción se pueda pedir a una API.

### Opción B · Retos propuestos
Si no tienes datos propios, elige uno de estos retos con datos públicos:

| Reto | Pregunta de negocio | Datos sugeridos | Módulos principales |
|---|---|---|---|
| **1. Abandono de clientes** | ¿Qué clientes de una operadora van a darse de baja y qué oferta de retención compensa? | *Telco Customer Churn* (IBM, disponible en Kaggle) | I3, I8 |
| **2. Previsión de demanda** | ¿Cuántas bicicletas se alquilarán cada hora la próxima semana para redistribuir la flota? | *Bike Sharing Dataset* (UCI Machine Learning Repository) | I6, I8 |
| **3. Riesgo de crédito** | ¿Qué solicitudes aprobar y con qué umbral, de forma justa? | *Statlog German Credit* (UCI) | I3, I8 |
| **4. Precio de viviendas** | ¿Cuánto vale una vivienda y qué incertidumbre tiene la estimación? | *Ames Housing* (OpenML / Kaggle) | I2, I8 |

Comprueba la licencia y las condiciones de uso de cada conjunto de datos antes de publicarlo en tu repositorio (enlaza la fuente si no puedes redistribuirlo).
Los retos de recomendación, redes o asistentes con LLM pertenecen a N3 (DS4, DS5, AI3) y no se aceptan como proyecto N2, salvo acuerdo previo con el mentor.

## Hitos

### Hito 0 · Propuesta
Una página con: problema y por qué importa, **decisión que se tomará** con la predicción y quién la toma, datos (origen, tamaño, variables, licencia), métrica de éxito técnica **y** de negocio, línea base prevista, cómo se consumirá la API (¿lote o petición a petición?) y riesgos previstos.

### Hito 1 · Datos, análisis exploratorio y línea base
Notebook con la carga y limpieza de datos, análisis exploratorio con al menos 5 gráficos comentados y la **línea base** (modelo ingenuo o regla simple) que habrá que superar. **Revisión de 20 minutos con el mentor.**

### Hito 2 · Modelado y validación
Al menos dos enfoques comparados con validación adecuada (validación cruzada, partición temporal…), sin fugas, análisis de errores e interpretación. **Revisión de 20 minutos con el mentor.**

### Hito 3 · Servicio: paquete, tests, API y Docker
El notebook convertido en paquete; API local funcionando; tests y lint en verde; `Dockerfile` que construye y arranca. **Revisión de 20 minutos con el mentor** (se abre el repositorio y se pide una petición `curl`).

### Hito 4 · Entrega final
1. **Repositorio** con CI en verde y README completo.
2. **Informe de negocio** (máx. 4 páginas) siguiendo la [plantilla](plantilla-informe.md).
3. **Presentación** de 10 minutos + 5 de preguntas ante un comité de dirección, con una petición a la API en directo.

## Evaluación
Se evalúa con la [rúbrica](rubrica.md). Para aprobar hay que obtener al menos 60/100 y ningún criterio con puntuación «Insuficiente». **Un servicio que no arranca o un CI en rojo en la entrega es «Insuficiente» en el criterio 5.**

## Normas
- Cita todas las fuentes de datos, código y bibliografía.
- Puedes usar asistentes de IA y agentes de código para programar o redactar, pero debes **declararlo en el informe** y ser capaz de explicar todo lo que entregas. Se recomienda un `AGENTS.md` en el repositorio (ver F5 5.7 e I8 8.9).
- No subas datos personales, confidenciales ni **secretos** (claves, tokens, `.env`) al repositorio. Una clave en el historial se considera filtrada: se revoca.
- Un repositorio limpio: sin `df2`, sin salidas de notebook de decenas de megas, sin archivos de modelo enormes (usa la ficha y el script de entrenamiento).
