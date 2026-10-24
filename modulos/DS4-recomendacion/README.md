# Módulo DS4 · Sistemas de recomendación

**Semana 4 de N3-DS · 6–8 horas**

## Objetivos
- Conocer las familias de recomendadores: popularidad, basados en contenido, filtrado colaborativo e híbridos.
- Implementar filtrado colaborativo ítem-ítem con similitud del coseno.
- Implementar factorización de matrices con mínimos cuadrados alternados (ALS) e interpretar los factores latentes.
- Evaluar recomendadores con métricas de error (RMSE) y de ranking (precisión@k).
- Diseñar soluciones para el arranque en frío y otros problemas prácticos (sesgo de popularidad, diversidad).

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 6.1 | El problema de la recomendación y la matriz de valoraciones | 10 min |
| 6.2 | Referencias: popularidad y modelo de sesgos | 10 min |
| 6.3 | Filtrado colaborativo usuario-usuario e ítem-ítem | 20 min |
| 6.4 | Factorización de matrices: SVD y ALS | 20 min |
| 6.5 | Retroalimentación implícita (clics, visualizaciones) | 10 min |
| 6.6 | Evaluación offline y pruebas A/B de recomendadores | 15 min |
| 6.7 | Arranque en frío, diversidad y burbujas de filtro | 10 min |

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
[`notebook.ipynb`](notebook.ipynb) — plataforma de streaming con 600 usuarios y 300 películas: referencia de popularidad y de sesgos, filtrado ítem-ítem, ALS implementado desde cero, comparación con RMSE y precisión@5, selección del número de factores y recomendaciones personalizadas. El último ejercicio repite el análisis con **MovieLens 100K**.

## Caso práctico (entregable)
Presentación de 5 diapositivas para el director de producto:
1. Comparación de al menos tres recomendadores en MovieLens 100K (ejercicio 4).
2. Cuál desplegarías y por qué (precisión, coste de cálculo, explicabilidad).
3. Estrategia para usuarios y películas nuevos.
4. Cómo validarías el recomendador con una prueba A/B y qué métrica de negocio usarías.

## Autoevaluación
1. ¿Por qué la matriz de valoraciones es tan dispersa y qué problema causa?
2. ¿Por qué ítem-ítem suele escalar mejor que usuario-usuario en un e-commerce grande?
3. En $R \approx P Q^\top$, ¿qué representa una fila de $Q$?
4. Un modelo mejora el RMSE pero no cambia las ventas. ¿Cómo es posible?
5. ¿Cómo recomendarías a un usuario que acaba de registrarse?

<details><summary>Respuestas</summary>

1. Cada usuario interactúa con una fracción mínima del catálogo. Hay pocos datos por usuario y ítem, lo que dificulta estimar similitudes y favorece el sobreajuste (por eso se regulariza).
2. Suele haber muchos menos productos que usuarios, y las similitudes entre productos son más estables en el tiempo, así que se pueden precalcular.
3. El vector de características latentes de una película (p. ej., cuánto tiene de «acción» o de «drama», aunque los factores no tienen nombre por sí mismos).
4. El RMSE mide el error en todas las notas, incluidas las de productos que nunca se recomendarían. Lo que importa es la calidad del top de la lista (métricas de ranking) y el efecto causal en el comportamiento (prueba A/B).
5. Popularidad (global o por segmento), preguntas iniciales de preferencias, información de contexto (ubicación, dispositivo) o contenido, y pasar a modelos colaborativos a medida que acumule interacciones.
</details>

## Lecturas y recursos
- J. Leskovec, A. Rajaraman, J. Ullman, *Mining of Massive Datasets* (gratis: mmds.org) — cap. 9.
- Y. Koren, R. Bell, C. Volinsky, «Matrix Factorization Techniques for Recommender Systems», *IEEE Computer* (2009).
- GroupLens, conjuntos de datos MovieLens (grouplens.org/datasets/movielens).
