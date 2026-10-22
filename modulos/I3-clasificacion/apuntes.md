# Módulo 04 · Clasificación y pruebas de hipótesis — Apuntes

Este es el módulo más denso del programa, y tiene sentido que lo sea: reúne las dos herramientas que más decisiones mueven en una empresa basada en datos. La primera mitad trata de **clasificación**: modelos que asignan cada caso a una categoría (fraude/no fraude, abandona/se queda, maligno/benigno) y, sobre todo, de cómo evaluarlos y convertir sus probabilidades en decisiones. La segunda mitad trata de **pruebas de hipótesis y experimentos A/B**: cómo saber si una diferencia observada es real o fruto del azar, cuántos datos necesitas para saberlo y qué errores convierten un experimento aparentemente impecable en una fuente de falsas certezas.

El hilo conductor es el mismo en las dos partes: **los errores tienen costes distintos y la estadística te ayuda a gestionarlos, no a eliminarlos**. Un falso negativo en un cribado de cáncer no cuesta lo mismo que un falso positivo; un falso positivo en un experimento (lanzar un cambio que no funciona) no cuesta lo mismo que un falso negativo (descartar una buena idea). Elegir umbrales, niveles de significación y tamaños muestrales es, en el fondo, decidir qué errores estás dispuesto a tolerar.

Estos apuntes siguen el notebook del módulo: un caso de diagnóstico de tumores de mama (Parte 1) y una prueba A/B de un botón de compra (Parte 2).

## Índice

