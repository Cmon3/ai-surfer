# Módulo CAR · Empleabilidad — Apuntes

> Objetivo: que cada cosa que has aprendido en el curso sea **visible, verificable y fácil de explicar** para quien tiene que decidir en pocos minutos si te llama. Todo lo que sigue se basa en las ofertas reales analizadas en el plan v3 (sección 2.1). Es una muestra de 27 ofertas, no un estudio de mercado: sirve para orientar, no para dar porcentajes.

---

## CAR.1 · El mercado y cómo leer una oferta

### Lo que piden las ofertas (evidencia)
| Oferta | Qué pesa | Qué módulos lo preparan |
|---|---|---|
| TomTom · AI Engineer (Madrid) | RAG, agentes, evaluación automatizada y guardarraíles, CI/CD para ML, Docker/Kubernetes, MLflow | AI3, AI4, I8, CL1 |
| Galadrim · AI/ML Engineer junior (Madrid, 30–35 k€) | 0 años de experiencia; Cursor o Claude Code con fluidez; React/TS y Node; APIs de LLM; visión; explicar a clientes | F5 (5.7), I7, FS1, CAR |
| Provectus · Junior AI/ML Engineer (remoto) | RAG en producción, AWS (Bedrock), CI/CD, evaluación de sistemas no deterministas, `CLAUDE.md`, MCP, *spec-driven development* | AI3, AI4, AI10, CL1, I8 |
| HappyRobot · Forward Deployed Engineer | Full-stack TS/React + Python, prompting, voz, integraciones, trato con cliente | FS1, AI9, CAR |
| Kabilio · AI Engineer (Barcelona) | LLM + RAG, agentes, elegir entre ML clásico e IA generativa | AI2, AI3, I3 |
| Wallapop · MLOps Engineer (Barcelona) | Plataforma ML, SageMaker, Kubernetes, Kafka, búsqueda semántica, MLflow, Airflow/dbt | I8, CL1, DS7 |
| Reale · Data Scientist (Madrid) | ML/DL + LLM, ingeniería de software, Azure, IA responsable, presentar a no técnicos | I1–I3, AI8, DS8 |
| ICF · Associate Data Scientist (Madrid) | Python, estadística, *baselines*, código reproducible, Git, LLM contrastado con la fuente | F1–F4, I2, I3 |

Lo que se repite: **producción**, **evaluación**, **agentes y MCP**, **agentes de código**, **cloud**, **comunicación con negocio**, **inglés**. Tu portafolio debe cubrir tres de ellos con evidencia.

### Imprescindible frente a deseable: cómo leer una oferta
Una oferta es un texto de marketing escrito por varias personas (el equipo técnico, recursos humanos, el jefe de proyecto). Mezcla lo que **necesitan** con lo que **soñarían**. Cómo separarlo:

1. **Por la sección.** «Requisitos», «Qué buscamos», «Must have», «Qué aportarás» → imprescindibles. «Se valorará», «Deseable», «Plus», «Nice to have» → deseables. «Funciones», «Sobre el puesto», «Qué ofrecemos» → contexto: no son requisitos aunque salgan herramientas.
2. **Por el lenguaje.** «Sólido», «experiencia demostrable», «imprescindible» pesan más que «conocimientos de», «familiaridad» o «valorable». Las marcas «(valorable)» o «(plus)» dentro de los requisitos las convierten en deseables.
3. **Por los años.** «3+ años» en una oferta junior es un deseo, no un filtro duro; la de Galadrim pide 0 años. Los años suelen ser lo más negociable. Postúlate si cubres la mayor parte de lo imprescindible y puedes demostrarlo.
4. **Por la repetición.** Lo que aparece en funciones, requisitos y valores es el núcleo del puesto.
5. **Por el rol real.** «AI Engineer» puede ser ingeniería de aplicaciones de LLM, MLOps o ciencia de datos con otro nombre. Lee las funciones, no el título.

Regla práctica de candidatura: **cobertura ≥ 60–70 % de los imprescindibles con evidencia** → presenta candidatura; menos → decide si te falta una competencia que puedes cerrar con un proyecto en 2–4 semanas. El reto 5 del notebook automatiza el análisis; en la práctica, hazlo a mano con un subrayador.

