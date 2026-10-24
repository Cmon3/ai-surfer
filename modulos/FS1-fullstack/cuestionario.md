# Módulo FS1 · Full-stack para AI Engineers — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Pones `NEXT_PUBLIC_ANTHROPIC_API_KEY` en `.env.local` y la usas en un componente de React. ¿Qué ocurre?
- a) Nada grave: `.env.local` no se sube a git.
- b) La variable se incrusta en el JavaScript que descarga el navegador, así que cualquiera puede leer tu clave.
- c) Next.js la cifra automáticamente.
- d) Solo es visible si el usuario ha iniciado sesión.

**2.** ¿Qué diferencia hay entre un tipo de TypeScript y un esquema de Zod?
- a) Ninguna, son lo mismo.
- b) El tipo solo se comprueba al compilar y desaparece en ejecución; Zod valida los datos reales cuando llegan.
- c) Zod solo sirve para números.
- d) Los tipos validan peticiones HTTP; Zod valida componentes.

**3.** Un componente necesita `useState` y `onChange`. ¿Qué hay que hacer en Next.js (App Router)?
- a) Nada: los componentes por defecto ya son de cliente.
- b) Marcarlo con `"use client"` al principio del archivo.
- c) Moverlo a `route.ts`.
- d) Importarlo desde `node_modules`.

**4.** Durante el streaming llegan decenas de trozos de texto seguidos y los añades a un mensaje. ¿Cómo actualizas el estado de forma correcta?
- a) `setMensajes(mensajes + trozo)` usando el valor capturado al renderizar.
- b) `setMensajes(prev => ...)`, partiendo siempre del estado más reciente.
- c) Modificando directamente el array con `push`.
- d) Esperando al final y actualizando una sola vez, para no repintar.

**5.** Tu servidor envía un evento por línea y en el navegador `JSON.parse` falla de vez en cuando. ¿Cuál es la causa más probable?
- a) El modelo genera JSON inválido.
- b) Un trozo de red puede cortar una línea por la mitad; hay que acumular en un *buffer* y procesar solo las líneas completas.
- c) `ReadableStream` no admite texto.
- d) Falta el encabezado `Content-Type`.

**6.** Claude responde con `stop_reason: "tool_use"` y dos bloques `tool_use`. ¿Cómo continúas?
- a) Respondes solo a la primera herramienta; la segunda se ignora.
- b) Añades el contenido completo del asistente y un único mensaje de usuario con una `tool_result` por cada `tool_use`.
- c) Mandas dos mensajes de usuario, uno por herramienta.
- d) Añades un mensaje del asistente con el resultado, rellenando su respuesta con *prefill*.

**7.** ¿Por qué se valida con Zod la entrada de una herramienta que escribe el propio modelo?
- a) Porque el modelo nunca se equivoca y es un trámite.
- b) Porque es entrada no confiable: puede venir mal formada o manipulada por el texto del usuario, y se debe rechazar antes de tocar tus datos.
- c) Porque la API de Claude lo exige.
- d) Para que la herramienta sea más rápida.

**8.** La API de Anthropic devuelve un `401` con el texto «invalid x-api-key sk-ant-...». ¿Qué envías al navegador?
- a) El mensaje original, para que se pueda depurar.
- b) Un mensaje genérico («el servicio no está bien configurado») y el detalle solo en el log del servidor.
- c) Nada: cierras la conexión sin explicación.
- d) El mensaje original pero con la clave parcialmente ocultada.

**9.** Un usuario autenticado cambia `TS-1001` por `TS-1002` en la conversación y ve el pedido de otra persona. ¿Cómo se llama el fallo y cómo se evita?
- a) CORS; añadiendo cabeceras.
- b) IDOR (falta de autorización por recurso); la herramienta debe filtrar por el usuario de la sesión del servidor, no por lo que diga el modelo o el cliente.
- c) *Rate limiting*; limitando peticiones por minuto.
- d) XSS; escapando el HTML.

**10.** En la primera reunión, un cliente dice «quiero un chatbot con IA». ¿Qué haces primero?
- a) Empezar a programar un prototipo con el chat.
- b) Preguntar por el problema concreto, quién lo sufre, qué datos existen, qué pasa si el asistente se equivoca y cómo se medirá el éxito; y acordar qué queda fuera de la demo.
- c) Presupuestar el proyecto completo.
- d) Proponer el modelo más grande disponible.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | El prefijo `NEXT_PUBLIC_` publica la variable en el código del navegador; las claves solo viven en el servidor. |
| 2 | b | Los tipos se borran al compilar; solo Zod comprueba datos reales en ejecución (y además genera el tipo). |
| 3 | b | Los hooks y eventos solo existen en el navegador; `"use client"` marca la frontera. |
| 4 | b | Con muchas actualizaciones seguidas, la forma funcional evita partir de un estado desfasado y perder texto. |
| 5 | b | TCP no respeta tus saltos de línea; el *buffer* con el resto sin procesar es la solución estándar. |
| 6 | b | La API exige una `tool_result` por cada `tool_use` en un único mensaje de usuario; el prefill está prohibido. |
| 7 | b | La entrada de herramientas se trata como entrada de usuario hostil: se valida y se devuelve un error legible. |
| 8 | b | El detalle puede revelar configuración o secretos; va al log, no al navegador. |
| 9 | b | Autenticado no significa autorizado para ese recurso; la identidad sale de la sesión del servidor. |
| 10 | b | Sin entender el problema, los datos y el criterio de éxito no hay una demo útil, solo una promesa. |
</details>
