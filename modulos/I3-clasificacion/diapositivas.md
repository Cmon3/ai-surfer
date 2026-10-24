---
marp: true
theme: default
paginate: true
math: mathjax
title: Módulo I3 · Clasificación y pruebas de hipótesis
---

<!-- _class: lead -->

# Módulo I3
## Clasificación y pruebas de hipótesis

Ciencia de Datos e IA Aplicada: de los datos a las decisiones
N2 · Intermedio · 9 lecciones

---

## Hoja de ruta del módulo

| Parte 1 · Clasificación | Parte 2 · Hipótesis y A/B |
|---|---|
| 4.1 Problemas de clasificación | 4.7 H₀, p-valor, errores, potencia |
| 4.2 Regresión logística | 4.8 Pruebas A/B de principio a fin |
| 4.3 Árboles de decisión | 4.9 Trampas |
| 4.4 Random forest y boosting | |
| 4.5 Métricas, ROC y AUC | |
| 4.6 El umbral como decisión | |

Hilo conductor: **los errores tienen costes distintos**

---

<!-- _class: lead -->

# 4.1
## Problemas de clasificación en la empresa

---

<!-- 4.1-1 -->
## ¿Qué es clasificar?

- Regresión (módulo 03): predecir un **número**
- Clasificación: predecir una **categoría**
- Binaria: clase **positiva (1)** y negativa (0)
- La positiva es la que **dispara una acción**, no «la mala»
- También: multiclase y multietiqueta

---

<!-- 4.1-2 -->
## Clasificación en la empresa

| Problema | Positivo (1) | Acción |
|---|---|---|
| Fraude | Transacción fraudulenta | Bloquear |
| Abandono | Cliente que se va | Oferta de retención |
| Crédito | Impago | Rechazar |
| Spam | Correo basura | A la papelera |
| Diagnóstico | Tumor maligno | Biopsia |

---

<!-- 4.1-3 -->
## De la probabilidad a la decisión

$$\hat p = P(Y=1 \mid X) \qquad \hat y = \begin{cases} 1 & \text{si } \hat p \ge u \\ 0 & \text{si } \hat p < u \end{cases}$$

- Problema **estadístico**: estimar y ordenar bien → lecciones 4.2–4.4
- Problema **de decisión**: elegir el umbral $u$ → lecciones 4.5–4.6
- `predict()` usa $u = 0{,}5$ por defecto

---

<!-- 4.1-4 -->
## El desequilibrio de clases

- Fraude: 0,5 % · Abandono mensual: 2 % · Averías: < 1 %
- Modelo «nunca fraude» → **99,5 % de exactitud** y cero utilidad
- La exactitud deja de ser informativa
- Notebook: 569 tumores, **37 % malignos**
- Desequilibrio moderado, pero costes muy **asimétricos**

---

<!-- 4.1-5 -->
## Cinco preguntas antes de modelar

1. ¿Qué es exactamente un positivo?
2. ¿Cuándo predigo y con qué información? (ojo a la **fuga**)
3. ¿Qué acción se dispara y con qué **capacidad**?
4. ¿Cuánto cuesta cada tipo de error?
5. ¿Cuál es la **línea base**?

---

<!-- 4.1-6 -->
## Ejemplo: retención de clientes

Retener vale 300 € · la oferta cuesta 40 € · se marcan 1.000 clientes · la oferta retiene a la mitad

| Bajas reales entre los 1.000 | Retenidos | Resultado |
|---|---|---|
| 200 | 100 | 30.000 − 40.000 = **−10.000 €** |
| 400 | 200 | 60.000 − 40.000 = **+20.000 €** |

La pregunta no es la exactitud: es **cuántos de los que marco son positivos**

---

<!-- _class: lead -->

# 4.2
## Regresión logística: probabilidades y odds

---

<!-- 4.2-1 -->
## ¿Por qué no una recta?

- Una regresión lineal sobre $Y \in \{0, 1\}$ da valores < 0 y > 1
- Eso no son probabilidades
- Idea: modelar linealmente **otra cosa**
- …y transformarla en una probabilidad entre 0 y 1

