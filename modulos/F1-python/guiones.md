# Módulo 00 · Fundamentos de Python para datos — Guiones de vídeo

Guiones para grabar los 9 vídeos del módulo (150 minutos en total). Convenciones:

- **[DIAPOSITIVA N.M-k]**: mostrar esa diapositiva de `diapositivas.md`.
- **[PANTALLA: ...]**: captura de pantalla de una web o aplicación.
- **[DEMO: ...]**: grabación de pantalla trabajando en el notebook (`notebook.ipynb`). Las demos se describen; el instructor narra con naturalidad lo que hace.
- **[CÁMARA]**: plano del instructor.

El texto normal es la narración, escrita para decirse en voz alta (≈ 100 palabras por minuto). Las marcas de tiempo son orientativas.

---

## Vídeo 0.1 · Por qué Python para datos; Jupyter y Google Colab (duración objetivo: 10 min)

**Objetivo del vídeo:** que el estudiante entienda qué gana usando Python frente a una hoja de cálculo, qué es un notebook y cómo funciona el kernel, y que salga del vídeo con el entorno preparado (Colab o local) y el notebook del módulo abierto.

**Material:** diapositivas 0.1-1 a 0.1-8; navegador con Google Colab abierto y sesión iniciada; terminal con el repositorio del curso clonado; VS Code con las extensiones Python y Jupyter; `notebook.ipynb` del módulo 00.

### [00:00–01:00] Gancho

[CÁMARA]

Imagina que eres analista en TiendaSur, una cadena de cinco tiendas en Andalucía. Cada lunes, alguien dedica dos horas a juntar las ventas de todas las tiendas en un Excel: copiar, pegar, filtrar, arrastrar fórmulas. ¿Y si un día se equivoca de pestaña? Nadie se entera hasta que Dirección toma una decisión con un número mal calculado.

En este módulo vas a aprender a hacer ese trabajo con Python. No porque esté de moda, sino porque te permite hacerlo una vez, bien, y repetirlo cada semana pulsando un botón. Y lo mejor: no necesitas haber programado nunca.

### [01:00–02:30] Del Excel al código

[DIAPOSITIVA 0.1-1]

Una hoja de cálculo es una herramienta fantástica. Pero tiene tres límites. El primero: la reproducibilidad. Un informe hecho a mano hay que rehacerlo a mano. Un script de Python es una receta: la ejecutas otra vez con los datos nuevos y obtienes el mismo proceso, sin olvidos.

El segundo: la escala. Con cientos de miles de filas, la hoja se arrastra. Python maneja millones en un portátil normal. Y el tercero: el alcance. Con el mismo lenguaje vas a limpiar datos, hacer estadística, entrenar modelos de machine learning y, al final del curso, hablar con un modelo de lenguaje. Una sola herramienta durante catorce semanas.

Esas dos horas de cada lunes se convierten en dos minutos.

### [02:30–03:30] El ecosistema

[DIAPOSITIVA 0.1-2]

¿Por qué Python y no otro lenguaje? Porque es gratuito, se lee casi como pseudocódigo y, sobre todo, por su ecosistema de librerías. En este módulo usarás cuatro. NumPy, la calculadora rápida. pandas, que es como Excel y SQL juntos, pero con superpoderes. matplotlib, el lienzo para dibujar gráficos. Y seaborn, que pone plantillas bonitas encima de matplotlib.

Todo lo que veremos después en el curso se apoya en estas dos primeras. Por eso empezamos aquí.

No te agobies por los nombres. No hace falta memorizar nada hoy: al final del módulo los usarás con la misma naturalidad con la que usas las funciones de una hoja de cálculo.

### [03:30–05:00] Qué es un notebook y cómo funciona el kernel

[DIAPOSITIVA 0.1-3]

Vamos a trabajar en notebooks. Un notebook es un documento que mezcla celdas de texto y celdas de código. Ejecutas una celda y el resultado aparece justo debajo: un número, una tabla, un gráfico. Así, tu análisis cuenta una historia: explicas qué vas a hacer, lo haces y comentas lo que sale.

[DIAPOSITIVA 0.1-4]

Detrás del notebook hay un kernel: el Python que ejecuta tus celdas y recuerda las variables que creas. Y aquí viene lo importante. Lo que cuenta es el orden en que ejecutas las celdas, no el orden en que aparecen en pantalla. Ese número entre corchetes te dice el orden real. Si ejecutas una celda de abajo y luego una de arriba, el resultado puede sorprenderte.

Por eso, una regla de oro para todo el curso: antes de entregar, reinicia el kernel y ejecuta todo. Si llega al final sin errores, tu notebook es reproducible.

Piénsalo así: el kernel es como una pizarra en la que vas escribiendo. Si borras la pizarra, tienes que volver a escribirlo todo desde el principio. Y si escribes en desorden, lo que queda en la pizarra puede no ser lo que crees. En la entrega del caso práctico, que el notebook se ejecute de principio a fin vale un treinta por ciento de la nota.

### [05:00–07:00] Opción A: Google Colab

[DIAPOSITIVA 0.1-5]

La forma más rápida de empezar es Google Colab. No instalas nada. Solo necesitas un navegador y una cuenta de Google.

[PANTALLA: colab.research.google.com con la sesión iniciada]

[DEMO: en Colab, Archivo → Abrir cuaderno → pestaña GitHub; pegar la URL del repositorio del curso; elegir modulos/F1-python/notebook.ipynb]

Entra en colab punto research punto google punto com. En el menú Archivo, Abrir cuaderno, pestaña GitHub. Pega la dirección del repositorio del curso y elige el notebook del módulo cero. Si lo prefieres, también puedes descargar el archivo y subirlo.

[DEMO: Archivo → Guardar una copia en Drive; se abre la copia en otra pestaña]

Ahora, el paso que todo el mundo olvida: Archivo, Guardar una copia en Drive. Si no lo haces, tus cambios pueden perderse al cerrar la pestaña.

[DEMO: ejecutar la celda de imports con Shift + Enter; mostrar el indicador de conexión y el número [1]]

Ejecuta la primera celda con Mayúsculas más Intro. La primera vez tarda unos segundos porque Google te asigna una máquina. Ves el uno entre corchetes: ya está.

Un aviso: esa máquina es temporal. Si subes ficheros y te vas a comer, al volver pueden haber desaparecido. Y, por favor, no subas datos confidenciales de tu empresa sin permiso.

Otra ventaja de Colab: NumPy, pandas, matplotlib y seaborn ya vienen instaladas, así que no tienes que hacer nada más. Si algún día necesitas una librería que no está, basta con escribir en una celda exclamación pip install y el nombre de la librería.

### [07:00–08:45] Opción B: en tu ordenador

[DIAPOSITIVA 0.1-6]

Si prefieres trabajar en local, tienes dos caminos. El más sencillo es instalar Anaconda, que trae Python y casi todas las librerías. El que recomendamos en el curso es el Python oficial con un entorno virtual.

[PANTALLA: terminal en la carpeta del repositorio]

[DEMO: ejecutar python -m venv .venv, activar el entorno, pip install -r requirements.txt y jupyter lab; se abre JupyterLab en el navegador]

Un entorno virtual es una carpeta con su propio Python y sus propias librerías, separada del resto del sistema. Lo creas una vez, lo activas cada vez que abres una terminal, instalas las dependencias del curso y lanzas JupyterLab.

[DEMO: abrir notebook.ipynb en VS Code, Select Kernel → .venv]

Si te gusta más VS Code, abre el notebook directamente y elige como kernel el Python del entorno virtual, arriba a la derecha.

[DIAPOSITIVA 0.1-7]

Para comprobar que todo funciona, ejecuta estas tres líneas. Si ves las versiones sin errores, perfecto. Y si aparece "No module named pandas", casi siempre es que la librería está instalada en un entorno y el kernel usa otro.

### [08:45–10:00] Resumen y qué viene

[DIAPOSITIVA 0.1-8]

[CÁMARA]

Recapitulemos. Python te da reproducibilidad, escala y un único ecosistema. Un notebook combina texto, código y resultados, y el kernel recuerda lo que ejecutas, en el orden en que lo ejecutas. Para empezar, Colab, con una copia en Drive. En local, entorno virtual o Anaconda. Y antes de entregar: reiniciar y ejecutar todo.

Tu tarea ahora: abre el notebook y ejecuta la primera sección. En el próximo vídeo empezamos a escribir Python de verdad: variables, tipos y operadores. Nos vemos allí.

---

## Vídeo 0.2 · Tipos, variables y operadores (duración objetivo: 15 min)

**Objetivo del vídeo:** que el estudiante cree variables, distinga los tipos básicos, use operadores aritméticos y lógicos, entienda las limitaciones de los decimales y muestre resultados con f-strings.

**Material:** diapositivas 0.2-1 a 0.2-8; notebook del módulo, sección 1 ("Python básico en 5 minutos"); una celda vacía para experimentar.

### [00:00–01:15] Gancho

[CÁMARA]

Un producto cuesta 25 euros sin IVA. Le aplicas un descuento del 15 % y luego el 21 % de IVA. ¿Cuánto paga el cliente? Seguro que podrías calcularlo con una calculadora. Ahora imagina que tienes que hacerlo para veinte mil tickets, con descuentos distintos, y que mañana cambia el IVA.

Para que un ordenador haga ese cálculo por ti, primero tienes que decirle qué datos tienes y qué hacer con ellos. Eso son las variables y los operadores. Es lo más básico de Python, y lo vas a usar en todas y cada una de las líneas de código del curso.

### [01:15–03:30] Variables: etiquetas para valores

[DIAPOSITIVA 0.2-1]

Una variable es un nombre que apunta a un valor. Fíjate en esta línea: precio igual a diecinueve con noventa y nueve. Ese signo igual no significa "es igual". Significa "guarda este valor con este nombre". Es una asignación.

[DEMO: en la sección 1 del notebook, ejecutar la celda con precio, unidades, producto y en_oferta; después escribir en una celda nueva `precio` y ejecutarla para ver su valor]

Si escribo precio y ejecuto, Python me devuelve el valor que guardé. Si ahora hago precio igual a 21, la etiqueta pasa a apuntar a otro valor. El anterior se olvida.

¿Cómo elegir nombres? Tres reglas. Solo letras, números y guiones bajos, y sin empezar por número. Python distingue mayúsculas: Precio con mayúscula y precio con minúscula son dos variables distintas. Y la convención es escribir en minúsculas con guiones bajos, lo que se llama snake case. Pero, sobre todo, que el nombre explique lo que guarda. Ventas guion bajo semana se entiende. Equis no.

Un consejo práctico: aunque Python acepta tildes en los nombres, evítalas. Por eso en el notebook verás "categoria" sin tilde.

Y un error que te ahorrarás si lo conoces desde ya: no llames a tus variables con nombres que Python ya usa, como sum, list o max. Si haces sum igual a cien, la función sum deja de funcionar hasta que reinicies el kernel. Python no te avisa: simplemente te deja pisar el nombre.

### [03:30–05:30] Los tipos básicos

[DIAPOSITIVA 0.2-2]

Cada valor tiene un tipo, y el tipo decide qué puedes hacer con él. Los enteros, int, para contar: unidades, identificadores. Los decimales, float, para importes y porcentajes. El texto, str, para nombres y categorías, siempre entre comillas. Los booleanos, bool, que solo pueden ser True o False: ¿está en promoción?, ¿es cliente activo? Y None, que significa "aquí no hay valor".

[DEMO: ejecutar type(precio), type(unidades), type(producto), type(en_oferta)]

Con la función type puedes preguntar a Python el tipo de cualquier cosa.

¿Por qué importa? Porque cuando leas datos de un fichero, muchas veces todo llegará como texto. Y con texto no se puede sumar. Para convertir tienes int, float y str. Int de la cadena "3" te da el número tres. Lo usarás muchísimo.

