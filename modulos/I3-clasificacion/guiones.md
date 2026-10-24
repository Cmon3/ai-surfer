# Módulo I3 · Clasificación y pruebas de hipótesis — Guiones de los vídeos

Guiones para grabar los 9 vídeos del módulo (140 minutos en total). Convenciones:

- **[DIAPOSITIVA N.M-k]**: mostrar la diapositiva con ese identificador (ver `diapositivas.md`).
- **[PANTALLA: ...]**: grabación de pantalla de lo indicado.
- **[DEMO: ...]**: ejecución en directo de una sección de `notebook.ipynb`; se describe lo que hay que mostrar, no se narra línea a línea.
- **[CÁMARA]**: plano del presentador.
- Las marcas de tiempo son orientativas. La narración está pensada a unas 100 palabras por minuto, dejando margen para las demos.

---

## Vídeo 4.1 · Problemas de clasificación en la empresa (duración objetivo: 10 min)

**Objetivo del vídeo:** que el estudiante reconozca problemas de clasificación en su entorno, entienda que un clasificador estima probabilidades y que la decisión llega después con un umbral, y sepa plantear un problema antes de modelar.

**Material:** diapositivas 4.1-1 a 4.1-6; notebook del módulo (celda de carga de datos).

### [00:00–01:30] Gancho

[CÁMARA]

Imagina que diriges el área de clientes de una operadora de telefonía. Cada mes, el tres por ciento de tus clientes se da de baja. Tienes un presupuesto para ofertas de retención: cuarenta euros por cliente. Y una pregunta muy concreta: ¿a quién se la ofreces?

Si se la das a todos, arruinas el presupuesto. Si no se la das a nadie, pierdes a los que se iban. Necesitas algo que te diga, para cada cliente, qué probabilidad tiene de irse. Y luego necesitas decidir a partir de qué probabilidad merece la pena actuar.

Eso es un problema de clasificación. Y esas dos frases, estimar una probabilidad y decidir, son el resumen de toda la primera parte del módulo.

Este módulo es el más denso del programa. Tiene dos partes. En la primera aprenderás a construir y evaluar clasificadores, y a convertir sus probabilidades en decisiones. En la segunda, a saber si una mejora que ves en tus datos es real o casualidad, con pruebas de hipótesis y experimentos A/B. Verás que las dos partes comparten una idea: los errores tienen costes distintos, y tu trabajo es gestionarlos.

### [01:30–03:30] Qué es clasificar

[DIAPOSITIVA 4.1-1]

En el módulo anterior predecías números: ventas, precios, demanda. Ahora vas a predecir categorías. Lo más habitual en la empresa es la clasificación binaria: dos clases. A una la llamamos positiva y la codificamos como uno. A la otra, negativa, cero.

Ojo con una confusión muy frecuente. La clase positiva no es la «buena». Es la que dispara una acción. El fraude que bloqueas. El cliente al que llamas. El tumor que biopsias.

[DIAPOSITIVA 4.1-2]

Fíjate en esta tabla. Fraude, abandono, crédito, spam, diagnóstico. En todos los casos hay una clase que queremos detectar y una acción asociada. Si no hay acción, probablemente no necesitas un clasificador: necesitas un informe.

Piensa un momento en tu propia empresa. ¿Qué decisiones se toman hoy caso a caso, cliente a cliente, pedido a pedido? ¿A quién se llama, qué se revisa, qué se aprueba? Detrás de casi todas hay un problema de clasificación esperando.

Y una nota rápida: además de la clasificación binaria existe la multiclase, por ejemplo clasificar un ticket de soporte en facturación, técnico o comercial, y la multietiqueta, cuando un caso puede tener varias etiquetas a la vez. La lógica de evaluación se entiende mejor en el caso binario, así que nos centraremos en él.

### [03:30–05:30] De la probabilidad a la decisión

[DIAPOSITIVA 4.1-3]

Aquí está la idea más importante del vídeo. Casi todos los clasificadores modernos no dicen «sí» o «no». Dicen un número entre cero y uno: la probabilidad estimada de ser positivo. Luego tú comparas esa probabilidad con un umbral. Si la supera, actúas.

Esto separa dos problemas. Uno estadístico: estimar bien esas probabilidades y ordenar bien a los clientes del más al menos arriesgado. Y otro de decisión: dónde pongo el listón. Ojo: scikit-learn, cuando llamas a `predict`, pone el listón en cero coma cinco sin preguntarte. Veremos en la lección 4.6 que casi nunca es el valor correcto.

### [05:30–07:00] El desequilibrio de clases

[DIAPOSITIVA 4.1-4]

Otra trampa clásica. En la mayoría de problemas de negocio, los positivos son raros. El fraude puede ser un cero coma cinco por ciento de las transacciones. ¿Qué pasa si construyes un «modelo» que dice siempre «no es fraude»? Acierta el noventa y nueve coma cinco por ciento de las veces. Un número espectacular… para un modelo que no sirve absolutamente para nada.

Por eso la exactitud, el porcentaje de aciertos, engaña en cuanto las clases están desequilibradas.

[DEMO: en el notebook, ejecutar la celda de carga de datos y mostrar la salida «569 casos | 37 % malignos»; señalar la línea `y = 1 - data.target` y explicar que el dataset original codifica 0 = maligno.]

En nuestro caso de diagnóstico, el desequilibrio es moderado: un treinta y siete por ciento de tumores malignos. Pero lo que sí es muy asimétrico es el coste de los errores. No es lo mismo una biopsia innecesaria que un cáncer sin detectar.

### [07:00–08:30] Cinco preguntas antes de modelar

[DIAPOSITIVA 4.1-5]

Antes de abrir un notebook, hazte estas cinco preguntas. ¿Qué es exactamente un positivo? ¿En qué momento predigo, y qué información tengo disponible en ese momento? Si usas datos que solo se conocen después, tu modelo será brillante en pruebas e inútil en producción: es la fuga de información. ¿Qué acción se dispara y cuánta capacidad tengo? ¿Cuánto cuesta cada error? Y, por último, ¿contra qué me comparo? Siempre hay una línea base: la regla que se usa hoy.

La cuarta pregunta, la de los costes, es la que más se olvida y la que más importa. Si no sabes cuánto cuesta un falso positivo frente a un falso negativo, no podrás elegir ni la métrica ni el umbral. Pregúntalo a negocio antes de escribir una línea de código. Aunque la respuesta sea aproximada, es mejor que ninguna.

### [08:30–09:30] Ejemplo de retención

[DIAPOSITIVA 4.1-6]

Volvamos a la operadora. Retener a un cliente vale trescientos euros. La oferta cuesta cuarenta. Marcas a mil clientes. Si solo doscientos se iban a ir de verdad, y la oferta retiene a la mitad, ganas treinta mil y gastas cuarenta mil: pierdes dinero. Si tu modelo es mejor y cuatrocientos de esos mil se iban, ganas veinte mil euros. ¿Qué ha cambiado? No la exactitud. Ha cambiado cuántos de los que marcas son positivos de verdad. Eso tiene nombre: precisión. Lo veremos en la lección 4.5.

Y fíjate en otra cosa: aunque el modelo no cambie, si en lugar de mil marcas a los quinientos con mayor riesgo, la proporción de bajas reales entre los marcados probablemente sube. Cuántos marcas es, de nuevo, una cuestión de umbral. Las dos ideas del vídeo, probabilidad y umbral, vuelven a aparecer juntas.

### [09:30–10:00] Resumen y qué viene

[CÁMARA]

Resumen: clasificar es estimar una probabilidad y decidir con un umbral. La clase positiva es la que dispara una acción. Y con clases desequilibradas, desconfía de la exactitud. En el próximo vídeo veremos el modelo con el que empieza cualquier problema de clasificación: la regresión logística.

---

## Vídeo 4.2 · Regresión logística: probabilidades y odds (duración objetivo: 15 min)

**Objetivo del vídeo:** entender cómo la regresión logística transforma una combinación lineal en una probabilidad, interpretar sus coeficientes en términos de odds y saber entrenarla correctamente con scikit-learn.

**Material:** diapositivas 4.2-1 a 4.2-6; notebook, sección 2 (comparación de modelos).

### [00:00–01:30] Gancho

[CÁMARA]

Un banco te pide explicar por qué su modelo ha rechazado un préstamo. No vale con «lo dice el algoritmo». Necesitas poder decir algo como: «cada impago previo multiplica el riesgo por tanto». Y necesitas que el modelo dé probabilidades con sentido, no números mágicos.

Hay un modelo que hace exactamente eso, que tiene más de medio siglo y que, aun así, en muchos problemas sigue siendo difícil de batir. Es la regresión logística. En nuestro notebook, de hecho, va a ser el mejor de los cuatro modelos en AUC.

### [01:30–03:30] ¿Por qué no una recta?

[DIAPOSITIVA 4.2-1]

Primera idea que se le ocurre a cualquiera: ya sé hacer regresión lineal, ¿por qué no ajusto una recta a unos y ceros? El problema es que una recta no tiene límites. Para algunos clientes te dará menos cero coma dos; para otros, uno coma tres. Eso no son probabilidades.

La solución es elegante. Seguimos usando una combinación lineal de variables, pero no para predecir la probabilidad directamente. La usamos para predecir otra cosa y luego la «aplastamos» entre cero y uno.

[DIAPOSITIVA 4.2-2]

La función que aplasta es la sigmoide. Tiene forma de ese. Cuando la combinación lineal vale cero, la probabilidad es cero coma cinco. Cuando es muy grande, se acerca a uno. Cuando es muy negativa, a cero. Cualquier número entra; siempre sale una probabilidad.

### [03:30–06:30] Odds y log-odds

[DIAPOSITIVA 4.2-3]