---

<!-- 4.2-2 -->
## La función sigmoide

$$\sigma(z) = \frac{1}{1+e^{-z}} \qquad \hat p = \sigma(\beta_0 + \beta_1 x_1 + \dots + \beta_k x_k)$$

```
 p  1 |                 ______
      |              .-'
  0,5 |- - - - - - -+
      |         _.-'
    0 |______.-'
      +-------------0------------ z
```

---

<!-- 4.2-3 -->
## Odds y log-odds

$$\text{odds} = \frac{p}{1-p} \qquad \log\frac{p}{1-p} = \beta_0 + \beta_1 x_1 + \dots + \beta_k x_k$$

| $p$ | odds | lectura |
|---|---|---|
| 0,20 | 0,25 | «1 a 4» |
| 0,50 | 1 | a la par |
| 0,80 | 4 | «4 a 1» |

Lo lineal es el **log-odds**

---

<!-- 4.2-4 -->
## Interpretar coeficientes

- +1 unidad en $x_j$ ⇒ log-odds $+\beta_j$ ⇒ odds $\times e^{\beta_j}$
- Ejemplo: reclamaciones, $\beta = 0{,}4$ ⇒ odds $\times 1{,}49$
- $p$: 0,10 → 0,14 · pero 0,50 → 0,60
- Efecto **constante en odds**, variable en probabilidad
- Correlación, no causalidad

---

<!-- 4.2-5 -->
## Cómo se entrena

$$\mathcal{L} = -\frac{1}{n}\sum_i \left[y_i \log \hat p_i + (1-y_i)\log(1-\hat p_i)\right]$$

```python
logit = make_pipeline(StandardScaler(),
                      LogisticRegression(max_iter=1000))
prob = logit.fit(X_train, y_train).predict_proba(X_test)[:, 1]
```

- Máxima verosimilitud = mínima *log loss*
- Regularización L2 por defecto (parámetro `C`)

---

<!-- 4.2-6 -->
## Fortalezas y límites

| ✔ Fortalezas | ✘ Límites |
|---|---|
| Interpretable (odds ratios) | Efectos lineales y aditivos |
| Probabilidades razonables | No capta interacciones sola |
| Rápida y estable | Coeficientes inestables con colinealidad |
| Notebook: **AUC 0,992** (el mejor) | |

**Línea base obligatoria** en clasificación tabular

---

<!-- _class: lead -->

# 4.3
## Árboles de decisión

---

<!-- 4.3-1 -->
## La idea: preguntas sí/no

- Un diagrama de flujo aprendido de los datos
- Cada nodo: una pregunta sobre una variable
- Cada hoja: una predicción
- Probabilidad en la hoja = proporción de positivos de train
- El modelo más fácil de **explicar**

---

<!-- 4.3-2 -->
## Cómo se construye (CART)

1. Prueba todas las variables y puntos de corte
2. Elige la división que deja hijos más **puros**
3. Repite en cada hijo hasta un criterio de parada

$$\text{Gini} = 2p(1-p)$$

Nodo puro: Gini 0 · mezcla 50/50: Gini 0,5

---

<!-- 4.3-3 -->
## El árbol del notebook (profundidad 3)

```
mean concave points <= 0,05 ?
├─ sí → worst area <= 957 ?
│        ├─ sí → area error <= 45 ?        → benigno / maligno
│        └─ no → worst fractal dim <= 0,06 ? → benigno / maligno
└─ no → worst concave points <= 0,10 ?
         ├─ sí → benigno
         └─ no → worst area <= 710 ?       → benigno / maligno
```

Cada predicción se explica siguiendo un camino

---

<!-- 4.3-4 -->
## Ventajas

- Interpretable si es pequeño
- **No hace falta escalar** variables
- Capta **no linealidades e interacciones**
- Se traduce en **reglas** de negocio
- Útil en sectores regulados (crédito, seguros, salud)

---

