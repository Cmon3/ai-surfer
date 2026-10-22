---
marp: true
theme: default
paginate: true
math: mathjax
title: Módulo 00 · Fundamentos de Python para datos
---

<!-- _class: lead -->

# Módulo 00
## Fundamentos de Python para datos

Ciencia de Datos e IA Aplicada: de los datos a las decisiones

Semanas 0–1 · Caso práctico: *TiendaSur*

---

## Qué vas a aprender

- Escribir Python: variables, listas, diccionarios, condicionales, bucles y funciones
- Operar con arrays de NumPy sin bucles
- Cargar, limpiar, agrupar y combinar tablas con pandas
- Elegir y crear el gráfico adecuado para cada pregunta

**Caso:** 5 tiendas, 1 año de ventas, 20.000 tickets.
¿Qué tiendas, categorías y meses ingresan más? ¿Funcionan las promociones?

---

<!-- _class: lead -->

# 0.1
## Por qué Python para datos; Jupyter y Google Colab

---

<!-- 0.1-1 -->
## Del Excel al código

| Límite de la hoja de cálculo | Lo que aporta Python |
|---|---|
| Informe rehecho a mano cada mes | **Reproducible**: se vuelve a ejecutar |
| Lento con cientos de miles de filas | **Escala**: millones de filas |
| Una herramienta por tarea | **Un ecosistema**: limpieza, estadística, ML, IA |

> Dos horas de consolidación cada lunes → dos minutos con "Ejecutar todo"

---

<!-- 0.1-2 -->
## El ecosistema que usarás

| Librería | Para qué | Analogía |
|---|---|---|
| NumPy | Cálculo numérico | La calculadora rápida |
| pandas | Tablas | Excel + SQL |
| matplotlib | Gráficos | El lienzo |
| seaborn | Gráficos estadísticos | Plantillas sobre matplotlib |

Todo lo que viene después (scikit-learn, statsmodels, PyTorch…) se apoya en NumPy y pandas.

---

<!-- 0.1-3 -->
## Qué es un notebook

- Documento con **celdas de texto** (Markdown) y **celdas de código**
- El resultado aparece justo debajo: número, tabla o gráfico
- Cuenta una historia: explicación → código → resultado → conclusión

Atajos: `Shift + Enter` ejecutar · `Esc + A/B` nueva celda · `Esc + M/Y` texto/código

---

<!-- 0.1-4 -->
## El kernel recuerda… y manda el orden

```text
[1] precio = 10        [3] precio = 20
[2] print(precio)  →  muestra 10 ... o 20 si ejecutaste [3] antes
```

- El kernel es el Python que ejecuta las celdas y **guarda las variables**
- Cuenta el **orden de ejecución** (`[n]`), no el orden en pantalla
- Reiniciar = olvidar todo
- Antes de entregar: **Reiniciar y ejecutar todo**

---

<!-- 0.1-5 -->
## Opción A · Google Colab (sin instalar nada)

1. Entra en `colab.research.google.com`
2. *Archivo → Abrir cuaderno → GitHub* (o *Subir cuaderno*)
3. **Archivo → Guardar una copia en Drive**
4. Ejecuta la celda de `import`
5. Si algo falla: *Entorno de ejecución → Reiniciar sesión* + *Ejecutar todo*

**Atención:** La máquina es temporal: los ficheros subidos se borran. No subas datos confidenciales.

---

<!-- 0.1-6 -->
## Opción B · En tu ordenador

```bash
python -m venv .venv              # entorno aislado
source .venv/bin/activate         # Windows: .venv\Scripts\activate
pip install -r requirements.txt
jupyter lab
```

- Alternativa sencilla: **Anaconda** (Navigator)
- Editor: **VS Code** + extensiones *Python* y *Jupyter* → *Select Kernel* `.venv`

---

<!-- 0.1-7 -->
## Comprueba tu instalación

```python
import sys, numpy as np, pandas as pd
print(sys.version)
print("NumPy", np.__version__, "| pandas", pd.__version__)
```

| Error | Causa habitual |
|---|---|
| `NameError` | Celda anterior sin ejecutar / kernel reiniciado |
| `ModuleNotFoundError` | Librería en otro entorno distinto del kernel |

