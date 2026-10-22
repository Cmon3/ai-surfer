# Análisis de plataformas educativas: DataCamp, Codecademy y Platzi

Estudio de producto (benchmark) de tres plataformas de referencia para diseñar la web de la escuela. Se analizan **patrones de producto públicos** —estructura de páginas, flujos, modelo de negocio—, no código ni diseño visual (ver `docs/plan-v2-itinerarios-y-plataforma.md`, sección 5: copiar patrones es legítimo; copiar implementación, marca o contenido no).

- **Fecha:** octubre de 2026.
- **Método:** análisis de páginas públicas (home, catálogo, pricing, FAQ, onboarding). El interior de las lecciones está tras login y no se analiza en esta pasada.
- **Fuentes:** datacamp.com, codecademy.com, platzi.com (y sus páginas de precios y ayuda).

---

## 1. DataCamp (referente en data/IA, modelo B2C+B2B)

### Página de inicio (~15 secciones, de arriba a abajo)
1. **Hero:** propuesta de valor corta ("Learn data and AI skills") + CTA "Start Learning for Free".
2. **Logo cloud:** empresas donde trabajan los estudiantes (prueba social).
3. **"A path for every goal":** tarjetas de cursos top, cursos de IA, **Career Tracks** (26–44 h, "de cero a empleo") y **Skill Tracks** (habilidad concreta, 9–28 h). Cada tarjeta: nivel, duración en horas, número de estudiantes ("603.6K learners").
4. **Informe/propiedad intelectual propia** ("State of Data & AI Literacy Report") como imán de autoridad.
5. **Segmentación por situación vital:** "I'm switching careers / I'm a team leader / I want to skill up" — tres entradas según quién eres.
6. **Modelo de aprendizaje:** "vídeos cortos intercalados con ejercicios interactivos" + certificaciones.
7. **Instructores con pedigrí** (Microsoft, Google, Databricks) con foto y curso.
8. **Bloque de IA:** tutor de IA integrado ("never get stuck").
9. **App móvil:** rachas ("keep your streak alive"), retos diarios de 5 minutos.
10. **Certificación y empleo:** revisión de CV, preparación de entrevistas.
11. **Testimonios** ("Why 20M+ choose DataCamp").
12. **DataCamp Classrooms:** gratis para profesores (motor de crecimiento).
13. Registro final con "Continue with Google".

### Pricing
- **Basic gratis:** primer capítulo de cada curso + perfil + skill assessments + comunidad/competiciones.
- **Premium ~14 €/mes** (anual, precio tachado de 28): todo el catálogo, proyectos, certificados.
- **Teams** + **Enterprise** (SSO, LMS, reporting). Descuento de estudiantes >50 %. Tabla comparativa de features muy detallada + FAQ de pagos (cancelar, pausar, empresa paga).

### Lecciones aprendidas
- La home vende **resultados** (empleo, certificación), no temas.
- **Tracks > cursos sueltos:** el currículo empaquetado es el producto estrella.
- El **freemium agresivo** (primer capítulo gratis + assessments gratis) quita toda fricción al registro.
- El **código en el navegador** es su identidad de producto ("no instales nada").
- B2B (Teams/Enterprise) como palanca de ingresos seria, no un extra.

---

## 2. Codecademy (referente en programación, aprender construyendo en vivo)

### Página de inicio y catálogo
- Hero minimalista: "Learn to code — for free" + registro arriba del pliegue.
- **Tarjetas mixtas de producto:** Course (24 h), Skill path (4 h, habilidad), Career path (95 h, empleo), Certification path (AWS, Microsoft, CompTIA…). Nivel ("Beginner Friendly") y horas bien visibles.
- Nuevo eje: **"Build in natural language"** — construyes un prototipo describiéndolo, con lecciones adaptativas y explicaciones en contexto, con "builder credits" mensuales.
- **Live Bootcamps y Workshops** en vivo + **All Access Pass** anual.
- Secciones: método ("learn by doing"), testimonios por caso de éxito (cambio de carrera), B2B, app móvil.

### Entorno de aprendizaje (lo relevante para nosotros)
- Editor de código **en el navegador** con corrección automática, Jupyter integrado en cursos de datos.
- **AI Learning Assistant:** botón "Explain code" sobre cualquier fragmento; pistas en proyectos *sin dar la solución* ("eso anularía el objetivo").
- Repaso con **spaced repetition**, autocompletado opcional, Docs con definiciones al pasar el cursor (tooltip).
- Todo el catálogo funciona **bien en móvil**; app aparte para repaso.