Te pongo un ejemplo real. Exportas desde el sistema de caja una columna de códigos postales. Si Python la interpreta como número, el código postal cero cuatro cero cero uno, de Almería, se convierte en cuatro mil uno: pierdes el cero inicial. Aquí lo correcto es guardarlo como texto, porque un código postal no se suma ni se promedia. La pregunta que debes hacerte es: ¿voy a hacer cuentas con esto? Si no, probablemente es texto.

### [05:30–07:30] Operadores aritméticos

[DIAPOSITIVA 0.2-3]

Suma, resta y multiplicación funcionan como esperas. La división con una barra siempre devuelve un decimal: siete entre dos, tres coma cinco. Con dos barras tienes la división entera, tres. El porcentaje te da el resto, uno. Y dos asteriscos es la potencia: uno coma cero cinco elevado a tres, útil para calcular un crecimiento compuesto.

La precedencia es la de las matemáticas del colegio. Y ante la duda, paréntesis. Nunca sobran.

¿Para qué sirve la división entera o el resto en un análisis de datos? Más de lo que parece. Si tienes ciento treinta y siete unidades y las cajas son de doce, ciento treinta y siete entre doce con dos barras te dice cuántas cajas completas llenas, once, y el resto te dice cuántas unidades sueltas quedan, cinco. Un cálculo típico de logística.

[DIAPOSITIVA 0.2-4]

Volvamos al gancho. El precio final es p por uno menos el descuento, por uno más el IVA.

[DEMO: escribir en una celda nueva p, d, t = 25.0, 0.15, 0.21 y la fórmula; imprimir con f-string y ver 25.71 €]

Asigno tres variables en una línea, escribo la fórmula tal cual y la imprimo. Veinticinco con setenta y un euros. Fíjate en algo: al escribirlo en código, la regla de negocio queda explícita. Cualquiera que lo lea sabe si el descuento va antes o después del IVA.

### [07:30–09:15] Cuidado con los decimales

[DIAPOSITIVA 0.2-5]

Ahora un experimento que sorprende a todo el mundo.

[DEMO: ejecutar 0.1 + 0.2 y después 0.1 + 0.2 == 0.3]

Cero coma uno más cero coma dos… no da cero coma tres. Da cero coma tres y un montón de ceros y un cuatro al final. Y la comparación devuelve False. ¿Está roto Python? No. Los ordenadores guardan los decimales en binario, y algunos números, como cero coma uno, no se pueden representar exactamente. Pasa en casi todos los lenguajes, también en Excel, aunque Excel lo disimula al mostrarlo.

¿Qué haces en la práctica? Para mostrar, redondea: round o un formato con dos decimales. Para comparar decimales, nunca uses el doble igual: usa una tolerancia, por ejemplo con math punto isclose.

¿Y si trabajas con contabilidad, donde un céntimo importa? En ese caso existen herramientas específicas, como el módulo decimal de Python, que trabaja con decimales exactos. En análisis de datos, sin embargo, estas diferencias minúsculas no cambian ninguna conclusión: basta con redondear al presentar.

### [09:15–11:30] Comparaciones y lógica

[DIAPOSITIVA 0.2-6]

Los operadores de comparación responden con True o False. Mayor que, menor que, igual, con doble signo igual, y distinto, con exclamación igual. Y puedes combinarlos con and, or y not.

[DEMO: escribir es_caro = precio > 40, aplica = es_caro and not en_oferta; mostrar los resultados; después sum([True, False, True]) y su media]

Y ahora un truco que vas a usar en todo el curso. Para Python, True vale uno y False vale cero. ¿Qué pasa si sumo una lista de booleanos? Cuento cuántos son verdaderos. ¿Y si hago la media? Obtengo una proporción.

Piensa en TiendaSur. Más adelante tendrás una columna que dice si cada ticket fue en promoción. Su media te dirá directamente qué porcentaje de tickets fue en promoción: alrededor del veinte por ciento. Una línea de código. Quédate con esta idea, porque volverá.

Una última cosa sobre and y or: Python evalúa de izquierda a derecha y se detiene en cuanto sabe la respuesta. Si la primera condición de un and es falsa, ni siquiera mira la segunda. No es importante ahora, pero te ayudará a entender algunos mensajes de error más adelante.

### [11:30–13:45] Texto, f-strings y errores típicos

[DIAPOSITIVA 0.2-7]

El texto tiene sus propias herramientas. Strip quita los espacios sobrantes, típico de datos mal tecleados. Replace cambia unos caracteres por otros, por ejemplo una coma decimal por un punto.

[DEMO: ejecutar la primera celda de la sección 1 y señalar la línea print(f"{unidades} x {producto} = {total:.2f} €")]

Para mostrar resultados, la herramienta moderna es la f-string. Pones una f delante de las comillas y metes las variables entre llaves. Después de los dos puntos indicas el formato: punto dos f, dos decimales. Tres por café igual a cincuenta y nueve con noventa y siete euros.

[DEMO: provocar los tres errores de la tabla en una celda nueva: if precio = 10, "Total: " + 59.97 y float("19,99"); leer la última línea de cada mensaje]

Y ahora, vamos a equivocarnos a propósito. Un igual en vez de dos en una condición: error de sintaxis. Sumar texto y número: TypeError. Convertir "diecinueve coma noventa y nueve" con coma: ValueError. Mira siempre la última línea del mensaje de error. Casi siempre te dice exactamente qué ha pasado.

Los mensajes de error asustan al principio porque son largos y están en inglés. Pero tienen una estructura fija: arriba, el camino que siguió Python hasta el problema; abajo, el tipo de error y una frase que lo describe. Con práctica, la mayoría los resolverás en segundos. Y si no, copiar la última línea en un buscador suele llevarte a la solución.

### [13:45–15:00] Resumen y qué viene

[DIAPOSITIVA 0.2-8]

[CÁMARA]

Repasemos. El signo igual asigna; el doble igual compara. Tienes cinco tipos básicos y los datos de ficheros suelen llegar como texto. La división siempre da decimal y los decimales tienen pequeños errores: redondea al mostrar y compara con tolerancia. True cuenta como uno, así que la media de una condición es una proporción. Y las f-strings son tu forma de presentar resultados.

Con valores sueltos no se llega muy lejos. Una semana de ventas son siete números; una tienda tiene nombre, ciudad y superficie. En el próximo vídeo aprenderás a agruparlos con listas y diccionarios.

---

## Vídeo 0.3 · Listas, diccionarios y comprensiones (duración objetivo: 15 min)

**Objetivo del vídeo:** que el estudiante cree y manipule listas y diccionarios, use índices y rebanadas, entienda la relación entre estas estructuras y una tabla, y escriba comprensiones de listas sencillas.

**Material:** diapositivas 0.3-1 a 0.3-8; notebook del módulo, sección 1 (celdas de listas, diccionarios y comprensiones).

### [00:00–01:15] Gancho

[CÁMARA]

Tu jefa te pasa las ventas diarias de la tienda Centro de la última semana y te pregunta: ¿qué días superamos el objetivo de 150 euros? Con siete números lo haces de cabeza. Con trescientos sesenta y cinco días y cinco tiendas, ya no.

Para responder necesitas guardar muchos valores juntos, recorrerlos y quedarte con los que cumplen una condición. Hoy vas a aprender las dos estructuras de datos más importantes de Python, las listas y los diccionarios, y una forma elegante de transformarlas: las comprensiones. Al final del vídeo responderemos a la pregunta de tu jefa en una línea.

### [01:15–03:15] Listas

[DIAPOSITIVA 0.3-1]

Una lista es una secuencia ordenada de valores entre corchetes. Aquí tienes las ventas de lunes a domingo.

[DEMO: ejecutar la celda de la sección 1 con ventas_semana; en una celda nueva, len(ventas_semana), sum(ventas_semana) y la media]

Len te dice cuántos elementos tiene: siete. Sum los suma. Y si divides la suma entre el número de elementos tienes la media: ciento sesenta y seis con catorce. Es exactamente la fórmula de la media que conoces: sumar y dividir entre ene.

Las listas son mutables: puedes añadir elementos con append, cambiar uno o ordenarlas. Y pueden contener cualquier cosa: números, textos, incluso otras listas.

[DEMO: ventas_semana.append(175); sorted(ventas_semana); max(ventas_semana); min(ventas_semana)]

Añado las ventas de un octavo día con append. Sorted me devuelve una copia ordenada, sin tocar la original. Max y min me dan el mejor y el peor día. Fíjate en que todas estas funciones ya las conocías de Excel con otros nombres: SUMA, MAX, MIN, CONTAR. La diferencia es que aquí las escribes, y por tanto quedan documentadas.

### [03:15–05:30] Índices y rebanadas

[DIAPOSITIVA 0.3-2]

Para acceder a un elemento usas su posición. Y aquí viene la primera sorpresa: en Python se empieza a contar desde cero. El lunes es la posición cero y el domingo la seis. También puedes contar desde el final con números negativos: menos uno es el último.

[DEMO: ejecutar ventas_semana[0], ventas_semana[-1], ventas_semana[0:5], ventas_semana[5:] y ventas_semana[7] para provocar el IndexError]

Para tomar un trozo, una rebanada, usas dos puntos. Cero dos puntos cinco te da de lunes a viernes. ¿Cinco elementos? Sí: el inicio se incluye y el final no. Parece raro al principio, pero tiene una ventaja: b menos a es el número de elementos que obtienes. Cinco dos puntos, sin final, te da el fin de semana.

¿Y si pido la posición siete? IndexError: no existe, porque la última es la seis. Este es, con diferencia, el error más frecuente de quien empieza. Se llama error por uno.

Un truco para recordarlo: piensa en los índices como las marcas entre los elementos, no como los elementos en sí. La marca cero está antes del lunes, la cinco entre el viernes y el sábado. Cortar de cero a cinco es cortar entre esas dos marcas.

### [05:30–07:45] Diccionarios

[DIAPOSITIVA 0.3-3]

Una lista está bien para valores del mismo tipo en orden. Pero una tienda tiene nombre, ciudad y metros cuadrados. Para eso está el diccionario: pares clave, valor, entre llaves.

[DEMO: ejecutar la celda con el diccionario tienda; tienda["ciudad"], tienda["m2"] = 470, tienda.get("telefono", "sin dato") y tienda["telefono"] para ver el KeyError]

No accedes por posición, sino por nombre: tienda, corchete, ciudad. Sevilla. Puedes modificar valores o añadir claves nuevas. ¿Y si pides una clave que no existe? KeyError. Para evitarlo, el método get te deja dar un valor por defecto.

¿Dónde brillan los diccionarios? Como tablas de consulta. En el notebook verás uno llamado categorias que guarda el precio base de cada categoría: Alimentación, 8 euros; Bebidas, 5; Electrónica, 60. Más adelante lo usaremos para asignar a cada venta su precio base. Es el equivalente de un BUSCARV.

[DEMO: recorrer el diccionario con for clave, valor in tienda.items() e imprimir]

Y para recorrerlo, el método items te da los pares clave y valor.

Los valores de un diccionario pueden ser cualquier cosa, incluidas listas u otros diccionarios. Por ejemplo, un diccionario por tienda cuyo valor es la lista de ventas de la semana. Así se estructuran muchos datos que vienen de internet, en formato JSON. Cuando trabajes con APIs, en el módulo nueve, los reconocerás enseguida.

### [07:45–09:30] De estructuras a tablas

[DIAPOSITIVA 0.3-4]

Ahora una idea que te va a ahorrar mucha confusión dentro de dos vídeos. Si tienes una lista de diccionarios, cada diccionario es una fila de una tabla. Y si tienes un diccionario de listas, cada clave es una columna, con sus valores.

Mira este diccionario: tienda, con una lista de nombres; m2, con una lista de superficies. Eso ya es una tabla de dos columnas. De hecho, es exactamente así como crearemos las tablas de pandas. Cuando veas un DataFrame, piensa: es un diccionario de columnas con superpoderes.

