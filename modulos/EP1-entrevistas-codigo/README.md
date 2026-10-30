# Módulo EP1 · Entrevistas de programación guiadas

**Transversal · ~12 horas** · Doce problemas de entrevista resueltos paso a paso: la explicación y el código a un lado, tu casilla al otro. Primero lo construyes con la guía delante; después lo repites de memoria.

## Por qué existe este módulo

Muchos procesos de selección empiezan con una prueba de código. Galadrim abre con un *quiz* de código y lógica con tiempo limitado, Wallapop usa un caso técnico, Provectus hace sesiones de código en vivo y Kabilio, una prueba técnica con el equipo. Casi todos estos problemas se apoyan en **una docena de patrones**, y aprenderlos rinde más que acumular ejercicios sueltos.

Este módulo complementa a [CAR](../CAR-empleabilidad/), que trata el proceso (CV, portafolio, entrevistas). Aquí se entrena la técnica. Si te falta la base de bucles y diccionarios, empieza por [F0](../F0-programacion/).

## Cómo se trabaja: copiar, entender y repetir

Cada ejercicio se divide en pasos con **tres fases**:

1. **Guiado.** Lee por qué se da cada paso y escribe el fragmento en su casilla. Puedes pulsar *Copiar a mi casilla*, pero escribirlo fija mejor la sintaxis.
2. **Comprobado.** Cada casilla marca ✓ cuando coincide con la referencia, y *Ejecutar y comprobar* pasa pruebas reales al programa completo.
3. **Modo reto.** Activa la casilla, oculta la referencia y repítelo de memoria. **Esta es la fase que prepara para la entrevista:** reconocer una solución no es lo mismo que poder escribirla. Vuelve a hacerlo unos días después.

## Objetivos
Al terminar este módulo podrás:
- Aplicar un **método** de seis pasos a un problema nuevo, en voz alta.
- Reconocer qué **patrón** pide un problema: tabla hash, pila, ventana deslizante, dos punteros, búsqueda binaria, intervalos, BFS o programación dinámica.
- Calcular y explicar la **complejidad** de tu solución en tiempo y memoria.
- Resolver las preguntas clásicas de **SQL** (top-N por grupo) y **pandas** de las pruebas de datos.
- Detectar los **errores típicos** de cada patrón antes de que te los señale el entrevistador.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| EP.1 | El método: entender, ejemplos, fuerza bruta, optimizar, escribir, probar | 15 min |
| EP.2 | Complejidad para entrevistas | 15 min |
| EP.3 | Tablas hash y conjuntos | 15 min |
| EP.4 | Pilas y búsqueda binaria | 15 min |
| EP.5 | Ventana deslizante y dos punteros | 15 min |
| EP.6 | Ordenar, contar e intervalos | 15 min |
| EP.7 | Grafos con BFS y programación dinámica | 20 min |
| EP.8 | SQL y pandas en pruebas de datos | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| Ejercicios en la web | **La práctica principal:** explicación y casilla, lado a lado (`ejercicios.yml`) |
| [`apuntes.md`](apuntes.md) | El método, la complejidad y la chuleta de patrones |
| [`diapositivas.pdf`](diapositivas.pdf) ([fuente editable](diapositivas.md)) | Diapositivas de los vídeos |
| [`notebook.ipynb`](notebook.ipynb) | Los mismos ejercicios para trabajar sin la web, por ejemplo en Colab |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos por lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones del notebook |

## Caso práctico (entregable)
Graba un vídeo de 10 minutos resolviendo **un problema que no esté en este módulo**, con cámara o solo pantalla, y pensando en voz alta. Debe verse: aclarar el enunciado, un ejemplo a mano, la idea de fuerza bruta, la optimización, el código, una prueba con un caso límite y la complejidad. Pídele a otra persona que te lo critique.

**Criterios:** explica su razonamiento (35 %) · método completo (25 %) · solución correcta (25 %) · complejidad bien justificada (15 %).

## Autoevaluación
1. Te piden encontrar si un elemento se repite en una lista enorme. ¿Qué estructura usas y por qué?
2. ¿Qué pista de un enunciado sugiere una ventana deslizante? ¿Y una búsqueda binaria?
3. ¿Por qué BFS da el camino más corto en un grafo sin pesos?
4. ¿Por qué falla un algoritmo voraz en el problema de las monedas con `[1, 3, 4]` e importe 6?
5. Te quedas en blanco en una prueba en vivo. ¿Qué haces?

<details><summary>Respuestas</summary>

1. Un conjunto: comprobar si un elemento pertenece a él cuesta O(1) de media, frente a O(n) en una lista. El total queda en O(n).
2. Ventana: «subsecuencia **contigua**», «k elementos consecutivos». Búsqueda binaria: datos **ordenados**, o «el mínimo valor que cumple una condición».
3. Porque explora por capas de distancia creciente: la primera vez que llega a un nodo ya es por el camino con menos saltos.
4. Porque coger la moneda mayor (4) obliga a 4+1+1, tres monedas, cuando 3+3 usa dos. Una decisión localmente buena no siempre lleva al óptimo global.
5. Volver al método en voz alta: reformular el problema, hacer un ejemplo a mano y plantear la fuerza bruta. Una solución lenta explicada vale más que el silencio.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md).