---

<!-- 0.1-8 -->
## Ideas clave · 0.1

- Python = reproducibilidad + escala + un solo ecosistema
- Notebook: texto + código + resultados; el kernel guarda el estado
- Colab: cero instalación (guarda copia en Drive)
- Local: entorno virtual o Anaconda
- **Reinicia y ejecuta todo** antes de entregar

---

<!-- _class: lead -->

# 0.2
## Tipos, variables y operadores

---

<!-- 0.2-1 -->
## Variables: etiquetas para valores

```python
precio = 19.99          # float
unidades = 3            # int
producto = "Café"       # str
en_oferta = True        # bool
```

- `=` **asigna**; no significa "es igual"
- *snake_case* y nombres que expliquen: `ventas_semana`, no `x`
- Distingue mayúsculas; mejor sin tildes

---

<!-- 0.2-2 -->
## Los tipos básicos

| Tipo | Ejemplo | Uso en datos |
|---|---|---|
| `int` | `20_000` | Conteos, ids |
| `float` | `19.99` | Importes, % |
| `str` | `"Sevilla"` | Categorías |
| `bool` | `True` | Indicadores |
| `None` | `None` | Sin valor |

Conversión: `int("3")` · `float("19.99")` · `str(450)`

---

<!-- 0.2-3 -->
## Operadores aritméticos

| Operador | Ejemplo | Resultado |
|---|---|---|
| `/` | `7 / 2` | `3.5` (siempre decimal) |
| `//` | `7 // 2` | `3` |
| `%` | `7 % 2` | `1` |
| `**` | `1.05 ** 3` | `1.157625` |

Ante la duda: **paréntesis**

---

<!-- 0.2-4 -->
## Ejemplo: precio final

$$p_{\text{final}} = p\,(1-d)\,(1+t)$$

```python
p, d, t = 25.0, 0.15, 0.21
p_final = p * (1 - d) * (1 + t)
print(f"Precio final: {p_final:.2f} €")   # 25.71 €
```

Escribir la regla en código obliga a ser explícito

---

<!-- 0.2-5 -->
## Cuidado con los decimales

```python
0.1 + 0.2            # 0.30000000000000004
0.1 + 0.2 == 0.3     # False
import math
math.isclose(0.1 + 0.2, 0.3)   # True
```

- Para **mostrar**: `round(x, 2)` o `f"{x:.2f}"`
- Para **comparar**: tolerancia, nunca `==`

---

<!-- 0.2-6 -->
## Comparaciones y lógica

```python
es_caro = precio > 40
aplica = es_caro and not en_oferta
```

- `==  !=  <  <=  >  >=` devuelven `bool`
- `and`, `or`, `not`
- **`True` vale 1**: sumar booleanos = contar; su media = proporción

$$\text{media}(\text{promocion}) \approx 0{,}20 \Rightarrow 20\,\%\ \text{de tickets en promoción}$$

---

<!-- 0.2-7 -->
## Texto, f-strings y errores típicos

```python
print(f"{unidades} x {producto} = {total:.2f} €")   # 3 x Café = 59.97 €
" Sevilla ".strip()   ·   "19,99".replace(",", ".")
```

| Error | Causa |
|---|---|
| `SyntaxError` en `if x = 10` | `=` en lugar de `==` |
| `TypeError` en `"Total: " + 59.97` | Texto + número |
| `ValueError` en `float("19,99")` | Coma decimal |

---

<!-- 0.2-8 -->
## Ideas clave · 0.2

- `=` asigna, `==` compara
- Tipos: `int`, `float`, `str`, `bool`, `None`; los ficheros traen texto
- `/` da decimal; redondea al mostrar, compara con tolerancia
- `True` = 1 → la media de una condición es una proporción
- f-strings para mostrar resultados

---

<!-- _class: lead -->

# 0.3
## Listas, diccionarios y comprensiones

---

<!-- 0.3-1 -->
## Listas: secuencias ordenadas

```python
ventas_semana = [120, 135, 98, 160, 210, 250, 190]   # lun → dom
len(ventas_semana)                        # 7
sum(ventas_semana) / len(ventas_semana)   # 166.14
ventas_semana.append(175)                 # son mutables
```

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$

