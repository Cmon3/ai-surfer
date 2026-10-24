# Módulo F1 · Fundamentos de Python para datos — Apuntes

Estos apuntes acompañan a los vídeos y al notebook del módulo. Están pensados para quien **no ha programado nunca en Python** (o lo hizo hace mucho): empezamos por preparar el entorno de trabajo y terminamos respondiendo preguntas de negocio con tablas y gráficos. Cada lección explica primero la intuición, después la sintaxis justa y, por último, los errores que verás una y otra vez al empezar.

El hilo conductor es el caso de **TiendaSur**, una cadena de 5 tiendas en Sevilla, Cádiz y Málaga. Dirección quiere saber qué tiendas, categorías y meses generan más ingresos y si las promociones funcionan. Al final del módulo serás capaz de responder a esas preguntas tú solo, con código que cualquiera puede volver a ejecutar.

**Cómo estudiar este módulo.** Lee la lección, mira el vídeo y, sobre todo, **escribe el código tú mismo** en el notebook: copiar y pegar no fija lo aprendido. Si algo falla, lee primero la última línea del mensaje de error: suele decir qué ha pasado.

## Índice

- [0.1 Por qué Python para datos; Jupyter y Google Colab](#01-por-qué-python-para-datos-jupyter-y-google-colab)
- [0.2 Tipos, variables y operadores](#02-tipos-variables-y-operadores)
- [0.3 Listas, diccionarios y comprensiones](#03-listas-diccionarios-y-comprensiones)
- [0.4 Condicionales, bucles y funciones](#04-condicionales-bucles-y-funciones)
- [0.5 NumPy: arrays y vectorización](#05-numpy-arrays-y-vectorización)
- [0.6 pandas I: Series, DataFrame, selección y filtrado](#06-pandas-i-series-dataframe-selección-y-filtrado)
- [0.7 pandas II: limpieza (nulos, duplicados, tipos, fechas)](#07-pandas-ii-limpieza-nulos-duplicados-tipos-fechas)
- [0.8 pandas III: `groupby`, tablas dinámicas y `merge`](#08-pandas-iii-groupby-tablas-dinámicas-y-merge)
- [0.9 Visualización: qué gráfico usar para cada pregunta](#09-visualización-qué-gráfico-usar-para-cada-pregunta)
- [Glosario](#glosario)

---

## 0.1 Por qué Python para datos; Jupyter y Google Colab

### Del Excel al código: qué ganas

Si trabajas con datos, probablemente usas una hoja de cálculo. Es una herramienta excelente para tablas pequeñas y cálculos puntuales, pero tiene tres límites que aparecen en cuanto el trabajo crece:

1. **Reproducibilidad.** Un informe mensual hecho a mano (copiar, pegar, filtrar, arrastrar fórmulas) hay que rehacerlo cada mes y es fácil equivocarse en un paso. Un script de Python es una receta: el mes que viene la vuelves a ejecutar con los datos nuevos y obtienes el mismo proceso, sin olvidos.
2. **Escala.** Una hoja de cálculo se vuelve lenta con cientos de miles de filas. pandas maneja millones de filas en un portátil normal.
3. **Alcance.** Con el mismo lenguaje limpias datos, haces estadística, entrenas modelos de machine learning, automatizas descargas o llamas a un modelo de lenguaje. En este curso no cambiarás de herramienta en 14 semanas.

¿Por qué Python? Es gratuito, legible y tiene un **ecosistema** enorme de librerías. Las de este módulo son la base de todo lo demás:

| Librería | Para qué sirve | Analogía |
|---|---|---|
| NumPy | Cálculo numérico con arrays | La "calculadora" rápida |
| pandas | Tablas (filtrar, limpiar, agrupar, combinar) | Excel + SQL con superpoderes |
| matplotlib | Gráficos (control total) | El lienzo |
| seaborn | Gráficos estadísticos con poco código | Plantillas bonitas sobre matplotlib |

Todo lo que verás después (scikit-learn, statsmodels, PyTorch…) se apoya en NumPy y pandas.

**Ejemplo de negocio.** El responsable de operaciones de TiendaSur dedica cada lunes dos horas a consolidar las ventas de cinco tiendas en un Excel. Con un notebook, ese trabajo se reduce a pulsar "Ejecutar todo": el código lee los ficheros, elimina duplicados, calcula ingresos por tienda y genera los gráficos. Dos horas se convierten en dos minutos, y cualquiera puede revisar qué se hizo.

### Qué es un notebook

Un **notebook** (cuaderno) de Jupyter es un documento que mezcla **celdas de texto** (en formato Markdown, con títulos, listas y fórmulas) y **celdas de código** que se ejecutan una a una y muestran su resultado justo debajo: una tabla, un número o un gráfico. Es ideal para análisis exploratorio: cuenta una historia.

Detrás del notebook hay un **kernel**: el proceso de Python que ejecuta tus celdas y **recuerda** las variables que has creado. Tres consecuencias importantes:

- Lo que importa es el **orden en que ejecutas** las celdas, no el orden en que aparecen. El número entre corchetes (`[5]`) indica en qué orden se ejecutó cada una.
- Si reinicias el kernel, Python olvida todo: hay que volver a ejecutar desde arriba.
- Antes de entregar un notebook, haz siempre **Reiniciar y ejecutar todo**. Si funciona de principio a fin, es reproducible (y es el 30 % de la nota del caso práctico).

Atajos imprescindibles: `Shift + Enter` ejecuta la celda y pasa a la siguiente; `Esc` + `A`/`B` inserta una celda arriba/abajo; `Esc` + `M` convierte la celda en texto y `Esc` + `Y` en código.

### Configuración del entorno, opción A: Google Colab (recomendada para empezar)

Google Colab es un servicio gratuito que ejecuta notebooks en servidores de Google. No instalas nada: solo necesitas un navegador y una cuenta de Google. NumPy, pandas, matplotlib y seaborn ya vienen instaladas.

1. Entra en [colab.research.google.com](https://colab.research.google.com) con tu cuenta de Google.
2. Abre el notebook del módulo. Tienes dos caminos: (a) en el menú *Archivo → Abrir cuaderno → GitHub*, pega la URL del repositorio del curso y elige `modulos/F1-python/notebook.ipynb`; o (b) descarga el `.ipynb` a tu ordenador y súbelo con *Archivo → Subir cuaderno*.
3. **Guarda una copia en tu Drive** (*Archivo → Guardar una copia en Drive*). Si no lo haces, tus cambios pueden perderse al cerrar la pestaña.
4. Ejecuta la primera celda (la de los `import`). La primera vez tardará unos segundos porque Colab asigna una máquina virtual.
5. Si algo se queda raro, usa *Entorno de ejecución → Reiniciar sesión* y luego *Ejecutar todo*.

Ten en cuenta que la máquina de Colab es **temporal**: tras un rato de inactividad se borra junto con los ficheros que hayas subido a ella (el notebook, en cambio, se queda guardado en Drive). Si necesitas una librería que no viene instalada, ejecuta en una celda `!pip install nombre_libreria`. Y no subas datos personales o confidenciales de tu empresa a un servicio externo sin permiso.

### Configuración del entorno, opción B: en tu ordenador

Trabajar en local te da independencia de internet y control sobre las versiones. Tienes dos caminos:

- **Anaconda o Miniconda**: distribuciones que instalan Python y gestionan entornos. Anaconda trae casi todo preinstalado y una interfaz gráfica (Anaconda Navigator); es la opción más sencilla si no te manejas con la terminal.
- **Python oficial + entorno virtual** (el que recomienda el README del curso). Instala Python 3.11 o superior desde python.org (en Windows, marca la casilla *Add Python to PATH*) y, en una terminal, desde la carpeta del curso:

```bash
python -m venv .venv                 # crea un entorno aislado para el curso
source .venv/bin/activate            # en Windows: .venv\Scripts\activate
pip install -r requirements.txt      # instala NumPy, pandas, matplotlib, seaborn...
jupyter lab                          # abre JupyterLab en el navegador
```

Un **entorno virtual** es una carpeta con su propio Python y sus librerías, aislada del sistema; hay que **activarlo** en cada terminal nueva.

Si prefieres un editor, **VS Code** con las extensiones *Python* y *Jupyter* abre los `.ipynb` directamente; solo tienes que elegir como kernel el Python de `.venv` (arriba a la derecha, *Select Kernel*).

Para comprobar que todo funciona, ejecuta en una celda:

```python
import sys, numpy as np, pandas as pd
print(sys.version)
print("NumPy", np.__version__, "| pandas", pd.__version__)
```

Lo importante es que no aparezca ningún error. Con pandas 3 verás algunos detalles nuevos (por ejemplo, las columnas de texto aparecen con tipo `str` en lugar de `object`), pero todo el código del curso funciona en ambas versiones.

### Errores frecuentes

- **`NameError: name 'ventas' is not defined`**: has ejecutado una celda sin ejecutar antes la que crea esa variable (o has reiniciado el kernel). Ejecuta las celdas anteriores en orden.
- **`ModuleNotFoundError: No module named 'pandas'`** en local: la librería está instalada en otro entorno distinto del que usa el kernel. Activa `.venv` antes de abrir Jupyter o elige el kernel correcto en VS Code.
- **Perder el trabajo en Colab** por no guardar una copia en Drive.
- **Resultados que cambian "solos"**: ejecutaste celdas fuera de orden y una variable se sobrescribió. Reinicia y ejecuta todo.

> Practica: abre `notebook.ipynb`, ejecuta la celda de `import` y la sección 1. Después haz *Reiniciar y ejecutar todo* y comprueba que llega al final sin errores.

> **Ideas clave**
> - Python aporta reproducibilidad, escala y un único ecosistema para todo el ciclo de datos.
> - Un notebook combina explicación, código y resultados; el kernel recuerda el estado y manda el **orden de ejecución**.
> - Colab no requiere instalación (guarda siempre una copia en Drive); en local, usa un entorno virtual o Anaconda.
> - Antes de entregar, **reinicia y ejecuta todo**: si no funciona de arriba abajo, no es reproducible.

---

## 0.2 Tipos, variables y operadores

### Variables: etiquetas para valores

Una **variable** es un nombre que apunta a un valor. Se crea con el signo `=`, que en Python significa **asignar**, no "es igual a":

```python
precio = 19.99          # float: número decimal
unidades = 3            # int: número entero
producto = "Café"       # str: texto
en_oferta = True        # bool: verdadero/falso
```

Este es exactamente el arranque de la sección 1 del notebook. Algunas reglas y convenciones para los nombres:

- Solo letras, números y guiones bajos, sin empezar por número: `ingreso_m2` vale, `2ingreso` no.
- Python distingue mayúsculas: `Precio` y `precio` son variables distintas.
- Convención: minúsculas con guiones bajos (*snake_case*) y nombres que expliquen el contenido: `ventas_semana` mejor que `vs` o `x`.
- Python admite tildes y eñes en los nombres, pero es mejor evitarlas (por eso el notebook usa `categoria`): te ahorrarás problemas con teclados y herramientas.

### Los tipos básicos

Cada valor tiene un **tipo**, que determina qué operaciones admite. Puedes consultarlo con `type(valor)`.

| Tipo | Ejemplo | Uso típico en datos |
|---|---|---|
| `int` | `3`, `-12`, `20_000` | Conteos, unidades, identificadores |
| `float` | `19.99`, `0.21` | Importes, porcentajes, medidas |
| `str` | `"Sevilla"` | Nombres, categorías, códigos |
| `bool` | `True`, `False` | Indicadores: ¿en promoción? ¿cliente activo? |
| `NoneType` | `None` | "No hay valor" |

Se puede **convertir** entre tipos: `int("3")` da `3`, `float("19.99")` da `19.99` y `str(450)` da `"450"`. Es muy habitual al leer datos de ficheros, donde todo llega inicialmente como texto.

### Operadores aritméticos

| Operador | Significado | Ejemplo | Resultado |
|---|---|---|---|
| `+ - *` | Suma, resta, producto | `19.99 * 3` | `59.97` |
| `/` | División (siempre da `float`) | `7 / 2` | `3.5` |
| `//` | División entera | `7 // 2` | `3` |
| `%` | Resto | `7 % 2` | `1` |
| `**` | Potencia | `1.05 ** 3` | `1.157625` |

La precedencia es la de las matemáticas (potencias, luego productos y divisiones, luego sumas); ante la duda, **usa paréntesis**.

**Ejemplo de negocio: precio final de un producto.** Si un artículo cuesta $p$ euros sin IVA, se le aplica un descuento $d$ y luego un IVA $t$, el precio final es

$$p_{\text{final}} = p\,(1-d)\,(1+t).$$

```python
p, d, t = 25.0, 0.15, 0.21
p_final = p * (1 - d) * (1 + t)
print(f"Precio final: {p_final:.2f} €")   # Precio final: 25.71 €
```

Observa que el orden importa poco aquí (el producto es conmutativo), pero no es lo mismo aplicar un descuento de 5 € antes o después del IVA. Escribir la fórmula en código obliga a ser explícito.

### Números decimales: una advertencia

Los `float` se guardan en binario y no todos los decimales se representan exactamente. Prueba `0.1 + 0.2` y verás `0.30000000000000004`. No es un fallo de Python, ocurre en casi todos los lenguajes (y en Excel, aunque lo disimula al mostrar). Consecuencias prácticas:

- Para **mostrar** importes, redondea al imprimir: `f"{total:.2f}"` o `round(total, 2)`.
- Para **comparar** decimales, no uses `==`; usa una tolerancia: `abs(a - b) < 1e-9` o `math.isclose(a, b)`.

### Comparaciones y lógica

Los operadores de comparación devuelven un `bool`: `==` (igual), `!=` (distinto), `<`, `<=`, `>`, `>=`. Se combinan con `and`, `or` y `not`:

```python
precio = 45
es_caro = precio > 40                       # True
aplica_envio_gratis = es_caro and not en_oferta
```

Un detalle que usarás muchísimo: en cálculos, `True` vale 1 y `False` vale 0. Por eso, sumar una lista de booleanos **cuenta** cuántos son verdaderos, y su media es una **proporción**. Más adelante, `(ventas["promocion"]).mean()` te dirá directamente qué fracción de tickets fue en promoción (≈ 0,20 en TiendaSur).

### Texto y f-strings

Las cadenas (`str`) se escriben entre comillas simples o dobles. Tienen métodos útiles para limpiar datos: `" Sevilla ".strip()` quita espacios, `"sevilla".title()` da `"Sevilla"`, `"19,99".replace(",", ".")` cambia la coma decimal. La forma moderna de construir mensajes es la **f-string**: una `f` antes de las comillas y variables entre llaves, con formato opcional tras los dos puntos:

```python
total = precio * unidades
print(f"{unidades} x {producto} = {total:.2f} €")   # 3 x Café = 59.97 €
print(f"Cuota: {0.235:.1%}")                        # Cuota: 23.5%
```

### Errores frecuentes

- **Confundir `=` con `==`**: `if precio = 10:` da `SyntaxError`; para comparar se usa `==`.
- **Mezclar texto y números**: `"Total: " + 59.97` da `TypeError`. Usa una f-string.
- **Números que son texto**: si un dato llega como `"19,99"`, `float("19,99")` falla por la coma. Hay que reemplazarla por punto (o indicar `decimal=","` al leer el CSV, como veremos en 0.7).
- **Comparar floats con `==`** y sorprenderse del resultado.
- **Sobrescribir nombres de Python**: llamar a una variable `sum` o `list` "rompe" esas funciones hasta que reinicies el kernel.

> Practica: notebook, sección 1 (primera celda). Cambia el precio, las unidades y el producto y comprueba el mensaje.

> **Ideas clave**
> - `=` asigna; `==` compara. Los nombres de variables deben explicar su contenido.
> - Los tipos básicos son `int`, `float`, `str`, `bool` y `None`; los datos de ficheros suelen llegar como texto y hay que convertirlos.
> - `/` siempre devuelve decimal; los `float` tienen pequeños errores de representación: redondea al mostrar y compara con tolerancia.
> - `True` cuenta como 1: la media de una condición es una proporción.
> - Las f-strings (`f"{x:.2f}"`) son la forma clara de mostrar resultados.

---

## 0.3 Listas, diccionarios y comprensiones

Los valores sueltos se quedan cortos enseguida: una semana de ventas son siete números, una tienda tiene nombre, ciudad y superficie. Python ofrece **estructuras de datos** para agruparlos. Las dos más importantes son la lista y el diccionario.

### Listas: colecciones ordenadas

Una **lista** es una secuencia ordenada de elementos entre corchetes:

```python
ventas_semana = [120, 135, 98, 160, 210, 250, 190]   # lunes a domingo
```

- **Índices desde 0**: `ventas_semana[0]` es el lunes (120) y `ventas_semana[6]` el domingo (190). Los índices negativos cuentan desde el final: `ventas_semana[-1]` también es 190.
- **Rebanadas (*slicing*)**: `ventas_semana[0:5]` devuelve del lunes al viernes. El inicio se incluye y el final **no**: `[a:b]` toma $b-a$ elementos. `ventas_semana[5:]` es el fin de semana.
- **Funciones útiles**: `len()` (número de elementos), `sum()`, `min()`, `max()`, `sorted()` (devuelve una copia ordenada).
- **Son mutables**: `ventas_semana.append(175)` añade un elemento; `ventas_semana[2] = 100` cambia uno.

La media semanal del notebook se calcula así:

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i = \frac{120+135+\dots+190}{7} \approx 166{,}14$$

```python
media = sum(ventas_semana) / len(ventas_semana)
```

Dos parientes que verás a menudo: las **tuplas** `(37.39, -5.98)` son como listas pero inmutables (útiles para coordenadas o pares fijos), y los **conjuntos** `set(...)` guardan elementos únicos sin orden (útiles para eliminar repetidos: `set(["Sevilla", "Cádiz", "Sevilla"])`).

### Diccionarios: pares clave → valor

Un **diccionario** asocia **claves** con **valores**. Se escribe entre llaves:

```python
tienda = {"nombre": "Centro", "ciudad": "Sevilla", "m2": 450}
tienda["ciudad"]            # 'Sevilla'
tienda["m2"] = 470          # modificar
tienda["apertura"] = 2015   # añadir una clave nueva
tienda.get("telefono", "sin dato")   # evita el error si la clave no existe
```

Piensa en un diccionario como una ficha: no accedes por posición, sino por nombre. Son ideales para **tablas de consulta**. En el notebook, `categorias = {"Alimentación": 8, "Bebidas": 5, ...}` guarda el precio base de cada categoría, y más tarde `ventas["categoria"].map(categorias)` lo usa para asignar a cada venta su precio base: es el equivalente de un BUSCARV de Excel.

Para recorrer un diccionario usarás `.keys()`, `.values()` y, sobre todo, `.items()`, que devuelve pares (clave, valor):

```python
for categoria, precio in categorias.items():
    print(f"{categoria}: {precio} €")
```

### De estructuras a tablas

Una lista de diccionarios ya es, conceptualmente, una tabla: cada diccionario es una fila y cada clave una columna.

```python
tiendas = [
    {"tienda": "Centro", "ciudad": "Sevilla", "m2": 450},
    {"tienda": "Norte",  "ciudad": "Sevilla", "m2": 300},
]
```

Y un diccionario de listas también: cada clave es una columna y cada lista sus valores. Así es como el notebook crea el DataFrame `tiendas` en la sección 3. Entender esta equivalencia te ayudará en la lección 0.6.

### Comprensiones: transformar y filtrar en una línea

Muy a menudo quieres construir una lista nueva aplicando una operación a cada elemento de otra, quizá filtrando algunos. La **comprensión de listas** lo expresa de forma compacta:

$$[\;\text{expresión}\ \ \textbf{for}\ x\ \textbf{in}\ \text{colección}\ \ \textbf{if}\ \text{condición}\;]$$

```python
precios = [10, 25, 40]
con_iva = [p * 1.21 for p in precios]                 # [12.1, 30.25, 48.4]
caros = [p for p in precios if p > 20]                # [25, 40]
precios_desc = {p: p * 0.9 for p in precios}          # comprensión de diccionario
```

Léelo en voz alta: "p por 1,21 **para cada** p **en** precios". Es equivalente a un bucle `for` con `append`, pero más legible cuando la operación es sencilla. En el notebook, `[aplicar_descuento(p, 25) for p in precios if p > 20]` aplica un 25 % de descuento solo a los productos de más de 20 € y devuelve `[18.75, 30.0]`.

Regla práctica: si la comprensión no cabe cómodamente en una línea o necesita varios `if`, escribe un bucle normal. Y cuando trabajes con miles de números, no uses ni lo uno ni lo otro: usa NumPy o pandas (lección 0.5).

### Ejemplo de negocio

El equipo comercial te pasa la lista de ventas diarias de una tienda y te pregunta qué días superaron el objetivo de 150 €. Con lo visto:

```python
dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
superan = [d for d, v in zip(dias, ventas_semana) if v > 150]
print(superan)   # ['Jue', 'Vie', 'Sáb', 'Dom']
```

(`zip` empareja elemento a elemento dos listas; lo veremos en la próxima lección.)

### Errores frecuentes

- **Error por uno (*off-by-one*)**: olvidar que los índices empiezan en 0 o que el final de una rebanada no se incluye. `ventas_semana[7]` da `IndexError`, porque el último índice es 6.
- **`KeyError`** al pedir una clave que no existe en un diccionario (¡cuidado con mayúsculas y tildes: `"Alimentacion"` ≠ `"Alimentación"`!). Usa `.get()` si la clave puede faltar.
- **Alias en lugar de copia**: `b = a` no copia la lista, crea otro nombre para la misma lista; si modificas `b`, cambia `a`. Para copiar: `b = a.copy()`.
- **Modificar una lista mientras la recorres**: produce resultados extraños; construye una lista nueva con una comprensión.

> Practica: notebook, sección 1. Calcula la media del fin de semana con una rebanada y crea un diccionario con la superficie de cada tienda.

> **Ideas clave**
> - Las listas son secuencias ordenadas, indexadas desde 0; en `[a:b]` el final no se incluye.
> - Los diccionarios guardan pares clave → valor; son perfectos como tablas de consulta (un BUSCARV).
> - Una lista de diccionarios o un diccionario de listas es ya una tabla: el paso natural es un DataFrame.
> - Las comprensiones `[f(x) for x in datos if cond]` transforman y filtran de forma legible.

---

## 0.4 Condicionales, bucles y funciones

Hasta ahora el código se ejecutaba de arriba abajo, línea a línea. Con **condicionales** decides qué se ejecuta, con **bucles** repites acciones y con **funciones** empaquetas lógica para reutilizarla. Son las tres piezas del control de flujo.

### Condicionales: `if`, `elif`, `else`

```python
ingreso = 135.0
if ingreso > 115:
    tipo = "grande"
elif ingreso > 40:
    tipo = "mediano"
else:
    tipo = "pequeño"
```

Fíjate en dos detalles de sintaxis que en Python son obligatorios: los **dos puntos** al final de la condición y la **sangría** (4 espacios) del bloque que depende de ella. En otros lenguajes la sangría es estética; en Python define la estructura del programa. Las condiciones se evalúan en orden y solo se ejecuta el primer bloque cuya condición sea verdadera.

**Ejemplo de negocio: comisiones por tramos.** Un comercial cobra un 2 % de comisión hasta 10.000 € de ventas mensuales y un 4 % por la parte que exceda esa cifra. Matemáticamente:

$$
\text{comisión}(v) =
\begin{cases}
0{,}02\,v & \text{si } v \le 10\,000 \\
200 + 0{,}04\,(v - 10\,000) & \text{si } v > 10\,000
\end{cases}
$$

### Bucles `for`: repetir para cada elemento

Un bucle `for` recorre los elementos de cualquier colección:

```python
total = 0
for v in ventas_semana:
    total += v           # equivale a total = total + v
```

Este patrón (una variable **acumuladora** que se actualiza en cada vuelta) es la base de muchos cálculos. Herramientas que hacen los bucles más claros:

- `range(n)` genera los números 0, 1, …, n−1: `for i in range(3):`.
- `enumerate(lista)` da a la vez la posición y el valor: `for i, v in enumerate(ventas_semana):`.
- `zip(a, b)` recorre dos listas en paralelo: `for dia, v in zip(dias, ventas_semana):`.
- `dic.items()` recorre un diccionario por pares (clave, valor).
- `break` sale del bucle; `continue` salta a la siguiente vuelta.

Existe también el bucle `while condición:`, que repite mientras la condición sea cierta. En análisis de datos se usa poco; asegúrate siempre de que la condición acabe siendo falsa o tendrás un bucle infinito (en Jupyter, se detiene con el botón ■ de *interrumpir*).

### Funciones: empaquetar lógica

Una **función** recibe datos (parámetros), hace algo y **devuelve** un resultado con `return`. La del notebook:

```python
def aplicar_descuento(precio, porcentaje=10):
    """Devuelve el precio tras aplicar un descuento en %."""
    return precio * (1 - porcentaje / 100)

aplicar_descuento(40)        # 36.0  (usa el 10 % por defecto)
aplicar_descuento(40, 25)    # 30.0
```

Elementos:

- `def`, el nombre, los parámetros entre paréntesis y los dos puntos.
- **Valores por defecto** (`porcentaje=10`): el parámetro es opcional.
- La **docstring** entre triples comillas: documenta qué hace. Jupyter la muestra con `Shift + Tab` o `help(aplicar_descuento)`.
- `return`: el valor que la función entrega a quien la llama.

Con lo anterior, la comisión por tramos queda así:

```python
def comision(ventas, umbral=10_000, tasa_baja=0.02, tasa_alta=0.04):
    """Comisión mensual por tramos."""
    if ventas <= umbral:
        return tasa_baja * ventas
    return tasa_baja * umbral + tasa_alta * (ventas - umbral)

[comision(v) for v in [8_000, 10_000, 15_000]]   # [160.0, 200.0, 400.0]
```

¿Por qué escribir funciones? Porque si la política de comisiones cambia, la modificas **en un solo sitio**; porque el nombre documenta la intención; y porque puedes **probarla** con casos conocidos (8.000 € → 160 €) antes de aplicarla a todos los comerciales. Una regla útil: si copias y pegas el mismo bloque de código tres veces, conviértelo en función.

Las variables creadas dentro de una función son **locales**: no existen fuera de ella. Es una ventaja: la función no "ensucia" tu notebook.

### Funciones anónimas (`lambda`)

Para funciones de una línea que solo usas una vez existe `lambda`: `lambda d: d["ingreso"] / d["m2"]` es una función que recibe `d` y devuelve ese cociente. La verás en la sección 5 del notebook dentro de `.assign(...)`. No la necesitas para empezar, pero conviene reconocerla.

### Un aviso para el resto del módulo

Los bucles son fundamentales para entender la programación, pero **en análisis de datos casi nunca recorrerás una tabla fila a fila**. NumPy y pandas aplican operaciones a columnas enteras de una vez (vectorización), lo que es mucho más rápido y legible. Aprende los bucles para entender qué hacen esas librerías por debajo y para tareas como recorrer ficheros o meses, no para multiplicar columnas.

### Errores frecuentes

- **`IndentationError`**: mezclar tabuladores y espacios o desalinear un bloque. Usa siempre 4 espacios (Jupyter y VS Code lo hacen por ti).
- **Olvidar `return`**: la función imprime algo pero devuelve `None`, y luego `None * 2` falla. `print` muestra; `return` entrega.
- **Olvidar los paréntesis al llamar**: `aplicar_descuento` (sin paréntesis) es la función en sí, no su resultado.
- **Orden de los `elif`**: si pones `if ingreso > 40` antes que `if ingreso > 115`, ningún ticket será "grande". Ordena de la condición más restrictiva a la menos.
- **Valores por defecto mutables** (`def f(x, lista=[])`): la lista se comparte entre llamadas. Usa `None` y créala dentro.

> Practica: notebook, sección 1 (segunda celda). Escribe una función `clasificar_ticket(ingreso)` con tres tramos y aplícala a una lista de importes con una comprensión.

> **Ideas clave**
> - En Python, la sangría y los dos puntos definen los bloques de `if`, `for` y `def`.
> - `for` recorre colecciones; `enumerate`, `zip` y `.items()` hacen los bucles más claros.
> - Las funciones encapsulan reglas de negocio: se cambian en un solo sitio y se pueden probar con casos conocidos.
> - `print` muestra, `return` devuelve: una función sin `return` devuelve `None`.
> - Con tablas de datos, prefiere operaciones vectorizadas a bucles fila a fila.

---

## 0.5 NumPy: arrays y vectorización

### El problema: las listas no son vectores

Prueba esto: `[1, 2, 3] * 2`. El resultado es `[1, 2, 3, 1, 2, 3]`: la lista se repite, no se multiplica. Y `[1, 2] + [3, 4]` da `[1, 2, 3, 4]`. Las listas son contenedores genéricos (pueden mezclar textos, números y otras listas), así que Python no sabe hacer aritmética con ellas. Para operar con miles de números necesitas otra estructura: el **array** de NumPy.

### El `ndarray`

```python
import numpy as np
v = np.array([120, 135, 98, 160, 210, 250, 190])
v * 1.21          # multiplica cada elemento: IVA aplicado a toda la semana
v + 10            # suma 10 a cada elemento
v / v.sum()       # cuota de cada día sobre el total
```

Un array es una colección de elementos **del mismo tipo** (todos enteros o todos decimales), guardados de forma compacta en memoria. Esa homogeneidad permite que las operaciones se ejecuten en código compilado (C), sin el coste de interpretar Python elemento a elemento. A esto se le llama **vectorización**: escribes la operación sobre el array completo y NumPy hace el bucle por ti, muy rápido.

¿Cuánto más rápido? Multiplicar por 2 un millón de números con una comprensión de listas tarda unas decenas de milisegundos; con NumPy, menos de un milisegundo: del orden de **50 a 100 veces menos** en un portátil normal (el factor exacto depende de la máquina). Con operaciones más complejas y más datos, la diferencia crece. Y el código, además, es más corto y se parece a la fórmula matemática.

Propiedades útiles: `v.shape` (dimensiones), `v.dtype` (tipo de los elementos), `v.ndim` (número de ejes). Para crear arrays: `np.arange(0, 10, 2)`, `np.zeros(5)`, `np.linspace(0, 1, 11)`.

### Agregaciones y estadísticos

```python
v.mean(), v.std(), v.min(), v.max(), v.sum()
v.argmax()        # posición del máximo: 5 (sábado)
```

La **desviación típica** mide cuánto se alejan, en promedio, los valores de su media:

$$s = \sqrt{\frac{1}{n - \text{ddof}}\sum_{i=1}^{n}(x_i - \bar{x})^2}$$

Ojo a un detalle que confunde a todo el mundo: NumPy usa por defecto `ddof=0` (divide entre $n$, desviación "poblacional") y pandas usa `ddof=1` (divide entre $n-1$, desviación "muestral"). Para la semana del notebook, `v.std()` da **49,7** y `pd.Series(v).std()` da **53,7**. Ninguno está mal; son definiciones distintas. En el módulo 01 verás por qué se divide entre $n-1$ al estimar a partir de una muestra.

En arrays de dos dimensiones (filas × columnas), el argumento `axis` indica en qué dirección agregar: `M.sum(axis=0)` suma cada columna (colapsa las filas) y `M.sum(axis=1)` suma cada fila.

### Máscaras booleanas: filtrar sin bucles

Una comparación sobre un array devuelve otro array de `True`/`False` del mismo tamaño, llamado **máscara**:

```python
v > v.mean()              # [False, False, False, False, True, True, True]
(v > v.mean()).sum()      # 3 días por encima de la media
v[v > v.mean()]           # array([210, 250, 190])
(v > v.mean()).mean()     # 0.43: proporción de días por encima de la media
```

Este patrón (crear una condición, usarla para contar, filtrar o calcular proporciones) es, literalmente, la misma idea que usarás en pandas para filtrar tablas. Domínalo aquí. Para combinar condiciones se usan `&` (y), `|` (o) y `~` (no), con **paréntesis** alrededor de cada condición: `v[(v > 100) & (v < 200)]`.

Otra función clave es `np.where(condición, valor_si, valor_no)`, un "SI()" vectorizado. El notebook la usa para que las ventas en promoción tengan un 40 % más de unidades esperadas y un 15 % menos de precio: `np.where(ventas["promocion"], 0.85, 1)`.

### Crecimiento porcentual

`np.diff(v)` calcula las diferencias entre elementos consecutivos ($v_t - v_{t-1}$). Dividiendo entre el valor anterior obtenemos la tasa de crecimiento diaria:

$$g_t = \frac{v_t - v_{t-1}}{v_{t-1}} \times 100$$

```python
(np.diff(v) / v[:-1] * 100).round(1)
# [ 12.5 -27.4  63.3  31.2  19.  -24. ]
```

`v[:-1]` es el array sin su último elemento, de modo que ambos lados tienen 6 valores y se dividen elemento a elemento. Del miércoles al jueves las ventas suben un 63,3 %.

### Números aleatorios y reproducibilidad

La sección 3 del notebook **simula** un año de ventas con el generador aleatorio de NumPy:

```python
rng = np.random.default_rng(42)       # 42 es la semilla
rng.choice(["A", "B"], 5, p=[0.3, 0.7])   # elegir con probabilidades
rng.poisson(2, 5)                     # conteos (unidades por ticket)
rng.normal(1, 0.1, 5)                 # ruido alrededor de 1
```

La **semilla** hace que los números "aleatorios" sean siempre los mismos: así tus resultados coinciden con los de tus compañeros y con los del vídeo. Simular datos es muy útil para aprender y para probar un análisis antes de tener los datos reales.

### Ejemplo de negocio

Tienes los precios de 10.000 productos y Dirección quiere saber cuántos superarían los 50 € si se sube un 3 % la tarifa. Con NumPy es una línea: `((precios * 1.03) > 50).sum()`. Sin bucles, sin errores de índice y en milisegundos.

### Errores frecuentes

- **Usar listas para hacer cuentas** (`lista * 2` repite la lista).
- **`and`/`or` con arrays**: `(v > 100) and (v < 200)` da `ValueError: The truth value of an array... is ambiguous`. Usa `&` y `|` con paréntesis.
- **Olvidar los paréntesis** en `v > 100 & v < 200`: `&` tiene más prioridad que `>`, así que se evalúa `100 & v` primero.
- **`ddof`**: comparar una desviación típica de NumPy con otra de pandas o Excel (`DESVEST` usa $n-1$) y creer que hay un error.
- **Tamaños incompatibles**: sumar arrays de 7 y 6 elementos da `ValueError: operands could not be broadcast together`.

> Practica: notebook, sección 2. Calcula también qué día tuvo la mayor caída y la proporción de días con crecimiento positivo.

> **Ideas clave**
> - Un array de NumPy es homogéneo y permite operar con todos sus elementos a la vez (vectorización): más rápido y más legible.
> - Las máscaras booleanas sirven para contar (`.sum()`), filtrar (`v[mask]`) y calcular proporciones (`.mean()`).
> - Combina condiciones con `&`, `|`, `~` y paréntesis, nunca con `and`/`or`.
> - NumPy calcula la desviación típica con `ddof=0` y pandas con `ddof=1`.
> - Fija la semilla (`default_rng(42)`) para que las simulaciones sean reproducibles.

---

## 0.6 pandas I: Series, DataFrame, selección y filtrado

### Las dos estructuras de pandas

pandas añade a NumPy lo que le falta para trabajar con datos reales: **etiquetas** (nombres de filas y columnas) y columnas de **tipos distintos** (fechas, textos, números, booleanos) en la misma tabla.

- Una **Series** es una columna: un array de valores más un **índice** que etiqueta cada valor.
- Un **DataFrame** es una tabla: un conjunto de Series que comparten el mismo índice. Cada columna tiene un único tipo, pero columnas distintas pueden tener tipos distintos.

```python
import pandas as pd
tiendas = pd.DataFrame({
    "tienda_id": [1, 2, 3, 4, 5],
    "tienda": ["Centro", "Norte", "Sur", "Puerto", "Aeropuerto"],
    "ciudad": ["Sevilla", "Sevilla", "Cádiz", "Cádiz", "Málaga"],
    "m2": [450, 300, 380, 220, 150],
})
```

Es el diccionario de listas de la lección 0.3 convertido en tabla.

### Cargar datos

En un proyecto real casi nunca escribirás los datos a mano: los leerás de un fichero o una base de datos.

```python
ventas = pd.read_csv("ventas.csv")                       # CSV estándar
ventas = pd.read_csv("ventas.csv", sep=";", decimal=",", # CSV "a la española"
                     encoding="latin-1", parse_dates=["fecha"])
ventas = pd.read_excel("ventas.xlsx", sheet_name="2025")
```

Los ficheros exportados desde Excel con configuración regional española suelen usar **punto y coma** como separador y **coma decimal**; si no lo indicas, pandas leerá una sola columna o tratará los importes como texto. El notebook simula los datos para no depender de ficheros externos (sección 3), pero el resto del análisis sería idéntico con datos leídos de un CSV.

### Primer vistazo

Antes de analizar, explora. Cinco instrucciones que deberías ejecutar siempre:

| Instrucción | Qué te dice |
|---|---|
| `df.head()` / `df.tail()` | Las primeras/últimas filas: ¿se ha leído bien? |
| `df.shape` | (filas, columnas) |
| `df.info()` | Tipo de cada columna y cuántos valores no nulos tiene |
| `df.describe()` | Estadísticos de las columnas numéricas (media, cuartiles, mín., máx.) |
| `df["col"].value_counts()` | Frecuencia de cada categoría |

En la sección 4 del notebook, `ventas.info()` muestra 20.080 filas y revela que `precio_unitario` tiene solo 19.930 valores no nulos: faltan 150 precios. Eso lo resolveremos en la lección 0.7.

### Seleccionar columnas

- Una columna: `ventas["unidades"]` devuelve una Series.
- Varias columnas: `ventas[["fecha", "unidades"]]` (doble corchete: le pasas una **lista** de nombres) devuelve un DataFrame.

También existe `ventas.unidades`, pero falla si el nombre tiene espacios o coincide con un método, así que es mejor acostumbrarse a los corchetes.

### `loc` e `iloc`: seleccionar filas y columnas

- `df.loc[filas, columnas]` selecciona por **etiquetas**: nombres del índice y de las columnas. En rangos, el final **sí** se incluye.
- `df.iloc[filas, columnas]` selecciona por **posición** numérica, como en las listas: empieza en 0 y el final **no** se incluye.

```python
tiendas.loc[0, "tienda"]                 # 'Centro' (fila con etiqueta 0)
tiendas.loc[0:2, ["tienda", "m2"]]       # filas con etiqueta 0, 1 y 2
tiendas.iloc[0:2, 1:3]                   # posiciones 0-1 y columnas 1-2
tiendas.iloc[-1]                         # última fila
```

Cuando el índice es 0, 1, 2… parecen intercambiables, pero no lo son. Ejemplo real del notebook: tras concatenar las filas duplicadas (`pd.concat`), el índice tiene etiquetas repetidas (`Index: 20080 entries, 0 to 3198`). Ahí `ventas.loc[5]` puede devolver **dos** filas, mientras que `ventas.iloc[5]` devuelve siempre la sexta. Si el índice deja de tener sentido, `df.reset_index(drop=True)` lo regenera.

### Filtrar filas con condiciones

Es la misma idea de las máscaras de NumPy: una condición sobre una columna produce una Series de `True`/`False`, y al pasarla entre corchetes se quedan las filas verdaderas.

```python
ventas[ventas["promocion"]]                                  # tickets en promoción
ventas[ventas["unidades"] >= 5]
ventas[(ventas["categoria"] == "Ropa") & (ventas["promocion"])]
ventas[ventas["tienda_id"].isin([1, 2])]                    # tiendas de Sevilla
ventas.loc[ventas["unidades"] >= 5, ["fecha", "unidades"]]  # filas y columnas a la vez
```

Para combinar condiciones: `&` (y), `|` (o), `~` (no), cada condición entre paréntesis. Una alternativa legible es `ventas.query("unidades >= 5 and promocion")`.

### Crear y ordenar columnas

Las columnas nuevas se calculan de forma vectorizada, sin bucles:

```python
ventas["ingreso"] = ventas["unidades"] * ventas["precio_unitario"]
ventas.sort_values("ingreso", ascending=False).head(10)     # 10 mayores tickets
```

La primera línea es la respuesta a la pregunta 2 de la autoevaluación: multiplica 20.000 pares de valores en una sola operación compilada. Un bucle `for` fila a fila haría lo mismo decenas de veces más despacio y con más riesgo de errores.

### Ejemplo de negocio

El responsable de la tienda Aeropuerto quiere la lista de tickets de Electrónica superiores a 150 € en verano para revisar si hubo errores de caja. Con lo visto: filtrar por tienda (`tienda_id == 5`), por categoría, por importe y por mes (`fecha.dt.month.isin([6, 7, 8])`) y ordenar por importe. Lo que en una hoja de cálculo serían cuatro filtros manuales aquí es una instrucción que se puede repetir cada trimestre.

### Errores frecuentes

- **`and`/`or` en lugar de `&`/`|`** o **olvidar los paréntesis**: `ValueError: The truth value of a Series is ambiguous`.
- **`KeyError: 'Categoria'`**: los nombres de columna distinguen mayúsculas, tildes y espacios. Revisa `df.columns`.
- **Asignación encadenada**: `ventas[ventas["promocion"]]["precio_unitario"] = 0` no modifica `ventas` (en pandas 2 da un aviso `SettingWithCopyWarning`; en pandas 3 simplemente no tiene efecto). Usa `ventas.loc[ventas["promocion"], "precio_unitario"] = 0`.
- **Confundir `loc` e `iloc`**, sobre todo tras filtrar u ordenar, cuando las etiquetas del índice ya no coinciden con las posiciones.
- **Leer mal un CSV** (una sola columna o importes como texto) por no indicar `sep` y `decimal`.

> Practica: notebook, secciones 3 y 4. Filtra los tickets de Electrónica en promoción y cuenta cuántos hay; repite con `query`.

> **Ideas clave**
> - Una Series es una columna con índice; un DataFrame, una tabla de Series que comparten índice.
> - Explora siempre con `head`, `shape`, `info`, `describe` y `value_counts` antes de analizar.
> - `loc` selecciona por etiquetas (final incluido); `iloc`, por posición (final excluido).
> - Filtra con máscaras booleanas y `&`, `|`, `~` entre paréntesis; modifica con `df.loc[máscara, columna] = valor`.
> - Las columnas nuevas se calculan de forma vectorizada, nunca fila a fila.

---

## 0.7 pandas II: limpieza (nulos, duplicados, tipos, fechas)

Se suele decir que el 80 % del trabajo de un analista es preparar los datos. Exagerado o no, un análisis con datos sucios produce conclusiones falsas con total seguridad aparente. Esta lección cubre los cuatro problemas más comunes y cómo tratarlos de forma **explícita y documentada**.

### 1. Diagnóstico antes que tratamiento

```python
ventas.info()                    # tipos y no nulos
ventas.isna().sum()              # nulos por columna
ventas.duplicated().sum()        # filas exactamente repetidas
ventas.describe()                # mínimos/máximos imposibles (¿precios negativos?)
ventas["ciudad"].value_counts()  # categorías mal escritas ("Sevilla", "sevilla ", "SEVILLA")
```

En la sección 4 del notebook, el diagnóstico encuentra **150 nulos** en `precio_unitario` y **87 filas duplicadas** entre las 20.080 filas.

### 2. Duplicados

`df.drop_duplicates()` elimina las filas idénticas en todas las columnas (conserva la primera aparición). Con `subset=["id_ticket"]` se consideran duplicadas las filas que repiten solo esas columnas.

Aquí hay una lección sutil. El notebook introduce **80** duplicados a propósito (`ventas.sample(80)`), pero `duplicated()` encuentra **87**. Las 7 restantes son ventas distintas que, por casualidad, coinciden en todo: misma fecha, tienda, categoría, unidades y precio. En este caso no podemos distinguirlas de un duplicado real porque **no hay un identificador de ticket**. En datos reales, pide siempre una clave única (número de ticket, id de pedido) y deduplica por ella; si no existe, documenta el supuesto que haces.

Elimina duplicados **antes** de imputar o agregar: si no, las filas repetidas pesan doble en medias, medianas y totales.

### 3. Valores nulos

pandas representa los valores ausentes como `NaN` (o `NaT` en fechas, `pd.NA` en algunos tipos). Las funciones de agregación los ignoran por defecto (`mean()` calcula la media de los no nulos), pero las operaciones aritméticas los propagan: `3 * NaN` es `NaN`. Por eso, si no tratas los 150 precios ausentes, 150 tickets tendrán ingreso nulo.

Antes de elegir un tratamiento, pregúntate **por qué faltan**. Si faltan al azar (un fallo puntual del lector de códigos), casi cualquier método razonable sirve. Si faltan por un motivo relacionado con el valor (por ejemplo, los productos más caros se registran a mano y se olvidan más), cualquier tratamiento sencillo introducirá **sesgo**.

| Estrategia | Código | Riesgo |
|---|---|---|
| Eliminar filas | `df.dropna(subset=["precio_unitario"])` | Pierdes información y sesgas si los nulos no son aleatorios |
| Imputar con una constante global | `fillna(df["precio_unitario"].median())` | Ignora diferencias entre grupos (un precio de Bebidas imputado con la mediana global) |
| Imputar con la mediana **de su grupo** | `fillna(df.groupby("categoria")["precio_unitario"].transform("median"))` | Reduce artificialmente la variabilidad |
| Marcar y luego imputar | `df["precio_imputado"] = df["precio_unitario"].isna()` | Ninguno grave: permite comprobar después si los imputados se comportan distinto |

El notebook usa la tercera opción: cada precio ausente se sustituye por la mediana de su categoría (unos 58 € en Electrónica, 5 € en Bebidas). Usamos la **mediana** y no la media porque es robusta a valores extremos. `transform("median")` calcula la mediana de cada categoría y la devuelve **repetida en cada fila**, con el mismo tamaño que la columna original, que es justo lo que necesita `fillna` (lo verás en detalle en la lección 0.8).

Lo que **no** debes hacer: `fillna(0)` en un precio. Un precio cero no es "no sabemos": es un regalo, y hundiría el ingreso medio.

### 4. Tipos de datos

Un tipo incorrecto es un error silencioso: una columna de importes leída como texto no se puede sumar, y una fecha como texto no se puede ordenar cronológicamente.

```python
df["importe"] = pd.to_numeric(df["importe"].str.replace(",", "."), errors="coerce")
df["tienda_id"] = df["tienda_id"].astype(int)
df["categoria"] = df["categoria"].astype("category")   # ahorra memoria con pocas categorías
df["ciudad"] = df["ciudad"].str.strip().str.title()     # normalizar texto
```

`errors="coerce"` convierte en `NaN` lo que no se pueda interpretar como número, en lugar de fallar; después conviene contar cuántos `NaN` nuevos han aparecido y revisar por qué.

### 5. Fechas

Las fechas merecen un tratamiento especial porque permiten responder a preguntas temporales. Primero se convierten al tipo `datetime64`:

```python
df["fecha"] = pd.to_datetime(df["fecha"], format="%d/%m/%Y")   # 03/04/2025 = 3 de abril
```

Indica el formato o `dayfirst=True`: por defecto, una fecha como `03/04/2025` podría interpretarse al estilo estadounidense (4 de marzo). Una vez convertida, el accesor `.dt` da acceso a sus componentes:

| Código | Resultado |
|---|---|
| `fecha.dt.year`, `.dt.month`, `.dt.day` | Año, mes, día |
| `fecha.dt.dayofweek` | Día de la semana (0 = lunes) |
| `fecha.dt.day_name()` | Nombre del día (en inglés por defecto) |
| `fecha.dt.to_period("M")` | Mes como periodo (`2025-03`), ideal para agrupar |
| `fecha.dt.dayofyear` | Día del año (1–365) |

El notebook usa `dt.dayofyear` para simular la estacionalidad y `dt.to_period("M")` para crear la columna `mes`. Para crear rangos de fechas: `pd.date_range("2025-01-01", "2025-12-31", freq="D")`.

### El resultado en TiendaSur

Tras eliminar duplicados, imputar y crear `ingreso` y `mes`, la tabla queda con **19.993 filas y 0 nulos**. Es buena práctica terminar la limpieza con una línea de verificación como la del notebook (`print("Filas tras limpiar:", ...)`): si un día los datos cambian, lo verás de inmediato.

### Ejemplo de negocio

Recibes un export del CRM con 50.000 clientes: fechas de alta en tres formatos, la provincia escrita de cinco maneras, un 4 % de teléfonos vacíos y clientes repetidos con el mismo DNI. El plan: deduplicar por DNI (quedándote con el registro más reciente), normalizar la provincia con `.str.strip().str.title()` y un diccionario de equivalencias, convertir fechas con `errors="coerce"` y revisar las que fallan, y dejar los teléfonos vacíos como nulos con una columna indicadora (no se pueden "imputar").

### Errores frecuentes

- Limpiar **sin diagnosticar** primero, o sin contar cuántas filas se pierden en cada paso.
- **Imputar antes de deduplicar**: los duplicados distorsionan las medianas.
- `fillna(0)` en variables donde cero tiene significado.
- Fechas ambiguas día/mes por no indicar el formato.
- Olvidar que `df.dropna()` sin `subset` elimina la fila si **cualquier** columna es nula.
- No documentar las decisiones: quien lea tu análisis debe saber qué imputaste y por qué.

> Practica: notebook, sección 4. Antes de imputar, comprueba en qué categorías están los 150 nulos y crea una columna indicadora `precio_imputado`.

> **Ideas clave**
> - Diagnostica (`info`, `isna().sum()`, `duplicated().sum()`, `describe`, `value_counts`) antes de tocar nada.
> - Deduplica por una clave única cuando exista, y siempre antes de imputar o agregar.
> - Cada tratamiento de nulos tiene un riesgo: eliminar puede sesgar, imputar reduce la variabilidad; marca lo imputado.
> - Convierte tipos explícitamente (`to_numeric`, `to_datetime` con formato) y usa el accesor `.dt` para trabajar con fechas.

---

## 0.8 pandas III: `groupby`, tablas dinámicas y `merge`

Con los datos limpios llega la parte que interesa a Dirección: **resumir**. ¿Cuánto ingresa cada tienda? ¿Qué categoría pesa más en cada ciudad? ¿Funcionan las promociones? Tres herramientas resuelven el 90 % de estas preguntas: `groupby`, `pivot_table` y `merge`.

### `groupby`: dividir, aplicar, combinar

`groupby` sigue el esquema **dividir–aplicar–combinar** (*split–apply–combine*): divide la tabla en grupos según una o varias columnas, aplica una función a cada grupo y combina los resultados en una tabla nueva.

```python
ventas.groupby("tienda_id")["ingreso"].sum()                 # una fila por tienda
ventas.groupby(["tienda_id", "categoria"])["ingreso"].sum()  # una fila por combinación
ventas.groupby("promocion")[["unidades", "precio_unitario", "ingreso"]].mean()
```

Para calcular varias métricas con nombres claros, usa la **agregación con nombre**:

```python
ventas.groupby("categoria").agg(
    ingreso_total=("ingreso", "sum"),
    tickets=("ingreso", "size"),
    ticket_medio=("ingreso", "mean"),
)
```

Funciones habituales: `sum`, `mean`, `median`, `count` (no nulos), `size` (filas), `min`, `max`, `std`, `nunique` (valores distintos). Con `as_index=False` el resultado conserva la columna de agrupación como columna normal (cómodo para después combinar o graficar).

### `agg` frente a `transform`

Es la pregunta 4 de la autoevaluación y una de las ideas más útiles del módulo:

- `groupby(...).sum()` (o `.agg`) **reduce**: devuelve una fila por grupo.
- `groupby(...).transform("sum")` **difunde**: devuelve una Series del mismo tamaño que la tabla original, con el resultado del grupo repetido en cada fila.

`transform` es lo que necesitas para comparar cada fila con su grupo. Por ejemplo, la **cuota** de cada categoría $j$ dentro de la ciudad $i$:

$$\text{cuota}_{ij} = \frac{\text{ingreso}_{ij}}{\sum_{k}\text{ingreso}_{ik}} \times 100$$

```python
t = ventas_t.groupby(["ciudad", "categoria"], as_index=False)["ingreso"].sum()
t["cuota"] = 100 * t["ingreso"] / t.groupby("ciudad")["ingreso"].transform("sum")
```

Es justo el ejercicio 2 del notebook. Ya usaste `transform("median")` en la lección anterior para imputar.

### Tablas dinámicas: `pivot_table`

Una tabla dinámica es un `groupby` por dos variables presentado en formato ancho: una en filas y otra en columnas.

```python
pd.pivot_table(ventas_t, index="categoria", columns="tienda",
               values="ingreso", aggfunc="sum", fill_value=0, margins=True)
```

`margins=True` añade totales por fila y columna. Para frecuencias o proporciones, `pd.crosstab(a, b, normalize="index")` es un atajo cómodo. En la sección 5 del notebook, la tabla dinámica muestra que Electrónica es la categoría con más ingreso en todas las tiendas (por ejemplo, 107.278 € en Centro).

### Combinar tablas: `merge`

Los datos útiles casi nunca están en una sola tabla. Las ventas tienen `tienda_id`, pero la ciudad y los m² están en la tabla `tiendas`. `merge` las une por una **clave** común, como un BUSCARV o un JOIN de SQL:

```python
ventas_t = ventas.merge(tiendas, on="tienda_id", how="left", validate="many_to_one")
```

| `how` | Qué filas conserva |
|---|---|
| `"inner"` (por defecto) | Solo las claves presentes en ambas tablas |
| `"left"` | Todas las de la izquierda; `NaN` si no hay pareja |
| `"right"` | Todas las de la derecha |
| `"outer"` | Todas las de ambas |

Dos salvaguardas que te ahorrarán disgustos: `validate="many_to_one"` lanza un error si la tabla de la derecha tiene claves repetidas (lo que **multiplicaría filas** sin avisar), e `indicator=True` añade una columna que dice de qué tabla viene cada fila. Y después de un merge, **comprueba siempre el número de filas**: aquí debe seguir siendo 19.993. Para apilar tablas con las mismas columnas (por ejemplo, ventas de enero y febrero) se usa `pd.concat([df1, df2])`.

### Encadenar operaciones

El notebook responde a "¿qué tienda ingresa más, y por m²?" con una cadena de métodos que se lee de arriba abajo:

```python
por_tienda = (
    ventas.groupby("tienda_id", as_index=False)["ingreso"].sum()
    .merge(tiendas, on="tienda_id")
    .assign(ingreso_m2=lambda d: d["ingreso"] / d["m2"])
    .sort_values("ingreso", ascending=False)
)
```

Agrupar, añadir información de la tienda, calcular una columna nueva y ordenar. El resultado es una lección de negocio: **Centro** es la tienda que más ingresa (≈287.500 €), pero **Aeropuerto**, la que menos (≈143.800 €), es la más productiva por metro cuadrado (≈959 €/m² frente a ≈639 €/m² de Centro). La métrica que eliges cambia la respuesta: el total habla de tamaño; el ratio, de eficiencia.

### Las promociones: un primer vistazo con cautela

```python
ventas.groupby("promocion")[["unidades", "precio_unitario", "ingreso"]].mean()
```

| promoción | unidades | precio_unitario | ingreso |
|---|---|---|---|
| False | 3,01 | 16,09 | 48,80 |
| True | 3,84 | 13,58 | 51,78 |

En promoción se venden más unidades por ticket y el precio medio es menor; el ingreso medio por ticket sube algo (≈ +6 %). ¿Significa que la promoción "funciona"? Todavía no lo sabemos: podría ser ruido, y el precio medio también depende de qué categorías estaban en promoción (efecto mezcla). Formalizaremos esta pregunta con intervalos de confianza (módulo 01) y pruebas de hipótesis (módulo 04).

### Errores frecuentes

- **Merge que multiplica filas** por claves duplicadas en la tabla de consulta. Usa `validate` y comprueba `len()` antes y después.
- **Merge que pierde filas** (inner por defecto) cuando hay claves sin pareja, o porque la clave es `int` en una tabla y `str` en otra.
- **Media de medias**: la media de los ingresos medios de cada tienda no es el ingreso medio de la cadena si las tiendas tienen distinto número de tickets.
- **Agrupar columnas no numéricas** con `sum` o `mean` (selecciona antes las columnas: `groupby(...)[["ingreso"]]`).
- **Confundir `count` y `size`**: `count` ignora nulos; `size` cuenta filas.

> Practica: notebook, sección 5, y ejercicios 2 y 3.

> **Ideas clave**
> - `groupby` divide, aplica y combina; con `agg` y nombres claros calculas varias métricas a la vez.
> - `agg`/`sum` devuelve una fila por grupo; `transform` devuelve una fila por registro (ideal para cuotas e imputación por grupo).
> - `pivot_table` y `crosstab` presentan resúmenes cruzados; `margins=True` añade totales.
> - `merge` une tablas por una clave: elige `how`, usa `validate` y comprueba el número de filas.
> - El total y el ratio (por m², por ticket) responden a preguntas distintas: elige la métrica según la decisión.

---

## 0.9 Visualización: qué gráfico usar para cada pregunta

Un buen gráfico responde **una pregunta** en pocos segundos. Antes de escribir código, formula la pregunta: ¿quiero **comparar** categorías, ver una **evolución**, entender una **distribución**, buscar una **relación** o mostrar una **composición**? La respuesta casi decide el tipo de gráfico.

### De la pregunta al gráfico

| Pregunta | Gráfico | Ejemplo en TiendaSur | Código |
|---|---|---|---|
| Comparar categorías | Barras (horizontales si los nombres son largos) | Ingreso por tienda | `sns.barplot`, `df.plot(kind="bar")` |
| Evolución en el tiempo | Líneas | Ingreso mensual | `serie.plot()`, `sns.lineplot` |
| Distribución de una variable | Histograma, boxplot | Ingreso por ticket | `sns.histplot`, `sns.boxplot` |
| Relación entre dos variables numéricas | Dispersión | m² frente a ingreso | `sns.scatterplot` |
| Composición (partes de un todo) | Barras apiladas al 100 % | Mix de categorías por ciudad | `df.plot(kind="barh", stacked=True)` |
| Dos categorías cruzadas | Mapa de calor | Ingreso categoría × tienda | `sns.heatmap` |

Esta es la respuesta a la pregunta 5 de la autoevaluación: **barras** para comparar el ingreso de 5 tiendas y **líneas** para su evolución mensual. Las líneas sugieren continuidad y orden, por eso no tienen sentido entre categorías sin orden como las tiendas. Las tartas solo funcionan con 2–3 partes muy distintas; con más, el ojo compara mal los ángulos y unas barras son siempre más claras.

### Anatomía de un gráfico en matplotlib

matplotlib organiza los gráficos en una **figura** (`Figure`, el lienzo completo) que contiene uno o varios **ejes** (`Axes`, cada gráfico individual con sus ejes x e y). El patrón recomendado es crear ambos explícitamente:

```python
fig, axes = plt.subplots(1, 2, figsize=(13, 4))     # 1 fila, 2 gráficos
mensual.plot(ax=axes[0], marker="o")
axes[0].set(title="Ingresos mensuales", xlabel="", ylabel="€")
sns.barplot(data=por_tienda, x="tienda", y="ingreso_m2", ax=axes[1], color="steelblue")
axes[1].set(title="Ingreso por m² y tienda", ylabel="€/m²")
plt.tight_layout()
plt.show()
```

Es el código de la sección 6 del notebook. Fíjate en el argumento `ax=`: le dice a pandas y a seaborn en qué eje dibujar. pandas tiene su propio atajo `.plot()` (útil para series temporales) y seaborn ofrece funciones estadísticas que trabajan directamente con DataFrames (`data=`, `x=`, `y=`, `hue=`). Para guardar un gráfico en un informe: `fig.savefig("ingresos.png", dpi=150, bbox_inches="tight")`.

### El boxplot, explicado

El diagrama de caja resume una distribución en cinco números. La caja va del primer cuartil $Q_1$ (25 % de los datos por debajo) al tercero $Q_3$ (75 %); la línea interior es la mediana; la altura de la caja es el **rango intercuartílico** $\text{IQR} = Q_3 - Q_1$; y los bigotes se extienden hasta el último dato dentro de $[Q_1 - 1{,}5\,\text{IQR},\; Q_3 + 1{,}5\,\text{IQR}]$. Los puntos fuera de ese rango se dibujan sueltos como posibles atípicos (el notebook los oculta con `showfliers=False` para centrarse en la caja).

En el último gráfico del notebook, `sns.boxplot(data=ventas, x="categoria", y="ingreso", hue="promocion")` compara la distribución del ingreso por ticket de cada categoría con y sin promoción. `hue` añade una tercera variable con color: es la forma más sencilla de comparar subgrupos.

### Principios de un gráfico claro

1. **El título cuenta la conclusión**, no solo describe: "Aeropuerto es la tienda más productiva por m²" mejor que "Ingreso por m²".
2. **Ordena las barras** de mayor a menor (salvo que haya un orden natural, como los meses).
3. **Las barras empiezan en cero.** Un eje truncado exagera diferencias pequeñas; en líneas, sí es aceptable no empezar en cero.
4. **Etiqueta ejes con unidades** (€, %, €/m²) y elimina lo que no aporte (rejillas recargadas, 3D, leyendas obvias).
5. **Usa el color con intención**: un color neutro para todo y un color de acento para lo que quieres destacar.
6. **Compara lo comparable**: tiendas de distinto tamaño se comparan mejor con ratios (por m²) o índices (100 = media de la tienda).

### Ejemplo de negocio

Dirección pregunta en qué tienda abrir una sección de Electrónica más grande (ejercicio 5). Un gráfico de barras del ingreso total de Electrónica por tienda haría ganar siempre a Centro, simplemente por ser la más grande. La pregunta es de **espacio**, así que la métrica adecuada es el ingreso de Electrónica **por m²**, en barras ordenadas, con la tienda ganadora resaltada y una línea con la media de la cadena como referencia. El gráfico correcto no es el más bonito: es el que responde a la decisión.

### Errores frecuentes

- **`sns.barplot` promedia**: si le pasas una tabla con muchas filas por categoría, dibuja la **media** (con una barra de error), no la suma. Para totales, agrega antes con `groupby` (como hace el notebook con `por_tienda`) o usa `estimator="sum"`.
- **Líneas entre categorías** sin orden, o barras para 365 días (usa líneas).
- **Eje y truncado** en gráficos de barras.
- **Demasiadas categorías o colores**: agrupa las pequeñas en "Otros".
- **Gráficos sin título ni unidades**, que obligan a adivinar qué se mide.
- Olvidar `plt.show()` o `plt.tight_layout()` y obtener etiquetas cortadas o superpuestas.

> Practica: notebook, sección 6, y ejercicios 1, 3 y 5.

> **Ideas clave**
> - Formula la pregunta antes de elegir el gráfico: comparar → barras; evolución → líneas; distribución → histograma o boxplot; relación → dispersión; composición → barras apiladas.
> - En matplotlib, una figura contiene ejes; crea ambos con `plt.subplots` y dibuja con `ax=`.
> - El boxplot muestra mediana, cuartiles e IQR; `hue` compara subgrupos.
> - Títulos con la conclusión, barras ordenadas desde cero, unidades en los ejes y color con intención.
> - La métrica del gráfico debe responder a la decisión (totales frente a ratios).

---

## Glosario

| Término | Inglés | Definición breve |
|---|---|---|
| Array | *array* (*ndarray*) | Colección homogénea de números de NumPy que admite operaciones vectorizadas. |
| Celda | *cell* | Bloque de un notebook que contiene código o texto (Markdown) y se ejecuta de forma independiente. |
| Comprensión de listas | *list comprehension* | Sintaxis `[expr for x in datos if cond]` para crear una lista transformando y filtrando otra. |
| DataFrame | *DataFrame* | Tabla de pandas formada por columnas (Series) que comparten un índice. |
| Diccionario | *dictionary* | Estructura de pares clave → valor. |
| Duplicado | *duplicate* | Fila repetida, en todas las columnas o en una clave. |
| Entorno virtual | *virtual environment* | Carpeta con un Python y librerías propios, aislada del resto del sistema. |
| Función | *function* | Bloque de código con nombre que recibe parámetros y devuelve un resultado (`return`). |
| Imputación | *imputation* | Sustituir valores ausentes por estimaciones (por ejemplo, la mediana del grupo). |
| Índice | *index* | Etiquetas de las filas de una Series o DataFrame. |
| Kernel | *kernel* | Proceso de Python que ejecuta las celdas de un notebook y guarda su estado. |
| Máscara booleana | *boolean mask* | Array o Series de `True`/`False` que se usa para filtrar. |
| Notebook | *notebook* | Documento interactivo que combina texto, código y resultados (Jupyter, Colab). |
| Tabla dinámica | *pivot table* | Resumen cruzado de una métrica según dos variables (filas y columnas). |
| Unión de tablas | *merge / join* | Combinar dos tablas a partir de una clave común. |
| Valor nulo | *missing value* (`NaN`) | Dato ausente. |
| Vectorización | *vectorization* | Aplicar una operación a todos los elementos de un array o columna a la vez, sin bucles explícitos. |
| Agrupar-aplicar-combinar | *split-apply-combine* | Esquema de `groupby`: dividir en grupos, calcular en cada uno y unir los resultados. |
| Rango intercuartílico | *interquartile range* (IQR) | Diferencia entre el tercer y el primer cuartil; mide la dispersión del 50 % central. |
| Semilla | *seed* | Número que fija la secuencia de un generador aleatorio para obtener resultados reproducibles. |
