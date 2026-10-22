# Módulo F2 · SQL para análisis de datos

**Semanas 2–3 de N1 · ~8 horas** · Imprescindible: casi todo puesto de datos empieza por SQL.

## Objetivos
Al terminar este módulo podrás:
- Leer y escribir consultas `SELECT` con filtros, ordenación y límites.
- Combinar tablas con `JOIN` y entender qué pasa con los duplicados.
- Agregar con `GROUP BY`, `HAVING` y las funciones de agregación habituales.
- Usar funciones de ventana (`ROW_NUMBER`, `RANK`, `SUM OVER`, `LAG`) para top-N por grupo, totales acumulados y comparativas.
- Razonar cuándo una pregunta se responde mejor en SQL y cuándo mejor en pandas.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 2.1 | Por qué SQL sigue siendo la lengua franca de los datos; bases relacionales en 5 minutos | 10 min |
| 2.2 | SELECT, WHERE, ORDER BY, LIMIT; alias y expresiones | 15 min |
| 2.3 | Funciones y fechas: extraer y redondear tiempo | 15 min |
| 2.4 | JOINs: inner, left, y el error «multiplicar filas» | 20 min |
| 2.5 | GROUP BY y HAVING: de filas a resúmenes | 20 min |
| 2.6 | Subconsultas y CTE (WITH): consultas que se leen en capas | 15 min |
| 2.7 | Funciones de ventana: ranking, acumulados y comparar con la fila anterior | 20 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección, para estudiar y repasar |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con ejercicios (SQLite desde Python) |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Vídeos y lecturas gratuitas recomendadas |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — base de datos SQLite de *TiendaSur*: `clientes`, `productos`, `pedidos` y `lineas`. Empezamos por SELECT básicos y acabamos con ventanas: top-3 productos por categoría, ticket acumulado por mes y comparativa mes frente a mes.

## Caso práctico (entregable)
Completa los 5 ejercicios del final del notebook. Para cada uno entrega: la consulta SQL, el resultado y **una frase de conclusión para Dirección**.

**Criterios:** consultas que se ejecutan (30 %), resultados correctos (40 %), claridad de las conclusiones (30 %).

## Autoevaluación
1. ¿Qué diferencia hay entre `WHERE` y `HAVING`?
2. Unes `pedidos` con `lineas` por `pedido_id`. Si un pedido tiene 3 líneas, ¿cuántas filas aporta al resultado del `JOIN`?
3. ¿Para qué sirve una CTE (`WITH`) en lugar de una subconsulta anidada?
4. ¿Qué hace `ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY unidades DESC)`?
5. Haces la pregunta «cuánto vendimos ayer» en SQL; la pregunta «¿y eso es mucho?». ¿Cuál responde mejor pandas?

<details><summary>Respuestas</summary>

1. `WHERE` filtra filas **antes** de agrupar; `HAVING` filtra grupos **después** del `GROUP BY`. `WHERE` no puede usar agregados.
2. 3 filas: el `JOIN` replica la fila del pedido por cada línea coincidente. Por eso `SUM(importe_pedido)` tras el join puede duplicar si no se cuenta sobre la tabla de líneas.
3. Las CTE leen «de arriba a abajo», nombran cada capa y se pueden reutilizar: más legibles y depurables.
4. Numera las filas dentro de cada categoría según unidades descendientes (1, 2, 3… por categoría); con `WHERE rn <= 3` obtienes el top-3 por categoría.
5. «¿Cuánto?» es una agregación: SQL. «¿Es mucho?» exige comparar con historia, intervalos y quizá un gráfico: mejor pandas (pasar el resultado del SQL a un DataFrame es el patrón habitual).
</details>

## Lecturas y recursos
- SQLBolt (sqlbolt.com) — tutorial interactivo completo y gratuito.
- *SQL for Data Scientists* (cap. 1–4) o el curso «SQL for Data Analysis» de Mode (gratis en línea).
- Documentación de DuckDB y SQLite sobre funciones de ventana.
