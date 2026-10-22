---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI1 · Transformers por dentro
## Atención · tokenización · GPT mínimo en PyTorch

*AI Surfer · N3-AI Engineering*

---

# Mapa del módulo

| Pieza | Pregunta que responde |
|---|---|
| Tokenización (BPE) | ¿Cómo pasa el texto a enteros? |
| Atención | ¿Cómo "entiende" cada token a los demás? |
| Bloque transformer | ¿Cómo se apilan atención + MLP? |
| Entrenamiento | ¿Qué se predice y con qué pérdida? |
| GPT mínimo | ¿Puedo escribirlo yo en PyTorch? |
| Hugging Face | ¿Cómo se usa un modelo preentrenado? |

---

# Tokens: del texto a los IDs

- Caracteres: secuencias larguísimas
- Palabras: vocabulario enorme
- **BPE (subwords)**: balance — el estándar de GPT/LLMs

BPE fusiona iterativamente el **par de tokens más frecuente**.

---

<!-- _class: lead -->
# Atención: cada token pregunta y responde

---

# Query · Key · Value

- **Q** (query): qué busca el token
- **K** (key): qué ofrece para ser buscado
- **V** (value): el contenido que se trasmite

```
Atención(Q,K,V) = softmax(QKᵀ/√d)·V
```

---

# La escala por √d

- Los productos dot crecen con d
- Softmax con scores grandes → hiperpuntual → gradiantes atascados
- /√d mantiene los scores en un rango "sano"

---

# Máscara causal

- El token i **no puede** ver el futuro
- `-inf` por encima de la diagonal → softmax → peso 0
- Es lo que separa a **GPT** (autoregresivo) de **BERT** (bidireccional)

---

# Bloque transformer

```
x ← x + Atención(Norm(x))    # mezcla ENTRE tokens
x ← x + MLP(Norm(x))         # cómputo POR token
```

- Residual: el gradiente fluye con profundidad
- LayerNorm: estabilidad

---

# Entrenamiento: predicir el siguiente token

- Entrada: `[t₁ … tₙ]` → objetivo: `[t₂ … tₙ₊₁]`
- Pérdida: **cross-entropy** (distribución sobre el vocab)

> No MSE: la salida es categorical, no un número.

---

# El notebook: GPT mínimo

- ~70k parámetros, 2 capas, 4 cabezas, ctx=32
- Entrena en CPU en <1 min con corpus de 24 frases
- **Exactamente el mismo diagrama que GPT-4** — menos escala

---

# Hugging Face (opcional, Colab)

```python
tok = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")
model.generate(**tok(text, return_tensors="pt"))
```

En AI5 volvemos con LoRA/QLoRA para ajustarlo a tu caso.

---

<!-- _class: lead -->
# Resumen

**BPE → atención causal → bloques → cross-entropy → escalar**

Lo que sigue: aplicaciones con LLMs (AI2) y RAG/agentes (AI3).
