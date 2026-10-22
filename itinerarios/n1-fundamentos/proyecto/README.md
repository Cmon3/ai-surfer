# Proyecto N1 · Análisis exploratorio completo (TiendaSur)

**Entregable del bloque N1 · Fundamentos.** Aplica todo lo aprendido (Python + SQL + estadística + herramientas) sobre un conjunto de datos público o sintético.

## Objetivo
Analizar un dataset y responder **3 preguntas de negocio** con un informe que otra persona (no técnica) entienda. El proyecto se entrega como un **repo Git con README**, no como un notebook suelto.

## Dataset
Sugeridos (gratis y abiertos):
- [NYC Yellow Taxi trips](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) (muestra el patrón demanda/rendimiento por franja horaria)
- [Open Food Facts](https://world.openfoodfacts.org/data) (nutrición y etiquetado)
- Un dataset propio de tu trabajo/estudios, anonimizado.

También vale el dataset sintético de *TiendaSur* de los módulos (F1/F2), si prefieres no descargar datos.

## Requisitos del repo

| Requisito | Detalle |
|---|---|
| README | qué analiza el proyecto, cómo ejecutarlo, requisitos y conclusiones resumidas |
| requirements.txt | generado con `pip freeze` en un venv propio |
| Datos | o bien el script que los genera, o instrucciones de descarga (no grandes binarios en el repo) |
| Notebook | `notebook.ipynb` con **Restart & Run All limpio** y outputs borrados antes de commit |
| SQL | al menos **2 consultas** en el análisis (puede ser con `sqlite3`/`pandas.read_sql` con los datos cargados en una BD temporal) |
| Estadística | al menos **1 intervalo de confianza** (fórmula o bootstrap) de una métrica de negocio |
| Gráficos | ≥ 2, con títulos, ejes etiquetados y leyenda |
| Git | ≥ 5 commits con mensajes descriptivos; historial en una rama + merge, si quieres practicar el flujo completo |

## Preguntas de negocio (elige del dataset)

1. **Tendencia:** ¿la métrica clave sube, baja o es estable? (mes/mes o año/año)
2. **Segmentación:** ¿qué grupo del dataset se diferencia más? (categoría, ciudad, franja…)
3. **Fiabilidad:** ¿cuánta confianza damos a la cifra estrella? (IC y tamaño de muestra)

## Formato del informe

El README final (o `informe.md`) con estructura de **una página**:

1. **Pregunta de negocio** en una frase.
2. **Datos**: fuente, tamaño, periodo, limpieza aplicada.
3. **Resultados**: las 3 respuestas, cada una con tabla/gráfico y **una frase de conclusión**.
4. **Limitaciones** honestas (sesgo de los datos, tamaño muestral, causalidad).
5. **Próximo paso** sugerido (qué preguntaría con qué datos).

Plantilla de referencia: [`plantilla-informe.md`](plantilla-informe.md). Rúbrica de evaluación: [`rubrica.md`](rubrica.md).

## Cómo se entrega

1. Repo en GitHub con el enlace compartido.
2. PR propio desde una rama `analisis-final` para que el historial quede en el PR.
3. Presentación de 5 minutos en la sesión en vivo (opcional pero recomendado).

## Antes de empezar

Recursos: módulos F1 (Python), F2 (SQL), F3 (estadística), F4 (matemáticas), F5 (herramientas). Si algo falla, revisa el README de ese módulo antes de preguntar.
