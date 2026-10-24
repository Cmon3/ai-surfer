# Módulo AI9 · Multimodal: visión, audio y agentes de voz

**Semanas 7–8 de N3-AI · ~8 horas** · Cómo hacer que un LLM **lea una imagen** (una factura) y **hable por teléfono** (un agente de voz), cómo **medir** ambas cosas y qué riesgos de privacidad aparecen. Es uno de los módulos que más ha subido de prioridad por la demanda de **agentes de voz** y de ingenieros que sepan desplegarlos con un cliente.

## Qué piden las ofertas
En las ofertas de octubre de 2026 de *AI/ML Engineer* y *Forward Deployed Engineer* (por ejemplo, perfiles como los de HappyRobot o Galadrim recogidos en el plan v3) se repite: **LLM por API**, **voz** (transcripción y voces sintéticas), **visión** (documentos, imágenes), integración con APIs de terceros y **hablar con el cliente** sobre qué es viable y cuánto tarda. Este módulo cubre esos tres bloques y termina en dos piezas de portafolio.

## Objetivos
Al terminar este módulo podrás:
- Extraer datos de una **imagen de factura** con un modelo de visión-lenguaje (VLM), **salida estructurada** (`messages.parse` + Pydantic) y **revisión determinista**.
- Construir y evaluar el camino **sin VLM** (OCR + reglas) y decidir cuándo usar cada uno.
- Evaluar una extracción **campo a campo**, y distinguir errores que se detectan de errores **silenciosos**.
- Explicar el pipeline **STT → LLM → TTS** de un agente de voz y calcular su **presupuesto de latencia** por etapa (con *streaming* por frases).
- Diseñar **turnos** (*endpointing*) e **interrupciones** (*barge-in*) y medir su compromiso.
- Evaluar un STT con **WER y exactitud de entidades**.
- Identificar y mitigar riesgos: **datos personales** en imágenes y voz, **suplantación** y **órdenes escondidas** en el contenido.
- Saber qué se puede hacer con modelos **abiertos** (Whisper, TTS, VLM) en Colab.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 9.1 | Por qué multimodal ahora: mapa del módulo | 10 min |
| 9.2 | Visión-lenguaje: de la imagen a un objeto validado | 20 min |
| 9.3 | OCR + reglas frente a VLM: cuándo cada uno | 15 min |
| 9.4 | Evaluar la extracción campo a campo y la revisión humana | 15 min |
| 9.5 | Audio: STT, Whisper, WER y entidades | 15 min |
| 9.6 | Agentes de voz: pipeline y presupuesto de latencia | 20 min |
| 9.7 | Turnos e interrupciones: *endpointing* y *barge-in* | 20 min |
| 9.8 | Voz y visión con modelos abiertos (Colab) | 10 min |
| 9.9 | Riesgos: datos personales, consentimiento, suplantación e inyección | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; PDF con `scripts/generar_diapositivas.sh AI9`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada: extractor de facturas + diseño medido de un agente de voz |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos por lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — dos productos para **TiendaSur**:

1. **Extractor de facturas.** El notebook **genera** facturas como imagen con Pillow (tienes la verdad, así que puedes medir), incluidas versiones «fotografiadas con el móvil». Extrae los datos con **Claude + `messages.parse` + Pydantic** (con clave) o con un **OCR simulado + reglas** (sin clave), aplica una revisión aritmética y evalúa **campo a campo** sobre 8 facturas.
2. **Agente de voz medido.** Simula el pipeline STT → LLM → TTS **midiendo con reloj** cada etapa, calcula el presupuesto de latencia (mediana y p95 sobre 2000 turnos), prueba el *endpointing* con audio sintético y una VAD por energía y simula una interrupción guardando en el historial solo lo que se llegó a decir. Con clave, el tiempo del LLM es el **medido de verdad** con *streaming*.
3. **Riesgos:** redactor de datos personales (DNI/NIE con letra válida, IBAN, tarjeta con Luhn, teléfono, email) y detector de órdenes escondidas.

**Requisitos:** las dependencias del curso (Pillow, matplotlib, pydantic, pandas). Sin descargas y sin GPU; **sin clave** funciona entero (las celdas **[API]** se saltan). El STT, el TTS y el VLM abierto van como **esqueleto comentado para Colab**. El notebook guarda una imagen de ejemplo en `proyecto-multimodal/`.

> Honestidad de la simulación: el OCR y las etapas de STT/TTS de la práctica son **simulados** (se indica en cada celda). Lo real es la lógica: el extractor por reglas, la validación, la evaluación, el cálculo del presupuesto, la VAD y la gestión de turnos.

## Caso práctico (entregable)
Publica en GitHub dos piezas con sus datos **inventados**:
1. **Extractor de facturas:** al menos **10 documentos** (mínimo 3 «degradados»), tabla de exactitud **campo a campo**, matriz «error / aviso», y un párrafo sobre qué errores pasan sin aviso y qué regla nueva añadirías.
2. **Informe de diseño de un agente de voz** para un caso concreto (p. ej. soporte de TiendaSur): presupuesto de latencia con medianas **medidas** de tus proveedores (o las simuladas, declarándolo), decisiones de *endpointing* e interrupciones con una tabla, y una sección de **riesgos** (qué datos personales aparecen, cómo se redactan, qué se guarda y por cuánto tiempo, aviso y consentimiento).

**Criterios:** extractor funcionando y evaluado 35 % · diseño de voz medido y razonado 30 % · riesgos y privacidad 20 % · claridad del README (pensado para un cliente no técnico) 15 %.

> El README del informe de voz es tu ensayo de la conversación con un cliente: qué es viable, cuánto tarda en responder, qué puede salir mal y qué datos tocas.

## Autoevaluación
1. ¿Por qué un JSON que cumple el esquema Pydantic puede seguir siendo incorrecto?
2. ¿Qué es un error silencioso en una extracción y cómo se reduce?
3. ¿Qué ahorra el *streaming* por frases en un agente de voz y por qué no cambia ningún modelo?
4. ¿Por qué no existe un umbral de silencio perfecto para detectar el fin de turno?
5. Un STT tiene WER bajo y el agente falla. ¿Qué puede estar pasando?

<details><summary>Respuestas</summary>

1. Pydantic comprueba **forma y tipos**, no verdad: un importe mal leído sigue siendo un `float`. Por eso se añade una revisión de coherencia (sumas, formatos) y revisión humana de lo dudoso.
2. Es una extracción incorrecta que ninguna regla marca (p. ej. un dígito cambiado en una descripción o dos errores que se compensan). Se reduce con más reglas (formatos, rangos, cruces con datos conocidos), muestreo manual y, si el coste del error es alto, doble extracción y comparación.
3. Que el TTS empiece a sintetizar la primera frase mientras el LLM sigue escribiendo, en lugar de esperar a la respuesta completa: se solapan etapas, así que el primer sonido llega antes aunque cada etapa tarde lo mismo.
4. Es un compromiso: un silencio corto corta al usuario cuando duda; uno largo añade esa espera a **todas** las respuestas. Se mejora con señales extra (frase incompleta, STT en streaming, entonación).
5. El WER promedia todas las palabras y un error en una **entidad** (número de pedido, nombre, importe) puede arruinar la llamada con un WER pequeño. Hay que medir también la exactitud de las entidades.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: la guía de visión de Claude, el repositorio de Whisper y la documentación de `faster-whisper`; y la normativa de protección de datos que aplique a tu caso.
