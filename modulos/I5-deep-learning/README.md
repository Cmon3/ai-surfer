# Módulo 05 · Deep learning

**Semana 6 · 7–8 horas**

## Objetivos
- Explicar cómo aprende una red neuronal: capas, activaciones, función de pérdida, descenso de gradiente y retropropagación.
- Construir y entrenar redes en PyTorch con un bucle de entrenamiento propio.
- Entender por qué las redes convolucionales funcionan bien con imágenes.
- Diagnosticar el sobreajuste con curvas de aprendizaje y aplicar dropout y *early stopping*.
- Decidir cuándo compensa el deep learning frente a un modelo clásico, y qué es el *transfer learning*.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 5.1 | Del perceptrón a las redes multicapa | 15 min |
| 5.2 | Funciones de activación y de pérdida | 15 min |
| 5.3 | Descenso de gradiente, retropropagación y optimizadores | 20 min |
| 5.4 | PyTorch: tensores, modelos y bucle de entrenamiento | 20 min |
| 5.5 | Redes convolucionales | 20 min |
| 5.6 | Regularización: dropout, early stopping, aumento de datos | 15 min |
| 5.7 | Transfer learning y modelos preentrenados | 15 min |
| 5.8 | Más allá de las imágenes: secuencias, texto y transformers | 10 min |

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
[`notebook.ipynb`](notebook.ipynb) — reconocimiento de dígitos manuscritos: referencia con regresión logística, MLP y CNN en PyTorch, curvas de aprendizaje, visualización de filtros y análisis de errores. Funciona en CPU en pocos minutos.

## Caso práctico (entregable)
Informe técnico breve (máx. 2 páginas) para el equipo de logística:
1. Comparación de los tres modelos (exactitud, nº de parámetros, tiempo de entrenamiento).
2. Curvas de aprendizaje comentadas: ¿hay sobreajuste? ¿Qué lo corrige?
3. Resultado del ejercicio de aumento de datos.
4. Recomendación: ¿qué modelo pondrías en producción y qué datos adicionales pedirías para escalar a códigos postales completos?

## Autoevaluación
1. ¿Por qué una red sin funciones de activación no lineales no gana nada al añadir capas?
2. La pérdida de entrenamiento baja sin parar, pero la exactitud de validación empeora desde la época 20. ¿Qué ocurre y qué harías?
3. ¿Qué ventaja tienen las capas convolucionales frente a las densas en imágenes?
4. ¿Qué hace `loss.backward()` y qué hace `optimizer.step()`?
5. Tienes 500 fotos de productos defectuosos. ¿Entrenarías una CNN desde cero?

<details><summary>Respuestas</summary>

1. Una composición de funciones lineales es una función lineal: toda la red equivaldría a una sola capa.
2. Sobreajuste. Usar *early stopping* (quedarse con el modelo de la época 20), más regularización (dropout, *weight decay*), aumento de datos o un modelo más pequeño.
3. Comparten pesos (muchos menos parámetros) y detectan patrones locales sea cual sea su posición en la imagen.
4. `backward()` calcula el gradiente de la pérdida respecto a cada parámetro (retropropagación); `step()` actualiza los parámetros usando esos gradientes.
5. No: mejor partir de una red preentrenada en millones de imágenes y ajustar solo las últimas capas (*transfer learning*).
</details>

## Lecturas y recursos
- A. Zhang, Z. Lipton, M. Li, A. Smola, *Dive into Deep Learning* (gratis: d2l.ai) — caps. 3–7.
- Tutoriales oficiales de PyTorch: *Learn the Basics*.
- 3Blue1Brown, serie en vídeo *Neural Networks* — intuición visual de la retropropagación.
