---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# I8 · Del notebook a producción
## Paquete · FastAPI · Tests · Docker · CI · MLflow · Deriva

*AI Surfer · N2 Intermedio*

---

# Por qué este módulo

- «Sé entrenar modelos» ≠ «sé entregar modelos»
- Ofertas reales (oct. 2026): *FastAPI, Docker, CI/CD, MLflow, monitorización* aparecen en casi todas las de ML/AI Engineer
- Al terminar: un repositorio completo para tu portafolio

---

# Mapa del módulo

1. Del notebook al paquete
2. Pipelines sin fugas + ficha del modelo
3. FastAPI
4. Tests para ML
5. Docker
6. CI/CD
7. MLflow
8. Deriva
9. Agentes de código

---

# 8.1 · El notebook no se despliega

- Estado oculto (orden de celdas)
- No se importa ni se testea
- Regla: **si se ejecuta dos veces, es una función**

```
src/tiendasur_churn/  datos.py · modelo.py · entrenar.py · api.py
tests/  ·  Dockerfile  ·  .github/workflows/ci.yml
```

---

# 8.2 · El pipeline ES el modelo

```python
Pipeline([("prep", ColumnTransformer(...)),
          ("modelo", HistGradientBoostingClassifier())])
```

- `fit` ajusta el preprocesado **solo con train** → sin fugas
- La API recibe datos crudos → mismo preprocesado
- `handle_unknown="ignore"` → una categoría nueva no tumba el servicio

---

# La ficha del modelo

| Campo | Para qué |
|---|---|
| versión | rastrear decisiones |
| métricas | comparar candidatos |
| huella de datos | detectar reentrenos con datos distintos |
| versiones librerías | reconstruir el entorno |
| uso previsto, limitaciones | gobernanza y auditoría |

---

# 8.3 · FastAPI en 4 decisiones

1. **Contrato** con Pydantic → `422` antes del modelo
2. Modelo cargado **una vez** (`lifespan`)
3. `/health` para el orquestador
4. **Versión** en cada respuesta + **logs JSON** sin datos personales

Documentación automática en `/docs`

---

# 8.4 · Tres tipos de test

| Datos | Modelo | API |
|---|---|---|
| esquema, rangos | AUC ≥ umbral | `/health` |
| categorías | reproducible | `/predict` |
| | **comportamiento** | `422` si inválido |

Los tests crean lo que necesitan: en el CI no hay artefactos

---

# 8.5 · Docker

- Dependencias **antes** que el código (caché de capas)
- `python:3.12-slim`, versiones fijadas
- `USER app` (nunca root)
- `.dockerignore` con `.env`
- Secretos **al ejecutar**, nunca con `COPY`

---

# 8.6 · CI/CD

**push / PR** → lint → tests → entrenar → imagen → *(CD)* registro → servicio

Dónde desplegar:
- Contenedor gestionado: Cloud Run · App Runner/ECS · Azure Container Apps
- Plataforma ML: SageMaker · Vertex AI · Azure ML · Databricks
- Kubernetes (equipos de plataforma)

---

# 8.7 · MLflow

- Parámetros · métricas · etiquetas · artefactos
- Comparar y reproducir ejecuciones
- Registro de modelos: promover y volver atrás

En la práctica: profundidad ilimitada + learning rate alto → **sobreajuste visible en la tabla**

---

# 8.8 · Se degrada sin errores

| Señal | Avisa en |
|---|---|
| latencia, errores | segundos |
| PSI entradas / predicciones | días |
| métrica real | semanas |

PSI: < 0,1 estable · 0,1–0,2 vigilar · > 0,2 deriva
**Primero diagnostica** (¿cambio real o error de datos?)

---

# 8.9 · Agentes de código con control

- Tests = especificación
- `AGENTS.md` / `CLAUDE.md`: comandos y reglas
- Intención antes que código (*spec-driven*)
- Revisa el diff · permisos mínimos

---

<!-- _class: lead -->
# Entregable

Repo en GitHub · CI en verde · imagen que arranca · README en 3 comandos
**Es tu pieza de portafolio de MLOps**
