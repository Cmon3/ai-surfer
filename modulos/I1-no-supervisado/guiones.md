# Módulo I1 · Datos no estructurados: clustering y reducción de dimensión — Guiones de vídeo

Guiones para grabar los 8 vídeos del módulo. Las indicaciones entre corchetes son de producción y no se leen:

- `[DIAPOSITIVA N.M-k]`: mostrar la diapositiva con ese id en `diapositivas.md`.
- `[PANTALLA: ...]`: captura de pantalla o gráfico concreto.
- `[DEMO: ...]`: grabación de pantalla del notebook (`notebook.ipynb`) ejecutando la sección indicada.
- `[CÁMARA]`: plano del presentador.

Extensión orientativa de la narración: unas 100 palabras por minuto. Las demos se describen; se narra lo que se ve, no cada línea de código.

---

## Vídeo 2.1 · Aprendizaje supervisado vs. no supervisado (duración objetivo: 10 min)

**Objetivo del vídeo:** que el participante distinga los problemas supervisados de los no supervisados, conozca las tres tareas no supervisadas principales y entienda por qué sus resultados se validan de otra manera.

**Material:** diapositivas 2.1-1 a 2.1-6; notebook, secciones 1 y 2 (solo para enseñar los datos y el ARI).

### [00:00–01:30] Gancho

[CÁMARA]

Imagina que trabajas en un e-commerce. Tu directora de marketing te para en el pasillo y te dice: «Tenemos mil quinientos clientes activos. Quiero dejar de mandarles a todos el mismo email. ¿Qué tipos de cliente tenemos?».

Abres la base de datos. Tienes cuándo compró cada cliente por última vez, cuántas veces compra al año y cuánto gasta de media. Pero no hay ninguna columna que diga «este es un cliente fiel» o «este está a punto de irse». Nadie ha etiquetado a los clientes.

[DIAPOSITIVA 2.1-1]

¿Cómo respondes a una pregunta cuando no tienes ejemplos de la respuesta correcta? De eso va este módulo. Y de eso va esta primera lección: de la diferencia entre aprender con profesor y aprender sin él.

### [01:30–03:30] Dos formas de aprender

[DIAPOSITIVA 2.1-2]

En el aprendizaje supervisado tenemos dos cosas: unas variables de entrada, que llamamos X, y una respuesta, que llamamos y. El precio de una casa. Si un cliente se dio de baja. Si un correo era spam. El modelo aprende la relación entre X e y, y lo evaluamos comparando lo que predice con lo que realmente pasó. Hay un profesor que corrige: las etiquetas.

En el aprendizaje no supervisado solo tenemos X. No hay y. La pregunta cambia: ya no es «¿qué valor tendrá y?», sino «¿qué estructura hay escondida en X?». ¿Hay grupos? ¿Hay variables que en el fondo dicen lo mismo? ¿Hay observaciones que no se parecen a ninguna otra?

Fíjate en la última fila de la tabla. «¿Se dará de baja este cliente?» es supervisado: necesito un histórico de clientes que se fueron y que se quedaron. «¿Qué tipos de cliente tengo?» es no supervisado: nadie me ha dado la lista de tipos.

### [03:30–05:00] Tres tareas no supervisadas

[DIAPOSITIVA 2.1-3]

Dentro del no supervisado hay tres tareas que vas a encontrar una y otra vez.

La primera es el clustering, o agrupamiento: encontrar grupos de observaciones parecidas. Segmentar clientes es el ejemplo clásico.

La segunda es la reducción de dimensión: pasar de muchas variables a pocas sin perder lo esencial. Por ejemplo, una encuesta con cuarenta preguntas que, en el fondo, mide tres cosas: precio, servicio y producto.

La tercera es la detección de anomalías: encontrar lo que no se parece a nada. Una transacción con tarjeta a las cuatro de la mañana, en otro país y por un importe diez veces mayor de lo habitual.

En este módulo nos centramos en las dos primeras. La tercera aparece casi gratis: un punto que está lejísimos de todos los grupos ya es, por definición, raro.

### [05:00–06:45] Por qué es más subjetivo

[DIAPOSITIVA 2.1-4]

Aquí viene la parte incómoda. Sin etiquetas, no puedo calcular un porcentaje de aciertos. Dos analistas pueden segmentar la misma base de clientes en cuatro grupos o en seis, y los dos pueden tener argumentos.

Y hay algo peor: el algoritmo siempre te devuelve grupos. Siempre. Aunque los datos sean completamente aleatorios. Si le pides cinco grupos, te da cinco. No te va a decir «oye, aquí no hay nada».

Entonces, ¿todo vale? No. Tenemos tres filtros. Uno: criterios internos, que miden si los grupos son compactos y están separados. Dos: estabilidad. Si cambio un poco la muestra o la semilla, ¿salen los mismos grupos? Y tres, el más importante en un contexto profesional: utilidad. ¿Me permite esta segmentación tomar decisiones distintas con cada grupo? Si la respuesta es no, da igual lo bonitos que sean los números.

### [06:45–08:15] Cuándo aporta valor

[DIAPOSITIVA 2.1-5]

¿Cuándo merece la pena? Primero, para explorar. Antes de construir cualquier modelo, entender qué tipos de clientes o productos hay. Muchas preguntas supervisadas nacen de ahí.

Segundo, para segmentar y actuar distinto con cada grupo: campañas, precios, niveles de servicio.

Tercero, para comprimir y visualizar. Si tienes sesenta y cuatro variables, no puedes dibujarlas. Si las reduces a dos, sí.

Cuarto, para crear variables. El segmento de un cliente puede entrar después en un modelo supervisado.

Y quinto, para etiquetar barato. Si tienes cien mil documentos y etiquetarlos cuesta dinero, agrúpalos primero y revisa solo unos cuantos de cada grupo.

Piensa en una cadena de gimnasios con ochenta mil socios. Nadie ha clasificado a los socios, pero un clustering sobre sus horarios y su asistencia puede revelar a los madrugadores de sala de musculación, a las familias de fin de semana y a los socios fantasma que pagan y no vienen. Tres grupos, tres decisiones diferentes.

### [08:15–09:15] Un lujo didáctico en el notebook

[DIAPOSITIVA 2.1-6]

[DEMO: notebook, sección 1 — ejecutar la celda de simulación y mostrar `clientes.describe()`; señalar la columna `perfil_real`]

En el notebook vamos a hacer una pequeña trampa, y te la cuento desde ya. Los datos son simulados. Hemos creado mil quinientos clientes a partir de cuatro perfiles ocultos: fieles, ocasionales, premium y dormidos. Esa información está en la columna `perfil_real`.

El algoritmo no la ve. Pero nosotros sí, y la usaremos para medir cuánto se parecen los grupos que encuentra a los verdaderos. Para eso usamos el ARI, el índice de Rand ajustado: vale uno si los grupos coinciden exactamente con los reales y cero si son como tirar una moneda.

Que quede claro: en un proyecto real no tendrás esa columna. Es un lujo para aprender, no una costumbre.

¿Y entonces cómo validarás en la vida real? Con lo que te acabo de contar: criterios internos, estabilidad y, sobre todo, enseñando los grupos a la gente que conoce el negocio. Si el equipo comercial reconoce a sus clientes en tus segmentos, vas bien.

### [09:15–10:00] Resumen y qué viene

[CÁMARA]

Resumen. Supervisado: aprendo y a partir de X. No supervisado: busco estructura solo en X. Las tareas principales son clustering, reducción de dimensión y detección de anomalías. Y como no hay respuesta correcta, juzgamos con criterios internos, estabilidad y, sobre todo, utilidad.

En el próximo vídeo veremos la pieza sobre la que se apoya casi todo el módulo: cómo medir si dos clientes se parecen. Y descubrirás por qué un detalle tan aburrido como las unidades de medida puede arruinar una segmentación entera.

---

## Vídeo 2.2 · Distancias y por qué escalar (duración objetivo: 10 min)

**Objetivo del vídeo:** que el participante entienda que los métodos del módulo se basan en distancias, vea cómo las unidades distorsionan el resultado y sepa elegir y aplicar un escalador.

**Material:** diapositivas 2.2-1 a 2.2-6; notebook, sección 2.

### [00:00–01:15] Gancho

[CÁMARA]

Tenemos dos clientes. Ana compró hace diez días y compra veinte veces al año. Bruno compró hace ciento diez días y también compra veinte veces al año. Y Carla compró hace diez días, como Ana, pero solo compra dos veces al año.

Pregunta rápida: ¿a quién se parece más Ana, a Bruno o a Carla?

Para un algoritmo que no escala los datos, la respuesta es Carla, de calle. Y casi seguro que tu intuición de negocio dice otra cosa. Vamos a ver por qué pasa esto y cómo arreglarlo con una línea de código.

### [01:15–03:00] Parecido es cercanía

[DIAPOSITIVA 2.2-1]

Casi todo lo que vamos a hacer en este módulo descansa sobre una idea: dos observaciones se parecen si están cerca. Cada cliente es un punto en un espacio con tantas dimensiones como variables. Con recencia, frecuencia y gasto, un espacio de tres dimensiones.

