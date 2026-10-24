# Capstone AI · Dos opciones de entregable

Elige **una** de las dos opciones. La **Opción A** (fine-tune + eval + deploy) es la ruta original; la **Opción B** (agente con servidor MCP propio + evaluación + despliegue) cubre el perfil de *AI Engineer* orientado a agentes y se apoya en el módulo [AI10](../AI10-agentes-mcp/README.md). Ambas comparten la exigencia de **evaluación honesta** y **seguridad mínima**.

## Opción A · Fine-tune + eval + deploy

**Entregable final de la especialización AI Engineering.**

## Objetivo
Ajustar un **modelo abierto pequeño** (0.5–1.5B) para un caso de uso concreto, con evaluación propia y despliegue funcional. Se publica en Hugging Face.

## Entregables (repo GitHub + HF)
| Requisito | Detalle |
|---|---|
| Caso de uso | 1 párrafo: tarea, dominio, usuario y criterio de éxito |
| Dataset SFT | ≥ 50 pares (instrucción, respuesta) propios, con chat template consistente |
| Fine-tune | QLoRA (TRL+PEFT) en Colab T4, con config registrada (seed, β, épocas) |
| Evaluación | Golden set ≥ 30 casos (AI4) + métricas objetivas + judge calibrado |
| Comparativa | Base vs fine-tune en la tabla de regresión (por categoría) |
| Despliegue | Variante 1: HF Inference API; variante 2: vLLM server + endpoint FastAPI |
| Seguridad | Moderador + defensa anti-inyección + acciones con confirmación (AI8) |
| README | Qué hace, cómo ejecutar, coste, limitaciones |

## Rúbrica (100 pts)
| Criterio | Máximo |
|---|---|
| Caso y dataset (calidad, consistencia de template) | 20 |
| Fine-tune correcto y reproducible (config registrada) | 20 |
| Evaluación honesta (golden set + calibración del judge) | 25 |
| Mejora demostrable vs base en regresión | 15 |
| Despliegue funcional + seguridad mínima | 15 |
| README y limitaciones | 5 |

---

## Opción B · Agente con servidor MCP propio + evaluación + despliegue

**Perfil:** *AI Engineer* de aplicaciones con agentes. En lugar de ajustar un modelo, construyes un **agente útil, medible y seguro** sobre herramientas estándar. Se apoya en el módulo AI10 (y en AI4 para evaluación y AI8 para seguridad).

### Objetivo
Entregar un agente para un dominio real o realista (soporte, reservas, finanzas personales, gestión de tareas...) que consuma un **servidor MCP escrito por ti**, con evaluación de trayectorias en CI y un despliegue funcional.

### Entregables (repo GitHub)
| Requisito | Detalle |
|---|---|
| Caso de uso | 1 párrafo: tarea, usuario, qué acciones tienen efectos y criterio de éxito |
| Servidor MCP propio | SDK oficial `mcp`; ≥ 3 herramientas (al menos 1 con efectos), ≥ 1 recurso; descripciones y esquemas cuidados, errores útiles, validación y propiedad de los datos en el servidor |
| Agente | Bucle propio o *tool runner*; allowlist de herramientas, **confirmación humana** para acciones con efectos, límite de pasos; funciona con Claude y tiene un camino simulado sin clave |
| Observabilidad | Trazas por tarea (OpenTelemetry o JSON propio con la misma forma): tokens, **coste y latencia por tarea**; informe de p50/p95 |
| Evaluación | Conjunto dorado ≥ 15 casos de **trayectorias** (camino feliz, datos que faltan, acción sin confirmar, inyección, fuera de ámbito) + comprobación de la respuesta final con juez calibrado (AI4) en una muestra; meta-test que demuestre que el eval detecta una regresión |
| CI | GitHub Actions: lint + tests + evals deterministas en cada PR; evals con modelo real solo en `main`, con umbral de aprobados |
| Seguridad | Auditoría/huellas de las herramientas, tratamiento de resultados como datos no fiables, mínimo privilegio, informe de al menos 3 ataques probados (AI8) |
| Despliegue | Servidor MCP accesible por HTTP (contenedor Docker) **y** agente expuesto con FastAPI, o bien servidor empaquetado para uso local por stdio con instrucciones verificables; `Dockerfile` que construye |
| README | Qué hace, cómo ejecutarlo en 3 comandos, decisiones de diseño, coste por tarea, limitaciones |

### Rúbrica (100 pts)
| Criterio | Máximo |
|---|---|
| Caso de uso y diseño del servidor MCP (herramientas, esquemas, errores, mínimo privilegio) | 20 |
| Agente correcto: política, confirmación humana, límites, modo simulado | 15 |
| Evaluación honesta: trayectorias + respuesta final, meta-test, CI en verde | 25 |
| Observabilidad: trazas, coste y latencia por tarea analizados | 10 |
| Seguridad: ataques probados y defensas en capas | 15 |
| Despliegue funcional | 10 |
| README y limitaciones | 5 |

> Punto de partida: el repositorio `proyecto-mcp/` que genera el notebook de AI10. Cámbiale el dominio, amplía los casos de evaluación y despliégalo; copiarlo sin adaptarlo no puntúa.