<!-- 4.3-5 -->
## El problema: sobreajuste e inestabilidad

| Hiperparámetro | Limita |
|---|---|
| `max_depth` | Preguntas encadenadas |
| `min_samples_leaf` | Casos mínimos por hoja |
| `min_samples_split` | Casos mínimos para dividir |
| `ccp_alpha` | Complejidad (poda) |

Sin límites: memoriza el ruido · pocos datos distintos ⇒ árbol distinto

---

<!-- 4.3-6 -->
## Resultado e importancia de variables

- Notebook: árbol prof. 3 → **AUC 0,916** (logística: 0,992)
- Solo 8 hojas ⇒ solo **8 probabilidades distintas** ⇒ ordena «a saltos»
- Importancia por impureza: útil para explorar, con sesgos
- Mejor: importancia por **permutación**
- Importancia ≠ causalidad

---

<!-- _class: lead -->

# 4.4
## Ensembles: random forest y gradient boosting

---

<!-- 4.4-1 -->
## La idea de los ensembles

- Un árbol es inestable → ¿y si entrenamos **muchos**?
- Combinar modelos con errores poco correlacionados
- Dos estrategias casi opuestas:
  - **Random forest**: en paralelo, se promedian
  - **Gradient boosting**: en secuencia, se corrigen

---

<!-- 4.4-2 -->
## Random forest

1. **Bagging**: cada árbol, con una muestra bootstrap
2. En cada división, solo $\sqrt{k}$ variables al azar
3. Árboles profundos → se **promedian** las probabilidades

- Descorrelaciona los árboles → reduce **varianza**
- Más árboles nunca empeoran (solo tardan más)
- Error *out-of-bag* gratis

---

<!-- 4.4-3 -->
## Gradient boosting

- Árboles **pequeños**, uno tras otro
- Cada árbol se ajusta a lo que les falta a los anteriores (gradiente de la pérdida)
- Parte de mucho **sesgo** y lo reduce paso a paso
- **Sí puede sobreajustar** → parada temprana
- Implementaciones: `HistGradientBoostingClassifier`, XGBoost, LightGBM, CatBoost

---

<!-- 4.4-4 -->
## Boosting en una fórmula

$$F_M(x) = F_0(x) + \eta \sum_{m=1}^{M} h_m(x)$$

| Hiperparámetro | Efecto |
|---|---|
| Nº de árboles $M$ | Más → más ajuste (y riesgo) |
| Tasa de aprendizaje $\eta$ | Menor → más prudente, más árboles |
| Profundidad / hojas | Complejidad de cada árbol |

---

<!-- 4.4-5 -->
## Random forest vs. gradient boosting

| | Random forest | Gradient boosting |
|---|---|---|
| Construcción | Paralelo | Secuencial |
| Árboles | Profundos | Poco profundos |
| Reduce | Varianza | Sesgo |
| Ajuste | Poco sensible | Más sensible |
| Sobreajuste | Bajo | Moderado |

---

<!-- 4.4-6 -->
## Lo que dice el notebook (test, umbral 0,5)

| Modelo | Exactitud | Recall | Precisión | AUC | FN |
|---|---|---|---|---|---|
| Logística | 0,953 | 0,938 | 0,938 | **0,992** | 4 |
| Árbol (prof. 3) | 0,865 | 0,938 | 0,759 | 0,916 | 4 |
| Random forest | 0,942 | 0,938 | 0,909 | 0,980 | 4 |
| Gradient boosting | **0,971** | **0,953** | **0,968** | 0,987 | **3** |

Los ensembles **no siempre ganan** · con 171 casos, ±0,01 es ruido

---

<!-- 4.4-7 -->
## ¿Cuándo compensa la complejidad?

- Muchos datos, muchas variables, interacciones → ensembles
- Pocos datos, relaciones monótonas → logística compite
- Se pierde interpretabilidad directa → importancia, SHAP
- Ajusta hiperparámetros con **validación cruzada**, nunca con el test
- Elige también por mantenimiento y estabilidad

---

<!-- _class: lead -->

