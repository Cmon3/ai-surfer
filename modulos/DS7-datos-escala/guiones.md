# Módulo DS7 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh DS7`. Todas las demos salen del notebook; ten abiertos a la vez el notebook, el explorador de archivos (para ver las carpetas `mes=…`) y una terminal.

## 7.1 · Cuándo pandas deja de bastar (10 min)
- [0–2] Gancho: «el notebook que tardaba 40 minutos y falló por memoria».
- [2–6] Tres límites de pandas (memoria, un hilo, eager). Mostrar las 4 millones de filas y su tamaño en memoria frente a Parquet.
- [6–9] La escalera: pandas → DuckDB/Polars → Spark → streaming.
- [9–10] Regla: casi nadie necesita un clúster; medir antes de subir.

## 7.2 · DuckDB y Polars (20 min)
- [0–4] DuckDB: una librería, sin servidor; `read_parquet` con una consulta SQL.
- [4–8] Polars lazy: construir el plan y `collect()`; explicar *pushdown* con un ejemplo.
- [8–16] Benchmark en directo: ejecutar la celda, enseñar la tabla y **la comprobación de que los resultados coinciden** antes de hablar de tiempos.
- [16–20] Las seis reglas de un benchmark honesto y por qué un resultado no se generaliza.

## 7.3 · Parquet y particionado (15 min)
- [0–5] Fila frente a columna: dibujar en la pizarra una tabla de 4 columnas y cómo se guarda cada formato.
- [5–10] Demo: tamaños CSV vs Parquet, leer 2 columnas, y las carpetas `mes=…` en el explorador.
- [10–13] Poda de particiones: «1 de 12 archivos».
- [13–15] Cómo elegir la columna de partición (cardinalidad) y el problema de los archivos pequeños.

## 7.4 · Modelado de almacén (20 min)
- [0–5] Hechos y dimensiones con TiendaSur; **el grano** primero. Ejemplo de doble conteo.
- [5–12] Bronce, plata, oro con el lote sucio: mostrar los duplicados, nulos y canales mal escritos, y la tabla de rechazados con su motivo.
- [12–17] Idempotencia en directo: reprocesar el 2 de septiembre y comprobar que los ingresos no cambian.
- [17–20] ETL frente a ELT y puerta al siguiente vídeo.

## 7.5 · dbt (20 min)
- [0–4] Qué es y qué no es dbt (no mueve datos).
- [4–10] Recorrer los archivos: `sources.yml`, `stg_pedidos.sql`, `ref`, `schema.yml`.
- [10–14] `dbt build`: leer la salida (3 modelos, 9 tests).
- [14–18] Demo del fallo: insertar `canal = 'fax'`, el test falla y el código de salida es 1.
- [18–20] Avisos de deprecación y versiones: «los conceptos no cambian, la sintaxis sí».

## 7.6 · Spark (20 min)
- [0–5] Particiones, evaluación perezosa, transformaciones frente a acciones.
- [5–10] Shuffle: la simulación en pandas (ocho particiones, 96 sumas parciales).
- [10–15] Tabla de equivalencias; mostrar el esqueleto de Colab y la opción de Databricks Free Edition (comprobar nombre y límites vigentes).
- [15–20] Cuándo **no** usar Spark. Honestidad: en el curso no ejecutamos un clúster.

## 7.7 · Orquestación (15 min)
- [0–4] DAG: dibujar el del caso y mostrar el orden topológico.
- [4–9] El mini-orquestador: reintento con espera exponencial (el fallo simulado del día 5) y backfill de tres días.
- [9–13] Leer el archivo de Airflow: `@dag`, `@task`, `>>`, `catchup`.
- [13–15] Idempotencia y puertas de calidad como dos caras de lo mismo.

## 7.8 · Streaming (15 min)
- [0–4] Lote frente a flujo; Kafka en un párrafo (topics, particiones, offsets, grupos).
- [4–10] Demo del consumidor: duplicados, tardíos, ventanas de 5 minutos y marca de agua.
- [10–13] Ejercicio 5 en directo: la tabla exactitud frente a latencia.
- [13–15] Cierre del módulo: el caso práctico y qué pedir en una entrevista («cuéntame un pipeline que hayas montado»).
