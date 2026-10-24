---
marp: true
theme: default
paginate: true
math: mathjax
title: Módulo I2 · Regresión y predicción
---

<!-- _class: lead -->

# Módulo I2
## Regresión y predicción

Ciencia de Datos e IA Aplicada: de los datos a las decisiones
N2 · Intermedio

---

## El caso de esta semana

- Un hospital quiere **anticipar la progresión de la diabetes** a un año
- 442 pacientes · 10 variables clínicas
- Objetivo: **priorizar seguimientos** con recursos limitados
- Dos preguntas distintas:
  - ¿Qué variables se asocian con la progresión? → **explicar**
  - ¿Cuánto progresará un paciente nuevo? → **predecir**

> Un coeficiente de regresión **no es un efecto causal** sin un diseño adecuado.

---

<!-- _class: lead -->

# 3.1
## De la correlación a la recta de regresión; mínimos cuadrados

---

<!-- 3.1-1 -->
## De la correlación a una regla

- Correlación IMC–progresión: $r = 0{,}59$
- Útil, pero no responde: *con IMC 30, ¿qué progresión espero?*
- Necesitamos una **regla de predicción**:

$$\hat{y} = \beta_0 + \beta_1 x$$

| Símbolo | Significado |
|---|---|
| $\beta_0$ | intercepto: predicción si $x = 0$ |
| $\beta_1$ | pendiente: cambio en $\hat y$ por unidad de $x$ |

---

<!-- 3.1-2 -->
## Residuos: lo que la recta no explica

$$e_i = y_i - \hat{y}_i$$

```
  y │        •
    │      • ┆e₄      ← residuo = distancia vertical
    │   •───────── recta
    │ • ┆e₂  •
    └──────────────── x
```

- Positivo: el paciente progresa **más** de lo predicho
- Negativo: progresa **menos**

---

<!-- 3.1-3 -->
## Mínimos cuadrados ordinarios (MCO)

$$\min_{\beta_0,\beta_1}\ \sum_{i=1}^{n}\left(y_i - \beta_0 - \beta_1 x_i\right)^2$$

¿Por qué al cuadrado?
- Positivos y negativos no se cancelan
- Los errores grandes pesan más
- Solución cerrada y única

---

<!-- 3.1-4 -->
## La pendiente es una correlación con unidades

$$\hat\beta_1 = r_{xy}\,\frac{s_y}{s_x} \qquad \hat\beta_0 = \bar y - \hat\beta_1\bar x$$

- Variables estandarizadas → pendiente = correlación
- La recta pasa siempre por $(\bar x, \bar y)$
- En regresión simple: $R^2 = r^2$

---
<style scoped>section { font-size: 23px; }</style>
<!-- 3.1-5 -->
## En el notebook: IMC → progresión

```python
simple = sm.OLS(df["progresion"],
                sm.add_constant(df[["imc"]])).fit()
```

| | Valor |
|---|---|
| Intercepto | −117,8 |
| Pendiente IMC | **10,2** |
| R² | 0,34 |

- +1 punto de IMC → +10,2 puntos de progresión esperada
- IMC 30 → $-117{,}8 + 10{,}2 \times 30 \approx 189$

---

<!-- 3.1-6 -->
## Tres errores frecuentes

1. **Extrapolar**: intercepto −117,8 = «IMC 0» (no existe)
2. **Pendiente ≠ fuerza**: depende de las unidades; mira $r$ o $R^2$
3. **Pendiente ≠ causa**: compara pacientes distintos, no predice qué pasa si un paciente adelgaza

---

<!-- 3.1-7 -->
## Ideas clave 3.1

- La regresión convierte una asociación en una **regla de predicción**
- MCO minimiza la suma de **residuos al cuadrado**
- Pendiente = diferencia media en $y$ por unidad de $x$
- Asociación ≠ causalidad

**Practica:** notebook, secciones 1 y 2

---

<!-- _class: lead -->

# 3.2
## Regresión múltiple: «manteniendo el resto constante»

---

<!-- 3.2-1 -->
## Más de una variable

$$\hat{y} = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_p x_p$$

- Mismo criterio: mínimos cuadrados
- Una recta → un **hiperplano**
- Forma matricial: $\hat\beta = (X^\top X)^{-1} X^\top y$

---

<!-- 3.2-2 -->
## La frase clave

