---
marp: true
theme: default
paginate: true
math: mathjax
title: Módulo DS5 · Redes y grafos
---

<!-- _class: lead -->

# Módulo DS5 · Redes y grafos

**Ciencia de Datos e IA Aplicada: de los datos a las decisiones**

N3-DS · Data Science avanzada · Caso: el club de kárate de Zachary

---

## Qué vas a aprender

| # | Lección |
|---|---|
| 7.1 | Datos como redes: ejemplos en negocio |
| 7.2 | Grafos: nodos, aristas, grados, caminos, componentes |
| 7.3 | Mundos pequeños y redes libres de escala |
| 7.4 | Centralidades: grado, intermediación, cercanía, autovector |
| 7.5 | PageRank |
| 7.6 | Comunidades: modularidad, Louvain y clustering espectral |
| 7.7 | Predicción de enlaces y difusión en redes |

---

<!-- _class: lead -->

# 7.1 Datos como redes

Ejemplos en negocio: fraude, logística, redes sociales

---

<!-- 7.1-1 -->

## Lo que una tabla no ve

- Una fila = una transacción: importe, hora, origen, destino
- Un clasificador aprende «madrugada + importe redondo = sospechoso»
- Pero no ve:
  - 10 cuentas nuevas que se pasan dinero **en círculo**
  - una cuenta «mula» que recibe de 50 y envía a 1
- Esos patrones viven en las **conexiones**

---

<!-- 7.1-2 -->

## Nodos y aristas

```
   [Cuenta A] ──500 €──> [Cuenta B]
       │                    │
     120 €                 80 €
       v                    v
   [Cuenta C] ──950 €──> [Cuenta D] ──300 €──> [Cuenta A]
```

- **Nodos**: entidades (clientes, cuentas, almacenes, páginas)
- **Aristas**: relaciones (pagos, rutas, enlaces, amistades)

---

<!-- 7.1-3 -->

## Las mismas técnicas, muchos negocios

| Dominio | Nodos | Aristas | Pregunta |
|---|---|---|---|
| Fraude | cuentas, dispositivos | transferencias | ¿anillos? |
| Logística | plantas, almacenes | rutas | ¿punto único de fallo? |
| Marketing | usuarios | seguir, recomendar | ¿a quién siembro? |
| Telco | clientes | llamadas | ¿riesgo de baja? |
| Web | páginas | enlaces | ¿qué es relevante? |
| RR. HH. | empleados | correos | ¿quién conecta áreas? |

---

<!-- 7.1-4 -->

## Tipos de redes

| Dimensión | Opciones | Ejemplo |
|---|---|---|
| Sentido | no dirigida / dirigida | amistad / pago |
| Peso | sin peso / ponderada | conoce / nº de llamadas |
| Tipos de nodo | uni- / bipartita | personas / clientes-productos |
| Tiempo | estática / temporal | foto / aristas con fecha |

---

<!-- 7.1-5 -->

## De la tabla al grafo

```python
import networkx as nx
G = nx.from_pandas_edgelist(
    transferencias, "origen", "destino",
    edge_attr="importe", create_using=nx.DiGraph)
```

- Casi siempre partes de una **lista de aristas**
- La decisión clave: **qué es un nodo y qué es una arista**
- Escribe la pregunta de negocio **antes** de construir la red

---

<!-- 7.1-6 -->

## El caso del módulo: club de kárate

- Zachary observa 34 miembros durante 2 años
- Conflicto: instructor (**nodo 0**) vs. presidente (**nodo 33**)
- El club se parte en dos facciones
- Pregunta: **¿podríamos haberlo anticipado solo con la red de amistades?**

---

<!-- _class: lead -->

# 7.2 Grafos

Nodos, aristas, grados, caminos, componentes

---

<!-- 7.2-1 -->

## Tres formas de guardar un grafo

| Representación | Aspecto | Cuándo |
|---|---|---|
| Lista de aristas | `(0,1), (0,2), ...` | bases de datos |
| Lista de adyacencia | `0: [1, 2, 3...]` | NetworkX (`G[0]`) |
| Matriz de adyacencia $A$ | $A_{ij}=1$ si hay arista | álgebra lineal |

