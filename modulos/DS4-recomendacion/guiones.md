# Módulo DS4 · Sistemas de recomendación — Guiones de los vídeos

Convenciones: las indicaciones de producción van entre corchetes en su propia línea. [DIAPOSITIVA N.M-k] remite a `diapositivas.md`; [DEMO] describe lo que se muestra en el notebook (`notebook.ipynb`) o en las soluciones (`soluciones.ipynb`); [CÁMARA] indica plano del presentador. El texto normal es la narración.

---

## Vídeo 6.1 · El problema de la recomendación y la matriz de valoraciones (duración objetivo: 10 min)

**Objetivo del vídeo:** que el alumno entienda qué problema de negocio resuelve un recomendador, qué es la matriz de valoraciones, por qué es tan dispersa y qué familias de soluciones existen.

**Material:** diapositivas 6.1-1 a 6.1-7; notebook, secciones 1 y 2.

### [00:00–01:30] Gancho

[CÁMARA]

Piensa en la última vez que abriste una plataforma de series un viernes por la noche. ¿Cuánto tardaste en decidir qué ver? Probablemente menos de un minuto. Y en ese minuto no recorriste un catálogo de veinte mil títulos. Viste unas pocas filas en la pantalla de inicio. Y elegiste de ahí.

Alguien decidió qué aparecía en esas filas. Ese alguien es un sistema de recomendación. Y su decisión vale mucho dinero: si aciertas, el cliente ve más, vuelve más y se da de baja menos. Si fallas, el cliente cierra la aplicación y se va a otra.

En este módulo vamos a construir esa decisión con datos. Empezamos por entender el problema.

### [01:30–03:00] Por qué recomendar

[DIAPOSITIVA 6.1-1]

El problema tiene tres ingredientes. Un catálogo enorme. Una atención muy limitada. Y un objetivo de negocio claro: que el cliente saque más valor del catálogo.

Hay un cuarto ingrediente que lo hace interesante: la cola larga. En casi cualquier catálogo, unos pocos productos concentran la mayoría del consumo. En los datos de nuestra práctica, el diez por ciento de películas más vistas se lleva el treinta y ocho por ciento de todas las valoraciones. El resto, la cola larga, son películas que interesan a poca gente. Pero a esa poca gente le interesan mucho. Un buen recomendador conecta a cada persona con su nicho. Y eso aprovecha un catálogo por el que la empresa ya ha pagado.

Piénsalo desde el lado de la empresa. Cada título del catálogo ha costado dinero: derechos, producción, almacenamiento. Un título que nadie encuentra es dinero parado. Y desde el lado del cliente: si siempre ve lo mismo que todo el mundo, acaba pensando que en la plataforma "no hay nada para él". Ese cliente es el que se da de baja. Así que el recomendador no es un adorno de la interfaz. Es una pieza central del producto.

### [03:00–05:00] La matriz de valoraciones

[DIAPOSITIVA 6.1-2]

Ahora, los datos. Partimos de una tabla muy sencilla: usuario, película y nota. Si la reorganizamos, con los usuarios en filas y las películas en columnas, obtenemos la matriz de valoraciones. La llamaremos R.

Fíjate en la diapositiva. Ana le dio un cinco a la película uno y un tres a la tres. Pero ¿qué opina de la película dos? No lo sabemos. Hay un interrogante.

Aquí está la idea central del módulo: recomendar es rellenar los interrogantes. Si sé qué nota pondría Ana a cada película que no ha visto, ordeno y le enseño las mejores.

Un detalle técnico que importa: los huecos se guardan como NaN, "no es un número". Nunca como cero. Un cero se confundiría con una nota pésima.

[DEMO: notebook, sección 1. Ejecutar la celda de generación de datos y mostrar la salida "20,775 valoraciones | densidad de la matriz: 11.5%" y las primeras filas de la tabla `valoraciones`.]

### [05:00–06:30] Una matriz casi vacía

[DIAPOSITIVA 6.1-3]

En la práctica simulamos una plataforma con seiscientos usuarios y trescientas películas. Son ciento ochenta mil celdas. Pero solo conocemos unas veinte mil. Densidad: once y medio por ciento.

¿Te parece poco? Es muchísimo. En MovieLens 100K, el conjunto de referencia que usarás en el ejercicio final, la densidad es del seis por ciento. Y en una tienda online, con millones de clientes y miles de productos, está muy por debajo del uno por ciento.

¿Qué problema causa esto? Que tenemos muy pocos datos por persona. En nuestro ejemplo, cada usuario tiene unas veintiocho notas para entrenar. Con tan poco, un modelo flexible puede memorizar en lugar de aprender. Por eso, a lo largo del módulo, vas a ver la palabra regularización una y otra vez.

Y hay un segundo problema. Para decir que dos usuarios se parecen, necesito películas que hayan visto los dos. Con una matriz tan vacía, muchos pares de usuarios no tienen casi nada en común. Comparar se vuelve difícil.

[DEMO: notebook, sección 1. Mostrar los tres gráficos: distribución de notas, cola larga de valoraciones por película y valoraciones por usuario.]

### [06:30–07:30] Los huecos no son aleatorios

[DIAPOSITIVA 6.1-4]

Hay una trampa más sutil. Los huecos no están repartidos al azar. La gente ve lo que cree que le va a gustar. Y ve lo que le enseñamos. En nuestra simulación, la probabilidad de ver una película crece con su popularidad y con la nota que el usuario le daría.

Esto tiene nombre: datos faltantes no al azar. ¿Consecuencia? Que el propio hueco ya nos dice algo. Y que un modelo entrenado solo con lo observado hereda el sesgo de lo que se mostró en el pasado. Volveremos sobre esto al hablar de evaluación y de burbujas de filtro.

### [07:30–08:30] Familias de recomendadores

[DIAPOSITIVA 6.1-5]

¿Cómo se rellenan los huecos? Hay cuatro grandes familias. La popularidad: lo más visto, igual para todos. Los basados en contenido: si te gustó una película de ciencia ficción con tal director, te propongo otras parecidas en sus atributos. El filtrado colaborativo: a quien le gustó esto, también le gustó aquello, sin saber nada de las películas. Y los híbridos, que combinan los anteriores.

El filtrado colaborativo es el protagonista de esta semana. Su magia es que toda la información está en la propia matriz.

Un ejemplo para fijarlo. Una librería online puede recomendar por popularidad en su portada, por contenido cuando acaba de llegar una novedad sin ventas, y por filtrado colaborativo en la ficha de cada libro. En la práctica, casi todas las empresas acaban con un híbrido.

### [08:30–09:15] Dos tareas y la partición

[DIAPOSITIVA 6.1-6]

Antes de cerrar, separa dos preguntas. Una: ¿qué nota pondría Ana a esta película? Eso es predicción, y se mide con el RMSE. Otra: ¿qué cinco películas le enseño? Eso es ranking, y se mide con métricas como la precisión arroba k. No son lo mismo. Ya verás por qué.

[DIAPOSITIVA 6.1-7]

[DEMO: notebook, sección 2. Mostrar la celda que reserva el 20 % de cada usuario como test y crea la matriz R con NaN.]

Para evaluar, en el notebook reservamos el veinte por ciento de las notas de cada usuario. Así todos los usuarios están en entrenamiento y en test.

### [09:15–10:00] Resumen y qué viene después

[CÁMARA]

Recapitulemos. Recomendar es rellenar una matriz enorme y casi vacía, y ordenar. La dispersión obliga a regularizar. Los huecos no son aleatorios. Y predecir notas no es lo mismo que elegir el top cinco.

En el próximo vídeo construiremos las dos referencias que cualquier modelo tiene que superar: la popularidad y el modelo de sesgos. Te adelanto que el segundo es mucho más difícil de batir de lo que parece.

