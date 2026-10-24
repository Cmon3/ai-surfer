# Módulo DS7 · Datos a escala — Apuntes

> Objetivo: que tus datos lleguen limpios, a tiempo y de forma repetible a quien los necesita, y que sepas qué herramienta usar según el tamaño y la velocidad del problema.

Todos los ejemplos usan **TiendaSur** y los resultados citados salen del notebook (4 millones de líneas de pedido). Los tiempos dependen de tu equipo: lo que importa son las proporciones y el método.

---

## 7.1 · Cuándo pandas deja de bastar

pandas es la herramienta perfecta para explorar datos que caben cómodamente en memoria. Se queda corto por tres razones:

1. **Memoria.** pandas carga todo en RAM y suele necesitar entre 2 y 5 veces el tamaño del archivo en disco. En el notebook, 4 millones de filas ocupan unos 460 MB en memoria, pero 90 MB en Parquet.
2. **Un solo hilo.** La mayoría de operaciones usan un solo núcleo.
3. **Ejecución inmediata (*eager*).** Cada línea se ejecuta al momento; pandas no puede «ver» tu consulta entera para optimizarla (por ejemplo, no leer las columnas que no vas a usar).

Una escalera de decisiones práctica, de menos a más compleja:

| Tamaño y necesidad | Herramienta |
|---|---|
| Cabe en memoria y exploras | **pandas** |
| Cabe en un disco local y quieres rapidez, SQL o Parquet | **DuckDB** o **Polars** |
| No cabe en un disco ni en un servidor grande, o varios equipos comparten el cómputo | **Spark** (o un almacén en la nube) |
| Los datos no paran de llegar y hay que reaccionar en segundos | **Streaming** (Kafka, Flink, Spark Structured Streaming) |

**Regla del sector:** casi nadie necesita un clúster. Una máquina moderna con DuckDB o Polars maneja decenas de gigabytes con tranquilidad. Subir de nivel tiene un coste de complejidad: hazlo cuando mides que lo necesitas, no antes.

---

## 7.2 · DuckDB y Polars (y cómo medir bien)

### DuckDB
Un motor SQL analítico **embebido** (como SQLite, pero orientado a columnas y a análisis). No hay servidor: es una librería. Lee Parquet y CSV directamente, se integra con pandas y Polars y ejecuta consultas en paralelo.

```python
import duckdb
duckdb.sql("""
    SELECT mes, SUM(cantidad * precio_unitario) AS ingresos
    FROM read_parquet('pedidos/**/*.parquet', hive_partitioning = true)
    WHERE estado = 'entregado' GROUP BY mes ORDER BY mes
""").df()                                  # devuelve un DataFrame de pandas
```

Puntos prácticos:
- Un archivo `.duckdb` es una base de datos completa en un único archivo; solo **un proceso** puede escribir a la vez (importante cuando luego uses dbt: cierra tu conexión antes).
- Consume siempre los resultados (`.fetchall()`, `.df()`): un `fetchone()` suelto puede dejar la conexión con un resultado pendiente.

### Polars
Una librería de DataFrames escrita en Rust, con dos modos:
- **Eager:** como pandas (`pl.read_parquet`).
- **Lazy:** `pl.scan_parquet(...)` devuelve un *plan* que se optimiza y se ejecuta con `.collect()`. Aplica **filtros y proyecciones lo más cerca posible de la lectura** (*predicate* y *projection pushdown*) y usa todos los núcleos.

Se programa con **expresiones** (`pl.col("cantidad") * pl.col("precio")`), que Polars puede optimizar; evita las funciones Python fila a fila.

### El benchmark honesto
Resultado típico del notebook (ingresos y clientes distintos por mes y categoría sobre 4 millones de filas):

| Motor | Tiempo relativo |
|---|---|
| pandas, leyendo todo | 1,0 (referencia) |
| pandas, leyendo solo las columnas necesarias | un poco mejor |
| Polars (lazy) | varias veces más rápido |
| DuckDB (SQL) | varias veces más rápido |

