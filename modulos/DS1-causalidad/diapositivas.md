---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# DS1 · Inferencia causal
## DAGs · Ajuste · Propensity score · DiD · IV · RDD · Uplift

*AI Surfer · N3 Data Science avanzada*

---

# Por qué este módulo

- «Los que usan la app gastan más» ≠ «la app hace gastar más»
- Ofertas de Data Scientist de producto y marketing: *causal inference, uplift, experimentación*
- Hoy: datos simulados con **efecto real conocido** para ver qué método acierta
- Al terminar: un estudio causal para tu portafolio

---

# Mapa del módulo

1. Resultados potenciales y DAGs
2. Confusores, mediadores y colisionadores
3. Regresión con ajuste
4. Propensity score (emparejamiento, IPW)
5. Diferencias en diferencias
6. Variables instrumentales
7. Regresión discontinua
8. Uplift modeling
9. Qué método elegir

---

# Resultados potenciales

- Cada cliente tiene Y(1) e Y(0); solo vemos uno
- Efecto individual: Y(1) − Y(0) → **inobservable**
- Estimamos promedios: **ATE · ATT · LATE**
- Diferencia de medias = efecto + **sesgo de selección**

---

# DAG y puerta trasera

```
fidelidad ──► app ──► pedidos ──► gasto
    └─────────────────────────────►┘
```

- Flecha = «causa directa» (tu hipótesis, no un resultado)
- Ajusta por lo que **cierra** las puertas traseras
- No ajustes por descendientes del tratamiento

---

# Tres papeles, tres decisiones

| Papel | Estructura | ¿Ajustar? |
|---|---|---|
| Confusor | Z → X, Z → Y | Sí |
| Mediador | X → M → Y | Efecto total: no |
| Colisionador | X → C ← Y | **Nunca** |

Simulación (efecto real = 2): 3,47 · 1,01 · 0,48

---

# Datos observacionales: la app

- Ingenua: **+19 €** · Real: **+8 €**
- Regresión con ajuste: 8,45
- IPW 8,2 · Emparejamiento 8,2 · AIPW 8,4
- Antes de fiarte: **solapamiento** y **equilibrio (SMD < 0,1)**

---

# Propensity score

- e(x) = P(T=1 | x): un número que resume las covariables
- **Emparejar:** cada tratado con un control de ps parecido (ATT)
- **IPW:** pesos 1/e y 1/(1−e) (ATE)
- Pesos enormes → falta de solapamiento → recorta y acota la población

---

# Diferencias en diferencias

DiD = (Δ tratadas) − (Δ control)

- Quita diferencias fijas y shocks comunes
- Supuesto: **tendencias paralelas**
- Evidencia: estudio de eventos (coeficientes previos ≈ 0)
- Con pendiente distinta: 8,5 en lugar de 6 → el test lo delata

---

# Variables instrumentales

- Confusor **no observado** → ajustar no sirve
- Instrumento Z: **relevante**, **exógeno**, **exclusión**
- 2SLS / Wald → efecto en cumplidores (LATE)
- F > 10; débil = estimaciones erráticas (σ de 2,5 a 270)

---

# Regresión discontinua

- Regla con umbral: cupón si gasto ≥ 100 €
- Compara a quienes están justo a ambos lados
- Regresión lineal local + varios anchos de banda
- Comprueba que nadie manipula el corte

---

# Uplift: ¿a quién enviamos el cupón?

| Tipo | Efecto del cupón |
|---|---|
| Persuadibles | + |
| Seguros | 0 (dinero regalado) |
| Causas perdidas | 0 |
| «Perros dormidos» | − |

Modelo de respuesta ≠ modelo de uplift

---

# S-learner y T-learner

- **S:** un modelo con T como variable → f(x,1) − f(x,0)
- **T:** dos modelos → f₁(x) − f₀(x)
- Evaluar con **curva Qini** en un conjunto aleatorizado
- Del Qini al beneficio: (margen − cupón) · compras − margen · compras contrafactuales

---

# Qué método según el diseño

| Diseño | Método |
|---|---|
| Aleatorizado | A/B |
| Confusores observados | Ajuste · PS |
| Antes/después con control | DiD |
| Instrumento | IV |
| Umbral | RDD |
| ¿A quién tratar? | Uplift |

---

# Cómo contarlo en una entrevista

1. Pregunta causal y efecto
2. DAG
3. Método y supuesto no comprobable
4. Diagnósticos y robustez
5. Incertidumbre y decisión
6. Qué cambiaría la conclusión

---

<!-- _class: lead -->
# Caso práctico

Estudio causal de una decisión: DAG, 2 métodos, robustez y recomendación