---

## Vídeo 6.2 · Referencias: popularidad y modelo de sesgos (duración objetivo: 10 min)

**Objetivo del vídeo:** construir e interpretar las dos referencias básicas (popularidad y sesgos), entender el encogimiento hacia la media y leer la primera tabla de resultados.

**Material:** diapositivas 6.2-1 a 6.2-7; notebook, secciones 3 y 6.

### [00:00–01:15] Gancho

[CÁMARA]

Imagina que tu equipo te presenta un modelo de recomendación nuevo, con redes neuronales, que reduce el error un quince por ciento. ¿Impresionante? Depende. ¿Un quince por ciento respecto a qué?

Si la comparación es contra "predecir la media para todo", ese quince por ciento puede ser exactamente lo que consigue un modelo de tres sumas. Sin redes. Sin GPU. Hoy vamos a construir esas referencias. Son la vara de medir de todo lo demás.

### [01:15–02:15] Por qué empezar con referencias

[DIAPOSITIVA 6.2-1]

Una referencia es un modelo sencillo que cualquier propuesta debe superar. En recomendación hay dos que no pueden faltar. La popularidad. Y el modelo de sesgos. La regla es simple: ningún modelo complejo llega a producción sin ganar con claridad a ambos.

### [02:15–03:45] Popularidad

[DIAPOSITIVA 6.2-2]

Empezamos por lo más simple: puntuar cada película por cuántas veces se ha valorado. Todo el mundo recibe la misma lista.

¿Ventajas? Es barata, estable y se explica sola: "lo más visto esta semana". Y es lo único que puedes ofrecer a alguien que acaba de registrarse.

¿Inconvenientes? No personaliza. Y se retroalimenta: lo popular se muestra más, se ve más y parece todavía más popular.

[DEMO: notebook, sección 3. Mostrar la línea que construye `pred_popular` con `np.bincount` y explicar que es la misma fila repetida para todos los usuarios.]

### [03:45–05:00] Media bruta frente a media encogida

[DIAPOSITIVA 6.2-3]

¿Y si en vez de "lo más visto" quiero "lo mejor valorado"? Cuidado. Si ordenas por la nota media bruta, el primer puesto se lo lleva una película con una sola valoración de cinco estrellas. ¿Te fiarías?

La solución es encoger. Sumamos a cada película unas cuantas "notas ficticias" iguales a la media global. Si la película tiene pocas notas, su media se queda cerca de la media general. Si tiene cientos, manda su propia media. Es lo que hacen, de una forma u otra, todas las webs de reseñas serias.

Pongamos números. Media global, tres con setenta y cinco. Una película con una única nota de cinco. Si añado cinco notas ficticias de tres con setenta y cinco, su media encogida baja a menos de cuatro. En cambio, una película con trescientas notas y media de cuatro coma cinco apenas se mueve. ¿Cuál pondrías en la portada? Exacto: la segunda.

### [05:00–07:00] El modelo de sesgos

[DIAPOSITIVA 6.2-4]

Ahora la referencia de verdad. Piensa en dos efectos que no tienen nada que ver con el gusto personal. Primero: hay usuarios generosos, a los que todo les parece de cuatro o cinco, y usuarios exigentes. Segundo: hay películas mejores que otras.

El modelo de sesgos lo dice con una suma: nota predicha igual a media global, más sesgo del usuario, más sesgo de la película. Mu más b sub u más b sub i.

Un ejemplo. La media global del notebook es tres con setenta y cinco. Ana es exigente: su sesgo es menos cero coma cuatro. La película es muy buena: más cero coma ocho. Predicción: cuatro con quince.

En nuestros datos, los sesgos de película van de menos uno coma dos a más uno coma uno. ¡Más de una estrella de diferencia! Eso no es gusto personal: es calidad.

Y fíjate en algo curioso. Para ordenar las películas de un usuario concreto, la media global y su sesgo son constantes. Solo cambia el sesgo de la película. O sea: el modelo de sesgos no personaliza el orden. Todos los usuarios reciben el mismo ranking. Y aun así, como verás ahora, gana claramente a la popularidad.

[DIAPOSITIVA 6.2-5]

¿Cómo se estiman? Alternando. Con los sesgos de usuario fijos, el de cada película es la media de sus residuos. Pero fíjate en el denominador: número de notas más lambda. Ese lambda es el mismo encogimiento de antes. Con lambda igual a cinco, una película con cinco notas ve su sesgo reducido a la mitad. Una con cuatrocientas, casi no se toca.

[DEMO: notebook, sección 3. Recorrer la función `sesgos(R, lam=5, iters=10)` y señalar el `+ lam` del denominador.]

### [07:00–09:00] Cuánto aportan

[DIAPOSITIVA 6.2-6]

[DEMO: notebook, sección 6. Mostrar la tabla de resultados y resaltar las filas de media global, popularidad y sesgos.]

Vamos a la tabla. Predecir la media para todo da un RMSE de uno coma cero nueve. El modelo de sesgos baja a cero coma noventa y seis. Un doce por ciento menos de error. Y sin personalizar nada.

Ahora mira la precisión arroba cinco. La media global, que equivale al azar, da cero coma treinta. La popularidad, cero coma treinta y uno. ¿Casi igual que el azar? Sí, y tiene explicación: esta métrica solo reordena películas que el usuario ya vio. "Mucha gente la vio" no te dice si a él le encantó. El modelo de sesgos sube a cero coma treinta y seis.

¿Y en datos reales? En MovieLens 100K, la librería Surprise publica un RMSE de cero coma noventa y cuatro para el modelo de sesgos. Una factorización tipo SVD, cero coma noventa y tres. ¿Ves la diferencia? Minúscula.

[DIAPOSITIVA 6.2-7]

La lección: los sesgos explican la mayor parte de lo explicable. Los modelos colaborativos se pelean por lo que queda. Y la popularidad, aunque aquí parezca inútil, será la base del arranque en frío.

Tres errores típicos con las referencias. No regularizar, y acabar con películas de dos notas en lo más alto. Compararse con una referencia demasiado débil, como el azar, para que tu modelo parezca brillante. Y calcular la media y los sesgos con datos de test, lo que infla artificialmente los resultados.

### [09:00–10:00] Resumen y qué viene después

[CÁMARA]

Resumen. Toda propuesta se compara con popularidad y con sesgos. El modelo de sesgos son tres sumas y ya reduce mucho el error. Y el truco del lambda en el denominador, encoger hacia la media a quien tiene pocos datos, lo vas a ver en todo el módulo.

En el próximo vídeo damos el salto a la personalización: el filtrado colaborativo. Gente como tú, y películas como las que te gustaron.

---

## Vídeo 6.3 · Filtrado colaborativo usuario-usuario e ítem-ítem (duración objetivo: 20 min)

**Objetivo del vídeo:** comprender e implementar el filtrado colaborativo por vecinos (usuario-usuario e ítem-ítem), la similitud del coseno sobre residuos, el encogimiento por soporte, y razonar sobre su coste y escalabilidad.

**Material:** diapositivas 6.3-1 a 6.3-9; notebook, sección 4; soluciones, ejercicio 3.

### [00:00–01:30] Gancho

[CÁMARA]

Entras en una tienda online a mirar unas zapatillas para correr. Debajo de la foto aparece: "Los clientes que compraron estas zapatillas también compraron…". Y ahí están unos calcetines técnicos, un cinturón para el móvil y una gorra. Acabas comprando dos de las tres cosas.

Ese carrusel es probablemente el recomendador más rentable de la historia del comercio electrónico. Y su idea es sorprendentemente sencilla. En este vídeo vamos a construirlo desde cero. Y vamos a entender por qué las grandes empresas eligieron esta versión y no otra.

