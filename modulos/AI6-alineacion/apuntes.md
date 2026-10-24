# Módulo AI6 · Alineación y post-entrenamiento — Apuntes

> Objetivo: entender qué optimiza cada método de post-entrenamiento, implementarlo en pequeño, **verificar numéricamente** que lo hace bien y reconocer cómo falla. Los números del notebook son de un mundo de juguete donde conocemos la recompensa real; el mecanismo es el de los modelos grandes.

---

## 6.1 · Qué es alinear

Un modelo preentrenado predice texto; tras el **SFT** (AI5) sigue instrucciones. **Alinear** es acercar su comportamiento a lo que queremos: ser útil, veraz, seguro y con el tono adecuado. Esos criterios son difíciles de escribir como «respuesta correcta», pero fáciles de **comparar**: ante dos respuestas, ¿cuál es mejor? Ahí entran las preferencias.

Pipeline moderno de post-entrenamiento:

```
Base preentrenado → SFT (imitar buenas respuestas) → Preferencias (DPO / RLHF) → RL con recompensas verificables (GRPO)
```

| Método | Datos | Necesita | Bueno para |
|---|---|---|---|
| **SFT** | respuestas ejemplares | solo el modelo | formato, tarea, estilo |
| **RLHF (PPO)** | preferencias → modelo de recompensa | RM + crítico + RL | alinear con criterios humanos; complejo |
| **DPO** | preferencias | modelo de referencia | lo mismo, más simple y estable |
| **GRPO / RLVR** | una función de recompensa verificable | verificador por código | razonamiento, formato, extracción, matemáticas, código |

---

## 6.2 · Datos de preferencias y modelo de recompensa

**Dato:** una terna `(prompt, chosen, rejected)`. Fuentes: anotadores humanos, un juez LLM (calibrado: AI4) o preferencias derivadas de señales (resultado de un test, clic). Formato que espera TRL:

```json
{"prompt": [{"role": "user", "content": "¿Puedo devolver una taza usada?"}],
 "chosen": [{"role": "assistant", "content": "No: la devolución exige el producto sin usar."}],
 "rejected": [{"role": "assistant", "content": "¡Claro que sí, cuando quieras!"}]}
```

**Reglas de calidad:** ambas respuestas deben responder a la **misma** instrucción; `chosen ≠ rejected`; sin vacíos ni duplicados; diferencias que representen el criterio que buscas (no solo la longitud); distribución de longitudes equilibrada entre `chosen` y `rejected`; medir el **acuerdo entre anotadores** en una muestra. Si usas un LLM para anotar, ojo con la **autopreferencia** (favorece su propio estilo) y la **verborrea**.

**Modelo de recompensa (RM).** Puntúa una respuesta con un número `r(x)`. Modelo de **Bradley-Terry**: la probabilidad de preferir `a` sobre `b` es

```
P(a ≻ b) = σ( r(a) − r(b) )         pérdida:  L = − log σ( r(chosen) − r(rejected) )
```

Su gradiente para un par es `−σ(−Δr)·(x_w − x_l)`: empuja más fuerte cuanto peor ordenado está el par (lo verificamos en el notebook contra `autograd`). En la práctica `r` es un LLM con una cabeza escalar. Un RM **solo es tan bueno como sus etiquetas**: ruido en los datos encoge los pesos y baja la fiabilidad.

---

## 6.3 · RLHF/PPO en una página, KL y reward hacking

**RLHF clásico:** (1) entrenar el RM; (2) optimizar la política con **PPO** para maximizar `r(y)` con una penalización que la mantenga cerca de la referencia:

```
max_π  E[ r(y) ]  −  β · KL( π || π_ref )
```

PPO necesita cuatro modelos en memoria (política, referencia, RM y un **crítico** o *value model*) y es delicado de ajustar. De ahí el interés por DPO y GRPO.

**Reward hacking (sobreoptimización).** El RM es un **proxy** de lo que queremos. Cuando la política lo optimiza fuerte, encuentra los huecos del proxy: respuestas largas, aduladoras, con formato llamativo. La puntuación del RM sube, pero la calidad real se estanca o **empeora** (Gao et al., 2022). En el notebook: con *Best-of-N* sobre un RM que heredó un sesgo de longitud, al subir `N` la puntuación del RM crece, la longitud elegida tiende a 1 y la utilidad real se queda por debajo de la de un oráculo.

Defensas: restricción KL, RM entrenado con datos variados y equilibrados en longitud, penalizaciones explícitas, **evaluación independiente** del RM (AI4), parada temprana según una métrica real.