Para entender qué es lineal de verdad, necesitamos un concepto que a los apostantes les resulta familiar: las odds. Las odds comparan la probabilidad de que algo ocurra con la de que no ocurra. Si la probabilidad de impago es del veinte por ciento, las odds son veinte entre ochenta: cero coma veinticinco. «Uno a cuatro». Si la probabilidad es del cincuenta por ciento, las odds valen uno: a la par.

Las odds van de cero a infinito. Si les tomas el logaritmo, obtienes algo que va de menos infinito a más infinito. Eso, el log-odds, es lo que la regresión logística modela como una línea recta. Así de simple: lineal en log-odds, sigmoide en probabilidad.

Fíjate en la tabla. Una probabilidad del ochenta por ciento son odds de cuatro: cuatro a uno a favor. Una del veinte, odds de cero coma veinticinco: uno a cuatro. Son simétricas alrededor de uno, y el logaritmo las hace simétricas alrededor de cero. Por eso un log-odds positivo significa «más probable que no», y uno negativo, «menos probable que no».

¿Por qué tanto rodeo? Porque así conseguimos dos cosas a la vez: un modelo que sigue siendo lineal, fácil de estimar y de interpretar, y una salida que siempre es una probabilidad válida.

### [06:30–09:30] Interpretar coeficientes

[DIAPOSITIVA 4.2-4]

De aquí sale la interpretación que te pedirán en una reunión. Si una variable aumenta en una unidad, el log-odds sube beta. Y eso significa que las odds se multiplican por e elevado a beta. A ese número se le llama odds ratio.

Si beta es positivo, e elevado a beta es mayor que uno: la variable aumenta las odds. Si beta es negativo, es menor que uno: las reduce. Si beta es cero, e elevado a cero es uno: la variable no influye. Tres casos, una sola regla.

Pongamos un ejemplo. En un modelo de abandono, el coeficiente del número de reclamaciones es cero coma cuatro. E elevado a cero coma cuatro es uno coma cuarenta y nueve. Cada reclamación adicional multiplica las odds de baja por uno coma cuarenta y nueve. Un cuarenta y nueve por ciento más… en odds.

¿Y en probabilidad? Depende de dónde partas. Un cliente con un diez por ciento de probabilidad pasa a un catorce. Uno con un cincuenta pasa a un sesenta. El efecto en odds es constante; el efecto en probabilidad, no. Este es el error de interpretación más frecuente: decir «el coeficiente cero coma cuatro significa un cuarenta por ciento más de probabilidad». No.

Y un segundo aviso: esto es asociación, no causalidad. Que las reclamaciones aumenten el riesgo de baja no significa que poner trabas para reclamar vaya a reducir las bajas.

Te propongo un pequeño ejercicio mental. Tu cliente tiene un noventa y cinco por ciento de probabilidad de baja. Odds de diecinueve. Una reclamación más las multiplica por uno coma cuarenta y nueve: veintiocho. ¿Probabilidad? Noventa y seis y pico. Apenas se mueve. Cuando ya estás cerca de cero o de uno, la probabilidad se mueve poco aunque las odds se multipliquen. En la zona central, en cambio, se mueve mucho. Eso es la sigmoide en acción.

### [09:30–12:00] Cómo se entrena

[DIAPOSITIVA 4.2-5]

¿Cómo encuentra el modelo los coeficientes? Por máxima verosimilitud: busca los betas que hacen más probables los datos observados. En la práctica equivale a minimizar la pérdida logarítmica, la log loss. Esta pérdida castiga muchísimo equivocarse con mucha seguridad. Decir uno por ciento de probabilidad a un caso que resulta positivo cuesta caro.

¿Por qué no usar el error cuadrático, como en regresión? Porque con la sigmoide la superficie del error se vuelve muy irregular y el optimizador puede atascarse. La log loss, en cambio, da una superficie con un único mínimo, y eso hace que entrenar una regresión logística sea rápido y fiable. No hay que preocuparse por mínimos locales.

Dos detalles de scikit-learn. Primero, la regresión logística viene regularizada por defecto, como la ridge del módulo anterior. El parámetro `C` controla cuánto: cuanto más pequeño, más regularización. Segundo, por eso conviene estandarizar las variables antes. Lo hacemos con un pipeline.

El pipeline tiene una ventaja extra que no es evidente: garantiza que el escalado se aprende solo con los datos de entrenamiento. Cuando más adelante hagamos validación cruzada, en cada pliegue el escalador se ajustará únicamente con su parte de entrenamiento. Sin pipeline, es muy fácil colar información del conjunto de validación sin darte cuenta.

Y un detalle práctico: `predict_proba` devuelve dos columnas, la probabilidad de la clase cero y la de la clase uno. Nosotros nos quedamos con la segunda, la del positivo, con el corchete dos puntos coma uno.

[DEMO: notebook, sección 2. Mostrar la definición del pipeline `make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))`, ejecutar la celda de comparación de modelos y señalar en la tabla la fila de regresión logística: exactitud 0,953 y AUC 0,992. En una celda auxiliar, mostrar `np.exp(modelos["Regresión logística"][-1].coef_[0])` para ver los odds ratios.]

Fíjate en que, con las variables estandarizadas, cada coeficiente mide el efecto de una desviación típica. Eso permite compararlos entre sí.

### [12:00–14:00] Fortalezas y límites

[DIAPOSITIVA 4.2-6]

Fortalezas: es interpretable, rápida, estable, da probabilidades razonables y no sobreajusta fácilmente. Límites: supone que cada variable empuja el log-odds en línea recta y de forma aditiva. Si el riesgo tiene forma de U, o si hay interacciones, no lo captará sola.

Un ejemplo: en un seguro de coche, el riesgo de siniestro es alto para conductores muy jóvenes, baja en la edad media y vuelve a subir en edades avanzadas. Una regresión logística con la edad tal cual solo puede dibujar una tendencia creciente o decreciente. Para captar la U tendrías que crear tú la variable, por ejemplo la edad al cuadrado o tramos de edad. Los árboles, que veremos a continuación, lo hacen solos.

Y un aviso sobre este dataset en concreto: radio, perímetro y área del núcleo están casi perfectamente correlacionados. El modelo predice bien, pero no intentes interpretar el coeficiente de cada una por separado: son inestables.

Fíjate en el AUC que obtiene: cero coma noventa y nueve dos. En los próximos vídeos vamos a probar modelos mucho más sofisticados. Ya te adelanto el final: ninguno lo supera en AUC en este conjunto de datos. Guárdate esa sorpresa, porque es una de las lecciones más valiosas del módulo: empieza siempre por lo simple.

### [14:00–15:00] Resumen y qué viene

[CÁMARA]

Resumen. La regresión logística es lineal en log-odds y la sigmoide la convierte en probabilidad. Cada unidad multiplica las odds por e elevado a beta. Y es la línea base obligatoria: si un modelo más complejo no la supera claramente, quédate con ella. En el próximo vídeo veremos un modelo con una filosofía completamente distinta: el árbol de decisión.

---

## Vídeo 4.3 · Árboles de decisión (duración objetivo: 15 min)

**Objetivo del vídeo:** entender cómo se construye y se lee un árbol de decisión, por qué sobreajusta y cómo se controla, y qué implica su estructura para el AUC.

**Material:** diapositivas 4.3-1 a 4.3-6; notebook, sección 1 (árbol con `plot_tree`) y sección 2.

### [00:00–01:30] Gancho

[CÁMARA]

Un banco quiere que sus gestores puedan preaprobar tarjetas en la oficina, sin ordenador, en treinta segundos. Necesita reglas del tipo: «si ingresa más de dos mil euros y lleva más de dos años como cliente, sí». ¿Se pueden aprender esas reglas de los datos, en lugar de inventarlas en una reunión?

Sí. Eso es exactamente lo que hace un árbol de decisión.

### [01:30–03:30] La idea

[DIAPOSITIVA 4.3-1]

Un árbol de decisión es un diagrama de flujo aprendido a partir de los datos. En cada nodo hace una pregunta de sí o no sobre una variable. Según la respuesta, baja por una rama u otra. Al final llega a una hoja, que da la predicción. ¿Y la probabilidad? Es simplemente la proporción de positivos de entrenamiento que cayeron en esa hoja.

Es, con diferencia, el modelo más fácil de explicar a alguien que no sabe estadística.

Piensa en cómo decide un médico experimentado, o un analista de riesgos veterano. Muchas veces sigue precisamente este tipo de razonamiento: si pasa esto, miro aquello; si además pasa lo otro, actúo. El árbol formaliza ese razonamiento y, lo más importante, lo aprende de los datos en lugar de depender de la memoria de una persona.

### [03:30–06:30] Cómo se construye

[DIAPOSITIVA 4.3-2]

¿Cómo decide qué preguntar? El algoritmo, que se llama CART, es muy directo. Prueba todas las variables y todos los puntos de corte posibles. Para cada uno, divide los datos en dos grupos. Y se queda con la división que deja los grupos más puros, es decir, más dominados por una sola clase.

La pureza se mide con el índice de Gini. Para un nodo con una proporción p de positivos, Gini vale dos p por uno menos p. Si el nodo es puro, todo positivos o todo negativos, Gini vale cero. Si está mezclado al cincuenta por ciento, vale cero coma cinco. El árbol busca la pregunta que más baja el Gini. Luego repite en cada grupo. Una y otra vez.

Fíjate en que es un algoritmo voraz: en cada paso elige la mejor pregunta inmediata, sin pensar en las siguientes. Es rápido, pero no garantiza el mejor árbol posible.

Un ejemplo numérico rápido. Tienes un nodo con cien clientes, cincuenta que se van y cincuenta que se quedan: Gini cero coma cinco. Una pregunta los separa en dos grupos de cincuenta: uno con cuarenta y cinco bajas y otro con cinco. Cada hijo tiene un Gini de cero coma dieciocho. La impureza ha bajado de cero coma cinco a cero coma dieciocho. Es una buena pregunta. El algoritmo hace esta cuenta para todas las preguntas posibles y se queda con la que más baja.

