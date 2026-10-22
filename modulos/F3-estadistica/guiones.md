# Módulo 01 · Estadística para la toma de decisiones — Guiones de los vídeos

Convenciones de producción:

- **[DIAPOSITIVA N.M-k]**: mostrar la diapositiva con ese identificador (ver `diapositivas.md`).
- **[PANTALLA: …]**: grabación de pantalla (notebook, navegador…).
- **[DEMO: …]**: demostración en vivo en el notebook; se describe lo que se muestra, no se narra línea a línea.
- **[CÁMARA]**: presentador a cámara.
- Las marcas de tiempo son aproximadas. Ritmo de referencia: ~100 palabras por minuto.

---

## Vídeo 1.1 · Población, muestra y por qué la incertidumbre importa en los negocios (duración objetivo: 10 min)

**Objetivo del vídeo:** que el alumno distinga población y muestra, parámetro y estadístico, error aleatorio y sesgo, y entienda por qué una cifra sin margen de error es peligrosa para decidir.

**Material:** diapositivas 1.1-1 a 1.1-6; notebook del módulo, sección 2.

### [00:00–01:30] Gancho

[CÁMARA]

Imagina que es lunes por la mañana. El director comercial de una app de reparto entra en tu despacho y te pregunta algo aparentemente sencillo: «¿Cuál es el importe medio de un pedido?».

Tú tienes acceso a una muestra de doscientos pedidos. Haces la media. Te sale veintiocho euros con ocho céntimos. Fácil, ¿no?

Ahora imagina que, a la vez, una compañera de otro equipo coge otros doscientos pedidos y hace lo mismo. Le sale veintisiete con diez. ¿Quién se ha equivocado? Ninguna de las dos. Las dos han calculado bien. Simplemente, cada muestra cuenta una versión ligeramente distinta de la realidad.

[DIAPOSITIVA 1.1-1]

Y aquí está la clave de todo este módulo. La pregunta útil no es solo «¿cuánto es?». Es «¿cuánto es y cuánto nos podemos fiar de esa cifra?». En los próximos minutos vamos a poner nombre a las piezas de ese razonamiento.

### [01:30–04:00] Población y muestra, parámetro y estadístico

[DIAPOSITIVA 1.1-2]

Empecemos por dos palabras que vas a oír constantemente. La población es el conjunto completo sobre el que quieres sacar conclusiones. En nuestro caso, todos los pedidos de la app. La muestra es la parte que de verdad observas: nuestros doscientos pedidos.

Y hay dos tipos de números. Un parámetro describe la población: por ejemplo, la media real de todos los pedidos. Lo escribimos con letras griegas, mu para la media, sigma para la desviación típica. El parámetro es fijo, pero no lo conocemos.

Un estadístico, en cambio, se calcula con la muestra: la media muestral, que escribimos x barra. Ese sí lo conocemos, pero cambia cada vez que tomamos una muestra distinta.

[PANTALLA: notebook, sección 2, celda que crea la población]

En el notebook hacemos un pequeño truco que en la vida real es imposible. Simulamos una población de un millón de pedidos. Su media real es veintisiete con setenta y nueve. Esto nos permite jugar con ventaja: podremos comparar nuestras estimaciones con la verdad y ver cuándo aciertan y cuándo no. En tu trabajo nunca tendrás ese lujo. Por eso necesitamos herramientas que nos digan cuánto nos podemos equivocar sin conocer la respuesta.

Toda la inferencia estadística se resume en una frase: usar estadísticos, que conocemos, para decir algo responsable sobre parámetros, que no conocemos.

### [04:00–05:30] ¿Por qué no medirlo todo?

[DIAPOSITIVA 1.1-3]

Quizá estés pensando: «Pero si yo tengo todos los pedidos en la base de datos». Bien. Aun así, la incertidumbre no desaparece. Te doy cuatro motivos.

Primero, el coste. Encuestar a todos tus clientes o auditar todas tus facturas es caro. Segundo, hay pruebas que destruyen lo que miden: no puedes comprobar la duración de todas las baterías si la prueba las agota. Tercero, y este es el más importante, el futuro. Aunque tengas todos los pedidos de este año, lo que te interesa es cómo se comportarán los del año que viene. Tus datos históricos son una muestra de un proceso que sigue en marcha. Y cuarto, los experimentos: si pruebas una interfaz nueva con el diez por ciento de los usuarios, ese diez por ciento es una muestra de lo que pasaría con todos.

### [05:30–07:30] Dos errores muy distintos

[DIAPOSITIVA 1.1-4]

Cuando una muestra no coincide con la población, puede ser por dos motivos muy diferentes.

El primero es el error aleatorio. Aunque hagas el muestreo perfectamente, por puro azar la muestra no es un calco de la población. La buena noticia: este error se reduce al aumentar el tamaño de la muestra, y además se puede medir. Eso es justo lo que haremos con el error estándar y los intervalos de confianza.

El segundo es el sesgo. El sesgo aparece cuando la muestra no representa a la población. Si solo miras pedidos de viernes por la noche, vas a sobreestimar el ticket medio. Si solo encuestas a quien quiere responder, oirás sobre todo a los muy contentos y a los muy enfadados.

Y aquí viene lo peligroso: el sesgo no se arregla con más datos. Un millón de pedidos de viernes noche siguen siendo de viernes noche. Tendrás una estimación muy precisa… de la pregunta equivocada.

¿Cuál es la mejor defensa contra el sesgo? El muestreo aleatorio: que cada pedido tenga una probabilidad conocida de entrar en la muestra. En el notebook lo hacemos con una sola línea, `rng.choice`. En la vida real exige más cuidado, pero la idea es la misma.

### [07:30–09:00] La incertidumbre es dinero

[DIAPOSITIVA 1.1-5]

¿Por qué debería importarle esto a un director comercial? Porque la incertidumbre se traduce en dinero.

Si fijas un pedido mínimo a partir de un ticket medio mal estimado, puedes dejar fuera a muchos clientes. Si declaras ganadora una campaña porque convirtió tres décimas más en una muestra pequeña, estás apostando sobre ruido. Si dimensionas la flota de repartidores mirando solo la media de pedidos por hora, la hora punta te va a pillar sin gente.

Una cifra sin margen de error invita a decidir con más seguridad de la que los datos justifican. Por eso, en este curso, vamos a seguir una regla: toda estimación va acompañada de su incertidumbre.

### [09:00–10:00] Resumen y qué viene después

[DIAPOSITIVA 1.1-6]

[CÁMARA]

Recapitulemos. La población es lo que te interesa; la muestra, lo que ves. Los parámetros son fijos y desconocidos; los estadísticos cambian de muestra en muestra. Más datos reducen el error aleatorio, pero no el sesgo. Y aleatorizar es tu mejor defensa.

En el próximo vídeo vamos a ponerle forma matemática a la incertidumbre: hablaremos de variables aleatorias y de las cinco distribuciones que te vas a encontrar una y otra vez en los datos de negocio.

---

## Vídeo 1.2 · Variables aleatorias y distribuciones (binomial, Poisson, normal, exponencial, log-normal) (duración objetivo: 20 min)

**Objetivo del vídeo:** que el alumno entienda qué es una variable aleatoria y una distribución, reconozca la binomial, Poisson, normal, exponencial y log-normal, sepa qué fenómeno de negocio modela cada una y pueda calcular probabilidades básicas con `scipy.stats`.

**Material:** diapositivas 1.2-1 a 1.2-8; notebook, sección 1; consola de Python para los ejemplos de `scipy.stats`.

### [00:00–01:30] Gancho

[CÁMARA]

Te propongo un pequeño reto. Tu app recibe de media cuatro pedidos por hora a las tres de la tarde. ¿Cuántos repartidores necesitas para no dejar pedidos colgados el noventa y cinco por ciento de las veces? ¿Cuatro? ¿Cinco? ¿Ocho?

Si respondes «cuatro, que es la media», el problema es que la mitad de las horas te vas a quedar corto. Para responder bien necesitas saber no solo cuál es la media, sino cómo se reparten los valores alrededor de ella. Necesitas una distribución.

