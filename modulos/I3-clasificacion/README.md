# Módulo 04 · Clasificación y pruebas de hipótesis

**Semana 5 · 7–8 horas** (el módulo más denso del programa)

## Objetivos
- Entrenar y comparar clasificadores: regresión logística, árboles, random forest y gradient boosting.
- Elegir la métrica adecuada (exactitud, precisión, recall, AUC) según el coste de cada tipo de error.
- Ajustar el umbral de decisión con un análisis coste-beneficio.
- Plantear pruebas de hipótesis, interpretar p-valores y calcular tamaños muestrales.
- Diseñar y analizar pruebas A/B evitando errores frecuentes (comparaciones múltiples, *peeking*).

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 4.1 | Problemas de clasificación en la empresa | 10 min |
| 4.2 | Regresión logística: probabilidades y odds | 15 min |
| 4.3 | Árboles de decisión | 15 min |
| 4.4 | Ensembles: random forest y gradient boosting | 20 min |
| 4.5 | Matriz de confusión, precisión, recall, curva ROC y AUC | 20 min |
| 4.6 | El umbral es una decisión de negocio | 10 min |
| 4.7 | Pruebas de hipótesis: H₀, p-valor, errores tipo I y II, potencia | 20 min |
| 4.8 | Pruebas A/B de principio a fin | 20 min |
| 4.9 | Trampas: comparaciones múltiples, *peeking*, efecto novedad | 10 min |

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
[`notebook.ipynb`](notebook.ipynb) — (1) diagnóstico de tumores de mama con cuatro clasificadores, curvas ROC y umbral óptimo con un coste de falso negativo 20 veces mayor; (2) tamaño muestral y análisis de una prueba A/B de conversión, corrección por comparaciones múltiples y simulación del efecto de mirar resultados a diario.

## Caso práctico (entregable)
Dos partes (máx. 2 páginas):
1. **Umbral de decisión:** con la matriz de costes que elijas (justifícala), recomienda un umbral y muestra la matriz de confusión resultante en test.
2. **Prueba A/B:** informe del experimento con hipótesis, tamaño muestral, resultado (diferencia con su IC 95 %), p-valor y recomendación de lanzar o no.

## Autoevaluación
1. Un modelo de fraude tiene 99,5 % de exactitud y el 0,5 % de las transacciones son fraudulentas. ¿Es bueno?
2. ¿Qué métrica priorizarías en un filtro de spam? ¿Y en un cribado de cáncer?
3. ¿Qué mide el AUC y por qué no depende del umbral?
4. Una prueba A/B da p = 0,03. Un compañero dice: «hay un 97 % de probabilidad de que B sea mejor». ¿Es correcto?
5. ¿Por qué no se debe detener una prueba A/B en cuanto el p-valor baja de 0,05?

<details><summary>Respuestas</summary>

1. No necesariamente: un modelo que diga siempre «no fraude» ya consigue un 99,5 %. Hay que mirar recall, precisión o AUC.
2. Spam: precisión (no enviar correos legítimos a la papelera). Cáncer: recall (no dejar casos sin detectar).
3. La probabilidad de que el modelo puntúe más alto a un positivo elegido al azar que a un negativo elegido al azar. Evalúa la ordenación, no un umbral concreto.
4. No. El p-valor es la probabilidad de observar una diferencia así (o mayor) si no hubiera diferencia real. No es la probabilidad de que B sea mejor.
5. Porque mirar repetidamente multiplica las oportunidades de obtener un falso positivo; la tasa real de error supera con creces el 5 %. Fija el tamaño muestral de antemano o usa métodos secuenciales diseñados para ello.
</details>

## Lecturas y recursos
- ISLP (statlearning.com) — caps. 4 (clasificación), 8 (árboles y ensembles) y 13 (pruebas múltiples).
- R. Kohavi, D. Tang, Y. Xu, *Trustworthy Online Controlled Experiments* (Cambridge University Press, 2020).
- E. Miller, «How Not To Run an A/B Test» (evanmiller.org).
