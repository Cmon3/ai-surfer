# Módulo AI1 · Transformers por dentro — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** ¿Por qué BPE y no tokenización por caracteres?
- a) Para que el vocabulario sea más pequeño que los bytes.
- b) Para que las secuencias sean más cortas y el vocabularión pequeño pero expresivo (subwords frecuentes como un solo token).
- c) Para que el modelo no necesite embeddings posicionales.
- d) Porque el hardware exige tokens ≥ 32 bits.

---

**2.** En la atención, la matriz de **scores** se obtiene de…
- a) `V @ Vᵀ`
- b) `Q @ Kᵀ`
- c) `softmax(V)`
- d) `K @ Vᵀ`

---

**3.** En el softmax de la atención, ¿para qué sirve dividir por √d?
- a) Para que la matriz sea simétrica.
- b) Para normalizar el vocabulario.
- c) Para que los scores no crezcan con d y el softmax no se vuelva hiperpuntual.
- d) Para ahorrar memoria.

---

**4.** La máscara causal de un GPT…
- a) impide que el token i vea tokens futuros.
- b) impide que el token i vea tokens pasados.
- c) activa los embeddings posicionales.
- d) corta el gradiente de las cabezas.

---

**5.** El MLP de un bloque transformer opera…
- a) sobre cada token por separado, al mismo tiempo.
- b) sobre toda la secuencia en una sola pasada matricial global.
- c) solo sobre el token más importante (atendido).
- d) sobre los tokens futuros.

---

**6.** ¿Qué añade la conexión residual (`x + Atención(Norm(x))`)?
- a) regularización L2 del peso.
- b) que la información fluya directo y el gradiente no se muera con profundidad.
- c) que el modelo aprende más rápido con menos datos siempre.
- d) multiplica los parámetros.

---

**7.** La tarea con la que entrena un GPT (decoder-only) es…
- a) clasificar cada token como sustantivo/verbo.
- b) reconstruir el texto original desde una versión con huecos.
- c) predecir el siguiente token dada la historia anterior.
- d) traducir la secuencia a embeddings de otro idioma.

---

**8.** ¿Cuál es la pérdida entrenando un GPT?
- a) MSE entre logits y tokens.
- b) Cross-entropy entre la distribución del modelo y el token real.
- c) Distancia coseno entre embeddings.
- d) KL entre embeddings consecutivos.

---

**9.** Las embeddings posicionales son necesarias porque…
- a) sin ellas el modelo no sabría qué token es cual en el vocabulario.
- b) la atención por sí sola no codifica el orden de la secuencia.
- c) se usan en el softmax para regularizar.
- d) solo sirven para modelos encoder.

---

**10.** En Hugging Face, `AutoModelForCausalLM.from_pretrained("...")`…
- a) entrena un modelo desde cero.
- b) carga un modelo preentrenado con sus pesos y su arquitectura.
- c) crea solo el tokenizer del modelo.
- d) descarga los datos del dataset original.

<details><summary>Soluciones</summary>

1. **b** 2. **b** 3. **c** 4. **a** 5. **a** 6. **b** 7. **c** 8. **b** 9. **b** 10. **b**
</details>
