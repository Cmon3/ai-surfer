# Módulo AI2 · Aplicaciones con LLMs — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** En un system prompt de producción, la regla más valiosa es…
- a) "sé amable y breve".
- b) "sé útil siempre".
- c) una regla accionable con escape (qué hacer cuando no puedes).
- d) el tono: escribir con emojis.

---

**2.** ¿Por qué Pydantic añade valor a la salida del modelo?
- a) Acelera la inferencia del modelo.
- b) Convierte el JSON en objeto python tipado y validado (falla con mensaje si algo no cumple).
- c) Ahorra tokens de salida.
- d) Reescribe los prompts del modelo.

---

**3.** En function calling, la función la ejecuta…
- a) el modelo, dentro de la propia respuesta.
- b) tu código, después de leer `tool_use` del modelo.
- c) la API de Anthropic, llamando a tu backend.
- d) nadie: no existe ejecución real.

---

**4.** ¿Qué es `tool_result`?
- a) El texto que el modelo escribe tras usar una herramienta.
- b) La respuesta JSON que devuelve el modelo tras pedir una herramienta.
- c) El resultado que **tu código** devuelve al modelo tras ejecutar la herramienta.
- d) El JSON con la declaración de la herramienta.

---

**5.** El streaming…
- a) reduce el tiempo total de la respuesta.
- b) mejora la percepción de velocidad, no el tiempo total.
- c) reduce el coste.
- d) elimina la necesidad de la caché.

---

**6.** ¿Qué parte de un prompt de asistente se beneficia de la caché de prompt?
- a) La pregunta del usuario en cada turno.
- b) Las respuestas previas y su historial.
- c) El system prompt y las instrucciones/domain del producto (estables entre llamadas).
- d) Los resultados de las tools ejecutadas hoy.

---

**7.** Gestión de contexto en una conversación larga: patrón habitual…
- a) recortar tokens aleatorios.
- b) resumir la conversación vieja y llevar resumen + últimos turnos.
- c) enviar siempre la conversación íntegra hasta que falle.
- d) borrar el user antes de cada turno.

---

**8.** El JSON que devuelve el modelo llega con `unidades: "3"` (string). ¿Qué pasa al convertirlo a `Pedido` (Pydantic)?
- a) Pydantic lanza ValidationError con el nombre del campo.
- b) Se convierte automáticamente a int sin errores.
- c) El modelo reintenta solo, sin que hagas nada.
- d) Duplica el campo.

---

**9.** Una buena herramienta que declaras…
- a) tiene nombre y descripción claras (como si se lo contaras a un becario) y devuelve JSON simple.
- b) devuelve el objeto pandas completo, para que el modelo lo entienda mejor.
- c) lanza excepción si el modelo manda un id que no existe.
- d) cachea la respuesta automáticamente.

---

**10.** ¿Por qué NO streamar un JSON a validar?
- a) Porque el JSON no se puede streamar.
- b) No es texto para el usuario: se espera y se muestra en bloque tras validar.
- c) Porque el modelo no puede generar JSON streamado.
- d) Porque incrementa tokens.

<details><summary>Soluciones</summary>

1. **c** 2. **b** 3. **b** 4. **c** 5. **b** 6. **c** 7. **b** 8. **a** 9. **a** 10. **b**
</details>