# 4.5
## Matriz de confusión, precisión, recall, curva ROC y AUC

---

<!-- 4.5-1 -->
## La matriz de confusión

| | Predicho 0 | Predicho 1 |
|---|---|---|
| **Real 0** | TN (verdadero negativo) | FP (falso positivo) |
| **Real 1** | FN (falso negativo) | TP (verdadero positivo) |

`tn, fp, fn, tp = confusion_matrix(y, pred).ravel()`

Depende del **umbral**

---

<!-- 4.5-2 -->
## Logística en test (umbral 0,5)

| | Pred. benigno | Pred. maligno |
|---|---|---|
| **Benigno (107)** | 103 | 4 |
| **Maligno (64)** | 4 | 60 |

- 4 biopsias innecesarias
- **4 cánceres sin detectar**

---

<!-- 4.5-3 -->
## Las métricas

| Métrica | Fórmula | Valor |
|---|---|---|
| Exactitud | $(TP+TN)/N$ | 163/171 = 0,953 |
| Precisión | $TP/(TP+FP)$ | 60/64 = 0,938 |
| Recall | $TP/(TP+FN)$ | 60/64 = 0,938 |
| Especificidad | $TN/(TN+FP)$ | 103/107 = 0,963 |
| F1 | media armónica prec./recall | 0,938 |

---

<!-- 4.5-4 -->
## ¿Precisión o recall?

- **Precisión**: de los que marco, ¿cuántos son?
- **Recall**: de los que son, ¿cuántos marco?
- Marcar más ⇒ ↑ recall, ↓ precisión

| Prioriza recall | Prioriza precisión |
|---|---|
| Cribado de cáncer | Filtro de spam |
| Fraude grave | Campañas con contacto caro |
| Seguridad | Alertas con equipo limitado |

---

<!-- 4.5-5 -->
## La curva ROC

- Un punto por **cada umbral**
- Eje X: tasa de falsos positivos $FP/(FP+TN)$
- Eje Y: recall $TP/(TP+FN)$
- Diagonal = azar · esquina (0,1) = perfecto

```python
RocCurveDisplay.from_predictions(y_test, prob, name="Logística")
```

---

<!-- 4.5-6 -->
## El AUC

> Probabilidad de que el modelo puntúe más alto a un **positivo** al azar que a un **negativo** al azar

- 0,5 = azar · 1 = perfecto
- Mide la **ordenación** → no depende del umbral
- No depende de la calibración
- Notebook: logística **0,992**

---

<!-- 4.5-7 -->
## Positivos muy raros: curva precisión-recall

- 0,1 % de positivos · FPR del 1 % sobre 1 M de negativos
- = 10.000 falsas alarmas frente a 1.000 positivos
- Precisión ≤ 9 % aunque la ROC «parezca» buena
- Usa `precision_recall_curve` y *average precision*

---

<!-- 4.5-8 -->
## Errores frecuentes

- Reportar solo exactitud con clases desequilibradas
- Confundir *precision* con *accuracy*
- «AUC = probabilidad de acertar» ✘
- Calcular métricas sobre el train
- Olvidar la incertidumbre: 1 FN más = −1,6 p.p. de recall con 64 positivos

---

<!-- _class: lead -->

# 4.6
## El umbral es una decisión de negocio

---

<!-- 4.6-1 -->
## 0,5 no tiene nada de especial

Solo es razonable si:

- los dos errores **cuestan lo mismo**, y
- las probabilidades están **bien calibradas**

En la mayoría de problemas reales, no se cumple ninguna de las dos

---

<!-- 4.6-2 -->
## La regla teórica

Marcar como positivo si $p\,C_{FN} > (1-p)\,C_{FP}$:

$$u^* = \frac{C_{FP}}{C_{FP} + C_{FN}}$$

| $C_{FN} : C_{FP}$ | $u^*$ |
|---|---|
| 1 : 1 | 0,50 |
| 5 : 1 | 0,17 |
| 20 : 1 | 0,048 |

---