### [06:30–09:00] Leer el árbol del notebook

[DEMO: notebook, sección 1. Ejecutar la celda del árbol de profundidad 3 y recorrer el gráfico de `plot_tree`: señalar la raíz (mean concave points ≤ 0,05), el número de muestras, el Gini y el color de cada caja. Seguir con el ratón el camino de un caso hasta una hoja maligna.]

[DIAPOSITIVA 4.3-3]

Aquí tienes el mismo árbol en texto. La primera pregunta es sobre los puntos cóncavos medios del núcleo celular. No es casualidad: es la variable que mejor separa benignos de malignos por sí sola. Si un tumor tiene muchos puntos cóncavos, muchos también en su peor valor, y un área máxima grande, el árbol dice «maligno». Esa explicación se la puedes dar a un médico. Esa trazabilidad vale oro en sectores regulados.

Piensa en un banco que tiene que explicar a un cliente por qué le han denegado un crédito, o en una aseguradora ante un regulador. Poder decir «se ha denegado porque se cumplen estas tres condiciones» es mucho más fácil de defender que «lo dice un modelo de trescientos árboles». A veces, merece la pena sacrificar algo de capacidad predictiva a cambio de esa transparencia.

### [09:00–10:30] Ventajas

[DIAPOSITIVA 4.3-4]

Más ventajas. No necesitas escalar las variables, porque el árbol solo compara cada valor con un umbral. Capta relaciones no lineales e interacciones de forma natural: la segunda pregunta depende de la respuesta a la primera. Y se traduce directamente en reglas de negocio.

Otra ventaja práctica: tolera bien variables con escalas y distribuciones muy distintas, valores extremos incluidos. Un cliente con unos ingresos desorbitados no distorsiona el árbol, porque solo importa de qué lado del corte cae. En la regresión logística, ese valor extremo sí puede tirar del coeficiente.

### [10:30–12:30] Sobreajuste e inestabilidad

[DIAPOSITIVA 4.3-5]

Ahora, el lado oscuro. Si dejas crecer un árbol sin límites, sigue preguntando hasta que cada hoja es pura, aunque tenga un solo caso. Resultado: exactitud perfecta en entrenamiento y mediocre en datos nuevos. Ha memorizado el ruido.

Además, los árboles son inestables. Cambia unos pocos datos y puede cambiar la primera pregunta… y con ella, todo el árbol.

Esto tiene una consecuencia incómoda para la interpretabilidad. Si entrenas el árbol con los datos de enero y otra vez con los de febrero, puedes obtener dos árboles con historias muy distintas. ¿Cuál es «la verdad»? Ninguno en particular. Por eso conviene no enamorarse de la estructura concreta de un árbol: es una de muchas explicaciones compatibles con los datos.

Se controla limitando su crecimiento: profundidad máxima, casos mínimos por hoja, casos mínimos para dividir, o poda por complejidad. ¿Qué valores? Los eliges con validación cruzada, igual que el alfa de ridge en el módulo anterior.

¿Por qué en el notebook usamos profundidad tres? Por pedagogía: un árbol de tres niveles cabe en una pantalla y se puede leer. No es necesariamente la profundidad óptima. Si la eligieras con validación cruzada, quizá saldría otra. Te animo a probarlo cambiando `max_depth` y observando cómo varían las métricas.

Y una pista de lo que verás: si dejas el árbol sin límite de profundidad, la exactitud en entrenamiento será perfecta, del cien por cien. Si alguna vez ves un cien por cien en entrenamiento, no lo celebres: desconfía.

### [12:30–14:15] Resultado e importancia

[DIAPOSITIVA 4.3-6]

¿Qué tal funciona nuestro árbol de profundidad tres? AUC de cero coma noventa y uno. La regresión logística, cero coma noventa y nueve. ¿Por qué tanta diferencia? Por estructura. Con profundidad tres hay ocho hojas. Eso significa que el árbol solo puede dar ocho probabilidades distintas. Ordena a los pacientes a saltos, en bloques, y el AUC, que mide precisamente la calidad de la ordenación, lo penaliza.

Los árboles también permiten medir la importancia de cada variable: cuánto reduce la impureza en total. Es útil para explorar, pero tiene sesgos. Una alternativa más fiable es la importancia por permutación. Y recuerda: importancia no es causalidad.

¿Y qué tiene de malo la importancia por impureza? Que favorece a las variables con muchos valores distintos y que, cuando dos variables están muy correlacionadas, como el radio y el perímetro, reparte el mérito entre ellas de forma bastante arbitraria. La importancia por permutación evita parte de esos problemas: baraja una variable en los datos de validación y mide cuánto empeora el modelo. Si empeora mucho, esa variable importaba.

### [14:15–15:00] Resumen y qué viene

[CÁMARA]

Resumen: un árbol hace preguntas de sí o no que maximizan la pureza. Es interpretable y capta interacciones, pero sobreajusta y es inestable. ¿Y si en lugar de un árbol entrenamos cientos y los combinamos? Eso es un ensemble, y es el tema del próximo vídeo.

---

## Vídeo 4.4 · Ensembles: random forest y gradient boosting (duración objetivo: 20 min)

**Objetivo del vídeo:** entender las dos grandes estrategias de ensembles de árboles, sus diferencias prácticas y cuándo compensa su complejidad frente a la regresión logística.

**Material:** diapositivas 4.4-1 a 4.4-7; notebook, secciones 2 y 4.

### [00:00–01:30] Gancho

[CÁMARA]

¿Qué tienen en común la detección de fraude de muchos bancos, los modelos de riesgo de las aseguradoras y la mayoría de competiciones de datos tabulares? Que, muy a menudo, el modelo ganador no es un único árbol ni una red neuronal. Es un conjunto de cientos de árboles trabajando juntos.

En este vídeo vas a ver las dos formas principales de hacerlo, por qué funcionan… y por qué, en nuestro propio notebook, no siempre ganan.

### [01:30–03:30] La idea de los ensembles

[DIAPOSITIVA 4.4-1]

Acabamos de ver que un árbol es inestable: pequeños cambios en los datos, árbol distinto. Esa inestabilidad, que es un defecto en un modelo, se convierte en una ventaja cuando combinas muchos. Si cada árbol se equivoca de forma distinta, al promediarlos los errores se compensan.

Es como preguntar a cien personas el peso de una vaca. Cada estimación individual puede ser mala, pero la media suele ser sorprendentemente buena… siempre que las personas no se copien entre sí. Retén esa condición: errores poco correlacionados.

Si todos los árboles se equivocan en los mismos casos, promediarlos no arregla nada. Toda la ingeniería de los ensembles consiste, en el fondo, en conseguir modelos que sean buenos individualmente pero que se equivoquen de forma distinta.

Hay dos estrategias casi opuestas. El random forest entrena árboles en paralelo y los promedia. El gradient boosting los entrena en secuencia, cada uno corrigiendo al anterior.

### [03:30–07:30] Random forest

[DIAPOSITIVA 4.4-2]

El random forest añade dos fuentes de azar. La primera es el bagging: cada árbol se entrena con una muestra bootstrap de los datos, es decir, muestreando con reemplazo, como hicimos en el módulo uno para los intervalos de confianza. Cada árbol ve unos datos ligeramente distintos.

La segunda es más sutil y es la clave. En cada división, el árbol no puede elegir entre todas las variables, solo entre un subconjunto aleatorio. Por defecto, la raíz cuadrada del total. ¿Para qué? Para que los árboles no se parezcan. Si no lo hicieras, todos empezarían preguntando por la misma variable dominante, la de los puntos cóncavos, y serían casi clones. Clones que se equivocan igual no se compensan.

Cada árbol se deja crecer profundo. Individualmente sobreajustan, tienen mucha varianza. Pero al promediar cientos, la varianza baja.

Es una estrategia curiosa si lo piensas: fabricas a propósito modelos que sobreajustan y luego confías en que el promedio cancele los excesos de cada uno. Funciona precisamente porque cada árbol sobreajusta a su manera, sobre su muestra y con sus variables.

Tres propiedades prácticas. Funciona bien casi sin tocar hiperparámetros. Añadir árboles nunca empeora el resultado, solo tarda más. Y te da gratis una estimación del error: cada árbol no ha visto alrededor de un tercio de los datos, y puedes evaluarlo con ellos. Es el error out-of-bag.

¿Cuántos árboles? En el notebook usamos trescientos. A partir de unos cientos, la mejora suele ser marginal. Más importante que el número es que cada árbol sea suficientemente distinto de los demás, y eso lo controla el número de variables candidatas en cada división, `max_features`. Si lo bajas, los árboles se parecen menos entre sí pero cada uno es más débil. Es un equilibrio.

### [07:30–11:30] Gradient boosting

[DIAPOSITIVA 4.4-3]

El gradient boosting funciona al revés. En lugar de árboles profundos e independientes, usa árboles pequeños, de pocas hojas, que se entrenan uno detrás de otro. El primero hace una predicción tosca. El segundo se entrena para corregir lo que el primero hace mal. El tercero corrige lo que todavía falla. Y así cientos de veces.

Piénsalo como un equipo de revisores. El primero hace un borrador. El segundo no reescribe el documento: solo corrige los errores del primero. El tercero corrige los que quedan. Ninguno de ellos es brillante por separado, pero juntos producen un texto muy pulido. Esa es la diferencia con el random forest, donde cada revisor escribía su propia versión completa y luego se votaba.

Técnicamente, cada árbol se ajusta al gradiente de la función de pérdida, que intuitivamente es «lo que les falta» a las predicciones actuales para acercarse a la verdad.

