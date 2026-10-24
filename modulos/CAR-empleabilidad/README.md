# Módulo CAR · Empleabilidad: portafolio, entrevistas y búsqueda

**Transversal · ~10 horas, repartidas en una sesión por bloque** · Último repaso: octubre de 2026 (las ofertas y las herramientas cambian en meses: revisa las fechas). Es el módulo que convierte lo aprendido en una candidatura. Está pensado para cursarse al final de cada itinerario (N1, N2, N3) y repetirse con proyectos nuevos.

## Qué piden las ofertas (y por qué existe este módulo)
Del análisis de 27 ofertas españolas (feb.–oct. 2026; plan v3, sección 2.1 — es una muestra, no un estudio de mercado):
- **Producción y portafolio comprobable**: TomTom, Provectus y Wallapop piden CI/CD, Docker, MLflow y cloud. Un reclutador técnico lo verifica abriendo tu repositorio.
- **Agentes de código como requisito**: Galadrim pide fluidez con *Cursor o Claude Code*; Provectus cita `CLAUDE.md`, *hooks*, *skills*, MCP y *spec-driven development*. Algunos procesos permiten un asistente en el *live coding* (Provectus) y otros no (ICF): hay que preparar **las dos situaciones**.
- **Comunicación**: ICF y Reale piden presentar a público no técnico; Galadrim incluye simulaciones comerciales; el *Forward Deployed Engineer* de HappyRobot trata con cliente.
- **Inglés B2+** y procesos con partes en inglés.
- **Salario, un dato verificado**: Galadrim publica 30–35 k€ para AI/ML Engineer junior en Madrid (oct. 2026). Es la única cifra que tenemos; el módulo explica cómo averiguar el resto sin inventarla.

## Objetivos
Al terminar este módulo podrás:
- **Leer una oferta** y separar lo imprescindible de lo deseable, y medir tu brecha.
- Publicar un **portafolio** de 3 proyectos con README de producto, CI en verde y demo.
- Escribir un **CV que pasa filtros automáticos (ATS)** sin trucos ni cifras inventadas, y un LinkedIn/GitHub coherentes.
- Reconocer los **tipos de prueba técnica** y prepararte para cada uno, incluidos el *live coding* **con** y **sin** asistente de IA.
- Resolver retos cronometrados de pandas, SQL y algoritmos, y estructurar un **diseño de sistema de ML**.
- Contestar preguntas conductuales con el método **STAR** y presentar un proyecto en **2 minutos**.
- Defender tu trabajo en **inglés técnico** (nivel B2).
- Moverte en la búsqueda y la **negociación salarial en España** con prudencia y datos verificables.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| CAR.1 | El mercado y cómo leer una oferta: requisito real frente a deseable | 15 min |
| CAR.2 | Portafolio que se comprueba: README de producto, CI y demo | 15 min |
| CAR.3 | CV para filtros automáticos (ATS), LinkedIn y GitHub | 15 min |
| CAR.4 | Tipos de prueba técnica y cómo prepararlas, con y sin asistente de IA | 20 min |
| CAR.5 | *Live coding* y diseño de sistemas de ML | 20 min |
| CAR.6 | Entrevista conductual con STAR y tu proyecto en 2 minutos | 15 min |
| CAR.7 | Inglés técnico B2 para entrevistas | 15 min |
| CAR.8 | Búsqueda activa, salarios y negociación en España | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; el PDF se genera con `scripts/generar_diapositivas.sh`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada: 5 retos de entrevista ejecutables y cronometrados |
| [`plantillas/`](plantillas/) | README de portafolio, CV para ATS, guion de 2 minutos, banco de preguntas por rol y checklist de LinkedIn/GitHub |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos recomendados |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los retos |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — en lugar de entrenar un modelo, **simulas pruebas técnicas** con datos de TiendaSur:
1. *Live coding* con pandas (clientes con más gasto en una ventana de fechas).
2. *Live coding* con SQL en SQLite (top 2 productos por categoría con funciones de ventana).
3. Algoritmos con tests `assert` y límite de coste (tabla hash y ventana deslizante).
4. Diseño de un sistema de ML de abandono de clientes, guiado en 9 apartados con una comprobación de lo que un entrevistador espera oír.
5. Análisis de una oferta: un *parser* que separa requisitos imprescindibles y deseables y calcula tu brecha.

