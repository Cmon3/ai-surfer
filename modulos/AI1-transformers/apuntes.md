# Módulo AI1 · Transformers por dentro — Apuntes

> Objetivo: que un transformer deje de ser una "caja mágica" para ser un objeto que puedes dibujar, implementar y depurar. Todo el módulo se materializa en el notebook: tokenizer BPE, atención a mano en NumPy y un GPT mínimo en PyTorch.

---

## 1.1 · De embedding al transformer

Un transformer es una **pila de bloques** que transforman una secuencia de vectores en otra secuencia de vectores. La secuencia entra como tokens (IDs) → embeddings → bloques que mezclan información entre tokens, capa a capa.

**Por qué ganó a las LSTM (2017):**
- **Paralelismo**: toda la secuencia se procesa a la vez (no token por token).
- **Conexiones largas**: dos tokens muy lejanos se conectan en una sola capa (atención), no en 20 pasos de recursión.
- Resultado: entrenar con más datos/cómputo dejó de estar bloqueado por la arquitectura.

**Familias:**
- **Decoder-only (GPT)**: predice el siguiente token. Es lo que hacemos aquí y lo que usan los LLMs.
- **Encoder-only (BERT)**: bidireccional, para clasificación/represtentación.

---

## 1.2 · Tokenización: del texto a los IDs

El modelo no lee texto: lee **enteros** (IDs de tokens). Quien convierte es el **tokenizer**.

**Jerarquía de estrategias:**

| Nivel | Ejemplo "tiendássurf" | Problema |
|---|---|---|
| Caracteres | `'t','i','e','n','d','a'` | Secuencias larguísimas, poco contexto |
| Palabras | `'tienda','surf'` | Vocabulario enorme + palabras raras |
| **Subword (BPE)** | `'tien','da','surf'` | Balance: vocab. mediano, secuencias razonables |

**BPE (Byte Pair Encoding):** empieza por caracteres y, durante el entrenamiento del tokenizer, **fusiona iterativamente el par más frecuente** en un nuevo token. Al final tienes un vocabulario que contiene letras, sílabas y las palabras más comunes como un solo token.

**Por qué es la elección de GPT/LLMs:** secuencias más cortas que charset puro, vocab delimitado (saturando, no creciendo al infinito) y generalización a lo inédito (siempre puedes retroceder a caracteres/bytes).

---

## 1.3 · Atención: la idea en una frase

> **Cada token pregunta a los demás "¿qué me importa de ti?" y recibe una mezcla de sus contenidos.**

Tres proyecciones por token, aprendidas:

- **Query (Q)**: lo que el token busca.
- **Key (K)**: lo que cada token ofrece para ser buscado.
- **Value (V)**: el contenido que se trasmite si el "match" es alto.

```
Atención(Q,K,V) = softmax( Q Kᵀ / √d ) · V
```

**Lectura:** `Q · Kᵀ` da todas las afinidades (score) entre tokens; el `softmax` las convierte en pesos que suman 1 por fila; esos pesos ponderan los `V` que cada token "recibe".

---

## 1.4 · Softmax, escala y máscara causal

**Softmax:** convierte scores arbitrarios en probabilidades (positivas que suman 1).

**Escala por √d:** d = dimensión de la proyección. Sin escalar, los productos dot crecen con d y el softmax se vuelve *peakhisimo* (un token absorbe toda la atención y el gradiente se atasca). Con la escala, los scores viven en un rango donde el softmax es "sano".

**Máscara causal (GPT):** el token *i* **no puede** ver tokens futuros. Se fuerza poniendo `-inf` (o -1e9) en los scores superiores a la diagonal antes del softmax: al pasar por softmax quedan con peso 0. Es lo que separa a un decoder-only (autoregressivo) de un encoder bidireccional (BERT).

**Multi-head:** repetir esta operación en `h` cabezas (cada una con sus Q/K/V de menor dimensión) y concatenar. Cada cabeza puede especializarse ("sujeto-verbo", "tema-contexto"…).

---

## 1.5 · Bloque transformer

Un bloque (el ladrillo que se repite N veces):

```
x ← x + Atención(Norm(x))      # la atención mezcla entre tokens
x ← x + MLP(Norm(x))           # el MLP procesa CADA token por separado
```

- **Normalización (LayerNorm):** estabiliza por token, media/varianza por canal.
- **Conexión residual (x + …):** la salida "recuerda" la entrada. Permite profundidad: el gradiente fluye directo y el modelo aprende *correcciones* sobre lo anterior, no cada bloque desde cero.
- **MLP:** 2 capas lineales con activación no lineal (típicamente GELU) — el "cómputo" por token; la atención es el "canal".

**GPT mínimo:** `N` bloques (aquí 2), embeddings de tokens + embeddings posicionales (que codifican el orden — atención es "ciega" al orden por sí sola).

---

## 1.6 · Entrenamiento: qué se predice

**Tarea:** para cada posición, predecir el **siguiente token**.

- Entrada: tokens `[t1 … t100]`
- Objetivo: los mismos tokens desplazados `[t2 … t101]` (no hay etiquetas más allá del propio texto)
- Pérdida: **cross-entropy** entre la distribución del modelo y el token real (una por posición, promediar).

**Por qué cross-entropy y no MSE:** la salida es una distribución categorial sobre vocabulario (argmax o sampling), no un número. Cross-entropy es la log-verosimilitud correcta para eso y castiga fuertemente cuando el modelo pone casi toda la masa en el token incorrecto.

---

## 1.7 · GPT mínimo en PyTorch (lo que hacen las prácticas)

Nuestro GPT (~70k parámetros, juguete):

```python
class GPT(nn.Module):
    def __init__(self, vocab, dim=64, heads=4, layers=2, ctx=32): ...
        # token_embedding + pos_embedding
        # N × [atención_causal + MLP]
        # output layer: → vocab

    def forward(self, idx):
        # idx: (B, T) → logits (B, T, vocab)
```

**Notas de entrenamiento en CPU:**
- Corpus toy (decenas de frases) → vocabulario pequeño → es viable sin GPU.
- `AdamW` con lr 3e-4 y 200–500 pasos alcanzan loss razonable para juguete.
- Generación: sampling con `torch.multinomial` sobre los logits del último token, usando `temperature` para variar creatividad.

**Lo que dejan claro estos 2 capas:** mismo mecanismo que GPT-4 (atención causal + MLP + residual), solo con escala distinta. "Escalar" significa: más capas, más cabezas, más datos, más cómputo, **con el mismo diagrama**.

---

## 1.8 · Ecosistema Hugging Face

- **`datasets`**: datasets públicos con una sola llamada (`load_dataset`), o datasets propios.
- **`tokenizers`**: BPE entrenado rápido (Rust), o tokenizers preentrenados de modelos conocidos.
- **`transformers`**: miles de modelos preentrenados (`AutoModelForCausalLM.from_pretrained`) que cargas y finetuneas.
- Patrón típico del ecosistema: *tokizador del modelo X* + *modelo X* + *tu dataset* + *Trainer* (o un loop como nuestro GPT mínimo, más simple e informativo).

**En la práctica de este módulo** usamos HF como ejercicio opcional (requiere Colab con GPU) para: cargar un modelo pequeño preentrenado, tokenizar con su tokenizer y generar. En AI5 (fine-tuning) lo retomamos a fondo con LoRA/QLoRA.
