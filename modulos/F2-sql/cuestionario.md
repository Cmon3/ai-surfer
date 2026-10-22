# Módulo F2 · SQL para análisis de datos — Cuestionario

10 preguntas tipo test. Cada pregunta tiene **una sola respuesta correcta**. Tiempo orientativo: 20 minutos.
Puedes usar el notebook para comprobar tus respuestas, pero intenta razonarlas primero.

---

**1.** En la consula
```
SELECT categoria, AVG(precio) FROM productos WHERE precio > 5 GROUP BY categoria;
```
¿Qué filas entran en la media?
- a) Todas; `WHERE` se ignora si hay `GROUP BY`.
- b) Solo las que tienen `precio > 5`, porque `WHERE` filtra antes de agregar.
- c) Solo las cuyo precio sea > 5 tras calcular la media.
- d) Ninguna: falta `HAVING`.

---

**2.** `WHERE` vs `HAVING`: ¿qué es verdad?
- a) `HAVING` filtra filas individuales; `WHERE`, grupos.
- b) `WHERE` puede usar `SUM()` pero `HAVING` no.
- c) `WHERE` filtra filas antes del agrupado; `HAVING` filtra grupos (ya agregados) después.
- d) Son sinónimos; uno se usa con subconsultas y el otro sin ellas.

---

**3.** `pedidos` tiene 500 filas y `lineas` 1200 (algunos pedidos tienen varias líneas). `SELECT COUNT(*) FROM pedidos p JOIN lineas l ON p.pedido_id=l.pedido_id` devuelve…
- a) 500.
- b) 1200.
- c) 1700.
- d) Depende del índice de la tabla.

---

**4.** Tras el join anterior, `SUM(p.importe_total)` (una columna de la tabla `pedidos`) es
- a) el total de ventas correcto.
- b) mayor o igual que el correcto, porque cada pedido se repite por cada línea.
- c) menor, porque el join descarta pedidos sin líneas.
- d) devuelve error: no se puede sumar una columna tras un join.

---

**5.** ¿Qué hace `COALESCE(ciudad, 'sin ciudad')`?
- a) Convierte la columna a mayúsculas.
- b) Sustituye los NULL por 'sin ciudad'.
- c) Elimina las filas sin ciudad.
- d) Devuelve la ciudad solo si es distinta de 'sin ciudad'.

---

**6.** Necesitas, por cada categoría, los 3 productos más vendidos. La herramienta natural es…
- a) `GROUP BY categoria` y mirar el resultado a ojo.
- b) `ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY unidades DESC)` y filtrar `rn <= 3`.
- c) `LIMIT 3`.
- d) `RANK()` sin partición.

---

**7.** Ventaja principal de una CTE (`WITH ventas AS (...)`) sobre una subconsulta anidada:
- a) Ejecuta más rápido siempre.
- b) Hace la consulta más legible y depurable, nombrando cada capa.
- c) Permite JOINs entre bases de datos distintas.
- d) Evita escribir el SELECT.

---

**8.** `SUM(importe) OVER (PARTITION BY mes)` en una tabla de líneas devuelve…
- a) una fila por mes con el total.
- b) el total del mes repetido en cada fila, manteniendo el detalle.
- c) el acumulado del año.
- d) solo la primera fila de cada mes.

---

**9.** Para comparar las ventas de cada mes con las del mes anterior en una tabla ya agregada por mes, usas…
- a) `LAG(importe) OVER (ORDER BY mes)`.
- b) `GROUP BY mes` otra vez.
- c) un segundo SELECT aparte.
- d) `HAVING`.

---

**10.** Un analista escribe en una base SQLite: `SELECT nombre FROM productos WHERE precio = NULL` para encontrar productos sin precio. El resultado es
- a) los productos sin precio.
- b) error de sintaxis.
- c) cero filas siempre (NULL = NULL es falso); lo correcto es `IS NULL`.
- d) todos los productos.

---

## Solucionario

1. **b** — WHERE se evalúa antes de GROUP BY.
2. **c**.
3. **b** — JOIN inner: cada pedido aparece tantas veces como líneas tiene.
4. **b** — por eso hay que sumar sobre la tabla de detalle o agregar antes de unir.
5. **b**.
6. **b**.
7. **b** — es cuestión de legibilidad y mantenimiento.
8. **b** — la ventana no comprime filas.
9. **a**.
10. **c**.
