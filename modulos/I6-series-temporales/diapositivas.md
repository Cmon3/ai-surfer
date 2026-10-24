---
marp: true
theme: default
paginate: true
math: mathjax
title: Módulo I6 · Analítica predictiva con series temporales
---

<!-- _class: lead -->

# Módulo I6
## Analítica predictiva con series temporales

Ciencia de Datos e IA Aplicada: de los datos a las decisiones
N2 · Intermedio

---

<!-- _class: lead -->

# 8.1
## Series temporales en la empresa: demanda, ventas, capacidad

---

<!-- 8.1-1 -->

## Detrás de cada decisión, una serie temporal

- ¿Cuántos yogures pide cada tienda el martes?
- ¿Cuántas personas en el turno del sábado?
- ¿Qué capacidad contratamos en la nube?
- ¿Qué presupuesto de ventas comprometemos?

**Serie temporal**: observaciones $y_1, y_2, \dots, y_T$ a intervalos regulares.
El **orden** es información: nunca se baraja.

---

<!-- 8.1-2 -->

## El horizonte lo dicta la decisión

| Horizonte | Decisión | Granularidad |
|---|---|---|
| Corto (horas–semanas) | turnos, reposición | horaria / diaria |
| Medio (1–18 meses) | compras, presupuesto | semanal / mensual |
| Largo (años) | almacén, planta | trimestral / anual |

Cuanto más lejos, más se agrega y más pesa el juicio experto.

---

<!-- 8.1-3 -->

## Pronóstico ≠ objetivo ≠ plan

| | Pregunta | Ejemplo |
|---|---|---|
| **Pronóstico** | ¿Qué pasará si nada cambia? | 10.000 uds. |
| **Objetivo** | ¿Qué nos gustaría? | 12.000 uds. |
| **Plan** | ¿Qué haremos? | campaña en marzo |

Si "ajustas" el pronóstico al objetivo, deja de servir para planificar.

---

<!-- 8.1-4 -->

## ¿Qué hace predecible una serie?

1. Entendemos los factores que la mueven
2. Hay datos suficientes (varios ciclos completos)
3. El futuro se parecerá al pasado
4. El pronóstico no altera el resultado

Consumo eléctrico: muy predecible · precio de una acción mañana: casi nada

---

<!-- 8.1-5 -->

## Series temporales en pandas

```python
co2 = sm.datasets.co2.load_pandas().data["co2"]   # semanal
serie = co2.resample("MS").mean().interpolate()   # mensual
serie.index.freq = "MS"
```

- `DatetimeIndex` + frecuencia declarada
- Ventas → agregar con **suma**; concentraciones y precios → **media**
- Caso del módulo: CO₂ en Mauna Loa, 526 meses (1958–2001)

---

<!-- 8.1-6 -->

## El flujo de trabajo del módulo

```
Datos → Visualizar y descomponer → Estacionariedad / ACF
      → Partición temporal → Referencias ingenuas
      → Modelos (Holt-Winters, SARIMA)
      → Backtesting → Diagnóstico de residuos
      → Pronóstico final + intervalo
```

Un pronóstico útil siempre lleva su **incertidumbre**.

---

<!-- _class: lead -->

# 8.2
## Componentes y descomposición (STL)

---

<!-- 8.2-1 -->

## Tres movimientos superpuestos

- **Tendencia** $T_t$: evolución a largo plazo
- **Estacionalidad** $S_t$: patrón con periodo fijo $m$
  - 12 (mensual), 7 (diario), 24 (horario)
- **Residuo** $R_t$: lo que queda; idealmente, ruido

---

<!-- 8.2-2 -->

## ¿Aditiva o multiplicativa?

$$y_t = T_t + S_t + R_t \qquad\qquad y_t = T_t \times S_t \times R_t$$

| Si la oscilación estacional... | Usa |
|---|---|
| tiene amplitud constante | aditiva |
| crece con el nivel | multiplicativa |

