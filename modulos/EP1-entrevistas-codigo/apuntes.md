# Módulo EP1 · Entrevistas de programación guiadas — Apuntes

> Objetivo: que un problema nuevo no te pille sin saber por dónde empezar. No se trata de memorizar soluciones, sino de reconocer patrones y razonar en voz alta.

---

## EP.1 · El método

En una prueba en vivo se evalúa **cómo piensas** tanto como el resultado. Sigue siempre el mismo orden:

1. **Entender.** Reformula el problema con tus palabras y pregunta por los límites: ¿tamaño de la entrada? ¿puede estar vacía? ¿hay negativos o duplicados? ¿qué se devuelve si no hay solución?
2. **Ejemplos.** Resuelve uno a mano, y añade un caso límite.
3. **Fuerza bruta.** Di la solución obvia y su coste, aunque sea lenta. Ya tienes algo que ofrecer.
4. **Optimizar.** ¿Qué trabajo se repite? ¿Qué estructura lo evitaría?
5. **Escribir.** Con nombres claros, contando lo que haces.
6. **Probar.** Recorre tu código a mano con un ejemplo y un caso límite, y da la complejidad.

**Si te atascas:** habla. Vuelve a un ejemplo pequeño y describe qué harías tú a mano. El entrevistador puede ayudarte si sabe en qué estás pensando. Si puedes usar un asistente de IA, valen las mismas reglas: tú especificas, compruebas y explicas (ver CAR.4).

---

## EP.2 · Complejidad

La **notación O** describe cómo crece el trabajo con el tamaño `n` de la entrada, sin fijarse en constantes.

| Orden | Nombre | Ejemplo | Con n = 1 millón |
|---|---|---|---|
| O(1) | Constante | Leer una clave de un diccionario | 1 paso |
| O(log n) | Logarítmica | Búsqueda binaria | ~20 pasos |
| O(n) | Lineal | Recorrer una lista | 1 millón |
| O(n log n) | | Ordenar | ~20 millones |
| O(n²) | Cuadrática | Comparar todos con todos | 1 billón: inviable |

**Cómo calcularla:** los bucles anidados multiplican, los bucles seguidos suman, y una búsqueda en lista dentro de un bucle convierte O(n) en O(n²) sin que se note: es el error más habitual en código real.

**Memoria:** indica también el espacio extra. Muchas optimizaciones cambian memoria por tiempo, como en `dos_sumas`.

---

## EP.3–EP.7 · Chuleta de patrones

| Si el enunciado dice… | Piensa en | Coste típico | Error típico |
|---|---|---|---|
| ¿existe? ¿repetido? ¿pareja que suma X? | **Tabla hash / conjunto** | O(n) | Guardar antes de comprobar y emparejar un elemento consigo mismo |
| anidado, deshacer, abrir y cerrar | **Pila** | O(n) | No comprobar que la pila queda vacía al final |
| lista **ordenada**, «mínimo que cumple» | **Búsqueda binaria** | O(log n) | `<` en lugar de `<=`, olvidar `+ 1`/`- 1` |
| subsecuencia **contigua**, k consecutivos | **Ventana deslizante** | O(n) | Recalcular la ventana entera |
| dos listas ordenadas, extremos que se acercan | **Dos punteros** | O(n) | Olvidar lo que queda en una de las listas |
| los k mayores, más frecuentes | **Contar y ordenar / montículo** | O(n log n) | No definir qué pasa en los empates |
| rangos, reservas, turnos | **Ordenar por inicio** | O(n log n) | No contemplar intervalos contenidos en otro |
| menor número de pasos, red, dependencias | **BFS en grafo** | O(V + A) | Marcar como visitado al sacar, no al meter |
| número mínimo o máximo, «de cuántas formas» | **Programación dinámica** | Varía | Probar con un algoritmo voraz sin demostrarlo |

**Programación dinámica en tres preguntas:** ¿qué significa `mejor[x]`? ¿Cómo se calcula a partir de casos más pequeños? ¿Cuál es el caso base?

---

## EP.8 · SQL y pandas en pruebas de datos

Las pruebas para puestos de datos sustituyen los algoritmos por manipulación de tablas. Lo que más se repite:

| Pregunta | SQL | pandas |
|---|---|---|
| Top-N por grupo | `ROW_NUMBER() OVER (PARTITION BY …)` y filtrar fuera | `sort_values` + `groupby(...).head(n)` |
| Comparar con la fila anterior | `LAG()` | `groupby(...).shift()` |
| Acumulado | `SUM() OVER (ORDER BY …)` | `cumsum()` |
| Clientes sin pedidos | `LEFT JOIN … WHERE … IS NULL` | `merge(how="left", indicator=True)` |
| Duplicados | `GROUP BY … HAVING COUNT(*) > 1` | `duplicated()` |

**Antes de escribir, pregunta por la granularidad:** ¿una fila es un pedido, una línea o un cliente? La mayoría de los errores en estas pruebas vienen de ahí. Repaso en [F2](../F2-sql/) y [F1](../F1-python/).

---

## Cómo practicar

- **Pocos problemas, muchas repeticiones:** repite cada patrón en modo reto a los 1, 3 y 7 días.
- **Cronométrate:** 20–30 minutos por problema es una referencia razonable para pruebas en vivo.
- **Habla en voz alta**, también cuando practiques solo.
- **Mide tu progreso** por patrones que resuelves sin ayuda, no por ejercicios hechos.

---

## Glosario

- **Fuerza bruta:** la solución directa, que prueba todas las opciones.
- **Tabla hash:** estructura que guarda pares clave-valor con acceso casi inmediato.
- **Pila / cola:** el último en entrar sale primero / el primero en entrar sale primero.
- **BFS:** búsqueda en anchura, explora por capas de distancia.
- **Programación dinámica:** resolver subproblemas una vez y reutilizar sus resultados.
- **Algoritmo voraz:** toma en cada paso la opción que parece mejor en ese momento.
- **Granularidad:** qué representa una fila de una tabla.