Dos estructuras más, solo para que te suenen. Las tuplas, entre paréntesis, son como listas que no se pueden modificar. Y los conjuntos, set, guardan valores únicos: perfectos para quitar repetidos.

¿Cuándo usar cada una? Usa una lista cuando el orden importa y los elementos son del mismo tipo: las ventas de cada día, los nombres de los ficheros. Usa un diccionario cuando quieras buscar por nombre: el precio de cada categoría, los datos de una tienda. Usa un conjunto cuando solo te importe qué valores distintos hay: ¿en qué ciudades tenemos tiendas? Y usa una tupla para valores que van juntos y no deben cambiar, como unas coordenadas.

### [09:30–12:00] Comprensiones

[DIAPOSITIVA 0.3-5]

Muy a menudo quieres construir una lista nueva a partir de otra: aplicar el IVA a todos los precios, o quedarte solo con los caros. Python tiene una sintaxis para eso que se lee casi como una frase: la comprensión de listas.

Corchete, la expresión, for, la variable, in, la colección, y opcionalmente if y una condición. Léelo en voz alta: "p por uno coma veintiuno, para cada p en precios".

[DEMO: escribir y ejecutar las tres comprensiones de la diapositiva; luego mostrar la celda del notebook con [aplicar_descuento(p, 25) for p in precios if p > 20] y su resultado [18.75, 30.0]]

El IVA aplicado a cada precio. Solo los precios mayores de veinte. E incluso puedes construir un diccionario con llaves en vez de corchetes.

En el notebook verás una comprensión que llama a una función: aplica un veinticinco por ciento de descuento solo a los productos de más de veinte euros. La función la veremos en el próximo vídeo; de momento, fíjate en la estructura.

Una regla práctica: si la comprensión no cabe en una línea o necesita varias condiciones, escribe un bucle normal. La legibilidad manda.

Y te adelanto algo para no crear falsas expectativas: las comprensiones son geniales para listas pequeñas y para preparar datos. Pero cuando tengas veinte mil precios en una tabla, no harás una comprensión: usarás NumPy o pandas, que operan sobre toda la columna de una vez. Lo verás dentro de dos vídeos.

### [12:00–13:45] Respondiendo a la pregunta y errores frecuentes

[DIAPOSITIVA 0.3-6]

Volvamos a tu jefa. Lista de días, lista de ventas. Zip las empareja, día con venta. Y la comprensión se queda con los días cuya venta supera ciento cincuenta.

[DEMO: ejecutar la comprensión con zip y mostrar ['Jue', 'Vie', 'Sáb', 'Dom']]

Jueves, viernes, sábado y domingo. Una línea.

¿Y si en lugar de los nombres quisiera saber cuántos días superan el objetivo? Bastaría con poner len delante. ¿Y qué porcentaje de la semana? Len de esa lista entre siete. Fíjate en cómo cada pregunta de negocio se traduce en una pequeña variación del mismo patrón: recorrer, filtrar, contar.

[DIAPOSITIVA 0.3-7]

Antes de terminar, los errores que más verás. IndexError, por olvidar que se empieza en cero. KeyError, por una tilde o una mayúscula: Alimentación sin tilde no es la misma clave. Y uno muy traicionero: si escribes b igual a a con una lista, no la copias; creas otro nombre para la misma lista. Si cambias b, cambias a. Para copiar, usa punto copy.

Y un último error, más sutil: modificar una lista mientras la recorres con un bucle. Por ejemplo, borrar los días por debajo del objetivo dentro del mismo bucle que los recorre. Python se salta elementos y el resultado es incorrecto, sin ningún mensaje de error. La solución es la que ya conoces: construir una lista nueva con una comprensión que se quede solo con los que te interesan.

### [13:45–15:00] Resumen y qué viene

[DIAPOSITIVA 0.3-8]

[CÁMARA]

Recapitulemos. Las listas son secuencias ordenadas que se indexan desde cero, y en las rebanadas el final no se incluye. Los diccionarios guardan pares clave, valor, y son perfectos como tablas de consulta. Una lista de diccionarios o un diccionario de listas ya son una tabla. Y las comprensiones te permiten transformar y filtrar de forma legible.

En el próximo vídeo damos un paso más: aprenderás a tomar decisiones en el código con condicionales, a repetir acciones con bucles y a empaquetar reglas de negocio en funciones.

---

## Vídeo 0.4 · Condicionales, bucles y funciones (duración objetivo: 20 min)

**Objetivo del vídeo:** que el estudiante escriba condicionales con `if/elif/else`, recorra colecciones con `for` (incluidos `enumerate`, `zip` e `items`), defina funciones con parámetros, valores por defecto y `return`, y entienda por qué en análisis de datos se prefieren operaciones vectorizadas a los bucles.

**Material:** diapositivas 0.4-1 a 0.4-8; notebook del módulo, sección 1 (celda de `aplicar_descuento`); celdas vacías para la demo de comisiones.

### [00:00–01:30] Gancho

[CÁMARA]

En TiendaSur, los comerciales que venden a empresas cobran una comisión por tramos: un dos por ciento hasta diez mil euros de ventas al mes y un cuatro por ciento por lo que pase de esa cifra. Recursos Humanos lo calcula cada mes en una hoja de cálculo con una fórmula SI anidada que nadie se atreve a tocar. El año pasado alguien cambió una celda y durante tres meses se pagaron mal las comisiones.

Hoy vas a aprender a escribir esa regla una sola vez, de forma clara, y a comprobar que funciona antes de aplicarla. Para eso necesitas tres piezas: condicionales, bucles y funciones. Son el corazón de cualquier programa.

### [01:30–04:30] Condicionales

[DIAPOSITIVA 0.4-1]

Un condicional decide qué código se ejecuta. If, una condición, dos puntos. Debajo, con sangría, lo que pasa si la condición es verdadera. Elif, que significa "si no, si…", para más casos. Y else para todo lo demás.

Aquí clasificamos un ticket: si el ingreso supera ciento quince euros es grande; si supera cuarenta, mediano; si no, pequeño.

[DEMO: escribir el bloque de la diapositiva en una celda; probar con ingreso = 135, 60 y 20 e imprimir tipo]

Fíjate en dos cosas que en Python son obligatorias. Los dos puntos al final de cada condición. Y la sangría, cuatro espacios. En otros lenguajes la sangría es estética; en Python define qué código depende de qué. Si la desalineas, error.

Y otra: Python evalúa las condiciones en orden y ejecuta solo el primer bloque verdadero. ¿Qué pasa si pongo primero "mayor que cuarenta"?

Las condiciones pueden ser tan compuestas como necesites. Por ejemplo: si el ticket es de Electrónica and supera cien euros, ofrecer garantía ampliada. O: si el cliente es nuevo or lleva más de un año sin comprar, enviar un cupón. Cada regla de negocio que hoy vive en un documento de Word puede escribirse así.

Un último detalle sobre if: no hace falta escribir "if en oferta igual igual True". Basta con "if en oferta", porque la variable ya es un booleano. Y para comprobar si un valor está en una lista, existe el operador in: if ciudad in, entre corchetes, Sevilla y Cádiz. Es más legible que encadenar varios or.

[DEMO: intercambiar el orden de las condiciones y comprobar que 135 sale como "mediano"]

Un ticket de ciento treinta y cinco euros sale mediano, porque ya cumplió la primera condición. Ningún ticket sería grande. Ordena siempre de la condición más restrictiva a la menos.

### [04:30–06:00] La regla de las comisiones

[DIAPOSITIVA 0.4-2]

Escribamos la regla de las comisiones en lenguaje matemático. Si las ventas son menores o iguales a diez mil, la comisión es el dos por ciento de las ventas. Si son mayores, son doscientos euros del primer tramo más el cuatro por ciento de lo que exceda diez mil.

Antes de programar, calculamos tres casos a mano. Ocho mil euros: ciento sesenta de comisión. Diez mil: doscientos. Quince mil: doscientos más el cuatro por ciento de cinco mil, cuatrocientos. Guarda estos números: los usaremos para comprobar el código.

### [06:00–09:30] Bucles for

[DIAPOSITIVA 0.4-3]

Un bucle for repite un bloque de código para cada elemento de una colección. El patrón más clásico es el acumulador: empiezas con total igual a cero y en cada vuelta le sumas el valor actual.

[DEMO: escribir el bucle acumulador sobre ventas_semana e imprimir total; comparar con sum(ventas_semana)]

Mismo resultado que la función sum. Claro: sum hace exactamente esto por dentro.

Hay varias herramientas que hacen los bucles más claros. Range genera números del cero al ene menos uno. Enumerate te da a la vez la posición y el valor. Zip recorre dos listas en paralelo. Y en un diccionario, items te da cada par clave y valor.

¿Por qué no usar simplemente range y acceder por índice, como se hace en otros lenguajes? Se puede, pero el código queda más difícil de leer. Compara "para cada día y venta en zip de días y ventas" con "para cada i en range de len de ventas, coge ventas de i y días de i". La primera versión se lee como una frase; la segunda, como un jeroglífico.

[DEMO: for i, v in enumerate(ventas_semana) imprimiendo "Día i: v €"; luego for dia, v in zip(dias, ventas_semana) con un if que imprime solo los días por encima de 150]

Con enumerate numero los días. Con zip uso directamente el nombre del día. Y dentro del bucle puedo meter un if: combinamos lo de esta lección.

Dos palabras clave más: break sale del bucle y continue salta a la siguiente vuelta. Y existe el bucle while, que repite mientras una condición sea cierta. En análisis de datos se usa poco. Si alguna vez se te queda un bucle infinito, el botón de parar del notebook interrumpe la ejecución.

Un ejemplo de break: buscas el primer día de la semana en que las ventas superaron doscientos euros. En cuanto lo encuentras, no tiene sentido seguir recorriendo: break. Y un ejemplo de continue: quieres sumar las ventas, pero saltándote los días en que la tienda estuvo cerrada.

### [09:30–13:00] Funciones

[DIAPOSITIVA 0.4-4]

Llegamos a la pieza más importante. Una función es un bloque de código con nombre que recibe datos, hace algo y devuelve un resultado.

[DEMO: ir a la sección 1 del notebook, ejecutar la celda de aplicar_descuento; luego llamar a aplicar_descuento(40) y aplicar_descuento(40, 25); mostrar la docstring con Shift + Tab]

Vamos a desmontar la del notebook. Def, el nombre, los parámetros entre paréntesis y dos puntos. Porcentaje igual a diez es un valor por defecto: si no lo indico, se aplica un diez por ciento. Entre triples comillas, la docstring, que documenta qué hace la función. Si pulso Mayúsculas más Tabulador, el notebook me la muestra. Y return, el valor que la función entrega.

Aplicar descuento de cuarenta: treinta y seis. Con un veinticinco por ciento: treinta.

Una distinción que confunde a mucha gente: print y return no son lo mismo. Print muestra algo en pantalla. Return entrega un valor que puedes guardar y seguir usando. Una función sin return devuelve None, nada.

[DIAPOSITIVA 0.4-5]

Ahora, la regla de las comisiones.

[DEMO: escribir la función comision de la diapositiva; probarla con 8000, 10000 y 15000 mediante una comprensión y comprobar [160.0, 200.0, 400.0]]

Escribo la función con valores por defecto para el umbral y las dos tasas. Y ahora, antes de aplicarla a nadie, la pruebo con los tres casos que calculamos a mano. Ciento sesenta, doscientos, cuatrocientos. Coinciden.

Fíjate también en el caso del límite: exactamente diez mil euros. ¿Es menor o igual, o mayor? En el código pusimos menor o igual, así que diez mil cobra el dos por ciento, doscientos euros. Si Recursos Humanos entiende la regla de otra forma, este es el momento de descubrirlo, no cuando un comercial reclame. Probar los casos frontera es uno de los hábitos que más errores evita.