> $\beta_j$ = diferencia esperada en $y$ por +1 en $x_j$, **manteniendo constantes las demás variables del modelo**

| Modelo | Coef. IMC |
|---|---|
| Solo IMC | 10,2 |
| 10 variables | **5,7** |

El IMC «se llevaba el mérito» de la presión y las analíticas

---

<!-- 3.2-3 -->
## Los coeficientes dependen de los controles

| Modelo | Coef. sexo | p-valor |
|---|---|---|
| IMC + sexo | −1,3 | 0,82 |
| 10 variables | **−23,1** | 0,001 |

- Cada coeficiente responde a **una pregunta distinta**
- Falta un factor de confusión → **sesgo por variable omitida**

---

<!-- 3.2-4 -->
## Lo que «constante» NO significa

- Solo controla lo que **está en el modelo**
- A veces es irreal: colesterol y LDL, $r = 0{,}90$
- No es una **intervención** sobre un paciente

> Para hablar de efectos causales: experimento aleatorizado o diseño causal explícito

---

<!-- 3.2-5 -->
## Multicolinealidad

- Variables muy correlacionadas → el modelo no sabe repartir el mérito
- Síntomas: errores estándar grandes, signos «absurdos»
- Colesterol: coef. **−1,26** · LDL: **+0,80**

| Variable | VIF |
|---|---|
| colesterol | 54 |
| ldl | 36 |
| imc | 1,5 |

VIF > 5–10 → alarma · **la predicción conjunta no empeora**

---

<!-- 3.2-6 -->
## Coeficientes estandarizados

- Crudos: dependen de las unidades (63,4 vs 5,7 no son comparables)
- Estandarizar: cambio en $y$ por **1 desviación típica** de $x_j$

```python
esc = StandardScaler().fit(X_train)
LinearRegression().fit(esc.transform(X_train), y_train).coef_
```

Mayores: colesterol (−44), triglicéridos (+33), IMC (+25), LDL (+25)

---

<!-- 3.2-7 -->
## Ideas clave 3.2

- Coeficiente **parcial**: con el resto de variables del modelo fijas
- Cambia al añadir o quitar variables
- Multicolinealidad → coeficientes inestables, predicción estable
- Para comparar: estandariza · para causas: diseño causal

**Practica:** notebook, sección 3

---

<!-- _class: lead -->

# 3.3
## Inferencia: errores estándar, p-valores, R²

---

<!-- 3.3-1 -->
## De la muestra a la población

$$y_i = \beta_0 + \beta_1 x_{i1} + \dots + \beta_p x_{ip} + \varepsilon_i$$

- $\beta$: valores desconocidos de la población
- $\hat\beta$: estimaciones con **nuestros 331 pacientes**
- Otra muestra → otros $\hat\beta$
- ¿Cuánto podrían variar? → **inferencia**

---

<!-- 3.3-2 -->
## Error estándar e intervalo de confianza

Crece con… | Decrece con…
---|---
Ruido de los residuos | Tamaño de muestra ($1/\sqrt n$)
Multicolinealidad | Variabilidad de $x_j$

$$IC_{95\%} \approx \hat\beta_j \pm 2\cdot EE$$

IMC: $5{,}73 \pm 2 \times 0{,}85$ → **[4,06; 7,41]**

---

<!-- 3.3-3 -->
## Estadístico t y p-valor

$$H_0: \beta_j = 0 \qquad t = \frac{\hat\beta_j}{EE(\hat\beta_j)}$$

| Variable | coef | p |
|---|---|---|
| imc | 5,73 | < 0,001 |
| presion | 1,31 | < 0,001 |
| trigliceridos | 63,4 | < 0,001 |
| hdl | 0,43 | 0,62 |
| glucosa | 0,11 | 0,73 |

---

<!-- 3.3-4 -->
## Cómo NO leer un p-valor

- p = 0,3 ≠ «no influye» (muestra pequeña, colinealidad, no linealidad)
- p < 0,05 ≠ «efecto grande»
- p < 0,05 ≠ «efecto causal»
- 10 p-valores → más falsos positivos (módulo 04)

**Traduce siempre a magnitud de negocio + intervalo**

---

<!-- 3.3-5 -->
## R² y R² ajustado

$$R^2 = 1 - \frac{\sum (y_i - \hat y_i)^2}{\sum (y_i - \bar y)^2}$$

