# Módulo F2 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh F2`. Todas las demos se hacen sobre la base SQLite de TiendaSur que crea el notebook (`clientes`, `productos`, `pedidos`, `lineas`); ten abiertos el notebook y las diapositivas a la vez.

## 2.1 · Por qué SQL sigue siendo la lengua franca (10 min)
- [0–2] Gancho: una oferta real de Data Scientist y otra de AI Engineer; señalar «SQL» en ambas.
- [2–5] El camino del dato: fuentes → almacén → SQL → análisis. Dónde encaja pandas.
- [5–8] Tablas y claves con el esquema de TiendaSur: por qué un cliente aparece una sola vez.
- [8–10] Motores (SQLite, PostgreSQL, DuckDB) y la regla «filtra y agrega en SQL, analiza en pandas».

## 2.2 · SELECT, WHERE, ORDER BY, LIMIT (15 min)
- [0–4] Primera consulta en el notebook; leerla en el orden FROM → WHERE → SELECT → ORDER BY → LIMIT.
- [4–9] Filtros: `AND`/`OR`, `IN`, `BETWEEN`, `LIKE`. Demo en vivo del error `= NULL` frente a `IS NULL`.
- [9–13] Expresiones y alias (`precio * stock AS valor_stock`), `DISTINCT`.
- [13–15] Empates en `ORDER BY`: añadir un segundo criterio para resultados reproducibles.

## 2.3 · Funciones y fechas (15 min)
- [0–5] Texto y números: `LOWER`, `ROUND`, `COALESCE` para nulos.
- [5–12] Fechas en SQLite: ventas por mes con `strftime('%Y-%m', fecha)`, pedidos de los últimos 30 días con `date('now', '-30 days')`.
- [12–15] Tabla de equivalencias con DuckDB/Postgres: aprende el patrón, consulta la sintaxis.

## 2.4 · JOINs y el error de multiplicar filas (20 min)
- [0–5] `INNER JOIN` de pedidos con clientes; por qué los alias de tabla (`p`, `c`) ayudan.
- [5–10] `LEFT JOIN` para «clientes que nunca han comprado» (anti-join con `IS NULL`).
- [10–17] Demo del error: sumar los gastos de envío tras unir con `lineas`; el total se infla. Diagnóstico con `COUNT(*)` antes y después.
- [17–20] Tres soluciones: agregar en la tabla correcta, agregar antes de unir, o comprobar la granularidad.

## 2.5 · GROUP BY y HAVING (20 min)
- [0–6] De filas a resúmenes: ingresos por categoría con `COUNT`, `SUM`, `AVG`.
- [6–11] WHERE frente a HAVING con el mismo ejemplo: filtrar pedidos antes y categorías después.
- [11–16] Conteo condicional con `SUM(CASE WHEN …)`: pedidos de más de 50 € por tienda.
- [16–20] Error clásico: una columna no agregada fuera del `GROUP BY`; cómo lo trata cada motor.

## 2.6 · Subconsultas y CTE (15 min)
- [0–5] La misma consulta como subconsulta anidada: difícil de leer.
- [5–12] Reescribirla con `WITH`: ventas por cliente → clientes top → unión con sus datos. Ejecutar cada capa por separado para depurar.
- [12–15] Cuándo usar CTE en el trabajo diario y en entrevistas (se lee mejor y se explica mejor).

## 2.7 · Funciones de ventana (20 min)
- [0–4] Idea central: `GROUP BY` da una fila por grupo; `PARTITION BY`, una métrica por fila.
- [4–10] Top-3 productos por categoría con `ROW_NUMBER()` y una CTE.
- [10–15] Cuota de cada producto sobre el total de su categoría con `SUM(...) OVER (PARTITION BY …)`.
- [15–20] Comparativa mes a mes con `LAG` y acumulado con `SUM(...) OVER (ORDER BY mes)`. Cierre: es la pregunta de SQL más habitual en entrevistas técnicas.