¿Ves la diferencia con la fórmula escondida en una celda? Si el año que viene el umbral sube a doce mil, cambias un número en un solo sitio. El nombre de la función documenta qué hace. Y puedes comprobarla con casos conocidos. Una regla práctica: si copias y pegas el mismo bloque de código tres veces, conviértelo en una función.

Un detalle más: las variables que creas dentro de una función son locales. No existen fuera. Así la función no ensucia tu notebook.

Y una buena costumbre que te recomiendo desde el primer día: escribe siempre la docstring, aunque sea una sola línea. Dentro de tres meses, cuando vuelvas a este notebook, agradecerás saber qué hacía cada función sin tener que leer su código.

### [13:00–15:30] Lambda y un aviso importante

[DIAPOSITIVA 0.4-6]

Te vas a encontrar también con funciones lambda. Son funciones anónimas de una sola línea. Esta recibe una tabla d y devuelve el ingreso dividido entre los metros cuadrados. En la sección cinco del notebook verás una dentro de un método llamado assign. No necesitas escribirlas todavía, pero sí reconocerlas.

[CÁMARA]

Y ahora, un aviso que es casi una contradicción con lo que acabas de aprender. Los bucles son fundamentales para entender la programación. Pero cuando trabajes con tablas de datos, casi nunca recorrerás las filas una a una con un for. ¿Por qué? Porque NumPy y pandas aplican las operaciones a columnas enteras de una vez. Es decenas de veces más rápido y el código es más corto y más difícil de equivocar.

Entonces, ¿para qué sirven los bucles? Para entender lo que esas librerías hacen por debajo, y para tareas como recorrer una lista de ficheros, de meses o de tiendas. No para multiplicar dos columnas.

Un ejemplo muy real: tienes una carpeta con doce ficheros, uno por mes. Un bucle recorre los doce nombres de fichero, lee cada uno con pandas y los junta en una sola tabla. Aquí el bucle tiene todo el sentido: son doce vueltas, no veinte mil, y cada vuelta hace un trabajo grande.

### [15:30–18:30] Errores frecuentes en directo

[DIAPOSITIVA 0.4-7]

Veamos los errores que más vas a encontrarte, provocándolos.

[DEMO: (1) desalinear una línea dentro del if → IndentationError; (2) definir una función que hace print en vez de return y luego multiplicar su resultado por 2 → TypeError con NoneType; (3) escribir aplicar_descuento sin paréntesis y ver <function ...>]

Primero, una línea mal alineada: IndentationError. Usa siempre cuatro espacios; el editor lo hace por ti si no luchas contra él.

Si alguna vez copias código de una web o de un documento y te da este error sin motivo aparente, sospecha de los tabuladores: a veces el texto copiado mezcla tabuladores y espacios, que a la vista son idénticos pero para Python no.

Segundo, una función que imprime en lugar de devolver. Parece que funciona, porque vemos el número. Pero cuando intento multiplicar el resultado por dos, error: estoy multiplicando None. La función mostraba, pero no devolvía.

Tercero, olvidar los paréntesis al llamar. Python no da error: me enseña la función en sí, no su resultado.

Y el cuarto ya lo viste: elif en el orden equivocado, que no da ningún error pero produce resultados incorrectos. Esos son los peligrosos. Por eso probamos siempre con casos conocidos.

### [18:30–20:00] Resumen y qué viene

[DIAPOSITIVA 0.4-8]

[CÁMARA]

Recapitulemos. En Python, la sangría y los dos puntos definen los bloques. El for recorre colecciones, y enumerate, zip e items lo hacen más claro. Las funciones encapsulan reglas de negocio: se cambian en un sitio y se prueban con casos conocidos. Print muestra, return devuelve. Y con tablas de datos, vectoriza.

Como ejercicio, escribe una función clasificar ticket con los tres tramos que hemos visto y aplícala a una lista de importes con una comprensión.

¿Y qué es eso de vectorizar? Es justo lo que veremos en el próximo vídeo con NumPy: cómo hacer cálculos con miles de números sin escribir un solo bucle.

---

## Vídeo 0.5 · NumPy: arrays y vectorización (duración objetivo: 15 min)

**Objetivo del vídeo:** que el estudiante cree arrays de NumPy, opere con ellos de forma vectorizada, calcule estadísticos (y entienda `ddof`), use máscaras booleanas para contar y filtrar, calcule crecimientos porcentuales y genere datos aleatorios reproducibles.

**Material:** diapositivas 0.5-1 a 0.5-9; notebook del módulo, sección 2 ("NumPy: cálculo vectorizado") y sección 3 ("Generamos los datos de TiendaSur").

### [00:00–01:15] Gancho

[CÁMARA]

Dirección de TiendaSur está pensando subir un tres por ciento todos los precios. Pregunta: ¿cuántos de nuestros diez mil productos pasarían de cincuenta euros? Con lo que sabes hasta ahora harías un bucle: recorrer los diez mil precios, multiplicar, comparar, contar. Funciona, pero es lento de escribir y de ejecutar.

Con NumPy es una línea. Y se ejecuta en milisegundos. Hoy vas a aprender la idea más importante para trabajar con datos en Python: la vectorización.

### [01:15–02:45] Las listas no son vectores

[DIAPOSITIVA 0.5-1]

Empecemos con un experimento.

[DEMO: en una celda nueva ejecutar [1, 2, 3] * 2 y [1, 2] + [3, 4]; después np.array([1, 2, 3]) * 2]

Una lista multiplicada por dos… se repite. Y dos listas sumadas se pegan una detrás de otra. Las listas son contenedores genéricos: pueden mezclar números, textos u otras listas, así que Python no sabe hacer aritmética con ellas.

Con un array de NumPy, en cambio, multiplicar por dos multiplica cada elemento. Eso es lo que queremos con datos.

Es la misma diferencia que hay entre una caja de herramientas y una calculadora. La lista es la caja: puedes meter lo que quieras, pero no hace cuentas. El array es la calculadora: solo admite números, pero opera con ellos a toda velocidad.

### [02:45–05:00] El ndarray y la velocidad

[DIAPOSITIVA 0.5-2]

[DEMO: ejecutar la celda de la sección 2 que crea v = np.array(ventas_semana); en una celda nueva v * 1.21, v / v.sum(), v.shape, v.dtype]

Convierto las ventas de la semana en un array. Multiplicar por uno coma veintiuno aplica el IVA a todos los días. Dividir entre la suma me da la cuota de cada día. Sin bucles.

¿Qué tiene de especial un array? Todos sus elementos son del mismo tipo y se guardan juntos en memoria. Eso permite que la operación se ejecute en código compilado, sin que Python tenga que interpretar elemento a elemento. Eso es vectorizar: escribes la operación sobre el array entero y NumPy hace el bucle por ti, muy rápido.

[DIAPOSITIVA 0.5-3]

¿Cuánto más rápido?

[DEMO: crear x = list(range(1_000_000)) y a = np.arange(1_000_000); medir %timeit [i * 2 for i in x] y %timeit a * 2]

Un millón de números. La comprensión de listas tarda decenas de milisegundos. NumPy, menos de uno. En mi equipo, unas sesenta veces más rápido; en el tuyo puede variar, pero el orden de magnitud será parecido. Y con más datos y operaciones más complejas, la diferencia crece.

¿Importa ganar unos milisegundos? Con una semana de ventas, no. Pero en el módulo cinco entrenarás redes neuronales que hacen millones de operaciones por segundo, y en el ocho modelos sobre series largas. Ahí la vectorización es la diferencia entre esperar un minuto o una hora. Y, sobre todo, el código vectorizado es más corto: menos líneas, menos sitios donde equivocarse.

### [05:00–07:15] Agregaciones y la trampa del ddof

[DIAPOSITIVA 0.5-4]

Los arrays tienen métodos para resumir: mean, std, min, max, sum, argmax.

[DEMO: ejecutar la línea del notebook que imprime media y desviación típica; después v.std(ddof=1) y pd.Series(v).std()]

La media es ciento sesenta y seis con catorce y la desviación típica, cuarenta y nueve coma siete. La desviación típica mide cuánto se alejan en promedio los valores de su media.

Ahora, una trampa que confunde a todo el mundo. Si calculas lo mismo con pandas, sale cincuenta y tres coma siete. ¿Cuál está bien? Las dos. NumPy divide entre ene, y pandas divide entre ene menos uno. Es ese parámetro ddof de la fórmula. En el módulo uno verás por qué, al estimar a partir de una muestra, se divide entre ene menos uno. De momento, recuerda: si dos desviaciones típicas no coinciden, mira el ddof.

En tablas de dos dimensiones, el argumento axis decide la dirección: axis cero agrega por columnas y axis uno por filas.

Un ejemplo para fijarlo: imagina una matriz con una fila por tienda y una columna por día de la semana. Sum con axis cero colapsa las filas: te da el total de cada día sumando todas las tiendas. Sum con axis uno colapsa las columnas: te da el total semanal de cada tienda. La regla mnemotécnica es que axis indica la dimensión que desaparece.

### [07:15–09:45] Máscaras booleanas

[DIAPOSITIVA 0.5-5]

Esta es la parte que más vas a usar. ¿Qué pasa si comparo un array con un número?

[DEMO: ejecutar v > v.mean(), (v > v.mean()).sum(), v[v > v.mean()], (v > v.mean()).mean() y v[(v > 100) & (v < 200)]]

Obtengo otro array de True y False, del mismo tamaño. Eso se llama máscara. Y con una máscara puedo hacer tres cosas. Contar: la suma me dice que tres días superan la media. Filtrar: si meto la máscara entre corchetes, me quedo con esos valores, doscientos diez, doscientos cincuenta y ciento noventa. Y calcular proporciones: la media, cero coma cuarenta y tres.

¿Te suena? Es la idea del vídeo dos: True vale uno. Aquí aplicada a miles de valores a la vez.

Para combinar condiciones se usa ampersand para "y", barra vertical para "o" y la virgulilla para "no". Y siempre, siempre, con paréntesis alrededor de cada condición.

Por último, np punto where: un SI de Excel vectorizado. Si la condición se cumple, un valor; si no, otro. Lo verás en la sección tres para que las ventas en promoción tengan un precio un quince por ciento menor.

Por ejemplo, np punto where de v mayor que doscientos, "alto", "normal" etiqueta cada día de la semana en una sola línea. Lo mismo que harías arrastrando una fórmula SI por toda una columna, pero sin arrastrar nada.

### [09:45–11:00] Crecimiento porcentual

[DIAPOSITIVA 0.5-6]

¿Cómo calculo el crecimiento de un día a otro? La fórmula es el valor de hoy menos el de ayer, dividido entre el de ayer.

[DEMO: ejecutar la línea del notebook con np.diff y señalar el 63.3]

Np punto diff calcula las diferencias consecutivas. Y v dos puntos menos uno es el array sin el último elemento, para que ambos tengan seis valores. Del miércoles al jueves, las ventas crecen un sesenta y tres por ciento. Sin bucles y casi igual que la fórmula.

Y de paso puedes responder preguntas como: ¿cuál fue la mayor caída? El mínimo de ese array, menos veintisiete por ciento, del martes al miércoles. ¿Cuántos días crecimos? La suma de crecimiento mayor que cero: cuatro de seis. Todo con las herramientas que acabas de ver.

### [11:00–12:45] Aleatorios reproducibles

[DIAPOSITIVA 0.5-7]

Seguro que te has preguntado de dónde salen los datos de TiendaSur. Los simulamos con el generador aleatorio de NumPy.

[DEMO: desplazarse a la sección 3 y señalar rng = np.random.default_rng(42), rng.choice con probabilidades, rng.poisson y rng.normal; ejecutar la celda y mostrar ventas.head()]

Default rng con una semilla, el cuarenta y dos. Choice elige tiendas y categorías con las probabilidades que le decimos. Poisson genera las unidades de cada ticket, y normal añade algo de ruido al precio.