$$R^2_{aj} = 1 - (1-R^2)\frac{n-1}{n-p-1}$$

- Notebook: $R^2 = 0{,}52$ · $R^2_{aj} = 0{,}50$
- R² **nunca baja** al añadir variables
- R² en train ≠ calidad predictiva (→ 3.6)

---

<!-- 3.3-6 -->
## Confianza vs. predicción

Paciente con IMC 30 → predicción 189

| Intervalo | ¿Sobre qué? | Rango |
|---|---|---|
| Confianza | Media de pacientes con IMC 30 | ≈ 181–197 |
| Predicción | **Un** paciente concreto | **66–312** |

Para decisiones individuales, manda el **intervalo de predicción**

---

<!-- 3.3-7 -->
## Ideas clave 3.3

- EE mide la incertidumbre; IC ≈ $\hat\beta \pm 2\,EE$
- El p-valor no mide importancia ni causalidad
- R² ajustado penaliza variables; ninguno sustituye a validar fuera de muestra
- El intervalo de predicción individual es ancho

**Practica:** notebook, sección 3 (`ols.summary()`)

---

<!-- _class: lead -->

# 3.4
## Supuestos y diagnóstico de residuos

---

<!-- 3.4-1 -->
## ¿Para qué sirven los supuestos?

- MCO **siempre** devuelve una recta
- **Predecir** + validar fuera de muestra → los supuestos importan menos
- **Explicar** (coeficientes, p-valores, intervalos) → imprescindibles

---

<!-- 3.4-2 -->
## LINE

| Supuesto | Si falla… |
|---|---|
| **L**inealidad | sesgo, errores sistemáticos |
| **I**ndependencia | falsa precisión (EE pequeños) |
| **N**ormalidad | p-valores dudosos con $n$ pequeño |
| **E**qual variance | EE e intervalos incorrectos |

La independencia es una cuestión de **diseño**

---

<!-- 3.4-3 -->
## Residuos vs. ajustados

```
 sin patrón (bien)    embudo               curva
  . . . .  . .        .             .  .    .              .
 --.--.--.--.--      --..--.-.-. . . . .   -.-----------.--
  . .  . . . .        . .  .  . . .  .       . .  .  .  .
```

- **Embudo** → heterocedasticidad
- **Curva** → falta un término no lineal

---

<!-- 3.4-4 -->
## QQ-plot y contrastes

- QQ-plot: cuantiles de residuos vs. normal → buscamos **la diagonal**
- Notebook: QQ-plot casi recto · Jarque-Bera p = 0,38
- Dispersión menor en predicciones bajas · Breusch-Pagan p = 0,05

> Los tests ayudan, pero **mira siempre las gráficas**

---

<!-- 3.4-5 -->
## Puntos influyentes

- **Apalancamiento**: $x$ extremo
- **Residuo grande**: mal ajustado
- Ambos → **distancia de Cook** alta

```python
cook = ols.get_influence().cooks_distance[0]
```

¿Error de datos? → corregir · ¿Caso real? → informar con y sin él

---

<!-- 3.4-6 -->
## Qué hacer si algo falla

| Síntoma | Remedio |
|---|---|
| Curva | $\log x$, $x^2$, interacciones |
| Embudo | $\log y$, EE robustos (`cov_type="HC3"`) |
| Dependencia | modelos para grupos / tiempo |
| Colas pesadas | revisar atípicos, regresión robusta |

---

<!-- 3.4-7 -->
## Ideas clave 3.4

- LINE importa sobre todo para **interpretar**
- Residuos = ruido: sin curva, sin embudo
- Revisa los residuos, no la distribución de $y$
- Los puntos influyentes se investigan, no se borran

**Practica:** notebook, sección 4

---

<!-- _class: lead -->

# 3.5
## Variables categóricas, interacciones y transformaciones

---

<!-- 3.5-1 -->
## Lineal en los coeficientes

- La regresión es lineal en los $\beta$, **no** necesariamente en las variables
- Tres herramientas:
  1. Variables indicadoras
  2. Interacciones
  3. Transformaciones

---

<!-- 3.5-2 -->
## Variables indicadoras (dummies)

| región | Centro | Sur |
|---|---|---|
| Norte (referencia) | 0 | 0 |
| Centro | 1 | 0 |
| Sur | 0 | 1 |

