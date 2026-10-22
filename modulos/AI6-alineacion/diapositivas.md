---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI6 · Alineación y post-entrenamiento

*AI Surfer · N3-AI*

---

# El orden del post-entrenamiento

**SFT** (imita) → **RM** (aprende preferencias) → **DPO/GRPO** (aprende a preferir) → eval (AI4)

---

# RM logístico

`r(x) = w·x` · pérdida: −logσ(r_w − r_l)
Del par (preferida, rechazada) se aprende qué valoran los humanos.

---

# DPO

`L = −logσ( β·[(logπ−logπ_ref)_w − (logπ−logπ_ref)_l] )`
Sin RL explícito. β alta → tibio; β baja → lento/inestable.
π_ref congelada: la referencia no se desbarrá.

---

# GRPO

Recompensa normalizada **dentro del grupo** de respuestas → se refuerza por ventaja. Sin value model (vs PPO).

---

# Registro

Seed + dataset v1.1 + β/lr + judge (AI4) = comparación fair. Sin registro, la alineación es una opinión.