Truco: $\log(T \cdot S \cdot R) = \log T + \log S + \log R$

---

<!-- 8.2-3 -->

## Cómo funciona STL

1. Estima la tendencia con suavizado local (*loess*)
2. Resta la tendencia; suaviza cada "mes" a lo largo de los años → estacionalidad
3. Resta la estacionalidad y vuelve a estimar la tendencia
4. Repite hasta estabilizar

Ventajas: estacionalidad que **evoluciona**, sin perder extremos, versión **robusta** a atípicos

---

<!-- 8.2-4 -->

## STL en el notebook

```python
from statsmodels.tsa.seasonal import STL
stl = STL(serie, period=12).fit()
stl.plot()
```

- Tendencia: subida casi lineal, algo acelerada
- Estacionalidad: ciclo anual de ~6 ppm (vegetación del hemisferio norte)
- Residuo: pequeño, sin patrón

---

<!-- 8.2-5 -->

## ¿Cuánta estacionalidad hay?

$$F_S = \max\left(0,\; 1 - \frac{\operatorname{Var}(R_t)}{\operatorname{Var}(S_t + R_t)}\right)$$

- $F_S \approx 1$: estacionalidad fuerte
- $F_S \approx 0$: débil
- Igual para la tendencia, con $T_t + R_t$

Con miles de productos: clasifica y elige modelo por grupo

---

<!-- 8.2-6 -->

## Usos en la empresa

- **Desestacionalizar**: ¿vamos mejor o peor *de lo normal* para esta época?
- **Detectar anomalías**: residuos enormes = días raros
- **Comunicar**: la tendencia limpia se entiende en un comité

Hotel: agosto +5 % vs. julio... pero lo normal es +12 % → la tendencia cae

---

<!-- 8.2-7 -->

## Errores frecuentes

- Periodo mal elegido (datos diarios: 7 **y** 365 → MSTL)
- Aditiva con oscilaciones crecientes → residuo en "embudo"
- Usar STL como si fuera un modelo de pronóstico

---

<!-- _class: lead -->

# 8.3
## Estacionariedad, diferenciación y autocorrelación

---

<!-- 8.3-1 -->

## ¿Qué es una serie estacionaria?

- Media constante
- Varianza constante
- Relación entre $y_t$ e $y_{t-k}$ depende solo de $k$

*Si tapas el eje del tiempo, no sabrías en qué época estás.*

Tendencia o estacionalidad ⇒ **no** estacionaria

---

<!-- 8.3-2 -->

## Diferenciar para estabilizar

$$\nabla y_t = y_t - y_{t-1} \qquad \nabla_{12}\, y_t = y_t - y_{t-12}$$

- Regular: elimina la tendencia
- Estacional: elimina la estacionalidad
- Log + diferencia ≈ tasa de crecimiento
- Casi nunca hace falta más de $d=1$, $D=1$

---

<!-- 8.3-3 -->

## Prueba ADF (Dickey-Fuller aumentada)

$H_0$: **no** estacionaria · p-valor < 0,05 ⇒ estacionaria

| Serie de CO₂ | p-valor ADF |
|---|---|
| Original | 0,9989 |
| 1.ª diferencia | 0,0001 |
| 1.ª dif. + dif. estacional | < 0,0001 |

p-valor alto ≠ "es estacionaria" (es al revés)

---

<!-- 8.3-4 -->

## ACF y PACF

$$r_k = \frac{\sum_{t=k+1}^{T} (y_t - \bar y)(y_{t-k} - \bar y)}{\sum_{t=1}^{T} (y_t - \bar y)^2}$$

- **ACF**: correlación con la serie desplazada $k$ periodos
- **PACF**: lo mismo, descontando los retardos intermedios
- Bandas: $\pm 1{,}96/\sqrt{T}$

---

<!-- 8.3-5 -->

## Cómo leer los correlogramas