¿Y cómo medimos «cerca»? Lo más habitual es la distancia euclídea: la distancia en línea recta de toda la vida. Restas variable a variable, elevas al cuadrado, sumas y haces la raíz. Pitágoras, en más dimensiones.

Hay otras. La distancia Manhattan suma las diferencias en valor absoluto, como si caminaras por las calles de una ciudad en cuadrícula. Y la distancia coseno compara direcciones, no tamaños, y es muy útil con texto. Pero para este módulo, la euclídea es la protagonista.

¿Por qué tanto interés en la distancia? Porque es la definición operativa de «parecido». Cuando k-means agrupa, cuando el jerárquico une grupos, cuando PCA mide varianza, todos están usando, de una forma u otra, esta idea de cercanía. Si la distancia está mal definida, todo lo que construyas encima estará mal, por sofisticado que sea el algoritmo.

### [03:00–04:45] El problema de las unidades

[DIAPOSITIVA 2.2-2]

Ahora mira la fórmula con otros ojos. Cada variable aporta su diferencia al cuadrado. ¿Qué pasa si una variable se mide en cientos y otra en unidades?

En nuestros datos, la recencia va en días y tiene una desviación típica de unos ciento cuarenta. La frecuencia va en compras al año y su desviación es de unas nueve. Para la distancia euclídea, cien días de diferencia pesan exactamente lo mismo que cien compras al año de diferencia. Y nadie compra cien veces más que otro cliente. Resultado: la frecuencia prácticamente no cuenta.

Volvamos a Ana, Bruno y Carla. Entre Ana y Bruno hay cien días de diferencia: distancia cien. Entre Ana y Carla hay dieciocho compras de diferencia: distancia dieciocho. Para el algoritmo, Carla es la gemela de Ana. Para el negocio, Ana y Bruno son clientes recurrentes y Carla es ocasional.

### [04:45–06:15] Estandarizar

[DIAPOSITIVA 2.2-3]

La solución estándar es estandarizar. A cada variable le restamos su media y la dividimos por su desviación típica. Después de esto, todas las variables tienen media cero y desviación uno, y una unidad significa lo mismo en todas: una desviación típica.

En scikit-learn es una línea: `StandardScaler().fit_transform(X)`.

[DEMO: notebook, sección 2 — ejecutar la celda que aplica `StandardScaler` y el bucle que compara k-means sin escalar y escalado; dejar visibles los dos valores de ARI]

Vamos a verlo en el notebook. Aplicamos k-means con cuatro grupos dos veces: una a los datos tal cual y otra a los datos escalados. Y comparamos con los perfiles reales usando el ARI.

[DIAPOSITIVA 2.2-4]

Sin escalar, el ARI se queda en torno a cero coma cincuenta y dos. Escalando, sube a cero coma setenta y seis. Mismo algoritmo, mismo número de grupos, mismos clientes. Solo hemos cambiado las unidades. Ese es el tamaño del efecto.

### [06:15–07:45] Qué escalador usar

[DIAPOSITIVA 2.2-5]

`StandardScaler` es la opción por defecto, pero no la única. Si tus variables están acotadas, como porcentajes o puntuaciones de cero a diez, `MinMaxScaler` las lleva al intervalo entre cero y uno. Si tienes valores atípicos muy fuertes, `RobustScaler` usa la mediana y el rango intercuartílico, que no se dejan arrastrar por los extremos.

Y un truco muy útil con datos de negocio: las variables de dinero o de número de visitas suelen tener una cola larga. Unos pocos clientes gastan diez veces más que la mediana. Si aplicas un logaritmo antes de estandarizar, por ejemplo con `np.log1p`, esos clientes dejan de dominar y de formar su propio grupo.

### [07:45–09:00] Escalar es ponderar

[DIAPOSITIVA 2.2-6]

Una idea que quiero que te lleves: escalar no es un paso técnico neutro. Cuando estandarizas, estás diciendo que todas las variables pesan lo mismo. A veces es lo que quieres. A veces no.

Si para tu negocio el gasto importa el doble que la recencia, puedes multiplicar la columna escalada del gasto por dos. Es legítimo. Lo que no es legítimo es que el peso de cada variable lo decidan, por accidente, las unidades en las que alguien guardó los datos.

Y un aviso práctico: los centros de los grupos calculados sobre datos escalados no se pueden enseñar a marketing. Nadie entiende «recencia menos cero coma ocho». Describe siempre los segmentos en días, compras y euros.

Otro aviso, para cuando el modelo se use con clientes nuevos: el escalador se ajusta una vez, con los datos de referencia, y después solo se aplica. No recalcules medias y desviaciones con cada lote nuevo, o el mismo cliente cambiaría de coordenadas según con quién llegue.

### [09:00–10:00] Resumen y qué viene

[CÁMARA]

Resumen. Los métodos del módulo miden distancias, y las distancias dependen de las unidades. Sin escalar, manda la variable con números más grandes. `StandardScaler` es la opción por defecto, y con colas largas, logaritmo antes. Y recuerda: escalar es ponderar.

Ya tenemos los datos preparados. En el próximo vídeo vamos a por el algoritmo de clustering más usado del mundo: k-means. Veremos cómo funciona por dentro y, sobre todo, cuándo te va a engañar.

---

## Vídeo 2.3 · k-means: algoritmo, supuestos y limitaciones (duración objetivo: 20 min)

**Objetivo del vídeo:** que el participante entienda qué optimiza k-means, cómo funciona el algoritmo paso a paso, cómo usarlo en scikit-learn y en qué situaciones falla.

**Material:** diapositivas 2.3-1 a 2.3-7; notebook, secciones 2 y 4; un gráfico propio de "medias lunas" (opcional, generado con `sklearn.datasets.make_moons`).

### [00:00–01:45] Gancho

[CÁMARA]

Una empresa de reparto quiere abrir cinco almacenes en una ciudad. Tiene las coordenadas de sus diez mil clientes habituales. ¿Dónde los pone para que la distancia media de cada cliente a su almacén sea lo más pequeña posible?

Piénsalo un momento. Si supieras qué clientes atiende cada almacén, pondrías cada almacén en el centro de sus clientes. Y si supieras dónde están los almacenes, cada cliente iría al más cercano. El problema es que no sabes ninguna de las dos cosas.

Este problema, tal cual, es k-means. Y la forma en que lo resuelve es tan sencilla que la vas a poder explicar a cualquiera en un minuto. Pero esa sencillez tiene letra pequeña, y hoy la vamos a leer entera.

### [01:45–04:00] Qué optimiza k-means

[DIAPOSITIVA 2.3-1]

k-means busca k grupos. Cada grupo tiene un centro, que llamamos centroide, y que es simplemente la media de los puntos del grupo. El objetivo es que cada punto esté lo más cerca posible del centro de su grupo.

Formalmente, minimiza la inercia, que llamamos W: para cada grupo, sumamos las distancias al cuadrado de cada punto a su centroide, y luego sumamos sobre todos los grupos. Cuanto menor es W, más apretados están los grupos alrededor de sus centros.

Fíjate en dos detalles de la fórmula. Uno: son distancias al cuadrado, así que un punto muy lejano pesa muchísimo. Lo recordaremos cuando hablemos de atípicos. Dos: todo se mide respecto a un centro. k-means no mira la forma del grupo, solo la distancia al centro. Eso va a ser la raíz de casi todas sus limitaciones.

### [04:00–07:00] El algoritmo paso a paso

[DIAPOSITIVA 2.3-2]

¿Cómo encuentra k-means los grupos? Con el algoritmo de Lloyd, que tiene cuatro pasos.

Paso uno: elegir k centros iniciales. Podrían ser k clientes al azar. scikit-learn usa una versión más lista, k-means más más, que intenta que los centros iniciales estén separados entre sí.

Paso dos: asignar. Cada punto se va con el centro que tiene más cerca.

Paso tres: actualizar. Cada centro se mueve a la media de los puntos que se le han asignado.

Paso cuatro: repetir los pasos dos y tres hasta que nadie cambie de grupo.

[PANTALLA: animación o secuencia de 4 gráficos de dispersión mostrando centros que se mueven en iteraciones sucesivas]

Míralo en la animación. Los centros empiezan en sitios malos. Los puntos se reparten. Los centros se mueven hacia sus puntos. Los puntos se vuelven a repartir. En pocas iteraciones todo se estabiliza.

Volvamos a los almacenes: coloco cinco almacenes donde sea, cada cliente se asigna al más cercano, muevo cada almacén al centro de sus clientes, y repito. Exactamente lo mismo.

Hagámoslo con números de juguete, en una sola dimensión. Tengo seis clientes con gasto medio de diez, doce, catorce, cuarenta, cuarenta y dos y cuarenta y cuatro euros, y quiero dos grupos. Pongo los centros iniciales en diez y en catorce, mal elegidos a propósito. Asigno: el diez va con el primer centro; el doce está a la misma distancia de los dos, y el empate se resuelve hacia el primero; el resto, con el segundo, que está en catorce. Actualizo: el primer centro pasa a once, la media de diez y doce; el segundo, a la media de catorce, cuarenta, cuarenta y dos y cuarenta y cuatro, que es treinta y cinco. Vuelvo a asignar: ahora el catorce está más cerca de once que de treinta y cinco, así que cambia de grupo. Actualizo: los centros quedan en doce y en cuarenta y dos. Una vuelta más y nadie cambia. Hemos terminado, y con dos grupos que cualquiera habría dibujado a ojo.

