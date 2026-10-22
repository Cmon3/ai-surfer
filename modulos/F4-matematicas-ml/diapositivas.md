---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# F4 · Matemáticas para ML
## Matemáticas con NumPy, sin lápiz y papel

*AI Surfer · N1 Fundamentos*

---

# Mapa del módulo

| Pieza | Pregunta que responde |
|---|---|
| Vectores | ¿Qué representa un cliente como punto? |
| Matrices y covarianza | ¿Qué variables del dataset van juntas? |
| Gradiente | ¿Cómo "aprende" una recta que predice gasto? |
| Derivadas | ¿Por qué un paso pequeño es seguro y uno grande oscila? |
| Bayes | Si un cliente abre el email, ¿cuánto sube P(compra)? |
| Simulación | ¿Coincide la teoría con 50 000 réplicas? |

---

# Clientes como puntos

- Un cliente = vector `(gasto, pedidos, ticket_medio)`
- "Parecidos" = puntos próximos (distancia)
- Complemento: similitud coseno por la dirección

```python
np.linalg.norm(a - b)          # distancia
(a @ b) / (norm(a)·norm(b))    # coseno
```

---

# Un DataFrame es una matriz

- n filas × p columnas, `X ∈ ℝ^(n×p)`
- `X @ w` pondera cada columna: las predicciones
- La matriz de covarianza dice qué columnas van juntas
- Con ella llegará el PCA (módulo I1)

---

<!-- _class: lead -->
# El gradiente: la dirección de subida

*Para minimizar, camina al revés.*

---

# Descenso desde cero

`f(x) = x², gradiente 2x`

| paso | x |
|---|---|
|₀ | 10 |
|₁ | 8 |
|₂ | 6.4 |
|ₙ | 0 |

La misma regla, con millones de pesos, entrena un transformer (AI1–AI7).

---

<!-- _class: lead -->
# ¿Cuánto "aprendió" la recta?
## La práctica guiada lo hace con NumPy a mano y comprueba w ≈ 15.

---

# La derivada como red de seguridad

```python
def derivada_numerica(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)
```

Compara el gradiente escrito a mano con la derivada numérica: si discrepan, la fórmula está mal.

---

# Probabilidad condicionada

```
P(A|B) = P(A y B)/P(B)
```

P(compra | abre el email) ≠ P(abre | compra) — distinto denominador.

---

# Teorema de Bayes

```
P(compra | abre) = P(abre | compra)·P(compra)/P(abre)
```

Con los datos de TiendaSur: P(compra) pasa de 5 % a 40 % si el cliente abrió el email.

---

# La simulación como red de seguridad

1. Escribe la fórmula.
2. Simula 50 000 réplicas.
3. Cuenta lo que la teoría predice.
4. Si discrepan → revisa la fórmula.

---

<!-- _class: lead -->
# Resumen
**Vectores → covarianza → gradiente → Bayes**

Lo retomamos en I1 (clustering), I3 (test A/B) y DS3 (bayesiana completa).
