# Módulo 08 · Analítica predictiva con series temporales — Cuestionario

10 preguntas tipo test. Cada pregunta tiene una única respuesta correcta.

---

**1.** ¿Qué elimina principalmente la diferencia estacional $\nabla_{12}\, y_t = y_t - y_{t-12}$ en una serie mensual?

a) La tendencia lineal, pero no la estacionalidad.
b) El patrón que se repite cada año, comparando cada mes con el mismo mes del año anterior.
c) Los valores atípicos aislados.
d) La heterocedasticidad (varianza que crece con el nivel).

---

**2.** ¿Cuál de estas es una ventaja de STL frente a la descomposición clásica por medias móviles?

a) Pronostica directamente los próximos 12 meses con intervalos de confianza.
b) Obliga a que la estacionalidad sea idéntica todos los años, lo que la hace más estable.
c) Solo funciona con estacionalidad multiplicativa.
d) Permite que la estacionalidad cambie lentamente con los años y tiene una versión robusta frente a atípicos.

---

**3.** En un modelo MA(1), $y_t = c + \varepsilon_t + \theta_1 \varepsilon_{t-1}$, el valor actual depende de:

a) El error de predicción (la "sorpresa") del periodo anterior.
b) La media de los últimos 12 valores observados de la serie.
c) El valor observado en el periodo anterior, $y_{t-1}$.
d) El valor del mismo mes del año anterior.

---

**4.** Un modelo tiene un MASE de 0,8 calculado frente al método ingenuo estacional. ¿Qué significa?

a) Que el 80 % de los pronósticos caen dentro del intervalo de predicción.
b) Que el error porcentual medio es del 0,8 %.
c) Que su error absoluto medio es un 20 % menor que el del ingenuo estacional.
d) Que el modelo es un 80 % peor que la referencia.

---

**5.** Aplicas la prueba ADF a la serie de pasajeros aéreos (en logaritmos) y obtienes:

```
log original                 p-valor ADF = 0.4224
1ª diferencia                p-valor ADF = 0.0711
1ª dif. + dif. estacional    p-valor ADF = 0.0002
```

¿Cuál es la interpretación más adecuada con un nivel de significación del 5 %?

a) La serie original ya es estacionaria porque 0,42 es mayor que 0,05.
b) Con la primera diferencia la serie es claramente estacionaria; la diferencia estacional sobra.
c) La prueba demuestra que la serie original tiene tendencia determinista.
d) No hay evidencia de estacionariedad hasta aplicar diferencia regular y estacional; con ambas se rechaza $H_0$.

---

**6.** En un suavizado exponencial simple, el nivel actual es $\ell_{t-1} = 200$ y $\alpha = 0{,}3$. Llega una nueva observación $y_t = 260$. ¿Cuál es el nuevo nivel $\ell_t$ (y, por tanto, el pronóstico para el periodo siguiente)?

a) 218
b) 242
c) 230
d) 260

---

**7.** En un *backtesting* de 7 orígenes obtienes un MAE medio de 0,45 ppm para Holt-Winters y de 1,71 ppm para el ingenuo estacional. ¿Cuál es el *skill score* de Holt-Winters frente a esa referencia, $1 - \text{MAE}_\text{modelo}/\text{MAE}_\text{ref}$?

a) 0,26
b) 1,26
c) 0,74
d) 3,80

---

**8.** Los errores de pronóstico de un modelo en cuatro semanas son $+1$, $-1$, $+2$ y $-6$ unidades. ¿Cuáles son su MAE y su RMSE?

a) MAE = −1,0; RMSE = 3,24
b) MAE = 2,5; RMSE = 3,24
c) MAE = 2,5; RMSE = 2,50
d) MAE = 10,5; RMSE = 2,5

---

**9.** Una heladería quiere usar un SARIMAX con la **temperatura diaria** como variable exógena para pronosticar sus ventas **a tres meses vista** y decidir cuánto producir. ¿Qué es lo más sensato?

a) Usar la temperatura real observada en esos tres meses al evaluar el modelo, porque así el error será menor.
b) Tener en cuenta que la temperatura futura no se conoce: habría que usar un pronóstico de temperatura (o valores climatológicos medios) tanto al pronosticar como en el *backtesting*, y comprobar si aun así mejora a un modelo sin esa variable.
c) Descartar cualquier variable exógena, porque los modelos SARIMAX no admiten variables continuas.
d) Sustituir la temperatura por las ventas del mismo día, que se conocen al cierre de caja.