Hay un resultado importante: cada paso reduce la inercia o la deja igual. Así que el algoritmo siempre termina. Pero termina en un mínimo local, no necesariamente en el mejor posible. Si empiezas en otro sitio, puedes acabar en otra solución.

¿Cómo de malo puede ser un mínimo local? Imagina dos grupos reales pegados a la izquierda y uno grande a la derecha, y que por mala suerte dos centros iniciales caen en el grupo de la derecha y solo uno a la izquierda. El algoritmo puede acabar partiendo en dos el grupo de la derecha y fusionando los dos de la izquierda. Converge, la inercia deja de bajar, y la solución es mala. Por eso la inicialización importa tanto, y por eso k-means más más reparte los centros iniciales: elige el primero al azar y los siguientes con más probabilidad cuanto más lejos estén de los ya elegidos.

Un detalle más: el paso de actualizar usa la media. Eso significa que el centro de un grupo puede no coincidir con ningún cliente real. Es un «cliente promedio» que no existe. Cuando describas un segmento, tenlo presente: la media resume, pero ningún cliente concreto tiene por qué parecerse exactamente a ella.

### [07:00–09:30] k-means en scikit-learn

[DIAPOSITIVA 2.3-3]

En scikit-learn, k-means son tres líneas. Creamos el modelo con `n_clusters` igual a cuatro, `n_init` igual a diez y `random_state` igual a cero, y lo ajustamos a los datos escalados.

`n_init=10` es la respuesta al problema de los mínimos locales: ejecuta el algoritmo diez veces con arranques distintos y se queda con la solución de menor inercia. Y `random_state` hace que el resultado sea reproducible: tú y yo obtendremos los mismos grupos.

Después, `labels_` te da el segmento de cada cliente, `cluster_centers_` los centros, ojo, en unidades escaladas, e `inertia_` el valor de W.

[DEMO: notebook, sección 4 — ejecutar el ajuste de `KMeans(4, ...)` y la tabla `resumen` con las medias por segmento en unidades originales]

En el notebook, la sección cuatro hace justo esto y luego calcula la media de recencia, frecuencia y gasto de cada segmento, en sus unidades originales. Y ya se intuyen perfiles: un grupo que gasta más de doscientos cincuenta euros por pedido, otro que compra más de veinticinco veces al año, otro que lleva más de un año sin aparecer.

Un aviso: el número de segmento no significa nada. El segmento cero no es ni mejor ni peor que el tres. Si cambias la semilla, los números se pueden reordenar. Interpreta perfiles, no números.

### [09:30–12:30] Los supuestos que nadie te cuenta

[DIAPOSITIVA 2.3-4]

k-means no te pide que compruebes supuestos, pero los lleva dentro por cómo está construido.

Primero, asume que los grupos son más o menos redondos, esféricos, en el espacio escalado. ¿Por qué? Porque cada punto va al centro más cercano. Y la frontera entre dos grupos es siempre una línea recta, o un plano, a medio camino entre sus dos centros. No hay fronteras curvas en k-means.

Segundo, funciona mejor cuando los grupos tienen tamaños y dispersiones parecidos. Si un grupo es enorme y disperso y el de al lado es pequeño y compacto, la frontera a medio camino corta por donde no debe.

Tercero, necesita variables numéricas comparables, porque calcula medias. Con categorías, no funciona directamente.

Y cuarto, cada punto pertenece a un único grupo, aunque esté justo en la frontera. No hay un «sesenta por ciento de este grupo y cuarenta del otro».

¿Por qué te cuento esto con tanto detalle? Porque estos supuestos no aparecen como un error en pantalla. Si tus datos no los cumplen, k-means no protesta: te devuelve grupos igualmente, con su tabla de medias y su gráfico de colores. Y tú presentarás esos grupos con la misma seguridad que si fueran buenos. La única defensa es saber qué asume el método y mirar los datos.

Pensemos en clientes. ¿Es razonable que los grupos sean redondos en recencia, frecuencia y gasto escalados? Más o menos, si antes hemos tratado las colas largas con un logaritmo. ¿Tienen tamaños parecidos? No siempre: los clientes VIP suelen ser pocos. Si tu grupo más valioso es pequeño, comprueba que k-means no lo ha diluido en un grupo mayor.

### [12:30–15:30] Dónde falla

[DIAPOSITIVA 2.3-5]

Con esos supuestos en la cabeza, es fácil predecir dónde falla.

[PANTALLA: dos gráficos — `make_moons` coloreado por k-means con k=2 (corte recto) y anillos concéntricos (`make_circles`) coloreados por k-means]

Formas alargadas o en media luna: k-means las corta por la mitad con una línea recta, porque no sabe hacer otra cosa. Anillos concéntricos: imposible. Los dos anillos tienen el mismo centro, así que k-means no tiene forma de distinguirlos. Densidades muy distintas: el grupo denso se parte en dos y el disperso se queda con los vecinos. Y valores atípicos: como la inercia usa distancias al cuadrado, un cliente con un gasto descomunal arrastra el centro o acaba formando un grupo él solo.

Para esos casos hay alternativas. DBSCAN agrupa por densidad y detecta ruido. Los modelos de mezcla gaussiana permiten grupos elípticos y dan probabilidades de pertenencia. Y el clustering jerárquico, que veremos en la lección 2.5, admite formas distintas según cómo lo configures.

No te hace falta dominarlas ahora. Lo importante es que sepas que existen y cuándo pensar en ellas: si al dibujar tus datos ves formas raras, o si k-means te da grupos que no tienen sentido de negocio, prueba una alternativa antes de forzar la interpretación.

[DIAPOSITIVA 2.3-6]

[DEMO: notebook, sección 4 — ejecutar `pd.crosstab(clientes["segmento"], clientes["perfil_real"])` y señalar la fila que mezcla ocasionales y dormidos]

Y no hace falta irse a ejemplos de libro. En nuestros propios datos hay un caso suave. Mira la tabla cruzada entre los segmentos de k-means y los perfiles reales. Los premium y los fieles salen casi perfectos. Pero hay un segmento que se queda con los trescientos setenta y cinco ocasionales y, además, con ciento sesenta y siete de los dormidos.

¿Por qué? Los dormidos tienen una recencia muy dispersa: algunos llevan cincuenta días sin comprar y otros más de ochocientos. Los que llevan «solo» cien o doscientos días están más cerca del centro de los ocasionales que del centro de los dormidos. k-means no ve grupos: ve distancias a centros.

### [15:30–18:00] Errores frecuentes

[DIAPOSITIVA 2.3-7]

Cuatro errores que veo constantemente.

Uno: no escalar. Ya lo vimos en el vídeo anterior: la variable con números grandes manda.

Dos: ejecutar con `n_init` igual a uno y sacar conclusiones de una única ejecución que ha caído en un mal mínimo local.

Tres: leer el número de segmento como si significara algo. «El segmento uno es el mejor». No. Es una etiqueta arbitraria.

Y cuatro: esperar que k-means te diga cuántos grupos hay. No lo hace. k lo pones tú. Si le pides siete grupos, te dará siete, haya los que haya.

Y un quinto, de propina: meter variables categóricas codificadas como números, por ejemplo la provincia del uno al cincuenta y dos, y calcular medias con ellas. La media entre Álava y Zaragoza no es ninguna provincia. Para datos mixtos existen variantes como k-prototypes, o puedes segmentar con las numéricas y usar las categóricas para describir.

[CÁMARA]

Y una reflexión: k-means es rápido, sencillo y escala a millones de filas. Por eso es el primer algoritmo que todo el mundo prueba. Está bien. Pero pruébalo sabiendo qué supone, y mira siempre los resultados en unidades de negocio antes de creértelos.

### [18:00–20:00] Resumen y qué viene

[CÁMARA]

Resumen. k-means busca k centros minimizando la suma de distancias al cuadrado de cada punto a su centro. Alterna dos pasos, asignar y actualizar, y converge a un mínimo local; por eso usamos varios arranques con `n_init`. Funciona bien con grupos compactos, redondeados y de tamaño parecido, y falla con formas alargadas, anillos, densidades dispares o atípicos. Y sus etiquetas son arbitrarias.

Nos ha quedado una pregunta enorme encima de la mesa: si k lo pongo yo, ¿cómo elijo k? ¿Cuatro segmentos? ¿Tres? ¿Seis? Ese es el tema del próximo vídeo, y te adelanto que la respuesta no es solo técnica.

---

## Vídeo 2.4 · Elegir *k*: codo, silueta y criterio de negocio (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante sepa aplicar e interpretar el método del codo y el coeficiente de silueta, conozca criterios complementarios y combine la evidencia técnica con el criterio de negocio.

**Material:** diapositivas 2.4-1 a 2.4-7; notebook, sección 3.

### [00:00–01:30] Gancho

[CÁMARA]

Llevas tu segmentación a la reunión de Dirección. Has encontrado siete segmentos. El director comercial te mira y te pregunta: «¿Por qué siete? ¿Por qué no tres?».

