# Módulo F4 · Matemáticas para ML — Apuntes

> Objetivo: que las matemáticas dejen de ser un muro y pasen a ser una herramienta. Todo lo que aparece aquí se puede **comprobar con NumPy**, y el notebook lo hace.

---

## 4.1 Vectores: los datos son puntos

Un **vector** es una lista de números con un orden. Un cliente de *TiendaSur* es un vector: `(edad, gasto_mensual, nº_pedidos)`. Todo lo que hacemos en ML se reduce a medir **distancias** o **similitud** entre vectores.

- **Norma** (∥v∥): la "longitud" del vector. En NumPy: `np.linalg.norm(v)`.
- **Distancia euclídea** entre a y b: `np.linalg.norm(a - b)`.
- **Producto punto** (dot product): `a @ b` — mide alineación. Grande cuando los vectores "apuntan" en la misma dirección; cero cuando son perpendiculares. Es la base del **similitud coseno** (`a @ b / (‖a‖·‖b‖)`).

**Por qué importa:** "clientes parecidos", "productos relacionados" y "documentos con el mismo tema" comienzan todos como "vectores próximos". El clustering (I1) y las búsquedas con embeddings (AI3) son exactamente esto.

---

## 4.2 Matrices: los DataFrames son tablas de números

Un dataset con *n* filas y *p* columnas numéricas es una matriz `X ∈ ℝ^{n×p}`:

```
X = [[edad₀, gasto₀, pedidos₀],
     [edad₁, gasto₁, pedidos₁],
     ...]
```

**Operaciones que necesitarás en ML:**

| Operación | NumPy | Significado |
|---|---|---|
| `X @ v` | producto matriz × vector | "aplicar" una transformación a todas las filas |
| `X.T` | transponer | cambiar filas por columnas |
| `X @ X.T` | gramiana | similitud entre filas (distancia/similitud entre individuos) |
| `X.T @ X` | covarianza (sin centrar) | relación entre columnas (variables) |
| `np.cov(X.T)` | covarianza centrada, la de verdad | la usará el PCA (I1) |

**Regla de dimensiones:** para que `A @ B` exista, el número de columnas de A debe ser el número de filas de B. `(n×p) @ (p×q) → (n×q)`.

**Ejemplo mental:** una **regresión lineal** `y ≈ X @ w + b` es literalmente "pesar cada columna y sumar": `w` es el vector de pesos y `X @ w` la predicción. Entrenar es **elegir el `w` que minimiza el error** — y ahí aparece el gradiente.

---

## 4.3 El gradiente y el descenso de gradiente

**La idea.** Para una función `f(x)`, el **gradiente** ∇f es el vector que apunta a donde `f` **crece más rápido**. Si quieres **minimizar** f (el error del modelo), camina en la dirección contraria:

```
x_nuevo = x_actual - lr * gradiente(x_actual)
```

**Ejemplo manual:** `f(x) = x²` tiene gradiente `2x`. Punto de partida `x = 10`, LR = 0.1:

- paso 1: `x = 10 - 0.1·20 = 8`
- paso 2: `x = 8 - 0.1·16 = 6.4`
- … converge a 0.

**El gradiente en varias variables** es el vector de derivadas parciales. Para `f(x, y) = x² + y²`, el gradiente en `(3, 4)` es `(6, 8)` y apunta "hacia el cuadrante positivo": camina al revés y llegas al mínimo `(0, 0)`.

**Por qué LR importa.** Una **tasa de aprendizaje (LR)** grande da pasos largos: pueden sobrepasar el mínimo y oscilar. Una LR pequeña converge lento. En la práctica se prueba 0.001, 0.01, 0.1 y se observa. En I2 (regresión) e I5 (deep learning) este mismo mecanismo entrena los modelos.

**Ejemplo en ML:** minimizar el **error cuadrático medio (MSE)** de un modelo `y ≈ w·x + b`.

---

## 4.4 Derivadas: razones de cambio

La derivada de `f` en un punto mide **a qué ritmo cambia f** cuando muevo x un poquito. En negocio: "si subo el precio un 1 %, ¿cuánto caen las ventas?" — una derivada en acción (elasticidad).

NumPy no calcula derivadas simbólicas; lo hacemos numéricamente:

```python
def derivada(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)
```

Con esta función puedes **verificar a mano** cualquier gradiente que escribas — y es la manera más honesta de depurar un modelo hecho a mano.

---

## 4.5 Probabilidad condicionada y Bayes

**Probabilidad condicionada:** P(A | B) — "la probabilidad de A, sabiendo que B ha pasado". Fórmula: P(A|B) = P(A y B) / P(B).

**El teorema de Bayes** conecta las dos direcciones:

```
P(A | B) = P(B | A) · P(A) / P(B)
```

**Lectura de negocio:**

- `P(compra | abre email)` — "de los que abren, ¿cuántos compran?" (lo que te interesa).
- `P(abre email | compra)` — "de los compradores, ¿cuántos abrieron?" (lo que a veces mides).
- `P(compra)` — la proporción general (**probabilidad previa**, *prior*).

**Por qué importa:** el error típico de negocio es interpretar `P(abre | compra)` como `P(compra | abre)`. La corrección con el prior es lo que permite separar señales reales de coincidencias frecuentes.

**Ejemplo con números** (se repite en el notebook): el 10 % de los clientes abre el email; el 8 % de los que abren, compra; el 5 % general compra. Entonces:

```
P(compra | abre) = P(abre | compra) · P(compra) / P(abre)
                 = ...  →  0.4 ≈ 40 % (mucho más que el 5 % del prior)
```

**Idea que te llevas:** las probabilidades **se actualizan**, no se fijan. Un dato nuevo (abrió el email) mueve tu creencia del 5 % al 40 %. Eso es Bayes, y también es la lógica del test A/B de I3 y del bayesiano de DS3.

---

## 4.6 Simulación: comprobar las teorías a mano

Con `rng = np.random.default_rng(42)` puedes generar escenarios y **contar** lo que la teoría predice.

Ejemplo: para comprobar el resultado de Bayes de arriba, simula 10 000 clientes, genera "abre el email" con p = 0.1 y "compra" con p = 0.4 condicionado al email, y cuenta la fracción que compra entre los que abren. La fórmula y la simulación deben coincidir.

**Por qué es valioso:** la simulación es tu red de seguridad. Si una fórmula dice una cosa y 10 000 simulaciones dicen otra, crees a la simulación y revisas la fórmula. Esta destreza es exactamente la que harás en I1, I3 y DS2.

---

## Resumen del módulo

- Los datos son **vectores y matrices**; las distancias y los productos punto son las herramientas de "parecido".
- **Gradiente** = dirección de máxima subida; minimizar = ir al revés, con un paso controlado por la **tasa de aprendizaje**.
- **Derivadas** = razones de cambio (elasticidad, sensibilidad).
- **Bayes** conecta P(A|B) con P(B|A) y corrige intuiciones con el prior.
- La **simulación** es el examen de la fórmula: si no coinciden, la fórmula está mal.