### Señales de alarma en una oferta
Lista interminable de herramientas sin prioridad (se busca «un equipo en una persona»), ausencia de salario y de funciones concretas, «ambiente joven y dinámico» como único argumento, o años de experiencia imposibles (por ejemplo, 5 años de una tecnología que existe desde hace 2). No es motivo para descartar, sí para preguntar en la entrevista.

---

## CAR.2 · Portafolio que se comprueba

**Principio:** un reclutador técnico dedica menos de dos minutos a tu repositorio. Cada línea del CV debe poder comprobarse abriendo uno.

**Tres proyectos, tres competencias distintas** (según tu ruta, plan v3 sección 4):
| Ruta | Piezas mínimas |
|---|---|
| Data Scientist | Análisis con decisión de negocio · modelo desplegado (I8) · experimento A/B o estudio causal |
| ML Engineer / MLOps | Repositorio I8 desplegado en la nube con monitorización · pipeline orquestado |
| AI Engineer | RAG evaluado · agente con servidor MCP propio y evals en CI · capstone |
| Forward Deployed Engineer | Demo full-stack para un «cliente» con *discovery* documentado |

**Qué hace bueno un repositorio**
- **README de producto** (plantilla en `plantillas/`): problema, resultado frente a una línea base, ejecución en 3 comandos, decisiones y limitaciones.
- **CI en verde** con insignia: lint → tests → entrenamiento/imagen (se aprende en I8). Es la prueba más barata de que funciona.
- **Demo**: GIF, vídeo corto o enlace. Si despliegas gratis, que no se caiga.
- **Decisiones y descartes**: «probé X y lo descarté porque Y» se valora más que una lista de librerías.
- **Limpieza**: sin secretos, sin datos personales, sin `df2`. Un `.gitignore` y una estructura que se entienda.
- **Honestidad**: si el 80 % lo escribió un asistente, dilo y explica qué revisaste y decidiste tú (F5 5.7). Mentir aquí cuesta la entrevista, porque te lo preguntarán.

**Errores frecuentes:** 15 repositorios de tutoriales (mejor 3 propios), notebooks sin ejecutar, métricas sin línea base, README en blanco, proyecto Titanic/Iris como pieza principal (todo el mundo lo tiene), datos que no se pueden obtener.

---

## CAR.3 · CV para filtros automáticos (ATS), LinkedIn y GitHub

**Qué es un ATS.** El software donde la empresa recibe candidaturas: convierte tu CV en texto, extrae campos y lo compara con la oferta. Después lo lee una persona. Dos errores opuestos: escribir para el robot (listas de palabras clave sin evidencia) y diseñar para la vista (columnas, iconos, gráficos) que el robot no entiende.

**Reglas**
1. Una columna, texto real (PDF con texto seleccionable o `.docx`), fuente estándar, sin tablas, sin iconos, sin barras de nivel, sin cabeceras y pies con datos.
2. Títulos convencionales y fechas claras; orden cronológico inverso.
3. **Palabras clave de la oferta**, tal como están escritas, **solo si son ciertas** y tienen evidencia en un proyecto o experiencia.
4. Viñetas con verbo + qué + cómo + resultado. Una cifra solo si es real y puedes explicar de dónde sale; si no, describe el alcance.
5. Una página para perfiles junior; una versión por rol.
6. Comprueba con la prueba de copiar y pegar: si el texto sale desordenado, un ATS lo leerá igual de mal.

**LinkedIn y GitHub.** Son tu CV vivo: mismo nombre, mismos datos, misma historia. Titular con rol y evidencias, 3–4 repositorios fijados, perfil README breve. Checklist completa en `plantillas/checklist-linkedin-github.md`. Respeta las condiciones de uso de cada plataforma: la candidatura masiva automatizada suele estar prohibida y, además, no funciona.

---

## CAR.4 · Tipos de prueba técnica y cómo prepararlas

