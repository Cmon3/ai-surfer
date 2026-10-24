# Módulo AI10 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh AI10`. Todas las demos se hacen sobre `proyecto-mcp/` generado por el notebook; ten abiertos a la vez el notebook, el editor y una terminal. Para la demo con Claude, define `ANTHROPIC_API_KEY` antes de abrir el notebook (todo lo demás funciona sin ella).

## 10.1 · Qué es MCP y por qué importa (15 min)
- [0–3] Gancho: tres agentes distintos de la empresa, cada uno con su propia integración «consultar pedido». N×M frente a N+M.
- [3–8] Servidor y cliente; las tres capacidades (herramienta, recurso, prompt) con la tabla «quién decide».
- [8–12] Transportes stdio y HTTP. Qué es JSON-RPC (mostrar un mensaje, sin entrar en detalle).
- [12–15] Qué MCP **no** hace: no mejora tus herramientas ni te protege solo. Adelanto del caso práctico.

## 10.2 · Escribir un servidor MCP (25 min)
- [0–4] Versiones: `MCPServer` (mcp 2.x) frente a `FastMCP` (1.x, la que verán en tutoriales).
- [4–12] `servidor.py`: decorador, docstring → descripción, tipos → esquema. Enseñar el JSON del esquema generado.
- [12–19] Decisiones de diseño: `Literal` para prioridad, mismo error para «no existe» y «no es tuyo», idempotencia, anotaciones como pistas.
- [19–23] Recursos y prompt: plantilla de URI.
- [23–25] Errores esperados: `ToolError` vs excepción cualquiera (demo de ambos en el log).

## 10.3 · Probar sin red ni clave (15 min)
- [0–5] Cliente en memoria: listar, llamar, error de argumentos, prioridad no permitida.
- [5–9] El mismo servidor por stdio como subproceso. Subrayar: no hereda tu entorno.
- [9–13] JSON-RPC en crudo: `initialize`, `tools/list`, `tools/call`. Desmitificar.
- [13–15] MCP Inspector como herramienta visual (demo rápida si hay tiempo).

## 10.4 · El agente que consume el servidor (25 min)
- [0–5] Repaso del bucle de AI3 y qué cambia: las herramientas vienen del servidor.
- [5–12] `Politica`: allowlist (filtrar antes de ofrecer + bloquear después), confirmación (por defecto, deniega), `max_pasos`.
- [12–18] Cerebro simulado y cerebro Claude: misma interfaz. Por qué importa para CI. Reglas de la API (todas las `tool_use` en un mensaje, `resp.content` completo).
- [18–25] Demo: tres tareas y la trayectoria. Repetir la de incidencia con `confirmar=False` y ver la herramienta bloqueada.

## 10.5 · Conectar con Claude (20 min)
- [0–5] Ejecutar el bucle con `CerebroClaude` (con clave) y comparar la trayectoria con la simulada.
- [5–12] *Tool runner* y `async_mcp_tool`: qué ganas y qué pierdes. Dónde pondrías la confirmación.
- [12–17] Conector MCP de la API: las dos piezas obligatorias y la cabecera beta. Cuándo sí.
- [17–20] Tabla de decisión.

## 10.6 · Multiagente (15 min)
- [0–4] Patrón supervisor/trabajadores.
- [4–10] Demo de `supervisor.py`: trabajador de lectura y trabajador de escritura. Leer la tabla de pasos/tokens/latencia con ojo crítico (el supervisor aquí son reglas; con un LLM habría una llamada más).
- [10–15] Cuándo NO: tareas lineales, contexto compartido, falta de medición. Regla: empieza con uno.

## 10.7 · A2A (8 min)
- [0–4] Tarjeta de agente y para qué sirve.
- [4–8] MCP vertical frente a A2A horizontal; cuándo importa. Avisar de que la especificación evoluciona.

## 10.8 · Observabilidad (20 min)
- [0–5] Por qué un log no basta. Árbol de spans.
- [5–11] OpenTelemetry: tracer, exportador en memoria y de consola; atributos `gen_ai.*`.
- [11–16] Coste y latencia por tarea a partir de los spans; tabla de las cuatro tareas.
- [16–20] Percentiles, presupuestos y datos personales en trazas.

## 10.9 · Evaluación de trayectorias y CI (25 min)
- [0–5] La respuesta correcta por el camino equivocado.
- [5–12] `casos.json` y `evaluar_trayectoria` comprobación a comprobación.
- [12–17] Ejecutar los 7 casos; después el agente vulnerable y ver cómo cae el eval.
- [17–22] pytest parametrizado, meta-test, `ci.yml`: cerebro simulado en PR, Claude en main.
- [22–25] Qué casos faltan siempre (fuera de ámbito, bucle) y cómo crecer el conjunto dorado.

## 10.10 · Seguridad (20 min)
- [0–4] Modelo de amenaza: texto no fiable que se convierte en acciones.
- [4–10] Demo de inyección en `notas` del pedido TS-1003: el agente ingenuo lo intenta, la allowlist lo frena, el eval lo marca.
- [10–15] Descripción envenenada y *rug pull*: huellas y patrones. Aclarar que los patrones son red de seguridad, no defensa.
- [15–20] Defensa en capas, fallar cerrado, el modelo no es frontera de seguridad. Enlace con AI8. Presentación del caso práctico y sus criterios.