Si tu respuesta es «porque me salía así», tienes un problema. Si tu respuesta es «porque la inercia es menor», tienes un problema más gordo, y en un minuto verás por qué.

En este vídeo vamos a construir una respuesta que aguante esa pregunta: con dos herramientas técnicas, unas cuantas comprobaciones extra y, sobre todo, el criterio de negocio.

### [01:30–03:00] La inercia siempre baja

[DIAPOSITIVA 2.4-1]

Recuerda que k-means minimiza la inercia: la suma de distancias al cuadrado de cada punto a su centro. Tentación: probar varios k y quedarme con el de menor inercia.

Problema: la inercia siempre baja cuando añades grupos. Con más grupos, cada punto tiene un centro más cerca. Y si haces tantos grupos como clientes, cada cliente es su propio centro y la inercia es cero. Perfecta y completamente inútil.

Así que minimizar la inercia no sirve para elegir k. Necesitamos criterios que midan otra cosa o que penalicen la complejidad.

### [03:00–05:30] El método del codo

[DIAPOSITIVA 2.4-2]

El primero es el método del codo. Calculamos la inercia para k igual a dos, tres, cuatro, y así sucesivamente, y la dibujamos. La curva siempre baja, pero buscamos el punto en el que deja de bajar con fuerza. Ese punto parece un codo.

[DEMO: notebook, sección 3 — ejecutar el bucle de `ks` y mostrar el gráfico de dos paneles; señalar el panel izquierdo]

En el notebook, la inercia pasa de unos dos mil quinientos con dos grupos a unos mil doscientos con tres y unos quinientos setenta y cinco con cuatro. Son caídas enormes. Pero de cuatro a cinco solo baja a unos cuatrocientos treinta, y de cinco a seis, a unos trescientos sesenta. A partir de cuatro, añadir grupos apenas mejora. El codo está en cuatro.

¿El problema del codo? Que en datos reales, la curva suele ser una pendiente suave, sin ningún codo evidente. Y entonces cada persona ve el codo donde le apetece.

Un truco para que el codo sea menos subjetivo: en lugar de mirar la curva, mira cuánto baja la inercia en cada paso, en porcentaje. De tres a cuatro baja más de la mitad; de cuatro a cinco, alrededor de un veinticinco por ciento; de cinco a seis, un dieciséis. Cuando las mejoras pasan de enormes a modestas, ahí está el codo.

### [05:30–08:30] El coeficiente de silueta

[DIAPOSITIVA 2.4-3]

La segunda herramienta es el coeficiente de silueta, y mide algo más intuitivo. Para cada cliente se calculan dos números.

El primero, a: la distancia media a los clientes de su propio grupo. Mide cohesión: ¿está a gusto en su grupo?

El segundo, b: la distancia media a los clientes del grupo vecino más cercano. Mide separación: ¿está lejos de la alternativa?

La silueta es b menos a, dividido por el mayor de los dos. Siempre está entre menos uno y uno. Cerca de uno: el cliente está muy bien en su grupo y lejos del siguiente. Cerca de cero: está en la frontera. Negativo: probablemente le hemos asignado al grupo equivocado.

La media de todas las siluetas resume la partición entera. Como guía orientativa, por encima de cero coma cinco hay estructura razonable; por debajo de cero coma veinticinco, poca.

[DIAPOSITIVA 2.4-4]

[DEMO: notebook, sección 3 — señalar el panel derecho del gráfico]

En el notebook, la silueta es máxima con k igual a cuatro: cero coma sesenta y cuatro. Pero fíjate en k igual a tres: cero coma sesenta y tres. Prácticamente empatados. Con seis grupos baja a cero coma cincuenta y cuatro.

Esto es muy habitual, y es una lección en sí misma: cuando dos opciones están técnicamente empatadas, la técnica no decide. Decide el negocio.

Una ventaja extra de la silueta: no solo da una media. Puedes mirar la silueta de cada cliente. Si un segmento tiene muchos clientes con silueta negativa, es un segmento mal definido, aunque la media global sea buena. scikit-learn tiene `silhouette_samples` para eso.

¿Y por qué no usar siempre la silueta y olvidarnos del codo? Porque la silueta también tiene sus sesgos: favorece grupos compactos y redondos, igual que k-means. Si tus grupos tienen formas raras, la silueta puede penalizar una partición que en realidad es buena. Ninguna métrica es la verdad: son indicios que tienen que apuntar en la misma dirección.

### [08:30–10:00] Otros criterios técnicos

[DIAPOSITIVA 2.4-5]

Antes de ir al negocio, tres comprobaciones más que te dan solidez.

Estabilidad. Repite el clustering con otras semillas, o sobre submuestras de tus datos, y compara las particiones con el ARI. Si cada vez sale algo distinto, la segmentación no es fiable, por bonita que sea la silueta.

Otros índices. Calinski-Harabasz, Davies-Bouldin o el estadístico gap. Todos están en la literatura y los dos primeros, en scikit-learn. Si varios índices coinciden en el mismo k, mejor.

Y tamaño mínimo. Un segmento con el uno por ciento de los clientes rara vez justifica una estrategia propia.

Una forma sencilla de comprobar la estabilidad: repite el clustering con cinco semillas distintas y calcula el ARI entre cada par de resultados. Si todos los ARI están por encima de cero coma nueve, los grupos son estables. Si bailan entre cero coma cinco y cero coma ocho, desconfía.

### [10:00–13:00] El criterio de negocio

[DIAPOSITIVA 2.4-6]

Y ahora, lo que de verdad te va a preguntar Dirección. Antes de presentar un número, hazte cuatro preguntas.

¿Puedo describir cada grupo en una frase? Si dos grupos solo se distinguen en «un poco más de lo mismo», sobra uno.

¿Tengo una acción distinta para cada grupo? Si el equipo de marketing solo puede gestionar tres campañas, seis segmentos son ruido.

¿Es estable en el tiempo? Un segmento que se disuelve al mes siguiente no sirve para planificar un trimestre.

¿Tiene tamaño suficiente? La acción específica tiene un coste, y tiene que compensar con el número de clientes a los que llega.

[DIAPOSITIVA 2.4-7]

Un ejemplo. Una aseguradora segmenta a sus clientes y la mejor silueta sale con k igual a dos: clientes con un seguro y clientes con varios. Técnicamente impecable, comercialmente inútil: eso ya lo sabían. Con k igual a cinco, la silueta baja un poco, pero aparecen grupos con los que se puede hacer algo: jóvenes que solo tienen el seguro del coche, a los que ofrecer el de hogar; familias con varios productos, a las que fidelizar. Eligen cinco. Y, esto es importante, lo justifican: «perdemos un poco de separación técnica a cambio de cinco segmentos accionables».

Volvamos a nuestros datos. ¿Tres o cuatro? En el ejercicio dos del notebook lo comprobarás: con tres grupos, k-means junta a los ocasionales y a los dormidos en un solo segmento. Y esa es justamente la distinción más útil para marketing: a quién hay que reactivar. Así que aquí la técnica y el negocio apuntan al mismo sitio: cuatro.

### [13:00–15:00] Resumen y qué viene

[CÁMARA]

Resumen. La inercia siempre baja con k, así que no sirve para elegir. El codo busca dónde deja de compensar añadir grupos. La silueta compara cohesión y separación. La estabilidad te dice si te puedes fiar. Y entre opciones técnicamente parecidas, decide la utilidad: una acción distinta por segmento.

Y si te preguntan «¿por qué cuatro?», ya tienes la respuesta: «porque es donde está el codo, tiene la mejor silueta, es estable y cada uno de los cuatro grupos tiene una acción distinta».

En el próximo vídeo veremos otra forma de agrupar que no te obliga a elegir k al principio: el clustering jerárquico. Y aprenderemos a leer su gráfico estrella, el dendrograma.

---

## Vídeo 2.5 · Clustering jerárquico y dendrogramas (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante entienda el clustering aglomerativo, conozca los criterios de enlace, sepa leer y cortar un dendrograma y compare el método con k-means.

**Material:** diapositivas 2.5-1 a 2.5-6; notebook, sección 5.

### [00:00–01:30] Gancho

[CÁMARA]

Un supermercado tiene dos mil productos y quiere agruparlos según cómo se venden a lo largo de la semana. El equipo de logística quiere dos grandes grupos para organizar el almacén. El de promociones quiere unos ocho para planificar ofertas. Y el de surtido quiere veinte para decidir el espacio en los lineales.

¿Hacemos tres clusterings distintos, con tres k distintos, que probablemente no encajen entre sí? ¿O hay una forma de obtener todas las respuestas a la vez, perfectamente anidadas?

Hay una forma. Se llama clustering jerárquico.

### [01:30–03:30] De abajo arriba

[DIAPOSITIVA 2.5-1]

El clustering jerárquico aglomerativo funciona de abajo arriba, y la idea es muy sencilla.

Empezamos con cada observación como un grupo propio. Si tenemos doscientos clientes, empezamos con doscientos grupos de un cliente. Buscamos los dos grupos más cercanos y los unimos. Ahora tenemos ciento noventa y nueve. Volvemos a buscar los dos más cercanos y los unimos. Y así, hasta que todo el mundo está en un único grupo.