Las redes reales son **dispersas**: casi todo $A$ son ceros

---

<!-- 7.2-2 -->

## Grado y densidad

- Grado: $k_i = \sum_j A_{ij}$ (entrada y salida si es dirigida)
- Grado medio: $\langle k \rangle = 2m/n$
- Densidad: fracción de aristas posibles que existen

$$\text{densidad} = \frac{m}{n(n-1)/2}$$

- Kárate: $n=34$, $m=78$, $\langle k \rangle \approx 4{,}59$, densidad $\approx 0{,}14$

---

<!-- 7.2-3 -->

## Distribución de grados

```
grado   nº de nodos
  1-2   ████████████     12
  3-5   ███████████████  15
  6-10  ████              4
  12    █                 1  (nodo 32)
  16    █                 1  (nodo 0)
  17    █                 1  (nodo 33)
```

- La primera gráfica que debes mirar
- Dos nodos destacan: ya intuyes quiénes son los líderes

---

<!-- 7.2-4 -->

## Caminos y distancias

- **Distancia** $d(i,j)$: aristas del camino más corto
- **Distancia media**: kárate $\approx 2{,}41$
- **Diámetro**: la mayor distancia; kárate = 5
  - 16 → 5 → 0 → 31 → 25
- Cálculo: BFS (sin pesos) o Dijkstra (con costes)
- Ojo: si el peso es «intensidad», la distancia sería $1/w$

---

<!-- 7.2-5 -->

## Componentes conexas

- **Conexa**: hay camino entre cualquier par
- Si no: varias **componentes**; casi siempre hay una **gigante**
- Dirigidas: débil vs. **fuertemente** conexa
- Fraude: componente fuertemente conexa de cuentas nuevas = dinero en círculo

---

<!-- 7.2-6 -->

## Agrupamiento: los amigos de mis amigos

$$C_i = \frac{\text{aristas entre los vecinos de } i}{k_i(k_i-1)/2}$$

| | Agrupamiento medio |
|---|---|
| Club de kárate | **0,57** |
| Red aleatoria equivalente | 0,14 |

Muchos triángulos = grupos cohesionados

---

<!-- 7.2-7 -->

## Las métricas en el notebook

```python
nx.density(G)                        # 0.139
nx.average_shortest_path_length(G)   # 2.41
nx.average_clustering(G)             # 0.57
nx.number_connected_components(G)    # 1
```

Notebook, sección 1 · Métricas básicas

---

<!-- 7.2-8 -->

## Errores frecuentes

- Distancia media en red **no conexa** → error (distancia infinita)
  - usa la componente gigante o la **eficiencia global**
- Comparar densidades de redes de tamaños distintos
- Confundir agrupamiento medio (0,57) con transitividad (0,26)

---

<!-- _class: lead -->

# 7.3 Mundos pequeños y redes libres de escala

---

<!-- 7.3-1 -->

## Dos sorpresas de las redes reales

1. **Mundo pequeño**: todos están a pocos saltos de todos
2. **Libre de escala**: unos pocos *hubs* acaparan conexiones

Consecuencias: velocidad de difusión, robustez, valor de los *hubs*

---

<!-- 7.3-2 -->

## Referencia: la red aleatoria (Erdős–Rényi)

- Cada par se une con la misma probabilidad $p$
- Grados ≈ Poisson: todos parecidos, **sin hubs**
- Distancias cortas: $\ell \sim \ln n / \ln \langle k \rangle$
- Agrupamiento minúsculo: $C \approx p$

---

<!-- 7.3-3 -->

## Seis grados de separación

- Milgram (1967): cartas de Nebraska y Kansas a Boston
- Solo vía conocidos personales
- Las que llegaron: **≈ 6 pasos** de media
- Lo sorprendente: distancias cortas **y** muchos triángulos a la vez

---

<!-- 7.3-4 -->

## Watts–Strogatz: unos pocos atajos

