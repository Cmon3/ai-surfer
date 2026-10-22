# Módulo AI1 · Transformers por dentro

**Semanas 1–2 de N3-AI · ~10 horas** · El módulo que deja de ser magia: atención, tokenización y un GPT mínimo escrito a mano.

## Objetivos
Al terminar este módulo podrás:
- Tokenizar texto: qué es un BPE y por qué sublenguas (subword tokens) ganan a las palabras.
- Explicar la **atención** como "cada token pregunta y responde": queries, keys y values.
- Escribir el tensor math de la atención escalada por dot-product, con y sin máscara causal.
- Entrenar un **GPT mínimo en PyTorch** (2 capas, vocab pequeño) y generarle texto.
- Navegar el ecosistema Hugging Face: datasets, tokenizers y modelos preentrenados.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 1.1 | De word embedding a transformer: por qué GPT-3 cambió el juego | 15 min |
| 1.2 | Tokenización: bytes, BPE y vocabularios | 20 min |
| 1.3 | Atención I: la idea de query/key/value | 20 min |
| 1.4 | Atención II: softmax, escala y máscara causal | 20 min |
| 1.5 | Bloque transformer: MLP, normalización y conexiones residuales | 20 min |
| 1.6 | Entrenamiento: cross-entropy, predicción del siguiente token | 15 min |
| 1.7 | GPT mínimo: implementar y entrenar en PyTorch | 30 min |
| 1.8 | Hugging Face: datasets, tokenizers y transformers preentrenados | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`notebook.ipynb`](notebook.ipynb) | Práctica: tokenización, atención a mano y GPT mínimo entrenado en CPU |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos recomendados |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — construimos, con un corpus juguete (frases de negocios de TiendaSur), un tokenizer por BPE, calculamos la atención a mano con NumPy, y entrenamos un **GPT mínimo en PyTorch** (2 capas, ~70k parámetros, 200 pasos, CPU) que genera párrafos de pedidos. El ejercicio final entrena con Hugging Face sobre un modelo preentrenado (opcional; requiere Colab con GPU).

## Cómputo
- **CPU** (este notebook): corre en ~2 min en un portátil.
- **Colab T4 (opcional)**: para el ejercicio HF con modelo pequeño preentrenado.

## Caso práctico (entregable)
1. Entrena tu GPT mínimo con un corpus propio (10–30 frases tuyas/del dominio que te interese).
2. Genera 5 párrafos y di qué acierta y qué falla.
3. Escribe 1 párrafo: *¿qué cambiaría con 10× más datos y 10× más capas? ¿Y por qué no basta con "más"?* (pista: calidad de datos y contexto).

**Criterios:** notebook se ejecuta (30 %), GPT entrena y genera (30 %), análisis honesto (40 %).

## Autoevaluación
1. ¿Por qué un BPE tokeniza "no lo sé" como sub-words y no como bytes crudos?
2. En la atención, ¿qué papel tienen query, key y value?
3. ¿Por qué la atención **causal** es lo que diferencia a un GPT de un BERT?
4. ¿Qué hace la normalización y la conexión residual en un bloque transformer?
5. ¿Por qué no entrenar con el MSE en generación de texto? *(pista: qué tipo de salida predices)*

<details><summary>Respuestas</summary>

1. Porque bytes crudos producen secuencias larguísimas y BPE aprende las combinaciones frecuentes (palabras comunes, raíces) como tokens: mejor balance entre vocabulario pequeño y contexto eficiente.
2. Cada token emite una **query** (qué busco), una **key** (qué ofrezco) y un **value** (qué contenido aporto). La atención mezcla los values de todos los tokens, ponderados por la afinidad query↔key.
3. Porque la máscara causal impide que el token i vea tokens futuros (>i) — eso es lo que hace que entrenar y generar en GPT sean el mismo mecanismo. BERT es bidireccional (encoder).
4. La **normalización** estabiliza el entrenamiento; la conexión **residual** permite que la información pase directo (skip connection) y que el gradiente fluya aunque la profundidad crezca.
5. Porque en generación de texto la salida es una **distribución probabilística** sobre tokens (categoría discreta), no un valor continuo; la función de pérdida natural es cross-entropy, no MSE.
</details>

## Lecturas y recursos
- [*Attention Is All You Need*](https://arxiv.org/abs/1706.03762) — el paper original (2017).
- [*The Illustrated Transformer*](https://jalammar.github.io/illustrated-transformer) — la mejor explicación visual.
- Karpathy, [*Let's build GPT: from scratch, in code*](https://www.youtube.com/watch?v=kCc8FmEb1nY) — el tutorial del que este módulo es una versión académica simplificada.
- [huggingface.co/docs](https://huggingface.co/docs) — datasets, tokenizers y transformers.
