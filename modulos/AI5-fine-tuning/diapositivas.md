---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI5 · Fine-tuning supervisado
## Datos · plantillas · máscara · LoRA · QLoRA

*AI Surfer · N3-AI Engineering*

---

# Por qué este módulo

- Ofertas de AI/LLM Engineer: «LoRA/QLoRA, Hugging Face (`peft`, `trl`), datasets, evaluación»
- Lo que distingue: saber **cuándo no** ajustar, cuidar los datos y **medir contra el base**
- Entregable: un modelo abierto ajustado a un dominio tuyo, con evaluación

---

# ¿Prompt, RAG o fine-tuning?

| Falla… | Remedio |
|---|---|
| No conoce tus datos | **RAG** |
| No sigue formato/tono | Prompt → **SFT** |
| Es caro o lento | **SFT** de un modelo pequeño |

Primero evaluación (AI4). El SFT enseña **comportamiento**, no hechos cambiantes.

---

# Pipeline del SFT

1. Dataset de instrucciones (calidad > cantidad)
2. Chat template + tokens especiales
3. **Máscara de pérdida** (`-100` en el prompt)
4. Entrenar (LoRA/QLoRA) vigilando validación
5. Evaluar contra el base

---

# Datos: lista de comprobación

- Sin duplicados ni casi-duplicados
- División **sin fuga** (por formulación/documento)
- Respuestas consistentes y variadas
- Datos personales fuera, licencias claras
- Aumento solo en entrenamiento

---

# Chat template

```
<|im_start|>system … <|im_end|>
<|im_start|>user … <|im_end|>
<|im_start|>assistant
Respuesta<|im_end|>
```

- Usa **la del modelo base** (`apply_chat_template`)
- Mismo formato en entrenamiento e inferencia
- `<|im_end|>` = aprender a parar

---

# La máscara de pérdida

```
prompt  : -100 -100 -100 -100 -100
respuesta: El  envío  tarda  3-5  días  <|im_end|>
```

- `F.cross_entropy(..., ignore_index=-100)`
- Test: decodificar los tokens con label ≠ -100 = la respuesta
- Pesa mucho con prompts largos (RAG)

---

# LoRA

`W' = W + (α/r)·B·A` con A (r×in), B (out×r)

- Entrenables: `r·(in+out)` ≪ `out·in` (4096², r=8 → 0,4 %)
- **B = 0** al inicio: parte idéntico al base
- Se puede **fusionar** o servir como adaptador (MB)

---

# QLoRA: 7B en una T4

| Método | Memoria |
|---|---|
| Completo (bf16 + Adam) | ~80 GB |
| LoRA | ~15 GB |
| QLoRA (base 4 bits) | ~4–5 GB |

Base congelada en NF4 + adaptador en precisión normal.

---

# Leer las curvas

| Train / Val | Diagnóstico |
|---|---|
| ambas bajan | bien |
| train ↓, val ↑ | **sobreajuste** → parar en el mínimo |
| ambas planas y altas | infraajuste |

La pérdida no es la calidad: **genera y mide**.

---

# En Colab

```
BitsAndBytesConfig(4 bits) + LoraConfig + SFTConfig + SFTTrainer
```

- Comprueba el **modelo vigente** (0,5–3 B, Qwen/SmolLM/Gemma/Llama)
- Revisa la versión de TRL
- Evalúa base frente a ajustado; el adaptador hereda la licencia del base

---

<!-- _class: lead -->
# Resumen

**Datos limpios → plantilla correcta → máscara verificada → LoRA → curvas → evaluación**

Si no mides contra el base, no has hecho fine-tuning: has hecho una apuesta.