Anillo de 1.000 nodos, 10 vecinos cada uno, recableamos una fracción $p$

| $p$ | Agrupamiento | Distancia media |
|---|---|---|
| 0 | 0,67 | 50,5 |
| 0,01 | 0,65 | **9,6** |
| 0,1 | 0,49 | 4,4 |
| 1 | 0,01 | 3,3 |

Con un 1 % de atajos: distancia ÷ 5, agrupamiento casi igual

---

<!-- 7.3-5 -->

## ¿Es el kárate un mundo pequeño?

| | Kárate | Aleatoria (34 nodos, 78 aristas) |
|---|---|---|
| Distancia media | 2,41 | 2,42 |
| Agrupamiento | **0,57** | 0,14 |

Mismas distancias, **4 veces más triángulos** → sí

---

<!-- 7.3-6 -->

## Redes libres de escala

$$P(k) \propto k^{-\gamma}, \qquad 2 < \gamma < 3$$

- En log-log: casi una recta de pendiente $-\gamma$
- Existen **hubs** con grado cientos de veces la media

| 10.000 nodos, grado medio 4 | Grado máximo |
|---|---|
| Aleatoria | 14 |
| Barabási–Albert | ≈ 260 |

---

<!-- 7.3-7 -->

## ¿De dónde salen los hubs?

Modelo de **Barabási–Albert**:

1. **Crecimiento**: llegan nodos nuevos
2. **Enlace preferencial**: se conectan más a quien ya tiene más

«El rico se hace más rico»: webs, aeropuertos, influencers

**Ojo:** ajustar una ley de potencias es delicado: lo que importa es **si hay hubs**

---

<!-- 7.3-8 -->

## Consecuencias para el negocio

- **Difusión rápida**: siembra en un *hub* y llegas antes
- **Robusta a fallos aleatorios, frágil ante ataques** a los *hubs*
- **Paradoja de la amistad**: tus amigos tienen más amigos que tú
  - kárate: grado medio 4,6 vs. grado medio de «un amigo» 7,8

Ejercicio 2 del notebook: quitar un nodo

---

<!-- _class: lead -->

# 7.4 Centralidades

Grado, intermediación, cercanía, autovector

---

<!-- 7.4-1 -->

## «Importante» depende de la pregunta

| Pregunta | Medida |
|---|---|
| ¿Quién tiene más contactos? | Grado |
| ¿Quién conecta grupos? | Intermediación |
| ¿Quién llega rápido a todos? | Cercanía |
| ¿Quién está rodeado de importantes? | Autovector |

---

<!-- 7.4-2 -->

## Centralidad de grado

$$C_D(i) = \frac{k_i}{n-1}$$

- Popularidad, exposición directa
- Kárate: 33 → 0,515 · 0 → 0,485
- Barata, útil, pero **solo mira el vecindario inmediato**

---

<!-- 7.4-3 -->

## Centralidad de intermediación

$$C_B(i) = \sum_{s \neq i \neq t} \frac{\sigma_{st}(i)}{\sigma_{st}}$$

- Fracción de caminos más cortos que pasan por $i$
- **Puentes y cuellos de botella**
- Kárate: el instructor (0) lidera con 0,438
- Pregunta: «¿qué pasa si este nodo desaparece?»

---

<!-- 7.4-4 -->

## Centralidad de cercanía

$$C_C(i) = \frac{n-1}{\sum_{j \neq i} d(i,j)}$$

- Inversa de la distancia media al resto
- Llegar rápido a todos: ubicación, difusión urgente
- En redes pequeñas los valores están muy apretados (0,50–0,57)

---

<!-- 7.4-5 -->

## Centralidad de autovector

$$x_i = \frac{1}{\lambda}\sum_j A_{ij}x_j \iff A\mathbf{x} = \lambda\mathbf{x}$$

- **Eres importante si tus vecinos lo son**
- Autovector del mayor autovalor (Perron–Frobenius)
- Kárate: 33 (0,373) supera al 0 (0,355)
- Problema en dirigidas: sin enlaces de entrada → 0 → lo arregla PageRank

