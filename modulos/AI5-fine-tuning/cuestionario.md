# Módulo AI5 · Fine-tuning supervisado — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Tu asistente responde bien, pero no conoce las políticas de devolución de TiendaSur, que cambian cada trimestre. ¿Qué haces primero?
- a) Un SFT con las políticas actuales.
- b) RAG sobre los documentos vigentes: el conocimiento que cambia no se inyecta ajustando pesos.
- c) Cuantizar el modelo a 4 bits.
- d) Subir el número de épocas de entrenamiento.

**2.** En un ejemplo SFT, ¿qué posiciones llevan la etiqueta `-100` con una máscara de pérdida correcta?
- a) Las de la respuesta del asistente.
- b) Las del prompt (sistema, usuario y cabecera del asistente) y el relleno; se aprende de la respuesta y de `<|im_end|>`.
- c) Solo el primer token de la secuencia.
- d) Ninguna: `-100` es el valor del learning rate.

**3.** Quitas la cabecera `<|im_start|>assistant` de la plantilla de entrenamiento, pero la mantienes en inferencia. ¿Qué esperas?
- a) Nada, el modelo la infiere.
- b) Degradación: el modelo nunca aprendió dónde empieza su turno con ese marcador, y en inferencia recibe un contexto que no vio.
- c) Un entrenamiento más rápido y de igual calidad.
- d) Que el tokenizer falle siempre con un error.

**4.** En LoRA, `W' = W + (α/r)·B·A` con `A` de `r × in` y `B` de `out × r`. ¿Por qué `B` se inicializa a cero?
- a) Para ahorrar memoria.
- b) Para que `ΔW = 0` al empezar: el modelo ajustado es idéntico al base en el paso 0, mientras `A` (aleatoria) permite que el gradiente de `B` no sea nulo.
- c) Porque `A` y `B` deben ser ortogonales.
- d) Para que el adaptador no se pueda fusionar.

**5.** Una matriz de 4096×4096 con LoRA `r = 8`: ¿cuántos parámetros entrenables hay?
- a) 16,8 M (los mismos que el ajuste completo).
- b) 65 536 (`r·(in + out)`), aproximadamente un 0,4 % de la matriz.
- c) 64 (`r²`).
- d) 4096.

**6.** Verificas tu `LoRALinear`: tras fusionar `W ← W + (α/r)BA`, la salida difiere de la del adaptador sin fusionar en el orden de 1e-1. ¿Qué concluyes?
- a) Es normal: la fusión siempre introduce error.
- b) Hay un error (escala `α/r` olvidada, transposición mal hecha…): fusionado y sin fusionar deben coincidir salvo redondeo numérico.
- c) Que `r` es demasiado pequeño.
- d) Que hay que subir el learning rate.

**7.** En QLoRA, ¿qué se cuantiza a 4 bits?
- a) El adaptador LoRA.
- b) Los estados del optimizador.
- c) Los pesos del modelo base, que permanecen congelados; el adaptador sigue en precisión normal.
- d) El dataset.

**8.** Quieres ajustar un modelo de 7 000 M de parámetros en una GPU de 16 GB. ¿Qué es lo más realista?
- a) Ajuste completo en bf16 con AdamW (~80 GB).
- b) QLoRA (base a 4 bits ≈ 3,5 GB + adaptador) con una longitud de secuencia moderada.
- c) Entrenar solo durante una época con el ajuste completo.
- d) No es posible con ninguna técnica.

**9.** La pérdida de entrenamiento baja a ~0 y la de validación toca fondo en el paso 30 y luego sube. ¿Diagnóstico y remedio?
- a) Infraajuste; subir el learning rate.
- b) Sobreajuste; parar en el mínimo de validación (*early stopping*), y/o más datos variados, aumento de datos, menos épocas o `lr` más bajo.
- c) Todo correcto: es lo esperado al final del entrenamiento.
- d) Un error de la máscara; hay que quitarla.

**10.** Tu pregunta de validación «¿cuánto tarda el envío?» aparece idéntica en el conjunto de entrenamiento. ¿Qué ocurre con la métrica de validación?
- a) Nada: no afecta.
- b) Es optimista: hay fuga y el modelo puede estar recitando; es un error silencioso que invalida la comparación.
- c) Baja, porque hay más datos.
- d) Se vuelve negativa.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | El SFT enseña comportamiento; el conocimiento que cambia se recupera (RAG) para poder actualizarlo sin reentrenar. |
| 2 | b | Solo se aprende de la respuesta y del token de fin, para que el modelo aprenda a responder y a parar. |
| 3 | b | Plantilla de entrenamiento e inferencia deben coincidir; si no, el modelo recibe marcadores que no vio. |
| 4 | b | Con `B = 0`, `BA = 0`: el punto de partida es el modelo base; `A` aleatoria evita que ambos gradientes sean cero. |
| 5 | b | `r·(in + out) = 8 · 8192 = 65 536`, frente a 16,8 M de la matriz completa. |
| 6 | b | La fusión es una identidad algebraica; una diferencia grande delata un fallo de implementación. |
| 7 | c | Se cuantiza la base congelada; el adaptador y su optimizador siguen en precisión normal. |
| 8 | b | Solo QLoRA cabe cómodo; el ajuste completo necesita decenas de GB por los estados de Adam. |
| 9 | b | Sobreajuste clásico; se actúa sobre los datos, las épocas y el punto de parada. |
| 10 | b | La fuga hace que la validación mida memoria, no generalización. |
</details>
