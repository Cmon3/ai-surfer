# Módulo AI8 · Seguridad, moderación y LLMOps

**Semana 12 de N3-AI · ~8 horas** · Lo que no se ve en la demo, y que rompe producción: moderación, red teaming, inyección de instrucciones, observabilidad y regulación.

## Objetivos
- Implementar un **clasificador de moderación** (regex + reglas + clasificación ligera) con cobertura medible.
- Demostrar la **inyección de instrucciones** ("ignore previous instructions") y las defensas estructurales (role boundary, allowlist de tools, human-in-the-loop para acciones).
- Montar el esqueleto **LLMOps**: logging estructurado de entradas/salidas, coste por petición y alertas de deriva.
- Repaso de regulación: RGPD y Reglamento (IA) — qué se aplica a un asistente.

## Autoevaluación
1. ¿Por qué "filtra palabras malas" con regex es insuficiente como moderación?
2. ¿Qué es una defensa estructural frente a inyección vs una defensa por prompt?
3. ¿Por qué las acciones destructivas (borrar, pagar) requieren confirmación humana?
4. ¿Qué datos registra LLMOps de cada petición y por qué el logging de prompts tiene matices RGPD?

<details><summary>Respuestas</summary>
1. Se salta con variantes lexicográficas, sarcasmo, idiomas y contexto ("¿cómo protejo mi cuenta?" contiene "hackear?"). La moderación real = clasificador + reglas + humanos en el bucle.
2. Estructural: separar instrucciones del usuario en canales distintos, allowlist de tools y confirmación de accionesdestructivas (no depende de que el modelo "obedezca"). Por prompt: pedirle al modelo que no ignore reglas (débil, rompe con ingeniería social).
3. El modelo erra con confianza; el coste de un borrado/pago erróneo es irreversible — el patrón correcto es: modelo → propuesta → humano confirma.
4. Entrada, salida, modelo, latencia, coste, tool usar, id de solicitud — sin contenido sensible en claro (ofuscar PII); los prompts son datos personales y pueden contener datos de terceros.
</details>

## Lecturas
- [OWASP Top 10 LLM](https://genai.owasp.org/llm-top-10) · [Anthropic: Moderation](https://docs.anthropic.com/en/docs/test-and-evaluate/moderation) · Reglamento (UE) 2024/1689.