| Patrón | Indica |
|---|---|
| ACF decae muy lento | tendencia: diferencia |
| Picos en 12, 24, 36 | estacionalidad anual |
| PACF se corta en $p$ | AR($p$) |
| ACF se corta en $q$ | MA($q$) |

Siempre sobre la serie **ya diferenciada**

---

<!-- 8.3-6 -->

## El caso del CO₂

```python
d = serie.diff().diff(12).dropna()
plot_acf(d, lags=36); plot_pacf(d, lags=36)
```

- Pico negativo en el retardo 1 → MA regular
- Pico en el retardo 12 → MA estacional
- Encaja con $(1,1,1)(0,1,1)_{12}$

---

<!-- 8.3-7 -->

## Errores frecuentes

- Leer la ADF al revés
- Identificar ARIMA con la ACF de la serie original
- Sobrediferenciar (pico ≈ −0,5 en el retardo 1)
- Olvidar `dropna()` tras diferenciar

---

<!-- _class: lead -->

# 8.4
## Métodos de referencia: ingenuo, estacional, deriva

---

<!-- 8.4-1 -->

## La pregunta incómoda

> ¿Qué error cometería la regla más tonta posible?

- Si tu modelo no la mejora, no aporta valor
- En series, las referencias son **difíciles de batir**
- Se calculan **solo** con el entrenamiento

---

<!-- 8.4-2 -->

## Cuatro referencias

| Método | Pronóstico |
|---|---|
| Ingenuo | $\hat y_{T+h} = y_T$ |
| Ingenuo estacional | mismo mes del último año |
| Deriva | $y_T + h\,\frac{y_T - y_1}{T-1}$ |
| Estacional + deriva | mismo mes del año pasado + subida media anual |

---

<!-- 8.4-3 -->

## En código

```python
ingenuo = np.repeat(train.iloc[-1], H)
ingenuo_estacional = np.tile(train.iloc[-12:].values, H // 12)
deriva = train.iloc[-1] + (train.iloc[-1] - train.iloc[0]) \
         / (len(train) - 1) * np.arange(1, H + 1)
subida_anual = (train.iloc[-12:].values
                - train.iloc[-24:-12].values).mean()
```

---

<!-- 8.4-4 -->

## Resultados en el test de 24 meses

| Método | MAE (ppm) |
|---|---|
| Ingenuo | 2,42 |
| Deriva | 1,91 |
| Ingenuo estacional | 1,88 |
| Estacional + deriva | 0,56 |
| SARIMA | 0,36 |
| Holt-Winters | 0,24 |

---

<!-- 8.4-5 -->

## Medir la mejora: *skill score*

$$\text{Skill} = 1 - \frac{\text{error del modelo}}{\text{error de la referencia}}$$

- Holt-Winters vs. estacional + deriva: $1 - 0{,}24/0{,}56 \approx 0{,}57$
- Skill < 0 ⇒ el modelo es **peor** que la referencia
- "57 % menos error" se entiende mejor que "0,24 ppm"

---

<!-- 8.4-6 -->

## Por qué son imprescindibles

- Dan **escala** al error
- Detectan modelos **inútiles**
- Detectan **errores de código** (desfases, fugas)
- Son **explicables**: "lo del año pasado + 3 %"

Moda: modelo 18 % MAPE vs. "lo de la temporada pasada" 19 % → no compensa

---

<!-- _class: lead -->

# 8.5
## Suavizado exponencial y Holt-Winters

---

<!-- 8.5-1 -->

## Entre el ingenuo y la media

- Ingenuo: solo la última observación
- Media: todo el pasado pesa igual
- **Suavizado exponencial**: todo el pasado, con pesos que **decrecen exponencialmente**

---

<!-- 8.5-2 -->

## Suavizado exponencial simple

$$\ell_t = \alpha\, y_t + (1-\alpha)\, \ell_{t-1} \qquad \hat y_{t+h} = \ell_t$$

