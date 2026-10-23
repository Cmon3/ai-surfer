# Módulo AI6 · Alineación y post-entrenamiento — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** DPO compara la política que entrenas con una política de referencia congelada (π_ref). ¿Para qué sirve π_ref?
- a) Para ahorrar cómputo: así no hace falta calcular gradientes.
- b) Para medir cuánto se aleja el modelo de su punto de partida y evitar que «desbarre» al optimizar las preferencias.
- c) Para generar los pares de preferencia durante el entrenamiento.
- d) Es un requisito del formato del dataset, sin efecto en el resultado.

**2.** ¿Qué aporta GRPO frente a PPO?
- a) Entrena además un modelo de valor (crítico) más grande.
- b) Elimina el crítico: muestrea un grupo de respuestas por prompt y normaliza cada recompensa respecto a la media y la desviación del grupo.
- c) No necesita ninguna función de recompensa.
- d) Solo funciona con modelos de menos de 1 B parámetros.

**3.** En DPO subes mucho β. ¿Qué esperas ver?
- a) Respuestas más conservadoras, muy parecidas a las del modelo de referencia.
- b) Respuestas cada vez más extremas y alejadas de la referencia.
- c) Ningún cambio: β solo afecta a la velocidad.
- d) Que el entrenamiento deje de converger siempre.

**4.** ¿Por qué cada par preferida/rechazada debe responder a la **misma** instrucción?
- a) Porque así el dataset ocupa menos.
- b) Porque si las instrucciones difieren, el modelo puede aprender qué *instrucción* gusta más, no qué *respuesta* es mejor.
- c) Porque la librería TRL lo exige por formato, sin más motivo.
- d) Porque así se puede usar una temperatura más alta.

**5.** La pérdida DPO para un par (w = preferida, l = rechazada) es −log σ(β·Δ). ¿Qué es Δ?
- a) La diferencia de longitud entre w y l.
- b) (log π(w) − log π_ref(w)) − (log π(l) − log π_ref(l)).
- c) La recompensa de un modelo de recompensa externo.
- d) La pérdida de entropía cruzada del SFT.

**6.** Entrenas un modelo de recompensa lineal r(x) = w·x con pares de preferencias. ¿Qué pérdida usas?
- a) Error cuadrático medio entre r(x_w) y 1.
- b) −log σ(r(x_w) − r(x_l)) (modelo de Bradley-Terry).
- c) Entropía cruzada multiclase sobre el vocabulario.
- d) Distancia coseno entre x_w y x_l.

**7.** Usas el mismo modelo que genera las respuestas para anotar cuál es mejor. ¿Qué riesgo principal introduces?
- a) Ninguno, es la práctica recomendada.
- b) Sesgo de autopreferencia: el anotador favorece su propio estilo y el modelo se refuerza en él.
- c) Que los pares queden desbalanceados en longitud, sin más efecto.
- d) Que la pérdida DPO deje de ser diferenciable.

**8.** Para que otra persona pueda reproducir tu experimento de DPO, ¿qué es imprescindible registrar?
- a) Solo la métrica final.
- b) Semilla, versión exacta de los datos, hiperparámetros (β, lr, épocas), checkpoint base y la evaluación usada.
- c) El nombre del notebook.
- d) La GPU utilizada, nada más.

**9.** Tras la alineación, el modelo responde con evasivas a peticiones legítimas («sobrecorrección»). ¿Cuál es una causa probable?
- a) Un dataset de preferencias que premia sistemáticamente el rechazo o la cautela, o un β inadecuado.
- b) Haber usado LoRA en lugar de ajuste completo.
- c) Haber hecho SFT antes de DPO.
- d) Usar demasiados pocos tokens de contexto.

**10.** ¿Cuál es el orden habitual de un post-entrenamiento?
- a) DPO → SFT → preentrenamiento.
- b) Preentrenamiento → SFT → optimización de preferencias (DPO, o RM + PPO/GRPO).
- c) GRPO → preentrenamiento → SFT.
- d) SFT y DPO se hacen a la vez en un único paso siempre.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | El término π_ref actúa como ancla (equivale a una penalización KL implícita): se premia mejorar preferencias *relativo* al modelo inicial. |
| 2 | b | La ventaja se estima dentro del grupo de respuestas del mismo prompt, así que no hace falta un crítico aparte (menos memoria). |
| 3 | a | β alto penaliza más alejarse de π_ref: cambios pequeños y conservadores. |
| 4 | b | Si la instrucción cambia, la comparación mezcla dos variables y la señal deja de ser «qué respuesta es mejor». |
| 5 | b | Es el margen de log-probabilidades relativas a la referencia entre la preferida y la rechazada. |
| 6 | b | Bradley-Terry: la probabilidad de preferir w es σ(r_w − r_l). |
| 7 | b | Es el mismo sesgo que vimos en LLM-como-juez (AI4): conviene un anotador distinto o humanos de muestra. |
| 8 | b | Sin datos versionados, configuración y evaluación fija no hay comparación justa entre experimentos. |
| 9 | a | La alineación aprende lo que el dataset premia; mídelo con casos «legítimos» en tu set de evaluación. |
| 10 | b | Primero el modelo aprende el formato (SFT) y después se ajusta a las preferencias. |
</details>
