# Módulo F4 · Matemáticas para machine learning

**Semana 4 de N1 · ~8 horas** · Todo con NumPy: nada de lápiz y papel salvo para entender una idea.

## Objetivos
Al terminar este módulo podrás:
- Razonar con vectores y matrices: qué operaciones son válidas, cómo se alinean las dimensiones y qué representa cada una en un dataset.
- Entender el **gradiente** como "dirección de máximo cambio" y calcularlo numéricamente.
- Escribir a mano el gradiente descendente y verlo converger (y fallar).
- Trabajar con **probabilidad condicionada** y por qué el teorema de Bayes es la regla de actualización de creencias.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 4.1 | Vectores: datos como puntos en el espacio; normas y distancias | 15 min |
| 4.2 | Matrices: qué hay sobre la mesa cuando manipulas un DataFrame | 20 min |
| 4.3 | El gradiente: dirección de subida; descenso de gradiente desde cero | 20 min |
| 4.4 | Derivadas y razones de cambio (en una variable y en varias) | 15 min |
| 4.5 | Probabilidad condicionada y Bayes: actualizar creencias con datos | 20 min |
| 4.6 | Simulación con NumPy: verificar las teorías a mano | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Vídeos y lecturas gratuitas recomendadas |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — datos de una encuesta de *TiendaSur*: distancias entre clientes, matrices de covarianza, **gradiente descendente desde cero** ajustando una recta a los datos, y Bayes para razonar sobre "cliente que compra producto X" dado que abrió el email.

## Caso práctica (entregable)
Completa los 5 ejercicios del final del notebook. Para cada uno entrega: el código, el resultado y **una frase de conclusión con intuición matemática**.

**Criterios:** código que se ejecuta (30 %), resultados correctos (40 %), claridad de la intuición (30 %).

## Autoevaluación
1. ¿Por qué un DataFrame "es" una matriz? ¿Qué representa cada fila y cada columna?
2. ¿Qué significa que el gradiente de una función en un punto apunte "hacia arriba"? ¿Cómo lo usas para minimizar?
3. Un LR (tasa de aprendizaje) grande hace que el descenso de gradiente… ¿converja más rápido? ¿Qué pasa si es demasiado grande?
4. ¿Por qué P(abre el email | compra) ≠ P(compra | abre el email)?
5. Da un ejemplo de negocio donde Bayes te corrija una intuición falsa.

<details><summary>Respuestas</summary>

1. Un DataFrame con n filas y p columnas es una matriz n×p; cada fila es un individuo/observación y cada columna una variable/feature. La matriz es el objeto matemático que permite multiplicaciones, distancias y proyecciones sobre él.
2. El gradiente es la dirección de máximo **aumento**; para minimizar te mueves en la dirección opuesta: `x -= lr * gradiente`.
3. No: LR grande da pasos largos que pueden sobrepasar el mínimo y oscilar (o divergir). Una LR pequeña converge lento pero seguro.
4. La primera es "de los compradores, ¿cuántos abrieron el email?"; la segunda, "de los que abren, ¿cuántos compran?". Distinta base (distinto denominador) — por eso la confusión base-rate es tan común.
5. Ejemplo: si solo el 1 % de los clientes compra y el test A/B parece "positivo" con una señal débil, la baja probabilidad previa corrige la postura (aunque en la práctica se razona con la tasa de falsos positivos, no con Bayes crudo).
</details>

## Lecturas y recursos
- *Essence of Linear Algebra* (3Blue1Brown, gratis en YouTube) — la mejor intuición visual.
- *Mathematics for Machine Learning* (Deisenroth, Faisal, Ong; gratis en mml-book.github.io) — caps. 2–5.
- *Think Bayes* (Allen Downey, gratis en línea) — Bayes desde Python.
