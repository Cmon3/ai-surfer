# Módulo AI5 · Fine-tuning supervisado — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** La máscara de pérdida en SFT sirve para…
- a) acelerar el entrenamiento descartando tokens.
- b) que el modelo aprenda solo de la respuesta, no del prompt.
- c) cifrar el prompt.
- d) mejorar el tokenizer.

**2.** LoRA reduce la VRAM porque…
- a) elimina capas del modelo base.
- b) congela la base y entrena solo matrices de bajo rango (ΔW = B·A), con optimizer states mínimos.
- c) entrena en 4 bits siempre.
- d) usa menos datos.

**3.** En QLoRA, qué se cuantiza…
- a) solo el adaptador LoRA.
- b) la base del modelo (congelada) a 4 bits.
- c) el vocabulario.
- d) el optimizador.

**4.** Un SFT que memoriza el dataset y no genera variaciones probablemente…
- a) tiene pocos épocas.
- b) tiene demasiada temperatura.
- c) tiene dataset pequeño/duplicado y demasiadas épocas.
- d) usa LoRA.

**5.** El chat template importa porque…
- a) acelera la GPU.
- b) define dónde empieza/termina el turno del modelo; con tokens especiales incorrectos el modelo aprende mal los límites.
- c) es estético.
- d) comprime el dataset.

**6.** El `ignore_index=-100` de PyTorch significa…
- a) pérdida 100×.
- b) token ignorado en la pérdida.
- c) aprendizaje reforzado.
- d) learning rate 1e-100.

**7.** ΔW = B·A con A (r×in) y B (out×r): ¿cuántos parámetros entrenables vs. full fine-tuning (out×in)?
- a) El doble.
- b) r·(in+out) frente a out·in — muchísimo menos.
- c) Igual.
- d) r².

**8.** Para un SFT de un modelo 7B en una T4 (16 GB), lo más realista es…
- a) full fine-tuning en fp16.
- b) QLoRA (base 4 bits + LoRA).
- c) entrenar solo embeddings.
- d) distillation sin GPU.

**9.** La "instrucción" en el dataset SFT define…
- a) el prompt que verá el modelo en inferencia del mismo formato del template del entrenamiento.
- b) el learning rate.
- c) el número de épocas.
- d) el dataset de preferencias.

**10.** Los tokens especiales (`<instr>`, `<resp>`, `<fin>`) se añaden al vocabulario porque…
- a) el modelo los aprende como caracteres normales.
- b) marcan límites semánticos de turno que el modelo debe distinguir.
- c) ahorran tokens de salida.
- d) solo sirven en inferencia.

<details><summary>Soluciones</summary>
1. b 2. b 3. b 4. c 5. b 6. b 7. b 8. b 9. a 10. b
</details>
