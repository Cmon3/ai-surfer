# Módulo I1 · Cuestionario evaluable

**Datos no estructurados: clustering y reducción de dimensión**

10 preguntas tipo test. Cada pregunta tiene una única respuesta correcta. Tiempo orientativo: 20 minutos.

---

**1.** ¿Cuál de estas tareas es un problema de aprendizaje **no supervisado**?

- a) Predecir qué clientes se darán de baja a partir de un histórico de bajas y permanencias.
- b) Agrupar 50.000 artículos de prensa por temática sin disponer de ninguna categoría previa.
- c) Estimar el precio de una vivienda a partir de ventas pasadas con su precio final.
- d) Clasificar correos como spam o no spam usando un conjunto de correos ya etiquetados.

---

**2.** En el notebook se usa `KMeans(4, n_init=10, random_state=0)`. ¿Para qué sirve `n_init=10`?

- a) Para que el algoritmo haga como máximo 10 iteraciones y termine antes.
- b) Para probar automáticamente valores de *k* entre 1 y 10 y quedarse con el mejor.
- c) Para dividir los datos en 10 partes y hacer validación cruzada.
- d) Para ejecutar el algoritmo con 10 inicializaciones distintas y quedarse con la solución de menor inercia, ya que cada ejecución converge a un mínimo local.

---

**3.** En el clustering jerárquico aglomerativo, ¿qué hace el criterio de enlace de **Ward**?

- a) En cada paso une los dos grupos cuya fusión provoca el menor aumento de la suma de cuadrados intragrupo.
- b) Une los dos grupos cuyos puntos más cercanos están a menor distancia.
- c) Une los dos grupos cuyos puntos más lejanos están a menor distancia.
- d) Divide en cada paso el grupo más grande en dos mitades de igual tamaño.

---

**4.** ¿Qué controla el parámetro `perplexity` de t-SNE?

- a) El número de dimensiones del mapa final.
- b) El porcentaje de varianza que debe conservar la proyección.
- c) Aproximadamente, el número efectivo de vecinos que se tiene en cuenta para cada punto al definir su vecindario.
- d) El número de grupos que aparecerán en el mapa.

---

**5.** Al probar k-means con distintos *k* sobre clientes escalados obtienes:

| *k* | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| Inercia | 2.517 | 1.233 | 574 | 432 | 362 |
| Silueta | 0,47 | 0,63 | 0,64 | 0,60 | 0,54 |

¿Qué conclusión es la más correcta?

- a) Conviene *k* = 6 porque tiene la menor inercia de la tabla.
- b) Una silueta de 0,64 significa que el 64 % de los clientes está bien clasificado.
- c) El codo y la silueta apuntan a *k* = 4, pero *k* = 3 está casi empatado en silueta, así que la elección final debe apoyarse también en la utilidad de negocio de cada opción.
- d) Hay que elegir *k* = 2 porque es la solución más sencilla y la silueta es superior a 0,25.

---

**6.** Para un cliente concreto, la distancia media a los clientes de su propio grupo es $a(i) = 2$ y la distancia media a los del grupo vecino más cercano es $b(i) = 5$. ¿Cuál es su coeficiente de silueta?

- a) 0,6
- b) 0,4
- c) 1,5
- d) −0,6

---

**7.** Tras ajustar un PCA, `pca.explained_variance_ratio_` devuelve `[0.45, 0.25, 0.15, 0.10, 0.05]`. ¿Cuántas componentes necesitas como mínimo para conservar al menos el 85 % de la varianza?

- a) 2
- b) 4
- c) 5
- d) 3

---

**8.** La recencia de los clientes tiene media 110 días y desviación típica 140 días. Tras aplicar `StandardScaler`, ¿qué valor tendrá un cliente con recencia de 390 días?

- a) 2,79
- b) 2,0
- c) 0,5
- d) 280

---

**9.** Tu segmentación muestra que el segmento «VIP de ticket alto» reúne el 24 % de los clientes y el 58 % del valor anual, mientras que los «Dormidos» son el 14 % de los clientes y el 1 % del valor. Marketing propone dar un 20 % de descuento a todos los VIP «para premiar su fidelidad». ¿Qué recomiendas?

- a) Sustituir el descuento por beneficios no monetarios (envío prioritario, acceso anticipado), dedicar parte del presupuesto a reactivar dormidos y medir cada acción frente a un grupo de control.
- b) Aplicar el descuento, porque el segmento con más valor es siempre el que más retorno da a cualquier promoción.
- c) Aplicar el descuento a todos los segmentos por igual para no discriminar a ningún cliente.
- d) Eliminar a los dormidos de la base de datos, puesto que solo aportan el 1 % del valor.

