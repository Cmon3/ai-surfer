# Módulo DS4 · Sistemas de recomendación — Cuestionario semanal

10 preguntas tipo test. Cada pregunta tiene una única respuesta correcta.

---

**1. En el modelo de sesgos del notebook, el sesgo de una película se estima como $b_i = \dfrac{\sum_{u}(r_{ui} - \mu - b_u)}{|U(i)| + \lambda}$. ¿Qué efecto tiene el término $\lambda$ del denominador?**

a) Aumenta el sesgo de las películas más populares para que aparezcan antes.
b) Normaliza las notas para que queden entre 0 y 1.
c) Encoge hacia cero el sesgo de las películas con pocas valoraciones, de modo que su predicción se acerca a la media global.
d) Penaliza a los usuarios generosos para que no influyan en el sesgo de la película.

---

**2. En el filtrado colaborativo ítem-ítem del notebook, la similitud del coseno se calcula sobre los residuos ($r_{ui} - \mu - b_u - b_i$) en lugar de sobre las notas brutas. ¿Por qué?**

a) Para que la similitud refleje si los usuarios valoran dos películas por encima o por debajo de lo esperado, y no si son generosos o si las películas son buenas en general.
b) Porque el coseno no se puede calcular con números positivos.
c) Para reducir el número de películas que hay que comparar.
d) Porque así la matriz de similitud deja de ser simétrica.

---

**3. ¿Por qué no se suele aplicar directamente la SVD clásica del álgebra lineal a la matriz de valoraciones?**

a) Porque la SVD solo funciona con matrices cuadradas.
b) Porque la SVD no permite elegir el número de factores $k$.
c) Porque la SVD produce factores negativos, que no tienen interpretación.
d) Porque necesita la matriz completa, y la de valoraciones tiene la mayoría de celdas desconocidas; rellenarlas con ceros o medias distorsiona el resultado.

---

**4. En el modelo de retroalimentación implícita de Hu, Koren y Volinsky, cada celda tiene una preferencia $p_{ui} \in \{0, 1\}$ y una confianza $c_{ui} = 1 + \alpha\, r_{ui}$. ¿Qué representa $c_{ui}$?**

a) La probabilidad de que el usuario compre el ítem.
b) Cuánto peso damos a esa preferencia en el ajuste: crece con la intensidad de la interacción (minutos, reproducciones) y es mínima en lo no observado.
c) La nota en estrellas que el usuario habría dado al ítem.
d) El número de usuarios similares que han consumido el ítem.

---

**5. En el ejercicio 2 se entrena ALS ($k = 8$) con distintos valores de $\lambda$:**

| $\lambda$ | 0,1 | 1 | 3 | 8 | 30 |
|---|---|---|---|---|---|
| RMSE train | 0,357 | 0,366 | 0,438 | 0,606 | 0,900 |
| RMSE test | 0,869 | 0,687 | 0,678 | 0,746 | 0,950 |

**¿Qué interpretación es correcta?**

a) El mejor modelo es el de $\lambda = 0{,}1$, porque tiene el menor error de entrenamiento.
b) Con $\lambda = 0{,}1$ hay sobreajuste y con $\lambda = 30$ infraajuste; el mejor valor está entre 1 y 3.
c) Con $\lambda = 30$ hay sobreajuste, porque el error de test es el más alto.
d) La regularización no influye: todas las diferencias se deben al azar de la inicialización.

---

**6. Un modelo de factorización tiene $\mu = 3{,}6$, $b_u = -0{,}3$, $b_i = +0{,}5$, $p_u = (0{,}4;\ -0{,}2)$ y $q_i = (1{,}0;\ 0{,}5)$. ¿Cuál es la nota predicha $\hat r_{ui} = \mu + b_u + b_i + p_u^\top q_i$?**

a) 3,8
b) 4,0
c) 4,3
d) 4,1

---

**7. En la comparación del notebook, la popularidad obtiene una precisión@5 de 0,306 y la media global con desempates aleatorios, 0,299. ¿Cuál es la mejor explicación?**

a) La precisión@5 del notebook solo reordena las películas que cada usuario ya vio en test; "mucha gente la vio" no indica cuál de ellas le gustó más, así que la popularidad apenas aporta en esta métrica.
b) La popularidad está mal calculada: debería usar los datos de test.
c) Las películas populares siempre reciben peores notas que las de nicho.
d) La precisión@5 penaliza a los modelos que no predicen notas.

---

**8. En el ítem-ítem del notebook, la similitud se multiplica por $\frac{n_{ij}}{n_{ij} + 10}$, donde $n_{ij}$ es el número de usuarios que valoraron ambas películas. Dos películas tienen un coseno de 0,9 calculado con solo 5 usuarios en común. ¿Cuál es su similitud tras el encogimiento?**