| Prueba | Qué evalúa | Cómo prepararla |
|---|---|---|
| **Cuestionario con tiempo** (SQL, estadística, Python) | Fundamentos rápidos | Cuestionarios del curso con cronómetro; repasar errores |
| ***Live coding*** | Cómo piensas y comunicas bajo presión | Retos del notebook, en voz alta |
| **Caso para casa** (24–72 h) | Criterio, comunicación, honestidad con los límites | Entrega con README y decisiones; no te pases del tiempo pedido |
| **Diseño de sistemas de ML / LLM** | Pensar de negocio a producción | Plantilla de 9 apartados (reto 4) |
| **Entrevista conductual** | Colaboración, aprendizaje, comunicación | Historias STAR (CAR.6) |
| **Simulación comercial / con cliente** | Explicar y escuchar (Galadrim, FDE) | Roleplay con otra persona |
| **Charla de proyecto** | Que entiendes lo tuyo | Guion de 2 minutos y repaso del repositorio |

### Procesos que permiten asistente de IA en el *live coding* (como Provectus)
Que lo permitan no significa que sea más fácil: cambian los criterios.
- **Qué evalúan:** que **descompones** el problema, que **especificas** (un buen *prompt* es una especificación con criterios de aceptación), que **verificas** (tests, casos límite, coste) y que **entiendes** cada línea.
- **Cómo trabajar:** (1) di en voz alta el plan y los casos límite *antes* de pedir nada; (2) escribe o pide primero los tests (F5 5.7); (3) pide cambios pequeños; (4) lee el diff y explícalo; (5) ejecuta con una entrada grande y una vacía; (6) cuenta qué has corregido al asistente. Mostrar un fallo del asistente que has detectado puntúa a tu favor.
- **Errores:** pegar el enunciado y aceptar el resultado; no poder explicar un detalle; no ejecutar nada; tardar tanto en conversar que no te da tiempo a verificar.
- **Antes:** pregunta qué herramientas se permiten y si puedes compartir pantalla con tu entorno habitual.

### Procesos que lo prohíben (como el de ICF, según el plan v3)
- **Qué evalúan:** fluidez con la sintaxis, bibliotecas básicas y razonamiento sin ayuda.
- **Cómo prepararte:** sesiones **sin asistente** con cronómetro en un entorno sencillo (editor + terminal, documentación oficial abierta si te la permiten); practica a escribir pandas/SQL de memoria (`groupby`, `merge`, ventanas, `CASE WHEN`); lleva un listado de tus errores típicos.
- **En la prueba:** aclara el enunciado con preguntas, explica antes de teclear, empieza por el caso simple, prueba con un ejemplo a mano y, si te bloqueas, di qué probarías. **Hablar en voz alta** vale más que el silencio. Nunca uses un asistente a escondidas: se detecta y es descalificante.

> **Prepárate para las dos.** Alterna semanas. Si solo practicas con asistente, te falla la fluidez; si solo practicas sin él, no sabes trabajar como se trabaja hoy.

---

## CAR.5 · *Live coding* y diseño de sistemas de ML

### *Live coding* en 5 pasos
1. **Reformula** el enunciado y pregunta por entradas, vacío, duplicados, tamaño.
2. **Ejemplo a mano** pequeño que sirva luego de test.
3. **Idea y coste** antes de escribir: «recorro una vez, guardo lo visto en un diccionario: O(n)».
4. **Escribe** claro (nombres que dicen algo, una función, sin trucos).
5. **Prueba**: el ejemplo, el vacío, un caso límite y una entrada grande. Si falla, razona, no «pruebes cosas».

En el notebook: pandas (ventana de fechas, desempates deterministas), SQL (agregar → numerar → filtrar; `ROW_NUMBER`), tabla hash y ventana deslizante. Un tipo de error recurrente en pandas: `groupby` que cambia el índice, fechas como texto, ordenar sin criterio de desempate. En SQL: `HAVING` frente a `WHERE`, `JOIN` que duplica filas, filtrar por una función de ventana en el mismo nivel donde se calcula (hay que usar una CTE).

