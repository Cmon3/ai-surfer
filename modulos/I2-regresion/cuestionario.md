# Módulo I2 · Regresión y predicción — Cuestionario evaluable

**Instrucciones:** 10 preguntas tipo test, una sola respuesta correcta por pregunta. Tiempo orientativo: 20 minutos. Puedes consultar tus apuntes y el notebook.

- Preguntas 1–4: conceptuales.
- Preguntas 5–8: aplicación e interpretación de resultados.
- Preguntas 9–10: decisión de negocio.

---

### Pregunta 1 (conceptual)

En una regresión lineal simple ajustada por mínimos cuadrados ordinarios, ¿qué afirmación es correcta?

a) La recta elegida es la que minimiza la suma de los residuos (sin elevar al cuadrado).
b) Si $x$ e $y$ están estandarizadas, la pendiente coincide con el coeficiente de correlación de Pearson.
c) La recta pasa siempre por el origen $(0, 0)$.
d) La pendiente mide la fuerza de la relación, independientemente de las unidades.

---

### Pregunta 2 (conceptual)

Un analista añade 15 variables generadas al azar (ruido puro) a un modelo de regresión múltiple y vuelve a ajustarlo con los mismos datos. ¿Qué ocurrirá con mayor probabilidad?

a) El R² bajará, porque las variables de ruido empeoran el ajuste.
b) El R² y el R² ajustado subirán en la misma proporción.
c) El R² ajustado subirá y el R² se mantendrá igual.
d) El R² subirá o se mantendrá, mientras que el R² ajustado probablemente bajará.

---

### Pregunta 3 (conceptual)

¿Cuál de estas situaciones viola de forma más clara el supuesto de **independencia** de los errores?

a) Un modelo de ventas con 52 observaciones semanales de la misma tienda.
b) Un modelo en el que la variable respuesta tiene una distribución asimétrica.
c) Un modelo en el que dos variables explicativas tienen una correlación de 0,85.
d) Un modelo en el que el QQ-plot de los residuos muestra colas algo más pesadas que la normal.

---

### Pregunta 4 (conceptual)

Respecto a la validación cruzada con $k$ particiones, ¿qué afirmación es correcta?

a) Debe aplicarse sobre el conjunto de test para obtener una estimación más estable del error final.
b) Escalar todas las variables con `StandardScaler` antes de hacer la validación cruzada es la práctica recomendada para evitar fugas de información.
c) Sirve para comparar modelos o elegir hiperparámetros usando solo los datos de entrenamiento, y su resultado es más estable que una única partición de validación.
d) Con datos temporales, conviene barajar las observaciones antes de crear las particiones.

---

### Pregunta 5 (aplicación)

En el modelo completo del notebook (ajustado con 331 pacientes) se obtiene esta fila de la tabla de `statsmodels`:

```
                coef    std err      t     P>|t|    [0.025    0.975]
presion       1.3137     0.258   5.084    0.000     0.805     1.822
```

¿Cuál es la interpretación más adecuada?

a) Cada 10 mmHg más de presión arterial se asocian con entre unos 8 y 18 puntos más de progresión esperada, manteniendo constantes las demás variables del modelo.
b) Reducir la presión arterial de un paciente en 10 mmHg reducirá su progresión en 13 puntos.
c) La presión arterial explica el 13 % de la variabilidad de la progresión.
d) Hay un 95 % de probabilidad de que el coeficiente sea exactamente 1,31.

---

### Pregunta 6 (aplicación)

Al ajustar el modelo completo, el coeficiente del colesterol total sale negativo (−1,26), aunque su correlación simple con la progresión es positiva (0,21). Los VIF son 54 para el colesterol y 36 para el LDL. ¿Cuál es la explicación más probable?

a) El colesterol protege frente a la progresión de la diabetes y la correlación simple estaba sesgada.
b) Hay un error en los datos que conviene corregir eliminando los pacientes con colesterol alto.
c) Los residuos son heterocedásticos, lo que invierte el signo de los coeficientes.
d) Colesterol y LDL están muy correlacionados (multicolinealidad) y sus coeficientes individuales se compensan; su signo aislado no es interpretable.

---

### Pregunta 7 (aplicación)

Comparas cuatro modelos y obtienes:

| Modelo | R² entrenamiento | R² validación cruzada | R² test |
|---|---|---|---|
| A | 0,52 | 0,48 | 0,49 |
| B | 0,60 | 0,17 | 0,42 |
| C | 0,30 | 0,28 | 0,27 |
| D | 0,55 | 0,43 | 0,50 |

¿Qué modelo muestra el síntoma más claro de **sobreajuste**?

a) A
b) B
c) C
d) D

---

### Pregunta 8 (aplicación)

Ajustas un modelo con la interacción centrada IMC × edad. Las pendientes del IMC estimadas para distintas edades son +4,95 (30 años), +5,97 (50 años) y +6,99 (70 años). El coeficiente de la interacción es 0,051 con p = 0,36 e IC 95 % [−0,06; 0,16]. ¿Qué conclusión es correcta?

a) La asociación del IMC con la progresión es claramente más fuerte en los mayores, así que conviene priorizar el control de peso a partir de los 70 años.
b) La interacción es significativa porque las pendientes cambian de 4,95 a 6,99.
c) Los datos no aportan evidencia suficiente de que la pendiente del IMC dependa de la edad; la diferencia observada es compatible con el ruido.
d) Al no ser significativa la interacción, también hay que eliminar el IMC del modelo.

---

