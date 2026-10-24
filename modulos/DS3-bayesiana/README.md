# Módulo DS3 · Estadística bayesiana

**N3-DS · ~8 horas** · Pasar de «p < 0,05» a «hay un 97 % de probabilidad de que B sea mejor y, si me equivoco, pierdo esto». Lo piden las ofertas de *Data Scientist* con experimentación (A/B), marketing analytics y producto; y es la base para entender modelos jerárquicos, incertidumbre y muchos modelos modernos.

## Objetivos
Al terminar este módulo podrás:
- Calcular posteriores **conjugados** (Beta-Binomial) y elegir un *prior* débil o informativo justificándolo.
- Analizar un **test A/B bayesiano**: `P(B > A)`, pérdida esperada y regla de decisión acordada de antemano.
- Implementar un **Metropolis** sencillo y explicar qué hace un muestreador MCMC.
- Definir y muestrear modelos en **PyMC**, y comprobarlos con **ArviZ** (R-hat, ESS, trazas, divergencias).
- Construir un **modelo jerárquico** con *partial pooling* para unidades con pocos datos.
- Comparar con el enfoque frecuentista (cobertura, interpretación, mirar el test cada día).

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 3.1 | Pensar en bayesiano: prior, verosimilitud, posterior | 15 min |
| 3.2 | Beta-Binomial y la elección del prior | 15 min |
| 3.3 | A/B bayesiano: probabilidad, pérdida esperada y decisión | 20 min |
| 3.4 | MCMC: Metropolis desde cero | 15 min |
| 3.5 | PyMC y NUTS | 15 min |
| 3.6 | Modelos jerárquicos y *partial pooling* | 20 min |
| 3.7 | Diagnóstico: R-hat, ESS, trazas, divergencias, comprobación predictiva | 15 min |
| 3.8 | Bayesiano frente a frecuentista y cómo comunicarlo | 10 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; PDF con `scripts/generar_diapositivas.sh DS3`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con 5 ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos por lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones de los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — TiendaSur: conjugadas y priors, A/B (120/4000 frente a 150/4000: p-valor 0,063 pero `P(B>A)` ≈ 97 %), simulación de «mirar cada día», Metropolis con R-hat y ESS, mismo modelo en PyMC, 25 tiendas con *partial pooling* (menor error que sin pooling y que pooling total), comprobación predictiva, el caso de «ocho tiendas» con divergencias y un estudio de cobertura. Se ejecuta en CPU en menos de 20 s.

**Requisitos:** `pip install pymc arviz` (no están en el `requirements.txt` base del curso).

## Caso práctico (entregable)
Informe de una página (notebook + resumen) sobre un experimento A/B **real o simulado** (tuyo o de un dataset abierto) que incluya:
1. Prior elegido y justificado, con análisis de sensibilidad (al menos dos priors).
2. `P(B > A)`, intervalo del uplift y pérdida esperada de cada decisión.
3. Regla de decisión definida *antes* de mirar los datos y recomendación en euros.
4. Si hay varios segmentos o tiendas: modelo jerárquico y comparación con sin pooling.
5. Diagnósticos de MCMC (R-hat, ESS, divergencias) y una comprobación predictiva.

**Criterios:** corrección del modelo y diagnósticos 30 % · decisión y pérdida esperada 25 % · justificación y sensibilidad del prior 20 % · comunicación a un no técnico 25 %.

> Pieza de portafolio: «experimentación bayesiana con decisión de negocio» diferencia un perfil de Data Scientist de uno que solo sabe lanzar un t-test.

## Autoevaluación
1. ¿Qué significa que un prior `Beta(2, 58)` «pesa como 60 visitas»?
2. ¿Qué diferencia hay entre «hay un 95 % de probabilidad de que p esté en el intervalo» y la interpretación de un IC frecuentista?
3. ¿Por qué la pérdida esperada ayuda más a decidir que `P(B > A)` sola?
4. Tu R-hat es 1,3 y el ESS 12. ¿Qué haces?
5. ¿Cuándo el *partial pooling* ayuda más que el no pooling?

<details><summary>Respuestas</summary>

1. Que equivale a haber visto 60 visitas previas (2 compras y 58 no compras); con muchos más datos nuevos, el prior casi no influye.
2. El intervalo creíble es una afirmación de probabilidad sobre el parámetro (dados modelo y prior). El IC frecuentista habla del procedimiento: el 95 % de los intervalos así construidos contendrían el valor real.
3. `P(B > A)` no dice cuánto se pierde si te equivocas. La pérdida esperada pondera por la magnitud del error y se compara con un umbral de negocio.
4. No interpretas el posterior. Las cadenas no han convergido: más iteraciones, mejor paso o reparametrización, revisa trazas y el modelo.
5. Con pocos datos por unidad (muy ruidosas) y unidades parecidas entre sí; con muchos datos por unidad ambos coinciden.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: *Bayesian Modeling and Computation in Python* (gratis online) y la documentación de PyMC.