<!-- 4.6-3 -->
## La regla empírica (notebook §3)

```python
prob_cv = cross_val_predict(logit, X_train, y_train, cv=cv,
                            method="predict_proba")[:, 1]
costes = [20 * ((prob_cv < u) & (y_train == 1)).sum()
          +  1 * ((prob_cv >= u) & (y_train == 0)).sum()
          for u in umbrales]
u_opt = umbrales[np.argmin(costes)]   # 0,06
```

- Predicciones de **validación cruzada** sobre el train
- **Nunca** elegir el umbral con el test

---

<!-- 4.6-4 -->
## Umbral 0,5 vs. 0,06 (test)

| Umbral | FN | FP | Recall | Coste (20:1) |
|---|---|---|---|---|
| 0,50 | 4 | 4 | 0,938 | 84 |
| 0,06 | **1** | 18 | **0,984** | **38** |

63 de 64 cánceres detectados, a cambio de 14 biopsias más

---

<!-- 4.6-5 -->
## ¿Quién fija los costes? ¿Y otras formas?

- Los costes los fija **el negocio** (clínica, riesgos, finanzas)
- Tu trabajo: mostrar el compromiso con 3–4 umbrales
- Por **capacidad**: los 300 casos con mayor puntuación
- Por **restricción**: recall ≥ 95 %
- Por **beneficio esperado**: si los aciertos también valen
- `TunedThresholdClassifierCV` en scikit-learn

---

<!-- 4.6-6 -->
## Ejemplo: microcréditos

- Impago no detectado (FN): **400 €**
- Buen cliente rechazado (FP): **60 €**

$$u^* = \frac{60}{60 + 400} \approx 0{,}13$$

La pregunta útil: ¿qué combinación de **impagos y rechazos** asumimos?

---

<!-- _class: lead -->

# 4.7
## Pruebas de hipótesis: H₀, p-valor, errores tipo I y II, potencia

---

<!-- 4.7-1 -->
## La pregunta

Botón nuevo: conversión **9,91 % → 11,48 %**

¿Mejora real o azar?

Lógica de reducción al absurdo:
1. Supón que **no** hay efecto
2. ¿Qué probabilidad tendrían unos datos así?
3. Si es muy baja, rechaza el supuesto

---

<!-- 4.7-2 -->
## Hipótesis y estadístico

- $H_0$: $p_A = p_B$ (no pasa nada)
- $H_1$: $p_A \ne p_B$ (bilateral) — decidido **antes** de ver datos

$$z = \frac{\hat p_B - \hat p_A}{\sqrt{\hat p(1-\hat p)\left(\frac{1}{n_A}+\frac{1}{n_B}\right)}}$$

Notebook: $z = 4{,}39$

---

<!-- 4.7-3 -->
## El p-valor

> Probabilidad de observar una diferencia **al menos tan grande** como la observada **si $H_0$ fuera cierta**

- Es una probabilidad sobre los **datos**, suponiendo $H_0$
- Notebook: $p \approx 1{,}1 \cdot 10^{-5}$
- Si $p < \alpha$ (fijado antes, p. ej. 0,05) ⇒ rechazamos $H_0$

---

<!-- 4.7-4 -->
## Lo que el p-valor NO es

| ✘ Frase incorrecta | Por qué |
|---|---|
| «97 % de prob. de que B sea mejor» (p = 0,03) | No es $P(H_1 \mid \text{datos})$ |
| «3 % de prob. de que $H_0$ sea cierta» | No es $P(H_0 \mid \text{datos})$ |
| «p muy pequeño = efecto enorme» | No mide el tamaño |
| «p = 0,20 demuestra que no hay efecto» | Puede faltar potencia |

---

<!-- 4.7-5 -->
## Errores tipo I y II

| | $H_0$ cierta | $H_0$ falsa |
|---|---|---|
| **Rechazo** | Error tipo I (FP) · $\alpha$ | Potencia $1-\beta$ |
| **No rechazo** | Acierto | Error tipo II (FN) · $\beta$ |

