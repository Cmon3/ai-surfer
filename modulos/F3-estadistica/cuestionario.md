# Módulo F3 · Estadística para la toma de decisiones — Cuestionario

**Instrucciones:** 10 preguntas tipo test con una sola respuesta correcta. Dispones de 25 minutos. Puedes usar una calculadora o Python, pero no consultes los apuntes.

---

### Pregunta 1 (conceptual)

Una analista amplía su muestra de pedidos de 200 a 20 000. ¿Qué esperas que ocurra con la desviación típica muestral $s$ y con el error estándar de la media?

- a) Ambos se reducen aproximadamente a la décima parte.
- b) $s$ se reduce a la décima parte y el error estándar no cambia.
- c) $s$ se mantiene aproximadamente igual y el error estándar se reduce a la décima parte.
- d) Ambos se mantienen aproximadamente iguales, porque la población no ha cambiado.

### Pregunta 2 (conceptual)

Los importes de los pedidos de una app siguen una distribución log-normal muy asimétrica. Según el teorema central del límite, ¿qué se parece cada vez más a una distribución normal cuando aumenta el tamaño de muestra $n$?

- a) La distribución de la media muestral $\bar x$ a lo largo de muchas muestras de tamaño $n$.
- b) El histograma de los importes de la muestra.
- c) La distribución de los importes en la población.
- d) La diferencia entre la media y la mediana de la muestra.

### Pregunta 3 (conceptual)

En el bootstrap, cada muestra remuestreada se obtiene **con reemplazo** y con el mismo tamaño $n$ que la muestra original. ¿Por qué con reemplazo?

- a) Porque así se eliminan los valores atípicos de la muestra.
- b) Porque así la distribución bootstrap es siempre normal.
- c) Porque reduce el sesgo de la muestra original si esta no era aleatoria.
- d) Porque sin reemplazo cada remuestra contendría exactamente las mismas observaciones y el estadístico no variaría.

### Pregunta 4 (conceptual)

Una cadena hotelera publica: «Con 50 000 respuestas a nuestra encuesta online voluntaria, el 91 % de los huéspedes recomendaría el hotel (margen de error ±0,3 puntos)». ¿Cuál es el principal problema de esta afirmación?

- a) El margen de error está mal calculado: con 50 000 respuestas debería ser de unos ±3 puntos.
- b) La muestra puede estar sesgada (autoselección) y ese sesgo no se reduce con más respuestas; el margen de error solo cubre el error aleatorio.
- c) Ninguno: con una muestra tan grande, el teorema central del límite garantiza que la estimación es correcta.
- d) Que el 91 % debería expresarse como mediana y no como proporción.

### Pregunta 5 (aplicación)

Con una muestra aleatoria de $n = 100$ cestas de la compra obtienes $\bar x = 45{,}20$ € y $s = 30{,}00$ €. Sabiendo que $t_{0.975,\,99} \approx 1{,}984$, ¿cuál es el intervalo de confianza al 95 % para el gasto medio?

- a) [-14,32 €; 104,72 €]
- b) [39,25 €; 51,15 €]
- c) [42,20 €; 48,20 €]
- d) [44,60 €; 45,80 €]

### Pregunta 6 (aplicación)

Un analista simula 10 000 muestras de una población muy asimétrica y calcula, para cada una, el IC 95 % con la fórmula $t$. Obtiene:

```
   n   cobertura
  10     0.889
  50     0.931
 200     0.947
```

¿Cuál es la interpretación más adecuada?

- a) El código tiene un error: la cobertura de un IC al 95 % es siempre exactamente 0,95.
- b) Con $n = 10$ hay un 88,9 % de probabilidad de que la media real esté dentro de un intervalo ya calculado, frente a un 95 % prometido.
- c) La única solución es usar intervalos al 99 % cuando $n$ es pequeño.
- d) Con muestras pequeñas de datos muy asimétricos, la aproximación normal en la que se basa la fórmula aún no funciona bien y el método acierta menos de lo prometido; con $n$ mayor, la cobertura se acerca al 95 %.

### Pregunta 7 (aplicación)

En el notebook se obtiene esta salida:

```
Mediana: 24.50 € | IC 95 % bootstrap: [21.89, 27.02]
```

¿Qué afirmación es correcta?

- a) El intervalo se ha obtenido con un procedimiento que, repetido con muchas muestras, contendría la mediana poblacional en torno al 95 % de las veces; los datos son compatibles con una mediana entre ~21,9 € y ~27,0 €.
- b) El 95 % de los pedidos tiene un importe entre 21,89 € y 27,02 €.
- c) Hay un 95 % de probabilidad de que la **media** poblacional esté entre 21,89 € y 27,02 €.
- d) Como la media muestral (28,08 €) queda fuera del intervalo, la muestra contiene un error y debe repetirse.

### Pregunta 8 (aplicación)

Dos equipos de soporte resuelven tickets en el primer contacto con estas cifras:

| Equipo | Tickets fáciles | Tickets difíciles | Global |
|---|---|---|---|
| X | 180 / 200 (90 %) | 240 / 800 (30 %) | 420 / 1 000 (42 %) |
| Y | 680 / 800 (85 %) | 50 / 200 (25 %) | 730 / 1 000 (73 %) |

¿Qué conclusión es la correcta?

- a) Y es claramente mejor: resuelve un 73 % frente a un 42 %.
- b) No se puede decir nada sin calcular un intervalo de confianza para la tasa global.
- c) X resuelve mejor en cada tipo de ticket; la ventaja global de Y se debe a que recibe sobre todo tickets fáciles (paradoja de Simpson).
- d) Los dos equipos son iguales, porque cada uno gana en un tipo de ticket.