### [01:30–03:00] La intuición

[DIAPOSITIVA 6.3-1]

Si quieres saber si te gustará una película, tienes dos estrategias de toda la vida.

La primera: preguntar a amigos con gustos parecidos a los tuyos. Si a los que suelen coincidir contigo les encantó, probablemente a ti también. Eso es filtrado colaborativo usuario-usuario.

La segunda: pensar en películas parecidas a otras que ya te gustaron. Eso es ítem-ítem.

La clave está en qué significa "parecido". No hablamos de género ni de director. Hablamos de comportamiento. Dos películas son parecidas si los mismos usuarios las valoran de forma parecida. Fíjate qué potente: el sistema no necesita saber nada del contenido. Toda la información sale de la matriz.

Esto tiene una consecuencia muy práctica. No necesitas que nadie etiquete el catálogo. No necesitas saber que una película es "thriller psicológico nórdico". Si a la misma gente le gustan las mismas cosas, el sistema lo descubre solo. Y a veces descubre relaciones que ningún editor habría imaginado: el libro de cocina que se compra junto a la guía de viaje, o la serie de época que comparte público con un documental de ciencia.

### [03:00–05:30] Usuario-usuario

[DIAPOSITIVA 6.3-2]

Vamos con la versión usuario-usuario. Queremos predecir la nota de Ana para la película i. Tres pasos.

Uno: calculamos lo parecida que es Ana a cada uno de los demás usuarios.

Dos: nos quedamos con los k más parecidos que sí han visto la película i. Sus vecinos.

Tres: hacemos una media ponderada de lo que opinaron, dando más peso a los más parecidos.

Pero hay un detalle importante. No promediamos notas brutas. Promediamos desviaciones respecto a lo esperado. ¿Por qué? Imagina que el vecino más parecido a Ana es Bruno, que es muy generoso y pone cinco a todo. Si copiamos su cinco, inflamos la predicción. Lo correcto es preguntar: ¿a Bruno le gustó esta película más o menos de lo que suele gustarle una película? Esa desviación es lo que trasladamos a Ana, sumándola a su propia referencia.

Hagamos un ejemplo con números. La referencia de Ana para la película i es tres coma ocho. Su vecino más parecido valoró i medio punto por encima de lo que esperábamos de él. El segundo vecino, un punto por encima. El tercero, igual que lo esperado. Si los tres pesan lo mismo, la desviación media es medio punto. Predicción para Ana: cuatro coma tres.

Por eso la fórmula empieza con b sub u i, la predicción del modelo de sesgos, y le suma la media ponderada de las desviaciones de los vecinos.

### [05:30–07:00] Ítem-ítem

[DIAPOSITIVA 6.3-3]

Ítem-ítem es la misma idea con los papeles cambiados. Para predecir la nota de Ana a la película i, buscamos las películas más parecidas a i que Ana ya ha valorado. Y promediamos lo que Ana se desvió en esas películas.

Si Ana valoró por encima de lo esperado tres películas muy parecidas a i, probablemente también valore i por encima de lo esperado.

Este es el famoso "quien compró esto también compró". Fue popularizado por los grandes comercios electrónicos a principios de los dos mil. Y sigue funcionando hoy.

¿Cuál de las dos versiones es mejor? Lo veremos con datos en unos minutos. Pero adelanto la pista: la respuesta depende de dónde tengas más información, si en las filas o en las columnas de la matriz.

### [07:00–09:30] Medir la similitud

[DIAPOSITIVA 6.3-4]

¿Cómo medimos que dos películas se parecen? Con la similitud del coseno. Cada película es un vector: una componente por usuario, con su residuo, es decir, la nota menos lo que predecía el modelo de sesgos. Donde no hay nota, ponemos cero.

El coseno mide si dos vectores apuntan en la misma dirección. Si los usuarios que valoran la película i por encima de lo esperado también valoran la j por encima de lo esperado, el coseno es alto. Si ocurre lo contrario, es negativo.

Al restar los sesgos antes, el coseno se parece mucho a una correlación de Pearson. Y eso es justo lo que queremos: comparar gustos, no generosidad.

Lo bonito es que todas las similitudes salen de golpe con un producto de matrices: la transpuesta de los residuos por los residuos. Trescientas por trescientas similitudes en una sola línea.

Una pregunta que surge siempre: ¿y por qué no usar la distancia euclídea? Porque la euclídea se ve afectada por la escala y por cuántas notas tiene cada película. El coseno solo mira la dirección. Dos películas pueden tener residuos de distinto tamaño pero apuntar al mismo sitio: les gustan a los mismos y disgustan a los mismos.

[DIAPOSITIVA 6.3-5]

Ahora, dos ajustes sin los que esto no funciona.

El primero: encogimiento por soporte. Imagina dos películas de nicho que solo han visto dos usuarios en común. Si esos dos coinciden, el coseno sale altísimo. Pero es pura casualidad. Así que multiplicamos la similitud por el número de usuarios en común, dividido entre ese número más diez. Con diez usuarios en común, la similitud se queda a la mitad. Con doscientos, casi intacta. ¿Te suena? Es el mismo truco del lambda del vídeo anterior.

El segundo: quedarnos solo con los treinta vecinos más parecidos. Sumar cientos de vecinos poco similares solo añade ruido.

### [09:30–12:30] El código

[DIAPOSITIVA 6.3-6]

[DEMO: notebook, sección 4. Recorrer la función `filtrado_item_item` línea a línea: cálculo de `residuos` con `np.where`, matriz `co` de usuarios en común, normas, similitud del coseno, encogimiento, `fill_diagonal`, selección de los 30 vecinos con el `corte`, y cálculo final de `num` y `den`.]

Vamos al notebook. La función se llama filtrado ítem-ítem.

Primero, los residuos: la nota menos la predicción de sesgos, y cero donde no hay nota.

Después, la matriz co: para cada par de películas, cuántos usuarios las han visto las dos. Sale de multiplicar la máscara de observadas por sí misma.

Luego, la similitud del coseno, y la multiplicamos por el factor de encogimiento.

La diagonal la ponemos a cero: una película no es vecina de sí misma.

Ahora la selección de vecinos. Para cada película, buscamos el valor de la similitud número treinta y anulamos todo lo que esté por debajo.

Y la predicción: el numerador suma, para cada usuario y película, los residuos del usuario ponderados por la similitud. El denominador suma los valores absolutos de las similitudes de las películas que el usuario sí vio. Dividimos, y lo sumamos a la predicción de sesgos.

Todo vectorizado. Ni un solo bucle en Python. Por eso tarda décimas de segundo.

Un comentario sobre la implementación. Fíjate en que aquí los treinta vecinos se eligen por película, de forma global, y luego cada usuario solo usa los vecinos que ha visto. Hay variantes que buscan, para cada usuario, los treinta vecinos más parecidos entre los que vio. Son algo más precisas pero mucho más lentas. Para aprender la idea, esta versión es perfecta.

[DEMO: notebook, sección 8. Mostrar la salida "Películas más similares a la 142 (ítem-ítem)" y comentar que esa lista es lo que alimentaría un carrusel "porque viste…".]

### [12:30–14:30] Resultados

[DIAPOSITIVA 6.3-7]

[DEMO: soluciones, ejercicio 3. Mostrar la tabla comparativa usuario-usuario frente a ítem-ítem.]

Resultados. El modelo de sesgos tenía un RMSE de cero coma noventa y seis. Usuario-usuario, que implementamos en las soluciones del ejercicio tres, baja a cero coma ochenta y seis. Ítem-ítem baja a cero coma ochenta y uno. En precisión arroba cinco, los dos rondan el cero coma treinta y nueve, frente al cero coma treinta y seis de los sesgos.

