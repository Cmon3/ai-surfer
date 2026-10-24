# Banco de preguntas de entrevista por rol

> Cómo usarlo: en pareja o grabándote, **contesta en voz alta** con límite de tiempo (técnicas 2 min, diseño 20–30 min, conductuales 2 min). Después compara con la columna «Señal de buena respuesta», que no es la respuesta completa sino lo que un entrevistador espera oír. Entre paréntesis, el módulo del curso donde se prepara.
>
> Procedencia: los temas salen de las ofertas reales del plan v3, sección 2.1 (TomTom, Galadrim, Provectus, HappyRobot, Kabilio, Wallapop, Reale, ICF). Las preguntas son ejemplos de práctica, no preguntas literales de esas empresas.

## Método STAR para las conductuales
Responde con una historia real en cuatro partes y **sobre todo en primera persona** («yo decidí», no «hicimos»):

| Letra | Qué cuentas | Duración |
|---|---|---|
| **S**ituación | Contexto en 1–2 frases | 15 s |
| **T**area | Qué te tocaba a ti, qué estaba en juego | 15 s |
| **A**cción | Qué hiciste tú, paso a paso y por qué (aquí está el 60 % de la respuesta) | 60 s |
| **R**esultado | Qué pasó, con un dato si lo hay, y qué aprendiste | 30 s |

Prepara **5 historias** que cubran: un error tuyo y cómo lo arreglaste · un desacuerdo técnico · algo que aprendiste rápido · explicar algo técnico a alguien no técnico · un proyecto del que estés orgulloso/a. Con la misma historia puedes contestar varias preguntas. Si no tienes experiencia laboral, valen los proyectos del curso, de estudios o de voluntariado.

---

## 1. Data Scientist

### Técnicas
| Pregunta | Señal de buena respuesta |
|---|---|
| ¿Cómo evalúas un clasificador con el 3 % de positivos? (I3) | Desconfía de la exactitud; matriz de confusión, precisión/recall, PR-AUC, umbral según el coste del error de negocio |
| ¿Qué es la fuga de datos? Dame un ejemplo en una variable temporal. (I8, I6) | Información del futuro o del test en el entrenamiento; partición temporal; calcular variables solo con datos anteriores al corte |
| Un test A/B da p = 0,04 con 12 comparaciones. ¿Qué piensas? (F3) | Comparaciones múltiples, tamaño del efecto e intervalos, potencia y tamaño muestral, decisión de negocio |
| Explica el sesgo-varianza con un ejemplo. (F4, I2) | Modelo simple frente a complejo, validación cruzada, regularización, curva de aprendizaje |
| Tienes un modelo con AUC 0,81 y quieres saber por qué predice lo que predice. (I1–I3) | Importancia por permutación, dependencia parcial, SHAP con cautela ante variables correlacionadas |
| Escribe en SQL el top 2 de productos por categoría. (F2) | Agrega primero, `ROW_NUMBER() OVER (PARTITION BY ...)`, filtra al final, desempates definidos |

### Diseño de sistemas / caso
| Pregunta | Señal de buena respuesta |
|---|---|
| Diseña un modelo de abandono de clientes para un comercio. | Decisión y acción disponibles, etiqueta con ventana, línea base, validación temporal, métrica de negocio, monitorización (ver reto 4 del notebook) |
| Previsión de demanda semanal por tienda. (I6) | Estacionalidad, *backtesting* con ventana móvil, jerarquía tienda/producto, qué hacer con rupturas de stock |
| Cómo presentarías un resultado a dirección que contradice su intuición. (DS8) | Empezar por la decisión, una cifra, incertidumbre, riesgos y siguiente paso; sin jerga |

### Conductuales (STAR)
- Cuéntame una vez que tu análisis cambió una decisión.
- Un resultado no salió como esperabas: ¿qué hiciste?
- ¿Cómo explicarías un intervalo de confianza a alguien de marketing?
- Háblame de un conflicto con un compañero sobre cómo analizar algo.

---

## 2. ML Engineer / MLOps

### Técnicas
| Pregunta | Señal de buena respuesta |
|---|---|
| ¿Por qué guardar el `Pipeline` completo y no solo el modelo? (I8) | El mismo preprocesado en entrenamiento y servicio, sin reescribirlo; evita desajustes silenciosos |
| Un modelo lleva tres meses sin errores. ¿Cómo sabes que sigue bien? (I8) | Salud del servicio, deriva de entradas y de predicciones (PSI), métrica real cuando llegan etiquetas |
| Explica el `Dockerfile` de un servicio de ML: qué cuidas. (I8) | Caché de capas, versiones fijadas, sin root, sin secretos, `HEALTHCHECK`, `.dockerignore` |
| ¿Qué tests escribirías para un modelo en producción? (I8) | Datos (esquema), modelo (umbral y comportamiento), API (contrato); los del CI entrenan su propio modelo |
| ¿Cuándo reentrenar? ¿Cada semana o por evento? (I8) | Por deriva o degradación medida, no por calendario ciego; coste y riesgo del reentrenamiento |
| Batch o tiempo real: ¿cómo decides? (CL1, DS7) | Frescura necesaria frente a coste y complejidad; latencia, volumen, *feature store* si procede |

### Diseño de sistemas
| Pregunta | Señal de buena respuesta |
|---|---|
| Diseña una plataforma para entrenar y servir 20 modelos de varios equipos. | Registro de modelos y experimentos (MLflow), CI/CD, plantillas de servicio, observabilidad, permisos, costes |
| Servir recomendaciones con latencia < 100 ms. | Precálculo y caché, servicio de variables, degradación elegante, pruebas de carga |
| Migrar un notebook de un científico de datos a producción en una semana. | Paquete, tests, contrato de datos, pipeline reproducible, despliegue por etapas y *rollback* |