[DIAPOSITIVA 4.4-4]

La predicción final es una suma. Fíjate en la letra eta: es la tasa de aprendizaje. Encoge la aportación de cada árbol para avanzar con prudencia. Con una tasa pequeña necesitas más árboles, pero sueles generalizar mejor.

En la práctica, una receta habitual es fijar una tasa de aprendizaje moderada, por ejemplo cero coma cero cinco o cero coma uno, poner un número máximo de árboles generoso y dejar que la parada temprana decida cuántos se usan de verdad. Así solo tienes que ajustar con cuidado la complejidad de cada árbol.

Aquí viene una diferencia importante con el random forest: el boosting sí puede sobreajustar si añades demasiados árboles. Por eso se usa la parada temprana: vas vigilando el error en un conjunto de validación y paras cuando deja de mejorar.

En el notebook usamos `HistGradientBoostingClassifier`, la versión rápida de scikit-learn. Fuera de scikit-learn, los nombres que vas a oír son XGBoost, LightGBM y CatBoost.

Las tres son implementaciones muy optimizadas del mismo principio, con trucos propios: XGBoost popularizó la regularización en el boosting, LightGBM es especialmente rápida con muchos datos y CatBoost maneja muy bien las variables categóricas. Para un primer proyecto, la versión de scikit-learn es más que suficiente.

### [11:30–13:00] Comparación

[DIAPOSITIVA 4.4-5]

Resumiendo en una tabla. Random forest: paralelo, árboles profundos, reduce varianza, poco sensible a hiperparámetros, bajo riesgo de sobreajuste. Gradient boosting: secuencial, árboles pequeños, reduce sesgo, más sensible al ajuste, necesita parada temprana. En datos tabulares, el boosting bien ajustado suele ser el que mejor rinde. Suele.

Y una diferencia operativa que importa en producción: el random forest se puede entrenar en paralelo, árbol a árbol, en todos los núcleos de tu máquina. El boosting es secuencial por naturaleza: cada árbol necesita a los anteriores. Las implementaciones modernas paralelizan dentro de cada árbol, pero el orden es inevitable.

### [13:00–17:00] Lo que dice el notebook

[DEMO: notebook, sección 2. Mostrar el diccionario `modelos` con los cuatro clasificadores, ejecutar la celda y comentar el gráfico con las cuatro curvas ROC superpuestas y la tabla de métricas.]

[DIAPOSITIVA 4.4-6]

Veamos los resultados en test, con el umbral por defecto. El gradient boosting gana en exactitud, cero coma noventa y siete, y tiene solo tres falsos negativos. Pero mira la columna del AUC: la regresión logística, cero coma noventa y nueve dos, supera a los dos ensembles.

¿Cómo es posible? Dos razones. Este dataset es pequeño, quinientos sesenta y nueve casos, y las variables se relacionan con la malignidad de forma bastante monótona: cuanto más grande y más irregular el núcleo, más riesgo. Ese es el terreno ideal de un modelo lineal. Y segunda razón: con solo ciento setenta y un casos en test, una diferencia de una centésima de AUC está dentro del ruido. Un paciente más o menos lo cambia.

La lección: los ensembles no ganan siempre. Compara siempre con la línea base.

Y fíjate en otro detalle de la tabla: el árbol tiene la misma sensibilidad que la logística, cero coma noventa y tres ocho, pero una precisión mucho peor, cero coma setenta y seis. Detecta los mismos malignos, pero a costa de muchas más falsas alarmas. Si solo miraras el recall, pensarías que son equivalentes. Por eso en el próximo vídeo veremos todas las métricas juntas.

[DEMO: notebook, sección 4. Ejecutar el gráfico de las 10 variables más importantes del random forest y señalar que las primeras (mean concave points, worst concave points, worst perimeter, worst radius, worst area) están muy correlacionadas entre sí.]

### [17:00–19:00] ¿Cuándo compensa?

[DIAPOSITIVA 4.4-7]

¿Cuándo compensa la complejidad? Cuando tienes muchos datos, muchas variables e interacciones que un modelo lineal no capta. Una aseguradora con doscientos mil siniestros y ochenta variables puede pasar de un AUC de cero coma setenta y ocho a cero coma ochenta y cinco con boosting. Y si su equipo antifraude solo revisa el dos por ciento de los casos, esa mejora en la ordenación se traduce en bastantes más fraudes detectados con la misma plantilla.

El precio: ya no puedes leer el modelo como un diagrama de flujo. Tendrás que recurrir a la importancia de variables o a técnicas como SHAP. Y, como siempre, los hiperparámetros se ajustan con validación cruzada, nunca mirando el test.

Mi recomendación práctica es un orden de trabajo. Primero, una regresión logística bien hecha como línea base. Segundo, un random forest con los valores por defecto, que casi nunca decepciona. Tercero, si hay margen y los datos lo justifican, un gradient boosting con parada temprana y algo de ajuste. Y en cada paso, la pregunta: ¿la mejora compensa la pérdida de interpretabilidad y el coste de mantener el modelo en producción?

### [19:00–20:00] Resumen y qué viene

[CÁMARA]

Resumen. Random forest: muchos árboles independientes que votan, reduce varianza. Gradient boosting: árboles pequeños que se corrigen en secuencia, reduce sesgo. Los dos son muy potentes, pero no infalibles. Hasta ahora hemos hablado de AUC, exactitud o recall sin pararnos a definirlos bien. En el próximo vídeo lo hacemos: matriz de confusión, precisión, recall, curva ROC y AUC.

---

## Vídeo 4.5 · Matriz de confusión, precisión, recall, curva ROC y AUC (duración objetivo: 20 min)

**Objetivo del vídeo:** dominar las métricas de clasificación, saber cuál priorizar según el coste de los errores e interpretar correctamente la curva ROC y el AUC.

**Material:** diapositivas 4.5-1 a 4.5-8; notebook, sección 2 y matrices de confusión de la sección 3.

### [00:00–01:30] Gancho

[CÁMARA]

Un proveedor te presenta un modelo antifraude: «noventa y nueve coma cinco por ciento de exactitud». Suena fantástico. Pero si solo el cero coma cinco por ciento de las transacciones son fraude, un modelo que no detecta absolutamente nada tiene exactamente esa exactitud.

¿Qué preguntas le harías al proveedor? Al final de este vídeo tendrás la respuesta, y no volverás a aceptar un «noventa y nueve por ciento» sin más.

### [01:30–04:30] La matriz de confusión

[DIAPOSITIVA 4.5-1]

Todo empieza aquí. Una vez fijas un umbral, cada caso cae en una de cuatro casillas. Verdadero negativo: era negativo y dijiste negativo. Falso positivo: era negativo y dijiste positivo, una falsa alarma. Falso negativo: era positivo y no lo detectaste. Verdadero positivo: lo detectaste.

En scikit-learn, las filas son la realidad y las columnas la predicción. Y cuando haces `ravel`, el orden es: TN, FP, FN, TP. Apréndetelo, porque es fuente de errores constante.

[DIAPOSITIVA 4.5-2]

Estos son los números reales de nuestra regresión logística en test, con umbral cero coma cinco. De ciento siete benignos, acierta ciento tres y manda cuatro a biopsia innecesaria. De sesenta y cuatro malignos, detecta sesenta… y se le escapan cuatro. Cuatro cánceres sin detectar. Retén ese número.

Antes de seguir, una advertencia sobre la nomenclatura. Hay quien pone la clase positiva en la primera fila, hay quien pone la realidad en las columnas. Libros, programas y artículos no se ponen de acuerdo. Cuando veas una matriz de confusión ajena, lo primero es comprobar qué hay en las filas y qué en las columnas. Te ahorrarás muchos disgustos.

### [04:30–08:30] Las métricas

[DIAPOSITIVA 4.5-3]

De esa tabla salen todas las métricas. La exactitud: aciertos entre total, ciento sesenta y tres entre ciento setenta y uno, cero coma noventa y cinco.

La precisión: de los que marco como positivos, ¿cuántos lo son de verdad? Sesenta de sesenta y cuatro.

El recall, o sensibilidad: de los positivos reales, ¿cuántos detecto? Sesenta de sesenta y cuatro. Aquí coinciden por casualidad, pero son preguntas muy distintas.

La especificidad: de los negativos reales, ¿cuántos dejo tranquilos? Ciento tres de ciento siete.

Y el F1, que es la media armónica de precisión y recall, útil cuando quieres un solo número que equilibre ambas.

¿Por qué media armónica y no la media normal? Porque la armónica castiga los desequilibrios. Un modelo con precisión uno y recall cero coma cero uno tendría una media aritmética de cero coma cinco, que suena aceptable. Su F1 es cero coma cero dos: lo que de verdad vale un modelo que casi no detecta nada.

Un truco para no confundirlas: la precisión mira la columna de lo que predigo como positivo. El recall mira la fila de lo que es positivo de verdad.

[DIAPOSITIVA 4.5-4]

Y entre ellas hay una tensión inevitable. Si marcas más casos como positivos, detectas más, sube el recall, pero también cuelas más falsas alarmas, baja la precisión. ¿Cuál priorizar? Depende de qué error duele más.

En un cribado de cáncer, un falso negativo es gravísimo: prioriza recall. En un filtro de spam, lo grave es mandar a la papelera el correo de un cliente: prioriza precisión. Si tu equipo antifraude solo puede revisar trescientos casos al día, quieres que esos trescientos sean fraude de verdad: precisión.

¿Y la exactitud? Solo es una buena guía cuando las clases están equilibradas y los dos errores cuestan parecido. Fuera de ese caso, úsala como dato complementario, nunca como métrica principal.

### [08:30–12:30] La curva ROC

[DIAPOSITIVA 4.5-5]