En este vídeo vamos a conocer cinco distribuciones. No para memorizar fórmulas, sino para que, cuando veas unos datos, sepas reconocer qué tipo de fenómeno tienes delante.

### [01:30–04:00] Qué es una variable aleatoria

[DIAPOSITIVA 1.2-1]

Una variable aleatoria es simplemente un número asociado a un resultado incierto. El importe del próximo pedido. El número de pedidos entre las nueve y las diez de la noche. Si un visitante compra o no compra, que podemos codificar como uno o cero.

No sabemos qué valor va a tomar. Pero sí podemos describir qué valores son posibles y con qué probabilidad. Esa descripción es la distribución.

Hay dos grandes familias. Las discretas toman valores que se pueden contar: cero, uno, dos pedidos. Para ellas hablamos de la probabilidad de cada valor. Las continuas pueden tomar cualquier valor en un rango, como un importe o un tiempo. En las continuas, la probabilidad de un valor exacto es cero; lo que tiene sentido es la probabilidad de un intervalo, que es el área bajo la curva de densidad.

Y siempre nos interesan dos resúmenes. La media o esperanza: el valor en torno al cual se equilibran los resultados a la larga. Y la desviación típica: cuánto se dispersan alrededor de esa media. Es la raíz de la varianza y tiene las mismas unidades que los datos, euros o minutos.

### [04:00–06:30] Binomial

[DIAPOSITIVA 1.2-2]

Primera distribución: la binomial. Modela el número de éxitos en n intentos independientes, cada uno con la misma probabilidad p de éxito.

Piensa en una campaña de email. La envías a veinte personas, y cada una compra con probabilidad del diez por ciento. ¿Cuántas compras esperas? Veinte por cero coma uno: dos. Esa es la media, n por p.

Pero la pregunta interesante es otra. ¿Qué probabilidad hay de no vender nada? La fórmula de la diapositiva nos da aproximadamente un doce por ciento. Más de una de cada diez campañas así no venderá absolutamente nada, sin que la campaña sea mala. Si no conoces la binomial, podrías despedir a la agencia por puro azar.

Y no solo nos importa la media. La varianza de la binomial es n por p por uno menos p. Con nuestros números: veinte por cero coma uno por cero coma nueve, uno coma ocho. Su raíz, la desviación típica, es aproximadamente uno coma tres compras. Es decir, con una media de dos, ver cero, una, tres o cuatro compras es completamente normal. Ahora escala el ejemplo: si envías la campaña a veinte mil personas, esperas dos mil compras, pero la desviación típica es de unas cuarenta y dos. En proporción, el ruido es muchísimo menor. Quédate con esta idea, porque es un adelanto de lo que veremos con la ley de los grandes números: cuantos más intentos, más estable es la proporción de éxitos.

La binomial está detrás de cualquier tasa: conversión, clics, abandono, devoluciones. Eso sí, exige independencia. Si el mismo usuario aparece cinco veces, los intentos ya no son independientes y la binomial se queda corta.

### [06:30–08:30] Poisson

[DIAPOSITIVA 1.2-3]

Segunda: la Poisson. Modela conteos en un intervalo de tiempo o espacio: pedidos por hora, incidencias por día, llamadas por minuto. Funciona cuando los sucesos ocurren de forma independiente a un ritmo medio constante, que llamamos lambda.

La Poisson tiene un rasgo muy particular: su media y su varianza son iguales. Las dos valen lambda. Esto te da un diagnóstico rápido. Si calculas la media y la varianza de tus pedidos por hora y la varianza es mucho mayor que la media, tienes sobredispersión. Hay algo más en juego: picos de demanda, días de partido, festivos, grupos de amigos que piden a la vez.

Volvamos al reto del principio. Con una media de cuatro pedidos por hora, la probabilidad de recibir más de siete es aproximadamente un cinco por ciento. Así que, si dimensionas para siete u ocho pedidos, cubres el noventa y cinco por ciento de las horas. Fíjate: casi el doble de la media.

### [08:30–10:30] Normal

[DIAPOSITIVA 1.2-4]

Tercera: la normal, la famosa campana de Gauss. Tiene dos parámetros, la media mu y la desviación típica sigma, y es simétrica.

Hay una regla práctica que conviene tener en la cabeza: aproximadamente el sesenta y ocho por ciento de los valores caen a una desviación típica de la media, el noventa y cinco por ciento a dos, y el noventa y nueve coma siete por ciento a tres.

Esta regla te permite pensar en «distancias» medidas en desviaciones típicas. Si el peso de las bolsas de un proveedor tiene media de quinientos gramos y desviación típica de diez, una bolsa de quinientos treinta gramos está a tres desviaciones típicas: es muy rara, y si te llegan muchas así, algo ha cambiado en la línea de envasado. Ese número, cuántas desviaciones típicas te separan de la media, se llama puntuación z, y lo volverás a ver muchas veces en el curso.

¿Cuándo aparece la normal? Cuando un resultado es la suma de muchos efectos pequeños e independientes, como los errores de medida. Pero, sobre todo, aparece cuando promedias. La distribución de las medias muestrales tiende a ser normal. Ese es el teorema central del límite, y le dedicamos el próximo vídeo entero.

Ahora, una advertencia importante. Importes, tiempos y conteos casi nunca son normales. Si aplicas «media más menos dos desviaciones típicas» a importes de pedidos, te puede salir un límite inferior negativo. Y no existen pedidos de menos cinco euros.

### [10:30–12:00] Exponencial

[DIAPOSITIVA 1.2-5]

Cuarta: la exponencial. Modela tiempos de espera: minutos hasta el siguiente pedido, horas hasta que falla una máquina.

Está muy ligada a la Poisson. Si los pedidos llegan a un ritmo lambda, el tiempo entre un pedido y el siguiente es exponencial, con media uno entre lambda. Cuatro pedidos por hora significan, de media, quince minutos entre pedidos.

Es muy asimétrica: la mayoría de las esperas son cortas, pero unas pocas son muy largas. Y tiene una propiedad curiosa, la falta de memoria. Si llevas diez minutos sin pedidos, el tiempo que falta para el siguiente no depende de esos diez minutos. El proceso no «se acuerda» de lo que ya has esperado.

### [12:00–14:30] Log-normal

[DIAPOSITIVA 1.2-6]

Y quinta, la que más nos importa en este módulo: la log-normal. Una variable es log-normal si su logaritmo es normal. ¿Cuándo pasa eso? Cuando los efectos se multiplican en lugar de sumarse. Un cliente pide más platos, y platos más caros, y además añade bebida y postre. Esos factores se multiplican.

Importes de pedidos, salarios, precios de vivienda, duración de sesiones: todo eso suele parecerse a una log-normal. Son cantidades positivas con una cola larga hacia la derecha.

Y esa cola tiene una consecuencia práctica muy importante: la media es mayor que la mediana. En nuestra población simulada, la mediana es unos veinticuatro con cincuenta, y la media, casi veintiocho. Unos pocos pedidos grandes tiran de la media hacia arriba.

¿Cuál reportar? Depende. Si quieres describir el pedido típico, la mediana. Si quieres prever la facturación total, la media, porque el total es la media por el número de pedidos. Lo honesto con datos asimétricos es dar las dos.

Un ejemplo que seguro te suena: el salario medio de un país suele estar bastante por encima del salario mediano. ¿Mienten las estadísticas? No. Simplemente, unos pocos salarios muy altos elevan la media, mientras que la mediana nos dice cuánto gana la persona que está justo en el centro. Cuando alguien te dé una media de una variable asimétrica, pregunta siempre por la mediana.

Esta distribución es la protagonista del notebook: la población de un millón de pedidos que vamos a simular es log-normal. Y eso es intencionado. Queremos ver si nuestras herramientas, que muchas veces se explican con datos normales y bonitos, funcionan con datos realistas, asimétricos y con cola.

### [14:30–16:30] Demo: las distribuciones en el notebook y en scipy

[DEMO: ejecutar la celda de la sección 1 del notebook y comentar los cuatro histogramas: binomial(20; 0,1) con la mayoría de valores entre 0 y 4; Poisson(4) centrada en 3–4; exponencial con muchísimas esperas cortas; log-normal con cola a la derecha.]

