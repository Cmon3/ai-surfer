# Módulo DS3 · Estadística bayesiana — Apuntes

> Objetivo: expresar lo que sabes y lo que no como distribuciones de probabilidad, y decidir con ellas.

---

## 3.1 · Pensar en bayesiano

**Teorema de Bayes:** `posterior ∝ verosimilitud × prior`.
- **Prior:** lo que creías sobre el parámetro antes de ver los datos.
- **Verosimilitud:** cómo de probables son los datos para cada valor del parámetro.
- **Posterior:** lo que crees después. Es una **distribución**, no un número.

Qué ganas: respuestas directas («P(B > A) = 97 %»), incertidumbre propagada de forma natural (todo lo derivado del posterior hereda su incertidumbre), uso de información previa y modelos jerárquicos. Qué cuesta: elegir priors (hay que justificarlos) y, si no hay conjugada, cómputo (MCMC).

Un prior no es «subjetividad escondida» más que un umbral de significación o una elección de test: todo análisis hace supuestos; el bayesiano los escribe.

---

## 3.2 · Beta-Binomial y la elección del prior

Para una proporción `p` con `k` éxitos en `n` ensayos: `p ~ Beta(a, b)` y `k | p ~ Binomial(n, p)` dan `p | datos ~ Beta(a + k, b + n − k)`. Es una **conjugada**: el posterior tiene la misma familia que el prior y no hace falta simular.

- `a + b` es el **peso del prior** en observaciones. `Beta(1,1)` (plano) pesa 2; `Beta(2,58)` (media 3,3 %) pesa 60; `Beta(30,970)` pesa 1000.
- **Débil o informativo:** un prior *débil* evita valores imposibles sin dominar; uno *informativo* resume datos previos (histórico) y debe poder justificarse con ellos.
- **Con pocos datos manda el prior; con muchos lo anulan los datos.** En el notebook: 5/50 da 11,5 % con prior plano y 3,3 % con el informativo; con 100/2000 las diferencias se reducen mucho.
- **Análisis de sensibilidad:** repite el análisis con varios priors razonables y reporta si la conclusión cambia. Si cambia, lo honesto es decirlo.
- **Peligro:** un prior fuerte y equivocado con pocos datos arruina la cobertura (ver 3.8).

---

## 3.3 · A/B bayesiano

Con dos conversiones `pA`, `pB` y sus posteriores independientes, simulamos pares y calculamos:

- `P(B > A)`.
- **Uplift** relativo `(pB − pA)/pA` e intervalo creíble.
- **Pérdida esperada** de elegir B: `E[max(pA − pB, 0)]` (la «pena» media en puntos de conversión). Análogo para A.
- **Regla de decisión:** «despliega B si pérdida(B) < ε», con ε fijado con negocio *antes* (p. ej. 0,05 puntos). Si ninguna pérdida baja de ε, seguir recogiendo datos.

En el caso del notebook (A 120/4000, B 150/4000): `P(B>A)` ≈ 0,97, pérdida de B ≈ 0,00005 frente a 0,0074 de A; el test frecuentista da p = 0,063 («no significativo»). Mismos datos, pregunta distinta: el p-valor no responde a «¿despliego?».

**Mirar cada día.** Parar el test en cuanto «sale» infla los falsos positivos en **ambos** enfoques (en la simulación: ~23 % frecuentista y ~20 % bayesiano con umbral comparable frente a ~4–5 % mirando solo al final). El bayesiano no te exime de definir la regla de parada ni el tamaño muestral esperado.

---

## 3.4 · MCMC: Metropolis

Cuando el posterior no tiene fórmula, lo muestreamos con una cadena de Markov cuya distribución estacionaria es el posterior:
1. Propón `p' = p + N(0, s²)`.
2. Acepta con probabilidad `min(1, post(p')/post(p))` (la constante de normalización se cancela).
3. Repite; descarta el rodaje inicial (*burn-in*).

El **tamaño del paso** importa: demasiado pequeño → se acepta casi todo pero apenas se avanza (muestras muy correlacionadas, ESS ≈ 4 en el notebook); demasiado grande → casi todo se rechaza. Para una dimensión, una aceptación en torno al 40–50 % suele ser razonable.

---

## 3.5 · PyMC y NUTS