¿Para qué la semilla? Para que los números "aleatorios" sean siempre los mismos. Así tus resultados coinciden con los míos y con los de tus compañeros. Simular datos es muy útil para aprender y para probar un análisis antes de tener los datos reales.

Mira también cómo se construyen las unidades: un Poisson cuya media depende de la estacionalidad, una onda que sube en primavera y verano, y de si hay promoción, que multiplica por uno coma cuatro. No tienes que entender todavía la distribución de Poisson; la verás en el módulo uno. Lo importante es que todo este año simulado se genera sin un solo bucle: veinte mil tickets en una fracción de segundo.

### [12:45–14:00] Errores frecuentes

[DIAPOSITIVA 0.5-8]

Repasemos los errores típicos. Hacer cuentas con listas. Usar and y or con arrays: Python protesta con un mensaje sobre que el valor de verdad es ambiguo. Olvidar los paréntesis al combinar condiciones, que da resultados absurdos sin avisar. Comparar desviaciones calculadas con distinto ddof. Y operar con arrays de tamaños distintos.

[DEMO: ejecutar (v > 100) and (v < 200) y mostrar el ValueError]

### [14:00–15:00] Resumen y qué viene

[DIAPOSITIVA 0.5-9]

[CÁMARA]

Recapitulemos. Un array de NumPy es homogéneo y permite operar con todos sus elementos a la vez: más rápido y más legible. Las máscaras booleanas sirven para contar, filtrar y calcular proporciones. Combina condiciones con ampersand, barra vertical y virgulilla, con paréntesis. Cuidado con el ddof. Y fija la semilla.

¿Y la respuesta al gancho? Precios por uno coma cero tres, mayor que cincuenta, punto sum. Una línea.

Pero los datos reales no son solo números: tienen fechas, nombres de tiendas, categorías. En el próximo vídeo conocerás pandas, la librería que convierte todo esto en tablas.

---

## Vídeo 0.6 · pandas I: Series, DataFrame, selección y filtrado (duración objetivo: 20 min)

**Objetivo del vídeo:** que el estudiante entienda Series y DataFrame, cargue datos (incluido un CSV "a la española"), explore una tabla, seleccione columnas y filas con `loc` e `iloc`, filtre con condiciones y cree columnas nuevas de forma vectorizada.

**Material:** diapositivas 0.6-1 a 0.6-9; notebook del módulo, secciones 3 ("Generamos los datos de TiendaSur") y 4 ("Primer vistazo y limpieza"); opcionalmente, un CSV pequeño exportado desde una hoja de cálculo con separador `;` y coma decimal.

### [00:00–01:30] Gancho

[CÁMARA]

Llega el informe trimestral. El responsable de la tienda Aeropuerto quiere revisar todos los tickets de Electrónica de más de ciento cincuenta euros vendidos en verano, porque sospecha que hubo errores de caja. En una hoja de cálculo serían cuatro filtros a mano, y el trimestre que viene, otra vez los mismos cuatro filtros.

Hoy entramos en pandas, la librería que vas a usar en todos los módulos del curso. Es como una hoja de cálculo que se programa: tablas con nombre en las columnas, tipos distintos en cada columna, y operaciones que puedes repetir siempre igual.

### [01:30–04:00] Series y DataFrame

[DIAPOSITIVA 0.6-1]

pandas tiene dos estructuras. Una Series es una columna: unos valores y un índice que etiqueta cada valor. Un DataFrame es una tabla: un conjunto de Series que comparten el mismo índice. Cada columna tiene un único tipo, pero puedes tener una columna de fechas, otra de texto y otra de números en la misma tabla. Eso es lo que NumPy no te daba.

Si vienes de Excel, una analogía útil: el DataFrame es una hoja, cada columna con su encabezado es una Series, y el índice es como los números de fila de la izquierda, con la diferencia de que aquí pueden ser cualquier etiqueta: fechas, nombres de tienda o identificadores de cliente.

[DEMO: en la sección 3, ejecutar la celda que crea el DataFrame tiendas; mostrar tiendas, tiendas["m2"] y type(tiendas["m2"])]

Mira cómo se crea la tabla de tiendas: es un diccionario de listas, justo lo que vimos en el vídeo tres. Cada clave, una columna. Si selecciono la columna m2, obtengo una Series, con su índice a la izquierda.

¿Por qué importa el índice? Porque pandas lo usa para alinear datos. Si sumas dos Series, pandas empareja los valores por etiqueta, no por posición. Normalmente no tendrás que pensar en ello, pero cuando un resultado salga con valores vacíos inesperados, recuerda que el índice puede ser el culpable.

[DEMO: tiendas.dtypes]

Con dtypes ves el tipo de cada columna: enteros para el identificador y los metros, texto para el nombre y la ciudad.

### [04:00–06:00] Cargar datos

[DIAPOSITIVA 0.6-2]

En un proyecto real no escribirás los datos a mano. Los leerás de un fichero o de una base de datos. La función estrella es read csv.

[DEMO: si se dispone del CSV de ejemplo, leerlo primero sin parámetros (sale una sola columna) y después con sep=";" y decimal=","; mostrar head() en ambos casos]

Y aquí hay una trampa muy española. Cuando exportas un CSV desde Excel con la configuración regional de España, el separador suele ser punto y coma y los decimales llevan coma. Si no se lo dices a pandas, verás una sola columna con todo pegado, o importes que son texto. Con sep y decimal, problema resuelto. Si ves caracteres raros en las tildes, prueba con encoding latin uno.

En el notebook simulamos los datos para no depender de ficheros, pero todo lo que hagamos a partir de aquí sería idéntico con un CSV real.

pandas lee muchos otros formatos: read excel para hojas de cálculo, eligiendo la pestaña con sheet name; read sql para bases de datos; read json para datos de aplicaciones web; read parquet para ficheros grandes y comprimidos. La idea es siempre la misma: una función read algo que devuelve un DataFrame. Y para guardar, el camino inverso: to csv, to excel.

### [06:00–08:30] Primer vistazo

[DIAPOSITIVA 0.6-3]

Antes de analizar, explora. Siempre. Cinco instrucciones.

[DEMO: ejecutar ventas.head(), ventas.shape, la celda de ventas.info() de la sección 4, ventas.describe() y ventas["categoria"].value_counts()]

Head te enseña las primeras filas: ¿se ha leído bien? Shape te da filas y columnas. Info es la más valiosa: el tipo de cada columna y cuántos valores no nulos tiene. Fíjate: veinte mil ochenta filas, pero precio unitario solo tiene diecinueve mil novecientos treinta valores. Faltan ciento cincuenta precios. Lo arreglaremos en el próximo vídeo.

Describe te da estadísticos de las columnas numéricas: busca mínimos y máximos imposibles, como precios negativos. Y value counts te dice cuántas veces aparece cada categoría.

[DEMO: ventas["categoria"].value_counts(normalize=True)]

Con normalize igual a True, en lugar de conteos tienes proporciones. Alimentación es el treinta y cinco por ciento de los tickets, Bebidas el veinticinco, y Electrónica solo el diez. Guarda este dato, porque cuando calculemos ingresos te llevarás una sorpresa: ese diez por ciento de tickets genera una parte enorme del dinero.

Te propongo un hábito: cada vez que cargues una tabla nueva, ejecuta estas cinco instrucciones antes de hacer nada más. Te llevará un minuto y te ahorrará horas de analizar datos que no son lo que creías.

Un detalle: según tu versión de pandas, las columnas de texto aparecerán como object o como str. Las dos funcionan igual para lo que haremos.

### [08:30–10:00] Seleccionar columnas

[DIAPOSITIVA 0.6-4]

Para seleccionar una columna, corchetes y su nombre: obtienes una Series. Para varias, doble corchete: en realidad le estás pasando una lista de nombres, y obtienes un DataFrame.

[DEMO: ventas["unidades"], ventas[["fecha", "unidades"]]; mostrar que ventas.unidades también funciona pero no con nombres con espacios]

Existe un atajo con punto, ventas punto unidades, pero falla si la columna tiene espacios o coincide con un método. Acostúmbrate a los corchetes.

Y un detalle práctico: si no recuerdas exactamente cómo se llama una columna, ejecuta df punto columns. Te devuelve la lista de nombres tal y como están escritos, con sus mayúsculas, tildes y espacios. Muchos KeyError se resuelven en dos segundos mirando esa lista.

### [10:00–13:00] loc e iloc

[DIAPOSITIVA 0.6-5]

Para seleccionar filas, y filas y columnas a la vez, pandas tiene dos herramientas. Es la pregunta uno de la autoevaluación, así que presta atención.

Loc selecciona por etiquetas: los nombres del índice y de las columnas. Iloc selecciona por posición, como en las listas. Y una diferencia sutil: en loc, el final de un rango se incluye; en iloc, no.

[DEMO: tiendas.loc[0, "tienda"], tiendas.loc[0:2, ["tienda", "m2"]] (3 filas), tiendas.iloc[0:2, 1:3] (2 filas), tiendas.iloc[-1]]

Loc cero dos puntos dos me da tres filas. Iloc cero dos puntos dos, dos filas.

¿Por qué esta diferencia? Porque con etiquetas no siempre tiene sentido "el siguiente". Si el índice fueran nombres de tienda, loc de Centro a Sur incluye Sur porque lo has pedido por su nombre. Con posiciones, en cambio, pandas sigue la convención de las listas de Python.

"Pero si el índice es cero, uno, dos…, ¿no son lo mismo?" No siempre. Mira esto.

[DEMO: volver a la salida de ventas.info() y señalar "Index: 20080 entries, 0 to 3198"; ejecutar ventas.loc[5] (devuelve 2 filas) y ventas.iloc[5] (1 fila)]

Al añadir filas duplicadas con concat, en el notebook, el índice tiene etiquetas repetidas. Loc cinco me devuelve dos filas. Iloc cinco, siempre la sexta. Si el índice deja de tener sentido, reset index lo regenera.

### [13:00–16:00] Filtrar filas

[DIAPOSITIVA 0.6-6]

Ahora, filtrar. Y aquí vas a reconocer algo: es exactamente la idea de las máscaras de NumPy. Una condición sobre una columna da una Series de True y False. La metes entre corchetes y te quedas con las filas verdaderas.

[DEMO: ventas[ventas["promocion"]], len(...); ventas[(ventas["categoria"] == "Ropa") & (ventas["promocion"])]; ventas[ventas["tienda_id"].isin([1, 2])]; ventas.loc[ventas["unidades"] >= 5, ["fecha", "unidades"]]; ventas.query("unidades >= 5 and promocion")]

Los tickets en promoción. Ropa y en promoción, con ampersand y paréntesis. Las tiendas de Sevilla, con isin. Con loc puedo filtrar filas y elegir columnas a la vez. Y si prefieres algo más legible, query te deja escribir la condición como texto.

Fíjate en una cosa: ninguno de estos filtros modifica la tabla ventas. Cada uno devuelve una tabla nueva con las filas seleccionadas. Si quieres conservarla, guárdala en una variable con un nombre claro, por ejemplo ventas promo. Esto es muy distinto de los filtros de una hoja de cálculo, que ocultan filas de la tabla original y a veces se te olvida quitarlos.

Ahora, el caso del gancho. Tienda Aeropuerto, que es la cinco; Electrónica; más de ciento cincuenta euros; meses de junio a agosto.

[DEMO: construir el filtro con las cuatro condiciones (usando ventas["fecha"].dt.month.isin([6, 7, 8]) y unidades * precio > 150), ordenarlo por importe y mostrar las primeras filas]

Cuatro condiciones, una instrucción. El trimestre que viene, la misma línea.

Fíjate en cómo leímos el mes: fecha, punto dt, punto month. Ese punto dt es la puerta de entrada a todas las operaciones con fechas, y le dedicaremos parte del próximo vídeo.

