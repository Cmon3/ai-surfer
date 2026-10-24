# Módulo FS1 · Full-stack para AI Engineers — Apuntes

> Objetivo: ser capaz de entregar a un cliente, en pocos días, una aplicación web con un asistente de IA que funcione, sea segura y se pueda probar sin gastar un euro.

El caso: **TiendaSur** quiere un asistente que conteste a «¿dónde está mi pedido TS-1001?». La aplicación completa está en `app-solucion/`.

---

## FS1.1 · TypeScript esencial para quien viene de Python

TypeScript es JavaScript con **tipos comprobados al compilar**. Los tipos se borran al ejecutar: en producción solo hay JavaScript.

| Python | TypeScript |
|---|---|
| `x: int = 3` | `const x: number = 3` |
| `list[str]` | `string[]` |
| `dict[str, int]` | `Record<string, number>` |
| `Optional[str]` | `string \| undefined` (o `string \| null`) |
| `Literal["a","b"]` | `"a" \| "b"` |
| `@dataclass` / Pydantic | `interface` o `type` (+ Zod para validar) |
| `async def` / `await` | `async function` / `await` (igual) |
| `import x from y` | `import { x } from "y"` |
| generadores `yield` | `function*` y `async function*` (`for await`) |

Ideas clave:
- **`const` por defecto**, `let` si se reasigna. Evita `var`.
- **Tipos de unión y estrechamiento.** `type Evento = {type:"texto"; texto:string} | {type:"fin"}`; al comprobar `e.type === "texto"`, TypeScript sabe que existe `e.texto`. Es la "unión discriminada" y verás mucha en la API de Claude (`block.type === "text"`).
- **`strict: true`** en `tsconfig.json`: obliga a tratar `null`/`undefined`. Nuestro proyecto añade `noUncheckedIndexedAccess`: `arr[0]` es `T | undefined`.
- **`unknown` en lugar de `any`.** `any` apaga el comprobador; `unknown` te obliga a validar antes de usar. Todo lo que llega de fuera (JSON, entrada del modelo) es `unknown`.
- **`Promise<T>` y `await`.** Igual que `asyncio`, pero el bucle de eventos ya viene incluido.
- **Los tipos no validan datos.** `JSON.parse(x) as Pedido` es una mentira cómoda. De ahí Zod (FS1.5).

> Regla de ahorro de tiempo: deja que el compilador te enseñe. Ejecuta `npx tsc --noEmit` a menudo y lee los errores; son claros.

---

## FS1.2 · React: componentes, estado y eventos

Un **componente** es una función que recibe datos (*props*) y devuelve interfaz (JSX). React vuelve a ejecutarla cuando cambia el **estado**.

```tsx
const [entrada, setEntrada] = useState("");
<input value={entrada} onChange={(e) => setEntrada(e.target.value)} />
```

- **Estado (`useState`)**: lo que cambia y debe repintar. Nunca se modifica directamente; se llama a `setX`.
- **Actualización funcional** `setMensajes(prev => ...)`: imprescindible en streaming, donde llegan decenas de trozos seguidos; si partes de una copia vieja, pierdes texto.
- **Eventos**: `onChange`, `onSubmit` (con `e.preventDefault()`).
- **Listas**: cada elemento necesita una `key` estable.
- **Efectos** (`useEffect`): para sincronizar con el exterior. No los uses para calcular datos derivados; calcúlalos al renderizar.
- **Accesibilidad**: `aria-live="polite"` en la lista del chat y `role="alert"` en errores; cuesta una línea y marca la diferencia.

Pensar en React es pensar en *estado -> pantalla*. Si algo falla, pregúntate qué estado tendría que haber.

---

## FS1.3 · Next.js: servidor vs cliente y *route handlers*

Next.js (App Router) ejecuta tu código en **dos sitios**:

| | Servidor | Navegador |
|---|---|---|
| Componentes | Por defecto (*Server Components*) | Los marcados con `"use client"` |
| Puede leer | `process.env.*`, bases de datos, tu clave | Solo lo que el servidor le envíe |
| Puede usar | Node, el SDK de Anthropic | `useState`, eventos, `fetch` |
| Ve el usuario | Solo el resultado (HTML/JSON) | Todo el código (es público) |

**Regla de oro de seguridad:** la clave de Anthropic solo existe en el servidor. El navegador llama a **tu** endpoint `/api/chat`; el endpoint llama a Anthropic. Las variables con prefijo `NEXT_PUBLIC_` se incrustan en el JavaScript del navegador: nunca pongas ahí un secreto.

Una ***route handler*** es un archivo `app/api/chat/route.ts` que exporta funciones con el nombre del verbo HTTP (`POST`). Recibe un `Request` y devuelve un `Response` (estándares web, no hace falta Express).

Qué hace nuestra `POST`:
1. Lee el JSON; si está roto, **400**.
2. Valida con Zod; si no cumple el contrato, **422**.
3. Llama a `generarRespuesta(...)` y devuelve un `Response` con un `ReadableStream`.

Diseño que se paga solo: la lógica (`src/lib/chat.ts`) **no sabe nada de HTTP ni de Next**; recibe el creador del *stream* como parámetro. Así se testea sin red y sin clave.

---

## FS1.4 · Streaming de la respuesta del modelo hasta el navegador

Un modelo grande puede tardar varios segundos en terminar; en un chat, eso es esperar mirando una pantalla vacía. Con *streaming* el primer texto aparece en décimas de segundo.

**Capa 1: Anthropic -> tu servidor.** El SDK ofrece `client.messages.stream({...})`. Iteras los eventos y, de cada `content_block_delta` con `delta.type === "text_delta"`, sacas `delta.text`. Al terminar, `await stream.finalMessage()` te da el mensaje completo (y el `stop_reason`, necesario para saber si pidió herramientas).

**Capa 2: tu servidor -> navegador.** Devolvemos un `ReadableStream` con **NDJSON** (un objeto JSON por línea):

```
{"type":"texto","texto":"Tu ped"}
{"type":"herramienta","nombre":"consultar_pedido"}
{"type":"fin"}
```

Elegimos NDJSON por simplicidad (con SSE es parecido, pero con `data:` y `EventSource`, que solo admite GET). En el navegador, `leerEventos` lee `resp.body`, acumula en un *buffer* y parte por `\n`. **Un trozo de red puede cortar una línea por la mitad**: por eso se guarda el resto sin procesar (hay un test para ello).

**Cancelación.** Si el usuario cierra la pestaña, `cancel()` del `ReadableStream` llama a `return()` del generador y dejamos de generar (y de pagar).

**Modo simulado.** Sin clave, `streamSimulado` emite el texto en trozos de 6 caracteres con una pausa corta. Es el mismo canal, así que la interfaz no sabe la diferencia. Útil para desarrollar, para demos sin red y para que un revisor pruebe tu portafolio.

**Reglas de la API vigentes (oct. 2026):**
- Los modelos razonan siempre: la respuesta puede traer bloques `thinking` antes del `text`. Nunca `content[0].text`: filtra por `b.type === "text"`. (En streaming ya lo hacemos al mirar `text_delta`.)
- `max_tokens` holgado (usamos 4000) y `output_config: { effort: "low" }` para un chat ágil.
- **No** envíes `temperature`, `top_p`, `top_k`, `budget_tokens`, *prefill* del asistente ni `tool_choice` forzado: la API los rechaza.

---

## FS1.5 · Herramientas, validación con Zod y errores

**Herramienta** = función tuya que Claude puede pedir. Defines `name`, `description` y `input_schema` (JSON Schema). Claude no ejecuta nada: responde con un bloque `tool_use`; **tu código** la ejecuta y devuelve el resultado.