---

<!-- 7.4-6 -->

## Comparación en el club

| Nodo | Grado | Interm. | Cercanía | Autovector |
|---|---|---|---|---|
| 0 | 0,485 | **0,438** | **0,569** | 0,355 |
| 33 | **0,515** | 0,304 | 0,550 | **0,373** |
| 32 | 0,364 | 0,145 | 0,516 | 0,309 |
| 2 | 0,303 | 0,144 | 0,559 | 0,317 |
| 31 | 0,182 | 0,138 | 0,541 | 0,191 |

Coinciden arriba, discrepan en medio · Spearman interm.–autovector: 0,69

---

<!-- 7.4-7 -->

## En el notebook

```python
centralidades = pd.DataFrame({
    "grado": nx.degree_centrality(G),
    "intermediación": nx.betweenness_centrality(G),
    "cercanía": nx.closeness_centrality(G),
    "autovector": nx.eigenvector_centrality(G),
    "pagerank": nx.pagerank(G),
})
```

Notebook, sección 2 · Ejercicio 4: *Los miserables*

---

<!-- 7.4-8 -->

## Ejemplo: retención de talento

- Red de correos y reuniones de 2.000 empleados
- **Grado**: directivos y asistentes de dirección
- **Intermediación**: un técnico de sistemas y una responsable de compras
  - únicos enlaces entre sede y dos fábricas
- El plan de sucesión debe mirar la **intermediación**

---

<!-- _class: lead -->

# 7.5 PageRank

---

<!-- 7.5-1 -->

## El problema de Google (finales de los 90)

- Ordenar por nº de veces que aparece la palabra → fácil de manipular
- Idea de Page y Brin: **una página es relevante si la enlazan páginas relevantes**
- Centralidad de autovector + red dirigida enorme + problemas prácticos

---

<!-- 7.5-2 -->

## El paseante aleatorio

```
  [A] ──> [B] ──> [C]
   ^       │       │
   └───────┴───────┘
```

- Empieza en una página, hace clic en un enlace al azar, repite
- Tras muchísimos pasos: ¿qué fracción del tiempo pasa en cada página?
- **Esa fracción es el PageRank**

---

<!-- 7.5-3 -->

## Cadena de Markov

$$M_{ij} = \frac{A_{ji}}{k_j^{\text{out}}} \qquad \mathbf{r}^{(t+1)} = M\mathbf{r}^{(t)}$$

- $M$: probabilidad de pasar de $j$ a $i$ (columnas suman 1)
- Buscamos la **distribución estacionaria**: $\mathbf{r} = M\mathbf{r}$

---

<!-- 7.5-4 -->

## Dos problemas

| Problema | Qué pasa |
|---|---|
| Callejón sin salida | página sin enlaces de salida: la probabilidad «se escapa» |
| Trampa | grupo que solo se enlaza entre sí: absorbe todo el PageRank |

---

<!-- 7.5-5 -->

## La solución: teletransporte

$$\mathbf{r} = \frac{1-d}{n}\mathbf{1} + d\,M\mathbf{r}$$

- Con prob. $d$ (≈ 0,85) sigue un enlace; con $1-d$ salta a cualquier nodo
- Garantiza una **solución única** desde cualquier inicio
- $d = 0{,}85$ → sigue unos $1/(1-d) \approx 6{,}7$ enlaces antes de saltar

---

<!-- 7.5-6 -->

## Iteración de potencias

```python
def pagerank(G, d=0.85, iters=100):
    A = nx.to_numpy_array(G, nodelist=sorted(G))
    M = A / A.sum(axis=0, keepdims=True)
    n = len(A)
    r = np.full(n, 1 / n)
    for _ in range(iters):
        r = (1 - d) / n + d * M @ r
    return r
```

Sin invertir matrices · Diferencia con `nx.pagerank` ≈ $10^{-5}$

---

<!-- 7.5-7 -->

## PageRank en el kárate

