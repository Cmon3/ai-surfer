---
marp: true
theme: default
paginate: true
math: mathjax
title: Módulo 02 · Datos no estructurados: clustering y reducción de dimensión
---

<!-- _class: lead -->

# Módulo 02
## Datos no estructurados: clustering y reducción de dimensión

Ciencia de Datos e IA Aplicada · Semana 3

---

## En este módulo

| # | Lección |
|---|---|
| 2.1 | Aprendizaje supervisado vs. no supervisado |
| 2.2 | Distancias y por qué escalar |
| 2.3 | k-means: algoritmo, supuestos y limitaciones |
| 2.4 | Elegir *k*: codo, silueta y criterio de negocio |
| 2.5 | Clustering jerárquico y dendrogramas |
| 2.6 | PCA: intuición geométrica y varianza explicada |
| 2.7 | t-SNE y UMAP: visualizar datos de alta dimensión |
| 2.8 | Caso: segmentación RFM de clientes |

---

<!-- _class: lead -->

# 2.1
## Aprendizaje supervisado vs. no supervisado

---

<!-- 2.1-1 -->
## Un problema sin respuestas

- 1.500 clientes de un e-commerce
- Sabemos cuándo compraron, cuánto y cuántas veces
- **No** sabemos «qué tipo de cliente» es cada uno
- Marketing pregunta: *¿qué grupos tenemos y qué hacemos con cada uno?*

No hay columna objetivo que predecir

---

<!-- 2.1-2 -->
## Dos formas de aprender

| | Supervisado | No supervisado |
|---|---|---|
| Datos | $X$ y $y$ | Solo $X$ |
| Pregunta | ¿Qué valor tendrá $y$? | ¿Qué estructura hay en $X$? |
| Evaluación | Comparar con $y$ real | Criterios internos + utilidad |
| Ejemplo | ¿Se dará de baja? | ¿Qué tipos de cliente hay? |

---

<!-- 2.1-3 -->
## Tres tareas no supervisadas

- **Clustering**: grupos de observaciones parecidas
  → segmentar clientes
- **Reducción de dimensión**: muchas variables → pocas
  → resumir 40 preguntas de encuesta en 3 índices
- **Detección de anomalías**: lo que no se parece a nada
  → transacciones sospechosas

---

<!-- 2.1-4 -->
## ¿Por qué es más subjetivo?

- No hay «respuesta correcta» con la que medir exactitud
- El algoritmo **siempre** devuelve grupos, aunque no existan
- Tres filtros para juzgar un resultado:
  1. Criterios internos (compacidad, separación)
  2. Estabilidad (¿sale lo mismo con otra muestra?)
  3. Utilidad (¿cambia alguna decisión?)

---

<!-- 2.1-5 -->
## Cuándo aporta valor

- Explorar antes de modelar
- Segmentar para actuar distinto por grupo
- Comprimir y visualizar
- Crear variables para modelos supervisados
- Etiquetar barato: agrupar y revisar representantes

---

<!-- 2.1-6 -->
## En el notebook: un lujo didáctico

- Datos simulados con 4 perfiles ocultos: `perfil_real`
- Medimos el acierto con el **ARI** (Adjusted Rand Index)
  - 1 = coincide con los perfiles reales
  - ≈ 0 = como asignar al azar
- En un proyecto real **no tendrás** esa columna

---

<!-- _class: lead -->

# 2.2
## Distancias y por qué escalar

---

<!-- 2.2-1 -->
## Parecido = cercanía

Cada cliente es un punto $x = (x_1, \dots, x_p)$

$$
d(x, z) = \sqrt{\sum_{j=1}^{p} (x_j - z_j)^2}
$$

- Euclídea: la "línea recta"
- Manhattan: $\sum_j |x_j - z_j|$
- Coseno: compara direcciones (texto)

---

<!-- 2.2-2 -->
## El problema de las unidades

