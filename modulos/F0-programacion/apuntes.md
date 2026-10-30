# Módulo F0 · Fundamentos de programación — Apuntes

> Objetivo: entender los conceptos que comparten casi todos los lenguajes. La sintaxis se olvida y se busca; los conceptos se quedan.

Los ejemplos usan cuatro lenguajes. No hace falta memorizarlos: compáralos para ver qué es lo común. Los programas completos están en [`ejemplos/`](ejemplos/) y dan la misma salida en los cuatro.

---

## F0.1 · Qué es programar

Un **programa** es una lista de instrucciones que el ordenador ejecuta en orden. Casi todo se reduce a cuatro operaciones: guardar datos, calcular, decidir y repetir.

**Compilado o interpretado.** Un lenguaje compilado (C++) se traduce entero a código máquina antes de ejecutarse. Uno interpretado (Python) se ejecuta a medida que se lee. Java y JavaScript están en medio: Java compila a un formato intermedio que ejecuta una máquina virtual, y los navegadores compilan JavaScript sobre la marcha.

| | Compilado | Interpretado |
|---|---|---|
| Detecta errores | Muchos antes de ejecutar | Al llegar a esa línea |
| Velocidad | Suele ser mayor | Suele ser menor |
| Ciclo de prueba | Compilar y ejecutar | Ejecutar directamente |

**Tipado estático o dinámico.** En Java y C++ cada variable declara su tipo y no puede cambiarlo; el compilador te avisa si te equivocas. En Python y JavaScript el tipo va con el valor, no con la variable: escribes menos, pero algunos errores solo aparecen al ejecutar. **TypeScript** añade tipos estáticos a JavaScript precisamente por eso.

**Trazar** es seguir un programa a mano apuntando el valor de cada variable después de cada línea. Es la habilidad más útil para un principiante y la que más se usa en las entrevistas.

---

## F0.2 · Variables, tipos y operadores

Una **variable** es un nombre que apunta a un valor.

```python
# Python
precio = 12.5
unidades = 3
total = precio * unidades
```

```javascript
// JavaScript
const precio = 12.5;
const unidades = 3;
const total = precio * unidades;
```

```java
// Java
double precio = 12.5;
int unidades = 3;
double total = precio * unidades;
```

```cpp
// C++
double precio = 12.5;
int unidades = 3;
double total = precio * unidades;
```

**Tipos básicos**

| Concepto | Python | JavaScript | Java | C++ |
|---|---|---|---|---|
| Entero | `int` | `number` | `int`, `long` | `int`, `long` |
| Decimal | `float` | `number` | `double` | `double` |
| Texto | `str` | `string` | `String` | `std::string` |
| Verdadero/falso | `bool` (`True`) | `boolean` (`true`) | `boolean` (`true`) | `bool` (`true`) |
| Sin valor | `None` | `null`, `undefined` | `null` | `nullptr` |

**Tres trampas que se repiten**
- **División entera:** en Java y C++, `7 / 2` da `3` porque ambos son enteros. En Python y JavaScript da `3.5`. En Python, `7 // 2` da `3`.
- **Decimales inexactos:** `0.1 + 0.2` da `0.30000000000000004` en los cuatro lenguajes, porque los decimales se guardan en binario. Nunca compares decimales con `==` ni guardes dinero como decimal: usa céntimos enteros o un tipo decimal.
- **Asignar no es comparar:** `=` guarda un valor y `==` compara. En JavaScript usa siempre `===`, porque `==` convierte tipos: `"1" == 1` es verdadero.

---

## F0.3 · Condicionales y lógica booleana

Un programa decide con `if`. Lo que cambia entre lenguajes es la puntuación.

```python
# Python: la sangría delimita el bloque
if importe > 50:
    envio = 0
elif importe > 20:
    envio = 2
else:
    envio = 4
```

```javascript
// JavaScript, Java y C++ usan llaves; la condición va entre paréntesis
if (importe > 50) {
  envio = 0;
} else if (importe > 20) {
  envio = 2;
} else {
  envio = 4;
}
```

| Lógica | Python | JavaScript, Java y C++ |
|---|---|---|
| Y | `and` | `&&` |
| O | `or` | `\|\|` |
| No | `not` | `!` |

**Evaluación en cortocircuito.** En `a and b`, si `a` es falso, `b` ni se evalúa. Por eso `lista and lista[0] > 3` es seguro con una lista vacía: se usa continuamente para evitar errores.