Reglas para que un benchmark valga algo:
1. **Mismo resultado.** Comprueba que los motores devuelven lo mismo (en el notebook, con `np.allclose`). Si no, mides cosas distintas.
2. **Mismas condiciones.** Misma fuente de datos, misma máquina, sin otros procesos.
3. **Varias repeticiones** y te quedas con el mejor tiempo (o con la mediana): la primera ejecución calienta cachés.
4. **Mide todo el trabajo**, incluida la lectura del archivo, no solo el cálculo.
5. **Cuenta la historia completa:** tiempo *y* memoria *y* legibilidad. El motor más rápido no siempre es el mejor para tu equipo.
6. **No generalices:** un resultado vale para esa consulta y esos datos.

---

## 7.3 · Parquet, formatos columnares y particionado

### Fila frente a columna
- **CSV / JSON:** almacenan **filas** como texto. Para leer una columna hay que recorrer todo el archivo y convertir texto a números.
- **Parquet:** almacena **columnas** en bloques comprimidos, con tipos y estadísticas (mínimo y máximo por bloque). Consecuencias:
  - archivos mucho más pequeños (en el notebook, 10 MB frente a 33 MB para 500.000 filas);
  - **projection pushdown:** solo se leen las columnas que pides;
  - **predicate pushdown:** con las estadísticas se saltan bloques que no pueden cumplir el filtro.

### Particionado
Al escribir con `partition_cols=["mes"]` se crea una carpeta por valor (`mes=2026-09/`). Con un filtro por `mes`, el motor **solo abre las carpetas necesarias** (*partition pruning*): en el notebook, 1 archivo de 12.

Cómo elegir la columna de partición:
- Una columna que **se filtra a menudo** (fecha casi siempre).
- De **baja cardinalidad**: decenas o cientos de valores, no millones. Particionar por `id_cliente` crearía 200.000 carpetas diminutas (el «problema de los archivos pequeños»).
- Archivos de un tamaño razonable (del orden de decenas a cientos de MB).

### Compresión
`snappy` (por defecto) es rápida y comprime lo justo; `zstd` comprime más con algo más de coste al escribir; sin compresión casi nunca compensa. Para «escribir una vez, leer muchas», `zstd` suele ser buena elección. **Mídelo con tus datos**, como en el ejercicio 2.

### Otros formatos
- **Arrow:** formato en memoria que comparten pandas, Polars, DuckDB y Spark; evita copias al pasar datos entre ellos.
- **Delta Lake / Apache Iceberg:** capas sobre Parquet que añaden transacciones, historial y borrados. Aparecen en Databricks y en muchos *lakehouses*; a nivel conceptual: «Parquet con superpoderes de base de datos».

---

## 7.4 · Modelado de almacén: estrella y capas

### Esquema en estrella
Un **almacén de datos** (*data warehouse*) organiza los datos para responder preguntas, no para registrar operaciones.
- **Tabla de hechos:** los eventos medibles (ventas). Una fila por **grano**; columnas numéricas (unidades, ingresos) y claves a las dimensiones.
- **Dimensiones:** el contexto (producto, fecha, canal, cliente). Descriptivas y relativamente pequeñas.

Ejemplo de TiendaSur: `fct_ventas_dia` con grano *día × producto × canal* y `dim_producto` (categoría, precio de lista). Los analistas hacen `JOIN` por claves y agrupan.

**Primero el grano.** Antes de añadir columnas, escribe en una frase qué representa una fila. Mezclar granos (líneas con totales de pedido) es la forma más habitual de sumar dos veces.

Normalizado (3NF) frente a estrella: la normalización minimiza redundancia para **escribir** bien (sistemas operacionales); la estrella acepta redundancia para **leer** rápido y sencillo.

### Capas bronce, plata, oro (arquitectura medallón)
| Capa | Contenido | Regla |
|---|---|---|
| **Bronce** | Copia fiel de la fuente + metadatos (fecha de lote, momento de ingesta) | Nunca se modifica. Es tu seguro para reprocesar |
| **Plata** | Limpio, tipado, deduplicado, valores normalizados | Lo que se rechaza se guarda **con su motivo** |
| **Oro** | Modelos de negocio (hechos y dimensiones, agregados) | Pensado para dashboards y modelos |

En el notebook cada día llega con ~2 % de duplicados, ~1 % de precios nulos, ~0,5 % de cantidades negativas y canales como `WEB` o ` web `. La plata los trata y cuenta lo rechazado (alrededor del 1,5 %); una **puerta de calidad** detiene el pipeline si el rechazo supera un umbral (5 %).

