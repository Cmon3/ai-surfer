---
marp: true
theme: default
paginate: true
math: mathjax
title: Módulo 01 · Estadística para la toma de decisiones
---

<!-- _class: lead -->

# Módulo 01
## Estadística para la toma de decisiones

¿Cuánto me puedo fiar de lo que veo en una muestra?

Semana 2 · Ciencia de Datos e IA Aplicada

---

<!-- _class: lead -->

# 1.1
## Población, muestra y por qué la incertidumbre importa en los negocios

---

<!-- 1.1-1 -->

## La pregunta del director comercial

> «¿Cuál es el importe medio de un pedido?»

- Tenemos **200 pedidos**: media = **28,08 €**
- Otro analista, otros 200 pedidos → otra cifra
- Nadie ha calculado mal: **cada muestra cuenta una versión distinta**
- La pregunta útil: **¿cuánto es y cuánto podemos fiarnos?**

---

<!-- 1.1-2 -->

## Población y muestra

| | Describe… | Notación | En el caso |
|---|---|---|---|
| **Parámetro** | la población (fijo, desconocido) | $\mu,\ \sigma,\ p$ | media real: 27,79 € |
| **Estadístico** | la muestra (varía) | $\bar x,\ s,\ \hat p$ | media de 200: 28,08 € |

Inferencia = usar estadísticos para decir algo **responsable** sobre parámetros

---

<!-- 1.1-3 -->

## ¿Por qué no medirlo todo?

- **Coste y tiempo**: encuestas, auditorías, inspecciones
- **Destrucción**: pruebas que rompen el producto
- **El futuro**: los datos de 2025 son una muestra del proceso de 2026
- **Experimentos**: el 10 % que ve la nueva interfaz es una muestra

---

<!-- 1.1-4 -->

## Dos errores muy distintos

| | Error aleatorio | Sesgo |
|---|---|---|
| Origen | azar del muestreo | muestra no representativa |
| ¿Baja con más datos? | **Sí** ($\propto 1/\sqrt n$) | **No** |
| ¿Se puede cuantificar? | Sí: EE, IC | Difícil |
| Defensa | más $n$ | **muestreo aleatorio** |

Un millón de pedidos de viernes noche siguen siendo de viernes noche

---

<!-- 1.1-5 -->

## La incertidumbre es dinero

- **Pedido mínimo** fijado con un ticket medio mal estimado
- **Campaña «ganadora»** por 0,3 puntos en una muestra pequeña
- **Flota** dimensionada con la media, sin mirar la variabilidad

Regla del curso: **toda estimación va con su margen de error**

---

<!-- 1.1-6 -->

## Ideas clave 1.1

- Población (lo que interesa) ≠ muestra (lo que ves)
- Parámetros fijos y desconocidos; estadísticos variables
- Más datos reducen el error aleatorio, **no el sesgo**
- Aleatorizar es la mejor defensa contra el sesgo

Practica: Notebook, sección 2

---

<!-- _class: lead -->

# 1.2
## Variables aleatorias y distribuciones

---

<!-- 1.2-1 -->

## Variable aleatoria

Un número asociado a un resultado incierto

- Importe del próximo pedido → **continua** (densidad)
- Pedidos entre 21:00 y 22:00 → **discreta** (probabilidad)
- ¿Compra? 1/0 → **Bernoulli**

Resúmenes: media $E[X]=\mu$, varianza $\sigma^2$, desviación típica $\sigma$

---

<!-- 1.2-2 -->

## Binomial: éxitos en $n$ intentos

$$P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$$

$$E[X]=np \qquad \text{Var}(X)=np(1-p)$$

- Conversiones de una campaña, clics, abandonos
- 20 envíos, $p=0{,}1$ → esperamos 2; $P(0) \approx 0{,}12$
- Supone intentos **independientes** con la misma $p$

---

<!-- 1.2-3 -->

## Poisson: conteos por intervalo

$$P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!} \qquad E[X]=\text{Var}(X)=\lambda$$

- Pedidos por hora, incidencias por día
- Rasgo: **media = varianza**
- Varianza ≫ media → sobredispersión (picos, festivos, grupos)

---

<!-- 1.2-4 -->

## Normal: sumas y medias

- Parámetros $\mu$ y $\sigma$; simétrica
- Regla 68 – 95 – 99,7 % a 1, 2 y 3 $\sigma$
- Aparece al sumar muchos efectos pequeños
- Sobre todo: **distribución de las medias muestrales** (TCL)

