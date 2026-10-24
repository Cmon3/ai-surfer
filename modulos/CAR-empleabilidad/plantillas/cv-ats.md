# Plantilla · CV en Markdown pensado para filtros automáticos (ATS)

> Un *ATS* (*applicant tracking system*) es el software donde las empresas reciben candidaturas. Extrae texto de tu CV y lo compara con la oferta; después lo lee una persona. Por eso el CV debe ser **texto limpio y honesto**: que una máquina lo lea bien y que una persona lo entienda en 30 segundos.
>
> Cómo usar la plantilla: edítala en Markdown y expórtala a **PDF con texto seleccionable** (no una imagen) o a `.docx`, según pida la oferta. Una página para perfiles junior. Una versión por rol, con el orden y las palabras clave de cada oferta (solo las que sean ciertas).

**Reglas de formato**
- Una columna, fuente estándar, sin tablas, sin iconos, sin barras de «nivel de Python 80 %», sin foto ni cabeceras/pies con datos de contacto (algunos ATS no los leen).
- Títulos de sección convencionales: *Experiencia*, *Proyectos*, *Formación*, *Competencias*, *Idiomas*.
- Fechas como «03/2025 – 09/2026». Orden cronológico inverso.
- Los nombres de herramientas, tal como las escribe la oferta («GitHub Actions», no «GH CI»), una vez con siglas y nombre completo si procede.
- Cada viñeta: **verbo de acción + qué hiciste + cómo (tecnología) + resultado medible**. Si no tienes cifra real, describe el alcance; **no inventes números**.

---

# [Nombre y apellidos]
[Ciudad, España] · [correo] · [teléfono] · [linkedin.com/in/tu-perfil] · [github.com/tu-usuario]
*Escribe las URL completas y visibles, no solo texto enlazado.*

## Perfil
[2 líneas. «Data/AI Engineer junior con proyectos desplegados: [lo más fuerte, p. ej. API de predicción con FastAPI, Docker y CI en verde; RAG evaluado con métricas]. Busco [rol] en [sector/ciudad/remoto]».]

## Proyectos
**[Nombre del proyecto 1]** · [enlace al repositorio] · [enlace a la demo]
- Desarrollé [qué] con [tecnologías de la oferta] para [problema], con [resultado medible o alcance verificable].
- Automaticé [tests/CI/despliegue] con [GitHub Actions, Docker]; CI en verde, [n] pruebas.
- Evalué [qué] frente a [línea base] con [métrica]: [resultado y limitación honesta].

**[Nombre del proyecto 2]** · [enlace]
- [Verbo + qué + cómo + resultado].
- [Verbo + qué + cómo + resultado].

## Experiencia
**[Puesto]** · [Empresa] · [Ciudad] · [mm/aaaa – mm/aaaa]
- [Verbo + qué + cómo + resultado. Incluso si no es de datos: lo que tenga que ver con trabajar con clientes, datos, procesos o equipos.]
- [...]

## Formación
**[Titulación o curso]** · [Centro] · [año]
**AI Surfer – itinerario [AI Engineer / Data Scientist / ML Engineer]** · [año] · proyectos: [enlaces]
*Si citas certificaciones, escribe el nombre oficial vigente y la fecha; comprueba que existen.*

## Competencias
- **Lenguajes y datos:** Python (pandas, scikit-learn), SQL ([PostgreSQL/SQLite]), Git.
- **ML y LLM:** [clasificación, series temporales, RAG, evaluación de LLM, APIs de modelos].
- **Producción:** FastAPI, Docker, GitHub Actions, MLflow, [AWS/Azure si lo has usado].
- **Herramientas de IA:** [Claude Code, Cursor...] con revisión de código y tests.
*Pon solo lo que puedas defender en una entrevista técnica de 10 minutos.*

## Idiomas
Español (nativo) · Inglés ([B2 / C1], [certificado o autoevaluación honesta]).

---

**Antes de enviar**
- [ ] Pasa el texto del PDF por un «copiar y pegar» a un editor de texto: ¿sale ordenado y completo?
- [ ] Las competencias imprescindibles de la oferta aparecen, con evidencia en Proyectos o Experiencia.
- [ ] Ninguna viñeta sin resultado o alcance. Ninguna cifra inventada.
- [ ] Los enlaces funcionan sin iniciar sesión y el CI de los repositorios está en verde.
- [ ] Nombre de archivo: `Nombre_Apellido_CV_[rol].pdf`.