Un consejo de legibilidad: cuando un filtro tiene más de dos condiciones, guarda cada una en una variable con nombre. Es aeropuerto, es electrónica, es caro, es verano. Luego combinas: ventas, corchete, es aeropuerto ampersand es electrónica ampersand es caro ampersand es verano. Se lee casi como el enunciado del problema, y si mañana cambia el umbral de ciento cincuenta euros, sabes exactamente dónde tocar.

### [16:00–17:15] Columnas nuevas

[DIAPOSITIVA 0.6-7]

Crear una columna es asignar a un nombre nuevo. El ingreso es unidades por precio unitario.

[DEMO: mostrar la línea ventas["ingreso"] = ... de la sección 4; ordenar con sort_values("ingreso", ascending=False).head(10)]

Esta línea multiplica veinte mil pares de valores en una sola operación. Es la pregunta dos de la autoevaluación: ¿por qué no un bucle fila a fila? Porque sería decenas de veces más lento, más largo de escribir y más fácil de equivocar. Y con sort values ordeno para ver los diez tickets más grandes.

[DEMO: ventas.nlargest(5, "ingreso")]

Hay también un atajo, nlargest, que te da directamente las filas con los valores más altos. Y si quieres ordenar por varias columnas, por ejemplo por tienda y luego por ingreso, le pasas una lista a sort values.

### [17:15–19:00] Errores frecuentes

[DIAPOSITIVA 0.6-8]

[DEMO: provocar (1) el ValueError con and; (2) KeyError con "Categoria"; (3) la asignación encadenada ventas[ventas["promocion"]]["precio_unitario"] = 0 y comprobar que ventas no cambia; mostrar la forma correcta con loc sobre una copia]

Los errores que más verás. Usar and en lugar de ampersand: el famoso "truth value of a Series is ambiguous". Un nombre de columna con mayúscula o sin tilde: KeyError; revisa df punto columns. Y uno muy traicionero: la asignación encadenada. Filtrar y luego asignar con dos pares de corchetes no modifica la tabla original. En pandas dos te avisa; en pandas tres, simplemente no hace nada. La forma correcta es loc con la máscara y la columna en un solo paso.

### [19:00–20:00] Resumen y qué viene

[DIAPOSITIVA 0.6-9]

[CÁMARA]

Recapitulemos. Una Series es una columna con índice; un DataFrame, una tabla de Series. Explora siempre antes de analizar. Loc trabaja con etiquetas e iloc con posiciones. Filtras con máscaras y modificas con loc. Y las columnas nuevas, siempre vectorizadas.

Pero ya lo has visto: nuestros datos tienen ciento cincuenta precios vacíos y filas duplicadas. En el próximo vídeo los limpiamos.

---

## Vídeo 0.7 · pandas II: limpieza (nulos, duplicados, tipos, fechas) (duración objetivo: 20 min)

**Objetivo del vídeo:** que el estudiante diagnostique la calidad de una tabla, elimine duplicados con criterio, elija y justifique un tratamiento de nulos, corrija tipos de datos y trabaje con fechas mediante `to_datetime` y el accesor `.dt`.

**Material:** diapositivas 0.7-1 a 0.7-8; notebook del módulo, sección 4 ("Primer vistazo y limpieza"); celdas de apoyo con un pequeño DataFrame "sucio" (fechas en texto, importes con coma, ciudades mal escritas).

### [00:00–01:30] Gancho

[CÁMARA]

Imagina esta situación, que es más habitual de lo que parece. Una cadena presenta a su consejo un crecimiento de ventas del doce por ciento. Semanas después descubre que una de las tiendas había enviado sus datos dos veces. El crecimiento real era del cuatro. Nadie había comprobado si había filas duplicadas.

Se suele decir que preparar los datos es el ochenta por ciento del trabajo de un analista. Puede que sea exagerado, pero lo cierto es que un análisis con datos sucios da conclusiones falsas con total apariencia de verdad. Hoy vas a aprender a diagnosticar y limpiar los cuatro problemas más comunes: duplicados, nulos, tipos y fechas.

### [01:30–03:30] Primero, diagnosticar

[DIAPOSITIVA 0.7-1]

La regla número uno: no toques nada antes de diagnosticar.

[DEMO: ejecutar la celda de la sección 4 con isna().sum() y duplicated().sum(); después ventas.describe()]

Isna punto sum te cuenta los nulos por columna: ciento cincuenta en precio unitario. Duplicated punto sum, las filas exactamente repetidas: ochenta y siete. Describe te permite detectar valores imposibles. Y value counts sobre una columna de texto te descubre variantes como Sevilla, sevilla con espacio o SEVILLA en mayúsculas.

Fíjate en que todavía no hemos cambiado nada. Solo hemos mirado. Es como un médico: primero el diagnóstico, después el tratamiento. Y anota lo que encuentras, porque formará parte de la documentación de tu análisis: "la tabla original tenía veinte mil ochenta filas, ciento cincuenta precios vacíos y ochenta y siete duplicados".

### [03:30–06:30] Duplicados: ¿80 u 87?

[DIAPOSITIVA 0.7-2]

Ahora, un pequeño misterio. Si miras la sección tres, verás que el notebook añade exactamente ochenta filas duplicadas a propósito, con sample de ochenta. Pero duplicated encuentra ochenta y siete. ¿De dónde salen las otras siete?

[DEMO: en una celda de apoyo, mostrar las filas duplicadas que ya existían en los 20.000 originales (por ejemplo, dos ventas de Bebidas del 13 de enero en la tienda 4, 3 unidades a 4,13 €)]

Son ventas distintas que coinciden por casualidad en todo: misma fecha, misma tienda, misma categoría, mismas unidades, mismo precio. Dos clientes que compraron lo mismo el mismo día. ¿Son duplicados? En la vida real, probablemente no. Pero como en esta tabla no hay número de ticket, no podemos distinguirlas.

La lección: en datos reales, pide siempre una clave única, como el número de ticket o el identificador de pedido, y deduplica por esa clave con el parámetro subset. Y si no existe, documenta qué supuesto haces.

[DEMO: ejecutar ventas.drop_duplicates() y comprobar len antes y después]

Y un orden importante: elimina duplicados antes de imputar o de calcular totales. Si no, las filas repetidas cuentan doble.

Otro matiz: drop duplicates se queda por defecto con la primera aparición. Con el parámetro keep puedes elegir la última, que es lo habitual cuando un cliente se ha registrado varias veces y quieres sus datos más recientes. Y si quieres ver los duplicados antes de borrarlos, duplicated con keep igual a False los marca todos.

### [06:30–10:30] Nulos: por qué faltan y cómo tratarlos

[DIAPOSITIVA 0.7-3]

Pasemos a los nulos. pandas los representa como NaN. Las funciones como mean los ignoran, pero las operaciones aritméticas los propagan: tres por NaN es NaN. Si no hacemos nada, ciento cincuenta tickets tendrán ingreso vacío.

Antes de elegir un tratamiento, hazte una pregunta: ¿por qué faltan? Si faltan al azar, por un fallo puntual del lector de códigos, casi cualquier método razonable funciona. Pero imagina que los productos caros se registran a mano y es ahí donde se olvida el precio. Entonces los nulos no son aleatorios, y cualquier tratamiento sencillo introducirá sesgo.

[DIAPOSITIVA 0.7-4]

Tienes cuatro estrategias, y cada una tiene un riesgo. Eliminar las filas: pierdes información y puedes sesgar. Imputar con la mediana global: un precio de Bebidas acabaría con el valor típico de toda la tienda, demasiado alto. Imputar con la mediana de su grupo, que es lo que hace el notebook: reduce artificialmente la variabilidad, pero es razonable. Y la cuarta, que combina con cualquiera: crear antes una columna que marque qué valores eran nulos, para poder revisarlos después.

[DEMO: crear la columna indicadora ventas["precio_imputado"] = ventas["precio_unitario"].isna(); ejecutar la celda del notebook con fillna y transform("median"); mostrar ventas.groupby("categoria")["precio_unitario"].median()]

Primero marco. Después imputo. Fíjate en el transform: calcula la mediana de cada categoría y la repite en cada fila, de forma que la columna de reemplazo tiene el mismo tamaño que la original. Un precio que falta en Electrónica se rellena con unos cincuenta y ocho euros; en Bebidas, con unos cinco. ¿Por qué la mediana y no la media? Porque es robusta a valores extremos.

[DEMO: ventas.groupby("precio_imputado")["ingreso"].mean()]

Y aquí ves para qué sirve la columna indicadora: puedo comparar los tickets con precio imputado con el resto. Si se comportaran de forma muy distinta, sería una pista de que los nulos no eran aleatorios. Además, si mañana alguien pregunta cuántos precios inventamos, la respuesta está en una línea.

[CÁMARA]

Y una cosa que no debes hacer nunca: rellenar un precio con cero. Un precio cero no significa "no lo sé"; significa "lo regalé". Hundirías el ingreso medio.

¿Y cuándo sí tiene sentido rellenar con cero? Cuando el nulo realmente significa cero. Por ejemplo, en una tabla de devoluciones por cliente, un cliente sin ninguna fila de devolución ha devuelto cero productos. La clave siempre es la misma: entender qué significa que falte el dato.

### [10:30–13:30] Tipos de datos

[DIAPOSITIVA 0.7-5]

Un tipo incorrecto es un error silencioso. Una columna de importes leída como texto no se puede sumar; bueno, sí se puede, pero lo que hace es pegar los textos.

[DEMO: crear un DataFrame pequeño con importes "19,99", "5,50", "n/d" y ciudades " sevilla", "Sevilla", "SEVILLA"; aplicar pd.to_numeric(... .str.replace(",", "."), errors="coerce") y mostrar el NaN de "n/d"; normalizar la ciudad con .str.strip().str.title() y comprobar value_counts antes y después]

To numeric convierte a número. Con errors igual a coerce, lo que no pueda interpretar se convierte en NaN en lugar de dar error. Pero ojo: después cuenta cuántos NaN nuevos han aparecido y mira por qué. Aquí, "n barra d".

¿Por qué no simplemente dejar que dé error? Porque en una tabla de cien mil filas no quieres que todo se detenga por un único valor raro. Prefieres convertir lo que se pueda, y luego revisar con calma los casos problemáticos. Una buena práctica es guardar esas filas aparte y enseñárselas a quien te pasó los datos: muchas veces descubrirás errores en el sistema de origen.

Para el texto, strip quita espacios y title pone la primera letra en mayúscula. Tres variantes de Sevilla se convierten en una. Y si una columna tiene pocas categorías que se repiten mucho, el tipo category ahorra memoria.

Para valores que se escriben de muchas formas distintas, por ejemplo Sevilla, SVQ y Sev., la herramienta es un diccionario de equivalencias y el método replace o map. El diccionario documenta además qué decisiones has tomado. Y con astype conviertes explícitamente al tipo que quieras: entero, decimal, texto o booleano.

### [13:30–17:00] Fechas

[DIAPOSITIVA 0.7-6]

Las fechas merecen un capítulo propio, porque son las que te permiten responder preguntas temporales: ¿qué mes vende más?, ¿qué día de la semana?

Primero hay que convertirlas al tipo fecha con to datetime. Y aquí, otra trampa para los que escribimos las fechas día, mes, año: tres barra cuatro, ¿es tres de abril o cuatro de marzo? Al estilo estadounidense sería lo segundo. Indica siempre el formato, o el parámetro dayfirst.

El formato se escribe con unos códigos: porcentaje de para el día, porcentaje eme minúscula para el mes y porcentaje i griega mayúscula para el año con cuatro cifras. Si las fechas vienen como "2025-04-03", el formato estándar internacional, pandas las entiende sin ayuda. El problema siempre está en los formatos con barras.

[DEMO: pd.to_datetime(pd.Series(["03/04/2025", "15/04/2025"]), format="%d/%m/%Y"); después, sobre ventas, mostrar ventas["fecha"].dt.month.head(), .dt.dayofweek, .dt.day_name() y .dt.to_period("M")]

