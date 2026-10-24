# Módulo I5 · Deep learning — Guiones de los vídeos

Notas generales de producción:

- Las marcas [DIAPOSITIVA N.M-k] remiten a los comentarios `<!-- N.M-k -->` de `diapositivas.md`.
- Las demos usan `notebook.ipynb` (y, cuando se indica, `soluciones.ipynb`) ejecutados de antemano en CPU, con las salidas visibles. Las cifras citadas corresponden a la ejecución de referencia; si al regrabar cambian ligeramente, actualiza el texto.
- Ritmo objetivo: unas 100 palabras por minuto. Las demos se describen, no se leen línea a línea.

---

## Vídeo 5.1 · Del perceptrón a las redes multicapa (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante entienda qué es una neurona artificial, por qué una sola neurona se queda corta y cómo un perceptrón multicapa supera ese límite, sabiendo contar sus parámetros.

**Material:** diapositivas 5.1-1 a 5.1-7; notebook, secciones 1, 2, 3 y 5.

### [00:00–01:30] Gancho

[CÁMARA]

Imagina un centro logístico a las seis de la mañana. Entran miles de paquetes por la cinta. Muchos llevan el código postal escrito a mano, con letras de todo tipo: apresuradas, inclinadas, con un siete que parece un uno y un cuatro que parece un nueve. Alguien tiene que leerlas. Y si se equivoca, el paquete viaja a la otra punta del país, el cliente se enfada y la empresa paga dos veces el transporte.

¿Podemos enseñar a un ordenador a leer esos números? Esa es la pregunta de esta semana. Y para responderla no vamos a escribir reglas del tipo "si hay un círculo arriba y un palo abajo, es un nueve". Vamos a construir, pieza a pieza, una red neuronal que aprenda esas reglas sola, a partir de ejemplos.

[DIAPOSITIVA 5.1-1]

Empezamos con una versión reducida del problema: imágenes de dígitos de ocho por ocho píxeles. Mil setecientas noventa y siete imágenes, repartidas en entrenamiento, validación y test. Pequeño, sí. Tan pequeño que todo el notebook funciona en un portátil en pocos minutos. Pero las ideas son exactamente las mismas que en un sistema real con fotos de etiquetas.

### [01:30–04:00] La neurona artificial

[DIAPOSITIVA 5.1-2]

Vamos a la pieza más pequeña: la neurona artificial. Y olvida la biología, porque se parece a una neurona de verdad más o menos lo que un avión se parece a un pájaro. Una neurona artificial es una cuenta muy sencilla.

Piensa en un operario que decide si un paquete va a revisión manual. Mira tres cosas: si la etiqueta está borrosa, si el peso cuadra con lo declarado y si el destino es internacional. Cada cosa pesa más o menos en su decisión: quizá la etiqueta borrosa le preocupa mucho y el destino internacional, poco. Suma esas señales, y si la suma pasa de cierto nivel, aparta el paquete.

Eso es una neurona. Cada entrada se multiplica por un peso. Se suma todo, más un término fijo que llamamos sesgo, que sube o baja el listón. Al resultado lo llamamos zeta. Y a zeta se le aplica una función. En el perceptrón original, el de Rosenblatt en 1958, esa función era un escalón: si zeta es positivo, uno; si no, cero.

Ahora, fíjate en algo. Si en lugar del escalón usas la función sigmoide, esa curva en forma de ese que convierte cualquier número en una probabilidad... ¿qué tienes? Exactamente la regresión logística del módulo 4. Así que una neurona sola no es nada nuevo. Es un modelo lineal con otro nombre.

### [04:00–06:00] El límite de una sola neurona

[DIAPOSITIVA 5.1-3]

¿Y cuál es el problema de un modelo lineal? Que su frontera de decisión es una recta. O un plano, o un hiperplano si hay muchas variables. Solo puede separar clases que se dejen separar con una línea recta.

El ejemplo clásico es el XOR, el "o exclusivo". Dos variables que valen cero o uno. La clase positiva es "una u otra, pero no las dos". Mira la tabla y dibuja los cuatro puntos en un papel: los positivos están en dos esquinas opuestas y los negativos en las otras dos. Intenta separarlos con una sola recta. No hay manera.

¿Te parece un caso de laboratorio? Pues en negocio aparece todo el rato. Un descuento que atrae a clientes jóvenes, o a clientes muy antiguos, pero no a los que son ambas cosas. Un riesgo de fraude que es alto si el importe es grande o si el cliente es nuevo, pero que se comporta distinto cuando se dan las dos condiciones. Un modelo lineal no capta esas interacciones salvo que tú las construyas a mano, como hacíamos en el módulo 3 con los términos de interacción.

### [06:00–09:00] Capas y perceptrón multicapa

[DIAPOSITIVA 5.1-4]

La solución es combinar neuronas. Si pones muchas neuronas recibiendo las mismas entradas, tienes una capa. En notación matricial, una capa transforma el vector de entrada x en un vector h: multiplicas por una matriz de pesos W, sumas el vector de sesgos y aplicas la función a cada elemento.

Y si encadenas capas, tienes un perceptrón multicapa, o MLP. La entrada pasa por una o varias capas ocultas y termina en la capa de salida. Se llaman ocultas porque nadie les dice qué tienen que calcular: ni las vemos en los datos ni les damos una etiqueta.

¿Y qué hacen entonces? Aprenden variables nuevas. Variables que nadie ha definido a mano. Es como si la red hiciera su propia ingeniería de variables: combina los píxeles en trazos, y los trazos en formas. La capa de salida solo tiene que combinar esas formas para decidir qué dígito es. Con el XOR pasa lo mismo: una capa oculta con dos neuronas basta para resolverlo, porque cada neurona traza una recta y la salida combina las dos.

[DIAPOSITIVA 5.1-5]

[DEMO: notebook, sección 5. Mostrar la definición del MLP con nn.Sequential y la salida "Parámetros MLP: 17226".]

Este es el MLP del notebook. Primero, Flatten: convierte la imagen de ocho por ocho en un vector de sesenta y cuatro números. Luego, una capa de sesenta y cuatro a ciento veintiocho neuronas, con su activación ReLU. Otra de ciento veintiocho a sesenta y cuatro. Y la salida, con diez neuronas: una puntuación por cada dígito, del cero al nueve.

Vamos a contar parámetros, porque es un hábito que te va a ahorrar sustos. Una capa con d entradas y m salidas tiene d por m pesos, más m sesgos. Sesenta y cuatro por ciento veintiocho, más ciento veintiocho: ocho mil trescientos veinte. La segunda capa, ocho mil doscientos cincuenta y seis. La de salida, seiscientos cincuenta. En total: diecisiete mil doscientos veintiséis parámetros. La regresión logística tenía seiscientos cincuenta. Veintiséis veces más.

Fíjate que una capa de ciento veintiocho neuronas no tiene ciento veintiocho parámetros: tiene más de ocho mil. Es una confusión muy habitual.

### [09:00–11:30] Por qué funciona

[DIAPOSITIVA 5.1-6]

¿Por qué funciona esto tan bien? Hay un resultado teórico famoso: el teorema de aproximación universal. Dice que una red con una sola capa oculta, si es suficientemente ancha y tiene una activación no lineal, puede aproximar cualquier función continua tanto como quieras.

Suena a magia. Pero ojo, tiene letra pequeña. No dice cuántas neuronas harán falta, que pueden ser muchísimas. Y no garantiza que el entrenamiento las encuentre. Saber que la solución existe no es lo mismo que saber llegar a ella.

En la práctica, lo que funciona son las redes profundas: varias capas, no una sola muy ancha. ¿Por qué? Porque reutilizan patrones. La primera capa detecta trazos. La segunda combina trazos en curvas. La siguiente, curvas en dígitos. Cada capa construye sobre la anterior, como las piezas de un mecano. Y eso consigue lo mismo con muchos menos parámetros.

Pero cuidado: más capas significan más capacidad. Y más capacidad significa más riesgo de memorizar en lugar de aprender. Una red con muchos parámetros y pocos datos puede aprenderse de memoria el conjunto de entrenamiento. Volveremos a esto en la lección de regularización.

### [11:30–13:30] Cuándo usarlo

[DIAPOSITIVA 5.1-7]

[DEMO: notebook, secciones 2 y 5. Mostrar "Regresión logística – exactitud test: 0.964" y "MLP – exactitud test: 0.967".]

Y ahora la pregunta de negocio. En el notebook, antes de entrenar ninguna red, medimos una referencia clásica: la regresión logística consigue un 96,4 % de exactitud. El MLP, un 96,7 %. Con veintiséis veces más parámetros, gana tres décimas. En un test de trescientas sesenta imágenes, eso es un acierto más. ¿Merece la pena?

Aquí, no mucho. Y esto es una lección importante que quiero que te lleves. Si tus datos son una tabla, como clientes, siniestros o pedidos, un MLP rara vez gana a un buen gradient boosting de los que vimos en el módulo 4. El deep learning brilla de verdad con datos no estructurados: imágenes, texto, audio. Ahí es donde aprender las variables automáticamente marca la diferencia, porque nadie sabe escribir a mano las variables que describen "una abolladura" o "un tono enfadado".

Por eso, mide siempre primero un modelo sencillo. Te da una referencia, y a veces te ahorra el proyecto entero.

### [13:30–15:00] Resumen y siguiente paso

[CÁMARA]

Recapitulemos. Una neurona es una suma ponderada más un sesgo, seguida de una función. Sola, es una regresión logística y solo traza fronteras rectas. Apilando capas, la red aprende sus propias variables y puede trazar fronteras de cualquier forma. Y siempre, siempre, cuenta los parámetros.

