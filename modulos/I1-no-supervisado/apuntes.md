# Módulo 02 · Datos no estructurados: clustering y reducción de dimensión — Apuntes

Hasta ahora hemos trabajado con preguntas que tenían una respuesta conocida en los datos: ¿cuánto vale el ticket medio?, ¿difieren dos grupos? En este módulo cambiamos de terreno. Tenemos miles de clientes, productos o imágenes **sin ninguna etiqueta**, y queremos que los datos nos cuenten qué estructura tienen: qué grupos naturales existen, qué variables se mueven juntas, cómo resumir decenas de columnas en dos o tres sin perder lo esencial.

Estos apuntes acompañan a los vídeos y al notebook del módulo. Cada sección corresponde a una lección y termina con un cuadro de ideas clave. Las referencias del tipo «notebook, sección 3» remiten a [`notebook.ipynb`](notebook.ipynb).

## Índice

- [2.1 Aprendizaje supervisado vs. no supervisado](#21-aprendizaje-supervisado-vs-no-supervisado)
- [2.2 Distancias y por qué escalar](#22-distancias-y-por-qué-escalar)
- [2.3 k-means: algoritmo, supuestos y limitaciones](#23-k-means-algoritmo-supuestos-y-limitaciones)
- [2.4 Elegir *k*: codo, silueta y criterio de negocio](#24-elegir-k-codo-silueta-y-criterio-de-negocio)
- [2.5 Clustering jerárquico y dendrogramas](#25-clustering-jerárquico-y-dendrogramas)
- [2.6 PCA: intuición geométrica y varianza explicada](#26-pca-intuición-geométrica-y-varianza-explicada)
- [2.7 t-SNE y UMAP: visualizar datos de alta dimensión](#27-t-sne-y-umap-visualizar-datos-de-alta-dimensión)
- [2.8 Caso: segmentación RFM de clientes](#28-caso-segmentación-rfm-de-clientes)
- [Glosario](#glosario)

---

## 2.1 Aprendizaje supervisado vs. no supervisado

### Dos tipos de pregunta

En el **aprendizaje supervisado** cada observación viene con una respuesta: el precio de una vivienda, si un cliente se dio de baja, si un correo era spam. El modelo aprende la relación entre las variables de entrada $X$ y la variable objetivo $y$, y lo evaluamos comparando sus predicciones con las respuestas reales. Hay un "profesor" (las etiquetas) que corrige.

En el **aprendizaje no supervisado** solo tenemos $X$. No hay columna objetivo ni respuesta correcta que comparar. La pregunta deja de ser «¿qué valor tendrá $y$?» y pasa a ser «¿qué estructura hay en $X$?». Las tres familias de tareas más habituales son:

| Tarea | Pregunta | Ejemplo de negocio |
|---|---|---|
| **Clustering** (agrupamiento) | ¿Qué grupos de observaciones parecidas existen? | Segmentar clientes por comportamiento de compra |
| **Reducción de dimensión** | ¿Cómo resumo muchas variables en pocas sin perder información? | Condensar 40 indicadores de una encuesta en 3 índices |
| **Detección de anomalías** | ¿Qué observaciones no se parecen a ninguna otra? | Señalar transacciones raras para revisión de fraude |

En este módulo nos centramos en las dos primeras. La tercera aparece de forma natural: un punto muy lejos de todos los centros de grupo es, por definición, raro.

### Por qué es más difícil (y más subjetivo)

Sin etiquetas no hay una métrica "de verdad" como la exactitud. Dos analistas pueden segmentar la misma base de clientes en 4 o en 6 grupos y ambos tener argumentos. Eso no significa que todo valga: hay criterios internos (lo compactos y separados que están los grupos), criterios de estabilidad (¿salen los mismos grupos si cambio la muestra?) y, sobre todo, **criterios de utilidad**: ¿sirve la segmentación para tomar decisiones distintas con cada grupo?

En el notebook trabajamos con datos simulados, así que *sí* conocemos los perfiles reales (`perfil_real`) y podemos medir con el **Adjusted Rand Index** (ARI) cuánto se parecen los grupos encontrados a los verdaderos. Es un lujo didáctico: en un proyecto real no tendrás esa columna. Úsala para desarrollar intuición, no como costumbre.

El ARI compara dos particiones mirando todos los pares de observaciones: ¿los dos métodos coinciden en poner juntos (o separados) a cada par? Después corrige el resultado por el acuerdo que se obtendría por azar. Vale 1 si las particiones son idénticas (aunque los grupos tengan números distintos), en torno a 0 si el parecido es el de una asignación aleatoria, y puede ser ligeramente negativo. Fuera del aula sigue siendo útil para comparar **dos clusterings entre sí**, por ejemplo para medir la estabilidad (lección 2.4).

### Cuándo aporta valor el no supervisado

1. **Exploración**: antes de modelar, entender qué tipos de clientes o productos hay. Muchas preguntas supervisadas nacen de un clustering exploratorio.
2. **Segmentación accionable**: diseñar campañas, precios o niveles de servicio distintos por grupo.
3. **Compresión y visualización**: pasar de 64 columnas a 2 para poder dibujar los datos, o de 300 a 20 para acelerar otro modelo.
4. **Ingeniería de variables**: el segmento o las componentes principales pueden entrar después como variables en un modelo supervisado.
5. **Cuando etiquetar es caro**: agrupar documentos o imágenes y etiquetar solo unos cuantos representantes de cada grupo.

**Ejemplo de negocio.** Una cadena de gimnasios tiene 80.000 socios con datos de asistencia (días por semana, franja horaria, clases dirigidas, uso de la piscina). No existe una columna «tipo de socio». Un clustering puede revelar, por ejemplo, un grupo de «madrugadores de sala de musculación», otro de «familias de fin de semana» y otro de «socios fantasma» que pagan pero apenas vienen. Cada grupo pide una acción distinta: horarios de personal, oferta de clases o campañas antibaja.

### Errores frecuentes

- **Tratar los clusters como verdades**: el algoritmo siempre devuelve grupos, aunque los datos no tengan ninguno. Un clustering es una hipótesis que hay que validar.
- **Confundir segmentación con predicción**: saber que un cliente es «dormido» no dice cuál será su gasto el mes que viene; para eso hace falta un modelo supervisado.
- **Usar variables que no responden a la pregunta**: si quieres segmentar por comportamiento, no mezcles el código postal porque sí; el algoritmo le dará el mismo peso que a todo lo demás.

> **Ideas clave**
> - Supervisado: aprendo $y$ a partir de $X$. No supervisado: busco estructura solo en $X$.
> - Las tareas principales son clustering, reducción de dimensión y detección de anomalías.
> - Sin etiquetas, la calidad se juzga con criterios internos, estabilidad y utilidad de negocio.
> - Un algoritmo de clustering siempre devuelve grupos: tu trabajo es comprobar si significan algo.

---

## 2.2 Distancias y por qué escalar

### Parecido = cercanía

Casi todos los métodos del módulo se basan en una idea: dos observaciones son parecidas si están **cerca** en el espacio de variables. Si describimos a cada cliente con un vector $x = (x_1, \dots, x_p)$, la distancia más usada es la **euclídea**:

$$
d(x, z) = \sqrt{\sum_{j=1}^{p} (x_j - z_j)^2}
$$

Es la distancia "en línea recta" de toda la vida, generalizada a $p$ dimensiones. Otras opciones son la distancia **Manhattan** ($\sum_j |x_j - z_j|$, menos sensible a diferencias grandes en una sola variable) o la **distancia coseno**, que compara direcciones y no magnitudes (útil en texto, donde importa la proporción de palabras y no la longitud del documento).

### El problema de las unidades

Fíjate en la fórmula: cada variable contribuye con su diferencia al cuadrado. Si una variable se mide en cientos y otra en unidades, la primera domina por completo.

En el notebook (sección 2) los clientes tienen **recencia** en días (desviación típica ≈ 140), **frecuencia** en compras al año (≈ 9,5) y **gasto medio** en euros (≈ 93). Una diferencia de 100 días de recencia pesa en la distancia lo mismo que una diferencia de 100 compras al año, cosa que no ocurre jamás. En la práctica, k-means sin escalar agrupa a los clientes casi solo por recencia y gasto, ignorando la frecuencia. El resultado en el notebook lo deja claro: el ARI frente a los perfiles reales pasa de ≈ 0,52 sin escalar a ≈ 0,76 con escalado.

### Cómo escalar

La opción por defecto es la **estandarización** (`StandardScaler`): a cada variable se le resta su media y se divide por su desviación típica,

$$
z_{ij} = \frac{x_{ij} - \bar{x}_j}{s_j},
$$

de modo que todas quedan con media 0 y desviación 1, y una unidad significa "una desviación típica" en cualquier variable.

```python
from sklearn.preprocessing import StandardScaler
X_esc = StandardScaler().fit_transform(X)   # X: recencia, frecuencia, gasto_medio
```

Alternativas:

| Escalador | Qué hace | Cuándo usarlo |
|---|---|---|
| `StandardScaler` | media 0, desviación 1 | Opción por defecto |
| `MinMaxScaler` | lleva cada variable a [0, 1] | Variables acotadas (porcentajes, puntuaciones) |
| `RobustScaler` | resta la mediana y divide por el rango intercuartílico | Hay valores atípicos fuertes |
| Logaritmo + estandarizar | comprime colas largas | Gasto, ingresos, número de visitas |

Las variables de gasto suelen tener una cola larga a la derecha: unos pocos clientes gastan diez veces más que la mediana. Aplicar `np.log1p` antes de estandarizar evita que esos clientes extremos formen "su propio cluster" o arrastren los centros.

### Escalar es una decisión de negocio

Estandarizar da a todas las variables **el mismo peso**. A veces no es lo que quieres: si para tu negocio el gasto importa el doble que la recencia, puedes multiplicar esa columna estandarizada por un factor mayor que 1. Lo importante es que la ponderación sea una decisión consciente y no un efecto accidental de las unidades.

**Ejemplo de negocio.** Un banco quiere agrupar oficinas por volumen de depósitos (millones de euros), número de empleados (decenas) y satisfacción del cliente (escala 1–10). Sin escalar, el clustering separa simplemente oficinas grandes de pequeñas por depósitos. Al estandarizar aparecen grupos más interesantes, como oficinas pequeñas con satisfacción excelente, cuyas prácticas conviene replicar.

### Errores frecuentes

- **Escalar con todos los datos y luego validar**: si después vas a evaluar en datos nuevos, ajusta el escalador solo con los de entrenamiento y aplícalo (`transform`) a los nuevos.
- **Escalar variables categóricas codificadas como 0/1 sin pensar**: una binaria estandarizada puede pesar mucho más o mucho menos de lo que crees; revisa su efecto.
- **Olvidar volver a las unidades originales** para interpretar: los centros de k-means sobre datos escalados no se leen directamente. Describe los segmentos con las medias en días, compras y euros.

> **Ideas clave**
> - Clustering y PCA dependen de distancias o varianzas, que dependen de las unidades.
> - Sin escalar, la variable con mayor rango numérico domina el resultado.
> - `StandardScaler` es la opción por defecto; con colas largas, aplica logaritmo antes.
> - Escalar es ponderar: decide conscientemente cuánto pesa cada variable.
> - Practica: notebook, sección 2.

---

## 2.3 k-means: algoritmo, supuestos y limitaciones

### La idea

k-means busca $k$ grupos de forma que cada observación esté lo más cerca posible del **centro** (centroide) de su grupo. Formalmente, minimiza la **inercia** o suma de cuadrados intragrupo:

$$
W = \sum_{c=1}^{k} \sum_{i \in C_c} \lVert x_i - \mu_c \rVert^2,
$$

donde $\mu_c$ es la media de las observaciones del grupo $C_c$. Cuanto menor es $W$, más compactos son los grupos.

### El algoritmo de Lloyd, paso a paso

1. **Inicializar**: elegir $k$ centros iniciales (scikit-learn usa `k-means++`, que los reparte separados entre sí).
2. **Asignar**: cada punto va al centro más cercano.
3. **Actualizar**: cada centro se mueve a la media de los puntos que tiene asignados.
4. **Repetir** 2 y 3 hasta que las asignaciones no cambien.

Cada paso reduce (o mantiene) la inercia, así que el algoritmo siempre converge. Pero converge a un **mínimo local**: con otra inicialización puede acabar en otra solución. Por eso el notebook usa `n_init=10`: ejecuta el algoritmo 10 veces con arranques distintos y se queda con la de menor inercia. Y `random_state=0` hace el resultado reproducible.

```python
from sklearn.cluster import KMeans
km = KMeans(n_clusters=4, n_init=10, random_state=0).fit(X_esc)
km.labels_            # segmento de cada cliente
km.cluster_centers_   # centros (en unidades escaladas)
km.inertia_           # W
```

### Supuestos implícitos

k-means no declara supuestos, pero los lleva dentro por cómo mide la calidad:

- **Grupos aproximadamente esféricos** (redondeados) en el espacio escalado: usa distancia euclídea al centro, así que la frontera entre dos grupos es siempre una línea recta (un hiperplano) a medio camino entre sus centros.
- **Tamaños y dispersiones parecidos**: un grupo muy grande y disperso junto a uno pequeño y compacto tiende a "robarle" puntos.
- **Todas las variables numéricas y comparables**: necesita medias, así que no trabaja directamente con categorías.
- **Cada punto pertenece a un único grupo** (asignación "dura"), aunque esté justo en la frontera.

### Dónde falla

| Situación | Qué pasa |
|---|---|
| Grupos alargados o en forma de media luna | Los corta por la mitad con fronteras rectas |
| Anillos concéntricos | Imposible separarlos: el centro de ambos es el mismo |
| Densidades muy distintas | El grupo denso se divide y el disperso absorbe vecinos |
| Valores atípicos | Desplazan los centros; pueden acabar formando un grupo de un solo punto |
| Muchas variables irrelevantes | Las distancias se vuelven parecidas y la estructura se diluye |

En el notebook se ve un caso suave de esto: con $k = 4$, el segmento de «ocasionales» absorbe a casi la mitad de los «dormidos». Los dormidos tienen una recencia muy dispersa (de unas decenas a más de 800 días) y los que llevan "solo" 100–250 días sin comprar quedan más cerca del centro de los ocasionales. Es un recordatorio de que k-means no ve grupos, ve distancias a centros.

Para formas no esféricas existen alternativas: **DBSCAN** (grupos por densidad, detecta ruido), **modelos de mezcla gaussiana** (grupos elípticos y asignación probabilística) o el **clustering jerárquico** de la lección 2.5.

**Ejemplo de negocio.** Una empresa de reparto quiere ubicar 5 almacenes para atender a sus clientes minimizando la distancia media. Eso es literalmente k-means sobre coordenadas: los centroides son las ubicaciones candidatas. Aquí el supuesto de grupos "redondos" encaja con el problema. En cambio, si la ciudad está partida por un río sin puentes, la distancia euclídea deja de representar el coste real y conviene cambiar de métrica.

### Errores frecuentes

- **No escalar** (lección 2.2).
- **Usar `n_init=1`** y concluir a partir de una única ejecución desafortunada.
- **Interpretar el número de segmento**: el "segmento 0" no es mejor ni peor que el "3"; las etiquetas son arbitrarias y cambian entre ejecuciones.
- **Esperar que k-means encuentre $k$**: $k$ lo pones tú. La siguiente lección explica cómo elegirlo.

> **Ideas clave**
> - k-means minimiza la suma de distancias al cuadrado de cada punto a su centroide.
> - Alterna asignar puntos al centro más cercano y recalcular centros; converge a un mínimo local, por eso `n_init`.
> - Funciona bien con grupos compactos, redondeados y de tamaño similar; falla con formas alargadas, anillos o densidades dispares.
> - Las etiquetas son arbitrarias: interpreta los perfiles, no los números.
> - Practica: notebook, secciones 2 y 4.

---

## 2.4 Elegir *k*: codo, silueta y criterio de negocio

### El problema

La inercia $W$ **siempre** baja al aumentar $k$: con tantos grupos como clientes, $W = 0$. Así que no podemos elegir $k$ minimizando $W$. Necesitamos criterios que penalicen la complejidad o que midan algo distinto.

### Método del codo

Se calcula $W$ para $k = 2, 3, \dots$ y se busca el punto donde la curva deja de caer bruscamente: el «codo». A partir de ahí, añadir grupos solo trocea grupos ya buenos. En el notebook (sección 3) la inercia cae de ≈ 2.517 ($k=2$) a ≈ 1.233 ($k=3$) y ≈ 574 ($k=4$); después las bajadas son mucho menores (≈ 432 con $k=5$, ≈ 362 con $k=6$). El codo está en $k = 4$.

Su limitación: en datos reales la curva suele ser suave y el codo, una cuestión de opinión.

### Coeficiente de silueta

Para cada observación $i$ se calculan:

- $a(i)$: distancia media a los puntos de **su propio** grupo (cohesión).
- $b(i)$: distancia media a los puntos del **grupo vecino más cercano** (separación).

$$
s(i) = \frac{b(i) - a(i)}{\max\{a(i),\, b(i)\}} \in [-1, 1]
$$

- $s(i) \approx 1$: el punto está bien dentro de su grupo y lejos del siguiente.
- $s(i) \approx 0$: está en la frontera.
- $s(i) < 0$: probablemente está en el grupo equivocado.

La **silueta media** resume toda la partición. Como guía orientativa: por encima de 0,5 hay estructura razonable; por debajo de 0,25, la estructura es débil. En el notebook la silueta es máxima en $k = 4$ (≈ 0,64), seguida de cerca por $k = 3$ (≈ 0,63), y baja a ≈ 0,54 con $k = 6$.

```python
from sklearn.metrics import silhouette_score
for k in range(2, 10):
    km = KMeans(k, n_init=10, random_state=0).fit(X_esc)
    print(k, round(silhouette_score(X_esc, km.labels_), 3))
```

Fíjate en que la diferencia entre $k=3$ y $k=4$ es pequeña. Cuando dos valores están casi empatados, la técnica no decide: decide el negocio.

Además de la media, mira la silueta **por observación** (`silhouette_samples`): un segmento con muchos clientes de silueta negativa está mal definido aunque la media global sea buena. Y recuerda que la silueta solo es comparable entre particiones calculadas con **las mismas variables**: si añades o quitas columnas, cambia la geometría y la comparación deja de tener sentido (lo verás en el ejercicio 4).

### Otros criterios técnicos

- **Estabilidad**: repetir el clustering sobre submuestras (bootstrap) o con otras semillas y medir con ARI cuánto se parecen las particiones. Una segmentación que cambia mucho con pequeñas perturbaciones no es fiable.
- **Índices alternativos**: Calinski-Harabasz y Davies-Bouldin (disponibles en `sklearn.metrics`), o el estadístico *gap*, que compara la inercia con la de datos sin estructura.
- **Tamaño mínimo**: un segmento con el 1 % de los clientes rara vez justifica una estrategia propia.

### El criterio de negocio

Las preguntas que debes hacerte antes de presentar un número:

1. **¿Puedo describir cada grupo en una frase?** Si dos grupos solo se distinguen por "un poco más" de lo mismo, sobran.
2. **¿Tengo una acción distinta para cada uno?** Si marketing solo puede gestionar tres campañas, seis segmentos son ruido.
3. **¿Es estable en el tiempo?** Un segmento que se disuelve el mes siguiente no sirve para planificar.
4. **¿Tiene tamaño suficiente?** El coste de una acción específica debe compensar con el número de clientes afectados.

**Ejemplo de negocio.** Una aseguradora obtiene silueta máxima con $k=2$ (clientes con un solo seguro frente a varios). Técnicamente es la mejor partición, pero comercialmente no dice nada nuevo. Con $k=5$ la silueta baja algo, pero aparecen grupos accionables: jóvenes con solo seguro de coche (venta cruzada de hogar), familias con varios productos (fidelización), etc. Elige $k=5$ y lo justifica: la pérdida de silueta es pequeña y el valor para el negocio, grande.

### Errores frecuentes

- **Elegir $k$ por la inercia mínima** (siempre gana el $k$ mayor).
- **Tomar la silueta como verdad absoluta**: también favorece grupos esféricos, igual que k-means.
- **No reportar la incertidumbre**: si $k=3$ y $k=4$ están casi empatados, dilo y explica por qué eliges uno.

> **Ideas clave**
> - La inercia siempre baja con $k$; el codo busca dónde deja de compensar.
> - La silueta compara cohesión y separación de cada punto; su media resume la partición.
> - Comprueba la estabilidad con otras semillas o submuestras.
> - Entre opciones técnicamente parecidas, decide la utilidad: una acción distinta por segmento.
> - Practica: notebook, sección 3.

---

## 2.5 Clustering jerárquico y dendrogramas

### Otra forma de agrupar

El clustering jerárquico **aglomerativo** no necesita fijar $k$ al principio. Funciona de abajo arriba:

1. Empieza con cada observación como su propio grupo ($n$ grupos).
2. Une los dos grupos más cercanos.
3. Repite hasta que solo queda un grupo.

El resultado no es una partición, sino una **jerarquía** completa de fusiones, que se dibuja como un **dendrograma**: un árbol cuyas hojas son las observaciones y en el que la **altura** de cada unión indica la distancia a la que se fusionaron los grupos.

### ¿Cercanos según qué? El criterio de enlace

Para unir grupos hay que definir la distancia entre *grupos*, no solo entre puntos. Esa regla es el **enlace** (*linkage*):

| Enlace | Distancia entre grupos A y B | Comportamiento |
|---|---|---|
| Simple (*single*) | La del par de puntos más cercano | Crea cadenas largas; sensible al ruido |
| Completo (*complete*) | La del par más lejano | Grupos compactos de diámetro parecido |
| Promedio (*average*) | Media de todas las distancias entre pares | Compromiso entre los dos anteriores |
| **Ward** | Aumento de la inercia total al unir A y B | Grupos compactos y equilibrados, parecido a k-means |

El notebook usa **Ward**, que une en cada paso los dos grupos cuya fusión aumenta menos la suma de cuadrados intragrupo. Es la opción más habitual para segmentación con variables numéricas escaladas.

### Leer un dendrograma

```python
from scipy.cluster.hierarchy import linkage, dendrogram
Z = linkage(X_esc[muestra], method="ward")
dendrogram(Z, no_labels=True, color_threshold=12)
```

- Cada línea horizontal es una fusión; su altura es la distancia (para Ward, el coste de la fusión).
- **Cortar** el árbol con una línea horizontal a cierta altura da una partición: el número de ramas que cruza la línea es el número de grupos.
- Las uniones **muy altas** indican que se están fusionando grupos muy distintos. Un salto grande entre una fusión y la siguiente sugiere un buen sitio para cortar.
- La distancia entre dos hojas se lee en la altura del primer nodo que las une, **no** en su posición horizontal: dos hojas vecinas en el dibujo pueden estar muy lejos en el árbol.

En el notebook (sección 5) el dendrograma de 200 clientes muestra cuatro ramas claras por debajo del umbral de color, coherentes con los cuatro perfiles. Después, `AgglomerativeClustering(n_clusters=4, linkage="ward")` sobre los 1.500 clientes consigue un ARI ≈ 0,84 frente a los perfiles reales, algo mejor que k-means (≈ 0,76) en este conjunto: separa mejor a los dormidos de los ocasionales.

### Ventajas y límites

**Ventajas**: no exige $k$ de antemano; el dendrograma muestra la estructura a varias escalas (2 grandes grupos que a su vez se dividen en 5…); es determinista (sin semillas); con otros enlaces o distancias permite formas no esféricas.

**Límites**: coste computacional y de memoria del orden de $n^2$ (calcula todas las distancias entre pares), por lo que con cientos de miles de filas no es práctico; por eso el notebook dibuja el dendrograma con una muestra de 200. Además, las fusiones son **definitivas**: un error al principio no se corrige después. Y el dendrograma con miles de hojas es ilegible.

**Ejemplo de negocio.** Un supermercado agrupa sus 2.000 referencias de producto por patrones de venta semanal. El dendrograma permite ver la jerarquía de forma natural: a gran altura se separan «productos frescos» y «no perecederos»; más abajo, dentro de frescos, «fruta de temporada» y «panadería diaria». El equipo de surtido elige el nivel de corte según la decisión: dos grandes grupos para logística, ocho para planificar promociones.

### Errores frecuentes

- **Elegir el enlace por defecto sin mirar**: el enlace simple sobre datos con ruido produce una cadena enorme y grupos de un solo punto.
- **Leer proximidad horizontal** en el dendrograma.
- **Aplicarlo a datos sin escalar**: igual que k-means, depende de distancias.

> **Ideas clave**
> - El aglomerativo une repetidamente los dos grupos más cercanos hasta tener uno solo.
> - El criterio de enlace define "cercanía entre grupos"; Ward da grupos compactos y equilibrados.
> - Cortar el dendrograma a una altura da una partición; los saltos grandes sugieren dónde cortar.
> - No escala bien a muchos datos: usa muestras para el dendrograma.
> - Practica: notebook, sección 5.

---

## 2.6 PCA: intuición geométrica y varianza explicada

### El problema de las muchas columnas

Las imágenes de dígitos del notebook tienen 8 × 8 = 64 píxeles: cada imagen es un punto en un espacio de 64 dimensiones. No podemos dibujarlo, y muchas de esas dimensiones son redundantes (píxeles vecinos se parecen; los bordes casi siempre están en blanco). La **reducción de dimensión** busca unas pocas variables nuevas que conserven la mayor parte de la información.

### La intuición geométrica

Imagina una nube de puntos en 3D con forma de plato inclinado. Casi toda la variación está en dos direcciones (el plano del plato) y muy poca en la tercera (su grosor). El **Análisis de Componentes Principales** (PCA) encuentra exactamente esas direcciones:

1. La **primera componente principal** es la dirección en la que los datos tienen **máxima varianza**.
2. La **segunda** es la de máxima varianza entre las direcciones **perpendiculares** a la primera.
3. Y así sucesivamente, hasta $p$ componentes.

Cada componente es una combinación lineal de las variables originales:

$$
\text{PC}_1 = w_{11} x_1 + w_{21} x_2 + \dots + w_{p1} x_p, \qquad \lVert w_1 \rVert = 1.
$$

Los coeficientes $w_{j1}$ son las **cargas** (*loadings*) y están en `pca.components_`. Proyectar los datos sobre las primeras $m$ componentes es como girar la nube para mirarla desde el ángulo que muestra más variación y descartar las direcciones "planas". Técnicamente, las componentes son los vectores propios de la matriz de covarianzas, y la varianza de cada una es su valor propio $\lambda_j$.

### Varianza explicada

La proporción de varianza explicada por la componente $j$ es

$$
\frac{\lambda_j}{\sum_{l=1}^{p} \lambda_l},
$$

y su suma acumulada indica cuánta información conservas con las primeras $m$ componentes.

```python
from sklearn.decomposition import PCA
pca = PCA().fit(digits.data)
var_acum = np.cumsum(pca.explained_variance_ratio_)
np.argmax(var_acum >= 0.9) + 1    # nº de componentes para el 90 %
```

En el notebook (sección 6) las dos primeras componentes de los dígitos explican solo ≈ 28,5 % de la varianza (≈ 14,9 % y ≈ 13,6 %), y hacen falta **21 componentes** para llegar al 90 %. Por eso el gráfico de PCA en 2D muestra algunos dígitos separados (0, 6, 4) y muchos otros superpuestos: dos dimensiones no bastan para estos datos.

Para elegir el número de componentes: un umbral de varianza (80–95 %, según el uso), el **gráfico de sedimentación** (*scree plot*, buscar el codo en la varianza de cada componente) o el rendimiento del modelo que vaya después.

### Interpretar las componentes

Para saber qué representa una componente, mira sus cargas: qué variables tienen más peso (en valor absoluto) y con qué signo. Por ejemplo, en una encuesta de satisfacción con 20 preguntas, la PC1 suele tener cargas positivas parecidas en todas ellas: es un índice de «satisfacción general». La PC2 puede contraponer preguntas de precio (+) frente a preguntas de atención (−): un eje «sensible al precio vs. sensible al servicio».

**Ejemplo de negocio.** Un fondo de inversión analiza la rentabilidad diaria de 50 acciones. La PC1 tiene cargas positivas en casi todas: representa el «movimiento del mercado» y explica gran parte de la varianza. La PC2 contrapone bancos y eléctricas: un factor sectorial. Con 3–4 componentes describe la mayor parte del riesgo de la cartera.

### Escalar o no escalar

PCA maximiza varianza, así que depende de las unidades exactamente igual que k-means. Con variables en unidades distintas (euros, días, porcentajes), **estandariza antes**. En los dígitos no lo hacemos porque todos los píxeles están en la misma escala (0–16) y queremos que los píxeles con más variación pesen más.

### Límites de PCA

- **Es lineal**: si la estructura es curva (una espiral, un "rollo"), PCA la aplasta.
- **Máxima varianza ≠ máxima relevancia**: la dirección con más varianza no tiene por qué ser la que separa los grupos que te interesan.
- **Sensible a atípicos**, que inflan la varianza en su dirección.
- Las componentes pueden ser **difíciles de nombrar** cuando muchas variables tienen cargas parecidas.

A cambio, PCA es rápido, determinista, tiene `transform` para datos nuevos y permite reconstruir aproximadamente los datos originales (`inverse_transform`). Por eso se usa mucho como paso previo a otros modelos o al clustering.

### Errores frecuentes

- **No escalar** variables con unidades distintas.
- **Quedarse con 2 componentes "porque se pueden dibujar"** sin mirar cuánta varianza explican.
- **Ajustar PCA con todos los datos antes de una validación** (fuga de información): ajústalo dentro del *pipeline* de entrenamiento.

> **Ideas clave**
> - PCA encuentra direcciones perpendiculares de máxima varianza; cada componente es una combinación lineal de las variables.
> - La varianza explicada acumulada dice cuánta información conservas.
> - Interpreta las componentes mirando las cargas (`pca.components_`).
> - Es lineal, rápido e invertible; estandariza si las unidades difieren.
> - Practica: notebook, sección 6 (PCA).

---

## 2.7 t-SNE y UMAP: visualizar datos de alta dimensión

### Cuando lo lineal no basta

En el notebook, PCA en 2D deja muchos dígitos superpuestos. No es que los dígitos no se distingan, sino que su estructura no cabe en un plano por proyección lineal. Los métodos de **aprendizaje de variedades** (*manifold learning*) buscan un mapa 2D que respete otra cosa: **quién es vecino de quién**.

### t-SNE: la intuición

**t-SNE** (*t-distributed Stochastic Neighbor Embedding*) trabaja en dos pasos:

1. En el espacio original calcula, para cada punto, una distribución de probabilidad sobre sus vecinos: los cercanos reciben probabilidad alta y los lejanos, casi cero. El "radio" de vecindario lo controla la **perplexity**, que puede leerse como el número efectivo de vecinos que tiene en cuenta cada punto (valores típicos: 5–50).
2. Coloca los puntos en 2D y los va moviendo para que las probabilidades de vecindad en el mapa se parezcan lo más posible a las originales. Mide la discrepancia con la divergencia de Kullback-Leibler:

$$
\mathrm{KL}(P \,\Vert\, Q) = \sum_{i \neq j} p_{ij} \log \frac{p_{ij}}{q_{ij}}.
$$

En el mapa usa una distribución t de Student, de colas pesadas, que permite que puntos moderadamente lejanos se separen mucho y evita que todo se amontone en el centro. El resultado típico son "islas" bien definidas: en el notebook, los diez dígitos aparecen casi perfectamente separados.

### Lo que t-SNE NO conserva

Aquí está la parte más importante de la lección. t-SNE optimiza vecindades **locales**, así que:

- **Las distancias entre grupos no significan nada**: que la isla del 0 esté lejos de la del 1 no indica que sean más distintos que dos islas vecinas.
- **Los tamaños de los grupos no significan nada**: t-SNE tiende a expandir grupos densos y contraer los dispersos.
- **Puede crear estructura aparente**: con perplexity baja, incluso datos aleatorios forman pequeños grumos.
- **El resultado cambia** con la semilla y la perplexity. Prueba varios valores antes de concluir nada.
- **No tiene `transform`**: no puedes proyectar un punto nuevo sobre un mapa existente sin recalcularlo.
- **Es lento** con muchos datos; es habitual reducir antes a 30–50 componentes con PCA.

Por todo esto, **no hagas clustering sobre las coordenadas de t-SNE** ni uses el mapa como prueba de que existen grupos. Úsalo para **explorar** y generar hipótesis que luego compruebas en los datos originales (es el ejercicio 3 del notebook).

### UMAP: la alternativa moderna

**UMAP** (*Uniform Manifold Approximation and Projection*) persigue el mismo objetivo con otra base matemática (topología y grafos de vecinos). Conceptualmente:

1. Construye un **grafo de $k$ vecinos más cercanos** en el espacio original, con pesos que indican lo fuerte que es cada conexión.
2. Busca una disposición en baja dimensión cuyo grafo se parezca a ese, atrayendo a los vecinos y repeliendo a los no vecinos.

Sus parámetros principales son `n_neighbors` (cuánto mira a lo local frente a lo global, análogo a la perplexity) y `min_dist` (lo apretados que quedan los puntos dentro de cada grupo).

| | PCA | t-SNE | UMAP |
|---|---|---|---|
| Tipo | Lineal | No lineal | No lineal |
| Conserva | Varianza global | Vecindades locales | Vecindades locales y algo más de estructura global |
| Velocidad | Muy rápido | Lento con muchos datos | Más rápido que t-SNE |
| Datos nuevos (`transform`) | Sí | No | Sí (aproximado) |
| Determinista | Sí | No | No (salvo semilla fija) |
| Interpretable (cargas) | Sí | No | No |
| Uso principal | Comprimir, preprocesar, interpretar | Visualizar | Visualizar y, con cautela, preprocesar |

UMAP no está en scikit-learn: es la librería `umap-learn` (`from umap import UMAP`), con una interfaz igual (`fit_transform`). En este curso usamos t-SNE en el notebook para no añadir dependencias, pero en la práctica profesional UMAP es hoy muy habitual para visualizar *embeddings* de texto o imágenes. Las advertencias de t-SNE se aplican también a UMAP: distancias y tamaños en el mapa deben interpretarse con prudencia.

**Ejemplo de negocio.** Un equipo de atención al cliente convierte 20.000 tickets de soporte en vectores numéricos (*embeddings*, módulo 09) y los proyecta en 2D con UMAP. En el mapa aparece una isla de tickets que mezcla «devolución» y «tarjeta rechazada». Al leer una muestra descubren un fallo en el formulario de devoluciones que cobraba dos veces. El mapa no demostró nada por sí solo, pero señaló dónde mirar.

### Errores frecuentes

- **Interpretar distancias o tamaños** en un mapa t-SNE/UMAP.
- **Usar una sola ejecución** con los parámetros por defecto.
- **Clusterizar sobre el mapa 2D** y presentarlo como segmentación.
- **Presentar el mapa a Dirección sin explicar** qué significa la cercanía.

> **Ideas clave**
> - t-SNE y UMAP construyen mapas 2D que respetan vecindades locales, no distancias globales.
> - En sus mapas, la separación entre grupos y el tamaño de los grupos no son interpretables.
> - Prueba varias perplexities (t-SNE) o `n_neighbors` (UMAP) y semillas antes de concluir.
> - Son herramientas de exploración: valida cualquier hipótesis en los datos originales.
> - Practica: notebook, sección 6 (t-SNE) y ejercicio 3.

---

## 2.8 Caso: segmentación RFM de clientes

### Qué es RFM

**RFM** es un marco clásico del marketing directo para describir clientes con tres números:

- **R (*recency*)**: días desde la última compra. Cuanto menor, mejor: un cliente reciente es más probable que vuelva.
- **F (*frequency*)**: número de compras en un periodo (en el notebook, compras al año).
- **M (*monetary*)**: valor económico (en el notebook, gasto medio por pedido).

Es popular porque se calcula con cualquier histórico de transacciones, es fácil de explicar y predice bastante bien el comportamiento futuro. Tradicionalmente se puntúa cada variable en quintiles (1–5) y se combinan las puntuaciones; el clustering es una alternativa que deja que los datos marquen las fronteras.

```python
rfm = (transacciones.groupby("cliente_id")
       .agg(recencia=("fecha", lambda f: (hoy - f.max()).days),
            frecuencia=("pedido_id", "nunique"),
            gasto_medio=("importe", "mean")))
```

### El proceso completo

1. **Construir RFM** a partir de las transacciones, con una fecha de referencia y un periodo claros.
2. **Revisar distribuciones**: recencia y gasto suelen tener colas largas. Considera `log1p` y trata los atípicos (un cliente empresa que compra por 50.000 €).
3. **Escalar** (lección 2.2).
4. **Probar varios $k$** con codo, silueta y estabilidad (lección 2.4). Contrastar con jerárquico (lección 2.5).
5. **Perfilar** cada segmento en **unidades originales**: medias o medianas de R, F y M, tamaño y peso en la facturación.
6. **Nombrar y accionar**: un nombre comprensible y una acción concreta por segmento.
7. **Visualizar**: un gráfico de dispersión de dos variables coloreado por segmento, o un *pairplot*; si hay muchas variables, PCA en 2D.
8. **Medir**: definir cómo sabremos si las acciones funcionan (por ejemplo, un test A/B por segmento, como en el módulo 04).

### Lo que sale en el notebook

Con $k = 4$ sobre las variables escaladas (notebook, sección 4) se obtienen cuatro segmentos con perfiles muy distintos (valores aproximados):

| Segmento | Recencia | Frecuencia | Gasto medio | Clientes | Nombre propuesto |
|---|---|---|---|---|---|
| A | 31 días | 11/año | 253 € | 367 | VIP de ticket alto |
| B | 15 días | 26/año | 59 € | 373 | Fieles recurrentes |
| C | 115 días | 5/año | 43 € | 552 | Ocasionales |
| D | 406 días | 3/año | 35 € | 208 | Dormidos |

(El número que k-means asigna a cada segmento es arbitrario; por eso los identificamos por su perfil.)

La tabla cruzada con `perfil_real` muestra que VIP y fieles se recuperan casi perfectamente, mientras que el segmento C mezcla todos los ocasionales con unos 170 de los 375 dormidos. Para el negocio esto tiene una lectura práctica: la frontera ocasional/dormido es gradual. Una buena propuesta combina el segmento con una regla simple (por ejemplo, «ocasional con recencia > 180 días → entra en la campaña de reactivación»).

### De segmentos a acciones

| Segmento | Acción | Métrica de éxito |
|---|---|---|
| VIP de ticket alto | Programa de beneficios no monetarios (envío prioritario, acceso anticipado) | Retención a 12 meses |
| Fieles recurrentes | Venta cruzada para subir el ticket | Gasto medio por pedido |
| Ocasionales | Recordatorios según ciclo de compra | Frecuencia trimestral |
| Dormidos | Reactivación con incentivo limitado | % que vuelve a comprar en 60 días |

Una regla de oro: **no regales margen a quien ya compra**. Un descuento masivo a los VIP reduce ingresos sin cambiar su comportamiento; ese presupuesto rinde más en reactivación.

### Más allá de RFM

Puedes enriquecer la segmentación con antigüedad del cliente, categorías compradas, canal o tasa de devolución. Pero cada variable que añades **pesa lo mismo** tras escalar: si no está relacionada con la estructura que buscas, diluye los grupos (ejercicio 4 del notebook). Una alternativa es segmentar con pocas variables de comportamiento y usar el resto para **describir** los segmentos a posteriori.

### Errores frecuentes

- **Presentar centroides escalados** (valores como −0,8 o 1,3) a marketing en lugar de días y euros.
- **Segmentar una sola vez**: los clientes cambian de segmento; recalcula periódicamente y analiza las transiciones (¿cuántos fieles pasaron a ocasionales este trimestre?).
- **Olvidar el tamaño y el valor**: el segmento más grande no es necesariamente el más importante; mira qué parte de la facturación aporta cada uno.
- **Acciones genéricas**: «mejorar la experiencia» no es una acción; «email con envío gratis a los 45 días de la última compra» sí.

> **Ideas clave**
> - RFM describe a cada cliente con recencia, frecuencia y valor; se calcula con cualquier histórico de transacciones.
> - El flujo es: construir, transformar, escalar, elegir $k$, perfilar en unidades originales, nombrar, accionar y medir.
> - Un segmento útil tiene nombre, tamaño, perfil y una acción concreta con su métrica.
> - Añadir variables cambia los segmentos: inclúyelas solo si deben definir el grupo.
> - Practica: notebook, sección 4 y ejercicios 1, 2 y 4.

---

## Glosario

- **Aprendizaje no supervisado** (*unsupervised learning*): familia de métodos que buscan estructura en datos sin variable objetivo.
- **Clustering o agrupamiento** (*clustering*): dividir observaciones en grupos de elementos parecidos entre sí.
- **Distancia euclídea** (*Euclidean distance*): raíz de la suma de diferencias al cuadrado entre dos vectores.
- **Estandarización** (*standardization*): transformar una variable para que tenga media 0 y desviación típica 1.
- **Centroide** (*centroid*): punto medio de un grupo; en k-means, el centro al que se asignan los puntos.
- **Inercia** (*inertia, within-cluster sum of squares*): suma de distancias al cuadrado de cada punto a su centroide.
- **Método del codo** (*elbow method*): elegir $k$ donde la inercia deja de bajar bruscamente.
- **Coeficiente de silueta** (*silhouette coefficient*): medida de −1 a 1 que compara cohesión con el propio grupo y separación del vecino.
- **Índice de Rand ajustado, ARI** (*Adjusted Rand Index*): concordancia entre dos particiones, corregida por azar (1 = idénticas, ≈ 0 = aleatorias).
- **Clustering jerárquico aglomerativo** (*agglomerative hierarchical clustering*): une repetidamente los grupos más cercanos hasta formar uno solo.
- **Criterio de enlace** (*linkage*): regla para medir la distancia entre dos grupos (simple, completo, promedio, Ward).
- **Dendrograma** (*dendrogram*): árbol que representa las fusiones del clustering jerárquico y su altura.
- **Reducción de dimensión** (*dimensionality reduction*): representar los datos con menos variables conservando la información relevante.
- **Componente principal** (*principal component*): dirección de máxima varianza, perpendicular a las anteriores.
- **Cargas** (*loadings*): pesos de cada variable original en una componente principal.
- **Varianza explicada** (*explained variance ratio*): fracción de la varianza total que recoge cada componente.
- **Perplejidad** (*perplexity*): parámetro de t-SNE que regula el tamaño efectivo del vecindario.
- **Aprendizaje de variedades** (*manifold learning*): métodos no lineales que buscan una representación de baja dimensión que respete la geometría local.
- **RFM** (*Recency, Frequency, Monetary*): descripción de clientes por recencia, frecuencia y valor de compra.
- **Segmentación** (*segmentation*): división de clientes en grupos accionables para el negocio.