Una vez es fecha, el accesor punto dt te da sus piezas: el año, el mes, el día de la semana, donde cero es el lunes, o su nombre, que por defecto sale en inglés. Y to period con eme te da el mes como periodo, dos mil veinticinco guion cero tres, que es ideal para agrupar por meses.

[DEMO: señalar en la sección 3 el uso de dt.dayofyear para la estacionalidad y en la sección 4 la creación de la columna mes]

En el notebook usamos day of year para simular que se vende más en primavera y verano, y to period para crear la columna mes. Las dos las usarás en los ejercicios.

Con fechas también puedes hacer aritmética. Restar dos fechas te da una duración: por ejemplo, los días entre el alta de un cliente y su primera compra. Y puedes filtrar por rangos: ventas con fecha mayor o igual que el uno de junio. Por último, date range genera secuencias de fechas, como los trescientos sesenta y cinco días de dos mil veinticinco que usamos en la simulación.

### [17:00–18:45] Resultado y errores frecuentes

[DIAPOSITIVA 0.7-7]

[DEMO: ejecutar la última celda de la sección 4 y mostrar "Filas tras limpiar: 19993 | Nulos restantes: 0"]

Resultado: diecinueve mil novecientas noventa y tres filas y cero nulos. Fíjate en que el notebook termina la limpieza con una línea de verificación. Es una buena costumbre: si mañana cambian los datos, lo verás al instante.

Hagamos las cuentas para comprobarlo: veinte mil ochenta filas iniciales, menos ochenta y siete duplicados, igual a diecinueve mil novecientas noventa y tres. Y los ciento cincuenta nulos se han imputado, así que no queda ninguno. Cuadra. Este tipo de comprobación aritmética, que parece trivial, es la que habría salvado a la cadena del ejemplo del principio.

Los errores más comunes: limpiar sin diagnosticar o sin contar las filas que pierdes; imputar antes de deduplicar; fechas ambiguas; usar dropna sin subset, que elimina la fila si cualquier columna está vacía; y, sobre todo, no documentar. Quien lea tu análisis tiene que saber qué has imputado y por qué.

Una forma sencilla de documentarlo es una celda de texto al final de la limpieza con tres o cuatro viñetas: qué problemas encontraste, qué hiciste con cada uno, cuántas filas quedan y qué supuestos has hecho. Es el tipo de detalle que distingue un análisis profesional.

### [18:45–20:00] Resumen y qué viene

[DIAPOSITIVA 0.7-8]

[CÁMARA]

Recapitulemos. Diagnóstico, tratamiento y verificación, en ese orden. Deduplica por una clave única, y antes de imputar. Todo tratamiento de nulos tiene un riesgo: elige con criterio y marca lo imputado. Convierte los tipos de forma explícita y usa punto dt para las fechas.

Con los datos limpios, llega lo que de verdad le interesa a Dirección: ¿qué tienda ingresa más? ¿Qué categoría pesa más en cada ciudad? ¿Funcionan las promociones? Lo veremos en el próximo vídeo con groupby, tablas dinámicas y merge.

---

## Vídeo 0.8 · pandas III: `groupby`, tablas dinámicas y `merge` (duración objetivo: 20 min)

**Objetivo del vídeo:** que el estudiante resuma datos con `groupby` y agregaciones con nombre, distinga `agg` de `transform`, construya tablas dinámicas, combine tablas con `merge` controlando el número de filas e interprete con cautela los resultados de negocio.

**Material:** diapositivas 0.8-1 a 0.8-9; notebook del módulo, sección 5 ("Preguntas de negocio con groupby y merge").

### [00:00–01:30] Gancho

[CÁMARA]

Reunión de Dirección de TiendaSur. Primera pregunta: ¿cuál es nuestra mejor tienda? El director comercial dice: "Centro, sin duda, es la que más factura". La directora de expansión no está de acuerdo: "Depende de cómo lo midas". ¿Quién tiene razón?

Al final de este vídeo lo sabrás, con números. Para eso necesitas tres herramientas que resuelven la gran mayoría de preguntas de negocio: groupby para resumir, las tablas dinámicas para cruzar dos variables y merge para combinar tablas.

### [01:30–04:00] Dividir, aplicar, combinar

[DIAPOSITIVA 0.8-1]

Groupby sigue un esquema de tres pasos. Dividir: separa la tabla en grupos, por ejemplo uno por tienda. Aplicar: calcula algo en cada grupo, como la suma del ingreso. Combinar: junta los resultados en una tabla nueva, con una fila por grupo.

[DEMO: ejecutar ventas.groupby("tienda_id")["ingreso"].sum(); después agrupar por ["tienda_id", "categoria"]; después la celda del notebook ventas.groupby("promocion")[["unidades", "precio_unitario", "ingreso"]].mean()]

Agrupo por tienda, selecciono el ingreso y sumo. Cinco filas, una por tienda. Puedo agrupar por dos columnas a la vez, tienda y categoría. Y puedo aplicar la media en lugar de la suma.

Fíjate en el orden de la instrucción: primero el groupby con la columna por la que agrupas, luego, entre corchetes, la columna que quieres resumir, y al final la función. Si olvidas seleccionar la columna, pandas intentará resumir todas, incluidas las de texto y fechas, y o bien dará error o bien un resultado sin sentido.

[DIAPOSITIVA 0.8-2]

Si quieres varias métricas a la vez, con nombres claros, usa agg con agregaciones con nombre: ingreso total, número de tickets y ticket medio.

[DEMO: ejecutar el agg con nombre por categoría y ordenar por ingreso_total]

Las funciones que más usarás: sum, mean, median, count, size y nunique. Cuidado con count y size: count ignora los nulos y size cuenta filas. Y si pones as index igual a False, la columna de agrupación queda como columna normal, que es más cómodo para combinar o dibujar después.

Nunique es muy útil en negocio: cuántos clientes distintos compraron en cada tienda, cuántos productos distintos se vendieron en cada categoría. Y median, la mediana, es a menudo mejor resumen que la media cuando hay tickets muy grandes que tiran de la media hacia arriba.

### [04:00–07:30] agg frente a transform

[DIAPOSITIVA 0.8-3]

Ahora una de las ideas más útiles de todo el módulo, y la pregunta cuatro de la autoevaluación. ¿Qué diferencia hay entre sum y transform sum?

[DEMO: mostrar len(ventas.groupby("tienda_id")["ingreso"].sum()) → 5 y len(ventas.groupby("tienda_id")["ingreso"].transform("sum")) → 19993; mostrar las primeras filas de ambos]

Sum reduce: una fila por grupo, cinco filas. Transform difunde: devuelve una serie del mismo tamaño que la tabla original, con el total de su tienda repetido en cada fila. ¿Para qué quiero un total repetido? Para comparar cada fila con su grupo. Por ejemplo, para calcular cuotas.

La cuota de una categoría en una ciudad es su ingreso dividido entre el total de la ciudad. Con transform, el denominador está en cada fila y la división es directa. Es justo el ejercicio dos del notebook.

[DEMO: hacer el merge con tiendas para tener la ciudad, agrupar por ciudad y categoría, y calcular la cuota con transform; comprobar que cada ciudad suma 100]

Electrónica supone alrededor del treinta y ocho por ciento del ingreso en las tres ciudades. Y ya conocías transform: lo usamos en el vídeo anterior para imputar la mediana por categoría.

Y eso con solo el diez por ciento de los tickets: ¿te acuerdas del value counts del vídeo seis? La razón es el precio: unos sesenta euros por unidad frente a los cinco u ocho de Bebidas y Alimentación. Además, el mix es casi idéntico en Sevilla, Cádiz y Málaga. Para Dirección, eso significa que no hay una ciudad con un perfil de cliente distinto que justifique un surtido diferente.

Otro uso típico de transform: comparar cada ticket con la media de su tienda. Restas a cada ingreso la media de su tienda y obtienes cuánto se aleja de lo habitual en esa tienda concreta. Un ticket de cien euros puede ser normal en Centro y excepcional en Aeropuerto.

### [07:30–09:30] Tablas dinámicas

[DIAPOSITIVA 0.8-4]

Una tabla dinámica es un groupby por dos variables presentado en formato ancho: una en filas y otra en columnas. Si has usado tablas dinámicas en Excel, esto te resultará familiar.

[DEMO: ejecutar la celda de pivot_table del notebook; después repetir con margins=True]

Categorías en filas, tiendas en columnas, suma del ingreso en las celdas. Electrónica es la que más ingresa en todas las tiendas: ciento siete mil euros en Centro. Con margins igual a True añado los totales. Y si lo que quieres son proporciones, crosstab con normalize es un atajo muy cómodo.

¿Cuándo usar groupby y cuándo pivot table? Hacen lo mismo por dentro. Groupby es más flexible y produce una tabla larga, cómoda para seguir calculando o para graficar con seaborn. Pivot table produce una tabla ancha, cómoda para leer o para pegar en un informe. Elige según lo que vayas a hacer después.

### [09:30–13:00] merge: unir tablas

[DIAPOSITIVA 0.8-5]

Los datos útiles casi nunca están en una sola tabla. Las ventas tienen el identificador de tienda, pero la ciudad y los metros cuadrados están en la tabla de tiendas. Merge las une por una clave común. Es un BUSCARV, o un JOIN si vienes de SQL.

[DEMO: ventas.merge(tiendas, on="tienda_id", how="left", validate="many_to_one"); comparar len antes y después (19.993)]

Con on indico la clave. Con how, qué filas conservo. Inner, que es el valor por defecto, solo las claves que están en ambas tablas. Left, todas las de la izquierda, con vacíos si no encuentra pareja. Outer, todas.

Y dos salvaguardas que te recomiendo usar siempre. Validate, many to one, comprueba que en la tabla de tiendas no haya identificadores repetidos.

Many to one significa "muchas filas de ventas por cada tienda, pero una sola fila por tienda en la tabla de tiendas". Es la relación que esperamos. Si la tabla de la derecha tuviera dos filas con el mismo identificador, la relación sería muchos a muchos, y eso casi siempre es un error.

[DEMO: crear una copia de tiendas con una fila duplicada, repetir el merge sin validate y ver que el número de filas aumenta; repetir con validate y ver el error]

Mira lo que pasa si la tabla de tiendas tiene una tienda repetida: el merge multiplica las filas de esa tienda, sin avisar, y tus ingresos se inflan. Con validate, pandas lanza un error. Y la segunda salvaguarda: comprueba el número de filas antes y después del merge. Si cambia y no esperabas que cambiara, para y averigua por qué.

Para apilar tablas con las mismas columnas, como las ventas de enero y de febrero, se usa concat.

Un último detalle con merge: si ambas tablas tienen una columna con el mismo nombre que no es la clave, pandas las renombra añadiendo sufijos, equis e i griega. Si ves columnas con esos sufijos, es que había nombres repetidos; usa el parámetro suffixes para ponerles nombres con sentido.

### [13:00–16:00] Total frente a ratio

[DIAPOSITIVA 0.8-6]

Volvamos a la reunión. El notebook responde a la pregunta con una cadena de métodos que se lee de arriba abajo, como una receta.

[DEMO: ejecutar la celda por_tienda de la sección 5 y explicar cada línea: groupby y sum, merge con tiendas, assign con lambda para ingreso_m2, sort_values]

Agrupo por tienda y sumo el ingreso. Añado los datos de cada tienda con merge. Calculo una columna nueva, ingreso por metro cuadrado, con assign y una lambda. Y ordeno.

[CÁMARA]

¿Y el resultado? Centro es la tienda que más ingresa: unos doscientos ochenta y siete mil euros. Aeropuerto es la que menos, unos ciento cuarenta y cuatro mil. Pero por metro cuadrado, Aeropuerto es la más productiva: casi novecientos sesenta euros por metro cuadrado, frente a unos seiscientos cuarenta de Centro.