El bucle (`generarRespuesta`):
1. Llamar al modelo con el historial. Transmitir el texto.
2. Si `stop_reason === "tool_use"`: añadir al historial el **contenido completo** del asistente.
3. Ejecutar **cada** `tool_use` y construir **un único** mensaje de usuario con **una `tool_result` por cada uno** (con su `tool_use_id`). Si omites una, la API da error.
4. Repetir hasta `end_turn`, con un **tope de vueltas** (`MAX_VUELTAS = 5`) para no entrar en bucles infinitos.

**Zod: validar en ejecución.** La entrada de la herramienta la escribe un modelo; trátala como entrada de un usuario hostil:

```ts
const Entrada = z.object({ id_pedido: z.string().trim().toUpperCase().regex(/^TS-\d{4}$/) });
const r = Entrada.safeParse(uso.input);   // nunca lanza; devuelve success/error
```
Un solo esquema te da validación **y** tipo (`z.infer`). Lo usamos en tres fronteras: la petición del navegador, la entrada de la herramienta y (opcionalmente) la salida.

**Errores como datos.** Si la herramienta falla, devuelve `is_error: true` con un mensaje: el modelo lo lee y se lo explica al cliente («ese número no existe, revisa el correo»). No lances excepciones desde dentro del bucle.

**Errores hacia el usuario sin filtrar secretos.** El detalle (`401 invalid x-api-key ...`) va al log del servidor; al navegador, un mensaje genérico según el estado: 401 (configuración), 429 (demasiada demanda), 5xx (servicio caído). Hay un test que comprueba que el mensaje no contiene el texto del error original.

**Mínimo privilegio.** La herramienta no devuelve el nombre del cliente porque la respuesta no lo necesita. Lo que no entra en el contexto del modelo no puede filtrarse.

**Tests con Vitest.** Un cliente falso (`falsoStream`) emite eventos y un `finalMessage` preparados: pruebas el bucle, el orden de las `tool_result` y el tope de vueltas **sin red ni clave**. `npm test` corre en menos de un segundo.

---

## FS1.6 · Despliegue y variables de entorno

Pasos en Vercel (el equipo de Next.js; gratis para proyectos personales, comprueba el plan vigente):
1. Repositorio en GitHub **sin** `.env*` (`.gitignore`).
2. Importar el proyecto; si es un monorepo, indicar el *Root Directory*.
3. Añadir `ANTHROPIC_API_KEY` en *Environment Variables* (Production y Preview).
4. Desplegar; cada *push* genera una versión de previsualización.

Otras vías: Railway, Render, Fly.io (`npm run build && npm start`), o un contenedor Docker con `output: "standalone"`.

Buenas prácticas:
- `.env.example` documenta las variables sin valores; `.env.local` (ignorado) tiene las reales.
- Un secreto por entorno; rota la clave si sospechas que se ha filtrado (se ha subido a git, aparece en un log).
- Una función en la nube tiene límite de duración: con streaming largo, revisa `maxDuration` y el plan.
- Pon un **límite de gasto** en la consola de Anthropic. Un endpoint público sin límites es un cheque en blanco.
- Comprueba que el modo simulado sigue funcionando en producción si no hay clave: la demo no debe romperse.

---

## FS1.7 · Autenticación básica (concepto)

Un endpoint que gasta dinero (llama a un modelo) **no puede ser público**. Conceptos:

- **Autenticación** = ¿quién eres? **Autorización** = ¿qué puedes hacer?
- **Sesión con cookie**: tras iniciar sesión, el servidor guarda una sesión y entrega una cookie `HttpOnly; Secure; SameSite`. El navegador la envía sola. Es lo más sencillo y seguro para webs.
- **Token (JWT)**: un testigo firmado; útil entre servicios y apps móviles. Se valida la firma y la caducidad en cada petición. Ojo: guardarlo en `localStorage` lo expone a XSS.
- **OAuth / OIDC** («Entrar con Google»): delegas la identidad en un proveedor. En la práctica usarás una librería (Auth.js, Clerk, Supabase Auth); **no inventes tu propio sistema de contraseñas**.
- **Dónde se comprueba**: siempre en el servidor, dentro de la *route handler*. Ocultar un botón en la interfaz no protege nada.
- **Autorización por recurso**: aunque el usuario esté autenticado, solo puede consultar *sus* pedidos (IDOR: acceder al pedido de otro cambiando el número). En la app didáctica cualquiera consulta cualquier pedido; en producción, la herramienta recibiría el `userId` de la sesión, no del modelo.
- **Limitación de uso (*rate limiting*)** por usuario/IP y tope de longitud de mensaje (ya lo tenemos: 4000 caracteres, 30 mensajes).
- **Inyección de instrucciones**: el texto del usuario (o del contenido que lea una herramienta) puede intentar manipular al modelo. Defensa: permisos mínimos en las herramientas, validación y nunca dar al modelo capacidades que no darías al usuario.

---

## FS1.8 · *Discovery* con cliente: de la conversación a la demo

Un *Forward Deployed Engineer* gana valor en la primera reunión. Estructura de la conversación:

1. **Problema, no solución.** «¿Qué te cuesta tiempo o dinero hoy?» (no «quiero un chatbot»). Pide un ejemplo concreto reciente.
2. **Usuarios y contexto.** ¿Quién lo usará, desde dónde, con qué prisa? ¿Qué hacen hoy?
3. **Datos y sistemas.** ¿Dónde vive la información (ERP, hoja de cálculo, correo)? ¿Hay API? ¿Quién da acceso? Aquí se decide si el proyecto es de 3 días o de 3 meses.
4. **Riesgos.** ¿Qué pasa si el asistente se equivoca? Datos personales, cumplimiento (RGPD), tono, qué nunca debe decir.
5. **Éxito medible.** «Si funciona, ¿qué número cambia?» (consultas resueltas sin agente, tiempo de respuesta).
6. **Fuera de alcance.** Escribirlo evita la deriva: la demo hace *una* cosa bien.

**De la conversación a la demo (plantilla de una página):**
| Campo | Ejemplo TiendaSur |
|---|---|
| Problema | 40 % de los correos son «¿dónde está mi pedido?» |
| Usuario | Cliente final, desde el móvil |
| Demo mínima | Chat que consulta el estado de un pedido y lo explica |
| Datos | Tabla de pedidos del ERP (simulada en la demo) |
| Herramientas | `consultar_pedido` |
| Fuera de alcance | Devoluciones, pagos, datos personales |
| Riesgo | No inventar fechas; si no sabe, deriva a atención al cliente |
| Éxito | Resolver sin agente el 60 % de las consultas |

**Cómo presentar la demo:** empieza por el problema del cliente, muestra el caso feliz en 60 segundos, luego un **caso de fallo** (pedido inexistente) para generar confianza, y cierra con qué falta para producción (autenticación, datos reales, métricas). Y el modo simulado te salva si falla el wifi.

**Explicar a no técnicos:** una analogía por concepto («la clave es la llave de la caja; no se la das a quien entra a la tienda»), cifras y ejemplos del negocio, sin jerga.

---

## Glosario
- **App Router**: sistema de rutas de Next.js basado en carpetas dentro de `app/`.
- **Componente servidor / cliente**: el primero se renderiza en el servidor; el segundo (`"use client"`) en el navegador.
- **Route handler**: función de servidor asociada a una URL de API (`route.ts`).
- **Streaming**: envío de la respuesta por trozos según se genera.
- **NDJSON**: JSON delimitado por saltos de línea, un evento por línea.
- **Zod**: biblioteca de validación de datos en ejecución que también genera tipos.
- **Unión discriminada**: tipo con varias formas distinguidas por un campo (`type`).
- **tool_use / tool_result**: petición de herramienta del modelo y respuesta de tu código.
- **IDOR**: acceder a recursos de otro usuario cambiando un identificador.
- **FDE**: *Forward Deployed Engineer*, ingeniero que despliega soluciones directamente con el cliente.