[DIAPOSITIVA 1.2-7]

Vamos al notebook. En la sección uno generamos diez mil valores de cada distribución y los dibujamos. Fíjate en las formas: la binomial y la Poisson son discretas, con barras; la exponencial cae en picado desde el cero; y la log-normal sube rápido y tiene esa cola alargada hacia la derecha.

[PANTALLA: consola con las tres líneas de `scipy.stats` de la diapositiva]

Para calcular probabilidades no hace falta simular. SciPy tiene todas estas distribuciones con la misma interfaz. Con `cdf` respondes «¿qué probabilidad hay de que sea menor que…?». Con `sf`, «¿de que sea mayor que…?». Y con `ppf` respondes la pregunta inversa: «¿qué valor no se supera el noventa y cinco por ciento de las veces?». Casi cualquier pregunta de negocio sobre una distribución se traduce a una de esas tres operaciones.

### [16:30–18:30] Cómo elegir una distribución

[DIAPOSITIVA 1.2-8]

¿Cómo eliges el modelo en la práctica? Hazte unas preguntas sencillas. ¿Es un éxito o fracaso? Binomial. ¿Es un conteo por intervalo? Poisson. ¿Es un tiempo de espera? Exponencial. ¿Es una cantidad positiva y asimétrica? Log-normal. ¿Es una media de muchas observaciones? Normal.

Hagamos un pequeño ejercicio mental. Un banco quiere modelar tres cosas: cuántos clientes piden un préstamo cada día, cuánto tiempo pasa entre dos solicitudes y qué importe piden. ¿Lo tienes? Lo primero es un conteo por intervalo: Poisson. Lo segundo, un tiempo de espera: exponencial. Y lo tercero, una cantidad positiva con unos pocos préstamos muy grandes: log-normal. Y si además quisiera saber cuántos de cien solicitantes acaban impagando, eso sería una binomial.

Pero no te quedes ahí. Compruébalo contra los datos. Dibuja el histograma con la curva teórica encima, o un gráfico de cuantiles. Recuerda la famosa frase: todos los modelos son incorrectos, pero algunos son útiles. No buscamos el modelo verdadero, buscamos uno razonable que nos ayude a decidir.

Y cuidado con tres errores típicos: suponer normalidad por defecto, resumir datos asimétricos solo con la media y usar Poisson cuando hay sobredispersión.

### [18:30–20:00] Resumen y qué viene después

[CÁMARA]

Repasemos. Binomial para éxitos en n intentos. Poisson para conteos. Normal para sumas y medias. Exponencial para esperas. Log-normal para cantidades positivas y asimétricas, como nuestros importes. Y en distribuciones con cola a la derecha, la media supera a la mediana.

Hemos dicho varias veces que las medias tienden a ser normales aunque los datos no lo sean. Suena a magia, ¿verdad? En el próximo vídeo vamos a verlo con nuestros propios ojos: la ley de los grandes números y el teorema central del límite.

---

## Vídeo 1.3 · Ley de los grandes números y teorema central del límite (duración objetivo: 15 min)

**Objetivo del vídeo:** que el alumno entienda, mediante simulación, por qué la media muestral converge a la media real y por qué su distribución es aproximadamente normal con desviación típica $\sigma/\sqrt n$, y que conozca los límites de estos resultados.

**Material:** diapositivas 1.3-1 a 1.3-7; notebook, secciones 3 y 4.

### [00:00–01:30] Gancho

[CÁMARA]

¿Por qué una aseguradora puede fijar sus primas con años de antelación si no tiene ni idea de cuál de sus clientes va a tener un accidente? ¿Por qué un casino gana dinero de forma tan predecible si cada tirada de ruleta es puro azar?

La respuesta es la misma en los dos casos, y es también la razón por la que tú puedes estimar el ticket medio de una app con solo doscientos pedidos. Son dos resultados matemáticos: la ley de los grandes números y el teorema central del límite. Son la base de todo lo que haremos en el resto del módulo, así que vamos a verlos con calma y, sobre todo, con simulaciones.

### [01:30–04:00] Ley de los grandes números

[DIAPOSITIVA 1.3-1]

La ley de los grandes números dice algo muy intuitivo: si tomas observaciones independientes de una misma distribución, su media se acerca a la media real a medida que aumentas el número de observaciones.

[DEMO: notebook, sección 3. Ejecutar la celda de la media acumulada y señalar en el gráfico (eje x logarítmico) cómo la línea oscila mucho con menos de 10 pedidos, se estabiliza hacia los 1 000 y se pega a la línea roja de 27,79 € al llegar a 5 000.]

En el notebook vamos añadiendo pedidos uno a uno y recalculando la media. Mira el principio del gráfico: con los primeros pedidos, la media salta de un lado a otro. Un pedido de setenta euros la dispara; uno de diez la hunde. Pero a medida que avanzamos, cada pedido nuevo pesa menos y la línea se calma. Al llegar a cinco mil pedidos, está prácticamente encima de la media real.

Esta es la idea que explica las aseguradoras y los casinos: lo individual es incierto, pero lo agregado es estable.

Y también explica cosas de tu día a día profesional. ¿Por qué el primer día de una campaña la tasa de conversión se mueve como loca y a la semana se estabiliza? Ley de los grandes números. ¿Por qué un restaurante nuevo con tres reseñas tiene una nota de cinco estrellas o de dos, y uno con tres mil reseñas tiene un cuatro coma tres? La misma ley. Con pocas observaciones, los extremos son frecuentes simplemente porque hay poco donde promediar. Por eso, desconfía siempre de los rankings que mezclan elementos con muy pocos datos y elementos con muchos: arriba y abajo del todo suelen estar los que tienen menos datos.

### [04:00–05:30] Lo que la ley NO dice

[DIAPOSITIVA 1.3-2]

Ahora, cuidado con una mala interpretación muy extendida. La ley de los grandes números no dice que las cosas «se compensen» a corto plazo. Si tu campaña ha tenido tres días flojos, no «le toca» un día bueno. Si una moneda ha salido cara cinco veces, la siguiente sigue teniendo un cincuenta por ciento. Pensar lo contrario es la falacia del jugador.

La ley funciona por dilución, no por compensación: los días raros no se corrigen, simplemente pesan cada vez menos en el total.

Y hay algo que la ley no nos dice: a qué velocidad converge la media. Con doscientos pedidos, ¿cuánto nos podemos equivocar? Para eso necesitamos el segundo resultado.

### [05:30–08:30] Teorema central del límite

[DIAPOSITIVA 1.3-3]

Hagamos un experimento mental. Tomas veinte pedidos y calculas su media. Luego tomas otros veinte y calculas otra media. Y así, miles de veces. Tendrás miles de medias distintas. ¿Qué forma tiene el histograma de esas medias?

El teorema central del límite responde: si las observaciones son independientes y su varianza es finita, para muestras suficientemente grandes, la media muestral se distribuye aproximadamente como una normal. Centrada en la media real, mu. Y con una desviación típica igual a sigma partido por la raíz de n.

Lo asombroso es la frase «sea cual sea la distribución original». Nuestros pedidos son log-normales, claramente asimétricos. Y sin embargo, sus medias forman una campana.

[DEMO: notebook, sección 4. Ejecutar la celda de los tres histogramas (n = 2, 10, 100) con la curva normal teórica en rojo y leer el EE teórico de cada título.]

[DIAPOSITIVA 1.3-4]

Míralo en el notebook. Con n igual a dos, el histograma de las medias todavía tiene cola a la derecha: la normal roja no encaja bien. Con n igual a diez, ya casi es simétrico. Con n igual a cien, la curva roja y el histograma coinciden prácticamente a la perfección.

Fíjate también en los títulos: la dispersión de las medias baja de unos diez euros y medio con n igual a dos, a unos cuatro con siete con n igual a diez, y a uno y medio con n igual a cien. Esa cantidad, sigma entre raíz de n, es tan importante que tiene nombre propio: el error estándar. Será la protagonista del siguiente vídeo.

### [08:30–10:00] Intuición: por qué funciona