Lo interesante es que no hemos elegido k en ningún momento. Lo que obtenemos no es una partición, sino la historia completa de fusiones: quién se unió con quién y a qué distancia. Y a partir de esa historia podemos sacar la partición en dos, en cuatro o en veinte grupos, y todas encajan entre sí. Los veinte grupos son subdivisiones de los ocho, y los ocho, de los dos.

Fíjate en la diferencia con k-means. En k-means, si pides tres grupos y luego cuatro, los cuatro no tienen por qué ser subdivisiones de los tres: un cliente puede saltar de un grupo a otro sin ninguna lógica jerárquica. En el jerárquico, la anidación está garantizada por construcción. Para muchos problemas de negocio, como categorías de producto, organigramas o territorios, esa estructura de árbol es justo lo que necesitas.

Existe también la versión divisiva, de arriba abajo: empiezas con todo en un grupo y lo vas partiendo. Se usa mucho menos, así que cuando oigas «clustering jerárquico», casi siempre se refieren al aglomerativo.

### [03:30–06:00] ¿Cercanos según qué? El enlace

[DIAPOSITIVA 2.5-2]

Hay un detalle que he pasado por alto. Sabemos medir la distancia entre dos clientes. Pero, ¿cuál es la distancia entre dos grupos de clientes? Hay varias respuestas, y se llaman criterios de enlace.

Enlace simple: la distancia entre los dos puntos más cercanos de cada grupo. Tiende a formar cadenas largas: un grupo va absorbiendo vecinos uno a uno como una serpiente. Es muy sensible al ruido.

Enlace completo: la distancia entre los dos puntos más lejanos. Produce grupos compactos, de diámetro parecido.

Enlace promedio: la media de todas las distancias entre pares. Un compromiso.

Y Ward, que es el que usamos en el notebook. Ward une los dos grupos cuya fusión aumenta menos la inercia total, la misma inercia de k-means. Por eso produce grupos compactos y equilibrados, y suele dar resultados parecidos a k-means. Para segmentar con variables numéricas escaladas, es la opción más habitual.

¿Cuál elegir? Depende de qué forma esperas que tengan los grupos. Si buscas segmentos compactos para hacer campañas, Ward o enlace completo. Si buscas estructuras alargadas, como rutas o cadenas de transacciones relacionadas, el simple puede tener sentido. Mi consejo práctico: empieza por Ward y, si el resultado te deja dudas, compara con el promedio. Si ambos cuentan la misma historia, tienes más confianza.

### [06:00–09:00] Leer un dendrograma

[DIAPOSITIVA 2.5-3]

La historia de fusiones se dibuja en un dendrograma: un árbol con las observaciones abajo, en las hojas, y las fusiones como líneas horizontales. La clave está en la altura: cada unión se dibuja a la altura de la distancia a la que se produjo.

Uniones bajas: se juntan cosas muy parecidas. Uniones altas: se están fusionando grupos muy distintos.

¿Y cómo saco una partición? Cortando. Imagina una línea horizontal que atraviesa el árbol a cierta altura. El número de ramas verticales que cruza es el número de grupos. Corta alto y tendrás pocos grupos; corta bajo y tendrás muchos.

¿Dónde cortar? Busca un salto grande: una zona en la que las fusiones están muy separadas en altura. Ese salto te dice que, para seguir uniendo, tienes que juntar cosas que no se parecen.

Es la misma idea que el codo de la lección anterior, pero vista en el árbol: mientras las fusiones ocurren a alturas parecidas, estamos uniendo cosas similares; cuando la altura se dispara, estamos forzando la unión de grupos distintos. Y, como siempre, el criterio de negocio tiene la última palabra: el corte técnico te da un punto de partida.

[DIAPOSITIVA 2.5-4]

Y ahora, la trampa más común al leer un dendrograma. Dos hojas que están una al lado de la otra en el dibujo no tienen por qué parecerse. La distancia entre dos hojas se lee en la altura del nodo que las une, no en su posición horizontal. El orden de izquierda a derecha es en parte arbitrario: puedes girar cualquier rama sobre su nodo y el árbol sigue siendo el mismo.

### [09:00–11:30] En el notebook

[DIAPOSITIVA 2.5-5]

[DEMO: notebook, sección 5 — ejecutar la celda de `linkage` y `dendrogram`; mostrar el dendrograma y señalar las cuatro ramas coloreadas y el salto de altura por encima de ellas; luego mostrar la salida del ARI de `AgglomerativeClustering`]

En el notebook tomamos una muestra de doscientos clientes y calculamos el enlace de Ward con la función `linkage` de SciPy. Luego dibujamos el dendrograma con `color_threshold` igual a doce, que colorea las ramas que quedan por debajo de esa altura.

Mira el dibujo. Abajo, una maraña de fusiones a poca altura: clientes muy parecidos uniéndose. Y por encima, cuatro ramas claras, separadas por un salto grande antes de las últimas fusiones. El propio árbol nos sugiere cuatro grupos, que coincide con lo que vimos con el codo y la silueta.

Después aplicamos `AgglomerativeClustering` con cuatro grupos y Ward a los mil quinientos clientes, y medimos el ARI frente a los perfiles reales: en torno a cero coma ochenta y cuatro. k-means se quedaba en cero coma setenta y seis. En estos datos, el jerárquico separa algo mejor a los ocasionales de los dormidos. No es una regla general, pero es un buen recordatorio de que conviene contrastar métodos.

### [11:30–13:30] Ventajas y límites

[DIAPOSITIVA 2.5-6]

¿Ventajas? No necesitas fijar k de antemano. El dendrograma muestra la estructura a varias escalas a la vez, como en el ejemplo del supermercado. Es determinista: sin semillas, siempre da lo mismo. Y cambiando el enlace o la distancia, puede capturar formas que k-means no puede.

¿Límites? El principal es el coste. Necesita las distancias entre todos los pares de observaciones, y eso crece con el cuadrado del número de filas. Con mil quinientos clientes, sin problema. Con un millón, olvídate. Por eso el notebook dibuja el dendrograma solo con doscientos: además, un dendrograma con miles de hojas es ilegible.

Otro límite: las fusiones son definitivas. Si al principio une dos puntos que no debía, ese error se arrastra hasta arriba. k-means, en cambio, reasigna puntos en cada iteración.

Una combinación muy práctica cuando tienes muchos datos: usa el jerárquico sobre una muestra para entender la estructura y decidir k, y luego aplica k-means a todos los datos con ese k. O al revés: haz k-means con muchos grupos pequeños, por ejemplo cien, y aplica el jerárquico sobre esos cien centros. Lo mejor de los dos mundos.

Y como todo en este módulo: escala los datos antes. El jerárquico también mide distancias.

Y una advertencia que vale para los dos métodos: si el jerárquico y k-means te dan grupos muy distintos con los mismos datos, no elijas el que más te guste. Esa discrepancia es información: probablemente la estructura de grupos es débil, y conviene decirlo en el informe.

### [13:30–15:00] Resumen y qué viene

[CÁMARA]

Resumen. El clustering aglomerativo une repetidamente los dos grupos más cercanos hasta tener uno solo. El enlace define qué significa «cercanos» entre grupos, y Ward es la opción por defecto para segmentar. El dendrograma se lee en vertical: cortar a una altura da una partición, y los saltos grandes indican dónde cortar. Y no escala bien a muchos datos: para el dibujo, usa una muestra.

Hasta aquí, agrupar observaciones. En el próximo vídeo cambiamos de pregunta: en lugar de agrupar filas, vamos a resumir columnas. Te presento la técnica de reducción de dimensión más usada de la historia: PCA.

---

## Vídeo 2.6 · PCA: intuición geométrica y varianza explicada (duración objetivo: 20 min)

**Objetivo del vídeo:** que el participante entienda geométricamente qué hace PCA, sepa leer la varianza explicada, interpretar componentes mediante sus cargas y conozca sus límites.

**Material:** diapositivas 2.6-1 a 2.6-7; notebook, sección 6 (PCA); un objeto físico plano (un plato o una carpeta) para el gancho.

### [00:00–02:00] Gancho

[CÁMARA]

[Mostrar un plato o una carpeta inclinada delante de la cámara]

Si te pido que me describas la posición de cualquier punto de este plato, necesitas tres coordenadas: largo, ancho y alto. Tres dimensiones.

Pero, ¿de verdad necesitas las tres? El plato es casi plano. Si eliges bien dos direcciones, las del propio plato, puedes describir cualquier punto con solo dos números y apenas pierdes nada. La tercera, el grosor, casi no varía.

Ahora imagina que en lugar de tres dimensiones tienes sesenta y cuatro. O doscientas. Y que no puedes ver el plato. ¿Cómo encontrarías esas pocas direcciones que concentran casi toda la información? Eso es exactamente lo que hace PCA, el análisis de componentes principales.

### [02:00–04:00] El problema de las muchas columnas

[DIAPOSITIVA 2.6-1]

[DEMO: notebook, sección 6 — ejecutar la celda que muestra los diez primeros dígitos]