- [4.1 Problemas de clasificación en la empresa](#41-problemas-de-clasificación-en-la-empresa)
- [4.2 Regresión logística: probabilidades y odds](#42-regresión-logística-probabilidades-y-odds)
- [4.3 Árboles de decisión](#43-árboles-de-decisión)
- [4.4 Ensembles: random forest y gradient boosting](#44-ensembles-random-forest-y-gradient-boosting)
- [4.5 Matriz de confusión, precisión, recall, curva ROC y AUC](#45-matriz-de-confusión-precisión-recall-curva-roc-y-auc)
- [4.6 El umbral es una decisión de negocio](#46-el-umbral-es-una-decisión-de-negocio)
- [4.7 Pruebas de hipótesis: H₀, p-valor, errores tipo I y II, potencia](#47-pruebas-de-hipótesis-h-p-valor-errores-tipo-i-y-ii-potencia)
- [4.8 Pruebas A/B de principio a fin](#48-pruebas-ab-de-principio-a-fin)
- [4.9 Trampas: comparaciones múltiples, *peeking*, efecto novedad](#49-trampas-comparaciones-múltiples-peeking-efecto-novedad)
- [Glosario](#glosario)

---

## 4.1 Problemas de clasificación en la empresa

En el módulo 03 predecías un número (ventas, precio, demanda). En **clasificación** predices una **categoría**. Lo más habitual en la empresa es la **clasificación binaria**: dos clases, que por convenio llamamos *positiva* (la que queremos detectar, codificada como 1) y *negativa* (0). La clase positiva no es «la buena», sino la que activa una acción: el fraude que bloqueamos, el cliente que intentamos retener, el tumor que biopsiamos.

Algunos ejemplos típicos:

| Problema | Clase positiva (1) | Acción si se predice 1 |
|---|---|---|
| Fraude con tarjeta | Transacción fraudulenta | Bloquear o pedir verificación |
| Abandono (*churn*) | Cliente que se dará de baja | Oferta de retención |
| Riesgo de crédito | Impago | Rechazar o encarecer el préstamo |
| Filtro de spam | Correo basura | Mover a la carpeta de spam |
| Mantenimiento predictivo | Avería en los próximos 30 días | Revisión preventiva |
| Diagnóstico (notebook) | Tumor maligno | Biopsia |

También existen problemas **multiclase** (clasificar un ticket de soporte en «facturación», «técnico» o «comercial») y **multietiqueta** (un producto puede pertenecer a varias categorías a la vez), pero la lógica de evaluación se entiende mejor en el caso binario, y es en el que nos centramos.

### De la probabilidad a la decisión

La mayoría de los clasificadores modernos no responden directamente «sí» o «no»: estiman una **probabilidad** (o una puntuación) de pertenecer a la clase positiva, $\hat p = P(Y=1 \mid X)$. La decisión se toma después, comparando esa probabilidad con un **umbral** $u$:

$$\hat y = \begin{cases} 1 & \text{si } \hat p \ge u \\ 0 & \text{si } \hat p < u \end{cases}$$

Por defecto, scikit-learn usa $u = 0{,}5$ en `predict()`. Esto separa dos problemas que conviene no mezclar: un **problema estadístico** (estimar bien las probabilidades y ordenar bien los casos) y un **problema de decisión** (qué hacer con esas probabilidades, según lo que cueste cada error). Las lecciones 4.2–4.4 tratan del primero; la 4.5 y la 4.6, del segundo.

### El desequilibrio de clases

En la mayoría de problemas de negocio la clase positiva es **rara**: el fraude puede ser el 0,5 % de las transacciones; el abandono mensual, el 2 %; las averías, menos del 1 %. Esto tiene una consecuencia inmediata: la **exactitud** (porcentaje de aciertos) deja de ser informativa. Un modelo que dice siempre «no fraude» acierta el 99,5 % de las veces y no sirve para nada. En el caso del notebook, el 37 % de los tumores son malignos, así que el desequilibrio es moderado, pero el coste de los errores es muy asimétrico.

### Cómo plantear un problema de clasificación

Antes de abrir el notebook, responde a cinco preguntas:

1. **¿Qué es exactamente un positivo y cuándo se observa?** «Abandono» puede ser «no compra en 90 días» o «da de baja el contrato»; la definición cambia el modelo.
2. **¿En qué momento se hace la predicción y con qué información disponible entonces?** Usar variables que solo se conocen después del evento es *fuga de información* (*data leakage*): el modelo parece excelente en pruebas y fracasa en producción.
3. **¿Qué acción se dispara y cuánta capacidad hay?** Si el equipo de retención solo puede llamar a 500 clientes al mes, lo que importa es ordenar bien a los 500 primeros.
4. **¿Cuánto cuesta cada tipo de error?** Un cliente fiel que recibe un descuento innecesario frente a un cliente que se va sin que lo veamos venir.
5. **¿Cuál es la línea base?** Una regla sencilla («clientes con más de 3 reclamaciones») o el modelo actual. Un modelo nuevo se justifica si mejora a la línea base en la métrica que importa.

### Ejemplo de negocio

Una operadora de telecomunicaciones quiere reducir bajas. El 3 % de sus clientes se da de baja cada mes. Retener a uno vale 300 € de margen; la oferta de retención cuesta 40 €. Si el modelo marca a 1.000 clientes y 200 de ellos realmente se iban a ir (y la oferta retiene a la mitad), el beneficio es $100 \times 300 - 1.000 \times 40 = -10.000$ €: pérdidas. Si el modelo es lo bastante bueno como para que 400 de los 1.000 sean bajas reales, el resultado es $200 \times 300 - 40.000 = +20.000$ €. Fíjate en que la pregunta relevante no es «¿qué exactitud tiene el modelo?», sino «¿cuántos de los que marco son positivos de verdad?» (precisión, lección 4.5) y «¿cuánto gano por cada umbral?» (lección 4.6).

### Errores frecuentes

- Elegir la clase positiva al revés y luego leer mal todas las métricas. En el dataset del notebook, el original codifica 0 = maligno; por eso hacemos `y = 1 - data.target`.
- Evaluar con exactitud en datos desequilibrados.
- No reservar un conjunto de **test** que no se toca hasta el final. En el notebook usamos `train_test_split(..., stratify=y)` para que train y test tengan la misma proporción de malignos.
- Pensar que el modelo «decide». El modelo estima; quien decide es la organización, a través del umbral.

> **Ideas clave**
> - Clasificar es estimar la probabilidad de la clase positiva y, después, decidir con un umbral.
> - La clase positiva es la que dispara una acción, no necesariamente la «mala».
> - Con clases desequilibradas, la exactitud engaña: compara siempre con una línea base trivial.
> - Antes de modelar, define el momento de predicción, la acción, la capacidad y el coste de cada error.

---

## 4.2 Regresión logística: probabilidades y odds

La regresión logística es el «modelo lineal» de la clasificación. Es rápida, estable, interpretable y, sorprendentemente a menudo, difícil de batir. En el notebook obtiene un AUC de 0,992 en test, el mejor de los cuatro modelos.

### Por qué no basta una recta

Podrías intentar predecir $Y \in \{0,1\}$ con una regresión lineal, pero la recta produce valores por debajo de 0 y por encima de 1, que no son probabilidades. La idea de la regresión logística es modelar linealmente otra cosa y luego transformarla en una probabilidad mediante la **función sigmoide** (o logística):

$$\sigma(z) = \frac{1}{1 + e^{-z}}, \qquad \hat p = \sigma(\beta_0 + \beta_1 x_1 + \dots + \beta_k x_k)$$

La sigmoide tiene forma de «S»: vale 0,5 cuando $z=0$, se acerca a 1 cuando $z$ es muy grande y a 0 cuando es muy negativo. Así, cualquier combinación lineal de variables se convierte en un número entre 0 y 1.

### Odds y log-odds: lo que de verdad es lineal

Las **odds** (en español a veces «momios» o «razón de probabilidades») comparan la probabilidad de que ocurra algo con la de que no ocurra:

$$\text{odds} = \frac{p}{1-p}$$

Si la probabilidad de impago es 0,20, las odds son $0{,}20/0{,}80 = 0{,}25$: «1 a 4». Si $p = 0{,}5$, las odds son 1 («a la par»). Las odds van de 0 a infinito. Su logaritmo, el **log-odds** o *logit*, va de $-\infty$ a $+\infty$, y eso es lo que el modelo trata como lineal:

$$\log\frac{p}{1-p} = \beta_0 + \beta_1 x_1 + \dots + \beta_k x_k$$

### Interpretar los coeficientes

De aquí sale la interpretación clave: **aumentar $x_j$ en una unidad suma $\beta_j$ al log-odds, es decir, multiplica las odds por $e^{\beta_j}$** (manteniendo constantes las demás variables). A $e^{\beta_j}$ se le llama *odds ratio*.

Ejemplo: en un modelo de abandono, el coeficiente de «número de reclamaciones en el último trimestre» es $\beta = 0{,}4$. Entonces $e^{0{,}4} \approx 1{,}49$: cada reclamación adicional multiplica las odds de baja por 1,49 (un 49 % más). Ojo: multiplica las **odds**, no la probabilidad. Si un cliente tenía $p = 0{,}10$ (odds 0,111), con una reclamación más sus odds son 0,166 y su probabilidad 0,142. Si tenía $p=0{,}50$, pasa a 0,60. El efecto sobre la probabilidad depende del punto de partida; el efecto sobre las odds es constante.

### Cómo se entrena

Los coeficientes se estiman por **máxima verosimilitud**: se buscan los $\beta$ que hacen más probables los datos observados. Equivale a minimizar la **pérdida logarítmica** (*log loss* o entropía cruzada):

$$\mathcal{L} = -\frac{1}{n}\sum_{i=1}^{n}\left[y_i \log \hat p_i + (1-y_i)\log(1-\hat p_i)\right]$$

Esta pérdida castiga con dureza las predicciones muy seguras y equivocadas: decir $\hat p = 0{,}01$ a un caso positivo cuesta mucho más que decir 0,4. scikit-learn añade por defecto **regularización L2** (como la ridge del módulo 03), controlada por el parámetro `C` (cuanto menor, más regularización).

### En código

En el notebook la regresión logística va dentro de un *pipeline* con estandarización:

```python
logit = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))
logit.fit(X_train, y_train)
prob = logit.predict_proba(X_test)[:, 1]   # probabilidad de maligno
```

Estandarizar tiene dos ventajas: el optimizador converge mejor y la regularización trata por igual a todas las variables. Además, los coeficientes pasan a medir el efecto de **una desviación típica** de cada variable, lo que permite compararlos entre sí. Para ver los odds ratios: `np.exp(logit[-1].coef_[0])`.

### Fortalezas y límites

- **Fortalezas:** probabilidades razonablemente bien calibradas, coeficientes interpretables, rapidez, poca tendencia a sobreajustar con regularización, robustez cuando hay pocos datos.
- **Límites:** supone que el efecto de cada variable sobre el log-odds es lineal y aditivo. Si la relación es en forma de U (por ejemplo, el riesgo es alto para clientes muy jóvenes y muy mayores) o hay interacciones, hay que crearlas a mano o usar árboles (lecciones 4.3 y 4.4).
- **Colinealidad:** en el dataset de tumores, radio, perímetro y área están casi perfectamente correlacionados. El modelo predice bien, pero los coeficientes individuales de esas variables son inestables y no deben interpretarse uno a uno.

### Errores frecuentes

- Decir «el coeficiente 0,4 significa un 40 % más de probabilidad». Es el log-odds; el efecto sobre las odds es $e^{0{,}4}$ y sobre la probabilidad depende del punto de partida.
- Interpretar coeficientes como causales. Que el número de reclamaciones aumente las odds de baja no implica que evitar que el cliente reclame (por ejemplo, poniéndoselo difícil) reduzca las bajas.
- Olvidar escalar las variables antes de regularizar.
- Usar `predict()` sin pensar en el umbral (lección 4.6).

Practica: notebook, sección 2 (comparación de modelos) y sección 3 (la regresión logística es el modelo usado para elegir el umbral).

> **Ideas clave**
> - La regresión logística modela linealmente el log-odds y lo convierte en probabilidad con la sigmoide.
> - Cada unidad de $x_j$ multiplica las odds por $e^{\beta_j}$; el efecto en probabilidad depende del punto de partida.
> - Se entrena minimizando la log loss; en scikit-learn está regularizada por defecto (parámetro `C`).
> - Es la línea base obligatoria en cualquier problema de clasificación tabular: a menudo es difícil de superar.

---

## 4.3 Árboles de decisión

Un árbol de decisión clasifica haciendo una serie de preguntas sí/no sobre las variables, como un diagrama de flujo: «¿el número de puntos cóncavos es mayor que X? Si sí, ¿el radio máximo es mayor que Y?…». Cada hoja final da una predicción. Es el modelo más fácil de explicar a alguien sin formación técnica, y por eso abre la Parte 1 del notebook.

### Cómo se construye

El algoritmo (CART, el que usa scikit-learn) es **voraz** y **recursivo**:

1. Para cada variable y cada posible punto de corte, divide los datos en dos grupos.
2. Elige la división que deja los grupos más **puros** (con mayor predominio de una clase).
3. Repite en cada grupo hasta que se cumple un criterio de parada.

La pureza se mide con la **impureza de Gini** (por defecto) o la **entropía**. Para un nodo con proporción $p$ de positivos, en el caso binario:

$$\text{Gini} = 1 - p^2 - (1-p)^2 = 2p(1-p)$$

Un nodo puro ($p=0$ o $p=1$) tiene Gini 0; uno mezclado al 50 % tiene Gini 0,5. El árbol elige la división que más reduce la impureza media ponderada de los hijos. La predicción de probabilidad en una hoja es simplemente la proporción de positivos de entrenamiento que han caído en ella.

### Leer un árbol

En el notebook, `plot_tree` dibuja un árbol de profundidad 3. Cada caja muestra la condición de división, el Gini, el número de muestras, la distribución por clase y la clase mayoritaria. Para explicar un caso concreto basta con seguir el camino desde la raíz: «Este tumor se clasifica como maligno porque tiene muchos puntos cóncavos (media y valor máximo) y un área máxima grande». Esa trazabilidad es valiosa en sectores regulados (crédito, seguros, salud), donde a veces hay que justificar cada decisión.

### Ventajas

- **Interpretabilidad** cuando el árbol es pequeño.
- **No necesita escalar variables** (solo compara valores con umbrales).
- **Captura no linealidades e interacciones** de forma natural: la segunda pregunta depende de la respuesta a la primera.
- Admite variables con escalas y distribuciones muy distintas sin preprocesado.

### El gran problema: sobreajuste e inestabilidad

Un árbol sin límites sigue dividiendo hasta que cada hoja es pura, aunque contenga un solo caso. El resultado memoriza el ruido del entrenamiento: exactitud perfecta en train y mediocre en test. Además, los árboles son **inestables**: cambiar unos pocos datos puede cambiar la primera división y, con ella, todo el árbol.

Se controlan con hiperparámetros de **poda previa**:

| Hiperparámetro | Qué limita |
|---|---|
| `max_depth` | Número máximo de preguntas encadenadas |
| `min_samples_leaf` | Casos mínimos en cada hoja |
| `min_samples_split` | Casos mínimos para dividir un nodo |
| `ccp_alpha` | Poda por complejidad-coste (poda posterior) |

Se eligen con validación cruzada, como el `alpha` de ridge y lasso en el módulo 03.

En el notebook, el árbol de profundidad 3 obtiene un AUC de 0,916 en test, claramente por debajo de la regresión logística (0,992). Tiene un motivo estructural: con profundidad 3 solo hay 8 hojas, así que el árbol solo puede dar **8 probabilidades distintas**. Ordena los casos «a saltos», y el AUC, que mide la calidad de la ordenación, lo penaliza.

### Ejemplo de negocio

Un banco quiere una política de preaprobación de tarjetas que puedan aplicar los gestores en la oficina sin ordenador. Un árbol de profundidad 3 o 4 se traduce directamente en reglas: «Si ingresos > 2.000 € y antigüedad > 2 años y sin impagos previos → preaprobar». Puede perder algo de capacidad predictiva frente a un modelo complejo, pero gana en transparencia, en facilidad de auditoría y en adopción por parte del equipo.

### Importancia de variables

Los árboles permiten medir cuánto contribuye cada variable a reducir la impureza total (*importancia por reducción de impureza* o MDI). Es útil para explorar, pero tiene sesgos: favorece a las variables con muchos valores posibles y reparte de forma arbitraria la importancia entre variables correlacionadas. Una alternativa más fiable es la **importancia por permutación** (`sklearn.inspection.permutation_importance`), que mide cuánto empeora el modelo al barajar cada variable en datos de validación.

### Errores frecuentes

- Dejar el árbol sin límite de profundidad y celebrar la exactitud en train.
- Interpretar la estructura de un árbol concreto como «la verdad» cuando otro árbol entrenado con una muestra ligeramente distinta podría ser muy diferente.
- Tomar la importancia de variables como causalidad.

Practica: notebook, sección 1 (árbol de profundidad 3 con `plot_tree`) y sección 2.

> **Ideas clave**
> - Un árbol divide los datos con preguntas sí/no que maximizan la pureza (Gini o entropía).
> - Es interpretable, no requiere escalar y capta interacciones, pero sobreajusta y es inestable.
> - Se regulariza limitando profundidad y tamaño de hojas; los valores se eligen con validación cruzada.
> - Un árbol poco profundo da pocas probabilidades distintas: ordena peor y su AUC suele ser menor.

---

## 4.4 Ensembles: random forest y gradient boosting

Si un árbol es inestable, ¿por qué no entrenar muchos y combinarlos? Esa es la idea de los **ensembles** (conjuntos de modelos). En datos tabulares (filas de clientes, transacciones, pedidos), los ensembles de árboles son hoy el estándar de referencia en rendimiento. Hay dos familias principales que funcionan de forma casi opuesta.

### Random forest: muchos árboles independientes que votan

El random forest combina dos fuentes de aleatoriedad:

1. **Bagging** (*bootstrap aggregating*): cada árbol se entrena con una muestra bootstrap de los datos (muestreo con reemplazo, como en el módulo 01).
2. **Submuestreo de variables:** en cada división, el árbol solo puede elegir entre un subconjunto aleatorio de variables (por defecto, $\sqrt{k}$ de las $k$ variables en clasificación).

Cada árbol se deja crecer profundo (bajo sesgo, alta varianza) y la predicción final es la media de las probabilidades de todos los árboles. La intuición es la de la «sabiduría de las multitudes»: promediar errores que no están muy correlacionados entre sí reduce la varianza. El submuestreo de variables sirve precisamente para **descorrelacionar** los árboles; sin él, todos empezarían por la misma variable dominante y se parecerían demasiado.

Propiedades prácticas:

- Funciona bien casi sin ajustar hiperparámetros. Más árboles nunca empeoran el resultado, solo cuestan más tiempo (en el notebook, `RandomForestClassifier(300, ...)`).
- Ofrece una estimación de error gratuita, el **error *out-of-bag***: cada árbol no ha visto alrededor de un tercio de los datos, y se puede evaluar con ellos.
- Es difícil que sobreajuste de forma grave, aunque sus probabilidades tienden a ser poco extremas (rara vez da 0,99).

### Gradient boosting: árboles pequeños que corrigen errores en secuencia

El boosting construye los árboles **uno detrás de otro**, y cada nuevo árbol se entrena para corregir lo que los anteriores hacen mal. En gradient boosting, cada árbol se ajusta al **gradiente de la pérdida** (en clasificación, la log loss), que intuitivamente es «lo que les falta» a las predicciones actuales. La predicción final es una suma:

$$F_M(x) = F_0(x) + \eta \sum_{m=1}^{M} h_m(x)$$

donde $h_m$ son árboles pequeños (poco profundos) y $\eta$ es la **tasa de aprendizaje** (*learning rate*), que encoge la aportación de cada árbol para avanzar con prudencia. Al contrario que el random forest, aquí se parte de modelos con mucho sesgo y se reduce el sesgo paso a paso.

Hiperparámetros principales: número de árboles (o iteraciones), tasa de aprendizaje, profundidad o número de hojas por árbol y regularización. A diferencia del random forest, **el boosting sí puede sobreajustar** si añades demasiados árboles; por eso se usa la **parada temprana** (*early stopping*) con un conjunto de validación. En el notebook se usa `HistGradientBoostingClassifier`, la implementación rápida de scikit-learn (inspirada en LightGBM), que agrupa los valores en intervalos y admite valores faltantes. Fuera de scikit-learn, las bibliotecas más usadas son XGBoost, LightGBM y CatBoost.

### Comparación

| | Random forest | Gradient boosting |
|---|---|---|
| Construcción | Árboles en paralelo e independientes | Árboles en secuencia, cada uno corrige al anterior |
| Árboles | Profundos | Poco profundos |
| Reduce sobre todo… | Varianza | Sesgo |
| Ajuste de hiperparámetros | Poco sensible | Más sensible (tasa, nº de árboles) |
| Riesgo de sobreajuste | Bajo | Moderado: usar parada temprana |
| Rendimiento típico en tabulares | Muy bueno | A menudo el mejor |

### Lo que dice el notebook

En la sección 2, con umbral 0,5 en test: el gradient boosting obtiene la mayor exactitud (0,971) y el menor número de falsos negativos (3), y el random forest un AUC de 0,980. Pero la regresión logística consigue el AUC más alto (0,992). Lección importante: **los ensembles no siempre ganan**. En un conjunto pequeño (569 casos) y con variables que se relacionan de forma bastante monótona con la clase, un modelo lineal regularizado puede ser igual de bueno o mejor. Además, con solo 171 casos en test, diferencias de una o dos centésimas de AUC están dentro del ruido de muestreo.

### Importancia de variables e interpretabilidad

Un ensemble de 300 árboles ya no se puede leer como un diagrama de flujo. Se pierde interpretabilidad directa y hay que recurrir a herramientas como la importancia de variables (sección 4 del notebook: las 10 variables más importantes del random forest, encabezadas por *mean concave points*), la importancia por permutación o los valores SHAP. Recuerda: importancia ≠ causalidad, y entre variables muy correlacionadas (radio, perímetro, área) la importancia se reparte de forma arbitraria.

### Ejemplo de negocio

Una aseguradora quiere priorizar qué siniestros revisa su equipo antifraude. Tiene 200.000 siniestros históricos con 80 variables. Un gradient boosting con parada temprana mejora el AUC de 0,78 (regresión logística) a 0,85. Con capacidad para revisar el 2 % de los siniestros, esa mejora en la ordenación puede significar detectar bastantes más fraudes con el mismo equipo. Aquí la complejidad sí compensa: hay muchos datos, muchas variables e interacciones que la regresión logística no capta.

### Errores frecuentes

- Ajustar los hiperparámetros mirando el test (se ajustan con validación cruzada sobre el train).
- Saltar directamente al boosting sin una línea base logística.
- Elegir el modelo por diferencias minúsculas de AUC sin considerar interpretabilidad, coste de mantenimiento y estabilidad.

Practica: notebook, secciones 2 y 4; ejercicio 2 (random forest con solo 5 variables).

> **Ideas clave**
> - Random forest: muchos árboles profundos y descorrelacionados que se promedian; reduce varianza y casi no necesita ajuste.
> - Gradient boosting: árboles pequeños en secuencia que corrigen errores; reduce sesgo, requiere parada temprana.
> - En datos tabulares los ensembles suelen ser los mejores, pero no siempre: compara con la regresión logística.
> - Ganas rendimiento y pierdes interpretabilidad directa; la importancia de variables no es causalidad.

---

## 4.5 Matriz de confusión, precisión, recall, curva ROC y AUC

Elegir la métrica es elegir qué significa «funcionar bien». Esta lección es probablemente la más importante de la Parte 1.

### La matriz de confusión

Con un umbral fijado, cada caso cae en una de cuatro casillas:

| | Predicho 0 | Predicho 1 |
|---|---|---|
| **Real 0** | Verdadero negativo (VN / TN) | Falso positivo (FP) — error tipo I |
| **Real 1** | Falso negativo (FN) — error tipo II | Verdadero positivo (VP / TP) |

(Es la disposición de `confusion_matrix` de scikit-learn: filas = realidad, columnas = predicción, y el `ravel()` devuelve `tn, fp, fn, tp`.)

En el notebook, la regresión logística con umbral 0,5 sobre los 171 casos de test da: TN = 103, FP = 4, FN = 4, TP = 60.

### Las métricas que salen de ella

| Métrica | Fórmula | Pregunta que responde |
|---|---|---|
| Exactitud (*accuracy*) | $\frac{TP+TN}{\text{total}}$ | ¿Qué fracción acierto? |
| Precisión (*precision*) | $\frac{TP}{TP+FP}$ | De los que marco como positivos, ¿cuántos lo son? |
| Recall / sensibilidad | $\frac{TP}{TP+FN}$ | De los positivos reales, ¿cuántos detecto? |
| Especificidad | $\frac{TN}{TN+FP}$ | De los negativos reales, ¿cuántos dejo tranquilos? |
| Tasa de falsos positivos (FPR) | $\frac{FP}{FP+TN} = 1-\text{especificidad}$ | ¿Qué fracción de negativos molesto? |
| F1 | $2\cdot\frac{\text{prec}\cdot\text{rec}}{\text{prec}+\text{rec}}$ | Media armónica de precisión y recall |

Con los números anteriores: exactitud $= 163/171 = 0{,}953$; recall $= 60/64 = 0{,}938$; precisión $= 60/64 = 0{,}938$; especificidad $= 103/107 = 0{,}963$.

Una regla mnemotécnica: **precisión mira la columna de los que predigo positivos; recall mira la fila de los que son positivos**. Y hay una tensión inevitable entre ambas: si marcas más casos como positivos, sube el recall y suele bajar la precisión.

¿Cuál priorizar? Depende del coste de los errores:

- **Recall** cuando un falso negativo es grave: cribado de cáncer, detección de fraude grave, seguridad.
- **Precisión** cuando un falso positivo es caro o molesto: filtro de spam (no mandar a la papelera un correo legítimo), campañas con un coste de contacto alto, alertas que revisa un equipo limitado.

### La curva ROC

Cada umbral produce una matriz de confusión distinta. La **curva ROC** (*Receiver Operating Characteristic*) resume todas a la vez: para cada umbral posible dibuja la tasa de falsos positivos (eje X) frente al recall o tasa de verdaderos positivos (eje Y). Con umbral 1 no marcas nada (punto (0,0)); con umbral 0 lo marcas todo (punto (1,1)). Un modelo aleatorio sigue la diagonal; un modelo perfecto sube en vertical hasta (0,1) y luego va en horizontal.

### El AUC

El **AUC** (*Area Under the Curve*) es el área bajo la curva ROC. Va de 0,5 (azar) a 1 (perfecto). Tiene una interpretación muy útil:

> El AUC es la probabilidad de que el modelo dé una puntuación más alta a un positivo elegido al azar que a un negativo elegido al azar.

Por eso **no depende del umbral**: mide la calidad de la **ordenación** de los casos, no una decisión concreta. Tampoco depende de que las probabilidades estén calibradas: si multiplicas todas las puntuaciones por 0,5, el AUC no cambia. En el notebook, la regresión logística tiene AUC 0,992: en el 99,2 % de los pares (maligno, benigno), el maligno recibe una probabilidad mayor.

```python
from sklearn.metrics import roc_auc_score, RocCurveDisplay
roc_auc_score(y_test, prob)
RocCurveDisplay.from_predictions(y_test, prob, name="Logística")
```

### Cuando la clase positiva es muy rara: curva precisión-recall

Con un 0,1 % de positivos, un FPR del 1 % parece pequeño, pero sobre un millón de negativos son 10.000 falsas alarmas frente a 1.000 positivos reales: la precisión sería, como mucho, del 9 %. La curva ROC puede dar una imagen demasiado optimista. En esos casos es más informativa la **curva precisión-recall** (`precision_recall_curve`) y su resumen, la *average precision*.

### Ejemplo de negocio

Un e-commerce detecta fraude en pedidos: el 0,5 % son fraudulentos. Un modelo con exactitud del 99,5 % no dice nada (es lo que obtiene «nunca fraude»). El equipo de riesgos puede revisar 300 pedidos al día. Las preguntas útiles son: ¿qué recall consigo si reviso los 300 pedidos con mayor puntuación? ¿Y qué precisión (cuántos de esos 300 son fraude de verdad)? El AUC sirve para comparar modelos; la precisión y el recall en el punto de operación sirven para decidir.

### Errores frecuentes

- Reportar solo exactitud con clases desequilibradas.
- Confundir precisión con exactitud (en inglés *precision* vs. *accuracy*).
- Decir que «el AUC es la probabilidad de acertar». Es la probabilidad de ordenar bien un par positivo-negativo.
- Comparar modelos con AUC calculado sobre el train.
- Olvidar que con pocos casos en test las métricas tienen mucha incertidumbre: un FN más o menos cambia el recall en 1,6 puntos con 64 positivos.

Practica: notebook, sección 2 (tabla de métricas y curvas ROC de los cuatro modelos).

> **Ideas clave**
> - La matriz de confusión (TN, FP, FN, TP) depende del umbral; de ella salen exactitud, precisión, recall y especificidad.
> - Precisión: «de los que marco, cuántos son»; recall: «de los que son, cuántos marco». Hay que elegir según el coste.
> - La curva ROC recorre todos los umbrales; el AUC mide la calidad de la ordenación y no depende del umbral.
> - Con positivos muy raros, mira también la curva precisión-recall.

---

## 4.6 El umbral es una decisión de negocio

El umbral de 0,5 no tiene nada de especial. Es razonable solo si los dos tipos de error cuestan lo mismo y las probabilidades están bien calibradas. En la mayoría de problemas reales, ninguna de las dos condiciones se cumple.

### La regla teórica

Supón que un falso negativo cuesta $C_{FN}$ y un falso positivo $C_{FP}$ (y los aciertos cuestan 0). Ante un caso con probabilidad $p$ de ser positivo:

- Si lo marco como positivo, el coste esperado es $(1-p)\,C_{FP}$ (me equivoco si en realidad es negativo).
- Si lo marco como negativo, el coste esperado es $p\,C_{FN}$.

Conviene marcarlo como positivo cuando $p\,C_{FN} > (1-p)\,C_{FP}$, es decir, cuando

$$p > u^* = \frac{C_{FP}}{C_{FP} + C_{FN}}$$

Si los costes son iguales, $u^* = 0{,}5$. Si un falso negativo cuesta 20 veces más, $u^* = 1/21 \approx 0{,}048$: basta un 5 % de probabilidad para actuar. Esta regla es elegante, pero **depende de que las probabilidades estén bien calibradas**, lo que no siempre ocurre (los random forest, por ejemplo, tienden a dar probabilidades poco extremas).

### La regla empírica: minimizar el coste con datos

Por eso, en la práctica se busca el umbral que minimiza el coste total con datos que el modelo no ha visto en el entrenamiento. El notebook lo hace así:

```python
prob_cv = cross_val_predict(logit, X_train, y_train, cv=StratifiedKFold(5, shuffle=True, random_state=0),
                            method="predict_proba")[:, 1]
COSTE_FN, COSTE_FP = 20, 1
umbrales = np.linspace(0.01, 0.99, 99)
costes = [COSTE_FN * ((prob_cv < u) & (y_train == 1)).sum()
          + COSTE_FP * ((prob_cv >= u) & (y_train == 0)).sum() for u in umbrales]
u_opt = umbrales[np.argmin(costes)]
```

Dos detalles importantes:

1. **Se usan predicciones de validación cruzada sobre el train**, no el test. Si eligieras el umbral mirando el test, este dejaría de ser una evaluación honesta: estarías ajustando un parámetro más con él.
2. El umbral óptimo resulta ser **0,06**, muy cerca de la regla teórica (0,048).

Al aplicarlo al test, la matriz de confusión cambia de (FN = 4, FP = 4) con umbral 0,5 a (FN = 1, FP = 18) con umbral 0,06. Se detectan 63 de 64 tumores malignos, a cambio de 14 biopsias innecesarias más. Con un ratio de costes de 20:1, el coste pasa de $4\cdot 20 + 4 = 84$ a $1\cdot 20 + 18 = 38$: menos de la mitad.

### ¿Quién fija los costes?

Aquí está el núcleo de la lección: **el ratio 20:1 no lo decide el científico de datos**. Lo decide (o lo valida) quien conoce las consecuencias: el equipo clínico, el área de riesgos, finanzas. Tu trabajo es hacer visible el compromiso: mostrar, para varios umbrales, cuántos casos se detectan, cuántas falsas alarmas se generan y cuánto cuesta cada escenario. Una tabla con 3–4 umbrales y sus consecuencias es una de las herramientas de comunicación más potentes que tienes.

### Otras formas de fijar el umbral

- **Por capacidad:** «el equipo puede revisar 300 casos al día» → el umbral es la puntuación del caso número 300. Equivale a trabajar con el *top-k*.
- **Por restricción de una métrica:** «necesitamos un recall de al menos el 95 %» → el umbral más alto que lo cumple.
- **Por beneficio esperado:** si los aciertos también tienen valor (un cliente retenido vale 300 €), se maximiza el beneficio en lugar de minimizar el coste.
- scikit-learn ofrece `TunedThresholdClassifierCV`, que automatiza la búsqueda del umbral con validación cruzada y una métrica a medida.

### Ejemplo de negocio

Una fintech concede microcréditos. Un impago (FN: predecir «paga» a quien no paga) cuesta de media 400 €; rechazar a un buen cliente (FP) supone perder 60 € de margen. El umbral teórico es $60/(60+400) \approx 0{,}13$: rechazar a todo el que tenga más de un 13 % de probabilidad estimada de impago. Pero si el área comercial tiene un objetivo de volumen, quizá prefiera un umbral más alto. La conversación productiva no es «¿qué umbral es el correcto?», sino «¿qué combinación de impagos y rechazos estamos dispuestos a asumir?».

### Errores frecuentes

- Usar 0,5 por defecto sin preguntarse por los costes.
- Elegir el umbral sobre el test.
- Fijar el umbral una vez y olvidarse: si cambian los costes, la prevalencia o el modelo, hay que revisarlo.
- Presentar solo «el modelo óptimo» en lugar del abanico de opciones con sus consecuencias.

Practica: notebook, sección 3; ejercicio 1 (repetir con ratios de coste 5 y 50).

> **Ideas clave**
> - El umbral 0,5 solo es razonable si los errores cuestan igual y las probabilidades están calibradas.
> - Regla teórica: actuar si $p > C_{FP}/(C_{FP}+C_{FN})$; en la práctica, minimizar el coste con predicciones de validación cruzada.
> - Nunca elijas el umbral mirando el test.
> - Los costes los fija el negocio; tu trabajo es mostrar con claridad qué se gana y qué se pierde en cada umbral.

---

## 4.7 Pruebas de hipótesis: H₀, p-valor, errores tipo I y II, potencia

Cambiamos de bloque. Una tienda online prueba un nuevo botón de compra y la conversión sube de 9,9 % a 11,5 %. ¿Es una mejora real o habría salido algo así por puro azar? Las pruebas de hipótesis responden a esa pregunta de una forma muy concreta, y su interpretación es la fuente de malentendidos más frecuente en el análisis de datos.

### La lógica: un argumento por reducción al absurdo

1. Planteamos una **hipótesis nula** $H_0$, la del «no pasa nada»: las conversiones de A y B son iguales ($p_A = p_B$).
2. Planteamos una **hipótesis alternativa** $H_1$: son distintas ($p_A \ne p_B$, contraste **bilateral**) o B es mejor ($p_B > p_A$, **unilateral**). Se decide antes de ver los datos.
3. Calculamos un **estadístico de contraste** que mide cuánto se alejan los datos de lo que esperaríamos bajo $H_0$. Para dos proporciones:

$$z = \frac{\hat p_B - \hat p_A}{\sqrt{\hat p(1-\hat p)\left(\frac{1}{n_A} + \frac{1}{n_B}\right)}}$$

donde $\hat p$ es la proporción combinada de ambos grupos. Bajo $H_0$, $z$ sigue aproximadamente una normal estándar (por el teorema central del límite del módulo 01).

4. Calculamos el **p-valor** y lo comparamos con un **nivel de significación** $\alpha$ fijado de antemano (habitualmente 0,05).

### Qué es (y qué no es) el p-valor

> **El p-valor es la probabilidad de observar una diferencia al menos tan grande como la observada si $H_0$ fuera cierta.**

Es una probabilidad sobre los **datos**, calculada **suponiendo** que no hay efecto. En el notebook, $z = 4{,}39$ y $p \approx 1{,}1 \cdot 10^{-5}$: si los dos botones convirtieran igual, una diferencia al menos tan grande como la observada (en cualquiera de los dos sentidos) aparecería por azar aproximadamente en uno de cada 90.000 experimentos. Es tan improbable que preferimos rechazar $H_0$.

Lo que el p-valor **no** es:

| Interpretación incorrecta | Por qué falla |
|---|---|
| «Hay un 97 % de probabilidad de que B sea mejor» (con p = 0,03) | El p-valor no es $P(H_1 \mid \text{datos})$; para eso hace falta un análisis bayesiano con una probabilidad previa. |
| «Hay un 3 % de probabilidad de que $H_0$ sea cierta» | Tampoco es $P(H_0 \mid \text{datos})$. Se calcula suponiendo $H_0$ cierta. |
| «p = 0,001 implica un efecto enorme» | Con muestras gigantes, efectos minúsculos dan p-valores minúsculos. El p-valor no mide el tamaño del efecto. |
| «p = 0,20 demuestra que no hay efecto» | No rechazar $H_0$ no es demostrarla: puede que falten datos (poca potencia). |
| «p = 0,049 y p = 0,051 son resultados opuestos» | El umbral 0,05 es una convención; la evidencia es prácticamente la misma. |

Por eso **un p-valor siempre debe ir acompañado del tamaño del efecto y su intervalo de confianza** (lección 4.8).

### Dos tipos de error

| | $H_0$ cierta (no hay efecto) | $H_0$ falsa (hay efecto) |
|---|---|---|
| **Rechazo $H_0$** | **Error tipo I** (falso positivo), probabilidad $\alpha$ | Acierto: potencia $1-\beta$ |
| **No rechazo $H_0$** | Acierto | **Error tipo II** (falso negativo), probabilidad $\beta$ |

Es la misma matriz de confusión de la lección 4.5, aplicada a decisiones sobre experimentos. Con $\alpha = 0{,}05$ aceptas que, cuando no hay efecto, 1 de cada 20 experimentos te dirá que sí lo hay. El error tipo II es dejar pasar una mejora real.

### Potencia y tamaño muestral

La **potencia** ($1-\beta$) es la probabilidad de detectar un efecto **cuando existe** y tiene un tamaño determinado. Se suele exigir un 80 %. Depende de cuatro cosas relacionadas entre sí:

1. **Tamaño del efecto** que quieres detectar (cuanto más pequeño, más difícil).
2. **Tamaño de la muestra** (más datos, más potencia).
3. **Nivel de significación** $\alpha$ (más exigente, menos potencia).
4. **Variabilidad** de la métrica (más ruido, menos potencia).

Fijadas tres, se puede despejar la cuarta. Lo habitual es fijar el efecto mínimo que te interesa, $\alpha$ y la potencia, y calcular $n$. Para dos proporciones, aproximadamente:

$$n \text{ por grupo} \approx \frac{(z_{1-\alpha/2} + z_{1-\beta})^2 \,[p_A(1-p_A) + p_B(1-p_B)]}{(p_B - p_A)^2}$$

Fíjate en el denominador: **$n$ crece con el inverso del cuadrado del efecto**. Detectar la mitad de efecto exige cuatro veces más muestra. En el notebook (sección 5), pasar de 10 % a 11 % con $\alpha = 0{,}05$ y potencia 80 % requiere **14.745 usuarios por grupo**:

```python
efecto = proportion_effectsize(0.11, 0.10)          # h de Cohen
NormalIndPower().solve_power(effect_size=efecto, alpha=0.05, power=0.8, alternative="two-sided")
```

### Ejemplo de negocio

Un banco quiere comprobar si un nuevo texto en el formulario de solicitud reduce el abandono del 40 % al 38 %. Con $\alpha = 0{,}05$ y potencia del 80 % necesita unas 9.300 solicitudes por grupo. Si solo recibe 1.000 solicitudes a la semana, el experimento duraría unos cuatro meses (18.600 solicitudes en total). Saberlo **antes** de empezar permite decidir con criterio: aceptar un efecto mínimo mayor, buscar más tráfico o no hacer el experimento.

### Errores frecuentes

- Leer el p-valor como la probabilidad de que la hipótesis sea cierta.
- Confundir significación estadística con relevancia práctica.
- Concluir «no hay efecto» de un experimento con poca potencia.
- Elegir unilateral o bilateral después de ver los datos.

Practica: notebook, secciones 5 y 6; ejercicio 3.

> **Ideas clave**
> - El p-valor es $P(\text{datos tan extremos} \mid H_0)$, no $P(H_0 \mid \text{datos})$ ni la probabilidad de que B sea mejor.
> - Error tipo I = falso positivo ($\alpha$); error tipo II = falso negativo ($\beta$); potencia = $1-\beta$.
> - No rechazar $H_0$ no demuestra que no haya efecto; puede faltar potencia.
> - El tamaño muestral se calcula antes de empezar, y crece con $1/\text{efecto}^2$.

---

## 4.8 Pruebas A/B de principio a fin

Una prueba A/B es un **experimento controlado aleatorizado**: repartes al azar a los usuarios entre la versión actual (A, control) y la nueva (B, tratamiento), y comparas una métrica. La aleatorización es lo que la hace tan valiosa: como los grupos solo se diferencian por el azar y por el cambio, cualquier diferencia sistemática se puede atribuir al cambio. Es la forma más directa de pasar de correlación a causalidad (módulo 01).

### Fase 1 · Diseño (antes de lanzar)

1. **Hipótesis de negocio.** «El botón verde, más visible, aumentará la conversión porque los usuarios lo encuentran antes».
2. **Unidad de aleatorización.** Normalmente el usuario (no la visita: un mismo usuario debe ver siempre la misma versión).
3. **Métrica principal** (una sola, decidida de antemano): tasa de conversión. Kohavi y colaboradores la llaman *Overall Evaluation Criterion* (OEC).
4. **Métricas de salvaguarda** (*guardrails*): las que no deben empeorar (ticket medio, devoluciones, tiempo de carga, quejas).
5. **Efecto mínimo detectable** (MDE): el menor efecto que te importaría y justificaría el cambio. No es el efecto que «esperas», sino el que **vale la pena** detectar.
6. **$\alpha$, potencia y tamaño muestral.** En el notebook: 10 % → 11 %, $\alpha = 0{,}05$, potencia 80 % → 14.745 por grupo.
7. **Duración.** Tamaño muestral dividido entre el tráfico diario, **redondeado a semanas completas** para capturar el ciclo semanal (el comportamiento del lunes no es el del sábado).

Escríbelo todo en un **plan de análisis** antes de empezar. Es la mejor vacuna contra las trampas de la lección 4.9.

### Fase 2 · Ejecución

- Comprueba que el reparto es el previsto. Si diseñaste 50/50 y observas 50,8/49,2 con cientos de miles de usuarios, tienes un **desajuste en la proporción de muestra** (*sample ratio mismatch*, SRM): algo falla en la asignación o el registro, y los resultados no son fiables. Se detecta con una prueba chi-cuadrado sobre los recuentos.
- Vigila que no haya errores graves (que B no rompa el proceso de pago), pero **no mires el p-valor de la métrica principal para decidir cuándo parar**.

### Fase 3 · Análisis

Con los datos del notebook (sección 6): A convierte un 9,91 % y B un 11,48 % (15.000 usuarios por grupo).

```python
z, p = proportions_ztest([conv_B.sum(), conv_A.sum()], [n, n])   # z = 4,39 ; p ≈ 1,1e-05
```

Pero el p-valor es solo una parte. El resultado completo tiene tres piezas:

1. **Tamaño del efecto**: diferencia absoluta $+1{,}57$ puntos porcentuales; mejora relativa $1{,}57/9{,}91 \approx +16\,\%$.
2. **Intervalo de confianza al 95 % de la diferencia**:

$$(\hat p_B - \hat p_A) \pm 1{,}96\sqrt{\frac{\hat p_A(1-\hat p_A)}{n_A} + \frac{\hat p_B(1-\hat p_B)}{n_B}}$$

que aquí da aproximadamente $[+0{,}87;\ +2{,}27]$ puntos. (Ojo: no es lo mismo que comparar si se solapan los IC de cada grupo por separado; dos intervalos que se solapan un poco pueden corresponder a una diferencia significativa.)

3. **p-valor**: $\approx 1{,}1\cdot 10^{-5}$.

El intervalo es lo más útil para decidir: dice que **incluso en el escenario pesimista la mejora es positiva**, y da un rango para estimar el impacto económico.

### Fase 4 · Decisión

Combina los cuatro escenarios posibles del IC respecto a 0 y al MDE:

| El IC… | Lectura | Decisión típica |
|---|---|---|
| Está entero por encima del MDE | Efecto real y relevante | Lanzar |
| Excluye el 0 pero incluye valores por debajo del MDE | Efecto real, tamaño incierto | Lanzar si el coste es bajo; si no, valorar |
| Incluye el 0 y es estrecho | Probablemente no hay efecto relevante | No lanzar (o lanzar por otros motivos) |
| Incluye el 0 y es ancho | No sabemos | Falta potencia; no concluir «no funciona» |

Y revisa las métricas de salvaguarda: una mejora de conversión que dispara las devoluciones puede no compensar.

### Plantilla de informe

> **Hipótesis:** el botón nuevo aumenta la conversión. **Diseño:** 50/50 por usuario, 15.000 por grupo (MDE +1 p.p., α = 0,05, potencia 80 %), dos semanas. **Resultado:** conversión A 9,91 %, B 11,48 %; diferencia +1,57 p.p. (IC 95 %: +0,87 a +2,27), mejora relativa +16 %; p < 0,001. Sin SRM; métricas de salvaguarda estables. **Recomendación:** lanzar B. Impacto estimado: entre X € y Y € al mes.

### Ejemplo de negocio adicional

Una plataforma de suscripción prueba un precio de 9,99 € frente a 8,99 €. La conversión baja ligeramente con el precio alto, pero el ingreso por visitante sube. Aquí la métrica principal debería ser **ingreso por visitante**, no conversión: elegir mal la métrica principal puede llevarte a la decisión equivocada aunque la estadística sea impecable. Para métricas continuas como el ingreso se usa una prueba t (o bootstrap) en lugar de la prueba z de proporciones.

### Errores frecuentes

- Aleatorizar por visita en lugar de por usuario.
- Cambiar la métrica principal después de ver los resultados.
- Informar solo del p-valor, sin efecto ni intervalo.
- Ignorar el SRM.
- Lanzar sin mirar las métricas de salvaguarda.

Practica: notebook, secciones 5 y 6; ejercicio 4 (IC de la diferencia y mejora relativa).

> **Ideas clave**
> - Una prueba A/B es un experimento aleatorizado: permite atribuir causalmente la diferencia al cambio.
> - Antes de lanzar: métrica principal, salvaguardas, MDE, α, potencia, tamaño muestral y duración en semanas completas.
> - El resultado completo es efecto + IC 95 % de la diferencia + p-valor; el IC es lo que más ayuda a decidir.
> - Comprueba el reparto (SRM) y las métricas de salvaguarda antes de recomendar.

---

## 4.9 Trampas: comparaciones múltiples, *peeking*, efecto novedad

Una prueba de hipótesis con $\alpha = 0{,}05$ garantiza un 5 % de falsos positivos **solo si se usa como se diseñó**: una hipótesis, una métrica, un análisis al final de un tamaño muestral fijado de antemano. Las prácticas habituales en las empresas rompen esas condiciones sin que nadie lo note.

### Trampa 1 · Comparaciones múltiples

Si haces 20 pruebas independientes, cada una con un 5 % de falsos positivos, y no hay ningún efecto real, la probabilidad de que al menos una salga «significativa» es

$$1 - 0{,}95^{20} \approx 0{,}64$$

Un 64 %. Es lo que confirma la simulación de la sección 7 del notebook: en 1.000 experimentos con 20 métricas sin efecto, el **65 %** muestra al menos una métrica significativa. Las comparaciones múltiples aparecen de muchas formas: muchas métricas, muchos segmentos («no funciona en general, pero en usuarios de Android de Valencia los martes sí»), muchas variantes (A/B/C/D/E) o muchas formas de analizar los mismos datos. Probar análisis hasta que uno salga significativo es el llamado ***p-hacking***.

Soluciones:

- **Una métrica principal** declarada de antemano. Las demás son exploratorias o de salvaguarda.
- **Corregir** cuando analizas varias hipótesis a la vez:
  - **Bonferroni:** usa $\alpha/m$ para cada una de las $m$ pruebas. Sencillo y conservador.
  - **Holm:** versión escalonada de Bonferroni, igual de segura y algo más potente. En el notebook reduce los experimentos con algún falso positivo del 65 % al **4 %**.
  - **Benjamini-Hochberg:** controla la **tasa de falsos descubrimientos** (FDR) en lugar de la probabilidad de cualquier error; útil cuando exploras muchas hipótesis y aceptas algún falso positivo entre muchos hallazgos.

```python
from statsmodels.stats.multitest import multipletests
rechazar, p_corr, _, _ = multipletests(p_valores, alpha=0.05, method="holm")
```

- Los hallazgos en segmentos que no estaban planificados se tratan como **hipótesis para un nuevo experimento**, no como conclusiones.

### Trampa 2 · *Peeking* (mirar antes de tiempo)

Es la tentación más humana: consultar el p-valor cada día y parar en cuanto baja de 0,05. El problema es que, aunque no haya efecto, el p-valor **fluctúa** a lo largo del experimento como un paseo aleatorio. Si te das 20 oportunidades de pillarlo por debajo de 0,05, acabarás pillándolo con mucha más frecuencia del 5 %. En la sección 8 del notebook, mirando cada día durante 20 días sin efecto real, la tasa de falsos positivos llega al **27 %**: más de cinco veces lo prometido. Evan Miller lo explicó en su ensayo clásico «How Not To Run an A/B Test».

Soluciones:

- **Fija el tamaño muestral de antemano** y analiza una sola vez al final.
- Si necesitas poder parar antes (por ejemplo, por si B es claramente perjudicial), usa **métodos secuenciales** diseñados para ello: diseños con análisis intermedios planificados y umbrales más exigentes en cada mirada (*group sequential*, funciones de gasto de $\alpha$ como O'Brien-Fleming), o pruebas secuenciales siempre válidas. Muchas plataformas de experimentación las incorporan.
- Mirar los datos para detectar errores graves está bien; lo que invalida el análisis es **decidir cuándo parar en función del p-valor**.

### Trampa 3 · Efecto novedad (y efecto primacía)

Los usuarios habituales reaccionan a lo nuevo por ser nuevo: hacen clic en el botón rediseñado por curiosidad, y el efecto se desvanece en unas semanas. Es el **efecto novedad**. El fenómeno inverso es el **efecto primacía** (o aversión al cambio): al principio rechazan la nueva interfaz porque rompe sus hábitos, y con el tiempo la aceptan.

Cómo detectarlo y mitigarlo:

- **Dibuja el efecto a lo largo del tiempo** (diferencia diaria o semanal). Si decrece de forma sistemática, sospecha.
- **Separa usuarios nuevos y recurrentes**: los nuevos no tienen hábitos previos, así que no sufren efecto novedad.
- **Alarga la duración** o usa un grupo de control a largo plazo (*holdout*) que no recibe el cambio durante meses.

### Otras trampas que conviene conocer

- **Desajuste en la proporción de muestra (SRM):** ver la lección 4.8.
- **Interferencia entre grupos:** en un marketplace, si B hace que los compradores compren más, puede agotar el stock que también ve A. Se resuelve aleatorizando por grupos (ciudades, periodos).
- **Regresión a la media y temporadas:** un experimento lanzado en Black Friday puede no generalizar a marzo.
- **Ley de Twyman:** cualquier cifra que parezca demasiado buena o interesante probablemente es un error. Si B mejora la conversión un 40 %, revisa la instrumentación antes de celebrarlo.

### Ejemplo de negocio

Un equipo de producto analiza un experimento de rediseño de la ficha de producto. La métrica principal (conversión) no es significativa, pero en el informe aparecen 15 métricas y 8 segmentos, y tres combinaciones salen con p < 0,05. El director pregunta si se puede lanzar «al menos para móvil en Cataluña». Respuesta correcta: con 120 comparaciones, esperaríamos unas 6 significativas por puro azar; esos tres hallazgos son compatibles con ruido. Si el segmento tiene sentido de negocio, se plantea un nuevo experimento específico con ese segmento como hipótesis principal.

### Errores frecuentes

- Presentar el segmento significativo como hallazgo sin mencionar cuántos se probaron.
- Parar el experimento «porque ya es significativo».
- Concluir con una semana de datos que el efecto es permanente.
- Aplicar correcciones solo cuando conviene.

Practica: notebook, secciones 7 y 8.

> **Ideas clave**
> - Con 20 pruebas al 5 % y sin efecto real, la probabilidad de al menos un falso positivo es ≈64 %; declara una métrica principal y corrige (Holm, Bonferroni, BH).
> - Mirar el p-valor cada día y parar al cruzar 0,05 dispara los falsos positivos (27 % en el notebook); fija $n$ o usa métodos secuenciales.
> - El efecto novedad hace que las mejoras iniciales se desvanezcan: analiza el efecto en el tiempo y por usuarios nuevos/recurrentes.
> - Desconfía de los resultados demasiado buenos y de los hallazgos en segmentos no planificados.

---

## Glosario

| Término | Definición breve |
|---|---|
| **AUC** (*Area Under the ROC Curve*) | Área bajo la curva ROC; probabilidad de que el modelo puntúe más alto a un positivo que a un negativo elegidos al azar. |
| **Bagging** (*bootstrap aggregating*) | Entrenar modelos sobre muestras bootstrap y promediarlos para reducir la varianza. |
| **Comparaciones múltiples** (*multiple comparisons*) | Realizar muchas pruebas a la vez, lo que aumenta la probabilidad de algún falso positivo. |
| **Corrección de Holm** (*Holm correction*) | Ajuste escalonado de los p-valores que controla la probabilidad de cometer algún error tipo I. |
| **Curva ROC** (*Receiver Operating Characteristic curve*) | Gráfico de recall frente a tasa de falsos positivos para todos los umbrales. |
| **Efecto mínimo detectable** (*minimum detectable effect*, MDE) | Menor efecto que el experimento está diseñado para detectar con la potencia fijada. |
| **Efecto novedad** (*novelty effect*) | Mejora transitoria debida a que el cambio es nuevo, que desaparece con el tiempo. |
| **Error tipo I / tipo II** (*type I / type II error*) | Falso positivo (rechazar $H_0$ siendo cierta) / falso negativo (no rechazarla siendo falsa). |
| **Exactitud** (*accuracy*) | Proporción de predicciones correctas. |
| **Gradient boosting** (*gradient boosting*) | Ensemble que añade árboles pequeños en secuencia, cada uno corrigiendo los errores del anterior. |
| **Hipótesis nula** (*null hypothesis*, $H_0$) | Hipótesis de «no hay efecto» que se intenta refutar con los datos. |
| **Impureza de Gini** (*Gini impurity*) | Medida de mezcla de clases en un nodo de un árbol; 0 si el nodo es puro. |
| **Matriz de confusión** (*confusion matrix*) | Tabla de aciertos y errores (TN, FP, FN, TP) de un clasificador para un umbral dado. |
| **Odds** (*odds*) | Cociente $p/(1-p)$ entre la probabilidad de que ocurra un suceso y la de que no ocurra. |
| ***Peeking*** (*peeking*) | Consultar los resultados durante el experimento y pararlo al ver significación. |
| **Potencia** (*statistical power*) | Probabilidad de detectar un efecto cuando existe ($1-\beta$). |
| **Precisión** (*precision*) | De los casos predichos como positivos, fracción que lo son realmente. |
| **p-valor** (*p-value*) | Probabilidad de observar un resultado al menos tan extremo como el obtenido si $H_0$ fuera cierta. |
| **Recall / sensibilidad** (*recall, sensitivity*) | De los positivos reales, fracción que el modelo detecta. |
| **Umbral de decisión** (*decision threshold*) | Probabilidad a partir de la cual se asigna la clase positiva. |