### Pregunta 9 (decisión de negocio)

El equipo de marketing ha probado dos anuncios con 500 usuarios cada uno, asignados al azar. El anuncio A convierte un 5,2 % y el B un 4,6 %. Proponen invertir todo el presupuesto del trimestre en A. El error estándar de cada tasa es de ≈ 1 punto porcentual, y el de la diferencia, de ≈ 1,4 puntos. ¿Qué recomiendas?

- a) Invertir en A: tiene una conversión un 13 % mayor en términos relativos.
- b) No dar por demostrado que A es mejor: una diferencia de 0,6 puntos está muy por debajo del ruido esperable; ampliar la prueba (o repartir el presupuesto) antes de una apuesta grande.
- c) Invertir en B, porque la diferencia es aleatoria y B es más barato de producir.
- d) Descartar la prueba: con solo 500 usuarios por grupo, los resultados no contienen ninguna información.

### Pregunta 10 (decisión de negocio)

Con 400 pedidos, el IC 95 % del ticket medio tiene una semianchura de ±2,00 €. El director comercial pide un margen de ±0,50 € para decidir el nuevo pedido mínimo. Recoger y validar cada pedido adicional cuesta tiempo de analista. ¿Cuál es la mejor respuesta?

- a) Bastan unos 1 600 pedidos, porque hay que reducir el margen a la cuarta parte.
- b) Bastan unos 800 pedidos, porque al duplicar la muestra se divide el margen entre dos.
- c) Es imposible estimarlo sin recoger antes todos los pedidos de la población.
- d) Harán falta unos 6 400 pedidos (16 veces más); antes de invertir en ello, conviene comprobar si una precisión de ±0,50 € cambia realmente la decisión sobre el pedido mínimo.

---

<details><summary>Solucionario (para instructores)</summary>

| Pregunta | Correcta |
|---|---|
| 1 | c |
| 2 | a |
| 3 | d |
| 4 | b |
| 5 | b |
| 6 | d |
| 7 | a |
| 8 | c |
| 9 | b |
| 10 | d |

**1 — c.** La desviación típica describe la variabilidad de los pedidos individuales y se estabiliza alrededor de $\sigma$; no depende de cuántos observemos. El error estándar $s/\sqrt n$ se reduce con $\sqrt{100} = 10$. Los distractores a y b confunden la variabilidad de los datos con la precisión de la estimación; d olvida que el error estándar sí depende de $n$.

**2 — a.** El TCL trata de la distribución muestral de la media. Los datos individuales (b, c) siguen siendo log-normales por mucho que crezca $n$; el histograma de la muestra se parece cada vez más a la población, no a una normal.

**3 — d.** Sin reemplazo, una remuestra de tamaño $n$ es la misma muestra reordenada y el estadístico sería idéntico en todas; el reemplazo introduce la variación que imita el azar del muestreo. El bootstrap no elimina atípicos (a), no garantiza normalidad (b) y no corrige sesgos de muestreo (c).

**4 — b.** Las encuestas voluntarias sufren sesgo de autoselección; el margen de error de ±0,3 puntos es correcto para el error aleatorio ($1{,}96\sqrt{0{,}91\cdot0{,}09/50\,000} \approx 0{,}25$ puntos), por lo que a es falsa, pero no dice nada sobre el sesgo. La c confunde precisión con ausencia de sesgo.

**5 — b.** $EE = 30/\sqrt{100} = 3$; semianchura $= 1{,}984 \cdot 3 \approx 5{,}95$; IC = [39,25; 51,15]. La a usa la desviación típica en lugar del error estándar (confunde datos con media), la c usa solo un error estándar (≈ 68 %) y la d divide entre $n$ en lugar de $\sqrt n$.

**6 — d.** La cobertura es una propiedad del método y depende de que la distribución de $\bar x$ sea aproximadamente normal; con datos muy asimétricos y $n$ pequeño no lo es, y la cobertura queda por debajo del 95 %. La a ignora que el 95 % es nominal y aproximado; la b aplica una interpretación probabilística a un intervalo ya calculado; la c no es la única opción (más datos, bootstrap BCa, transformar a logaritmos).

**7 — a.** Es la interpretación del IC como propiedad del procedimiento, aplicada a la mediana. La b confunde el intervalo de un estadístico con el rango de los datos individuales; la c habla de la media, no de la mediana; la d no tiene sentido: en datos asimétricos la media suele superar a la mediana y no tiene por qué estar en el IC de esta.

**8 — c.** X gana en fáciles (90 % > 85 %) y en difíciles (30 % > 25 %), pero el 80 % de sus tickets son difíciles; Y recibe sobre todo fáciles. El tipo de ticket es una variable de confusión. La a se queda con la cifra agregada; la b no resuelve el problema (un IC de la tasa global seguiría estando confundido); la d lee mal la tabla.

**9 — b.** La diferencia (0,6 puntos) es menos de la mitad de su error estándar (≈ 1,4 puntos); es perfectamente compatible con que no haya diferencia o incluso con que B sea mejor. La a se fija en la diferencia relativa sin mirar la incertidumbre; la c inventa una conclusión; la d exagera: los datos informan, pero no bastan para una apuesta grande.

**10 — d.** La semianchura es proporcional a $1/\sqrt n$: dividirla entre 4 exige multiplicar $n$ por $4^2 = 16$, es decir, 6 400 pedidos. La a aplica una relación lineal, la b confunde duplicar con cuadruplicar y la c ignora que podemos usar la $s$ de la muestra actual. La parte de negocio: la precisión debe justificarse por su impacto en la decisión.

</details>
