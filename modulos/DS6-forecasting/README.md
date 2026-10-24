# Módulo DS6 · Forecasting avanzado

**N3-DS · ~8 horas** · Amplía I6 (una serie, Holt-Winters, SARIMA). Aquí: cientos de series a la vez, modelos globales con machine learning, intervalos, jerarquías y modelos fundacionales. Las ofertas de demanda, *supply chain*, retail y finanzas piden exactamente esto.

## Objetivos
Al terminar este módulo podrás:
- Elegir y calcular **MASE, WAPE y sesgo**, y saber qué defiende cada una.
- Validar con **backtesting de origen rodante**, sin fugas del futuro.
- Comparar **modelos locales** (ETS por serie) frente a un **modelo global** con variables de retardo, ventanas y calendario.
- Producir **intervalos de predicción** con regresión cuantílica y *conformal*, y medir su cobertura.
- Construir una **jerarquía** y reconciliar previsiones (*bottom-up*, OLS, WLS).
- Situar los **modelos fundacionales** de series temporales y evaluarlos con el mismo protocolo.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 6.1 | Del caso de una serie al caso de cientos: qué cambia | 10 min |
| 6.2 | Métricas: MASE, WAPE y sesgo | 15 min |
| 6.3 | Backtesting con origen rodante | 15 min |
| 6.4 | Modelos locales: referencias y ETS por serie | 10 min |
| 6.5 | Modelos globales con ML: retardos, ventanas y calendario | 25 min |
| 6.6 | Intervalos de predicción: cuantiles y *conformal* | 20 min |
| 6.7 | Jerarquías y reconciliación | 20 min |
| 6.8 | Modelos fundacionales de series temporales | 10 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; PDF con `scripts/generar_diapositivas.sh DS6`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con 5 ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos por lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones de los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — TiendaSur: **100 series diarias** (20 productos × 5 tiendas) simuladas con tendencia, estacionalidad semanal y anual, festivos, Navidad, Black Friday y promociones. Backtesting con 4 orígenes de 28 días. Resultado de referencia: el modelo global (`HistGradientBoostingRegressor`) logra un WAPE ≈ 0,29 frente a ≈ 0,33 del ETS local y ≈ 0,42 del ingenuo estacional; intervalos del 80 % con cobertura ≈ 0,77–0,80; y reconciliación con comparación de siete combinaciones. Se ejecuta en CPU en 1–2 minutos.

**Requisitos:** `numpy`, `pandas`, `scikit-learn`, `statsmodels`, `matplotlib` (ya en `requirements.txt`). No hace falta LightGBM (en macOS exige `libomp`); el código es casi idéntico con `lightgbm.LGBMRegressor`.

## Caso práctico (entregable)
Sistema de previsión para un panel multiserie **público** (p. ej. un conjunto de ventas M5 reducido o datos de demanda de tu elección):
1. Backtesting con ≥ 3 orígenes y comparación con ingenuo estacional y ETS.
2. Un modelo global con al menos retardos, ventanas y calendario, con justificación de cada variable.
3. Intervalos al 80 % con cobertura medida.
4. Una jerarquía con al menos dos niveles y reconciliación comparada con *bottom-up*.
5. Una página para negocio: error en unidades y en euros, sesgo, y cuándo NO fiarse.

**Criterios:** backtesting sin fugas y métricas correctas 30 % · modelo global y comparación 25 % · intervalos y cobertura 20 % · jerarquía 10 % · comunicación 15 %.

## Autoevaluación
1. ¿Por qué el MASE permite promediar series de escalas distintas y el MAE no?
2. ¿Qué dos decisiones evitan que un modelo global falle con series de tamaños muy distintos?
3. ¿Por qué se escala el error al construir un intervalo conformal?
4. ¿Reconciliar siempre mejora las previsiones?
5. ¿Cómo evalúas un modelo fundacional frente a tu modelo propio?

<details><summary>Respuestas</summary>

1. El MASE divide por el error de un ingenuo en el mismo entrenamiento: es adimensional y 1 significa «igual que repetir la semana anterior».
2. Escalar el objetivo por serie (ventas / media reciente) e incluir identificadores y variables de nivel; y entrenar con pérdida adecuada a conteos (Poisson).
3. Porque la incertidumbre relativa depende del tamaño de la serie; agrupar por nivel hace que el intervalo se ajuste a cada grupo.
4. No. Garantiza coherencia; mejora si las previsiones base son comparables entre niveles. Un *bottom-up* de un modelo fuerte puede ganar (ocurre en el notebook).
5. Con el mismo backtesting, las mismas métricas y frente a ingenuo estacional y modelo global, sin mirar el futuro.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindible: *Forecasting: Principles and Practice* (Hyndman y Athanasopoulos).