### Conductuales (STAR)
- Un despliegue que salió mal: ¿qué pasó y qué cambiaste en el proceso?
- Cómo convences a un equipo de añadir tests a algo que «ya funciona».
- Una vez que priorizaste fiabilidad sobre una función nueva.
- Un fallo en producción a las 2 de la mañana: ¿qué haces primero?

---

## 3. AI Engineer

### Técnicas
| Pregunta | Señal de buena respuesta |
|---|---|
| ¿Cómo mejorarías un RAG que responde con información inventada? (AI3, AI4) | Separar fallos de recuperación y de generación; *chunking*, búsqueda híbrida, *reranking*, citas obligatorias, evaluación con conjunto propio |
| ¿Cómo evalúas un sistema con salida no determinista? (AI4) | Conjunto de evaluación versionado, métricas por criterio, juez LLM calibrado con humanos, repeticiones, evals en CI |
| ¿Cuándo ML clásico y cuándo un LLM? (I7, AI2) | Coste, latencia, datos etiquetados, explicabilidad, riesgo; empezar por lo simple |
| ¿Qué es una inyección de instrucciones y cómo te defiendes? (AI8) | Datos no confiables como instrucciones; mínimo privilegio, confirmación humana, separar contexto, validación de salidas |
| ¿Por qué un agente preferiría MCP a una integración REST propia? | Protocolo estándar de herramientas y recursos reutilizable entre clientes; descubrimiento y permisos; pero no lo uses si una llamada directa basta (AI10) |
| Controlar coste y latencia de una aplicación con LLM. (AI2, AI7) | Elegir modelo por tarea, caché de prompts, salidas acotadas, medir tokens por tarea, lotes |

### Diseño de sistemas
| Pregunta | Señal de buena respuesta |
|---|---|
| Asistente de atención al cliente con RAG sobre 5 000 documentos. | Ingesta, índice vectorial, recuperación híbrida, guardarraíles, evaluación continua, observabilidad, plan de escalado a humano |
| Agente que concilia facturas con el ERP. | Herramientas con permisos mínimos, confirmación humana en acciones irreversibles, trazas, evaluación de trayectorias |
| Procesar 200 000 documentos al mes con extracción estructurada. | Colas, reintentos, validación con esquemas, muestreo humano, coste por documento |

### Conductuales (STAR)
- Cuándo dijiste «esto no se debe hacer con un LLM».
- Un caso donde el modelo se equivocó y tú tuviste que explicárselo a alguien.
- Cómo usas un agente de código en tu día a día y cómo revisas su trabajo.
- Una decisión sobre privacidad o seguridad que tuviste que defender.

---

## 4. Forward Deployed Engineer (FDE)

*Perfil de cara al cliente: ingeniería de IA + full-stack + comunicación (HappyRobot, Galadrim y consultoras en la muestra del plan). Pesa tanto cómo entiendes el problema como el código.*

### Técnicas
| Pregunta | Señal de buena respuesta |
|---|---|
| Integra una API de terceros con límites de tasa y errores intermitentes. | Reintentos con espera creciente, idempotencia, *timeouts*, registro, contrato de pruebas |
| Explica `async/await` en TypeScript o Python a un compañero. | Concurrencia de E/S frente a CPU; cuándo ayuda y cuándo no |
| Una demo en React llama a tu API; el navegador bloquea la petición. | CORS, orígenes, cabeceras; cómo se configura en el servidor |
| Cómo mostrarías una respuesta de LLM en *streaming*. (FS1) | Eventos del servidor, renderizado incremental, cancelación, errores a mitad |
| Agente de voz: qué hace difícil la latencia. (AI9) | Transcripción, modelo y síntesis en serie; turnos e interrupciones; respuestas parciales |
| Un cliente da datos desordenados el día de la demo. | Validación, mensajes de error útiles, datos de respaldo y expectativas honestas |

### Diseño / caso con cliente
| Pregunta | Señal de buena respuesta |
|---|---|
| El cliente pide «una IA que automatice el servicio al cliente». ¿Qué haces la primera semana? | *Discovery*: procesos reales, volumen, datos disponibles, métricas de éxito, riesgos, un piloto acotado |
| Cómo estimas y recortas el alcance de un piloto de 4 semanas. | Lo mínimo que demuestre valor, criterios de aceptación, qué queda fuera y por qué |
| El piloto funciona, pero el equipo del cliente no lo adopta. | Formación, integración en su flujo, responsables, medición de uso |

### Conductuales (STAR)
- Explicaste algo técnico a alguien que no lo era y funcionó (o no).
- Un cliente con expectativas irreales: ¿cómo gestionaste la conversación?
- Un malentendido de requisitos descubierto tarde.
- Un proyecto que tuviste que sacar adelante con información incompleta.

---

## Preguntas que te toca hacer a ti (siempre)
1. ¿Cómo es un buen primer año en este puesto? ¿Cómo se mide?
2. ¿Cómo se despliega un modelo o un cambio hasta producción? ¿Quién lo revisa?
3. ¿Cómo se trabaja con asistentes de código en el equipo?
4. ¿Cuál es el mayor reto técnico ahora mismo?
5. ¿Cómo es el proceso de mentoría para perfiles junior?
6. ¿Cuáles son los siguientes pasos y plazos del proceso?
