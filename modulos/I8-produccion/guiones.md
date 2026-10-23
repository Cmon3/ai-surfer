# Módulo I8 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh I8`. Todas las demos se hacen sobre `proyecto-churn/` generado por el notebook; ten abiertos a la vez el notebook, el editor y una terminal.

## 8.1 · Del notebook al paquete (15 min)
- [0–2] Gancho: un notebook de un compañero que «funciona» y que nadie más consigue ejecutar. Reiniciar kernel → falla.
- [2–7] Estructura `src/`, `pyproject.toml`, por qué funciones puras y constantes en un sitio.
- [7–12] `datos.py`: `generar_datos` y `validar_esquema`. Demo: romper una columna y ver el error claro.
- [12–15] Regla: «si se ejecuta dos veces, es una función».

## 8.2 · Pipelines, fugas y ficha del modelo (15 min)
- [0–5] Demo de fuga: escalar antes de separar. Explicar por qué con imputación o *target encoding* es peor.
- [5–10] `Pipeline` + `ColumnTransformer`; `handle_unknown="ignore"`.
- [10–15] `ficha.json` campo a campo; `entrenar.py` como punto de entrada. Ejecutarlo desde la terminal.

## 8.3 · FastAPI (20 min)
- [0–5] Contrato `Cliente`: tipos, `Field`, `Literal`. Abrir `/docs` y probar una petición desde el navegador.
- [5–10] `lifespan`: cargar una vez. Comparar mentalmente con cargar por petición.
- [10–15] `/health` y la versión en la respuesta. Por qué importa en una incidencia.
- [15–20] Petición inválida → `422`; leer el mensaje. Logs JSON sin datos personales.

## 8.4 · Tests para ML (20 min)
- [0–4] Pirámide: datos, modelo, API.
- [4–10] `conftest.py`: fixtures y por qué los tests entrenan su propio modelo.
- [10–15] Test de umbral y test de comportamiento. Romper el modelo a propósito (invertir una variable) y ver fallar el test direccional.
- [15–20] `ruff check .` y cómo leer sus avisos.

## 8.5 · Docker (15 min)
- [0–3] Imagen vs contenedor, en una frase cada uno.
- [3–10] El `Dockerfile` línea a línea: capas, `slim`, versiones fijadas, `USER app`, `HEALTHCHECK`.
- [10–15] `docker build` + `docker run` + `curl /health`. Cambiar una línea de código y reconstruir: ver la caché.

## 8.6 · CI/CD (15 min)
- [0–6] `ci.yml` paso a paso. Subirlo a un repo de prueba y ver la ejecución en la pestaña *Actions*.
- [6–10] Romper un test, abrir un PR y ver el bloqueo.
- [10–15] CD: imagen → registro → servicio gestionado. Tabla de destinos (Cloud Run, App Runner/ECS, Azure Container Apps, SageMaker/Vertex/Azure ML). Secretos en *GitHub Secrets*.

## 8.7 · MLflow (10 min)
- [0–5] Las tres ejecuciones del notebook; `mlflow ui` y la tabla comparativa.
- [5–10] Lectura: la configuración sin límite de profundidad sobreajusta. Registro de modelos en una frase.

## 8.8 · Monitorización y deriva (15 min)
- [0–4] «Se degrada sin errores»: ejemplos reales (precios, estacionalidad, cambio de app).
- [4–10] PSI: intuición, fórmula y umbrales. Informe de la práctica.
- [10–15] Diagnóstico antes de reentrenar: cambio real vs error de datos. Qué alertas configurar.

## 8.9 · Agentes de código (10 min)
- [0–4] Demo: pedir a un agente el ejercicio 1 (endpoint por lotes) con y sin tests. Mostrar la diferencia.
- [4–8] `AGENTS.md`: comandos y reglas. Escribir la intención y los criterios de aceptación antes de pedir código.
- [8–10] Revisar el diff y permisos mínimos. En la entrevista tendrás que explicar cada línea.
