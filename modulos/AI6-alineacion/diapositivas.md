---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI6 · Alineación y post-entrenamiento
## Preferencias · DPO · GRPO · reproducibilidad

*AI Surfer · N3-AI Engineering*

---

# Por qué este módulo

- Nicho de plus salarial: RLHF, DPO, RL con recompensas verificables
- Se valora: entender qué optimiza cada método, **detectar reward hacking**, experimentos **reproducibles**
- Entregable: un experimento de alineación con registro y evaluación

---

# El pipeline

```
Base → SFT → Preferencias (DPO / RLHF) → RL verificable (GRPO)
```

| Método | Necesita |
|---|---|
| DPO | pares chosen/rejected + π_ref |
| RLHF/PPO | RM + crítico + RL |
| GRPO | función de recompensa verificable |

---

# Datos de preferencias

```json
{"prompt": [...], "chosen": [...], "rejected": [...]}
```

- Misma instrucción, `chosen ≠ rejected`
- Longitudes equilibradas
- Cuidado: autopreferencia y verborrea del juez

---

# Modelo de recompensa

`P(a ≻ b) = σ(r(a) − r(b))`

`L = −log σ(r(chosen) − r(rejected))`

Gradiente: `−σ(−Δr)·(x_w − x_l)` — verificado contra autograd.

El RM hereda el **sesgo** de sus etiquetas.

---

# Reward hacking

- El RM es un **proxy**
- Best-of-N: la puntuación sube, la utilidad real no la sigue
- La longitud tiende a 1: el modelo se vuelve verboso
- Defensas: KL, datos equilibrados, evaluación independiente

---

# DPO

`L = −log σ( β [ (log π − log π_ref)_w − (log π − log π_ref)_l ] )`

- Sin RM ni RL: pérdida supervisada sobre pares
- **β grande ⇒ conservadora** (KL bajo) · β pequeño ⇒ se aleja
- Verificado: log 2, gradiente analítico, `gradcheck`

---

# Barrido de β (juguete)

| β | KL | utilidad real |
|---|---|---|
| 0,05 | alto | alta |
| 1 | medio | media |
| 5 | ≈ 0 | ≈ referencia |

Elige β mirando KL **y** tu evaluación.

---

# GRPO

1. Muestrear un **grupo** de G respuestas
2. Recompensas **verificables** (JSON válido, campos, total exacto)
3. Ventaja = `(r − media)/(std + ε)` — sin crítico
4. `−E[A·log π] + β_KL·KL`

Grupo con recompensas iguales ⇒ ventaja 0 ⇒ sin señal.

---

# Reward hacking en directo

| Recompensa | Política aprende |
|---|---|
| formato + brevedad | `{}` (98 %) |
| + campos + exacto | respuesta correcta (98 %) |

Se arregla **la recompensa**, no entrenando más.

---

# Registro reproducible

- Config inmutable · semilla · huella SHA-256 de los datos
- `run_id` = hash de la config · JSONL
- Test: **misma config ⇒ mismas métricas**
- Evaluar contra el modelo de partida (AI4) y mirar efectos secundarios

---

<!-- _class: lead -->
# En Colab

`DPOTrainer` (columnas prompt/chosen/rejected, `beta`) · `GRPOTrainer` (`reward_funcs`, `num_generations`)

Comprueba el modelo vigente y la versión de TRL.

**Alinear sin medir es una opinión.**
