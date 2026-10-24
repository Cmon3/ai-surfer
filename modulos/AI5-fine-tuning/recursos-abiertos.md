# Módulo AI5 · Recursos abiertos recomendados

Todo gratuito. Revisa la licencia de cada recurso en [docs/recursos-y-licencias.md](../../docs/recursos-y-licencias.md) antes de incrustarlo en una plataforma de pago.

## Por lección

| Lección | Recurso | Tipo |
|---|---|---|
| 5.1 | Anthropic y Hugging Face: guías sobre cuándo ajustar frente a RAG y *prompting* (busca «when to fine-tune» en sus documentaciones) | documentación |
| 5.2 | Hugging Face `datasets`: *Process* y *Create a dataset* — https://huggingface.co/docs/datasets | documentación |
| 5.2 | Zhou et al., *LIMA: Less Is More for Alignment* (2023), arXiv 2305.11206 — calidad frente a cantidad | artículo |
| 5.3 | Hugging Face `transformers`: *Chat templates* — https://huggingface.co/docs/transformers/chat_templating | documentación |
| 5.3 | Hugging Face `tokenizers`: *Quicktour* (BPE) — https://huggingface.co/docs/tokenizers | documentación |
| 5.4 | TRL: *SFT Trainer* (prompt/completion, `completion_only_loss`) — https://huggingface.co/docs/trl/sft_trainer | documentación |
| 5.5 | Hu et al., *LoRA: Low-Rank Adaptation of Large Language Models* (2021), arXiv 2106.09685 | artículo |
| 5.5 | PEFT: *LoRA conceptual guide* — https://huggingface.co/docs/peft | documentación |
| 5.6 | Dettmers et al., *QLoRA: Efficient Finetuning of Quantized LLMs* (2023), arXiv 2305.14314 | artículo |
| 5.6 | Hugging Face: guía de `bitsandbytes` y cuantización — https://huggingface.co/docs/transformers/quantization | documentación |
| 5.7 | Biderman et al., *LoRA Learns Less and Forgets Less* (2024), arXiv 2405.09673 — olvido y capacidad | artículo |
| 5.8 | HF Alignment Handbook (recetas reproducibles) — https://github.com/huggingface/alignment-handbook | código |
| 5.8 | Hugging Face Hub: *Model cards* — https://huggingface.co/docs/hub/model-cards | documentación |

## Cursos completos (para profundizar)
- Hugging Face *LLM Course* (gratuito): capítulos de `transformers`, `datasets` y ajuste fino — https://huggingface.co/learn
- Documentación de **Unsloth** y **Axolotl** (herramientas abiertas que simplifican LoRA/QLoRA): comprueba su estado y licencia vigentes.

## Cómo comprobar el modelo vigente
Busca en el Hub (https://huggingface.co/models) modelos `Instruct` de 0,5 a 3 B parámetros de las familias Qwen, SmolLM, Gemma o Llama; ordena por descargas/tendencia y lee la **licencia** y la tarjeta de modelo antes de elegir.
