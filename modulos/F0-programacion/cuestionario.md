# Módulo F0 · Fundamentos de programación — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 15 min.

---

**1.** ¿Qué describe mejor el tipado estático?
- a) Las variables no pueden cambiar de valor.
- b) El tipo de cada variable se conoce y se comprueba antes de ejecutar el programa.
- c) El programa siempre es más corto.
- d) Solo existe en lenguajes interpretados.

**2.** En Java, `int a = 7; int b = 2; double c = a / b;`. ¿Cuánto vale `c`?
- a) 3.5
- b) 4.0
- c) 3.0
- d) Da un error de compilación.

**3.** ¿Por qué no debes guardar precios como decimales binarios (`float`, `double`) y compararlos con `==`?
- a) Porque ocupan demasiada memoria.
- b) Porque solo funcionan en Python.
- c) Porque son más lentos que el texto.
- d) Porque muchos decimales no tienen representación exacta y aparecen pequeños errores de redondeo.

**4.** ¿Cuántas veces imprime este bucle? `for (int i = 1; i < 5; i++) { print(i); }`
- a) 4
- b) 5
- c) 6
- d) Infinitas.

**5.** Una función calcula un total y lo imprime con `print`, pero otra parte del programa necesita ese total. ¿Qué cambias?
- a) Nada: `print` ya devuelve el valor.
- b) Usar una variable global.
- c) Hacer que la función devuelva el total con `return`.
- d) Llamar a la función dos veces.

**6.** Necesitas contar cuántas veces aparece cada producto en un millón de ventas. ¿Qué estructura usas?
- a) Un diccionario con el producto como clave y el recuento como valor.
- b) Una lista ordenada que recorres para cada venta.
- c) Una variable de texto.
- d) Dos listas paralelas.

**7.** En `if (a && b)`, si `a` es falso, ¿qué pasa con `b`?
- a) Se evalúa siempre.
- b) No se evalúa: es la evaluación en cortocircuito.
- c) Se produce un error.
- d) Se evalúa dos veces.

**8.** Tu programa no da ningún error pero el total sale un 10 % más alto. ¿Qué tipo de error es?
- a) De sintaxis.
- b) De compilación.
- c) De lógica.
- d) De red.

**9.** En JavaScript, ¿qué comparación debes usar normalmente y por qué?
- a) `=`, porque es más corta.
- b) `==`, porque convierte tipos.
- c) `<=>`, porque es la estándar.
- d) `===`, porque no convierte tipos antes de comparar.

**10.** Aparece un error largo con muchas líneas. ¿Qué haces primero?
- a) Leer el final del mensaje y buscar la primera línea de tu propio código en el rastro.
- b) Reescribir la función.
- c) Cambiar de lenguaje.
- d) Borrar el `try`/`catch` de todo el programa.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | Lo comprueba el compilador; no significa que el valor no pueda cambiar. |
| 2 | c | `a / b` se calcula entre enteros (da 3) y después se convierte a `double`. |
| 3 | d | Para dinero se usan céntimos enteros o un tipo decimal. |
| 4 | a | `i` toma los valores 1, 2, 3 y 4; con 5 la condición ya es falsa. |
| 5 | c | `print` enseña el valor a una persona; `return` lo entrega al programa. |
| 6 | a | Leer y actualizar una clave es casi inmediato; con una lista habría que recorrerla cada vez. |
| 7 | b | Se aprovecha para escribir condiciones seguras. |
| 8 | c | El programa funciona, pero no hace lo que querías: por eso hacen falta pruebas. |
| 9 | d | `==` convierte tipos y produce sorpresas como `"1" == 1`. |
| 10 | a | El final dice qué ha pasado y el rastro, dónde. |
</details>
