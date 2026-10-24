# Módulo AI9 · Recursos abiertos recomendados

Complemento a los apuntes y al notebook. Todo gratuito. Comprueba que los enlaces y los nombres de modelos siguen vigentes, y revisa la licencia de cada recurso (especialmente de modelos de voz) en [docs/recursos-y-licencias.md](../../docs/recursos-y-licencias.md) antes de incrustarlo en una plataforma de pago.

## Por lección

| Lección | Recurso | Tipo |
|---|---|---|
| 9.2 | [Anthropic: Vision](https://docs.anthropic.com/en/docs/build-with-claude/vision) — formatos, límites y buenas prácticas con imágenes | documentación |
| 9.2 | [Anthropic: Structured outputs](https://docs.anthropic.com/en/docs/build-with-claude/structured-outputs) — salida estructurada con esquemas | documentación |
| 9.2 | [Pydantic: Models](https://docs.pydantic.dev/latest/concepts/models/) | documentación |
| 9.3 | [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) — OCR clásico de código abierto | repositorio |
| 9.3 | [Pillow: Handbook](https://pillow.readthedocs.io) — generar y manipular imágenes (la usamos para las facturas) | documentación |
| 9.4 | [scikit-learn: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html) — precisión, exhaustividad | documentación |
| 9.5 | [Whisper (OpenAI)](https://github.com/openai/whisper) — modelo abierto de reconocimiento de voz | repositorio |
| 9.5 | [faster-whisper](https://github.com/SYSTRAN/faster-whisper) — implementación rápida de Whisper | repositorio |
| 9.5 | [Hugging Face: Audio course](https://huggingface.co/learn/audio-course) — curso gratuito de audio con transformers | curso |
| 9.6 | [Anthropic: Streaming messages](https://docs.anthropic.com/en/docs/build-with-claude/streaming) — medir el primer token | documentación |
| 9.7 | [Silero VAD](https://github.com/snakers4/silero-vad) — detección de actividad de voz abierta | repositorio |
| 9.8 | [Hugging Face: Text-to-speech](https://huggingface.co/tasks/text-to-speech) y modelo [`facebook/mms-tts-spa`](https://huggingface.co/facebook/mms-tts-spa) | documentación |
| 9.8 | [Hugging Face: Multimodal tasks](https://huggingface.co/docs/transformers/tasks/multimodal) | documentación |
| 9.9 | [AEPD: guías sobre protección de datos](https://www.aepd.es) — autoridad española; busca sus guías vigentes sobre IA y videovigilancia/grabación | documentación |
| 9.9 | [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — inyección de instrucciones | lectura |

## Práctica extra (recomendada)
- Haz fotos reales (de documentos tuyos **sin datos personales** o inventados) y añade a tu conjunto de evaluación 5 casos reales.
- En Colab con GPU, transcribe 5 llamadas simuladas con `faster-whisper` y calcula WER **y** exactitud del número de pedido.
- Mide la latencia real de tu LLM con *streaming* y reconstruye la tabla `ETAPAS` con tus medianas y tu p95.
