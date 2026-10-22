# Módulo AI4 · Evaluación de LLMs — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** El golden set se congela entre A/B porque…
- a) es más rápido.
- b) es la única manera de que la comparación sea válida (mesa la vara de medir).
- c) la API lo exige.
- d) reduce el coste.

---

**2.** La métrica que NO es objetiva es…
- a) coverage de citas con regex.
- b) precisión de recuperación (top-k marca).
- c) validación Pydantic del JSON.
- d) "la respuesta parece útil".

---

**3.** El sesgo de verborrea del LLM-as-judge significa que…
- a) prefiere respuestas cortas.
- b) puntúa más alto la respuesta larga, aunque no sea mejor.
- c) falla con textos en inglés.
- d) solo funciona con temperature 0.

---

**4.** ¿Cómo se calibra un judge?
- a) No se puede.
- b) Comparando su juicio con etiquetas humanas en un subconjunto y midiendo el acuerdo.
- c) Entrenando el judge con LoRA.
- d) Subiendo la temperatura.

---

**5.** En regresión A/B la temperatura y la seed van fijas porque…
- a) así la API es más barata.
- b) el sampling introduce variabilidad que enmascara el efecto real de la mejora.
- c) los judges no toleran sampling.
- d) el golden set lo exige legalmente.

---

**6.** Un caso de "fuera de dominio" en el golden set sirve para…
- a) medir la latencia.
- b) verificar que la frase de escape exacta aparece (regla del prompt).
- c) entretener al judge.
- d) aumentar el vocabulario.

---

**7.** La similitud semántica entre la respuesta esperada y la del modelo falla ante…
- a) parafrasis.
- b) un dato factual inventado con la misma estructura de la respuesta real.
- c) respuestas más largas.
- d) respuestas de otro idioma.

---

**8.** La taxonomía de fallos se ordena por…
- a) orden del notebook.
- b) frecuencia × impacto de la categoría.
- c) dificultad de arreglar.
- d) orden alfabético.

---

**9.** El mayor riesgo de juzgar con el mismo modelo que genera…
- a) es caro.
- b) sesgo de auto-preferencia (prefiere su propio estilo).
- c) no funciona.
- d) pierde las citaciones.

---

**10.** ¿Qué añade el judge al eval que las métricas objetivas no cubren?
- a) La latencia.
- b) Criterios subjetivos como utilidad y tono.
- c) La cobertura de citas.
- d) La validación del JSON.

<details><summary>Soluciones</summary>

1. **b** 2. **d** 3. **b** 4. **b** 5. **b** 6. **b** 7. **b** 8. **b** 9. **b** 10. **b**
</details>