PyMC describe el modelo (priors + verosimilitud) y muestrea con **NUTS** (una variante adaptativa de Hamiltonian Monte Carlo): usa el gradiente del log-posterior para dar saltos largos y bien dirigidos. Escala a cientos de parámetros donde Metropolis no puede. Reglas:
- Valida siempre con un caso con solución exacta (conjugada) antes de fiarte del modelo complejo.
- Usa varias cadenas (≥ 4) para poder calcular R-hat.
- Fija `random_seed` para reproducir.
- Variables derivadas con `pm.Deterministic` (p. ej. el uplift).

---

## 3.6 · Modelos jerárquicos y *partial pooling*

25 tiendas, unas con 70 visitas y otras con 4000. Opciones:
- **Sin pooling:** `k_i/n_i` por tienda. Con 70 visitas es ruidoso (una tienda con 0 compras no tiene conversión 0).
- **Pooling total:** una tasa común. Ignora diferencias reales.
- **Partial pooling:** `logit θ_i = μ + σ · z_i`, `z_i ~ N(0,1)`; `μ` y `σ` se estiman. Cada tienda se «encoge» hacia la media tanto más cuanto menos datos tiene.

En el notebook el error (RMSE) frente a la tasa real baja de 0,0129 (sin pooling) y 0,0159 (total) a 0,0093 (partial), y la mejora es mayor en las tiendas con pocas visitas. Para una tienda **nueva** sin datos, el modelo predice con `μ` y `σ` (conversión esperada ≈ 3,5 %, intervalo amplio): es honesto con lo que no sabe.

La forma `μ + σ·z` es la parametrización **no centrada**; evita problemas de muestreo (3.7).

---

## 3.7 · Diagnóstico

Antes de interpretar un posterior:
- **R-hat** (compara varianza entre cadenas y dentro): < 1,01.
- **ESS** (bulk y tail): cientos como mínimo para medias; más para colas/intervalos.
- **Divergencias:** trayectorias que NUTS no pudo integrar bien; indican geometría difícil (típicamente el «embudo» entre `σ` y los efectos individuales). Se arreglan reparametrizando (no centrado) o subiendo `target_accept`.
- **Trazas:** sin tendencia ni atascos; cadenas superpuestas.
- **Comprobación predictiva a posteriori:** simula datos con el modelo ajustado y compara estadísticos (máximo, mínimo, dispersión) con los observados.

Ejemplo del notebook: el modelo centrado de «ocho tiendas» da ~80 divergencias y ESS(τ) ~160; el no centrado, ESS ~2000 y casi sin divergencias. **Un posterior con diagnósticos malos no se interpreta.**

---

## 3.8 · Bayesiano frente a frecuentista

| | Frecuentista | Bayesiano |
|---|---|---|
| Parámetro | fijo, desconocido | distribución |
| Intervalo | el procedimiento acierta el X % | el parámetro está dentro con X % de prob. (dado el modelo) |
| Pregunta típica | ¿rechazo H0? | ¿cuál es la probabilidad de que B sea mejor? ¿cuánto pierdo? |
| Información previa | no entra | entra vía prior |
| Coste | bajo | prior + cómputo |

Con prior plano y muchos datos los intervalos casi coinciden. La **cobertura** frecuentista de un intervalo creíble con prior razonable es buena, y con prior fuerte y acertado es mejor (más estrecho); con prior fuerte y equivocado y pocos datos puede ser desastrosa (en el notebook, 0 % con n=30 y 100). Por eso: justifica el prior y haz sensibilidad.

**Cómo comunicarlo:** una frase («hay un 97 % de probabilidad de que B mejore la conversión; el uplift más probable ronda el +25 %, con rango del −0,3 % al +56 %»), una cifra de riesgo (pérdida esperada, euros) y la regla de decisión pactada.

---

## Glosario
- **Prior / posterior:** distribución del parámetro antes / después de ver datos.
- **Conjugada:** prior cuya familia se conserva en el posterior.
- **Intervalo creíble:** intervalo con probabilidad X % según el posterior.
- **Pérdida esperada:** coste medio de una decisión sobre el posterior.
- **MCMC:** muestreo con cadenas de Markov. **NUTS:** muestreador de PyMC.
- **R-hat / ESS:** diagnósticos de convergencia / muestras efectivas.
- **Divergencia:** fallo de integración en NUTS.
- **Partial pooling:** estimación compartida parcialmente entre grupos.
- **No centrada:** parametrización `μ + σ·z` que facilita el muestreo.