Conclusión: hay estructura colaborativa que los sesgos no capturan. Los gustos personales existen y se pueden aprender de la matriz.

¿Y por qué gana ítem-ítem en RMSE? Por los datos. En entrenamiento, cada película tiene de media unas cincuenta y cinco valoraciones. Cada usuario, unas veintiocho. Las similitudes entre películas se estiman con el doble de información. Son más fiables.

En otros dominios puede ser al revés. Si tienes pocos usuarios muy activos y un catálogo inmenso, como una biblioteca universitaria, las filas tendrán más información que las columnas. Por eso conviene probar las dos variantes con tus datos en lugar de dar por hecho el resultado.

### [14:30–17:30] Coste y escalabilidad

[DIAPOSITIVA 6.3-8]

[CÁMARA]

Ahora la pregunta de examen, y de entrevista de trabajo. Tienes diez millones de clientes y cincuenta mil productos. ¿Qué es más barato, usuario-usuario o ítem-ítem?

Hagamos cuentas. Pares de usuarios: diez millones al cuadrado, diez elevado a catorce. Pares de productos: cincuenta mil al cuadrado, dos coma cinco por diez a la nueve. Cuarenta mil veces menos.

En memoria: la matriz de similitudes entre usuarios, en números de cuatro bytes, ocuparía cuatrocientos terabytes. La de productos, diez gigas. Una cabe en un portátil. La otra no cabe en casi ningún sitio.

Pero hay algo más importante que el tamaño: la estabilidad. Dos cámaras de fotos parecidas lo siguen siendo mañana. Las similitudes entre productos cambian poco, así que se calculan por la noche y se sirven con una consulta rápida. Las de usuarios cambian con cada clic.

Y un último argumento: la explicación. "Te recomendamos esto porque viste aquello" se entiende a la primera. "Te lo recomendamos porque a gente como tú le gustó" genera más desconfianza.

En la práctica, nadie guarda la matriz completa. Se guardan los cincuenta o cien vecinos de cada producto y se usan técnicas de búsqueda aproximada de vecinos.

¿Significa que usuario-usuario no sirve? No. Tiene sentido cuando hay pocos usuarios y un catálogo enorme que cambia rápido, como noticias o anuncios de segunda mano, donde los ítems duran horas.

### [17:30–19:00] Errores frecuentes

[DIAPOSITIVA 6.3-9]

Cuatro errores que verás a menudo. Uno: calcular similitudes con notas brutas; los usuarios generosos parecen parecidos a todo el mundo. Dos: no encoger; dos películas de nicho aparecen como gemelas por casualidad. Tres: recomendar lo que el usuario ya consumió; filtra siempre, salvo en productos de recompra como el café o la comida del gato. Y cuatro: lanzarse a usuario-usuario a gran escala sin necesidad.

### [19:00–20:00] Resumen y qué viene después

[CÁMARA]

Resumen. El filtrado colaborativo por vecinos aprovecha la sabiduría de la multitud. Calcula similitudes sobre residuos, encógelas según el soporte y quédate con pocos vecinos. Ítem-ítem suele ser más preciso, más estable, más barato y más explicable.

Pero los vecinos tienen un límite: solo relacionan películas que comparten usuarios. En el próximo vídeo damos un salto conceptual: descubrir los "gustos ocultos" que explican toda la matriz. Factorización de matrices.

---

## Vídeo 6.4 · Factorización de matrices: SVD y ALS (duración objetivo: 20 min)

**Objetivo del vídeo:** entender el modelo de factores latentes, por qué la SVD clásica no se aplica directamente, cómo funciona ALS, cómo elegir k y λ e interpretar la comparación final.

**Material:** diapositivas 6.4-1 a 6.4-9; notebook, secciones 5, 6, 7 y 8; soluciones, ejercicio 2.

### [00:00–01:30] Gancho

[CÁMARA]

Entre dos mil seis y dos mil nueve, una empresa de alquiler de películas ofreció un millón de dólares a quien mejorara un diez por ciento su sistema de recomendación. Miles de equipos de todo el mundo compitieron durante tres años.

¿Sabes qué técnica fue la columna vertebral de casi todas las soluciones ganadoras? La que vamos a ver hoy. La factorización de matrices. Y vas a ver que la implementación cabe en quince líneas de Python.

### [01:30–04:00] Gustos latentes

[DIAPOSITIVA 6.4-1]

La idea es esta. Supón que cada película se puede describir con unos pocos números: cuánta acción tiene, cuánta comedia, cuánto drama, cuánto de cine de autor. Y supón que cada usuario se describe con los mismos números: cuánto le gusta la acción, la comedia, el drama.

Si a Ana le encanta el drama y odia la acción, y la película es mucho drama y poca acción, el encaje es alto. Matemáticamente, ese encaje es un producto escalar.

Si apilamos los vectores de todos los usuarios tenemos una matriz P, de seiscientas filas y k columnas. Los de las películas forman Q, de trescientas filas y k columnas. Y la matriz de valoraciones se aproxima por P por Q traspuesta.

Fíjate en la compresión. Con k igual a ocho, en lugar de ciento ochenta mil celdas, guardamos siete mil doscientos números. Y con ellos podemos predecir cualquier celda.

Y la compresión no es solo un ahorro de memoria. Es la razón de que el modelo generalice. Para explicar ciento ochenta mil celdas con siete mil números, el modelo está obligado a encontrar patrones compartidos. No puede memorizar cada nota. Esa obligación de resumir es lo que le permite predecir los huecos.

Una advertencia: los factores no tienen nombre. El algoritmo no sabe qué es la acción. Descubre las direcciones que mejor explican las notas. A veces, al mirar qué películas puntúan alto en un factor, reconoces un género. A veces no.

[DIAPOSITIVA 6.4-2]

El modelo completo suma lo que ya sabemos: media global, sesgo del usuario, sesgo de la película. Y añade el encaje personal: p sub u por q sub i. Los sesgos recogen lo general. El producto escalar, lo personal.

Volvamos a Ana. Su referencia, con sesgos, es tres coma ocho para una película. Si su vector de gustos y el vector de la película apuntan en la misma dirección, el producto escalar es positivo, digamos más cero coma cinco: predicción cuatro coma tres. Si apuntan en direcciones opuestas, negativo: la predicción baja. Si son perpendiculares, la película ni le va ni le viene, y nos quedamos con la referencia.

### [04:00–06:00] ¿Y la SVD clásica?

[DIAPOSITIVA 6.4-3]

Si vienes del módulo dos, estarás pensando: esto es la PCA. O la SVD, la descomposición en valores singulares. Y tienes razón en la idea. La SVD da la mejor aproximación de rango k de una matriz.

Pero hay un problema enorme. La SVD clásica necesita la matriz completa. Y la nuestra tiene un ochenta y ocho por ciento de huecos. ¿Rellenarlos con ceros? Le estarías diciendo al modelo que todo el mundo odia todo lo que no ha visto. ¿Con la media? Mejor, pero sigue distorsionando.

Por eso, cuando en recomendación alguien dice "SVD", casi nunca habla de la SVD del álgebra lineal. Habla de este modelo de factores ajustado solo con las notas observadas. El nombre se quedó de la época del Premio Netflix.

### [06:00–07:30] La función objetivo

[DIAPOSITIVA 6.4-4]

¿Qué queremos minimizar? El error cuadrático en las notas que conocemos. Más una penalización: lambda por el tamaño de los vectores.