| Variable | Unidad | Desv. típica |
|---|---|---|
| recencia | días | ≈ 140 |
| frecuencia | compras/año | ≈ 9,5 |
| gasto_medio | € | ≈ 93 |

100 días de recencia pesan igual que 100 compras al año
→ la frecuencia casi no cuenta

---

<!-- 2.2-3 -->
## Estandarizar

$$
z_{ij} = \frac{x_{ij} - \bar{x}_j}{s_j}
$$

```python
from sklearn.preprocessing import StandardScaler
X_esc = StandardScaler().fit_transform(X)
```

Todas las variables: media 0, desviación 1

---

<!-- 2.2-4 -->
## El efecto en el notebook

| Datos | ARI frente a perfiles reales |
|---|---|
| Sin escalar | ≈ 0,52 |
| Escalados | ≈ 0,76 |

Mismo algoritmo, misma $k$: solo cambian las unidades

---

<!-- 2.2-5 -->
## Qué escalador usar

| Escalador | Cuándo |
|---|---|
| `StandardScaler` | Por defecto |
| `MinMaxScaler` | Variables acotadas |
| `RobustScaler` | Atípicos fuertes |
| `log1p` + estandarizar | Colas largas (gasto, visitas) |

---

<!-- 2.2-6 -->
## Escalar es ponderar

- Estandarizar = dar **el mismo peso** a cada variable
- ¿El gasto importa el doble? Multiplica su columna escalada
- Que el peso sea una **decisión**, no un accidente de unidades
- Interpreta siempre en unidades originales

---

<!-- _class: lead -->

# 2.3
## k-means: algoritmo, supuestos y limitaciones

---

<!-- 2.3-1 -->
## El objetivo de k-means

Encontrar $k$ grupos que minimicen la **inercia**:

$$
W = \sum_{c=1}^{k} \sum_{i \in C_c} \lVert x_i - \mu_c \rVert^2
$$

$\mu_c$: centroide (media) del grupo $c$

---

<!-- 2.3-2 -->
## El algoritmo (Lloyd)

```
1. Elegir k centros iniciales (k-means++)
2. Asignar cada punto al centro más cercano
3. Mover cada centro a la media de sus puntos
4. Repetir 2-3 hasta que nada cambie
```

Siempre converge… a un **mínimo local**

---

<!-- 2.3-3 -->
## En scikit-learn

```python
from sklearn.cluster import KMeans
km = KMeans(n_clusters=4, n_init=10,
            random_state=0).fit(X_esc)
km.labels_           # segmento de cada cliente
km.cluster_centers_  # centros (escalados)
km.inertia_          # W
```

`n_init=10`: 10 arranques, se queda con el mejor

---

<!-- 2.3-4 -->
## Supuestos implícitos

- Grupos **redondeados** (esféricos) tras escalar
- Tamaños y dispersiones **parecidos**
- Variables **numéricas** y comparables
- Asignación **dura**: cada punto, un solo grupo
- Fronteras **rectas** a medio camino entre centros

---

<!-- 2.3-5 -->
## Dónde falla

| Situación | Resultado |
|---|---|
| Medias lunas, formas alargadas | Las corta por la mitad |
| Anillos concéntricos | Imposible separarlos |
| Densidades distintas | El denso se parte |
| Atípicos | Desplazan centros |

Alternativas: DBSCAN, mezclas gaussianas, jerárquico

---

<!-- 2.3-6 -->
## Un caso suave en el notebook

| Segmento k-means | dormidos | ocasionales |
|---|---|---|
| «dormidos» | 208 | 0 |
| «ocasionales» | 167 | 375 |

Los dormidos "recientes" quedan más cerca del centro de ocasionales
→ k-means ve distancias a centros, no grupos

---

<!-- 2.3-7 -->
## Errores frecuentes

- No escalar
- `n_init=1` y una única ejecución
- Leer el número de segmento como si significara algo
- Esperar que k-means te diga cuántos grupos hay

---

<!-- _class: lead -->

# 2.4
## Elegir *k*: codo, silueta y criterio de negocio