La misma matriz de confusión… aplicada a experimentos

---

<!-- 4.7-6 -->
## Potencia: de qué depende

Probabilidad de detectar un efecto **que existe** (objetivo típico: 80 %)

| Factor | Si aumenta… |
|---|---|
| Tamaño del efecto | ↑ potencia |
| Tamaño muestral | ↑ potencia |
| Exigencia (↓ $\alpha$) | ↓ potencia |
| Variabilidad | ↓ potencia |

---

<!-- 4.7-7 -->
## Tamaño muestral (notebook §5)

$$n \approx \frac{(z_{1-\alpha/2} + z_{1-\beta})^2\,[p_A(1-p_A)+p_B(1-p_B)]}{(p_B-p_A)^2}$$

```python
efecto = proportion_effectsize(0.11, 0.10)
NormalIndPower().solve_power(effect_size=efecto, alpha=0.05,
                             power=0.8)   # 14.745 por grupo
```

Mitad de efecto ⇒ **4 veces** más muestra

---

<!-- 4.7-8 -->
## Para llevarse

- p-valor = $P(\text{datos tan extremos} \mid H_0)$
- Significativo ≠ relevante
- No rechazar ≠ demostrar que no hay efecto
- Calcula $n$ **antes** de empezar
- Acompaña siempre el p-valor del **efecto y su IC**

---

<!-- _class: lead -->

# 4.8
## Pruebas A/B de principio a fin

---

<!-- 4.8-1 -->
## ¿Qué es una prueba A/B?

- Experimento controlado **aleatorizado**
- A = control (actual) · B = tratamiento (nuevo)
- El azar iguala todo lo demás ⇒ diferencia **causal**
- Del «correlación no es causalidad» (módulo 01) a la causalidad medida

---

<!-- 4.8-2 -->
## Fase 1 · Diseño

1. Hipótesis de negocio
2. Unidad de aleatorización: **usuario**
3. **Una** métrica principal (OEC)
4. Métricas de **salvaguarda**
5. Efecto mínimo detectable (MDE)
6. $\alpha$, potencia, $n$ y **duración**

Todo por escrito: **plan de análisis**

---

<!-- 4.8-3 -->
## Tamaño y duración

- Notebook: 10 % → 11 %, $\alpha$ = 0,05, potencia 80 %
- **14.745** usuarios por grupo · 29.490 en total
- Con 3.000 visitas/día → 10 días
- Redondea a **semanas completas** → 2 semanas
- El MDE es el efecto que **vale la pena**, no el que «esperas»

---

<!-- 4.8-4 -->
## Fase 2 · Ejecución

- Comprueba el reparto: ¿50/50 real?
- **SRM** (*sample ratio mismatch*): prueba chi-cuadrado sobre los recuentos
- Si hay SRM → resultados no fiables
- Vigila errores graves (que B no rompa el pago)
- **No** decidas cuándo parar mirando el p-valor

---

<!-- 4.8-5 -->
## Fase 3 · Análisis (notebook §6)

```python
z, p = proportions_ztest([conv_B.sum(), conv_A.sum()], [n, n])
```

| | A | B |
|---|---|---|
| Usuarios | 15.000 | 15.000 |
| Conversión | 9,91 % | 11,48 % |

Diferencia **+1,57 p.p.** · mejora relativa **+16 %** · $p \approx 1{,}1\cdot10^{-5}$

---

<!-- 4.8-6 -->
## El IC 95 % de la diferencia

$$(\hat p_B - \hat p_A) \pm 1{,}96\sqrt{\frac{\hat p_A(1-\hat p_A)}{n_A} + \frac{\hat p_B(1-\hat p_B)}{n_B}}$$

**[+0,87 ; +2,27] puntos**

- Excluye el 0 ⇒ coherente con $p < 0{,}05$
- Escenario pesimista: **sigue siendo positivo**
- Ojo: solapar IC por grupo ≠ no significativo

---

<!-- 4.8-7 -->
## Fase 4 · Decisión

