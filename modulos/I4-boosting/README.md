# Módulo I4 · Ingeniería de variables, pipelines y gradient boosting

**N2 · ~8 horas · se cursa entre I3 e I5** · El modelo que más se usa en datos tabulares en la industria (XGBoost / LightGBM), y la disciplina que separa una métrica bonita de una métrica verdadera: validar sin fugas y explicar el modelo a negocio.

## Objetivos
Al terminar este módulo podrás:
- Construir **variables** para datos tabulares: fechas, ratios, agregados por cliente con historial «solo pasado» y categorías (*one-hot*, ordinal, *target encoding*).
- Reconocer y demostrar cuatro tipos de **fuga de datos** (de objetivo, temporal, de preprocesado, por grupo) y evitarlas con `Pipeline`, `TimeSeriesSplit` y `GroupKFold`.
- Entrenar y comparar **XGBoost, LightGBM y `HistGradientBoostingClassifier`** con parada temprana, y decidir cuándo ponderar clases.
- Buscar hiperparámetros con **búsqueda aleatoria y Optuna** sin contaminar la validación.
- Explicar un modelo con **importancia por permutación y SHAP** (global, local y de dependencia) conociendo sus límites: correlación no es causalidad.
- **Calibrar** probabilidades y elegir el **umbral por coste de negocio** (enlace con I3, lección 4.6).
- Entregar un **informe de interpretabilidad** comprensible para dirección.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 4.1 | Ingeniería de variables para datos tabulares | 20 min |
| 4.2 | Codificar categorías y *target encoding* sin trampas | 15 min |
| 4.3 | Fugas de datos: cuatro formas de engañarte | 20 min |
| 4.4 | Validación honesta: `TimeSeriesSplit`, `GroupKFold` y conjunto de prueba | 15 min |
| 4.5 | Gradient boosting en la práctica: XGBoost, LightGBM, HistGB | 20 min |
| 4.6 | Desequilibrio de clases y búsqueda de hiperparámetros | 15 min |
| 4.7 | Interpretabilidad: permutación y SHAP | 20 min |
| 4.8 | Calibración y umbral por coste de negocio | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección y glosario |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; PDF con `scripts/generar_diapositivas.sh I4`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada + 5 ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Documentación y cursos gratuitos |
| [`guiones.md`](guiones.md) | *Instructores:* guiones de los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — **¿qué pedidos de TiendaSur se devolverán?** Datos simulados de ~24.000 pedidos de 1.800 clientes (2024-2025), con varios pedidos por cliente y fechas, de modo que la validación por grupo y la temporal importan de verdad. Verás las fugas en los números (el AUC «honesto» ronda 0,74; con fugas sube a 0,87-1,00), compararás los tres motores de boosting con la regresión logística de I3, harás SHAP, calibrarás y fijarás el umbral por euros. Escribe figuras e informe en `proyecto-devoluciones/`.

**Requisitos:** `requirements.txt` del curso más `xgboost`, `lightgbm`, `shap` y `optuna`. En **macOS**, XGBoost y LightGBM necesitan OpenMP: `brew install libomp`. Sin ella el notebook sigue funcionando solo con `HistGradientBoostingClassifier` (sin SHAP) y lo avisa. Se ejecuta en CPU en menos de un minuto.

## Caso práctico (entregable)
**Pieza de portafolio: modelo tabular con informe de interpretabilidad para negocio.** Elige un conjunto de datos tabular público con varias filas por entidad y/o fechas (p. ej. préstamos, pedidos, siniestros, alquileres) y entrega un repositorio con:
1. **Variables** documentadas, cada una con su «momento de disponibilidad» (¿se conoce al predecir?).
2. **Auditoría de fugas:** al menos dos fugas provocadas y medidas (con la tabla antes/después) y la validación final sin fugas (temporal o por grupo, justificada).
3. Comparativa de **al menos dos motores de boosting y un baseline lineal**, con parada temprana y una búsqueda de hiperparámetros con presupuesto declarado.
4. **Informe de interpretabilidad** (1-2 páginas, para una persona no técnica): qué predice, cuánto acierta, qué variables pesan y en qué dirección (SHAP global + un caso local), límites y advertencia de causalidad.
5. **Calibración y umbral** elegido por coste con supuestos explícitos y sensibilidad (¿qué pasa si el coste cambia un 50 %?).

**Criterios:** validación sin fugas y demostración de las fugas 30 % · modelos y búsqueda correctos y reproducibles 20 % · interpretabilidad correcta y honesta (límites) 20 % · calibración y decisión por coste 15 % · claridad del informe para negocio 15 %.

> Es la pieza que más se parece a lo que hace un/a *Data Scientist* en una empresa: un modelo útil, validado con rigor y explicado a quien decide.

## Autoevaluación
1. ¿Por qué un `KFold` aleatorio infla la métrica si cada cliente tiene muchos pedidos?
2. ¿Qué diferencia hay entre `TargetEncoder.fit_transform` y `fit().transform()` sobre los mismos datos, y por qué importa?
3. ¿Por qué la «tasa de devolución previa» de un pedido no debe incluir los pedidos de los últimos 30 días?
4. Ponderar la clase positiva mejora el recall, ¿qué estropea? ¿Cómo se arregla?
5. SHAP dice que el descuento aumenta el riesgo de devolución. ¿Puedes concluir que quitar descuentos reduciría devoluciones?

<details><summary>Respuestas</summary>

1. Porque el mismo cliente queda a ambos lados de la partición y el modelo (sobre todo con variables de cliente o *target encoding*) «se acuerda» de él. `GroupKFold` mantiene a cada cliente en un solo lado.
2. `fit_transform` usa validación cruzada interna: cada fila se codifica sin ver su propia etiqueta. `fit().transform()` sobre los mismos datos ya vio las etiquetas y produce una variable demasiado buena que el modelo sobrevalora. En un `Pipeline` sklearn aplica la primera al entrenar y la segunda al predecir.
3. Porque la etiqueta de esos pedidos aún no se conoce (el cliente puede devolverlos en 30 días). En producción esa información no existirá en ese momento.
4. Estropea las probabilidades (se inflan) y suele no mejorar AUC/AP. Se arregla no ponderando o calibrando después (sigmoide/isotónica) con datos no usados para entrenar.
5. No. SHAP explica qué usa el modelo, no qué causa el fenómeno; el descuento puede correlacionar con otras causas (cliente, categoría, campaña). Para concluir causalidad hace falta un experimento A/B.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: *Common pitfalls* de scikit-learn, la documentación de LightGBM/XGBoost y *Interpretable Machine Learning* (Christoph Molnar).
