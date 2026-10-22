# Módulo 00 · Fundamentos de Python para datos

**Semanas 0–1 · 10–12 horas en total** · Módulo de nivelación, obligatorio para quien no programe en Python habitualmente.

## Objetivos
Al terminar este módulo podrás:
- Escribir código Python con variables, listas, diccionarios, condicionales, bucles y funciones.
- Operar con arrays de NumPy de forma vectorizada.
- Cargar, limpiar, filtrar, agrupar y combinar tablas con pandas.
- Crear gráficos claros con matplotlib y seaborn para responder preguntas de negocio.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 0.1 | Por qué Python para datos; Jupyter y Google Colab | 10 min |
| 0.2 | Tipos, variables y operadores | 15 min |
| 0.3 | Listas, diccionarios y comprensiones | 15 min |
| 0.4 | Condicionales, bucles y funciones | 20 min |
| 0.5 | NumPy: arrays y vectorización | 15 min |
| 0.6 | pandas I: Series, DataFrame, selección y filtrado | 20 min |
| 0.7 | pandas II: limpieza (nulos, duplicados, tipos, fechas) | 20 min |
| 0.8 | pandas III: `groupby`, tablas dinámicas y `merge` | 20 min |
| 0.9 | Visualización: qué gráfico usar para cada pregunta | 15 min |

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
[`notebook.ipynb`](notebook.ipynb) — análisis exploratorio de las ventas de *TiendaSur*, una cadena de 5 tiendas: limpieza de datos, ingresos por tienda y por m², tablas dinámicas, efecto de las promociones y visualización.

## Caso práctico (entregable)
Completa los 5 ejercicios del final del notebook. Para cada uno entrega: el código, el resultado (tabla o gráfico) y **una frase de conclusión para Dirección**.

**Criterios:** código que se ejecuta de principio a fin (30 %), respuestas correctas (40 %), claridad de gráficos y conclusiones (30 %).

## Autoevaluación
1. ¿Qué diferencia hay entre `df.loc` y `df.iloc`?
2. ¿Por qué es preferible `ventas["unidades"] * ventas["precio"]` a un bucle `for` fila a fila?
3. Tienes una columna de precios con un 2 % de nulos. Nombra dos formas de tratarlos y un riesgo de cada una.
4. ¿Qué devuelve `df.groupby("tienda")["ingreso"].sum()` y en qué se diferencia de `.transform("sum")`?
5. ¿Qué tipo de gráfico usarías para comparar el ingreso de 5 tiendas? ¿Y para ver su evolución mensual?

<details><summary>Respuestas</summary>

1. `loc` selecciona por etiquetas (nombres de filas/columnas); `iloc`, por posición numérica.
2. Las operaciones vectorizadas se ejecutan en código compilado: son decenas o cientos de veces más rápidas y más legibles.
3. Eliminar filas (puede sesgar si los nulos no son aleatorios) o imputar con la mediana de su grupo (reduce artificialmente la variabilidad). También se puede marcar con una columna indicadora.
4. `sum()` devuelve una fila por tienda; `transform("sum")` devuelve una serie del mismo tamaño que el DataFrame original, con el total de la tienda repetido en cada fila (útil para calcular cuotas).
5. Barras para comparar categorías; líneas para evolución temporal.
</details>

## Lecturas y recursos
- W. McKinney, *Python for Data Analysis*, 3.ª ed. (gratis en línea: wesmckinney.com/book) — caps. 2–5 y 7–10.
- Documentación de pandas: «10 minutes to pandas».
- Kaggle Learn: cursos gratuitos *Python* y *Pandas*.
