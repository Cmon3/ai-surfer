# Módulo I6 · Analítica predictiva con series temporales — Apuntes

Casi todas las decisiones de una empresa miran al futuro: cuánto stock pedir, cuántas personas poner en el turno del sábado, qué capacidad contratar al proveedor de la nube o qué presupuesto de ventas comprometer. Detrás de cada una hay una **serie temporal**, una secuencia de mediciones ordenadas en el tiempo, y una pregunta: ¿qué valores tomará en las próximas semanas o meses, y con qué incertidumbre?

En este módulo aprenderás un flujo de trabajo completo y honesto para responderla: entender la serie (componentes, estacionariedad, autocorrelación), fijar referencias sencillas que cualquier modelo debe batir, ajustar modelos clásicos (suavizado exponencial y SARIMA), validarlos sin hacer trampas con el futuro y, por último, saber cuándo dar el salto a variables externas, muchas series a la vez o modelos de *machine learning*. La práctica guiada usa la concentración de CO₂ en Mauna Loa, pero cada técnica se aplica igual a la demanda de un producto o al tráfico de una web.

## Índice

- [8.1 Series temporales en la empresa: demanda, ventas, capacidad](#81-series-temporales-en-la-empresa-demanda-ventas-capacidad)
- [8.2 Componentes y descomposición (STL)](#82-componentes-y-descomposición-stl)
- [8.3 Estacionariedad, diferenciación y autocorrelación](#83-estacionariedad-diferenciación-y-autocorrelación)
- [8.4 Métodos de referencia: ingenuo, estacional, deriva](#84-métodos-de-referencia-ingenuo-estacional-deriva)
- [8.5 Suavizado exponencial y Holt-Winters](#85-suavizado-exponencial-y-holt-winters)
- [8.6 Modelos ARIMA y SARIMA](#86-modelos-arima-y-sarima)
- [8.7 Validación temporal y métricas (MAE, MAPE)](#87-validación-temporal-y-métricas-mae-mape)
- [8.8 Variables externas, múltiples series y modelos de machine learning](#88-variables-externas-múltiples-series-y-modelos-de-machine-learning)
- [Glosario](#glosario)

---

## 8.1 Series temporales en la empresa: demanda, ventas, capacidad

Una serie temporal es una colección de observaciones $y_1, y_2, \dots, y_T$ tomadas a intervalos regulares: ventas diarias, pedidos semanales, consumo eléctrico horario, llamadas al centro de atención cada 15 minutos. Lo que la distingue de los datos que has modelado hasta ahora es que **el orden importa**. En una tabla de clientes puedes barajar las filas sin perder información; en una serie temporal, barajar destruye justo lo que queremos aprovechar: que lo que pasó ayer dice mucho de lo que pasará mañana.

### Para qué se pronostica

El pronóstico no es un fin en sí mismo: es un insumo para una decisión. Conviene clasificar los usos por horizonte, porque cada uno exige un tratamiento distinto:

| Horizonte | Ejemplos de decisión | Granularidad típica |
|---|---|---|
| Corto (horas–semanas) | turnos de personal, reposición de tiendas, pujas de energía | horaria o diaria |
| Medio (1–18 meses) | compras a proveedores, presupuesto anual, campañas | semanal o mensual |
| Largo (años) | abrir un almacén, capacidad de una planta, plan estratégico | trimestral o anual |

Cuanto más lejos miramos, más agregamos y más pesa el juicio experto frente al modelo. Un pronóstico diario a tres años vista rara vez tiene sentido.

**Ejemplo de negocio.** Una cadena de supermercados quiere decidir cuántos yogures pide cada tienda cada martes. Si pide de más, el producto caduca (coste de merma); si pide de menos, pierde ventas y clientes (coste de rotura). El pronóstico de demanda de la semana siguiente, *con su incertidumbre*, permite fijar un pedido que equilibre ambos costes: no basta con "venderemos 120", hace falta saber si lo razonable es entre 110 y 130 o entre 60 y 180.

### Pronóstico, objetivo y plan: tres cosas distintas

Un error frecuente en las empresas es confundir:

- **Pronóstico**: lo que creemos que pasará si nada cambia ("venderemos 10.000 unidades").
- **Objetivo**: lo que nos gustaría que pasara ("queremos vender 12.000").
- **Plan**: lo que haremos para acercarnos al objetivo ("campaña en marzo, ampliación de surtido").

Si el pronóstico se "ajusta" para que coincida con el objetivo, deja de ser útil para planificar. Un buen proceso los mantiene separados y documentados.

### Qué hace que una serie sea predecible

No todas las series se pronostican igual de bien. La predictibilidad depende de:

1. **Cuánto entendemos los factores que la mueven** (la temperatura explica el consumo eléctrico; casi nada explica el precio de una acción mañana).
2. **Cuántos datos tenemos** y si cubren varios ciclos estacionales completos.
3. **Si el futuro se parecerá al pasado**: un cambio de tarifa, una pandemia o el lanzamiento de un competidor rompen los patrones.
4. **Si el propio pronóstico altera el resultado**: si anuncias que un producto se agotará, la gente lo compra antes.

### Estructura de los datos en pandas

En Python, una serie temporal es una `pd.Series` con un índice de fechas (`DatetimeIndex`) y una **frecuencia** declarada. En el notebook (sección 1) los datos semanales de CO₂ se agregan a mensuales:

```python
serie = co2.resample("MS").mean().interpolate()   # "MS" = inicio de mes
serie.index.freq = "MS"
```

`resample` cambia la granularidad (agregando con la media, la suma, etc.) e `interpolate` rellena huecos. Declarar la frecuencia evita avisos y permite que `statsmodels` construya bien las fechas del pronóstico. Ojo con la agregación: las **ventas** se agregan con la **suma**, mientras que una **concentración** o un **precio** se agregan con la **media**.

### El flujo de trabajo del módulo

Todo el módulo sigue el mismo esquema, que te servirá para cualquier serie:

```
Datos → Visualizar y descomponer → Estacionariedad / ACF
      → Partición temporal → Referencias ingenuas → Modelos (ETS, SARIMA)
      → Backtesting → Diagnóstico de residuos → Pronóstico final + intervalo
```

### Errores frecuentes

- **Pronosticar sin una decisión detrás**: el horizonte, la granularidad y la métrica salen de la decisión, no al revés.
- **Ignorar la incertidumbre**: un número sin intervalo invita a sobrerreaccionar.
- **Usar una partición aleatoria** para evaluar: el modelo vería el futuro (lo trataremos en 8.7).
- **Confundir ventas con demanda**: cuando hay roturas de stock, las ventas registradas infraestiman la demanda real.

> **Ideas clave**
> - En una serie temporal el orden de las observaciones es información; nunca se baraja.
> - El horizonte y la granularidad del pronóstico los dicta la decisión de negocio que lo usa.
> - Pronóstico, objetivo y plan son cosas distintas y deben mantenerse separadas.
> - Un pronóstico útil siempre va acompañado de su incertidumbre.
> - Practica: notebook, sección 1.

---

## 8.2 Componentes y descomposición (STL)

Cuando miras el gráfico de una serie, tu cerebro separa casi sin querer varios movimientos superpuestos: una subida de fondo, un vaivén que se repite cada año y unos zigzags irregulares. Descomponer una serie es hacer explícita esa separación.

### Los tres componentes

- **Tendencia–ciclo** $T_t$: la evolución a largo plazo (crecimiento del negocio, aumento sostenido del CO₂). Incluye a veces ciclos largos sin periodo fijo, como los económicos.
- **Estacionalidad** $S_t$: un patrón que se repite con periodo **fijo y conocido** $m$: 12 en datos mensuales con ciclo anual, 7 en datos diarios con ciclo semanal, 24 en datos horarios con ciclo diario.
- **Residuo** $R_t$: lo que queda; idealmente, ruido sin estructura.

Hay dos formas de combinarlos:

$$\text{Aditiva: } y_t = T_t + S_t + R_t \qquad\qquad \text{Multiplicativa: } y_t = T_t \times S_t \times R_t$$

La elección depende de cómo se comporta la oscilación estacional. Si su amplitud es **constante** aunque el nivel suba, la aditiva es adecuada. Si la amplitud **crece con el nivel** (una tienda que vende el triple en diciembre que en febrero, y cuyas ventas se duplican en cinco años), la multiplicativa encaja mejor. Truco útil: tomar logaritmos convierte una estructura multiplicativa en aditiva, porque $\log(T \times S \times R) = \log T + \log S + \log R$.

### Cómo funciona STL

STL (*Seasonal and Trend decomposition using Loess*) es el método de descomposición más usado hoy. Su idea es iterativa:

1. Estima la tendencia con un suavizado local (*loess*) que va recorriendo la serie.
2. Resta la tendencia y, para cada "mes" (cada posición del ciclo), suaviza los valores de todos los años para obtener la estacionalidad.
3. Resta la estacionalidad, vuelve a estimar la tendencia y repite hasta estabilizarse.

Frente a la descomposición clásica por medias móviles, STL tiene tres ventajas: permite que la estacionalidad **cambie lentamente** con los años, no pierde observaciones al principio y al final de la serie, y tiene una versión **robusta** que reduce la influencia de valores atípicos (`robust=True`).

```python
from statsmodels.tsa.seasonal import STL
stl = STL(serie, period=12).fit()
stl.trend, stl.seasonal, stl.resid   # los tres componentes
```

En el CO₂ (notebook, sección 2) la tendencia sube de forma casi lineal, ligeramente acelerada; la estacionalidad muestra un ciclo anual de unas 6 ppm de amplitud (la vegetación del hemisferio norte absorbe CO₂ en primavera-verano), y el residuo es pequeño y sin patrón visible.

### Medir la fuerza de cada componente

Una forma cuantitativa de decir "esta serie es muy estacional" es comparar la varianza del residuo con la de la serie sin tendencia:

$$F_S = \max\left(0,\; 1 - \frac{\operatorname{Var}(R_t)}{\operatorname{Var}(S_t + R_t)}\right)$$

Un valor cercano a 1 indica estacionalidad fuerte; cercano a 0, débil. La fuerza de la tendencia $F_T$ se define igual con $T_t + R_t$ en el denominador. Con cientos de productos, calcular $F_S$ y $F_T$ permite clasificarlos y decidir qué tipo de modelo aplicar a cada grupo.

### Usos de la descomposición en la empresa

- **Desestacionalizar** para ver la tendencia real: "las ventas de enero han caído un 30 % frente a diciembre" puede ser pura estacionalidad. La serie ajustada ($y_t - S_t$) responde a la pregunta correcta: ¿vamos mejor o peor de lo normal para esta época?
- **Detectar anomalías**: un residuo enorme señala un día raro (un fallo del sistema, una promoción no registrada).
- **Comunicar**: un gráfico de tendencia limpia es mucho más claro para un comité que la serie original.

**Ejemplo de negocio.** Un hotel de costa compara agosto con julio y se alarma porque la ocupación "solo" sube un 5 %. Al desestacionalizar descubre que, históricamente, agosto supera a julio en un 12 %: la tendencia subyacente está cayendo y conviene revisar precios antes de septiembre.

### Errores frecuentes

- **Elegir mal el periodo**: en datos diarios de un comercio suele haber estacionalidad semanal (7) *y* anual (365,25); STL básico solo admite una (para varias existe MSTL).
- **Usar la aditiva con oscilaciones que crecen**: el residuo mostrará un patrón en forma de embudo. Prueba con logaritmos.
- **Pronosticar extrapolando la tendencia de STL**: STL describe el pasado, no es un modelo de pronóstico en sí mismo (aunque puede combinarse con uno).

> **Ideas clave**
> - Una serie se puede ver como tendencia + estacionalidad + residuo (o su producto).
> - Si la oscilación estacional crece con el nivel, usa un esquema multiplicativo o trabaja con logaritmos.
> - STL es flexible, robusto y permite que la estacionalidad evolucione.
> - Desestacionalizar evita conclusiones falsas al comparar periodos consecutivos.
> - Practica: notebook, sección 2.

---

## 8.3 Estacionariedad, diferenciación y autocorrelación

Para predecir, un modelo necesita que *algo* se mantenga estable en el tiempo. Si todo cambia (la media, la variabilidad, la relación entre un mes y el siguiente), el pasado no enseña nada sobre el futuro. Esa "estabilidad" se formaliza con el concepto de estacionariedad.

### Qué es una serie estacionaria

Una serie es (débilmente) **estacionaria** si su media y su varianza son constantes en el tiempo y la relación entre $y_t$ y $y_{t-k}$ depende solo de la distancia $k$, no de $t$. Intuitivamente: si tapas el eje horizontal, no podrías adivinar en qué época está cada tramo.

- **No estacionarias**: una serie con tendencia (la media sube), con estacionalidad (la media cambia según el mes) o con varianza creciente.
- **Estacionarias**: ruido blanco, o las variaciones diarias de una magnitud que oscila alrededor de un valor fijo.

Los modelos ARIMA (lección 8.6) necesitan trabajar con una serie estacionaria; la forma de conseguirla es **diferenciar**.

### Diferenciación

La primera diferencia mide el **cambio** de un periodo a otro:

$$\nabla y_t = y_t - y_{t-1}$$

Elimina una tendencia lineal: si las ventas suben 100 unidades al mes, la serie diferenciada oscila alrededor de 100. La **diferencia estacional** compara con el mismo periodo del ciclo anterior:

$$\nabla_{12}\, y_t = y_t - y_{t-12}$$

y elimina la estacionalidad (en datos mensuales). Se pueden combinar: $\nabla \nabla_{12}\, y_t$. Si la varianza crece con el nivel, conviene aplicar antes un logaritmo; la diferencia del logaritmo es, aproximadamente, la **tasa de crecimiento** ($\log y_t - \log y_{t-1} \approx \frac{y_t - y_{t-1}}{y_{t-1}}$), algo muy interpretable en negocio.

Regla práctica: rara vez hacen falta más de una diferencia regular y una estacional. Diferenciar de más introduce estructura artificial y aumenta la varianza.

### La prueba ADF

La prueba de **Dickey-Fuller aumentada** (ADF) contrasta:

- $H_0$: la serie tiene una raíz unitaria (**no es estacionaria**).
- $H_1$: la serie es estacionaria.

Un p-valor **pequeño** (< 0,05) permite rechazar $H_0$ y concluir que es estacionaria. Un p-valor alto **no demuestra** que no lo sea, solo que no tenemos evidencia para afirmarlo. En el notebook (sección 3):

| Serie | p-valor ADF |
|---|---|
| CO₂ original | 0,9989 |
| 1.ª diferencia | 0,0001 |
| 1.ª diferencia + diferencia estacional | < 0,0001 |

La serie original es claramente no estacionaria; tras diferenciar, sí lo es. Existen otras pruebas, como la KPSS, cuya hipótesis nula es la contraria (estacionariedad); usar ambas da una visión más completa.

### Autocorrelación: ACF y PACF

La **autocorrelación** de orden $k$ mide cuánto se parece la serie a sí misma desplazada $k$ periodos:

$$r_k = \frac{\sum_{t=k+1}^{T} (y_t - \bar y)(y_{t-k} - \bar y)}{\sum_{t=1}^{T} (y_t - \bar y)^2}$$

El gráfico de $r_k$ frente a $k$ es la **ACF** (*autocorrelation function*). La **PACF** (autocorrelación *parcial*) mide la relación entre $y_t$ e $y_{t-k}$ **descontando** el efecto de los retardos intermedios: ¿aporta algo el valor de hace 3 meses una vez que ya conozco los de hace 1 y 2?

Cómo leerlas:

- Una ACF que decae **muy lentamente** indica tendencia (no estacionariedad).
- Picos en los retardos 12, 24, 36 indican estacionalidad anual.
- Las bandas azules marcan el umbral aproximado de significación ($\pm 1{,}96/\sqrt{T}$); barras dentro de ellas son compatibles con cero.
- Patrones típicos para identificar ARIMA sobre la serie ya diferenciada: un **AR(p)** muestra PACF que se corta tras el retardo $p$ y ACF que decae; un **MA(q)** muestra ACF que se corta tras $q$ y PACF que decae.

En el CO₂ doblemente diferenciado, la ACF muestra un pico negativo marcado en el retardo 1 y otro en el 12: la firma de un término MA regular y otro MA estacional, que es justo lo que incluye el modelo $(1,1,1)(0,1,1)_{12}$ del notebook.

**Ejemplo de negocio.** Un centro de atención telefónica analiza las llamadas diarias. La ACF muestra picos en 7, 14 y 21: hay un fuerte patrón semanal. La PACF tiene un pico en el retardo 1: un día con muchas llamadas suele ir seguido de otro similar (por ejemplo, durante una incidencia). Ambos patrones deben estar en el modelo de dimensionamiento de plantilla.

```python
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
p_valor = adfuller(serie.diff().diff(12).dropna())[1]
plot_acf(serie.diff().diff(12).dropna(), lags=36)
```

### Errores frecuentes

- **Interpretar un p-valor ADF alto como "la serie es estacionaria"**: es al revés.
- **Leer la ACF de la serie original** para identificar un ARIMA: primero hay que diferenciar.
- **Sobrediferenciar**: si tras una diferencia la ACF tiene un pico negativo cercano a −0,5 en el retardo 1, probablemente sobraba.
- **Olvidar el `dropna()`** tras diferenciar: los primeros valores quedan vacíos.

> **Ideas clave**
> - Estacionaria = media, varianza y autocorrelación estables en el tiempo.
> - La diferenciación regular elimina tendencia; la estacional, la estacionalidad.
> - En la ADF, p-valor pequeño ⇒ estacionaria; p-valor grande ⇒ conviene diferenciar.
> - ACF y PACF revelan la memoria de la serie y orientan la elección del modelo.
> - Practica: notebook, sección 3.

---

## 8.4 Métodos de referencia: ingenuo, estacional, deriva

Antes de ajustar ningún modelo sofisticado, hazte una pregunta incómoda: **¿qué error cometería la regla más tonta posible?** Si tu modelo no la mejora, no aporta valor, por elegante que sea. Los métodos de referencia (*benchmarks*) cumplen ese papel, y en series temporales a menudo son sorprendentemente difíciles de batir.

### Los cuatro métodos del notebook

Sea $T$ el último periodo observado y $h$ el horizonte (1, 2, ... periodos hacia delante). Con $m$ el periodo estacional:

**1. Ingenuo** (*naïve*): todo el futuro es igual al último valor.
$$\hat y_{T+h} = y_T$$
Funciona bien en series tipo "paseo aleatorio" (tipos de cambio, precios de materias primas).

**2. Ingenuo estacional**: cada mes futuro repite el mismo mes del último año.
$$\hat y_{T+h} = y_{T+h-m(k+1)}, \quad k = \lfloor (h-1)/m \rfloor$$
Es la referencia natural para series muy estacionales ("este agosto será como el anterior").

**3. Deriva** (*drift*): prolonga la línea que une la primera y la última observación.
$$\hat y_{T+h} = y_T + h \cdot \frac{y_T - y_1}{T - 1}$$
Equivale a suponer que la serie sigue creciendo al ritmo medio histórico.

**4. Estacional + deriva**: el ingenuo estacional más la subida media interanual (en el notebook, la diferencia media entre los últimos 12 meses y los 12 anteriores, sumada una vez por cada año de horizonte). Combina las dos ideas anteriores y, para series con tendencia y estacionalidad estables, es una referencia exigente.

```python
ingenuo_estacional = np.tile(train.iloc[-12:].values, H // 12)
subida_anual = (train.iloc[-12:].values - train.iloc[-24:-12].values).mean()
```

### Qué nos dicen en el caso del CO₂

En el test de 24 meses del notebook (sección 8):

| Método | MAE (ppm) |
|---|---|
| Ingenuo | 2,42 |
| Deriva | 1,91 |
| Ingenuo estacional | 1,88 |
| Estacional + deriva | 0,56 |
| SARIMA | 0,36 |
| Holt-Winters | 0,24 |

Cada referencia captura una parte de la estructura: el ingenuo no captura nada; la deriva, la tendencia; el estacional, el ciclo; la combinación, ambas cosas. El salto de 1,88 a 0,56 ppm muestra que en esta serie la tendencia importa muchísimo. Holt-Winters y SARIMA aún reducen el error a la mitad respecto a la mejor referencia: **ahora sí** podemos decir que los modelos aportan valor.

### Por qué son imprescindibles

1. **Dan escala al error.** "MAE de 0,36 ppm" no significa nada en abstracto; "un 35 % menos de error que la mejor regla sencilla" sí.
2. **Detectan modelos inútiles.** En muchas series de negocio con mucho ruido (ventas diarias de un artículo poco vendido), ningún modelo bate con claridad al ingenuo estacional. Saberlo ahorra meses de trabajo.
3. **Detectan errores de código.** Si tu modelo es mucho *peor* que el ingenuo, probablemente hay un desfase de fechas o una fuga.
4. **Son robustos y explicables.** Cualquier responsable entiende "lo mismo que el año pasado más un 3 %".

### Medir la mejora: el *skill score*

Una forma estándar de expresar la mejora frente a una referencia es:

$$\text{Skill} = 1 - \frac{\text{error del modelo}}{\text{error de la referencia}}$$

Un *skill* de 0,6 frente al ingenuo estacional significa un 60 % menos de error. Si es negativo, el modelo es peor que la referencia.

**Ejemplo de negocio.** Un equipo de *data science* presenta un modelo de demanda de una cadena de ropa con un MAPE del 18 %. El director de operaciones pregunta: "¿y si pedimos lo mismo que la temporada pasada?". Resulta que esa regla tiene un MAPE del 19 %. La mejora de un punto no justifica el coste de mantener el modelo; el equipo redirige el esfuerzo a incorporar el calendario de promociones, que es donde estaba el error.

### Errores frecuentes

- **Comparar solo con el ingenuo simple** en una serie estacional: es una referencia demasiado fácil y hace parecer bueno cualquier modelo.
- **Calcular las referencias con datos del test**: deben usar solo el entrenamiento, igual que los modelos.
- **No incluir las referencias en el *backtesting***: una sola partición puede favorecer por casualidad a uno u otro.

> **Ideas clave**
> - Todo modelo debe compararse con referencias sencillas calculadas solo con datos de entrenamiento.
> - Para series estacionales, la referencia mínima es el ingenuo estacional; mejor aún, estacional + deriva.
> - Expresa la mejora como reducción relativa del error (*skill*), no solo como un número suelto.
> - Si el modelo no bate a la referencia, quédate con la referencia.
> - Practica: notebook, secciones 5 y 8.

---

## 8.5 Suavizado exponencial y Holt-Winters

Los métodos ingenuos usan solo una observación (la última, o la del año anterior). La media de toda la historia, en el otro extremo, da el mismo peso a lo que pasó hace diez años que a lo de ayer. El **suavizado exponencial** busca el término medio: usa toda la historia, pero dando **más peso a lo reciente**, con pesos que decrecen de forma exponencial hacia el pasado.

### Suavizado exponencial simple

Para una serie sin tendencia ni estacionalidad, el pronóstico es un **nivel** $\ell_t$ que se actualiza con cada nueva observación:

$$\ell_t = \alpha\, y_t + (1-\alpha)\, \ell_{t-1}, \qquad \hat y_{t+h} = \ell_t$$

El parámetro $\alpha \in (0,1)$ controla la memoria. Desarrollando la recursión, el peso de la observación de hace $j$ periodos es $\alpha(1-\alpha)^j$:

| $\alpha$ | Peso hoy | Hace 1 | Hace 2 | Hace 5 | Comportamiento |
|---|---|---|---|---|---|
| 0,8 | 0,80 | 0,16 | 0,03 | 0,0003 | reacciona rápido, nervioso |
| 0,2 | 0,20 | 0,16 | 0,13 | 0,07 | suave, lento en reaccionar |

Un $\alpha$ alto "olvida" deprisa el pasado; uno bajo promedia mucho. No se elige a ojo: se estima minimizando el error de las predicciones un paso adelante en el entrenamiento.

### Holt: añadir tendencia

Holt añade una **pendiente** $b_t$ que también se suaviza:

$$\ell_t = \alpha\, y_t + (1-\alpha)(\ell_{t-1} + b_{t-1})$$
$$b_t = \beta\, (\ell_t - \ell_{t-1}) + (1-\beta)\, b_{t-1}$$
$$\hat y_{t+h} = \ell_t + h\, b_t$$

$\beta$ controla lo rápido que se adapta la pendiente. Un problema conocido: extrapolar una recta indefinidamente suele ser demasiado optimista a horizontes largos. La **tendencia amortiguada** (*damped trend*) introduce $\phi \in (0,1)$ que aplana la pendiente con el horizonte:

$$\hat y_{t+h} = \ell_t + (\phi + \phi^2 + \dots + \phi^h)\, b_t$$

En la práctica, la tendencia amortiguada es una de las opciones por defecto más fiables en pronóstico de negocio.

### Holt-Winters: añadir estacionalidad

Holt-Winters añade un tercer componente $s_t$ con su propio parámetro $\gamma$. En la versión **aditiva**:

$$\ell_t = \alpha\,(y_t - s_{t-m}) + (1-\alpha)(\ell_{t-1} + b_{t-1})$$
$$b_t = \beta\,(\ell_t - \ell_{t-1}) + (1-\beta)\, b_{t-1}$$
$$s_t = \gamma\,(y_t - \ell_{t-1} - b_{t-1}) + (1-\gamma)\, s_{t-m}$$
$$\hat y_{t+h} = \ell_t + h\, b_t + s_{t+h-m(k+1)}$$

La lógica es la de siempre: cada componente es un promedio ponderado entre "lo que sugiere el dato nuevo" y "lo que creíamos antes". En la versión **multiplicativa**, la estacionalidad es un factor (p. ej., diciembre = ×1,35) en lugar de una cantidad que se suma; es la adecuada cuando la oscilación crece con el nivel.

Los tres parámetros $\alpha, \beta, \gamma$ responden a la pregunta de la autoevaluación: **controlan la velocidad con la que el modelo olvida el pasado** en el nivel, la tendencia y la estacionalidad, respectivamente.

```python
from statsmodels.tsa.holtwinters import ExponentialSmoothing
hw = ExponentialSmoothing(train, trend="add", seasonal="add",
                          seasonal_periods=12).fit()
pred_hw = hw.forecast(24)
hw.params    # alpha (smoothing_level), beta, gamma, valores iniciales
```

En el notebook (sección 6), Holt-Winters aditivo obtiene el menor error del test de 24 meses (MAE 0,24 ppm) y, en el *backtesting* (sección 9), un MAE medio de 0,45 ppm, prácticamente empatado con SARIMA.

### La familia ETS

El suavizado exponencial tiene una formulación estadística moderna, los modelos **ETS** (*Error, Trend, Seasonal*), que describe cada variante con tres letras: error aditivo o multiplicativo, tendencia ninguna/aditiva/amortiguada, estacionalidad ninguna/aditiva/multiplicativa. Esta formulación aporta dos cosas: **intervalos de predicción** con base probabilística y la posibilidad de **elegir automáticamente** la mejor combinación por AIC (`ETSModel` en statsmodels, `AutoETS` en statsforecast).

**Ejemplo de negocio.** Una empresa de suministros de oficina pronostica la demanda mensual de 3.000 referencias. No puede revisar 3.000 modelos a mano. Un ETS automático por referencia, con tendencia amortiguada, es rápido, estable y casi siempre bate al ingenuo estacional; los analistas solo revisan las referencias con mayor error o mayor valor.

### Errores frecuentes

- **Usar estacionalidad aditiva con oscilaciones crecientes** (o al revés): compara ambas en el *backtesting*.
- **Fijar $\alpha$ a mano** "porque parece razonable": deja que se estime.
- **Esperar que Holt-Winters prevea cambios de régimen**: solo extrapola los patrones recientes.
- **Olvidar que la estacionalidad multiplicativa exige valores positivos** (no admite ceros, típicos en ventas de artículos poco vendidos).

> **Ideas clave**
> - El suavizado exponencial pondera el pasado con pesos que decrecen exponencialmente.
> - $\alpha$, $\beta$ y $\gamma$ controlan la velocidad de olvido de nivel, tendencia y estacionalidad.
> - Holt-Winters aditivo para oscilación constante; multiplicativo para oscilación proporcional al nivel.
> - La tendencia amortiguada es una opción prudente cuando la tendencia es incierta.
> - Practica: notebook, secciones 6 y 9; ejercicio 2.

---

## 8.6 Modelos ARIMA y SARIMA

El suavizado exponencial describe la serie a partir de sus componentes (nivel, tendencia, estacionalidad). Los modelos ARIMA parten de otra idea: describir la **autocorrelación**, es decir, cómo depende cada valor de los anteriores y de los errores anteriores. Ambas familias se solapan en parte (algunos ETS lineales equivalen a ciertos ARIMA), pero cada una cubre casos que la otra no.

### Las tres piezas de ARIMA(p, d, q)

**AR(p) — autorregresivo.** El valor actual es una combinación lineal de los $p$ anteriores:
$$y_t = c + \phi_1 y_{t-1} + \dots + \phi_p y_{t-p} + \varepsilon_t$$
Es una regresión de la serie sobre su propio pasado. Ejemplo: si hoy hay muchas incidencias abiertas, mañana también habrá muchas.

**I(d) — integrado.** Se diferencia la serie $d$ veces para hacerla estacionaria (lección 8.3) y se modela la serie diferenciada. Al pronosticar, el modelo "deshace" la diferenciación.

**MA(q) — media móvil.** El valor actual depende de los **errores de predicción** recientes:
$$y_t = c + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \dots + \theta_q \varepsilon_{t-q}$$
Captura *shocks* que se disipan en pocos periodos. Ejemplo: una promoción no registrada dispara las ventas un mes y deja un efecto residual el siguiente. (No confundir con la media móvil para suavizar una serie: son conceptos distintos con el mismo nombre.)

Combinado, sobre la serie diferenciada $y'_t$:

$$y'_t = c + \sum_{i=1}^{p} \phi_i\, y'_{t-i} + \sum_{j=1}^{q} \theta_j\, \varepsilon_{t-j} + \varepsilon_t$$

### SARIMA: la versión estacional

Las series de negocio tienen dependencia con el mismo periodo del año anterior. SARIMA añade una segunda capa de términos AR, I y MA que actúan sobre retardos múltiplos de $m$:

$$\text{SARIMA}(p,d,q)(P,D,Q)_m$$

- $(p,d,q)$: parte regular (retardos 1, 2, ...).
- $(P,D,Q)_m$: parte estacional (retardos $m$, $2m$, ...), con $D$ diferencias estacionales.

El modelo del notebook (sección 7), $(1,1,1)(0,1,1)_{12}$, se lee así: una diferencia regular y una estacional (lo que pedía la ADF), un término AR y un MA regulares, y un MA estacional. Los coeficientes estimados fueron $\phi_1 \approx 0{,}28$, $\theta_1 \approx -0{,}60$ y $\Theta_1 \approx -0{,}85$, todos significativos. Un $\Theta_1$ cercano a −1 indica que el patrón estacional es muy estable: el modelo apenas necesita corregir la estacionalidad de un año a otro.

Un caso especial famoso es $(0,1,1)(0,1,1)_{12}$, el **"modelo de las aerolíneas"** de Box y Jenkins, que funciona sorprendentemente bien en muchas series mensuales.

### Cómo elegir los órdenes

1. **Transformar** si la varianza crece (logaritmo).
2. **Elegir $d$ y $D$** con la ADF y el gráfico (casi siempre $d \le 1$, $D \le 1$).
3. **Proponer $p, q, P, Q$** mirando ACF y PACF de la serie diferenciada (lección 8.3).
4. **Comparar candidatos por AIC** (criterio de información de Akaike), que premia el ajuste y penaliza la complejidad:
   $$\text{AIC} = -2 \log L + 2k$$
   donde $L$ es la verosimilitud y $k$ el número de parámetros. Menor es mejor. Solo es comparable entre modelos con el **mismo** $d$ y $D$.
5. **Validar** con *backtesting* (lección 8.7) y **revisar los residuos**.

Los procedimientos automáticos (`auto_arima` de pmdarima, `AutoARIMA` de statsforecast) recorren esta búsqueda por ti; son útiles, pero conviene entender qué hacen.

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX
sarima = SARIMAX(train, order=(1, 1, 1), seasonal_order=(0, 1, 1, 12)).fit(disp=False)
fc = sarima.get_forecast(24)
fc.predicted_mean, fc.conf_int(alpha=0.05)    # pronóstico e IC 95 %
```

### Diagnóstico de residuos

Si el modelo ha capturado toda la estructura, los residuos deben parecer **ruido blanco**: media cero, varianza constante y sin autocorrelación. `plot_diagnostics()` (notebook, sección 10) muestra cuatro gráficos: residuos en el tiempo, histograma, gráfico Q-Q y correlograma. La prueba de **Ljung-Box** formaliza la última comprobación ($H_0$: no hay autocorrelación; un p-valor alto es buena señal). Residuos con autocorrelación indican que queda información por aprovechar.

### Intervalos de predicción

SARIMA ofrece intervalos con base probabilística. Se **ensanchan con el horizonte** porque cada paso se apoya en predicciones anteriores, también inciertas, y los errores se acumulan. Para un paseo aleatorio, la desviación típica del error a $h$ pasos crece como $\sigma\sqrt{h}$. Un intervalo del 95 % que en el mes 1 es de ±0,6 ppm puede llegar a ±1,8 ppm a los 24 meses.

**Ejemplo de negocio.** Una distribuidora eléctrica usa SARIMA para prever el consumo mensual de una región. El intervalo del 80 % le sirve para negociar contratos de compra a plazo: cubre con contratos la parte "segura" (el límite inferior) y deja la incertidumbre para el mercado diario.

### Errores frecuentes

- **Comparar AIC entre modelos con distinto orden de diferenciación** o distinta transformación: no es válido.
- **Elegir solo por AIC**: el AIC mide el ajuste dentro de la muestra, no el error de pronóstico (ejercicio 3).
- **Ignorar los residuos**: un buen AIC con residuos autocorrelacionados es un modelo incompleto.
- **Interpretar los coeficientes como efectos causales**: describen la dinámica de la serie, no por qué ocurre.

> **Ideas clave**
> - ARIMA modela la autocorrelación: AR usa valores pasados, MA errores pasados, I diferencia.
> - SARIMA añade la misma estructura sobre retardos estacionales: $(p,d,q)(P,D,Q)_m$.
> - Elige órdenes con ADF, ACF/PACF y AIC; valida con *backtesting* y residuos.
> - Los intervalos de predicción se ensanchan con el horizonte porque los errores se acumulan.
> - Practica: notebook, secciones 7, 8 y 10; ejercicios 1 y 3.

---

## 8.7 Validación temporal y métricas (MAE, MAPE)

Esta es probablemente la lección más importante del módulo. Un modelo de pronóstico mal validado da cifras de error espectaculares en la presentación y decepcionantes en producción. La causa casi siempre es la misma: **se ha filtrado información del futuro** en la evaluación.

### Por qué no sirve la partición aleatoria

En los módulos de regresión y clasificación separabas al azar un 20 % de filas para test. En una serie temporal eso significa entrenar con datos de marzo de 2001 para "predecir" febrero de 2001: el modelo conoce lo que vino después y la evaluación es demasiado optimista. En producción nunca tendrás esa ventaja.

La regla es simple: **el conjunto de entrenamiento siempre es anterior al de prueba**. En el notebook (sección 4):

```python
H = 24
train, test = serie[:-H], serie[-H:]     # los últimos 24 meses, para test
```

Lo mismo vale para cualquier transformación que "aprenda" de los datos (escalados, imputaciones, selección de variables): se calcula solo con el pasado.

### Backtesting con origen móvil

Una única partición es frágil: si los últimos dos años fueron atípicos, la conclusión depende del azar del corte. El ***backtesting* de origen móvil** (*rolling origin*, *time series cross-validation*) repite la evaluación varias veces:

```
Origen 1994: [===== entrenamiento =====][test 12m]
Origen 1995: [====== entrenamiento ======][test 12m]
Origen 1996: [======= entrenamiento =======][test 12m]
...
```

En cada corte se reentrena con todos los datos disponibles hasta ese momento y se pronostican los $h$ periodos siguientes, simulando exactamente lo que habría hecho la empresa si hubiera usado el modelo cada año. En el notebook (sección 9), con 7 orígenes (1994–2000) y horizonte 12:

| Modelo | MAE medio (ppm) |
|---|---|
| Ingenuo estacional | 1,71 |
| Holt-Winters | 0,45 |
| SARIMA | 0,44 |

Fíjate en dos cosas. Primero, en el test único Holt-Winters ganaba con claridad (0,24 frente a 0,36); en el *backtesting* empatan: la partición única exageraba la diferencia. Segundo, el error varía mucho entre orígenes (el origen 1997, que pronostica 1998, fue difícil para todos: aquel año el CO₂ creció mucho más deprisa de lo habitual, coincidiendo con el fuerte El Niño de 1997–98): la **dispersión** del error también es información útil.

Variantes: ventana **expansiva** (se acumula toda la historia, como en el notebook) o **deslizante** (solo los últimos $N$ años, útil si el pasado lejano ya no es representativo).

### Métricas de error

Sea $e_t = y_t - \hat y_t$ el error de pronóstico.

**MAE** (error absoluto medio): $\text{MAE} = \frac{1}{n}\sum |e_t|$. Está en las unidades de la serie ("nos equivocamos de media 0,44 ppm" o "120 unidades"), es fácil de explicar y robusto a valores extremos.

**RMSE** (raíz del error cuadrático medio): $\sqrt{\frac{1}{n}\sum e_t^2}$. Penaliza más los errores grandes; útil cuando un error grande es desproporcionadamente caro.

**MAPE** (error porcentual absoluto medio): $\text{MAPE} = \frac{100}{n}\sum \left|\frac{e_t}{y_t}\right|$. Sin unidades, permite comparar series de distinta escala ("un 4 % de error"). Pero tiene problemas serios: es **infinito o enorme cuando $y_t$ es cero o casi cero** (ventas de artículos de baja rotación), y penaliza de forma asimétrica.

**MASE** (error absoluto escalado): divide el MAE del modelo entre el MAE del ingenuo (estacional) dentro de la muestra. Un MASE < 1 indica que el modelo mejora a la referencia. Es la métrica recomendada para comparar muchas series heterogéneas.

**WAPE** (o MAE/media): $\sum|e_t| / \sum|y_t|$. Muy usada en retail como alternativa al MAPE porque no explota con ceros.

| Métrica | Unidades | Problema principal | Cuándo usarla |
|---|---|---|---|
| MAE | de la serie | no compara escalas | una serie, comunicación |
| RMSE | de la serie | sensible a atípicos | errores grandes muy caros |
| MAPE | % | explota con ceros | series positivas lejos de 0 |
| MASE / WAPE | relativo | menos intuitiva | muchas series, retail |

La métrica debe reflejar el **coste de negocio**. Si quedarse corto (rotura de stock) cuesta el triple que pasarse, ninguna métrica simétrica lo recoge; en ese caso se usan pérdidas asimétricas o pronósticos por cuantiles.

**Ejemplo de negocio.** Un *e-commerce* compara dos modelos de demanda por artículo: el A tiene menor MAPE, el B menor WAPE. Al investigar, descubren que el MAPE del B está inflado por cientos de artículos que venden 0 o 1 unidades al día, donde un error de 1 unidad es un "100 %". Como el negocio se juega el dinero en los artículos de alta rotación, eligen el B y reportan WAPE.

### Errores frecuentes

- **Partición aleatoria o validación cruzada estándar** (`KFold`) en series: fuga de información.
- **Calcular variables con toda la serie** (medias, escalados) antes de partir.
- **Elegir el modelo con el test y luego reportar ese mismo error**: el test deja de ser independiente. Elige con *backtesting* y reserva el test final.
- **Comparar modelos en horizontes distintos**: el error crece con el horizonte; compara siempre al mismo $h$.

> **Ideas clave**
> - El entrenamiento siempre precede a la prueba; la partición aleatoria filtra el futuro.
> - El *backtesting* de origen móvil da una estimación del error más fiable que un único corte.
> - MAE es claro y robusto; MAPE es intuitivo pero falla con valores cercanos a cero; MASE y WAPE comparan bien muchas series.
> - Elige la métrica según el coste de negocio de cada tipo de error.
> - Practica: notebook, secciones 4, 8 y 9; ejercicios 2 y 3.

---

## 8.8 Variables externas, múltiples series y modelos de machine learning

Los modelos de las lecciones anteriores son **univariantes**: pronostican una serie mirando solo su propio pasado. Funcionan bien cuando la serie es regular, pero en la empresa suele haber información adicional que conocemos de antemano (el calendario de promociones, los festivos, la previsión meteorológica) y, además, casi nunca hay una sola serie, sino cientos o miles. Esta lección es un mapa de cómo se amplía el flujo de trabajo.

### Variables externas (exógenas)

Una variable **exógena** es un factor externo que influye en la serie: precio, promociones, festivos, temperatura, gasto en publicidad. SARIMAX (la X es de *exogenous*) las incorpora como regresores:

$$y_t = \beta_1 x_{1,t} + \dots + \beta_k x_{k,t} + \eta_t, \qquad \eta_t \sim \text{SARIMA}$$

Es decir, una regresión cuyos errores siguen un SARIMA.

```python
modelo = SARIMAX(ventas, exog=df[["promo", "festivo"]],
                 order=(1, 1, 1), seasonal_order=(0, 1, 1, 7)).fit(disp=False)
modelo.forecast(14, exog=futuro[["promo", "festivo"]])   # ¡hay que conocer el futuro de x!
```

La condición crítica: **para pronosticar necesitas los valores futuros de las variables exógenas**. El calendario de festivos o las promociones planificadas se conocen; la temperatura de dentro de tres meses, no (habría que pronosticarla también, y su error se suma). Las variables que solo se conocen a posteriori (por ejemplo, el tráfico web del mismo día) son una fuente clásica de fuga de información.

### Múltiples series

Una cadena con 300 tiendas y 5.000 productos tiene 1,5 millones de series. Dos enfoques:

- **Modelos locales**: un modelo (ETS, ARIMA) por serie. Librerías como **statsforecast** (Nixtla) los ajustan de forma muy eficiente, en paralelo, con selección automática (`AutoETS`, `AutoARIMA`).
- **Modelos globales**: un único modelo (normalmente de *machine learning*) entrenado con todas las series a la vez. Aprende patrones compartidos y funciona mejor con series cortas o productos nuevos.

Además, las series suelen estar organizadas en **jerarquías** (producto → categoría → total; tienda → región → país). Los pronósticos deben **cuadrar**: la suma de las tiendas debe coincidir con el total. Las técnicas de **reconciliación jerárquica** ajustan los pronósticos de todos los niveles para que sean coherentes.

### Machine learning para series temporales

Los modelos de *gradient boosting* (LightGBM, XGBoost) o las redes neuronales pueden pronosticar si transformamos la serie en una tabla supervisada. Cada fila es un instante $t$ y las columnas son **variables construidas a partir del pasado**:

| fecha | ventas (objetivo) | lag_1 | lag_7 | media_7d | día_semana | promo |
|---|---|---|---|---|---|---|
| 2026-03-08 | 152 | 140 | 149 | 143,6 | dom | 0 |

- **Retardos** (*lags*): $y_{t-1}, y_{t-7}, y_{t-365}$.
- **Estadísticos móviles**: media o desviación de los últimos 7 o 28 días (calculados **solo con el pasado**).
- **Calendario**: día de la semana, mes, festivo, días hasta Navidad.
- **Exógenas**: precio, promoción, meteorología.

Para pronosticar varios pasos hay dos estrategias: **recursiva** (predecir $t+1$, usar esa predicción como retardo para $t+2$, etc.) o **directa** (un modelo distinto para cada horizonte). Librerías como **skforecast** o **mlforecast** automatizan la construcción de variables y el *backtesting* sin fugas.

¿Cuándo compensa? El ML suele ganar con **muchas series**, **muchas variables exógenas** y relaciones no lineales (efectos de promociones que interactúan con el día de la semana). Con una sola serie mensual de pocos años, como el CO₂, los modelos clásicos suelen ser iguales o mejores, más rápidos y más fáciles de explicar. En competiciones de referencia como las M de Makridakis, los ganadores recientes han combinado modelos de *gradient boosting* globales con buenas variables, pero los métodos estadísticos sencillos siguen siendo referencias difíciles de batir.

### Modelos fundacionales

Desde 2023 han aparecido **modelos fundacionales de series temporales**, preentrenados con millones de series (TimeGPT de Nixtla, Chronos de Amazon, TimesFM de Google, entre otros). Pronostican series nuevas sin entrenamiento específico (*zero-shot*). Son prometedores como punto de partida rápido, pero se evalúan exactamente igual: *backtesting* y comparación con las referencias ingenuas.

### Combinar pronósticos

Un resultado empírico muy robusto: **promediar** pronósticos de modelos distintos (por ejemplo, ETS + ARIMA + ingenuo estacional) suele ser más preciso y estable que elegir el "mejor" de ellos, porque los errores de los modelos se compensan parcialmente.

**Ejemplo de negocio.** Una cadena de restauración pronostica comensales diarios por local para planificar compras de producto fresco. Un ETS por local da un WAPE del 14 %. Un LightGBM global con retardos, festivos locales, partidos de fútbol y previsión de lluvia baja al 10 %. La mejora se debe sobre todo a las variables externas, no al algoritmo: un SARIMAX con las mismas variables queda en el 11 %.

### Errores frecuentes

- **Usar exógenas que no se conocerán en el momento de pronosticar.**
- **Calcular medias móviles que incluyen el valor actual**: fuga de información.
- **Saltar al deep learning sin referencias**: compara siempre con ETS/ARIMA y el ingenuo estacional.
- **Pronósticos incoherentes entre niveles** de la jerarquía, que generan desconfianza en negocio.

> **Ideas clave**
> - SARIMAX añade variables exógenas, pero exige conocer su valor futuro.
> - Con muchas series, usa librerías eficientes (statsforecast) o modelos globales de ML.
> - El ML convierte la serie en tabla con retardos, ventanas móviles y calendario, siempre sin mirar al futuro.
> - Promediar modelos distintos suele mejorar la precisión.
> - Cualquier método nuevo, por sofisticado que sea, se valida con *backtesting* frente a las referencias.

---

## Glosario

- **ACF / función de autocorrelación** (*autocorrelation function*): correlación de la serie consigo misma desplazada $k$ periodos, para cada $k$.
- **AIC / criterio de información de Akaike** (*Akaike information criterion*): medida de ajuste penalizada por complejidad; menor es mejor.
- **Backtesting / validación de origen móvil** (*rolling-origin evaluation*): repetir entrenamiento y pronóstico en varios cortes temporales sucesivos.
- **Componente estacional** (*seasonal component*): patrón que se repite con un periodo fijo y conocido.
- **Deriva** (*drift*): método de referencia que extrapola la pendiente media histórica.
- **Descomposición STL** (*Seasonal-Trend decomposition using Loess*): separación de la serie en tendencia, estacionalidad y residuo mediante suavizados locales.
- **Diferenciación** (*differencing*): restar a cada valor el anterior (o el del mismo periodo del ciclo previo) para eliminar tendencia o estacionalidad.
- **Estacionariedad** (*stationarity*): propiedad de una serie cuya media, varianza y autocorrelación no cambian en el tiempo.
- **Fuga de información** (*data leakage*): uso, en el entrenamiento o la evaluación, de datos que no estarían disponibles en el momento de pronosticar.
- **Horizonte** (*forecast horizon*): número de periodos hacia delante que se pronostican.
- **Intervalo de predicción** (*prediction interval*): rango que contiene el valor futuro con una probabilidad dada.
- **MAE / error absoluto medio** (*mean absolute error*): media de los errores en valor absoluto.
- **MAPE / error porcentual absoluto medio** (*mean absolute percentage error*): media de los errores absolutos relativos al valor real, en %.
- **Método ingenuo estacional** (*seasonal naïve method*): pronostica cada periodo con el valor del mismo periodo del ciclo anterior.
- **PACF / función de autocorrelación parcial** (*partial autocorrelation function*): autocorrelación en el retardo $k$ descontando los retardos intermedios.
- **Ruido blanco** (*white noise*): serie sin autocorrelación, de media cero y varianza constante.
- **SARIMA** (*seasonal ARIMA*): modelo autorregresivo integrado de medias móviles con términos estacionales.
- **Suavizado exponencial / Holt-Winters** (*exponential smoothing / Holt-Winters method*): pronóstico con pesos decrecientes hacia el pasado para nivel, tendencia y estacionalidad.
- **Tendencia amortiguada** (*damped trend*): tendencia cuya pendiente se aplana progresivamente con el horizonte.
- **Variable exógena** (*exogenous variable / regressor*): factor externo a la serie que se usa para pronosticarla.
