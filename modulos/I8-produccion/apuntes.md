# Módulo I8 · Del notebook a producción — Apuntes

> Objetivo: que un modelo tuyo pueda usarlo otra persona, otra máquina y tú mismo dentro de seis meses, sin preguntarte nada.

---

## 8.1 · Del notebook al paquete

Un notebook es la mejor herramienta para **explorar**: ejecutas, miras, cambias. Pero tiene tres problemas para producción:

1. **Estado oculto.** Las celdas se pueden ejecutar en cualquier orden; el resultado depende de la historia de la sesión.
2. **No se puede importar ni testear** con comodidad.
3. **No se puede desplegar**: un servidor no «abre» notebooks.

La solución es mover el código a un **paquete**:

```
proyecto-churn/
├── pyproject.toml            ← metadatos y configuración de herramientas (pytest, ruff)
├── src/tiendasur_churn/
│   ├── datos.py              ← carga y validación
│   ├── modelo.py             ← pipeline, entrenamiento, guardado
│   ├── entrenar.py           ← punto de entrada:  python -m tiendasur_churn.entrenar
│   └── api.py                ← servicio HTTP
├── tests/
├── Dockerfile
└── .github/workflows/ci.yml
```

**Reglas prácticas**
- Si una celda se ejecuta más de una vez, conviértela en función.
- Funciones **puras** cuando se pueda: reciben datos y devuelven datos, sin leer variables globales.
- Constantes (nombres de columnas, valores permitidos) en un único sitio. En la práctica: `NUMERICAS`, `CATEGORICAS`, `PLANES` en `datos.py`.
- El layout `src/` evita importar por accidente el código de la carpeta actual en lugar del paquete instalado.

**Validar los datos al entrar.** `validar_esquema()` comprueba columnas, rangos y categorías y lanza un error claro. Es la versión mínima de lo que hacen librerías como *pandera* o *Great Expectations*. Descubrir en el entrenamiento que una columna cambió de nombre cuesta minutos; descubrirlo en producción, días.

---

## 8.2 · Pipelines reproducibles, fugas de datos y la ficha del modelo

### El pipeline es el modelo
En scikit-learn, un `Pipeline` encadena preprocesado y modelo en un único objeto:

```python
preprocesado = ColumnTransformer([
    ("num", StandardScaler(), NUMERICAS),
    ("cat", OneHotEncoder(handle_unknown="ignore"), CATEGORICAS),
])
pipe = Pipeline([("prep", preprocesado), ("modelo", HistGradientBoostingClassifier())])
```

Ventajas:
- **Sin fugas:** `pipe.fit(X_train, y_train)` ajusta el escalado *solo* con train. Si escalas antes de separar, la media y la desviación incluyen el test, y la métrica sale optimista. Con imputación, *target encoding* o selección de variables el efecto puede ser enorme.
- **Lo que entrenas es lo que despliegas:** la API llama a `pipe.predict_proba(df)` con datos crudos. No hay que reescribir el preprocesado en otro sitio (fuente clásica de errores).
- `handle_unknown="ignore"` evita que una categoría nueva en producción tumbe el servicio.

### Reproducibilidad
- Semillas fijadas (`random_state`) en la separación y en el modelo.
- Un **punto de entrada** (`python -m tiendasur_churn.entrenar --salida artefactos`) en lugar de «ejecuta el notebook hasta la celda 14».
- Versiones de las librerías fijadas: un `.joblib` guardado con scikit-learn 1.9 no está garantizado en otra versión.

### La ficha del modelo (*model card*)
Junto a `modelo.joblib` se guarda `ficha.json`:

| Campo | Para qué |
|---|---|
| `version_modelo` | Saber qué modelo tomó cada decisión (va en cada respuesta de la API) |
| `metricas` | Comparar con el siguiente candidato |
| `huella_datos` | Hash del dataset: detecta si se reentrenó con datos distintos |
| `columnas`, `versiones` | Reconstruir el entorno |
| `umbral`, `uso_previsto`, `limitaciones`, `responsable` | Gobernanza y auditoría (RGPD, Reglamento europeo de IA) |

---

## 8.3 · Servir el modelo con FastAPI

FastAPI es el framework web de Python más usado para servir modelos: rápido, con tipos y con documentación automática en `/docs`.

```python
class Cliente(BaseModel):
    antiguedad_meses: int = Field(ge=0, le=600)
    plan: Literal["basico", "plus", "premium"]
    ...

@app.post("/predict", response_model=Prediccion)
def predict(cliente: Cliente) -> Prediccion:
    X = pd.DataFrame([cliente.model_dump()])
    p = float(estado["modelo"].predict_proba(X)[0, 1])
    ...
```