### ETL y ELT
- **ETL:** transformas *antes* de cargar.
- **ELT:** cargas el dato crudo en el almacén y transformas **dentro** con SQL. Es lo habitual hoy porque el almacén escala mejor que tus scripts, y es lo que hace dbt.

---

## 7.5 · dbt: SQL con estructura y tests de datos

**dbt** (*data build tool*) no mueve datos: **transforma dentro del almacén**. Aporta lo que le falta a una carpeta de scripts SQL:

- **Modelos:** cada archivo `.sql` es un `select` que dbt materializa como vista o tabla.
- **Dependencias:** `{{ ref('stg_pedidos') }}` referencia otro modelo; dbt deduce el orden y el grafo.
- **Fuentes:** `{{ source('plata', 'pedidos') }}` declara de dónde vienen los datos crudos.
- **Tests:** comprueban los datos en cada ejecución.
- **Documentación y linaje:** `dbt docs generate` produce un sitio con el grafo de dependencias.

### Estructura mínima del proyecto del notebook
```
tiendasur_dbt/
├── dbt_project.yml            # nombre, perfil y materialización por carpeta
├── profiles.yml               # conexión (aquí: un archivo DuckDB)
├── models/
│   ├── staging/               # limpieza ligera de las fuentes (vistas)
│   │   ├── sources.yml
│   │   └── stg_pedidos.sql
│   └── marts/                 # modelos de negocio (tablas)
│       ├── dim_producto.sql
│       ├── fct_ventas_dia.sql
│       └── schema.yml         # tests
└── tests/ingresos_no_negativos.sql
```

### Tests
- **Genéricos** (en YAML): `unique`, `not_null`, `accepted_values`, `relationships` (integridad referencial: «toda venta apunta a un producto que existe»).
- **Singulares** (un `.sql` que devuelve las filas que violan la regla): si no devuelve filas, pasa.

En el notebook, `dbt build` ejecuta 3 modelos y 9 tests (todos en verde). Después insertamos una fila con `canal = 'fax'` y el test `accepted_values` **falla** y bloquea lo que depende de él: así se detiene un dato malo antes de llegar a un dashboard. El código de salida de `dbt` es distinto de 0, que es lo que necesita un orquestador para parar.

> **dbt cambia con frecuencia.** Aparecen avisos de deprecación (por ejemplo, los argumentos de los tests genéricos van dentro de `arguments:`) y existe una v2 del motor. Los conceptos (modelos, `ref`, tests, linaje) no cambian. Comprueba la documentación vigente.

### Materializaciones
`view` (no guarda datos; siempre fresca), `table` (se reconstruye entera), `incremental` (solo procesa lo nuevo; más eficiente y más delicada, **exige idempotencia por clave**), `ephemeral`.

---

## 7.6 · Spark: DataFrames distribuidos

### Qué es
**Apache Spark** reparte los datos en **particiones** entre las máquinas de un clúster y ejecuta tu plan en paralelo sobre cada una. Su API de DataFrame en Python (**PySpark**) se parece a pandas y a SQL. Lo ofrecen Databricks, AWS (EMR, Glue), Azure (Synapse, Fabric) y Google (Dataproc).

### Cómo piensa
- **Evaluación perezosa:** `filter`, `select`, `groupBy`… son **transformaciones** que solo construyen un plan. No se ejecuta nada hasta una **acción** (`show`, `count`, `write`).
- **Transformaciones estrechas** (`filter`, `select`) trabajan dentro de cada partición. **Anchas** (`groupBy`, `join`) obligan a un ***shuffle***: repartir los datos por clave entre máquinas por la red. El shuffle es lo caro: gran parte de optimizar Spark es evitarlo o reducirlo.
- **Agregación parcial:** antes del shuffle, cada partición agrega lo suyo, así que viajan sumas parciales y no filas. El notebook lo simula en pandas: ocho particiones, 96 sumas parciales en lugar de 4 millones de filas.

