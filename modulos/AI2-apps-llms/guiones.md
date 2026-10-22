# Módulo AI2 · Guiones de grabación

Regla del módulo: cada lección termina con el pato de producción ("¿cómo lo harías si esto va a 500 usuarios?").

## 2.1 · De demo a producto (15 min)
- [0–4] Gancho: mostrar la misma prompt con el usuario real ("cuánto voy a gastar en esto?") frente a la demo.
- [4–9] Los tres desastres: usuario fuera de dominio, outputs no parseables, datos que el modelo no conoce.
- [9–15] Las tres capas de solución (mapa del módulo).

## 2.2 · System prompt (20 min)
- [0–4] Por qué "sé amable" no es regla (no es verificable).
- [4–10] Estructura de 5 partes, con el de TiendaSur en pantalla.
- [10–15] La frase de escape exacta: por qué es la clave contra el "hallucination de cortesía".
- [15–20] Anti-patrones: reglas sin verbo, tono en 3 párrafos.

## 2.3 · Salidas estructuradas (20 min)
- [0–5] Demo sin schema: unidades como string. Riesgo.
- [5–12] Pydantic: schema en el prompt, validación con error nombrado, re-llamada.
- [12–18] En vivo: romper la validación a propósito y ver el re-call.
- [18–20] Regla: lo que se consume por código SIEMPRE pasa por schema.

## 2.4 · Ferramentas (25 min)
- [0–5] El modelo no conoce tu BD — por qué.
- [5–12] El bucle: tool_use → tu función → tool_result → respuesta.
- [12–19] Implementar `get_pedido` en el notebook, con límite de vueltas.
- [19–25] Errores típicos (ids inventados) y cómo devolverlos amablemente.

## 2.5 · Streaming (10 min)
- [0–3] Percepción vs. tiempo total.
- [3–8] En vivo: el texto llegando por bloques.
- [8–10] Cuándo NO streamar (JSON a validar).

## 2.6 · Contexto (20 min)
- [0–4] La ventana se acaba — el coste también.
- [4–11] Resumen de conversación: patrón y riesgos.
- [11–17] RAG (adelanto a AI3): buscar y traer lo relevante.
- [17–20] El asistente de soporte como caso de negocio.

## 2.7 · Caché y coste (10 min)
- [0–3] El token de entrada también cuesta.
- [3–8] Qué se cachea (estable) y qué no (usuario).
- [8–10] El ejercicio 5 del notebook: tu tabla de presupuesto.

Notas del instructor: los ejercicios 1-4 requieren API; el 5 no. Si el estudiante tiene dudas sobre precios, usar docs Anthropic y comparar con OpenAI.
