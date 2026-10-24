---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# DS6 · Forecasting avanzado
## Muchas series · Modelos globales · Intervalos · Jerarquías

*AI Surfer · N3 Data Science*

---

# Qué cambia con 100 series

- Un protocolo de evaluación común
- Modelos que comparten información
- Cifras coherentes entre niveles
- Incertidumbre para decidir stock

---

# 6.2 · Métricas

- **MASE**: error / error del ingenuo estacional. < 1 = mejor
- **WAPE** = Σ|error| / Σ ventas
- **Sesgo** = Σ(previsión − real) / Σ real
- Evita MAPE con ceros

---

# 6.3 · Backtesting con origen rodante

4 orígenes × 28 días: el modelo solo ve el pasado
- Sin fugas: ventanas calculadas en el origen
- No elijas parámetros con los pliegues de evaluación

---

# 6.4 · Locales

| modelo | WAPE |
|---|---|
| ingenuo | 0,43 |
| estacional | 0,42 |
| media 4 semanas | 0,34 |
| ETS por serie | 0,33 |

---

# 6.5 · Un modelo global

- Filas: serie × origen × horizonte
- Retardos, ventanas, calendario, **promos**, identificadores
- **Escalar por serie** + pérdida Poisson
- WAPE ≈ 0,29 · sesgo ≈ 0

---

# 6.6 · Intervalos

- Cuantílica: q10 y q90
- Conformal: calibra con errores del pliegue anterior
- Cobertura objetivo 0,80 → ≈ 0,77–0,80
- Cae con el horizonte

---

# 6.7 · Jerarquías

- Previsiones independientes no cuadran
- Bottom-up · top-down · OLS/WLS/MinT
- Con un global fuerte, el bottom-up gana
- Se decide con backtesting

---

# 6.8 · Modelos fundacionales

- Chronos, TimesFM, Moirai… (comprueba el vigente)
- Mismo backtesting, mismas métricas, mismos rivales
- Cuidado con la contaminación de datos

---

# Caso práctico

Panel multiserie público: backtesting, modelo global, intervalos al 80 %, jerarquía y una página para negocio.