---

<!-- 0.3-2 -->
## Índices y rebanadas

```text
valor   120  135   98  160  210  250  190
índice    0    1    2    3    4    5    6
         -7   -6   -5   -4   -3   -2   -1
```

- `ventas_semana[0]` → 120 · `ventas_semana[-1]` → 190
- `ventas_semana[0:5]` → lunes a viernes (**el final no se incluye**)
- `ventas_semana[5:]` → fin de semana

---

<!-- 0.3-3 -->
## Diccionarios: clave → valor

```python
tienda = {"nombre": "Centro", "ciudad": "Sevilla", "m2": 450}
tienda["ciudad"]                      # 'Sevilla'
tienda.get("telefono", "sin dato")    # sin KeyError
for clave, valor in tienda.items():
    print(clave, valor)
```

Tabla de consulta (un BUSCARV):
`categorias = {"Alimentación": 8, "Bebidas": 5, ...}`

---

<!-- 0.3-4 -->
## De estructuras a tablas

| Estructura | Equivale a |
|---|---|
| Lista de diccionarios | Cada diccionario = una **fila** |
| Diccionario de listas | Cada clave = una **columna** |

```python
{"tienda": ["Centro", "Norte"], "m2": [450, 300]}
```

→ es exactamente cómo se crea un DataFrame (lección 0.6)

---

<!-- 0.3-5 -->
## Comprensiones

$$[\ \text{expresión}\ \ \textbf{for}\ x\ \textbf{in}\ \text{colección}\ \ \textbf{if}\ \text{condición}\ ]$$

```python
precios = [10, 25, 40]
[p * 1.21 for p in precios]            # [12.1, 30.25, 48.4]
[p for p in precios if p > 20]         # [25, 40]
{p: p * 0.9 for p in precios}          # diccionario
```

Si no cabe en una línea → bucle normal

---

<!-- 0.3-6 -->
## Ejemplo: días que superan el objetivo

```python
dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
[d for d, v in zip(dias, ventas_semana) if v > 150]
# ['Jue', 'Vie', 'Sáb', 'Dom']
```

---

<!-- 0.3-7 -->
## Errores frecuentes

| Síntoma | Causa |
|---|---|
| `IndexError` con `lista[7]` | Índices de 0 a 6 |
| `KeyError: 'Alimentacion'` | Falta la tilde |
| Cambia `a` al tocar `b` | `b = a` es un alias → `a.copy()` |
| Resultados raros | Modificar la lista mientras se recorre |

---

<!-- 0.3-8 -->
## Ideas clave · 0.3

- Listas: ordenadas, índices desde 0, `[a:b]` excluye `b`
- Diccionarios: clave → valor, tablas de consulta
- Lista de diccionarios / diccionario de listas = tabla
- Comprensiones para transformar y filtrar con claridad

---

<!-- _class: lead -->

# 0.4
## Condicionales, bucles y funciones

---

<!-- 0.4-1 -->
## Condicionales

```python
if ingreso > 115:
    tipo = "grande"
elif ingreso > 40:
    tipo = "mediano"
else:
    tipo = "pequeño"
```

- **Dos puntos** y **sangría de 4 espacios**: obligatorios
- Se ejecuta solo el **primer** bloque verdadero → ordena de más a menos restrictivo

---

<!-- 0.4-2 -->
## Ejemplo: comisiones por tramos

$$
\text{comisión}(v) =
\begin{cases}
0{,}02\,v & v \le 10\,000 \\
200 + 0{,}04\,(v - 10\,000) & v > 10\,000
\end{cases}
$$

| Ventas | Comisión |
|---|---|
| 8.000 € | 160 € |
| 10.000 € | 200 € |
| 15.000 € | 400 € |

---

<!-- 0.4-3 -->
## Bucles `for`

```python
total = 0
for v in ventas_semana:
    total += v
```

| Herramienta | Uso |
|---|---|
| `range(n)` | 0, 1, …, n−1 |
| `enumerate(lista)` | posición y valor |
| `zip(a, b)` | dos listas en paralelo |
| `dic.items()` | pares clave, valor |
| `break` / `continue` | salir / saltar vuelta |