| Nodo | PageRank | Grado |
|---|---|---|
| 33 | 0,097 | 17 |
| 0 | 0,089 | 16 |
| 32 | 0,076 | 12 |
| 2 | 0,063 | 10 |

- En no dirigidas, muy parecido al grado
- Brilla en **redes dirigidas**: importa *quién* te enlaza

---

<!-- 7.5-8 -->

## PageRank personalizado

- El teletransporte solo va a un **conjunto de nodos de interés**
- Mide **proximidad** a ese conjunto
- Recomendación: cercano a lo que compró el cliente
- Fraude: teletransporte a las 300 cuentas confirmadas → revisa las de mayor puntuación

```python
nx.pagerank(G, personalization={nodo: 1 for nodo in fraudes})
```

---

<!-- _class: lead -->

# 7.6 Comunidades

Modularidad, Louvain y clustering espectral

---

<!-- 7.6-1 -->

## ¿Qué es una comunidad?

- Grupo con **muchas aristas dentro y pocas fuera**
- Como el clustering del módulo 02, pero **sin coordenadas**
- Negocio: anillos de fraude, grupos de clientes, equipos informales
- Kárate: conocemos la verdad (las dos facciones)

---

<!-- 7.6-2 -->

## Modularidad

$$Q = \frac{1}{2m}\sum_{i,j}\left[A_{ij} - \frac{k_ik_j}{2m}\right]\delta(c_i,c_j)$$

- Aristas internas **menos** las esperadas al azar con los mismos grados
- $Q \approx 0$: nada especial · $Q > 0{,}3$: estructura clara
- Kárate, partición real: $Q = 0{,}39$

---

<!-- 7.6-3 -->

## Louvain en dos fases

1. **Movimiento local**: cada nodo se mueve a la comunidad vecina que más sube $Q$
2. **Agregación**: cada comunidad → supernodo; repetir

- Rápido: millones de nodos
- **Elige solo el nº de comunidades**
- Aleatorio → fija `seed` · Sucesor: Leiden

---

<!-- 7.6-4 -->

## Louvain en el kárate

```python
comunidades = community.louvain_communities(G, seed=0)
community.modularity(G, comunidades)   # 0.444
```

- **4 comunidades**, $Q = 0{,}444$ (> 0,39 de la partición real)
- ARI vs. facciones reales = 0,51
- No se equivoca: **subdivide** cada facción

---

<!-- 7.6-5 -->

## La matriz laplaciana

$$L = D - A \qquad \mathbf{x}^\top L\mathbf{x} = \sum_{(i,j)\in E}(x_i - x_j)^2$$

- Autovalores $\geq 0$; nº de ceros = nº de componentes
- $\lambda_2$ pequeño → fácil partir la red en dos
- **Vector de Fiedler** (autovector de $\lambda_2$): corte mínimo equilibrado relajado

---

<!-- 7.6-6 -->

## Clustering espectral en 4 líneas

```python
L = nx.laplacian_matrix(G, nodelist=sorted(G)).toarray().astype(float)
autovalores, autovectores = np.linalg.eigh(L)
fiedler = autovectores[:, 1]
etiqueta_espectral = (fiedler > 0).astype(int)
```

- **El signo** del vector de Fiedler asigna cada nodo a un lado

---

<!-- 7.6-7 -->

## Resultado: se anticipa la ruptura

| Método | Grupos | ARI vs. real | Aciertos |
|---|---|---|---|
| Louvain | 4 | 0,51 | (subgrupos) |
| Espectral | 2 | **0,88** | **33 de 34** |

- Solo falla el nodo 8, con amigos en ambos bandos
- Más de 2 grupos: $k$ autovectores + k-means

---

<!-- 7.6-8 -->

## ¿Louvain o espectral?

| | Louvain | Espectral |
|---|---|---|
| Nº de grupos | lo decide | lo fijas ($k$) |
| Escala | millones | miles |
| Base | máx. modularidad | corte mínimo |
| Ideal si | exploras | sabes cuántos grupos |

---

<!-- 7.6-9 -->

## Errores frecuentes