| $\alpha$ | hoy | hace 1 | hace 2 | hace 5 |
|---|---|---|---|---|
| 0,8 | 0,80 | 0,16 | 0,03 | 0,0003 |
| 0,2 | 0,20 | 0,16 | 0,13 | 0,07 |

$\alpha$ alto: olvida deprisa · $\alpha$ bajo: promedia mucho

---

<!-- 8.5-3 -->

## Holt: nivel + pendiente

$$\ell_t = \alpha\, y_t + (1-\alpha)(\ell_{t-1} + b_{t-1})$$
$$b_t = \beta\, (\ell_t - \ell_{t-1}) + (1-\beta)\, b_{t-1}$$

**Tendencia amortiguada** ($0<\phi<1$):
$$\hat y_{t+h} = \ell_t + (\phi + \phi^2 + \dots + \phi^h)\, b_t$$

---

<!-- 8.5-4 -->

## Holt-Winters aditivo

$$s_t = \gamma\,(y_t - \ell_{t-1} - b_{t-1}) + (1-\gamma)\, s_{t-m}$$
$$\hat y_{t+h} = \ell_t + h\, b_t + s_{t+h-m(k+1)}$$

- Cada componente: "lo que dice el dato nuevo" vs. "lo que creíamos"
- $\alpha, \beta, \gamma$: velocidad de olvido de nivel, tendencia y estacionalidad

---

<!-- 8.5-5 -->

## Aditivo vs. multiplicativo

| | Estacionalidad | Ejemplo |
|---|---|---|
| Aditivo | +3 ppm en mayo | CO₂ |
| Multiplicativo | ×1,35 en diciembre | ventas que crecen |

Multiplicativo: solo valores **positivos** (sin ceros)

---

<!-- 8.5-6 -->

## En el notebook

```python
hw = ExponentialSmoothing(train, trend="add", seasonal="add",
                          seasonal_periods=12).fit()
pred_hw = hw.forecast(24)
```

- Test 24 meses: **MAE 0,24 ppm** (el mejor)
- Backtesting 12 meses: **0,45 ppm** (empate con SARIMA)
- Los parámetros se **estiman**, no se fijan a ojo

---

<!-- 8.5-7 -->

## La familia ETS

**E**rror · **T**endencia · e**S**tacionalidad

- Error: aditivo / multiplicativo
- Tendencia: ninguna / aditiva / amortiguada
- Estacionalidad: ninguna / aditiva / multiplicativa

Aporta intervalos probabilísticos y selección automática por AIC (`ETSModel`, `AutoETS`)

---

<!-- 8.5-8 -->

## Errores frecuentes

- Estacionalidad aditiva con oscilaciones que crecen
- Fijar $\alpha$ "a ojo"
- Esperar que anticipe cambios de régimen
- Multiplicativo con ceros en la serie

---

<!-- _class: lead -->

# 8.6
## Modelos ARIMA y SARIMA

---

<!-- 8.6-1 -->

## Las tres piezas

| Pieza | Idea | Ejemplo |
|---|---|---|
| **AR**(p) | depende de valores pasados | incidencias abiertas |
| **I**(d) | se diferencia $d$ veces | eliminar tendencia |
| **MA**(q) | depende de errores pasados | efecto de un *shock* |

MA aquí ≠ media móvil para suavizar

---

<!-- 8.6-2 -->

## ARIMA(p, d, q)

Sobre la serie diferenciada $y'_t$:

$$y'_t = c + \sum_{i=1}^{p} \phi_i\, y'_{t-i} + \sum_{j=1}^{q} \theta_j\, \varepsilon_{t-j} + \varepsilon_t$$

Modela la **autocorrelación**, no los componentes

---

<!-- 8.6-3 -->

## SARIMA: añadir la capa estacional

$$\text{SARIMA}(p,d,q)(P,D,Q)_m$$