---

<!-- 0.4-4 -->
## Anatomía de una función

```python
def aplicar_descuento(precio, porcentaje=10):
    """Devuelve el precio tras aplicar un descuento en %."""
    return precio * (1 - porcentaje / 100)

aplicar_descuento(40)       # 36.0
aplicar_descuento(40, 25)   # 30.0
```

`def` · parámetros · valor por defecto · docstring · `return`

---

<!-- 0.4-5 -->
## La regla de negocio, en una función

```python
def comision(ventas, umbral=10_000, tasa_baja=0.02, tasa_alta=0.04):
    """Comisión mensual por tramos."""
    if ventas <= umbral:
        return tasa_baja * ventas
    return tasa_baja * umbral + tasa_alta * (ventas - umbral)

[comision(v) for v in [8_000, 10_000, 15_000]]   # [160.0, 200.0, 400.0]
```

- Se cambia en **un solo sitio** · se **prueba** con casos conocidos

---

<!-- 0.4-6 -->
## `lambda` y un aviso importante

```python
lambda d: d["ingreso"] / d["m2"]     # función anónima de una línea
```

- La verás en `.assign(...)` (sección 5 del notebook)

**Atención:** Con tablas de datos **no recorras filas con `for`**:
usa operaciones vectorizadas (NumPy, pandas)

---

<!-- 0.4-7 -->
## Errores frecuentes

| Síntoma | Causa |
|---|---|
| `IndentationError` | Sangría inconsistente |
| La función devuelve `None` | Falta `return` (`print` ≠ `return`) |
| `<function ...>` en vez del resultado | Faltan los paréntesis al llamar |
| Ningún ticket es "grande" | `elif` en mal orden |

---

<!-- 0.4-8 -->
## Ideas clave · 0.4

- Sangría y dos puntos definen los bloques
- `for` + `enumerate`, `zip`, `.items()`
- Funciones = reglas de negocio reutilizables y comprobables
- `print` muestra, `return` devuelve
- Con datos tabulares: vectoriza

---

<!-- _class: lead -->

# 0.5
## NumPy: arrays y vectorización

---

<!-- 0.5-1 -->
## Las listas no son vectores

```python
[1, 2, 3] * 2        # [1, 2, 3, 1, 2, 3]   ← repite
[1, 2] + [3, 4]      # [1, 2, 3, 4]         ← concatena

import numpy as np
np.array([1, 2, 3]) * 2    # array([2, 4, 6])  ← multiplica
```

---

<!-- 0.5-2 -->
## El `ndarray` y la vectorización

```python
v = np.array([120, 135, 98, 160, 210, 250, 190])
v * 1.21          # IVA a toda la semana
v / v.sum()       # cuota de cada día
v.shape, v.dtype  # (7,), int64
```

- Elementos **del mismo tipo**, guardados de forma compacta
- La operación se aplica a todo el array en código compilado

---

<!-- 0.5-3 -->
## ¿Cuánto más rápido?

| Multiplicar 1 millón de números por 2 | Tiempo aprox. |
|---|---|
| Comprensión de listas | decenas de ms |
| NumPy `a * 2` | < 1 ms |

**≈ 50–100 veces más rápido** (depende del equipo)
… y el código se parece a la fórmula

---

<!-- 0.5-4 -->
## Agregaciones y `ddof`

$$s = \sqrt{\frac{1}{n - \text{ddof}}\sum_{i=1}^{n}(x_i - \bar{x})^2}$$

| | Por defecto | Semana del notebook |
|---|---|---|
| `v.std()` (NumPy) | `ddof=0` | 49,7 |
| `pd.Series(v).std()` | `ddof=1` | 53,7 |

`axis=0` → por columnas · `axis=1` → por filas

---

<!-- 0.5-5 -->
## Máscaras booleanas

```python
v > v.mean()             # [F, F, F, F, T, T, T]
(v > v.mean()).sum()     # 3   → contar
v[v > v.mean()]          # [210, 250, 190] → filtrar
(v > v.mean()).mean()    # 0.43 → proporción
v[(v > 100) & (v < 200)] # & | ~ con paréntesis
```