### Pricing
- **Basic 0 $:** cursos etiquetados gratis (menos que DataCamp: no es "primer capítulo", es cursos seleccionados).
- **Plus ~15 $/mes:** todo el catálogo + proyectos + certificados de finalización.
- **Pro ~20 $/mes:** + career paths, code challenges, preparación de entrevistas, exámenes y **certificaciones profesionales**.
- Add-ons sueltos: bootcamps, coaching 1:1. Prueba gratis de 7 días (con tarjeta).

### Lecciones aprendidas
- La **corrección automática con pistas graduadas** es el corazón del producto.
- El asistente de IA se vende como feature transversal (explicar, desbloquear, revisar) — nunca resolviendo por ti.
- Segmentación del plan por **objetivo** (aprender vs. conseguir empleo), no por volumen de contenido.

---

## 3. Platzi (referente en español, comunidad y gamificación)

### Página de inicio
- Hero: "La escuela de tecnología de Latinoamérica" + cifras (6M estudiantes, 4.000 empresas) + "Inicia cualquier curso gratis".
- **Muro de historias de éxito con métricas concretas** ("Subió su sueldo +212 %", país, rol) — la prueba social es el núcleo de la home.
- Chips de **objetivos vitales** ("Cambiar de carrera", "Trabajar remoto", "Ganar más") que filtran la oferta.
- 17 **Escuelas** (áreas) → dentro, **Rutas de Aprendizaje** secuenciadas por tipo: introducción, perfil profesional, especialización, habilidad.
- **Comunidad como producto:** retos con premios, eventos en vivo semanales, Platzi Conf anual, comentarios por clase con respuestas del equipo.

### Experiencia de clase y progreso
- **Student Home** con progreso, **meta diaria**, horas aprendidas y estadísticas — orientado a crear hábito (rachas/insignias).
- Home de cada curso: instructor, introducción, **índice completo de clases**, cursos relacionados del mismo profesor.
- Certificado digital al aprobar el examen final (≥90 %, reintento en 6 h); certificado **físico** al completar rutas de perfil profesional.

### Pricing
- **Basic ~49 $/mes** (limitado) y **Expert ~249 $/año** (todo + certificados físicos + eventos + descarga offline).
- **Planes grupales:** Duo (2 personas) y Groups (4–50) — mecánica viral barata.
- Pago en cuotas sin intereses, medios locales (PSE, OXXO, efectivo), referidos con mes gratis.

### Lecciones aprendidas
- La **comunidad** (retos, eventos, comentarios, conferencia) es su diferenciador y su retención.
- Los **objetivos vitales** como eje de navegación conectan mejor que una taxonomía técnica.
- Certificado físico y precios/cuotas/métodos locales: pensado para su mercado, no copiado de EE. UU.

---

## 4. Patrones comunes (lo que repiten los tres = lo que funciona)

| Patrón | DataCamp | Codecademy | Platzi | Aplicación a nuestra web |
|---|---|---|---|---|
| Catálogo jerárquico: paths > cursos > lecciones | ✅ | ✅ | ✅ | Son nuestros **itinerarios N1→N3** (el plan v2 ya lo acierta) |
| Nivel + duración en horas + nº de estudiantes en cada tarjeta | ✅ | ✅ | ✅ | Fácil: nivel y horas ya están en los READMEs de itinerarios |
| Gratis el principio (capítulo/curso gratis) para probar sin tarjeta | ✅ | ✅ | ✅ | Contenido abierto; pagar certificado/corrección/cohorte (plan v2) |
| Prueba/skill assessment gratis | ✅ | ✅ (en Pro) | — | Nuestra **prueba de nivel** para recomendar bloque |
| Código en el navegador, sin instalar nada | ✅ | ✅ | Parcial | **JupyterLite** + botón Colab (plan v2, fase 1) |
| Corrección automática con pistas que no dan la solución | ✅ | ✅ | — | Tests con pistas (fase 1) → tutor IA con pistas graduadas (fase 3) |
| Racha diaria / meta / horas / XP | ✅ | ✅ | ✅ | Racha semanal + barra de progreso en localStorage |
| Testimonios con resultados medibles | ✅ | ✅ | ✅✅ | Cuando haya alumnos; antes, proyectos de portafolio |
| Certificado verificable y "stackable" | ✅ | ✅ | ✅ | Open Badges + PDF con código de verificación |
| B2B (equipos/empresa) | ✅ | ✅ | ✅ | Fase posterior; dejar hueco en la navegación |
| Planes grupales / referidos / cuotas | — | — | ✅ | Poco esfuerzo en Stripe, buen encaje en español |
| Onboarding guiado por objetivo vital | ✅ | ✅ | ✅ | Prueba de nivel + "quiero cambiar de carrera / subir de nivel / usar IA" |