**El orden importa.** En una cadena de `if`, se ejecuta solo la primera rama verdadera. Si pones `importe > 20` antes que `importe > 50`, la segunda nunca se alcanza.

---

## F0.4 · Bucles

Un bucle repite un bloque. Hay dos preguntas: ¿recorro una colección o repito hasta que algo cambie?

```python
# Python
total = 0
for importe in importes:     # recorrer una colección
    total += importe

i = 0
while i < 3:                 # repetir mientras se cumpla la condición
    i += 1
```

```javascript
// JavaScript
let total = 0;
for (const importe of importes) {
  total += importe;
}
```

```java
// Java
double total = 0;
for (double importe : importes) {
    total += importe;
}
```

```cpp
// C++
double total = 0;
for (double importe : importes) {
    total += importe;
}
```

**El bucle clásico con índice**, que verás en todo código en Java, JavaScript o C++:

```java
for (int i = 0; i < n; i++) {   // inicio; condición; avance
    // i vale 0, 1, ..., n-1
}
```

**Errores típicos**
- **Uno de más o de menos** (*off-by-one*): los índices empiezan en 0, así que el último de una colección de `n` elementos es `n - 1`. Comprueba siempre el primer y el último caso a mano.
- **Bucle infinito:** en un `while`, algo tiene que acercar la condición a ser falsa.
- **Modificar una lista mientras la recorres:** produce resultados inesperados. Crea una lista nueva.

`break` sale del bucle y `continue` salta a la siguiente vuelta.

---

## F0.5 · Funciones

Una **función** es un bloque con nombre que recibe entradas (**parámetros**) y devuelve una salida (**retorno**). Sirve para no repetir código y para poder pensar en una cosa cada vez.

```python
# Python
def media(importes):
    if not importes:
        return 0.0
    return sum(importes) / len(importes)
```

```javascript
// JavaScript
function media(importes) {
  if (importes.length === 0) {
    return 0;
  }
  let suma = 0;
  for (const importe of importes) {
    suma += importe;
  }
  return suma / importes.length;
}
```

```java
// Java: se declaran los tipos de la entrada y de la salida
static double media(double[] importes) {
    if (importes.length == 0) {
        return 0.0;
    }
    double suma = 0.0;
    for (double importe : importes) {
        suma += importe;
    }
    return suma / importes.length;
}
```

```cpp
// C++
double media(const std::vector<double>& importes) {
    if (importes.empty()) {
        return 0.0;
    }
    double suma = 0.0;
    for (double importe : importes) {
        suma += importe;
    }
    return suma / importes.size();
}
```

**Tres ideas**
- **`return` frente a `print`:** imprimir enseña un valor a una persona; devolver se lo entrega al resto del programa. Si tu función imprime en lugar de devolver, no puedes usar su resultado.
- **Ámbito:** una variable creada dentro de una función no existe fuera.
- **Funciones puras:** si solo dependen de sus entradas y no cambian nada fuera, son fáciles de probar. Un buen nombre (`calcular_iva`) y una sola responsabilidad valen más que un comentario.

**Valor o referencia.** Los números se copian al pasarlos a una función, pero las listas suelen compartirse: si una función modifica la lista que recibe, el cambio se ve fuera. C++ lo hace explícito con `&`.

---

## F0.6 · Colecciones: listas y diccionarios

Son las dos estructuras que resuelven la mayoría de los problemas.

**Lista (*array*):** elementos en orden, accesibles por posición.

| Operación | Python | JavaScript | Java (`ArrayList`) | C++ (`vector`) |
|---|---|---|---|---|
| Crear | `v = [1, 2]` | `const v = [1, 2];` | `new ArrayList<>(List.of(1, 2))` | `std::vector<int> v{1, 2};` |
| Leer | `v[0]` | `v[0]` | `v.get(0)` | `v[0]` |
| Añadir | `v.append(3)` | `v.push(3)` | `v.add(3)` | `v.push_back(3)` |
| Tamaño | `len(v)` | `v.length` | `v.size()` | `v.size()` |

**Diccionario (*map*, tabla hash):** pares clave → valor. Se busca por clave, no por posición.

| Operación | Python | JavaScript | Java (`HashMap`) | C++ (`unordered_map`) |
|---|---|---|---|---|
| Crear | `d = {}` | `const d = new Map();` | `new HashMap<>()` | `std::unordered_map<K, V> d;` |
| Guardar | `d["te"] = 3` | `d.set("te", 3)` | `d.put("te", 3)` | `d["te"] = 3;` |
| Leer | `d["te"]` | `d.get("te")` | `d.get("te")` | `d["te"]` |
| ¿Existe? | `"te" in d` | `d.has("te")` | `d.containsKey("te")` | `d.count("te") > 0` |