- $(p,d,q)$: retardos 1, 2, ...
- $(P,D,Q)_m$: retardos $m$, $2m$, ...
- "Modelo de las aerolíneas": $(0,1,1)(0,1,1)_{12}$

---

<!-- 8.6-4 -->

## El modelo del notebook: $(1,1,1)(0,1,1)_{12}$

| Coeficiente | Estimación | p-valor |
|---|---|---|
| $\phi_1$ (AR) | 0,28 | 0,012 |
| $\theta_1$ (MA) | −0,60 | < 0,001 |
| $\Theta_1$ (MA estacional) | −0,85 | < 0,001 |

$\Theta_1$ cerca de −1 ⇒ patrón estacional muy estable

---

<!-- 8.6-5 -->

## Cómo elegir los órdenes

1. Transformar (log) si la varianza crece
2. $d$, $D$ con ADF y gráfico
3. $p, q, P, Q$ con ACF / PACF
4. Comparar por AIC: $\;\text{AIC} = -2 \log L + 2k$
5. Validar con backtesting y residuos

AIC solo comparable con **igual** $d$, $D$ y transformación

---

<!-- 8.6-6 -->

## En código

```python
sarima = SARIMAX(train, order=(1, 1, 1),
                 seasonal_order=(0, 1, 1, 12)).fit(disp=False)
fc = sarima.get_forecast(24)
fc.predicted_mean          # pronóstico
fc.conf_int(alpha=0.05)    # IC 95 %
sarima.plot_diagnostics()
```

---

<!-- 8.6-7 -->

## Diagnóstico de residuos

Residuos ≈ **ruido blanco**:

- Media cero, varianza constante
- Sin autocorrelación (Ljung-Box: p-valor alto = bien)
- Histograma y Q-Q cercanos a la normal

Si queda autocorrelación, queda información sin usar

---

<!-- 8.6-8 -->

## Intervalos que se ensanchan

- Cada paso usa predicciones anteriores, también inciertas
- Paseo aleatorio: error típico a $h$ pasos $\propto \sigma\sqrt{h}$
- CO₂ (ej. 1): ±0,6 ppm el mes 1 → ±1,8 ppm el mes 24

Comunica el intervalo **del horizonte que se va a usar**

---

<!-- _class: lead -->

# 8.7
## Validación temporal y métricas (MAE, MAPE)

---

<!-- 8.7-1 -->

## Partición aleatoria = fuga del futuro

- Entrenar con marzo para "predecir" febrero
- Evaluación demasiado optimista
- En producción nunca tendrás esa ventaja

**Regla**: el entrenamiento siempre es **anterior** a la prueba

---

<!-- 8.7-2 -->

## Partición temporal

```python
H = 24
train, test = serie[:-H], serie[-H:]
```

- También para escalados, imputaciones, selección de variables
- Elige con *backtesting*; reserva el test final

---

<!-- 8.7-3 -->

## Backtesting de origen móvil

```
1994: [====== entrenamiento ======][test 12m]
1995: [======= entrenamiento =======][test 12m]
1996: [======== entrenamiento ========][test 12m]
 ...
2000: [=========== entrenamiento ===========][test 12m]
```

Ventana **expansiva** (notebook) o **deslizante** (últimos $N$ años)

---

<!-- 8.7-4 -->

## Resultados del backtesting (7 orígenes)

| Modelo | MAE medio (ppm) |
|---|---|
| Ingenuo estacional | 1,71 |
| Holt-Winters | 0,45 |
| SARIMA | 0,44 |

- El test único exageraba la ventaja de Holt-Winters
- El error varía entre orígenes: 1998 fue difícil para todos

---

<!-- 8.7-5 -->

## Métricas de error

$$\text{MAE} = \frac{1}{n}\sum |e_t| \qquad \text{RMSE} = \sqrt{\frac{1}{n}\sum e_t^2}$$

$$\text{MAPE} = \frac{100}{n}\sum \left|\frac{e_t}{y_t}\right| \qquad \text{MASE} = \frac{\text{MAE}}{\text{MAE}_\text{ingenuo}}$$

