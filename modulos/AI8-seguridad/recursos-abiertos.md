# Módulo AI8 · Recursos abiertos recomendados

Complemento a los apuntes y al notebook. Todo gratuito. Revisa la licencia de cada recurso en [docs/recursos-y-licencias.md](../../docs/recursos-y-licencias.md) antes de incrustarlo en una plataforma de pago. La normativa y las herramientas cambian: comprueba siempre la versión y el texto vigentes. Nada de esto es asesoramiento jurídico.

## Por lección

| Lección | Recurso | Tipo |
|---|---|---|
| 8.1 | OWASP, *Top 10 for LLM Applications* — https://genai.owasp.org/llm-top-10 | guía |
| 8.1 | Simon Willison, *The lethal trifecta for AI agents* (búscalo por el título en https://simonwillison.net) | lectura |
| 8.1 | NIST, *AI Risk Management Framework* — https://www.nist.gov/itl/ai-risk-management-framework | marco |
| 8.2 | Anthropic, documentación sobre moderación y barreras de seguridad (*guardrails*) — https://docs.anthropic.com | documentación |
| 8.2 | Inan et al., *Llama Guard: LLM-based Input-Output Safeguard* (2023) — https://arxiv.org/abs/2312.06674 | paper |
| 8.3 | Greshake et al., *Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection* (2023) — https://arxiv.org/abs/2302.12173 | paper |
| 8.3 | Simon Willison, serie *Prompt injection* — https://simonwillison.net/series/prompt-injection/ | lecturas |
| 8.3 | Model Context Protocol: documentación oficial (busca la sección de seguridad) — https://modelcontextprotocol.io | documentación |
| 8.4 | Anthropic, *Mitigate jailbreaks and prompt injections* (en la documentación de la API) — https://docs.anthropic.com | documentación |
| 8.5 | Garak, escáner de vulnerabilidades de LLM — https://github.com/NVIDIA/garak | herramienta |
| 8.5 | PyRIT, *Python Risk Identification Tool* — https://github.com/Azure/PyRIT | herramienta |
| 8.5 | Promptfoo, *red teaming* — https://www.promptfoo.dev/docs/red-team/ | herramienta |
| 8.6 | Microsoft Presidio, detección y anonimización de datos personales — https://microsoft.github.io/presidio/ | herramienta |
| 8.6 | AEPD (Agencia Española de Protección de Datos): guías sobre RGPD e inteligencia artificial — https://www.aepd.es | guías |
| 8.7 | OpenTelemetry, convenciones semánticas para IA generativa — https://opentelemetry.io/docs/specs/semconv/gen-ai/ | especificación |
| 8.7 | Langfuse, observabilidad de LLM de código abierto — https://langfuse.com/docs | herramienta |
| 8.8 | Reglamento (UE) 2016/679 (RGPD) y Reglamento (UE) 2024/1689 (IA): textos oficiales en https://eur-lex.europa.eu | normativa |
| 8.8 | *EU AI Act Explorer* (Future of Life Institute) — https://artificialintelligenceact.eu | consulta (no oficial) |
| 8.8 | AESIA (Agencia Española de Supervisión de la Inteligencia Artificial): información y calendario — comprueba su sitio oficial | autoridad |

## Cursos y lecturas para profundizar

- **OWASP GenAI Security Project** — guías de amenazas, defensa y *red teaming*: https://genai.owasp.org
- **Hugging Face, *Open-Source AI Cookbook*** — recetas de evaluación y seguridad: https://huggingface.co/learn/cookbook
- **DeepLearning.AI, cursos cortos sobre red teaming y seguridad de LLM** (revisa el catálogo vigente).

## Práctica extra (recomendada)

- Amplía la batería del notebook con 10 ataques tuyos (otros idiomas, instrucciones partidas en dos mensajes, texto oculto en un HTML) y mide qué capas los contienen.
- Ejecuta Promptfoo o Garak contra un asistente tuyo con un modelo real y compara con los resultados del asistente simulado.
- Añade a tu CI un test que falle si algún ataque de tu batería consigue su objetivo.
- Escribe el `SECURITY.md` de tu proyecto con el modelo de amenazas, la tabla antes/después y los riesgos aceptados.