Pero me he dejado una pieza clave sin explicar. Te he dicho "seguida de una función". ¿Qué función? ¿Y por qué es imprescindible? Eso lo vemos en el siguiente vídeo: funciones de activación y de pérdida. Mientras tanto, prueba el ejercicio 1 del notebook: una red sin capas ocultas. Piensa a qué modelo que ya conoces se parece. Te va a sonar.

---

## Vídeo 5.2 · Funciones de activación y de pérdida (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante entienda por qué son imprescindibles las activaciones no lineales, cuál elegir en cada capa y cómo funciona la entropía cruzada, incluido su uso correcto en PyTorch.

**Material:** diapositivas 5.2-1 a 5.2-7; notebook, secciones 3 y 4; soluciones.ipynb, ejercicios 1 y 3.

### [00:00–01:30] Gancho

[CÁMARA]

Un equipo de datos me contó una vez que habían construido una red de diez capas para predecir bajas de clientes. Diez capas, cientos de neuronas, horas de entrenamiento. Y daba exactamente el mismo resultado que una regresión logística. Ni una décima más.

¿Qué había pasado? Se les había olvidado una línea de código. Una sola. La función de activación entre capas. Hoy vas a entender por qué esa línea lo cambia todo. Y también vamos a ver cómo le decimos a la red qué significa "equivocarse", que es la otra mitad de la historia: la función de pérdida.

### [01:30–04:00] Sin no linealidad, la profundidad no sirve

[DIAPOSITIVA 5.2-1]

Haz conmigo esta cuenta, que es cortita. Primera capa, lineal: h es W1 por x más b1. Segunda capa, lineal: y es W2 por h más b2. Ahora sustituye h en la segunda.

Te queda W2 por W1, por x, más W2 por b1 más b2. Y W2 por W1 es... otra matriz, una sola. Y lo demás, un vector constante. Así que dos capas lineales son una capa lineal. Y tres. Y doscientas. Componer funciones lineales siempre da una función lineal.

Esto es lo que les pasó a mis amigos. Diez capas sin activación equivalen a una sola capa. Una regresión logística disfrazada, con muchos más parámetros y el mismo poder.

[DEMO: soluciones.ipynb, ejercicio 1. Mostrar que la red nn.Linear(64, 10) tiene 650 parámetros, su exactitud de 0,953 frente a 0,964 de scikit-learn y el 98 % de predicciones coincidentes.]

De hecho, en el ejercicio 1 lo verás claramente. Una red sin capas ocultas, solo una capa lineal de sesenta y cuatro a diez, tiene seiscientos cincuenta parámetros, los mismos que la regresión logística, y coincide con ella en el 98 % de las predicciones. Porque es la misma idea: una regresión logística multinomial.

La función de activación es lo que rompe esa linealidad. Es la que permite que añadir capas sirva para algo.

Piénsalo con un ejemplo de negocio. Si quieres modelar que la probabilidad de baja sube mucho cuando un cliente lleva tres meses sin comprar y además ha tenido una incidencia, necesitas que la red pueda "doblar" su respuesta: que no sea lo mismo una cosa, la otra o las dos a la vez. Una función lineal no se dobla. Una activación, sí. Cada neurona con ReLU añade un pliegue, y con suficientes pliegues puedes aproximar cualquier forma.

### [04:00–07:00] Las activaciones más usadas

[DIAPOSITIVA 5.2-2]

[DEMO: notebook, sección 3. Mostrar el gráfico con ReLU, sigmoide y tanh.]

Estas son las tres que dibuja el notebook, más una cuarta. La ReLU: el máximo entre cero y zeta. Si es negativo, cero; si es positivo, lo deja pasar tal cual. La sigmoide, que aplasta cualquier número entre cero y uno. La tangente hiperbólica, parecida pero entre menos uno y uno. Y la softmax, que no se aplica número a número sino a un vector entero: convierte un vector de puntuaciones en probabilidades positivas que suman uno.

[DIAPOSITIVA 5.2-3]

Fíjate en la forma de la sigmoide y de la tanh en el gráfico. Para valores grandes, positivos o negativos, se aplanan. Su pendiente es casi cero. Decimos que se saturan. Y esto es un problema, porque, como verás en el próximo vídeo, la red aprende siguiendo pendientes. Si la pendiente es cero, no hay señal, y no aprende.

Peor aún: en una red profunda esas pendientes se multiplican capa tras capa. Multiplica muchos números pequeños y obtienes casi nada. Las primeras capas reciben una señal tan débil que apenas se mueven. Es el famoso problema del gradiente que se desvanece, y durante años fue una de las razones por las que no se podían entrenar redes profundas.

La ReLU resolvió buena parte de esto. Su pendiente es uno cuando está activa, así que la señal pasa sin encogerse. Es barata de calcular. Y funciona. Tiene un punto débil: si una neurona se queda siempre en la zona negativa, su pendiente es cero para siempre. Muere y deja de aprender. Para eso existen variantes como Leaky ReLU, que deja pasar un poquito en la zona negativa, o GELU, que verás en los transformers. Pero la regla práctica es sencilla: ReLU en las capas ocultas, salvo que tengas un buen motivo.

### [07:00–08:30] La capa de salida

[DIAPOSITIVA 5.2-4]

La capa de salida es otra historia. No depende de la moda, sino de lo que quieras predecir.

¿Unidades vendidas? Salida lineal, sin activación, porque la respuesta puede ser cualquier número. ¿Fraude sí o no? Una neurona con sigmoide, que da una probabilidad entre cero y uno. ¿Qué dígito es? Diez neuronas cuyas puntuaciones, que llamamos logits, pasan por softmax para dar diez probabilidades que suman uno. Y cada tipo de salida va emparejado con su pérdida, como ves en la tabla.

Un apunte práctico: aunque la red dé probabilidades, eso no significa que estén bien calibradas. Una red puede decir 99 % y acertar solo el 90 % de las veces. Si tu proceso de negocio usa esas probabilidades para tomar decisiones, como mandar a revisión manual los casos dudosos, conviene comprobar la calibración, igual que hacíamos con los clasificadores del módulo 4.

### [08:30–12:00] Funciones de pérdida y entropía cruzada

[DIAPOSITIVA 5.2-5]

Ahora, ¿cómo sabe la red si lo está haciendo bien? Necesita un número que resuma su error. Un único número. Eso es la función de pérdida. Entrenar es, literalmente, buscar los pesos que hacen ese número lo más pequeño posible.

Para regresión usamos el error cuadrático medio, el mismo del módulo 3. Para clasificación, la entropía cruzada.

La entropía cruzada es más intuitiva de lo que parece. Para cada ejemplo, miras qué probabilidad le dio el modelo a la clase correcta, y calculas menos su logaritmo. Luego haces la media. Mira la tabla. Si le dio un 90 % a la clase correcta, la pérdida es 0,1. Si le dio un 50 %, 0,69. Si le dio un 10 %, 2,3. Y si le diera un 1 %, 4,6.

¿Ves el patrón? Acertar con dudas cuesta un poco. Equivocarse con confianza sale carísimo. Y eso es justo lo que queremos castigar: un modelo que dice "estoy segurísimo de que es un siete" cuando es un uno es mucho más peligroso que uno que dice "no lo tengo claro".

Un truco que uso siempre. Un modelo recién creado, con diez clases, no sabe nada: reparte las probabilidades más o menos por igual, un 10 % a cada una. Su pérdida inicial debería rondar menos el logaritmo de 0,1, que es 2,3. Si tu primera época da 2,3, vas bien. Si da 15, algo está roto en tus datos o en tu capa de salida.

[DEMO: soluciones.ipynb, ejercicio 3. Señalar en la tabla la columna "pérdida ép. 1" con valor 2,305 para lr = 1e-4.]

Aquí lo tienes: con una tasa de aprendizaje pequeña, que apenas mueve el modelo en la primera época, la pérdida media es 2,305. De libro.

### [12:00–13:30] Logits en PyTorch

[DIAPOSITIVA 5.2-6]

[DEMO: notebook, sección 4. Señalar perdida_fn = nn.CrossEntropyLoss() y, en la sección 5, la última capa nn.Linear(64, 10) sin activación.]

Un detalle práctico que provoca muchos errores. En PyTorch, CrossEntropyLoss recibe los logits, las puntuaciones brutas. Ella misma aplica la softmax y el logaritmo por dentro, de forma numéricamente estable. Por eso la última capa del notebook no lleva activación.

Si tú aplicas softmax antes, la estarás aplicando dos veces. La red entrenará peor y no te dará ningún error. Es de esos fallos silenciosos que duelen, porque todo parece funcionar. Si quieres ver probabilidades para interpretarlas, aplica softmax aparte, fuera de la pérdida.

Y otro detalle: las etiquetas tienen que ser números enteros, del cero al nueve. Si tienes clases más costosas o más raras, puedes darles más peso con el argumento weight. Es la versión de deep learning de lo que hicimos en el módulo 4 al ajustar el umbral según el coste de cada error.

### [13:30–15:00] Resumen y siguiente paso

[DIAPOSITIVA 5.2-7]

[CÁMARA]

Resumen. Sin activaciones no lineales, apilar capas no sirve de nada. ReLU en las ocultas; sigmoide o softmax en la salida, según el problema. La pérdida traduce "qué es un error" a un número que podemos minimizar. La entropía cruzada castiga sobre todo la confianza equivocada. Y un chequeo rápido: la pérdida inicial con K clases ronda el logaritmo de K.