¿Por qué la penalización? Haz la cuenta. Cada usuario tiene ocho parámetros libres y unas veintiocho notas. Sin freno, el modelo puede ajustar esas notas casi a la perfección, incluido el ruido. La penalización encoge hacia cero los vectores de quien tiene pocos datos. Y encoger hacia cero significa volver a la predicción de sesgos. Otra vez el mismo principio.

Fíjate en el patrón que se repite en todo el módulo. Media encogida, sesgos con lambda, encogimiento de similitudes, y ahora vectores penalizados. Siempre la misma idea: cuando tienes pocos datos, desconfía y acércate a lo seguro. Si te quedas con una sola idea de esta semana, que sea esta.

### [07:30–11:00] ALS paso a paso

[DIAPOSITIVA 6.4-5]

¿Cómo encontramos P y Q? Hay dos grandes métodos. Vamos con el que usa el notebook: mínimos cuadrados alternados, ALS.

La observación clave es esta. Si conocieras Q, encontrar el vector de Ana sería una regresión. Una regresión ridge, con k coeficientes: las variables son los vectores de las películas que vio, y el objetivo, sus residuos. Y la regresión ridge tiene solución cerrada: una fórmula, sin iteraciones.

Lo mismo al revés: si conocieras P, cada vector de película sería otra regresión ridge.

Así que ALS hace esto: empieza con Q al azar. Fija Q y resuelve todos los usuarios. Fija P y resuelve todas las películas. Y repite. En quince vueltas, el error converge.

¿Por qué funciona alternar? Porque cada paso no puede empeorar el objetivo: al fijar Q y resolver P de forma exacta, el error baja o se queda igual. Y lo mismo al fijar P. Es como subir una montaña moviéndote solo de norte a sur y de este a oeste, por turnos. No es la ruta más directa, pero cada paso te deja más arriba.

[DEMO: notebook, sección 5. Recorrer la función `als`: inicialización aleatoria de P y Q, matriz `I = lam * np.eye(k)`, bucle de usuarios con `np.linalg.solve`, bucle de películas, y retorno de `pred_sesgos + P @ Q.T`.]

Mira el código. Para cada usuario, idx son las películas que vio. Q de idx traspuesta por Q de idx, más lambda por la identidad. Eso es la matriz de la regresión ridge. Resolvemos el sistema y tenemos el vector del usuario. Luego, el mismo bucle para películas.

[DIAPOSITIVA 6.4-6]

La alternativa es el descenso de gradiente estocástico: recorrer las notas una a una y empujar un poquito cada vector en la dirección que reduce el error. Es muy flexible, pero tiene más hiperparámetros, como la tasa de aprendizaje.

¿Por qué ALS es tan popular en la industria? Porque cada usuario se resuelve de forma independiente. Puedes repartir los diez millones de usuarios entre cien máquinas. Y porque, como veremos en el próximo vídeo, es muy eficiente con datos implícitos.

Un apunte práctico. Esta implementación con bucles en Python está pensada para entender el algoritmo. Con seiscientos usuarios tarda segundos. Con millones, usarías una librería optimizada, como Spark MLlib o implicit, que hacen exactamente esto pero en paralelo y en código compilado.

### [11:00–15:00] Elegir k y λ

[DIAPOSITIVA 6.4-7]

[DEMO: notebook, sección 7. Ejecutar la celda que prueba k = 1, 2, 4, 8, 16, 32 y mostrar el gráfico de RMSE frente a k.]

Dos decisiones: cuántos factores, k, y cuánta regularización, lambda.

Primero k. El notebook prueba de uno a treinta y dos. Con un factor, el RMSE es cero coma noventa. Con dos, cero coma ochenta y cinco. Con cuatro, cero coma setenta y cuatro. Y a partir de ahí, se estabiliza. ¿Casualidad? No. Los datos se simularon con cuatro gustos latentes. El modelo ha descubierto la estructura real. Y como hay regularización, los factores sobrantes apenas hacen daño.

[DEMO: soluciones, ejercicio 2. Mostrar la tabla de RMSE de train y test para λ = 0,1; 0,3; 1; 3; 8 y 30, y el gráfico de las dos curvas.]

Ahora lambda. Esto es lo que pide el ejercicio dos. Mira las dos columnas.

Con lambda cero coma uno, el error de entrenamiento es bajísimo, cero coma treinta y seis. Pero el de test sube a cero coma ochenta y siete. El modelo memoriza. Y mira la norma de los vectores de usuario: se dispara. Es sobreajuste de manual.

Con lambda entre uno y tres está el mínimo: cero coma sesenta y ocho en test.

Con lambda ocho, el valor por defecto del notebook, cero coma setenta y cinco. No es el óptimo. Moraleja: compensa ajustar.

Y con lambda treinta, el modelo está asfixiado. Los vectores son casi cero, el error de train y el de test son altos y parecidos, y el resultado es prácticamente el del modelo de sesgos. Infraajuste.

[CÁMARA]

La regla de oro: k y lambda se eligen con datos de validación. Nunca mirando el error de entrenamiento, que siempre mejora al complicar el modelo.

Y un matiz importante. En el notebook usamos el mismo conjunto de test para comparar valores de k y de lambda. Para aprender está bien. En un proyecto real, separarías tres trozos: entrenamiento para ajustar, validación para elegir hiperparámetros y test, que solo se mira una vez al final, para informar del resultado. Si eliges con el test, el número que reportas es optimista.

### [15:00–17:30] La comparación final

[DIAPOSITIVA 6.4-8]

[DEMO: notebook, sección 6. Mostrar la tabla de comparación completa.]

Vamos a la tabla de la sección seis. Media global, uno coma cero nueve. Sesgos, cero coma noventa y seis. Ítem-ítem, cero coma ochenta y uno. Y ALS, cero coma setenta y cinco. En precisión arroba cinco, ALS también gana: cero coma cuarenta.

Ojo con un detalle: en datos simulados las ventajas son más grandes que en datos reales, porque la estructura latente es muy limpia. En MovieLens real, como vimos, las diferencias entre los buenos modelos son de un uno o dos por ciento. Lo comprobarás en el ejercicio cuatro.

Y otro matiz: las diferencias en RMSE parecen pequeñas en términos absolutos. De cero coma ochenta y uno a cero coma setenta y cinco. Pero en el top de la lista, donde se juega el negocio, pueden suponer que una de cada diez recomendaciones pase de fallo a acierto. Por eso miramos siempre también la métrica de ranking.

### [17:30–19:00] Usos de los factores

[DIAPOSITIVA 6.4-9]

[DEMO: notebook, sección 8. Mostrar la celda que obtiene el top 10 del usuario 42 filtrando las películas ya vistas.]

Los factores sirven para mucho más que predecir. Para recomendar: ordenas las predicciones de las películas que el usuario no ha visto. Es lo que hace la sección ocho con el usuario cuarenta y dos. Para encontrar películas similares: vecinos en el espacio de los q. Para segmentar: un clustering de los vectores de usuario te da grupos de gustos. Y para servir rápido: un producto escalar se calcula en microsegundos, y con búsqueda aproximada encuentras los mejores entre millones.

### [19:00–20:00] Resumen y qué viene después

[CÁMARA]

Resumen. La factorización describe usuarios y películas con unos pocos gustos latentes. La "SVD" de recomendación se ajusta solo con lo observado y con regularización. ALS alterna regresiones ridge con solución cerrada, y se paraleliza de maravilla. Y k y lambda controlan el equilibrio entre sobreajuste e infraajuste.

Hasta ahora hemos trabajado con estrellas. Pero la mayoría de la gente nunca valora nada. En el próximo vídeo veremos qué hacer cuando solo tenemos clics y minutos vistos.

---

## Vídeo 6.5 · Retroalimentación implícita (clics, visualizaciones) (duración objetivo: 10 min)

