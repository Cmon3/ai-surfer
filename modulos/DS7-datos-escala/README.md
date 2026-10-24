# Módulo DS7 · Datos a escala

**N3-DS · ~12 horas (3 semanas a ritmo de curso)** · El módulo que conecta «sé analizar datos» con «sé mover y preparar datos de forma fiable». Las ofertas de *ML Engineer*, *MLOps* y *Data Scientist* senior (por ejemplo, la de Wallapop que analizamos en el plan v3) piden **Spark, Kafka, Airflow y dbt**; aquí aprendes la idea de cada pieza con práctica ejecutable en tu portátil, sin clústeres ni cuentas de pago.

## Qué piden las ofertas (oct. 2026)
| Herramienta | Qué suele pedir la oferta | Qué practicas aquí |
|---|---|---|
| SQL analítico, **DuckDB**, **Polars** | «Experiencia con grandes volúmenes de datos» | Benchmark real sobre 4 millones de filas |
| **Parquet**, almacenes de datos | «Data lake / data warehouse» | Particionado, poda, capas bronce/plata/oro, estrella |
| **dbt** | «Transformaciones y tests de datos» | Proyecto dbt-duckdb que se ejecuta de verdad |
| **Spark** / Databricks | «PySpark», «Databricks» | Equivalencias de API, qué hace por dentro y cómo practicar gratis |
| **Airflow** (orquestación) | «Pipelines orquestados» | DAG con reintentos e idempotencia + DAG de Airflow de ejemplo |
| **Kafka** (streaming) | «Tiempo real» | Consumidor con ventanas y marca de agua + esqueleto Kafka |

## Objetivos
Al terminar este módulo podrás:
- Decidir cuándo **pandas deja de bastar** y elegir entre pandas, **Polars** y **DuckDB** midiendo (con un benchmark honesto: mismo resultado, varias repeticiones).
- Explicar por qué los formatos **columnares** (Parquet) y el **particionado** aceleran las consultas, y elegir compresión.
- Diseñar un almacén con capas **bronce → plata → oro** y un **esquema en estrella** (hechos y dimensiones, grano).
- Escribir un proyecto **dbt** con modelos SQL, dependencias (`ref`) y **tests de datos**.
- Traducir código pandas a **PySpark** y entender particiones, *shuffle* y evaluación perezosa; saber dónde practicar Spark gratis.
- Diseñar un pipeline como un **DAG** idempotente, con reintentos y *backfill*, y leer un DAG de **Airflow**.
- Explicar Kafka (topics, particiones, offsets, grupos) y programar un consumidor con **ventanas**, **marca de agua** y deduplicación.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 7.1 | Cuándo pandas deja de bastar | 10 min |
| 7.2 | DuckDB y Polars: motores analíticos modernos (y un benchmark honesto) | 20 min |
| 7.3 | Parquet, formatos columnares y particionado | 15 min |
| 7.4 | Modelado de almacén: estrella y capas bronce/plata/oro | 20 min |
| 7.5 | dbt: SQL con estructura y tests de datos | 20 min |
| 7.6 | Spark: DataFrames distribuidos y dónde practicar | 20 min |
| 7.7 | Orquestación: DAGs, Airflow e idempotencia | 15 min |
| 7.8 | Streaming: Kafka y ventanas | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección, para estudiar y repasar |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; el PDF se genera con `scripts/generar_diapositivas.sh`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con 5 ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Documentación y cursos gratuitos por lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — el caso **TiendaSur: pipeline de pedidos diarios**. Genera 4 millones de líneas de pedido, las guarda en Parquet particionado, compara pandas, Polars y DuckDB, monta un almacén por capas en DuckDB con un extracto sucio (duplicados, nulos, canales mal escritos), lo repite con un proyecto **dbt** (3 modelos y 9 tests) y lo orquesta con un mini-DAG con reintentos. Cierra con un consumidor de streaming con ventanas. Todo se ejecuta en CPU en menos de 1 minuto y escribe en `proyecto-datos-escala/`.