`np.where(cond, si, no)` = un "SI()" vectorizado

---

<!-- 0.5-6 -->
## Crecimiento porcentual

$$g_t = \frac{v_t - v_{t-1}}{v_{t-1}} \times 100$$

```python
(np.diff(v) / v[:-1] * 100).round(1)
# [ 12.5 -27.4  63.3  31.2  19.  -24. ]
```

`v[:-1]`: todos menos el último → ambos lados con 6 valores

---

<!-- 0.5-7 -->
## Aleatorios reproducibles

```python
rng = np.random.default_rng(42)           # semilla
rng.choice(["A", "B"], 5, p=[0.3, 0.7])   # elegir con probabilidades
rng.poisson(2, 5)                         # conteos
rng.normal(1, 0.1, 5)                     # ruido
```

- Misma semilla → mismos datos para todos
- Así se simula un año de TiendaSur (sección 3)

---

<!-- 0.5-8 -->
## Errores frecuentes

| Síntoma | Causa |
|---|---|
| `lista * 2` repite | Usar listas para cálculos |
| `ValueError: truth value ... ambiguous` | `and`/`or` con arrays |
| Resultado absurdo en `v > 100 & v < 200` | Faltan paréntesis |
| "Mi desviación no coincide" | `ddof` distinto |
| `operands could not be broadcast` | Tamaños incompatibles |

---

<!-- 0.5-9 -->
## Ideas clave · 0.5

- Arrays homogéneos + vectorización = rápido y legible
- Máscaras: contar, filtrar, proporciones
- `&`, `|`, `~` con paréntesis
- NumPy `ddof=0`, pandas `ddof=1`
- Semilla para reproducibilidad

---

<!-- _class: lead -->

# 0.6
## pandas I: Series, DataFrame, selección y filtrado

---

<!-- 0.6-1 -->
## Series y DataFrame

```text
         Series                      DataFrame
índice  valor          índice  tienda   ciudad   m2
  0     450              0     Centro   Sevilla  450
  1     300              1     Norte    Sevilla  300
  2     380              2     Sur      Cádiz    380
```

- **Series**: valores + índice (una columna)
- **DataFrame**: columnas (Series) que comparten índice; cada una con su tipo

---

<!-- 0.6-2 -->
## Cargar datos

```python
pd.read_csv("ventas.csv")
pd.read_csv("ventas.csv", sep=";", decimal=",",
            encoding="latin-1", parse_dates=["fecha"])
pd.read_excel("ventas.xlsx", sheet_name="2025")
```

**Atención:** Exportaciones de Excel en español: `;` como separador y coma decimal

---

<!-- 0.6-3 -->
## Primer vistazo (siempre)

| Instrucción | Responde a |
|---|---|
| `head()` | ¿Se ha leído bien? |
| `shape` | ¿Cuántas filas y columnas? |
| `info()` | ¿Tipos? ¿Nulos? |
| `describe()` | ¿Valores imposibles? |
| `value_counts()` | ¿Categorías raras? |

TiendaSur: 20.080 filas; `precio_unitario` con 19.930 no nulos

---

<!-- 0.6-4 -->
## Seleccionar columnas

```python
ventas["unidades"]                # Series
ventas[["fecha", "unidades"]]     # DataFrame (lista de nombres)
```

- Doble corchete = **lista** de columnas
- Mejor `df["col"]` que `df.col`

---

<!-- 0.6-5 -->
## `loc` frente a `iloc`

| | `loc` | `iloc` |
|---|---|---|
| Selecciona por | **Etiquetas** | **Posición** |
| Rango `0:2` | Incluye el 2 | Excluye el 2 |
| Ejemplo | `df.loc[0, "tienda"]` | `df.iloc[-1]` |

**Atención:** Tras `concat`, el índice tiene etiquetas repetidas:
`ventas.loc[5]` puede devolver **2 filas** → `reset_index(drop=True)`

---

<!-- 0.6-6 -->
## Filtrar filas

