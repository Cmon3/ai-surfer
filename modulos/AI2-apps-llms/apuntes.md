# Módulo AI2 · Aplicaciones con LLMs — Apuntes

> Objetivo: escribir prompts y arquitecturas que sobrevivan al uso real. Los LLMs fallan por omisiones nuestras, no por "mal genio": cada fallo del notebook se arregla con una regla, un schema o una herramienta.

---

## 2.1 · De la demo al producto

En la demo pides una cosa y el modelo la hace. En producción:

- **El usuario escribe otra cosa** (más breve, con errores, fuera de dominio).
- **El modelo no sabe qué "sé amable" significa** en tu producto.
- **La salida va a un sistema que espera un formato** — y el modelo inventa uno.

Las tres capas que lo arreglan: **system prompt con reglas accionables**, **salida estructurada validada**, **herramientas para datos que el modelo no puede conocer**.

---

## 2.2 · El system prompt que aguanta

Estructura práctica (del notebook):

1. **Rol**: "Eres el asistente de pedidos de TiendaSur".
2. **Dominio**: "solo respondes temas de pedidos, envíos y facturación".
3. **Reglas accionables** (verificables): "si el tema es otro, responde exactamente: *te paso a soporte*".
4. **Formato**: "si piden un pedido, usa la herramienta `get_pedido`, no inventes datos".
5. **Tono**: 1 linha. Ejemplifica si el tono importa (few-shot).

**Anti-patrón:** reglas vagas ("sé útil", "sé breve") — no se pueden verificar y por tanto no se pueden depurar. **Patrón:** reglas con escape ("si no puedes, di X").

**Por qué el system prompt "aguanta":** se envía en cada petición *antes* de lo que dice el usuario. Cuando el usuario pregunta otra cosa, el modelo no tiene que "recordar" el contexto de tu producto — ya está en el system prompt.

---

## 2.3 · Salidas estructuradas con Pydantic

Cuando la salida se consume por código, pide JSON con **schema** y valida:

```python
from pydantic import BaseModel

class Pedido(BaseModel):
    producto: str
    unidades: int
    urgente: bool

resp = cliente.messages.create(..., response_model=...)  # o tools para forzar JSON
pedido = Pedido.model_validate_json(resp)
```

**Ventajas frente a "dame JSON y ya":**
- **Validación con mensaje**: si `unidades` llega como string, Pydantic lo detecta con nombre del campo.
- **El schema viaja en el prompt**: el modelo ve los tipos, no adivina.
- **Re-call automático**: si el JSON no valida, se re-pide una vez con el error en el prompt — el modelo corrige casi siempre.

**Anti-patrón:** parsear JSON con `json.loads` y confiar. El primer email con comillas raras te lo rompe.

---

## 2.4 · Ferramentas (function calling)

El modelo no puede consultar tu BD ni tu API. La **ferramenta** lo bridgea:

1. Declaras la función (nombre, descripción, schema de argumentos).
2. El modelo devuelve `tool_use` (nombre + argumentos JSON) — **decide el modelo, ejecutas tú**.
3. Tu código corre la función real (`get_pedido(id)` → BD).
4. Devuelves `tool_result` y el modelo **continúa la respuesta** con ese dato.

**Diseño de herramienta:**
- Nombre y descripción como si se lo contaras a un becario: el modelo los lee.
- Devuelve JSON simple (sin objetos anidados locos).
- **Idempotente y segura**: el modelo no debería poder hacer `DELETE` libre.

**Errores típicos:** argumentos inventados (el modelo pide un `id` que no existe) → valida y devuelve error amable en `tool_result`; el modelo lo integra y sigue.

---

## 2.5 · Streaming

El stream llega por bloques de tokens y los pintas a medida:

```python
with cliente.messages.stream(..., max_tokens=500) as s:
    for texto in s.text_stream:
        print(texto, end="")
```

**Por qué importa:** la **percepción** de velocidad. El tiempo total es el mismo, pero el usuario ve los primeros tokens en centésimas de segundo en vez de esperar toda la respuesta. Todo producto de chat moderno — ChatGPT, Claude.ai — streama.

**Para qué NO stream:** cuando lo que llega no es texto que se lee a trozos (un JSON a validar, una ficha a renderizar). Ahí mejor esperar y mostrar en bloque.

---

## 2.6 · Gestión de contexto

La ventana es finita y **cada token cuesta**. Tres estrategias:

- **Truncar** lo más viejo (perder memoria larga) — barato, arriesgado.
- **Resumir**: pedirle al modelo un resumen de la conversación y llevar el resumen + últimos mensajes (patrón de los chat de verdad).
- **Recuperar** (RAG, AI3): buscar lo relevante del historial/documentación con embeddings y traerlo por consulta.

**Para qué sirve:** los asistentes largos (soporte, coaching) necesitan "memoria". Sin gestión, la conversación desborda; con gestión, la calidad cae si el resumen pierde detalles. Es una negociación continua.

---

## 2.7 · Caché de prompt y coste

La API de Anthropic (y la de GPT-4) factura por token de entrada + token de salida, y ahora también por contexto compartido con **caché de prompt**: si el principio del prompt es idéntico entre llamadas (system prompt + documentación), esa parte se cobra muy reducido.

**Qué cacheable:** el system prompt largo y las instrucciones que no cambian por usuario. **No cacheable:** el historial y la consulta del usuario.

**Ganancias prácticas:** asistente de soporte con catálogo de 10k tokens cacheado: cada consulta cuesta casi lo mismo que enviar solo el mensaje del usuario, aunque el prompt real sea 12k tokens.

---

## Resumen del módulo

- **System prompt accionable** (reglas con escape) > instrucciones vagas.
- **Pydantic** para estructurar la salida y **validar** sin rezar.
- **Ferramentas** para conectar el modelo a tus datos: el modelo decide, tu código ejecuta.
- **Streaming** para UX; **caché** para coste; **resumen/RAG** para contexto largo.