[DIAPOSITIVA 1.3-5]

¿Por qué ocurre esto? Piensa en una media de cien pedidos. Para que sea extremadamente alta, necesitarías que muchos de esos cien pedidos fueran enormes a la vez. Eso es muy improbable. Lo normal es que los grandes y los pequeños se mezclen y se compensen. Hay muchísimas más combinaciones que dan una media intermedia que combinaciones que dan una media extrema. Y esa abundancia de combinaciones intermedias es la que esculpe la campana.

Y hay una consecuencia práctica que te conviene grabar a fuego: el error baja con la raíz de n, no con n. Para reducir el error a la mitad, necesitas cuatro veces más datos. Para dividirlo entre diez, cien veces más. La precisión es cara.

Esto tiene consecuencias directas en presupuestos. Si un estudio de mercado con mil encuestas te da un margen de error de tres puntos y alguien pide «bájalo a uno», la respuesta no es «tres veces más encuestas», sino nueve veces más: nueve mil. Antes de pedir más precisión, conviene preguntarse si esa precisión cambiaría la decisión.

### [10:00–12:00] Límites del TCL

[DIAPOSITIVA 1.3-6]

El teorema central del límite es poderosísimo, pero tiene letra pequeña.

Uno: «suficientemente grande» depende de lo asimétricos que sean tus datos. Habrás oído que con treinta observaciones ya vale. Es una regla orientativa, no una ley. Con datos casi simétricos basta con menos; con colas muy largas, como ingresos donde unos pocos clientes facturan muchísimo, pueden hacer falta cientos o miles. Lo comprobarás en el ejercicio uno del notebook.

Dos: necesita independencia. Si tienes varios pedidos del mismo cliente, o días consecutivos de una serie, las observaciones están correlacionadas y el error real es mayor de lo que dice la fórmula.

Tres: hay distribuciones de colas tan pesadas que el teorema no se aplica tal cual.

Y cuatro: el teorema habla de la media, no de los datos. Los pedidos siguen siendo log-normales; lo que se vuelve normal es su media.

### [12:00–13:45] Ejemplo de negocio

[DIAPOSITIVA 1.3-7]

Veamos para qué sirve en el día a día. Una cadena de supermercados sabe que el gasto por cliente tiene una media de cuarenta y dos euros y una desviación típica de treinta. Una tienda atiende a cuatrocientos clientes en un día y su gasto medio es de treinta y nueve euros. ¿Es preocupante?

Con el teorema central del límite, la media de cuatrocientos clientes tiene un error estándar de treinta entre veinte: uno coma cinco euros. Treinta y nueve está a tres euros de cuarenta y dos, es decir, a dos errores estándar por debajo. La probabilidad de que eso pase por azar es de alrededor del dos coma tres por ciento. No es imposible, pero sí lo bastante raro como para que alguien mire qué ha pasado en esa tienda.

Fíjate que no hemos necesitado saber cómo se distribuye el gasto de cada cliente. Solo su media y su desviación típica. Esa es la potencia del teorema.

### [13:45–15:00] Resumen y qué viene después

[CÁMARA]

Resumamos. Ley de los grandes números: la media muestral converge a la media real; lo individual es incierto, lo agregado es estable. Teorema central del límite: la media muestral se distribuye aproximadamente como una normal con desviación típica sigma entre raíz de n, aunque los datos no sean normales. Para reducir el error a la mitad, cuadruplica la muestra. Y vigila la independencia y la asimetría.

En el próximo vídeo vamos a hablar de esa cantidad mágica, sigma entre raíz de n: el error estándar. Y vamos a aclarar de una vez por todas la confusión más frecuente de la estadística aplicada: la diferencia entre desviación típica y error estándar.

---

## Vídeo 1.4 · Estimación y error estándar (duración objetivo: 15 min)

**Objetivo del vídeo:** que el alumno distinga estimador y estimación, conozca las propiedades deseables de un estimador, entienda por qué se divide entre $n-1$ y, sobre todo, distinga sin dudar la desviación típica del error estándar.

**Material:** diapositivas 1.4-1 a 1.4-7; notebook, secciones 4 y 5.

### [00:00–01:30] Gancho

[CÁMARA]

Dos informes llegan a la misma reunión. El primero dice: «Ticket medio: veintiocho euros, más menos dieciséis». El segundo: «Ticket medio: veintiocho euros, más menos uno». Están hechos con exactamente los mismos doscientos pedidos. Y los dos son correctos.

¿Cómo es posible? Porque ese «más menos» significa cosas completamente distintas en cada informe. Uno habla de cuánto varían los pedidos; el otro, de cuánto nos podemos fiar de la media. Si no sabes cuál es cuál, puedes sacar conclusiones absurdas. Hoy vamos a resolver esa confusión de una vez.

### [01:30–03:30] Estimador y estimación

[DIAPOSITIVA 1.4-1]

Empecemos con dos palabras que parecen iguales. Un estimador es una regla, un procedimiento: «suma los importes y divide entre el número de pedidos». Una estimación es el número concreto que sale cuando aplicas esa regla a tus datos: veintiocho con ocho.

¿Por qué importa la distinción? Porque las propiedades de las que vamos a hablar, si acierta en promedio, si es preciso, son propiedades del procedimiento, no del número. Un número concreto no es «sesgado» ni «insesgado»; simplemente está más cerca o más lejos de la verdad. Lo que podemos evaluar es si la regla que usamos tiende a acertar.

### [03:30–05:30] Propiedades deseables

[DIAPOSITIVA 1.4-2]

Pensemos en un tirador con una diana. Si sus disparos se agrupan muy juntos pero lejos del centro, es preciso pero sesgado. Si se reparten alrededor del centro pero muy dispersos, es insesgado pero impreciso. Queremos las dos cosas: centrado y agrupado.

Traducido a estadística: un estimador es insesgado si, en promedio a lo largo de muchas muestras, acierta. Es preciso si sus valores varían poco de una muestra a otra. Y es consistente si, al crecer la muestra, se concentra cada vez más alrededor del valor real.

La media muestral cumple las tres para estimar la media de la población. Por eso es nuestra herramienta de referencia.

### [05:30–07:00] ¿Por qué n menos uno?

[DIAPOSITIVA 1.4-3]

Un detalle que te encontrarás en el código: cuando calculamos la desviación típica de una muestra, dividimos entre n menos uno, no entre n. ¿Por qué?

Porque medimos las desviaciones respecto a la media de la propia muestra, y esa media está «ajustada» a esos datos: por construcción, los datos están lo más cerca posible de ella. Eso hace que, si dividiéramos entre n, subestimaríamos sistemáticamente la variabilidad real. Dividir entre n menos uno corrige ese sesgo.

En la práctica: en NumPy escribe `ddof=1`. En pandas no tienes que hacer nada, porque ya lo usa por defecto. Con muestras grandes la diferencia es mínima, pero con muestras pequeñas importa.

### [07:00–10:30] Desviación típica frente a error estándar

[DIAPOSITIVA 1.4-4]

Y llegamos al corazón del vídeo. Desviación típica y error estándar.

La desviación típica mide cuánto varían los pedidos individuales entre sí. Es una propiedad de los datos, de los clientes. En nuestra muestra vale unos dieciséis euros: hay pedidos de diez y pedidos de sesenta.

El error estándar mide cuánto variaría la media si repitiéramos el muestreo. Es una propiedad de la estimación. Se calcula dividiendo la desviación típica entre la raíz de n. Con doscientos pedidos: dieciséis entre raíz de doscientos, aproximadamente uno con catorce.

[PANTALLA: notebook, sección 5, celda donde se calcula `stats.sem(muestra)`; mostrar además `muestra.std(ddof=1)`]

Te lo enseño en el notebook. `muestra.std` con `ddof=1` nos da dieciséis con doce. `stats.sem` nos da uno con catorce. Mismos datos, dos preguntas distintas.

[DIAPOSITIVA 1.4-5]

