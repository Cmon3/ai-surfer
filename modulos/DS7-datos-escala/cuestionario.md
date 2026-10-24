# Módulo DS7 · Datos a escala — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Un benchmark enseña que DuckDB tarda 0,1 s y pandas 0,7 s en «la misma» consulta. ¿Qué haces antes de concluir que DuckDB es 7 veces más rápido?
- a) Nada: los números hablan solos.
- b) Compruebas que ambos devuelven el mismo resultado y repites la medición varias veces en las mismas condiciones.
- c) Ejecutas solo la de DuckDB varias veces.
- d) Lo repites en un ordenador más lento.

**2.** ¿Por qué Parquet es más eficiente que CSV para consultas analíticas?
- a) Porque es un archivo de texto más legible.
- b) Porque guarda los datos por columnas, comprimidos y con tipos, así que solo se leen las columnas necesarias.
- c) Porque solo admite columnas numéricas.
- d) Porque lo abre Excel directamente.

**3.** Particionas un Parquet por `mes` y consultas con `WHERE mes = '2026-09'`. ¿Qué ocurre?
- a) Se lee todo y después se filtra.
- b) Solo se abren los archivos de la carpeta `mes=2026-09` (poda de particiones).
- c) La consulta falla porque `mes` ya no es una columna.
- d) El motor ordena todos los archivos primero.

**4.** ¿Qué diferencia a Polars en modo *lazy* de pandas?
- a) Polars construye un plan, lo optimiza (filtros y proyecciones antes de leer) y lo ejecuta en paralelo; pandas ejecuta cada paso al momento.
- b) Polars solo funciona con SQL.
- c) pandas es siempre más lento, sin excepciones.
- d) Polars necesita un clúster.

**5.** En la arquitectura bronce/plata/oro, ¿qué debe contener la capa bronce?
- a) Solo los datos agregados para el dashboard.
- b) Una copia fiel de lo recibido, con metadatos de carga, sin modificar.
- c) Datos ya limpios y deduplicados.
- d) Únicamente las filas que pasan todas las validaciones.

**6.** Una tarea del pipeline hace `INSERT` del día en la tabla final sin borrar antes. Se reintenta tras un fallo de red. ¿Qué problema aparece?
- a) Ninguno.
- b) El día queda duplicado: la tarea no es idempotente. Hay que borrar el día e insertarlo (o usar `MERGE`).
- c) La tabla se bloquea para siempre.
- d) Airflow lo corrige solo.

**7.** En un esquema en estrella, el **grano** de la tabla de hechos es:
- a) El número de dimensiones.
- b) El nivel de detalle que representa una fila (por ejemplo, producto × canal × día), que se fija antes de diseñar el resto.
- c) El tamaño en disco de la tabla.
- d) El tipo de la clave primaria.

**8.** Un test de dbt `relationships` entre `fct_ventas_dia.id_producto` y `dim_producto.id_producto` falla. ¿Qué significa?
- a) Hay ventas de productos que no existen en la dimensión (claves huérfanas).
- b) La dimensión está vacía a propósito.
- c) dbt no puede conectar con el almacén.
- d) La tabla de hechos tiene demasiadas filas.

**9.** En Spark, ¿qué es un *shuffle* y por qué importa?
- a) Ordenar los resultados antes de mostrarlos; no afecta al rendimiento.
- b) El reparto de datos entre máquinas para agrupar o unir por clave; es caro porque mueve datos por la red.
- c) La copia de seguridad de las particiones.
- d) Una función para barajar filas al azar.

**10.** Tu consumidor con ventanas de 5 minutos y un retraso permitido de 60 s descarta el 1,8 % de los eventos como tardíos. Si subes el retraso permitido a 300 s:
- a) Se descartan más eventos.
- b) Se descartan menos, pero cada ventana tarda más en emitir su resultado (más latencia).
- c) No cambia nada.
- d) Kafka reordena los mensajes por ti.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | Sin comprobar el resultado puedes estar midiendo consultas distintas; sin repeticiones, midiendo el ruido. |
| 2 | b | El formato columnar permite leer solo lo que se pide y comprime mejor por columna. |
| 3 | b | Con particionado de estilo Hive, el motor lee el valor de la carpeta y se salta las demás. |
| 4 | a | El plan perezoso permite optimizar y paralelizar; pandas es eager. |
| 5 | b | Bronce es el seguro: permite reprocesar todo lo demás sin volver a la fuente. |
| 6 | b | Idempotencia: el mismo trabajo ejecutado dos veces deja el mismo resultado. |
| 7 | b | Fijar el grano evita mezclar niveles y sumar dos veces. |
| 8 | a | Una clave huérfana: el hecho apunta a una dimensión que no existe. |
| 9 | b | El shuffle es la operación cara de un clúster: minimizarlo es la clave del rendimiento. |
| 10 | b | Compromiso clásico entre exactitud y latencia en streaming. |
</details>