---

<!-- 2.4-1 -->
## La inercia siempre baja

- Más grupos → puntos más cerca de su centro
- Con $k = n$: $W = 0$
- Minimizar $W$ no sirve para elegir $k$

Necesitamos criterios que midan otra cosa

---

<!-- 2.4-2 -->
## Método del codo

| $k$ | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| Inercia | 2.517 | 1.233 | **574** | 432 | 362 |

- Grandes caídas hasta $k=4$; después, poco
- Problema: en datos reales el codo suele ser difuso

---

<!-- 2.4-3 -->
## Coeficiente de silueta

$$
s(i) = \frac{b(i) - a(i)}{\max\{a(i), b(i)\}}
$$

- $a(i)$: distancia media a **su** grupo
- $b(i)$: distancia media al grupo **vecino**
- ≈ 1 bien asignado · ≈ 0 frontera · < 0 mal asignado

---

<!-- 2.4-4 -->
## Silueta en el notebook

| $k$ | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| Silueta | 0,47 | 0,63 | **0,64** | 0,60 | 0,54 |

- Máximo en $k=4$… pero $k=3$ casi empata
- Cuando la técnica empata, **decide el negocio**

---

<!-- 2.4-5 -->
## Otros criterios técnicos

- **Estabilidad**: otras semillas o submuestras → ARI entre particiones
- Calinski-Harabasz, Davies-Bouldin, estadístico *gap*
- **Tamaño mínimo**: un segmento del 1 % rara vez compensa

---

<!-- 2.4-6 -->
## El criterio de negocio

1. ¿Puedo describir cada grupo en una frase?
2. ¿Tengo una acción **distinta** para cada uno?
3. ¿Es estable en el tiempo?
4. ¿Tiene tamaño suficiente para justificar la acción?

---

<!-- 2.4-7 -->
## Ejemplo: aseguradora

- $k=2$: mejor silueta → «un seguro» vs. «varios»: nada nuevo
- $k=5$: silueta algo menor → grupos accionables
  - jóvenes solo con coche → venta cruzada de hogar
  - familias multiproducto → fidelización
- Se elige $k=5$ **y se justifica**

---

<!-- _class: lead -->

# 2.5
## Clustering jerárquico y dendrogramas

---

<!-- 2.5-1 -->
## De abajo arriba

```
1. Cada punto es un grupo (n grupos)
2. Unir los dos grupos más cercanos
3. Repetir hasta tener un solo grupo
```

No hace falta fijar $k$ al principio

---

<!-- 2.5-2 -->
## Criterio de enlace

| Enlace | Distancia entre grupos | Efecto |
|---|---|---|
| Simple | par más cercano | Cadenas largas |
| Completo | par más lejano | Grupos compactos |
| Promedio | media de pares | Compromiso |
| **Ward** | aumento de inercia | Compactos y equilibrados |

---

<!-- 2.5-3 -->
## Leer un dendrograma

```
altura
  |        ┌──────────┐
  |     ┌──┴──┐       |
  |   ┌─┴─┐   |    ┌──┴──┐
  |   |   |   |    |     |
      A   B   C    D     E
```

- La **altura** de la unión = distancia de fusión
- Cortar horizontalmente = elegir número de grupos
- Saltos grandes → buen sitio para cortar

---

<!-- 2.5-4 -->
## Trampa: lo horizontal no cuenta

- Dos hojas contiguas en el dibujo pueden estar lejos
- La distancia se lee en el **nodo** que las une
- El orden de las hojas es en parte arbitrario

---

<!-- 2.5-5 -->
## En el notebook

```python
Z = linkage(X_esc[muestra], method="ward")
dendrogram(Z, no_labels=True, color_threshold=12)
AgglomerativeClustering(n_clusters=4,
                        linkage="ward").fit_predict(X_esc)
```

| Método | ARI frente a perfiles reales |
|---|---|
| k-means (k=4) | ≈ 0,76 |
| Jerárquico Ward (4) | ≈ 0,84 |