Hasta ahora todo dependía de un umbral concreto. Pero cada umbral da una matriz de confusión distinta. ¿Cómo comparo modelos sin casarme con un umbral? Con la curva ROC.

La idea: recorres todos los umbrales posibles, de uno a cero. Para cada uno calculas dos números: la tasa de falsos positivos, en el eje horizontal, y el recall, en el vertical. Y unes los puntos. Con umbral uno no marcas a nadie: estás en la esquina cero-cero. Con umbral cero marcas a todo el mundo: esquina uno-uno. Entre medias, la curva.

Un modelo que adivina al azar sigue la diagonal. Un modelo perfecto sube en vertical hasta arriba del todo y luego va en horizontal. Cuanto más pegada a la esquina superior izquierda, mejor.

Cada punto de la curva es un umbral concreto. Moverte a lo largo de la curva es exactamente lo que harás en el próximo vídeo cuando elijas el umbral: decidir cuántas falsas alarmas aceptas a cambio de cuánta detección. La curva te enseña todo el menú; el umbral es el plato que eliges.

[DEMO: notebook, sección 2. Volver al gráfico de las curvas ROC de los cuatro modelos; señalar la diagonal, la curva escalonada del árbol de profundidad 3 (pocas probabilidades distintas) y las curvas casi pegadas a la esquina de la logística y los ensembles.]

Fíjate en la curva del árbol: va a saltos grandes. Es lo que comentamos en el vídeo anterior: solo tiene ocho probabilidades distintas.

Y fíjate también en lo pegadas que están las curvas de la logística, el random forest y el boosting. A simple vista son casi indistinguibles. Es la representación gráfica de lo que dijimos: con este tamaño de test, las diferencias entre ellos son pequeñas y no deberían decidir por sí solas qué modelo usar.

### [12:30–15:30] El AUC

[DIAPOSITIVA 4.5-6]

El AUC es el área bajo esa curva. Va de cero coma cinco, azar, a uno, perfección. Pero lo más valioso es su interpretación: el AUC es la probabilidad de que, si tomas un positivo al azar y un negativo al azar, el modelo le dé una puntuación más alta al positivo.

Nuestra logística tiene cero coma noventa y nueve dos. Si cojo un tumor maligno y uno benigno al azar, en el noventa y nueve coma dos por ciento de las parejas el maligno recibe una probabilidad más alta.

Por eso el AUC no depende del umbral: mide la calidad de la ordenación, no una decisión concreta. Y tampoco depende de que las probabilidades estén bien calibradas. Si divides todas las puntuaciones entre dos, el orden no cambia y el AUC tampoco.

Ojo con el error típico: el AUC no es «la probabilidad de acertar». Es la probabilidad de ordenar bien una pareja.

¿Para qué sirve entonces el AUC? Para comparar modelos de forma global, sin tener que acordar antes un umbral. Si un modelo tiene un AUC claramente mayor que otro, ordena mejor a los casos. Pero para decidir qué hacer en la práctica, necesitas bajar a un punto de la curva: la precisión y el recall en tu umbral de operación.

Una referencia orientativa: por debajo de cero coma siete, el modelo discrimina poco; entre cero coma siete y cero coma ocho, es aceptable; por encima de cero coma ocho, bueno; y por encima de cero coma nueve, excelente. Pero son referencias, no leyes: en fraude, un cero coma ochenta puede valer millones, y en diagnóstico, un cero coma noventa puede ser insuficiente.

### [15:30–17:30] Cuando los positivos son muy raros

[DIAPOSITIVA 4.5-7]

Un matiz importante. Imagina un problema con un positivo por cada mil casos. Una tasa de falsos positivos del uno por ciento parece pequeñísima en la curva ROC. Pero sobre un millón de negativos son diez mil falsas alarmas, frente a solo mil positivos reales. Tu precisión sería, como mucho, del nueve por ciento. La curva ROC puede verse estupenda y el modelo ser inmanejable para el equipo que revisa las alertas.

Cuando la clase positiva es muy rara, mira también la curva precisión-recall. En scikit-learn, `precision_recall_curve`.

En esa curva, el eje horizontal es el recall y el vertical la precisión. Una curva que se mantiene alta mientras el recall crece indica un modelo que puede detectar muchos positivos sin inundar al equipo de falsas alarmas. Y su resumen numérico, la *average precision*, es más exigente que el AUC cuando los positivos escasean: un AUC de cero coma noventa y cinco puede convivir con una *average precision* de cero coma treinta.

### [17:30–19:00] Errores frecuentes

[DIAPOSITIVA 4.5-8]

Repasemos los errores más comunes. Dar solo la exactitud con clases desequilibradas. Confundir precisión con exactitud: en inglés son *precision* y *accuracy*, y en castellano se mezclan constantemente. Decir que el AUC es la probabilidad de acertar. Calcular métricas sobre el entrenamiento. Y olvidar la incertidumbre: con sesenta y cuatro malignos en test, un falso negativo más o menos mueve el recall más de un punto y medio.

### [19:00–20:00] Resumen y qué viene

[CÁMARA]

Volvamos al proveedor del principio. Ya sabes qué pedirle: la matriz de confusión, la precisión y el recall en el punto de operación, y el AUC o la curva precisión-recall. Pero queda una pregunta: ¿dónde pongo el umbral? Hemos visto que con cero coma cinco se nos escapan cuatro cánceres. ¿Podemos hacerlo mejor? En el próximo vídeo vas a ver que el umbral no es una cuestión técnica: es una decisión de negocio.

---

## Vídeo 4.6 · El umbral es una decisión de negocio (duración objetivo: 10 min)

**Objetivo del vídeo:** calcular el umbral óptimo a partir de los costes de los errores, de forma teórica y empírica, sin contaminar el test, y saber comunicar el compromiso a quien decide.

**Material:** diapositivas 4.6-1 a 4.6-6; notebook, sección 3.

### [00:00–01:00] Gancho

[CÁMARA]

En el vídeo anterior nuestro modelo dejaba sin detectar cuatro cánceres de sesenta y cuatro. Hoy, sin cambiar el modelo, sin un solo dato nuevo, vamos a bajar esa cifra a uno. ¿Cómo? Moviendo un único número: el umbral. Y vas a ver que decidir dónde ponerlo no te corresponde solo a ti.

### [01:00–02:00] Por qué 0,5 no es especial

[DIAPOSITIVA 4.6-1]

El umbral de cero coma cinco tiene sentido solo si los dos tipos de error cuestan lo mismo y si las probabilidades del modelo están bien calibradas. En un cribado de cáncer, ¿cuesta lo mismo una biopsia innecesaria que un cáncer que no se detecta? Evidentemente no.

Y además, muchos modelos no dan probabilidades perfectamente calibradas. Que un random forest diga cero coma tres no significa que tres de cada diez casos con esa puntuación sean positivos. Por eso, incluso con costes iguales, el cero coma cinco puede no ser el mejor punto.

### [02:00–04:00] La regla teórica

[DIAPOSITIVA 4.6-2]

Hagamos la cuenta. Tengo un caso con probabilidad p de ser positivo. Si lo marco como positivo y me equivoco, pago el coste de un falso positivo, y eso ocurre con probabilidad uno menos p. Si lo marco como negativo y me equivoco, pago el coste de un falso negativo, con probabilidad p. Me conviene marcarlo cuando el segundo riesgo es mayor que el primero. Despejando sale esta fórmula: el umbral es el coste del falso positivo entre la suma de los dos costes.

Si un falso negativo cuesta veinte veces más, el umbral teórico es uno entre veintiuno: menos de un cinco por ciento. Basta una sospecha pequeña para actuar.

Fíjate en lo intuitivo que es: cuanto más caro es no actuar cuando debías, más fácil debe ser decidir actuar. Si el falso negativo y el falso positivo cuestan lo mismo, la fórmula da cero coma cinco, el valor por defecto. El valor por defecto es solo un caso particular.

### [04:00–07:00] La regla empírica

[DIAPOSITIVA 4.6-3]

Pero esa fórmula supone probabilidades perfectamente calibradas. En la práctica, preferimos buscar el umbral con datos: probamos todos los umbrales de cero coma cero uno a cero coma noventa y nueve y elegimos el que minimiza el coste total.

Ahora, una pregunta clave: ¿con qué datos? No con el test. Si eliges el umbral mirando el test, el test deja de ser una evaluación honesta. Usamos predicciones de validación cruzada sobre el entrenamiento: cada caso del train recibe una probabilidad de un modelo que no lo ha visto.

[DEMO: notebook, sección 3. Ejecutar la celda de `cross_val_predict` y la curva de coste total frente al umbral; señalar la línea roja en el óptimo, 0,06, y comentar que está muy cerca del valor teórico 0,048. Ejecutar después la celda de las dos matrices de confusión lado a lado (umbral 0,5 y umbral óptimo).]

[DIAPOSITIVA 4.6-4]

Y aquí está el resultado en test. Con cero coma cinco: cuatro falsos negativos y cuatro falsos positivos. Con cero coma cero seis: un solo falso negativo y dieciocho falsos positivos. Detectamos sesenta y tres de sesenta y cuatro cánceres a cambio de catorce biopsias innecesarias más. Con costes de veinte a uno, el coste total baja de ochenta y cuatro a treinta y ocho. Menos de la mitad.

Ojo, no es gratis: hemos pasado de cuatro biopsias innecesarias a dieciocho. Para cada una de esas pacientes hay angustia, tiempo y coste. Por eso este resultado solo tiene sentido si de verdad el equipo clínico considera que un cáncer no detectado es veinte veces peor. Y eso nos lleva a la pregunta clave.

### [07:00–08:30] ¿Quién fija los costes?

[DIAPOSITIVA 4.6-5]