| El IC 95 %… | Lectura | Decisión |
|---|---|---|
| Entero por encima del MDE | Real y relevante | Lanzar |
| Excluye 0, incluye < MDE | Real, tamaño incierto | Lanzar si es barato |
| Incluye 0 y es estrecho | Sin efecto relevante | No lanzar |
| Incluye 0 y es ancho | No sabemos | Falta potencia |

\+ revisar **salvaguardas**

---

<!-- 4.8-8 -->
## Plantilla de informe

- **Hipótesis:** el botón nuevo aumenta la conversión
- **Diseño:** 50/50 por usuario, 15.000/grupo, MDE +1 p.p., 2 semanas
- **Resultado:** +1,57 p.p. (IC 95 %: +0,87 a +2,27), +16 %, p < 0,001
- **Calidad:** sin SRM, salvaguardas estables
- **Recomendación:** lanzar B · impacto estimado en €

---

<!-- _class: lead -->

# 4.9
## Trampas: comparaciones múltiples, *peeking*, efecto novedad

---

<!-- 4.9-1 -->
## Trampa 1 · Comparaciones múltiples

20 pruebas al 5 %, sin ningún efecto real:

$$P(\text{al menos un falso positivo}) = 1 - 0{,}95^{20} \approx 64\,\%$$

- Muchas métricas, muchos segmentos, muchas variantes…
- Probar hasta que algo salga = ***p-hacking***

---

<!-- 4.9-2 -->
## La simulación del notebook (§7)

1.000 experimentos × 20 métricas sin efecto

| Análisis | Experimentos con algún falso positivo |
|---|---|
| Sin corregir | **65 %** |
| Corrección de Holm | **4 %** |

---

<!-- 4.9-3 -->
## Cómo defenderse

- **Una** métrica principal, declarada antes
- Corregir si analizas varias:
  - **Bonferroni**: $\alpha / m$ (conservador)
  - **Holm**: escalonado, más potente
  - **Benjamini-Hochberg**: controla la FDR
- Segmento inesperado ⇒ **hipótesis** para otro experimento

```python
multipletests(p_valores, alpha=0.05, method="holm")
```

---

<!-- 4.9-4 -->
## Trampa 2 · *Peeking*

- Mirar el p-valor cada día y parar al bajar de 0,05
- Sin efecto, el p-valor **fluctúa** como un paseo aleatorio
- 20 miradas = 20 oportunidades de «acertar» por azar

Notebook §8: falsos positivos = **27 %** (debería ser 5 %)

---

<!-- 4.9-5 -->
## Cómo evitar el *peeking*

- Fija $n$ **antes** y analiza **una vez**
- ¿Necesitas parar antes? → métodos **secuenciales**
  - análisis intermedios planificados (O'Brien-Fleming)
  - pruebas secuenciales siempre válidas
- Mirar para detectar errores: sí
- Decidir cuándo parar por el p-valor: **no**

---

<!-- 4.9-6 -->
## Trampa 3 · Efecto novedad (y primacía)

- **Novedad**: clics por curiosidad que se desvanecen
- **Primacía**: rechazo inicial al cambio que luego se pasa
- Detecta: dibuja el efecto **semana a semana**
- Separa usuarios **nuevos** y **recurrentes**
- Mitiga: más duración, grupo *holdout* a largo plazo

---

<!-- 4.9-7 -->
## Otras trampas y checklist final

- **SRM**: reparto distinto del diseñado
- **Interferencia** entre grupos (marketplaces)
- **Temporada**: Black Friday ≠ marzo
- **Ley de Twyman**: si parece demasiado bueno, revisa los datos

✔ Plan previo · ✔ una métrica · ✔ $n$ fijado · ✔ efecto + IC · ✔ salvaguardas

---

<!-- _class: lead -->

# Resumen del módulo

**Clasificar** = estimar probabilidades + decidir con un umbral según costes

**Experimentar** = planificar $n$, analizar una vez, reportar efecto + IC + p-valor

Siguiente: caso práctico (umbral + informe A/B) y cuestionario
