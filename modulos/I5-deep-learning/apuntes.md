# Módulo I5 · Deep learning — Apuntes

Estos apuntes acompañan a los vídeos y al notebook de la semana 6. El hilo conductor es el caso del notebook: una empresa de logística quiere leer automáticamente los códigos postales escritos a mano en los paquetes, y empezamos por el problema reducido de reconocer dígitos de 8×8 píxeles. Por el camino verás qué es una red neuronal por dentro, cómo aprende, cómo se programa en PyTorch y, sobre todo, cuándo merece la pena usarla frente a un modelo clásico.

Cifras de referencia del notebook (con la semilla fijada; pueden variar ligeramente en tu equipo):

| Modelo | Parámetros | Exactitud en test |
|---|---|---|
| Regresión logística (scikit-learn) | 650 | 0,964 |
| MLP (64 → 128 → 64 → 10) | 17 226 | 0,967 |
| CNN (2 capas convolucionales + dropout) | 6 090 | 0,969 |

Datos: 1 797 imágenes divididas en entrenamiento (1 149), validación (288) y test (360).

## Índice

- [5.1 Del perceptrón a las redes multicapa](#51-del-perceptrón-a-las-redes-multicapa)
- [5.2 Funciones de activación y de pérdida](#52-funciones-de-activación-y-de-pérdida)
- [5.3 Descenso de gradiente, retropropagación y optimizadores](#53-descenso-de-gradiente-retropropagación-y-optimizadores)
- [5.4 PyTorch: tensores, modelos y bucle de entrenamiento](#54-pytorch-tensores-modelos-y-bucle-de-entrenamiento)
- [5.5 Redes convolucionales](#55-redes-convolucionales)
- [5.6 Regularización: dropout, early stopping, aumento de datos](#56-regularización-dropout-early-stopping-aumento-de-datos)
- [5.7 Transfer learning y modelos preentrenados](#57-transfer-learning-y-modelos-preentrenados)
- [5.8 Más allá de las imágenes: secuencias, texto y transformers](#58-más-allá-de-las-imágenes-secuencias-texto-y-transformers)
- [Glosario](#glosario)

---

## 5.1 Del perceptrón a las redes multicapa

### La neurona artificial: una suma ponderada con umbral

Imagina que en el almacén alguien decide si un paquete va a revisión manual mirando tres cosas: si la etiqueta está borrosa, si el peso no cuadra con lo declarado y si el destino es internacional. Cada factor pesa más o menos, y si la suma supera cierto nivel, el paquete se aparta. Eso, ni más ni menos, es una **neurona artificial**.

Formalmente, una neurona recibe un vector de entradas $x = (x_1, \dots, x_d)$, las multiplica por unos **pesos** $w_j$, suma un **sesgo** $b$ y aplica una función $\sigma$:

$$
z = w_1 x_1 + \dots + w_d x_d + b = w^\top x + b, \qquad \text{salida} = \sigma(z)
$$

El **perceptrón** de Rosenblatt (1958) usaba como $\sigma$ un escalón: devuelve 1 si $z > 0$ y 0 si no. Si cambias el escalón por la sigmoide, obtienes exactamente la **regresión logística** que ya conoces del módulo 04. Es decir: una neurona aislada no es nada nuevo; es un modelo lineal.

### El límite de una sola neurona

La frontera de decisión de una neurona es la región donde $w^\top x + b = 0$: una recta en 2D, un plano en 3D, un hiperplano en general. Solo puede separar clases que sean **linealmente separables**. El ejemplo clásico de fracaso es el XOR: si tienes dos variables binarias y la clase positiva es "una u otra, pero no las dos", ninguna recta separa los puntos. En negocio pasa constantemente: un descuento atrae a clientes jóvenes *o* a clientes con alta antigüedad, pero no a ambos a la vez; un modelo lineal no captura esa interacción salvo que tú la construyas a mano.

### Apilar neuronas: capas y redes multicapa

La solución es combinar muchas neuronas. Una **capa densa** (o totalmente conectada) es un conjunto de neuronas que reciben todas las mismas entradas. En notación matricial, una capa con $m$ neuronas transforma $x \in \mathbb{R}^d$ en $h \in \mathbb{R}^m$:

$$
h = \sigma(Wx + b), \qquad W \in \mathbb{R}^{m \times d}, \; b \in \mathbb{R}^m
$$

Un **perceptrón multicapa** (MLP, *multilayer perceptron*) encadena varias capas: la entrada pasa por una o más **capas ocultas** y termina en una **capa de salida**. Las capas ocultas aprenden *nuevas variables* (representaciones intermedias) a partir de las originales; la capa de salida combina esas variables para predecir. Es como si la red hiciera su propia ingeniería de variables.

El MLP del notebook (sección 5) es:

```python
mlp = nn.Sequential(
    nn.Flatten(),                       # imagen 8×8 → vector de 64
    nn.Linear(64, 128), nn.ReLU(),      # capa oculta 1
    nn.Linear(128, 64), nn.ReLU(),      # capa oculta 2
    nn.Linear(64, 10),                  # salida: una puntuación por dígito
)
```

### Contar parámetros

Cada capa lineal de $d$ entradas y $m$ salidas tiene $d \cdot m$ pesos y $m$ sesgos. Para el MLP: $64\cdot128+128 = 8\,320$; $128\cdot 64+64 = 8\,256$; $64\cdot10+10=650$. Total: **17 226 parámetros**, frente a los 650 de la regresión logística. Contar parámetros importa: más parámetros significan más capacidad, pero también más riesgo de sobreajuste, más memoria y más tiempo de cálculo.

### ¿Por qué funciona? El teorema de aproximación universal

Un resultado teórico clásico dice que un MLP con **una sola capa oculta** suficientemente ancha y una activación no lineal puede aproximar cualquier función continua tanto como queramos. Suena a magia, pero ojo con dos matices: el teorema no dice *cuántas* neuronas harán falta (pueden ser muchísimas) ni garantiza que el entrenamiento las encuentre. En la práctica, las redes **profundas** (varias capas) consiguen lo mismo con muchos menos parámetros, porque reutilizan patrones: la primera capa detecta trazos, la siguiente combina trazos en formas, etc.

### Ejemplo de negocio

Una aseguradora quiere estimar la probabilidad de fraude de un siniestro con 40 variables. Una regresión logística le da una línea base interpretable. Un MLP puede capturar interacciones (por ejemplo, "importe alto *y* siniestro a los pocos días de contratar *y* taller no concertado") sin que el analista tenga que inventarlas. Pero con datos **tabulares** y unos miles de filas, el MLP rara vez gana a un *gradient boosting* bien ajustado (módulo 04). El deep learning brilla de verdad con datos no estructurados: imágenes, texto, audio.

### Errores frecuentes

- **Pensar que más capas siempre es mejor.** Más capas = más capacidad y más riesgo de sobreajuste. En el notebook, el MLP de 17 226 parámetros apenas mejora a la regresión logística (0,967 frente a 0,964).
- **Olvidar la no linealidad.** Sin activaciones entre capas, toda la red colapsa en una sola capa lineal (lo verás en la lección 5.2).
- **No escalar las entradas.** Las redes aprenden mucho peor si las variables tienen escalas muy distintas. En el notebook dividimos los píxeles entre 16 para dejarlos en $[0, 1]$.
- **Confundir neuronas con parámetros.** Una capa de 128 neuronas con 64 entradas no tiene 128 parámetros, tiene 8 320.

Practica: notebook, secciones 3 y 5, y ejercicio 1 (un MLP sin capas ocultas).

> **Ideas clave**
> - Una neurona es una suma ponderada más un sesgo, seguida de una función: con sigmoide, es una regresión logística.
> - Una sola neurona solo traza fronteras lineales; apilar capas con no linealidades permite fronteras arbitrarias.
> - Un MLP aprende sus propias variables intermedias en las capas ocultas.
> - Cuenta los parámetros: $d \cdot m + m$ por capa lineal. Más parámetros no implica mejor modelo.
> - Con datos tabulares, el deep learning no suele ganar a los modelos clásicos; con datos no estructurados, sí.

---

## 5.2 Funciones de activación y de pérdida

### Por qué hace falta una activación no lineal

Supón dos capas lineales seguidas, sin nada en medio: $h = W_1 x + b_1$ y $\hat y = W_2 h + b_2$. Sustituyendo:

$$
\hat y = W_2 (W_1 x + b_1) + b_2 = \underbrace{W_2 W_1}_{W'} x + \underbrace{W_2 b_1 + b_2}_{b'}
$$

El resultado es otra función lineal. Da igual que apiles 2 o 200 capas: sin no linealidades, la red equivale a **una sola capa**. La **función de activación** es lo que rompe esa linealidad y permite que la profundidad sirva para algo.

### Las activaciones más usadas

| Activación | Fórmula | Rango | Uso típico |
|---|---|---|---|
| ReLU | $\max(0, z)$ | $[0, \infty)$ | Capas ocultas (por defecto) |
| Sigmoide | $\dfrac{1}{1+e^{-z}}$ | $(0, 1)$ | Salida de clasificación binaria |
| Tanh | $\dfrac{e^{z}-e^{-z}}{e^{z}+e^{-z}}$ | $(-1, 1)$ | Capas ocultas en redes recurrentes |
| Softmax | $\dfrac{e^{z_k}}{\sum_j e^{z_j}}$ | $(0,1)$, suman 1 | Salida multiclase |

El notebook dibuja las tres primeras en la sección 3. La **sigmoide** y la **tanh** se "aplanan" (saturan) para valores grandes de $|z|$: allí su pendiente es casi cero. Como el aprendizaje se basa en pendientes (gradientes), las capas saturadas apenas aprenden y, en redes profundas, el gradiente se va multiplicando por números pequeños hasta desvanecerse. Es el problema del **gradiente que se desvanece** (*vanishing gradient*).

La **ReLU** resolvió gran parte del problema: su pendiente es 1 para $z>0$, es baratísima de calcular y funciona bien en la práctica. Su punto débil son las "neuronas muertas": si una neurona queda siempre con $z<0$, su gradiente es 0 y deja de aprender. Variantes como *Leaky ReLU* o GELU (habitual en transformers) suavizan ese problema. Regla práctica: **ReLU en las capas ocultas** salvo que tengas un motivo para otra cosa.

### La capa de salida depende del problema

La última capa traduce las representaciones internas a la respuesta que necesitas:

- **Regresión** (predecir unidades vendidas): salida lineal, sin activación.
- **Clasificación binaria** (fraude sí/no): una neurona con sigmoide → probabilidad.
- **Clasificación multiclase** (qué dígito es): $K$ neuronas, cuyas puntuaciones brutas se llaman **logits**, y softmax para convertirlas en probabilidades que suman 1.

### La función de pérdida: cómo medimos el error

Entrenar es minimizar una **función de pérdida** $L$ que resume, con un número, lo mal que lo hace el modelo. Las tres de uso diario:

**Error cuadrático medio** (regresión): $L = \frac{1}{n}\sum_i (y_i - \hat y_i)^2$. Es la misma que minimiza la regresión lineal del módulo 03.

**Entropía cruzada binaria** (clasificación binaria): $L = -\frac{1}{n}\sum_i \left[y_i \log p_i + (1-y_i)\log(1-p_i)\right]$.

**Entropía cruzada** (multiclase): si $p_{i,y_i}$ es la probabilidad que el modelo asigna a la clase correcta del ejemplo $i$,

$$
L = -\frac{1}{n}\sum_{i=1}^{n} \log p_{i,\,y_i}
$$

La intuición es muy clara: si el modelo da un 90 % a la clase correcta, la pérdida de ese ejemplo es $-\log 0{,}9 \approx 0{,}105$; si le da un 10 %, $-\log 0{,}1 \approx 2{,}303$. La entropía cruzada **castiga mucho la confianza equivocada**. Un detalle útil: un modelo recién inicializado con 10 clases reparte probabilidades casi uniformes, así que su pérdida inicial ronda $-\log(1/10) = \ln 10 \approx 2{,}30$. En el notebook de soluciones verás exactamente ese valor en la primera época con una tasa de aprendizaje baja. Si tu pérdida inicial está muy lejos de $\ln K$, sospecha de un error en los datos o en la salida.

### PyTorch y los logits

En PyTorch, `nn.CrossEntropyLoss` recibe **logits** (sin softmax) y aplica internamente softmax + logaritmo de forma numéricamente estable. Por eso la última capa del notebook es `nn.Linear(64, 10)` sin activación:

```python
perdida_fn = nn.CrossEntropyLoss()
logits = modelo(xb)               # forma (lote, 10), sin softmax
perdida = perdida_fn(logits, yb)  # yb: enteros 0..9 (dtype long)
probs = logits.softmax(dim=1)     # solo si quieres ver probabilidades
```

### Ejemplo de negocio: la pérdida refleja lo que te importa

La pérdida es la traducción matemática de "qué consideras un error". Si en tu centro logístico confundir un 1 con un 7 envía el paquete a otra provincia, pero confundir un 3 con un 8 en un código que no existe se detecta enseguida, quizá quieras penalizar más ciertos errores. `nn.CrossEntropyLoss(weight=...)` permite dar más peso a clases poco frecuentes o costosas, igual que en el módulo 04 ajustábamos el umbral según el coste de cada error.

### Errores frecuentes

- **Aplicar softmax antes de `CrossEntropyLoss`.** Se aplicaría dos veces: el modelo aprende peor y las probabilidades se deforman.
- **Usar MSE para clasificar.** Funciona mal: los gradientes son débiles justo cuando el modelo está muy equivocado.
- **Sigmoide en todas las capas ocultas de una red profunda.** Gradientes que se desvanecen y entrenamiento lentísimo.
- **Etiquetas con el tipo equivocado.** `CrossEntropyLoss` espera índices enteros (`long`), no vectores *one-hot* en `float` (salvo que uses probabilidades como objetivo a propósito).

Practica: notebook, sección 3 (gráfico de activaciones) y sección 4 (función `entrenar`).

> **Ideas clave**
> - Sin activación no lineal, apilar capas no aporta nada: el resultado sigue siendo lineal.
> - ReLU es la elección por defecto en capas ocultas; sigmoide y softmax se usan en la salida.
> - La pérdida convierte "error" en un número que se puede minimizar; elígela según el tipo de problema.
> - La entropía cruzada castiga la confianza equivocada; su valor inicial con $K$ clases ronda $\ln K$.
> - En PyTorch, `CrossEntropyLoss` recibe logits: no apliques softmax antes.

---

## 5.3 Descenso de gradiente, retropropagación y optimizadores

### La idea: bajar la montaña a ciegas

Imagina que estás en una montaña con niebla y quieres llegar al valle. No ves el paisaje, pero sí notas la inclinación del suelo bajo tus pies. Estrategia sensata: da un paso en la dirección de máxima bajada, vuelve a notar la pendiente, y repite. Eso es el **descenso de gradiente**. La "montaña" es la función de pérdida $L(\theta)$, donde $\theta$ agrupa todos los pesos y sesgos de la red (17 226 números en nuestro MLP), y la "pendiente" es el **gradiente** $\nabla_\theta L$: el vector de derivadas parciales que indica cuánto sube la pérdida al mover cada parámetro.

La regla de actualización es:

$$
\theta \leftarrow \theta - \eta \, \nabla_\theta L(\theta)
$$

donde $\eta$ es la **tasa de aprendizaje** (*learning rate*): el tamaño del paso.

### La tasa de aprendizaje es el hiperparámetro más importante

- Si $\eta$ es **demasiado pequeña**, avanzas muy despacio: necesitas muchísimas épocas.
- Si es **demasiado grande**, te pasas del valle y rebotas de una ladera a otra, o incluso sales despedido (la pérdida crece).

El ejercicio 3 del notebook lo muestra con el MLP y Adam durante 40 épocas. En nuestra ejecución de referencia: con $\eta = 10^{-4}$ la pérdida de entrenamiento seguía en 0,54 al final (sin converger, exactitud de test 0,91); con $10^{-3}$ bajaba a 0,03 de forma estable (0,967); con $10^{-2}$ bajaba aún más rápido pero con repuntes; y con $10^{-1}$ se quedaba atascada en torno a 0,35 (0,84). Moraleja: mira siempre la curva de pérdida.

### Minilotes, épocas e iteraciones

Calcular el gradiente con *todos* los datos en cada paso es caro. En la práctica se usa el **descenso de gradiente estocástico por minilotes**: en cada paso se toma un **lote** (*batch*) pequeño de ejemplos, se calcula el gradiente con ellos y se actualiza. Una **época** es una pasada completa por los datos de entrenamiento. En el notebook, con 1 149 imágenes y lotes de 64, cada época son $\lceil 1149/64 \rceil = 18$ actualizaciones. El ruido de usar lotes no es solo un mal menor: ayuda a escapar de zonas planas y suele generalizar mejor.

### Retropropagación: la regla de la cadena, bien organizada

¿Cómo se calcula el gradiente respecto a miles de parámetros? Con la **retropropagación** (*backpropagation*), que no es más que la **regla de la cadena** aplicada de forma ordenada desde la salida hacia la entrada.

Ejemplo mínimo con una neurona: $z = wx + b$, $\hat y = \sigma(z)$, $L = (\hat y - y)^2$. Queremos $\partial L / \partial w$:

$$
\frac{\partial L}{\partial w} = \frac{\partial L}{\partial \hat y}\cdot\frac{\partial \hat y}{\partial z}\cdot\frac{\partial z}{\partial w} = 2(\hat y - y)\cdot \sigma'(z) \cdot x
$$

Con números: $x=1$, $w=0{,}5$, $b=0$, $y=1$. Entonces $z=0{,}5$, $\hat y=\sigma(0{,}5)\approx0{,}62$, $\sigma'(z)=\hat y(1-\hat y)\approx 0{,}235$ y $\partial L/\partial w \approx 2(0{,}62-1)(0{,}235)(1)\approx -0{,}18$. El gradiente es negativo: subir $w$ reduce la pérdida, así que el descenso de gradiente lo subirá.

En una red, el proceso tiene dos fases:

1. **Pasada hacia delante** (*forward*): se calculan y guardan las salidas de cada capa hasta llegar a la pérdida.
2. **Pasada hacia atrás** (*backward*): partiendo de la pérdida, se van multiplicando derivadas locales capa a capa; cada capa recibe "cuánto ha contribuido al error" y lo reparte entre sus pesos y sus entradas.

Lo importante es que el coste de la pasada hacia atrás es del mismo orden que el de la pasada hacia delante. Por eso podemos entrenar redes con miles de millones de parámetros. Y no tienes que derivar nada a mano: PyTorch lo hace con **diferenciación automática** (*autograd*). En el bucle del notebook, `perdida.backward()` es la retropropagación y `opt.step()` es la actualización.

También verás aquí por qué importan las activaciones: la regla de la cadena multiplica derivadas. Si cada factor es pequeño (sigmoides saturadas), el producto se desvanece; si es grande, puede explotar.

### Optimizadores: más allá del paso básico

El descenso de gradiente "a pelo" (SGD) tiene problemas en valles alargados: zigzaguea. Las mejoras más usadas:

- **Momento** (*momentum*): acumula una media de los gradientes recientes, como una bola que coge inercia. Suaviza el zigzag y acelera en direcciones consistentes.
- **Adam**: combina momento con una tasa de aprendizaje adaptativa **por parámetro** (divide por una media de los gradientes al cuadrado). Funciona bien "de serie" con $\eta = 10^{-3}$, y por eso es el que usa el notebook: `torch.optim.Adam(modelo.parameters(), lr=1e-3)`.
- **AdamW**: Adam con *weight decay* bien implementado; muy habitual hoy en transformers.

Otras herramientas: los **programadores de tasa de aprendizaje** (*schedulers*), que reducen $\eta$ con el tiempo, y una buena **inicialización** de pesos (PyTorch ya usa por defecto esquemas sensatos).

### Ejemplo de negocio

Un equipo de *pricing* entrena una red para predecir la demanda diaria de 5 000 productos. Tras una noche de entrenamiento, la pérdida no ha bajado. Antes de pedir más GPU, la primera pregunta es: ¿qué tasa de aprendizaje habéis usado y cómo es la curva? Probar tres valores separados por un factor 10 durante pocas épocas cuesta minutos y suele ahorrar días.

### Errores frecuentes

- **Elegir la tasa de aprendizaje sin mirar la curva de pérdida.** Pérdida plana: sube $\eta$. Pérdida errática o `nan`: bájala.
- **Creer que la retropropagación es un algoritmo de aprendizaje distinto.** Solo calcula gradientes; quien aprende es el optimizador que los usa.
- **Comparar configuraciones con una sola ejecución.** La inicialización y el orden de los lotes son aleatorios; repite con varias semillas.
- **Confundir época con iteración.** Una época son muchas iteraciones (18 en el notebook).

Practica: notebook, sección 4 (`entrenar`) y ejercicio 3 (tasas de aprendizaje).

> **Ideas clave**
> - El descenso de gradiente actualiza $\theta \leftarrow \theta - \eta\nabla L$: pasos cuesta abajo en la pérdida.
> - La tasa de aprendizaje decide si converges lento, bien o nunca. Explórala en factores de 10.
> - La retropropagación es la regla de la cadena aplicada de la salida a la entrada; `backward()` la ejecuta.
> - Se entrena por minilotes: una época = una pasada por los datos.
> - Adam con $\eta=10^{-3}$ es un punto de partida robusto.

---

## 5.4 PyTorch: tensores, modelos y bucle de entrenamiento

### Por qué PyTorch

PyTorch es hoy la librería de deep learning más usada en investigación y una de las dominantes en industria. Ofrece tres cosas: **tensores** (como arrays de NumPy, pero que pueden vivir en GPU), **diferenciación automática** y una caja de herramientas de capas, pérdidas y optimizadores. Su estilo es "Python normal": escribes el bucle de entrenamiento tú mismo, lo que al principio parece más trabajo que el `.fit()` de scikit-learn, pero te da control total y hace que entiendas qué ocurre.

### Tensores: forma, tipo y dispositivo

Un tensor es un array multidimensional con tres atributos que debes vigilar siempre:

```python
x = torch.tensor(X_train).unsqueeze(1)
x.shape    # torch.Size([1149, 1, 8, 8])  → (lote, canales, alto, ancho)
x.dtype    # torch.float32
x.device   # cpu (o cuda:0 si está en GPU)
```

El `unsqueeze(1)` del notebook añade la dimensión de **canales**: las capas convolucionales esperan imágenes con forma $(N, C, H, W)$. Una imagen en escala de grises tiene 1 canal; una en color, 3. Las etiquetas deben ser enteros (`int64`) para `CrossEntropyLoss`. La mayoría de los errores de principiante en PyTorch son de **forma**, de **tipo** o de **dispositivo** (un tensor en CPU y el modelo en GPU).

### Autograd en tres líneas

```python
w = torch.tensor(2.0, requires_grad=True)
L = (3 * w - 5) ** 2
L.backward()
print(w.grad)   # dL/dw = 2·(3w−5)·3 = 6
```

PyTorch registra las operaciones realizadas sobre tensores con `requires_grad=True` y, al llamar a `backward()`, recorre ese grafo hacia atrás aplicando la regla de la cadena. Los parámetros de las capas (`nn.Linear`, `nn.Conv2d`...) ya tienen `requires_grad=True`.

### Modelos: `nn.Module` y `nn.Sequential`

Un modelo es un objeto `nn.Module` que contiene parámetros y define la pasada hacia delante. Para arquitecturas en cadena basta con `nn.Sequential`, como en el notebook. Para algo más flexible se escribe una clase:

```python
class MiMLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.oculta = nn.Linear(64, 128)
        self.salida = nn.Linear(128, 10)
    def forward(self, x):
        x = x.flatten(1)
        return self.salida(torch.relu(self.oculta(x)))
```

`sum(p.numel() for p in modelo.parameters())` cuenta los parámetros, como en las secciones 5 y 6 del notebook.

### Datos: `Dataset` y `DataLoader`

`TensorDataset` empaqueta entradas y etiquetas; `DataLoader` las sirve en lotes, opcionalmente barajadas (`shuffle=True` en entrenamiento, nunca hace falta en validación o test). Es la función `loader` del notebook. Con datos grandes (miles de fotos en disco) escribirás tu propio `Dataset` que lee cada imagen bajo demanda.

### El bucle de entrenamiento: cinco pasos que se repiten

El corazón de la sección 4 del notebook es este patrón, que verás en prácticamente cualquier código de PyTorch:

```python
for xb, yb in dl_train:
    opt.zero_grad()                     # 1. borrar gradientes del paso anterior
    logits = modelo(xb)                 # 2. pasada hacia delante
    perdida = perdida_fn(logits, yb)    # 3. calcular la pérdida
    perdida.backward()                  # 4. retropropagación: gradientes
    opt.step()                          # 5. actualizar parámetros
```

Alrededor de este núcleo, el notebook añade lo que un bucle profesional necesita:

- **`modelo.train()` y `modelo.eval()`**: algunas capas (dropout, *batch normalization*) se comportan distinto al entrenar y al predecir. Olvidar `eval()` al evaluar da resultados ruidosos y peores.
- **`torch.no_grad()`** al evaluar: no se construye el grafo de gradientes, lo que ahorra memoria y tiempo.
- **Historial** de pérdida y exactitud por época, para dibujar **curvas de aprendizaje**.
- ***Early stopping*** opcional con `paciencia`, que guarda el mejor estado (`state_dict`) y lo restaura al final (lección 5.6).
- **Dispositivo**: `dispositivo = "cuda" if torch.cuda.is_available() else "cpu"` y `.to(dispositivo)` para modelo y datos.

### Guardar y cargar un modelo

```python
torch.save(modelo.state_dict(), "cnn_digitos.pt")
modelo = nueva_cnn(); modelo.load_state_dict(torch.load("cnn_digitos.pt")); modelo.eval()
```

Se guardan los **pesos**, no el código: necesitas la misma definición de arquitectura para cargarlos.

### Ejemplo de negocio

En el caso de logística, el equipo de datos entrega al de sistemas un archivo de pesos y una función `predecir(imagen)`. El bucle de entrenamiento es propio, pero todo lo demás (lectura de imágenes, normalización a $[0,1]$, `eval()`, `no_grad()`) debe ser **idéntico** en producción. Un clásico de los incidentes: en producción las imágenes llegan con valores 0–255 en lugar de 0–1 y la exactitud se hunde sin que nadie toque el modelo.

### Errores frecuentes

- **Olvidar `zero_grad()`**: PyTorch acumula gradientes; sin borrarlos, cada paso suma los de los anteriores.
- **No pasar a `eval()`** al validar: el dropout sigue activo y las métricas salen peor de lo que son.
- **Llamar a `.item()` o a NumPy dentro del grafo** cuando necesitas gradientes: rompes la cadena.
- **Formas incompatibles**: `Linear(64, ...)` necesita vectores de 64; si olvidas `Flatten`, falla.
- **Evaluar en el conjunto de test durante el desarrollo**: para decidir usa validación; el test, al final y una vez.

Practica: notebook, sección 4 (`exactitud`, `entrenar`, `curvas`) y secciones 5–6.

> **Ideas clave**
> - Un tensor tiene forma, tipo y dispositivo: casi todos los errores vienen de ahí.
> - `nn.Module` define el modelo; `DataLoader` sirve los datos en lotes.
> - Bucle: `zero_grad` → forward → pérdida → `backward` → `step`.
> - Usa `train()`/`eval()` y `no_grad()` correctamente; guarda el mejor `state_dict`.
> - Lo que hagas a los datos al entrenar, hazlo igual en producción.

---

## 5.5 Redes convolucionales

### El problema de aplanar una imagen

El MLP del notebook empieza con `nn.Flatten()`: convierte la imagen 8×8 en un vector de 64 números. A partir de ahí, para la red, el píxel (2,3) y el (2,4) son dos variables cualesquiera; **no sabe que son vecinos**. Si barajaras las columnas de todas las imágenes de la misma forma, el MLP aprendería igual de bien. Eso es desperdiciar información. Y hay un segundo problema: con una foto real de 224×224 en color (150 528 valores), una sola capa densa de 1 000 neuronas tendría ¡150 millones de pesos!

### La convolución: una lupa que recorre la imagen

Una **capa convolucional** aplica un **filtro** (o *kernel*) pequeño, por ejemplo de 3×3, que se desliza por toda la imagen. En cada posición multiplica los 9 píxeles que cubre por los 9 pesos del filtro, suma y anota el resultado. El conjunto de resultados forma un **mapa de características** (*feature map*): una "imagen" que dice dónde aparece el patrón que el filtro detecta.

$$
\text{salida}(i,j) = \sum_{u=-1}^{1}\sum_{v=-1}^{1} w_{u,v}\; x_{i+u,\,j+v} + b
$$

Un filtro con valores positivos a un lado y negativos al otro responde fuerte a **bordes** verticales; otro, a bordes horizontales; otro, a esquinas. Lo crucial: los pesos del filtro **no se fijan a mano, se aprenden** por retropropagación. En la sección 7 del notebook puedes ver los 16 filtros 3×3 que ha aprendido la primera capa.

### Dos ideas que lo explican todo

1. **Conectividad local**: cada salida depende solo de una vecindad pequeña. Los patrones visuales relevantes (trazos, bordes) son locales.
2. **Pesos compartidos**: el mismo filtro se usa en todas las posiciones. Si un detector de "curva" sirve arriba a la izquierda, sirve también abajo a la derecha. Resultado: muchos menos parámetros y detección del patrón **esté donde esté** (equivariancia a traslaciones).

### Canales, relleno, paso y *pooling*

- **Canales**: una capa con 16 filtros produce 16 mapas. La siguiente capa convolucional combina esos 16 canales: cada filtro suyo tiene forma $16 \times 3 \times 3$.
- **Relleno** (*padding*): añadir un marco de ceros para que la salida conserve el tamaño. Con `padding=1` y filtro 3×3, una imagen 8×8 sigue siendo 8×8.
- **Paso** (*stride*): cuántos píxeles salta el filtro en cada movimiento.
- **Pooling**: `MaxPool2d(2)` se queda con el máximo de cada bloque 2×2, reduciendo a la mitad alto y ancho. Resume ("¿aparece el patrón en esta zona?") y da algo de tolerancia a pequeños desplazamientos.

Tamaño de salida de una convolución con entrada $n$, filtro $k$, relleno $p$ y paso $s$:

$$
n_{\text{salida}} = \left\lfloor \frac{n + 2p - k}{s} \right\rfloor + 1
$$

### La CNN del notebook, capa a capa

| Capa | Forma de salida | Parámetros |
|---|---|---|
| Entrada | 1 × 8 × 8 | — |
| `Conv2d(1, 16, 3, padding=1)` + ReLU | 16 × 8 × 8 | $1\cdot16\cdot9 + 16 = 160$ |
| `MaxPool2d(2)` | 16 × 4 × 4 | 0 |
| `Conv2d(16, 32, 3, padding=1)` + ReLU | 32 × 4 × 4 | $16\cdot32\cdot9+32 = 4\,640$ |
| `MaxPool2d(2)` | 32 × 2 × 2 | 0 |
| `Flatten` + `Dropout(0.3)` | 128 | 0 |
| `Linear(128, 10)` | 10 | $128\cdot10+10 = 1\,290$ |
| **Total** | | **6 090** |

Con **un tercio de los parámetros** del MLP (6 090 frente a 17 226), la CNN obtiene una exactitud igual o ligeramente superior (0,969 frente a 0,967). En imágenes de 8×8 tan limpias la diferencia es pequeña; en fotos reales es enorme.

### Jerarquía de características

Al apilar capas convolucionales, cada neurona "ve" una zona cada vez mayor de la imagen original (su **campo receptivo**). Las primeras capas detectan bordes; las intermedias, texturas y partes (un ojo, una rueda); las últimas, objetos completos. Esta jerarquía aprendida es la razón del salto de 2012, cuando AlexNet ganó la competición ImageNet con una CNN, y de arquitecturas posteriores como VGG o ResNet (que, con conexiones residuales, permitió entrenar redes de más de 100 capas).

### Ejemplo de negocio

Una fábrica de envases quiere detectar latas abolladas en la línea de producción con una cámara. Una CNN aprende directamente de las fotos los patrones de abolladura, sin que nadie diseñe "variables de abolladura" a mano, y los reconoce sea cual sea su posición en la lata. En el caso del notebook, la misma lógica sirve para dígitos escritos en cualquier lugar de la etiqueta.

### Errores frecuentes

- **Olvidar la dimensión de canales**: `Conv2d` necesita $(N, C, H, W)$; de ahí el `unsqueeze(1)`.
- **Calcular mal el tamaño antes de la capa densa**: usa la fórmula o imprime `x.shape` capa a capa.
- **Pensar que la CNN es invariante a todo**: tolera pequeños desplazamientos, pero no rotaciones grandes ni cambios de escala si no los ha visto (lo comprobarás en el ejercicio 4).
- **Usar CNN para datos tabulares**: la convolución supone que la vecindad entre columnas significa algo; en una tabla de clientes no es así.

Practica: notebook, secciones 6 (CNN), 7 (filtros) y 8 (matriz de confusión y errores).

> **Ideas clave**
> - Aplanar una imagen tira la información de vecindad; la convolución la aprovecha.
> - Conectividad local + pesos compartidos = pocos parámetros y detección del patrón en cualquier posición.
> - Pooling reduce el tamaño y resume; relleno y paso controlan la geometría.
> - Las capas apiladas construyen una jerarquía: bordes → partes → objetos.
> - En el notebook, la CNN iguala o supera al MLP con un tercio de los parámetros.

---

## 5.6 Regularización: dropout, early stopping, aumento de datos

### Sobreajuste en redes: el estudiante que memoriza

Una red con decenas de miles de parámetros y un millar de imágenes puede **memorizar** el conjunto de entrenamiento: acierta el 100 % de lo que ha visto y falla más de lo debido en lo nuevo. Es el mismo sobreajuste del módulo 03, pero las redes son especialmente propensas porque tienen muchísima capacidad.

### Diagnóstico: curvas de aprendizaje

La herramienta básica es dibujar, por época, la pérdida y la exactitud en entrenamiento y validación (la función `curvas` del notebook):

| Lo que ves | Diagnóstico | Qué hacer |
|---|---|---|
| Train y validación malas y parecidas | Infraajuste (*underfitting*) | Más capacidad, más épocas, revisar la tasa de aprendizaje |
| Train excelente, validación estancada o empeorando | Sobreajuste | Regularizar, más datos, modelo más pequeño, parar antes |
| Ambas buenas y cercanas | Buen ajuste | Evaluar en test y documentar |

En el ejercicio 2 (MLP con el doble de neuronas, 50 826 parámetros, 150 épocas sin *early stopping*), la exactitud de entrenamiento llega al 100 % y la pérdida de entrenamiento cae a casi cero. La **pérdida de validación** toca su mínimo hacia la época 16 (0,145) y luego **sube** (0,229 al final), aunque la exactitud de validación se mantiene en torno a 0,97. Es un sobreajuste "suave": las predicciones siguen siendo correctas, pero el modelo se vuelve **demasiado confiado** en sus errores. Si el negocio usa esa confianza para decidir qué paquetes revisa una persona, el problema es real.

### Dropout

Durante el entrenamiento, **dropout** apaga al azar cada neurona con probabilidad $p$ en cada paso (en el notebook, `nn.Dropout(0.3)` antes de la última capa). La red no puede depender de ninguna neurona concreta y aprende representaciones redundantes y robustas; se parece a entrenar muchas subredes y promediarlas. En PyTorch, las salidas que sobreviven se multiplican por $1/(1-p)$ durante el entrenamiento, de modo que en evaluación (`modelo.eval()`) dropout simplemente se desactiva sin reescalar nada.

### Penalización de pesos (*weight decay*)

Es la regularización L2 de Ridge (módulo 03) aplicada a la red: se añade a la pérdida un término $\lambda \sum_j \theta_j^2$ que empuja los pesos hacia valores pequeños. En PyTorch se activa en el optimizador: `torch.optim.AdamW(modelo.parameters(), lr=1e-3, weight_decay=1e-2)`.

### Early stopping

Si la validación deja de mejorar, ¿para qué seguir? ***Early stopping*** vigila una métrica de validación y detiene el entrenamiento cuando lleva `paciencia` épocas sin mejorar, **restaurando los pesos de la mejor época**. Es lo que hace `entrenar(..., paciencia=10)` con la CNN del notebook: guarda una copia del `state_dict` cada vez que mejora la exactitud de validación. Es la regularización más barata que existe: además, ahorra tiempo de cómputo. Ojo: al usar la validación para decidir cuándo parar, esa métrica queda ligeramente optimista; por eso el número que se reporta es el de **test**.

### Aumento de datos

La mejor regularización es tener más datos. Cuando no los hay, se pueden **fabricar variaciones realistas** de los existentes: desplazar, girar ligeramente, cambiar brillo, recortar, voltear (si tiene sentido: un 6 volteado no es un 6). La etiqueta no cambia, así que es gratis. El ejercicio 4 del notebook desplaza cada imagen ±1 píxel con `np.roll`, generando un desplazamiento nuevo en cada época.

Resultado en el notebook de soluciones (media de 3 semillas):

| CNN | Test original | Test con imágenes desplazadas ±1 px |
|---|---|---|
| Sin aumento | 0,969 | 0,550 |
| Con aumento | 0,967 | 0,907 |

Lectura honesta: en el test original **no hay mejora** (las imágenes de test están tan centradas como las de entrenamiento). Pero ante dígitos ligeramente descentrados, la CNN sin aumento se hunde y la entrenada con aumento aguanta. El aumento de datos sirve para enseñar al modelo las **invariancias** que esperas encontrar en producción. Y un aviso metodológico: con una sola semilla habríamos "visto" una mejora en el test original (0,967 → 0,975) que en realidad era ruido.

Otras técnicas que encontrarás: ***batch normalization*** (normaliza las activaciones dentro de la red; estabiliza y acelera, con un efecto regularizador ligero) y reducir el tamaño del modelo.

### Ejemplo de negocio

Una cadena de supermercados entrena un detector de huecos en estanterías con fotos tomadas en tres tiendas piloto. En las demás tiendas, la luz y el ángulo de la cámara son distintos y el modelo falla. Aumentar con cambios de brillo, pequeñas rotaciones y recortes, y sobre todo **validar con fotos de tiendas que el modelo no ha visto**, habría detectado y mitigado el problema antes del despliegue.

### Errores frecuentes

- **Aumentar también validación y test**: se evalúa sobre datos reales; el aumento es solo para entrenar.
- **Transformaciones que cambian la etiqueta**: voltear dígitos, girar 180° un 6.
- **Mirar solo la exactitud**: la pérdida de validación detecta antes el sobreajuste.
- **Elegir la época con el test**: usa validación; el test es para el informe final.
- **Concluir con una sola ejecución**: con 360 imágenes de test, cada error vale 0,28 puntos.

Practica: notebook, secciones 4 y 6 (dropout y *early stopping*), ejercicios 2 y 4.

> **Ideas clave**
> - Las curvas de aprendizaje (train frente a validación) son el diagnóstico básico del sobreajuste.
> - Dropout apaga neuronas al azar al entrenar; se desactiva con `eval()`.
> - *Early stopping* para cuando la validación deja de mejorar y recupera la mejor época.
> - El aumento de datos fabrica variaciones realistas y enseña invariancias útiles en producción.
> - Compara variantes con varias semillas y en datos parecidos a los de producción.

---

## 5.7 Transfer learning y modelos preentrenados

### El problema: pocos datos, mucha ambición

Tienes 500 fotos de productos defectuosos y quieres un clasificador de calidad. Una CNN moderna tiene millones de parámetros; entrenarla desde cero con 500 imágenes es receta segura para el sobreajuste. Y, sin embargo, hoy se resuelven estos problemas con buena exactitud. ¿Cómo? Reutilizando lo que otra red ya aprendió.

### La idea: las primeras capas son universales

Recuerda la jerarquía de la lección 5.5: las primeras capas de una CNN aprenden bordes, texturas y formas simples. Esos detectores sirven para casi cualquier imagen, sean gatos, radiografías o tornillos. El **transfer learning** (aprendizaje por transferencia) toma una red **preentrenada** en un conjunto enorme y genérico, típicamente ImageNet (más de un millón de imágenes de 1 000 categorías), y la adapta a tu problema.

### Dos estrategias

1. **Extractor de características** (*feature extraction*): **congelas** todos los pesos de la red preentrenada y sustituyes solo la última capa por una nueva con tus clases. Solo se entrena esa capa. Es rápido, necesita pocos datos y casi no sobreajusta. Equivale a usar la red como un "traductor" de imágenes a vectores muy informativos y poner encima un clasificador lineal.
2. **Ajuste fino** (*fine-tuning*): partes de los pesos preentrenados y **sigues entrenando** también las últimas capas (o toda la red) con una tasa de aprendizaje pequeña, para no destruir lo aprendido. Suele dar mejor resultado si tienes algo más de datos o si tus imágenes se parecen poco a las de ImageNet.

Un esquema típico con `torchvision`:

```python
from torchvision import models
red = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)   # descarga pesos preentrenados
for p in red.parameters():
    p.requires_grad = False                    # congelar todo
red.fc = nn.Linear(red.fc.in_features, 2)      # nueva cabeza: defectuoso / correcto
opt = torch.optim.Adam(red.fc.parameters(), lr=1e-3)   # solo se entrena la cabeza
```

Detalles prácticos: las imágenes deben preprocesarse **igual** que en el preentrenamiento (tamaño, normalización por canal; los objetos `weights` de torchvision incluyen esas transformaciones), y conviene combinarlo con aumento de datos.

### Cuándo usar cada opción

| Situación | Recomendación |
|---|---|
| Pocos datos, dominio parecido a fotos generales | Extractor de características |
| Datos moderados (miles), dominio algo distinto | Ajuste fino de las últimas capas |
| Muchos datos y dominio muy distinto (p. ej., imágenes de satélite multiespectrales) | Ajuste fino completo o entrenar desde cero |
| Datos tabulares | Modelos clásicos (*gradient boosting*), no transfer learning de imágenes |

### Modelos fundacionales: la misma idea a lo grande

Hoy la transferencia es la norma en casi todos los dominios. En texto, modelos como BERT o GPT se preentrenan con enormes cantidades de texto y se ajustan (o simplemente se usan con *prompts*) para tareas concretas; en imágenes hay modelos como CLIP que relacionan imágenes y texto. Repositorios como Hugging Face Hub o `torchvision.models` ofrecen miles de modelos preentrenados. Lo verás en el módulo 09 (IA generativa).

### ¿Cuándo compensa el deep learning frente a un modelo clásico?

Es la pregunta de negocio central del módulo. Criterios:

- **Tipo de dato**: imágenes, audio, texto libre → deep learning (casi siempre con preentrenamiento). Tablas con variables bien definidas → empieza por regresión logística o *gradient boosting*.
- **Volumen de datos etiquetados**: con pocos, solo funciona bien con transferencia.
- **Coste y operación**: una red necesita más cómputo, más cuidado en producción (preprocesado idéntico, versiones de librerías) y es menos interpretable.
- **Línea base**: mide siempre primero un modelo sencillo. En el notebook, la regresión logística ya logra 0,964; la CNN, 0,969. Con dígitos de 8×8 la ganancia no justifica la complejidad; con fotos reales de etiquetas, sí.

### Ejemplo de negocio

Una aseguradora quiere clasificar fotos de daños en vehículos (leve, moderado, siniestro total) para agilizar peritajes. Tiene 3 000 fotos etiquetadas. Plan razonable: ResNet o EfficientNet preentrenada como extractor de características y medir; si no basta, ajuste fino de los últimos bloques con aumento de datos; validar con fotos de otro periodo y otras zonas geográficas; y dejar que los casos de baja confianza pasen a un perito.

### Errores frecuentes

- **Entrenar desde cero con pocos datos** cuando existe un modelo preentrenado.
- **Tasa de aprendizaje alta en el ajuste fino**: destruye lo aprendido en el preentrenamiento.
- **Preprocesado distinto** al del preentrenamiento (tamaño, normalización).
- **Ignorar la licencia de los pesos** o los sesgos del conjunto de preentrenamiento.
- **Suponer que el dominio es parecido** sin comprobarlo: imágenes médicas o industriales pueden requerir más ajuste.

Practica: el notebook no descarga modelos preentrenados (para que funcione sin internet), pero el ejercicio 1 te muestra la idea de "red como extractor + clasificador lineal"; en los recursos abiertos tienes un tutorial oficial de PyTorch de transfer learning.

> **Ideas clave**
> - Las primeras capas de una red preentrenada son detectores genéricos reutilizables.
> - Extractor de características: congelas y entrenas solo la cabeza. Ajuste fino: sigues entrenando con tasa pequeña.
> - Con pocos datos de imágenes o texto, el transfer learning es la opción por defecto.
> - Preprocesa igual que en el preentrenamiento y vigila la licencia de los pesos.
> - Deep learning compensa con datos no estructurados; con tablas, empieza por modelos clásicos.

---

## 5.8 Más allá de las imágenes: secuencias, texto y transformers

### Datos con orden

Muchos datos de negocio son **secuencias**: las ventas diarias de una tienda, los clics de un usuario en una sesión, las palabras de un correo de reclamación, las lecturas de un sensor. En una secuencia, el orden importa y la longitud varía. Un MLP espera un vector de tamaño fijo y no "sabe" que el elemento 5 va después del 4.

### Redes recurrentes

Las **redes recurrentes** (RNN) procesan la secuencia paso a paso y mantienen un **estado oculto** $h_t$ que resume lo visto hasta el momento:

$$
h_t = \tanh(W_x x_t + W_h h_{t-1} + b)
$$

Los mismos pesos se usan en cada paso (de nuevo, pesos compartidos, ahora a lo largo del tiempo). El problema: al retropropagar a través de muchos pasos, el gradiente se desvanece o explota, y la red "olvida" lo lejano. Las variantes **LSTM** y **GRU** añaden "puertas" que deciden qué recordar y qué olvidar, y dominaron el procesamiento de texto y voz hasta 2017. Para secuencias también se usan **convoluciones 1D**, que detectan patrones locales en el tiempo.

### Texto: tokens y *embeddings*

Para que una red procese texto, primero se divide en **tokens** (palabras o fragmentos de palabra) y cada token se convierte en un vector denso llamado ***embedding***. Los embeddings se aprenden y colocan cerca palabras con usos parecidos ("factura" y "recibo"). Es la misma idea que las representaciones de las capas ocultas, aplicada a símbolos.

### Atención y transformers

En 2017, el artículo *Attention Is All You Need* (Vaswani et al.) propuso el **transformer**, que abandona la recurrencia y se basa en la **atención**: cada token decide a qué otros tokens de la secuencia debe "prestar atención" para construir su representación. En la frase "el paquete no llegó porque la dirección estaba mal", para entender "estaba" conviene mirar a "dirección".

Cada token genera tres vectores: consulta $Q$, clave $K$ y valor $V$. La atención calcula la similitud entre consultas y claves, la convierte en pesos con softmax y promedia los valores:

$$
\text{Atención}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right) V
$$

Ventajas clave: todos los tokens se procesan **en paralelo** (entrenamiento mucho más rápido en GPU que una RNN) y cualquier token puede conectar directamente con cualquier otro, por lejos que esté. Los transformers combinan capas de atención con capas densas (MLP), conexiones residuales y normalización: las mismas piezas que has visto esta semana.

Dos grandes familias:

- **Codificadores** tipo BERT: leen el texto completo y producen representaciones; ideales para clasificar, extraer entidades o buscar por similitud.
- **Decodificadores** tipo GPT: generan texto token a token prediciendo el siguiente; son la base de los grandes modelos de lenguaje (LLM) del módulo 09.

Los transformers ya no son solo de texto: los *Vision Transformers* trocean imágenes en parches y los tratan como tokens; también se usan en audio, series temporales y biología.

### Qué usar en la práctica

| Problema | Primera opción razonable |
|---|---|
| Clasificar correos o reseñas | Transformer preentrenado (ajuste fino o *embeddings* + clasificador) o un LLM vía API |
| Previsión de demanda | Modelos de series temporales clásicos (módulo 08) o *gradient boosting* con retardos; redes si hay muchas series relacionadas |
| Voz a texto | Modelo preentrenado |
| Detección de anomalías en sensores | Empezar por métodos estadísticos; redes recurrentes o convolucionales 1D si hay muchos datos |

### Ejemplo de negocio

El servicio de atención al cliente de la empresa de logística recibe 20 000 correos al mes. Clasificarlos por motivo (retraso, daño, dirección errónea, otro) permite enrutar y medir. Con unos cientos de correos etiquetados, ajustar un modelo tipo BERT en español o usar *embeddings* preentrenados con una regresión logística encima da buenos resultados en horas, no en meses. Es transfer learning, igual que en la lección 5.7.

### Errores frecuentes

- **Entrenar una red de texto desde cero** con pocos miles de ejemplos: usa modelos preentrenados.
- **Suponer que todo problema secuencial necesita deep learning**: en previsión de demanda, un modelo sencillo bien validado suele ser difícil de batir.
- **Ignorar el coste de inferencia**: un transformer grande puede ser caro de ejecutar a escala.
- **Validación con fuga temporal**: en secuencias, valida siempre con datos posteriores a los de entrenamiento (módulo 08).

> **Ideas clave**
> - Las secuencias tienen orden y longitud variable; las RNN, LSTM y GRU mantienen un estado a lo largo del tiempo.
> - El texto se trocea en tokens y se representa con *embeddings* aprendidos.
> - La atención permite que cada elemento consulte a todos los demás; el transformer se basa en ella y se entrena en paralelo.
> - BERT (codificador) para entender y clasificar; GPT (decodificador) para generar.
> - Casi siempre partirás de un modelo preentrenado: el transfer learning también manda en texto.

---

## Glosario

- **Activación, función de** (*activation function*): función no lineal aplicada a la salida de cada neurona (ReLU, sigmoide, tanh).
- **Atención** (*attention*): mecanismo que pondera la información de otros elementos de la secuencia según su relevancia.
- **Aumento de datos** (*data augmentation*): generación de variaciones realistas de los datos de entrenamiento sin cambiar su etiqueta.
- **Capa densa / totalmente conectada** (*dense / fully connected layer*): capa en la que cada neurona recibe todas las entradas, $h=\sigma(Wx+b)$.
- **Convolución** (*convolution*): operación que desliza un filtro pequeño sobre la entrada y calcula sumas ponderadas locales.
- **Descenso de gradiente** (*gradient descent*): método de optimización que actualiza parámetros en la dirección opuesta al gradiente.
- **Dropout** (*dropout*): técnica de regularización que apaga neuronas al azar durante el entrenamiento.
- **Early stopping** (*early stopping*): detener el entrenamiento cuando la métrica de validación deja de mejorar y recuperar la mejor época.
- **Embedding** (*embedding*): vector denso aprendido que representa un elemento discreto (token, producto, usuario).
- **Entropía cruzada** (*cross-entropy*): función de pérdida para clasificación; penaliza asignar poca probabilidad a la clase correcta.
- **Época** (*epoch*): una pasada completa por el conjunto de entrenamiento.
- **Filtro / kernel** (*filter / kernel*): pequeña matriz de pesos que una capa convolucional aplica en todas las posiciones.
- **Logits** (*logits*): puntuaciones brutas de la última capa antes de softmax.
- **Lote / minilote** (*batch / mini-batch*): subconjunto de ejemplos con el que se calcula cada actualización.
- **Perceptrón multicapa** (*multilayer perceptron, MLP*): red de capas densas con activaciones no lineales.
- **Pooling** (*pooling*): reducción de un mapa de características resumiendo bloques (p. ej., el máximo de cada 2×2).
- **Retropropagación** (*backpropagation*): cálculo eficiente de gradientes aplicando la regla de la cadena desde la salida hacia la entrada.
- **Tasa de aprendizaje** (*learning rate*): tamaño del paso en cada actualización de los parámetros.
- **Transfer learning** (*transfer learning*): reutilizar un modelo preentrenado en una tarea grande para resolver otra con menos datos.
- **Transformer** (*transformer*): arquitectura basada en atención, base de los modelos de lenguaje actuales.