---

<!-- 2.5-6 -->
## Ventajas y límites

| Ventajas | Límites |
|---|---|
| No exige $k$ previo | Coste ~ $n^2$ en memoria |
| Estructura a varias escalas | Fusiones irreversibles |
| Determinista | Dendrograma ilegible con miles de hojas |

Para el dibujo: usa una **muestra**

---

<!-- _class: lead -->

# 2.6
## PCA: intuición geométrica y varianza explicada

---

<!-- 2.6-1 -->
## 64 dimensiones

- Dígitos manuscritos de 8 × 8 píxeles
- Cada imagen = un punto en $\mathbb{R}^{64}$
- Muchos píxeles redundantes (vecinos parecidos, bordes vacíos)
- ¿Podemos resumir en pocas variables?

---

<!-- 2.6-2 -->
## La intuición: un plato inclinado

- Nube 3D con forma de plato: casi toda la variación en 2 direcciones
- **PC1**: dirección de máxima varianza
- **PC2**: máxima varianza perpendicular a PC1
- … hasta $p$ componentes

Proyectar = mirar la nube desde el mejor ángulo

---

<!-- 2.6-3 -->
## Componentes y cargas

$$
\text{PC}_1 = w_{11} x_1 + w_{21} x_2 + \dots + w_{p1} x_p
$$

- $w_{j1}$: **cargas** → `pca.components_`
- Son vectores propios de la matriz de covarianzas
- Varianza de cada componente: valor propio $\lambda_j$

---

<!-- 2.6-4 -->
## Varianza explicada

$$
\frac{\lambda_j}{\sum_l \lambda_l}
$$

```python
pca = PCA().fit(digits.data)
var_acum = np.cumsum(pca.explained_variance_ratio_)
np.argmax(var_acum >= 0.9) + 1   # → 21
```

PC1 + PC2 ≈ 28,5 % · 21 componentes para el 90 %

---

<!-- 2.6-5 -->
## Interpretar componentes

- Mira las cargas más grandes (en valor absoluto) y su signo
- Encuesta de 20 preguntas:
  - PC1: todas positivas → «satisfacción general»
  - PC2: precio (+) vs. atención (−)
- Finanzas: PC1 = «el mercado», PC2 = factor sectorial

---

<!-- 2.6-6 -->
## ¿Escalar antes de PCA?

- PCA maximiza varianza → depende de las unidades
- Euros + días + %: **estandariza**
- Píxeles (todos 0–16): no hace falta

---

<!-- 2.6-7 -->
## Fortalezas y límites

| Fortalezas | Límites |
|---|---|
| Rápido y determinista | Solo estructura **lineal** |
| `transform` para datos nuevos | Máx. varianza ≠ máx. relevancia |
| Interpretable (cargas) | Sensible a atípicos |
| Invertible (aprox.) | Componentes a veces difíciles de nombrar |

---

<!-- _class: lead -->

# 2.7
## t-SNE y UMAP: visualizar datos de alta dimensión

---

<!-- 2.7-1 -->
## Cuando lo lineal no basta

- PCA en 2D: varios dígitos superpuestos
- No es que no se distingan: su estructura **no es lineal**
- Nueva meta: un mapa 2D que respete **quién es vecino de quién**

---

<!-- 2.7-2 -->
## t-SNE en dos pasos

1. Original: probabilidad de que $j$ sea vecino de $i$ ($p_{ij}$)
2. Mapa 2D: mover puntos hasta que $q_{ij} \approx p_{ij}$

$$
\mathrm{KL}(P \,\Vert\, Q) = \sum_{i \neq j} p_{ij} \log \frac{p_{ij}}{q_{ij}}
$$

**Perplexity** ≈ nº efectivo de vecinos (5–50)

---

<!-- 2.7-3 -->
## Lo que t-SNE NO conserva

No interpretables:
- Distancias entre grupos
- Tamaños y densidades de los grupos