### Equivalencias
| Operación | pandas | Polars | PySpark | SQL |
|---|---|---|---|---|
| Filtrar | `df[df.estado == "x"]` | `df.filter(pl.col("estado") == "x")` | `df.filter(F.col("estado") == "x")` | `WHERE` |
| Columna nueva | `df.assign(...)` | `df.with_columns(...)` | `df.withColumn(...)` | `SELECT ..., expr AS ...` |
| Agrupar | `df.groupby(...).agg(...)` | `df.group_by(...).agg(...)` | `df.groupBy(...).agg(...)` | `GROUP BY` |
| Unir | `df.merge(...)` | `df.join(...)` | `df.join(...)` | `JOIN` |

Si dominas SQL, ya dominas buena parte de Spark: `spark.sql("SELECT ...")` ejecuta SQL sobre DataFrames registrados como vistas.

### Dónde practicar gratis
- **Google Colab:** `pip install pyspark` y `SparkSession.builder.master("local[*]")`. Spark en modo local, sin clúster, para aprender la API.
- **Databricks Free Edition:** cuenta gratuita en la nube con Spark ya configurado y cuadernos. **Comprueba el nombre y los límites vigentes**: los planes gratuitos cambian.
- **En tu equipo:** necesitas PySpark y una versión de Java compatible. El notebook comprueba ambas cosas y, si faltan, sigue con la simulación.

### Cuándo NO usar Spark
Si cabe en una máquina, DuckDB o Polars serán más sencillos y más rápidos (Spark tiene un coste fijo de arranque y coordinación). Spark compensa cuando el volumen supera una máquina, cuando tu empresa ya tiene la plataforma, o cuando necesitas su ecosistema (MLlib, Structured Streaming, Delta Lake).

---

## 7.7 · Orquestación: DAGs, Airflow e idempotencia

### Qué es un DAG
Un **grafo acíclico dirigido**: nodos = tareas, flechas = «B depende de A». «Acíclico» garantiza que existe un orden de ejecución. En el notebook: `extraer → bronce → plata → {oro, calidad} → informe`; `graphlib.TopologicalSorter` calcula el orden.

### Qué hace un orquestador
Ejecuta el DAG según un **calendario** (`@daily`), **reintenta** tareas que fallan (con espera exponencial), registra un **historial** y alertas, permite relanzar solo lo que falló y hace ***backfill*** (reprocesar un rango de fechas pasado). Herramientas: **Apache Airflow** (el estándar histórico), **Dagster**, **Prefect**, y los orquestadores integrados en Databricks y en los servicios cloud.

### Airflow en breve
- Un **DAG** se define en un archivo Python (el notebook escribe `dags/tiendasur_pedidos_diarios.py`).
- Cada tarea es un **operador** o una función con `@task` (TaskFlow API).
- Las dependencias se escriben con `>>`.
- `catchup=True` ejecuta las fechas pendientes; `retries` y `retry_delay` controlan los reintentos.
- Hay un **planificador** y un **servidor web** para ver ejecuciones; para aprender, usa la imagen oficial de Docker. La sintaxis cambia entre versiones mayores (Airflow 2 y 3): comprueba la vigente.

### Idempotencia: la propiedad que lo hace todo seguro
Una tarea es **idempotente** si ejecutarla varias veces con la misma entrada deja el mismo resultado. Es imprescindible porque en un sistema real **se reintentará** (fallos de red) y **se reprocesará** (errores corregidos, cambios de lógica).

