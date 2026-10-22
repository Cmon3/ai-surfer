# Módulo 04 · Clasificación y pruebas de hipótesis — Cuestionario evaluable

10 preguntas tipo test. Cada pregunta tiene **una sola respuesta correcta**. Tiempo orientativo: 20 minutos.

---

### Pregunta 1 (conceptual)

En una regresión logística de impago con variables sin estandarizar, el coeficiente de «número de recibos devueltos en el último año» es $\beta = 0{,}7$ (y $e^{0{,}7} \approx 2{,}01$). ¿Qué significa?

a) Cada recibo devuelto adicional aumenta la probabilidad de impago en 0,7 puntos.
b) Cada recibo devuelto adicional aumenta la probabilidad de impago un 70 %.
c) Cada recibo devuelto adicional multiplica aproximadamente por 2 las odds de impago, manteniendo constantes las demás variables.
d) Devolver recibos causa el impago con una probabilidad del 70 %.

---

### Pregunta 2 (conceptual)

¿Por qué un random forest, en cada división de cada árbol, solo permite elegir entre un subconjunto aleatorio de variables?

a) Para que los árboles se parezcan menos entre sí, de modo que sus errores estén menos correlacionados y el promedio reduzca más la varianza.
b) Para que cada árbol se entrene más rápido; no tiene efecto sobre la calidad de las predicciones.
c) Para eliminar del modelo las variables poco importantes.
d) Para que cada árbol corrija los errores del árbol anterior.

---

### Pregunta 3 (conceptual)

¿Qué es la **potencia** de una prueba de hipótesis?

a) La probabilidad de que $H_0$ sea falsa después de ver los datos.
b) La probabilidad de rechazar $H_0$ cuando $H_0$ es cierta.
c) Uno menos el p-valor.
d) La probabilidad de rechazar $H_0$ cuando existe un efecto real de un tamaño determinado.

---

### Pregunta 4 (conceptual)

Tienes las probabilidades de un clasificador sobre el conjunto de test. Si divides **todas** las probabilidades entre 2 (sin cambiar su orden), ¿qué ocurre?

a) El AUC se reduce a la mitad.
b) El AUC no cambia, pero la matriz de confusión con umbral 0,5 sí puede cambiar.
c) Ni el AUC ni la matriz de confusión con umbral 0,5 cambian.
d) El AUC cambia y la matriz de confusión con umbral 0,5 no.

---

### Pregunta 5 (aplicación)

Un modelo de abandono, evaluado sobre 1.000 clientes con un umbral fijo, da esta salida:

```
tn, fp, fn, tp = confusion_matrix(y_test, pred).ravel()
# tn = 900, fp = 60, fn = 10, tp = 30
```

¿Cuáles son la precisión y el recall?

a) Precisión 0,75; recall 0,33.
b) Precisión 0,33; recall 0,75.
c) Precisión 0,93; recall 0,75.
d) Precisión 0,33; recall 0,94.

---

### Pregunta 6 (aplicación)

En un sistema de mantenimiento predictivo, no detectar una avería (FN) cuesta 9.000 € y una revisión innecesaria (FP) cuesta 1.000 €. Suponiendo que las probabilidades del modelo están bien calibradas, ¿a partir de qué probabilidad de avería conviene enviar al técnico?

a) 0,90
b) 0,50
c) 0,11
d) 0,10

---

### Pregunta 7 (aplicación)

Una prueba A/B de un nuevo proceso de registro (12.000 usuarios por grupo) da:

```
Diferencia B − A: +0,40 p.p.   IC 95 %: [−0,10 p.p., +0,90 p.p.]   p-valor = 0,12
```

¿Cuál es la interpretación más adecuada?

a) No hay evidencia suficiente para afirmar que B mejora: los datos son compatibles tanto con ningún efecto como con una mejora de hasta 0,9 puntos.
b) Queda demostrado que B no tiene ningún efecto sobre el registro.
c) Hay un 88 % de probabilidad de que B sea mejor que A.
d) B es mejor que A, porque la diferencia observada es positiva.

---

### Pregunta 8 (aplicación)

En el notebook, detectar un aumento de conversión del 10 % al 11 % (α = 0,05, potencia 80 %) requiere 14.745 usuarios por grupo. Si quisieras detectar un aumento del 10 % al 10,5 % con los mismos α y potencia, ¿qué tamaño por grupo esperarías, aproximadamente?

a) Unos 7.400 (la mitad).
b) Unos 29.500 (el doble).
c) Unos 58.000 (cerca de cuatro veces más).
d) Unos 14.745 (el tamaño no depende del efecto).

---

### Pregunta 9 (decisión de negocio)

Un experimento sobre una nueva página de producto no mejora la métrica principal (conversión, p = 0,41). Sin embargo, de las otras 11 métricas analizadas, «añadir a favoritos» sale con p = 0,03. El equipo propone lanzar la nueva página «porque mejora los favoritos». ¿Qué recomiendas?