**Cuatro decisiones de diseño**
1. **Contrato de entrada con Pydantic.** Tipos, rangos y valores permitidos. Lo que no cumpla recibe un `422` con un mensaje que dice exactamente qué campo falla, antes de llegar al modelo.
2. **Cargar el modelo una vez** al arrancar (`lifespan`). Cargarlo en cada petición multiplica la latencia.
3. **`/health`** para que Docker, Kubernetes o el balanceador sepan si el servicio está vivo.
4. **Versión del modelo en cada respuesta** y **logs estructurados en JSON** (sin datos personales): permiten rastrear y monitorizar.

**Configuración por variables de entorno** (`MODELO_PATH`, `UMBRAL_ABANDONO`): el mismo código sirve en local, en pruebas y en producción. Los secretos (claves de API, contraseñas) también van por entorno o por un gestor de secretos, **nunca** en el código ni en la imagen.

**Ejecutar en local:** `PYTHONPATH=src uvicorn tiendasur_churn.api:app --reload` y abrir `http://localhost:8000/docs`.

---

## 8.4 · Tests para ML

Un test es una afirmación que se comprueba sola. En ML se escriben tres tipos:

| Tipo | Ejemplos | Qué protege |
|---|---|---|
| **Datos** | el esquema rechaza negativos o columnas que faltan | entradas corruptas |
| **Modelo** | AUC ≥ umbral acordado; mismo resultado con la misma semilla; más incidencias no baja el riesgo | regresiones de calidad y comportamiento absurdo |
| **API** | `/health` responde; `/predict` devuelve una probabilidad; entradas inválidas → `422` | el contrato con quien consume el servicio |

**Tests de comportamiento (direccionales e invariancia).** Lo que sabes del negocio, escrito como test: «a igualdad de lo demás, más incidencias de soporte no puede reducir el riesgo»; «cambiar el `cliente_id` no cambia la predicción». Detectan modelos que aprenden atajos absurdos aunque la métrica global sea buena.

**Fixtures (`conftest.py`).** Preparan lo que necesitan los tests (datos, un modelo entrenado en una carpeta temporal). Los tests no deben depender de archivos que no crean ellos: en el CI el repositorio llega limpio.

**Lint con ruff.** Detecta imports sin usar, variables no definidas, imports desordenados y errores comunes en milisegundos. Configurado en `pyproject.toml`.

---

## 8.5 · Docker para científicos de datos