Cada reto trae cronómetro y una comprobación que nunca falla con error (`OK` / `FALLA` / `PENDIENTE`). Se hace en **modo sin IA** y se repite en **modo con IA** con un diario de lo que pediste y corregiste. Funciona en CPU, en segundos, sin clave de API.

## Caso práctico (entregable)
Un **paquete de candidatura** para una oferta real de tu ruta (cualquier portal; no automatices el envío ni te saltes sus condiciones de uso):
1. Análisis de la oferta con el *parser* del reto 5, a mano: imprescindibles, deseables, brecha y plan de cierre.
2. README de uno de tus proyectos con [la plantilla](plantillas/README-proyecto-portafolio.md) (CI en verde).
3. CV de una página con [la plantilla ATS](plantillas/cv-ats.md), adaptado a la oferta con competencias ciertas.
4. [Guion de 2 minutos](plantillas/guion-presentacion-2min.md) **grabado en vídeo** (máx. 2:15).
5. Una historia STAR escrita y ensayada para cada una de las 5 situaciones del [banco de preguntas](plantillas/banco-preguntas-entrevista.md).
6. [Checklist de LinkedIn y GitHub](plantillas/checklist-linkedin-github.md) completada, con el enlace a ambos perfiles.

**Criterios:** análisis de la oferta y plan de brecha 15 % · README y portafolio (CI, demo, decisiones) 25 % · CV (ATS, evidencias, sin cifras inventadas) 20 % · presentación de 2 minutos 20 % · historias STAR 10 % · LinkedIn/GitHub coherentes 10 %.

> Este es el único entregable del curso que se parece al resultado final que buscas: que alguien te llame.

## Autoevaluación
1. En una oferta aparece «Docker» en la sección «Qué ofrecemos». ¿Es un requisito?
2. ¿Por qué una barra de «Python 80 %» en un CV perjudica?
3. Te dan 30 minutos de *live coding* y permiten usar un asistente. ¿Qué es lo que evalúan realmente?
4. En una pantalla técnica te piden `dos_suma` con 500 000 elementos. ¿Qué más allá de que sea correcta?
5. Te preguntan por tu pretensión salarial en la primera llamada. ¿Qué haces?

<details><summary>Respuestas</summary>

1. No. Los requisitos están en las secciones de requisitos; «Qué ofrecemos» describe el entorno (puede indicar la cultura técnica, pero no te exigen dominarlo).
2. Los ATS no leen gráficos y un porcentaje no es verificable; además, invita a la pregunta «¿qué significa 80 %?». Lo creíble es la evidencia: un repositorio con tests y CI.
3. Tu criterio: cómo descompones el problema, qué le pides, qué verificas (tests, casos límite, coste) y si puedes explicar cada línea. El texto lo puede generar cualquiera; el juicio, no.
4. El coste: una solución cuadrática falla con ese tamaño. Hay que explicar la idea (tabla hash), los casos límite (duplicados, vacío, el mismo elemento dos veces) y el coste en tiempo y memoria, y probar con una entrada grande.
5. Contestas con un rango fundamentado en datos verificables (ofertas con salario publicado, guías salariales vigentes) y pides conocer el rango de la empresa; evitas dar una cifra cerrada antes de saber el alcance y el paquete completo.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: la guía de entrevistas de *Tech Interview Handbook*, *Cracking the Coding Interview* para ideas de algoritmos (de pago; hay alternativas gratuitas en el listado) y la documentación de GitHub sobre perfiles y README.