**Ojo:** Importes, tiempos y conteos casi nunca son normales

---

<!-- 1.2-5 -->

## Exponencial: tiempos de espera

- Minutos hasta el siguiente pedido
- Ritmo $\lambda$ de Poisson → espera media $1/\lambda$
- Muy asimétrica: muchas esperas cortas, pocas largas
- **Sin memoria**: lo que falta no depende de lo ya esperado

---

<!-- 1.2-6 -->

## Log-normal: cantidades positivas asimétricas

- $\log X$ es normal; efectos que se **multiplican**
- Importes, salarios, duración de sesiones
- Cola derecha → **media > mediana**

| `lognormal(3.2, 0.5)` | Valor |
|---|---|
| Mediana $e^{3,2}$ | ≈ 24,5 € |
| Media $e^{3,2+0,5^2/2}$ | ≈ 27,8 € |

---

<!-- 1.2-7 -->

## En Python: `scipy.stats`

```python
from scipy import stats
stats.binom(n=20, p=0.1).pmf(0)   # ≈ 0,12
stats.poisson(mu=4).sf(7)         # P(>7 pedidos/h) ≈ 0,05
stats.expon(scale=5).cdf(2)       # P(espera < 2 min) ≈ 0,33
```

- «¿Qué probabilidad hay de…?» → `cdf` / `sf`
- «¿Qué valor no se supera el 95 %?» → `ppf`

---

<!-- 1.2-8 -->

## ¿Qué distribución elijo?

| Variable | Modelo de partida |
|---|---|
| Éxitos / fracasos | Binomial |
| Conteo por intervalo | Poisson |
| Tiempo de espera | Exponencial |
| Cantidad positiva asimétrica | Log-normal |
| Media de muchas observaciones | Normal |

Después: **comprueba** con histograma y gráfico Q-Q

Practica: Notebook, sección 1

---

<!-- _class: lead -->

# 1.3
## Ley de los grandes números y teorema central del límite

---

<!-- 1.3-1 -->

## Ley de los grandes números

$$\bar x_n=\frac{1}{n}\sum_{i=1}^{n}x_i \;\longrightarrow\; \mu \quad (n\to\infty)$$

- 10 pedidos: la media salta
- 1 000 pedidos: oscila poco
- 5 000 pedidos: pegada a 27,79 €

**Lo individual es incierto; lo agregado es estable**

---

<!-- 1.3-2 -->

## Lo que la LGN NO dice

- **No:** «Tres días malos → le toca uno bueno» (**falacia del jugador**)
- La LGN habla del largo plazo, no de compensaciones
- Dice *que* converge, no *a qué velocidad*

→ La velocidad la da el **TCL**

---

<!-- 1.3-3 -->

## Teorema central del límite

Si las observaciones son independientes con varianza finita $\sigma^2$:

$$\bar x \;\approx\; \mathcal N\!\left(\mu,\ \frac{\sigma^2}{n}\right)$$

**Sea cual sea** la forma de la distribución original

Desviación típica de $\bar x$ = $\sigma/\sqrt n$ = **error estándar**

---

<!-- 1.3-4 -->

## El TCL en el notebook

| $n$ | Forma de $\bar x$ | EE $=\sigma/\sqrt n$ |
|---|---|---|
| 2 | aún asimétrica | ≈ 10,5 € |
| 10 | casi simétrica | ≈ 4,7 € |
| 100 | prácticamente normal | ≈ 1,5 € |

$\sigma \approx 14{,}8$ € (pedidos log-normales)

---

<!-- 1.3-5 -->

## Intuición y consecuencia

- Al promediar, grandes y pequeños se **compensan**
- Una media extrema exige muchos extremos **a la vez**
- El error baja con $\sqrt n$, no con $n$

$$\text{error}/2 \;\Rightarrow\; n \times 4$$

---

<!-- 1.3-6 -->

## Límites del TCL

- «$n$ suficiente» depende de la **asimetría** ($n\ge30$ es orientativo)
- Necesita **independencia** (ojo: varios pedidos por cliente, series)
- Colas extremadamente pesadas → cuidado
- Habla de la **media**, no de los datos individuales

---

<!-- 1.3-7 -->

## Ejemplo: alarma en una tienda

