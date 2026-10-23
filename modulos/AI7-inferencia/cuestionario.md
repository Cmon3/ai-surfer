# Módulo AI7 · Inferencia y despliegue — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Activas *batching* en tu servidor de inferencia. ¿Qué ocurre normalmente?
- a) Sube el throughput total y también puede subir la latencia de cada petición individual.
- b) Baja el throughput total y baja la latencia.
- c) No cambia nada si el modelo es pequeño.
- d) Baja el consumo de memoria de la KV-cache.

**2.** ¿Qué trabajo evita la KV-cache en la generación autorregresiva?
- a) Calcular los logits del token nuevo.
- b) Volver a calcular las claves y valores (K, V) de todo el prefijo en cada paso.
- c) Tokenizar el prompt.
- d) Cargar los pesos del modelo en la GPU.

**3.** ¿Por qué se cuantiza con una escala **por canal** en lugar de una escala global para toda la matriz?
- a) Porque ocupa menos memoria.
- b) Porque los valores extremos suelen concentrarse en algunos canales: con escala global, un solo valor extremo fija la escala y destruye la precisión del resto.
- c) Porque la escala global no existe en PyTorch.
- d) Porque así no hace falta descuantizar.

**4.** Cuantizas una matriz fp32 a int8. ¿Cuánto se reduce aproximadamente su memoria?
- a) 2×
- b) 4×
- c) 8×
- d) 32×

**5.** ¿Qué dos técnicas explican buena parte del rendimiento de servidores como vLLM?
- a) Dropout y early stopping.
- b) *Continuous batching* y PagedAttention (KV-cache paginada).
- c) LoRA y QLoRA.
- d) Beam search y temperatura 0.

**6.** Con muchos usuarios simultáneos y contextos largos, ¿qué suele limitar la concurrencia?
- a) El tamaño del tokenizer.
- b) La memoria que ocupa la KV-cache.
- c) La velocidad del disco.
- d) El número de capas del modelo.

**7.** Cuantizar los **pesos** a 4 bits, ¿qué NO reduce por sí solo?
- a) La VRAM que ocupa el modelo.
- b) El tamaño del archivo del checkpoint.
- c) La memoria de la KV-cache, que depende de la longitud de contexto y del número de peticiones.
- d) El tiempo de carga del modelo.

**8.** Tus usuarios se quejan de que la respuesta «tarda en empezar». ¿Qué métrica miras primero?
- a) Tokens por segundo totales del servidor.
- b) Tiempo hasta el primer token (TTFT).
- c) Pérdida de validación.
- d) Número de parámetros.

**9.** Alquilas una GPU a 2 €/h y sirves 3 millones de tokens por hora a plena carga. ¿Coste aproximado por millón de tokens?
- a) 0,67 €
- b) 2 €
- c) 6 €
- d) 0,02 €

**10.** Antes de pasar a producción un modelo cuantizado, ¿qué debes hacer?
- a) Nada: la cuantización no cambia la calidad.
- b) Medir la calidad con tu conjunto de evaluación (AI4) frente al modelo sin cuantizar, además de latencia y coste.
- c) Subir la temperatura para compensar.
- d) Reentrenar el modelo desde cero.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | a | Una pasada sirve a varias peticiones (más throughput), pero cada una puede esperar a que se forme el lote. |
| 2 | b | Con caché, cada paso solo calcula K/V del token nuevo y reutiliza las del prefijo. |
| 3 | b | La escala por canal aísla los valores extremos: cada canal usa su propio rango. |
| 4 | b | 32 bits → 8 bits. |
| 5 | b | Continuous batching mete peticiones nuevas en el lote sin esperar; PagedAttention gestiona la KV-cache por páginas y evita fragmentación. |
| 6 | b | La KV-cache crece con (peticiones × longitud de contexto × capas). |
| 7 | c | Los pesos y la caché son memorias distintas; la caché se reduce con otras técnicas (cuantizar la caché, GQA, límites de contexto). |
| 8 | b | La sensación de espera la da el TTFT; el streaming lo hace visible antes. |
| 9 | a | 2 € / 3 M tokens ≈ 0,67 € por millón, y solo si la GPU está ocupada todo el tiempo: con carga real, el coste efectivo sube. |
| 10 | b | Toda optimización de inferencia es un cambio de modelo: se valida con la misma evaluación. |
</details>
