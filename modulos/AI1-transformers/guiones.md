# Módulo AI1 · Guiones de grabación

Regla del módulo: **intuición primero, código después**. El notebook es la demo; el vídeo explica por qué.

## 1.1 · Por qué el transformer ganó (15 min)
- [0–3] Gancho: "antes, 2014: LSTM token por token; hoy un transformer procesa la frase entera a la vez".
- [3–8] Diagrama: encoder/decoder/decoder-only (GPT/BERT).
- [8–13] Los 3 motivos: paralelismo, conexiones largas, escala.
- [13–15] Mapa del módulo (esto es lo que vas a construir).

## 1.2 · Tokenización BPE (20 min)
- [0–3] El modelo lee enteros, no texto.
- [3–10] Los 3 niveles: char/palabra/subword, con ejemplos de TiendaSur.
- [10–16] BPE en vivo con el corpus toy: los pares más frecuentes se fusionan.
- [16–20] Por qué los LLMs modernos usan bytes + BPE ("sin palabras raras").

## 1.3 y 1.4 · Atención (40 min)
- [0–3] El gancho: "cada token pregunta '¿qué me importa de ti?'".
- [3–10] Q/K/V con la metáfora de un foro: query, respuesta, contenido.
- [10–18] Softmax y escala: por qué /√d.
- [18–25] Máscara causal: por qué GPT no puede ver el futuro.
- [25–33] Multi-head en el notebook (rebanada del espacio).
- [33–40] Atención a mano en NumPy: leer la matriz fila a fila.

## 1.5 · Bloque transformer (20 min)
- [0–5] Residual + LayerNorm: el por qué de cada pieza.
- [5–12] MLP: el cómputo por token.
- [12–18] El bloque completo en PyTorch (recorrido del código del notebook).
- [18–20] Conexión con I2/I5.

## 1.6 · Entrenamiento (15 min)
- [0–3] Tarea: predecir el siguiente token — no hay etiquetas, el texto lo es todo.
- [3–9] Cross-entropy y por qué no MSE (categorical vs continuo).
- [9–15] La curva de pérdida en el notebook: del azar (ln vocab) a la señal.

## 1.7 + 1.8 · GPT mínimo + Hugging Face (45 min)
- [0–8] Gpt mínimo: __init__ y forward recorridos línea a línea.
- [8–15] Entrenamiento del juguete en CPU; resultado del loss.
- [15–22] Generar con temperatura: sampling.
- [22–32] HF en Colab: cargar gpt2, generar; comparar con tu GPT.
- [32–45] El entregable: cómo entrenar con tu corpus propio; qué cambiaría con 10× datos/capas.

Notas para el instructor:
- El notebook corre en CPU: la parte de HF es opcional (Colab/T4).
- El corpus toy es de 24 frases BPE (frases repetidas) para que el BPE memorice — es didáctico.
- Si el estudiante pregunta por "RoPE" o "Flash Attention": son optimizaciones modernas, no cambian el diagrama básico; quedan para AI7.