**Objetivo del vídeo:** distinguir datos explícitos e implícitos, entender el modelo de preferencia y confianza, ALS ponderado y las implicaciones para la evaluación y el diseño de la señal.

**Material:** diapositivas 6.5-1 a 6.5-6.

### [00:00–01:15] Gancho

[CÁMARA]

¿Cuántas películas has puntuado con estrellas este año? Seguramente pocas o ninguna. ¿Cuántas has visto? Muchas más. Y cada una dejó un rastro: le diste al play, viste cuarenta minutos, la abandonaste o la terminaste en una noche.

Las empresas tienen muchísimos más datos de comportamiento que de valoraciones. Pero esos datos tienen una trampa. Hoy vamos a ver cuál es y cómo se resuelve.

Y no es un tema académico. Las tiendas online, las plataformas de música, las aplicaciones de noticias o de comida a domicilio funcionan casi exclusivamente con datos implícitos. Si trabajas en recomendación en una empresa, lo más probable es que nunca veas una estrella.

### [01:15–02:30] Explícita frente a implícita

[DIAPOSITIVA 6.5-1]

La retroalimentación explícita es lo que el usuario declara: cuatro estrellas, me gusta. Es clara, pero escasa.

La implícita es lo que el usuario hace: clics, reproducciones, minutos, compras, búsquedas. Hay muchísima más. Pero es ruidosa: un clic puede ser un error, una compra puede ser un regalo, y una reproducción puede ser el autoplay mientras estabas en la cocina.

Además, la implícita mide algo distinto. Las estrellas reflejan lo que el usuario cree que debería gustarle. El comportamiento refleja lo que de verdad consume. Hay gente que puntúa con cinco estrellas los documentales premiados y luego se pasa la semana viendo comedias ligeras. ¿Qué le recomendarías un viernes por la noche?

### [02:30–04:30] Preferencia y confianza

[DIAPOSITIVA 6.5-2]

Ahora la trampa. En los datos implícitos no hay "no me gusta". Si Ana no ha visto una película, ¿es porque no le interesa? ¿Porque no la conoce? ¿Porque no está en su país? No lo sabemos.

Si entrenamos como en el vídeo anterior, solo con lo observado, todas las celdas valdrían "uno": vio. Y el modelo aprendería a predecir uno para todo. Inútil.

La solución clásica, de Hu, Koren y Volinsky en dos mil ocho, separa dos conceptos. La preferencia: uno si interactuó, cero si no. Y la confianza: cuánto nos creemos esa preferencia. La confianza crece con la intensidad: uno más alfa por los minutos vistos, por ejemplo.

Así, terminar una serie da mucha confianza en que le gusta. Un clic de dos segundos, poca. Y no haberla visto da un "no le gusta" con la confianza mínima.

### [04:30–06:30] ALS ponderado

[DIAPOSITIVA 6.5-3]

El modelo ahora usa todas las celdas de la matriz. Todas. Cada una pesa según su confianza.

¿Todas? ¿Diez millones de usuarios por cincuenta mil productos? Parece imposible. Pero aquí ALS brilla. Al resolver cada usuario, la parte que afecta a todos los productos se calcula una sola vez para todos. Y luego solo se corrige con los pocos productos con los que ese usuario interactuó. El coste depende de las interacciones, no del tamaño de la matriz.

Por eso ALS es el estándar para datos implícitos a gran escala.

El parámetro alfa controla cuánto más pesa lo observado frente a lo no observado. Si alfa es muy bajo, el modelo trata todo casi igual y aprende poco. Si es muy alto, ignora lo no observado y vuelve el problema de predecir uno para todo. Como lambda, se ajusta con validación.

[DIAPOSITIVA 6.5-4]

[PANTALLA: fragmento de código de la diapositiva con la librería `implicit`; no se ejecuta en el notebook del curso.]

En la práctica no lo programas tú. Librerías abiertas como implicit, o Spark MLlib, lo traen hecho. Le pasas una matriz dispersa con las confianzas, y te devuelve recomendaciones y productos similares.

Lo que sí te toca decidir a ti es todo lo que hay alrededor: qué eventos cuentan, cómo se convierten en confianza, cuántos factores usar y cuánta regularización. Y eso nos lleva a la parte más importante.

### [06:30–08:00] Otras ideas y evaluación

[DIAPOSITIVA 6.5-5]

Otras ideas que encontrarás. Muestreo de negativos: en lugar de usar todas las celdas vacías, tomas unas pocas al azar por cada positiva. BPR: en vez de predecir unos y ceros, el modelo aprende que lo consumido debe puntuar más que lo no consumido. Optimiza directamente el orden, que es lo que importa. Y recencia: un clic de ayer dice más de tus gustos actuales que uno de hace dos años.

¿Y cómo se evalúa? Sin notas, el RMSE no tiene sentido. Se usan métricas de ranking: de lo que el usuario vio la semana siguiente, ¿cuánto estaba en su top diez? Y se parte por tiempo: entrenas con el pasado y evalúas con el futuro.

Un ejemplo de negocio. Un supermercado online usa las compras de los últimos seis meses para entrenar y comprueba si los productos que cada cliente compra la semana siguiente estaban entre sus diez primeras recomendaciones. Ojo: ahí aparece un caso especial, la recompra. Leche, pan, comida para el gato. Recomendar lo que ya compras es útil en un supermercado y absurdo en una plataforma de películas.

### [08:00–09:15] La señal manda

[DIAPOSITIVA 6.5-6]

[CÁMARA]

Te dejo con la lección más práctica del vídeo. Antes de elegir algoritmo, elige bien la señal.

Si usas "inició la reproducción", premiarás las portadas llamativas y el autoplay. Si usas "minutos vistos", premiarás los contenidos largos. "Vio más del setenta por ciento" suele ser más fiable. Y abandonar en los dos primeros minutos puede tratarse como una señal negativa débil.

Lo que optimizas es lo que obtienes. Si premias clics, tendrás un sistema experto en clickbait.

Un consejo final: documenta la definición de la señal igual que documentarías una métrica de negocio. Cuando dentro de un año alguien pregunte por qué el sistema recomienda tantos contenidos cortos, la respuesta estará probablemente en esa definición.

### [09:15–10:00] Resumen y qué viene después

Resumen. Los datos implícitos son abundantes, ruidosos y sin negativos. Separamos preferencia y confianza. ALS ponderado lo resuelve de forma eficiente. Y se evalúa con ranking y partición temporal.

Hablando de evaluar: en el próximo vídeo veremos por qué un modelo puede mejorar todas tus métricas offline y no cambiar ni un euro de las ventas.

---

## Vídeo 6.6 · Evaluación offline y pruebas A/B de recomendadores (duración objetivo: 15 min)

**Objetivo del vídeo:** conocer las métricas de error y de ranking, sus limitaciones, las formas de partir los datos, las métricas más allá de la precisión y cómo diseñar una prueba A/B de un recomendador.

**Material:** diapositivas 6.6-1 a 6.6-7; notebook, secciones 2 y 6.

### [00:00–01:30] Gancho

[CÁMARA]

Tu equipo pasa tres meses mejorando el recomendador. El RMSE baja un cuatro por ciento. Lo despliegas con orgullo. Y al mes, el director financiero te pregunta: "¿Y las ventas?". Las ventas están exactamente igual.

¿Cómo es posible? Esta pregunta es una de las de la autoevaluación, y es de las más importantes del módulo. Hoy vamos a responderla.

### [01:30–02:45] Tres niveles de evaluación

[DIAPOSITIVA 6.6-1]

