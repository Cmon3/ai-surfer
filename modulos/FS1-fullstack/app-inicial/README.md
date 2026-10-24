# App inicial · Asistente de pedidos de TiendaSur (FS1)

Proyecto con **5 TODO** marcados en el código. Compila y arranca en modo simulado desde el primer minuto; los tests fallan hasta que completas cada TODO (desarrollo guiado por tests).

```bash
npm install
npm run typecheck     # debe pasar siempre
npm test              # al principio fallan 7 tests: ese es tu objetivo
npm run dev           # http://localhost:3000 (sin clave = modo simulado)
```

| TODO | Archivo | Qué hacer |
|---|---|---|
| 1 | `src/lib/herramientas.ts` | Esquema Zod estricto de `consultar_pedido` |
| 2 | `src/lib/herramientas.ts` | `ejecutarHerramienta`: validar, buscar, ocultar el cliente |
| 3 | `src/lib/chat.ts` | Bucle de herramientas con streaming (todas las `tool_result`) |
| 4 | `src/lib/chat.ts` | Mensajes de error seguros para 401/429/5xx |
| 5 | `src/app/api/chat/route.ts` | Validar la petición con Zod y responder 400/422 |

Para probar con Claude real: copia `.env.example` a `.env.local` y pon tu `ANTHROPIC_API_KEY`. La clave solo la lee el servidor.
