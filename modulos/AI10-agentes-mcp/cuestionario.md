# Módulo AI10 · Agentes en producción — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** ¿Qué ventaja principal tiene un servidor MCP frente a escribir para cada agente una integración REST a medida?
- a) Es más rápido en latencia que cualquier API REST.
- b) El cliente descubre herramientas, esquemas y descripciones en ejecución con un protocolo estándar, y el mismo servidor sirve a cualquier cliente compatible.
- c) Evita tener que escribir descripciones de las herramientas.
- d) Elimina la necesidad de autenticación.

**2.** Un servidor MCP expone una política de devoluciones como texto que la aplicación carga como contexto, sin que el modelo decida cuándo leerla. ¿Qué capacidad MCP encaja mejor?
- a) Herramienta (*tool*).
- b) Prompt.
- c) Recurso (*resource*).
- d) Un transporte stdio.

**3.** Tu servidor MCP se lanza como subproceso local y se comunica por entrada/salida estándar. ¿Qué transporte es y qué implicación de seguridad tiene?
- a) stdio; el subproceso solo debe recibir las variables de entorno que necesita, no tus secretos.
- b) HTTP; hereda todo tu entorno, incluidas las claves.
- c) WebSocket; necesita certificado TLS.
- d) stdio; no necesita ninguna consideración de seguridad porque es local.

**4.** Una herramienta lanza una excepción prevista («pedido no encontrado»). ¿Cuál es el comportamiento recomendado?
- a) Dejar que el servidor se caiga para que se note el fallo.
- b) Devolver siempre `"ok"` para no confundir al modelo.
- c) Reintentar indefinidamente en el servidor.
- d) Devolver el error como resultado de la herramienta (con `is_error`) y un mensaje útil, para que el modelo pueda corregir o informar a la persona.

**5.** Con la API de Claude, el modelo devuelve dos bloques `tool_use` en una respuesta. ¿Cómo debes contestar?
- a) Con dos mensajes de usuario separados, uno por resultado.
- b) Con un único mensaje de usuario que contenga una `tool_result` por cada `tool_use`, y devolviendo `resp.content` completo como turno del asistente.
- c) Solo con el resultado de la primera; la segunda se ignora.
- d) Con un mensaje del asistente que resuma ambos resultados.

**6.** Tienes un agente cuyas herramientas incluyen una que crea registros. ¿Qué opción de integración con Claude te da más control para exigir confirmación humana antes de cada acción con efectos?
- a) Tu propio cliente MCP y tu propio bucle de agente.
- b) El conector MCP de la API (`mcp_servers`), porque Anthropic ejecuta las herramientas.
- c) Ninguna: la confirmación no se puede implementar.
- d) Poner «pide confirmación» en el prompt del sistema y confiar en el modelo.

**7.** Un equipo propone pasar de un agente a un supervisor con cuatro trabajadores para una tarea lineal de tres pasos. ¿Qué respuesta es la más acertada?
- a) Siempre mejora la calidad, así que adelante.
- b) El multiagente es obligatorio con más de dos herramientas.
- c) Probablemente solo añada latencia, coste y puntos de fallo; el multiagente se justifica por aislamiento de permisos, exceso de herramientas o subtareas independientes.
- d) Solo funciona con A2A.

**8.** ¿Cuál es la relación correcta entre MCP y A2A?
- a) Son lo mismo con distinto nombre.
- b) A2A sustituye a MCP.
- c) MCP es para agentes y A2A para bases de datos.
- d) MCP conecta un agente con herramientas y datos; A2A conecta agentes entre sí, típicamente de distintas organizaciones.

**9.** En la evaluación de trayectorias de un caso «abrir incidencia», ¿cuál de estas comprobaciones es una restricción de **orden**?
- a) La respuesta debe tener menos de 200 palabras.
- b) `consultar_pedido` debe aparecer antes que `crear_ticket`.
- c) `reembolsar_pedido` no debe intentarse nunca.
- d) El coste debe ser inferior a 0,05 USD.

**10.** Un servidor de terceros cambia después de tu revisión la descripción de una herramienta añadiendo instrucciones ocultas. ¿Qué defensa lo detecta de forma fiable?
- a) Confiar en que el modelo ignore la instrucción.
- b) Aumentar el `max_tokens`.
- c) Comparar una huella (hash) de nombre, descripción y esquema contra la versión aprobada en cada conexión.
- d) Usar solo transporte HTTP.

---

## Solucionario

| # | Resp. | Por qué |
|---|---|---|
| 1 | b | MCP estandariza el descubrimiento y la descripción de herramientas; el mismo servidor sirve a cualquier cliente compatible. No garantiza menos latencia ni elimina la autenticación, y las descripciones siguen siendo imprescindibles. |
| 2 | c | Los recursos son datos identificados por URI que controla la aplicación; las herramientas las decide invocar el modelo, y los prompts los elige la persona. |
| 3 | a | stdio lanza el servidor como subproceso. Conviene pasarle solo lo necesario: heredar el entorno filtraría secretos como la clave de API. |
| 4 | d | Los errores esperados deben llegar al modelo como resultado con indicador de error y mensaje útil; así puede reintentar con otros argumentos o explicarlo. |
| 5 | b | Todas las `tool_use` se contestan en un único mensaje de usuario, y el turno del asistente se devuelve completo (incluido el razonamiento) para mantener la coherencia. |
| 6 | a | Con tu propio cliente y bucle decides cuándo ejecutar cada llamada y puedes interponer la confirmación. El conector delega la ejecución; el prompt por sí solo no es un control. |
| 7 | c | El multiagente añade viajes al modelo y complejidad; solo compensa por aislamiento de permisos, demasiadas herramientas o paralelismo real. |
| 8 | d | MCP es agente↔herramientas/datos (vertical); A2A es agente↔agente entre organizaciones (horizontal). Son complementarios. |
| 9 | b | Una restricción de orden relaciona dos llamadas. Las demás comprobaciones son de formato, de acción prohibida y de presupuesto. |
| 10 | c | La fijación de huellas detecta cualquier cambio de la definición (*rug pull*) antes de ofrecerla al modelo; confiar en el modelo no es un control. |