Ya sabemos qué queremos minimizar. Pero, ¿cómo encuentra la red los diecisiete mil pesos que lo consiguen? Eso es descenso de gradiente y retropropagación, y es lo que viene en el próximo vídeo.

---

## Vídeo 5.3 · Descenso de gradiente, retropropagación y optimizadores (duración objetivo: 20 min)

**Objetivo del vídeo:** que el participante entienda cómo se ajustan los parámetros de una red (descenso de gradiente por minilotes), qué calcula la retropropagación, qué aportan los optimizadores como Adam y cómo elegir la tasa de aprendizaje mirando la curva de pérdida.

**Material:** diapositivas 5.3-1 a 5.3-8; notebook, sección 4; soluciones.ipynb, ejercicio 3.

### [00:00–01:30] Gancho

[CÁMARA]

Un equipo de pricing deja entrenando una red toda la noche para predecir la demanda de cinco mil productos. Por la mañana, la pérdida está igual que al principio. Plana. Lo primero que proponen es pedir más GPU, o una red más grande.

Yo les preguntaría otra cosa: ¿qué tasa de aprendizaje habéis usado? ¿Habéis mirado la curva? Hoy vas a entender por qué esa pregunta ahorra días de trabajo y bastante dinero. Vamos a ver cómo aprende una red de verdad, sin magia.

### [01:30–04:30] Bajar la montaña con niebla

[DIAPOSITIVA 5.3-1]

Te propongo una imagen. Estás en lo alto de una montaña, con una niebla tan espesa que no ves ni tus pies. Quieres llegar al valle. ¿Qué haces?

No ves el paisaje, pero sí notas la inclinación del suelo. Así que tanteas y das un paso hacia donde más baja. Vuelves a notar la pendiente. Otro paso. Y así hasta que el suelo deja de bajar en ninguna dirección.

Eso es el descenso de gradiente. La montaña es la función de pérdida: su altura en cada punto es lo mal que lo hace la red con esos pesos. Tu posición son los parámetros de la red: los diecisiete mil pesos y sesgos del MLP. Y la pendiente es el gradiente: un vector que dice, para cada parámetro, cuánto sube la pérdida si lo mueves un poquito.

Diecisiete mil dimensiones no se pueden dibujar, ni imaginar. Pero la idea es exactamente la misma que en la montaña. Y no necesitas ver todo el paisaje: solo la pendiente donde estás. Por eso funciona incluso con millones de parámetros.

### [04:30–08:00] La regla de actualización y la tasa de aprendizaje

[DIAPOSITIVA 5.3-2]

La regla cabe en una línea. Los parámetros nuevos son los antiguos, menos eta por el gradiente. Menos, porque el gradiente apunta hacia donde la pérdida sube, y nosotros queremos bajar. Y eta es la tasa de aprendizaje: el tamaño del paso.

Si el paso es diminuto, llegarás. Dentro de mucho tiempo, y quizá te quedes sin presupuesto antes. Si el paso es enorme, te pasas el valle, aterrizas en la ladera de enfrente, rebotas... o sales disparado montaña arriba y la pérdida empieza a crecer. Por eso digo que la tasa de aprendizaje es el hiperparámetro más importante de una red.

[DIAPOSITIVA 5.3-3]

[DEMO: soluciones.ipynb, ejercicio 3. Mostrar el gráfico de pérdida en escala logarítmica con las cuatro tasas y la tabla de resultados.]

Lo hemos probado con el MLP del notebook. Mismo modelo, mismos datos, misma semilla, cuarenta épocas. Solo cambia la tasa de aprendizaje.

Con diez a la menos cuatro, la curva baja despacio, muy despacio. Al final de las cuarenta épocas, la pérdida sigue en 0,54 y la exactitud en test se queda en un 91 %. No es que el modelo sea malo: es que no ha terminado de aprender. Es caro, no es malo.

Con diez a la menos tres, el valor por defecto de Adam, baja rápido y de forma estable. Exactitud: 96,7 %.

Con diez a la menos dos, baja todavía más deprisa, pero mira la curva: tiene repuntes, sobre todo entre las épocas diez y diecisiete. Son los rebotes contra las laderas. Aquí acaba convergiendo porque el problema es fácil.

Y con diez a la menos uno, la pérdida se queda atascada en torno a 0,35, dando tumbos, y la exactitud cae al 84 %. Pasos demasiado grandes para bajar al fondo del valle.

La regla práctica: empieza con diez a la menos tres si usas Adam. Mira la curva. Si es plana, sube la tasa. Si es errática o explota, bájala. Y prueba en saltos de diez, o de tres si quieres afinar. Tres pruebas cortas cuestan minutos.

Y una advertencia: la tasa ideal depende del optimizador, del tamaño del lote y del modelo. No hay un número mágico universal. Lo que sí es universal es el método: probar pocas épocas, comparar curvas y decidir.

### [08:00–10:00] Minilotes, épocas e iteraciones

[DIAPOSITIVA 5.3-4]

Un detalle importante. Para calcular el gradiente exacto tendrías que pasar todos los datos por la red en cada paso. Con mil imágenes, vale. Con millones de imágenes, eso es inviable: darías un paso cada hora.

Lo que se hace es usar minilotes. Tomas un lote pequeño, en el notebook de sesenta y cuatro imágenes, calculas el gradiente solo con ellas y das un paso. Luego otro lote, y otro paso. Es una estimación del gradiente: no exacta, pero barata y suficientemente buena.

Cuando has usado todos los datos una vez, has completado una época. En el notebook, mil ciento cuarenta y nueve imágenes entre sesenta y cuatro dan dieciocho pasos por época. Así que cuarenta épocas son unas setecientas actualizaciones. No confundas época con iteración: es una confusión muy común al leer artículos o documentación.

¿Y no es peor usar un gradiente aproximado? Curiosamente, no. Ese ruido ayuda a salir de zonas planas y suele hacer que el modelo generalice mejor. Por eso se llama descenso de gradiente estocástico: estocástico, porque cada paso tiene algo de azar.

### [10:00–14:30] Retropropagación

[DIAPOSITIVA 5.3-5]

Ahora, la gran pregunta. ¿Cómo calculas la derivada de la pérdida respecto a cada uno de esos diecisiete mil parámetros? ¿Uno a uno, moviendo cada peso un poquito y viendo qué pasa? Sería lentísimo: diecisiete mil pasadas por la red para un solo paso.

No. Se usa la retropropagación, o backpropagation. Y aquí va un secreto: no es más que la regla de la cadena del bachillerato, aplicada con orden.

La red es una cadena de funciones: de x sale z, de z sale la predicción, de la predicción sale la pérdida. Para saber cómo afecta un peso a la pérdida, multiplicas las derivadas de cada eslabón de la cadena.

El proceso tiene dos fases. Hacia delante: pasas los datos por la red y guardas los valores intermedios. Hacia atrás: empiezas por la pérdida y vas multiplicando derivadas locales, capa a capa, hasta la entrada. Cada capa recibe un mensaje: "esto es lo que has contribuido al error", y lo reparte entre sus pesos y la capa anterior. De ahí el nombre: el error se propaga hacia atrás.

[DIAPOSITIVA 5.3-6]

Hagamos un ejemplo con números, para que no quede en abstracto. Una sola neurona con sigmoide y error cuadrático. Entrada uno, peso 0,5, sesgo cero, y la respuesta correcta es uno.

Hacia delante: zeta vale 0,5. La sigmoide de 0,5 es 0,62. Hacia atrás: la derivada de la pérdida respecto a la predicción es dos por 0,62 menos uno. La derivada de la sigmoide es la predicción por uno menos la predicción: 0,62 por 0,38, unos 0,235. Y la de zeta respecto al peso es x, que vale uno. Multiplicamos los tres eslabones: menos 0,18.

¿Qué significa ese signo negativo? Que si subes el peso, la pérdida baja. Así que el descenso de gradiente subirá el peso. Tiene todo el sentido: la red predice 0,62 y debería predecir uno, así que hay que empujar hacia arriba.

Fíjate también en ese 0,235, la derivada de la sigmoide. Es un factor que encoge la señal. Si apilas diez capas con sigmoide, multiplicas diez factores así. Ahí tienes, en números, el gradiente que se desvanece del vídeo anterior.

Lo bonito de la retropropagación es que la pasada hacia atrás cuesta más o menos lo mismo que la pasada hacia delante. Una ida y una vuelta, y tienes todos los gradientes. Por eso podemos entrenar redes con miles de millones de parámetros.

Y lo mejor: no tienes que derivar nada a mano. PyTorch lo hace solo.

[DEMO: notebook, sección 4. Señalar las líneas perdida.backward() y opt.step() con sus comentarios.]

En el bucle del notebook lo ves en dos líneas. perdida.backward() es la retropropagación: calcula todos los gradientes. opt.step() es el paso montaña abajo. Y fíjate en la distinción: la retropropagación no aprende nada. Solo calcula. Quien aprende es el optimizador, que decide cómo usar esos gradientes.

### [14:30–18:00] Optimizadores

[DIAPOSITIVA 5.3-7]

Hablando del optimizador. El descenso de gradiente básico, SGD, tiene un problema en valles alargados, como un barranco estrecho: la pendiente más fuerte apunta a la pared de enfrente, no a lo largo del valle. Así que zigzaguea de una pared a otra y avanza poco.

Primera mejora: el momento. Imagina una bola rodando en vez de una persona andando. La bola coge inercia: si varios pasos seguidos apuntan en la misma dirección, acelera; si zigzaguea, los zigzags se compensan entre sí. Técnicamente, en vez del gradiente actual, usas una media de los gradientes recientes.