Hay tres niveles. La evaluación offline usa datos históricos. Es rápida y barata, y sirve para descartar ideas malas. La evaluación online, con pruebas A/B, enseña el modelo a usuarios reales y mide el efecto causal. Y los estudios con usuarios preguntan por la percepción: ¿confías en las recomendaciones? ¿Te sorprenden?

Cada nivel es más caro y más fiable que el anterior.

Por eso se usan en embudo. Pruebas diez ideas offline, te quedas con las dos mejores y solo esas pasan a un A/B. Hacer un A/B de cada idea sería lentísimo y arriesgado; quedarte solo con lo offline sería engañarte.

### [02:45–05:30] Error frente a ranking

[DIAPOSITIVA 6.6-2]

Empecemos por las métricas. El RMSE mide cuánto te equivocas en la nota. Penaliza mucho los errores grandes. Pero trata igual todos los errores. Equivocarte entre una y dos estrellas en una película que nunca recomendarías pesa lo mismo que equivocarte en la primera posición de la portada.

Lo que ve el usuario es una lista. Para eso están las métricas de ranking. La precisión arroba k: de los k primeros, ¿cuántos son relevantes? El recall arroba k: de todo lo relevante para el usuario, ¿cuánto he metido en el top k? Y NDCG: premia que los aciertos estén arriba. Un acierto en la primera posición vale más que en la quinta, porque divide por el logaritmo de la posición.

Un ejemplo. Dos modelos recomiendan cinco películas y los dos aciertan dos. Su precisión arroba cinco es la misma: cero coma cuatro. Pero el primero acierta en las posiciones uno y dos, y el segundo en la cuatro y la cinco. El NDCG del primero es mucho más alto. Y tiene sentido: el usuario mira primero arriba, y muchas veces no baja.

[DIAPOSITIVA 6.6-3]

[DEMO: notebook, sección 2. Mostrar la función `precision_at_k` y explicar el bucle: para cada usuario con al menos 5 películas en test, ordenar esas películas por la puntuación del modelo, tomar las 5 primeras y contar las de 5 estrellas.]

El notebook usa una precisión arroba cinco sencilla. Para cada usuario, toma sus películas de test, las ordena con el modelo y mira cuántas de las cinco primeras recibieron cinco estrellas.

¿Por qué cinco estrellas y no cuatro? Es una decisión de diseño: definir qué es "relevante". Con un umbral de cuatro, casi todo sería relevante y la métrica distinguiría poco entre modelos. Con cinco, preguntamos por lo que de verdad le encantó. Cambia el umbral y cambiarán los números, así que fíjalo antes de comparar.

Tiene una limitación que debes entender. Solo reordena películas que el usuario ya vio. Por eso la popularidad sale casi como el azar: cero coma treinta y uno frente a cero coma treinta. No le preguntamos qué verá el usuario, sino cuál de las que vio le gustó más.

En producción se ordena todo el catálogo que el usuario no ha visto y se mira si lo que acabó consumiendo estaba arriba. Con esa métrica, la popularidad sale mucho mejor parada.

### [05:30–07:30] Cómo partir los datos

[DIAPOSITIVA 6.6-4]

La forma de partir los datos cambia las conclusiones.

El notebook usa una partición aleatoria por usuario. Es sencilla, pero permite al modelo "ver el futuro": entrenar con notas de este año para predecir notas del año pasado.

La partición temporal entrena hasta una fecha y evalúa después. Es lo que más se parece a la realidad. Si tienes fechas, úsala.

Y dejar usuarios completos fuera sirve para medir el arranque en frío.

Una advertencia: todo lo que calcules, medias, sesgos, similitudes, sale solo del entrenamiento. Si se cuela una nota de test, los resultados son optimistas y falsos.

Un caso real de fuga: calcular la popularidad de cada película con todo el histórico, incluido el periodo de test. El modelo "sabe" qué películas serán un éxito la semana que viene. En la evaluación parece un genio. En producción no tiene esa información y se desploma.

### [07:30–08:45] Más allá de la precisión

[DIAPOSITIVA 6.6-5]

Imagina un recomendador que a todo el mundo le enseña los mismos cincuenta éxitos. Su precisión puede ser buena. Pero el ochenta por ciento del catálogo nunca aparece.

Por eso se vigilan otras métricas. Cobertura: qué parte del catálogo llega a recomendarse. Diversidad: cuán distintos son los ítems de una misma lista. Novedad: cuán poco conocidos son. Y serendipia: aciertos que el usuario no habría encontrado solo.

En la práctica, estas métricas se ponen en el mismo panel que la precisión. Si un modelo nuevo gana dos puntos de precisión pero reduce la cobertura a la mitad, esa es una conversación que hay que tener con producto antes de desplegar.

### [08:45–11:45] Pruebas A/B de recomendadores

[DIAPOSITIVA 6.6-6]

[CÁMARA]

Al final, la pregunta es causal. ¿El nuevo recomendador cambia el comportamiento? Eso solo lo responde un experimento. Ya viste las pruebas A/B en el módulo cuatro. Veamos lo específico de los recomendadores.

Primero, aleatoriza por usuario, no por sesión. Si Ana ve un modelo por la mañana y otro por la tarde, mezclas los efectos.

Segundo, elige una métrica principal de negocio: minutos vistos por usuario, conversión, retención a treinta días. No el clic: el clic se manipula fácilmente.

Tercero, métricas de guarda. Cosas que no deben empeorar: el tiempo de carga, las quejas, la diversidad del consumo. Y una que se olvida a menudo: el coste. Si el modelo nuevo empuja contenidos caros de licenciar, puede subir el consumo y bajar el margen.

Cuarto, fija tamaño y duración antes de empezar. Al menos una semana completa, para cubrir el ciclo semanal. Y cuidado con el efecto novedad: al principio la gente hace clic en lo nuevo por curiosidad. Y no pares el experimento en cuanto sale significativo.

Una alternativa más sensible para comparar dos rankings es el interleaving: a cada usuario le enseñas una lista que mezcla resultados de los dos modelos y cuentas en cuáles hace clic. Necesita muchos menos usuarios, aunque no mide efectos a largo plazo.

Y una advertencia sobre la interpretación. Si la métrica principal sube, pregúntate siempre de dónde viene. ¿Más usuarios que encuentran algo que ver, o los mismos usuarios viendo más horas de lo mismo? ¿Se ha desplazado el consumo hacia contenidos propios o de terceros? Segmentar el resultado por tipo de usuario, nuevo o veterano, suele revelar sorpresas.

### [11:45–13:45] Offline frente a online

[DIAPOSITIVA 6.6-7]

Volvamos al gancho. ¿Por qué mejora el RMSE y no las ventas? Tres razones típicas.

Una: la mejora está en ítems que nunca llegan al top de la lista. Has afinado notas de películas que nadie verá.

Dos: el bucle de retroalimentación. Tus datos históricos los generó el sistema anterior. Solo sabes lo que opinan los usuarios de lo que les enseñaste. El modelo nuevo puede ser muy bueno imitando al viejo.

Tres: no hay efecto incremental. Recomiendas cosas que el usuario habría encontrado de todos modos. Aciertas, pero no cambias nada.

La conclusión: la evaluación offline sirve para filtrar. La decisión se toma con una prueba A/B.

Pongamos un ejemplo completo. Un marketplace de cursos online compara ALS con ítem-ítem. Offline, ALS mejora la precisión arroba diez un seis por ciento. Hacen un A/B: mitad de usuarios para cada modelo, tres semanas. Resultado: las matrículas por usuario suben un uno coma dos por ciento, con un intervalo de confianza que no incluye el cero, y las métricas de guarda no empeoran. Deciden desplegar. Fíjate en la proporción: un seis por ciento offline se tradujo en un uno coma dos online. Es lo habitual. Y si hubiera sido cero, la mejora offline no habría justificado mantener un modelo más complejo.

