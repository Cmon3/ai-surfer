# Módulo 08 · Analítica predictiva con series temporales

**Semana 10 · 6–8 horas**

## Objetivos
- Descomponer una serie temporal en tendencia, estacionalidad y residuo.
- Comprobar la estacionariedad e interpretar las funciones de autocorrelación (ACF/PACF).
- Construir referencias ingenuas y exigir que cualquier modelo las supere.
- Ajustar modelos de suavizado exponencial (Holt-Winters) y SARIMA, y generar pronósticos con intervalos.
- Validar con *backtesting* de origen móvil, sin filtrar información del futuro.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 8.1 | Series temporales en la empresa: demanda, ventas, capacidad | 10 min |
| 8.2 | Componentes y descomposición (STL) | 15 min |
| 8.3 | Estacionariedad, diferenciación y autocorrelación | 20 min |
| 8.4 | Métodos de referencia: ingenuo, estacional, deriva | 10 min |
| 8.5 | Suavizado exponencial y Holt-Winters | 20 min |
| 8.6 | Modelos ARIMA y SARIMA | 20 min |
| 8.7 | Validación temporal y métricas (MAE, MAPE) | 15 min |
| 8.8 | Variables externas, múltiples series y modelos de machine learning | 10 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección, para estudiar y repasar |
| [`diapositivas.pdf`](diapositivas.pdf) ([fuente editable](diapositivas.md)) | Diapositivas de los vídeos y de las sesiones en vivo |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable de la semana (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Vídeos y lecturas gratuitas recomendadas para cada lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios del notebook |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — concentración de CO₂ en Mauna Loa (1958–2001): descomposición STL, prueba ADF, ACF/PACF, cuatro referencias ingenuas, Holt-Winters y SARIMA, pronóstico a 24 meses con intervalo de confianza y *backtesting* a lo largo de 7 años.

## Caso práctico (entregable)
Pronóstico a 24 meses (ejercicio 1) presentado en una página para un responsable no técnico: gráfico con histórico, pronóstico e intervalo; error esperado según el *backtesting*; mejora frente a la referencia ingenua; y 3 frases de interpretación. Opcional: aplicar el flujo a una serie de tu empresa (ejercicio 4).

## Autoevaluación
1. ¿Por qué no se puede usar una partición aleatoria train/test en series temporales?
2. ¿Qué indica un p-valor ADF de 0,99?
3. Tu modelo SARIMA tiene un MAPE de 8 % y el ingenuo estacional, de 7 %. ¿Qué haces?
4. ¿Qué parámetros del suavizado exponencial controlan la velocidad con la que el modelo «olvida» el pasado?
5. ¿Por qué el intervalo de confianza del pronóstico se ensancha con el horizonte?

<details><summary>Respuestas</summary>

1. Porque el modelo aprendería de observaciones posteriores a las que predice (fuga de información) y la evaluación sería demasiado optimista.
2. Que no podemos rechazar que la serie sea no estacionaria: probablemente hay tendencia y conviene diferenciar.
3. Quedarte con el ingenuo (o revisar el modelo): un modelo complejo que no bate a la referencia no aporta valor.
4. Los coeficientes de suavizado (α para el nivel, β para la tendencia, γ para la estacionalidad): cuanto más altos, más peso tienen las observaciones recientes.
5. Porque los errores se acumulan: cada paso depende de predicciones anteriores, también inciertas.
</details>

## Lecturas y recursos
- R. Hyndman, G. Athanasopoulos, *Forecasting: Principles and Practice*, 3.ª ed. (gratis: otexts.com/fpp3) — caps. 1–9.
- Documentación de statsmodels: *Time Series Analysis* (`statsmodels.tsa`).
- Para muchas series a la vez, conviene explorar librerías como `statsforecast` o `sktime`.