Gasto por cliente: $\mu=42$ €, $\sigma=30$ €, 400 clientes/día

$$EE=\frac{30}{\sqrt{400}}=1{,}5 \text{ €}$$

¿Media del día < 39 €? Está a **2 EE** → probabilidad ≈ 2,3 %

→ Si ocurre, merece la pena investigar

Practica: Notebook, secciones 3 y 4

---

<!-- _class: lead -->

# 1.4
## Estimación y error estándar

---

<!-- 1.4-1 -->

## Estimador y estimación

- **Estimador**: la regla → «suma y divide entre $n$»
- **Estimación**: el número → 28,08 €
- Sesgo y precisión son propiedades **del estimador**

---

<!-- 1.4-2 -->

## Propiedades deseables

| Propiedad | Significado |
|---|---|
| Insesgado | en promedio acierta: $E[\hat\theta]=\theta$ |
| Preciso | poca variación entre muestras |
| Consistente | se concentra en $\theta$ al crecer $n$ |

Diana: agrupado pero desviado = preciso y **sesgado**

---

<!-- 1.4-3 -->

## ¿Por qué $n-1$?

$$s=\sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar x)^2}$$

- Las desviaciones se miden respecto a $\bar x$, ajustada a los datos
- Dividir entre $n$ **subestima** la varianza
- NumPy: `x.std(ddof=1)` · pandas: `ddof=1` por defecto

---

<!-- 1.4-4 -->

## Desviación típica vs. error estándar

| | Desviación típica $s$ | Error estándar $s/\sqrt n$ |
|---|---|---|
| Mide | variación de **los pedidos** | variación de **la media** |
| Si $n$ crece | se estabiliza (≈ $\sigma$) | **baja** como $1/\sqrt n$ |
| Pregunta | ¿cómo de distintos son? | ¿cuánto me fío de la media? |
| Caso $n=200$ | **16,12 €** | **1,14 €** |

---

<!-- 1.4-5 -->

## Con más datos…

| $n$ | $s$ | EE |
|---|---|---|
| 200 | ≈ 16 € | ≈ 1,14 € |
| 20 000 | ≈ 15–16 € | ≈ 0,11 € |

Los clientes no se vuelven más parecidos por observarlos más

```python
s  = muestra.std(ddof=1)
ee = stats.sem(muestra)   # = s / sqrt(n)
```

---

<!-- 1.4-6 -->

## Error estándar de otras estimaciones

| Estimación | EE |
|---|---|
| Media | $s/\sqrt n$ |
| Proporción | $\sqrt{\hat p(1-\hat p)/n}$ |
| Diferencia de medias | $\sqrt{s_1^2/n_1+s_2^2/n_2}$ |
| Mediana, percentiles, ratios | → **bootstrap** (1.6) |

Ej.: 1 000 visitas, 5 % conversión → EE ≈ 0,69 puntos

---

<!-- 1.4-7 -->

## Errores frecuentes

- Describir a los clientes con el EE («28 ± 1 €»)
- Barras de error **sin etiqueta**
- Elegir el EE «porque queda más preciso»
- Ignorar la dependencia (varios pedidos por cliente)

Practica: Notebook, secciones 4 y 5

---

<!-- _class: lead -->

# 1.5
## Intervalos de confianza: construcción e interpretación

---

<!-- 1.5-1 -->

## De un punto a un intervalo

- Estimación puntual: 28,08 € → casi seguro no es exacta
- Por el TCL, en el 95 % de las muestras $|\bar x-\mu| < 1{,}96\cdot EE$
- Le damos la vuelta:

$$\bar x \pm 1{,}96\cdot EE \ \text{ contiene a } \mu \text{ en el 95 \% de las muestras}$$

---

<!-- 1.5-2 -->

## La fórmula con $t$ de Student

$$\bar x \pm t_{0.975,\,n-1}\cdot\frac{s}{\sqrt n}$$

- $t$ compensa que estimamos $\sigma$ con $s$
- $n=200$: $t\approx1{,}97$ · $n=10$: $t\approx2{,}26$
- $t\cdot EE$ = **margen de error**

```python
stats.t.interval(0.95, df=n-1, loc=media, scale=ee)
```

---

<!-- 1.5-3 -->

## Nuestro intervalo

**Media: 28,08 € · IC 95 %: [25,84 €; 30,33 €]**

