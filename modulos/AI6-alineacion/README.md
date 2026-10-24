# Módulo AI6 · Alineación y post-entrenamiento

**Semanas 10–11 de N3-AI · ~12 horas** · Qué ocurre después del SFT: datos de preferencias, modelos de recompensa, **DPO**, y RL con **recompensas verificables** (**GRPO**). Aprenderás la matemática en lo justo, la implementarás a mano en CPU y verificarás numéricamente que hace lo que dice; después, el esqueleto con `DPOTrainer` y `GRPOTrainer` de TRL para Colab.

## Qué piden las ofertas
El post-entrenamiento (RLHF, DPO, RL con recompensas verificables) es un **nicho de plus salarial**: aparece en ofertas de laboratorios y empresas que entrenan modelos propios, y cada vez más como «conocimiento de alineación y evaluación» en perfiles de AI Engineer. Lo que valoran: entender qué optimiza cada método, **detectar el *reward hacking***, llevar experimentos **reproducibles** y evaluar con rigor. Este módulo termina en una pieza de portafolio exactamente así: un experimento de alineación con registro y evaluación.

## Objetivos
Al terminar este módulo podrás:
- Situar SFT, RLHF/PPO, DPO y GRPO en el pipeline de post-entrenamiento y decir qué problema resuelve cada uno.
- Construir y validar un **dataset de preferencias** (`prompt/chosen/rejected`).
- Entrenar un **modelo de recompensa** con la pérdida de Bradley-Terry y verificar su gradiente.
- Explicar el **reward hacking** y la sobreoptimización con una demostración (*Best-of-N*).
- Implementar la **pérdida DPO** a mano y **verificarla numéricamente** (casos límite, gradiente analítico, `gradcheck`).
- Explicar el papel de **β** y la restricción **KL** con una política de juguete.
- Implementar **GRPO** con funciones de recompensa verificables, ventajas por grupo y penalización KL, y detectar un caso de *reward hacking*.
- Llevar un **registro reproducible** de experimentos (config, huella de datos, semilla, métricas) y comprobar la reproducibilidad con un test.
- Lanzar `DPOTrainer`/`GRPOTrainer` en Colab y evaluar el resultado (AI4).

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 6.1 | Qué es alinear: del SFT a las preferencias | 15 min |
| 6.2 | Datos de preferencias y modelo de recompensa (Bradley-Terry) | 20 min |
| 6.3 | RLHF/PPO en una página: KL y reward hacking | 20 min |
| 6.4 | DPO: derivación, pérdida a mano y verificación numérica | 25 min |
| 6.5 | RL con recompensas verificables y GRPO | 25 min |
| 6.6 | Cuando falla: sobreoptimización, sycophancy y sobrecorrección | 15 min |
| 6.7 | Experimentos reproducibles y evaluación | 15 min |
| 6.8 | `DPOTrainer` y `GRPOTrainer` en Colab | 20 min |

Total de vídeo: ~2 h 35 min. El resto de las ~12 h es práctica (notebook, ejercicios, Colab y caso práctico).

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría por lección + glosario |
| [`diapositivas.md`](diapositivas.md) | Presentación (Marp) |
| [`guiones.md`](guiones.md) | Guion de cada vídeo con minutos |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada (CPU) + 5 ejercicios con celdas vacías |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* mismo notebook con los ejercicios resueltos |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos por lección |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) recorre el post-entrenamiento en un mundo de juguete donde **conocemos la recompensa verdadera**, para poder medir lo que hacemos:
1. Preferencias sintéticas con ruido y un **sesgo de longitud** (los anotadores prefieren lo largo), más el formato real `prompt/chosen/rejected` y su validador.
2. **Modelo de recompensa** Bradley-Terry con gradiente verificado, y demostración de *Best-of-N*: el RM hereda el sesgo y optimizar contra él produce respuestas verbosas.
3. **DPO a mano**: log 2 con π = π_ref, gradiente analítico, `torch.autograd.gradcheck`; entrenamiento sobre una política de juguete y barrido de β con KL y utilidad real.
4. **GRPO** con recompensas verificables de TiendaSur (JSON válido, campos, total exacto, brevedad): ventajas por grupo, KL (estimador k3), *reward hacking* con `{}` y efecto de `beta_kl`.
5. **Registro reproducible**: dataclass de configuración, huella SHA-256 de los datos, JSONL y test «misma config ⇒ mismas métricas».
6. Esqueleto de Colab con `DPOTrainer` y `GRPOTrainer` (no se ejecuta aquí; las funciones de recompensa sí se prueban con el contrato de TRL).