En JavaScript también se usan objetos simples (`{}`) como diccionario, como en `ejemplos/ventas.js`.

**Cuál elegir**

| Tu pregunta | Estructura |
|---|---|
| ¿Qué hay en la posición 3? ¿En qué orden llegaron? | Lista |
| ¿Cuánto vale esta clave? ¿Ya he visto este elemento? | Diccionario (o conjunto) |

**El coste importa.** Buscar en una lista de un millón de elementos puede requerir mirarlos todos; en un diccionario, casi siempre un solo paso. Se escribe **O(n)** frente a **O(1)**, y es la base de las preguntas de entrevista (módulo EP1).

---

## F0.7 · Errores y depuración

Hay tres tipos de error:

| Tipo | Cuándo aparece | Ejemplo |
|---|---|---|
| **Sintaxis** | Antes de ejecutar | Falta un paréntesis |
| **Ejecución** | Con el programa en marcha | División entre cero, índice inexistente |
| **Lógica** | Nunca avisa: el resultado es incorrecto | Usar `>` en lugar de `>=` |

Los de lógica son los peores, y por eso se escriben **pruebas** (módulo I8).

**Cómo leer un error.** Empieza por el final: dice el tipo y el motivo. Después busca la primera línea de **tu** código en el rastro (*traceback*). Solo entonces piensa en la causa.

**Capturar errores previsibles**

```python
# Python
try:
    media = total / unidades
except ZeroDivisionError:
    media = 0
```

```javascript
// JavaScript: dividir entre cero NO lanza error, da Infinity
try {
  const datos = JSON.parse(texto);
} catch (error) {
  console.log("JSON no válido:", error.message);
}
```

Java y C++ usan el mismo patrón `try`/`catch`. Captura solo lo que sepas resolver: un `except` general esconde errores reales.

**Método de depuración**
1. **Reproduce** el fallo con el caso más pequeño posible.
2. **Formula una hipótesis:** «creo que `total` ya está mal aquí».
3. **Compruébala** con un `print` o un depurador. Cambia una sola cosa cada vez.
4. **Arregla la causa**, no el síntoma, y añade una prueba para que no vuelva.

---

## F0.8 · Cómo aprender un lenguaje nuevo

Ya sabes el 80 %. Para un lenguaje nuevo, busca respuesta a esta lista:

1. ¿Cómo imprimo, declaro una variable y escribo una función?
2. ¿Compilado o interpretado? ¿Tipado estático o dinámico?
3. ¿Cómo son sus listas y diccionarios?
4. ¿Cómo gestiona los errores y cómo se escriben las pruebas?
5. ¿Cómo se instalan dependencias?

Después traduce un programa pequeño que ya conozcas, como `ejemplos/ventas.py`. Los asistentes de IA ayudan mucho en este paso, si les pides que expliquen las diferencias y no solo la traducción.

**Cuál elegir.** Depende del trabajo que quieras, no de los rankings:

| Quiero trabajar en | Empieza por |
|---|---|
| Datos e IA | Python + SQL |
| Web | JavaScript + TypeScript |
| Empresa, banca, backend | Java o C# |
| Sistemas, videojuegos, alto rendimiento | C++ o Rust |

Mira las ofertas de tu ciudad: una tarde de búsqueda vale más que cualquier ranking. Las clasificaciones cambian según lo que midan: en datos de 2025-2026, JavaScript lidera la encuesta de Stack Overflow, TypeScript es el más usado en GitHub y Python encabeza el índice TIOBE.

---

## Glosario

- **Compilador / intérprete:** traduce el programa antes de ejecutarlo / lo ejecuta a medida que lo lee.
- **Tipado estático / dinámico:** el tipo se comprueba antes de ejecutar / durante la ejecución.
- **Trazar:** seguir un programa a mano anotando sus variables.
- **Parámetro / argumento:** nombre de la entrada al definir la función / valor real al llamarla.
- **Ámbito (*scope*):** zona del programa donde existe una variable.
- **Rastro (*traceback*, *stack trace*):** lista de llamadas activas cuando ocurrió el error.
- **O(n):** forma de expresar cómo crece el trabajo con el tamaño de los datos.