Ahora, lo más importante del vídeo. Ese veinte a uno no lo decides tú como analista. Lo deciden, o lo validan, quienes conocen las consecuencias: el equipo médico, el área de riesgos, finanzas. Tu trabajo es hacer visible el compromiso. Una tabla con tres o cuatro umbrales y, para cada uno, cuántos casos detectas, cuántas falsas alarmas generas y cuánto cuesta, es una de las herramientas más potentes que tienes.

Te doy un consejo de comunicación: no presentes «el umbral óptimo» como si fuera una verdad matemática. Presenta opciones. «Con este umbral se nos escapan cuatro casos y hacemos cuatro biopsias de más; con este otro, se nos escapa uno y hacemos dieciocho». Quien decide entiende inmediatamente el compromiso, y la decisión pasa a ser suya, que es donde debe estar.

Hay otras formas de fijar el umbral: por capacidad, si el equipo solo puede revisar trescientos casos al día; por una restricción, como «recall de al menos el noventa y cinco por ciento»; o maximizando el beneficio esperado. scikit-learn incluso trae una clase que lo automatiza: `TunedThresholdClassifierCV`.

### [08:30–09:30] Ejemplo: microcréditos

[DIAPOSITIVA 4.6-6]

Un ejemplo rápido. Una fintech de microcréditos: un impago le cuesta cuatrocientos euros; rechazar a un buen cliente, sesenta de margen perdido. Umbral teórico: sesenta entre cuatrocientos sesenta, un trece por ciento. Pero si el área comercial tiene un objetivo de volumen, la conversación cambia. La pregunta útil no es «¿cuál es el umbral correcto?», sino «¿qué combinación de impagos y rechazos estamos dispuestos a asumir?».

### [09:30–10:00] Resumen y qué viene

[CÁMARA]

Resumen: el umbral se elige con costes, con datos de validación y nunca con el test. Y los costes los pone el negocio. Con esto cerramos la clasificación. En el próximo vídeo cambiamos de tercio: ¿cómo sabes si una mejora que ves en tus datos es real o simple azar? Pruebas de hipótesis.

---

## Vídeo 4.7 · Pruebas de hipótesis: H₀, p-valor, errores tipo I y II, potencia (duración objetivo: 20 min)

**Objetivo del vídeo:** entender la lógica de una prueba de hipótesis, interpretar correctamente el p-valor (y reconocer sus malas interpretaciones), distinguir errores tipo I y II y calcular un tamaño muestral con potencia.

**Material:** diapositivas 4.7-1 a 4.7-8; notebook, secciones 5 y 6.

### [00:00–01:30] Gancho

[CÁMARA]

Tu equipo de producto ha cambiado el botón de compra. Durante el experimento, la conversión con el botón nuevo ha sido del once y medio por ciento, frente a un nueve coma nueve con el antiguo. El director de marketing ya está preparando la nota de prensa. Pero tú tienes una duda razonable: ¿y si es casualidad? Si lanzas una moneda cien veces, no siempre salen cincuenta caras.

Hoy vas a aprender la herramienta que responde a esa duda… y, sobre todo, a no decir lo que casi todo el mundo dice mal sobre ella.

### [01:30–04:00] La lógica

[DIAPOSITIVA 4.7-1]

Una prueba de hipótesis es un razonamiento por reducción al absurdo. Paso uno: supongo que no pasa nada, que los dos botones convierten igual. Paso dos: me pregunto qué probabilidad habría de ver unos datos como los míos si eso fuera verdad. Paso tres: si esa probabilidad es muy baja, me cuesta seguir creyendo el supuesto, y lo rechazo.

Es el mismo razonamiento de un juicio. Se presume inocencia. Si las pruebas son muy difíciles de explicar siendo inocente, se condena. Y fíjate: que no se condene no significa que se haya demostrado la inocencia. Solo que no había pruebas suficientes. Volveremos a esto.

Y un detalle importante del juicio: el nivel de exigencia se decide antes de ver las pruebas. «Más allá de toda duda razonable». No se ajusta después según convenga. En estadística, ese nivel de exigencia se llama alfa, y también se fija antes.

### [04:00–06:00] Hipótesis y estadístico

[DIAPOSITIVA 4.7-2]

Formalmente: la hipótesis nula, H cero, dice que la conversión de A es igual a la de B. La alternativa, H uno, dice que son distintas. Esta es bilateral: nos interesa detectar diferencias en cualquier dirección. Elegir bilateral o unilateral se decide antes de ver los datos, nunca después.

Luego calculamos un estadístico que mide cuánto se alejan los datos de lo que esperaríamos si H cero fuera cierta. Para dos proporciones es el estadístico z: la diferencia observada dividida por su error estándar. Gracias al teorema central del límite, que viste en el módulo uno, sabemos que si H cero es cierta, z se comporta como una normal estándar. En nuestro experimento, z vale cuatro coma treinta y nueve. Cuatro errores estándar de distancia. Eso es muchísimo.

Para que te hagas una idea: en una normal estándar, el noventa y cinco por ciento de los valores está entre menos uno coma noventa y seis y más uno coma noventa y seis. Un valor de cuatro coma treinta y nueve está muy lejos de esa zona. Si los dos botones fueran iguales, sería rarísimo ver algo así.

### [06:00–09:30] El p-valor

[DIAPOSITIVA 4.7-3]

Y aquí llega el p-valor. Escúchalo despacio, porque cada palabra importa. El p-valor es la probabilidad de observar una diferencia al menos tan grande como la observada… si H cero fuera cierta.

Es una probabilidad sobre los datos, calculada suponiendo que no hay efecto.

Repite conmigo la estructura: «suponiendo que H cero es cierta, ¿qué probabilidad hay de ver algo así o más extremo?». Si memorizas esa estructura, evitarás el noventa por ciento de los errores de interpretación. En nuestro caso, uno coma uno por diez a la menos cinco. Traducido: si los dos botones convirtieran exactamente igual, una diferencia como esta o mayor saldría por azar en, aproximadamente, uno de cada noventa mil experimentos. Es tan raro que preferimos rechazar la hipótesis de que son iguales.

¿Cuándo es «suficientemente raro»? Lo fijamos de antemano con el nivel de significación, alfa. Por convención, cero coma cero cinco. Si el p-valor queda por debajo, rechazamos H cero.

Fíjate en el orden: primero fijo alfa, luego miro el p-valor. No al revés. Si eliges el umbral después de ver el resultado, «bueno, con cero coma cero siete también vale», el cinco por ciento de falsos positivos deja de estar garantizado.

[DEMO: notebook, sección 6. Ejecutar la celda del experimento A/B y mostrar la salida: conversión A 9,91 %, B 11,48 %, z = 4,39, p-valor 1,1e-05, e intervalos de Wilson de cada grupo. Leer en voz alta la celda markdown «Interpretación correcta del p-valor».]

### [09:30–12:30] Lo que el p-valor NO es

[DIAPOSITIVA 4.7-4]

Y ahora, lo que el p-valor no es. Esta diapositiva vale el vídeo entero.

Un compañero ve p igual a cero coma cero tres y dice: «hay un noventa y siete por ciento de probabilidad de que B sea mejor». Falso. El p-valor se calcula suponiendo que no hay efecto; no puede decirte la probabilidad de que haya efecto. Para eso necesitarías un análisis bayesiano, con una creencia previa.

Otro dice: «hay un tres por ciento de probabilidad de que H cero sea cierta». También falso, por la misma razón. Es probabilidad de los datos dada la hipótesis, no de la hipótesis dados los datos. Darle la vuelta a una probabilidad condicionada es un error clásico.

Un ejemplo para verlo claro. La probabilidad de que una persona hable español si ha nacido en Madrid es altísima. La probabilidad de que haya nacido en Madrid si habla español es bajísima. Darle la vuelta a la condición cambia completamente el número. Con el p-valor pasa lo mismo.

Otro: «p minúsculo, efecto enorme». Falso. Con millones de usuarios, una diferencia de una centésima de punto da un p-valor minúsculo. El p-valor no mide el tamaño del efecto.

Y el último: «p igual a cero coma veinte, así que hemos demostrado que no hay efecto». Falso. Como en el juicio: no condenar no es demostrar la inocencia. Quizá simplemente no tenías datos suficientes.

Moraleja: un p-valor nunca va solo. Siempre acompañado del tamaño del efecto y de su intervalo de confianza.

Te lo resumo con una frase que puedes usar en cualquier reunión: «el p-valor nos dice si la diferencia es difícil de explicar por azar; el intervalo de confianza nos dice cuánto vale la diferencia». Las dos cosas son necesarias, y la segunda suele ser la más útil para decidir.

### [12:30–14:30] Errores tipo I y II

[DIAPOSITIVA 4.7-5]

Al decidir, podemos equivocarnos de dos formas. Error tipo uno: rechazamos H cero cuando era cierta. Un falso positivo: lanzamos un botón que no mejora nada. Su probabilidad es alfa: con alfa cero coma cero cinco, uno de cada veinte experimentos sin efecto nos engañará.

Error tipo dos: no rechazamos H cero cuando era falsa. Un falso negativo: descartamos una buena idea. Su probabilidad se llama beta.

¿Te suena esta tabla? Es la matriz de confusión de la lección 4.5, aplicada a decisiones sobre experimentos. Las dos mitades del módulo hablan el mismo idioma.

Y como en clasificación, hay un compromiso entre ambos errores. Si eres muy exigente, con un alfa de cero coma cero cero uno, casi nunca lanzarás algo que no funciona, pero dejarás pasar muchas buenas ideas. Si eres laxo, con cero coma veinte, detectarás más mejoras reales, pero también lanzarás más cambios inútiles. El cero coma cero cinco es una convención, no una ley: en decisiones caras e irreversibles puede convenir ser más exigente.

### [14:30–16:30] Potencia