Y ahora la prueba de fuego: ¿qué pasa si recogemos más datos? Con veinte mil pedidos, el error estándar baja a unos once céntimos. Conocemos la media muchísimo mejor. Pero la desviación típica sigue en torno a quince o dieciséis euros. ¿Por qué? Porque los clientes no se vuelven más parecidos entre sí por el hecho de que los observemos más. La variedad de los pedidos es una característica del negocio; la precisión de la media es una característica de nuestro estudio.

Una forma de recordarlo: la desviación típica es una foto de tus clientes; el error estándar es una foto de tu estudio. Si mañana duplicas el tamaño de tu estudio, tus clientes siguen siendo los mismos, pero tu estudio es más preciso.

Y esto tiene implicaciones prácticas muy distintas. Si eres el responsable de operaciones y tienes que preparar las bolsas, los vehículos o la caja, te importa la desviación típica: necesitas saber que habrá pedidos de diez euros y de sesenta. Si eres el director financiero y quieres saber si el ticket medio ha subido respecto al trimestre pasado, te importa el error estándar: necesitas saber si la diferencia entre dos medias es real o es ruido.

Así que vuelve a los dos informes del principio. «Veintiocho más menos dieciséis» describe la variedad de los pedidos. «Veintiocho más menos uno» describe la precisión de la media. Los dos son correctos, pero solo si dicen qué son.

### [10:30–12:30] Error estándar de otras estimaciones

[DIAPOSITIVA 1.4-6]

El concepto de error estándar no es exclusivo de la media. Cualquier estimación tiene el suyo: es la desviación típica de su distribución muestral.

Para una proporción, por ejemplo una tasa de conversión, el error estándar es la raíz de p por uno menos p, entre n. Con mil visitantes y un cinco por ciento de conversión, sale unas siete décimas de punto. Eso significa que un cinco por ciento podría ser perfectamente un cuatro y medio o un cinco y medio.

Para la diferencia de dos medias, sumamos las varianzas de cada media y hacemos la raíz. Lo usarás muchísimo en las pruebas A/B del módulo cuatro.

¿Y para la mediana, un percentil o un ratio? No hay una fórmula sencilla y fiable. Ahí entra el bootstrap, que veremos en la lección seis.

Un ejemplo para fijarlo. El equipo de producto informa: «El tiempo medio de sesión es de seis coma dos minutos, con una desviación típica de cuatro coma ocho, sobre dos mil quinientas sesiones». ¿Cuál es el error estándar? Cuatro coma ocho entre raíz de dos mil quinientos, que es cincuenta: menos de una décima de minuto, unos seis segundos. Así que la media está muy bien estimada, aunque las sesiones individuales sean muy distintas entre sí: unas de un minuto, otras de quince. Las dos cosas son verdad a la vez.

### [12:30–14:00] Errores frecuentes

[DIAPOSITIVA 1.4-7]

Cuatro errores que verás en informes reales. Uno: describir a los clientes con el error estándar, como «los pedidos rondan los veintiocho euros, más menos uno». Falso: los pedidos varían muchísimo más. Dos: barras de error en un gráfico sin decir qué son. Siempre etiqueta: desviación típica, error estándar o intervalo de confianza. Tres: elegir el error estándar porque es más pequeño y queda más «preciso». Cada uno tiene su función. Y cuatro: olvidar la independencia. Si tienes varios pedidos por cliente, el error estándar real es mayor que el de la fórmula.

### [14:00–15:00] Resumen y qué viene después

[CÁMARA]

Recapitulemos. Un estimador es una regla; la estimación, un número. La desviación típica describe a los datos y no baja con n. El error estándar describe la precisión de la estimación y baja como uno entre raíz de n. En nuestro caso: dieciséis con doce frente a uno con catorce.

Con el error estándar ya tenemos todos los ingredientes para construir la herramienta estrella del módulo: el intervalo de confianza. Y, sobre todo, para aprender a interpretarlo bien, que es donde falla casi todo el mundo.

---

## Vídeo 1.5 · Intervalos de confianza: construcción e interpretación (duración objetivo: 20 min)

**Objetivo del vídeo:** que el alumno sepa construir un IC para una media (y una proporción), lo interprete correctamente como propiedad del método, reconozca las interpretaciones erróneas habituales, entienda qué controla la anchura y sepa comunicarlo a un público no técnico.

**Material:** diapositivas 1.5-1 a 1.5-8; notebook, sección 5 (IC y experimento de cobertura).

### [00:00–01:30] Gancho

[CÁMARA]

«El veintiocho por ciento de los usuarios abandona el carrito». Esta frase, así, sin más, aparece cada semana en miles de presentaciones. Y la pregunta que casi nadie hace es: ¿veintiocho, seguro? ¿O podría ser veinte? ¿O treinta y cinco?

Si la cifra viene de cincuenta usuarios, cualquiera de esas opciones es plausible. Si viene de cincuenta mil, el veintiocho es bastante sólido. Los intervalos de confianza son la forma estándar de decir esto con números. Hoy vamos a construirlos, pero, sobre todo, a interpretarlos bien, porque es uno de los conceptos peor entendidos de toda la estadística.

### [01:30–04:00] De un punto a un intervalo

[DIAPOSITIVA 1.5-1]

Nuestra media muestral es veintiocho con ocho. Es una estimación puntual: un único número que casi con toda seguridad no coincide exactamente con la media real. Lo que queremos es un rango de valores plausibles.

La lógica sale directamente del teorema central del límite. Sabemos que la media muestral se distribuye aproximadamente como una normal centrada en la media real, con desviación típica igual al error estándar. Y en una normal, el noventa y cinco por ciento de los valores caen a menos de uno coma noventa y seis desviaciones típicas del centro.

Así que, en el noventa y cinco por ciento de las muestras, nuestra media estará a menos de uno coma noventa y seis errores estándar de la media real. Ahora le damos la vuelta a la frase: en el noventa y cinco por ciento de las muestras, el intervalo «media muestral más menos uno coma noventa y seis errores estándar» contendrá la media real. Ese es el intervalo de confianza al noventa y cinco por ciento.

### [04:00–06:00] La fórmula con t de Student

[DIAPOSITIVA 1.5-2]

Hay un pequeño ajuste. No conocemos sigma, la desviación típica real; la estimamos con s. Eso añade un poco más de incertidumbre, y para tenerla en cuenta usamos la distribución t de Student en lugar de la normal. Es como una normal con colas algo más gruesas.

Con muestras grandes, la diferencia es despreciable: con doscientos pedidos, el valor de t es uno coma noventa y siete, casi idéntico al uno coma noventa y seis. Con diez datos sería dos coma veintiséis, bastante más. El producto de t por el error estándar se llama margen de error.

[DEMO: notebook, sección 5. Ejecutar la celda que toma la muestra de 200 pedidos y calcula `stats.t.interval`; leer la salida: media 28,08 €, IC 95 % [25,84; 30,33].]

[DIAPOSITIVA 1.5-3]

En el notebook es una sola línea: `stats.t.interval`, con el nivel de confianza, los grados de libertad, la media y el error estándar. Resultado: media de veintiocho con ocho, e intervalo de veinticinco con ochenta y cuatro a treinta con treinta y tres. Un margen de error de unos dos euros con veinticinco.

Y como estamos simulando, podemos hacer trampa y mirar la media real: veintisiete con setenta y nueve. Está dentro. Bien. Pero ojo, en la vida real nunca podrás comprobarlo.

Para proporciones, como la tasa de abandono del principio, la fórmula es análoga: la proporción más menos uno coma noventa y seis por su error estándar.

Hagamos el cálculo con un caso real. Una empresa de suscripciones encuesta a cuatrocientos clientes y el sesenta y dos por ciento dice estar satisfecho. El error estándar es la raíz de cero sesenta y dos por cero treinta y ocho, entre cuatrocientos: unos dos coma cuatro puntos. El intervalo va, aproximadamente, del cincuenta y siete al sesenta y siete por ciento. Si el objetivo del trimestre era «al menos un sesenta por ciento», ¿lo hemos cumplido? Probablemente sí, pero los datos también son compatibles con un cincuenta y siete. Lo honesto es decirlo así, y no colgarse la medalla sin matices.

### [06:00–09:30] Qué significa «noventa y cinco por ciento»

[DIAPOSITIVA 1.5-4]