- Margen de error ≈ ±2,25 €
- Media real (solo la sabemos porque simulamos): 27,79 € (dentro del IC)
- Proporción: $\hat p \pm 1{,}96\sqrt{\hat p(1-\hat p)/n}$

---

<!-- 1.5-4 -->

## ¿Qué significa «95 %»?

> Si repitiéramos el muestreo muchas veces, **el 95 % de los intervalos** construidos así contendrían la media real

- El 95 % es del **método**, no de un intervalo concreto
- Un intervalo ya calculado **contiene o no** a $\mu$
- Por eso decimos «confianza», no «probabilidad»

---

<!-- 1.5-5 -->

## Interpretaciones incorrectas

- **No:** «El 95 % de los pedidos cuesta entre 25,84 y 30,33 €»
  → el IC es para la **media**, no para pedidos
- **No:** «El 95 % de nuevas medias caerá en este intervalo»
- **No:** «La media real cambia y está dentro el 95 % del tiempo»
- **No:** «Al 99 % es siempre mejor» → es más **ancho**

---

<!-- 1.5-6 -->

## Comprobación: cobertura

100 muestras de 200 pedidos → 100 intervalos

**96 de 100 contienen la media real**

- Esperable: ≈ 95 ± 4 por azar
- Los que fallan no tienen nada raro: es el 5 % asumido

Practica: Notebook, sección 5 (gráfico de intervalos)

---

<!-- 1.5-7 -->

## Qué controla la anchura

$$\text{semianchura}=t\cdot\frac{s}{\sqrt n}$$

| Palanca | Efecto |
|---|---|
| Confianza 90 / 95 / 99 % | $z$ = 1,645 / 1,96 / 2,576 |
| Más variabilidad $s$ | más ancho |
| $n \times 4$ | anchura / 2 |

Tamaño de muestra: $\ n\approx\left(\dfrac{1{,}96\,s}{E}\right)^2$

---

<!-- 1.5-8 -->

## Cómo comunicarlo

> «Estimamos que el ticket medio está entre 25,8 € y 30,3 €, con un método que acierta en 95 de cada 100 ocasiones.»

- Supuestos: muestra aleatoria, independencia, $n$ suficiente
- IC solapados **no** prueban «sin diferencia» → IC de la diferencia (mód. 04)

Practica: Ejercicios 1 y 3

---

<!-- _class: lead -->

# 1.6
## Bootstrap: incertidumbre para cualquier métrica

---

<!-- 1.6-1 -->

## El problema

Métricas sin fórmula sencilla de EE:

- **Mediana** del importe (pedido típico)
- **Percentil 90** del tiempo de entrega
- **Ratios**: ingresos por usuario activo
- Diferencia de medianas entre versiones

¿Renunciamos a dar incertidumbre? **No**

---

<!-- 1.6-2 -->

## La idea

- Solo tenemos **una** muestra
- Si es aleatoria y suficiente, **se parece a la población**
- → Usamos la muestra **como si fuera la población**
- Simulamos el muestreo remuestreando de ella

---

<!-- 1.6-3 -->

## El algoritmo

1. Muestra original de tamaño $n$
2. Elige $n$ observaciones **con reemplazo**
3. Calcula el estadístico
4. Repite $B$ veces (p. ej., 5 000)
5. Distribución bootstrap →
   - **EE** = su desviación típica
   - **IC 95 %** = percentiles 2,5 y 97,5

---

<!-- 1.6-4 -->

## En Python

```python
def bootstrap(datos, estadistico, n_boot=5_000, rng=rng):
    idx = rng.integers(0, len(datos), (n_boot, len(datos)))
    return np.array([estadistico(datos[i]) for i in idx])

boot_mediana = bootstrap(muestra, np.median)
lo, hi = np.percentile(boot_mediana, [2.5, 97.5])
```

Alternativa: `scipy.stats.bootstrap(..., method="BCa")`

---

<!-- 1.6-5 -->

## Resultado: la mediana

| | Valor |
|---|---|
| Mediana muestral | 24,50 € |
| IC 95 % bootstrap | [21,89 €; 27,02 €] |
| Mediana poblacional | 24,53 € (dentro del IC) |
| Media muestral (comparación) | 28,08 € |

Datos asimétricos → reporta **media y mediana**

---

<!-- 1.6-6 -->

## Cuándo sí, cuándo con cuidado