## Notas de cómputo
- **Notebook:** CPU, sin clave de API, menos de 1 minuto. Determinista.
- **Colab (opcional):** GPU T4 gratuita. Modelo abierto de 0,5 a 3 B parámetros (Qwen, SmolLM, Gemma, Llama…); **comprueba el modelo vigente y la versión de TRL** antes de empezar: los argumentos cambian entre versiones.
- Los resultados numéricos son de un mundo de juguete: lo que se transfiere son los **mecanismos y los diagnósticos**.

## Caso práctico (entregable)
**Un experimento de alineación documentado y reproducible.**
1. Dataset de **al menos 50 pares** `prompt/chosen/rejected` de tu dominio (puedes generarlos con un juez LLM y revisar una muestra a mano), validado con un script (sin vacíos, `chosen ≠ rejected`, sin duplicados).
2. Entrena con **DPO** (Colab, LoRA) un modelo ya ajustado con SFT **o** con **GRPO** si tu tarea tiene una recompensa verificable por código (formato, extracción, cálculo). Barrido de al menos 3 valores de `β` (o de `beta`/`num_generations` en GRPO).
3. **Registro de experimentos**: configuración completa, semilla, huella de los datos, versiones de librerías y métricas por ejecución; test de reproducibilidad en la parte que se pueda ejecutar en CPU.
4. **Evaluación** frente al modelo de partida sobre un golden set (AI4) con al menos una métrica objetiva y una medida del coste de alinear (KL, longitud media, tasa de rechazos). Análisis de 3 fallos y de un posible *reward hacking*.

**Criterios de evaluación:** calidad y validación de los datos (20 %), implementación y entrenamiento correctos (25 %), registro reproducible (20 %), evaluación honesta incluidos efectos secundarios (25 %), documentación y análisis de limitaciones (10 %).

## Autoevaluación
1. ¿Qué hace la política de referencia `π_ref` en DPO y qué ocurre con β grande?
2. ¿Por qué un modelo de recompensa entrenado con preferencias humanas puede premiar respuestas largas aunque no sean mejores?
3. Un grupo de GRPO donde las 8 respuestas puntúan igual, ¿qué gradiente genera?
4. Tu recompensa es «JSON válido + respuesta corta». ¿Qué respuesta esperas que aprenda la política y cómo lo arreglas?
5. ¿Qué debe contener el registro de un experimento para que otra persona lo reproduzca?
6. ¿Cuándo preferirías GRPO a DPO?

<details><summary>Respuestas</summary>

1. `π_ref` (normalmente el modelo tras el SFT, congelado) fija el punto de partida: DPO mide cuánto ha subido o bajado la probabilidad de cada respuesta *respecto a la referencia*. β es el peso de esa restricción KL: con β grande la política apenas se aleja de la referencia (conservadora); con β pequeño se aleja mucho y puede degradarse.
2. Porque las etiquetas humanas contienen sesgos (preferir lo largo y completo) y el RM los aprende como si fueran calidad; al optimizar contra él, la política los explota (*reward hacking*). Se mitiga con datos balanceados en longitud, penalizaciones de longitud, mejores anotaciones y evaluación independiente.
3. Ninguno: la ventaja `(r − media)/(std + ε)` es 0 para todas, así que ese grupo no aporta señal (solo actuaría la penalización KL). Es un paso desperdiciado; ocurre mucho con grupos pequeños o tareas demasiado fáciles o difíciles.
4. La respuesta vacía `{}`: JSON válido y cortísimo. Se arregla **la recompensa**, no entrenando más: comprobar también campos y valor correcto (`r_campos`, `r_exacto`) y dar más peso a lo que importa.
5. Configuración completa (hiperparámetros), semilla, huella o versión de los datos, checkpoint de partida, versiones de las librerías, métricas y evaluación usada; y un test de que misma configuración ⇒ mismos resultados.
6. Cuando el resultado se puede **verificar por código** (formato, extracción, matemáticas, tests de código): no necesitas pares anotados ni modelo de recompensa, y el modelo puede mejorar más allá de los datos. DPO se prefiere cuando solo tienes preferencias (estilo, tono, utilidad percibida).
</details>

## Lecturas
- Ouyang et al., *Training language models to follow instructions with human feedback* (2022), arXiv 2203.02155 (InstructGPT/RLHF).
- Rafailov et al., *Direct Preference Optimization* (2023), arXiv 2305.18290.
- Shao et al., *DeepSeekMath* (2024), arXiv 2402.03300 (introduce GRPO) y DeepSeek-AI, *DeepSeek-R1* (2025), arXiv 2501.12948.
- Gao et al., *Scaling Laws for Reward Model Overoptimization* (2022), arXiv 2210.10760.
- Documentación de TRL: [DPO Trainer](https://huggingface.co/docs/trl/dpo_trainer) y [GRPO Trainer](https://huggingface.co/docs/trl/grpo_trainer).
- Módulos relacionados: **AI4** (evaluar), **AI5** (SFT previo), **AI8** (seguridad y sobrecorrección).