```python
ventas[ventas["promocion"]]
ventas[(ventas["categoria"] == "Ropa") & (ventas["promocion"])]
ventas[ventas["tienda_id"].isin([1, 2])]
ventas.loc[ventas["unidades"] >= 5, ["fecha", "unidades"]]
ventas.query("unidades >= 5 and promocion")
```

Misma idea que las máscaras de NumPy

---

<!-- 0.6-7 -->
## Columnas nuevas y orden

```python
ventas["ingreso"] = ventas["unidades"] * ventas["precio_unitario"]
ventas.sort_values("ingreso", ascending=False).head(10)
```

- Vectorizado: 20.000 productos en una operación
- Un bucle fila a fila: más lento y más propenso a errores

---

<!-- 0.6-8 -->
## Errores frecuentes

| Síntoma | Solución |
|---|---|
| `truth value of a Series is ambiguous` | `&` o `\|` con paréntesis |
| `KeyError: 'Categoria'` | Revisa `df.columns` |
| La asignación "no hace nada" | `df.loc[mask, "col"] = valor` |
| Una sola columna al leer CSV | `sep=";"`, `decimal=","` |

---

<!-- 0.6-9 -->
## Ideas clave · 0.6

- Series = columna con índice; DataFrame = tabla de Series
- Explora antes de analizar
- `loc` etiquetas · `iloc` posiciones
- Filtra con máscaras; modifica con `loc`
- Columnas nuevas siempre vectorizadas

---

<!-- _class: lead -->

# 0.7
## pandas II: limpieza (nulos, duplicados, tipos, fechas)

---

<!-- 0.7-1 -->
## Primero, diagnosticar

```python
ventas.info()
ventas.isna().sum()          # 150 nulos en precio_unitario
ventas.duplicated().sum()    # 87 filas duplicadas
ventas.describe()
ventas["ciudad"].value_counts()
```

Datos sucios → conclusiones falsas con aspecto de verdaderas

---

<!-- 0.7-2 -->
## Duplicados: ¿80 u 87?

- El notebook introduce **80** duplicados a propósito
- `duplicated()` encuentra **87**
- 7 son ventas distintas que coinciden en todo

> Sin **id de ticket** no se pueden distinguir. Pide siempre una clave única.

```python
ventas.drop_duplicates()                     # filas idénticas
ventas.drop_duplicates(subset=["id_ticket"]) # por clave
```

Deduplica **antes** de imputar o agregar

---

<!-- 0.7-3 -->
## Nulos: ¿por qué faltan?

- `mean()` ignora los `NaN`… pero `3 * NaN = NaN`
- Faltan **al azar** → casi cualquier método vale
- Faltan **por un motivo** ligado al valor → riesgo de **sesgo**

> Ejemplo: los productos caros se registran a mano y se olvidan más

---

<!-- 0.7-4 -->
## Estrategias para los nulos

| Estrategia | Riesgo |
|---|---|
| Eliminar filas (`dropna`) | Sesgo si no son aleatorios |
| Mediana global | Ignora diferencias entre grupos |
| **Mediana del grupo** (notebook) | Reduce la variabilidad |
| Indicador + imputación | Permite revisar después |

```python
ventas["precio_unitario"] = ventas["precio_unitario"].fillna(
    ventas.groupby("categoria")["precio_unitario"].transform("median"))
```

**Nunca** `fillna(0)` en un precio

---

<!-- 0.7-5 -->
## Tipos de datos

```python
pd.to_numeric(df["importe"].str.replace(",", "."), errors="coerce")
df["tienda_id"].astype(int)
df["categoria"].astype("category")
df["ciudad"].str.strip().str.title()     # "sevilla " → "Sevilla"
```

`errors="coerce"`: lo no convertible pasa a `NaN` → cuenta y revisa

---

<!-- 0.7-6 -->
## Fechas

```python
pd.to_datetime(df["fecha"], format="%d/%m/%Y")   # 03/04 = 3 de abril
```

| `.dt` | Resultado |
|---|---|
| `.year`, `.month` | Año, mes |
| `.dayofweek` | 0 = lunes |
| `.day_name()` | Nombre (inglés) |
| `.to_period("M")` | `2025-03` |
| `.dayofyear` | 1–365 |

---

