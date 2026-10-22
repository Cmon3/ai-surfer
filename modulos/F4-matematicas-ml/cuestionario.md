# Módulo F4 · Matemáticas para ML — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min. Consulta los apuntes y el notebook si dudas.

---

**1.** Un dataset con 500 clientes y 3 columnas numéricas (`gasto`, `pedidos`, `ticket_medio`) se puede ver como
- a) un vector de 500 elementos.
- b) una matriz de 500×3.
- c) una matriz de 3×500.
- d) un escalar.

---

**2.** ¿Qué calcula `np.linalg.norm(a - b)` cuando `a` y `b` son dos filas del dataset?
- a) la covarianza entre las dos filas.
- b) el producto punto.
- c) la distancia euclídea entre los dos clientes.
- d) la media de las diferencias.

---

**3.** Si X es 100×4, ¿qué dimensiones tiene `X @ w` con `w` el vector de pesos de la regresión (4 valores)?
- a) 100×4.
- b) 4×1.
- c) 100.
- d) 4.

---

**4.** La similitud coseno entre dos vectores vale 1 cuando…
- a) son idénticos en magnitud.
- b) apuntan exactamente en la misma dirección (ángulo 0).
- c) son perpendiculars.
- d) el producto punto es negativo.

---

**5.** La tasa de aprendizaje (lr) en descenso de gradiente controla…
- a) el número de iteraciones totales.
- b) el tamaño del paso dado en cada iteración.
- c) la forma de la función de error.
- d) el valor inicial de w.

---

**6.** Si lr es demasiado grande, el descenso de gradiente…
- a) converge siempre igual, solo más rápido.
- b) puede oscilar alrededor del mínimo o divergir.
- c) se atasca en mínimos locales.
- d) da exactamente el mismo resultado que con lr pequeña.

---

**7.** El gradiente de una función en un punto…
- a) es perpendicular a la superficie en ese punto.
- b) apunta hacia el mínimo global.
- c) es la dirección en la que la función crece más rápido.
- d) cambia de valor con cada iteración de un modelo.

---

**8.** Para `f(x) = x²` y lr = 0.1, ¿desde x₀ = 10 a cuánto llega en el primer paso?
- a) 9.
- b) 8.
- c) 6.4.
- d) depende del random seed.

---

**9.** En el notebook se usa `derivada_numerica(f, x, h=1e-5)` para verificar gradientes escritos a mano. ¿Por qué es buena idea?
- a) Porque la derivada numérica es exacta siempre.
- b) Es rápida y si la fórmula manual está mal, la comparación lo muestra inmediatamente.
- c) Porque NumPy no soporta derivadas simbólicas.
- d) Porque es más precisa que SymPy.

---

**10.** En la campaña de email, P(compra) = 0.05 y P(compra | abre) = 0.40. En lenguaje de negocio, ¿qué significa?
- a) Que el 40 % de los clientes abrió el email.
- b) Que abrir el email multiplica por ~8 la probabilidad de comprar respecto al promedio.
- c) Que el 5 % de los que abren compra.
- d) Que Bayes no aplica porque las probabilidades no suman 1.

<details><summary>Soluciones</summary>

1. **b**, cada fila un cliente, cada columna una variable.
2. **c**.
3. **c**, (100×4) @ (4,) → (100,).
4. **b**.
5. **b**.
6. **b**.
7. **c** (la dirección de máximo crecimiento; hay de minimizar se camina al revés).
8. **b**.
9. **b**.
10. **b**: 0.40 / 0.05 = 8.
</details>