En el notebook trabajamos con imágenes de dígitos escritos a mano. Cada imagen es una cuadrícula de ocho por ocho píxeles, y cada píxel tiene un valor de intensidad entre cero y dieciséis. Así que cada imagen es una lista de sesenta y cuatro números: un punto en un espacio de sesenta y cuatro dimensiones.

No podemos dibujar sesenta y cuatro dimensiones. Pero tampoco parece que las necesitemos todas. Los píxeles de los bordes casi siempre están en blanco. Y los píxeles vecinos se parecen mucho entre sí: si uno está oscuro, el de al lado probablemente también. Hay mucha redundancia. Es nuestro plato, pero en sesenta y cuatro dimensiones.

Y esto no pasa solo con imágenes. En una empresa, una tabla de clientes puede tener cien columnas: visitas a la web, clics en emails, compras por categoría, devoluciones, llamadas al servicio de atención… Muchas de ellas se mueven juntas. Un cliente muy activo hace muchas visitas, muchos clics y muchas compras. Esas tres columnas, en el fondo, miden una sola cosa: la actividad. La reducción de dimensión intenta descubrir esas «cosas de fondo» a partir de los datos.

¿Para qué sirve reducir dimensión? Para visualizar, porque podemos dibujar dos o tres componentes. Para comprimir, porque guardamos menos números. Para acelerar y estabilizar otros modelos, porque con menos variables redundantes muchos algoritmos funcionan mejor. Y para entender, porque las componentes a veces revelan los ejes que de verdad organizan nuestros datos.

### [04:00–07:30] La intuición geométrica

[DIAPOSITIVA 2.6-2]

PCA busca nuevas direcciones en el espacio, una a una.

La primera componente principal es la dirección en la que los datos varían más. Si proyectas toda la nube de puntos sobre esa línea, la dispersión de las proyecciones es la mayor posible.

La segunda componente es la dirección de máxima varianza entre todas las que son perpendiculares a la primera. Perpendicular significa que no repite información: lo que cuenta la segunda es nuevo respecto a la primera.

Y así sucesivamente, hasta tener tantas componentes como variables originales.

[PANTALLA: nube de puntos 2D alargada en diagonal, con las dos flechas de PC1 (a lo largo) y PC2 (a lo ancho) superpuestas]

Mira este ejemplo en dos dimensiones. La nube tiene forma de elipse alargada en diagonal. La primera componente es la flecha a lo largo de la elipse. La segunda, la flecha perpendicular, a lo ancho. Si me quedo solo con la primera, pierdo la anchura de la elipse, pero conservo la mayor parte de la información.

Una forma de pensarlo: PCA gira los ejes para mirar la nube desde el ángulo que muestra más variación, y luego descarta las direcciones en las que la nube es plana. Proyectar sobre las primeras componentes es como hacer una foto desde el mejor ángulo posible.

¿Por qué varianza? Porque varianza es información. Si una dirección no varía, todos los puntos tienen el mismo valor en ella y no te ayuda a distinguir unos de otros. Las direcciones que más varían son las que más diferencian a tus observaciones. Ojo, esto es una suposición: más adelante veremos que no siempre se cumple.

### [07:30–10:00] Componentes y cargas

[DIAPOSITIVA 2.6-3]

Cada componente principal es una combinación lineal de las variables originales: un peso por cada variable, multiplicado por esa variable, y todo sumado. Esos pesos se llaman cargas, y en scikit-learn están en `pca.components_`.

Las cargas son la clave para interpretar. Si una componente tiene cargas grandes y positivas en las variables de precio y cercanas a cero en el resto, esa componente «habla» de precio.

Para quien quiera la matemática: las componentes son los vectores propios de la matriz de covarianzas de los datos, y la varianza de cada componente es su valor propio, que escribimos lambda. No necesitas calcular nada a mano, pero si alguna vez lees «descomposición en valores propios» o «SVD», ya sabes de qué va.

Un detalle de interpretación: el signo de una componente es arbitrario. Si multiplicas todas las cargas por menos uno, la componente es la misma, solo que apunta al revés. Así que no te preocupes si en tu ordenador sale con el signo cambiado respecto al de un compañero. Lo que importa es qué variables pesan y si van en el mismo sentido o en sentidos opuestos entre sí.

Y otro: las componentes son nuevas variables que no están correlacionadas entre sí. Esa es una propiedad muy útil cuando después las usas en un modelo de regresión, como veremos en el módulo tres, porque elimina el problema de tener variables que dicen lo mismo.

### [10:00–13:30] Varianza explicada

[DIAPOSITIVA 2.6-4]

¿Cuánta información conservo si me quedo con unas pocas componentes? Para eso está la varianza explicada. Cada componente explica una fracción de la varianza total: su lambda dividido por la suma de todas las lambdas. Y la suma acumulada me dice cuánto conservo con las primeras m componentes.

[DEMO: notebook, sección 6 — ejecutar la celda de PCA; mostrar el print del número de componentes para el 90 % y el gráfico de varianza acumulada con la línea discontinua del 0,9]

En el notebook ajustamos PCA a los dígitos y dibujamos la varianza explicada acumulada. Fíjate en la curva: sube rápido al principio y luego se va aplanando. La primera componente explica alrededor de un quince por ciento; la segunda, casi un catorce. Entre las dos, un veintiocho y medio por ciento.

¿Y para llegar al noventa por ciento? El notebook nos lo dice: veintiuna componentes. Es decir, podemos pasar de sesenta y cuatro dimensiones a veintiuna y conservar el noventa por ciento de la varianza. Una compresión de dos tercios. Nada mal.

[DEMO: notebook, sección 6 — señalar el panel derecho, la proyección PCA en 2D coloreada por dígito]

Pero mira ahora el panel de la derecha: los dígitos proyectados sobre las dos primeras componentes. Algunos se separan bien: los ceros por un lado, los seises y los cuatros por otro. Pero muchos se amontonan en el centro. ¿Te sorprende? No debería: con dos componentes solo conservamos el veintiocho por ciento de la varianza. Dos dimensiones no bastan para estos datos.

¿Cómo eliges cuántas componentes? Un umbral de varianza, típicamente entre el ochenta y el noventa y cinco por ciento según el uso. O buscar un codo en el gráfico de varianza por componente, el llamado gráfico de sedimentación. O, si PCA es un paso previo a un modelo, el número que dé mejor rendimiento al modelo.

Un ejercicio mental: si reconstruyes cada imagen a partir de solo veintiuna componentes, usando `inverse_transform`, los dígitos se ven un poco borrosos, pero perfectamente reconocibles. Has tirado dos tercios de los números y conservas lo esencial. Así funcionan, en espíritu, muchas técnicas de compresión.

### [13:30–16:00] Interpretar componentes

[DIAPOSITIVA 2.6-5]

En los dígitos, las componentes son difíciles de nombrar: son patrones de píxeles. Pero con datos de negocio, interpretar las cargas es donde PCA brilla.

Imagina una encuesta de satisfacción con veinte preguntas. Haces PCA y la primera componente tiene cargas positivas y parecidas en todas las preguntas. ¿Qué es? Un índice de satisfacción general: el cliente que puntúa alto en una cosa tiende a puntuar alto en todo. La segunda componente tiene cargas positivas en las preguntas de precio y negativas en las de atención. Es un eje que separa al cliente sensible al precio del cliente sensible al servicio.

Otro ejemplo, de finanzas. Rentabilidades diarias de cincuenta acciones. La primera componente tiene cargas positivas en casi todas: es «el mercado», el día en que todo sube o todo baja. La segunda contrapone bancos y eléctricas: un factor sectorial. Con tres o cuatro componentes, un gestor describe la mayor parte del riesgo de su cartera.

La receta siempre es la misma: mira qué variables tienen las cargas más grandes en valor absoluto y con qué signo, y ponle un nombre.

Y un consejo de comunicación: cuando presentes componentes a alguien que no es técnico, no digas «la primera componente principal». Di «el índice de satisfacción general» o «el eje precio frente a servicio». Has hecho el trabajo de interpretarla; ponle un nombre que se entienda. Y, si puedes, acompáñalo de dos o tres ejemplos de clientes reales con valores altos y bajos en esa componente: hace la idea tangible.

Un aviso: si las cargas están muy repartidas entre muchas variables, sin ninguna que destaque, la componente es difícil de nombrar, y es mejor reconocerlo que inventarse una historia.

### [16:00–18:15] Escalar y límites

[DIAPOSITIVA 2.6-6]

¿Hay que escalar antes de PCA? PCA busca máxima varianza, y la varianza depende de las unidades. Si mezclas euros, días y porcentajes sin escalar, la primera componente será simplemente la variable con números más grandes. Así que, con unidades distintas, estandariza.

En los dígitos no lo hacemos, y es a propósito: todos los píxeles están en la misma escala, de cero a dieciséis, y queremos que los píxeles que más varían pesen más.

[DIAPOSITIVA 2.6-7]

PCA tiene muchas virtudes: es rápido, determinista, interpretable gracias a las cargas, tiene `transform` para proyectar datos nuevos, y hasta permite reconstruir aproximadamente los datos originales.

Pero tiene límites. Es lineal: si la estructura de los datos es curva, como una espiral o un rollo de papel, PCA la aplasta. Máxima varianza no es lo mismo que máxima relevancia: la dirección que más varía no tiene por qué ser la que separa los grupos que te interesan. Es sensible a atípicos, que inflan la varianza en su dirección. Y a veces las componentes son difíciles de nombrar.