---

## 6.4 · DPO

**Idea (Rafailov et al., 2023).** Con la restricción KL, la política óptima tiene una forma cerrada, y se puede reescribir la recompensa en función de las probabilidades de la política. El RM desaparece y queda una pérdida supervisada sobre los pares:

```
L_DPO = − log σ( β [ (log π_θ(y_w) − log π_ref(y_w)) − (log π_θ(y_l) − log π_ref(y_l)) ] )
```

- **Recompensa implícita:** `r̂(y) = β·log(π_θ(y)/π_ref(y))`. DPO sube la de `y_w` y baja la de `y_l`.
- **`π_ref`** es la política de partida congelada (normalmente el modelo tras el SFT). Con LoRA se obtiene desactivando el adaptador: no hace falta una copia.
- **β controla la restricción KL.** β **grande** ⇒ la política se mueve poco (conservadora); β **pequeño** ⇒ se aleja mucho (más ganancia potencial, más riesgo de degradación). Valores habituales: 0,05–0,5. (Ojo: no es una «agresividad»; es el cinturón de seguridad.)

**Verificaciones que hacemos a mano** (hazlas con cualquier pérdida que implementes):
1. Con `π = π_ref` la pérdida vale `log 2`.
2. Gradiente analítico: `∂L/∂lp_w = −β·σ(−z)`, `∂L/∂lp_l = +β·σ(−z)`, con `z` el argumento del sigmoide.
3. `torch.autograd.gradcheck` (diferencias finitas, float64).
4. Un par bien ordenado da pérdida `< log 2`; mal ordenado, `> log 2`.

**Qué mirar al entrenar:** `rewards/accuracies` (debe subir hacia 1, pero si llega a 1 muy rápido, sospecha de datos triviales), `rewards/margins`, la longitud media de las respuestas y el KL. **El acierto de preferencia no es la calidad de lo que generas**: evalúa generando (AI4).

**Limitaciones:** DPO baja la probabilidad de `chosen` y `rejected` a la vez en ocasiones; es sensible a la calidad de los pares y a la distribución de longitudes; no explora (solo aprende de los pares que le das).

---

## 6.5 · RL con recompensas verificables y GRPO

Si el resultado se puede **comprobar con código**, no hace falta RM: ¿el JSON parsea? ¿están los campos? ¿el total coincide? ¿pasan los tests? Eso es **RLVR** (RL con recompensas verificables), la base de los modelos de razonamiento recientes.

**GRPO (Shao et al., 2024):**
1. Por cada prompt, **muestrear un grupo** de `G` respuestas de la política.
2. Calcular la recompensa de cada una (suma ponderada de funciones verificables).
3. **Ventaja por grupo:** `A_i = (r_i − media(r)) / (std(r) + ε)`. La media del grupo hace de línea base: **no hace falta crítico**.
4. Actualizar con `− E[ A_i · log π_θ(o_i) ] + β_KL · KL(π || π_ref)`. El KL suele estimarse con el estimador *k3* de Schulman: `exp(d) − d − 1`, con `d = log π_ref − log π`.

**Detalles que se aprenden en el notebook:**
- Las ventajas **suman 0**; un grupo con todas las recompensas iguales tiene ventaja 0 y **no da señal** (solo actúa el KL). Con grupos pequeños o tareas muy fáciles/difíciles se desperdician muchos pasos.
- `G` mayor ⇒ estimación más estable, pero cada paso cuesta `G` generaciones: el cuello de botella de GRPO es **generar**.
- Con una sola actualización por lote el cociente de probabilidades es 1 y el recorte de PPO no actúa; con varias actualizaciones por lote sí hace falta.
- `β_KL` alto mantiene la política cerca de la referencia (menos ganancia); `β_KL = 0` es habitual en entrenamientos de razonamiento largos, aceptando más deriva.
- **Diseña la recompensa en capas:** formato (0/1), campos (0/1), exactitud (0/1, con más peso), y solo después estilo/brevedad.

**Funciones de recompensa en TRL:** reciben `completions` (en formato conversacional, cada una es `[{"role": "assistant", "content": ...}]`) y devuelven una lista de `float`. Pruébalas con casos buenos y malos **antes** de entrenar.

---

## 6.6 · Cuando falla

