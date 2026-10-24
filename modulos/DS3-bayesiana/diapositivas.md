---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# DS3 · Estadística bayesiana
## Conjugadas · A/B · MCMC · PyMC · Jerárquicos

*AI Surfer · N3 Data Science*

---

# Por qué este módulo

- «¿Es B mejor?» se responde con una probabilidad y un riesgo, no con «p = 0,063»
- Pocos datos por grupo (tiendas, segmentos): el bayesiano lo maneja bien
- Ofertas de DS con experimentación piden A/B, incertidumbre y modelos jerárquicos

---

# 3.1 · Bayes en una línea

**posterior ∝ verosimilitud × prior**

- Prior: lo que sabías
- Verosimilitud: lo que dicen los datos
- Posterior: una distribución, no un número

---

# 3.2 · Beta-Binomial

`Beta(a,b)` + `k` de `n` → `Beta(a+k, b+n−k)`

- `a+b` = peso del prior en visitas
- Pocos datos: manda el prior · Muchos: mandan los datos
- Siempre: análisis de sensibilidad

---

# 3.3 · A/B bayesiano

- `P(B > A)`
- Pérdida esperada: `E[max(pA − pB, 0)]`
- Regla pactada **antes**: desplegar si pérdida < ε
- A 120/4000 vs B 150/4000: p = 0,063 pero `P(B>A)` ≈ 97 %

---

# Mirar cada día

- Parar al primer «éxito» infla falsos positivos en **ambos** enfoques
- El bayesiano no te exime de planificar la regla de parada

---

# 3.4 · Metropolis

1. Propón `p' = p + ruido`
2. Acepta con `min(1, post(p')/post(p))`
3. Repite y descarta el rodaje

Paso pequeño: aceptas todo, avanzas nada (ESS ≈ 4)

---

# 3.5 · PyMC + NUTS

```python
with pm.Model():
    p = pm.Beta("p", 1, 1)
    pm.Binomial("y", n=n, p=p, observed=k)
    idata = pm.sample(1000, chains=4)
```
Valida contra la solución exacta

---

# 3.6 · Partial pooling

- Sin pooling: ruidoso · Pooling total: ciego a diferencias
- Jerárquico: `logit θᵢ = μ + σ·zᵢ`
- Encoge más a quien tiene menos datos
- Tienda nueva: se predice con `μ` y `σ`

---

# 3.7 · Diagnóstico

- R-hat < 1,01 · ESS en cientos · divergencias ≈ 0
- Trazas como «césped»
- Comprobación predictiva
- Centrado → divergencias; no centrado → arregla

---

# 3.8 · Frente al frecuentista

- Intervalo creíble: probabilidad sobre el parámetro
- Prior fuerte y equivocado + pocos datos = cobertura 0 %
- Comunicar: probabilidad + riesgo + regla

---

# Caso práctico

Informe de un A/B (real o simulado): prior justificado, `P(B>A)`, pérdida esperada, jerárquico si hay segmentos, diagnósticos.