Segunda mejora: Adam. Combina el momento con una tasa de aprendizaje adaptada a cada parámetro. Los parámetros con gradientes grandes y ruidosos dan pasos más prudentes; los que apenas reciben señal, pasos relativamente más largos. El resultado es un optimizador que funciona bien casi sin tocar nada. Por eso el notebook usa Adam con diez a la menos tres, y por eso es la opción por defecto en tantos proyectos.

Y verás mucho AdamW, que es Adam con una forma correcta de penalizar pesos grandes, lo que llamamos weight decay. Lo retomamos en la lección de regularización. Es el estándar para entrenar transformers.

Dos herramientas más que conviene conocer de nombre. Los programadores de tasa de aprendizaje, o schedulers, que van reduciendo el paso a medida que te acercas al valle: pasos largos al principio, pasos finos al final. Y una buena inicialización de los pesos: empezar con valores aleatorios de la escala adecuada, que PyTorch ya hace por ti.

### [18:00–20:00] Resumen y siguiente paso

[DIAPOSITIVA 5.3-8]

[CÁMARA]

Recapitulemos. El descenso de gradiente da pasos cuesta abajo en la pérdida. La tasa de aprendizaje decide si llegas lento, bien o nunca: explórala en saltos de diez y mira la curva. Se entrena por minilotes, y una época es una pasada completa por los datos. La retropropagación es la regla de la cadena hecha con orden: backward calcula, step actualiza. Y Adam con diez a la menos tres es un buen punto de partida.

Un último consejo: cuando compares configuraciones, repite con varias semillas. La inicialización y el orden de los lotes son aleatorios, y una sola ejecución puede engañarte. Lo veremos con un ejemplo muy claro en la lección de regularización.

Ya tenemos todas las piezas teóricas. En el próximo vídeo las juntamos en código: PyTorch, tensores y el bucle de entrenamiento completo.

---

## Vídeo 5.4 · PyTorch: tensores, modelos y bucle de entrenamiento (duración objetivo: 20 min)

**Objetivo del vídeo:** que el participante sepa manejar tensores, definir un modelo, servir datos por lotes y escribir y entender el bucle de entrenamiento del notebook, evitando los errores típicos.

**Material:** diapositivas 5.4-1 a 5.4-8; notebook, secciones 1, 4, 5 y 6.

### [00:00–01:30] Gancho

[CÁMARA]

Un caso real de los que se repiten en muchas empresas: un modelo de visión funciona de maravilla en el portátil del científico de datos. Un 97 % de exactitud. Lo despliegan. Y en producción, la exactitud se hunde. Nadie ha tocado el modelo. Pasan dos semanas revisando la arquitectura. ¿Qué había pasado?

Que en producción las imágenes llegaban con valores de cero a doscientos cincuenta y cinco, y el modelo se había entrenado con valores de cero a uno. Un detalle de preprocesado. Hoy vamos a escribir el código de entrenamiento con PyTorch, y por el camino vas a aprender a evitar este tipo de sustos.

### [01:30–03:30] Por qué PyTorch

[DIAPOSITIVA 5.4-1]

PyTorch es hoy la librería de deep learning más usada en investigación y una de las dominantes en la industria. Detrás de muchos de los modelos que oyes en las noticias hay código de PyTorch. Te da tres cosas. Tensores, que son como los arrays de NumPy pero pueden vivir en una GPU. Diferenciación automática: los gradientes que vimos en el vídeo anterior, gratis. Y una caja de herramientas con capas, pérdidas, optimizadores y utilidades para cargar datos.

Su estilo es muy de Python. No hay un fit mágico como en scikit-learn: el bucle de entrenamiento lo escribes tú. Al principio parece más trabajo. Pero te da control total: puedes medir lo que quieras en cada época, parar cuando quieras, cambiar el bucle para un caso raro. Y sobre todo, entiendes lo que pasa por dentro.

### [03:30–06:30] Tensores

[DIAPOSITIVA 5.4-2]

[DEMO: notebook, sección 1. Mostrar la función loader y, en una celda auxiliar, imprimir torch.tensor(X_train).unsqueeze(1).shape, el dtype y el device.]

Un tensor tiene tres atributos que tienes que vigilar siempre: forma, tipo y dispositivo.

La forma de nuestros datos de entrenamiento es mil ciento cuarenta y nueve, uno, ocho, ocho. Lote, canales, alto y ancho. ¿De dónde sale ese uno? Del unsqueeze del notebook, que añade una dimensión. Las capas convolucionales esperan imágenes con canales. Una imagen en gris tiene un canal; una en color, tres: rojo, verde y azul.

El tipo es float32 para las imágenes. Para las etiquetas, enteros de sesenta y cuatro bits: CrossEntropyLoss los necesita así.

Y el dispositivo: CPU o GPU. El modelo y los datos tienen que estar en el mismo sitio. Si el modelo está en la GPU y le pasas un lote que está en la CPU, PyTorch protesta.

Te lo digo ya: la inmensa mayoría de errores de principiante en PyTorch son de una de estas tres cosas. Forma, tipo o dispositivo. Cuando algo falle, antes de buscar en internet, imprime las tres. Te ahorrarás mucho tiempo.

Un detalle que confunde al principio: los tensores de PyTorch y los arrays de NumPy se convierten fácilmente entre sí. torch.tensor convierte un array en tensor, y el método numpy hace el camino inverso. Pero ojo con los tipos: NumPy usa por defecto float64, y las redes trabajan en float32. Por eso en el notebook, al cargar los datos, convertimos explícitamente las imágenes a float32. Si no lo haces, te encontrarás un error de tipos en la primera capa.

### [06:30–08:30] Autograd

[DIAPOSITIVA 5.4-3]

Veamos el autograd en tres líneas. Creo un tensor w que vale dos y le digo que quiero su gradiente: requires_grad igual a True. Calculo una pérdida: tres por w menos cinco, al cuadrado. Llamo a backward. Y en w.grad aparece seis.

Compruébalo a mano: la derivada es dos por tres w menos cinco, por tres. Con w igual a dos, tres w menos cinco vale uno, así que da dos por uno por tres: seis. PyTorch ha ido apuntando cada operación que hacíamos con w, construyendo un grafo, y luego lo ha recorrido hacia atrás con la regla de la cadena. En una red es lo mismo, con muchos más parámetros y muchas más operaciones. Y los parámetros de las capas ya vienen con el gradiente activado: no tienes que hacer nada.

### [08:30–10:30] Modelos y datos

[DIAPOSITIVA 5.4-4]

Un modelo en PyTorch es un nn.Module: un objeto que guarda parámetros y sabe hacer la pasada hacia delante. Para arquitecturas en cadena, como las del notebook, basta con nn.Sequential: le pasas las capas en orden y listo. Si necesitas algo más flexible, por ejemplo dos entradas distintas o una conexión que se salta capas, escribes una clase con un método forward, como esta de la diapositiva.

Y para contar parámetros, la línea que ya conoces: sumar numel de cada parámetro. Hazlo siempre antes de entrenar.

[DIAPOSITIVA 5.4-5]

Los datos los sirve un DataLoader. TensorDataset empaqueta imágenes y etiquetas, y DataLoader las reparte en lotes de sesenta y cuatro. En entrenamiento, barajadas en cada época, para que los lotes sean distintos; en validación y test no hace falta. Con fotos reales en disco, que no caben en memoria, escribirías tu propio Dataset, que lee cada imagen solo cuando se necesita.

### [10:30–15:00] El bucle de entrenamiento

[DIAPOSITIVA 5.4-6]

Y llegamos al corazón. Este patrón de cinco pasos lo vas a ver en prácticamente cualquier código de PyTorch del mundo. Apréndetelo de memoria.

Uno: zero_grad. Borra los gradientes del paso anterior. PyTorch los acumula; si no los borras, cada paso suma los de todos los anteriores y el entrenamiento se vuelve loco.

Dos: la pasada hacia delante. Le das el lote al modelo y te devuelve los logits.

Tres: la pérdida. Comparas logits con etiquetas.

Cuatro: backward. Retropropagación: todos los gradientes calculados.

Cinco: step. El optimizador mueve los parámetros un pasito montaña abajo.

Y se repite para cada lote. Y todo eso, para cada época.

[DEMO: notebook, sección 4. Recorrer la función entrenar de arriba abajo: creación del optimizador y la pérdida, el bucle por épocas, el bucle por lotes, el historial y el bloque de early stopping.]

Ahora mira la función entrenar del notebook. Dentro está ese bucle, pero rodeado de lo que necesita un bucle profesional. Crea el optimizador Adam con la tasa que le pases y la pérdida de entropía cruzada. Para cada época, pone el modelo en modo entrenamiento, recorre los lotes con los cinco pasos y va acumulando la pérdida, ponderada por el tamaño de cada lote. Al final de la época, mide la exactitud en entrenamiento y en validación y lo guarda todo en un historial. Ese historial es el que luego dibuja la función curvas: las curvas de aprendizaje.

Y si le pasas una paciencia, hace early stopping: guarda una copia de los pesos cada vez que mejora la exactitud de validación y, si pasan tantas épocas sin mejorar, se detiene y restaura la mejor copia. Lo explicaremos a fondo en la lección de regularización.

Una ventaja de escribirla una vez: la reutilizamos para el MLP, para la CNN y para todos los ejercicios. Es una buena práctica que te recomiendo en tus proyectos.

Fíjate también en un detalle de la función exactitud: compara el argmax de los logits con la etiqueta. El argmax es la posición de la puntuación más alta, es decir, el dígito que la red considera más probable. No hace falta aplicar softmax para eso, porque softmax no cambia el orden de las puntuaciones.