Y ahora, la parte más importante del vídeo. ¿Qué significa ese noventa y cinco por ciento?

Significa esto: si repitiéramos el muestreo muchas veces y construyéramos un intervalo con cada muestra, aproximadamente el noventa y cinco por ciento de esos intervalos contendrían la media real.

Fíjate en el sujeto de la frase. El noventa y cinco por ciento es una propiedad del método, del procedimiento que usamos para fabricar intervalos. Es como un fabricante de paraguas que dice que el noventa y cinco por ciento de sus paraguas no tienen defectos. Cuando tú tienes un paraguas concreto en la mano, ese paraguas tiene defecto o no lo tiene. No es «un noventa y cinco por ciento bueno».

Con los intervalos pasa lo mismo. Una vez calculado nuestro intervalo, de veinticinco con ochenta y cuatro a treinta con treinta y tres, la media real está dentro o no está. La media real es un número fijo; no se mueve. Lo que cambia de muestra en muestra es el intervalo. Por eso hablamos de confianza y no de probabilidad: confiamos en el método porque sabemos que acierta el noventa y cinco por ciento de las veces.

¿Y la frase «hay un noventa y cinco por ciento de probabilidad de que la media real esté entre veinticinco con ochenta y cuatro y treinta con treinta y tres»? En sentido estricto, dentro de la estadística clásica, es incorrecta. En la práctica, mucha gente la usa para comunicar, y con un público no técnico puede ser una aproximación aceptable; de hecho, es lo que diría un análisis bayesiano sin información previa. Pero tú tienes que conocer la diferencia y no usarla en un informe técnico.

### [09:30–12:00] Interpretaciones incorrectas

[DIAPOSITIVA 1.5-5]

Veamos cuatro interpretaciones que encontrarás en informes reales, todas incorrectas.

Primera: «El noventa y cinco por ciento de los pedidos cuesta entre veinticinco con ochenta y cuatro y treinta con treinta y tres». No. El intervalo es para la media, no para los pedidos. Recuerda el vídeo anterior: los pedidos individuales tienen una desviación típica de dieciséis euros. Hay montones de pedidos de quince euros y de cincuenta. Si quieres un rango para pedidos individuales, mira los percentiles de los datos.

Segunda: «Si repetimos el estudio, el noventa y cinco por ciento de las nuevas medias caerán en este intervalo». Tampoco. Nuestro intervalo está centrado en nuestra media, no en la media real. Si nuestra media salió algo alta, las nuevas medias caerán, en promedio, más abajo.

Tercera: «La media real cambia y está dentro del intervalo el noventa y cinco por ciento del tiempo». No: la media real es fija. Lo aleatorio es el intervalo.

Y cuarta: «Un intervalo al noventa y nueve por ciento es siempre mejor». No necesariamente. Es más ancho. Más confianza se paga con menos precisión. Un intervalo de cero a cien euros tiene una confianza altísima y no sirve para nada.

### [12:00–14:30] Comprobación: el experimento de cobertura

[DIAPOSITIVA 1.5-6]

Como estamos simulando, podemos comprobar la definición directamente.

[DEMO: notebook, sección 5. Ejecutar la celda que construye 100 intervalos con 100 muestras de 200 pedidos; mostrar el gráfico de segmentos verticales, azules los que contienen la media real (línea negra discontinua) y rojos los que no; leer el título: «96 de 100 intervalos contienen la media real».]

El notebook toma cien muestras distintas de doscientos pedidos y construye cien intervalos. Cada línea vertical es un intervalo. La línea discontinua es la media real. Las líneas azules la cruzan; las rojas, no.

Resultado: noventa y seis de cien la contienen. ¿Esperabas exactamente noventa y cinco? El propio recuento tiene azar: lo normal es obtener entre noventa y uno y noventa y nueve, más o menos. Si lo repites con otra semilla, saldrá otro número cercano a noventa y cinco.

Y mira los intervalos rojos. No tienen nada raro. Se construyeron igual que los demás, con la misma fórmula y el mismo cuidado. Simplemente les tocó una muestra con mala suerte. Ese cinco por ciento de fallos es el precio que aceptamos al elegir un noventa y cinco por ciento de confianza. Y aquí está lo inquietante: en la vida real, nunca sabrás si tu intervalo es azul o rojo.

### [14:30–17:00] Qué controla la anchura

[DIAPOSITIVA 1.5-7]

¿De qué depende que un intervalo sea ancho o estrecho? De tres palancas.

Primera, el nivel de confianza. Al noventa por ciento usamos uno coma sesenta y cuatro; al noventa y cinco, uno coma noventa y seis; al noventa y nueve, dos coma cincuenta y ocho. Más confianza, más ancho.

Segunda, la variabilidad de los datos. Si los pedidos son muy dispersos, el intervalo es más ancho. No la controlas, aunque a veces puedes reducirla segmentando.

Tercera, el tamaño de la muestra. La anchura cae como uno entre raíz de n. Cuadruplicar la muestra reduce la anchura a la mitad.

Y de aquí sale una herramienta muy práctica: calcular el tamaño de muestra antes de recoger datos. Si quieres un margen de error E, despejas n de la fórmula: n es igual a uno coma noventa y seis por s, entre E, todo al cuadrado. Es justo el ejercicio tres del notebook, y la base de la recomendación de tu caso práctico. Te adelanto que para un margen de cincuenta céntimos vas a necesitar bastantes más de doscientos pedidos.

### [17:00–19:00] Cómo comunicarlo

[DIAPOSITIVA 1.5-8]

Ahora, imagina que se lo tienes que contar al director comercial. No le hables de distribuciones t. Algo así funciona muy bien: «Estimamos que el ticket medio está entre veinticinco con ochenta y treinta con treinta. Lo hemos calculado con un método que acierta en noventa y cinco de cada cien ocasiones». Y, si la decisión depende de ello, añade qué significa para el negocio: «Es suficiente para distinguir un ticket de veintiocho de uno de treinta y cinco, pero no para detectar cambios de un euro».

Y recuerda los supuestos: muestra aleatoria, observaciones independientes y un n suficiente para la asimetría de tus datos. Si la muestra está sesgada, el intervalo será estrecho y bonito… y estará mal centrado.

Un último aviso: si comparas dos grupos y sus intervalos se solapan, eso no demuestra que no haya diferencia. Para comparar, se construye el intervalo de la diferencia. Lo veremos en el módulo cuatro.

### [19:00–20:00] Resumen y qué viene después

[CÁMARA]

Resumamos. El intervalo para una media es la media más menos t por el error estándar. El noventa y cinco por ciento es la tasa de acierto del método, no la probabilidad sobre un intervalo concreto. El intervalo habla de la media, no de los pedidos. Y su anchura depende de la confianza, de la variabilidad y de la raíz de n.

Hasta ahora todo ha girado en torno a la media, que tiene una fórmula cómoda. ¿Y si lo que te interesa es la mediana, o el percentil noventa del tiempo de entrega? En el próximo vídeo veremos un truco computacional que funciona para casi cualquier métrica: el bootstrap.

---

## Vídeo 1.6 · Bootstrap: incertidumbre para cualquier métrica (duración objetivo: 15 min)

**Objetivo del vídeo:** que el alumno entienda la idea del bootstrap, sepa implementarlo en pocas líneas, calcule un IC por el método del percentil para la mediana y conozca cuándo funciona bien y cuándo no.

**Material:** diapositivas 1.6-1 a 1.6-7; notebook, sección 5 («Bootstrap: intervalos sin fórmulas»).

### [00:00–01:30] Gancho

[CÁMARA]

Tu empresa quiere poner en la web una promesa: «El noventa por ciento de los pedidos llega en menos de X horas». Tienes los tiempos de entrega de una semana piloto. Calculas el percentil noventa: cuarenta y seis horas. ¿Pones «cuarenta y seis horas» en la web?

Si te equivocas por abajo, incumples la promesa y pierdes la confianza de los clientes. Necesitas saber cuánto te puedes equivocar al estimar un percentil noventa. Y aquí viene el problema: no hay una fórmula sencilla para el error estándar de un percentil. Para la media sí, pero para esto no.