---

**10.** Un equipo de producto te enseña un mapa t-SNE de sus usuarios en el que aparece una pequeña «isla» muy alejada del resto. Quieren lanzar un producto específico para ese grupo porque «es claramente el más diferente». ¿Qué haces antes de decidir?

- a) Aprobar el lanzamiento: la distancia en el mapa t-SNE demuestra que ese grupo es el más distinto.
- b) Aplicar k-means sobre las dos coordenadas del mapa y usar esos grupos como segmentación oficial.
- c) Repetir el mapa con PCA y, si la isla no aparece, concluir que el grupo no existe.
- d) Perfilar a los usuarios de la isla en las variables originales, comprobar si el grupo se mantiene con otras perplexities y semillas y con un clustering en el espacio original, y estimar su tamaño y valor.

---

<details><summary>Solucionario (para instructores)</summary>

| Pregunta | Respuesta | Tipo |
|---|---|---|
| 1 | b | Conceptual |
| 2 | d | Conceptual |
| 3 | a | Conceptual |
| 4 | c | Conceptual |
| 5 | c | Aplicación / interpretación |
| 6 | a | Aplicación / interpretación |
| 7 | d | Aplicación / interpretación |
| 8 | b | Aplicación / interpretación |
| 9 | a | Decisión de negocio |
| 10 | d | Decisión de negocio |

**1 → b.** Es la única tarea sin variable objetivo: se busca estructura (temas) solo en los datos. Las opciones a, c y d disponen de una respuesta conocida (baja, precio, spam) con la que entrenar y evaluar, así que son supervisadas.

**2 → d.** k-means siempre converge, pero a un mínimo local que depende de los centros iniciales; `n_init` repite el algoritmo con varios arranques y se queda con el de menor inercia. El número máximo de iteraciones es `max_iter` (a), y k-means nunca elige *k* por sí solo (b).

**3 → a.** Ward minimiza el aumento de la inercia al fusionar, por eso produce grupos compactos y parecidos a los de k-means. La opción b describe el enlace simple y la c el enlace completo; la d describe un método divisivo que no existe con ese nombre.

**4 → c.** La perplexity regula el tamaño del vecindario de cada punto (valores típicos 5–50). El número de dimensiones es `n_components` (a); t-SNE no conserva un porcentaje de varianza (b, eso es PCA) ni fija el número de grupos (d).

**5 → c.** El codo está en *k* = 4 y la silueta es máxima ahí, pero la diferencia con *k* = 3 es mínima, así que el negocio desempata. La inercia siempre baja con *k* (a es un error clásico); la silueta es una media de valores entre −1 y 1, no un porcentaje de aciertos (b); *k* = 2 tiene una silueta claramente peor (d).

**6 → a.** $s(i) = (b - a)/\max(a, b) = (5 - 2)/5 = 0{,}6$. La opción b resulta de dividir mal por $b$ el valor $a$ ($2/5$); la c es $(5-2)/2$, dividiendo por el mínimo; la d invierte el signo.

**7 → d.** Acumulado: 0,45 → 0,70 → 0,85. Con 3 componentes se alcanza exactamente el 85 %. Con 2 solo se llega al 70 % (a); 4 y 5 también cumplen, pero no son el mínimo (b, c).

**8 → b.** $z = (390 - 110)/140 = 280/140 = 2{,}0$. La opción a divide 390 entre 140 sin restar la media; la d resta la media pero no divide por la desviación; la c no corresponde a ninguna operación correcta.

**9 → a.** Los VIP ya compran: un descuento generalizado regala margen sin cambiar su comportamiento; los beneficios no monetarios fidelizan sin erosionar ingresos, y el presupuesto rinde más en reactivación, siempre medido con grupo de control. La b confunde valor del segmento con sensibilidad a la promoción; la c ignora la segmentación; la d descarta clientes que una reactivación barata podría recuperar.

**10 → d.** En t-SNE las distancias entre grupos no son interpretables, puede crear grupos aparentes y el resultado depende de los parámetros, así que hay que validar en el espacio original y valorar el tamaño del segmento. La a interpreta una distancia que t-SNE no conserva; la b agrupa sobre un mapa inestable y sin `transform` para usuarios nuevos; la c descarta el grupo solo porque un método lineal no lo separa en 2D.

</details>