Y otro detalle: la pérdida que guardamos en el historial es la media de la época, calculada mientras los pesos van cambiando. Por eso es una aproximación de la pérdida real al final de la época. Para comparar curvas es más que suficiente; si necesitas el valor exacto, recalcúlala con el modelo en modo eval, como hacemos en el notebook de soluciones.

### [15:00–17:30] Alrededor del bucle

[DIAPOSITIVA 5.4-7]

Hay detalles alrededor del bucle que marcan la diferencia.

train y eval. Algunas capas, como el dropout, se comportan distinto al entrenar y al predecir. La función exactitud del notebook llama a modelo.eval() antes de medir. Si se te olvida, el dropout sigue apagando neuronas al azar y tus métricas salen peor de lo que son, y además cambian cada vez que las calculas.

torch.no_grad. Al evaluar no necesitas gradientes, así que le dices a PyTorch que no construya el grafo. Ahorra memoria y tiempo.

El dispositivo: el notebook decide al principio si hay GPU y mueve modelo y datos con .to. En Colab puedes activar la GPU, aunque con este problema tan pequeño no hace falta.

Y para guardar el modelo, guardas su state_dict: un diccionario con los pesos. Ojo, solo los pesos: para cargarlos necesitas el mismo código de la arquitectura. Guarda siempre las dos cosas juntas, con su versión.

[DEMO: notebook, sección 5. Ejecutar la celda del MLP y mostrar las curvas y la exactitud final.]

Si ejecutas la sección 5, verás todo esto en acción: el MLP se entrena en unos segundos en CPU, aparecen las curvas de pérdida y de exactitud, y al final la exactitud en test.

### [17:30–19:00] Errores frecuentes

[DIAPOSITIVA 5.4-8]

Repasemos los errores que más veo en los proyectos de los alumnos. Olvidar zero_grad. Evaluar sin eval. Olvidar el Flatten antes de una capa lineal y encontrarte un error de formas que no entiendes. Usar el conjunto de test para tomar decisiones durante el desarrollo: para eso está la validación; el test, una vez y al final. Y el del principio del vídeo: preprocesar distinto en producción. Lo que hagas a los datos al entrenar, hazlo exactamente igual al predecir. Idealmente, con la misma función.

Y un consejo general: cuando el entrenamiento no funcione, reduce el problema. Coge un lote pequeño, de diez imágenes, y comprueba que la red es capaz de memorizarlo, llevando la pérdida casi a cero. Si ni siquiera puede memorizar diez imágenes, hay un error en el código, no en los datos ni en la arquitectura. Es la prueba más rápida que conozco para encontrar fallos.

### [19:00–20:00] Resumen y siguiente paso

[CÁMARA]

Resumen: un tensor tiene forma, tipo y dispositivo. Un modelo es un nn.Module. Un DataLoader sirve lotes. Y el bucle tiene cinco pasos: zero_grad, forward, pérdida, backward, step.

Hasta ahora hemos aplanado las imágenes, tirando a la basura la información de qué píxel está al lado de cuál. En el próximo vídeo lo arreglamos con la pieza estrella de la visión por ordenador: las redes convolucionales.

---

## Vídeo 5.5 · Redes convolucionales (duración objetivo: 20 min)

**Objetivo del vídeo:** que el participante entienda qué hace una capa convolucional, por qué la conectividad local y los pesos compartidos la hacen ideal para imágenes, cómo se calculan formas y parámetros, y cómo interpretar la CNN del notebook.

**Material:** diapositivas 5.5-1 a 5.5-8; notebook, secciones 5, 6, 7 y 8.

### [00:00–01:30] Gancho

[CÁMARA]

Una fábrica de envases quiere detectar latas abolladas en la línea de producción. Pasan diez latas por segundo delante de una cámara. Un operario se cansa a la media hora. ¿Cómo describirías a un ordenador qué es una abolladura? ¿Con reglas? ¿"Si hay una sombra curva de tantos píxeles..."? Imposible.

Lo que hacemos es dejar que la red aprenda a verlo. Y la arquitectura que hizo eso posible, la que provocó la revolución del deep learning hace más de una década, es la red convolucional. Hoy vas a entender cómo funciona por dentro, y por qué con un tercio de los parámetros hace mejor trabajo que el MLP.

### [01:30–04:00] El problema de aplanar

[DIAPOSITIVA 5.5-1]

Recuerda cómo empieza nuestro MLP: con un Flatten. Coge la imagen de ocho por ocho y la convierte en una fila de sesenta y cuatro números. A partir de ahí, para la red, el píxel de la fila dos, columna tres, y el de la fila dos, columna cuatro, son dos variables cualesquiera. No sabe que están uno al lado del otro.

Piénsalo así: si barajaras las columnas de todas las imágenes, siempre de la misma forma, el MLP aprendería exactamente igual de bien. Para él da igual. Para nosotros, una imagen barajada sería ruido sin sentido. Estamos tirando a la basura la información más importante de una imagen: qué está cerca de qué.

Y hay un segundo problema: el tamaño. Una foto real de doscientos veinticuatro por doscientos veinticuatro píxeles en color tiene ciento cincuenta mil valores. Una sola capa densa de mil neuronas encima necesitaría ciento cincuenta millones de pesos. Solo la primera capa. Con eso no hay datos que alcancen.

Y aun así, aunque tuvieras datos, ese MLP tendría que aprender por separado a reconocer un trazo en cada posición posible de la imagen. Un "uno" en el centro y un "uno" desplazado dos píxeles serían, para él, patrones completamente distintos. Muy ineficiente.

### [04:00–07:30] La convolución

[DIAPOSITIVA 5.5-2]

La solución es la convolución. Imagina una lupa pequeña, de tres por tres píxeles, que recorre la imagen de izquierda a derecha y de arriba abajo. En cada posición, multiplica los nueve píxeles que cubre por nueve pesos, suma, añade un sesgo, y apunta el resultado. Al terminar el recorrido tienes una nueva "imagen": un mapa de características.

Esa lupa con sus nueve pesos se llama filtro, o kernel. Y lo interesante es qué mide. Mira el filtro de la diapositiva: menos uno en la columna izquierda, cero en el centro, más uno en la derecha. Sobre una zona uniforme, los positivos y los negativos se cancelan y da cero. Pero donde hay un cambio brusco de oscuro a claro, en vertical, da un valor grande. Es un detector de bordes verticales. Gira los números y tienes un detector de bordes horizontales. Otra combinación detecta esquinas.

Y aquí está la clave de todo: esos pesos no los ponemos nosotros. Se aprenden por retropropagación, exactamente igual que los pesos de una capa densa. La red descubre sola qué patrones le sirven para distinguir un tres de un ocho.

Esto, por cierto, es la gran diferencia con la visión por ordenador clásica. Durante décadas, los ingenieros diseñaban a mano estos filtros: detectores de bordes con nombre propio, como Sobel, o descriptores de formas. Funcionaban, pero había que inventarlos para cada problema. Las redes convolucionales los aprenden directamente de los datos, y además aprenden los que de verdad sirven para la tarea concreta. Esa es la revolución.

### [07:30–10:00] Dos ideas que lo explican todo

[DIAPOSITIVA 5.5-3]

Si te quedas con dos ideas de este vídeo, que sean estas.

Primera: conectividad local. Cada valor de salida depende solo de una vecindad pequeña de la entrada. Tiene sentido: los patrones visuales básicos, como un trazo o un borde, son locales. Para saber si hay un borde aquí, no necesito mirar la esquina opuesta de la imagen.

Segunda: pesos compartidos. El mismo filtro se aplica en todas las posiciones. Si un detector de curvas sirve arriba a la izquierda, sirve también abajo a la derecha. ¿Para qué aprender un detector distinto para cada sitio?

¿Consecuencias? Muchísimos menos parámetros: un filtro de tres por tres tiene nueve pesos y un sesgo, se aplique sobre una imagen de ocho por ocho o de mil por mil. Y el patrón se detecta esté donde esté. Si el código postal está un poco más a la izquierda en la etiqueta, el detector lo encuentra igual. Eso los expertos lo llaman equivariancia a traslaciones. Tú quédate con "lo encuentra esté donde esté".

### [10:00–12:30] Canales, relleno, paso y pooling

[DIAPOSITIVA 5.5-4]

Unos cuantos conceptos de vocabulario que vas a ver en cualquier código.

Canales. Una capa no tiene un solo filtro: tiene muchos. La primera capa del notebook tiene dieciséis, así que produce dieciséis mapas, uno por patrón. La siguiente capa convolucional recibe esos dieciséis mapas como canales de entrada, y cada uno de sus filtros mira los dieciséis a la vez: tiene dieciséis por tres por tres pesos.

Relleno, o padding. Si la lupa no puede salirse de la imagen, el resultado encoge. Con padding igual a uno añadimos un marco de ceros alrededor y la salida conserva el tamaño: ocho por ocho sigue siendo ocho por ocho.

Paso, o stride: cuántos píxeles salta la lupa en cada movimiento. Con paso dos, la salida tiene la mitad de tamaño.

Y pooling. MaxPool de dos se queda con el máximo de cada bloque de dos por dos. Reduce a la mitad el alto y el ancho. Es como resumir: "en esta zona, ¿aparece el patrón o no?". Y de paso da algo de tolerancia a pequeños desplazamientos.

La fórmula de la diapositiva te da el tamaño de salida: n más dos p menos k, entre s, más uno. No hace falta memorizarla; sí saber que existe, o imprimir la forma capa a capa cuando dudes.

### [12:30–16:00] La CNN del notebook

[DIAPOSITIVA 5.5-5]

