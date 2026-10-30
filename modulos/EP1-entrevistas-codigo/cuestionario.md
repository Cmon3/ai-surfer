# Módulo EP1 · Entrevistas de programación guiadas — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Te plantean un problema nuevo en una prueba en vivo. ¿Qué haces primero?
- a) Empezar a escribir la solución más eficiente que se te ocurra.
- b) Reformularlo, preguntar por los límites y hacer un ejemplo a mano.
- c) Quedarte en silencio hasta tener la solución completa.
- d) Pedir otro problema.

**2.** Un bucle recorre una lista de `n` elementos y, dentro, usa `x in otra_lista`, de tamaño `n`. ¿Qué coste tiene y cómo lo mejoras?
- a) O(n), no se puede mejorar.
- b) O(log n), usando dos bucles.
- c) O(n²); convirtiendo `otra_lista` en un conjunto baja a O(n).
- d) O(1), porque `in` es instantáneo en listas.

**3.** Enunciado: «dada una lista **ordenada**, encuentra la primera posición de un valor». ¿Qué patrón sugiere?
- a) Pila.
- b) Programación dinámica.
- c) BFS.
- d) Búsqueda binaria.

**4.** Enunciado: «la mayor suma de 7 días consecutivos». ¿Qué patrón sugiere?
- a) Ventana deslizante.
- b) Pila.
- c) Búsqueda binaria.
- d) Ordenar la lista primero.

**5.** En `dos_sumas`, ¿por qué se guarda el elemento en el diccionario **después** de comprobar?
- a) Por velocidad.
- b) Para que un elemento no se empareje consigo mismo.
- c) Porque Python obliga a ello.
- d) Para ahorrar memoria.

**6.** ¿Qué fallo tiene esta validación de paréntesis si olvidas la última comprobación de que la pila esté vacía?
- a) Rechaza `"()"`.
- b) Lanza un error siempre.
- c) Tarda O(n²).
- d) Acepta `"(("` como válido.

**7.** ¿Por qué se usa `deque` en BFS en lugar de una lista con `pop(0)`?
- a) `pop(0)` no existe.
- b) `deque` ordena los elementos.
- c) `pop(0)` es O(n) porque desplaza todos los elementos, y `popleft` es O(1).
- d) Una lista no admite tuplas.

**8.** Con monedas `[1, 3, 4]` e importe 6, ¿qué ocurre con el algoritmo voraz de coger siempre la más grande?
- a) Da 3 monedas cuando el óptimo es 2.
- b) Da el óptimo.
- c) No termina.
- d) Da error.

**9.** En SQL, ¿por qué no puedes filtrar con `WHERE ROW_NUMBER() OVER (...) <= 2` en la misma consulta?
- a) `ROW_NUMBER` no existe en SQLite.
- b) Porque `WHERE` se evalúa antes que las funciones de ventana; hay que filtrar en una CTE o subconsulta.
- c) Porque solo funciona con `HAVING`.
- d) Porque `<=` no se admite en SQL.

**10.** Según este módulo, ¿qué prepara realmente para una entrevista?
- a) Leer muchas soluciones.
- b) Copiar el código varias veces.
- c) Memorizar cientos de problemas.
- d) Repetir los patrones de memoria, explicándolos en voz alta.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | Aclarar el problema evita resolver el equivocado y enseña cómo piensas. |
| 2 | c | `in` en lista recorre elementos; en conjunto es casi inmediato. |
| 3 | d | Datos ordenados es la pista más clara: se descarta media zona en cada paso. |
| 4 | a | «Consecutivos» indica una ventana que se desplaza. |
| 5 | b | Si se guardara antes, con objetivo 6 y un 3 se devolvería el mismo elemento dos veces. |
| 6 | d | Sin esa línea, lo que queda abierto pasa desapercibido. |
| 7 | c | Con `pop(0)` el recorrido completo podría acabar siendo cuadrático. |
| 8 | a | 4+1+1 son tres monedas; 3+3 son dos. |
| 9 | b | Las funciones de ventana se calculan después de `WHERE`. |
| 10 | d | Reconocer una solución no es poder escribirla: el modo reto entrena eso. |
</details>