### Pregunta 9 (decisión de negocio)

Un hospital puede hacer seguimiento intensivo al 20 % de sus pacientes. En test, el modelo Lasso tiene un MAE de 41,5 (predecir la media: 65,5) y, al seleccionar con él al 20 % de mayor riesgo predicho, captura el 68 % del verdadero 20 % de mayor progresión (al azar: 20 %). El test tiene 111 pacientes de un único hospital. ¿Cuál es la recomendación más sólida?

a) Usar el modelo para **priorizar** los seguimientos, comunicar el 68 % como cifra aproximada, no excluir a nadie de la atención estándar y validarlo con pacientes nuevos antes de generalizar.
b) No usar el modelo, porque un MAE de 41,5 puntos es demasiado alto para decisiones clínicas.
c) Usar el modelo para decidir qué pacientes dejan de recibir seguimiento, ya que captura a la mayoría de los de mayor riesgo.
d) Aplicar el modelo directamente en todos los hospitales de la región, porque un 68 % es más del triple que el azar.

---

### Pregunta 10 (decisión de negocio)

Una cadena de tiendas ajusta una regresión de ventas mensuales por tienda con datos observacionales de 400 tiendas. El coeficiente de «metros cuadrados de escaparate» es +1.200 €/m² (p < 0,001). El director de expansión propone ampliar el escaparate de todas las tiendas, esperando +1.200 € al mes por cada m² añadido. ¿Qué respuesta es la más adecuada?

a) Aprobar la propuesta: el coeficiente es muy significativo y por tanto representa el efecto causal de ampliar el escaparate.
b) Rechazar la propuesta, porque un coeficiente de una regresión múltiple nunca aporta información útil para decidir.
c) Sustituir la regresión por Lasso: si Lasso mantiene la variable, el efecto queda demostrado.
d) Advertir que el coeficiente es una asociación (las tiendas con más escaparate pueden estar en calles más comerciales) y proponer un piloto controlado, ampliando el escaparate en un grupo de tiendas elegido al azar y comparándolo con un grupo de control.

---

<details><summary>Solucionario (para instructores)</summary>

**1 → b.** La pendiente MCO es $r_{xy}\,s_y/s_x$; si ambas variables tienen desviación típica 1, la pendiente es $r$. (a) falla porque la suma de residuos sin cuadrado se cancela (siempre vale 0 con intercepto); (c) la recta pasa por $(\bar x, \bar y)$, no por el origen; (d) la pendiente depende de las unidades.

**2 → d.** El R² nunca disminuye al añadir variables en el mismo conjunto de ajuste, porque el modelo puede asignarles coeficiente casi cero; el R² ajustado penaliza el número de variables y tiende a bajar si no aportan. (a) confunde ajuste en entrenamiento con generalización; (b) y (c) ignoran la penalización del R² ajustado.

**3 → a.** Las observaciones repetidas de la misma tienda a lo largo del tiempo suelen tener errores correlacionados (autocorrelación). (b) la asimetría de $y$ no es un supuesto del modelo; (c) es multicolinealidad, que no afecta a la independencia de los errores; (d) se refiere a la normalidad.

**4 → c.** La validación cruzada se usa con el conjunto de entrenamiento para elegir y es más estable que una única partición. (a) el test se reserva para la evaluación final; (b) escalar antes de partir provoca precisamente fuga de información (el escalado debe ir dentro del pipeline); (d) con datos temporales no se baraja, se valida con el futuro.

**5 → a.** El IC 95 % [0,805; 1,822] por mmHg equivale a ~8–18 puntos por cada 10 mmHg, y es una asociación parcial. (b) es una lectura causal e individual no respaldada por datos observacionales; (c) confunde coeficiente con R²; (d) malinterpreta el intervalo de confianza.

**6 → d.** VIF tan altos indican multicolinealidad severa: el modelo reparte el efecto conjunto entre variables casi redundantes y sus signos individuales son inestables. (a) es una lectura causal errónea de un coeficiente inestable; (b) eliminar pacientes no es la solución ni hay evidencia de error; (c) la heterocedasticidad afecta a los errores estándar, no invierte signos.

**7 → b.** El modelo B tiene la mayor brecha entre entrenamiento (0,60) y validación cruzada (0,17): memoriza ruido. (c) tiene rendimiento bajo pero similar en todas las particiones (más bien infraajuste); A y D tienen brechas pequeñas.

**8 → c.** Con p = 0,36 e intervalo que incluye el 0, la diferencia de pendientes es compatible con el azar. (a) convierte un resultado no significativo en recomendación (y además causal); (b) confunde la magnitud observada con la significación; (d) la falta de significación de la interacción no dice nada en contra del efecto principal del IMC (que, centrado, es 5,9 con p < 0,001).

**9 → a.** El modelo mejora claramente la priorización frente al azar y frente a no usar modelo, pero la cifra es imprecisa (111 pacientes), procede de una sola población y deja escapar a ~1/3 de los pacientes de mayor riesgo. (b) ignora la comparación con la referencia; (c) usa el modelo para excluir, con riesgo clínico; (d) generaliza sin validación externa.

**10 → d.** Un coeficiente de datos observacionales no es causal: el tamaño del escaparate puede estar asociado a la ubicación, el tamaño de la tienda u otros factores de confusión. Un piloto aleatorizado permite estimar el efecto real. (a) confunde significación con causalidad; (b) es demasiado tajante, la regresión es útil para generar hipótesis y predecir; (c) la selección de variables con Lasso tampoco establece causalidad.

</details>