<!-- 0.7-7 -->
## Resultado y errores frecuentes

TiendaSur tras limpiar: **19.993 filas, 0 nulos**

- Limpiar sin diagnosticar ni contar filas perdidas
- Imputar antes de deduplicar
- Fechas día/mes ambiguas
- `dropna()` sin `subset`
- No documentar las decisiones

---

<!-- 0.7-8 -->
## Ideas clave · 0.7

- Diagnóstico → tratamiento → verificación
- Deduplica por clave única y antes de imputar
- Todo tratamiento de nulos tiene un riesgo: márcalo
- Tipos explícitos; fechas con formato y `.dt`

---

<!-- _class: lead -->

# 0.8
## pandas III: `groupby`, tablas dinámicas y `merge`

---

<!-- 0.8-1 -->
## Dividir – aplicar – combinar

```text
 tienda ingreso        dividir         aplicar sum     combinar
 Centro   50     →  Centro: 50, 30  →   Centro  80  →  Centro  80
 Norte    20         Norte: 20, 40  →   Norte   60     Norte   60
 Centro   30
 Norte    40
```

```python
ventas.groupby("tienda_id")["ingreso"].sum()
```

---

<!-- 0.8-2 -->
## Varias métricas con nombre

```python
ventas.groupby("categoria").agg(
    ingreso_total=("ingreso", "sum"),
    tickets=("ingreso", "size"),
    ticket_medio=("ingreso", "mean"),
)
```

`sum` · `mean` · `median` · `count` (no nulos) · `size` (filas) · `nunique`

`as_index=False` → la clave queda como columna

---

<!-- 0.8-3 -->
## `agg` frente a `transform`

| | Devuelve |
|---|---|
| `groupby(...).sum()` | **Una fila por grupo** |
| `groupby(...).transform("sum")` | **Una fila por registro** (total repetido) |

$$\text{cuota}_{ij} = \frac{\text{ingreso}_{ij}}{\sum_k \text{ingreso}_{ik}} \times 100$$

```python
t["cuota"] = 100 * t["ingreso"] / t.groupby("ciudad")["ingreso"].transform("sum")
```

---

<!-- 0.8-4 -->
## Tablas dinámicas

```python
pd.pivot_table(ventas_t, index="categoria", columns="tienda",
               values="ingreso", aggfunc="sum", margins=True)
pd.crosstab(a, b, normalize="index")      # proporciones
```

| categoría | Centro | … | Aeropuerto |
|---|---|---|---|
| Electrónica | 107.278 | … | 54.753 |

---

<!-- 0.8-5 -->
## `merge`: unir por una clave

```python
ventas_t = ventas.merge(tiendas, on="tienda_id", how="left",
                        validate="many_to_one")
```

| `how` | Conserva |
|---|---|
| `inner` | Claves en ambas |
| `left` | Todas las de la izquierda |
| `outer` | Todas |

**Comprueba** `len()` antes y después (19.993)

---

<!-- 0.8-6 -->
## Total frente a ratio

```python
(ventas.groupby("tienda_id", as_index=False)["ingreso"].sum()
   .merge(tiendas, on="tienda_id")
   .assign(ingreso_m2=lambda d: d["ingreso"] / d["m2"])
   .sort_values("ingreso", ascending=False))
```

| Tienda | Ingreso (€) | €/m² |
|---|---|---|
| Centro | 287.486 | 639 |
| Aeropuerto | 143.831 | **959** |

---

<!-- 0.8-7 -->
## Promociones: primer vistazo

| promoción | unidades | precio | ingreso/ticket |
|---|---|---|---|
| No | 3,01 | 16,09 € | 48,80 € |
| Sí | 3,84 | 13,58 € | 51,78 € |

- Más unidades, menor precio, ingreso ≈ +6 %
- ¿Real o ruido? ¿Efecto mezcla de categorías?
- → Módulos 01 y 04

---

<!-- 0.8-8 -->
## Errores frecuentes

| Síntoma | Causa |
|---|---|
| Más filas tras el merge | Claves duplicadas en la tabla de consulta |
| Menos filas tras el merge | `inner` o tipos de clave distintos |
| Media global errónea | Media de medias |
| `count` ≠ `size` | `count` ignora nulos |