a) 0,90
b) 0,45
c) 0,30
d) 0,60

---

**9. Un comercio online con 10 millones de clientes y 50.000 productos quiere un carrusel en la ficha de producto que funcione también para visitantes anónimos y que se pueda explicar ("porque estás viendo X"). El presupuesto de infraestructura es limitado. ¿Qué propuesta es más adecuada?**

a) Filtrado colaborativo usuario-usuario recalculado en tiempo real con la matriz completa de similitudes entre clientes.
b) Una lista de los productos más vendidos, igual en todas las fichas.
c) Reentrenar una factorización de matrices cada vez que un visitante entra en una ficha.
d) Filtrado colaborativo ítem-ítem, guardando los vecinos más similares de cada producto, precalculados cada noche.

---

**10. Un nuevo recomendador ALS mejora un 6 % la precisión@10 offline frente al ítem-ítem actual de una plataforma de vídeo. Antes de sustituirlo, ¿qué plan de validación es el más sólido?**

a) Desplegarlo para todos los usuarios y comparar los minutos vistos con los del mes anterior.
b) Prueba A/B aleatorizada por usuario, con minutos vistos por usuario (o retención) como métrica principal, métricas de guarda como diversidad del consumo y tiempo de carga, y duración y tamaño fijados de antemano.
c) Prueba A/B aleatorizada por sesión, con el número de clics en la portada como métrica principal, deteniéndola en cuanto el resultado sea significativo.
d) Repetir la evaluación offline con otra semilla aleatoria; si vuelve a ganar, desplegarlo.

---

<details><summary>Solucionario (para instructores)</summary>

1. **c)** El $+\lambda$ actúa como $\lambda$ "valoraciones ficticias" de residuo cero: con pocas notas el sesgo se encoge hacia 0 (predicción ≈ media global) y con muchas apenas cambia. No favorece a las populares (a) ni tiene que ver con normalizar (b) o con los usuarios generosos, que ya se recogen en $b_u$ (d).

2. **a)** Restar la referencia elimina los efectos generales (usuarios generosos, películas buenas) y deja el gusto relativo, de modo que el coseno se comporta como una correlación. El coseno sí se calcula con positivos (b), no reduce comparaciones (c) y la matriz sigue siendo simétrica (d).

3. **d)** La SVD clásica requiere todas las celdas; en recomendación se ajusta el modelo de factores solo con las notas observadas y con regularización. La SVD funciona con matrices rectangulares (a), permite truncar a $k$ factores (b), y el signo de los factores no es el problema (c).

4. **b)** La confianza pondera cada celda en la función objetivo: una interacción intensa pesa mucho y lo no observado pesa lo mínimo (1). No es una probabilidad de compra (a) ni una nota estimada (c).

5. **b)** Con λ = 0,1 el error de train es mínimo pero el de test alto (gran distancia: sobreajuste); con λ = 30 ambos son altos y parecidos (infraajuste, casi el modelo de sesgos). El error de train no sirve para elegir (a); un error de test alto con train también alto es infraajuste, no sobreajuste (c).

6. **d)** $p_u^\top q_i = 0{,}4 \cdot 1{,}0 + (-0{,}2)\cdot 0{,}5 = 0{,}3$; $3{,}6 - 0{,}3 + 0{,}5 + 0{,}3 = 4{,}1$. 3,8 (a) omite el producto escalar; 4,3 (c) suma $0{,}4 + 0{,}1$ cambiando el signo del segundo término.

7. **a)** La métrica reordena solo lo ya visto, así que mide "cuál le gustará más", no "qué verá". Usar test para calcular la popularidad sería fuga de información (b); (c) es una generalización falsa y la precisión@5 no exige predecir notas, solo ordenar (d).

8. **c)** $0{,}9 \cdot \frac{5}{5 + 10} = 0{,}9 \cdot \frac{1}{3} = 0{,}30$. 0,45 (b) correspondería a 10 usuarios en común; 0,90 (a) ignora el encogimiento.

9. **d)** Ítem-ítem escala mucho mejor (40.000 veces menos pares que usuario-usuario), es estable, se precalcula, funciona con una sola interacción (el producto que se está viendo) y se explica solo. Usuario-usuario es inviable a esa escala y no sirve para anónimos (a); la lista fija no personaliza (b); reentrenar en cada visita es absurdo en coste (c).

10. **b)** Solo un experimento aleatorizado mide el efecto causal; la unidad debe ser el usuario, la métrica de negocio y las guardas fijadas antes, sin parar en cuanto sale significativo. Comparar con el mes anterior confunde el efecto con la estacionalidad (a); aleatorizar por sesión, optimizar clics y hacer *peeking* son tres errores (c); repetir offline no mide el impacto en usuarios (d).

</details>
