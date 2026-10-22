# Módulo 03 · Regresión y predicción — Apuntes

La regresión lineal es probablemente el modelo más útil que vas a aprender en este curso. No porque sea el más potente, sino porque es el que mejor combina tres cosas que en la empresa se piden a la vez: **predecir** con un error razonable, **explicar** qué variables se asocian con el resultado y **comunicarlo** a alguien que no es analista. Además, casi todo lo que veremos después (regresión logística, regularización, redes neuronales) se construye sobre las ideas de este módulo.

Trabajaremos con el mismo caso que el notebook: un hospital quiere anticipar la **progresión de la diabetes** a un año en 442 pacientes, a partir de 10 variables clínicas (edad, sexo, IMC, presión arterial y seis analíticas). Todas las cifras de estos apuntes salen de ese notebook, de modo que puedes comprobarlas tú mismo.

Antes de empezar, una advertencia que repetiremos varias veces: **un coeficiente de regresión no es un efecto causal**. Describe cómo cambia, en promedio, la variable respuesta entre pacientes que difieren en una variable y coinciden en las demás *incluidas en el modelo*. Para hablar de causas hace falta un diseño adecuado (experimento aleatorizado, experimento natural, o un análisis causal explícito con supuestos defendibles).

## Índice

- [3.1 De la correlación a la recta de regresión; mínimos cuadrados](#31-de-la-correlación-a-la-recta-de-regresión-mínimos-cuadrados)
- [3.2 Regresión múltiple: «manteniendo el resto constante»](#32-regresión-múltiple-manteniendo-el-resto-constante)
- [3.3 Inferencia: errores estándar, p-valores, R²](#33-inferencia-errores-estándar-p-valores-r)
- [3.4 Supuestos y diagnóstico de residuos](#34-supuestos-y-diagnóstico-de-residuos)
- [3.5 Variables categóricas, interacciones y transformaciones](#35-variables-categóricas-interacciones-y-transformaciones)
- [3.6 Sobreajuste, train/test y validación cruzada](#36-sobreajuste-traintest-y-validación-cruzada)
- [3.7 Regularización: Ridge y Lasso](#37-regularización-ridge-y-lasso)
- [Glosario](#glosario)

---

## 3.1 De la correlación a la recta de regresión; mínimos cuadrados

### De una nube de puntos a una regla

En el módulo 01 vimos que la **correlación** de Pearson resume en un número entre −1 y 1 la intensidad de la relación lineal entre dos variables. En nuestros datos, la correlación entre el IMC y la progresión de la diabetes es 0,59: los pacientes con más IMC tienden a progresar más. Pero la correlación no responde a la pregunta que de verdad interesa al hospital: *si un paciente tiene un IMC de 30, ¿qué progresión cabe esperar?*

Para eso necesitamos una **regla** que convierta un valor de $x$ en una predicción de $y$. La más sencilla es una recta:

$$\hat{y} = \beta_0 + \beta_1 x$$

- $\beta_0$ (**intercepto** u ordenada en el origen): el valor predicho cuando $x = 0$.
- $\beta_1$ (**pendiente**): cuánto cambia la predicción cuando $x$ aumenta en una unidad.
- $\hat{y}$ («y gorro»): la predicción, que distinguimos del valor real $y$.

### ¿Qué recta? La de los mínimos cuadrados

Por una nube de puntos pasan infinitas rectas. Para elegir una necesitamos un criterio de «mejor». Para cada paciente $i$, el **residuo** es la distancia vertical entre lo observado y lo predicho:

$$e_i = y_i - \hat{y}_i$$

El método de **mínimos cuadrados ordinarios** (MCO, en inglés *OLS*) elige los coeficientes que minimizan la suma de los residuos al cuadrado:

$$\min_{\beta_0,\beta_1} \sum_{i=1}^{n} \left(y_i - \beta_0 - \beta_1 x_i\right)^2$$

¿Por qué al cuadrado? Por tres motivos: los residuos positivos y negativos no se cancelan; los errores grandes pesan más que los pequeños (equivocarse en 100 puntos es más grave que equivocarse diez veces en 10); y el problema tiene una solución cerrada muy sencilla:

$$\hat\beta_1 = r_{xy}\,\frac{s_y}{s_x}, \qquad \hat\beta_0 = \bar y - \hat\beta_1 \bar x$$

Esta fórmula es reveladora: **la pendiente es la correlación reescalada a las unidades de las variables**. Si $x$ e $y$ estuvieran estandarizadas (media 0, desviación 1), la pendiente sería exactamente la correlación. Y la recta siempre pasa por el punto medio $(\bar x, \bar y)$.

### El ejemplo del notebook

En la sección 2 del notebook ajustamos la recta IMC → progresión con `statsmodels`:

```python
simple = sm.OLS(df["progresion"], sm.add_constant(df[["imc"]])).fit()
simple.params   # const ≈ -117,8 · imc ≈ 10,2
```

La lectura es: **por cada punto adicional de IMC, la progresión esperada es 10,2 puntos mayor**. Para un paciente con IMC 30, la predicción es $-117{,}8 + 10{,}2 \times 30 \approx 189$ puntos.

¿Y el intercepto de −117,8? Es la progresión predicha para un IMC de 0, algo que no existe. El intercepto es un ajuste matemático para colocar la recta a la altura correcta; **no lo interpretes fuera del rango de los datos** (aquí, IMC entre 18 y 42).

`add_constant` es necesario porque `statsmodels` no añade intercepto por defecto; `scikit-learn` sí lo hace (`fit_intercept=True`).

### Cuánto explica la recta: R² (adelanto)

El IMC por sí solo explica el 34 % de la variabilidad de la progresión ($R^2 = 0{,}34$, que es justamente $0{,}59^2$: en regresión simple, $R^2 = r^2$). Volveremos a esta métrica en la lección 3.3.

### Ejemplo de negocio

Una cadena de gimnasios quiere estimar cuántas altas nuevas genera cada euro invertido en publicidad local. Con datos de 80 centros ajusta $\text{altas} = 12 + 0{,}08 \times \text{inversión}$. La pendiente dice que, *entre centros*, cada 100 € adicionales de inversión van asociados a unas 8 altas más. Ojo: los centros que más invierten pueden ser también los de zonas más pobladas. La recta resume la asociación; si se quiere saber qué pasaría *al aumentar* la inversión, hace falta un experimento (por ejemplo, subir la inversión al azar en la mitad de los centros).

### Errores frecuentes

- **Confundir pendiente y correlación.** Una pendiente grande no implica relación fuerte: depende de las unidades. Para la fuerza, mira $r$ o $R^2$.
- **Extrapolar.** La recta solo está respaldada dentro del rango observado.
- **Leer la pendiente como causa.** «Si este paciente baja 1 punto de IMC, su progresión bajará 10 puntos» no se deduce de los datos observacionales.
- **Regresar en la dirección equivocada.** La recta de $y$ sobre $x$ no es la inversa de la de $x$ sobre $y$; elige como $y$ lo que quieres predecir.

> **Ideas clave**
> - La regresión convierte una asociación en una regla de predicción: $\hat y = \beta_0 + \beta_1 x$.
> - MCO elige la recta que minimiza la suma de residuos al cuadrado; la pendiente es la correlación expresada en unidades.
> - La pendiente se interpreta como «diferencia media en $y$ por unidad de $x$»; el intercepto, solo si $x=0$ tiene sentido.
> - Una pendiente describe una asociación, no un efecto causal.
>
> Practica: notebook, secciones 1 y 2.

---

## 3.2 Regresión múltiple: «manteniendo el resto constante»

### Por qué una sola variable no basta

El IMC explica un 34 % de la variabilidad. Pero la progresión depende de muchas más cosas: presión arterial, triglicéridos, edad... La **regresión múltiple** incorpora $p$ variables a la vez:

$$\hat{y} = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_p x_p$$

El criterio sigue siendo el mismo (mínimos cuadrados), aunque ya no ajustamos una recta sino un **hiperplano**. En notación matricial, con $X$ la matriz de datos (con una columna de unos para el intercepto):

$$\hat\beta = (X^\top X)^{-1} X^\top y$$

No necesitas calcularlo a mano; lo importante es entender **qué significa cada coeficiente**.

### La frase mágica: «manteniendo el resto constante»

En regresión múltiple, $\beta_j$ es la diferencia esperada en $y$ cuando $x_j$ aumenta en una unidad **y el resto de variables del modelo se mantiene fija**. Técnicamente es un **coeficiente parcial**: mide la asociación de $x_j$ con $y$ una vez descontado lo que $x_j$ comparte con las demás variables.

En la sección 3 del notebook ajustamos el modelo completo sobre los 331 pacientes de entrenamiento. El coeficiente del IMC baja de 10,2 (regresión simple) a **5,7**. ¿Por qué? Porque los pacientes con más IMC también tienden a tener más presión y peores analíticas. En la regresión simple, el IMC «se llevaba el mérito» de todo eso; en la múltiple, parte de esa asociación se atribuye a las otras variables.

Un ejemplo todavía más llamativo es el sexo. En un modelo con solo IMC y sexo, el coeficiente del sexo es −1,3 y no significativo (p = 0,82). En el modelo completo pasa a −23,1 (p = 0,001). Que un coeficiente cambie, e incluso aparezca o desaparezca, según qué otras variables incluyas es lo normal: **cada coeficiente responde a una pregunta distinta según el conjunto de controles**.

### Lo que «constante» no significa

«Manteniendo el resto constante» es una afirmación *sobre el modelo*, no sobre el mundo:

1. **Solo controla lo que está en el modelo.** Si falta una variable relevante correlacionada con $x_j$ (un *factor de confusión*), $\beta_j$ estará sesgado. Esto se llama **sesgo por variable omitida**.
2. **No siempre es posible en la realidad.** Colesterol total y LDL tienen una correlación de 0,90 en estos datos: «subir el colesterol manteniendo fijo el LDL» describe a muy pocos pacientes reales.
3. **No es una intervención.** Aunque el modelo incluyera todas las variables observadas, el coeficiente sigue siendo una comparación entre pacientes distintos, no el efecto de cambiar el IMC de un paciente concreto. Para eso hace falta un diseño causal.

### Multicolinealidad

Cuando dos o más variables están muy correlacionadas, el modelo tiene dificultades para repartir el mérito entre ellas. Resultado: coeficientes **inestables** (cambian mucho con pequeños cambios en los datos), con errores estándar grandes y a veces con signos «absurdos». En el notebook, el colesterol total sale con coeficiente **negativo** (−1,26) mientras el LDL sale positivo: no es que el colesterol proteja, es que ambos se están compensando.

Una forma de medirla es el **factor de inflación de la varianza** (VIF): cuánto se infla la varianza de $\hat\beta_j$ por la correlación de $x_j$ con las demás. Valores por encima de 5–10 son una señal de alarma. Aquí el colesterol tiene un VIF de 54 y el LDL de 36.

```python
from statsmodels.stats.outliers_influence import variance_inflation_factor
Xc = sm.add_constant(X_train)
{c: variance_inflation_factor(Xc.values, i) for i, c in enumerate(Xc.columns)}
```

La multicolinealidad **no empeora las predicciones** del modelo en conjunto; lo que estropea es la interpretación individual de los coeficientes. `statsmodels` lo avisa al pie de la tabla con el *condition number* elevado.

### Comparar la importancia: coeficientes estandarizados

Los coeficientes crudos dependen de las unidades: el de triglicéridos (63,4) no es «más importante» que el del IMC (5,7) solo por ser mayor, porque un punto de IMC y un punto de log-triglicéridos no son comparables. Si estandarizamos las variables (media 0 y desviación típica 1), cada coeficiente pasa a significar «cambio en $y$ por cada desviación típica de $x_j$», y entonces sí se pueden comparar. En el notebook, con `StandardScaler`, los mayores en valor absoluto son colesterol (−44), triglicéridos (+33), IMC (+25) y LDL (+25); pero recuerda que los dos primeros y el LDL están afectados por la multicolinealidad.

### Ejemplo de negocio

Una inmobiliaria modela el precio de pisos con superficie, número de habitaciones y barrio. El coeficiente de «habitaciones» sale *negativo*. ¿Las habitaciones restan valor? No: **a igual superficie**, más habitaciones significa habitaciones más pequeñas. La frase «manteniendo el resto constante» resuelve la paradoja. Si el responsable comercial lee el coeficiente sin ese matiz, tomará decisiones equivocadas.

### Errores frecuentes

- Interpretar un coeficiente sin decir qué otras variables están en el modelo.
- Concluir que una variable «no importa» porque su coeficiente es pequeño en unidades crudas.
- Fiarse del signo de coeficientes con VIF altos.
- Convertir el coeficiente en una recomendación causal («bajar el colesterol aumentaría la progresión») sin diseño que lo respalde.

> **Ideas clave**
> - En regresión múltiple, cada coeficiente es una asociación **parcial**: diferencia esperada en $y$ por unidad de $x_j$ con el resto de variables del modelo fijas.
> - Los coeficientes cambian al añadir o quitar variables; omitir un factor de confusión sesga los que quedan.
> - La multicolinealidad hace inestables los coeficientes individuales, pero no la predicción conjunta.
> - Para comparar importancias, estandariza las variables; para hablar de causas, necesitas un diseño causal.
>
> Practica: notebook, sección 3 (tabla de statsmodels y coeficientes estandarizados).

---

## 3.3 Inferencia: errores estándar, p-valores, R²

### De la muestra a la población

Nuestros 331 pacientes de entrenamiento son una muestra. Si el hospital hubiera recogido otros 331, los coeficientes habrían salido algo distintos. La **inferencia** cuantifica esa incertidumbre, igual que hicimos con la media en el módulo 01. Para ello se supone un modelo para los datos:

$$y_i = \beta_0 + \beta_1 x_{i1} + \dots + \beta_p x_{ip} + \varepsilon_i$$

donde $\varepsilon_i$ es un error aleatorio con media 0. Los $\beta$ son valores desconocidos de la población; los $\hat\beta$ que calcula MCO son sus estimaciones.

### Error estándar e intervalo de confianza

El **error estándar** (`std err` en la tabla) mide cuánto variaría $\hat\beta_j$ de una muestra a otra. Depende de tres cosas:

- el ruido del modelo (cuanto más dispersos los residuos, más incertidumbre);
- el tamaño de la muestra (más datos, menos incertidumbre, a ritmo $1/\sqrt n$);
- la variabilidad propia de $x_j$ y su correlación con las demás variables (la multicolinealidad infla el error estándar).

Con él construimos el **intervalo de confianza al 95 %**, aproximadamente $\hat\beta_j \pm 2 \cdot \text{EE}$. En el notebook, el IMC tiene $\hat\beta = 5{,}73$ con EE 0,85, e intervalo [4,06; 7,41]: estamos razonablemente seguros de que la asociación parcial es positiva y de un tamaño entre 4 y 7,4 puntos por punto de IMC.

### Estadístico t y p-valor

Para cada coeficiente, `statsmodels` contrasta la hipótesis nula $H_0: \beta_j = 0$ («la variable no aporta nada una vez incluidas las demás»):

$$t = \frac{\hat\beta_j}{\text{EE}(\hat\beta_j)}$$

El **p-valor** (`P>|t|`) es la probabilidad de observar un $|t|$ tan grande o más si $H_0$ fuera cierta. En nuestro modelo, IMC (p < 0,001), presión (p < 0,001), triglicéridos (p < 0,001) y sexo (p = 0,001) son claramente significativos; glucosa (p = 0,73), HDL (p = 0,62) o edad (p = 0,51) no.

Cómo **no** leer un p-valor:

- p = 0,3 **no** significa que la variable no influya. Puede que la muestra sea pequeña, que la variable esté correlacionada con otras (el HDL comparte información con `col_hdl`) o que su relación no sea lineal.
- p < 0,05 **no** significa que el efecto sea grande ni relevante: con muestras enormes, efectos minúsculos son significativos.
- p < 0,05 **no** significa que el efecto sea causal.
- Con 10 variables, mirar diez p-valores multiplica las posibilidades de un falso positivo (lo veremos en el módulo 04).

La tabla incluye también el **estadístico F** global, que contrasta si *todas* las pendientes son cero a la vez. Aquí su p-valor es del orden de $10^{-45}$: el modelo en conjunto explica claramente algo.

### R² y R² ajustado

El **coeficiente de determinación** compara los errores del modelo con los de predecir siempre la media:

$$R^2 = 1 - \frac{\sum_i (y_i - \hat y_i)^2}{\sum_i (y_i - \bar y)^2}$$

Se lee como «proporción de la variabilidad de $y$ explicada por el modelo». En el notebook, $R^2 = 0{,}52$ en entrenamiento.

Dos trampas:

1. **R² nunca baja al añadir variables**, aunque sean ruido. El **R² ajustado** penaliza el número de variables ($p$):
$$R^2_{aj} = 1 - (1 - R^2)\frac{n-1}{n-p-1}$$
Aquí vale 0,50.
2. **Un R² alto en entrenamiento no garantiza buenas predicciones** con datos nuevos. Esa pregunta la responde la validación (lección 3.6).

¿Es «bueno» un R² de 0,5? Depende del contexto. En procesos físicos controlados esperarías más de 0,9; en comportamiento humano o en medicina, 0,5 puede ser muy útil. La pregunta correcta es: **¿mejora la decisión frente a no tener modelo?**

### Intervalo de confianza vs. intervalo de predicción

Para un paciente con IMC 30, la regresión simple predice 189 puntos. Hay dos incertidumbres distintas:

- **Intervalo de confianza de la media**: dónde está la progresión *media* de todos los pacientes con IMC 30 (unos ±8 puntos).
- **Intervalo de predicción**: dónde caerá la progresión de *un paciente concreto*, que incluye además su variabilidad individual. Va de 66 a 312 puntos.

```python
simple.get_prediction(pd.DataFrame({"const": [1.0], "imc": [30.0]})).summary_frame()
```

Para decisiones sobre individuos, el que importa es el segundo, y suele ser sorprendentemente ancho.

### Ejemplo de negocio

Un banco relaciona el gasto mensual con tarjeta y la renta declarada. El coeficiente de «antigüedad del cliente» tiene p = 0,02, pero su valor es 0,40 € de gasto por año de antigüedad. Es *estadísticamente* significativo y *prácticamente* irrelevante. Antes de llevar un p-valor a un comité, tradúcelo a una magnitud de negocio con su intervalo.

> **Ideas clave**
> - El error estándar mide la incertidumbre de cada coeficiente; el intervalo de confianza al 95 % es aproximadamente $\hat\beta \pm 2\,\text{EE}$.
> - El p-valor contrasta si un coeficiente es distinto de 0 dado el resto del modelo; no mide importancia ni causalidad.
> - R² mide el ajuste en los datos usados; el R² ajustado penaliza variables, pero ninguno sustituye a la evaluación fuera de muestra.
> - El intervalo de predicción para un individuo es mucho más ancho que el intervalo de confianza de la media.
>
> Practica: notebook, sección 3 (`ols.summary()`).

---

## 3.4 Supuestos y diagnóstico de residuos

### ¿Para qué sirven los supuestos?

MCO siempre devuelve una recta. Que esa recta sea una buena descripción y que los errores estándar y p-valores sean fiables depende de unos supuestos. Conviene separar dos usos:

- Si solo quieres **predecir** y lo validas fuera de muestra, los supuestos importan menos: manda el error en test.
- Si quieres **explicar** (interpretar coeficientes, p-valores, intervalos), los supuestos son imprescindibles.

### Los cuatro supuestos (LINE)

Un recurso mnemotécnico útil es **LINE**:

| Supuesto | Qué significa | Qué pasa si falla |
|---|---|---|
| **L**inealidad | La media de $y$ es una función lineal de las $x$ | Coeficientes sesgados, predicciones sistemáticamente erróneas en algunas zonas |
| **I**ndependencia | Los errores de distintas observaciones no están relacionados | Errores estándar demasiado pequeños (falsa precisión) |
| **N**ormalidad | Los errores siguen una distribución normal | Afecta a intervalos y p-valores con muestras pequeñas; con muestras grandes importa poco |
| **E**qual variance (homocedasticidad) | La varianza del error es constante | Errores estándar incorrectos; intervalos de predicción mal calibrados |

La independencia suele ser una cuestión de **diseño**: datos con varias mediciones del mismo paciente, de la misma tienda o en el tiempo (módulo 08) la violan.

### Los residuos como lupa

No observamos los errores $\varepsilon_i$, pero sí sus estimaciones, los residuos $e_i = y_i - \hat y_i$. Si el modelo es adecuado, los residuos deberían parecer **ruido sin estructura**. Las dos gráficas de la sección 4 del notebook son las básicas:

**1. Residuos frente a valores ajustados.** Queremos una nube horizontal, centrada en 0 y de anchura constante. Patrones típicos:

```
  sin patrón (bien)      embudo (heterocedast.)      curva (no linealidad)
  .  . .  .  . .          .                 .  .      .                .
 ---.--.---.--.---       ---..---.-.--. . .  . .     --.--------------.--
  . .  . .  .  .          .  .   .  . .  .  .          . .  .  .  .  .
```

- Un **embudo** (residuos cada vez más dispersos) indica heterocedasticidad. Es muy común cuando $y$ son importes: los clientes grandes tienen errores grandes.
- Una **curva** indica que falta un término no lineal (un cuadrado, un logaritmo, una interacción).

**2. QQ-plot.** Compara los cuantiles de los residuos con los de una normal. Si los puntos siguen la diagonal, la normalidad es razonable. Colas que se separan indican residuos extremos más frecuentes de lo esperado.

En nuestro caso, los residuos no muestran ninguna curva y el QQ-plot es prácticamente recto; el contraste de Jarque-Bera que aparece al pie de la tabla de `statsmodels` (p = 0,38) no detecta falta de normalidad. Sí se aprecia que la dispersión es menor para las predicciones más bajas (desviación típica de los residuos ≈ 36 en el cuartil inferior de predicciones frente a ≈ 55–62 en el resto), en parte porque la progresión no puede bajar de 25 puntos. El test de Breusch-Pagan (`het_breuschpagan` en `statsmodels`) da p = 0,05, en el límite: nada grave, pero conviene mencionarlo y, si se quieren intervalos fiables, usar errores estándar robustos.

### Puntos influyentes

Además de los supuestos, revisa si unos pocos puntos condicionan el resultado. Una observación con un valor de $x$ muy extremo (**apalancamiento** alto) y un residuo grande puede «tirar» de la recta. La **distancia de Cook** combina ambas cosas. En `statsmodels`:

```python
infl = ols.get_influence()
cook = infl.cooks_distance[0]
pd.Series(cook, index=X_train.index).nlargest(5)
```

Ante un punto influyente, no lo borres sin más: averigua si es un error de datos (y corrígelo) o un caso real (y entonces informa de cuánto cambian las conclusiones con y sin él).

### Qué hacer si algo falla

| Síntoma | Remedios habituales |
|---|---|
| Curva en residuos | Añadir transformaciones ($\log x$, $x^2$), interacciones o pasar a modelos no lineales |
| Embudo | Transformar $y$ (logaritmo), usar errores estándar robustos (`fit(cov_type="HC3")`), mínimos cuadrados ponderados |
| Residuos dependientes | Modelos para datos agrupados o temporales; errores estándar por clústeres |
| Colas pesadas | Revisar valores atípicos; regresión robusta |

### Ejemplo de negocio

Una empresa de reparto modela el tiempo de entrega en función de la distancia. Los residuos frente a ajustados forman un embudo: en entregas largas el error es mucho mayor. Si promete al cliente «entrega ± 10 minutos» usando un error medio global, incumplirá sistemáticamente en las rutas largas. Modelar el logaritmo del tiempo, o dar intervalos que crezcan con la distancia, resuelve el problema y evita reclamaciones.

### Errores frecuentes

- Comprobar la normalidad de $y$ o de las $x$ en lugar de la de los **residuos**.
- Obsesionarse con la normalidad y olvidar la independencia, que suele ser más grave.
- Tratar los tests formales como veredicto: con muchos datos detectan desviaciones irrelevantes; con pocos, no detectan nada. Mira siempre las gráficas.
- Eliminar puntos «molestos» para mejorar el R².

> **Ideas clave**
> - Los supuestos LINE (linealidad, independencia, normalidad, varianza constante) importan sobre todo cuando quieres interpretar coeficientes y p-valores.
> - Los residuos deben parecer ruido: sin curva, sin embudo, con un QQ-plot aproximadamente recto.
> - Un embudo sugiere transformar $y$ o usar errores robustos; una curva, añadir términos no lineales.
> - Los puntos influyentes se investigan, no se borran a ciegas.
>
> Practica: notebook, sección 4.

---

## 3.5 Variables categóricas, interacciones y transformaciones

La regresión lineal es «lineal en los coeficientes», no necesariamente en las variables. Con tres trucos (variables indicadoras, interacciones y transformaciones) puede capturar relaciones mucho más ricas sin dejar de ser interpretable.

### Variables categóricas: variables indicadoras (dummies)

Una variable como «región» (Norte, Centro, Sur) no se puede meter tal cual. Se codifica con **variables indicadoras** 0/1, una por categoría **menos una**, que actúa como **categoría de referencia**:

| región | Centro | Sur |
|---|---|---|
| Norte | 0 | 0 |
| Centro | 1 | 0 |
| Sur | 0 | 1 |

El coeficiente de «Sur» es la diferencia media entre Sur y Norte (la referencia), manteniendo el resto constante. ¿Por qué no incluir también una columna para Norte? Porque sería redundante con el intercepto: es la **trampa de las variables ficticias** (multicolinealidad perfecta). `pd.get_dummies(..., drop_first=True)` o la fórmula `C(region)` en `statsmodels` lo hacen por ti.

En nuestro caso, el sexo ya es una indicadora 0/1. Su coeficiente (−23,1) significa que, con las demás variables iguales, los pacientes del grupo codificado como 1 tienen una progresión esperada 23 puntos menor que los del grupo 0.

### Interacciones: cuando el efecto depende de otra variable

El modelo aditivo supone que la asociación del IMC con la progresión es la misma a cualquier edad. Si sospechamos lo contrario, añadimos el **producto** de ambas:

$$\hat y = \beta_0 + \beta_1\,\text{imc} + \beta_2\,\text{edad} + \beta_3\,(\text{imc}\times\text{edad}) + \dots$$

Ahora la pendiente del IMC ya no es un número fijo, sino $\beta_1 + \beta_3\cdot\text{edad}$. El coeficiente $\beta_3$ mide cuánto cambia la pendiente del IMC por cada año adicional de edad.

Dos consejos prácticos:

1. **Centra las variables** antes de multiplicarlas ($\text{imc} - \overline{\text{imc}}$). Sin centrar, $\beta_1$ pasa a ser la pendiente del IMC para *edad 0*, algo sin sentido, y su error estándar se dispara. Centradas, $\beta_1$ es la pendiente en la edad media.
2. **Si incluyes una interacción, incluye también sus efectos principales** (las dos variables por separado).

El ejercicio 2 del notebook lo pone en práctica: la interacción IMC × edad resulta pequeña (0,05) y no significativa (p = 0,36). No hay evidencia de que la relación del IMC dependa de la edad en esta muestra (lo que no prueba que no exista: detectar interacciones requiere bastantes datos).

En negocio las interacciones son muy frecuentes: el efecto de un descuento puede depender del canal, el de la publicidad de la temporada, el de la formación de la antigüedad del empleado.

### Transformaciones

**Logaritmos.** Muy útiles cuando una variable es asimétrica (rentas, precios, ventas) o cuando los efectos son proporcionales. Las interpretaciones cambian:

| Modelo | Interpretación aproximada de $\beta_1$ |
|---|---|
| $y \sim x$ | +1 unidad de $x$ → $+\beta_1$ unidades de $y$ |
| $y \sim \log x$ | +1 % en $x$ → $+\beta_1/100$ unidades de $y$ |
| $\log y \sim x$ | +1 unidad de $x$ → $\approx +100\,\beta_1$ % en $y$ |
| $\log y \sim \log x$ | +1 % en $x$ → $+\beta_1$ % en $y$ (elasticidad) |

Un detalle de nuestros datos: la variable `trigliceridos` (s5 en el conjunto original) **ya está en escala logarítmica** (valores entre 3,3 y 6,1). Por eso su coeficiente (63,4) es tan grande: un aumento de 1 en el logaritmo equivale a multiplicar los triglicéridos por 2,7. Una lectura más útil: un 10 % más de triglicéridos ($\log 1{,}1 \approx 0{,}095$) se asocia con unos $63{,}4 \times 0{,}095 \approx 6$ puntos más de progresión.

**Polinomios.** Añadir $x^2$ permite capturar curvas (por ejemplo, rendimientos decrecientes de la inversión en publicidad). El notebook prueba un modelo con *todos* los cuadrados e interacciones de grado 2 (65 términos): es un caso perfecto para ver el sobreajuste de la lección siguiente.

### Ejemplo de negocio

Un e-commerce modela el importe del pedido: $\log(\text{importe}) = \beta_0 + \beta_1\,\text{móvil} + \beta_2\,\text{cupón} + \beta_3\,(\text{móvil}\times\text{cupón})$. Si $\beta_1 = -0{,}15$, los pedidos desde el móvil son en torno a un 14 % menores ($e^{-0{,}15}-1$). Si $\beta_3 = 0{,}10$, el cupón funciona *mejor* en el móvil que en escritorio. Esto sugiere priorizar cupones en la app... y validarlo con un test A/B antes de generalizar, porque quien usa cupones en el móvil puede ser un cliente distinto.

### Errores frecuentes

- Meter una variable categórica codificada como 1, 2, 3 como si fuera numérica.
- Incluir todas las categorías y el intercepto (trampa de las dummies).
- Interpretar los efectos principales de un modelo con interacción como si no la hubiera.
- Olvidar deshacer la transformación al comunicar (decir «0,15» en lugar de «≈ 14 %»).

> **Ideas clave**
> - Las categóricas se codifican con $k-1$ indicadoras; cada coeficiente es una diferencia frente a la categoría de referencia.
> - Una interacción permite que la pendiente de una variable dependa de otra; centra las variables para interpretarlas.
> - Los logaritmos convierten efectos absolutos en porcentuales y suelen arreglar asimetrías y embudos.
> - La regresión sigue siendo lineal en los coeficientes, aunque las variables estén transformadas.
>
> Practica: notebook, ejercicio 2.

---

## 3.6 Sobreajuste, train/test y validación cruzada

### Explicar no es predecir

Hasta ahora hemos mirado el modelo con los mismos datos con que lo ajustamos. Eso sirve para **explicar**, pero el hospital quiere usar el modelo con **pacientes nuevos**. Y aquí aparece un problema: cuanto más flexible es un modelo, mejor se ajusta a los datos que ha visto... incluido su ruido.

El **sobreajuste** (*overfitting*) ocurre cuando el modelo memoriza peculiaridades de la muestra que no se repiten en datos nuevos. El **infraajuste** (*underfitting*) es lo contrario: un modelo demasiado simple que no capta ni la señal.

### El equilibrio sesgo-varianza

El error esperado de un modelo con datos nuevos se puede descomponer en:

$$\text{Error} = \text{Sesgo}^2 + \text{Varianza} + \text{Ruido irreducible}$$

- **Sesgo**: error por simplificar demasiado (una recta para una curva).
- **Varianza**: cuánto cambiaría el modelo si lo entrenáramos con otra muestra. Los modelos con muchos parámetros y pocos datos tienen mucha varianza.
- **Ruido irreducible**: lo que ningún modelo puede predecir con las variables disponibles.

Al aumentar la complejidad, el sesgo baja y la varianza sube. El objetivo es el punto intermedio.

### Partición train/test

La solución más simple: separar los datos antes de nada.

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
```

Se ajusta el modelo con *train* (331 pacientes) y se evalúa con *test* (111), que el modelo nunca ha visto. La regla de oro: **el test se usa una vez, al final**. Si lo usas para elegir variables o hiperparámetros, deja de ser una estimación honesta.

### Validación cruzada

Una sola partición tiene dos problemas: desperdicia datos y su resultado depende de la suerte del reparto (con 111 pacientes, unas decenas «fáciles» o «difíciles» mueven la métrica). La **validación cruzada con $k$ particiones** (*k-fold*) lo mejora:

1. Divide *train* en $k$ bloques (típicamente 5 o 10).
2. Entrena con $k-1$ bloques y evalúa en el restante.
3. Repite $k$ veces, rotando el bloque de validación, y promedia.

```
Iteración 1: [VAL][ T ][ T ][ T ][ T ]
Iteración 2: [ T ][VAL][ T ][ T ][ T ]
   ...
Iteración 5: [ T ][ T ][ T ][ T ][VAL]
```

En `scikit-learn`, `cross_val_score(modelo, X_train, y_train, cv=KFold(5, shuffle=True, random_state=0))`. La validación cruzada se usa para **elegir** (modelo, variables, hiperparámetros); el test, para **confirmar**.

Un detalle importante: cualquier paso de preparación que «aprenda» de los datos (escalar, seleccionar variables, imputar) debe ir **dentro** de cada iteración. Por eso el notebook usa `make_pipeline(StandardScaler(), ...)`: el escalado se ajusta solo con los bloques de entrenamiento de cada iteración. Si escalas todo antes, se filtra información de validación (*data leakage*).

### El caso del notebook

La sección 5 compara cuatro modelos:

| Modelo | R² CV (train) | R² test | MAE test |
|---|---|---|---|
| Lineal | 0,480 | 0,485 | 41,5 |
| Polinómica grado 2 | 0,166 | 0,424 | 44,0 |
| Polinómica + Ridge | 0,428 | 0,500 | 42,2 |
| Lasso | 0,480 | 0,487 | 41,5 |

La polinómica sin regularizar alcanza $R^2 = 0{,}60$ en entrenamiento, pero solo 0,17 en validación cruzada: con 65 coeficientes para 331 pacientes, **sobreajusta**. Es el patrón clásico: gran distancia entre error de entrenamiento y de validación.

### Métricas para regresión

- **MAE** (error absoluto medio): $\frac{1}{n}\sum|y_i-\hat y_i|$. En las unidades de $y$, fácil de comunicar: «nos equivocamos en 41 puntos de media».
- **RMSE** (raíz del error cuadrático medio): penaliza más los errores grandes.
- **R²** fuera de muestra: proporción de variabilidad explicada en datos nuevos (puede ser negativo si el modelo es peor que la media).

### Siempre contra una referencia ingenua

¿Un MAE de 41 es bueno? Solo tiene sentido comparado. La sección 6 compara con la alternativa más tonta posible: predecir siempre la media de entrenamiento. Su MAE es **65,5**. El modelo reduce el error un 37 %. Esa es la cifra que entiende la dirección médica.

Y el ejercicio 4 lo lleva a la decisión real: si solo se puede seguir al 20 % de los pacientes, el modelo identifica el 68 % de los que de verdad tendrán mayor progresión, frente al 20 % de elegir al azar.

### Ejemplo de negocio

Un equipo de *pricing* presume de un modelo de demanda con $R^2 = 0{,}97$. Al ponerlo en producción, las previsiones fallan más que la simple media móvil que usaban antes. Lo habían evaluado con los mismos datos de ajuste y con 200 variables para 300 semanas. Con validación (temporal, en este caso: módulo 08) lo habrían detectado antes de desplegar.

### Errores frecuentes

- Reportar el error de entrenamiento como si fuera el esperado en producción.
- Usar el test para ajustar decisiones y luego reportarlo como estimación honesta.
- Escalar o seleccionar variables con todos los datos antes de partir (fuga de información).
- Barajar datos temporales en la validación cruzada.

> **Ideas clave**
> - Un modelo se juzga por su error con datos que no ha visto, no por su ajuste.
> - Sobreajuste = gran distancia entre error de entrenamiento y de validación; suele venir de demasiada complejidad para los datos disponibles.
> - La validación cruzada sirve para elegir; el test, para confirmar una sola vez.
> - Compara siempre con una referencia ingenua y traduce la mejora a la decisión de negocio.
>
> Practica: notebook, secciones 5 y 6; ejercicios 1 y 4.

---

## 3.7 Regularización: Ridge y Lasso

### La idea: penalizar la complejidad

Si el problema del sobreajuste son coeficientes demasiado libres, una solución es **ponerles un precio**. La regularización modifica el criterio de mínimos cuadrados añadiendo una penalización por el tamaño de los coeficientes:

$$\min_\beta \; \underbrace{\sum_i (y_i - \hat y_i)^2}_{\text{ajuste}} \; + \; \underbrace{\alpha \cdot \text{Penalización}(\beta)}_{\text{complejidad}}$$

El hiperparámetro $\alpha$ (en `scikit-learn`; en ISLP se llama $\lambda$) controla el equilibrio:

- $\alpha = 0$: MCO de toda la vida.
- $\alpha$ pequeño: poca penalización, riesgo de sobreajuste.
- $\alpha$ grande: coeficientes muy encogidos hacia 0, riesgo de infraajuste (en el límite, se predice la media).

A cambio de introducir un poco de sesgo, se reduce mucho la varianza. Es una aplicación directa del equilibrio sesgo-varianza.

### Ridge (penalización L2)

$$\text{Penalización}_{\text{Ridge}} = \sum_{j=1}^{p} \beta_j^2$$

Ridge **encoge** todos los coeficientes hacia 0, pero casi nunca los anula. Funciona especialmente bien con multicolinealidad: en lugar de dar +40 a una variable y −38 a su «gemela», reparte el peso entre ambas de forma estable. En el notebook, Ridge sobre el modelo polinómico de 65 términos recupera el rendimiento: el R² de validación cruzada pasa de 0,17 a 0,43, y en test de 0,42 a 0,50.

### Lasso (penalización L1)

$$\text{Penalización}_{\text{Lasso}} = \sum_{j=1}^{p} |\beta_j|$$

El cambio parece menor, pero tiene una consecuencia importante: Lasso puede poner coeficientes **exactamente a cero**. Es decir, **selecciona variables**. Intuición geométrica: la región permitida por L1 es un rombo con esquinas sobre los ejes, y la solución óptima tiende a caer en una esquina, donde algún coeficiente vale 0. La región de L2 es un círculo, sin esquinas.

En el notebook, `LassoCV` elige $\alpha \approx 0{,}11$ y descarta el HDL, mantiene las demás y logra un MAE en test de 41,5, igual que el modelo lineal pero con una variable menos. Con un $\alpha$ mayor descartaría más.

| | Ridge (L2) | Lasso (L1) |
|---|---|---|
| Coeficientes | Encoge todos, ninguno a 0 | Encoge y anula algunos |
| Selección de variables | No | Sí |
| Con variables muy correlacionadas | Reparte el peso entre ellas | Tiende a quedarse con una (de forma algo arbitraria) |
| Cuándo brilla | Muchas variables con efectos pequeños | Pocas variables relevantes entre muchas |

**Elastic Net** combina ambas penalizaciones y es un buen término medio cuando hay grupos de variables correlacionadas.

### Estandarizar es obligatorio

La penalización suma coeficientes de distintas variables. Pero el tamaño de un coeficiente depende de las unidades: el de la edad sería 12 veces menor si la midiéramos en meses en lugar de años... y se penalizaría de forma muy distinta sin que el modelo haya cambiado. Para que la penalización sea justa, **todas las variables deben estar en la misma escala**. Por eso el notebook siempre usa `make_pipeline(StandardScaler(), ...)`.

### Elegir α con validación cruzada

$\alpha$ no se estima con los datos de ajuste (siempre preferirían $\alpha = 0$): se elige por validación cruzada. `RidgeCV` y `LassoCV` prueban una rejilla de valores y se quedan con el de menor error de validación:

```python
modelo = make_pipeline(StandardScaler(), LassoCV(cv=5, random_state=0)).fit(X_train, y_train)
modelo[-1].alpha_                      # α elegido
pd.Series(modelo[-1].coef_, X.columns) # coeficientes (escala estandarizada)
```

El ejercicio 3 dibuja el error frente a $\alpha$ para la polinómica + Ridge. Verás una curva en forma de U: a la izquierda (α pequeño) el error de entrenamiento es mínimo pero el de validación es alto (sobreajuste); a la derecha (α muy grande) ambos suben juntos hacia el error de predecir la media (infraajuste); el óptimo queda en medio (α ≈ 35 en la validación cruzada).

### Interpretación: con cuidado

Los coeficientes regularizados están **sesgados hacia 0** a propósito, y Lasso elige entre variables correlacionadas de forma inestable (si repites con otra muestra, puede quedarse con otra). Por tanto:

- Los modelos regularizados son excelentes para **predecir**.
- Para **explicar**, úsalos como guía de qué variables importan, no para leer magnitudes exactas, y no calcules p-valores clásicos sobre el modelo seleccionado.
- Y, como siempre, una variable que Lasso conserva no es una causa; una que descarta puede ser relevante pero redundante con otra.

### Ejemplo de negocio

Un retailer quiere prever las ventas semanales de 2.000 tiendas con 300 variables (demografía, competencia, clima, promociones...). Con MCO, muchos coeficientes salen enormes y absurdos. Con Lasso, el modelo se queda con 25 variables, predice mejor en validación y, de paso, da al equipo de expansión una lista corta de factores en los que fijarse al evaluar nuevas ubicaciones. Para decidir *dónde abrir*, sin embargo, convendrá contrastar esos factores con otros análisis: que una variable prediga bien las ventas no implica que cambiarla las aumente.

### Errores frecuentes

- No estandarizar antes de regularizar.
- Elegir α mirando el test.
- Comparar coeficientes de Lasso con los de MCO como si midieran lo mismo.
- Pensar que la regularización arregla la falta de variables relevantes o la causalidad.

> **Ideas clave**
> - La regularización añade al criterio de mínimos cuadrados un precio por el tamaño de los coeficientes, controlado por α.
> - Ridge (L2) encoge todos los coeficientes; Lasso (L1) además anula algunos y selecciona variables.
> - Estandariza siempre y elige α por validación cruzada.
> - Los modelos regularizados son para predecir; su interpretación es orientativa y nunca causal.
>
> Practica: notebook, sección 5 y ejercicio 3.

---

## Glosario

| Término | Definición breve |
|---|---|
| **Coeficiente de determinación, R²** (*coefficient of determination*) | Proporción de la variabilidad de $y$ explicada por el modelo frente a predecir la media. |
| **R² ajustado** (*adjusted R²*) | Versión de R² que penaliza el número de variables. |
| **Coeficiente parcial** (*partial regression coefficient*) | Asociación de una variable con $y$ manteniendo fijas las demás variables del modelo. |
| **Distancia de Cook** (*Cook's distance*) | Medida de cuánto cambiaría el ajuste si se eliminara una observación. |
| **Error estándar** (*standard error*) | Desviación típica de la distribución muestral de un estimador; mide su incertidumbre. |
| **Factor de confusión** (*confounder*) | Variable que influye a la vez en $x$ y en $y$ y distorsiona su relación aparente. |
| **Fuga de información** (*data leakage*) | Uso, durante el entrenamiento, de información de los datos de validación o test. |
| **Heterocedasticidad** (*heteroscedasticity*) | Varianza de los errores que cambia con el nivel de las variables o de la predicción. |
| **Hiperparámetro** (*hyperparameter*) | Parámetro que no se aprende con el ajuste, sino que se fija o elige por validación (p. ej., α). |
| **Interacción** (*interaction term*) | Producto de dos variables que permite que el efecto de una dependa del valor de la otra. |
| **Intervalo de predicción** (*prediction interval*) | Rango probable para el valor de un caso individual nuevo, más ancho que el intervalo de confianza de la media. |
| **Lasso** (*Lasso, L1 regularization*) | Regresión penalizada por la suma de valores absolutos de los coeficientes; puede anularlos. |
| **Mínimos cuadrados ordinarios, MCO** (*ordinary least squares, OLS*) | Método que estima los coeficientes minimizando la suma de residuos al cuadrado. |
| **Multicolinealidad** (*multicollinearity*) | Correlación elevada entre variables explicativas que vuelve inestables sus coeficientes. |
| **Residuo** (*residual*) | Diferencia entre el valor observado y el predicho por el modelo. |
| **Ridge** (*Ridge, L2 regularization*) | Regresión penalizada por la suma de cuadrados de los coeficientes; los encoge sin anularlos. |
| **Sobreajuste** (*overfitting*) | Modelo que se ajusta al ruido de la muestra y generaliza mal a datos nuevos. |
| **Validación cruzada** (*cross-validation*) | Técnica que rota los datos de entrenamiento y validación para estimar el error fuera de muestra. |
| **Variable indicadora** (*dummy variable*) | Variable 0/1 que representa la pertenencia a una categoría. |
| **VIF** (*variance inflation factor*) | Factor en que la multicolinealidad multiplica la varianza de un coeficiente. |