Patrones:
- **Borrar e insertar por partición** (lo que hace el notebook: `DELETE WHERE fecha = ?` + `INSERT`).
- **Sobrescribir la partición** de destino (`INSERT OVERWRITE`, `mode("overwrite")`).
- **`MERGE`/*upsert*** por clave.
- Parámetros que dependen de la **fecha lógica** del DAG, no de «hoy» (para que reprocesar el 2 de septiembre use los datos del 2 de septiembre).

Y las compañeras de la idempotencia: **puertas de calidad** (parar antes de escribir en oro si algo va mal), **reintentos solo para errores transitorios** (una red caída sí; un error de lógica no) y **alertas** cuando se agotan.

---

## 7.8 · Streaming: Kafka y ventanas

### Lote frente a flujo
- **Lote (*batch*):** procesas un conjunto de datos acotado cada cierto tiempo (cada noche).
- **Flujo (*streaming*):** procesas eventos conforme llegan, para reaccionar en segundos (detección de fraude, precios dinámicos, recomendaciones en vivo).

No todo necesita streaming: **empieza por lotes** y pasa a flujo solo si el negocio pierde valor esperando. El streaming añade complejidad (orden, duplicados, estado).

### Kafka en un párrafo
**Apache Kafka** es un **registro distribuido de eventos**. Los **productores** escriben mensajes en ***topics***; cada topic se divide en **particiones** (que dan paralelismo y mantienen el orden *dentro* de cada una); los mensajes se **conservan** un tiempo configurable aunque ya se hayan leído. Los **consumidores** se organizan en **grupos**: las particiones se reparten entre los miembros del grupo. Cada consumidor guarda su **offset** (hasta dónde ha leído) y puede retroceder para reprocesar.

Garantías de entrega: **al menos una vez** (puede haber duplicados: el consumidor debe ser idempotente o deduplicar), **como máximo una vez** (puede perder mensajes) y **exactamente una vez** (con transacciones y más coste). En la práctica: confirma el offset **después** de procesar y deduplica por identificador.

### Tiempo de evento y tiempo de proceso
Un pedido ocurre a las 10:04 (**tiempo de evento**) y llega a las 10:09 (**tiempo de proceso**). Las redes y los móviles reordenan eventos: agregar por hora de llegada da resultados equivocados. Se agrega por tiempo de evento, y para saber cuándo una ventana está completa se usa la marca de agua.

### Ventanas y marca de agua
- **Ventana fija (*tumbling*):** intervalos consecutivos sin solaparse (cada 5 minutos).
- **Ventana deslizante (*sliding*):** intervalos que se solapan (los últimos 10 minutos, actualizados cada minuto).
- **Ventana de sesión:** se agrupan eventos de una misma actividad separados por huecos de inactividad.
- **Marca de agua (*watermark*):** «no espero más eventos con tiempo anterior a T». Se calcula como *el máximo tiempo de evento visto menos un retraso permitido*. Cuando la marca de agua supera el final de una ventana, esta se **cierra** y emite su resultado.
- **Evento tardío:** llega cuando su ventana ya se cerró. Opciones: descartarlo, enviarlo a una salida lateral para corregirlo luego por lotes o reabrir la ventana (más latencia y estado).

El compromiso central: **retraso permitido grande = más exactitud, más latencia**. En el notebook, con ventanas de 5 minutos y un 3 % de eventos con 4 minutos de retraso, el porcentaje descartado baja de ~6 % (sin tolerancia) a ~1,8 % (60 s) y a ~0 % (300 s), a costa de esperar más antes de emitir.

### Herramientas
Procesamiento de flujos: Spark Structured Streaming, Apache Flink, Kafka Streams; alternativas gestionadas: Amazon Kinesis, Azure Event Hubs, Google Pub/Sub, Redpanda (compatible con Kafka). El notebook deja un esqueleto de consumidor con `confluent-kafka` (no se ejecuta: no hay broker).

---

## Glosario

- **Backfill:** reprocesar un rango de fechas pasado con el pipeline actual.
- **Bronce / plata / oro:** capas de calidad creciente de un almacén (crudo, limpio, listo para negocio).
- **DAG:** grafo acíclico dirigido de tareas con dependencias.
- **Dimensión:** tabla de contexto (producto, fecha, canal) de un esquema en estrella.
- **ELT:** cargar primero y transformar dentro del almacén.
- **Grano:** qué representa una fila de una tabla de hechos.
- **Hecho:** evento medible (una venta) con sus valores numéricos.
- **Idempotente:** que ejecutada varias veces deja el mismo resultado.
- **Lakehouse:** arquitectura que combina lago de datos (archivos) y almacén (transacciones); suele usar Delta Lake o Iceberg.
- **Offset:** posición de un consumidor en una partición de Kafka.
- **Partición:** trozo de un dataset (en carpetas o en un clúster) o de un topic de Kafka.
- **Poda de particiones:** no abrir las carpetas que no cumplen el filtro.
- **Shuffle:** reparto de datos entre máquinas para agrupar o unir por clave.
- **Tumbling window:** ventana fija sin solapamiento.
- **Watermark (marca de agua):** instante a partir del cual se considera que ya no llegarán eventos anteriores.
