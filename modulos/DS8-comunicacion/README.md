# Módulo DS8 · Comunicación y producto de datos

**N3-DS · ~10 horas (2 semanas a ritmo de curso)** · Lo que separa a quien «saca números» de quien **cambia decisiones**. En las ofertas aparece con frases como «presentar resultados a público no técnico» (Reale), «comunicar hallazgos de forma clara» (ICF) o «trabajar con negocio»: es una de las competencias más pedidas y menos enseñadas.

## Qué piden las ofertas (oct. 2026)
| Lo que dice la oferta | Qué practicas aquí |
|---|---|
| «Definir y seguir KPI», «medir el impacto» | Métrica norte, árbol de métricas y guardarraíles |
| «Visualización de datos», «dashboards» (Power BI, Tableau…) | Principios de diseño y un dashboard con Plotly |
| «Comunicar con perfiles no técnicos» | Pirámide de Minto, memo de una página, frecuencias naturales |
| «Presentar resultados a dirección» | Storytelling y guion de una presentación de 10 minutos |
| «Evaluar herramientas / proveedores» | *Make or buy* con matriz ponderada y coste a 3 años |

## Objetivos
Al terminar este módulo podrás:
- Diseñar una **métrica norte** y un **árbol de métricas**, y descomponer cuánto aporta cada rama a un cambio.
- Definir **guardarraíles** y aplicar una regla de decisión: lanzar solo si mejora la principal **y** no se rompe ninguna protección.
- Detectar y evitar gráficos que engañan (eje truncado, eje doble, ventana escogida) y medirlo con el **factor de mentira**.
- Convertir un análisis en una **historia**: gráfico con título-conclusión, un solo énfasis y una acción propuesta.
- Construir un **dashboard** sencillo y defender qué lleva y qué no.
- Escribir un **memo de una página** con la pirámide de Minto y revisarlo con criterios medibles.
- **Traducir** un resultado técnico (intervalos, p-valores) a frecuencias naturales y presentarlo a un público no técnico.
- Decidir **construir o comprar** con una matriz de criterios y un análisis de sensibilidad.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 8.1 | Diseño de métricas: métrica norte y árbol de métricas | 15 min |
| 8.2 | Guardarraíles y métricas trampa (ley de Goodhart) | 10 min |
| 8.3 | Storytelling con datos | 15 min |
| 8.4 | Gráficos que convencen (y los que engañan) | 20 min |
| 8.5 | Dashboards: principios y un ejemplo | 15 min |
| 8.6 | Escribir para ejecutivos: pirámide y memo de una página | 15 min |
| 8.7 | Presentar a un público no técnico | 15 min |
| 8.8 | *Make or buy*: construir o comprar | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección, plantillas y listas de comprobación |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; el PDF se genera con `scripts/generar_diapositivas.sh`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con 5 ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Libros, guías y cursos gratuitos por lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — un año de pedidos de **TiendaSur**. Calculas métricas mensuales, descompones la variación de los ingresos netos entre sus factores, evalúas un experimento («envío gratis») con guardarraíles, dibujas gráficos engañosos y sus versiones honestas, construyes un dashboard HTML con Plotly, redactas un memo con la pirámide de Minto (revisado automáticamente), traduces un resultado de A/B a lenguaje de negocio y comparas construir frente a comprar. Todo se ejecuta en CPU en segundos y escribe en `proyecto-comunicacion/`.

**Requisitos:** `matplotlib` y `plotly` (además de las del curso).

## Caso práctico (entregable)
**Informe-producto** sobre un conjunto de datos propio (puede salir de un módulo anterior, del proyecto N2 o de datos abiertos), dirigido a una persona concreta que debe tomar una decisión. Incluye:
1. **Memo de una página** (máx. 350 palabras) con la pirámide de Minto: recomendación, tres razones con números, riesgos y decisión que se pide.
2. **Árbol de métricas** con la métrica norte, al menos 3 ramas y 2 guardarraíles con umbral.
3. **Tres gráficos** de comunicación (título-conclusión, un énfasis, sin leyenda innecesaria) y, como contraste, **uno que engañe** con su factor de mentira medido y la versión corregida.
4. **Dashboard** de un archivo HTML (Plotly) o capturas de Power BI/Tableau/Looker Studio, con la pregunta a la que responde y quién lo usa.
5. **Guion de 10 minutos** para un público no técnico, con una sola decisión al final y el resultado traducido a frecuencias naturales.

**Criterios:** el memo permite decidir leyendo solo el primer párrafo 30 % · gráficos honestos y claros 25 % · métricas y guardarraíles bien definidos 20 % · lenguaje sin jerga y números concretos 15 % · dashboard útil y sencillo 10 %.

> Pieza de portafolio: un informe de una página que un director entiende en dos minutos vale más en una entrevista que diez notebooks. Y es justo lo que se evalúa en los casos «para casa» de muchas pruebas técnicas.

## Autoevaluación
1. ¿Por qué una métrica norte necesita guardarraíles?
2. Un gráfico de barras con el eje y empezando en 95 muestra una subida del 1 % como si fuera enorme. ¿Qué mide el factor de mentira y qué valor debería tener un gráfico honesto?
3. ¿Qué es la pirámide de Minto y por qué empieza por la conclusión?
4. Tu A/B da «diferencia 0,007, IC95 [0,002; 0,012]». ¿Cómo se lo cuentas a un director sin usar la palabra «intervalo»?
5. ¿Cuándo tiene sentido construir una herramienta propia en lugar de comprarla?

<details><summary>Respuestas</summary>

1. Porque cualquier métrica que se optimiza sola acaba haciendo daño (ley de Goodhart): se puede subir el ingreso regalando margen o aumentando devoluciones. Los guardarraíles son métricas que no deben empeorar mientras se persigue la principal.
2. Compara el cambio **visual** (de altura de las barras) con el cambio **real** en los datos. Un gráfico honesto vale 1 (entre 0,95 y 1,05 se considera aceptable).
3. Es una estructura de comunicación: primero la conclusión o recomendación, después los argumentos que la apoyan y, por último, los detalles. El directivo con poco tiempo debe poder decidir leyendo solo el principio.
4. «De cada 1.000 visitantes, 47 compran con la versión nueva y 40 con la actual; la diferencia real está entre 2 y 12 compras más por cada 1.000. La mejora es real con bastante seguridad, aunque pequeña.»
5. Cuando la necesidad es muy específica y es una ventaja competitiva, cuando el coste de licencia crece con los usuarios más rápido que el de mantener algo propio, o cuando hay requisitos de control de datos que el proveedor no cumple. Siempre con el coste de mantenimiento a la vista (equipo, soporte, seguridad).
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: *Fundamentals of Data Visualization* (Claus Wilke, gratuito en línea), *Calling Bullshit* (curso abierto de la Universidad de Washington) y los recursos de *Storytelling with Data*.