Hoy vamos a ver una solución elegante, que funciona para casi cualquier métrica y que cabe en tres líneas de Python: el bootstrap.

### [01:30–03:00] El problema

[DIAPOSITIVA 1.6-1]

La media es cómoda porque el teorema central del límite nos da su error estándar gratis: s entre raíz de n. Pero en negocio nos interesan muchas otras métricas. La mediana del importe, que describe mejor el pedido típico. El percentil noventa del tiempo de entrega, que describe lo que sufren tus peores clientes. Ratios, como ingresos por usuario activo. Diferencias de medianas entre dos versiones de la app.

Para casi todas ellas no hay una fórmula sencilla y fiable. ¿Renunciamos a dar su incertidumbre? Ni hablar.

### [03:00–05:30] La idea

[DIAPOSITIVA 1.6-2]

Recuerda cómo definimos el error estándar: es cuánto variaría la estimación si pudiéramos tomar muchas muestras de la población. El problema es que solo tenemos una muestra. No podemos volver a la población.

El bootstrap propone un atajo muy ingenioso: si la muestra es aleatoria y suficientemente grande, se parece a la población. Así que usemos la muestra como si fuera la población, y simulemos el muestreo a partir de ella.

El nombre viene de una expresión inglesa: levantarse tirando de los cordones de tus propias botas. Parece imposible obtener información nueva sin datos nuevos, pero en este caso funciona sorprendentemente bien.

Una analogía: imagina que quieres saber cuánto variaría el resultado de una encuesta si la repitieras, pero solo tienes presupuesto para una. Tienes doscientas respuestas. El bootstrap dice: imagina que la población está formada por millones de copias de estas doscientas personas, en las mismas proporciones. Saca muestras de doscientas de esa población imaginaria. Como esa población imaginaria se parece a la real, la variación que veas entre esas muestras se parecerá a la variación real.

Fíjate en que no hemos supuesto ninguna distribución: ni normal, ni log-normal, ni nada. Solo hemos usado los datos. Por eso decimos que el bootstrap es un método no paramétrico, y por eso es tan flexible. El precio que pagamos es computacional: en lugar de una fórmula, hacemos miles de cálculos. Hace treinta años eso era un problema; hoy, tu portátil lo hace en un segundo.

### [05:30–08:00] El algoritmo

[DIAPOSITIVA 1.6-3]

El procedimiento tiene cinco pasos. Uno: partes de tu muestra original de n datos. Dos: generas una muestra bootstrap eligiendo n observaciones de tu muestra, con reemplazo. Tres: calculas en ella el estadístico que te interesa, la mediana por ejemplo. Cuatro: repites los pasos dos y tres miles de veces. Cinco: miras la colección de resultados. Su desviación típica es el error estándar bootstrap. Y sus percentiles dos coma cinco y noventa y siete coma cinco te dan un intervalo de confianza al noventa y cinco por ciento.

¿Por qué con reemplazo? Piénsalo: si eliges doscientos pedidos de doscientos sin reemplazo, obtienes siempre los mismos doscientos, solo que desordenados. La mediana no cambiaría nunca. Con reemplazo, en cada muestra bootstrap algunos pedidos salen dos o tres veces y otros no salen. Esa variación imita el azar de tomar una muestra nueva de la población.

### [08:00–11:00] Demo en el notebook

[DIAPOSITIVA 1.6-4]

[DEMO: notebook, sección 5, subapartado «Bootstrap». Mostrar la función `bootstrap`: genera una matriz de índices aleatorios de 5 000 × 200 y aplica el estadístico a cada fila. Ejecutar la celda y leer la salida: mediana 24,50 €, IC 95 % bootstrap [21,89; 27,02], mediana poblacional 24,53 €.]

Vamos al notebook. La función `bootstrap` es muy corta. Genera de golpe cinco mil filas de doscientos índices aleatorios, cada fila es una muestra bootstrap, y aplica el estadístico a cada una. Como el estadístico es un argumento, la misma función sirve para la mediana, el percentil noventa o lo que quieras.

[DIAPOSITIVA 1.6-5]

Resultado: la mediana de nuestra muestra es veinticuatro con cincuenta, y el intervalo bootstrap va de veintiuno con ochenta y nueve a veintisiete con dos. Como estamos simulando, podemos mirar la mediana real: veinticuatro con cincuenta y tres. Dentro.

Y fíjate en algo: la mediana es casi cuatro euros menor que la media, que era veintiocho con ocho. Con datos asimétricos, las dos cuentan historias distintas. La media te sirve para prever la facturación; la mediana, para describir al cliente típico. Reporta las dos.

Un apunte: SciPy incluye una función `bootstrap` con un método llamado BCa, que corrige sesgos y asimetrías de la distribución bootstrap. Para informes importantes es una buena opción.

En el ejercicio dos del notebook harás exactamente esto para el percentil noventa del importe. Verás que su intervalo es bastante más ancho, y entenderás por qué.

### [11:00–13:30] Cuándo sí y cuándo con cuidado

[DIAPOSITIVA 1.6-6]

¿Cuándo brilla el bootstrap? Con estadísticos sin fórmula sencilla: medianas, percentiles, ratios, correlaciones. Con datos asimétricos, donde la aproximación normal es dudosa. Para validar un intervalo de fórmula: si los dos coinciden, ganas confianza. Y para métricas de modelos, como el AUC de un clasificador en el conjunto de test.

¿Cuándo tener cuidado? Con muestras muy pequeñas, de menos de quince o veinte datos: tu muestra no se parece lo suficiente a la población y el bootstrap hereda sus huecos. Con estadísticos extremos, como el máximo o el percentil noventa y nueve: dependen de muy pocas observaciones, y el bootstrap no puede inventar valores más extremos que los que ya tienes. Con datos dependientes, como series temporales o varios pedidos por cliente: remuestrear observaciones sueltas rompe la estructura; hay variantes, como remuestrear bloques o clientes enteros.

Y lo más importante: el bootstrap cuantifica el error aleatorio, no el sesgo. Si tu muestra está sesgada, tu intervalo bootstrap estará igual de sesgado.

Un ejemplo de cómo se rompe con datos dependientes. Imagina que tienes las ventas diarias de un año y quieres el intervalo de la media. Si remuestreas días sueltos, mezclas lunes de enero con sábados de agosto como si fueran intercambiables, y destruyes la tendencia y la estacionalidad. El intervalo saldrá demasiado estrecho. La solución es remuestrear bloques de días consecutivos, por ejemplo semanas enteras. Lo mismo con clientes: si un cliente tiene cincuenta pedidos, remuestrea clientes, no pedidos.

Y un consejo práctico final: usa siempre una semilla fija, como hacemos en el notebook con `default_rng(7)`, para que tus resultados sean reproducibles. Y usa suficientes repeticiones: con mil puede bastar para un error estándar, pero para los extremos de un intervalo es mejor ir a cinco mil o diez mil.

### [13:30–15:00] Resumen y qué viene después

[DIAPOSITIVA 1.6-7]

[CÁMARA]

Volvamos a la promesa de la web. Si el bootstrap te dice que el percentil noventa está, por ejemplo, entre cuarenta y dos y cincuenta y una horas, prometer cuarenta y seis es arriesgado. Un compromiso prudente usaría el extremo superior, o esperaría a tener más datos.

Resumamos. El bootstrap remuestrea tu muestra con reemplazo para imitar el azar del muestreo. Sirve para cualquier estadístico. Sus percentiles dan un intervalo de confianza. Y no corrige el sesgo.

Hasta ahora hemos medido cuánto nos podemos fiar de una cifra. En el último vídeo del módulo daremos un paso más: cuando dos cosas se mueven juntas, ¿podemos decir que una causa la otra? Spoiler: casi nunca tan rápido como nos gustaría.

---

## Vídeo 1.7 · Correlación, causalidad y paradoja de Simpson (duración objetivo: 15 min)

**Objetivo del vídeo:** que el alumno sepa qué mide (y qué no) la correlación, enumere las explicaciones alternativas a una relación causal, entienda qué es una variable de confusión y sea capaz de detectar y explicar la paradoja de Simpson.