**Requisitos:** `duckdb`, `polars`, `pyarrow` y `dbt-duckdb` (además de las del curso). Spark y Kafka **no** son necesarios: el notebook detecta si PySpark y Java están y, si no, sigue con una simulación y el esqueleto para Colab o Databricks.

> Nota de versiones: el módulo se ha probado con pandas 3.1, DuckDB 2.0, Polars 2.0 y dbt-core 1.12 con dbt-duckdb 1.11. dbt, Airflow y Databricks cambian rápido: comprueba la documentación vigente antes de copiar sintaxis a un proyecto real.

## Caso práctico (entregable)
Publica en **GitHub** un repositorio **«pipeline de datos de TiendaSur»** (o con un conjunto de datos público que prefieras: por ejemplo, viajes en taxi de Nueva York o datos abiertos de transporte) con:
1. Un generador o un extracto de datos de al menos **1 millón de filas**, guardado en Parquet particionado.
2. Un **almacén por capas** (bronce/plata/oro) con un hecho y al menos dos dimensiones, y un script que procesa **un día** de forma **idempotente**.
3. Un proyecto **dbt** con al menos 3 modelos y 5 tests (uno singular).
4. Un **benchmark** de una misma consulta en pandas, Polars y DuckDB con resultado comprobado y una conclusión escrita.
5. Un **DAG** (mini-DAG en Python o archivo de Airflow) con reintentos y un comando de *backfill*.
6. README con diagrama de la arquitectura, cómo ejecutarlo, decisiones (qué grano, por qué esas capas) y limitaciones.

**Criterios:** funciona y es reproducible 30 % · calidad del modelado y de los tests de datos 25 % · idempotencia y manejo de errores 20 % · benchmark honesto y conclusiones 15 % · README y diagrama 10 %.

> Es la pieza de portafolio de quien aspira a *ML Engineer* o *Data Engineer*: un repositorio donde se ve que sabes mover datos, no solo modelarlos.

## Autoevaluación
1. Un benchmark muestra que Polars es 6 veces más rápido que pandas. ¿Qué dos comprobaciones debes hacer antes de fiarte?
2. ¿Por qué una consulta que usa 2 de 12 columnas lee mucho menos de un Parquet que de un CSV?
3. ¿Qué significa que una tarea de un pipeline sea **idempotente** y qué ocurre si no lo es?
4. En un esquema en estrella, ¿qué es el **grano** de la tabla de hechos y por qué hay que fijarlo primero?
5. Un evento de Kafka llega 4 minutos tarde y su ventana de 5 minutos ya se emitió. ¿Qué opciones tienes?

<details><summary>Respuestas</summary>

1. Que los dos motores devuelven **exactamente el mismo resultado** y que se miden varias repeticiones con las mismas condiciones (mismo origen de datos, caché caliente o fría igual para todos). Un benchmark que no comprueba el resultado puede estar comparando consultas distintas.
2. Parquet guarda cada columna por separado, así que solo se leen y descomprimen las columnas pedidas (*projection pushdown*); CSV obliga a leer y analizar todo el texto de todas las filas.
3. Que ejecutarla varias veces con la misma entrada deja el mismo resultado (por ejemplo, «borra el día e inserta el día»). Si no lo es, un reintento o un reproceso duplica o corrompe datos, y el *backfill* se vuelve peligroso.
4. Es lo que representa **una fila** del hecho (por ejemplo, «un producto en un canal en un día»). Fijarlo primero evita mezclar niveles de detalle y sumar dos veces.
5. Descartarlo (y contarlo), enviarlo a una salida lateral de «tardíos» para corregirlo después con un reproceso por lotes, o ampliar el retraso permitido de la marca de agua (a costa de latencia).
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: la documentación de DuckDB, *Data Engineering Zoomcamp* (DataTalks.Club) y el curso *dbt Fundamentals* de dbt Labs (gratuito; comprueba su disponibilidad).