---

<!-- 0.8-9 -->
## Ideas clave · 0.8

- `groupby` = dividir, aplicar, combinar
- `agg` reduce; `transform` difunde (cuotas, imputación)
- `pivot_table` / `crosstab` para resúmenes cruzados
- `merge` con `how`, `validate` y control de filas
- Total ≠ ratio: elige la métrica según la decisión

---

<!-- _class: lead -->

# 0.9
## Visualización: qué gráfico usar para cada pregunta

---

<!-- 0.9-1 -->
## De la pregunta al gráfico

| Pregunta | Gráfico |
|---|---|
| Comparar categorías | Barras |
| Evolución temporal | Líneas |
| Distribución | Histograma / boxplot |
| Relación entre dos números | Dispersión |
| Composición | Barras apiladas al 100 % |
| Dos categorías cruzadas | Mapa de calor |

Tartas: solo con 2–3 partes muy distintas

---

<!-- 0.9-2 -->
## Anatomía en matplotlib

```text
┌──────────────── Figure ────────────────┐
│ ┌──── Axes [0] ────┐ ┌──── Axes [1] ───┐│
│ │ título, ejes x/y │ │ título, ejes x/y ││
│ └──────────────────┘ └──────────────────┘│
└────────────────────────────────────────┘
```

```python
fig, axes = plt.subplots(1, 2, figsize=(13, 4))
```

---

<!-- 0.9-3 -->
## El código de la sección 6

```python
mensual.plot(ax=axes[0], marker="o")
axes[0].set(title="Ingresos mensuales", ylabel="€")
sns.barplot(data=por_tienda, x="tienda", y="ingreso_m2",
            ax=axes[1], color="steelblue")
plt.tight_layout(); plt.show()
fig.savefig("ingresos.png", dpi=150, bbox_inches="tight")
```

`ax=` decide dónde se dibuja

---

<!-- 0.9-4 -->
## El boxplot, en cinco números

```text
   ├──────[  Q1 │ mediana │ Q3  ]──────┤     •
 bigote        caja = IQR          bigote   atípico
```

$$\text{IQR} = Q_3 - Q_1 \qquad \text{bigotes hasta } Q_1 - 1{,}5\,\text{IQR} \text{ y } Q_3 + 1{,}5\,\text{IQR}$$

`sns.boxplot(data=ventas, x="categoria", y="ingreso", hue="promocion")`

---

<!-- 0.9-5 -->
## Principios de un gráfico claro

1. Título = **conclusión**
2. Barras **ordenadas** y **desde cero**
3. Ejes con **unidades**
4. Un color neutro + un **color de acento**
5. Comparar lo comparable: **ratios** o **índices**
6. Fuera 3D y adornos

---

<!-- 0.9-6 -->
## Ejemplo: ¿dónde ampliar Electrónica?

| Métrica | Gana | Problema |
|---|---|---|
| Ingreso total de Electrónica | Centro | Solo refleja el tamaño |
| **Ingreso de Electrónica por m²** | Aeropuerto | Responde a la decisión de espacio |

→ Barras ordenadas, ganadora resaltada, línea con la media de la cadena

---

<!-- 0.9-7 -->
## Errores frecuentes

| Error | Solución |
|---|---|
| `sns.barplot` muestra la **media** | Agrega antes o `estimator="sum"` |
| Líneas entre categorías | Barras |
| Eje truncado en barras | Empieza en 0 |
| 12 colores, 12 categorías | Agrupa en "Otros" |
| Sin título ni unidades | `ax.set(...)` |

---

<!-- 0.9-8 -->
## Ideas clave · 0.9

- La pregunta decide el gráfico
- Figure contiene Axes; dibuja con `ax=`
- Boxplot: mediana, cuartiles, IQR; `hue` para subgrupos
- Título con la conclusión, barras ordenadas desde 0
- La métrica debe responder a la decisión

---

<!-- _class: lead -->

# ¡A practicar!

Notebook del módulo · 5 ejercicios para Dirección
Código + resultado + **una frase de conclusión**

Próximo módulo: **01 · Estadística para la toma de decisiones**