### [18:15–20:00] Resumen y qué viene

[CÁMARA]

Resumen. PCA encuentra direcciones perpendiculares de máxima varianza. Cada componente es una combinación lineal de las variables, y sus cargas te dicen qué representa. La varianza explicada acumulada te dice cuánto conservas. En los dígitos, veintiuna componentes de sesenta y cuatro conservan el noventa por ciento. Y si tus variables tienen unidades distintas, estandariza antes.

Hemos visto que PCA en dos dimensiones deja muchos dígitos superpuestos. ¿Significa eso que no se pueden separar en un plano? En el próximo vídeo veremos que sí se puede, con métodos no lineales como t-SNE y UMAP. Y veremos también por qué sus gráficos, tan espectaculares, son tan fáciles de malinterpretar.

---

## Vídeo 2.7 · t-SNE y UMAP: visualizar datos de alta dimensión (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante entienda la intuición de t-SNE y UMAP, sepa qué información conservan sus mapas y cuál no, y los use solo como herramientas de exploración.

**Material:** diapositivas 2.7-1 a 2.7-6; notebook, sección 6 (t-SNE) y ejercicio 3.

### [00:00–01:30] Gancho

[CÁMARA]

Un equipo de producto te enseña un gráfico precioso. Miles de puntos de colores formando islas perfectamente separadas. «Mira», te dicen, «nuestros usuarios forman ocho grupos clarísimos. Y este grupo de aquí, el que está en la otra punta del mapa, es completamente distinto a todos los demás. Vamos a lanzar un producto solo para ellos».

El gráfico es un t-SNE. Y las dos conclusiones que acaban de sacar podrían ser falsas.

En este vídeo vas a aprender a hacer esos gráficos, que son útiles de verdad, y sobre todo a leerlos sin caer en esas trampas.

### [01:30–03:00] Cuando lo lineal no basta

[DIAPOSITIVA 2.7-1]

En el vídeo anterior vimos que PCA en dos dimensiones dejaba muchos dígitos superpuestos. ¿Es que no se distinguen? Claro que se distinguen: tú distingues un tres de un ocho sin pensar. El problema es que su estructura no cabe en un plano mediante una proyección lineal.

Los métodos de aprendizaje de variedades cambian de objetivo. Ya no intentan conservar la varianza global. Intentan algo más modesto y, para visualizar, más útil: que en el mapa en dos dimensiones, cada punto siga rodeado de los mismos vecinos que tenía en el espacio original. Respetar quién es vecino de quién.

### [03:00–06:00] t-SNE en dos pasos

[DIAPOSITIVA 2.7-2]

t-SNE trabaja en dos pasos.

Primero, en el espacio original, calcula para cada punto una probabilidad de que cada uno de los demás sea su vecino. Los muy cercanos, probabilidad alta. Los lejanos, prácticamente cero. ¿Cuántos vecinos mira cada punto? Lo controla un parámetro llamado perplexity, que puedes leer como el número efectivo de vecinos. Valores típicos, entre cinco y cincuenta.

Segundo, coloca todos los puntos en un plano, al principio de cualquier manera, y los va moviendo poco a poco para que las probabilidades de vecindad en el plano se parezcan lo más posible a las originales. La discrepancia se mide con la divergencia de Kullback-Leibler, que ves en la diapositiva. No hace falta que la memorices: es una forma de medir cuánto se diferencian dos distribuciones de probabilidad.

Un detalle técnico con consecuencias: en el plano, t-SNE usa una distribución t de Student, que tiene colas pesadas. Eso permite que puntos moderadamente lejanos se separen mucho en el mapa. Por eso los mapas t-SNE tienen ese aspecto de islas tan bien definidas.

¿Y qué efecto tiene la perplexity? Con una perplexity baja, cada punto solo se preocupa de sus vecinos más inmediatos, y el mapa se llena de grupitos pequeños. Con una perplexity alta, cada punto tiene en cuenta un vecindario más amplio y el mapa muestra estructuras más grandes. No hay un valor correcto: hay que probar varios y quedarse con lo que se repite.

[DEMO: notebook, sección 6 (t-SNE) — ejecutar la celda de `TSNE(2, perplexity=30, random_state=0)` y mostrar el gráfico coloreado por dígito; comparar mentalmente con el gráfico de PCA]

Y aquí está el resultado en el notebook. Compáralo con el de PCA. Los diez dígitos aparecen como diez islas casi perfectamente separadas. Impresionante, ¿verdad? Ahora viene la letra pequeña.

### [06:00–09:00] Lo que t-SNE no conserva

[DIAPOSITIVA 2.7-3]

t-SNE optimiza vecindades locales. Solo locales. Y eso tiene consecuencias muy concretas.

Las distancias entre grupos no significan nada. Que la isla de los ceros esté en la otra punta de la de los unos no quiere decir que los ceros y los unos sean más distintos que dos islas que están juntas.

Los tamaños de los grupos tampoco significan nada. t-SNE tiende a expandir los grupos densos y a encoger los dispersos. Una isla grande no es un grupo con más variedad.

Puede crear estructura donde no la hay. Con una perplexity baja, incluso datos completamente aleatorios forman grumitos que parecen grupos. En las soluciones del ejercicio tres lo comprobamos con ruido puro.

El resultado cambia con la perplexity y, a veces, con la semilla. Así que nunca te quedes con una sola ejecución.

No tiene `transform`: si mañana llega un cliente nuevo, no puedes colocarlo en el mapa sin recalcularlo todo.

Y es lento con muchos datos. Lo habitual es reducir antes a treinta o cincuenta dimensiones con PCA y aplicar t-SNE sobre eso.

Si quieres profundizar, hay un artículo interactivo magnífico en la revista Distill, «How to Use t-SNE Effectively», que está en las lecturas del módulo. Juegas con los parámetros y ves en directo cómo cambian los mapas. Diez minutos con él valen más que cualquier explicación.

[CÁMARA]

Vuelve ahora al gancho. «Ese grupo está en la otra punta del mapa, es completamente distinto». Falso: la distancia entre islas no es interpretable. «Hay ocho grupos clarísimos». Quizá. Pero un mapa t-SNE no lo demuestra. Hay que comprobarlo en los datos originales.

### [09:00–11:30] UMAP

[DIAPOSITIVA 2.7-4]

En los últimos años, mucha gente ha pasado de t-SNE a UMAP. Persigue lo mismo, un mapa que respete vecindades, con otra base matemática.

La idea es la siguiente. Primero construye un grafo: une cada punto con sus k vecinos más cercanos en el espacio original, con conexiones más fuertes cuanto más cerca estén. Después busca una disposición en dos dimensiones cuyo grafo se parezca a ese: los vecinos se atraen y los que no lo son se repelen.

Tiene dos parámetros principales. `n_neighbors`, que hace un papel parecido a la perplexity: pocos vecinos miran lo muy local; muchos vecinos capturan más estructura global. Y `min_dist`, que controla lo apretados que quedan los puntos dentro de cada grupo en el mapa.

UMAP no forma parte de scikit-learn: está en la librería `umap-learn`, con la misma interfaz, `fit_transform`. En el notebook usamos t-SNE para no añadir dependencias, pero si trabajas con embeddings de texto o imágenes, verás UMAP por todas partes. En el módulo nueve, por ejemplo, te será útil.

¿Y las advertencias de t-SNE? Se aplican también a UMAP. Conserva algo mejor la estructura global, pero las distancias entre grupos y los tamaños siguen sin ser fiables. Que sea más moderno no lo convierte en una prueba.

### [11:30–13:15] PCA, t-SNE y UMAP, frente a frente

[DIAPOSITIVA 2.7-5]

Pongamos los tres métodos juntos. PCA es lineal, conserva la varianza global, es muy rápido, admite datos nuevos y es interpretable por sus cargas. t-SNE es no lineal, conserva vecindades locales, es lento, no admite datos nuevos y no es interpretable. UMAP también es no lineal, conserva lo local y algo más de estructura global que t-SNE, es bastante más rápido y admite datos nuevos de forma aproximada.

Un ejemplo de buen uso. Un equipo de atención al cliente convierte veinte mil tickets de soporte en vectores numéricos y los proyecta con UMAP. En el mapa aparece una isla que mezcla tickets de «devolución» y de «tarjeta rechazada». Leen una muestra de esos tickets y descubren un fallo en el formulario de devoluciones que cobraba dos veces. El mapa no demostró nada por sí solo. Pero les dijo dónde mirar. Ese es el papel de estos métodos.

### [13:15–15:00] Reglas de uso, resumen y qué viene

[DIAPOSITIVA 2.7-6]

Cinco reglas. Úsalos para explorar y generar hipótesis. Prueba varias perplexities o varios `n_neighbors`, y varias semillas. Con muchos datos, PCA antes. No hagas clustering sobre el mapa en dos dimensiones; en el ejercicio tres del notebook verás por qué es tentador y por qué es peligroso. Y cuando enseñes el mapa a alguien, explica qué significa la cercanía y qué no.

[CÁMARA]

