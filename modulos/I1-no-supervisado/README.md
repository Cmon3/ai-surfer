# Módulo I1 · Datos no estructurados: clustering y reducción de dimensión

**Semana 1 de N2 · 6–8 horas**

## Objetivos
- Explicar qué es el aprendizaje no supervisado y cuándo aporta valor (segmentación, exploración, compresión).
- Preparar los datos para algoritmos basados en distancias (escalado).
- Aplicar k-means y clustering jerárquico, y elegir el número de grupos con criterios objetivos.
- Reducir la dimensión con PCA y t-SNE, conociendo las limitaciones de cada uno.
- Traducir segmentos técnicos en perfiles de negocio accionables.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 2.1 | Aprendizaje supervisado vs. no supervisado | 10 min |
| 2.2 | Distancias y por qué escalar | 10 min |
| 2.3 | k-means: algoritmo, supuestos y limitaciones | 20 min |
| 2.4 | Elegir *k*: codo, silueta y criterio de negocio | 15 min |
| 2.5 | Clustering jerárquico y dendrogramas | 15 min |
| 2.6 | PCA: intuición geométrica y varianza explicada | 20 min |
| 2.7 | t-SNE y UMAP: visualizar datos de alta dimensión | 15 min |
| 2.8 | Caso: segmentación RFM de clientes | 15 min |

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
[`notebook.ipynb`](notebook.ipynb) — segmentación de 1.500 clientes de un e-commerce por recencia, frecuencia y gasto; comparación de k-means con y sin escalado; dendrograma; PCA y t-SNE sobre imágenes de dígitos manuscritos.

## Caso práctico (entregable)
**Propuesta de segmentación** para el equipo de marketing (máx. 2 páginas o 5 diapositivas):
1. Número de segmentos elegido y justificación (técnica y de negocio).
2. Ficha de cada segmento: nombre, tamaño, perfil medio y **una acción concreta** (p. ej., campaña de reactivación para «dormidos»).
3. Un gráfico que muestre los segmentos.

## Autoevaluación
1. ¿Qué ocurre si aplicas k-means a variables en euros y en días sin escalarlas?
2. El método del codo no muestra un codo claro. ¿Qué otras herramientas usarías para elegir *k*?
3. k-means asume grupos de cierta forma. ¿Cuál? Pon un ejemplo de datos donde fallaría.
4. Has hecho PCA y la primera componente explica el 60 % de la varianza. ¿Cómo averiguas qué representa?
5. En un gráfico t-SNE, dos grupos aparecen muy separados. ¿Puedes concluir que son muy distintos?

<details><summary>Respuestas</summary>

1. La variable con mayor escala numérica domina la distancia y los grupos se forman casi solo según ella.
2. El coeficiente de silueta, la estabilidad de los grupos al cambiar la semilla o la muestra y, sobre todo, la utilidad de negocio (¿se pueden accionar *k* segmentos distintos?).
3. Grupos aproximadamente esféricos y de tamaño similar. Falla con formas alargadas o concéntricas (anillos) y con grupos de densidades muy distintas.
4. Mirando las cargas (`pca.components_`): qué variables originales tienen más peso y con qué signo.
5. No necesariamente: t-SNE preserva vecindades locales, pero las distancias entre grupos y sus tamaños no son interpretables.
</details>

## Lecturas y recursos
- G. James, D. Witten, T. Hastie, R. Tibshirani, J. Taylor, *An Introduction to Statistical Learning with Applications in Python* (ISLP, gratis: statlearning.com) — cap. 12.
- Guía de usuario de scikit-learn: *Clustering* y *Decomposition*.
- M. Wattenberg, F. Viégas, I. Johnson, «How to Use t-SNE Effectively», *Distill* (2016).