a) Lanzar: p = 0,03 es menor que 0,05.
b) Lanzar solo si el efecto en favoritos es grande.
c) Repetir el análisis eliminando a los usuarios que no compraron para ver si la conversión sale significativa.
d) No lanzar por ese motivo: con 12 métricas es esperable algún p < 0,05 por azar (con Holm ese resultado no sería significativo); como mucho, plantear un nuevo experimento con favoritos como métrica principal si tiene valor de negocio.

---

### Pregunta 10 (decisión de negocio)

El equipo antifraude de una aseguradora puede revisar **200 siniestros al día** de los 10.000 que entran. Hay dos modelos candidatos, evaluados con datos de validación:

| | AUC | Precisión entre los 200 siniestros con mayor puntuación |
|---|---|---|
| Modelo A | 0,91 | 0,38 |
| Modelo B | 0,89 | 0,42 |

¿Cuál elegirías y por qué?

a) El modelo B, porque lo que importa en la operación es acertar en los 200 casos que se revisan, y ahí B encuentra más fraudes con el mismo equipo.
b) El modelo A, porque un AUC mayor implica siempre mejores resultados en cualquier umbral.
c) El modelo A, porque la precisión no es relevante cuando los positivos son raros.
d) Ninguno: con un AUC inferior a 0,95 un modelo antifraude no es utilizable.

---

<details><summary>Solucionario (para instructores)</summary>

| Pregunta | Respuesta |
|---|---|
| 1 | c |
| 2 | a |
| 3 | d |
| 4 | b |
| 5 | b |
| 6 | d |
| 7 | a |
| 8 | c |
| 9 | d |
| 10 | a |

**1 – c.** En regresión logística, una unidad más de la variable suma $\beta$ al log-odds, es decir, multiplica las odds por $e^{\beta} \approx 2$. Las opciones a) y b) confunden odds con probabilidad (el efecto sobre la probabilidad depende del punto de partida); d) añade una interpretación causal que el modelo no permite.

**2 – a.** El submuestreo de variables descorrelaciona los árboles; si todos eligieran siempre la variable dominante serían casi iguales y promediarlos apenas reduciría la varianza. b) ignora el efecto principal; c) no elimina variables del modelo; d) describe el boosting, no el random forest.

**3 – d.** La potencia es $1-\beta$: la probabilidad de detectar un efecto que existe, para un tamaño de efecto concreto. b) es la definición de α (error tipo I); a) es una probabilidad posterior bayesiana que la prueba no calcula; c) no tiene sentido estadístico.

**4 – b.** El AUC solo depende del orden de las puntuaciones, que no cambia; en cambio, con umbral fijo de 0,5 algunos casos que estaban por encima quedarán por debajo y la matriz de confusión cambiará. a) y d) atribuyen al AUC una dependencia de la escala que no tiene; c) olvida que el umbral es fijo.

**5 – b.** Precisión = TP/(TP+FP) = 30/90 = 0,33; recall = TP/(TP+FN) = 30/40 = 0,75. a) intercambia las dos métricas; c) da la exactitud (930/1.000 = 0,93) como precisión; d) da la especificidad (900/960 ≈ 0,94) como recall.

**6 – d.** El umbral teórico es $C_{FP}/(C_{FP}+C_{FN}) = 1.000/10.000 = 0{,}10$. c) usa erróneamente $C_{FP}/C_{FN}$ = 1/9; a) invierte la lógica (cuanto más caro el FN, más bajo debe ser el umbral); b) es el valor por defecto, solo válido con costes iguales.

**7 – a.** El IC incluye el 0 y también mejoras relevantes: no se rechaza $H_0$, pero tampoco se demuestra que no haya efecto (puede faltar potencia). b) confunde «no rechazar» con «demostrar»; c) es la interpretación incorrecta del p-valor como probabilidad de la hipótesis; d) ignora la incertidumbre.

**8 – c.** El tamaño muestral crece aproximadamente con el inverso del cuadrado del efecto: la mitad de efecto exige unas cuatro veces más muestra (el cálculo exacto da 57.756 por grupo). a) y b) suponen una relación lineal o inversa simple; d) contradice la definición de potencia.

**9 – d.** Con 12 métricas y ningún efecto real, la probabilidad de al menos un p < 0,05 es $1-0{,}95^{12} \approx 46\,\%$; con Holm, el p-valor más pequeño debería ser < 0,05/12 ≈ 0,004. a) ignora las comparaciones múltiples; b) sigue basando la decisión en un hallazgo no planificado; c) es *p-hacking* y además introduce un sesgo de selección.

**10 – a.** El AUC resume la ordenación en todos los umbrales, pero las curvas ROC de dos modelos pueden cruzarse; lo relevante es el rendimiento en el punto de operación (los 200 casos revisables), donde B encuentra unos 84 fraudes frente a 76. b) es falsa precisamente porque las curvas pueden cruzarse; c) es al revés (con positivos raros la precisión es clave); d) no existe tal umbral universal.

</details>
