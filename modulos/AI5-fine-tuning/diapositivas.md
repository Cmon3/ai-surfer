---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI5 · Fine-tuning supervisado
## SFT · LoRA · QLoRA

*AI Surfer · N3-AI Engineering*

---

# Pipeline SFT

1. Dataset: (instrucción, respuesta) reales
2. Chat template con tokens especiales
3. **Máscara de pérdida**: solo aprende de la respuesta (-100)
4. Cross-entropy → AdamW → pocos pasos, validados

---

# Por qué la máscara

```
<instr>¿cuánto tarda el envío?<resp>El envío estándar…
        ↑ loss -100 (no aprende)              ↑ aprende
```

Entrenar el prompt también enseña al modelo a *repetir preguntas*, no a responder.

---

# LoRA

- Congela W (out×in), entrena ΔW = B·A con A (r×in), B (out×r)
- Parámetros entrenables: r·(in+out) ≪ out·in
- QLoRA: base congelada en 4 bits + LoRA en fp16 → 7B en una T4

---

# Qué suele romper un SFT

- Dataset pequeño/duplicado + épocas → memoriza
- Template inconsistente entre train/inferencia
- No enmascarar el prompt

---

<!-- _class: lead -->
# En Colab (opcional)

```
TRL SFTTrainer + PEFT LoRA
modelos abiertos 0.5–1B: Qwen / Gemma / SmolLM
```

El diagrama es el mismo; cambia la escala.
