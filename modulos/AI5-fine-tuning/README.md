# Módulo AI5 · Fine-tuning supervisado

**Semanas 8–9 de N3-AI · ~12 horas** · SFT (supervised fine-tuning), LoRA/QLoRA y el entrenamiento real en GPU — primero en juguete en CPU, luego en Colab T4.

## Objetivos
- Entrenar **desde cero un SFT**: dataset de instrucciones, chat template, cross-entropy con máscara de pérdida.
- Explicar **LoRA** (adaptadores de bajo rango) y QLoRA (cuantizado) con la matemática en 2 líneas.
- Preparar datos: qué entra, qué se enmascara (solo se aprende de la respuesta, no de la instrucción).
- Entrenar un SFT juguete en CPU y un modelo pequeño real en Colab (celda opcional).

## Notas de cómputo
- **Notebook:** SFT juguete (transformer de 2 capas, ~100k parámetros) en CPU (~2 min).
- **Colab T4:** celda final con `transformers`+`TRL`+`PEFT` (LoRA) sobre un modelo abierto pequeño (Qwen/Gemma/SmolLM 0.5–1B). Requiere GPU gratuita.

## Autoevaluación
1. ¿Por qué se enmascara la pérdida en la parte de la instrucción?
2. ¿Qué hace LoRA que no hace el full fine-tuning, y por qué ahorra VRAM?
3. ¿Qué es QLoRA y qué se cuantiza exactamente?
4. Tu SFT memoriza el dataset y no generaliza. ¿Dos causas probables?
5. ¿Por qué el chat template importa (tokens especiales)?

<details><summary>Respuestas</summary>
1. Porque solo quieres que el modelo aprenda a producir la respuesta; entrenar también la instrucción desaprovecha señal y fomenta copiar.
2. LoRA congela los pesos y entrena solo dos matrices de bajo rango (ΔW = A·B, r pequeño) por capa: 100–1000× menos parámetros y optimizer states; la VRAM se va en pesos congelados + adapters.
3. QLoRA = base cuantizada a 4 bits (congelada) + LoRA en precisión normal; se cuantizan los pesos base del modelo para que quepan.
4. Datos duplicados/demasiado pequeños (+épocas) o entrenas demasiado tiempo sin validación; también instrucciones casi idénticas.
5. Sin los tokens de rol/inicio-fin correctos, el modelo no aprende dónde empieza su turno ni cuándo parar.
</details>

## Lecturas
- [HF: PEFT/LoRA docs](https://huggingface.co/docs/peft) · [TRL SFTTrainer](https://huggingface.co/docs/trl/sft_trainer) · LoRA paper (Hu et al. 2021, arxiv 2106.09685).