- $k$ categorías → $k-1$ columnas
- Coef. «Sur» = diferencia Sur − Norte
- `pd.get_dummies(drop_first=True)` · `C(region)`
- Notebook: sexo = −23,1 frente al grupo 0

---

<!-- 3.5-3 -->
## Interacciones

$$\hat y = \beta_0 + \beta_1\,\text{imc} + \beta_2\,\text{edad} + \beta_3\,(\text{imc}\times\text{edad})$$

Pendiente del IMC $= \beta_1 + \beta_3\cdot \text{edad}$

- **Centra** antes de multiplicar
- Incluye los efectos principales
- Ejercicio 2: $\beta_3 = 0{,}05$, p = 0,36 → sin evidencia

---

<!-- 3.5-4 -->
## Logaritmos: cómo cambia la lectura

| Modelo | +… en $x$ | → en $y$ |
|---|---|---|
| $y \sim x$ | +1 unidad | $+\beta_1$ unidades |
| $y \sim \log x$ | +1 % | $+\beta_1/100$ unidades |
| $\log y \sim x$ | +1 unidad | $\approx +100\beta_1$ % |
| $\log y \sim \log x$ | +1 % | $+\beta_1$ % |

---

<!-- 3.5-5 -->
## Ojo: `trigliceridos` ya está en log

- Rango 3,3–6,1 → escala logarítmica
- Coef. 63,4 por **+1 en el log** (×2,7 los triglicéridos)
- Lectura útil: +10 % triglicéridos → $63{,}4 \times 0{,}095 \approx$ **+6 puntos**

---

<!-- 3.5-6 -->
## Polinomios

- $x^2$ captura curvas (rendimientos decrecientes)
- Grado 2 con 10 variables → **65 términos**
- Mucha flexibilidad… ¿demasiada? → 3.6

---

<!-- 3.5-7 -->
## Ideas clave 3.5

- Categóricas: $k-1$ indicadoras frente a una referencia
- Interacción: la pendiente de una depende de otra
- Logaritmos: efectos porcentuales, arreglan asimetrías
- Comunica en la escala original («≈ 14 %», no «0,15»)

**Practica:** notebook, ejercicio 2

---

<!-- _class: lead -->

# 3.6
## Sobreajuste, train/test y validación cruzada

---

<!-- 3.6-1 -->
## Explicar ≠ predecir

- Hasta ahora: ajuste con los **mismos** datos
- El hospital lo usará con pacientes **nuevos**
- Más flexibilidad → mejor ajuste… **también al ruido**

| | Train | Nuevos datos |
|---|---|---|
| Infraajuste | malo | malo |
| Buen ajuste | bueno | bueno |
| **Sobreajuste** | muy bueno | **malo** |

---

<!-- 3.6-2 -->
## Sesgo y varianza

$$\text{Error} = \text{Sesgo}^2 + \text{Varianza} + \text{Ruido}$$

```
error │╲                      ╱ varianza
      │ ╲                  ╱
      │  ╲____  total ___╱
      │       ╲_______╱
      │  sesgo  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾
      └──────────────────────── complejidad
```

---

<!-- 3.6-3 -->
## Partición train/test

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42)
```

- Train: 331 pacientes · Test: 111
- **El test se usa una vez, al final**
- Problema: depende de la suerte del reparto

---

<!-- 3.6-4 -->
## Validación cruzada (k-fold)

```
Iter. 1: [VAL][ T ][ T ][ T ][ T ]
Iter. 2: [ T ][VAL][ T ][ T ][ T ]
  ...