Una **imagen** es un paquete con el sistema operativo mínimo, Python, las librerías exactas, tu código y tu modelo. Un **contenedor** es una imagen en ejecución. Resuelve el «en mi máquina funciona».

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements-api.txt .
RUN pip install --no-cache-dir -r requirements-api.txt   # capa cacheada
COPY src/ src/
COPY artefactos/ artefactos/
RUN useradd --create-home app
USER app
CMD ["uvicorn", "tiendasur_churn.api:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Buenas prácticas**
- **Orden de las capas:** primero las dependencias (cambian poco), después el código (cambia mucho). Así la reconstrucción tarda segundos.
- **Imagen base `slim`** y `--no-cache-dir`: imágenes más pequeñas, menos superficie de ataque.
- **Versiones fijadas** en `requirements-api.txt`, las mismas del entrenamiento.
- **Sin root** (`USER app`).
- **`.dockerignore`**: fuera `.git`, `.venv`, tests, datos y, sobre todo, `.env`.
- Los secretos se inyectan al ejecutar (`docker run -e CLAVE=...` o el gestor de secretos de la nube), nunca con `COPY`.

**Comandos:** `docker build -t tiendasur-churn:dev .` · `docker run --rm -p 8000:8000 tiendasur-churn:dev`.

---

## 8.6 · CI/CD con GitHub Actions

**Integración continua (CI):** en cada *push* o *pull request*, una máquina limpia ejecuta lint → tests → entrenamiento → construcción de la imagen. Si algo falla, el cambio no se fusiona.

**Entrega/despliegue continuo (CD):** si el CI pasa en `main`, la imagen se publica en un registro y el servicio se actualiza. Destinos habituales, de más simple a más complejo:

| Opción | Cuándo |
|---|---|
| **Servicios de contenedores gestionados**: Google Cloud Run, AWS App Runner / ECS Fargate, Azure Container Apps | La mayoría de APIs de modelos: escalan a cero, pagas por uso |
| **Plataformas de ML gestionadas**: SageMaker, Vertex AI, Azure ML, Databricks Model Serving | Cuando la empresa ya trabaja en ellas (registro de modelos, monitorización integrada) |
| **Kubernetes** | Muchos servicios, equipo de plataforma dedicado |

Las ofertas en España piden sobre todo **AWS y Azure** (y GCP en menor medida). No hace falta dominarlas todas: entiende el patrón (imagen → registro → servicio gestionado) y practica en una.

**Secretos en CI:** se guardan en *GitHub Secrets* y se leen como variables de entorno. Nunca en el YAML.

---

## 8.7 · Seguimiento de experimentos con MLflow

Probar configuraciones y apuntarlas a mano no escala. MLflow registra, para cada ejecución: **parámetros**, **métricas**, **etiquetas** (por ejemplo, la huella de los datos) y **artefactos** (el modelo, gráficos). Permite:
- comparar ejecuciones en una tabla o en la interfaz web (`mlflow ui`);
- reproducir cualquier ejecución pasada;
- con el **registro de modelos**, promover una versión concreta a «producción» y volver atrás si hace falta.

En la práctica, la tabla de MLflow muestra que el árbol sin límite de profundidad y aprendizaje rápido **sobreajusta**: mejor en train, peor en test. Sin registro, ese aprendizaje se pierde.

Alternativas habituales: Weights & Biases, Neptune, y las integradas en SageMaker, Vertex AI o Databricks (que usa MLflow).

---

## 8.8 · Monitorización y deriva

Un modelo en producción **se degrada sin dar errores**: el mundo cambia (precios, campañas, competidores) y los datos dejan de parecerse a los de entrenamiento.

| Qué se vigila | Cómo | Cuándo avisa |
|---|---|---|
| Salud del servicio | latencia, errores, peticiones/min (logs JSON) | al instante |
| Deriva de las entradas | PSI por variable frente a los datos de entrenamiento | en días |
| Deriva de las predicciones | PSI de las probabilidades; % de casos marcados | en días |
| Calidad real | métrica cuando llegan las etiquetas | en semanas |

**PSI (Population Stability Index).** Compara la distribución de una variable en dos periodos usando los mismos intervalos:

PSI = Σ (actual − referencia) · ln(actual / referencia)

Regla habitual: **< 0,1 estable · 0,1–0,2 vigilar · > 0,2 deriva relevante**. En la práctica, subir precios un 35 % dispara el PSI del ticket medio. Ojo: deriva no implica siempre reentrenar. Primero se comprueba si es un **cambio real** o un **error de datos** (una unidad que pasó de euros a céntimos).

---

## 8.9 · Trabajar con agentes de código sin perder el control

Las ofertas de 2026 piden explícitamente soltura con asistentes de programación como **Claude Code** o **Cursor**. La diferencia entre usarlos bien o mal es casi siempre la misma: **cuánta estructura tiene el proyecto**.

1. **Los tests son la especificación.** Si pides «añade un endpoint por lotes» y hay tests, sabes en segundos si el cambio funciona y si ha roto otra cosa.
2. **Instrucciones del proyecto** (`AGENTS.md` o `CLAUDE.md`): cómo se ejecutan tests, lint y entrenamiento, y qué reglas no se rompen («no bajes el umbral del test para que pase», «no registres datos personales»).
3. **Primero la intención** (*spec-driven development*): escribe qué quieres, las restricciones y los criterios de aceptación antes de dejar que el agente programe.
4. **Revisa el diff** como el de un compañero. La responsabilidad del código sigue siendo tuya, y en una entrevista tendrás que explicarlo.
5. **Permisos mínimos:** el agente no necesita tus credenciales de producción.

---

## Glosario

- **Artefacto:** archivo resultado del entrenamiento (modelo, ficha, gráficos).
- **CI/CD:** integración continua / entrega continua.
- **Contenedor / imagen:** ejecución / plantilla empaquetada de una aplicación con sus dependencias.
- **Deriva (*drift*):** cambio en la distribución de los datos o de la relación entre variables y objetivo.
- **Fuga de datos (*data leakage*):** información del test o del futuro que se cuela en el entrenamiento.
- **Lint:** análisis estático del código para encontrar errores y problemas de estilo.
- **Model card / ficha del modelo:** documento que acompaña al modelo con su uso, datos, métricas y limitaciones.
- **PSI:** índice de estabilidad de la población, medida de deriva.