[DEMO: notebook, sección 6. Mostrar la definición de la CNN con los comentarios de formas y la salida "Parámetros CNN: 6090".]

Vamos con la CNN del notebook, capa a capa. Los comentarios del código te dicen la forma en cada paso.

Entra una imagen de un canal, ocho por ocho. Primera convolución: dieciséis filtros de tres por tres con relleno uno. Salen dieciséis mapas de ocho por ocho. Parámetros: uno por dieciséis por nueve, más dieciséis sesgos: ciento sesenta. MaxPool: dieciséis por cuatro por cuatro.

Segunda convolución: treinta y dos filtros, cada uno mirando los dieciséis canales. Salen treinta y dos por cuatro por cuatro. Parámetros: dieciséis por treinta y dos por nueve, más treinta y dos: cuatro mil seiscientos cuarenta. MaxPool: treinta y dos por dos por dos.

Aplanamos: ciento veintiocho valores. Un dropout, que veremos en la próxima lección. Y una capa lineal a diez clases: mil doscientos noventa parámetros. Total: seis mil noventa.

[DIAPOSITIVA 5.5-6]

[DEMO: notebook, sección 9. Mostrar el resumen con las tres exactitudes.]

¿Y el resultado? Regresión logística, 96,4 %. MLP, 96,7 % con diecisiete mil parámetros. CNN, 96,9 % con seis mil. Un tercio de los parámetros del MLP, y al menos igual de buena.

Seamos honestos con los números: en imágenes de ocho por ocho tan limpias y centradas, la diferencia es pequeña, un acierto más en el test. Pero en fotos reales de etiquetas, con fondos, sombras y tamaños distintos, la distancia entre una CNN y un MLP es enorme. Y la diferencia en parámetros, con imágenes grandes, es de órdenes de magnitud.

### [16:00–18:00] Qué ha aprendido la red

[DIAPOSITIVA 5.5-7]

[DEMO: notebook, sección 7. Mostrar la figura con los 16 filtros 3×3 de la primera capa. Después, sección 8: matriz de confusión y los ejemplos mal clasificados.]

Una de las cosas bonitas de las CNN es que puedes asomarte a lo que han aprendido. En la sección 7 del notebook ves los dieciséis filtros de la primera capa, en rojo y azul. Algunos tienen claramente un lado positivo y otro negativo: detectores de bordes en distintas orientaciones. Nadie los ha programado.

Al apilar capas, cada neurona ve una zona cada vez mayor de la imagen original: su campo receptivo crece. Por eso las primeras capas detectan bordes, las intermedias texturas y partes, y las últimas objetos completos. Esta jerarquía aprendida es la que provocó el salto de 2012, cuando una CNN llamada AlexNet ganó con claridad la competición ImageNet. Después vinieron VGG, ResNet, con sus conexiones residuales que permiten entrenar más de cien capas, y muchas más.

Y en la sección 8 tienes el análisis de errores: la matriz de confusión y las imágenes que la red ha fallado. Míralas. Muchas veces entenderás el error: hay dígitos que a ti también te costaría leer. Este análisis es lo que llevarías a la reunión con el equipo de logística.

Y saca conclusiones de negocio. Si la mayoría de los errores son entre el uno y el siete, quizá convenga pedir a los repartidores que escriban el siete con rayita. Si los errores se concentran en dígitos mal centrados, ya sabes que necesitas aumento de datos. El análisis de errores no es un trámite: es donde se decide la siguiente mejora.

### [18:00–19:00] Errores frecuentes

[DIAPOSITIVA 5.5-8]

Errores típicos con CNN. Olvidar la dimensión de canales: Conv2d necesita lote, canales, alto, ancho. Calcular mal el tamaño antes de la capa densa: imprime la forma. Suponer que la red es invariante a todo: tolera pequeños desplazamientos, pero no rotaciones grandes ni cambios de escala que no haya visto. Y usar convoluciones en datos tabulares: en una tabla de clientes, la columna "edad" no es "vecina" de la columna "provincia".

### [19:00–20:00] Resumen y siguiente paso

[CÁMARA]

Resumen. Aplanar una imagen tira la información de vecindad. La convolución la aprovecha con dos ideas: conectividad local y pesos compartidos. Eso da pocos parámetros y detección del patrón en cualquier posición. El pooling resume, y las capas apiladas construyen una jerarquía de bordes a objetos.

Ahora bien: más capacidad, más riesgo de memorizar. En las curvas habrás visto que la exactitud de entrenamiento se acerca al 100 %. ¿Es eso un problema? ¿Cómo se combate? Eso es la regularización, y es el siguiente vídeo.

---

## Vídeo 5.6 · Regularización: dropout, early stopping, aumento de datos (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante sepa diagnosticar el sobreajuste con curvas de aprendizaje y aplicar dropout, weight decay, early stopping y aumento de datos, interpretando con rigor los resultados de los ejercicios 2 y 4.

**Material:** diapositivas 5.6-1 a 5.6-8; notebook, secciones 4 y 6; soluciones.ipynb, ejercicios 2 y 4.

### [00:00–01:30] Gancho

[CÁMARA]

Una cadena de supermercados entrena un modelo que detecta huecos vacíos en las estanterías a partir de fotos. En las tres tiendas piloto funciona de cine: más de un 95 % de acierto. Lo despliegan en cincuenta tiendas. Y empieza a fallar por todas partes. Otra luz, otro ángulo de cámara, otras estanterías.

El modelo no había aprendido a ver huecos. Había aprendido a ver huecos en esas tres tiendas. Es el sobreajuste de toda la vida, y las redes neuronales son especialmente propensas. Hoy vamos a ver cómo detectarlo y cómo combatirlo.

### [01:30–03:30] El estudiante que memoriza

[DIAPOSITIVA 5.6-1]

Piensa en un estudiante que prepara un examen memorizando las respuestas de los exámenes de años anteriores. Si le ponen las mismas preguntas, saca un diez. Si cambian una coma, suspende. No ha aprendido la materia; ha memorizado ejemplos.

Una red con decenas de miles de parámetros y mil imágenes de entrenamiento puede hacer exactamente eso. Tiene capacidad de sobra para recordar cada imagen y su etiqueta. Acierta el 100 % de lo que ha visto y falla más de lo debido en lo nuevo. Es el mismo sobreajuste que vimos en el módulo 3 con la regresión, pero con mucha más capacidad para memorizar.

### [03:30–06:00] Diagnóstico: curvas de aprendizaje

[DIAPOSITIVA 5.6-2]

La herramienta básica para detectarlo son las curvas de aprendizaje: la pérdida y la exactitud, época a época, en entrenamiento y en validación. Es lo que dibuja la función curvas del notebook.

Tres situaciones típicas. Si entrenamiento y validación son malas y parecidas, el modelo se queda corto: infraajuste. Dale más capacidad, más épocas o revisa la tasa de aprendizaje. Si entrenamiento es excelente y validación se estanca o empeora, sobreajuste. Y si ambas son buenas y cercanas, enhorabuena: evalúa en test y documenta.

[DIAPOSITIVA 5.6-3]

[DEMO: soluciones.ipynb, ejercicio 2. Mostrar las curvas del MLP grande y el gráfico de pérdida en escala logarítmica con la línea discontinua en el mínimo de validación.]

Veamos un caso real: el ejercicio 2. Duplicamos las neuronas del MLP, cincuenta mil parámetros, y entrenamos ciento cincuenta épocas sin freno. La exactitud de entrenamiento llega al 100 % y la pérdida de entrenamiento cae prácticamente a cero. La red se lo sabe de memoria.

Pero mira la pérdida de validación: toca su mínimo hacia la época 16, en 0,145, y a partir de ahí sube, hasta 0,229 al final. Curiosamente, la exactitud de validación aguanta en torno al 97 %. ¿Entonces no pasa nada? Sí pasa: el modelo se vuelve demasiado confiado. Sigue acertando lo mismo, pero cuando falla, falla con una seguridad absurda. Si el negocio usa esa confianza para decidir qué paquetes revisa una persona, el problema es real. Por eso te recomiendo mirar siempre la pérdida de validación, no solo la exactitud: avisa antes.

¿Y qué haríamos con este modelo? Varias opciones. Quedarnos con la versión de la época 16, que es lo que hace el early stopping. Añadir dropout o weight decay. O, simplemente, volver al MLP original: rinde igual con un tercio de parámetros. A veces la mejor regularización es un modelo más pequeño.

### [06:00–08:00] Dropout

[DIAPOSITIVA 5.6-4]

Primera herramienta: dropout. Durante el entrenamiento, en cada paso, apagamos al azar una parte de las neuronas. En el notebook, un 30 %, antes de la última capa de la CNN.

¿Por qué ayuda? Porque la red no puede confiar en ninguna neurona concreta: en cualquier momento puede desaparecer. Así que aprende representaciones redundantes y robustas. Es como un equipo en el que cada día falta alguien al azar: todos acaban sabiendo hacer un poco de todo. Otra forma de verlo: es como entrenar muchas subredes distintas y promediarlas.

Al predecir, dropout se desactiva y trabajan todas las neuronas. Por eso es tan importante el modelo.eval() del vídeo de PyTorch.

¿Qué valor de p usar? Entre 0,2 y 0,5 es lo habitual. Más dropout regulariza más, pero si te pasas, la red no consigue aprender ni el entrenamiento. Como todo hiperparámetro, se decide mirando la validación.

### [08:00–09:30] Weight decay y early stopping

[DIAPOSITIVA 5.6-5]