### Diseño de sistemas de ML: guion de 9 apartados
Responde en este orden y deja claro qué supones:
1. **Objetivo de negocio:** qué decisión cambia y quién la toma. *Si no hay una acción posible, no hay proyecto.*
2. **Métrica de negocio** (€, clientes) y cómo se mide (A/B o grupo de control).
3. **Métrica técnica** acorde al desbalanceo y al coste de cada error.
4. **Datos y etiqueta:** definición exacta con ventana temporal («no compra en los 90 días siguientes»).
5. **Línea base:** una regla o un modelo sencillo.
6. **Validación sin fugas:** partición por tiempo; variables calculadas solo con datos anteriores al corte.
7. **Despliegue:** lote o tiempo real, y quién consume la predicción.
8. **Monitorización:** salud, deriva (PSI), métrica real cuando llegan etiquetas, reentrenamiento.
9. **Riesgos:** falsos positivos con coste, sesgos, privacidad (RGPD), dependencia de terceros.

**Para sistemas con LLM** añade: evaluación (conjunto propio, juez calibrado), guardarraíles, coste/latencia por tarea, observabilidad, qué se hace cuando el modelo no sabe (derivar a un humano) y seguridad (inyección de instrucciones, mínimo privilegio). Ofertas como TomTom y Provectus lo piden de forma explícita.

---

## CAR.6 · Entrevista conductual con STAR y tu proyecto en 2 minutos

**STAR:** Situación, Tarea, Acción, Resultado (detalle en `plantillas/banco-preguntas-entrevista.md`). El 60 % de la respuesta es la **Acción**, en primera persona. Cierra con lo que aprendiste.

**Cinco historias preparadas** sirven para casi todo: error y corrección, desacuerdo, aprendizaje rápido, explicar algo técnico a no técnicos, proyecto orgulloso. Sin experiencia laboral valen proyectos, estudios o voluntariado; lo que cuenta es la reflexión.

**Presentar un proyecto en 2 minutos** (plantilla en `plantillas/guion-presentacion-2min.md`): gancho → decisión y métrica → mi decisión técnica clave con su porqué → resultado frente a línea base y una limitación → cierre. Grábate, escúchate y recorta. En ferias o *networking*, versión de 30 segundos.

**Cuando no sabes algo:** «No lo he usado; lo más parecido que he hecho es X; lo abordaría así». Inventar es lo peor; decir «no lo sé» con una vía de razonamiento es aceptable.

**Preguntas que haces tú:** cómo se mide un buen primer año, cómo se despliega y revisa, cómo se usan los asistentes de código, qué mentoría hay para juniors. Muestran criterio.

---

## CAR.7 · Inglés técnico B2 para entrevistas

Las ofertas piden inglés B2+ y algunos procesos tienen fases en inglés. B2 no es perfección: es **explicar tu trabajo con claridad y mantener una conversación técnica con naturalidad**.

**Qué practicar**
- **Leer ofertas y documentación** en inglés: *requirements, nice to have, you'll own, stakeholders, ramp-up, on-call.*
- **Presentar el proyecto en 2 minutos** (guion en inglés en la plantilla).
- **Pedir aclaraciones**: *«Could you clarify whether…?»*, *«Just to make sure I understand, you want…?»*, *«Can I think out loud for a moment?»*.
- **Pensar en voz alta**: *«My first idea is to…, the trade-off is…, the complexity would be O(n)»*.
- **Aceptar un error**: *«Good catch, that fails when the list is empty. Let me fix it.»*

**Vocabulario mínimo (ML/producción)**
| Español | Inglés |
|---|---|
| fuga de datos | *data leakage* |
| sobreajuste | *overfitting* |
| línea base | *baseline* |
| conjunto de validación/prueba | *validation / test set* |
| deriva de datos | *data drift* |
| despliegue | *deployment* |
| integración continua | *continuous integration (CI)* |
| recuperación aumentada (RAG) | *retrieval-augmented generation* |
| alucinación | *hallucination* |
| latencia / coste | *latency / cost* |
| revisión de código | *code review* |
| capturar requisitos | *requirements gathering* |
| quedar bloqueado | *to be blocked* |

