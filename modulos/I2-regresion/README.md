# Módulo I2 · Regresión y predicción

**Semana 2 de N2 · 6–8 horas**

## Objetivos
- Ajustar modelos de regresión lineal simple y múltiple e interpretar coeficientes, p-valores y R².
- Diagnosticar un modelo a través de sus residuos.
- Distinguir entre **explicar** y **predecir**, y evaluar el rendimiento fuera de muestra.
- Detectar el sobreajuste y controlarlo con validación cruzada y regularización (Ridge, Lasso).
- Comparar siempre un modelo con una referencia ingenua.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 3.1 | De la correlación a la recta de regresión; mínimos cuadrados | 15 min |
| 3.2 | Regresión múltiple: «manteniendo el resto constante» | 15 min |
| 3.3 | Inferencia: errores estándar, p-valores, R² | 15 min |
| 3.4 | Supuestos y diagnóstico de residuos | 15 min |
| 3.5 | Variables categóricas, interacciones y transformaciones | 15 min |
| 3.6 | Sobreajuste, train/test y validación cruzada | 20 min |
| 3.7 | Regularización: Ridge y Lasso | 20 min |

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
[`notebook.ipynb`](notebook.ipynb) — predecir la progresión de la diabetes a un año en 442 pacientes: regresión simple y múltiple con statsmodels, residuos, comparación de modelos con validación cruzada, sobreajuste de un modelo polinómico y selección de variables con Lasso.

## Caso práctico (entregable)
Memorando para la dirección médica (máx. 1 página + anexo con código):
1. Modelo recomendado y su error esperado en pacientes nuevos (MAE), comparado con no usar modelo.
2. Las 3 variables más influyentes y cómo interpretarlas.
3. Resultado del ejercicio 4: qué % de los pacientes de mayor riesgo captura el modelo si solo se puede hacer seguimiento al 20 %.
4. Limitaciones (tamaño de la muestra, causalidad, población de origen).

## Autoevaluación
1. El coeficiente del IMC es 5,6. Interprétalo.
2. Un modelo tiene R² = 0,95 en entrenamiento y 0,40 en test. ¿Qué ocurre y cómo lo solucionarías?
3. ¿Por qué conviene estandarizar las variables antes de aplicar Ridge o Lasso?
4. ¿Qué diferencia práctica hay entre Ridge y Lasso?
5. Un coeficiente no es significativo (p = 0,3). ¿Significa que la variable no influye?

<details><summary>Respuestas</summary>

1. Por cada punto adicional de IMC, la progresión esperada aumenta 5,6 puntos, manteniendo constantes el resto de variables del modelo.
2. Sobreajuste: el modelo memoriza el ruido. Simplificar (menos variables), regularizar, conseguir más datos o elegir la complejidad por validación cruzada.
3. La penalización depende del tamaño de los coeficientes, que depende de las unidades de cada variable; sin escalar, se penalizaría de forma arbitraria.
4. Ridge encoge todos los coeficientes hacia 0 sin anularlos; Lasso puede anular algunos exactamente, por lo que selecciona variables.
5. No necesariamente: puede que la muestra sea pequeña, que esté correlacionada con otras variables (multicolinealidad) o que el efecto sea no lineal.
</details>

## Lecturas y recursos
- ISLP (statlearning.com) — caps. 3 (regresión lineal), 5 (remuestreo) y 6 (selección y regularización).
- Documentación de statsmodels: *Ordinary Least Squares*.
- Guía de usuario de scikit-learn: *Linear Models* y *Cross-validation*.