**Decisión de diseño clave que se desprende del análisis:** ninguna de las tres es una "documentación bonita" — es una **aplicación de aprendizaje** con tres pantallas núcleo: *catálogo/currículo*, *lección* (contenido + ejercicio en la misma página) y *home del estudiante* (progreso, racha, siguiente paso). Esto descarta un tema de documentación (MkDocs/Starlight) como base final y apunta a construir pantallas propias.

---

## 5. Propuesta de diseño para nuestra web (patrones adaptados)

### Mapa de pantallas (fase 1, estática, sin cuentas)
| Pantalla | Ruta | Patrón origen | Contenido |
|---|---|---|---|
| Inicio | `/` | DataCamp home | Propuesta de valor, 4 itinerarios como "paths" con horas y certificados, prueba social, CTA "Prueba de nivel" |
| Itinerario | `/itinerarios/n1` … | Career track | Storyline del bloque, módulos en orden con estado ✅/🚧, proyecto final, criterios del certificado |
| Módulo | `/modulos/I2` | Course home de Platzi | Objetivos, índice de lecciones, recursos, diapositivas, notebook |
| Lección | `/modulos/I2/leccion-3` | DataCamp/Codecademy lesson | Apuntes (5–15 min) + **ejercicio al lado: JupyterLite embebido** + cuestionario interactivo + "siguiente" |
| Prueba de nivel | `/prueba-de-nivel` | Skill assessment | 15–20 preguntas → recomienda N1/N2/especialización |
| Mi progreso | `/mi-progreso` | Student Home de Platzi | Racha semanal, barras por módulo, siguiente paso. `localStorage` en fase 1 |

### Cambios respecto al plan v2
1. **De "sitio de docs" a "app de aprendizaje":** Astro a pelo (no Starlight) para construir las pantallas anteriores como componentes. Mantiene la generación desde Markdown del repo y suma componentes interactivos (cuestionarios, track, racha).
2. **La lección es la página unidad** (contenido + ejercicio + corrección en la misma URL), no el notebook suelto.
3. **La prueba de nivel pasa de "nice to have" a CTA principal** de la home (igual que "Start free" en DataCamp/Platzi).
4. **Contenido abierto, certificado/mentoría con cohorte de pago** (fase 2): el freemium de las tres valida el modelo del plan.

### Stack sugerido (fase 1)
- **Astro** + MDX (contenido desde `modulos/*/apuntes.md`) + componentes React mínimos para lo interactivo.
- **JupyterLite** estático embebido en la página de lección (Python en el navegador) + "Abrir en Colab" como fallback con GPU.
- Progreso y racha en `localStorage`; despliegue en Vercel/GitHub Pages desde este repo.
- Fase 2: Supabase (auth+progreso) + Stripe (certificado, suscripción, plaza de cohorte) + Open Badges. Fase 3: tutor IA (Claude + RAG sobre apuntes) con pistas graduadas que no revelan soluciones de ejercicios evaluables.

### Qué NO copiamos
- Catálogo infinito: nosotros vendemos **currículo guiado** (4 itinerarios), que es justo donde somos mejores siendo pequeños.
- Vídeo propio masivo: los `recursos-abiertos.md` (vídeos con licencia) cubren la fase 1; vídeo propio en fase 2 con reproductor protegido.
- App móvil nativa: web responsiva y ya.

---

## 6. Próximos pasos

1. Validar esta propuesta → empezar la **fase 1 (MVP web)**: scaffold Astro en `web/`, con inicio + itinerarios + una lección de ejemplo con JupyterLite.
2. Completar el análisis con capturas del interior de lecciones (requiere cuentas; opcional).
3. Redactar el contenido de la prueba de nivel (bloquea la home).