**Plan de cuatro semanas:** (1) leer una documentación técnica al día en inglés y anotar 5 expresiones; (2) grabar el guion de 2 minutos y repetirlo hasta que fluya; (3) contestar por escrito en inglés 3 preguntas del banco y corregirlas con un asistente (aprendes del error); (4) un simulacro con una persona. Usa el inglés en tu portafolio: un README bilingüe es práctica y evidencia.

---

## CAR.8 · Búsqueda activa, salarios y negociación en España

### Búsqueda
- **Canal por canal:** portales de empleo, LinkedIn, páginas de empleo de empresas, comunidades, eventos y *demo days*. Las candidaturas en frío con un mensaje personalizado funcionan mejor que mil envíos iguales.
- **Ritmo:** pocas candidaturas buenas (con CV adaptado y mensaje) mejor que muchas genéricas. Lleva un registro (empresa, fecha, oferta, estado, aprendizaje).
- **Referencias y red:** una persona que te conozca y diga «mira su repositorio» pesa más que un CV. Participa en comunidades, comenta, comparte lo que aprendes.
- **Plataformas:** respeta sus condiciones; no automatices candidaturas ni mensajes.

### Salarios: lo que sabemos y lo que no
- **Dato verificado:** Galadrim publica **30–35 k€** para AI/ML Engineer junior en Madrid (oct. 2026). Compruébalo en la oferta, porque caduca y conviene confirmar si es bruto anual (lo habitual en las ofertas españolas).
- **Lo demás, sin cifras inventadas.** Para tu rol y ciudad, construye tu rango con **fuentes comprobables**: (1) ofertas que publican salario (es la mejor evidencia y cada vez hay más); (2) guías salariales anuales de consultoras de selección: comprueba la edición vigente y qué muestra cubren; (3) personas de tu red, preguntando rangos y no cifras exactas; (4) el convenio colectivo aplicable, que fija mínimos por categoría (búscalo en el BOE y comprueba el vigente).
- **Transparencia retributiva:** la directiva europea sobre transparencia retributiva (UE 2023/970) obliga a los Estados a incorporarla; comprueba su estado de transposición y qué implica para ofertas y entrevistas en España.
- **Varía mucho** según empresa (startup, consultora, multinacional), ciudad, modalidad y seniority. Un promedio sin contexto engaña.

### Negociación (con prudencia)
1. **Conoce el paquete completo**: salario bruto anual, número de pagas (12 o 14), variable, retribución flexible, seguro, teletrabajo, formación, vacaciones, **tipo de contrato y periodo de prueba** (los máximos están en el Estatuto de los Trabajadores y el convenio: compruébalos).
2. **Evita dar la primera cifra** si puedes: «¿Cuál es el rango del puesto?». Si insisten, da un **rango** fundamentado en tus fuentes, con tu límite inferior aceptable en la parte baja del rango.
3. **Negocia con evidencia**: tu portafolio, tu cobertura de los imprescindibles, otras conversaciones en curso (solo si son ciertas). Pide por escrito la oferta final.
4. **En junior, lo negociable suele ser más que el sueldo**: formación pagada, mentoría, revisión salarial a los 6–12 meses, teletrabajo, equipo de trabajo.
5. **Tono**: colaborativo («quiero que esto funcione para los dos») y sin ultimátums. Un «no» hoy puede ser un «sí» en seis meses.
6. **Antes de firmar**: lee el contrato (funciones, pactos de exclusividad o no competencia, propiedad intelectual de tus proyectos personales) y consulta a alguien de confianza o a un sindicato/asesor si hay dudas.

---

## Glosario
- **ATS (*applicant tracking system*):** software de gestión de candidaturas.
- **Bruto anual:** salario de todo el año antes de impuestos y cotizaciones; aclara si se reparte en 12 o 14 pagas.
- **Discovery:** fase de descubrimiento del problema del cliente.
- **FDE (*Forward Deployed Engineer*):** ingeniero que trabaja de cara al cliente integrando y adaptando soluciones.
- **Live coding:** prueba de programación en directo.
- **Línea base (*baseline*):** punto de comparación sencillo para saber si el modelo aporta.
- **STAR:** método de respuesta conductual: Situación, Tarea, Acción, Resultado.
- **Spec-driven development:** programar a partir de una especificación y criterios de aceptación, con asistente o sin él.
