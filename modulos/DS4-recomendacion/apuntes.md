# Módulo DS4 · Sistemas de recomendación — Apuntes

Cada vez que abres una plataforma de vídeo, una tienda online o una aplicación de música, alguien ha decidido qué ves primero. Con catálogos de miles o millones de productos y una atención limitada, esa decisión vale dinero: una buena parrilla aumenta el consumo, la retención y la satisfacción; una mala hace que el cliente se vaya sin encontrar nada. En este módulo aprenderás a construir esa decisión con datos: desde la referencia más sencilla (lo más popular) hasta la factorización de matrices, pasando por el filtrado colaborativo y por las preguntas incómodas que aparecen al desplegar: cómo evaluar, qué hacer con usuarios y productos nuevos y cómo evitar encerrar a la gente en una burbuja.

Los apuntes siguen la práctica guiada (`notebook.ipynb`), que simula una plataforma de *streaming* con 600 usuarios y 300 películas, y las soluciones de los ejercicios (`soluciones.ipynb`). Las cifras que verás aquí salen de esas ejecuciones.

## Índice

- [6.1 El problema de la recomendación y la matriz de valoraciones](#61-el-problema-de-la-recomendación-y-la-matriz-de-valoraciones)
- [6.2 Referencias: popularidad y modelo de sesgos](#62-referencias-popularidad-y-modelo-de-sesgos)
- [6.3 Filtrado colaborativo usuario-usuario e ítem-ítem](#63-filtrado-colaborativo-usuario-usuario-e-ítem-ítem)
- [6.4 Factorización de matrices: SVD y ALS](#64-factorización-de-matrices-svd-y-als)
- [6.5 Retroalimentación implícita (clics, visualizaciones)](#65-retroalimentación-implícita-clics-visualizaciones)
- [6.6 Evaluación offline y pruebas A/B de recomendadores](#66-evaluación-offline-y-pruebas-ab-de-recomendadores)
- [6.7 Arranque en frío, diversidad y burbujas de filtro](#67-arranque-en-frío-diversidad-y-burbujas-de-filtro)
- [Glosario](#glosario)

---

## 6.1 El problema de la recomendación y la matriz de valoraciones

### Por qué recomendar

Imagina una plataforma con 20.000 títulos. Un usuario medio dedica unos segundos a la pantalla de inicio antes de elegir algo o abandonar. No puede explorar el catálogo entero: depende de que le pongamos delante, en las primeras filas, lo que tiene más probabilidades de gustarle. El objetivo de negocio no es "acertar notas", sino **aumentar el valor que el cliente obtiene del catálogo** (y, con ello, el consumo, la conversión o la retención).

Hay además un argumento económico clásico: la **cola larga**. En casi cualquier catálogo, unos pocos productos concentran la mayor parte de las interacciones y la mayoría se consumen poco. En los datos del notebook, el 10 % de películas más vistas acumula el 38 % de las valoraciones. Un buen recomendador ayuda a que cada cliente descubra los productos de nicho que encajan con él, lo que reparte mejor la demanda y aprovecha un catálogo por el que ya se ha pagado.

### La matriz de valoraciones

El punto de partida es una tabla con tres columnas: usuario, ítem (película, producto, canción) y valoración. Si la reorganizamos con los usuarios en las filas y los ítems en las columnas obtenemos la **matriz de valoraciones** $R$, de tamaño $m \times n$:

$$
R = \begin{pmatrix}
5 & ? & 3 & ? & \cdots \\
? & 4 & ? & ? & \cdots \\
1 & ? & ? & 5 & \cdots \\
\vdots & & & & \ddots
\end{pmatrix}
$$

Cada celda $r_{ui}$ es la nota del usuario $u$ al ítem $i$; los interrogantes son las celdas que no conocemos. **Recomendar es, en esencia, rellenar los huecos** y luego ordenar, para cada usuario, los ítems con mejor predicción que todavía no ha visto.

En el notebook (sección 1) la matriz tiene $600 \times 300 = 180.000$ celdas, pero solo 20.775 valoraciones: una **densidad** del 11,5 %. Y es una densidad generosa: en MovieLens 100K (943 usuarios, 1.682 películas, 100.000 notas) la densidad es del 6,3 %, y en un e-commerce real suele estar muy por debajo del 1 %.

### Por qué la dispersión es un problema

Que la matriz esté casi vacía tiene tres consecuencias:

1. **Pocos datos por usuario e ítem.** En el notebook, cada usuario tiene de media 28 valoraciones en entrenamiento. Estimar sus gustos con tan poca información invita al **sobreajuste**: el modelo puede "memorizar" las pocas notas en lugar de aprender patrones. Por eso, en todo el módulo, verás regularización.
2. **Comparaciones difíciles.** Para decir que dos usuarios se parecen necesitamos ítems valorados por ambos. Con matrices muy dispersas, muchos pares tienen muy pocos ítems en común.
3. **Los huecos no son aleatorios.** La gente ve lo que cree que le va a gustar y lo que le muestran. En la simulación del notebook, la probabilidad de ver una película crece con su popularidad y con la nota que el usuario le daría. Es lo que se llama datos **faltantes no al azar** (*missing not at random*): la ausencia de una valoración ya contiene información, y un modelo entrenado solo con lo observado hereda ese sesgo.

### Familias de recomendadores

| Familia | Idea | Necesita | Punto fuerte | Punto débil |
|---|---|---|---|---|
| Popularidad | Lo que más gusta o más se consume | Solo interacciones agregadas | Robusto, sirve para usuarios nuevos | No personaliza |
| Basado en contenido | Ítems parecidos (en atributos) a los que te gustaron | Metadatos de los ítems | Funciona con ítems nuevos | Poca sorpresa, depende de la calidad de los metadatos |
| Filtrado colaborativo | "A quien le gustó X también le gustó Y" | Muchas interacciones | Descubre relaciones no evidentes | Arranque en frío |
| Híbrido | Combina los anteriores | Todo lo anterior | Lo mejor de cada uno | Más complejo |

El **filtrado colaborativo** es el corazón del módulo: no necesita saber nada de las películas, solo quién valoró qué. La estructura está en la propia matriz.

### Dos tareas distintas

Conviene separar dos preguntas que a menudo se confunden:

- **Predicción de la nota**: ¿qué valoración daría el usuario $u$ a la película $i$? Se mide con errores como el RMSE.
- **Recomendación top-N**: ¿qué $N$ películas le enseño? Se mide con métricas de ranking como la precisión@k.

Un modelo puede ser muy bueno prediciendo notas de películas mediocres y malo eligiendo las cinco primeras. En la lección 6.6 veremos por qué esto importa.

### Preparar la evaluación

En la sección 2 del notebook reservamos, **para cada usuario**, el 20 % de sus valoraciones como test. Así todos los usuarios aparecen en entrenamiento y en test, y podemos medir lo bien que el modelo completa sus huecos:

```python
test = valoraciones.groupby("usuario", group_keys=False).sample(frac=0.2, random_state=0)
train = valoraciones.drop(test.index)
R = np.full((n_usuarios, n_peliculas), np.nan)
R[train["usuario"], train["pelicula"]] = train["nota"]
```

Usar `NaN` para los huecos es deliberado: un 0 se confundiría con una nota (muy mala).

### Errores frecuentes

- **Rellenar los huecos con ceros** y tratarlos como notas reales: el modelo aprenderá que a todo el mundo le disgusta casi todo.
- **Partir los datos al azar sin mirar a los usuarios**: algunos podrían quedarse sin datos de entrenamiento.
- **Olvidar el objetivo de negocio**: optimizar una métrica técnica sin saber si se traduce en más consumo o retención.

> **Ideas clave**
> - Recomendar es rellenar una matriz usuario × ítem casi vacía y ordenar las predicciones de cada usuario.
> - La dispersión implica pocos datos por usuario e ítem: hace falta regularizar.
> - Los huecos no son aleatorios: la gente ve lo que le gusta y lo que le mostramos.
> - Distingue predecir la nota (RMSE) de elegir el top-N (métricas de ranking).
> - Practica: notebook, secciones 1 y 2.

---

## 6.2 Referencias: popularidad y modelo de sesgos

### Empezar por lo sencillo

Antes de construir un modelo sofisticado necesitas una **referencia** (*baseline*): un modelo simple que cualquier propuesta debe superar. Sin referencia no sabes si tu modelo de factorización aporta algo o si está ganando solo porque cualquier cosa razonable ganaría. En recomendación hay dos referencias imprescindibles: la popularidad y el modelo de sesgos.

### Popularidad

La recomendación por popularidad muestra a todos los usuarios los mismos ítems: los más vistos, los más vendidos o los mejor valorados. En el notebook (sección 3) la puntuación de cada película es su número de valoraciones en entrenamiento:

```python
pred_popular = np.tile(np.bincount(train["pelicula"], minlength=n_peliculas), (n_usuarios, 1))
```

Ventajas: es barata, estable, fácil de explicar ("lo más visto esta semana") y es lo único que puedes ofrecer a un usuario sin historial. Inconvenientes: no personaliza y alimenta un círculo vicioso (lo popular se muestra más, se ve más y parece aún más popular).

Hay un matiz importante entre "más visto" y "mejor valorado". Si ordenas por **nota media bruta**, la primera posición se la llevará una película con una sola valoración de 5 estrellas. La solución es **encoger** la media hacia la media global cuando hay pocas notas (una "media bayesiana"):

$$
\tilde r_i = \frac{\sum_{u} r_{ui} + \lambda\,\mu}{n_i + \lambda}
$$

donde $n_i$ es el número de notas de la película, $\mu$ la media global y $\lambda$ cuántas "notas ficticias" de valor $\mu$ añadimos. Con pocas notas reales, manda $\mu$; con muchas, manda la media de la película.

### El modelo de sesgos

Las notas tienen dos efectos sistemáticos que no tienen nada que ver con el "encaje" entre usuario y película:

- Hay **usuarios generosos** (todo les parece de 4 o 5) y usuarios exigentes.
- Hay **películas mejores** que otras, que casi todo el mundo valora por encima de la media.

El modelo de sesgos (*baseline predictors*) lo recoge así:

$$
\hat r_{ui} = \mu + b_u + b_i
$$

donde $\mu$ es la media global (3,75 en el notebook), $b_u$ el sesgo del usuario y $b_i$ el de la película. Un ejemplo: si $\mu = 3{,}75$, Ana es exigente ($b_u = -0{,}4$) y la película es muy buena ($b_i = +0{,}8$), predecimos $3{,}75 - 0{,}4 + 0{,}8 = 4{,}15$.

### Cómo se estiman

Queremos los $b_u$ y $b_i$ que minimizan el error cuadrático en las notas observadas, con una penalización para que los sesgos de quien tiene pocas notas no se disparen:

$$
\min_{b} \sum_{(u,i)\ \text{observadas}} \left(r_{ui} - \mu - b_u - b_i\right)^2 + \lambda\left(\sum_u b_u^2 + \sum_i b_i^2\right)
$$

El notebook lo resuelve alternando: con los $b_u$ fijos, cada $b_i$ tiene solución cerrada (la media de los residuos de la película, encogida), y viceversa:

$$
b_i = \frac{\sum_{u \in U(i)} (r_{ui} - \mu - b_u)}{|U(i)| + \lambda}, \qquad
b_u = \frac{\sum_{i \in I(u)} (r_{ui} - \mu - b_i)}{|I(u)| + \lambda}
$$

Fíjate en el $+\lambda$ del denominador: es exactamente el encogimiento de la media bayesiana. Con `lam=5`, una película con 5 notas ve su sesgo reducido a la mitad; una con 400 notas casi no se toca. En el notebook, los sesgos de película van de −1,25 a +1,09 y los de usuario de −0,85 a +0,80: diferencias de más de una estrella que un modelo personalizado no debería tener que "aprender" desde cero.

### Cuánto aportan

| Modelo | RMSE | precisión@5 |
|---|---|---|
| Media global | 1,091 | 0,299 (≈ azar) |
| Popularidad | — | 0,306 |
| Sesgos | 0,957 | 0,361 |

Dos lecturas. Primera: el modelo de sesgos reduce el error un 12 % respecto a la media global sin personalizar nada (para ordenar las películas de un usuario, $\mu + b_u$ es constante y solo cuenta $b_i$). Segunda: la popularidad apenas supera al azar en precisión@5. ¿Significa que no sirve? No: la métrica del notebook solo reordena películas que el usuario **ya vio**, y ahí "lo vio mucha gente" no dice si a él le encantó. Para decidir qué mostrar a alguien sin historial, la popularidad es muy útil (lo verás en la lección 6.7).

En datos reales la historia se repite: en las referencias publicadas sobre MovieLens 100K, el modelo de sesgos consigue un RMSE de 0,944, mientras que modelos mucho más complejos se quedan en 0,92–0,93. **Los sesgos explican la mayor parte de lo explicable**; lo colaborativo se pelea por el resto.

### Ejemplo de negocio

Una cadena de librerías online quiere una sección "Imprescindibles" en la portada. Ordenar por nota media bruta llenaría la sección de libros autoeditados con tres reseñas de amigos. Ordenar por ventas mostraría siempre los mismos *best-sellers*. Una media encogida (o $b_i$ regularizado) combinada con un mínimo de ventas ofrece libros que gustan de verdad y que tienen suficiente evidencia detrás.

### Errores frecuentes

- **No regularizar**: los sesgos de ítems con una o dos notas se vuelven extremos y copan los primeros puestos.
- **Comparar con una referencia demasiado débil** (azar o media global) para que el modelo complejo parezca brillante.
- **Calcular los sesgos con datos de test** (fuga de información): la media global y los sesgos se estiman solo con entrenamiento.

> **Ideas clave**
> - Toda propuesta debe compararse con referencias: popularidad y modelo de sesgos.
> - $\hat r_{ui} = \mu + b_u + b_i$ captura usuarios generosos y películas mejores; ya reduce mucho el error.
> - El $+\lambda$ del denominador encoge hacia la media a quien tiene pocos datos.
> - La popularidad no personaliza, pero es la base del arranque en frío.
> - Practica: notebook, sección 3.

---

## 6.3 Filtrado colaborativo usuario-usuario e ítem-ítem

### La intuición

El filtrado colaborativo basado en vecinos se apoya en una idea cotidiana: si quieres saber si te gustará una película, pregunta a gente con gustos parecidos a los tuyos (**usuario-usuario**), o piensa en películas parecidas a otras que ya te gustaron (**ítem-ítem**). "Parecido" no se define por el género o el director, sino por el comportamiento: dos películas son parecidas si los mismos usuarios las valoran de forma parecida.

### Usuario-usuario

Para predecir la nota de $u$ a la película $i$:

1. Calcula la similitud de $u$ con los demás usuarios.
2. Quédate con los $k$ más similares que **han visto** $i$ (sus vecinos $N_k(u; i)$).
3. Promedia sus notas, ponderando por la similitud.

Para no mezclar usuarios generosos con exigentes, se promedian **desviaciones** respecto a la referencia, no notas brutas:

$$
\hat r_{ui} = b_{ui} + \frac{\sum_{v \in N_k(u;i)} s_{uv}\,(r_{vi} - b_{vi})}{\sum_{v \in N_k(u;i)} |s_{uv}|}
$$

donde $b_{ui} = \mu + b_u + b_i$ es la predicción del modelo de sesgos.

### Ítem-ítem

Es la misma idea con los papeles cambiados: para predecir $r_{ui}$ buscamos las películas más parecidas a $i$ que $u$ ya ha valorado y promediamos sus desviaciones:

$$
\hat r_{ui} = b_{ui} + \frac{\sum_{j \in N_k(i;u)} s_{ij}\,(r_{uj} - b_{uj})}{\sum_{j \in N_k(i;u)} |s_{ij}|}
$$

Es el famoso "quien compró esto también compró…", popularizado por los grandes comercios electrónicos a principios de los 2000.

### Medir la similitud

La medida más habitual es el **coseno** entre los vectores de residuos (notas menos referencia) de dos películas:

$$
s_{ij} = \frac{\sum_u e_{ui}\, e_{uj}}{\sqrt{\sum_u e_{ui}^2}\,\sqrt{\sum_u e_{uj}^2}}, \qquad e_{ui} = r_{ui} - b_{ui}\ \text{(0 si no observada)}
$$

Al restar los sesgos, el coseno se parece mucho a una correlación de Pearson: mide si los usuarios que valoran $i$ por encima de lo esperado también valoran $j$ por encima de lo esperado.

Dos ajustes prácticos que usa el notebook (sección 4):

- **Encogimiento por soporte.** Una similitud calculada con dos usuarios en común es puro ruido. Se multiplica por $\frac{n_{ij}}{n_{ij} + \lambda}$, donde $n_{ij}$ es el número de usuarios que valoraron ambas películas. Con `encogimiento=10`, un par con 10 usuarios en común conserva la mitad de su similitud.
- **Solo los $k$ vecinos más parecidos** (`k_vecinos=30`). Sumar cientos de vecinos poco similares diluye la señal.

El cálculo está vectorizado: con la matriz de residuos $E$ (usuarios × películas), todas las similitudes salen de un producto de matrices $E^\top E$.

```python
residuos = np.where(mask, R - pred_sesgos, 0)
co = mask.T.astype(float) @ mask.astype(float)             # usuarios en común
normas = np.sqrt((residuos ** 2).sum(0))
sim = (residuos.T @ residuos) / (np.outer(normas, normas) + 1e-9)
sim *= co / (co + encogimiento)
```

### Resultados

| Modelo | RMSE | precisión@5 |
|---|---|---|
| Sesgos | 0,957 | 0,361 |
| Usuario-usuario (ejercicio 3) | 0,856 | 0,388 |
| Ítem-ítem | 0,813 | 0,390 |

Los dos superan claramente a la referencia: hay estructura colaborativa que los sesgos no capturan. Ítem-ítem gana en RMSE porque cada película tiene de media unas 55 valoraciones en entrenamiento y cada usuario solo unas 28: las similitudes entre películas se estiman con más datos.

### Por qué ítem-ítem escala mejor

Piensa en un comercio con 10 millones de clientes y 50.000 productos:

| | Usuario-usuario | Ítem-ítem |
|---|---|---|
| Pares a comparar | $10^{14}$ | $2{,}5 \cdot 10^{9}$ |
| Matriz densa en float32 | 400 TB | 10 GB |
| Estabilidad | Cambia con cada clic | Muy estable: se precalcula por la noche |
| Explicación | "Gente como tú…" | "Porque viste X" |

Hay 40.000 veces más pares de usuarios que de productos. Además, las similitudes entre productos cambian poco (dos cámaras de fotos parecidas lo siguen siendo mañana), así que se calculan en lotes y se sirven con una simple consulta. Un usuario nuevo que acaba de ver un producto ya recibe recomendaciones. En la práctica, ninguno de los dos guarda la matriz densa: se guardan solo los 50–100 vecinos de cada ítem y se usan técnicas de búsqueda aproximada de vecinos.

Usuario-usuario tiene sentido cuando hay pocos usuarios y muchos ítems que cambian rápido (noticias, anuncios clasificados) o cuando interesa el concepto de "comunidad".

### Ejemplo de negocio

Una tienda de material deportivo pone en cada ficha de producto un carrusel "Clientes que compraron estas zapatillas también compraron…". Es ítem-ítem puro: se calcula cada noche, se explica solo y funciona para un visitante anónimo que llega desde un buscador directamente a la ficha.

### Errores frecuentes

- **Usar notas brutas** en lugar de residuos: los usuarios generosos parecen similares a todos.
- **No encoger** similitudes con poco soporte: dos películas de nicho con dos usuarios en común aparecen como "idénticas".
- **Recomendar lo ya consumido**: filtra siempre lo que el usuario ya vio o compró (salvo productos de recompra).

> **Ideas clave**
> - Usuario-usuario: vecinos con gustos parecidos; ítem-ítem: ítems valorados de forma parecida.
> - Calcula similitudes sobre residuos (tras restar sesgos) y encógelas según el soporte.
> - Ítem-ítem suele ser más preciso, más estable, más barato y más explicable.
> - Practica: notebook, sección 4 y ejercicio 3.

---

## 6.4 Factorización de matrices: SVD y ALS

### Gustos latentes

Los vecinos funcionan, pero tienen un límite: solo relacionan ítems que comparten usuarios. La factorización de matrices da un paso más: supone que tanto los usuarios como las películas se pueden describir con unos pocos **factores latentes** ("cuánta acción", "cuánta comedia", "cuánto de cine de autor"…) y que la nota depende de cuánto encajan.

Cada usuario $u$ tiene un vector $p_u \in \mathbb{R}^k$ (sus gustos) y cada película $i$ un vector $q_i \in \mathbb{R}^k$ (sus características). El encaje es el producto escalar:

$$
\hat r_{ui} = \mu + b_u + b_i + p_u^\top q_i
$$

En forma matricial, la parte de interacción es $R \approx P Q^\top$, con $P$ de tamaño usuarios × $k$ y $Q$ de tamaño películas × $k$. Con $k = 8$ y nuestros datos, en lugar de 180.000 celdas guardamos $(600 + 300) \times 8 = 7.200$ números. Una fila de $Q$ es el "retrato" de una película en el espacio de gustos; una fila de $P$, el de un usuario.

Los factores **no tienen nombre**: el algoritmo descubre las direcciones que mejor explican las notas. A veces son interpretables (al mirar las películas con valores extremos de un factor) y a veces no.

### ¿Y la SVD?

La **descomposición en valores singulares** (SVD) es la herramienta clásica del álgebra lineal para aproximar una matriz por otra de rango $k$: $R \approx U_k \Sigma_k V_k^\top$. Es la misma idea que la PCA del módulo 02. El problema es que la SVD clásica necesita la matriz **completa**, y la nuestra tiene un 88 % de huecos. Rellenarlos con ceros o con la media distorsiona el resultado.

Por eso, en recomendación, "SVD" suele significar otra cosa: el modelo de arriba, ajustado **solo con las celdas observadas**. Esta variante se popularizó durante el Premio Netflix (2006–2009). La función objetivo es:

$$
\min_{P,Q} \sum_{(u,i)\ \text{observadas}} \left(r_{ui} - \mu - b_u - b_i - p_u^\top q_i\right)^2 + \lambda\left(\sum_u \lVert p_u\rVert^2 + \sum_i \lVert q_i\rVert^2\right)
$$

El término $\lambda$ vuelve a ser imprescindible: sin él, con 8 factores por usuario y 28 notas, el modelo memorizaría el ruido.

### Dos formas de optimizar

**Descenso de gradiente estocástico (SGD).** Recorre las notas una a una y corrige $p_u$ y $q_i$ un poquito en la dirección que reduce el error. Es sencillo y flexible.

**Mínimos cuadrados alternados (ALS).** Observa que, si fijas $Q$, encontrar cada $p_u$ es una regresión ridge con $k$ coeficientes, que tiene solución cerrada:

$$
p_u = \left(Q_{I(u)}^\top Q_{I(u)} + \lambda I\right)^{-1} Q_{I(u)}^\top\, e_{u,I(u)}
$$

donde $Q_{I(u)}$ son las filas de $Q$ de las películas que vio $u$ y $e_{u,I(u)}$ sus residuos respecto a los sesgos. Después fijas $P$ y resuelves cada $q_i$ de la misma forma. Alternando unas pocas veces, el error converge. Es exactamente lo que hace la función `als` del notebook (sección 5):

```python
for u in range(R.shape[0]):
    idx = mask[u]
    P[u] = np.linalg.solve(Q[idx].T @ Q[idx] + I, Q[idx].T @ Rc[u, idx])
```

| | SGD | ALS |
|---|---|---|
| Paso | Nota a nota | Usuario a usuario / ítem a ítem |
| Hiperparámetros | Tasa de aprendizaje, épocas, λ | Solo λ e iteraciones |
| Paralelización | Más delicada | Trivial: cada $p_u$ es independiente |
| Retroalimentación implícita | Costosa | Muy eficiente (lección 6.5) |

### Elegir $k$ y $\lambda$

En la sección 7 del notebook, con 8 iteraciones, el RMSE de test según $k$ es:

| $k$ | 1 | 2 | 4 | 8 | 16 | 32 |
|---|---|---|---|---|---|---|
| RMSE | 0,897 | 0,847 | 0,743 | 0,746 | 0,748 | 0,749 |

El error cae hasta $k = 4$ (justo el número de "gustos" con el que se simularon los datos) y luego se estabiliza: la regularización evita que los factores sobrantes perjudiquen mucho. Con $\lambda$ (ejercicio 2, $k = 8$):

| $\lambda$ | 0,1 | 1 | 3 | 8 | 30 |
|---|---|---|---|---|---|
| RMSE train | 0,357 | 0,366 | 0,438 | 0,606 | 0,900 |
| RMSE test | 0,869 | 0,687 | 0,678 | 0,746 | 0,950 |

Con $\lambda$ pequeño el modelo **sobreajusta** (error de train bajísimo, de test alto); con $\lambda = 30$ **infraajusta** y se queda casi en el modelo de sesgos. El óptimo aquí está entre 1 y 3, mejor que el valor por defecto del notebook. Moraleja: $k$ y $\lambda$ se eligen con datos de validación.

### Resultados e interpretación

ALS ($k = 8$, $\lambda = 8$) consigue RMSE 0,746 y precisión@5 0,399, el mejor de la comparación de la sección 6. Además de predecir, los factores sirven para:

- **Películas similares**: películas con vectores $q_i$ cercanos (por coseno).
- **Recomendaciones para un usuario**: ordenar $p_u^\top q_i$ (más los sesgos) para las películas no vistas (sección 8).
- **Segmentación**: agrupar usuarios por sus vectores $p_u$ (clustering, módulo 02).

### Ejemplo de negocio

Una plataforma de música factoriza la matriz usuario × artista. Los vectores de artistas permiten construir radios "parecidas a X" y los de usuarios alimentan las listas semanales personalizadas. Como servir la recomendación es un producto escalar, se puede precalcular o resolver con búsqueda aproximada de vecinos en milisegundos.

### Errores frecuentes

- **Aplicar la SVD clásica a la matriz con huecos rellenados con ceros.**
- **Elegir $k$ mirando el error de entrenamiento**: siempre baja al aumentar $k$.
- **Interpretar los factores como si tuvieran nombre propio** sin comprobarlo.

> **Ideas clave**
> - $\hat r_{ui} = \mu + b_u + b_i + p_u^\top q_i$: gustos del usuario por características de la película.
> - La "SVD" de recomendación se ajusta solo con las notas observadas y con regularización.
> - ALS alterna regresiones ridge con solución cerrada; es fácil de paralelizar.
> - $k$ y $\lambda$ controlan el equilibrio entre sobreajuste e infraajuste.
> - Practica: notebook, secciones 5, 7 y 8; ejercicio 2.

---

## 6.5 Retroalimentación implícita (clics, visualizaciones)

### Explícita frente a implícita

Hasta ahora hemos trabajado con **valoraciones explícitas**: el usuario dice "4 estrellas". Son claras, pero escasas: la mayoría de la gente nunca valora nada. Lo que sí deja todo el mundo es un rastro de **comportamiento**: clics, reproducciones, minutos vistos, compras, añadidos a la cesta, búsquedas. Es la **retroalimentación implícita**.

| | Explícita | Implícita |
|---|---|---|
| Ejemplos | Estrellas, "me gusta" | Clics, minutos vistos, compras |
| Volumen | Bajo | Muy alto |
| Señal negativa | Sí (1 estrella) | Casi nunca |
| Ruido | Moderado | Alto (clic por error, regalo, autoplay) |
| Intensidad | La nota | La frecuencia o la duración |

### El problema de los negativos

En los datos implícitos no hay "no me gusta". Que un usuario no haya visto una película puede significar que no le interesa, que no la conoce o que no la tiene disponible. Si solo entrenamos con las celdas observadas (como en la lección 6.4), todas valdrían "1" y el modelo aprendería a predecir 1 para todo.

La solución clásica (Hu, Koren y Volinsky, 2008) separa dos conceptos:

- **Preferencia** $p_{ui}$: 1 si el usuario interactuó con el ítem, 0 si no.
- **Confianza** $c_{ui}$: cuánto nos creemos esa preferencia. Crece con la intensidad de la interacción $r_{ui}$ (minutos, número de reproducciones):

$$
c_{ui} = 1 + \alpha\, r_{ui}
$$

Así, ver una serie entera da mucha confianza en el "le gusta"; un clic de dos segundos, poca; y no haberla visto da un "no le gusta" con confianza mínima (1).

### El modelo: ALS ponderado

Ahora **todas** las celdas de la matriz entran en la función objetivo, ponderadas por su confianza:

$$
\min_{P,Q} \sum_{u,i} c_{ui}\left(p_{ui} - x_u^\top y_i\right)^2 + \lambda\left(\sum_u \lVert x_u\rVert^2 + \sum_i \lVert y_i\rVert^2\right)
$$

(con $x_u$ e $y_i$ los vectores latentes). Sumar sobre todas las celdas parece inabordable (10 millones × 50.000), pero ALS tiene un truco: al resolver cada $x_u$, el término de todos los ítems se puede precalcular una sola vez ($Y^\top Y$) y solo hay que corregirlo con los ítems con los que el usuario interactuó. Por eso ALS es el algoritmo de referencia para datos implícitos a gran escala, y está implementado en librerías abiertas como `implicit` o Spark MLlib:

```python
import implicit
modelo = implicit.als.AlternatingLeastSquares(factors=64, regularization=0.05)
modelo.fit(matriz_usuario_item)          # matriz dispersa con las confianzas
ids, puntuaciones = modelo.recommend(usuario, matriz_usuario_item[usuario], N=10)
```

### Otras ideas para datos implícitos

- **Muestreo de negativos**: en lugar de usar todas las celdas no observadas, se toman al azar unas cuantas por cada positiva.
- **Aprender a ordenar** (por ejemplo, *Bayesian Personalized Ranking*, BPR): en vez de predecir 0/1, el modelo aprende que un ítem consumido debe puntuar más que uno no consumido. Optimiza directamente el orden, que es lo que importa en el top-N.
- **Ponderar por recencia**: un clic de ayer dice más de los gustos actuales que uno de hace dos años.

### Cómo evaluar

Con datos implícitos no hay notas que comparar, así que el RMSE pierde sentido. Se usan métricas de ranking: de los ítems con los que el usuario interactuó en el periodo de test, ¿cuántos aparecían en su top-10 (*recall@10*, *hit rate*) y en qué posición (*NDCG*)? Lo verás en la lección 6.6. Además, la partición suele ser **temporal**: entrenas con el pasado y evalúas con lo que ocurrió después.

### Ejemplo de negocio

Una plataforma de *streaming* decide qué cuenta como señal. Opciones: "inició la reproducción", "vio más del 70 %", "minutos vistos". La primera está muy contaminada por portadas llamativas y el *autoplay*; la segunda es más fiable; la tercera premia los contenidos largos. Una elección habitual es usar como confianza el porcentaje visto, con un umbral mínimo, y tratar los abandonos en los primeros minutos como señal débil o incluso negativa. Esta decisión de "ingeniería de la señal" suele pesar más que la elección del algoritmo.

### Errores frecuentes

- **Tratar lo no visto como "no le gusta" con la misma confianza que lo visto.**
- **Usar clics sin limpiar**: robots, *autoplay*, clics accidentales.
- **Medir con RMSE** un modelo de datos implícitos.
- **Optimizar la señal equivocada**: si premias clics, el sistema aprenderá a recomendar portadas llamativas (*clickbait*).

> **Ideas clave**
> - Los datos implícitos son abundantes pero ruidosos y sin negativos explícitos.
> - Se separan preferencia (¿interactuó?) y confianza (¿cuánto?): $c_{ui} = 1 + \alpha r_{ui}$.
> - ALS ponderado usa todas las celdas de forma eficiente; BPR aprende directamente a ordenar.
> - Evalúa con métricas de ranking y particiones temporales.

---

## 6.6 Evaluación offline y pruebas A/B de recomendadores

### Tres niveles de evaluación

1. **Offline**: con datos históricos, sin tocar a los usuarios. Rápido y barato; sirve para descartar ideas.
2. **Online (prueba A/B)**: una parte de los usuarios recibe el modelo nuevo y comparamos su comportamiento con el grupo de control. Mide el efecto real.
3. **Estudios con usuarios**: encuestas o entrevistas sobre la percepción (¿confías en las recomendaciones?, ¿te sorprenden?).

### Métricas de error

El **RMSE** mide cuánto se equivoca la nota predicha:

$$
\text{RMSE} = \sqrt{\frac{1}{|T|}\sum_{(u,i)\in T}\left(\hat r_{ui} - r_{ui}\right)^2}
$$

Es fácil de calcular y penaliza mucho los errores grandes. Su problema es que trata igual todos los errores: equivocarse entre 1 y 2 estrellas en una película que nunca recomendarías pesa lo mismo que equivocarse en la primera posición de la portada.

### Métricas de ranking

Lo que ve el usuario es una lista. Las métricas de ranking evalúan las primeras posiciones:

- **Precisión@k**: de los $k$ ítems recomendados, qué fracción es relevante.
- **Recall@k**: de los ítems relevantes del usuario, qué fracción aparece en el top-$k$.
- **NDCG@k**: premia que los relevantes estén **arriba**; un acierto en la posición 1 vale más que en la 5:

$$
\text{DCG@}k = \sum_{j=1}^{k} \frac{\text{rel}_j}{\log_2(j+1)}, \qquad \text{NDCG@}k = \frac{\text{DCG@}k}{\text{DCG@}k\ \text{ideal}}
$$

El notebook usa una versión sencilla de la precisión@5: para cada usuario con al menos 5 películas en test, ordena **esas películas** según el modelo, toma las 5 primeras y mide qué fracción recibió 5 estrellas. Tiene una limitación que conviene entender: solo reordena películas que el usuario **ya vio**. Por eso la popularidad sale casi como el azar (0,306 frente a 0,299): no le estamos preguntando si sabe qué verá el usuario, sino si sabe cuál le gustará más entre las que vio. En sistemas reales se ordena **todo el catálogo** no visto y se comprueba si los ítems de test aparecen arriba.

### Cómo partir los datos

- **Aleatoria por usuario** (la del notebook): sencilla, pero el modelo puede "ver el futuro" (entrenar con notas de 2024 para predecir notas de 2022).
- **Temporal**: entrenas hasta una fecha y evalúas después. Es lo que más se parece al despliegue real.
- **Por usuarios completos**: dejas usuarios enteros fuera para medir el arranque en frío.

Cuidado con la **fuga de información**: sesgos, similitudes y medias se calculan solo con entrenamiento.

### Más allá de la precisión

Un recomendador que acierta siempre recomendando los mismos 50 éxitos puede tener buena precisión y ser malo para el negocio. Se vigilan también:

- **Cobertura**: qué porcentaje del catálogo llega a recomendarse alguna vez.
- **Diversidad**: cuán distintos son entre sí los ítems de una misma lista.
- **Novedad**: cuán poco conocidos son los ítems recomendados.
- **Serendipia**: aciertos que el usuario no habría encontrado solo.

### Pruebas A/B

Al final, la pregunta es causal: **¿el nuevo recomendador cambia el comportamiento?** Eso solo lo responde un experimento (módulo 04):

1. **Unidad de aleatorización**: el usuario (no la sesión), para que cada persona vea siempre la misma versión.
2. **Métrica principal** alineada con el negocio: minutos vistos por usuario, conversión, retención a 30 días.
3. **Métricas de guarda**: tiempo de carga, quejas, diversidad del consumo, ingresos por ítem (por si el modelo empuja contenidos caros de licenciar).
4. **Tamaño muestral y duración** decididos antes de empezar, cubriendo al menos un ciclo semanal; cuidado con el **efecto novedad** (al principio la gente hace clic en lo nuevo por curiosidad).

Una alternativa más sensible para comparar rankings es el ***interleaving***: a cada usuario se le muestra una lista que mezcla los resultados de los dos modelos y se cuenta en cuáles hace clic. Necesita muchos menos usuarios, pero no mide efectos de negocio a largo plazo.

### Por qué offline y online no coinciden

Un modelo puede mejorar el RMSE y no cambiar las ventas. Motivos habituales:

- El RMSE mejora en ítems que nunca llegan al top de la lista.
- Los datos históricos se generaron con el recomendador anterior (**bucle de retroalimentación**): solo sabemos qué opinan los usuarios de lo que les enseñamos.
- La mejora es real pero recomienda cosas que el usuario habría encontrado igualmente (no hay efecto incremental).

### Ejemplo de negocio

Un *marketplace* de cursos online prueba un modelo ALS frente a ítem-ítem. Offline, ALS mejora la precisión@10 un 6 %. En el A/B (50/50 por usuario, 3 semanas), las matrículas por usuario suben un 1,2 % con un intervalo de confianza que no incluye el cero, y las métricas de guarda (cancelaciones, diversidad de categorías) no empeoran. Decisión: desplegar. Si las matrículas no hubieran cambiado, la mejora offline no justificaría el coste de mantener un modelo más complejo.

### Errores frecuentes

- **Elegir el modelo solo por el RMSE.**
- **Partir al azar datos con fuerte componente temporal.**
- **Ajustar hiperparámetros con el conjunto de test** (usa validación).
- **Parar el A/B en cuanto sale significativo** (*peeking*).

> **Ideas clave**
> - RMSE mide notas; precisión@k, recall@k y NDCG miden la lista que ve el usuario.
> - La forma de partir los datos (temporal, por usuario) cambia las conclusiones.
> - Vigila cobertura, diversidad y novedad, no solo la precisión.
> - La decisión final la toma una prueba A/B con una métrica de negocio y métricas de guarda.
> - Practica: notebook, secciones 2 y 6.

---

## 6.7 Arranque en frío, diversidad y burbujas de filtro

### Tres arranques en frío

El filtrado colaborativo necesita historial. Cuando no lo hay, aparece el **arranque en frío** (*cold start*):

- **Usuario nuevo**: no hay $b_u$ ni $p_u$.
- **Ítem nuevo**: un estreno sin valoraciones no tiene $b_i$ ni $q_i$; nunca se recomendará y, por tanto, nunca acumulará valoraciones.
- **Sistema nuevo**: una plataforma que acaba de lanzarse.

### Usuario nuevo

En el ejercicio 1 de las soluciones tratamos a todos los usuarios de test como si fueran nuevos y les mostramos la misma lista de 10 películas:

| Lista | Cobertura de visionado | Usuarios con un acierto de 5★ | Nota media de lo visto |
|---|---|---|---|
| Más populares | 0,815 | 0,413 | 3,90 |
| Mejor valoradas ($b_i$ regularizado) | 0,362 | 0,278 | 4,59 |
| Media bruta sin regularizar | 0,287 | 0,215 | 4,62 |
| Híbrido popularidad + calidad | 0,717 | 0,418 | 4,15 |

La lista popular es la que más gente ve, pero gusta solo regular; la de mejor valoradas gusta mucho, pero es de nicho; la media bruta es la peor (películas con muy pocas notas que casi nadie ve). El **híbrido** combina cobertura y calidad. Sobre esa base:

1. **Contexto**: segmentar la lista por país, idioma, dispositivo u hora.
2. ***Onboarding***: pedir 3–5 géneros o títulos favoritos.
3. **Aprender rápido**: con unas pocas interacciones ya funciona ítem-ítem; y en ALS se calcula $p_u$ con $Q$ fijo (una regresión ridge de tamaño $k$) sin reentrenar todo.

### Ítem nuevo

La solución es **híbrida**: aprender una función de los metadatos del ítem (géneros, reparto, sinopsis, precio…) a sus parámetros colaborativos. En el ejercicio 1b retiramos 30 películas del entrenamiento y estimamos su $b_i$ y su $q_i$ a partir de "géneros" y "nota de la crítica" simulados:

| Predicción para los estrenos | RMSE |
|---|---|
| Solo media y sesgo del usuario | 1,076 |
| + $q_i$ estimado con géneros | 1,020 |
| + $b_i$ estimado con metadatos | 0,923 |
| + $b_i$ y $q_i$ (híbrido) | 0,855 |

Los géneros dicen **a quién** le gustará; la crítica, **cuánto** gustará. Además, conviene dar al estreno una **exposición controlada** para recoger datos rápido.

### Exploración y explotación

Recomendar siempre lo que el modelo cree mejor (**explotar**) impide descubrir si otras cosas funcionarían (**explorar**). Los algoritmos de ***bandits*** equilibran ambas cosas. El más simple, $\varepsilon$-*greedy*: con probabilidad $1-\varepsilon$ muestra lo mejor según el modelo y con probabilidad $\varepsilon$ algo al azar entre los candidatos. Métodos más finos (UCB, muestreo de Thompson) exploran más lo que tiene más incertidumbre, como los estrenos.

### Sesgo de popularidad y bucles de retroalimentación

Los modelos colaborativos aprenden de lo que la gente consumió, y la gente consume lo que le mostramos. Resultado: lo popular se recomienda más, se ve más y parece aún mejor. El catálogo de nicho desaparece de la portada. Es un **bucle de retroalimentación** que reduce la cobertura y puede dañar a proveedores pequeños (artistas, vendedores, productoras).

### Diversidad: reordenar la lista

Una técnica sencilla es el **MMR** (*maximal marginal relevance*): se construye la lista paso a paso eligiendo el ítem que maximiza

$$
\text{MMR}(i) = \theta \cdot \text{relevancia}(u,i) - (1-\theta)\cdot \max_{j \in \text{lista}} \text{sim}(i,j)
$$

Con $\theta = 1$ es el ranking puro; al bajarlo, se penalizan ítems demasiado parecidos a los ya elegidos. Otras opciones: cuotas por categoría, límites de exposición por ítem o un pequeño porcentaje de huecos para contenido novedoso.

### Burbujas de filtro y responsabilidad

Si un sistema solo muestra lo que encaja con lo que ya consumiste, tu horizonte se estrecha: es la **burbuja de filtro**. En entretenimiento es un problema de calidad (aburrimiento); en noticias o redes sociales puede ser un problema social. Medidas prácticas:

- Medir y reportar diversidad y cobertura junto a la precisión.
- Dar control al usuario ("no me interesa", "ver menos de esto").
- Explicar por qué se recomienda algo.
- Revisar los efectos sobre grupos de usuarios y de proveedores.
- Cumplir la regulación aplicable (en la UE, el Reglamento de Servicios Digitales exige a las grandes plataformas transparencia sobre sus sistemas de recomendación y al menos una opción no basada en perfiles).

### Ejemplo de negocio

Un servicio de música lanza una lista semanal personalizada. Para evitar que todas las canciones sean de los mismos tres artistas, reordena con MMR, limita a dos canciones por artista y reserva el 20 % de la lista para artistas que el usuario no ha escuchado nunca, elegidos por similitud de sus vectores $q_i$. Mide en un A/B tanto la escucha total como el número de artistas nuevos que el usuario guarda.

### Errores frecuentes

- **No tener plan para el día 0** (usuario o ítem sin historial).
- **Confundir diversidad con aleatoriedad**: diversificar es variar entre cosas relevantes, no meter ruido.
- **Evaluar solo precisión** y descubrir meses después que el catálogo visible se ha reducido a unos pocos títulos.

> **Ideas clave**
> - Hay arranque en frío de usuario, de ítem y de sistema; cada uno pide su estrategia.
> - Usuario nuevo: popularidad + calidad, contexto y *onboarding*; ítem nuevo: metadatos (híbrido) y exposición controlada.
> - Explorar es necesario para aprender; los *bandits* lo hacen de forma controlada.
> - Diversidad, cobertura y control del usuario combaten el sesgo de popularidad y las burbujas de filtro.
> - Practica: soluciones, ejercicio 1.

---

## Glosario

- **Arranque en frío** (*cold start*): situación en la que un usuario, ítem o sistema no tiene historial suficiente para el filtrado colaborativo.
- **Bandit multibrazo** (*multi-armed bandit*): algoritmo que equilibra explorar opciones inciertas y explotar las que parecen mejores.
- **Bucle de retroalimentación** (*feedback loop*): el recomendador influye en los datos con los que se reentrena.
- **Burbuja de filtro** (*filter bubble*): estrechamiento de lo que ve un usuario por recibir solo contenidos parecidos a los que ya consume.
- **Cola larga** (*long tail*): gran número de ítems con pocas interacciones cada uno.
- **Confianza** (*confidence*): peso que se da a una interacción implícita según su intensidad.
- **Densidad / dispersión** (*density / sparsity*): fracción de celdas conocidas (o desconocidas) de la matriz de valoraciones.
- **Factor latente** (*latent factor*): dimensión oculta que describe gustos de usuarios y características de ítems.
- **Factorización de matrices** (*matrix factorization*): aproximación $R \approx PQ^\top$ con matrices de rango bajo.
- **Filtrado colaborativo** (*collaborative filtering*): recomendar a partir de las interacciones de muchos usuarios, sin usar atributos de los ítems.
- **Mínimos cuadrados alternados** (*alternating least squares*, ALS): optimización que alterna regresiones ridge para usuarios e ítems.
- **Modelo de sesgos** (*baseline predictors*): $\mu + b_u + b_i$.
- **NDCG** (*normalized discounted cumulative gain*): métrica de ranking que premia los aciertos en las primeras posiciones.
- **Precisión@k** (*precision at k*): fracción de ítems relevantes entre los $k$ primeros recomendados.
- **Prueba A/B** (*A/B test*): experimento aleatorizado que compara dos versiones con usuarios reales.
- **Recomendación basada en contenido** (*content-based recommendation*): recomendar ítems con atributos parecidos a los que gustaron.
- **Regularización** (*regularization*): penalización que encoge parámetros para evitar el sobreajuste.
- **Retroalimentación implícita / explícita** (*implicit / explicit feedback*): comportamiento observado frente a valoraciones declaradas.
- **RMSE** (*root mean squared error*): raíz del error cuadrático medio de las notas predichas.
- **Similitud del coseno** (*cosine similarity*): coseno del ángulo entre dos vectores; mide si apuntan en la misma dirección.