---

<!-- 8.7-6 -->

## ¿Cuál usar?

| Métrica | Unidades | Problema | Cuándo |
|---|---|---|---|
| MAE | de la serie | no compara escalas | una serie |
| RMSE | de la serie | sensible a atípicos | errores grandes caros |
| MAPE | % | explota con ceros | series lejos de 0 |
| MASE / WAPE | relativo | menos intuitiva | muchas series |

---

<!-- 8.7-7 -->

## La métrica refleja el coste

- ¿Quedarse corto cuesta el triple que pasarse? → pérdida asimétrica o cuantiles
- *E-commerce*: MAPE inflado por artículos que venden 0–1 uds.
- Elegir la métrica es una decisión **de negocio**

---

<!-- 8.7-8 -->

## Errores frecuentes

- `KFold` o partición aleatoria en series
- Calcular variables con toda la serie antes de partir
- Elegir con el test y reportar ese mismo error
- Comparar modelos en horizontes distintos

---

<!-- _class: lead -->

# 8.8
## Variables externas, múltiples series y modelos de machine learning

---

<!-- 8.8-1 -->

## Más allá del modelo univariante

- Hasta ahora: la serie solo mira **su propio pasado**
- En la empresa conocemos más: promociones, festivos, meteorología
- Y casi nunca hay **una** serie, sino miles

---

<!-- 8.8-2 -->

## SARIMAX: variables exógenas

$$y_t = \beta_1 x_{1,t} + \dots + \beta_k x_{k,t} + \eta_t, \quad \eta_t \sim \text{SARIMA}$$

```python
SARIMAX(ventas, exog=df[["promo", "festivo"]], ...)
modelo.forecast(14, exog=futuro[["promo", "festivo"]])
```

⚠️ Necesitas los valores **futuros** de las exógenas

---

<!-- 8.8-3 -->

## Muchas series: local vs. global

| Enfoque | Qué es | Cuándo |
|---|---|---|
| **Local** | un modelo por serie (ETS, ARIMA) | series largas y regulares |
| **Global** | un modelo para todas (ML) | series cortas, productos nuevos |

statsforecast: `AutoETS`, `AutoARIMA` para miles de series

---

<!-- 8.8-4 -->

## Jerarquías y coherencia

```
            Total
         /         \
   Región N       Región S
   /     \        /     \
 T1      T2      T3      T4
```

La suma de las tiendas debe cuadrar con el total → **reconciliación jerárquica**

---

<!-- 8.8-5 -->

## Machine learning: la serie como tabla

| ventas | lag_1 | lag_7 | media_7d | día | promo |
|---|---|---|---|---|---|
| 152 | 140 | 149 | 143,6 | dom | 0 |

- Retardos, ventanas móviles (**solo pasado**), calendario, exógenas
- LightGBM, XGBoost, redes; skforecast, mlforecast

---

<!-- 8.8-6 -->

## ¿Recursiva o directa? ¿Cuándo compensa?

- **Recursiva**: predice $t+1$ y lo usa como retardo para $t+2$
- **Directa**: un modelo por horizonte
- ML gana con: muchas series, muchas exógenas, no linealidades
- Una serie mensual corta: los clásicos suelen bastar

---

<!-- 8.8-7 -->

## Modelos fundacionales y combinación

- Preentrenados con millones de series: TimeGPT, Chronos, TimesFM
- Pronóstico *zero-shot*… que se evalúa **igual**: backtesting + referencias
- **Promediar** modelos distintos suele mejorar la precisión

---

<!-- 8.8-8 -->

## Cierre del módulo y caso práctico

- Pronóstico a 24 meses con intervalo (ejercicio 1)
- Error esperado según el backtesting
- Mejora frente a la referencia ingenua
- 3 frases para un responsable no técnico

Opcional: aplica el flujo a una serie de tu empresa (ejercicio 4)
