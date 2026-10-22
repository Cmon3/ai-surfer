# Módulo F2 · SQL para análisis de datos — Apuntes

> SQL (Structured Query Language) es el idioma en el que hablan las bases de datos. Lleva 50 años y no se mueve de las entrevistas ni de los puestos de trabajo: casi todo dato de empresa vive en una base relacional o en un almacén de datos que se consulta en SQL.

---

## 2.1 Por qué SQL sigue siendo la lengua franca

**Qué es una base relacional.** Datos organizados en tablas (filas × columnas) que se relacionan por claves: un `cliente_id` en `pedidos` apunta a una fila de `clientes`. Ese modelo simple permite no repetir información (cada cliente aparece una sola vez) y actualizar en un solo sitio.

**Por dónde pasa el dato en una empresa:**

```
Fuentes → (extracción) → almacén de datos → SQL → análisis / dashboard / cuaderno
```

pandas, Spark, DuckDB… todos hablan «sabores» de SQL o lo imitan. Si sabes SQL, entiendes el 80 % de cualquier ETL y el 100 % de las discusiones sobre «de dónde sale este número».

**Cuándo SQL vs pandas.** SQL para: filtrar/agregar datos grandes en la base (deja correr la base de datos, no traigas todo a memoria); pandas para: estadística, visualización y modelado. Regla: **haz el filtrado agresivo en SQL, el análisis fino en pandas.**

### Vocabulario mínimo
- **DDL** crea tablas: `CREATE TABLE`. **DML** las modifica: `INSERT`, `UPDATE`, `DELETE`. **Consulta:** `SELECT` — esto último es el 95 % del trabajo de un analista.
- **Motor**: SQLite (archivo local, ideal para el curso), PostgreSQL/MySQL (servidores), DuckDB (analítica local ultrarrápida sobre CSV/Parquet).

---

## 2.2 SELECT: leer filas

```sql
SELECT nombre, categoria, precio
FROM productos
WHERE categoria = 'Bebidas' AND precio < 2.0
ORDER BY precio DESC
LIMIT 10;
```

Orden de evaluación (mental): FROM → WHERE → SELECT → ORDER BY → LIMIT.

- `WHERE` acepta `AND`, `OR`, `IN (...)`, `BETWEEN`, `LIKE 'A%'`, `IS NULL` (¡no `= NULL`!).
- **Expresiones en el SELECT**: `SELECT nombre, precio * stock AS valor_stock FROM productos;` — los alias (`AS`) hacen que el resultado se lea solo.
- `DISTINCT` quita duplicados: `SELECT DISTINCT categoria FROM productos;`

**Errores comunes:** filtrar con `=` un valor nulo (siempre devuelve falso); olvidar que los strings van con comillas simples; esperar que `ORDER BY` sea estable sin añadir un segundo criterio.

---

## 2.3 Funciones y fechas

- **Texto/numéricas**: `LOWER`, `LENGTH`, `ROUND`, `ABS`, `COALESCE(a, 'desconocido')` para nulos.
- **Fechas**: los motores difieren. En SQLite: `strftime('%Y-%m', fecha)` para el mes, `date(fecha, '-7 days')` para restar días. En DuckDB/Postgres: `date_trunc('month', fecha)`, `fecha - INTERVAL '7' day`. Aprende el patrón (extraer año/mes, truncar, restar) y consulta la sintaxis de tu motor.

**Para qué sirven en la práctica:** agrupar ventas por mes (`strftime('%Y-%m', fecha)` + GROUP BY), marcar pedidos recientes, rellenar nulos con `COALESCE`.

---

## 2.4 JOIN: combinar tablas

```sql
SELECT p.pedido_id, c.nombre, c.ciudad
FROM pedidos p
JOIN clientes c ON p.cliente_id = c.cliente_id;
```

| Tipo | Devuelve | Uso típico |
|------|----------|------------|
| `INNER JOIN` | solo coincidencias en ambas | pedidos con su cliente |
| `LEFT JOIN` | toda la izquierda, nulos si no hay pareja | clientes con o sin pedido („qué clientes no han comprado») |
| `FULL OUTER` | ambos lados completos | conciliación de datos |
| `CROSS JOIN` | producto cartesiano | raro; casi nunca |

