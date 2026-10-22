# Módulo 01 · Estadística para la toma de decisiones — Apuntes

Casi todas las decisiones de negocio se toman con información incompleta: no ves a todos tus clientes, no observas todos los pedidos y el futuro todavía no ha ocurrido. La estadística es la disciplina que te permite decir **qué sabes, cuánto lo sabes y con qué margen de error**. En este módulo trabajamos con un caso que recorre todo el notebook: una app de reparto quiere conocer el **importe medio de sus pedidos** y saber cuánto puede fiarse de esa cifra.

Estos apuntes acompañan a los vídeos y al notebook (`notebook.ipynb`). Cada sección corresponde a una lección y termina con un cuadro de ideas clave. Las cifras que aparecen (media real de 27,79 €, muestra de 200 pedidos, etc.) son las que obtendrás al ejecutar el notebook con su semilla.

## Índice

- [1.1 Población, muestra y por qué la incertidumbre importa en los negocios](#11-población-muestra-y-por-qué-la-incertidumbre-importa-en-los-negocios)
- [1.2 Variables aleatorias y distribuciones (binomial, Poisson, normal, exponencial, log-normal)](#12-variables-aleatorias-y-distribuciones-binomial-poisson-normal-exponencial-log-normal)
- [1.3 Ley de los grandes números y teorema central del límite](#13-ley-de-los-grandes-números-y-teorema-central-del-límite)
- [1.4 Estimación y error estándar](#14-estimación-y-error-estándar)
- [1.5 Intervalos de confianza: construcción e interpretación](#15-intervalos-de-confianza-construcción-e-interpretación)
- [1.6 Bootstrap: incertidumbre para cualquier métrica](#16-bootstrap-incertidumbre-para-cualquier-métrica)
- [1.7 Correlación, causalidad y paradoja de Simpson](#17-correlación-causalidad-y-paradoja-de-simpson)
- [Glosario](#glosario)

---

## 1.1 Población, muestra y por qué la incertidumbre importa en los negocios

### La pregunta que siempre llega

Imagina que el director comercial de la app te pregunta: «¿Cuál es el importe medio de un pedido?». Tienes acceso a una muestra de 200 pedidos, calculas la media y te sale 28,08 €. ¿Respondes «28,08 €» y ya está? Si mañana otro analista toma otros 200 pedidos, obtendrá otra cifra: quizá 27,10 €, quizá 29,40 €. Ninguno de los dos se ha equivocado al calcular; simplemente, **cada muestra cuenta una versión ligeramente distinta de la realidad**. La pregunta útil no es solo «¿cuánto es?», sino «¿cuánto es y cuánto podemos fiarnos?».

### Población y muestra

La **población** es el conjunto completo sobre el que quieres sacar conclusiones: todos los pedidos de la app (los de este año, o los que se harán en las condiciones actuales). La **muestra** es la parte que realmente observas. En el notebook simulamos una población de un millón de pedidos precisamente para poder hacer algo que en la vida real es imposible: comparar nuestras estimaciones con la verdad.

Conviene distinguir dos tipos de números:

| | Describe… | Notación habitual | Ejemplo |
|---|---|---|---|
| **Parámetro** | la población (fijo, desconocido) | $\mu$ (media), $\sigma$ (desviación típica), $p$ (proporción) | media real de todos los pedidos: 27,79 € |
| **Estadístico** | la muestra (varía de muestra en muestra) | $\bar x$, $s$, $\hat p$ | media de nuestros 200 pedidos: 28,08 € |

El parámetro es una constante que no conocemos; el estadístico es una cantidad que sí calculamos pero que **cambiaría si repitiéramos el muestreo**. Toda la inferencia estadística consiste en usar estadísticos para decir algo responsable sobre parámetros.

### ¿Por qué no medir toda la población?

A veces se puede (tienes todos los pedidos en la base de datos) y, aun así, la incertidumbre no desaparece:

- **Coste o tiempo**: encuestar a todos los clientes, auditar todas las facturas o inspeccionar todas las piezas es caro.
- **Destrucción**: no puedes probar la resistencia de todas las baterías si la prueba las rompe.
- **El futuro**: aunque tengas todos los pedidos de 2025, lo que te interesa es el comportamiento de los pedidos de 2026. Los datos históricos son una muestra de un proceso que sigue funcionando.
- **Experimentos**: si pruebas una nueva interfaz con el 10 % de los usuarios, ese 10 % es una muestra de lo que pasaría con todos.

### Variabilidad muestral frente a sesgo

Hay dos fuentes de error muy distintas:

1. **Variabilidad muestral (error aleatorio)**: aunque la muestra se tome bien, por puro azar no coincide con la población. Este error **se reduce aumentando el tamaño de la muestra** y, sobre todo, **se puede cuantificar** (lo haremos con el error estándar y los intervalos de confianza).
2. **Sesgo (error sistemático)**: la muestra no representa a la población. Si solo miras pedidos de viernes noche, sobreestimarás el ticket medio; si encuestas solo a quien responde voluntariamente, oirás sobre todo a los muy satisfechos y a los muy enfadados. El sesgo **no se reduce con más datos**: un millón de pedidos de viernes noche siguen siendo de viernes noche.

La herramienta más potente contra el sesgo es el **muestreo aleatorio**: cada unidad de la población tiene una probabilidad conocida de entrar en la muestra. En el notebook lo hacemos con `rng.choice(poblacion, 200)`. En la práctica, también son útiles el muestreo estratificado (por ciudad, por franja horaria) y, para comparar alternativas, la asignación aleatoria (módulo 04).

### Por qué importa en los negocios

La incertidumbre no es un tecnicismo, es dinero:

- **Fijar un pedido mínimo** a partir de un ticket medio mal estimado puede dejar fuera a muchos clientes.
- **Declarar ganadora una campaña** porque su conversión fue 0,3 puntos mayor en una muestra pequeña es apostar sobre ruido.
- **Dimensionar la flota** con la media de pedidos por hora sin pensar en la variabilidad produce horas punta sin repartidores.

Una cifra sin su margen de error invita a tomar decisiones con más confianza de la que los datos justifican. Por eso, en este curso, **toda estimación irá acompañada de su incertidumbre**.

### Errores frecuentes

- Confundir «tengo muchos datos» con «tengo buenos datos». Un volumen enorme con sesgo de selección da respuestas precisas… a la pregunta equivocada.
- Tratar la media muestral como si fuera el parámetro («el ticket medio **es** 28,08 €»).
- Olvidar definir la población: ¿todos los pedidos, solo los de usuarios nuevos, solo los de Madrid? La respuesta cambia según la población.

> **Ideas clave**
> - La **población** es lo que te interesa; la **muestra**, lo que observas. Los **parámetros** son fijos y desconocidos; los **estadísticos** varían de muestra en muestra.
> - El error aleatorio se reduce con más datos y se puede cuantificar; el **sesgo** no se reduce con más datos.
> - El muestreo (y la asignación) aleatorio es la principal defensa contra el sesgo.
> - Toda cifra relevante para decidir debe ir acompañada de su margen de error.
>
> Practica: notebook, sección 2 («La población de pedidos»).

---

## 1.2 Variables aleatorias y distribuciones (binomial, Poisson, normal, exponencial, log-normal)

### Qué es una variable aleatoria

Una **variable aleatoria** es una forma de asignar un número a cada resultado de un proceso con incertidumbre: el importe del próximo pedido, el número de pedidos entre las 21:00 y las 22:00, si un visitante compra (1) o no (0). No sabemos qué valor tomará, pero sí podemos describir **qué valores son posibles y con qué probabilidad**. Esa descripción es su **distribución**.

Distinguimos dos tipos:

- **Discretas**: toman valores contables (0, 1, 2…). Se describen con una función de probabilidad $P(X = k)$.
- **Continuas**: toman cualquier valor en un intervalo (un importe, un tiempo). Se describen con una función de densidad: la probabilidad está en el **área** bajo la curva, no en la altura de un punto.

Dos resúmenes aparecen en todas: la **esperanza** o media $E[X] = \mu$ (el valor alrededor del cual se equilibran los resultados a la larga) y la **varianza** $\text{Var}(X) = \sigma^2$ (cuánto se dispersan). La **desviación típica** $\sigma$ es la raíz de la varianza y está en las mismas unidades que los datos.

### Cinco distribuciones que verás constantemente

**Bernoulli y binomial: éxitos en *n* intentos.** Un visitante compra o no compra: es una Bernoulli con probabilidad $p$. Si tienes $n$ visitantes independientes con la misma $p$, el número de compras sigue una **binomial**:
$$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}, \qquad E[X] = np, \qquad \text{Var}(X) = np(1-p).$$
Ejemplo: una campaña de email llega a 20 personas con una tasa de conversión del 10 %; esperamos 2 compras, pero 0 o 5 no serían raros. Es la distribución detrás de cualquier tasa de conversión, de clics o de abandono.

**Poisson: conteos por intervalo.** Pedidos por hora, incidencias por día, llamadas por minuto. Si los sucesos ocurren de forma independiente a un ritmo medio constante $\lambda$:
$$P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}, \qquad E[X] = \text{Var}(X) = \lambda.$$
Su rasgo distintivo es que **la media y la varianza coinciden**. Si en tus datos la varianza es mucho mayor que la media (sobredispersión), hay algo más: picos de demanda, días festivos, clientes que piden en grupo.

**Normal: la suma de muchos efectos pequeños.** La campana de Gauss, con parámetros $\mu$ y $\sigma$. Aparece cuando un resultado es la suma de muchas influencias pequeñas e independientes (errores de medida, por ejemplo) y, sobre todo, como distribución de las **medias muestrales** (lección 1.3). Regla práctica: aproximadamente el 68 %, 95 % y 99,7 % de los valores caen a 1, 2 y 3 desviaciones típicas de la media.

**Exponencial: tiempos de espera.** Minutos hasta el siguiente pedido, tiempo hasta que falla una máquina. Si los sucesos llegan según un proceso de Poisson de ritmo $\lambda$, el tiempo entre ellos es exponencial con media $1/\lambda$. Es muy asimétrica: la mayoría de esperas son cortas, unas pocas son largas. Tiene «falta de memoria»: si ya llevas 10 minutos sin pedidos, el tiempo que falta no depende de esos 10 minutos.

**Log-normal: cantidades positivas y asimétricas.** Importes de pedidos, salarios, precios de vivienda, duración de sesiones. Una variable es log-normal si su logaritmo es normal. Surge cuando los efectos se **multiplican** en lugar de sumarse (un cliente pide más platos *y* platos más caros *y* añade bebida). Su cola derecha larga hace que **la media sea mayor que la mediana**. En el notebook, con `lognormal(mean=3.2, sigma=0.5)`, la mediana es $e^{3{,}2} \approx 24{,}5$ € y la media $e^{3{,}2 + 0{,}5^2/2} \approx 27{,}8$ €: unos pocos pedidos grandes tiran de la media hacia arriba.

### Cómo trabajar con ellas en Python

`scipy.stats` ofrece todas con la misma interfaz (`pmf`/`pdf`, `cdf`, `ppf`, `rvs`):

```python
from scipy import stats
stats.binom(n=20, p=0.1).pmf(0)        # P(0 compras de 20) ≈ 0,12
stats.poisson(mu=4).sf(7)              # P(más de 7 pedidos en una hora) ≈ 0,05
stats.expon(scale=5).cdf(2)            # P(esperar menos de 2 min) ≈ 0,33
```

La pregunta de negocio se traduce casi siempre a una de estas operaciones: «¿qué probabilidad hay de que…?» (`cdf`/`sf`) o «¿qué valor no se supera el 95 % de las veces?» (`ppf`, un percentil).

### Cómo elegir una distribución

No se trata de acertar el modelo «verdadero», sino de elegir uno **razonable y útil**. Pregúntate: ¿la variable es un conteo, una proporción, un tiempo, una cantidad positiva? ¿Es simétrica o asimétrica? ¿Tiene límite inferior? Después, compara con los datos: un histograma frente a la curva teórica y un gráfico de cuantiles (Q-Q) suelen bastar para ver si el modelo encaja.

### Errores frecuentes

- **Suponer normalidad por defecto.** Importes, tiempos y conteos casi nunca son normales. Usar «media ± 2 desviaciones típicas» en datos log-normales da límites inferiores negativos absurdos.
- **Resumir datos asimétricos solo con la media.** Para el «pedido típico», la mediana suele ser más representativa; la media sigue siendo clave para la facturación total (total = media × número de pedidos).
- **Usar Poisson cuando hay sobredispersión** o binomial cuando los intentos no son independientes (por ejemplo, el mismo usuario contado varias veces).

> **Ideas clave**
> - Una distribución describe qué valores puede tomar una variable aleatoria y con qué probabilidad.
> - Binomial → éxitos en $n$ intentos; Poisson → conteos por intervalo; normal → sumas y medias; exponencial → esperas; log-normal → cantidades positivas asimétricas.
> - En distribuciones con cola a la derecha (como los importes), la media supera a la mediana.
> - Elige el modelo por la naturaleza de la variable y compruébalo contra los datos.
>
> Practica: notebook, sección 1 («Distribuciones que verás constantemente»).

---

## 1.3 Ley de los grandes números y teorema central del límite

Estas dos ideas son los cimientos de todo lo que viene después. La primera dice que **las medias se estabilizan**; la segunda, **cómo se distribuyen los errores** alrededor del valor real.

### Ley de los grandes números (LGN)

Si tomas observaciones independientes de una misma distribución con media $\mu$, la media muestral
$$\bar x_n = \frac{1}{n}\sum_{i=1}^{n} x_i$$
se acerca a $\mu$ a medida que $n$ crece. En el notebook (sección 3) vas sumando pedidos uno a uno: con los primeros 10 la media salta de un lado a otro; con 1 000 ya oscila poco; con 5 000 está pegada a la línea de la media real (27,79 €).

La LGN es la razón por la que las aseguradoras pueden fijar primas, los casinos ganan dinero de forma fiable y una cadena de restaurantes puede prever su facturación mensual aunque cada cliente sea impredecible. **Lo individual es incierto; lo agregado es estable.**

Dos matices importantes:

- La LGN habla del **largo plazo**, no de compensaciones a corto plazo. Si una campaña ha tenido tres días malos, no «le toca» uno bueno. Creer lo contrario es la **falacia del jugador**.
- La LGN dice *que* la media converge, pero no *a qué velocidad*. Para eso necesitamos el siguiente resultado.

### Teorema central del límite (TCL)

Ahora imagina que repites muchas veces el experimento «toma $n$ pedidos y calcula su media». Obtendrás muchas medias distintas; su distribución se llama **distribución muestral de la media**. El TCL afirma que, si las observaciones son independientes y tienen varianza finita $\sigma^2$, para $n$ suficientemente grande:
$$\bar x \;\approx\; \mathcal{N}\!\left(\mu,\; \frac{\sigma^2}{n}\right), \qquad \text{es decir,}\qquad \text{desv. típica de } \bar x = \frac{\sigma}{\sqrt n}.$$

Lo sorprendente es que esto ocurre **sea cual sea la forma de la distribución original**. Los importes de los pedidos son log-normales, con cola a la derecha, y sin embargo las medias de 100 pedidos forman una campana casi perfecta. En la sección 4 del notebook lo ves con $n = 2$, $10$ y $100$:

| $n$ | Forma de la distribución de $\bar x$ | $\sigma/\sqrt n$ (con $\sigma \approx 14{,}8$ €) |
|---|---|---|
| 2 | todavía claramente asimétrica | ≈ 10,5 € |
| 10 | casi simétrica, algo de cola | ≈ 4,7 € |
| 100 | prácticamente normal | ≈ 1,5 € |

La cantidad $\sigma/\sqrt n$ tiene nombre propio: es el **error estándar** de la media, protagonista de la lección siguiente.

### Por qué funciona (intuición)

Al promediar, los pedidos grandes y pequeños se compensan entre sí. Para que una media de 100 pedidos sea extrema, haría falta que muchos de ellos fueran extremos *a la vez*, y eso es muy improbable. Las combinaciones «intermedias» son abrumadoramente más numerosas, y eso esculpe la campana. Además, la dispersión se reduce con $\sqrt n$, no con $n$: para reducir el error a la mitad necesitas **cuatro veces** más datos.

### Para qué sirve en la práctica

El TCL es lo que nos permite:

- Construir intervalos de confianza para medias con la normal o la $t$ de Student (lección 1.5), **sin conocer la distribución de los datos**.
- Analizar pruebas A/B sobre tasas de conversión o ingresos medios (módulo 04).
- Calcular tamaños de muestra antes de recoger datos.

Ejemplo de negocio: una cadena de supermercados sabe que el gasto por cliente tiene media 42 € y desviación típica 30 €. ¿Qué probabilidad hay de que la media de los 400 clientes de una tienda en un día baje de 39 €? Con el TCL, $\bar x \approx \mathcal N(42,\ 30/\sqrt{400} = 1{,}5)$, así que 39 € está a 2 errores estándar por debajo: probabilidad ≈ 2,3 %. Si ocurre, merece la pena investigar.

### Límites del TCL

- **«Suficientemente grande» depende de la asimetría.** Con datos casi simétricos, $n = 15$–$20$ basta; con colas muy largas (ingresos con unos pocos clientes enormes) pueden hacer falta cientos o miles. La regla de «$n \geq 30$» es orientativa, no una ley.
- **Independencia.** Si las observaciones están correlacionadas (pedidos del mismo cliente, días consecutivos de una serie temporal), el error real es mayor que $\sigma/\sqrt n$.
- **Varianza finita.** Hay distribuciones de colas extremadamente pesadas (algunas pérdidas financieras, viralidad) donde el TCL no se aplica tal cual.
- El TCL habla de la **media**, no de los datos individuales: los pedidos siguen siendo log-normales aunque su media sea normal.

> **Ideas clave**
> - **LGN**: la media muestral converge a la media real cuando $n$ crece; lo individual es incierto, lo agregado es estable.
> - **TCL**: la media muestral se distribuye aproximadamente como una normal con desviación típica $\sigma/\sqrt n$, aunque los datos no sean normales.
> - Para reducir el error a la mitad, hay que cuadruplicar la muestra.
> - El TCL requiere independencia y un $n$ tanto mayor cuanto más asimétricos sean los datos.
>
> Practica: notebook, secciones 3 («Ley de los grandes números») y 4 («Teorema central del límite»).

---

## 1.4 Estimación y error estándar

### Estimador y estimación

Un **estimador** es una regla para calcular, a partir de una muestra, un valor aproximado de un parámetro: «suma los importes y divide entre $n$» es el estimador $\bar x$ de la media $\mu$. La **estimación** es el número concreto que sale al aplicar esa regla a tus datos: 28,08 €. Que distingas ambas cosas importa porque las propiedades (sesgo, precisión) son del **estimador**, es decir, del procedimiento, no del número concreto.

### Propiedades deseables

- **Insesgado**: en promedio, a lo largo de muchas muestras, acierta: $E[\hat\theta] = \theta$. La media muestral es insesgada para $\mu$.
- **Preciso (baja varianza)**: las estimaciones de distintas muestras están cerca unas de otras.
- **Consistente**: cuando $n$ crece, se concentra alrededor del valor real (la LGN garantiza esto para $\bar x$).

Un tirador cuyas balas se agrupan lejos de la diana es preciso pero sesgado; uno cuyas balas se reparten alrededor del centro es insesgado pero impreciso. Queremos estimadores con las dos cualidades.

Un detalle que verás en el código: la desviación típica muestral se calcula dividiendo entre $n-1$:
$$s = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar x)^2}.$$
El motivo es que las desviaciones se miden respecto a $\bar x$, que ya está «ajustada» a los datos, y eso hace que dividir entre $n$ subestime sistemáticamente la varianza. Por eso en NumPy usamos `x.std(ddof=1)`; pandas usa `ddof=1` por defecto.

### Desviación típica frente a error estándar

Esta es probablemente la confusión más frecuente de todo el módulo, así que vamos despacio. Son dos números distintos que responden a preguntas distintas:

| | **Desviación típica** ($s$, estimación de $\sigma$) | **Error estándar** ($EE = s/\sqrt n$) |
|---|---|---|
| ¿Qué mide? | Cuánto varían **los pedidos individuales** entre sí | Cuánto variaría **la media muestral** si repitieras el muestreo |
| ¿Describe…? | los datos (la población) | la precisión del estimador |
| ¿Qué pasa si aumentas $n$? | Se estabiliza en torno a $\sigma$; **no se reduce** | **Se reduce** en proporción a $1/\sqrt n$ |
| En nuestro caso ($n = 200$) | ≈ 16,12 € | ≈ 1,14 € |
| Pregunta a la que responde | «¿Cómo de distintos son los pedidos?» | «¿Cuánto me puedo fiar de la media?» |

Dicho de otro modo: con 200 pedidos sabemos el ticket medio con una precisión de ±1,14 € (un error estándar), pero los pedidos individuales siguen siendo muy variados (±16 €). Si recogieras 20 000 pedidos, el error estándar bajaría a unos 0,11 €, mientras que la desviación típica seguiría en torno a 15–16 €: los clientes no se vuelven más parecidos porque los observes más.

En Python:

```python
s  = muestra.std(ddof=1)            # desviación típica: variabilidad de los pedidos
ee = s / np.sqrt(len(muestra))      # error estándar de la media
ee = stats.sem(muestra)             # lo mismo, con SciPy
```

### Error estándar de otras estimaciones

El concepto se aplica a cualquier estimador: es la desviación típica de su distribución muestral.

- **Proporción** (por ejemplo, tasa de conversión): $EE(\hat p) = \sqrt{\hat p(1-\hat p)/n}$. Con 1 000 visitantes y 5 % de conversión, $EE \approx 0{,}69$ puntos porcentuales.
- **Diferencia de dos medias independientes**: $EE = \sqrt{s_1^2/n_1 + s_2^2/n_2}$ (lo usarás en las pruebas A/B del módulo 04).
- **Mediana, percentiles, ratios**: no tienen una fórmula sencilla y fiable; ahí entra el **bootstrap** (lección 1.6).

### Ejemplo de negocio

Un equipo de producto reporta: «el tiempo medio de sesión es 6,2 min (desviación típica 4,8 min, $n = 2\,500$)». El error estándar es $4{,}8/\sqrt{2500} = 0{,}096$ min, unos 6 segundos. Así que la **media** está muy bien estimada, aunque las **sesiones individuales** sean muy variables. Si otro informe dice «6,2 ± 4,8», alguien podría concluir erróneamente que no sabemos casi nada de la media; si dijera «6,2 ± 0,1» sin explicar qué es, alguien podría creer que todas las sesiones duran unos 6 minutos. Etiquetar bien es la mitad del trabajo.

### Errores frecuentes

- **Usar el error estándar para describir a los clientes** («los pedidos rondan 28 ± 1 €») o la desviación típica para describir la precisión de la media.
- **Barras de error sin etiquetar** en gráficos. Siempre indica si son desviación típica, error estándar o intervalo de confianza.
- **Elegir el que «queda mejor»**: reportar el error estándar porque es más pequeño y parece más preciso. Cada uno tiene su función.
- **Olvidar la independencia**: si tienes varios pedidos por cliente, el error estándar real de la media es mayor que $s/\sqrt n$.

> **Ideas clave**
> - Un **estimador** es un procedimiento; la **estimación**, el número que produce. Queremos estimadores insesgados, precisos y consistentes.
> - La **desviación típica** describe la variabilidad de los datos individuales y no disminuye con $n$.
> - El **error estándar** describe la variabilidad de la estimación y disminuye como $1/\sqrt n$.
> - En nuestra muestra: $s \approx 16{,}12$ €, $EE \approx 1{,}14$ €. Etiqueta siempre cuál reportas.
>
> Practica: notebook, secciones 4 (EE teórico en los títulos de los histogramas) y 5 (`stats.sem`).

---

## 1.5 Intervalos de confianza: construcción e interpretación

### De la estimación puntual al intervalo

Decir «el ticket medio es 28,08 €» es una **estimación puntual**: un solo número que casi seguro no coincide exactamente con el valor real. Un **intervalo de confianza (IC)** acompaña la estimación de un rango de valores plausibles construido con un procedimiento que acierta con una frecuencia conocida.

La lógica sale directamente del TCL: si $\bar x$ es aproximadamente normal alrededor de $\mu$ con desviación típica $EE$, entonces en el 95 % de las muestras $\bar x$ cae a menos de $1{,}96 \cdot EE$ de $\mu$. Dándole la vuelta: en el 95 % de las muestras, el intervalo $\bar x \pm 1{,}96 \cdot EE$ contiene a $\mu$.

### La fórmula

Como no conocemos $\sigma$ y la estimamos con $s$, usamos la distribución **$t$ de Student** con $n-1$ grados de libertad, que tiene colas algo más gruesas que la normal para compensar esa incertidumbre extra:
$$\bar x \pm t_{0.975,\,n-1}\cdot \frac{s}{\sqrt n}.$$
Con $n = 200$, $t_{0.975,199} \approx 1{,}97$, prácticamente 1,96; con $n = 10$ sería 2,26. El término $t \cdot EE$ se llama **margen de error** o semianchura.

En el notebook (sección 5):

```python
media, ee = muestra.mean(), stats.sem(muestra)
ic = stats.t.interval(0.95, df=len(muestra) - 1, loc=media, scale=ee)
# Media muestral: 28.08 € | IC 95 %: [25.84, 30.33]
```

Para una **proporción** con muestra grande, el equivalente es $\hat p \pm 1{,}96\sqrt{\hat p(1-\hat p)/n}$.

### Qué significa realmente el «95 %»

Aquí está el punto delicado. El 95 % es una propiedad del **método**, no de un intervalo concreto:

> Si repitiéramos el muestreo muchas veces y construyéramos un intervalo con cada muestra, **aproximadamente el 95 % de esos intervalos contendrían la media real**.

El notebook lo comprueba: construye 100 intervalos con 100 muestras distintas y **96 de ellos** contienen la media real de 27,79 € (lo esperable es «alrededor de 95», con variación de unos ±4 por azar). Los 4 que fallan no tienen nada raro: son la parte de mala suerte que el método asume.

Una vez calculado *tu* intervalo, [25,84; 30,33], en la interpretación frecuentista estricta el valor real **está dentro o no está**; no hay un 95 % de probabilidad «sobre» ese intervalo concreto, porque $\mu$ no es aleatorio. Lo que tienes es un intervalo producido por un procedimiento que acierta el 95 % de las veces. Por eso hablamos de «confianza» y no de «probabilidad».

¿Cómo comunicarlo sin pedantería? Algo como: «Estimamos que el ticket medio está entre 25,8 € y 30,3 €. Lo hemos calculado con un método que acierta en 95 de cada 100 ocasiones». En la práctica, mucha gente dice «hay un 95 % de probabilidad de que esté entre…»: es una aproximación aceptable para un público no técnico (y es lo que diría un análisis bayesiano con información previa poco informativa), pero tú debes conocer la diferencia y no usarla en un informe técnico.

### Interpretaciones incorrectas habituales

- ❌ «El 95 % de los pedidos cuesta entre 25,84 € y 30,33 €». **Falso**: el IC es para la **media**, no para los pedidos. Los pedidos individuales varían muchísimo más (su desviación típica es ≈ 16 €). Para un rango de pedidos individuales necesitarías un intervalo de predicción o simplemente percentiles de los datos.
- ❌ «Si repetimos el estudio, el 95 % de las nuevas medias caerán en [25,84; 30,33]». **Falso**: el intervalo está centrado en *nuestra* media, no en la real.
- ❌ «La media real cambia y el 95 % del tiempo está en el intervalo». **Falso**: la media real es fija; lo que cambia de muestra en muestra es el intervalo.
- ❌ «Un IC al 99 % es mejor que uno al 95 %». No necesariamente: es más ancho. Más confianza se paga con menos precisión.

### Qué controla la anchura

$$\text{semianchura} = t \cdot \frac{s}{\sqrt n}$$

1. **Nivel de confianza**: 90 % ($z \approx 1{,}645$), 95 % (1,96), 99 % (2,576). Más confianza → más ancho.
2. **Variabilidad de los datos** ($s$): datos más dispersos → más ancho. No la controlas, pero a veces puedes reducirla segmentando.
3. **Tamaño de muestra**: la anchura cae como $1/\sqrt n$. **Cuadruplicar la muestra reduce la anchura a la mitad.**

De ahí sale el cálculo del tamaño de muestra: si quieres una semianchura $E$, despejas
$$n \approx \left(\frac{1{,}96\, s}{E}\right)^2,$$
usando una $s$ de una muestra piloto o de datos históricos (es el ejercicio 3 del notebook y la base de la recomendación del caso práctico).

### Supuestos y precauciones

- **Muestra aleatoria e independiente.** Si hay sesgo de selección, el intervalo será estrecho y estará mal centrado: precisión falsa.
- **$n$ suficiente para el TCL.** Con datos muy asimétricos y muestras pequeñas, la cobertura real puede quedar por debajo del 95 % nominal (lo comprobarás en el ejercicio 1).
- **Comparar dos grupos.** Que los IC de dos grupos se solapen **no** demuestra que no haya diferencia; para comparar, construye el IC de la **diferencia** (módulo 04).

### Ejemplo de negocio

Una empresa de suscripciones mide la satisfacción de 400 clientes: el 62 % está satisfecho. $EE = \sqrt{0{,}62 \cdot 0{,}38/400} \approx 0{,}024$, IC 95 % ≈ [57,2 %; 66,8 %]. Si el objetivo trimestral era «al menos el 60 %», no puedes afirmar con seguridad que se haya cumplido: el intervalo incluye valores por debajo. Lo honesto es decir «probablemente sí, pero los datos son compatibles con un 57 %».

> **Ideas clave**
> - IC para la media: $\bar x \pm t_{0.975,\,n-1}\cdot s/\sqrt n$. En el caso: 28,08 € [25,84; 30,33].
> - El 95 % es la tasa de acierto del **método** a lo largo de muchas muestras; un intervalo concreto contiene o no el valor real.
> - El IC habla de la **media**, no de los pedidos individuales.
> - La anchura depende del nivel de confianza, de la variabilidad y de $1/\sqrt n$.
> - Requiere muestra aleatoria, independencia y $n$ suficiente para la asimetría de los datos.
>
> Practica: notebook, sección 5 («Intervalos de confianza») y ejercicios 1 y 3.

---

## 1.6 Bootstrap: incertidumbre para cualquier métrica

### El problema

Para la media tenemos una fórmula cómoda gracias al TCL. Pero en negocio nos interesan muchas otras métricas: la **mediana** del importe (el «pedido típico»), el **percentil 90** del tiempo de entrega (lo que sufren los clientes peor atendidos), un **ratio** como ingresos por usuario activo o la **diferencia de medianas** entre dos versiones. Para casi todas ellas no hay una fórmula de error estándar sencilla y fiable. ¿Renunciamos a dar incertidumbre? No: usamos el **bootstrap**.

### La idea

El problema de fondo es que solo tenemos una muestra y nos gustaría saber cómo variaría el estadístico si pudiéramos tomar muchas muestras de la población. El bootstrap propone un atajo ingenioso: **usar la propia muestra como si fuera la población** y simular el muestreo a partir de ella.

Si la muestra es aleatoria y suficientemente grande, se parece a la población. Así que remuestrear de la muestra imita razonablemente bien el remuestrear de la población. El nombre viene de la expresión inglesa *pull yourself up by your bootstraps*, levantarse tirando de los cordones de las propias botas: obtener información extra sin datos nuevos.

### El algoritmo

1. Toma tu muestra original de tamaño $n$.
2. Genera una **muestra bootstrap**: elige $n$ observaciones de la muestra original **con reemplazo** (cada pedido puede salir 0, 1, 2… veces).
3. Calcula el estadístico de interés (mediana, P90, ratio…) en esa muestra bootstrap.
4. Repite los pasos 2–3 miles de veces ($B = 5\,000$, por ejemplo).
5. La colección de $B$ valores es la **distribución bootstrap**. Su desviación típica es el **error estándar bootstrap**, y sus percentiles 2,5 y 97,5 dan un **IC 95 % por el método del percentil**.

¿Por qué con reemplazo? Porque sin reemplazo obtendrías siempre la misma muestra reordenada y el estadístico no cambiaría. El reemplazo introduce la variación que simula el azar del muestreo.

### En Python

La función del notebook (sección 5, «Bootstrap»):

```python
def bootstrap(datos, estadistico, n_boot=5_000, rng=rng):
    idx = rng.integers(0, len(datos), (n_boot, len(datos)))
    return np.array([estadistico(datos[i]) for i in idx])

boot_mediana = bootstrap(muestra, np.median)
lo, hi = np.percentile(boot_mediana, [2.5, 97.5])
# Mediana: 24.50 € | IC 95 % bootstrap: [21.89, 27.02]
```

La mediana poblacional (24,53 €, que conocemos porque simulamos) cae dentro del intervalo. Observa que la mediana (24,50 €) es bastante menor que la media (28,08 €): con datos asimétricos, ambas cifras cuentan historias distintas y a menudo conviene reportar las dos.

SciPy incluye `scipy.stats.bootstrap`, que además ofrece el método **BCa** (corregido por sesgo y aceleración), más preciso cuando la distribución bootstrap es asimétrica.

### Cuándo usarlo

- Estadísticos **sin fórmula sencilla**: mediana, percentiles, ratios, coeficientes de correlación, diferencias de medianas.
- Datos **asimétricos** o muestras moderadas, donde la aproximación normal es dudosa.
- Para **comprobar** un intervalo de fórmula: si bootstrap y fórmula coinciden, ganas confianza; si difieren mucho, algo merece revisión.
- Métricas de modelos (por ejemplo, el IC del AUC o del error medio de un modelo en el conjunto de test).

### Cuándo tener cuidado

- **Muestras muy pequeñas** ($n < 15$–$20$): la muestra no representa bien la población y el bootstrap hereda sus huecos.
- **Estadísticos extremos** (máximo, mínimo, percentil 99): dependen de muy pocas observaciones; el bootstrap no puede generar valores más extremos que los que ya tienes.
- **Datos dependientes**: si los datos son una serie temporal o hay grupos (varios pedidos por cliente), remuestrear observaciones sueltas rompe la estructura. Hay variantes: bootstrap por bloques o remuestrear clientes enteros.
- **Sesgo de la muestra**: el bootstrap cuantifica el error aleatorio, no el sistemático. Si la muestra está sesgada, el intervalo estará igual de sesgado.

### Ejemplo de negocio

Un *marketplace* quiere comprometer en su web un plazo de entrega «en menos de X horas para el 90 % de los pedidos». Con 300 entregas de una semana piloto, el P90 observado es 46 horas. El bootstrap da un IC 95 % de, digamos, [42; 51] horas. Prometer 46 horas sería arriesgado: con estos datos, el valor real podría estar cerca de 51. Un compromiso prudente usaría el extremo superior del intervalo, o recogería más datos antes de anunciarlo.

> **Ideas clave**
> - El bootstrap estima la incertidumbre de **cualquier** estadístico remuestreando la muestra **con reemplazo**.
> - Error estándar bootstrap = desviación típica de la distribución bootstrap; IC percentil = percentiles 2,5 y 97,5.
> - Brilla con medianas, percentiles y ratios; sufre con muestras muy pequeñas, estadísticos extremos y datos dependientes.
> - Cuantifica el error aleatorio, no corrige sesgos de muestreo.
>
> Practica: notebook, sección 5 («Bootstrap: intervalos sin fórmulas») y ejercicio 2.

---

## 1.7 Correlación, causalidad y paradoja de Simpson

### Correlación

La **correlación de Pearson** mide la fuerza y el sentido de la relación **lineal** entre dos variables:
$$r = \frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum (x_i-\bar x)^2}\sqrt{\sum (y_i-\bar y)^2}}, \qquad -1 \le r \le 1.$$
$r = 1$: relación lineal creciente perfecta; $r = -1$: decreciente perfecta; $r \approx 0$: no hay relación **lineal** (puede haber otra). En pandas: `df["x"].corr(df["y"])`.

Lo que $r$ no te dice:

- **No mide la pendiente**: $r = 0{,}9$ puede corresponder a un efecto minúsculo o enorme.
- **No ve relaciones no lineales**: una relación en forma de U (satisfacción frente a número de notificaciones) puede tener $r \approx 0$.
- **Es sensible a valores atípicos**: un solo cliente gigante puede crear o destruir una correlación. La correlación de **Spearman** (sobre rangos) es más robusta.
- **Siempre grafica**: un diagrama de dispersión vale más que el coeficiente.

### Correlación no es causalidad

Que dos variables se muevan juntas no significa que una cause la otra. Ante una correlación entre $X$ e $Y$ hay varias explicaciones posibles:

1. **$X$ causa $Y$** (lo que nos gustaría concluir).
2. **Causalidad inversa: $Y$ causa $X$.** Las tiendas con más empleados venden más… ¿o se contratan más empleados donde se vende más?
3. **Variable de confusión: $Z$ causa ambas.** Las heladerías venden más los días con más ahogamientos en la playa: el calor aumenta las dos cosas.
4. **Selección**: solo observas un subconjunto filtrado. Si analizas solo clientes que siguen activos, las relaciones pueden aparecer o desaparecer artificialmente.
5. **Azar**: con suficientes variables, alguna correlación espuria aparecerá.

Una **variable de confusión** (o confusora) es una variable que influye a la vez en la «causa» que estudias y en el resultado. Si no la tienes en cuenta, atribuyes a $X$ un efecto que en realidad es de $Z$.

### La paradoja de Simpson

Es el caso extremo de confusión: **una tendencia que aparece en cada grupo se invierte al juntar los grupos**. El notebook (sección 6) lo muestra con dos versiones de la app:

| Versión | Dispositivo | Visitas | Compras | Tasa |
|---|---|---|---|---|
| A | móvil | 8 000 | 400 | **5,0 %** |
| A | escritorio | 2 000 | 300 | **15,0 %** |
| B | móvil | 2 000 | 80 | 4,0 % |
| B | escritorio | 8 000 | 1 040 | 13,0 % |

En el **global**, B convierte un 11,2 % y A un 7,0 %: B parece claramente mejor. Pero **por segmento, A gana en los dos**: en móvil (5 % frente a 4 %) y en escritorio (15 % frente a 13 %). ¿Cómo puede ganar en cada parte y perder en el todo? B se mostró sobre todo en escritorio (80 % de sus visitas), donde **todo el mundo** convierte más, y A sobre todo en móvil. La tasa global de cada versión es una media ponderada de sus segmentos, y los pesos son muy distintos. El **dispositivo** es la variable de confusión: influye en qué versión vio cada usuario y en su probabilidad de comprar.

Hagamos la cuenta de las medias ponderadas:
$$\text{A: } 0{,}8 \cdot 5\,\% + 0{,}2 \cdot 15\,\% = 7{,}0\,\% \qquad \text{B: } 0{,}2 \cdot 4\,\% + 0{,}8 \cdot 13\,\% = 11{,}2\,\%$$
La ventaja global de B (4,2 puntos) no se debe a la versión, sino a la **mezcla de dispositivos**: en igualdad de condiciones (mismo dispositivo), A es 1 punto mejor en móvil y 2 puntos mejor en escritorio. La cifra global era un puro **efecto de composición**, y lanzar B a todos los usuarios empeoraría la conversión en ambos dispositivos. Tienes otro ejemplo completo en las soluciones del ejercicio 4.

### ¿Qué cifra es la «correcta»?

Depende de la pregunta y de la estructura causal. Si el dispositivo influye en el resultado y en la asignación (como aquí), la comparación justa es **dentro de cada segmento** (o una media ajustada que use la misma mezcla para ambas versiones). Pero no hay que estratificar a ciegas: si la variable de agrupación fuera una **consecuencia** del tratamiento (por ejemplo, «usuarios que llegaron a la página de pago»), estratificar por ella introduciría sesgo. Por eso el razonamiento causal (qué causa qué) debe preceder al cálculo.

### Cómo protegerse

- **Aleatorizar**: en una prueba A/B bien hecha, la asignación aleatoria reparte por igual dispositivos, ciudades y cualquier otra confusora, conocida o no (módulo 04). Es la solución más sólida.
- **Estratificar o controlar**: comparar dentro de grupos homogéneos, o incluir las confusoras en un modelo de regresión (módulo 03).
- **Preguntarte siempre**: ¿cómo se asignó el «tratamiento»? ¿Qué otras diferencias hay entre los grupos? ¿Podría la causalidad ir al revés?

### Errores frecuentes

- Lanzar una acción basada en una correlación observacional («los clientes que usan el chat compran más → obliguemos a todos a usar el chat») sin pensar en la autoselección.
- Comparar tasas globales entre grupos con composiciones muy distintas (hospitales con pacientes de distinta gravedad, comerciales con zonas distintas).
- Creer que «controlar por todo» es siempre mejor: controlar por variables posteriores al tratamiento puede crear sesgos.

> **Ideas clave**
> - $r$ mide relación **lineal**; grafica siempre y desconfía de los atípicos.
> - Una correlación puede deberse a causalidad directa, inversa, a una **variable de confusión**, a selección o al azar.
> - **Paradoja de Simpson**: la tendencia por grupos puede invertirse en el agregado cuando los grupos tienen composiciones distintas.
> - La asignación aleatoria es la mejor defensa; si no es posible, estratifica o controla las confusoras con criterio causal.
>
> Practica: notebook, sección 6 («Correlación no es causalidad: la paradoja de Simpson») y ejercicio 4.

---

## Glosario

| Término | Definición breve |
|---|---|
| **Población** (*population*) | Conjunto completo de unidades sobre el que queremos sacar conclusiones. |
| **Muestra** (*sample*) | Subconjunto de la población que observamos. |
| **Parámetro** (*parameter*) | Valor numérico fijo y normalmente desconocido que describe la población ($\mu$, $\sigma$, $p$). |
| **Estadístico** (*statistic*) | Valor calculado a partir de la muestra ($\bar x$, $s$, $\hat p$); varía de una muestra a otra. |
| **Sesgo** (*bias*) | Error sistemático: diferencia entre el valor medio de un estimador (o una muestra) y el valor real. |
| **Variable aleatoria** (*random variable*) | Número asociado al resultado de un proceso con incertidumbre. |
| **Distribución de probabilidad** (*probability distribution*) | Descripción de los valores posibles de una variable aleatoria y sus probabilidades. |
| **Esperanza / media** (*expected value / mean*) | Valor promedio a largo plazo de una variable aleatoria. |
| **Desviación típica** (*standard deviation*) | Medida de dispersión de los datos individuales alrededor de su media. |
| **Error estándar** (*standard error*) | Desviación típica de la distribución muestral de un estimador; mide su precisión. |
| **Ley de los grandes números** (*law of large numbers*) | La media muestral converge a la media poblacional cuando crece $n$. |
| **Teorema central del límite** (*central limit theorem*) | La media muestral es aproximadamente normal para $n$ grande, sea cual sea la distribución original (con varianza finita). |
| **Distribución muestral** (*sampling distribution*) | Distribución de un estadístico a lo largo de todas las muestras posibles. |
| **Intervalo de confianza** (*confidence interval*) | Rango calculado con un método que contiene el parámetro real en una proporción fijada de muestras (p. ej., 95 %). |
| **Margen de error** (*margin of error*) | Semianchura de un intervalo de confianza. |
| **Nivel de confianza / cobertura** (*confidence level / coverage*) | Proporción de intervalos que contienen el parámetro real si se repite el muestreo. |
| **Bootstrap** (*bootstrap*) | Método de remuestreo con reemplazo para aproximar la distribución muestral de cualquier estadístico. |
| **Correlación** (*correlation*) | Medida de la fuerza de la relación lineal (Pearson) o monótona (Spearman) entre dos variables. |
| **Variable de confusión** (*confounder*) | Variable que influye a la vez en la supuesta causa y en el resultado. |
| **Paradoja de Simpson** (*Simpson's paradox*) | Inversión de una tendencia al agregar grupos con composiciones distintas. |