- Tomar la modularidad máxima como «la verdad» (límite de resolución)
- Comparar etiquetas directamente → usa **ARI**
- Olvidar la `seed` en Louvain
- Actuar sin describir la comunidad con datos: es una **hipótesis**

---

<!-- _class: lead -->

# 7.7 Predicción de enlaces y difusión

---

<!-- 7.7-1 -->

## Dos preguntas dinámicas

1. **Predicción de enlaces**: ¿qué conexiones aparecerán (o existen sin verse)?
   - «personas que quizá conozcas», relaciones ocultas
2. **Difusión**: si algo empieza en unos pocos nodos, ¿hasta dónde llega?
   - campañas, rumores, contagio financiero

---

<!-- 7.7-2 -->

## Heurísticas de vecindad

| Heurística | Fórmula |
|---|---|
| Vecinos comunes | $\lvert\Gamma(u)\cap\Gamma(v)\rvert$ |
| Jaccard | $\dfrac{\lvert\Gamma(u)\cap\Gamma(v)\rvert}{\lvert\Gamma(u)\cup\Gamma(v)\rvert}$ |
| Adamic-Adar | $\displaystyle\sum_{w\in\Gamma(u)\cap\Gamma(v)}\frac{1}{\log k_w}$ |
| Enlace preferencial | $k_u \cdot k_v$ |

Intuición: **cierre triádico**

---

<!-- 7.7-3 -->

## Adamic-Adar: no todos los amigos comunes valen igual

```
  Ana ── Pepe (3 contactos) ── Luis     → peso 1/log 3 ≈ 0,91
  Ana ── Influencer (5.000) ── Luis     → peso 1/log 5000 ≈ 0,12
```

- Compartir a alguien que conoce a todo el mundo informa poco
- Compartir a alguien con pocos contactos sugiere vínculo estrecho

---

<!-- 7.7-4 -->

## Evaluar: ocultar aristas

1. Ocultar el 10 % de las aristas
2. Puntuar los pares no conectados en la red restante
3. ¿Cuántas ocultas aparecen en el top-$k$?

Es la separación entrenamiento / prueba aplicada a redes

---

<!-- 7.7-5 -->

## Resultado en el notebook

| | Valor |
|---|---|
| Aristas ocultas | 7 |
| Pares no conectados | 490 |
| Recuperadas por Adamic-Adar (top-7) | **1** |
| Esperado al azar | 0,1 |

- 10 veces mejor que el azar, pero **muy ruidoso** → repite con semillas, usa AUC

---

<!-- 7.7-6 -->

## Modelos de difusión

| Modelo | Regla |
|---|---|
| SI / SIR | cada informado contagia a cada vecino con prob. $p$ en cada ronda |
| Cascada independiente | cada nodo recién activado tiene **una** oportunidad por vecino |

- Se simulan **muchas veces** (Monte Carlo) y se promedia

---

<!-- 7.7-7 -->

## Elegir semillas: ejercicio 1

| Semillas | 5 rondas | 2 rondas |
|---|---|---|
| Centrales (0, 33, 32) | ≈ 97 % | ≈ 70 % |
| 3 al azar | ≈ 89 % | ≈ 40 % |

- Elegir bien importa más cuanto **menos tiempo** tiene el mensaje
- Añade **diversidad**: semillas en comunidades distintas
- Óptimo aproximado: algoritmo voraz (≥ 63 % del óptimo)

---

<!-- 7.7-8 -->

## Hubs: viralizar o frenar

- En redes con *hubs*, el umbral de epidemia es muy bajo
- Para **viralizar**: siembra en *hubs* de comunidades distintas
- Para **frenar** (bulos, contagio financiero): protege a los *hubs* primero
- Simula para **comparar estrategias**; para predecir cifras, calibra $p$ con datos

---

<!-- _class: lead -->

# Resumen del módulo

Redes → métricas → centralidad → PageRank → comunidades → enlaces y difusión

**Entregable:** estrategia de difusión o análisis de robustez (máx. 2 páginas)
