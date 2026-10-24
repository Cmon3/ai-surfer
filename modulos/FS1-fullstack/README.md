# Módulo FS1 · Full-stack para AI Engineers

**N3-AI · optativo · ~10 horas** · Para quien viene de Python y quiere entrar en puestos de *AI Engineer* y, sobre todo, **Forward Deployed Engineer (FDE)**: el perfil que se sienta con el cliente, entiende su problema y le entrega una demo funcionando.

## Por qué este módulo
Las ofertas de oct. 2026 lo piden explícitamente (ver `docs/plan-v3-plataforma-y-empleabilidad.md`, sección 2.1):
- **HappyRobot · Forward Deployed Engineer:** full-stack React/TypeScript/Node + Python, *prompting* de LLM, integraciones con APIs de terceros, trato con cliente.
- **Galadrim · AI/ML Engineer junior:** full-stack (React/TS, Node), APIs de LLM, explicar conceptos a clientes.

Un modelo que solo vive en un notebook no lo puede usar el cliente. Este módulo te da la otra mitad: una **interfaz web con un asistente de IA que transmite la respuesta en directo, usa herramientas y no filtra tu clave**.

## Objetivos
Al terminar podrás:
- Leer y escribir **TypeScript** estricto sabiendo traducir lo que ya conoces de Python (tipos, `async`, módulos).
- Construir **componentes React** con estado y eventos, y saber qué corre en el servidor y qué en el navegador en **Next.js (App Router)**.
- Llamar a la API de Claude desde una *route handler* **sin exponer la clave** y con **streaming** hasta el navegador.
- Definir una **herramienta** (consultar pedido) y **validar con Zod** todo lo que viene del modelo y del usuario.
- Manejar errores sin filtrar secretos, escribir **tests con Vitest** de la lógica de servidor y ofrecer un **modo simulado** sin clave.
- Desplegar con variables de entorno y explicar las bases de la **autenticación**.
- Convertir una conversación de *discovery* con un cliente en una **demo** acotada.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| FS1.1 | TypeScript esencial para quien viene de Python | 15 min |
| FS1.2 | React: componentes, estado y eventos | 15 min |
| FS1.3 | Next.js: servidor vs cliente y *route handlers* | 20 min |
| FS1.4 | Streaming de la respuesta del modelo hasta el navegador | 20 min |
| FS1.5 | Herramientas, validación con Zod y errores | 20 min |
| FS1.6 | Despliegue y variables de entorno | 10 min |
| FS1.7 | Autenticación básica (concepto) | 10 min |
| FS1.8 | *Discovery* con cliente: de la conversación a la demo | 15 min |

## Materiales
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp) |
| [`app-inicial/`](app-inicial/) | Proyecto con 5 TODO que compila; los tests fallan hasta que lo completas |
| [`app-solucion/`](app-solucion/) | *Instructores:* aplicación completa, con tests y guía de despliegue |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Documentación y cursos gratuitos |
| [`guiones.md`](guiones.md) | *Instructores:* guiones de los vídeos |

**Requisitos:** Node.js 20 o superior (probado con 24) y npm. No necesitas clave de API: sin `ANTHROPIC_API_KEY` la app funciona en **modo simulado**. Con clave, usa `claude-opus-5-5`.

## Práctica guiada
1. `cd app-inicial && npm install && npm run dev` y abre http://localhost:3000: ya chatea en modo simulado.
2. `npm test`: verás 7 tests en rojo. Cada **TODO** del código los pone en verde:
   1. Esquema Zod de la herramienta. 2. Ejecutor de la herramienta. 3. Bucle de herramientas con streaming. 4. Mensajes de error seguros. 5. Validación de la petición en la *route handler*.
3. `npm run typecheck && npm run build` deben pasar al terminar.
4. (Opcional) Pon tu clave en `.env.local` y prueba con Claude real. Compara con `app-solucion/`.

## Caso práctico (entregable)
Adapta la app a **otro cliente ficticio** (una clínica, una inmobiliaria, un gimnasio...) y despliégala:
1. Documento de *discovery* de una página (lección FS1.8): problema, usuarios, datos disponibles, qué queda fuera de la demo.
2. Una herramienta propia con esquema Zod y al menos 3 casos de error probados.
3. Streaming funcionando y modo simulado para que cualquiera pueda probarlo sin clave.
4. Mínimo 8 tests con Vitest (herramienta, protocolo, bucle con cliente simulado, errores) y `tsc --noEmit` limpio.
5. URL desplegada (o capturas + guía de despliegue si no quieres publicar) y README con arquitectura, variables de entorno y limitaciones.

**Criterios:** funciona de verdad (streaming, herramienta, errores) 35 % · seguridad (clave solo en servidor, validación, sin secretos en el repo) 25 % · tests y tipos 20 % · *discovery* y README 20 %.

> Pieza de portafolio: un FDE se contrata por lo que ha entregado a un cliente. Esto es un mini-caso entregado, con su demo.

## Autoevaluación
1. ¿Por qué la clave de Anthropic no puede usarse en un componente de React del navegador?
2. ¿Qué diferencia hay entre `type` de TypeScript y validar con Zod?
3. ¿Qué ventaja tiene transmitir (*stream*) la respuesta en vez de esperar a que termine?
4. Claude pide dos herramientas a la vez. ¿Cómo respondes?
5. Un cliente te dice «quiero un chatbot con IA». ¿Qué preguntas haces antes de escribir código?

<details><summary>Respuestas</summary>

1. Todo el código del navegador es público: cualquiera puede ver la clave en las herramientas de desarrollo y gastar tu saldo. La clave vive solo en el servidor (variable de entorno) y el navegador llama a *tu* endpoint.
2. `type` solo existe al compilar: desaparece en ejecución y no comprueba datos reales. Zod valida en ejecución lo que llega de fuera (peticiones, salida del modelo) y además te da el tipo.
3. La latencia percibida baja de segundos a décimas: el usuario empieza a leer en cuanto llega el primer trozo, y puedes mostrar progreso («consultando el pedido...»).
4. Con un único mensaje de usuario que contiene una `tool_result` por cada `tool_use` (con su `tool_use_id`), después de devolver el contenido completo del asistente. Si falta una, la API da error.
5. Qué decisión o tarea mejora, quién lo usa, qué datos existen y dónde, qué pasa cuando falla, cómo se medirá el éxito y qué queda fuera. Sin eso, no hay demo, hay una promesa.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: *TypeScript for JavaScript Programmers*, el tutorial *Learn Next.js* y la guía de *streaming* de la documentación de Anthropic.