**Material:** diapositivas 1.7-1 a 1.7-8; notebook, sección 6.

### [00:00–01:30] Gancho

[CÁMARA]

Un análisis interno descubre que los clientes que usan el chat de ayuda gastan un treinta por ciento más que los que no lo usan. Alguien propone: «¡Pongamos el chat a pantalla completa en cuanto se abra la app, así todos gastarán más!».

¿Te convence? Piénsalo un segundo. ¿Quién usa el chat? Probablemente los clientes más implicados, los que hacen pedidos grandes y tienen dudas sobre ellos. El chat quizá no cause el gasto; quizá el gasto, o el tipo de cliente, cause el uso del chat.

Este vídeo va de ese salto peligroso entre «van juntos» y «uno causa el otro». Y acabaremos con una de las trampas más elegantes de la estadística: la paradoja de Simpson.

### [01:30–03:30] Correlación de Pearson

[DIAPOSITIVA 1.7-1]

Empecemos por medir la relación. La correlación de Pearson, r, mide la fuerza y el sentido de la relación lineal entre dos variables. Va de menos uno a uno. Uno significa una relación lineal creciente perfecta; menos uno, decreciente perfecta; y cero, que no hay relación lineal.

Fíjate en esa palabra: lineal. Una correlación cercana a cero no significa que no haya relación. Puede haber una relación curva que r no detecta. En pandas, se calcula con el método `corr`.

### [03:30–05:00] Lo que r no ve

[DIAPOSITIVA 1.7-2]

Tres trampas. Primera: r no es la pendiente. Una correlación de cero coma nueve puede corresponder a un efecto minúsculo, de céntimos, o a uno enorme. Para el tamaño del efecto necesitas una regresión, que veremos en el módulo tres.

Segunda: las relaciones no lineales. Piensa en la satisfacción frente al número de notificaciones: con pocas, el cliente se olvida de ti; con muchas, se harta. Una U perfecta puede dar r igual a cero.

Tercera: los valores atípicos. Un solo cliente gigante puede crear una correlación de la nada, o destruir una que existe. La correlación de Spearman, que trabaja con rangos, es más robusta.

Moraleja: dibuja siempre el diagrama de dispersión antes de fiarte del número.

### [05:00–07:30] Cinco explicaciones de una correlación

[DIAPOSITIVA 1.7-3]

Supón que encuentras una correlación clara entre X e Y. Hay al menos cinco explicaciones posibles.

Una: X causa Y. Es lo que nos gustaría concluir.

Dos: causalidad inversa. Y causa X. Las tiendas con más empleados venden más. ¿Los empleados generan ventas, o se contratan más empleados donde ya se vende más?

Tres: una variable de confusión, Z, causa las dos. El ejemplo clásico: las heladerías venden más los días con más ahogamientos en la playa. ¿Prohibimos los helados? No: el calor aumenta las dos cosas.

Cuatro: selección. Si solo analizas a los clientes que siguen activos, puedes ver relaciones que no existen en la población completa, porque has filtrado justo a los que tenían ciertas características.

Y cinco: el azar. Si cruzas cien variables entre sí, alguna correlación «significativa» aparecerá por pura casualidad.

Vuelve al ejemplo del chat. ¿Cuántas de estas cinco explicaciones encajan? Al menos la inversa, la de confusión y la de selección.

### [07:30–09:00] Variable de confusión

[DIAPOSITIVA 1.7-4]

Detengámonos en la variable de confusión, porque es la más traicionera. Una confusora es una variable que influye a la vez en quién recibe el «tratamiento» y en el resultado. En el diagrama: el dispositivo influye en qué versión de la app ve el usuario y, también, en si compra.

Si no la tienes en cuenta, atribuyes a la versión un efecto que en realidad es del dispositivo. Y esto nos lleva directamente al ejemplo del notebook.

Las confusoras están por todas partes en los datos de negocio. Los clientes con tarjeta de fidelidad gastan más, pero quizá porque los que ya gastaban mucho son los que se hacen la tarjeta. Los usuarios que activan las notificaciones abandonan menos, pero quizá porque los más comprometidos son los que las activan. Los comerciales que usan el CRM nuevo venden más, pero quizá porque los mejores comerciales fueron los primeros en adoptarlo. En todos estos casos, la característica del cliente o del empleado influye a la vez en el «tratamiento» y en el resultado.

### [09:00–12:00] El test de la app y la paradoja de Simpson

[DEMO: notebook, sección 6. Ejecutar la celda que crea la tabla de versiones y dispositivos; mostrar la tasa por fila y después la tasa global por versión (A 7,0 %, B 11,2 %).]

[DIAPOSITIVA 1.7-5]

En el notebook comparamos dos versiones de la app, A y B. Primero miramos el global: B convierte un once coma dos por ciento y A un siete. B gana por más de cuatro puntos. Caso cerrado, ¿no?

Ahora miremos por dispositivo. En móvil, A convierte un cinco por ciento y B un cuatro: gana A. En escritorio, A convierte un quince y B un trece: vuelve a ganar A. A gana en cada segmento… y pierde en el global. Esto es la paradoja de Simpson.

¿Qué ha pasado? Mira el número de visitas. B se mostró sobre todo en escritorio: ocho mil de sus diez mil visitas. Y A, sobre todo en móvil. En escritorio todo el mundo convierte mucho más, con cualquier versión. Así que B parecía mejor porque jugaba en el campo fácil. La tasa global de cada versión es una media ponderada de sus segmentos, y los pesos eran muy distintos.

[DIAPOSITIVA 1.7-6]

Hagamos la cuenta. La tasa global de A es el ochenta por ciento de su tasa en móvil, un cinco, más el veinte por ciento de su tasa en escritorio, un quince: siete por ciento. La de B es el veinte por ciento de un cuatro más el ochenta por ciento de un trece: once coma dos. B no gana por ser mejor versión, sino por tener una mezcla de usuarios más favorable. Es un efecto de composición. Y la consecuencia de negocio es seria: si lanzáramos B a todos los usuarios porque «gana en el global», empeoraríamos la conversión tanto en móvil como en escritorio.

Este tipo de situación aparece en hospitales que atienden pacientes de distinta gravedad, en comerciales con zonas de distinta riqueza o en flotas de reparto con rutas diferentes. En el ejercicio cuatro te pedimos que inventes un ejemplo de tu propio sector.

### [12:00–13:45] Qué hacer

[DIAPOSITIVA 1.7-7]

¿Cómo nos protegemos? La solución más sólida es aleatorizar. Si la versión que ve cada usuario se decide al azar, los dispositivos, las ciudades y cualquier otra confusora, conocida o desconocida, se reparten por igual entre los grupos. Es la idea de las pruebas A/B, que veremos en el módulo cuatro.

Si no puedes aleatorizar, estratifica: compara dentro de grupos homogéneos. O controla las confusoras en un modelo de regresión, en el módulo tres.

Pero ojo: no hay que estratificar a ciegas. Si la variable por la que agrupas es una consecuencia del tratamiento, por ejemplo «usuarios que llegaron a la página de pago», controlar por ella puede introducir sesgos nuevos. Primero piensa qué causa qué; después calcula.

### [13:45–15:00] Resumen y cierre del módulo

[DIAPOSITIVA 1.7-8]

[CÁMARA]

Antes de concluir «causa», repasa esta lista. ¿Cómo se asignó el tratamiento? ¿En qué más se diferencian los grupos? ¿Podría la causalidad ir al revés? ¿Hay filtrado en los datos? ¿La comparación es justa segmento a segmento?

Y con esto cerramos el módulo. Hemos visto las distribuciones más habituales, la ley de los grandes números y el teorema central del límite, el error estándar, los intervalos de confianza, el bootstrap y las trampas de la causalidad. Ahora te toca a ti: trabaja el notebook, resuelve los ejercicios y prepara el informe de una página para el director comercial. ¿Cuál es el importe medio de un pedido y cuánto nos podemos fiar de esa cifra? Ya tienes todas las herramientas para responder. En el próximo módulo empezaremos a descubrir estructura en los datos con clustering y reducción de dimensión.
