# Módulo AI10 · Agentes en producción: MCP, orquestación y observabilidad

**N3 · Especialización AI Engineering · ~10 horas** · AI3 te enseñó a escribir un bucle de agente con herramientas pegadas al código. Este módulo te enseña lo que piden las ofertas de *AI Engineer* hoy: **herramientas estándar (MCP)**, agentes que se pueden **observar, evaluar en CI y asegurar**.

## Objetivos
Al terminar este módulo podrás:
- Explicar qué es **MCP** (herramientas, recursos, prompts, transportes) y por qué un agente lo prefiere a una integración REST hecha a medida.
- Escribir un **servidor MCP en Python** con el SDK oficial y diseñar herramientas con buenas descripciones, esquemas, anotaciones y errores.
- **Probarlo sin red ni clave** con un cliente en memoria y por stdio (subproceso), y entender el protocolo JSON-RPC que hay debajo.
- Conectarlo a un **bucle de agente con Claude**: bucle manual, *tool runner* y conector MCP de la API, y saber cuál elegir.
- Decidir entre **un agente y varios (supervisor/trabajadores)** y reconocer cuándo el multiagente solo añade coste; situar **A2A** frente a MCP.
- Instrumentar el agente con **trazas OpenTelemetry**: coste y latencia por tarea.
- Escribir **evaluaciones de trayectorias** (herramientas correctas, orden, sin acciones prohibidas) y ejecutarlas en **CI con pytest**.
- Aplicar **seguridad en capas**: inyección por descripciones y por resultados, mínimo privilegio, allowlist, confirmación humana.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 10.1 | Qué es MCP y por qué importa: herramientas, recursos, prompts, transportes | 15 min |
| 10.2 | Escribir un servidor MCP en Python (SDK oficial) | 25 min |
| 10.3 | Probar el servidor sin red ni clave: en memoria, stdio y JSON-RPC en crudo | 15 min |
| 10.4 | El agente que consume el servidor: política, confirmación humana y límites | 25 min |
| 10.5 | Conectar con Claude: bucle manual, *tool runner* y conector MCP | 20 min |
| 10.6 | Multiagente: supervisor y trabajadores (y cuándo no usarlo) | 15 min |
| 10.7 | A2A y el ecosistema de protocolos de agentes | 8 min |
| 10.8 | Observabilidad: trazas, coste y latencia por tarea | 20 min |
| 10.9 | Evaluación de trayectorias y evals en CI | 25 min |
| 10.10 | Seguridad de agentes con herramientas | 20 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección y glosario |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; el PDF se genera con `scripts/generar_diapositivas.sh`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada: construye el proyecto completo paso a paso |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Documentación y cursos gratuitos recomendados |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Qué piden las ofertas
En las ofertas de *AI Engineer* y *LLM Engineer* (oct. 2026) se repiten: **MCP / integración de herramientas**, agentes con bucles de herramientas, **evaluación de agentes**, **observabilidad/tracing** de aplicaciones LLM y **seguridad (prompt injection)**. Este módulo cubre las cinco y termina en una pieza de portafolio que las demuestra juntas.

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — agente de soporte de **TiendaSur**. El notebook escribe, archivo a archivo, un repositorio completo en `proyecto-mcp/`: servidor MCP (3 herramientas, 2 recursos, 1 prompt), cliente en memoria y por stdio, agente con allowlist y confirmación humana, cerebro simulado y cerebro con Claude, trazas OpenTelemetry, multiagente mínimo, auditoría de herramientas, 7 casos de evaluación de trayectorias, 31 tests con pytest, `ruff` y un flujo de GitHub Actions. **Funciona sin clave de API**; con `ANTHROPIC_API_KEY` las celdas marcadas usan Claude.

**Requisitos:** `pip install mcp anthropic opentelemetry-sdk pytest ruff pandas`. Se verificó con `mcp` 2.3 (en 2.x el servidor de alto nivel se llama `MCPServer`; en 1.x, `FastMCP`). Se ejecuta en CPU en menos de un minuto.

## Caso práctico (entregable)
Publica en **GitHub** un repositorio con:
1. Un **servidor MCP propio** de un dominio que elijas (no TiendaSur): al menos 3 herramientas (una con efectos), 1 recurso y descripciones/esquemas cuidados.
2. Un **agente** que lo consume con allowlist, confirmación humana para acciones con efectos y límite de pasos.
3. **Trazas** por tarea con coste y latencia (OpenTelemetry o JSON propio con la misma forma).
4. Al menos **8 casos de evaluación de trayectorias** (incluye uno de inyección y uno de acción sin confirmar) y un meta-test que demuestre que el eval detecta una regresión.
5. **CI en verde** (GitHub Actions: lint + tests + evals) y un README con: problema, cómo ejecutarlo en 3 comandos, decisiones de seguridad, coste por tarea y limitaciones.

**Criterios:** servidor MCP bien diseñado (descripciones, esquemas, errores, mínimo privilegio) 25 % · evals de trayectorias y CI en verde 30 % · seguridad (allowlist, confirmación, tratamiento de datos no fiables) 20 % · observabilidad (trazas, coste, latencia) 15 % · README y limitaciones honestas 10 %.

> Este repositorio es exactamente lo que un entrevistador técnico quiere ver cuando lees «agentes» y «MCP» en tu CV: no solo que funciona, sino que **sabes demostrar que sigue funcionando**.

## Autoevaluación
1. ¿Qué tres tipos de capacidades puede exponer un servidor MCP y en qué se diferencian?
2. ¿Por qué un agente que usa MCP no necesita código específico para cada herramienta?
3. Una herramienta crea registros. ¿Qué tres medidas la protegen en este módulo?
4. ¿Por qué evaluar la trayectoria y no solo la respuesta final?
5. Un servidor de terceros que aprobaste hace un mes cambia la descripción de una herramienta. ¿Cómo te enteras?

<details><summary>Respuestas</summary>

1. **Herramientas** (acciones que el modelo decide invocar, con esquema), **recursos** (datos que se leen por URI, normalmente controlados por la aplicación) y **prompts** (plantillas que el usuario elige). Se diferencian en quién las controla: el modelo, la aplicación o la persona.
2. Porque el cliente las **descubre en tiempo de ejecución** (`tools/list`): nombre, descripción y esquema vienen del servidor. Añadir una herramienta al servidor la hace disponible para todos los clientes sin tocar el agente.
3. **Confirmación humana** antes de ejecutarla, **validación en el servidor** (prioridad restringida a `baja`/`normal`, verificación de propiedad del pedido) e **idempotencia** (el mismo pedido y asunto devuelven el mismo ticket). Además, límite de pasos y trazas para auditar.
4. Porque un agente puede acertar la respuesta por el camino equivocado: consultar datos ajenos, ejecutar acciones sin confirmar, repetir llamadas o dar demasiadas vueltas. La trayectoria revela fallos de seguridad, eficiencia y coste que la respuesta final esconde.
5. Con **fijación de huellas** (*pinning*): guardas un hash de nombre+descripción+esquema de lo que aprobaste y lo comparas en cada conexión; un cambio (*rug pull*) hace fallar la auditoría. Complemento: un test en CI que compare las huellas con un archivo versionado.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: la especificación y documentación oficial de MCP, la guía de Anthropic *Building effective agents* y la documentación de OpenTelemetry sobre convenciones semánticas de IA generativa.