[DIAPOSITIVA 4.7-6]

La potencia es uno menos beta: la probabilidad de detectar un efecto que realmente existe. Se suele pedir un ochenta por ciento. ¿De qué depende? De cuatro cosas. Del tamaño del efecto: los efectos grandes se ven fácil. Del tamaño de la muestra: más datos, más potencia. De lo exigente que seas con alfa: cuanto más exigente, menos potencia. Y de la variabilidad de la métrica: más ruido, menos potencia.

Un experimento con poca potencia es una trampa silenciosa. Si tu potencia es del treinta por ciento, siete de cada diez veces que tu idea funcione de verdad, el experimento no encontrará una diferencia significativa. Y lo peor: el equipo concluirá «hemos probado eso y no funciona», y la idea quedará enterrada.

Y hay un efecto todavía más perverso. Cuando un experimento con poca potencia sí sale significativo, suele ser porque el azar ha inflado la diferencia. Así que el efecto que reportas tiende a estar exagerado, y cuando lances el cambio a todo el mundo, la mejora real será menor de lo prometido. La potencia no solo sirve para detectar; también protege la credibilidad de tus estimaciones.

### [16:30–19:00] Tamaño muestral

[DIAPOSITIVA 4.7-7]

Fija tres de esas cuatro cosas y puedes despejar la cuarta. Lo habitual es fijar el efecto mínimo que te interesa, alfa y la potencia, y calcular cuántos usuarios necesitas.

[DEMO: notebook, sección 5. Ejecutar la celda de `proportion_effectsize` y `NormalIndPower().solve_power` y mostrar el resultado: 14.745 usuarios por grupo para detectar 10 % → 11 %. Cambiar en directo 0.11 por 0.105 para mostrar que el número se multiplica casi por cuatro (es el ejercicio 3).]

Fíjate en el denominador de la fórmula: la diferencia al cuadrado. Si quieres detectar la mitad de efecto, necesitas cuatro veces más usuarios. Por eso hay que hacer este cálculo antes de empezar: puede que descubras que tu experimento necesitaría cuatro meses, y es mejor saberlo el primer día.

¿Y si el número que sale es inasumible? Tienes opciones. Aceptar un efecto mínimo mayor: solo te interesa detectar mejoras grandes. Aumentar el tráfico del experimento. Usar una métrica menos ruidosa o técnicas de reducción de varianza. O, simplemente, no hacer el experimento y decidir con otros criterios. Todas son mejores que lanzar un experimento condenado a no concluir nada.

### [19:00–20:00] Resumen y qué viene

[DIAPOSITIVA 4.7-8]

Para llevarte: el p-valor es la probabilidad de datos así de extremos si no hubiera efecto. No es la probabilidad de que B sea mejor. Significativo no es lo mismo que relevante. No rechazar no demuestra nada. Y el tamaño muestral se calcula antes. En el próximo vídeo juntamos todas estas piezas en una prueba A/B completa, del diseño a la recomendación.

---

## Vídeo 4.8 · Pruebas A/B de principio a fin (duración objetivo: 20 min)

**Objetivo del vídeo:** diseñar, ejecutar, analizar y comunicar una prueba A/B completa, con métrica principal, tamaño muestral, comprobación del reparto, intervalo de confianza de la diferencia y recomendación.

**Material:** diapositivas 4.8-1 a 4.8-8; notebook, secciones 5 y 6; plantilla de informe del caso práctico.

### [00:00–01:30] Gancho

[CÁMARA]

Las grandes empresas tecnológicas lanzan miles de experimentos al año. Y una de las cosas que más repiten quienes los dirigen es lo humilde que te vuelve experimentar: muchas ideas que el equipo daba por seguras no mejoran nada, o incluso empeoran las métricas. Sin un experimento bien hecho, esas ideas se habrían lanzado igualmente, con el respaldo de la intuición y de alguna gráfica bonita.

Hoy vas a aprender a hacer ese experimento bien, de principio a fin.

### [01:30–03:30] Qué es una prueba A/B

[DIAPOSITIVA 4.8-1]

Una prueba A/B es un experimento controlado aleatorizado. Repartes a los usuarios al azar: unos ven la versión actual, el control, A; otros la nueva, el tratamiento, B. Y comparas una métrica.

¿Por qué es tan potente? Por el azar. Al repartir al azar, los dos grupos son iguales en todo lo demás: edad, dispositivo, día de la semana, ganas de comprar. La única diferencia sistemática es el cambio. Así que si la métrica cambia, puedes atribuírselo al cambio. Es la forma más directa de pasar del «correlación no implica causalidad» del módulo uno a medir causalidad de verdad.

Compáralo con la alternativa habitual: lanzar el cambio a todos y comparar el mes de después con el de antes. ¿Y si ese mes hubo una campaña, cambió el tiempo o un competidor subió precios? Imposible separar el efecto del cambio de todo lo demás. Con un grupo de control que vive exactamente el mismo periodo, ese problema desaparece.

### [03:30–07:00] Fase 1: diseño

[DIAPOSITIVA 4.8-2]

Un experimento se gana o se pierde antes de lanzarlo. Seis decisiones.

Una: la hipótesis de negocio. No «probar un botón verde», sino «un botón más visible aumentará la conversión porque los usuarios lo encontrarán antes».

Dos: la unidad de aleatorización. Normalmente el usuario, no la visita. Un mismo usuario debe ver siempre la misma versión, o lo confundirás y contaminarás los grupos.

Tres: una métrica principal. Una. Decidida de antemano. En la literatura de experimentación online se la llama OEC, criterio de evaluación global.

Elegirla bien es un arte. Debe moverse en un plazo razonable, ser sensible al cambio que pruebas y estar alineada con el valor a largo plazo para el negocio. Los clics son fáciles de mover, pero un diseño que aumenta los clics puede reducir las compras. La conversión o el ingreso por visitante suelen ser mejores candidatas.

Cuatro: métricas de salvaguarda. Las que no deben empeorar: ticket medio, devoluciones, tiempo de carga.

Cinco: el efecto mínimo detectable. No es el efecto que esperas: es el menor efecto que te importaría, el que justificaría el cambio.

Una forma práctica de encontrarlo: pregunta a negocio a partir de qué mejora merecería la pena el coste de implantar y mantener el cambio. Si un punto de conversión supone cincuenta mil euros al mes y el cambio cuesta diez mil, quizá te interese detectar incluso medio punto. Si el cambio es caro, solo te interesan mejoras grandes.

Seis: alfa, potencia, tamaño muestral y duración.

Y todo, por escrito, en un plan de análisis. Es tu mejor vacuna contra las trampas del próximo vídeo.

¿Por qué tanto énfasis en escribirlo antes? Porque una vez ves los datos, todos tenemos la tentación de reinterpretar: «bueno, la conversión no ha subido, pero mira el tiempo en página»; «en general no, pero en móvil sí». Si el plan está escrito, esas reinterpretaciones se ven como lo que son: análisis exploratorios, no conclusiones.

### [07:00–09:00] Tamaño y duración

[DIAPOSITIVA 4.8-3]

En nuestro caso: conversión base del diez por ciento, queremos detectar una subida al once, alfa cero coma cero cinco, potencia ochenta por ciento. Ya lo calculamos: catorce mil setecientos cuarenta y cinco usuarios por grupo, unos treinta mil en total. Con tres mil visitas al día, diez días.

Pero no lances diez días. Redondea a semanas completas: dos semanas. El comportamiento de un lunes no es el de un sábado, y quieres que ambos grupos vivan el ciclo semanal entero.

### [09:00–11:00] Fase 2: ejecución

[DIAPOSITIVA 4.8-4]

Durante el experimento, una comprobación que muchos equipos olvidan: ¿el reparto es el que diseñaste? Si planeaste cincuenta-cincuenta y con cientos de miles de usuarios ves cincuenta coma ocho frente a cuarenta y nueve coma dos, algo falla. Se llama desajuste en la proporción de muestra, en inglés *sample ratio mismatch*. Puede ser un error en la asignación, en el registro, o que B se cargue más lento y algunos usuarios se vayan antes de contar. Se detecta con una prueba chi-cuadrado sobre los recuentos. Si lo hay, no te fíes de los resultados.

Parece un detalle técnico, pero no lo es. Un desajuste así suele indicar que los grupos ya no son comparables: por ejemplo, que los usuarios más impacientes de B se han perdido por el camino. Y entonces la diferencia que midas mezcla el efecto del cambio con un sesgo de selección.

Y vigila errores graves, como que B rompa el proceso de pago. Pero lo que no debes hacer es mirar el p-valor de la métrica principal para decidir cuándo parar. Lo veremos en el próximo vídeo.

### [11:00–15:00] Fase 3: análisis

[DIAPOSITIVA 4.8-5]

Termina el experimento. Quince mil usuarios por grupo. A convierte un nueve coma noventa y uno por ciento; B, un once coma cuarenta y ocho. Diferencia: más uno coma cincuenta y siete puntos. En relativo, un dieciséis por ciento más. El p-valor, uno coma uno por diez a la menos cinco.

[DEMO: notebook, sección 6. Volver a ejecutar la celda del análisis y, en una celda nueva, calcular el IC 95 % de la diferencia con `confint_proportions_2indep` de statsmodels (es el ejercicio 4); mostrar que da aproximadamente [+0,87 %, +2,27 %].]

[DIAPOSITIVA 4.8-6]

Pero el número que más te ayuda a decidir no es el p-valor. Es el intervalo de confianza de la diferencia. Aquí va de más cero coma ochenta y siete a más dos coma veintisiete puntos.

¿Qué nos dice? Primero, que no incluye el cero, coherente con un p-valor pequeño. Segundo, y más útil: que incluso en el escenario pesimista, la mejora es positiva. Y tercero, te da un rango para calcular el impacto económico: entre tanto y tanto al mes.

