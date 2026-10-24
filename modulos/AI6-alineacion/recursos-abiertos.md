# Módulo AI6 · Recursos abiertos recomendados

Todo gratuito. Revisa la licencia de cada recurso en [docs/recursos-y-licencias.md](../../docs/recursos-y-licencias.md) antes de incrustarlo en una plataforma de pago.

## Por lección

| Lección | Recurso | Tipo |
|---|---|---|
| 6.1 | Ouyang et al., *Training language models to follow instructions with human feedback* (2022), arXiv 2203.02155 | artículo |
| 6.2 | Bradley y Terry (1952) y la explicación en la documentación de TRL sobre *Reward Modeling* — https://huggingface.co/docs/trl | documentación |
| 6.3 | Gao et al., *Scaling Laws for Reward Model Overoptimization* (2022), arXiv 2210.10760 | artículo |
| 6.3 | Schulman et al., *Proximal Policy Optimization Algorithms* (2017), arXiv 1707.06347 | artículo |
| 6.4 | Rafailov et al., *Direct Preference Optimization* (2023), arXiv 2305.18290 | artículo |
| 6.4 | TRL: *DPO Trainer* — https://huggingface.co/docs/trl/dpo_trainer | documentación |
| 6.5 | Shao et al., *DeepSeekMath* (2024), arXiv 2402.03300 (GRPO) | artículo |
| 6.5 | DeepSeek-AI, *DeepSeek-R1* (2025), arXiv 2501.12948 | artículo |
| 6.5 | TRL: *GRPO Trainer* — https://huggingface.co/docs/trl/grpo_trainer | documentación |
| 6.6 | Sharma et al., *Towards Understanding Sycophancy in Language Models* (2023), arXiv 2310.13548 | artículo |
| 6.7 | Documentación de MLflow *Tracking* — https://mlflow.org/docs/latest/ ; Weights & Biases (plan gratuito, comprueba condiciones vigentes) | documentación |
| 6.8 | HF Alignment Handbook — https://github.com/huggingface/alignment-handbook | código |
| 6.8 | Schulman, *Approximating KL Divergence* (blog, estimador k3) — http://joschu.net/blog/kl-approx.html | lectura |

## Cursos completos (para profundizar)
- Hugging Face *LLM Course*: https://huggingface.co/learn
- Notas del curso de RL de Hugging Face (*Deep RL Course*): https://huggingface.co/learn/deep-rl-course

## Cómo comprobar el modelo vigente
Busca en el Hub (https://huggingface.co/models) modelos `Instruct` de 0,5 a 3 B parámetros de las familias Qwen, SmolLM, Gemma o Llama; lee la **licencia** y la tarjeta de modelo. Comprueba también la versión de `trl` instalada: los nombres de los argumentos de `DPOConfig` y `GRPOConfig` cambian entre versiones.