**El error «multiplicar filas».** Si unes `pedidos` (1 fila/pedido) con `lineas` (N filas/pedido), la tabla final tiene N filas por pedido. Un `SUM` sobre una columna de `pedidos` **duplica** el total. Soluciones: agregar en la tabla correcta (`lineas`), o agregar primero en una subconsulta y luego unir, o comprobar con `COUNT(*)` antes de sumar.

Comprueba siempre:
```sql
SELECT COUNT(*) FROM resultado_join;  -- ¿crece respecto a la tabla origen? ¿por qué?
```

---

## 2.5 GROUP BY: de filas a resúmenes

```sql
SELECT categoria,
       COUNT(*) AS n_productos,
       AVG(precio) AS precio_medio,
       SUM(unidades_vendidas) AS unidades
FROM productos
GROUP BY categoria
HAVING COUNT(*) > 3
ORDER BY unidades DESC;
```

- **WHERE filtra filas antes de agrupar; HAVING filtra grupos después.** `HAVING AVG(precio) > 10` está permitido (es un agregado); en `WHERE` no.
- Regla de oro: cada columna del SELECT que no esté agregada debe estar en el `GROUP BY`.
- Funciones habituales: `COUNT`, `COUNT(DISTINCT col)`, `SUM`, `AVG`, `MIN`/`MAX`, `SUM(CASE WHEN ...)` para contar condicionales («conteo de pedidos caros»).

---

## 2.6 Subconsultas y CTE

Una subconsulta anidada se lee de dentro a fuera y se vuelve ilegible rápido. Las **CTE** (`WITH`) nombran cada paso:

```sql
WITH ventas_cliente AS (
  SELECT cliente_id, SUM(importe) AS total
  FROM pedidos
  GROUP BY cliente_id
),
clientes_top AS (
  SELECT * FROM ventas_cliente WHERE total > 1000
)
SELECT c.nombre, ct.total
FROM clientes_top ct
JOIN clientes c ON c.cliente_id = ct.cliente_id
ORDER BY ct.total DESC;
```

Misma consulta, pero se lee «de arriba a abajo», se depura capa a capa (ejecuta solo el primer `WITH` para revisar), y se reutiliza. Los analistas escriben CTE todo el día.

---

## 2.7 Funciones de ventana: la herramienta que separa a los juniors

Una ventana calcula sobre **grupos de filas sin comprimir el resultado**: cada fila mantiene su identidad, pero recibe un valor calculado sobre su «ventana» (partición).

```sql
SELECT
  p.pedido_id,
  p.fecha,
  l.unidades * l.precio_unitario AS linea,
  strftime('%Y-%m', p.fecha) AS mes,
  SUM(l.unidades * l.precio_unitario) OVER (PARTITION BY strftime('%Y-%m', p.fecha)) AS total_mes,
  ROW_NUMBER() OVER (PARTITION BY strftime('%Y-%m', p.fecha) ORDER BY l.unidades DESC) AS rn
FROM lineas l
JOIN pedidos p ON p.pedido_id = l.pedido_id;
```

| Función | Pregunta que responde |
|---|---|
| `ROW_NUMBER()` | numera dentro de la partición (top-N por grupo) |
| `RANK()` / `DENSE_RANK()` | ranking con empates |
| `SUM(x) OVER (...)` | total del grupo por fila (cuota: `SUM/SUM OVER`) |
| `LAG(col)` / `LEAD(col)` | fila anterior/siguiente (comparativas mes a mes) |
| `SUM(x) OVER (ORDER BY fecha)` | total acumulado |

**Patrones que resolverás:**

- **Top-3 productos por categoría**: `ROW_NUMBER() PARTITION BY categoria ... WHERE rn <= 3`.
- **Cuota de cada línea sobre el total del mes**: `importe / SUM(importe) OVER (PARTITION BY mes)`.
- **Diferencia vs. el mes anterior**: `importe - LAG(importe) OVER (ORDER BY mes)`.

> **Idea mental**: `GROUP BY` te da *una fila por grupo*; `PARTITION BY` te da *una métrica por fila*.

---

## Resumen del módulo

- SQL es la lengua franca de los datos; SQLite basta para aprender, y las CTE se llevan el día a día del análisis.
- WHERE antes, HAVING después; JOIN siempre con `COUNT(*)` de comprobación; ventanas para rankings, cuotas y comparativas.
- Patrón de trabajo: **filtrar y agregar en SQL → pasar a pandas para analizar y visualizar.**
