# Módulo AI4 · Evaluación de LLMs

**Semana 7 de N3-AI · ~8 horas** · El requisito que más se echa en falta en las ofertas reales: **conjuntos de evaluación, LLM-as-judge y calibración**. Sin eval, no sabes si el RAG/fine-tune/prompt es mejor que el anterior — opinas.

## Objetivos
Al terminar este módulo podrás:
- Construir un **conjunto de evaluación** (golden set) para tu caso: entradas realistas + salidas esperadas + criterios.
- Automatizar métricas objetivas: cobertura de citas, precisión de extracción (Pydantic), precisión de recuperación (RAG).
- Usar **LLM-as-judge** para criterios subjetivos (tono, utilidad) y entender sus sesgos (verborrea, auto-preferencia).
- **Calibrar** el juez: medir si coincide con humanos antes de fiarte.
- Analizar fallos de forma sistemática (matriz por categoría, no "miré unos pocos").

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 4.1 | Por qué eval, no vibes: el coste de un LLM malo en producción | 15 min |
| 4.2 | El golden set: 30–100 casos que cubren lo real | 20 min |
| 4.3 | Métricas objetivas: las que se calcúlcan sin LLM | 20 min |
| 4.4 | Métricas con modelo: similitud, LLM-as-judge | 20 min |
| 4.5 | Calibración del judge vs. etiquetas humanas | 15 min |
| 4.6 | Regresión: comparar A vs B con confianza, no con una muestra | 15 min |
| 4.7 | Análisis de fallos: taxonomía y priorización | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría |
| [`notebook.ipynb`](notebook.ipynb) | Práctica: golden set de TiendaSur + métricas + judge calibrado |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — construimos el **evaluador del asistente de AI2/AI3**: un golden set de 30 consultas con categoría y respuesta esperada; métricas objetivas (¿responde? ¿cita? ¿respeta la frase de escape?); similitud semántica (TF-IDF como stand-in); y un **LLM-as-judge** (con API si hay clave, mock que replica sesgos conocidos si no) que calibramos contra juicios "humanos" simulados. El resultado es una tabla de regresión A/B que ya puedes usar en tu proyecto.

## Notas de cómputo
- Todo corre en CPU. El judge con API es opcional; el mock muestra los sesgos reales (puntúa mejor lo largo, p.ej.) para calibrar.

## Caso práctico (entregable)
1. Golden set de 20 casos de TU dominio con 4 categorías y juicios esperados.
2. Métricas objetivas + judge (con o sin API) sobre 2 variantes de prompt/config.
3. Tabla de regresión + taxonomía de fallos (3 categorías mín.) y qué arreglarías primero.

**Criterios:** golden set razonable (25 %), métricas correctas (25 %), calibración honesta del judge (25 %), taxonomía y priorización (25 %).

## Autoevaluación
1. ¿Por qué 30 casos fijos y NO 100 nuevas preguntas cada vez?
2. LLM-as-judge: ¿por qué puede preferir la respuesta más larga?
3. ¿Cómo se calibra un judge sin humanas?
4. En regresión A/B, ¿por qué comparar con la misma seed y mismos casos, y no con muestras aleatorias?
5. Nombra un fallo que NO capture la similitud semántica y sí las métricas objetivas.

<details><summary>Respuestas</summary>

1. Para comparar A vs B: si cambias casos, comparas contra ruido. El golden set congelado es la vara de medir y su misma dificultad; casos nuevos se añaden con versión (v1.1) para el futuro.
2. Sesgo de verborrea: muchos judges puntúan más alto respuestas completas/extensas aunque digan lo mismo (o peor), porque la longitud se confunde con calidad. También sesgo de propia-plantilla (prefiere el estilo que le inculcaste).
3. Creando un sub-golden con juicios humanos (o esperados) y midiendo el acuerdo (accuracy/Kappa): si el judge da 60 %, no sirve para decidir.
4. Misma seed/casos: la comparación es controlada (mismas preguntas, mismo contexto); con muestras aleatorias la variabilidad del sampling puede superar el efecto de la mejora (necesitarías estadística para separar).
5. Exactitud factual de un dato numérico (el precio del pedido era 42, no 24) o una cita inventada ("[Facturas]" cuando el chunk era [Envíos]) — la similitud es alta y el fallo, grave.
</details>

## Lecturas y recursos
- [Anthropic docs: Evaluating LLM applications](https://docs.anthropic.com/en/docs/test-and-evaluate/develop-tests)
- [LLM-as-judge, surveys y críticas] — Zheng et al. (MT-Bench), *Judging LLM-as-a-Judge*.
- [OpenAI evals](https://github.com/openai/evals) y framework [Promptfoo](https://promptfoo.dev) y [Braintrust] — herramientas equivalentes.