Así que los dos tenían razón. El director comercial habla de tamaño; la directora de expansión, de eficiencia. Si la decisión es dónde invertir en espacio, el ratio importa más que el total. La métrica que eliges cambia la respuesta.

Y no hay una métrica correcta en abstracto. Si la pregunta fuera qué tienda aporta más dinero a la cadena, el total sería lo relevante. Si fuera dónde rinde mejor cada metro de alquiler, el ratio. Antes de calcular, pregunta siempre qué decisión se va a tomar con el número.

[DEMO: añadir a por_tienda una columna con la cuota de cada tienda sobre el total de la cadena]

Y como ejercicio rápido: añade la cuota de cada tienda sobre el ingreso total de la cadena. Centro aporta alrededor del treinta por ciento. Un número fácil de comunicar a Dirección.

### [16:00–17:45] Promociones: primer vistazo con cautela

[DIAPOSITIVA 0.8-7]

[DEMO: ejecutar la celda de promociones del notebook y leer la tabla]

La última pregunta de Dirección: ¿funcionan las promociones? En promoción se venden más unidades por ticket, tres coma ocho frente a tres, y el precio medio es menor, trece con cincuenta y ocho frente a dieciséis. El ingreso medio por ticket sube algo, de cuarenta y ocho con ochenta a cincuenta y uno con setenta y ocho, un seis por ciento.

¿Conclusión? Todavía ninguna. Podría ser ruido. Y el precio medio también depende de qué categorías estaban en promoción: es lo que se llama efecto mezcla. Para responder con rigor necesitamos estadística: intervalos de confianza en el módulo uno y pruebas de hipótesis en el cuatro.

De hecho, en el ejercicio cuatro del notebook comprobarás algo interesante: si defines un ticket grande como el diez por ciento más caro, la proporción de tickets grandes que ocurren en promoción es prácticamente la misma que en el total. Más unidades, pero más baratas: los efectos se compensan. Es un buen recordatorio de que una primera tabla nunca es la conclusión.

### [17:45–19:00] Errores frecuentes

[DIAPOSITIVA 0.8-8]

Los errores típicos de esta lección. Un merge que multiplica filas por claves duplicadas. Un merge que pierde filas, porque es inner o porque la clave es un número en una tabla y texto en la otra. La media de medias: la media de los tickets medios de cada tienda no es el ticket medio de la cadena, porque las tiendas tienen distinto número de tickets. Y confundir count con size.

### [19:00–20:00] Resumen y qué viene

[DIAPOSITIVA 0.8-9]

[CÁMARA]

Recapitulemos. Groupby divide, aplica y combina, y con agg calculas varias métricas con nombre. Agg reduce y transform difunde, ideal para cuotas e imputaciones por grupo. Pivot table y crosstab presentan resúmenes cruzados. Merge une tablas: elige el how, usa validate y cuenta filas. Y recuerda: total y ratio responden a preguntas distintas.

Ya tienes los números. Pero a Dirección no se le presenta una tabla de veinte filas: se le presenta un gráfico que se entienda en cinco segundos. En el último vídeo del módulo aprenderás a elegir el gráfico adecuado para cada pregunta.

---

## Vídeo 0.9 · Visualización: qué gráfico usar para cada pregunta (duración objetivo: 15 min)

**Objetivo del vídeo:** que el estudiante elija el tipo de gráfico según la pregunta, construya figuras con matplotlib y seaborn (`plt.subplots`, `ax=`, `hue`), interprete un boxplot y aplique principios de diseño que hagan un gráfico claro para Dirección.

**Material:** diapositivas 0.9-1 a 0.9-8; notebook del módulo, sección 6 ("Visualización").

### [00:00–01:15] Gancho

[CÁMARA]

Tienes cinco minutos en el comité de dirección para defender que Aeropuerto es la tienda más eficiente. Llevas una tabla con cinco tiendas, tres columnas y números con decimales. A los treinta segundos, alguien está mirando el móvil.

Ahora imagina que llevas un gráfico de barras, ordenado, con Aeropuerto en otro color y un título que dice "Aeropuerto es la tienda más productiva por metro cuadrado". En cinco segundos todos lo han entendido. En este vídeo aprenderás a pasar de la pregunta al gráfico adecuado.

Y no es solo una cuestión estética. Un gráfico mal elegido puede llevar a una decisión equivocada: un eje que no empieza en cero puede hacer que una diferencia del tres por ciento parezca enorme; una tarta con diez porciones puede esconder qué categoría crece. Elegir bien el gráfico es parte del análisis, no un adorno final.

### [01:15–04:00] De la pregunta al gráfico

[DIAPOSITIVA 0.9-1]

Antes de escribir una línea de código, formula la pregunta. Casi todas caen en uno de estos tipos.

¿Quieres comparar categorías, como el ingreso de cinco tiendas? Barras. ¿Ver una evolución en el tiempo, como el ingreso mensual? Líneas. ¿Entender cómo se distribuye una variable, como el importe de los tickets? Histograma o boxplot. ¿Ver si dos variables numéricas se relacionan, como superficie e ingreso? Dispersión. ¿Mostrar cómo se reparte un todo, como el mix de categorías de cada ciudad? Barras apiladas al cien por cien. Y si cruzas dos categorías, un mapa de calor.

Esta es la pregunta cinco de la autoevaluación: barras para comparar tiendas, líneas para la evolución mensual. ¿Por qué no líneas entre tiendas? Porque una línea sugiere continuidad y orden, y las tiendas no tienen orden.

¿Y las tartas? Solo funcionan con dos o tres partes muy distintas. Con más, el ojo humano compara mal los ángulos. Unas barras siempre son más claras.

Un buen recurso para practicar esta elección es la web From Data to Viz, que encontrarás en los recursos del módulo: partes del tipo de datos que tienes y un árbol de decisión te propone los gráficos posibles, con sus ventajas y sus trampas.

### [04:00–07:30] matplotlib y seaborn en el notebook

[DIAPOSITIVA 0.9-2]

matplotlib organiza los gráficos en una figura, que es el lienzo completo, y uno o varios ejes, que son cada gráfico individual. La forma recomendada de empezar es crear los dos a la vez con plt punto subplots.

[DIAPOSITIVA 0.9-3]

[DEMO: ejecutar la primera celda de la sección 6; recorrer el código línea a línea mientras se ve el resultado: subplots(1, 2), mensual.plot(ax=axes[0]), set con título y etiquetas, sns.barplot(..., ax=axes[1]), tight_layout]

Una fila, dos gráficos, y un tamaño en pulgadas. A la izquierda, la serie de ingresos mensuales con el método plot de pandas, que es ideal para series temporales. Le digo en qué eje dibujar con ax igual a axes cero. Pongo título y unidades con set.

A la derecha, seaborn: barplot, con la tabla por tienda, la tienda en el eje x y el ingreso por metro cuadrado en el y. Seaborn trabaja directamente con DataFrames: le das la tabla y los nombres de las columnas.

Fíjate en lo que cuenta cada gráfico. La línea muestra la estacionalidad: más ingresos de primavera a verano y menos en invierno. Las barras, que Aeropuerto destaca por metro cuadrado.

[DEMO: añadir fig.savefig("ingresos.png", dpi=150, bbox_inches="tight") y mostrar el archivo generado]

Y para llevarlo a un informe, savefig con buena resolución y bbox inches tight para que no se corten las etiquetas.

¿Cuándo usar pandas, matplotlib o seaborn? Una regla práctica: el plot de pandas para una exploración rápida, sobre todo de series temporales; seaborn cuando quieres comparar grupos o distribuciones con poco código; y matplotlib para ajustar los detalles finales, como títulos, ejes o anotaciones. En la práctica, los combinarás en la misma figura, como acabas de ver.

### [07:30–10:00] El boxplot

[DIAPOSITIVA 0.9-4]

Un gráfico que mucha gente ve pero pocos saben leer: el diagrama de caja, o boxplot. Resume una distribución en cinco números. La caja va del primer cuartil, por debajo del cual está el veinticinco por ciento de los datos, al tercero, el setenta y cinco por ciento. La línea de dentro es la mediana. La altura de la caja es el rango intercuartílico. Los bigotes llegan hasta el último dato que está a menos de uno coma cinco veces ese rango. Y lo que queda fuera se dibuja como puntos sueltos: posibles atípicos.

[DEMO: ejecutar la segunda celda de la sección 6 (boxplot por categoría con hue="promocion"); señalar la caja de Electrónica con y sin promoción]

En el notebook, el boxplot compara el ingreso por ticket de cada categoría, con y sin promoción. El parámetro hue añade una tercera variable con color: es la forma más fácil de comparar subgrupos. Electrónica tiene tickets mucho mayores y más dispersos que el resto. Y hemos ocultado los atípicos con showfliers igual a False para centrarnos en las cajas.

Una pregunta que puedes hacerte mirando el gráfico: ¿la caja de promoción está por encima de la de sin promoción? En algunas categorías ligeramente, en otras casi nada. Es coherente con lo que vimos en el vídeo anterior: las diferencias son pequeñas, y por eso necesitaremos estadística para saber si son reales.

### [10:00–12:15] Principios de un gráfico claro

[DIAPOSITIVA 0.9-5]

Seis principios que convierten un gráfico correcto en un gráfico que convence.

Uno: el título cuenta la conclusión. No "Ingreso por metro cuadrado", sino "Aeropuerto es la tienda más productiva por metro cuadrado". Dos: ordena las barras de mayor a menor, salvo que tengan un orden natural, como los meses. Y empiézalas en cero: un eje truncado exagera diferencias pequeñas. Tres: etiqueta los ejes con unidades: euros, porcentaje, euros por metro cuadrado. Cuatro: usa el color con intención: un gris para todo y un color de acento para lo que quieres destacar. Cinco: compara lo comparable; tiendas de tamaño distinto se comparan mejor con ratios o índices. Y seis: fuera el 3D, las sombras y los adornos.

### [12:15–13:45] Un ejemplo de decisión

[DIAPOSITIVA 0.9-6]

Pongámoslo en práctica con el ejercicio cinco: ¿en qué tienda abrir una sección de Electrónica más grande?

Si dibujas el ingreso total de Electrónica por tienda, gana Centro. Pero gana simplemente porque es la más grande. La pregunta es sobre espacio, así que la métrica correcta es el ingreso de Electrónica por metro cuadrado. Barras ordenadas, la tienda ganadora en color, una línea con la media de la cadena como referencia y un título con la conclusión.

[CÁMARA]

El gráfico correcto no es el más bonito. Es el que responde a la decisión.

### [13:45–14:15] Errores frecuentes

[DIAPOSITIVA 0.9-7]

Un error muy común con seaborn: barplot dibuja la media, no la suma. Si le pasas una tabla con muchas filas por tienda, verás la media de cada tienda con una barrita de error. Para totales, agrega antes con groupby, como hace el notebook, o usa estimator igual a sum. Y el resto ya los conoces: líneas entre categorías, ejes truncados, demasiados colores, gráficos sin título ni unidades.

### [14:15–15:00] Resumen y cierre del módulo

[DIAPOSITIVA 0.9-8]

[CÁMARA]

Recapitulemos. La pregunta decide el gráfico. En matplotlib, una figura contiene ejes, y dibujas en cada uno con ax. El boxplot muestra mediana, cuartiles y rango intercuartílico, y hue compara subgrupos. Títulos con la conclusión, barras ordenadas desde cero, unidades y color con intención.

Con esto cierras el módulo de fundamentos. Ya sabes cargar, limpiar, resumir y visualizar datos. Ahora te toca a ti: los cinco ejercicios del notebook, cada uno con su código, su resultado y una frase de conclusión para Dirección. En el próximo módulo empezaremos a preguntarnos cuánto nos podemos fiar de lo que vemos en los datos. Nos vemos allí.
