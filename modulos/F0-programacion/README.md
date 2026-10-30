# Módulo F0 · Fundamentos de programación

**Semana 0 de N1 · ~10 horas · Optativo si ya programas** · Lo común a todos los lenguajes: variables, condiciones, bucles, funciones, colecciones y errores. Se aprende una vez y se reutiliza en Python, JavaScript, Java, C++ y casi cualquier otro.

## Por qué existe este módulo

F1 enseña Python *para datos* y da por hecho que ya sabes qué es un bucle o una función. Si nunca has programado, este módulo es tu punto de entrada. Y si ya sabes un lenguaje, te enseña a **leer otro en una tarde**, algo muy útil cuando una oferta pide Java o TypeScript y tú vienes de Python.

La idea central: **los conceptos se transfieren, la sintaxis se consulta**. Por eso cada concepto se muestra en cuatro lenguajes a la vez, y el mismo programa de ejemplo (`ejemplos/`) da exactamente la misma salida en los cuatro.

| Lenguaje | Por qué está aquí |
|---|---|
| **Python** | El lenguaje del curso: datos, IA y automatización |
| **JavaScript** | La web; se ejecuta en cualquier navegador. TypeScript es JavaScript con tipos |
| **Java** | Empresa, banca y backend; es el ejemplo clásico de tipado estático |
| **C++** | Rendimiento y sistemas; bajo muchas librerías de IA hay C o C++ |

## Objetivos
Al terminar este módulo podrás:
- Explicar qué hace un programa y seguir su ejecución paso a paso (*trazar*).
- Usar variables, tipos y operadores, y predecir qué ocurre al mezclar tipos.
- Escribir condicionales y bucles, y evitar los errores típicos (uno de más, bucle infinito).
- Dividir un problema en funciones con entradas y salidas claras.
- Elegir entre lista y diccionario según la pregunta que tengas que responder.
- Leer un mensaje de error, encontrar la causa y depurar con método.
- Traducir un programa corto entre lenguajes y aprender uno nuevo por tu cuenta.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| F0.1 | Qué es programar: compilado e interpretado, tipado estático y dinámico | 15 min |
| F0.2 | Variables, tipos y operadores | 15 min |
| F0.3 | Condicionales y lógica booleana | 15 min |
| F0.4 | Bucles y el arte de no equivocarse por uno | 15 min |
| F0.5 | Funciones: entradas, salidas y ámbito | 20 min |
| F0.6 | Colecciones: listas y diccionarios | 20 min |
| F0.7 | Errores y depuración | 15 min |
| F0.8 | Cómo aprender un lenguaje nuevo (y cuál elegir) | 10 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección, con cada concepto en los 4 lenguajes |
| [`diapositivas.pdf`](diapositivas.pdf) ([fuente editable](diapositivas.md)) | Diapositivas de los vídeos |
| [`ejercicios.yml`](ejercicios.yml) | 12 ejercicios en el navegador: el mismo problema en Python y en JavaScript |
| [`ejemplos/`](ejemplos/) | El mismo programa en 4 lenguajes, con su comprobación automática |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada en Python, sin instalar nada si usas Colab |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos por lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones del notebook |

## Práctica guiada
1. **En el navegador:** los ejercicios de este módulo se resuelven en la web, primero en Python y después en JavaScript. Fíjate en lo poco que cambia.
2. **En el notebook:** trazado de variables, errores provocados a propósito y ejercicios con comprobación.
3. **En tu ordenador (opcional):** ejecuta `ejemplos/verificar.sh` si tienes instalados los lenguajes.

## Caso práctico (entregable)
Elige un lenguaje que **no** hayas usado en el módulo (TypeScript, C#, Go, Rust…) y traduce `ejemplos/ventas.py` a ese lenguaje. Tu programa debe producir exactamente `ejemplos/salida-esperada.txt`. Entrega el código y un párrafo: qué fue igual, qué cambió y dónde te atascaste.

**Criterios:** la salida coincide (40 %) · el código es legible y usa funciones (30 %) · el párrafo muestra qué has entendido (30 %).

## Autoevaluación
1. ¿Qué diferencia hay entre un error de compilación y uno de ejecución? Pon un ejemplo.
2. ¿Por qué `0.1 + 0.2 == 0.3` es falso en los cuatro lenguajes?
3. Un bucle `for i in range(10)`, ¿cuántas veces se ejecuta y cuál es el último valor de `i`?
4. ¿Qué es mejor para saber si un producto está en un catálogo de un millón: una lista o un diccionario? ¿Por qué?
5. ¿Qué haces primero al ver un mensaje de error largo?

<details><summary>Respuestas</summary>

1. El de compilación lo detecta la herramienta antes de ejecutar (en Java, asignar un texto a un `int`). El de ejecución ocurre con el programa en marcha (dividir entre cero, usar un índice que no existe).
2. Los decimales se guardan en binario y 0,1 no tiene representación exacta. Compara con una tolerancia y, para dinero, usa enteros (céntimos) o un tipo decimal.
3. Diez veces; el último valor es 9, porque se empieza en 0.
4. Un diccionario: encuentra la clave casi en tiempo constante. La lista tiene que recorrer los elementos uno a uno.
5. Leer el final del mensaje, que dice el tipo de error, y después la línea de **tu** código que aparece en el rastro. No reescribir nada todavía.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Para empezar: *Python Tutor*, que dibuja paso a paso lo que hace un programa.
