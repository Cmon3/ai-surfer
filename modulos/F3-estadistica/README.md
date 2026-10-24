# Módulo F3 · Estadística para la toma de decisiones

**Semana 3–4 de N1 · 6–8 horas**

## Objetivos
- Reconocer las distribuciones de probabilidad más habituales y qué fenómenos modelan.
- Explicar, con simulaciones, la ley de los grandes números y el teorema central del límite.
- Construir e interpretar correctamente intervalos de confianza, por fórmula y por *bootstrap*.
- Identificar variables de confusión y la paradoja de Simpson; distinguir correlación de causalidad.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 1.1 | Población, muestra y por qué la incertidumbre importa en los negocios | 10 min |
| 1.2 | Variables aleatorias y distribuciones (binomial, Poisson, normal, exponencial, log-normal) | 20 min |
| 1.3 | Ley de los grandes números y teorema central del límite | 15 min |
| 1.4 | Estimación y error estándar | 15 min |
| 1.5 | Intervalos de confianza: construcción e interpretación | 20 min |
| 1.6 | Bootstrap: incertidumbre para cualquier métrica | 15 min |
| 1.7 | Correlación, causalidad y paradoja de Simpson | 15 min |

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
[`notebook.ipynb`](notebook.ipynb) — estimar el importe medio de los pedidos de una app de reparto: simulación del TCL, cobertura de los intervalos de confianza, bootstrap de la mediana y un ejemplo de paradoja de Simpson en un test de conversión.

## Caso práctico (entregable)
Informe de **una página** para el director comercial de la app que responda: «¿Cuál es el importe medio de un pedido y cuánto podemos fiarnos de esa cifra?». Debe incluir el intervalo de confianza, su interpretación en lenguaje llano y una recomendación sobre el tamaño de muestra para la próxima estimación (ejercicio 3).

## Autoevaluación
1. Una encuesta dice «el 62 % de los clientes está satisfecho (IC 95 %: 58 %–66 %)». ¿Qué afirmación es correcta: «hay un 95 % de probabilidad de que el valor real esté entre 58 % y 66 %» o «el método produce intervalos que contienen el valor real el 95 % de las veces»?
2. Si cuadruplicas el tamaño de la muestra, ¿cómo cambia la anchura del intervalo de confianza de la media?
3. ¿Por qué el TCL permite usar la normal para la media de los importes aunque los importes individuales no sean normales?
4. ¿Cuándo preferirías el bootstrap a la fórmula clásica?
5. Las heladerías venden más los días con más ahogamientos en la playa. ¿Prohibimos los helados?

<details><summary>Respuestas</summary>

1. La segunda es la interpretación frecuentista estricta. En la práctica, la primera es una aproximación aceptable para comunicar, pero conviene conocer la diferencia.
2. Se reduce a la mitad (el error estándar es proporcional a $1/\sqrt n$).
3. Porque la media de muchas observaciones independientes tiende a una normal sea cual sea la distribución original (con varianza finita), si *n* es suficientemente grande.
4. Para estadísticos sin fórmula sencilla (mediana, percentiles, ratios), muestras pequeñas o distribuciones muy asimétricas.
5. No: el calor es una variable de confusión que aumenta ambas cosas.
</details>

## Lecturas y recursos
- D. Diez, M. Çetinkaya-Rundel, C. Barr, *OpenIntro Statistics* (gratis: openintro.org) — caps. 3–5.
- A. Downey, *Think Stats* (gratis en línea) — enfoque computacional con Python.
- *Seeing Theory* (seeing-theory.brown.edu) — visualizaciones interactivas de probabilidad y estadística.