| Úsalo | Con cuidado |
|---|---|
| Mediana, percentiles, ratios | $n$ muy pequeño (< 15–20) |
| Datos asimétricos | Máximo, mínimo, P99 |
| Validar una fórmula | Series temporales, grupos |
| Métricas de modelos (AUC…) | Muestra sesgada |

---

<!-- 1.6-7 -->

## Ideas clave 1.6

- Remuestrear **con reemplazo** imita el azar del muestreo
- Sirve para **cualquier** estadístico
- Cuantifica el error aleatorio, **no corrige el sesgo**
- Ejemplo: comprometer un plazo de entrega con el **extremo superior** del IC del P90

Practica: Notebook, sección 5 · Ejercicio 2

---

<!-- _class: lead -->

# 1.7
## Correlación, causalidad y paradoja de Simpson

---

<!-- 1.7-1 -->

## Correlación de Pearson

$$r=\frac{\sum(x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum(x_i-\bar x)^2}\sqrt{\sum(y_i-\bar y)^2}}\in[-1,1]$$

- Mide relación **lineal**: fuerza y sentido
- `df["x"].corr(df["y"])`
- $r\approx0$ ≠ «no hay relación»

---

<!-- 1.7-2 -->

## Lo que $r$ no ve

- **No es la pendiente**: $r$ alto con efecto minúsculo
- **No lineal**: una U puede dar $r\approx0$
- **Atípicos**: un cliente gigante crea o destruye $r$
- Alternativa robusta: **Spearman** (rangos)

Grafica siempre el diagrama de dispersión

---

<!-- 1.7-3 -->

## Cinco explicaciones de una correlación

| Explicación | Ejemplo |
|---|---|
| $X \to Y$ | lo que queremos creer |
| $Y \to X$ (inversa) | más ventas → más empleados |
| $Z \to X$ y $Z \to Y$ (**confusión**) | calor → helados y ahogamientos |
| Selección | solo clientes que siguen activos |
| Azar | muchas variables, alguna correlaciona |

---

<!-- 1.7-4 -->

## Variable de confusión

```
            Z (dispositivo)
           /               \
          v                 v
   X (versión)  - - - ->  Y (compra)
```

$Z$ influye en **quién recibe** $X$ y en **el resultado** $Y$

Si no la tienes en cuenta, atribuyes a $X$ el efecto de $Z$

---

<!-- 1.7-5 -->

## El test de la app (notebook)

| Versión | Móvil | Escritorio | **Global** |
|---|---|---|---|
| A | **5,0 %** (8 000) | **15,0 %** (2 000) | 7,0 % |
| B | 4,0 % (2 000) | 13,0 % (8 000) | **11,2 %** |

- Global: B gana por 4,2 puntos
- Por segmento: **A gana en los dos** (+1 en móvil, +2 en escritorio)
- B se mostró sobre todo en **escritorio**, donde todos convierten más

---

<!-- 1.7-6 -->

## Por qué se invierte: medias ponderadas

$$\text{A} = 0{,}8\cdot5\,\% + 0{,}2\cdot15\,\% = 7{,}0\,\%$$
$$\text{B} = 0{,}2\cdot4\,\% + 0{,}8\cdot13\,\% = 11{,}2\,\%$$

- Cada tasa global es una **media ponderada** de sus segmentos
- Pesos muy distintos: A 80 % móvil, B 80 % escritorio
- La ventaja de B es **efecto de composición**, no de la versión
- Lanzar B a todos **empeoraría** la conversión en ambos dispositivos

---

<!-- 1.7-7 -->

## Qué hacer

- **Aleatorizar** la asignación (prueba A/B, módulo 04)
- **Estratificar** o **controlar** confusoras (regresión, módulo 03)
- Pensar la **estructura causal** antes de calcular
- Ojo: no controles por variables **posteriores** al tratamiento

---

<!-- 1.7-8 -->

## Checklist antes de concluir «causa»

1. ¿Cómo se asignó el «tratamiento»?
2. ¿En qué más se diferencian los grupos?
3. ¿Podría ir al revés la causalidad?
4. ¿Hay filtrado o selección en los datos?
5. ¿La comparación es justa por segmento?

Practica: Notebook, sección 6 · Ejercicio 4

---

<!-- _class: lead -->

# Resumen del módulo

Distribuciones → LGN y TCL → error estándar → IC → bootstrap → causalidad

**Caso práctico:** ¿cuál es el importe medio y cuánto podemos fiarnos?
