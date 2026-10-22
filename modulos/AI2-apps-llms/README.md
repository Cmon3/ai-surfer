# Módulo AI2 · Aplicaciones con LLMs

**3–4 de N3-AI · ~10 horas** · De "hablar con el modelo" a **construir productos**: prompting que aguanta producción, salidas estructuradas, herramientas, streaming, gestión de contexto y caché.

## Objetivos
Al terminar este módulo podrás:
- Escribir **system prompts** que mantienen el tono, los límites y las reglas de negocio de tu producto.
- Extraer **salidas estructuradas** (JSON tipado con Pydantic) y validarlas sin frases de fe.
- Darle **ferramentas (function calling)** al modelo: definirlas, ejecutarlas y devolver el resultado correctamente.
- Entender **streaming** para UX en tiempo real y **caché de prompt** para bajar coste y latencia.
- Gestionar la **ventana de contexto**: qué se lleva, qué se resume, qué se descarta.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 2.1 | De demo a producto: qué rompe un prompt cuando lo usa gente real | 15 min |
| 2.2 | System prompt que aguanta: rol, límites, reglas, ejemplos | 20 min |
| 2.3 | Salidas estructuradas: Pydantic + tool use como validador | 20 min |
| 2.4 | Ferramentas (function calling): cuando el modelo pide datos | 25 min |
| 2.5 | Streaming y latencia: qué siente el usuario | 10 min |
| 2.6 | Contexto: qué cabe, qué se resume, qué se olvida | 20 min |
| 2.7 | Caché y coste: cómo se factura y cómo optimizar | 10 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`notebook.ipynb`](notebook.ipynb) | Práctica: prompt → JSON validado → ferramenta → streaming (con Claude) |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — construyes un **asistente de pedidos de TiendaSur**: 1) un system prompt que solo habla de pedidos; 2) extrae `Pedido` (Pydantic) de un email de cliente; 3) el modelo pide `get_pedido(id)` como ferramenta y responde; 4) streaming de la respuesta. Cada celda se puede ejecutar con o sin clave de API.

## Nota de API
> **Clave de API.** Necesitas `ANTHROPIC_API_KEY` (en Colab: *Secretos*; en local: variable de entorno). **Nunca la escribas en el notebook ni la subas a Git.** Sin clave, las celdas que llaman al modelo se saltan y el resto del material sigue completo.

## Caso práctico (entregable)
Construye un asistente de tu dominio (soporte, reservas, análisis) que: 1) use un system prompt con reglas explícitas; 2) extraiga datos estructurados validados; 3) use al menos una ferramenta definida por ti. Entrega el notebook (con outputs limpios) y un párrafo: qué rompió el modelo en tu primer intento y cómo lo arreglaste.

**Criterios:** funciona con y sin clave (20 %), extracción validada (25 %), ferramenta bien integrada (25 %), system prompt defendible (20 %), reflexión (10 %).

## Autoevaluación
1. ¿Por qué "sé amable" y no se rompe nada falla más que "responde solo sobre pedidos y, si sale otro tema, contesta 'te paso a soporte'"?
2. ¿Qué ventaja tiene pedir JSON con Pydantic frente a "dame el resultado en JSON", sin schema?
3. En function calling, ¿quién "decide" llamar a la función: el modelo o tu código?
4. ¿Por qué el streaming mejora la *percepción* de velocidad pero no el tiempo total?
5. ¿Qué guardarías en caché de un prompt de asistente de soporte y por qué?

<details><summary>Respuestas</summary>

1. La segunda es una regla accionable y verificable; "sé amable" no tiene criterio de fallo ni de escape. En producción manda la regla comprobable, no el tono.
2. Con Pydantic el JSON se **valida y tipa** (o lanza error con mensaje), y el modelo re-llama si falla; con texto libre parseas y rezas — y cuando falla, falla silenciosamente.
3. El modelo **emite la intención** (nombre de función + argumentos); tu código ejecuta y devuelve el resultado. Es un bucle: modelo decide, código actúa, modelo continúa.
4. El streaming muestra al usuario los primeros tokens en <1 s, así que percibe rápido, aunque el tiempo total de "respuesta completa" no cambie.
5. La parte estable del prompt (instrucciones del sistema + catálogo/documentación del dominio) — se factura una vez y reutiliza contra muchas consultas. Lo que cambia por usuario (historial) no se cachea.
</details>

## Lecturas y recursos
- [Anthropic docs: Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Anthropic docs: Tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
- [Pydantic docs](https://docs.pydantic.dev/latest/) — modelo de validación.
- [12-factor apps] y [OpenAI Cookbook](https://cookbook.openai.com) — patrones equivalentes, útil contrastar.
