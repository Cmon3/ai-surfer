# Módulo AI6 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh AI6`. Las demos usan `notebook.ipynb` (CPU); la lección 6.8 se graba en Colab.

## 6.1 · Qué es alinear (15 min)
- [0–4] Gancho: dos respuestas correctas, una es mejor. ¿Cómo se lo explicas a un modelo?
- [4–10] Pipeline base → SFT → preferencias → RL verificable. Tabla de métodos y datos que necesita cada uno.
- [10–15] El mundo de juguete del notebook: conocemos la recompensa real para poder medir.

## 6.2 · Datos de preferencias y modelo de recompensa (20 min)
- [0–5] Formato `prompt/chosen/rejected`; `validar_preferencias`; reglas de calidad y autopreferencia del juez.
- [5–12] Bradley-Terry: `P(a ≻ b) = σ(r(a) − r(b))`; verificar el gradiente contra autograd.
- [12–17] Entrenar el RM; comparar pesos aprendidos y reales: el RM hereda el sesgo de longitud.
- [17–20] Ejercicio 1 (ruido en etiquetas): qué implica para el control de calidad de anotaciones.

## 6.3 · RLHF/PPO, KL y reward hacking (20 min)
- [0–6] RLHF en una página: RM, PPO, penalización KL. Los cuatro modelos en memoria.
- [6–14] Demo *Best-of-N*: tabla del notebook; la puntuación del RM sube, la utilidad real no la sigue, la longitud tiende a 1.
- [14–20] Gao et al.: sobreoptimización. Defensas: KL, datos equilibrados, evaluación independiente.

## 6.4 · DPO (25 min)
- [0–7] De la política óptima con KL a la pérdida DPO (sin demostrarlo entero): recompensa implícita.
- [7–14] `dpo_loss` y sus cuatro verificaciones: log 2, gradiente analítico, `gradcheck`, orden de pares.
- [14–21] Política de juguete y barrido de β: tabla de KL, utilidad real y longitud. β grande = conservadora.
- [21–25] Qué mirar en un DPO real (accuracies, margins, longitud) y limitaciones.

## 6.5 · Recompensas verificables y GRPO (25 min)
- [0–5] Por qué no hace falta RM cuando se puede verificar: JSON de TiendaSur.
- [5–12] Las cuatro funciones de recompensa y la tabla de candidatas. Diseño en capas.
- [12–20] `grpo`: grupo, ventaja, k3 de KL. Demostrar que las ventajas suman 0 y que un grupo uniforme no da señal.
- [20–25] Resultados: la política pasa de 7 % a >95 % en la respuesta correcta; efecto de `beta_kl`.

## 6.6 · Cuando falla (15 min)
- [0–6] Reward hacking en directo: solo formato + brevedad ⇒ `{}`. Se arregla la recompensa.
- [6–11] Verbosidad, adulación, sobrecorrección: cómo se detectan con datos (longitud, tasa de rechazos).
- [11–15] Colapso de diversidad y deriva del formato; el hábito de leer muestras.

## 6.7 · Experimentos reproducibles y evaluación (15 min)
- [0–6] `ConfigDPO`, huella de datos, `run_id` por hash, JSONL.
- [6–10] El test «misma config ⇒ mismas métricas»; qué cambia en GPU.
- [10–15] Evaluar contra el modelo de partida con el golden set de AI4; efectos secundarios.

## 6.8 · DPOTrainer y GRPOTrainer en Colab (20 min)
- [0–4] Elegir modelo vigente, comprobar licencia y versión de TRL.
- [4–11] Recorrer `ESQUELETO_DPO`: columnas, `beta`, LoRA como referencia implícita, métricas a vigilar.
- [11–17] Recorrer `ESQUELETO_GRPO`: funciones de recompensa con el contrato de TRL, `num_generations`, coste de generar.
- [17–20] Entrenamiento de humo y registro. Enlace con el caso práctico.

Nota del instructor: el notebook corre sin API ni GPU. Insiste en que los números son de juguete; lo que se transfiere son las verificaciones, los diagnósticos y la disciplina de registro.
