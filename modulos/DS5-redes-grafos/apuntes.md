# Módulo DS5 · Redes y grafos — Apuntes

Hasta ahora casi todos los datos del curso han sido **tablas**: una fila por cliente, por paciente o por día, y columnas con sus atributos. En este módulo cambiamos el foco a las **relaciones**: quién compra a quién, qué cuenta transfiere dinero a qué otra cuenta, qué almacén abastece a qué tienda, quién sigue a quién. Cuando lo interesante está en las conexiones, la herramienta natural es el **grafo** (o red).

Vas a aprender a representar datos relacionales como grafos, a describirlos con unas pocas métricas, a medir la importancia de cada nodo, a entender el algoritmo que hizo famoso a Google (PageRank), a descubrir grupos solo a partir de la estructura y a predecir conexiones que todavía no existen. El hilo conductor es el notebook del módulo: el **club de kárate de Zachary**, una red de 34 personas que se partió en dos tras un conflicto entre el instructor (nodo 0) y el presidente (nodo 33).

## Índice

- [7.1 Datos como redes: ejemplos en negocio (fraude, logística, redes sociales)](#71-datos-como-redes-ejemplos-en-negocio-fraude-logística-redes-sociales)
- [7.2 Grafos: nodos, aristas, grados, caminos, componentes](#72-grafos-nodos-aristas-grados-caminos-componentes)
- [7.3 Mundos pequeños y redes libres de escala](#73-mundos-pequeños-y-redes-libres-de-escala)
- [7.4 Centralidades: grado, intermediación, cercanía, autovector](#74-centralidades-grado-intermediación-cercanía-autovector)
- [7.5 PageRank](#75-pagerank)
- [7.6 Comunidades: modularidad, Louvain y clustering espectral](#76-comunidades-modularidad-louvain-y-clustering-espectral)
- [7.7 Predicción de enlaces y difusión en redes](#77-predicción-de-enlaces-y-difusión-en-redes)
- [Glosario](#glosario)

---

## 7.1 Datos como redes: ejemplos en negocio (fraude, logística, redes sociales)

### Por qué una tabla no basta

Imagina que trabajas en el equipo de fraude de un banco. Tienes una tabla de transacciones con importe, fecha, cuenta de origen y cuenta de destino. Un modelo de clasificación como los del módulo 04 puede aprender que las transferencias de madrugada y por importes redondos son sospechosas. Pero hay patrones que **ninguna fila aislada** revela: diez cuentas recién abiertas que se envían dinero en círculo, o una cuenta «mula» que recibe de cincuenta orígenes distintos y lo reenvía todo a un único destino. Esos patrones viven en la **estructura de las conexiones**, no en los atributos de cada transacción.

Esa es la idea central del módulo: cuando las entidades se relacionan entre sí, la información útil está tanto en las entidades como en sus relaciones. Un grafo es simplemente la forma de escribir esas relaciones:

- **Nodos** (o vértices): las entidades. Clientes, cuentas, productos, almacenes, páginas web, personas.
- **Aristas** (o enlaces): las relaciones entre pares de entidades. Transferencias, compras, rutas, hipervínculos, amistades.

### Ejemplos de negocio

| Dominio | Nodos | Aristas | Pregunta típica |
|---|---|---|---|
| Fraude y blanqueo | cuentas, tarjetas, dispositivos, direcciones | transferencias, datos compartidos | ¿hay anillos de cuentas que comparten dispositivo o dirección? |
| Logística y cadena de suministro | proveedores, plantas, almacenes, tiendas | rutas, contratos de suministro | ¿qué nodo, si falla, deja sin servicio a más clientes? |
| Redes sociales y marketing | usuarios | seguir, mencionar, recomendar | ¿a quién contacto para que un mensaje llegue lejos? |
| Telecomunicaciones | clientes | llamadas | ¿qué clientes tienen riesgo de baja porque sus contactos se han ido? |
| Comercio electrónico | clientes y productos | compras, valoraciones | ¿qué producto recomiendo? (es el grafo bipartito del módulo 06) |
| Web y contenidos | páginas | hipervínculos | ¿qué página es más relevante? (PageRank, lección 7.5) |
| Organizaciones | empleados | correos, reuniones | ¿quién conecta departamentos? ¿qué pasa si se va? |

Fíjate en que la **misma técnica** responde preguntas muy distintas. La centralidad de intermediación que identifica al empleado que conecta dos departamentos es la que identifica el puerto del que depende media cadena de suministro. La detección de comunidades que separa las dos facciones del club de kárate es la que encuentra anillos de fraude.

### Tipos de redes que te encontrarás

- **No dirigidas** (la relación es simétrica: amistad, coautoría) o **dirigidas** (tiene sentido: A sigue a B, A paga a B).
- **Sin pesos** o **ponderadas** (cada arista lleva un número: importe, nº de llamadas, kilómetros). En el notebook, el grafo del kárate trae un atributo `weight` con la intensidad de la relación.
- **Unipartitas** (un solo tipo de nodo) o **bipartitas** (dos tipos: clientes y productos; solo hay aristas entre tipos distintos).
- **Estáticas** o **temporales** (las aristas tienen fecha). Muchas preguntas de negocio son temporales: ¿qué enlaces aparecerán? (lección 7.7).

### Cómo se construye un grafo a partir de una tabla

En la práctica, casi siempre partes de una **lista de aristas**: una tabla con columnas `origen`, `destino` y, opcionalmente, atributos. Con NetworkX se convierte en grafo en una línea:

```python
import networkx as nx
import pandas as pd

transferencias = pd.DataFrame({
    "origen":  ["A", "A", "B", "C", "D"],
    "destino": ["B", "C", "C", "D", "A"],
    "importe": [500, 120, 80, 950, 300],
})
G = nx.from_pandas_edgelist(transferencias, "origen", "destino",
                            edge_attr="importe", create_using=nx.DiGraph)
print(G.number_of_nodes(), G.number_of_edges())   # 4 nodos, 5 aristas
```

La decisión de modelado más importante no es técnica: es **qué cuenta como nodo y qué cuenta como arista**. ¿Dos clientes están conectados si compraron el mismo producto? ¿Si viven en la misma dirección? ¿Si se transfirieron dinero en los últimos 90 días? Cada elección produce una red distinta y responde a una pregunta distinta. Escríbela antes de calcular nada.

### El caso del módulo: el club de kárate

Wayne Zachary observó durante dos años las interacciones fuera de clase entre los 34 miembros de un club de kárate universitario. Durante el estudio, un conflicto entre el instructor (nodo 0, «Mr. Hi») y el presidente (nodo 33) partió el club en dos. La pregunta del notebook es: **¿podríamos haber anticipado quién se iría con quién solo mirando quién se relacionaba con quién?** Spoiler: sí, casi perfectamente (lección 7.6).

### Errores frecuentes

- **Construir la red sin una pregunta.** Un grafo de «todo con todo» suele ser una bola de pelo ilegible. Define nodos y aristas en función de la decisión que quieres tomar.
- **Ignorar el sentido o el peso** cuando importan. En fraude, quién paga a quién es esencial; tratarlo como no dirigido destruye el patrón «muchos entran, uno sale».
- **Confundir la visualización con el análisis.** Un dibujo bonito de 10.000 nodos no demuestra nada. Las métricas de las lecciones siguientes sí.
- **Olvidar el sesgo de muestreo.** Si solo observas las transferencias internas de tu banco, la red está cortada en los bordes: los nodos que parecen periféricos quizá sean centrales en el sistema completo.

> **Ideas clave**
> - Un grafo representa entidades (nodos) y relaciones (aristas); se usa cuando la información está en las conexiones.
> - Fraude, logística, marketing, recomendación y búsqueda web comparten las mismas técnicas de análisis de redes.
> - Las redes pueden ser dirigidas o no, ponderadas o no, unipartitas o bipartitas, estáticas o temporales.
> - La decisión clave es qué es un nodo y qué es una arista; se toma a partir de la pregunta de negocio.
> - Practica: notebook, celda inicial (carga y dibujo del club de kárate).

---

## 7.2 Grafos: nodos, aristas, grados, caminos, componentes

### Representaciones

Un grafo $G = (V, E)$ es un conjunto de nodos $V$ (con $n = |V|$) y un conjunto de aristas $E$ (con $m = |E|$). Hay tres formas habituales de guardarlo:

1. **Lista de aristas**: los pares $(u, v)$. Es lo que sueles tener en una base de datos.
2. **Lista de adyacencia**: para cada nodo, sus vecinos. Es lo que usa NetworkX internamente (`G[0]` devuelve los vecinos del nodo 0).
3. **Matriz de adyacencia** $A$: una matriz $n \times n$ con $A_{ij} = 1$ si hay arista entre $i$ y $j$ (o el peso, si es ponderada). En una red no dirigida es simétrica. Es la que usaremos para PageRank y clustering espectral.

Las redes reales son **dispersas**: casi todas las entradas de $A$ son cero. Por eso en redes grandes se usan matrices dispersas (`scipy.sparse`) y nunca la matriz completa.

### Grado y densidad

El **grado** $k_i$ de un nodo es su número de vecinos: $k_i = \sum_j A_{ij}$. En redes dirigidas se distingue **grado de entrada** (cuántos apuntan al nodo) y **de salida**. El **grado medio** es $\langle k \rangle = 2m/n$ (cada arista suma 1 al grado de dos nodos).

La **densidad** es la fracción de aristas posibles que existen:

$$\text{densidad} = \frac{m}{n(n-1)/2}.$$

En el club de kárate: $n = 34$, $m = 78$, grado medio $\approx 4{,}59$ y densidad $\approx 0{,}139$. Es decir, solo el 14 % de los pares posibles se relacionan, y eso que es una red pequeña y muy unida. En redes reales grandes la densidad es minúscula: un usuario de una red social no conoce ni a una millonésima parte del resto.

La **distribución de grados** (cuántos nodos tienen grado 1, 2, 3...) es la primera gráfica que debes mirar. En el kárate la mayoría tiene entre 2 y 5 contactos, pero dos nodos destacan: el 33 (17 contactos) y el 0 (16). Ya intuyes quiénes son los líderes.

### Caminos y distancias

Un **camino** es una secuencia de nodos en la que cada par consecutivo está unido por una arista. La **distancia** $d(i,j)$ es la longitud del camino más corto (nº de aristas). Dos métricas globales:

- **Distancia media**: el promedio de $d(i,j)$ sobre todos los pares. En el kárate, $\approx 2{,}41$.
- **Diámetro**: la mayor distancia entre dos nodos. En el kárate, 5. Por ejemplo, del nodo 16 al 25 hay que pasar por 5, 0 y 31.

Los caminos más cortos se calculan con **búsqueda en anchura** (BFS) si no hay pesos, o con el algoritmo de **Dijkstra** si los pesos son distancias o costes. Cuidado con el significado del peso: si el peso es «intensidad de la relación», un peso alto debería acercar los nodos, no alejarlos; tendrías que usar como distancia algo como $1/w$.

### Componentes conexas

Una red no dirigida es **conexa** si existe un camino entre cualquier par de nodos. Si no, se divide en **componentes conexas**: subconjuntos de nodos conectados entre sí pero no con el resto. En casi todas las redes reales hay una **componente gigante** que contiene a la gran mayoría de los nodos y muchas componentes pequeñas.

En redes dirigidas se distingue entre componentes **débilmente** conexas (conexas si ignoras el sentido) y **fuertemente** conexas (puedes ir de cualquier nodo a cualquier otro respetando el sentido). En fraude, una componente fuertemente conexa de cuentas nuevas es una señal clásica de dinero que circula en círculo.

### Agrupamiento: los amigos de mis amigos

El **coeficiente de agrupamiento local** de un nodo mide qué fracción de los pares de sus vecinos están también conectados entre sí (cuántos «triángulos» cierra):

$$C_i = \frac{\text{nº de aristas entre los vecinos de } i}{k_i (k_i - 1)/2}.$$

El **coeficiente medio** es el promedio de $C_i$. En el kárate vale $\approx 0{,}57$: si dos personas son amigas de una tercera, más de la mitad de las veces son amigas entre sí. En una red aleatoria con la misma densidad sería $\approx 0{,}14$. El agrupamiento alto es la huella de las comunidades (lección 7.6).

### Las métricas en el notebook

```python
print(f"Densidad: {nx.density(G):.3f}")
print(f"Distancia media: {nx.average_shortest_path_length(G):.2f}")
print(f"Coeficiente de agrupamiento: {nx.average_clustering(G):.2f}")
print(nx.number_connected_components(G))      # 1: la red es conexa
```

### Ejemplo de negocio: red de proveedores

Una empresa de distribución modela sus 200 proveedores, 12 almacenes y 900 tiendas como un grafo dirigido. Tres métricas básicas ya responden preguntas útiles: el **grado de entrada** de cada tienda (¿de cuántos almacenes puede recibir?; si es 1, depende de un solo punto), las **componentes** (¿hay tiendas que solo se abastecen de un subconjunto aislado de proveedores?) y la **distancia** media proveedor-tienda (cuántos saltos y, por tanto, cuánto tiempo y coste de manipulación).

### Errores frecuentes

- **Calcular la distancia media en una red no conexa.** Entre componentes distintas la distancia es infinita; `nx.average_shortest_path_length` lanza un error. Calcúlala en la componente gigante o usa la **eficiencia global** (media de $1/d_{ij}$, que vale 0 para pares desconectados).
- **Comparar densidades de redes de tamaños muy distintos.** La densidad baja casi siempre al crecer la red, porque el número de aristas posibles crece como $n^2$ y el de contactos reales de cada nodo no.
- **Confundir el coeficiente medio con la transitividad.** La transitividad (`nx.transitivity`) es la fracción global de tríos cerrados y da más peso a los nodos de grado alto; en el kárate vale $\approx 0{,}26$, muy distinto de 0,57.

> **Ideas clave**
> - Un grafo se guarda como lista de aristas, lista de adyacencia o matriz de adyacencia $A$ (dispersa en redes grandes).
> - Grado, densidad y distribución de grados describen «cuánto» está conectada la red; distancia media, diámetro y componentes describen «cómo de lejos» y «si se puede llegar».
> - El coeficiente de agrupamiento mide cuántos triángulos se cierran; un valor alto indica grupos cohesionados.
> - Club de kárate: 34 nodos, 78 aristas, densidad 0,14, distancia media 2,41, agrupamiento 0,57.
> - Practica: notebook, sección 1 (Métricas básicas).

---

## 7.3 Mundos pequeños y redes libres de escala

### Dos sorpresas de las redes reales

Cuando en los años 90 se empezaron a analizar redes reales grandes (la web, colaboraciones entre actores, redes eléctricas, redes metabólicas), aparecieron dos regularidades que la teoría clásica de grafos aleatorios no explicaba:

1. **Mundo pequeño**: casi cualquier par de nodos está a muy pocos saltos, aunque la red sea enorme y cada nodo tenga pocos contactos.
2. **Libre de escala**: unos pocos nodos (*hubs*) tienen muchísimas más conexiones que el resto; la distribución de grados tiene una «cola pesada».

Las dos tienen consecuencias directas para el negocio: lo rápido que se propaga un rumor o un virus, lo robusta que es una cadena de suministro y lo útil que es encontrar a los *hubs*.

### El modelo de referencia: la red aleatoria

Para saber si algo es «sorprendente» necesitas un punto de comparación. El modelo de **Erdős–Rényi** (ER) crea una red uniendo cada par de nodos con la misma probabilidad $p$, independientemente del resto. Sus propiedades:

- El grado de cada nodo sigue una distribución binomial (aproximadamente de Poisson): casi todos los nodos tienen un grado cercano a la media y **no hay hubs**.
- La distancia media crece muy despacio con el tamaño: $\ell \sim \ln n / \ln \langle k \rangle$.
- El coeficiente de agrupamiento es $C \approx p$, minúsculo en redes grandes.

### Mundos pequeños

La anécdota clásica es el experimento de Stanley Milgram (1967): pidió a personas de Nebraska y Kansas que hicieran llegar una carta a un desconocido en Boston, reenviándola solo a conocidos personales. Las cartas que llegaron lo hicieron en unos seis pasos de media, de ahí lo de los «seis grados de separación».

Lo interesante no es solo que las distancias sean cortas (eso ya pasa en una red aleatoria), sino que lo sean **a la vez** que el agrupamiento es alto. En una red aleatoria hay distancias cortas pero no hay triángulos; en una red regular (una retícula, donde cada uno solo conoce a sus vecinos de calle) hay muchos triángulos pero las distancias son larguísimas. Las redes sociales tienen lo mejor de los dos mundos.

El modelo de **Watts–Strogatz** (1998) lo explica: parte de un anillo en el que cada nodo se conecta a sus $k$ vecinos más próximos (mucho agrupamiento, distancias largas) y «recablea» al azar una fracción $p$ de las aristas. Con muy pocos atajos, la distancia media se desploma mientras el agrupamiento apenas cambia. En una simulación con 1.000 nodos y 10 vecinos cada uno:

| Fracción recableada $p$ | Agrupamiento medio | Distancia media |
|---|---|---|
| 0 (anillo regular) | 0,67 | 50,5 |
| 0,01 | 0,65 | 9,6 |
| 0,1 | 0,49 | 4,4 |
| 1 (casi aleatorio) | 0,01 | 3,3 |

Con solo un 1 % de atajos, la distancia se divide por cinco y el agrupamiento casi no se mueve. Eso es un **mundo pequeño**.

El club de kárate cumple el patrón: agrupamiento 0,57 frente a 0,14 de una red aleatoria con los mismos nodos y aristas, y distancia media 2,41 frente a 2,42. Mismas distancias, cuatro veces más triángulos.

### Redes libres de escala

En una red **libre de escala**, la distribución de grados sigue aproximadamente una **ley de potencias**:

$$P(k) \propto k^{-\gamma}, \qquad \text{típicamente } 2 < \gamma < 3.$$

En escala log-log, el histograma de grados es aproximadamente una recta de pendiente $-\gamma$. La consecuencia práctica es la existencia de **hubs**: nodos con un grado cientos de veces mayor que la media. En una simulación con 10.000 nodos y grado medio 4, el nodo más conectado de una red de Barabási–Albert tiene unos 260 contactos; en una red aleatoria del mismo tamaño y densidad, el máximo es 14.

¿De dónde salen los *hubs*? El modelo de **Barabási–Albert** (1999) propone dos ingredientes: **crecimiento** (la red gana nodos con el tiempo) y **enlace preferencial** (cada nodo nuevo se conecta con más probabilidad a los que ya tienen muchos enlaces: «el rico se hace más rico»). Es lo que pasa con las webs más enlazadas, los aeropuertos con más rutas o los usuarios con más seguidores.

Un matiz importante: el término «libre de escala» se ha usado con generosidad. Ajustar una ley de potencias a datos reales es delicado y muchas redes encajan igual de bien con otras distribuciones de cola pesada (lognormal, exponencial truncada). Para decisiones de negocio, lo relevante no es el valor exacto de $\gamma$, sino si **existen hubs** y cuánto dependes de ellos.

### Consecuencias para el negocio

- **Difusión rápida.** En un mundo pequeño con *hubs*, una información (o un virus, o un bulo) llega a casi toda la red en pocos pasos. Si siembras el mensaje en un *hub*, llega aún antes (lección 7.7).
- **Robustez y fragilidad.** Las redes con *hubs* son **robustas a fallos aleatorios** (si falla un nodo al azar, casi seguro es uno pequeño) pero **frágiles ante ataques dirigidos** (si cae un *hub*, la red se fragmenta). Lo verás en el ejercicio 2: quitar solo al instructor deja a 6 miembros del club desconectados del resto.
- **La paradoja de la amistad.** De media, tus amigos tienen más amigos que tú. En el kárate, el grado medio es 4,6, pero el grado medio de «un amigo de alguien» es 7,8: los *hubs* aparecen en muchas listas de amigos. Aplicación: si eliges personas al azar y les pides que nombren a un amigo, llegas a personas más conectadas. Se ha usado para detectar brotes epidémicos antes y para sembrar campañas.

### Errores frecuentes

- **Declarar una red «libre de escala» a ojo** porque el histograma tiene cola larga. Usa escala log-log y compara con otras distribuciones antes de afirmarlo.
- **Pensar que «mundo pequeño» significa solo distancias cortas.** La definición exige distancias cortas **y** agrupamiento alto respecto a una red aleatoria de referencia.
- **Extrapolar desde redes pequeñas.** Con 34 nodos no se puede estimar una ley de potencias; las propiedades de escala solo tienen sentido en redes grandes.

> **Ideas clave**
> - Las redes reales suelen ser mundos pequeños: distancias cortas (como una red aleatoria) y agrupamiento alto (como una red regular).
> - Watts–Strogatz: unos pocos atajos bastan para acortar drásticamente las distancias.
> - En redes libres de escala la distribución de grados tiene cola pesada ($P(k) \propto k^{-\gamma}$) y aparecen *hubs*; Barabási–Albert los explica con crecimiento y enlace preferencial.
> - Redes con *hubs*: difusión rápida, robustez ante fallos aleatorios y fragilidad ante ataques a los *hubs*.
> - Practica: notebook, sección 1 (distribución de grados) y ejercicio 2 (robustez).

---

## 7.4 Centralidades: grado, intermediación, cercanía, autovector

### «Importante» depende de la pregunta

¿Quién es la persona más importante del club? Depende de para qué. Si quieres que un mensaje llegue al mayor número de personas en un solo paso, buscas a quien tenga **más contactos**. Si te preocupa quién puede cortar la comunicación entre dos grupos, buscas a quien esté **en medio** de muchos caminos. Si quieres a alguien que difunda rápido a toda la red, buscas a quien esté **cerca de todos**. Si buscas influencia, quizá prefieras a quien está conectado con **gente a su vez influyente**. Cada pregunta da lugar a una **medida de centralidad** distinta.

### Centralidad de grado

La más simple: el número de vecinos, normalizado por el máximo posible:

$$C_D(i) = \frac{k_i}{n-1}.$$

Mide la **popularidad** o la exposición directa. En el kárate, el 33 (0,515) y el 0 (0,485) están muy por encima del resto. Es barata de calcular y sorprendentemente útil, pero solo mira el entorno inmediato: un nodo con 10 contactos aislados en una esquina puntúa igual que uno con 10 contactos repartidos por toda la red.

### Centralidad de intermediación (*betweenness*)

Mide cuántos caminos más cortos entre otros pares de nodos pasan por $i$:

$$C_B(i) = \sum_{s \neq i \neq t} \frac{\sigma_{st}(i)}{\sigma_{st}},$$

donde $\sigma_{st}$ es el número de caminos más cortos entre $s$ y $t$ y $\sigma_{st}(i)$ los que pasan por $i$. NetworkX la normaliza dividiendo por el número de pares.

Identifica **puentes y cuellos de botella**: nodos que controlan el flujo entre partes de la red. En el kárate, el instructor (0) tiene la mayor intermediación (0,438), por delante del presidente (0,304): muchos miembros periféricos solo llegan al resto del club a través de él. Es la medida a usar si te preguntas «¿qué pasa si este nodo desaparece?»: proveedores únicos, empleados que conectan departamentos, routers críticos. Su cálculo exacto es costoso ($O(nm)$ con el algoritmo de Brandes); en redes grandes se aproxima muestreando nodos (`k=` en NetworkX).

### Centralidad de cercanía (*closeness*)

Mide lo cerca que está un nodo de todos los demás:

$$C_C(i) = \frac{n-1}{\sum_{j \neq i} d(i,j)}.$$

Un nodo con cercanía alta puede **llegar rápido a toda la red**: útil para ubicar un almacén central o elegir quién difunde una información urgente. En el kárate los valores están muy apretados (entre 0,5 y 0,57 los primeros), porque en una red tan pequeña todos están cerca de todos. En redes no conexas hay que usar variantes (NetworkX calcula la cercanía dentro de la componente de cada nodo, con una corrección).

### Centralidad de autovector (*eigenvector*)

Aquí la idea es recursiva: **eres importante si estás conectado a nodos importantes**. Si $x_i$ es la importancia de $i$, pedimos que sea proporcional a la suma de las importancias de sus vecinos:

$$x_i = \frac{1}{\lambda} \sum_j A_{ij} x_j \quad \Longleftrightarrow \quad A\mathbf{x} = \lambda \mathbf{x}.$$

Es decir, $\mathbf{x}$ es un **autovector** de la matriz de adyacencia; se toma el asociado al mayor autovalor, que (por el teorema de Perron–Frobenius, en redes conexas) tiene todas sus componentes positivas. En el kárate, el 33 (0,373) supera ligeramente al 0 (0,355): el presidente está rodeado de miembros muy conectados entre sí.

Es la medida de **influencia** o de prestigio. Su punto débil: en redes dirigidas, los nodos sin enlaces de entrada reciben importancia cero, y esa importancia nula se propaga. PageRank (lección 7.5) arregla precisamente eso.

### Comparación en el club de kárate

| Nodo | Grado | Intermediación | Cercanía | Autovector |
|---|---|---|---|---|
| 0 (instructor) | 0,485 | **0,438** | **0,569** | 0,355 |
| 33 (presidente) | **0,515** | 0,304 | 0,550 | **0,373** |
| 32 | 0,364 | 0,145 | 0,516 | 0,309 |
| 2 | 0,303 | 0,144 | 0,559 | 0,317 |
| 31 | 0,182 | 0,138 | 0,541 | 0,191 |

Las medidas **coinciden en lo grueso** (0 y 33 están arriba en todas) pero **discrepan en los detalles**. El nodo 31, con solo 6 contactos, tiene casi la misma intermediación que el 2 o el 32: hace de puente entre grupos. La correlación de rangos (Spearman) entre grado e intermediación es 0,90, pero entre intermediación y autovector baja a 0,69.

```python
centralidades = pd.DataFrame({
    "grado": nx.degree_centrality(G),
    "intermediación": nx.betweenness_centrality(G),
    "cercanía": nx.closeness_centrality(G),
    "autovector": nx.eigenvector_centrality(G),
})
centralidades.corr(method="spearman")
```

### Ejemplo de negocio: retención de talento

Recursos Humanos analiza la red de correos y reuniones de 2.000 empleados. Por **grado** salen los directivos y los asistentes de dirección (mucha comunicación). Por **intermediación** aparecen perfiles inesperados: un técnico de sistemas y una responsable de compras que son los únicos enlaces entre la sede y dos fábricas. Si se van, la coordinación se resiente aunque su cargo no sea alto. Esa lista, y no la de grado, es la que interesa para un plan de retención o de sucesión.

### Errores frecuentes

- **Elegir la centralidad por costumbre.** Primero formula la pregunta («¿quién conecta?», «¿quién llega rápido?», «¿quién influye?») y después elige la medida.
- **Comparar valores absolutos entre redes distintas.** Las centralidades dependen del tamaño y la estructura; compara rankings dentro de una misma red.
- **Ignorar pesos y sentido.** Si las aristas tienen peso, decide si es «capacidad» (más es mejor) o «distancia» (más es peor) y pásalo correctamente (`weight=`, `distance=`).
- **Fiarse de la cercanía en redes no conexas** sin entender cómo la calcula la librería.

> **Ideas clave**
> - Grado = popularidad; intermediación = puente o cuello de botella; cercanía = rapidez para llegar a todos; autovector = conectado a nodos importantes.
> - Las medidas suelen coincidir en los nodos más destacados, pero discrepan en los intermedios; esas discrepancias son información.
> - La centralidad de autovector es el autovector principal de $A$; es la base de PageRank.
> - En el kárate: el 33 lidera en grado y autovector; el 0 en intermediación y cercanía.
> - Practica: notebook, sección 2 (Centralidad) y ejercicio 4 (*Los miserables*).

---

## 7.5 PageRank

### El problema de Google

A finales de los 90, los buscadores ordenaban las páginas por cuántas veces aparecían las palabras de la consulta. Era fácil de manipular: bastaba con repetir «hotel barato» mil veces en texto invisible. Larry Page y Sergey Brin propusieron usar la estructura de enlaces: una página es relevante si **otras páginas relevantes la enlazan**. Es la idea de la centralidad de autovector, adaptada a una red dirigida enorme y con problemas prácticos que hay que resolver.

### El paseante aleatorio

Imagina a un internauta aburrido que empieza en una página cualquiera y, en cada paso, hace clic en un enlace elegido al azar de la página en la que está. Si dejamos que pasee durante muchísimo tiempo, ¿qué fracción del tiempo pasa en cada página? Las páginas que reciben muchos enlaces, sobre todo de páginas a su vez muy visitadas, acumularán más visitas. **Esa fracción de tiempo es el PageRank.**

Formalmente, el paseo es una **cadena de Markov**. Si $A$ es la matriz de adyacencia y $k_j^{\text{out}}$ el grado de salida de $j$, la matriz de transición por columnas es

$$M_{ij} = \frac{A_{ji}}{k_j^{\text{out}}},$$

la probabilidad de pasar de $j$ a $i$. (En una red no dirigida como el kárate, $A$ es simétrica y $M_{ij} = A_{ij}/k_j$.) Si $\mathbf{r}^{(t)}$ es la probabilidad de estar en cada nodo en el paso $t$, entonces $\mathbf{r}^{(t+1)} = M \mathbf{r}^{(t)}$, y buscamos la **distribución estacionaria**: $\mathbf{r} = M\mathbf{r}$.

### Dos problemas y una solución: el teletransporte

El paseo puro falla en dos situaciones:

1. **Callejones sin salida** (*dead ends*): páginas sin enlaces de salida. El paseante se queda atascado y la probabilidad «se escapa».
2. **Trampas** (*spider traps*): grupos de páginas que solo se enlazan entre sí. El paseante entra y no sale; todo el PageRank acaba en ese grupo.

La solución es el **teletransporte**: en cada paso, con probabilidad $d$ (el **factor de amortiguación**, típicamente 0,85) sigue un enlace al azar, y con probabilidad $1-d$ salta a una página cualquiera elegida uniformemente. La ecuación de PageRank queda:

$$\mathbf{r} = \frac{1-d}{n}\mathbf{1} + d\, M\mathbf{r}.$$

El teletransporte garantiza que la cadena sea irreducible y aperiódica, y por tanto que exista una **distribución estacionaria única** a la que se converge desde cualquier punto de partida. Interpretación de $d = 0{,}85$: el paseante sigue de media unos $1/(1-d) \approx 6{,}7$ enlaces antes de aburrirse y saltar a otro sitio.

### Iteración de potencias

¿Cómo se resuelve con miles de millones de páginas? No se invierte ninguna matriz: se aplica la ecuación una y otra vez partiendo de una distribución uniforme. Es la **iteración de potencias**, y converge rápido (el error se reduce aproximadamente en un factor $d$ por iteración; con 50–100 iteraciones sobra). Es exactamente lo que implementa el notebook:

```python
def pagerank(G, d=0.85, iters=100):
    A = nx.to_numpy_array(G, nodelist=sorted(G))
    M = A / A.sum(axis=0, keepdims=True)        # matriz de transición por columnas
    n = len(A)
    r = np.full(n, 1 / n)
    for _ in range(iters):
        r = (1 - d) / n + d * M @ r
    return r
```

La diferencia máxima con `nx.pagerank` es del orden de $10^{-5}$ (el notebook la imprime redondeada a 6 decimales): ambos métodos llegan a la misma solución, salvo la tolerancia de parada de NetworkX. Observa que `to_numpy_array` usa por defecto el atributo `weight`, igual que `nx.pagerank`: ambos calculan un PageRank **ponderado**, en el que el paseante elige enlaces con probabilidad proporcional a su peso.

### PageRank en el club de kárate

En el kárate, PageRank ordena a los primeros casi igual que el grado: 33 (0,097), 0 (0,089), 32 (0,076), 2 (0,063). En una red no dirigida, el PageRank sin teletransporte sería exactamente proporcional al grado; el teletransporte y los pesos introducen matices. **PageRank brilla de verdad en redes dirigidas**, donde distingue entre recibir enlaces de nodos importantes o de nodos irrelevantes.

### Variantes útiles en negocio

- **PageRank personalizado**: en vez de teletransportarse a cualquier nodo, el paseante salta solo a un conjunto de nodos de interés. El resultado mide la **proximidad** a ese conjunto. Se usa para recomendación («productos cercanos a lo que ha comprado este cliente») y para fraude: se teletransporta a las cuentas ya confirmadas como fraudulentas y las cuentas con PageRank alto son las más «contaminadas». En NetworkX: `nx.pagerank(G, personalization={nodo: peso})`.
- **Riesgo sistémico**: en redes de préstamos interbancarios o de proveedores, variantes de PageRank identifican a las entidades cuya caída arrastraría a más.
- **Ranking de jugadores, artículos científicos o expertos**: cualquier sistema en el que «me valora alguien que a su vez es valorado».

### Ejemplo de negocio: detección de cuentas mula

Un banco tiene 2 millones de cuentas y 15 millones de transferencias en el último trimestre, y 300 cuentas confirmadas como fraude. Calcula un PageRank personalizado con teletransporte solo a esas 300 cuentas, sobre el grafo dirigido de transferencias. Las 1.000 cuentas con mayor puntuación (excluyendo las ya conocidas) pasan a revisión manual. No hace falta ninguna etiqueta más: la estructura de la red propaga la sospecha.

### Errores frecuentes

- **Olvidar normalizar las columnas** de $M$, o normalizar filas cuando el código multiplica por columnas. Comprueba que $\sum_i r_i = 1$ en todo momento.
- **No tratar los nodos sin salida**: la columna de $M$ queda a cero y la suma de $\mathbf{r}$ decrece. NetworkX los trata redistribuyendo su probabilidad uniformemente.
- **Usar $d$ muy cercano a 1**: la convergencia se vuelve lenta y el resultado muy sensible a trampas. Con $d$ muy bajo, todo el mundo tiende a $1/n$.
- **Interpretar valores absolutos**: el PageRank de un nodo depende del tamaño de la red (suma 1). Compara posiciones en el ranking o normaliza por $1/n$.

> **Ideas clave**
> - PageRank es la fracción de tiempo que un paseante aleatorio pasa en cada nodo: distribución estacionaria de una cadena de Markov.
> - El teletransporte (probabilidad $1-d$) evita callejones y trampas y garantiza una solución única.
> - Se calcula por iteración de potencias: $\mathbf{r} \leftarrow \frac{1-d}{n} + d\,M\mathbf{r}$.
> - El PageRank personalizado mide proximidad a un conjunto de nodos: muy útil en recomendación y fraude.
> - Practica: notebook, sección 3 (PageRank desde cero).

---

## 7.6 Comunidades: modularidad, Louvain y clustering espectral

### Qué es una comunidad

Una **comunidad** es un grupo de nodos con muchas aristas dentro y pocas hacia fuera. Es el equivalente del clustering del módulo 02, pero sin coordenadas: la única información es quién está conectado con quién. En negocio aparecen por todas partes: grupos de clientes que se recomiendan entre sí, anillos de fraude, equipos informales dentro de una empresa, mercados regionales en una red logística.

El club de kárate es el ejemplo perfecto porque conocemos la **respuesta real**: tras la ruptura, cada miembro se fue con el instructor o con el presidente. ¿Podemos recuperar esa división solo con la red de amistades?

### Modularidad: cuantificar «buena partición»

Necesitamos una función que diga si una partición es buena. Contar las aristas internas no sirve (meter todo en un grupo da el máximo). La **modularidad** compara las aristas dentro de los grupos con las que **esperarías por azar** en una red con los mismos grados:

$$Q = \frac{1}{2m} \sum_{i,j} \left[ A_{ij} - \frac{k_i k_j}{2m} \right] \delta(c_i, c_j),$$

donde $c_i$ es la comunidad del nodo $i$ y $\delta(c_i, c_j) = 1$ si están en la misma. El término $k_i k_j / 2m$ es el número esperado de aristas entre $i$ y $j$ si las aristas se repartieran al azar respetando los grados (el «modelo de configuración»). Por tanto:

- $Q \approx 0$: los grupos no son más densos de lo que daría el azar.
- $Q > 0{,}3$: estructura comunitaria clara en la práctica.
- El máximo teórico es 1.

En el kárate, la partición real en dos facciones tiene una modularidad (ponderada) de 0,39.

### Louvain: optimizar la modularidad a lo grande

Encontrar la partición de modularidad máxima es computacionalmente intratable en general, así que se usan heurísticas. La más popular es **Louvain** (Blondel y colaboradores, 2008), que alterna dos fases:

1. **Movimiento local**: cada nodo empieza en su propia comunidad; se recorre cada nodo y se mueve a la comunidad vecina que más aumenta $Q$, hasta que nadie quiere moverse.
2. **Agregación**: cada comunidad se convierte en un «supernodo» (las aristas internas pasan a ser un bucle con peso) y se repite la fase 1 sobre la red reducida.

Se para cuando ya no mejora $Q$. Es muy rápida (redes de millones de nodos en minutos) y **elige sola el número de comunidades**. Dos advertencias: tiene componente aleatoria (por eso fijamos `seed`) y puede producir comunidades mal conectadas internamente; su sucesor, **Leiden**, corrige esto último.

En el notebook, Louvain encuentra **4 comunidades** con modularidad 0,444, mayor que la de la partición real. El ARI frente a las facciones reales es 0,51: Louvain no se equivoca, sino que **subdivide** cada facción en subgrupos más finos. Es una lección importante: la partición de máxima modularidad no tiene por qué coincidir con la que a ti te interesa.

### Clustering espectral: cortar por donde menos duele

El enfoque espectral parte de otra pregunta: ¿cómo divido la red en dos partes cortando el menor número de aristas posible, sin que una parte sea minúscula? La herramienta es la **matriz laplaciana**:

$$L = D - A,$$

donde $D$ es la matriz diagonal de grados. Sus propiedades clave:

- Para cualquier vector $\mathbf{x}$, $\mathbf{x}^\top L \mathbf{x} = \sum_{(i,j) \in E} (x_i - x_j)^2$. Si $\mathbf{x}$ asigna $+1$ a un grupo y $-1$ al otro, esta suma cuenta (×4) las aristas cortadas.
- Todos sus autovalores son $\geq 0$, y el más pequeño es 0 con autovector constante (no aporta nada).
- El número de autovalores iguales a 0 es el número de componentes conexas.
- El **segundo autovalor** $\lambda_2$ (conectividad algebraica) mide lo difícil que es partir la red: cuanto más cerca de 0, más fácil es cortarla en dos.
- Su autovector, el **vector de Fiedler**, es la solución «relajada» (con valores reales en lugar de $\pm 1$) del problema de corte mínimo equilibrado. **Su signo da la partición en dos.**

El código del notebook:

```python
L = nx.laplacian_matrix(G, nodelist=sorted(G)).toarray().astype(float)
autovalores, autovectores = np.linalg.eigh(L)
fiedler = autovectores[:, 1]
etiqueta_espectral = (fiedler > 0).astype(int)
```

El resultado es espectacular: el corte espectral acierta la facción de **33 de los 34 miembros** (97 %, ARI = 0,88). Solo falla el nodo 8, que tiene vínculos con ambos bandos. Sin preguntar a nadie, solo mirando quién se relacionaba con quién, se anticipa la ruptura.

Para más de dos grupos, se toman los $k$ primeros autovectores de $L$ (o de su versión normalizada), se usa cada fila como coordenadas del nodo y se aplica **k-means**, conectando con el módulo 02. Es lo que hace `sklearn.cluster.SpectralClustering` con `affinity="precomputed"`.

### Louvain o espectral: cuándo usar cada uno

| | Louvain | Espectral |
|---|---|---|
| Nº de grupos | lo decide el algoritmo | lo fijas tú ($k$) |
| Escala | millones de nodos | miles a decenas de miles (autovectores) |
| Base teórica | maximiza la modularidad | relajación del corte mínimo |
| Útil cuando | exploras sin saber cuántos grupos hay | sabes cuántos grupos buscas (p. ej., dos facciones) |

### Ejemplo de negocio: anillos de fraude en seguros

Una aseguradora construye un grafo donde los nodos son siniestros, asegurados, talleres, abogados y testigos, y las aristas indican que aparecen en el mismo expediente. Louvain encuentra cientos de comunidades; la mayoría son pequeñas y lógicas (una familia, un taller de barrio). Pero una comunidad densa de 40 siniestros que comparten los mismos 3 testigos y 2 talleres es una candidata clara a anillo de fraude organizado. La comunidad no prueba el fraude: **prioriza** qué investigar.

### Errores frecuentes

- **Tomar la modularidad máxima como verdad.** La modularidad tiene un **límite de resolución**: en redes grandes tiende a fusionar comunidades pequeñas reales. Puedes ajustar el parámetro `resolution` de Louvain.
- **Comparar etiquetas directamente.** Las etiquetas de los grupos son arbitrarias (el grupo «0» de un método puede ser el «1» de otro). Usa ARI o información mutua, como en el notebook.
- **Olvidar la semilla** en Louvain: sin `seed`, cada ejecución puede dar una partición distinta.
- **Interpretar comunidades sin mirar sus atributos.** Una comunidad es una hipótesis; descríbela con datos (quiénes son, qué comparten) antes de actuar.

> **Ideas clave**
> - Una comunidad es un grupo con muchas aristas dentro y pocas fuera.
> - La modularidad $Q$ compara las aristas internas con las esperadas por azar respetando los grados.
> - Louvain maximiza $Q$ de forma rápida y decide el nº de grupos; en el kárate encuentra 4 subgrupos ($Q = 0{,}44$).
> - El vector de Fiedler de la laplaciana $L = D - A$ da el mejor corte en dos; en el kárate acierta 33 de 34 miembros.
> - Practica: notebook, sección 4 (Detección de comunidades).

---

## 7.7 Predicción de enlaces y difusión en redes

### Dos preguntas dinámicas

Hasta ahora hemos analizado la red como una foto fija. Muchas decisiones de negocio son dinámicas:

1. **Predicción de enlaces**: ¿qué conexiones que hoy no existen aparecerán (o existen y no las vemos)? Es la base de «personas que quizá conozcas», de la recomendación de productos en grafos y de la detección de relaciones ocultas entre empresas o cuentas.
2. **Difusión**: si algo empieza en unos pocos nodos (un mensaje, una oferta, un virus, un impago), ¿hasta dónde llega y a qué velocidad? ¿Dónde lo siembro para maximizar el alcance o dónde intervengo para frenarlo?

### Heurísticas de vecindad para predecir enlaces

La intuición es el **cierre triádico**: si dos personas tienen amigos en común, es probable que acaben conociéndose. Las heurísticas clásicas puntúan cada par no conectado $(u, v)$ a partir de sus vecindarios $\Gamma(u)$ y $\Gamma(v)$:

- **Vecinos comunes**: $|\Gamma(u) \cap \Gamma(v)|$. Simple y eficaz.
- **Coeficiente de Jaccard**: $\dfrac{|\Gamma(u) \cap \Gamma(v)|}{|\Gamma(u) \cup \Gamma(v)|}$. Normaliza por el tamaño de los vecindarios.
- **Adamic-Adar**: $\displaystyle\sum_{w \in \Gamma(u) \cap \Gamma(v)} \frac{1}{\log k_w}$. Cada amigo común suma, pero **menos cuanto más popular es**. Compartir como contacto a alguien que conoce a todo el mundo es poco informativo; compartir a alguien con 3 contactos sugiere un vínculo estrecho.
- **Enlace preferencial**: $k_u \cdot k_v$. Los nodos muy conectados tienden a conectarse entre sí.

### Cómo se evalúa: ocultar aristas

No podemos esperar a que pase el tiempo, así que simulamos el futuro: **ocultamos** una parte de las aristas (el 10 % en el notebook), calculamos las puntuaciones sobre la red que queda y comprobamos si las aristas ocultas aparecen entre los pares mejor puntuados. Es la misma lógica de separar entrenamiento y prueba del módulo 03.

```python
puntuaciones = sorted(nx.adamic_adar_index(G_train, no_aristas), key=lambda t: -t[2])
top = {(min(u, v), max(u, v)) for u, v, _ in puntuaciones[:len(ocultas)]}
```

En el notebook se ocultan 7 aristas y Adamic-Adar recupera 1 en su top-7, cuando el azar recuperaría 0,1 de media (hay 490 pares no conectados). Parece poco, pero es **10 veces mejor que el azar**. Como solo hay 7 aristas ocultas, el resultado depende mucho de cuáles se ocultan; por eso el ejercicio 3 pide repetirlo con 20 semillas y comparar medias. Una métrica más estable es el **AUC**: la probabilidad de que una arista oculta reciba más puntuación que un par realmente desconectado.

En aplicaciones serias, estas heurísticas se usan como **variables de entrada** de un clasificador supervisado (los del módulo 04) junto con atributos de los nodos, o se sustituyen por *embeddings* aprendidos (node2vec, redes neuronales de grafos).

### Difusión: modelos de contagio

Los dos modelos más usados para simular cómo se propaga algo:

- **Modelo SI / SIR** (epidemiológico): cada nodo está Susceptible, Infectado (o informado) y, en SIR, Recuperado (ya no contagia). En cada paso, cada infectado contagia a cada vecino susceptible con probabilidad $p$.
- **Cascada independiente**: cada nodo recién activado tiene **una única oportunidad** de activar a cada vecino, con probabilidad $p$. Modela bien un reenvío: si no convences a un amigo la primera vez, no insistes.

Se simulan por **Monte Carlo**: se repite la simulación miles de veces y se promedia el alcance, porque cada ejecución es aleatoria (como el bootstrap del módulo 01).

### Maximizar la influencia: elegir las semillas

El problema clásico de marketing: con presupuesto para $k$ personas, ¿a quién eliges para maximizar el alcance esperado? Opciones, de más simple a más sofisticada:

1. **Por centralidad** (grado, PageRank, intermediación): rápido y razonable.
2. **Con diversidad**: evita elegir semillas vecinas o de la misma comunidad, porque su alcance se solapa.
3. **Algoritmo voraz** (Kempe, Kleinberg y Tardos, 2003): añade una a una la semilla que más aumenta el alcance simulado. Garantiza al menos un 63 % ($1 - 1/e$) del óptimo, pero requiere muchas simulaciones.

En el ejercicio 1 lo compruebas: con 5 rondas y $p = 0{,}3$, elegir a los líderes (0, 33 y 32) informa de media a ≈ 97 % del club frente al ≈ 89 % con 3 personas al azar; con solo 2 rondas, la diferencia sube a casi 30 puntos (≈ 70 % frente a ≈ 40 %). **Elegir bien importa más cuanto menos tiempo o menos probabilidad de contagio tiene el mensaje.**

### Umbrales de epidemia

En el modelo SIR, que algo se propague a gran escala depende de si la tasa de contagio supera un **umbral**. En redes con *hubs*, el umbral es muy bajo (en redes libres de escala ideales con $\gamma \le 3$ tiende a cero): incluso algo poco contagioso puede extenderse porque los *hubs* lo amplifican. La lectura de negocio es doble: para viralizar, apunta a los *hubs*; para frenar (desinformación, contagio financiero), **protege o vacuna a los hubs** primero, no a nodos al azar.

### Ejemplo de negocio: campaña de referidos

Una operadora de telefonía quiere lanzar un programa de referidos y puede regalar el terminal nuevo a 500 clientes. En lugar de elegirlos por gasto, construye el grafo de llamadas, detecta comunidades con Louvain y elige en cada comunidad a los clientes de mayor PageRank, en proporción al tamaño de la comunidad. Antes de lanzar, simula una cascada independiente con una probabilidad calibrada en campañas anteriores para estimar cuántas altas esperar y comparar con una selección por gasto. Después, mide con un test A/B (módulo 04): regiones con selección por red frente a selección tradicional.

### Errores frecuentes

- **Evaluar la predicción de enlaces con una sola partición** de aristas ocultas en una red pequeña: el resultado es muy ruidoso.
- **Olvidar que la evaluación por ocultación tiene sesgo**: al quitar aristas, cambias los grados y vecindarios de la red de entrenamiento.
- **Usar una probabilidad de contagio inventada** y presentar el alcance simulado como predicción. La simulación sirve para **comparar estrategias**; para predecir cifras hace falta calibrar $p$ con datos.
- **Elegir las $k$ semillas más centrales sin mirar el solapamiento**: en redes grandes, varios *hubs* de la misma comunidad desperdician presupuesto.

> **Ideas clave**
> - Predicción de enlaces: puntuar pares no conectados con vecinos comunes, Jaccard o Adamic-Adar (que descuenta a los amigos comunes muy populares).
> - Se evalúa ocultando aristas y comprobando si reaparecen en el top; conviene repetir con varias semillas y usar AUC.
> - Difusión: modelos SI/SIR y cascada independiente, simulados por Monte Carlo.
> - Para maximizar el alcance, elige semillas centrales y diversas; para frenar un contagio, protege a los *hubs*.
> - Practica: notebook, sección 5 (Predicción de enlaces) y ejercicios 1 y 3.

---

## Glosario

| Término | Definición breve |
|---|---|
| **Arista** (*edge*, *link*) | Relación entre dos nodos; puede tener sentido y peso. |
| **Cascada independiente** (*independent cascade*) | Modelo de difusión en el que cada nodo activado tiene una sola oportunidad de activar a cada vecino. |
| **Centralidad de autovector** (*eigenvector centrality*) | Importancia proporcional a la suma de las importancias de los vecinos; autovector principal de $A$. |
| **Centralidad de cercanía** (*closeness centrality*) | Inversa de la distancia media de un nodo al resto. |
| **Centralidad de grado** (*degree centrality*) | Número de vecinos normalizado por $n-1$. |
| **Centralidad de intermediación** (*betweenness centrality*) | Fracción de caminos más cortos entre otros pares que pasan por el nodo. |
| **Coeficiente de agrupamiento** (*clustering coefficient*) | Fracción de pares de vecinos de un nodo que también están conectados entre sí. |
| **Componente conexa** (*connected component*) | Conjunto máximo de nodos entre los que existe un camino. |
| **Comunidad** (*community*) | Grupo de nodos con muchas aristas internas y pocas hacia fuera. |
| **Distancia** (*shortest path length*) | Número de aristas del camino más corto entre dos nodos. |
| **Enlace preferencial** (*preferential attachment*) | Mecanismo por el que los nodos nuevos se conectan con más probabilidad a los ya muy conectados. |
| **Grado** (*degree*) | Número de aristas de un nodo; en redes dirigidas, de entrada (*in-degree*) y de salida (*out-degree*). |
| **Hub** (*hub*) | Nodo con un grado muchísimo mayor que la media. |
| **Matriz de adyacencia** (*adjacency matrix*) | Matriz $A$ con $A_{ij} \neq 0$ si hay arista entre $i$ y $j$. |
| **Matriz laplaciana** (*graph Laplacian*) | $L = D - A$; sus autovectores revelan la estructura de grupos. |
| **Modularidad** (*modularity*) | Diferencia entre las aristas internas de los grupos y las esperadas al azar con los mismos grados. |
| **Mundo pequeño** (*small world*) | Red con distancias cortas y agrupamiento alto. |
| **PageRank** (*PageRank*) | Distribución estacionaria de un paseo aleatorio con teletransporte. |
| **Predicción de enlaces** (*link prediction*) | Estimar qué pares de nodos no conectados lo estarán (o lo están sin observarse). |
| **Red libre de escala** (*scale-free network*) | Red cuya distribución de grados sigue aproximadamente una ley de potencias. |
| **Vector de Fiedler** (*Fiedler vector*) | Autovector del segundo menor autovalor de la laplaciana; su signo parte la red en dos. |