Un aviso técnico. No compares los intervalos de cada grupo por separado para ver si se solapan. Dos intervalos que se solapan un poco pueden corresponder a una diferencia significativa. Calcula siempre el intervalo de la diferencia.

Y otra forma de contarlo, la mejora relativa: un dieciséis por ciento, con un intervalo que va aproximadamente del ocho y medio al veinticuatro por ciento. A dirección le suele resultar más fácil de entender el relativo, pero para calcular el impacto en euros necesitas el absoluto: puntos de conversión por número de visitas por margen medio.

### [15:00–17:30] Fase 4: decisión

[DIAPOSITIVA 4.8-7]

Para decidir, compara el intervalo con dos referencias: el cero y tu efecto mínimo detectable. Si el intervalo está entero por encima del efecto mínimo, lanza: el efecto es real y relevante. Si excluye el cero pero incluye valores por debajo del mínimo, el efecto es real pero su tamaño es incierto: lanza si el cambio es barato. Si incluye el cero y es estrecho, probablemente no hay un efecto que importe. Y si incluye el cero y es ancho: no sabes. Te falta potencia. No digas «no funciona».

Nuestro caso: el extremo inferior, cero coma ochenta y siete, queda un poco por debajo del punto que buscábamos. El efecto es real; su tamaño exacto, algo incierto. Como cambiar un botón cuesta poco, la recomendación es lanzar.

Fíjate en que esta lectura es mucho más rica que un simple «significativo, sí o no». Con el mismo p-valor, un intervalo de cero coma uno a tres puntos y otro de uno coma cinco a uno coma siete llevan a conversaciones muy distintas. El intervalo te dice cuánta incertidumbre queda sobre el tamaño del efecto, y eso es lo que necesita quien decide. Y antes, revisar las salvaguardas: una conversión mayor que dispara las devoluciones puede no compensar.

Y una pregunta más que deberías hacerte siempre: ¿cuánto cuesta equivocarse? Si lanzar B es barato y reversible, como cambiar un botón, puedes ser menos exigente. Si es caro o irreversible, como cambiar el modelo de precios, exige más evidencia: más potencia, un intervalo más estrecho, quizá repetir el experimento.

### [17:30–19:00] El informe

[DIAPOSITIVA 4.8-8]

Y así se comunica. Hipótesis. Diseño: reparto, tamaño, efecto mínimo, duración. Resultado: diferencia con su intervalo, mejora relativa y p-valor. Calidad: sin desajuste en el reparto, salvaguardas estables. Recomendación, con impacto estimado en euros. Cinco líneas. Es exactamente lo que te pedimos en la segunda parte del caso práctico.

### [19:00–20:00] Resumen y qué viene

[CÁMARA]

Resumen: diseño por escrito antes de lanzar, una métrica principal, tamaño y duración calculados, comprobación del reparto, y análisis con efecto, intervalo y p-valor. Todo esto funciona… siempre que no caigas en tres trampas muy humanas. Son el tema del último vídeo del módulo.

---

## Vídeo 4.9 · Trampas: comparaciones múltiples, *peeking*, efecto novedad (duración objetivo: 10 min)

**Objetivo del vídeo:** reconocer y evitar las tres trampas más frecuentes en experimentación (comparaciones múltiples, mirar resultados antes de tiempo y efecto novedad) y conocer sus soluciones.

**Material:** diapositivas 4.9-1 a 4.9-7; notebook, secciones 7 y 8.

### [00:00–01:00] Gancho

[CÁMARA]

El experimento del rediseño no ha funcionado: la conversión no cambia. Pero alguien del equipo encuentra un dato: en usuarios de Android, los martes, en Cataluña, la mejora es significativa. ¿Lanzamos para ese segmento?

Si dudas, este vídeo es para ti. Vas a ver, con simulaciones, cómo hallazgos así aparecen aunque no haya absolutamente nada detrás.

### [01:00–04:00] Comparaciones múltiples

[DIAPOSITIVA 4.9-1]

Con alfa cero coma cero cinco aceptas un cinco por ciento de falsos positivos… por prueba. Si haces veinte pruebas y no hay ningún efecto real, la probabilidad de que al menos una salga significativa es uno menos cero coma noventa y cinco elevado a veinte. Un sesenta y cuatro por ciento. Más probable que no.

Y las comparaciones múltiples se cuelan por todas partes: muchas métricas, muchos segmentos, muchas variantes, muchas formas de analizar. Probar hasta que algo salga tiene nombre: p-hacking.

Y ojo, el p-hacking casi nunca es mala fe. Es humano: el experimento no ha salido, hay presión por mostrar resultados, y empiezas a buscar «a ver si en algún sitio funciona». Por eso las reglas tienen que estar fijadas antes, cuando aún no sabes qué ha salido.

[DEMO: notebook, sección 7. Ejecutar la simulación de 1.000 experimentos con 20 métricas sin efecto y mostrar la salida: 65 % sin corregir, 4 % con Holm.]

[DIAPOSITIVA 4.9-2]

La simulación lo confirma: el sesenta y cinco por ciento de los experimentos muestra al menos una métrica «significativa» sin que haya nada. Con la corrección de Holm, el cuatro por ciento.

[DIAPOSITIVA 4.9-3]

¿Cómo te defiendes? Una métrica principal, declarada antes. Si analizas varias, corrige: Bonferroni divide alfa entre el número de pruebas; Holm hace lo mismo de forma escalonada y es algo más potente; Benjamini-Hochberg controla la proporción de falsos descubrimientos, útil cuando exploras mucho. Y los segmentos inesperados no son conclusiones: son hipótesis para un nuevo experimento.

Una nota práctica sobre cuándo corregir. Si tienes una métrica principal y varias de salvaguarda, la principal se evalúa con su alfa y las demás se leen como alertas, no como hallazgos. Si de verdad tienes varias hipótesis principales, por ejemplo tres variantes frente al control, ahí sí corrige. Y si estás explorando decenas de segmentos para generar ideas, usa Benjamini-Hochberg y trata lo que salga como candidato, no como resultado.

### [04:00–07:00] *Peeking*

[DIAPOSITIVA 4.9-4]

Segunda trampa, la más humana. Lanzas el experimento y cada mañana miras el p-valor. El día seis baja de cero coma cero cinco. ¡Significativo! Paras y lanzas.

El problema: aunque no haya efecto, el p-valor sube y baja a lo largo del experimento, como un paseo aleatorio. Si te das veinte oportunidades de pillarlo por debajo de cero coma cero cinco, lo pillarás mucho más a menudo que el cinco por ciento de las veces.

[DEMO: notebook, sección 8. Ejecutar la simulación de 500 experimentos sin efecto con consulta diaria durante 20 días y mostrar la salida: «Falsos positivos mirando cada día: 27 % (debería ser 5 %)».]

Veintisiete por ciento. Más de cinco veces lo prometido. Evan Miller lo explicó en un ensayo clásico, «How Not To Run an A/B Test», que tienes en las lecturas.

[DIAPOSITIVA 4.9-5]

Soluciones. Fija el tamaño muestral antes y analiza una sola vez al final. Si necesitas poder parar antes, por ejemplo si B resulta perjudicial, usa métodos secuenciales diseñados para ello: análisis intermedios planificados con umbrales más exigentes, o pruebas secuenciales siempre válidas, que ya incorporan muchas plataformas. Mirar para detectar errores, sí. Decidir cuándo parar por el p-valor, no.

Y si alguien del equipo insiste en ver resultados parciales, enséñale la simulación del notebook. Pocas cosas convencen tanto como ver que, sin ningún efecto real, mirar cada día convierte un cinco por ciento de falsas alarmas en más de un veinticinco.

### [07:00–08:30] Efecto novedad

[DIAPOSITIVA 4.9-6]

Tercera trampa. Los usuarios habituales reaccionan a lo nuevo por ser nuevo. Un botón rediseñado recibe clics por curiosidad… durante dos semanas. Luego el efecto se desvanece. Es el efecto novedad. Y existe el contrario, el efecto primacía: al principio rechazan la interfaz nueva porque rompe sus hábitos, y con el tiempo la aceptan.

¿Cómo lo detectas? Dibuja el efecto semana a semana. Si decrece sistemáticamente, sospecha. Separa usuarios nuevos y recurrentes: los nuevos no tienen hábitos, no hay novedad para ellos. Y si puedes, mantén un pequeño grupo sin el cambio durante meses.

Este último punto, el grupo de control a largo plazo, es muy útil también para otra pregunta: ¿la suma de todas las mejoras que hemos lanzado este año se nota de verdad en el negocio? A veces, cuando comparas ese grupo con el resto, descubres que muchas mejoras pequeñas no se acumulan como esperabas.

### [08:30–09:30] Otras trampas y checklist

[DIAPOSITIVA 4.9-7]

Y unas cuantas más para tu radar: el desajuste en el reparto que vimos en el vídeo anterior; la interferencia entre grupos, típica de los marketplaces; la temporada, porque un experimento en Black Friday no generaliza a marzo; y la ley de Twyman: si un resultado parece demasiado bueno para ser verdad, probablemente es un error de datos.

Volvamos al segmento de Android en Cataluña. Con ciento veinte comparaciones, esperaríamos unas seis significativas por puro azar. Ese hallazgo no es una conclusión: es, como mucho, una hipótesis para el siguiente experimento.

### [09:30–10:00] Resumen y cierre del módulo

[CÁMARA]

Cerramos el módulo. Has aprendido a clasificar, a evaluar con la métrica correcta, a elegir el umbral según los costes, y a experimentar sin engañarte. Ahora toca practicar: el notebook, el caso práctico con su umbral y su informe A/B, y el cuestionario de la semana. Nos vemos en la sesión en vivo.