Resumen. t-SNE y UMAP construyen mapas que respetan vecindades locales. En esos mapas, la separación entre grupos y su tamaño no son interpretables. Son herramientas de exploración, no de demostración.

Ya tenemos todas las piezas: escalar, agrupar, elegir k, reducir dimensión y visualizar. En el último vídeo del módulo las juntamos en un caso completo: la segmentación RFM de clientes, desde las transacciones hasta una propuesta que puedas presentar a marketing.

---

## Vídeo 2.8 · Caso: segmentación RFM de clientes (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante recorra el proceso completo de una segmentación RFM, traduzca los segmentos en fichas accionables y prepare el entregable de la semana.

**Material:** diapositivas 2.8-1 a 2.8-7; notebook, secciones 1 a 4 y ejercicios 1, 2 y 4.

### [00:00–01:30] Gancho

[CÁMARA]

Volvemos al pasillo del primer vídeo. La directora de marketing te pidió dejar de mandar el mismo email a todos los clientes. Han pasado siete lecciones. Ya sabes escalar, agrupar, elegir k y visualizar. Pero ella no quiere un gráfico de silueta. Quiere saber cuántos tipos de cliente tiene, cómo son, qué hacer con cada uno y cómo sabrá si ha funcionado.

En este vídeo vamos a convertir todo lo aprendido en eso: una propuesta de segmentación. Y lo haremos con uno de los marcos más veteranos y eficaces del marketing: RFM.

### [01:30–03:30] RFM en tres números

[DIAPOSITIVA 2.8-1]

RFM describe a cada cliente con tres números.

R, de recency, recencia: los días desde su última compra. Cuanto menos, mejor. Un cliente que compró la semana pasada tiene muchas más probabilidades de volver que uno que no aparece desde hace un año.

F, de frequency, frecuencia: cuántas veces compra en un periodo. En el notebook, compras al año.

M, de monetary, valor monetario: cuánto gasta. En el notebook, el gasto medio por pedido.

¿Por qué es tan popular? Porque se calcula con cualquier histórico de transacciones, sin encuestas ni datos personales; se explica en una frase; y predice sorprendentemente bien el comportamiento futuro. Tradicionalmente se puntúa cada variable de uno a cinco por quintiles y se combinan las puntuaciones. El clustering es la alternativa que deja que los propios datos marquen las fronteras.

Una decisión pequeña pero importante: ¿M es el gasto medio por pedido o el gasto total? Con el gasto total, M y F están muy correlacionadas, porque quien compra más veces gasta más en total. Con el gasto medio, como en el notebook, separas dos ideas distintas: cuánto compra y cuánto gasta cada vez. Eso es lo que permite distinguir a los VIP de ticket alto de los fieles que compran mucho y barato.

### [03:30–05:30] El proceso completo

[DIAPOSITIVA 2.8-2]

Este es el proceso, de principio a fin.

Uno, construir RFM a partir de las transacciones, con una fecha de referencia y un periodo claros. Es un `groupby` por cliente, como los del módulo cero.

Dos, revisar las distribuciones. Recencia y gasto suelen tener colas largas: logaritmo. Y cuidado con los atípicos: esa empresa que compra por cincuenta mil euros probablemente merece un trato aparte.

Tres, escalar.

Cuatro, probar varios k con el codo, la silueta y la estabilidad, y contrastar con un jerárquico.

Cinco, perfilar cada segmento en unidades originales: días, compras, euros, tamaño y peso en la facturación.

Seis, nombrar cada segmento y asignarle una acción con su métrica.

Y siete, medir: idealmente con un test A/B por segmento, que aprenderás a diseñar en el módulo cuatro.

### [05:30–08:30] Los cuatro segmentos del notebook

[DIAPOSITIVA 2.8-3]

[DEMO: notebook, sección 4 — mostrar la tabla `resumen` y el `pairplot` coloreado por segmento]

Esto es lo que sale en el notebook con cuatro segmentos. Recuerda que los números de segmento son arbitrarios; los identificamos por su perfil.

Un grupo de unos trescientos setenta clientes que compran cada mes aproximadamente, unas once veces al año, pero con un ticket medio de más de doscientos cincuenta euros. Son los VIP de ticket alto. Y atención: en las soluciones del ejercicio uno verás que este grupo, con una cuarta parte de los clientes, aporta más de la mitad del valor.

Otro grupo de tamaño parecido que compra muchísimo, unas veintiséis veces al año, con tickets de unos sesenta euros, y cuya última compra fue hace dos semanas. Los fieles recurrentes.

El grupo más grande, unos quinientos cincuenta clientes: más de cien días desde la última compra, unas cinco compras al año y poco más de cuarenta euros de ticket. Los ocasionales.

Y unos doscientos clientes que llevan más de un año sin comprar, con frecuencia y gasto bajos. Los dormidos.

En el pairplot se ve muy bien: el gasto separa a los VIP, la frecuencia a los fieles y la recencia a los dormidos.

Fíjate en que cada segmento queda definido principalmente por una variable. Es una situación cómoda, porque los nombres salen casi solos. En datos reales los segmentos suelen ser combinaciones más sutiles, y ahí es donde tienes que trabajar más el nombre: que sea corto, que lo entienda cualquiera y que sugiera la acción.

### [08:30–10:30] De segmentos a acciones

[DIAPOSITIVA 2.8-4]

Un segmento sin acción es una curiosidad estadística. Para cada uno, una acción concreta y una métrica para saber si funciona.

VIP: beneficios no monetarios, como envío prioritario o acceso anticipado a novedades. Métrica: retención a doce meses.

Fieles: venta cruzada, para subir su ticket medio. Métrica: gasto medio por pedido.

Ocasionales: recordatorios ajustados a su ciclo de compra. Métrica: frecuencia trimestral.

Dormidos: una campaña de reactivación con un incentivo limitado en el tiempo. Métrica: porcentaje que vuelve a comprar en sesenta días.

Y una regla de oro que ahorra mucho dinero: no regales margen a quien ya compra. Un descuento masivo a los VIP reduce ingresos sin cambiar su comportamiento. Ese presupuesto rinde mucho más intentando recuperar a los dormidos.

¿Y cómo sabrás si la acción funciona? No basta con comparar antes y después: puede que en diciembre todo el mundo compre más. Lo correcto es reservar un grupo de control dentro de cada segmento, que no recibe la acción, y comparar. Eso es un test A/B, y lo verás a fondo en el módulo cuatro.

### [10:30–12:30] La frontera difusa y las variables extra

[DIAPOSITIVA 2.8-5]

[DEMO: notebook, sección 4 — mostrar la tabla cruzada `pd.crosstab(clientes["segmento"], clientes["perfil_real"])`]

Ahora, honestidad con los datos. Como sabemos los perfiles reales, podemos ver que el segmento de ocasionales incluye a unos ciento setenta clientes que en realidad eran dormidos. ¿Ha fallado la segmentación? No exactamente. Nos está diciendo algo de negocio: el paso de ocasional a dormido es gradual. No hay un día en que un cliente se duerma.

La solución práctica es combinar el segmento con una regla sencilla. Por ejemplo: si un ocasional lleva más de ciento ochenta días sin comprar, entra también en la campaña de reactivación. Los segmentos no tienen que ser la única herramienta.

[DIAPOSITIVA 2.8-6]

¿Y si añadimos más variables, como la antigüedad del cliente? Cuidado. Tras escalar, cada variable pesa lo mismo. Si añades una variable que no tiene nada que ver con la estructura que buscas, diluye las distancias: la silueta baja y la evidencia a favor de los grupos se debilita. Es justo el ejercicio cuatro del notebook. Una alternativa muy sensata: segmenta con pocas variables de comportamiento y usa el resto para describir los segmentos después. Y recalcula periódicamente: lo interesante es ver cuántos fieles pasaron a ocasionales este trimestre.

### [12:30–14:00] Tu entregable

[DIAPOSITIVA 2.8-7]

Y con esto, tu entregable de la semana. Una propuesta de segmentación para el equipo de marketing, de dos páginas o cinco diapositivas como máximo.

Primero, el número de segmentos y por qué, con argumentos técnicos y de negocio. Usa lo que aprendiste en la lección 2.4.

Segundo, una ficha por segmento: nombre, tamaño, perfil medio en unidades que entienda cualquiera, y una acción concreta. Concreta de verdad: «mejorar la experiencia» no es una acción; «email con envío gratis a los cuarenta y cinco días de la última compra», sí.

Y tercero, un gráfico que muestre los segmentos. Un diagrama de dispersión de dos variables coloreado por segmento suele bastar.

### [14:00–15:00] Resumen del módulo

[CÁMARA]

Cerramos el módulo. Hemos aprendido a buscar estructura sin etiquetas: escalar antes de medir distancias, agrupar con k-means y con jerárquico, elegir k con criterio técnico y de negocio, reducir dimensión con PCA y visualizar con t-SNE y UMAP sabiendo qué no dicen sus mapas. Y hemos visto que el último paso, traducir grupos en acciones, es el que da valor.

En el próximo módulo volvemos a tener una variable objetivo. Empezamos a predecir con el modelo más importante de la estadística aplicada: la regresión. Nos vemos allí.
