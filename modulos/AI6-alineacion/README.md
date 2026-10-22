# Módulo AI6 · Alineación y post-entrenamiento

**Semana 10 de N3-AI · ~10 horas** · De "sabe responder" a "responde como quieres": datos de preferencias, RLHF/DPO/GRPO y reproducibilidad.

## Objetivos
- Entrenar un **modelo de recompensa (RM)** a partir de pares preferidos/rechazados.
- Explicar la **pérdida DPO** (optimización de preferencia directa) y por qué evita el RL explícito.
- Simular un **GRPO** (recompensa por grupo) con una política de juguete.
- Documentar experimentos: seed, datos, config y comparación fair (AI4).

## Notas de cómputo
Todo el notebook corre en CPU: RM logístico en features de juguete + política con 2 acciones. El flujo real (trl.PPOTrainer/DPOTrainer) queda como esqueleto Colab.

## Autoevaluación
1. ¿Por qué DPO necesita un modelo de referencia (frozen)?
2. ¿Qué problema resuelve GRPO respecto a PPO?
3. Tu alineación sobre-correge (respuestas tibias). ¿Dos causas?
4. ¿Por qué los pares de preferencias deben venir de la *misma* instrucción?

<details><summary>Respuestas</summary>
1. Para no desbarrar: la pérdida DPO compara la política contra la política inicial (también congelada); sin referencia, la optimización de preferencia se dispara.
2. PPO necesita un value model (crítico) entrenado en línea; GRPO usa recompensas por grupo (normaliza dentro del lote de respuestas) — menos cómputo, menos estabilidad que RLHF clásico.
3. Datos con respuestas preferidas demasiado conservadoras (dataset sesgado) o β de DPO demasiado alta (castiga mucho alejarse de la referencia).
4. La preferencia debe ser por la **respuesta**, no por la dificultad de la instrucción — con instrucciones distintas el modelo aprende a preferir instrucciones fáciles.
</details>

## Lecturas
- DPO: Rafailov et al. (2023), arxiv 2305.18290 · GRPO: Shao et al. (DeepSeek-Math, 2402.03300)
- [HF TRL DPOTrainer](https://huggingface.co/docs/trl/dpo_trainer)