Iter. 5: [ T ][ T ][ T ][ T ][VAL]
```

- Media de $k$ evaluaciones → más estable
- CV para **elegir** · test para **confirmar**
- Preprocesado **dentro** del pipeline (evita fugas)

---

<!-- 3.6-5 -->
## El caso del notebook

| Modelo | R² CV | R² test | MAE test |
|---|---|---|---|
| Lineal | 0,480 | 0,485 | 41,5 |
| Polinómica grado 2 | **0,166** | 0,424 | 44,0 |
| Polinómica + Ridge | 0,428 | 0,500 | 42,2 |
| Lasso | 0,480 | 0,487 | 41,5 |

Polinómica: R² train **0,60** → CV **0,17** = sobreajuste

---

<!-- 3.6-6 -->
## Métricas de regresión

| Métrica | Fórmula | Lectura |
|---|---|---|
| MAE | $\frac1n\sum\lvert y_i-\hat y_i\rvert$ | error típico en unidades de $y$ |
| RMSE | $\sqrt{\frac1n\sum(y_i-\hat y_i)^2}$ | penaliza errores grandes |
| R² test | $1-\frac{SSE}{SST}$ | puede ser < 0 |

---

<!-- 3.6-7 -->
## Siempre contra una referencia

| Estrategia | MAE test |
|---|---|
| Predecir siempre la media | 65,5 |
| Modelo Lasso | **41,5** |

- −37 % de error
- Seguimiento al 20 %: el modelo captura el **68 %** del top real (azar: 20 %)

---

<!-- 3.6-8 -->
## Ideas clave 3.6

- Juzga el modelo con datos **no vistos**
- Sobreajuste = brecha train ↔ validación
- CV para elegir, test una sola vez
- Compara con una referencia ingenua y tradúcelo a la decisión

**Practica:** notebook, secciones 5 y 6; ejercicios 1 y 4

---

<!-- _class: lead -->

# 3.7
## Regularización: Ridge y Lasso

---

<!-- 3.7-1 -->
## Ponerle precio a la complejidad

$$\min_\beta\ \underbrace{\sum_i (y_i-\hat y_i)^2}_{\text{ajuste}} + \underbrace{\alpha\cdot P(\beta)}_{\text{complejidad}}$$

$P(\beta)$ = penalización por el tamaño de los coeficientes

| α | Resultado |
|---|---|
| 0 | MCO |
| pequeño | riesgo de sobreajuste |
| grande | coeficientes → 0, infraajuste |

---

<!-- 3.7-2 -->
## Ridge (L2)

$$P(\beta) = \sum_j \beta_j^2$$

- Encoge **todos** los coeficientes, casi nunca a 0
- Reparte el peso entre variables correlacionadas
- Notebook (polinómica): R² CV 0,17 → **0,43** · test 0,42 → **0,50**

---

<!-- 3.7-3 -->
## Lasso (L1)

$$P(\beta) = \sum_j |\beta_j|$$

- Puede poner coeficientes **exactamente a 0** → selección
- Notebook: α ≈ 0,11 · descarta **hdl** · MAE 41,5

```
  L1: rombo ◇ → esquinas en los ejes → ceros
  L2: círculo ○ → sin esquinas → no hay ceros
```

---

<!-- 3.7-4 -->
## Ridge vs. Lasso

| | Ridge | Lasso |
|---|---|---|
| Coeficientes | encoge | encoge y anula |
| Selección | no | sí |
| Correlacionadas | reparte | elige una |
| Brilla con… | muchos efectos pequeños | pocos relevantes |

**Elastic Net** = mezcla de ambas

---

<!-- 3.7-5 -->
## Estandarizar es obligatorio

- La penalización suma coeficientes de **distintas** variables
- Edad en meses → coeficiente 12 veces menor → penalización distinta
- Solución: misma escala para todas

```python
make_pipeline(StandardScaler(), LassoCV(cv=5, random_state=0))
```

---

<!-- 3.7-6 -->
## Elegir α con validación cruzada

```
MAE │╲  CV                       ╱
    │ ╲___                     ╱
    │     ╲____ óptimo ______╱
    │ train ‾‾‾‾‾‾‾‾‾‾‾‾‾‾╱
    └──────────────────────────── α (log)
      sobreajuste      infraajuste
```

Ejercicio 3: óptimo por CV en α ≈ 35 (polinómica + Ridge)

---

<!-- 3.7-7 -->
## Interpretar con cuidado

- Coeficientes **sesgados hacia 0** a propósito
- Lasso elige entre correlacionadas de forma inestable
- Sin p-valores clásicos tras seleccionar
- Conservada por Lasso ≠ causa

> Regularizar es para **predecir**; para **explicar**, solo orientativo

---

<!-- 3.7-8 -->
## Ideas clave 3.7

- Penalización controlada por α
- Ridge encoge · Lasso encoge y selecciona
- Estandariza y elige α por validación cruzada
- Predicción sí; interpretación causal, no

**Practica:** notebook, sección 5 y ejercicio 3

---

<!-- _class: lead -->

# Resumen del módulo

Ajustar · interpretar · diagnosticar · validar · regularizar · **decidir**

Caso práctico: memorando para la dirección médica
