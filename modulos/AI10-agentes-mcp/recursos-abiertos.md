# Módulo AI10 · Recursos abiertos recomendados

Complemento a los apuntes y al notebook. Todo gratuito. Revisa la licencia de cada recurso en [docs/recursos-y-licencias.md](../../docs/recursos-y-licencias.md) antes de incrustarlo en una plataforma de pago. Las URL son las documentaciones oficiales a oct. 2026: si alguna cambia, búscala por título.

## Por lección

| Lección | Recurso | Tipo |
|---|---|---|
| 10.1 | Model Context Protocol: *Introduction* y *Architecture* — https://modelcontextprotocol.io | documentación |
| 10.2 | SDK oficial de Python (`mcp`): README y ejemplos — https://github.com/modelcontextprotocol/python-sdk | documentación / código |
| 10.2 | Guía de Anthropic para escribir herramientas eficaces para agentes (*Writing tools for agents*) — https://www.anthropic.com/engineering | artículo |
| 10.3 | MCP Inspector (depurador visual de servidores) — https://github.com/modelcontextprotocol/inspector | herramienta |
| 10.3 | Especificación de MCP: transportes (stdio y HTTP) — https://modelcontextprotocol.io/specification | especificación |
| 10.4 | Anthropic: *Building effective agents* — https://www.anthropic.com/engineering/building-effective-agents | artículo |
| 10.5 | Documentación de la API de Claude: *Tool use*, *Tool runner* y *MCP connector* — https://platform.claude.com/docs | documentación |
| 10.6 | Anthropic: *How we built our multi-agent research system* — https://www.anthropic.com/engineering | artículo |
| 10.7 | Protocolo A2A (Agent2Agent): sitio y especificación — https://a2a-protocol.org | especificación |
| 10.8 | OpenTelemetry: *Python* (SDK) y convenciones semánticas de IA generativa — https://opentelemetry.io/docs/languages/python/ | documentación |
| 10.8 | Langfuse o Arize Phoenix: plataformas de observabilidad de LLM de código abierto — https://langfuse.com · https://phoenix.arize.com | herramienta |
| 10.9 | Anthropic: *Demystifying evals for AI agents* y guías de evaluación — https://www.anthropic.com/engineering | artículo |
| 10.9 | pytest: *Fixtures* y *Parametrizing tests* — https://docs.pytest.org | documentación |
| 10.10 | OWASP: *Top 10 for LLM Applications* (inyección de prompts, agencia excesiva) — https://genai.owasp.org | guía |
| 10.10 | Documentación de MCP: *Security best practices* — https://modelcontextprotocol.io | documentación |

## Cursos completos (para profundizar)
- **Model Context Protocol** y **Building with the Claude API** — cursos gratuitos de Anthropic Academy (comprueba el catálogo vigente).
- **AI Agents in LangGraph** (DeepLearning.AI) — orquestación con grafos, útil como contraste con el bucle manual.
- **Hugging Face Agents Course** — curso gratuito sobre agentes, con enfoque en frameworks abiertos.

## Práctica extra (recomendada)
- Conecta tu servidor MCP a un cliente real (por ejemplo, Claude Desktop o el MCP Inspector) usando el comando `python -m tiendasur_mcp.servidor` y comprueba cómo se ven tus descripciones.
- Envía tus spans a Langfuse o Phoenix local en lugar de la memoria: solo cambia el exportador.
- Añade a tu CI un job semanal que ejecute los evals con un modelo real y publique la tabla de resultados como comentario.
