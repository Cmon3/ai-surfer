# App solución · Asistente de pedidos de TiendaSur (FS1)

Next.js (App Router) + TypeScript estricto + `@anthropic-ai/sdk` (`claude-opus-5-5`) + Zod + Vitest.

```bash
npm install
npm run typecheck && npm test && npm run build
npm run dev           # http://localhost:3000
```

## Arquitectura
```
navegador ──POST /api/chat (JSON)──▶ route handler (servidor)
   ▲                                    │ valida con Zod
   │  NDJSON en streaming               ▼
   └──── {texto}{herramienta}{fin} ◀── generarRespuesta()  ──▶ Claude (stream) ⇄ consultar_pedido
```
- `src/app/api/chat/route.ts`: única puerta de entrada; lee `ANTHROPIC_API_KEY` solo en el servidor.
- `src/lib/chat.ts`: bucle de herramientas con streaming; recibe el cliente por parámetro (testeable sin red).
- `src/lib/herramientas.ts`: esquema Zod + ejecutor de `consultar_pedido`.
- `src/lib/simulado.ts`: respuestas de prueba troceadas, sin clave.
- `src/components/Chat.tsx`: componente cliente que consume el flujo.

## Variables de entorno
| Variable | Obligatoria | Uso |
|---|---|---|
| `ANTHROPIC_API_KEY` | No (sin ella: modo simulado) | Clave de la API. Solo servidor. |
| `MODO_SIMULADO` | No | `true` fuerza el modo simulado aunque haya clave. |

## Despliegue (Vercel)

> ⚠️ **Antes de poner tu clave en un despliegue público:** esta app no tiene autenticación ni límite de peticiones. Cualquiera que encuentre la URL puede usar `/api/chat` con **tu** saldo. Haz al menos una de estas cosas:
> 1. Pon un **límite de gasto** bajo a la clave en la consola de Anthropic (o crea una clave solo para esta demo).
> 2. Activa la **protección del despliegue** de la plataforma (en Vercel: *Settings → Deployment Protection*), para que solo tú y quien invites podáis abrirla.
> 3. Para una demo pública en tu portafolio, despliega en **modo simulado** (`MODO_SIMULADO=true`, sin clave) y muestra la versión real en un vídeo.
>
> Y bórrala o rota la clave cuando termines.

1. Sube el repositorio a GitHub (sin `.env*`; ya está en `.gitignore`).
2. En Vercel: *Add New Project* -> importa el repo -> *Root Directory*: `modulos/FS1-fullstack/app-solucion` (o la carpeta de tu repo).
3. *Settings -> Environment Variables*: añade `ANTHROPIC_API_KEY` (entornos Production y Preview; **sin** prefijo `NEXT_PUBLIC_`, que expondría la variable al navegador).
4. Despliega y prueba `POST /api/chat` con `curl`. Los *route handlers* tienen un límite de duración por plan: comprueba el vigente y, si hace falta, ajusta `export const maxDuration` en la ruta.
5. Alternativas: cualquier plataforma con Node (Railway, Render, Fly.io) con `npm run build` y `npm start`; o Docker con `output: "standalone"`.
6. Antes de abrirlo al público: autenticación y límite de uso por usuario/IP (ver lección FS1.7).
