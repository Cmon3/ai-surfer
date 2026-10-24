# Módulo FS1 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh FS1`. Las demos se hacen sobre `app-inicial/` (y se compara con `app-solucion/`); ten abiertos el editor, la terminal y el navegador. Antes de grabar: `npm install` en ambas apps y comprobar que `npm run dev` arranca sin clave.

## FS1.1 · TypeScript esencial (15 min)
- [0–2] Gancho: un `JSON.parse(x) as Pedido` que compila y revienta en ejecución. Hilo del vídeo: «los tipos mienten si no los validas».
- [2–8] Tabla Python -> TypeScript en vivo (`Optional`, `Literal`, `dict`). `const`/`let`, `async`/`await`.
- [8–12] Unión discriminada con `Evento` de `protocolo.ts`; mostrar cómo el editor sugiere `e.texto` solo tras comprobar `e.type`.
- [12–15] `strict`, `unknown` vs `any`, `npx tsc --noEmit`: provocar un error y leerlo.

## FS1.2 · React (15 min)
- [0–3] Componente = función; JSX. Abrir `Chat.tsx` y señalar las tres partes (estado, eventos, JSX).
- [3–9] `useState`, `onChange`, `onSubmit` con `preventDefault`. Demo en el navegador.
- [9–13] Actualización funcional: romperlo a propósito (usar el estado capturado) y ver cómo se pierde texto en streaming.
- [13–15] `key` y `aria-live`: accesibilidad en una línea.

## FS1.3 · Next.js servidor vs cliente (20 min)
- [0–4] Tabla servidor/navegador. «Todo lo del navegador es público»: abrir las herramientas de desarrollo y buscar el código.
- [4–9] `page.tsx` (servidor) vs `Chat.tsx` (`"use client"`). Qué pasa si quitas la directiva (error de `useState`).
- [9–15] `route.ts`: JSON roto -> 400, contrato roto -> 422 (**TODO 5**). Probar con `curl`.
- [15–20] Demostración de la fuga: `NEXT_PUBLIC_` y búsqueda de la clave en `.next/static`; contraste con la variable de servidor. Insistir: mínima superficie pública.

## FS1.4 · Streaming (20 min)
- [0–4] Latencia percibida: comparar una respuesta completa vs por trozos (modo simulado con pausa grande).
- [4–10] `messages.stream`, `text_delta`, `finalMessage()`; reglas de API del brief (sin `temperature`, buscar bloques `text`).
- [10–16] NDJSON y `ReadableStream`; `leerEventos` y el test de la línea partida.
- [16–20] Cancelación (`cancel()`) y modo simulado como herramienta de desarrollo/demo. Si hay clave, ejecutar una vez con Claude real.

## FS1.5 · Herramientas, Zod y errores (20 min)
- [0–4] Qué es una herramienta: Claude pide, tu código ejecuta. Mostrar `HERRAMIENTAS`.
- [4–10] Zod y `safeParse`: completar **TODO 1 y 2** en directo y ver el test pasar a verde.
- [10–16] **TODO 3**: el bucle. Dibujar en la pizarra: asistente completo + un único mensaje de usuario con todas las `tool_result`. Mostrar el test con dos herramientas, una con error.
- [16–20] **TODO 4**: errores seguros, log vs mensaje. Mínimo privilegio (no devolver el cliente).

## FS1.6 · Despliegue (10 min)
- [0–3] `.gitignore`, `.env.example`, `.env.local`.
- [3–8] Demo (o capturas) de Vercel: importar, *Root Directory*, variable `ANTHROPIC_API_KEY`, desplegar, `curl` al endpoint.
- [8–10] Límite de gasto, rotación de claves y modo simulado como red de seguridad.

## FS1.7 · Autenticación (10 min)
- [0–3] Autenticación vs autorización con el ejemplo del pedido de otra persona (IDOR).
- [3–7] Cookie de sesión vs JWT vs OAuth; «no inventes tu sistema de contraseñas».
- [7–10] Dónde se comprueba (servidor), *rate limiting* e inyección de instrucciones. Cerrar con la lista «qué falta antes de abrir al público».

## FS1.8 · *Discovery* con cliente (15 min)
- [0–3] Escena: el cliente dice «quiero un chatbot». Pedir al alumnado que escriba tres preguntas antes de seguir.
- [3–9] Las seis áreas (problema, usuario, datos, riesgos, éxito, fuera de alcance). Ejemplo hablado de TiendaSur.
- [9–13] Rellenar la plantilla de una página con TiendaSur y mostrar cómo mapea a la app (herramienta, alcance de la demo).
- [13–15] Cómo presentar: caso feliz, caso de fallo, qué falta. Presentar el entregable del módulo.