Segunda herramienta: weight decay. Es la regularización L2 de Ridge, la del módulo 3, aplicada a la red: penalizamos los pesos grandes. En PyTorch se activa en el optimizador, normalmente con AdamW.

Tercera: early stopping. Si la validación deja de mejorar, ¿para qué seguir? Vigilamos la métrica de validación y, si pasan tantas épocas sin mejora, la paciencia, paramos y nos quedamos con los pesos de la mejor época. Es lo que hace la CNN del notebook con paciencia diez. Es la regularización más barata que existe: además de evitar el sobreajuste, ahorra tiempo de cómputo.

Un matiz de rigor: como usamos la validación para decidir cuándo parar, esa métrica queda un poco optimista. Por eso el número que reportas al negocio es el de test.

Fíjate en cómo lo implementa el notebook: cada vez que la exactitud de validación mejora, guarda una copia de todos los pesos con state_dict. Si se acaba la paciencia, sale del bucle y carga la mejor copia. Así, aunque el entrenamiento haya seguido diez épocas de más, el modelo que te llevas es el de la mejor época. En la CNN del notebook verás que se detiene bastante antes de las ochenta épocas permitidas.

### [09:30–13:30] Aumento de datos

[DIAPOSITIVA 5.6-6]

Cuarta herramienta, y mi favorita: el aumento de datos. La mejor regularización es tener más datos. Cuando no los hay, los fabricamos. Cogemos las imágenes que tenemos y creamos variaciones realistas: las desplazamos un poco, las giramos unos grados, cambiamos el brillo, recortamos. La etiqueta no cambia, así que es gratis.

Con cuidado, eso sí: la transformación tiene que tener sentido. Un seis girado ciento ochenta grados es un nueve. Y se aplica solo en entrenamiento: validación y test se dejan como están, porque queremos medir sobre datos reales.

En el ejercicio 4 desplazamos cada imagen un píxel, arriba, abajo o a los lados, con np.roll, con un desplazamiento nuevo en cada época.

[DIAPOSITIVA 5.6-7]

[DEMO: soluciones.ipynb, ejercicio 4. Mostrar las imágenes originales y desplazadas, y la tabla de resultados por semilla y las medias.]

Y aquí viene una lección que vale oro. Entrenamos la CNN con y sin aumento, tres veces cada una con semillas distintas.

En el test original: sin aumento, 96,9 % de media. Con aumento, 96,7 %. No hay mejora. Pero fíjate en esto: si solo hubiéramos mirado la semilla cero, habríamos visto 96,7 contra 97,5 y habríamos anunciado una mejora. Era ruido. Con trescientas sesenta imágenes, un error son casi tres décimas.

Ahora, el giro. Desplazamos también las imágenes de test un píxel, como un código postal mal centrado en la etiqueta. La CNN sin aumento se hunde: 55 %. La entrenada con aumento: 91 %. Brutal.

¿Qué nos dice esto? Que el test original no mostraba la ventaja porque sus imágenes están tan centradas como las de entrenamiento. El aumento de datos sirve para enseñar al modelo las invariancias que vas a encontrar en producción. Y que antes de afirmar que algo "mejora", hay que evaluar con varias semillas y con datos que se parezcan a los reales.

Esto conecta con el caso de los supermercados del principio. Si hubieran aumentado sus fotos con cambios de luz y de ángulo, y sobre todo si hubieran validado con fotos de tiendas que el modelo no había visto, habrían detectado el problema antes del despliegue. Para el informe del caso práctico, este es el tipo de conclusión que queremos leer: no solo el número, sino qué significa para producción.

Un último apunte: hay otras técnicas que encontrarás en cualquier arquitectura moderna, como la normalización por lotes, batch normalization, que estabiliza el entrenamiento y regulariza un poco. No la usamos en el notebook, pero si lees código de redes reales, la verás por todas partes.

### [13:30–15:00] Resumen y siguiente paso

[DIAPOSITIVA 5.6-8]

[CÁMARA]

Resumen. Las curvas de entrenamiento frente a validación son tu diagnóstico básico, y la pérdida de validación avisa antes que la exactitud. Dropout, weight decay, early stopping y aumento de datos son tus herramientas. Y el aumento enseña al modelo a ser robusto a lo que verá en producción.

Pero, ¿y si tengo muy pocos datos? ¿Quinientas fotos? Ninguna regularización salva una CNN entrenada desde cero con quinientas fotos. La respuesta es no empezar desde cero. Eso es el transfer learning, y lo vemos en el siguiente vídeo.

---

## Vídeo 5.7 · Transfer learning y modelos preentrenados (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante entienda qué es el transfer learning, distinga extractor de características y ajuste fino, sepa cuándo aplicar cada uno y pueda argumentar cuándo compensa el deep learning frente a un modelo clásico.

**Material:** diapositivas 5.7-1 a 5.7-7; soluciones.ipynb, ejercicio 1; tutorial oficial de PyTorch de transfer learning (ver recursos abiertos).

### [00:00–01:30] Gancho

[CÁMARA]

El director de calidad de una fábrica te llama. Tiene quinientas fotos de piezas defectuosas, etiquetadas a mano durante meses. Quiere un clasificador automático. Y lo quiere este trimestre.

Una CNN moderna tiene millones de parámetros. Entrenarla desde cero con quinientas fotos es como intentar aprender a conducir con cinco minutos de práctica: vas a memorizar el recorrido, no a conducir. Y, sin embargo, hoy este problema se resuelve en días, no en años. El truco es no empezar desde cero.

### [01:30–04:00] La idea: las primeras capas son universales

[DIAPOSITIVA 5.7-1]

Volvamos a lo que aprendimos de las CNN. Las primeras capas detectan bordes. Las siguientes, texturas y formas simples. Las últimas, objetos concretos.

[DIAPOSITIVA 5.7-2]

Ahora piensa: un detector de bordes, ¿sirve solo para gatos? ¿O sirve también para radiografías, tornillos o etiquetas de paquetes? Sirve para casi todo. Los bordes son bordes.

Esa es la idea del transfer learning, o aprendizaje por transferencia. Alguien ya entrenó una red enorme con un conjunto gigantesco y variado: ImageNet, más de un millón de imágenes de mil categorías. Esa red ya sabe ver. Nosotros cogemos esa red preentrenada, le quitamos la última capa, la que decide entre las mil categorías de ImageNet, y le ponemos una nueva con nuestras clases: defectuosa o correcta.

Es como contratar a un fotógrafo experimentado para un trabajo nuevo. No le enseñas qué es la luz o el enfoque. Solo le explicas qué tiene que buscar en tus piezas.

¿Por qué ImageNet? Porque es grande y variado: animales, objetos, vehículos, escenas. Una red que aprende a distinguir mil categorías tan distintas se ve obligada a desarrollar detectores muy generales. Y eso es justo lo que queremos reutilizar.

### [04:00–07:30] Dos estrategias

[DIAPOSITIVA 5.7-3]

Hay dos maneras de hacerlo.

La primera: usar la red como extractor de características. Congelamos todos los pesos preentrenados, no se tocan, y solo entrenamos la cabeza nueva. La red preentrenada actúa como un traductor: convierte cada foto en un vector de números muy informativo, y encima ponemos un clasificador sencillo. Es rápido, necesita pocos datos y casi no sobreajusta, porque entrenamos muy pocos parámetros.

Hagamos números. Una ResNet de dieciocho capas tiene unos once millones de parámetros. Si la congelas y solo entrenas una cabeza que va de quinientas doce variables a dos clases, entrenas poco más de mil parámetros. Mil parámetros con quinientas fotos es un problema perfectamente razonable. Once millones, no.

¿Te suena "un clasificador lineal sobre unas buenas variables"? Es exactamente lo que hiciste en el ejercicio 1, una regresión logística en forma de red, solo que ahora las variables no son píxeles crudos sino lo que ha aprendido una red gigante.

La segunda: ajuste fino, o fine-tuning. Partimos de los pesos preentrenados, pero seguimos entrenando también las últimas capas, o incluso toda la red. Con una tasa de aprendizaje pequeña, porque no queremos destruir lo que ya sabe; solo afinarlo a nuestro problema. Suele dar mejor resultado si tienes algo más de datos o si tus imágenes se parecen poco a las fotos de ImageNet.

[DIAPOSITIVA 5.7-4]

En código, con torchvision, es sorprendentemente corto. Cargas una ResNet de dieciocho capas con sus pesos preentrenados. Congelas todos los parámetros poniendo requires_grad a falso. Sustituyes la última capa, fc, por una lineal con dos salidas. Y el optimizador solo recibe los parámetros de esa capa nueva. Cinco líneas.

Dos detalles que marcan la diferencia. Primero, preprocesa las imágenes exactamente igual que en el preentrenamiento: mismo tamaño, misma normalización. Los pesos de torchvision traen esas transformaciones. Y segundo, combínalo con el aumento de datos del vídeo anterior.

Si quieres verlo funcionando, en los recursos abiertos tienes el tutorial oficial de PyTorch, que clasifica hormigas y abejas con unas pocas centenas de imágenes.

Un aviso práctico: para usar estos modelos necesitas descargar los pesos, normalmente cientos de megas, y conviene una GPU si vas a hacer ajuste fino de toda la red. Como extractor de características, en cambio, una CPU basta para unos miles de imágenes: pasas cada foto una sola vez por la red, guardas los vectores y entrenas el clasificador encima en segundos.

### [07:30–09:30] Qué estrategia elegir

[DIAPOSITIVA 5.7-5]

¿Cuál elijo? Depende de cuántos datos tienes y de cuánto se parecen a los del preentrenamiento.