Cuidado:
- Puede crear grumos a partir de ruido
- Cambia con semilla y perplexity · sin `transform`

---

<!-- 2.7-4 -->
## UMAP: la alternativa moderna

1. Grafo de $k$ vecinos más cercanos en el espacio original
2. Disposición 2D cuyo grafo se parezca: atraer vecinos, repeler el resto

- `n_neighbors`: local ↔ global
- `min_dist`: lo apretados que quedan los grupos
- Librería `umap-learn`, misma interfaz `fit_transform`

---

<!-- 2.7-5 -->
## PCA vs. t-SNE vs. UMAP

| | PCA | t-SNE | UMAP |
|---|---|---|---|
| Tipo | Lineal | No lineal | No lineal |
| Conserva | Varianza global | Vecindad local | Local + algo global |
| Velocidad | Muy alta | Baja | Media-alta |
| Datos nuevos | Sí | No | Sí (aprox.) |
| Interpretable | Sí | No | No |

---

<!-- 2.7-6 -->
## Reglas de uso

- Úsalos para **explorar** y generar hipótesis
- Prueba varias perplexities / `n_neighbors` y semillas
- Con muchos datos: PCA a 30–50 dimensiones antes
- **No** hagas clustering sobre el mapa 2D
- Explica a tu audiencia qué significa (y qué no) la cercanía

---

<!-- _class: lead -->

# 2.8
## Caso: segmentación RFM de clientes

---

<!-- 2.8-1 -->
## RFM en tres números

- **R**ecency: días desde la última compra (menos = mejor)
- **F**requency: compras en el periodo
- **M**onetary: valor (gasto medio o total)

Se calcula con cualquier histórico de transacciones

---

<!-- 2.8-2 -->
## El proceso

```
transacciones → RFM por cliente → log/atípicos → escalar
   → probar k (codo, silueta, estabilidad, jerárquico)
   → perfilar en unidades originales
   → nombrar + acción + métrica → medir (A/B)
```

---

<!-- 2.8-3 -->
## Los cuatro segmentos del notebook

| Segmento | R (días) | F (/año) | M (€) | Clientes |
|---|---|---|---|---|
| VIP ticket alto | 31 | 11 | 253 | 367 |
| Fieles recurrentes | 15 | 26 | 59 | 373 |
| Ocasionales | 115 | 5 | 43 | 552 |
| Dormidos | 406 | 3 | 35 | 208 |

---

<!-- 2.8-4 -->
## De segmentos a acciones

| Segmento | Acción | Métrica |
|---|---|---|
| VIP | Beneficios no monetarios | Retención 12 meses |
| Fieles | Venta cruzada | Ticket medio |
| Ocasionales | Recordatorios por ciclo | Frecuencia trimestral |
| Dormidos | Reactivación con incentivo | % vuelve en 60 días |

No regales margen a quien ya compra

---

<!-- 2.8-5 -->
## Frontera difusa: ocasional ↔ dormido

- El segmento «ocasionales» incluye ~170 dormidos reales
- Lectura de negocio: la transición es **gradual**
- Solución práctica: segmento + regla
  - ocasional con recencia > 180 días → reactivación

---

<!-- 2.8-6 -->
## Añadir variables con cuidado

- Tras escalar, cada variable **pesa lo mismo**
- Variable irrelevante → diluye distancias, baja la silueta
- Alternativa: segmentar con comportamiento, **describir** con el resto
- Recalcula periódicamente y mira transiciones entre segmentos

---

<!-- 2.8-7 -->
## Tu entregable

1. Número de segmentos y justificación (técnica + negocio)
2. Ficha por segmento: nombre, tamaño, perfil, **una acción**
3. Un gráfico que muestre los segmentos

Máx. 2 páginas o 5 diapositivas

---

<!-- _class: lead -->

# Resumen del módulo

Escalar · agrupar · elegir *k* con criterio · reducir dimensión · traducir a acciones

Próximo módulo: **Regresión y predicción**