- **Reward hacking:** premias «JSON válido + corto» y obtienes `{}`. Remedio: arreglar la recompensa (añadir exactitud), no entrenar más. Revisa siempre **muestras generadas** a mano durante el entrenamiento.
- **Sobreoptimización del RM:** ver 6.3.
- **Verbosidad:** el sesgo de longitud de anotadores y jueces. Equilibra longitudes, mide la longitud media y penalízala si hace falta.
- **Adulación (*sycophancy*):** el modelo da la razón al usuario porque eso se anotó como «mejor». Incluye pares donde la respuesta correcta lleva la contraria con educación.
- **Sobrecorrección:** el modelo rechaza o evade peticiones legítimas porque el dataset premia la cautela. Mide la tasa de rechazos en peticiones legítimas (AI8) además de la de peticiones dañinas.
- **Colapso de diversidad:** la política converge a una respuesta tipo. Vigila la entropía y el KL.
- **Deriva del formato:** el KL demasiado bajo no deja aprender; demasiado alto rompe el formato. Ajusta β con el KL observado.

---

## 6.7 · Experimentos reproducibles y evaluación

«Con β=0,1 iba mejor» no vale si nadie puede reproducirlo. Cada ejecución registra:
- **Configuración completa** (hiperparámetros, método, modelo de partida) en un objeto inmutable (`dataclass(frozen=True)`).
- **Semilla** y versiones de librerías.
- **Huella de los datos** (SHA-256 del contenido, no solo el nombre del archivo).
- **Métricas** de entrenamiento (pérdida, KL, longitud, rewards) y de **evaluación**.
- Un **identificador de ejecución** derivado de la configuración (hash), de modo que la misma configuración dé el mismo id.

Y un test: **misma configuración ⇒ mismas métricas** (en CPU con semillas fijas, bit a bit; en GPU, hasta cierto ruido numérico y no determinismo de algunos kernels). Herramientas: JSONL versionado, MLflow (módulo I8), Weights & Biases (`report_to` en TRL).

**Evaluar la alineación** (AI4): golden set congelado; métricas objetivas (formato, exactitud, rechazos en peticiones legítimas, longitud); juez calibrado para criterios subjetivos; comparar **siempre contra el modelo de partida** y mirar efectos secundarios (capacidades generales, seguridad, diversidad). Una mejora de la recompensa de entrenamiento no es una mejora del producto.

---

## 6.8 · `DPOTrainer` y `GRPOTrainer`

**DPO:** `DPOConfig(beta=0.1, learning_rate=5e-6 … 5e-5 con LoRA, ...)`, `DPOTrainer(model, args, train_dataset, eval_dataset, processing_class=tok, peft_config=lora)`. Dataset con columnas `prompt`, `chosen`, `rejected`. Parte de un modelo **ya ajustado con SFT**. Vigila `rewards/accuracies`, `rewards/margins` y la longitud de las generaciones.

**GRPO:** `GRPOConfig(num_generations=8, max_completion_length=128, beta=…, learning_rate=1e-5, ...)`, `GRPOTrainer(model, reward_funcs=[f1, f2], args, train_dataset)`. Dataset con columna `prompt`. Cuida que `per_device_train_batch_size` sea compatible con `num_generations` (comprueba la documentación de tu versión de TRL). Generar es lo caro: empieza con pocos pasos y revisa muestras.

**Antes de lanzar:** (1) elige un modelo `-Instruct` pequeño **vigente** (0,5–3 B) y comprueba su licencia; (2) revisa los nombres de argumentos en la versión de TRL instalada; (3) entrenamiento de humo de 10–20 pasos; (4) registra todo (6.7).

---

## Glosario
- **Alineación:** acercar el comportamiento del modelo a lo que queremos (útil, veraz, seguro).
- **Preferencia:** par `(prompt, chosen, rejected)`.
- **Modelo de recompensa (RM):** modelo que puntúa respuestas; entrenado con Bradley-Terry.
- **Bradley-Terry:** `P(a ≻ b) = σ(r(a) − r(b))`.
- **RLHF / PPO:** aprendizaje por refuerzo con feedback humano; PPO usa política, referencia, RM y crítico.
- **DPO:** optimización directa de preferencias sin RM ni RL explícito.
- **GRPO:** RL con ventajas normalizadas por grupo, sin crítico.
- **RLVR:** RL con recompensas verificables por código.
- **π_ref:** política de referencia congelada.
- **β / KL:** peso de la restricción que mantiene la política cerca de la referencia.
- **Ventaja:** cuánto mejor es una respuesta que la media de su grupo.
- **Reward hacking:** explotar los huecos de la recompensa.
- **Sycophancy:** adulación; dar la razón al usuario aunque no la tenga.
- **Best-of-N:** generar N respuestas y elegir la de mayor puntuación.