Pocos datos y fotos "normales", como productos o vehículos: extractor de características. Miles de imágenes y un dominio algo distinto: ajuste fino de las últimas capas. Muchísimos datos y un dominio muy diferente, como imágenes de satélite con bandas infrarrojas: ajuste fino completo, o incluso entrenar desde cero. ¿Y datos tabulares? Aquí no aplica: vuelve a los modelos clásicos.

Y esto no es solo cosa de imágenes. En texto, modelos como BERT o GPT se preentrenan con cantidades enormes de texto y luego se ajustan o se usan directamente con instrucciones. En imágenes y texto a la vez, modelos como CLIP. Hoy los llamamos modelos fundacionales, y hay miles disponibles en repositorios como Hugging Face o torchvision. Lo verás a fondo en el módulo 9.

### [09:30–13:30] ¿Cuándo compensa el deep learning?

[DIAPOSITIVA 5.7-6]

Y ahora, la pregunta que de verdad te van a hacer en una reunión: ¿usamos deep learning o no? Te propongo cuatro criterios.

Uno: el tipo de dato. Imágenes, audio, texto libre: deep learning, casi siempre partiendo de un modelo preentrenado. Tablas con variables bien definidas: empieza por regresión logística o gradient boosting.

Dos: cuántos datos etiquetados tienes. Con pocos, el deep learning solo funciona bien gracias a la transferencia.

Tres: el coste y la operación. Una red necesita más cómputo, más cuidado en producción, con el preprocesado idéntico y las versiones de librerías controladas, y es menos interpretable. Si el regulador o el cliente te piden explicar cada decisión, eso pesa.

Cuatro: la línea base. Mide siempre primero un modelo sencillo. En nuestro notebook, la regresión logística ya logra un 96,4 %; la CNN, un 96,9 %. Con dígitos de ocho por ocho, medio punto no justifica la complejidad. Con fotos reales de etiquetas, con fondos y sombras, la historia cambia por completo.

Un ejemplo para cerrar. Una aseguradora quiere clasificar fotos de daños en coches para agilizar los peritajes: leve, moderado o siniestro total. Tiene tres mil fotos. El plan sensato: una red preentrenada como extractor de características y medir. Si no basta, ajuste fino de los últimos bloques con aumento de datos. Validar con fotos de otro periodo y de otras provincias. Y que los casos dudosos, con baja confianza, los revise un perito. Así se combina el modelo con el criterio humano.

Y antes de empezar, dos preguntas que te van a hacer en el comité. ¿De quién son los pesos que descargamos y con qué licencia? No todos los modelos preentrenados permiten uso comercial. Y ¿con qué datos se entrenaron? Si el conjunto original tenía sesgos, por ejemplo pocas fotos de coches de cierto tipo, el modelo los hereda. Revisarlo es parte del trabajo.

### [13:30–15:00] Resumen y siguiente paso

[DIAPOSITIVA 5.7-7]

[CÁMARA]

Resumen. Una red preentrenada es un conjunto de detectores genéricos que puedes reutilizar. Extractor de características: congelas y entrenas solo la cabeza. Ajuste fino: sigues entrenando con una tasa pequeña. Con pocos datos de imágenes o texto, es la opción por defecto. Y vigila dos cosas que se olvidan: la licencia de los pesos que descargas y los sesgos del conjunto con el que se preentrenaron.

Hasta ahora todo han sido imágenes. Pero muchos datos de negocio son secuencias: ventas día a día, correos, conversaciones. En el último vídeo del módulo vemos cómo el deep learning trata el orden y el texto, y llegamos a la arquitectura que está detrás de los modelos de lenguaje: el transformer.

---

## Vídeo 5.8 · Más allá de las imágenes: secuencias, texto y transformers (duración objetivo: 10 min)

**Objetivo del vídeo:** que el participante conozca, a nivel conceptual, cómo el deep learning trata secuencias y texto (redes recurrentes, embeddings y atención), distinga codificadores y decodificadores, y sepa qué opción usar en problemas habituales.

**Material:** diapositivas 5.8-1 a 5.8-7.

### [00:00–01:00] Gancho

[CÁMARA]

El servicio de atención al cliente de nuestra empresa de logística recibe veinte mil correos al mes. "Mi paquete no ha llegado". "Ha llegado roto". "La dirección estaba mal". Alguien los lee y los reparte a mano. ¿Podemos clasificarlos automáticamente?

Aquí no hay píxeles. Hay palabras, en orden. Y el orden importa: "no ha llegado roto" y "ha llegado roto, no" no significan lo mismo. Veamos cómo el deep learning trata los datos con orden.

### [01:00–03:00] Secuencias y redes recurrentes

[DIAPOSITIVA 5.8-1]

Muchos datos de negocio son secuencias: las ventas diarias de una tienda, los clics de un usuario en una sesión, las lecturas de un sensor, las palabras de un correo. Tienen dos características: el orden importa y la longitud varía. Un MLP espera un vector de tamaño fijo y no sabe qué va antes y qué va después.

[DIAPOSITIVA 5.8-2]

La primera solución fueron las redes recurrentes. Leen la secuencia paso a paso, como tú lees una frase, y mantienen una memoria: un estado oculto que resume lo visto hasta ahora. En cada paso, combinan la entrada nueva con esa memoria. Y usan los mismos pesos en todos los pasos: otra vez pesos compartidos, ahora a lo largo del tiempo.

Su problema: al retropropagar a través de muchos pasos, el gradiente se desvanece y la red olvida lo lejano. Las variantes LSTM y GRU añadieron puertas que deciden qué recordar y qué olvidar, y dominaron el texto y la voz durante años.

### [03:00–04:00] Tokens y embeddings

[DIAPOSITIVA 5.8-3]

Para que una red procese texto, primero lo trocea en tokens: palabras o fragmentos de palabra. Y cada token se convierte en un vector de números, un embedding, que se aprende durante el entrenamiento. Lo bonito es que palabras con usos parecidos acaban con vectores cercanos: "factura" queda cerca de "recibo". Es la misma idea de las capas ocultas, aplicada a símbolos.

### [04:00–06:30] Atención y transformers

[DIAPOSITIVA 5.8-4]

En 2017, un artículo con un título muy directo, "Attention Is All You Need", propuso el transformer. Abandona la lectura paso a paso y se basa en un mecanismo llamado atención.

La idea: cada palabra mira a todas las demás de la frase y decide a cuáles prestar atención para entenderse mejor. En "el paquete no llegó porque la dirección estaba mal", para entender "estaba" conviene mirar a "dirección". La fórmula de la diapositiva lo hace así: cada token genera una consulta, una clave y un valor. Se compara cada consulta con todas las claves, la softmax convierte esas similitudes en pesos, y se hace una media ponderada de los valores. Fíjate: la softmax de la lección 5.2, otra vez.

¿Por qué arrasó? Porque todos los tokens se procesan a la vez, en paralelo, y eso aprovecha muchísimo mejor las GPU que una red recurrente que va paso a paso. Y porque cualquier palabra conecta directamente con cualquier otra, por lejos que esté. Por dentro, un transformer combina capas de atención con capas densas, como nuestro MLP, más conexiones residuales y normalización. Las mismas piezas de esta semana.

Esto tiene una consecuencia muy práctica: todo lo que has aprendido esta semana sigue valiendo. Un transformer se entrena con descenso de gradiente, retropropagación, Adam o AdamW, dropout y curvas de validación. Solo cambia la arquitectura.

### [06:30–08:00] Dos familias

[DIAPOSITIVA 5.8-5]

Hay dos grandes familias. Los codificadores, como BERT, leen el texto completo de golpe y producen una representación: ideales para clasificar, extraer datos o buscar textos parecidos. Nuestro problema de enrutar correos es un caso de libro.

Con unos cientos de correos etiquetados, ajustar un modelo tipo BERT entrenado en español, o sacar sus embeddings y poner encima una regresión logística, da buenos resultados en horas. ¿Te suena? Es transfer learning, exactamente la idea del vídeo anterior, aplicada al texto.

Los decodificadores, como GPT, generan texto palabra a palabra, prediciendo la siguiente. Son la base de los grandes modelos de lenguaje que verás en el módulo 9.

Y los transformers ya no son solo de texto: los Vision Transformers trocean una imagen en parches y los tratan como si fueran palabras.

### [08:00–09:00] Qué usar en la práctica

[DIAPOSITIVA 5.8-6]

En la práctica: para clasificar correos o reseñas, parte de un transformer preentrenado, ajustado con unos cientos de ejemplos, o usa un modelo de lenguaje vía API. Para previsión de demanda, empieza por los modelos de series temporales del módulo 8: suelen ser difíciles de batir. Para voz a texto, un modelo preentrenado. Y para anomalías en sensores, estadística primero y redes si hay muchos datos.

Y no olvides el coste: un transformer grande puede ser caro de ejecutar con millones de textos al mes. A veces un modelo pequeño, ajustado a tu tarea, es más barato y igual de bueno que uno gigante.

### [09:00–10:00] Cierre del módulo

[DIAPOSITIVA 5.8-7]

[CÁMARA]

Y cerramos el módulo. Hemos ido de una neurona a un MLP, de ahí a las CNN y hemos asomado la cabeza a los transformers. Y siempre son las mismas piezas: capas, activaciones, una pérdida y gradientes. Regulariza, valida con cuidado y, casi siempre, parte de un modelo preentrenado.

Ahora te toca a ti: el caso práctico para el equipo de logística. Compara los tres modelos, comenta las curvas, cuenta qué pasó con el aumento de datos y haz tu recomendación. Después de la semana de recuperación, nos vemos en el módulo 6 con los sistemas de recomendación.