---

**10.** Comparas dos modelos de demanda para decidir cuál poner en producción:

| | Test único (últimos 12 meses) | *Backtesting* (8 orígenes, MAE medio) |
|---|---|---|
| Modelo A (complejo, 25 parámetros) | MAE = 102 | 131 |
| Modelo B (sencillo, 3 parámetros) | MAE = 110 | 118 |
| Ingenuo estacional | MAE = 150 | 149 |

¿Qué decisión es la más defendible?

a) El modelo B: es mejor en la evaluación más fiable (varios orígenes), bate con claridad a la referencia y es más fácil de mantener.
b) El modelo A, porque tiene el menor error en los datos más recientes.
c) Ninguno: ambos son peores que el ingenuo estacional.
d) El modelo A, porque tener más parámetros garantiza que generalizará mejor en el futuro.

---

<details><summary>Solucionario (para instructores)</summary>

**1. b)** La diferencia estacional resta a cada mes el mismo mes del año anterior y elimina así el patrón anual. La a) describe la diferencia regular; la d) se corrige con una transformación (logaritmo), no con diferencias.

**2. d)** STL permite una estacionalidad que evoluciona y tiene una opción robusta (`robust=True`). No es un modelo de pronóstico por sí mismo (a), no impone una estacionalidad fija (b, eso hace la clásica) y funciona con esquema aditivo (para multiplicativo se aplica sobre el logaritmo), así que c) es falsa.

**3. a)** El término MA depende de los errores de predicción pasados, $\varepsilon_{t-1}$. La c) describe un AR(1) y la b) confunde el MA del modelo con la media móvil usada para suavizar, un error clásico.

**4. c)** El MASE es el MAE del modelo dividido entre el MAE de la referencia: 0,8 indica un 20 % menos de error. No es un porcentaje de error (b) ni tiene relación con la cobertura del intervalo (a); un MASE > 1 sería peor que la referencia (d).

**5. d)** La hipótesis nula de la ADF es "no estacionaria": con 0,42 y 0,07 no se rechaza al 5 %; con 0,0002 sí. La a) lee la prueba al revés; la b) ignora que 0,0711 > 0,05 (y que la estacionalidad sigue presente); la ADF no "demuestra" tendencia determinista (c).

**6. a)** $\ell_t = 0{,}3 \cdot 260 + 0{,}7 \cdot 200 = 78 + 140 = 218$. La c) sería la media simple de ambos valores (equivale a $\alpha = 0{,}5$); la b) intercambia los pesos ($\alpha = 0{,}7$); la d) es el método ingenuo ($\alpha = 1$).

**7. c)** $1 - 0{,}45/1{,}71 \approx 1 - 0{,}26 = 0{,}74$: Holt-Winters reduce el error un 74 % frente a la referencia. La a) es solo el cociente; la d) es el cociente invertido (1,71/0,45 ≈ 3,8); la b) suma en lugar de restar.

**8. b)** MAE $= (1+1+2+6)/4 = 2{,}5$; RMSE $= \sqrt{(1+1+4+36)/4} = \sqrt{10{,}5} \approx 3{,}24$. La a) promedia los errores con signo (se compensan y no miden la magnitud); el RMSE es mayor que el MAE porque penaliza el error grande de −6, por lo que c) no puede ser.

**9. b)** Para pronosticar con una exógena hay que conocer (o pronosticar) su valor futuro, y el *backtesting* debe reproducir esa situación; si no, la evaluación es optimista. La a) es una fuga de información; la c) es falsa (SARIMAX admite regresores continuos); la d) usa una variable que no estará disponible cuando haya que decidir la producción.

**10. a)** El *backtesting* con varios orígenes es más fiable que un único corte: B gana ahí (118 frente a 131), bate al ingenuo estacional y es más sencillo. Elegir A por el test único (b) es dejarse llevar por un corte posiblemente favorable; c) es falsa según la tabla; y más parámetros aumentan el riesgo de sobreajuste, no garantizan generalizar (d).

</details>