### [13:45–15:00] Resumen y qué viene después

[CÁMARA]

Resumen. El RMSE mide notas; precisión, recall y NDCG miden la lista. La forma de partir los datos importa. Vigila cobertura y diversidad. Y decide con un A/B con métrica de negocio y métricas de guarda. Esto es exactamente lo que tendrás que proponer en el punto cuatro del caso práctico.

En el último vídeo del módulo abordamos los problemas del mundo real: usuarios y productos nuevos, y el riesgo de encerrar a la gente en una burbuja.

---

## Vídeo 6.7 · Arranque en frío, diversidad y burbujas de filtro (duración objetivo: 10 min)

**Objetivo del vídeo:** diseñar estrategias para el arranque en frío de usuarios e ítems, entender exploración frente a explotación y aplicar medidas contra el sesgo de popularidad y las burbujas de filtro.

**Material:** diapositivas 6.7-1 a 6.7-8; soluciones, ejercicio 1.

### [00:00–01:15] Gancho

[CÁMARA]

Lunes, nueve de la mañana. Tu plataforma estrena la película más cara de su historia. Y tu recomendador, tan bien entrenado, no la recomienda a nadie. ¿Por qué? Porque nadie la ha valorado todavía. Y como no la recomienda, nadie la verá. Y como nadie la verá, nunca tendrá valoraciones.

Bienvenido al arranque en frío. Hoy vemos cómo salir de ese círculo, y de otro más peligroso: el de las burbujas.

### [01:15–02:00] Tres arranques en frío

[DIAPOSITIVA 6.7-1]

Hay tres tipos. Usuario nuevo: no tiene sesgo ni vector de gustos. Ítem nuevo: el estreno, sin sesgo ni vector. Y sistema nuevo: una plataforma que acaba de lanzarse y no tiene casi nada. Cada uno pide su estrategia.

### [02:00–04:00] Usuario nuevo

[DIAPOSITIVA 6.7-2]

[DEMO: soluciones, ejercicio 1a. Mostrar la tabla con las cuatro listas fijas (más populares, mejor valoradas, media bruta, híbrido) y sus columnas de cobertura, aciertos de 5 estrellas y nota media.]

En las soluciones del ejercicio uno hacemos un experimento. Tratamos a todos los usuarios de test como si fueran nuevos, y les enseñamos a todos la misma lista de diez películas.

La lista de las más populares la acaba viendo el ochenta y dos por ciento de los usuarios. Pero su nota media es tres coma nueve: gusta regular. La de las mejor valoradas, con el sesgo regularizado, tiene una nota media altísima, cuatro coma seis, pero solo la ve el treinta y seis por ciento: son joyas de nicho. La media bruta, sin regularizar, es la peor: películas con poquísimas notas que casi nadie ve.

¿Y el híbrido, mitad popularidad, mitad calidad? Lo ve el setenta y dos por ciento, su nota media es cuatro coma quince, y es la lista con más usuarios que encuentran una película de cinco estrellas.

A partir de ahí: usa el contexto, como el país o el dispositivo. Pregunta en el registro por tres o cuatro géneros favoritos. Y en cuanto haya unas pocas interacciones, calcula su vector de gustos sin reentrenar todo: con Q fijo, es una pequeña regresión ridge.

Fíjate en la diferencia con la tabla del notebook. Allí la popularidad parecía casi inútil. Aquí, cuando la pregunta es qué enseñar a alguien de quien no sabemos nada, es imprescindible. La métrica que eliges decide qué modelo parece bueno.

### [04:00–05:30] Ítem nuevo

[DIAPOSITIVA 6.7-3]

[DEMO: soluciones, ejercicio 1b. Mostrar la tabla de RMSE para los 30 estrenos con las cuatro estrategias.]

Para el estreno, la solución es híbrida: aprender a pasar de los metadatos de la película a sus parámetros colaborativos. En las soluciones retiramos treinta películas del entrenamiento y usamos unos géneros y una nota de la crítica simulados.

Sin información de la película, el error es uno coma cero ocho. Con los géneros, que estiman el vector q, baja a uno coma cero dos. Con la crítica, que estima el sesgo, baja a cero coma noventa y dos. Y con las dos cosas, a cero coma ochenta y seis.

La lección: los géneros te dicen a quién le gustará. La crítica te dice cuánto gustará. Necesitas las dos piezas.

En la vida real, esos metadatos pueden ser géneros, director, reparto, la sinopsis convertida en un vector con un modelo de lenguaje, o incluso las primeras reacciones del público en el tráiler. Y a medida que el estreno acumula valoraciones, vas pasando de la estimación por contenido a la colaborativa, poco a poco, con el mismo encogimiento que ya conoces.

### [05:30–06:30] Explorar frente a explotar

[DIAPOSITIVA 6.7-4]

Además, al estreno hay que darle una oportunidad. Si siempre recomiendas lo que el modelo cree mejor, explotas, pero nunca aprendes nada nuevo. Explorar es enseñar a veces algo incierto para aprender de la respuesta.

Los algoritmos de bandits hacen este equilibrio. El más sencillo: con probabilidad épsilon, enseña un candidato al azar. Los más finos exploran sobre todo lo que tiene más incertidumbre. Justo lo que necesita un estreno.

El precio de explorar es pequeño y está controlado: unos pocos huecos de la portada. El precio de no explorar es enorme: un catálogo que se congela en los éxitos de siempre.

### [06:30–08:00] Sesgo de popularidad y diversidad

[DIAPOSITIVA 6.7-5]

Ahora el círculo peligroso. Lo que se recomienda se ve más. Lo que se ve más genera más datos positivos. Y con más datos, parece mejor y se recomienda todavía más. El catálogo visible se encoge. Y los proveedores pequeños, artistas, vendedores, productoras independientes, desaparecen.

[DIAPOSITIVA 6.7-6]

Una herramienta sencilla para romperlo es reordenar la lista con MMR. Construyes la lista paso a paso. En cada paso eliges el ítem que maximiza su relevancia menos su parecido con lo que ya has elegido. Con theta igual a uno, ranking puro. Si bajas theta, penalizas lo repetitivo. También puedes poner cuotas por categoría, un máximo de canciones por artista, o reservar huecos para novedades.

### [08:00–09:00] Burbujas de filtro

[DIAPOSITIVA 6.7-7]

Llevado al extremo, el sistema solo te enseña lo que encaja con lo que ya consumes. Es la burbuja de filtro. En entretenimiento, aburre. En noticias o redes sociales, puede ser un problema social.

Medidas prácticas: mide la diversidad y la cobertura en el mismo panel que la precisión. Da control al usuario: "no me interesa", "ver menos de esto". Explica por qué recomiendas algo. Y ten en cuenta la regulación: en la Unión Europea, el Reglamento de Servicios Digitales exige a las grandes plataformas transparencia sobre sus recomendadores y al menos una opción no basada en perfiles.

### [09:00–10:00] Resumen del módulo y qué viene después

[DIAPOSITIVA 6.7-8]

[CÁMARA]

Y con esto cerramos el módulo. Repasemos la lista de comprobación antes de desplegar un recomendador. Supera a las referencias. Mide ranking, cobertura y diversidad. Ten un plan para usuarios y productos nuevos. Explora de forma controlada. Valida con un A/B y una métrica de negocio. Y da explicaciones y control al usuario.

Ahora te toca a ti. En el caso práctico compararás tres recomendadores en MovieLens 100K y defenderás ante el director de producto cuál desplegarías. La semana que viene cambiamos de estructura: pasamos de matrices a redes. Grafos, centralidad y PageRank.
