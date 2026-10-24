# Módulo I6 · Analítica predictiva con series temporales — Guiones de los vídeos

Guiones de las 8 lecciones del módulo. Las marcas entre corchetes son indicaciones de producción: [DIAPOSITIVA N.M-k] remite al identificador de `diapositivas.md`; [PANTALLA], [DEMO] y [CÁMARA] indican qué se ve en cada momento. Las demos se describen, no se narran línea a línea. Extensión orientativa: unas 100 palabras de narración por minuto.

---

## Vídeo 8.1 · Series temporales en la empresa: demanda, ventas, capacidad (duración objetivo: 10 min)

**Objetivo del vídeo:** que el participante entienda qué es una serie temporal, por qué el pronóstico siempre está al servicio de una decisión, y conozca el flujo de trabajo que seguirá durante todo el módulo.

**Material:** diapositivas 8.1-1 a 8.1-6; notebook del módulo, sección 1 (carga y gráfico del CO₂).

### [00:00–01:30] Gancho

[CÁMARA]

Imagina que eres responsable de compras de una cadena de supermercados. Es lunes por la tarde y tienes que decidir cuántos yogures pide cada tienda para el martes. Si pides de más, caducan y los tiras. Si pides de menos, el cliente llega, ve el lineal vacío y quizá no vuelva.

¿Cómo decides? Probablemente miras lo que se vendió las semanas anteriores. Te fijas en si es un martes normal o hay un festivo. Recuerdas que en verano se venden más. Sin saberlo, estás haciendo un pronóstico con una serie temporal.

En este módulo vamos a convertir esa intuición en un método riguroso, que puedas defender delante de un comité y que puedas repetir cada semana.

Y no solo pasa con los yogures. Un hospital que planifica camas para la campaña de gripe, una empresa de software que decide cuántos servidores reservar, un ayuntamiento que prevé el consumo de agua en verano: todos tienen el mismo problema de fondo. Tienen un registro de lo que pasó y necesitan una idea razonable de lo que pasará, con un margen de error honesto.

### [01:30–03:30] Qué es una serie temporal

[DIAPOSITIVA 8.1-1]

Una serie temporal es algo muy sencillo: mediciones de una misma magnitud tomadas a intervalos regulares. Ventas diarias. Pedidos semanales. Consumo eléctrico cada hora. Llamadas al centro de atención cada quince minutos.

Lo que la hace especial es que el orden importa. En los módulos anteriores trabajabas con tablas de clientes o de pacientes, y podías barajar las filas sin perder nada. Aquí no. Si barajas una serie temporal, destruyes justo lo que quieres aprovechar: que lo que pasó ayer dice mucho de lo que pasará mañana.

Quédate con esta idea, porque volverá en la lección de validación. El tiempo tiene una dirección, y nuestros métodos tienen que respetarla.

Fíjate también en la palabra "regulares". Si unas semanas registras las ventas el lunes y otras el jueves, no tienes una serie limpia, tienes un problema de datos. Por eso buena parte del trabajo inicial consiste en dejar la serie con una frecuencia fija: un valor por día, por semana o por mes, sin huecos.

Y otro matiz importante: las ventas registradas no siempre son la demanda. Si un producto se agotó el jueves, el viernes vendiste cero, pero la gente sí quería comprarlo. Si pronosticas con esos ceros, pedirás todavía menos y el problema se agravará. Ojo con eso.

### [03:30–05:30] El horizonte lo dicta la decisión

[DIAPOSITIVA 8.1-2]

Antes de abrir Python, hay que responder una pregunta: ¿para qué decisión es este pronóstico?

Porque de ahí salen el horizonte y la granularidad. Para planificar turnos necesitas un pronóstico diario, o incluso por horas, a una o dos semanas vista. Para negociar con un proveedor, quizá basta un pronóstico mensual a un año. Y para decidir si abres un almacén nuevo, miras años, y lo haces con datos trimestrales o anuales.

Cuanto más lejos miramos, más agregamos y más pesa el juicio experto. Nadie en su sano juicio pronostica ventas diarias a tres años vista. Sería precisión falsa.

[DIAPOSITIVA 8.1-3]

Y hay una confusión muy habitual en las empresas que conviene desterrar ya. Pronóstico, objetivo y plan son tres cosas distintas. El pronóstico dice qué pasará si nada cambia. El objetivo, lo que nos gustaría. El plan, lo que haremos para acercarnos. Si alguien "corrige" el pronóstico para que cuadre con el objetivo, el pronóstico deja de servir para planificar. Mantenlos separados.

### [05:30–07:00] Qué hace predecible una serie

[DIAPOSITIVA 8.1-4]

No todas las series se pueden pronosticar igual de bien. ¿Por qué el consumo eléctrico de mañana se predice con un error pequeño y el precio de una acción no?

Hay cuatro factores. Primero, si entendemos qué mueve la serie: la temperatura explica el consumo. Segundo, si tenemos datos suficientes, idealmente varios ciclos completos. Tercero, si el futuro se parecerá al pasado; un cambio de tarifa o una pandemia rompen los patrones. Y cuarto, si el propio pronóstico altera el resultado: si anuncias que un producto se agotará, la gente corre a comprarlo.

Ten esta lista a mano cuando alguien te pida un pronóstico "con un 2 % de error". A veces la respuesta honesta es que la serie no lo permite.

Piensa ahora en tu propio trabajo. ¿Qué serie te gustaría pronosticar? ¿Cuántos ciclos completos tienes? ¿Ha habido algún cambio que rompa el patrón, como una reorganización comercial o un cambio de sistema informático? Merece la pena hacerse estas preguntas antes de escribir una sola línea de código.

### [07:00–08:45] Demo: la serie del módulo

[DIAPOSITIVA 8.1-5]

[DEMO: notebook, sección 1. Se muestra la carga de los datos semanales de CO₂ con statsmodels, el `resample("MS").mean()` a mensual, el `interpolate()` y la declaración de la frecuencia. Se ejecuta el gráfico y se señala la subida y el vaivén anual.]

Nuestro caso práctico es la concentración de CO₂ medida en Mauna Loa, en Hawái, desde 1958. Un organismo público necesita un pronóstico a dos años con su incertidumbre. ¿Por qué esta serie y no ventas? Porque es pública, larga y limpia, y las técnicas son exactamente las mismas que usarías con la demanda de tu empresa.

Fíjate en dos detalles. Los datos vienen semanales y los agregamos a mensuales con la media, porque es una concentración. Si fueran ventas, usaríamos la suma. Y declaramos la frecuencia mensual, para que las fechas del pronóstico salgan bien. Resultado: 526 meses. Y en el gráfico ya se ve todo lo que vamos a estudiar: una subida de fondo y una oscilación que se repite cada año.

### [08:45–10:00] Resumen y qué viene después

[DIAPOSITIVA 8.1-6]

Este es el mapa del módulo. Visualizar y descomponer. Comprobar la estacionariedad. Partir en el tiempo. Fijar referencias sencillas. Ajustar modelos. Validar con backtesting. Revisar residuos. Y entregar un pronóstico con su intervalo.

Ese último paso merece un comentario. Al final, lo que se entrega no es un modelo, sino una respuesta a la decisión: un número, un rango y una frase que explique cuánto podemos fiarnos. El modelo es solo el medio. A lo largo del módulo te pediré que pienses siempre en quién va a leer tu pronóstico y qué va a hacer con él.

Recuerda las tres ideas de hoy: el orden es información, la decisión manda sobre el horizonte, y un pronóstico sin incertidumbre está incompleto.

[CÁMARA]

En el próximo vídeo abrimos la serie en canal y separamos sus piezas: tendencia, estacionalidad y residuo.

---

## Vídeo 8.2 · Componentes y descomposición (STL) (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante sepa identificar tendencia, estacionalidad y residuo, elegir entre esquema aditivo y multiplicativo, y aplicar e interpretar una descomposición STL.

**Material:** diapositivas 8.2-1 a 8.2-7; notebook, sección 2 (STL del CO₂).

### [00:00–01:30] Gancho

[CÁMARA]

Un director de hotel de costa recibe el informe de agosto: la ocupación ha subido un 5 % respecto a julio. Respira tranquilo. Buen mes.

Pero hay un problema. En ese hotel, agosto siempre supera a julio, y no por un 5 %, sino por un 12 %. Así que, en realidad, el hotel va peor de lo normal para la época. La tendencia de fondo está cayendo, y el informe la ha escondido detrás de la estacionalidad.

En este vídeo vas a aprender a separar esas piezas para no caer en esta trampa.

Este error se comete a diario en informes de ventas, de tráfico web o de audiencias. Comparar un mes con el anterior es tentador porque es fácil, pero mezcla dos cosas: lo que cambia porque el negocio va mejor o peor, y lo que cambia simplemente porque es otra época del año.

### [01:30–04:00] Los tres componentes

[DIAPOSITIVA 8.2-1]

Cuando miras una serie, tu cerebro ya separa varios movimientos sin que se lo pidas. Vamos a ponerles nombre.

La tendencia es la evolución a largo plazo: el crecimiento del negocio, la subida sostenida del CO₂. A veces incluye ciclos largos, como los económicos, que no tienen un periodo fijo.

La estacionalidad es un patrón que se repite con un periodo fijo y conocido. En datos mensuales con ciclo anual, el periodo es 12. En datos diarios de una tienda, 7, porque el sábado no se parece al martes. En datos horarios, 24.

Y el residuo es lo que queda cuando quitas lo anterior. Idealmente, ruido sin estructura. Si en el residuo ves patrones, algo no se ha capturado.

Un ejemplo con datos diarios de una tienda online. La tendencia sería el crecimiento del negocio a lo largo de los meses. La estacionalidad, el patrón de la semana, con los lunes fuertes y los sábados flojos. Y el residuo, el día que alguien famoso mencionó la marca o el día que se cayó la pasarela de pago. Cada pieza tiene una explicación distinta y se gestiona de forma distinta.

### [04:00–06:30] Aditiva o multiplicativa

[DIAPOSITIVA 8.2-2]

¿Cómo se combinan estas piezas? Hay dos formas.

En el esquema aditivo, se suman: tendencia más estacionalidad más residuo. Tiene sentido cuando la oscilación estacional tiene siempre el mismo tamaño, aunque el nivel suba. Por ejemplo, el CO₂ oscila unas seis partes por millón cada año, tanto en 1960 como en 2000.

En el multiplicativo, se multiplican. Piensa en una tienda que vende el triple en diciembre que en febrero. Si en cinco años el negocio se duplica, el pico de diciembre ya no es de mil unidades más, sino de dos mil. La oscilación crece con el nivel.

¿Cómo lo distingues? Mira el gráfico. Si el vaivén se va abriendo como un embudo, es multiplicativo. Y aquí va un truco muy útil: si tomas logaritmos, un producto se convierte en una suma. Así que una serie multiplicativa, en logaritmos, se vuelve aditiva. Lo usarás en el ejercicio 4 con los pasajeros de avión.

Hay casos intermedios: la oscilación crece, pero no tanto como el nivel. Ahí, en lugar del logaritmo, a veces se usa una raíz cuadrada o una transformación de Box-Cox, una familia que incluye ambas. No hace falta que la domines ahora; basta con saber que existe. Y si dudas entre aditivo y multiplicativo, prueba los dos: más adelante verás que el backtesting resuelve la duda de forma objetiva.

### [06:30–09:00] Cómo funciona STL

[DIAPOSITIVA 8.2-3]

El método de descomposición más usado hoy se llama STL. Las siglas vienen del inglés: descomposición en estacionalidad y tendencia usando *loess*, que es un tipo de suavizado local.

La idea es iterativa, como ir puliendo una pieza. Primero estima una tendencia suave recorriendo la serie con una ventana. Se la resta a los datos. Luego, para cada mes, toma los eneros de todos los años y los suaviza; lo mismo con los febreros, y así. Eso da la estacionalidad. Se la resta a los datos originales, vuelve a estimar la tendencia, y repite hasta que todo se estabiliza.

¿Por qué STL y no la descomposición clásica con medias móviles? Por tres motivos. Permite que la estacionalidad cambie poco a poco con los años. No pierde datos al principio y al final de la serie. Y tiene una versión robusta que no se deja arrastrar por valores atípicos, como el día que se cayó el sistema de ventas.

### [09:00–11:30] Demo: STL sobre el CO₂

[DIAPOSITIVA 8.2-4]

[DEMO: notebook, sección 2. Se ejecuta `STL(serie, period=12).fit()` y `stl.plot()`. Se recorren los cuatro paneles: serie original, tendencia, estacionalidad y residuo. Se hace zoom en un par de años de la componente estacional para ver el máximo en mayo y el mínimo en septiembre-octubre.]

Vamos al notebook. Una sola línea: STL con periodo 12. Y cuatro paneles.

Arriba, la serie original. Debajo, la tendencia: una subida casi recta, ligeramente acelerada. Luego la estacionalidad: un ciclo de unas seis partes por millón, con el máximo en mayo y el mínimo a finales del verano. ¿Por qué? Porque la vegetación del hemisferio norte absorbe CO₂ en primavera y verano, cuando crece. Y abajo, el residuo: pequeño y sin patrón visible. Buena señal.

Fíjate en que la descomposición nos cuenta la historia de la serie en un minuto. Eso, en una reunión, vale oro.

Un detalle técnico que conviene conocer: el parámetro `period` le dice a STL cuál es el ciclo. Aquí, doce meses. Si te equivocas, por ejemplo poniendo siete con datos mensuales, STL no protestará: te devolverá una estacionalidad sin sentido. La herramienta no sabe nada de tu negocio; ese conocimiento lo pones tú.

### [11:30–13:30] Cuánta estacionalidad y para qué sirve

[DIAPOSITIVA 8.2-5]

A veces necesitas un número, no un gráfico. Por ejemplo, si tienes tres mil productos y quieres saber cuáles son muy estacionales. Para eso está la fuerza de la estacionalidad: compara la varianza del residuo con la de estacionalidad más residuo. Si el residuo es pequeño en comparación, la fuerza se acerca a uno. Con la tendencia se hace lo mismo. Con estos dos números puedes clasificar todo el catálogo y decidir qué tipo de modelo aplicar a cada grupo.

Imagina una distribuidora de bebidas. Al calcular la fuerza estacional de su catálogo descubre tres grupos: refrescos y cervezas, con estacionalidad muy fuerte en verano; agua mineral, con estacionalidad moderada; y bebidas para hostelería, con poca estacionalidad pero mucha tendencia, porque están creciendo. Cada grupo merece un enfoque distinto, y lo ha descubierto sin mirar tres mil gráficos uno a uno.

[DIAPOSITIVA 8.2-6]

¿Y para qué sirve descomponer en la empresa? Tres usos. Desestacionalizar, que es lo que necesitaba nuestro director de hotel: comparar contra lo normal para la época, no contra el mes anterior. Detectar anomalías: un residuo enorme señala un día raro, una promoción no registrada o un error de datos. Y comunicar: la tendencia limpia se entiende a la primera.

Por cierto, los institutos de estadística, como el INE, publican muchas series corregidas de efectos estacionales y de calendario precisamente por esto: para que el titular compare lo comparable. Cuando leas que el paro ha bajado en términos desestacionalizados, ya sabes qué significa.

### [13:30–15:00] Errores frecuentes, resumen y siguiente paso

[DIAPOSITIVA 8.2-7]

Tres errores para evitar. Elegir mal el periodo: con datos diarios suele haber estacionalidad semanal y anual a la vez, y para eso existe una variante, MSTL. Usar el esquema aditivo cuando la oscilación crece: el residuo te lo chivará con forma de embudo. Y usar STL como si fuera un modelo de pronóstico: describe el pasado, no predice el futuro por sí solo.

Un cuarto error, más de comunicación: presentar la serie desestacionalizada sin explicarlo. Si en una reunión enseñas una línea suave sin decir que le has quitado la estacionalidad, alguien comparará esos números con los del informe mensual y no le cuadrarán. Etiqueta siempre qué estás mostrando.

[CÁMARA]

Resumen: una serie es tendencia, estacionalidad y residuo; si la oscilación crece, multiplicativo o logaritmos; STL es la herramienta de referencia. En el próximo vídeo veremos qué necesita una serie para que un modelo como ARIMA pueda aprender de ella: la estacionariedad.

---

## Vídeo 8.3 · Estacionariedad, diferenciación y autocorrelación (duración objetivo: 20 min)

**Objetivo del vídeo:** que el participante entienda el concepto de estacionariedad, sepa diferenciar una serie, interprete correctamente la prueba ADF y lea los gráficos ACF y PACF para orientar la elección de un modelo.

**Material:** diapositivas 8.3-1 a 8.3-7; notebook, sección 3 (ADF y ACF/PACF).

### [00:00–01:30] Gancho

[CÁMARA]

Supón que quieres predecir la altura de un niño a partir de su altura del año pasado. Fácil: crece unos centímetros al año. Ahora supón que quieres predecir su altura media "a lo largo de toda su vida". No tiene sentido: la media no es estable, cambia cada año.

Con las series temporales pasa lo mismo. Para aprender del pasado, un modelo necesita que algo se mantenga estable en el tiempo. Ese algo tiene nombre: estacionariedad. Es uno de los conceptos que más asusta del módulo, y vas a ver que la idea es muy intuitiva.

### [01:30–04:30] Qué es una serie estacionaria

[DIAPOSITIVA 8.3-1]

Una serie es estacionaria si sus propiedades no cambian con el tiempo. En concreto, tres cosas: la media es constante, la varianza es constante, y la relación entre un valor y el de hace, digamos, tres meses, es la misma en 1970 que en 1995.

Te propongo una prueba visual. Coge el gráfico, tapa el eje horizontal con la mano y elige un tramo cualquiera. Si no puedes adivinar si ese tramo es del principio o del final, probablemente es estacionaria.

Otra forma de verlo: una serie estacionaria tiene una especie de centro de gravedad al que siempre vuelve. Se aleja, pero regresa. Una serie con tendencia no tiene ese centro: se va alejando y no vuelve. Para un modelo la diferencia es enorme. En el primer caso puede aprender cuánto tarda la serie en volver y con qué fuerza. En el segundo, no hay nada estable que aprender.

¿El CO₂ lo es? Claramente no. Si te enseño un tramo en 320 partes por millón, sabes que es de los años sesenta. La tendencia delata la época. Y la estacionalidad también rompe la estacionariedad: la media de mayo no es la de octubre.

¿Y qué series sí lo son? El ruido blanco, por ejemplo. O los cambios diarios de una magnitud que oscila alrededor de un valor fijo.

Un ejemplo de negocio: el porcentaje de pedidos que llegan con retraso en una empresa logística bien gestionada. Oscila semana a semana, pero alrededor de un valor estable, digamos un 3 %. Si un día empieza a subir y no vuelve, la serie ha dejado de ser estacionaria, y eso en sí mismo es una alarma operativa.

¿Por qué nos importa? Porque los modelos ARIMA, que veremos en la lección 8.6, están construidos para series estacionarias. Si no lo es, hay que transformarla primero.

### [04:30–07:30] Diferenciar

[DIAPOSITIVA 8.3-2]

La herramienta para conseguirlo es la diferenciación. En vez de modelar el valor, modelamos el cambio.

La primera diferencia es el valor de este mes menos el del mes anterior. Piensa en unas ventas que suben cien unidades cada mes. La serie original tiene tendencia, pero su diferencia oscila tranquilamente alrededor de cien. Hemos quitado la tendencia.

La diferencia estacional compara con el mismo mes del año anterior: este mayo menos el mayo pasado. Eso elimina el patrón anual. Y se pueden combinar: primero una, luego la otra.

Hagamos un cálculo rápido con el CO₂. En 1960 rondaba las 317 partes por millón; en el año 2000, las 369. El nivel cambia muchísimo. Pero si miras el cambio de un mayo al siguiente, oscila alrededor de una o dos partes por millón durante toda la serie. Ese cambio sí tiene un comportamiento estable, y es lo que vamos a modelar.

Un apunte práctico. Si la oscilación crece con el nivel, toma logaritmos antes de diferenciar. Y aquí hay un regalo: la diferencia de logaritmos es, aproximadamente, la tasa de crecimiento. Un 0,03 significa que la serie ha crecido un 3 %. En negocio, eso se entiende a la primera.

¿Cuántas veces diferenciar? Casi nunca más de una regular y una estacional. Si diferencias de más, introduces patrones artificiales y aumentas el ruido. Más no es mejor.

### [07:30–10:30] La prueba ADF

[DIAPOSITIVA 8.3-3]

¿Cómo sabemos si ya es estacionaria? Además del ojo, tenemos una prueba estadística: Dickey-Fuller aumentada, ADF para los amigos.

Atención a cómo está planteada, porque aquí se equivoca mucha gente. La hipótesis nula es que la serie no es estacionaria. Por tanto, un p-valor pequeño, menor que 0,05, nos permite rechazarla y concluir que sí lo es. Un p-valor grande nos dice que no tenemos evidencia de estacionariedad, y que conviene diferenciar.

¿Cómo funciona por dentro? Sin entrar en la matemática: la ADF ajusta una regresión del cambio de la serie sobre su nivel anterior. Si la serie tiende a volver a su centro, cuando está alta tiende a bajar, y ese coeficiente sale claramente negativo. Si no hay vuelta al centro, el coeficiente está cerca de cero. La prueba mide justo eso.

[DEMO: notebook, sección 3. Se ejecuta el bucle que calcula el p-valor ADF de la serie original, la primera diferencia y la doble diferencia. Se señalan los tres valores en pantalla.]

Veamos el notebook. Serie original: p-valor 0,9989. Prácticamente uno. Ninguna evidencia de estacionariedad, como esperábamos. Primera diferencia: 0,0001. Ya es estacionaria según la prueba. Y con la diferencia estacional añadida, el p-valor es aún menor.

¿Entonces basta con una diferencia? La prueba dice que sí, pero la estacionalidad sigue ahí, y la ACF nos lo va a mostrar. Por eso el modelo del notebook usa ambas diferencias. Las pruebas ayudan, pero no sustituyen a mirar los datos.

Quiero que te quedes con esta actitud: una prueba estadística es un instrumento más, no un oráculo. Con series cortas, la ADF tiene poca potencia y puede no detectar la estacionariedad aunque exista. Con series muy largas, detecta diferencias minúsculas que no importan en la práctica. Combina siempre la prueba con el gráfico y con el sentido común sobre lo que mide la serie.

Una curiosidad: existe otra prueba, la KPSS, que plantea las hipótesis al revés. Usar las dos da una visión más completa.

### [10:30–14:00] Autocorrelación: ACF y PACF

[DIAPOSITIVA 8.3-4]

Pasamos a la herramienta más útil para entender la memoria de una serie: la autocorrelación.

La idea es sencilla. Coges la serie y la desplazas un mes. ¿Cuánto se parece a la original? Eso es la autocorrelación de orden uno. La desplazas dos meses: orden dos. Y así hasta, por ejemplo, 36. Si representas todas esas correlaciones en un gráfico de barras, tienes la ACF.

La PACF, la autocorrelación parcial, responde a una pregunta más fina: ¿aporta algo el valor de hace tres meses, una vez que ya conozco los de hace uno y dos? Descuenta el efecto de los retardos intermedios.

Hagamos un ejemplo mental con las ventas mensuales de helados. La correlación con el mes anterior será alta: julio se parece a junio. Con el retardo seis será negativa: enero es lo opuesto a julio. Y con el retardo doce, otra vez alta: julio se parece al julio anterior. Esa forma de onda en la ACF ya te está gritando "estacionalidad anual".

En ambos gráficos verás una banda sombreada. Las barras que quedan dentro son compatibles con cero. Las que se salen, son señales.

[DIAPOSITIVA 8.3-5]

¿Cómo se leen? Una ACF que baja muy despacio, barra a barra, indica tendencia: hay que diferenciar. Picos en 12, 24 y 36 indican estacionalidad anual. Y, ya sobre la serie diferenciada, hay dos patrones clásicos. Si la PACF se corta de golpe tras el retardo p y la ACF decae poco a poco, pensamos en un modelo autorregresivo de orden p. Si es al revés, la ACF se corta en q, pensamos en una media móvil de orden q. Lo entenderás mejor cuando veamos ARIMA; por ahora, quédate con que estos gráficos orientan la elección.

No te obsesiones con encontrar el patrón perfecto. Con datos reales, los correlogramas rara vez son de libro. Lo habitual es que sugieran dos o tres modelos candidatos, y la decisión final la tomas comparándolos, como veremos en la lección 8.6 y en el ejercicio 3.

### [14:00–17:00] Demo: la ACF del CO₂

[DIAPOSITIVA 8.3-6]

[DEMO: notebook, sección 3. Se muestran los gráficos ACF y PACF de la serie doblemente diferenciada con 36 retardos. Se señalan con el cursor el pico negativo en el retardo 1 y el pico en el retardo 12. Se compara brevemente, si da tiempo, con la ACF de la serie original para ver el decaimiento lento.]

Volvemos al notebook. Estos son los correlogramas de la serie con las dos diferencias.

¿Qué vemos en la ACF? Un pico negativo claro en el retardo 1. Luego casi todo dentro de la banda. Y otro pico marcado en el retardo 12. ¿Qué nos dice? El pico en 1 sugiere un término de media móvil regular. El pico en 12, un término de media móvil estacional.

Guarda esta imagen, porque en la lección 8.6 vamos a ajustar un SARIMA con exactamente esos ingredientes. No es magia: es leer la memoria de la serie.

Si comparas con la ACF de la serie original, verás algo muy distinto: barras altísimas que bajan muy despacio. Esa es la firma de la tendencia.

**Ejemplo de negocio.** Imagina un centro de atención telefónica con datos diarios. La ACF muestra picos en 7, 14 y 21: patrón semanal. La PACF, un pico en 1: un día con muchas llamadas suele ir seguido de otro igual, por ejemplo durante una incidencia. Ambos patrones deben estar en el modelo con el que se planifica la plantilla.

### [17:00–18:45] Errores frecuentes

[DIAPOSITIVA 8.3-7]

Cuatro errores que verás una y otra vez. Leer la ADF al revés: un p-valor alto no significa estacionaria. Mirar la ACF de la serie original para elegir un ARIMA: primero se diferencia. Sobrediferenciar: si tras diferenciar ves un pico cercano a menos 0,5 en el retardo 1, probablemente sobraba una diferencia. Y el más tonto, pero el más frecuente: olvidar quitar los valores vacíos que aparecen al principio al diferenciar.

Y uno más, conceptual: pensar que la estacionariedad es un fin en sí misma. No lo es. Es un requisito técnico de algunos modelos. Holt-Winters, por ejemplo, trabaja directamente con la serie original, con su tendencia y su estacionalidad. Lo que importa al final es que el pronóstico sea bueno, y eso lo medirás con el backtesting.

### [18:45–20:00] Resumen y siguiente paso

[CÁMARA]

Recapitulemos. Estacionaria significa que la media, la varianza y la memoria son estables. Diferenciar quita tendencia y estacionalidad. En la ADF, p-valor pequeño es estacionaria. Y la ACF y la PACF nos cuentan cuánta memoria tiene la serie y de qué tipo.

Si te ha parecido mucha teoría, no te preocupes: en la práctica todo esto se reduce a tres gestos que repetirás con cualquier serie. Mirar el gráfico. Ejecutar la ADF antes y después de diferenciar. Y echar un vistazo a la ACF para saber si queda estacionalidad o memoria por capturar.

En el próximo vídeo, antes de ajustar ningún modelo sofisticado, haremos algo que muchos se saltan y que es imprescindible: fijar las referencias ingenuas.

---

## Vídeo 8.4 · Métodos de referencia: ingenuo, estacional, deriva (duración objetivo: 10 min)

**Objetivo del vídeo:** que el participante sepa construir los cuatro métodos de referencia, interprete sus errores y adopte el hábito de exigir que cualquier modelo los supere.

**Material:** diapositivas 8.4-1 a 8.4-6; notebook, secciones 4, 5 y 8.

### [00:00–01:15] Gancho

[CÁMARA]

Un equipo de datos presenta orgulloso su nuevo modelo de demanda para una cadena de ropa: un 18 % de error. Tras semanas de trabajo. El director de operaciones levanta la mano y pregunta: "¿Y si simplemente pedimos lo mismo que la temporada pasada?". Silencio en la sala. Nadie lo había calculado.

Lo calculan esa tarde: 19 % de error. Un punto de mejora, por un modelo que hay que mantener, explicar y vigilar. ¿Merece la pena? Hoy aprendemos a hacer esa pregunta antes que nadie.

### [01:15–02:30] La pregunta incómoda

[DIAPOSITIVA 8.4-1]

Antes de cualquier modelo, pregúntate: ¿qué error cometería la regla más tonta posible? Si tu modelo no la mejora con claridad, no aporta valor, por elegante que sea.

En series temporales, estas reglas sencillas son sorprendentemente difíciles de batir. Y una condición importante: se calculan solo con los datos de entrenamiento, igual que los modelos. Nada de mirar el test.

Y no es una exageración académica. En las grandes competiciones de pronóstico, como las organizadas por Spyros Makridakis, los métodos ingenuos se incluyen siempre como referencia, y bastantes métodos sofisticados han quedado por debajo de ellos. Si les pasa a equipos de investigación, nos puede pasar a nosotros.

### [02:30–05:00] Los cuatro métodos

[DIAPOSITIVA 8.4-2]

Vamos con las cuatro referencias del notebook.

El ingenuo: todo el futuro es igual al último valor observado. Parece absurdo, pero en series como los tipos de cambio es muy difícil mejorarlo.

El ingenuo estacional: cada mes futuro repite el mismo mes del año anterior. "Este agosto será como el pasado". Es la referencia natural para cualquier serie con estacionalidad.

La deriva: une con una recta la primera y la última observación y la prolonga. Es suponer que seguimos creciendo al ritmo medio histórico.

Y la estacional más deriva: el mismo mes del año anterior más la subida media de un año a otro. Combina las dos ideas y, cuando la tendencia y la estacionalidad son estables, es una referencia muy exigente.

Fíjate en que ninguno de los cuatro necesita estimar nada complicado. Se calculan en segundos, para una serie o para un millón. No hay excusa para no tenerlos siempre en la tabla de resultados.

[DIAPOSITIVA 8.4-3]

[DEMO: notebook, secciones 4 y 5. Se muestra la partición de los últimos 24 meses como test y el cálculo de las cuatro referencias con `np.repeat`, `np.tile` y la subida anual. Se destaca que todo usa `train`.]

En el notebook son cuatro líneas de NumPy. Fíjate en que todas usan solo el conjunto de entrenamiento: los últimos 24 meses quedan reservados para evaluar.

### [05:00–07:30] Qué nos dicen los resultados

[DIAPOSITIVA 8.4-4]

[DEMO: notebook, sección 8. Se muestra la tabla de MAE y MAPE ordenada.]

Ahora la tabla de resultados en el test de 24 meses. El ingenuo se equivoca de media 2,4 partes por millón. La deriva y el ingenuo estacional, en torno a 1,9. Y el estacional más deriva baja de golpe a 0,56.

¿Qué nos cuenta esto? Cada referencia captura una pieza: la deriva, la tendencia; el estacional, el ciclo. Solo cuando juntamos ambas el error se desploma. En esta serie, la tendencia pesa muchísimo.

Y ahora sí podemos juzgar los modelos. SARIMA, 0,36. Holt-Winters, 0,24. Ambos mejoran a la mejor referencia, así que aportan valor de verdad.

Una observación sobre la columna del MAPE: todos los errores son inferiores al 1 %. ¿Significa eso que todos los métodos son buenos? No. El CO₂ es un número grande, alrededor de 370, que se mueve poco en relación con su nivel. Un MAPE bajo aquí no dice mucho por sí solo. Por eso comparamos con referencias y no con un umbral fijo del tipo "menos de un 5 % es bueno".

[DIAPOSITIVA 8.4-5]

Para comunicarlo, usa el *skill score*: uno menos el error del modelo dividido entre el de la referencia. Holt-Winters frente a estacional más deriva da 0,57. Es decir, "un 57 % menos de error que la mejor regla sencilla". Eso lo entiende cualquier comité. Si el *skill* sale negativo, el modelo es peor que la referencia.

### [07:30–09:00] Por qué son imprescindibles

[DIAPOSITIVA 8.4-6]

Cuatro razones para no saltarte nunca este paso. Dan escala al error: 0,36 no significa nada solo; "35 % mejor que la referencia", sí. Detectan modelos inútiles, como en la cadena de ropa. Detectan errores de código: si tu modelo es mucho peor que el ingenuo, probablemente hay un desfase de fechas o una fuga. Y son explicables: "lo del año pasado más un 3 %" lo entiende todo el mundo.

Un último consejo: compara siempre con la referencia adecuada. En una serie estacional, ganar al ingenuo simple no tiene mérito.

Y otro consejo, de proceso: incluye las referencias en todos tus informes de pronóstico, no solo en el primero. Si un mes el modelo pierde contra el ingenuo estacional, es una señal temprana de que algo ha cambiado en la serie o en los datos de entrada. Las referencias funcionan como un testigo que vigila al modelo.

### [09:00–10:00] Resumen y siguiente paso

[CÁMARA]

En resumen: referencias primero, calculadas solo con el entrenamiento; para series estacionales, como mínimo el ingenuo estacional; expresa la mejora en porcentaje; y si el modelo no gana, quédate con la referencia.

En el próximo vídeo conocemos al primer modelo que sí bate a nuestras referencias: el suavizado exponencial y su versión estacional, Holt-Winters.

---

## Vídeo 8.5 · Suavizado exponencial y Holt-Winters (duración objetivo: 20 min)

**Objetivo del vídeo:** que el participante entienda la lógica del suavizado exponencial, interprete los parámetros α, β y γ, distinga entre las variantes aditiva, multiplicativa y amortiguada, y sepa ajustar Holt-Winters en statsmodels.

**Material:** diapositivas 8.5-1 a 8.5-8; notebook, secciones 6 y 9; ejercicio 2.

### [00:00–01:30] Gancho

[CÁMARA]

Una empresa de material de oficina tiene que pronosticar cada mes la demanda de tres mil referencias. Bolígrafos, tóner, carpetas. No tiene un ejército de analistas para revisar tres mil modelos. Necesita algo rápido, estable, que se adapte solo a los cambios y que casi siempre mejore a "lo mismo que el año pasado".

Esa descripción encaja como un guante con la familia de métodos de hoy: el suavizado exponencial. Tiene más de sesenta años y sigue siendo uno de los caballos de batalla del pronóstico en la industria.

Y, de paso, es la base de muchas herramientas de planificación de la demanda. Cuando un programa de gestión ofrece un "pronóstico automático", con frecuencia hay un suavizado exponencial por debajo. Entenderlo te permitirá saber qué hace esa caja negra y cuándo fiarte de ella.

### [01:30–04:00] La idea: pesos que se desvanecen

[DIAPOSITIVA 8.5-1]

Piensa en los dos extremos que ya conoces. El método ingenuo usa solo el último dato: olvida todo lo demás. La media histórica usa todos los datos, pero da el mismo peso a lo que pasó hace diez años que a lo de ayer.

Ninguno parece sensato. Lo razonable es algo intermedio: usar todo el pasado, pero dando más peso a lo reciente. Y que ese peso se vaya desvaneciendo poco a poco hacia atrás, como el eco de un sonido. Eso es exactamente el suavizado exponencial: los pesos decrecen de forma exponencial.

### [04:00–07:00] Suavizado exponencial simple

[DIAPOSITIVA 8.5-2]

La versión más sencilla, para una serie sin tendencia ni estacionalidad, mantiene un único número: el nivel. Cada vez que llega un dato nuevo, el nivel se actualiza con un promedio ponderado: alfa por el dato nuevo, más uno menos alfa por el nivel anterior. Y el pronóstico, para cualquier horizonte, es ese nivel.

Alfa está entre cero y uno, y es el mando que controla la memoria. Mira la tabla. Con alfa 0,8, el dato de hoy pesa un 80 % y el de hace cinco periodos, prácticamente nada. El modelo reacciona muy rápido, pero también es nervioso: se cree cualquier pico. Con alfa 0,2, el dato de hoy pesa un 20 % y el de hace cinco periodos aún cuenta. El modelo es suave, pero lento en reaccionar a un cambio real.

¿Cuál elegir? Ninguno a ojo. Statsmodels estima alfa buscando el valor que minimiza el error de las predicciones un paso adelante en el entrenamiento. Tú interpretas el resultado.

Un ejemplo numérico. Supón que el nivel actual es 100 y alfa vale 0,2. Llega un dato de 150. El nuevo nivel será 0,2 por 150 más 0,8 por 100: 110. El modelo se ha movido, pero con cautela; un solo dato raro no le hace perder la cabeza. Si alfa fuera 0,8, el nuevo nivel sería 140. Mucho más reactivo. ¿Cuál es mejor? Depende de si ese 150 era un pico puntual o el inicio de un cambio real. Y eso es justo lo que el ajuste aprende de la historia.

Y ahora piensa en tu negocio. ¿Tus datos tienen muchos picos puntuales, por promociones o incidencias? Entonces un alfa bajo evitará que el modelo sobrerreaccione. ¿Cambian de nivel con frecuencia, por ejemplo porque entran y salen clientes grandes? Entonces te interesa un alfa más alto. El ajuste lo estima, pero entender qué significa te ayuda a detectar cuándo el resultado no tiene sentido.

### [07:00–09:30] Holt: añadir la tendencia

[DIAPOSITIVA 8.5-3]

Si la serie tiene tendencia, un nivel plano se quedará siempre atrás. Holt añadió una segunda pieza: la pendiente. Ahora hay dos ecuaciones. El nivel se actualiza como antes, pero teniendo en cuenta que esperábamos que creciera. Y la pendiente también se suaviza, con su propio parámetro, beta.

El pronóstico es una recta: el nivel actual más h veces la pendiente.

Y aquí aparece un problema práctico. Extrapolar una recta para siempre suele ser demasiado optimista. ¿De verdad crees que un producto que crece un 20 % al año seguirá así durante cinco años? Para eso existe la tendencia amortiguada: un parámetro phi, algo menor que uno, que va aplanando la pendiente a medida que miramos más lejos. En la práctica, es una de las opciones por defecto más fiables en pronóstico de negocio.

En el ejercicio 2 lo probarás con el CO₂. Verás que el modelo estima un phi de 0,995, prácticamente uno. Es decir, decide por sí solo que apenas hay que amortiguar, porque los datos muestran una tendencia que no se frena. Buena noticia: el modelo no impone la amortiguación, la estima.

### [09:30–12:30] Holt-Winters: añadir la estacionalidad

[DIAPOSITIVA 8.5-4]

El paso final lo dio Peter Winters en 1960: añadir una tercera pieza para la estacionalidad, con su parámetro gamma. Cada mes del año tiene su propio índice estacional, que también se va actualizando.

No te asustes con las ecuaciones. La lógica es siempre la misma: cada componente es un promedio entre lo que sugiere el dato nuevo y lo que creíamos antes. Alfa, beta y gamma deciden cuánto creemos al dato nuevo en el nivel, la tendencia y la estacionalidad.

Y esto responde a una de las preguntas de la autoevaluación: ¿qué controla la velocidad con la que el modelo olvida el pasado? Exactamente estos tres parámetros. Cuanto más altos, más peso para lo reciente.

Un detalle práctico: los valores iniciales. Para arrancar, el modelo necesita un nivel, una pendiente y doce índices estacionales de partida, y statsmodels también los estima. Por eso conviene tener al menos dos o tres ciclos completos de datos. Con menos, la estacionalidad de partida es poco fiable y el pronóstico lo hereda.

[DIAPOSITIVA 8.5-5]

Igual que en la descomposición, hay versión aditiva y multiplicativa. En la aditiva, mayo suma, digamos, tres partes por millón. En la multiplicativa, diciembre multiplica por 1,35. La aditiva encaja con el CO₂, cuya oscilación es estable. La multiplicativa, con unas ventas que crecen y cuyo pico de Navidad crece con ellas. Una limitación: la multiplicativa necesita valores positivos, así que no sirve para series con ceros, como un artículo que muchas semanas no se vende.

¿Cómo elegir? Ya conoces la pista visual: si la oscilación crece con el nivel, multiplicativa. Pero la respuesta definitiva te la da la evaluación. En el ejercicio 4, con los pasajeros de avión, verás que la versión multiplicativa gana con claridad en el backtesting. En el CO₂, en cambio, ambas quedan empatadas, porque la oscilación apenas cambia.

### [12:30–16:00] Demo: Holt-Winters en el notebook

[DIAPOSITIVA 8.5-6]

[DEMO: notebook, sección 6. Se ejecuta `ExponentialSmoothing(train, trend="add", seasonal="add", seasonal_periods=12).fit()` y se muestran `hw.params` (alpha, beta, gamma). Después, sección 8: tabla de comparación y gráfico del pronóstico frente al real. Por último, sección 9: tabla de backtesting, señalando la columna de Holt-Winters.]

Vamos al notebook. Una línea para ajustar: tendencia aditiva, estacionalidad aditiva, periodo 12. Otra para pronosticar 24 meses.

Si miras los parámetros estimados, verás los valores de alfa, beta y gamma que ha elegido el ajuste. Interprétalos con la tabla de antes: cuanto más alto, más rápido olvida.

¿Y cómo lo hace? En el test de 24 meses, Holt-Winters es el mejor de todos: un error medio de 0,24 partes por millón. En el gráfico, su línea casi se pega a la real.

Pero no cantemos victoria con un solo corte. En el backtesting de la sección 9, que repite la evaluación siete veces, su error medio es 0,45, prácticamente empatado con SARIMA. Lo veremos con calma en la lección de validación. La lección aquí es que un único test puede exagerar diferencias.

En el ejercicio 2 probarás dos variantes: estacionalidad multiplicativa y tendencia amortiguada. Adelanto: en el CO₂ ninguna mejora de forma apreciable. Y entender por qué es parte del ejercicio.

### [16:00–18:00] La familia ETS

[DIAPOSITIVA 8.5-7]

Hoy el suavizado exponencial tiene una formulación estadística moderna: los modelos ETS, de error, tendencia y estacionalidad. Cada modelo se describe con tres elecciones: si el error es aditivo o multiplicativo; si la tendencia no existe, es aditiva o amortiguada; y si la estacionalidad no existe, es aditiva o multiplicativa.

Piensa en esas tres elecciones como en los mandos de un ecualizador. Con dos opciones para el error, tres para la tendencia y tres para la estacionalidad, salen hasta dieciocho combinaciones. Algunas son inestables en la práctica y se descartan, pero quedan suficientes para cubrir la mayoría de las series de negocio.

¿Qué ganamos? Dos cosas muy prácticas. Intervalos de predicción con base probabilística. Y selección automática: el ordenador prueba todas las combinaciones y elige la mejor por AIC. Así resolvemos el problema de las tres mil referencias del principio: un ETS automático por referencia, con revisión humana solo de las que más error o más valor tienen.

Y una curiosidad que conecta con el siguiente vídeo: algunos modelos de esta familia son matemáticamente equivalentes a ciertos ARIMA. Por ejemplo, el suavizado exponencial simple equivale a un ARIMA cero, uno, uno. Las dos familias no son rivales: son primas.

### [18:00–19:00] Errores frecuentes

[DIAPOSITIVA 8.5-8]

Cuatro tropiezos habituales. Estacionalidad aditiva con oscilaciones que crecen, o al revés: compara ambas en el backtesting. Fijar alfa a ojo: deja que se estime. Esperar que Holt-Winters anticipe un cambio de régimen: solo extrapola lo reciente. Y usar la versión multiplicativa con ceros.

Y uno más sutil: comparar Holt-Winters con SARIMA en un único test y quedarse con el ganador sin mirar el backtesting. Ya has visto que el orden puede cambiar.

### [19:00–20:00] Resumen y siguiente paso

[CÁMARA]

En resumen: el suavizado exponencial pondera el pasado con pesos que se desvanecen; alfa, beta y gamma controlan la velocidad de olvido; aditivo o multiplicativo según la oscilación; y la tendencia amortiguada es una apuesta prudente.

Y una reflexión final: no subestimes un método por ser antiguo. En competiciones internacionales de pronóstico, combinaciones de modelos de suavizado exponencial han quedado por delante de propuestas mucho más complejas. Lo sencillo, bien validado, suele ganar.

En el próximo vídeo vemos la otra gran familia de modelos clásicos, que en lugar de componentes modela la memoria de la serie: ARIMA y SARIMA.

---

## Vídeo 8.6 · Modelos ARIMA y SARIMA (duración objetivo: 20 min)

**Objetivo del vídeo:** que el participante entienda las piezas AR, I y MA, lea la notación SARIMA, sepa elegir órdenes con ACF/PACF y AIC, ajuste el modelo en statsmodels e interprete coeficientes, residuos e intervalos.

**Material:** diapositivas 8.6-1 a 8.6-8; notebook, secciones 7, 8 y 10; ejercicios 1 y 3.

### [00:00–01:30] Gancho

[CÁMARA]

Una distribuidora eléctrica tiene que comprar energía a plazo para el año que viene. Si compra de menos, tendrá que acudir al mercado diario, más caro y volátil. Si compra de más, revenderá con pérdidas. Lo que necesita no es un número, sino un rango: "con un 80 % de probabilidad, el consumo estará entre esto y esto". Así cubre con contratos la parte segura y deja el resto al mercado.

Para eso necesita un modelo que dé intervalos con fundamento estadístico. Hoy conocemos uno de los más usados en el mundo: SARIMA.

¿Por qué SARIMA es tan popular? Porque es flexible, tiene una teoría estadística sólida detrás, da intervalos de predicción y está disponible en prácticamente cualquier herramienta: Python, R o el software estadístico comercial que quizá ya uses en tu empresa.

### [01:30–05:00] Las tres piezas

[DIAPOSITIVA 8.6-1]

El nombre ARIMA da miedo, pero son tres piezas que ya intuyes.

AR, autorregresivo. El valor de hoy depende de los valores de los días anteriores. Es una regresión de la serie sobre su propio pasado. Ejemplo: si hoy hay muchas incidencias abiertas en soporte, mañana también habrá muchas.

En el CO₂, la parte autorregresiva captura algo así: si este mes el cambio ha sido algo mayor de lo habitual, el próximo probablemente también lo será un poco.

I, de integrado. Es la diferenciación de la lección 8.3. Diferenciamos d veces para hacer la serie estacionaria, modelamos los cambios y, al pronosticar, el modelo deshace la diferencia para devolvernos valores en la escala original.

MA, media móvil. Aquí el valor de hoy depende de los errores de predicción recientes, de las sorpresas. Ejemplo: una promoción que no estaba registrada dispara las ventas un mes y deja un pequeño efecto el siguiente. Ese *shock* se disipa en pocos periodos.

Un ejemplo con números. Si el coeficiente de media móvil vale 0,5 y este mes las ventas superaron en cien unidades lo previsto, el modelo sumará cincuenta unidades a la previsión del mes que viene. Y al mes siguiente, ese efecto ya habrá desaparecido. Es la memoria corta de las sorpresas.

Cuidado con el nombre: esta media móvil no tiene nada que ver con la media móvil para suavizar un gráfico. Mismo nombre, conceptos distintos. Una trampa clásica.

[DIAPOSITIVA 8.6-2]

Juntas, sobre la serie diferenciada: una constante, más p términos del pasado de la serie, más q términos de errores pasados, más el error de hoy. Fíjate en la diferencia de enfoque con Holt-Winters: allí modelábamos componentes; aquí modelamos la autocorrelación, la memoria.

### [05:00–07:30] SARIMA: la capa estacional

[DIAPOSITIVA 8.6-3]

En datos de negocio, el mes de hoy no solo se parece al anterior, sino también al mismo mes del año pasado. SARIMA añade una segunda capa con la misma estructura, pero sobre retardos estacionales: 12, 24, 36.

La notación tiene dos paréntesis. El primero, p, d, q, es la parte regular. El segundo, P, D, Q mayúsculas, con el subíndice m, es la parte estacional.

Un caso famoso: cero, uno, uno por cero, uno, uno, doce. Se llama el "modelo de las aerolíneas", porque Box y Jenkins lo usaron con datos de pasajeros aéreos, los mismos del ejercicio 4. Con solo dos parámetros funciona sorprendentemente bien en muchas series mensuales.

Para que se vea claro, piensa en lo que hace cada parte en el modelo del notebook. La diferencia estacional compara cada mes con el mismo mes del año anterior. La diferencia regular quita lo que queda de tendencia. El término de media móvil estacional corrige el pronóstico de este mayo con el error que cometimos el mayo pasado. Y los términos regulares afinan con lo que ha pasado en los últimos meses.

### [07:30–11:00] Demo: el SARIMA del notebook

[DIAPOSITIVA 8.6-4]

[DEMO: notebook, sección 7. Se ejecuta el ajuste de `SARIMAX(train, order=(1, 1, 1), seasonal_order=(0, 1, 1, 12))` y se muestra la tabla de coeficientes. Se señalan las columnas coef, P>|z| y el intervalo.]

El notebook ajusta un uno, uno, uno por cero, uno, uno, doce. ¿De dónde sale? De lo que vimos en la lección 8.3: la ADF pedía una diferencia regular y otra estacional; la ACF mostraba picos en los retardos 1 y 12, firma de términos de media móvil regular y estacional. Le añadimos un término autorregresivo.

Leamos la tabla. El coeficiente autorregresivo, 0,28. El de media móvil, menos 0,60. Y el de media móvil estacional, menos 0,85. Los tres con p-valores pequeños: aportan.

¿Qué significa ese menos 0,85? Un valor cercano a menos uno indica que el patrón estacional es muy estable: el modelo apenas necesita corregir la estacionalidad de un año para otro. Tiene sentido: el ciclo de la vegetación no cambia mucho.

Y un aviso importante: estos coeficientes describen la dinámica de la serie, no son efectos causales. No te dicen por qué sube el CO₂.

### [11:00–14:00] Cómo elegir los órdenes

[DIAPOSITIVA 8.6-5]

¿Cómo se elige un modelo en general? Cinco pasos. Uno: si la varianza crece, logaritmos. Dos: elegir d y D con la ADF y el gráfico. Tres: proponer p, q, P y Q mirando la ACF y la PACF de la serie diferenciada. Cuatro: comparar candidatos con el AIC. Cinco: validar con backtesting y revisar residuos.

Te pongo un ejemplo de cómo razonarías con una serie nueva. Ventas mensuales de una cadena de ferreterías. El gráfico muestra crecimiento y un pico en primavera. La ADF de la serie original da un p-valor alto; con una diferencia regular y otra estacional, bajo. La ACF de la serie diferenciada tiene un pico en 1 y otro en 12. Candidatos razonables: el modelo de las aerolíneas y un par de variantes con un término autorregresivo más. Los ajustas, comparas AIC, haces backtesting de los mejores y revisas residuos. Ese es todo el proceso.

El AIC, criterio de información de Akaike, premia el buen ajuste y penaliza la complejidad: cada parámetro extra cuesta. Menor es mejor. Pero tiene una letra pequeña importante: solo puedes comparar modelos con las mismas diferencias y la misma transformación. Comparar el AIC de una serie en logaritmos con el de la serie original no tiene sentido.

Y otra advertencia, que comprobarás en el ejercicio 3: el mejor AIC no tiene por qué ser el que mejor pronostica. En el CO₂, el modelo del notebook tiene el mejor AIC de los 36 que probarás, pero en el backtesting le gana el modelo de las aerolíneas, más sencillo. El AIC mide el ajuste un paso adelante dentro de la muestra; el backtesting, lo que de verdad nos importa. Usa el AIC para filtrar y el backtesting para elegir.

Verás algo más en ese ejercicio: todos los modelos sin parte estacional quedan muy atrás, con un AIC de casi 500 frente a unos 250 de los mejores. En esta serie, la estacionalidad no es opcional.

Existen procedimientos automáticos, como AutoARIMA, que hacen esta búsqueda por ti. Son útiles, sobre todo con muchas series, pero entiende lo que hacen.

### [14:00–17:00] Residuos e intervalos

[DIAPOSITIVA 8.6-6]

[DEMO: notebook, sección 10. Se ejecuta `sarima.plot_diagnostics()` y se recorren los cuatro paneles: residuos estandarizados, histograma con densidad, Q-Q y correlograma. Después, sección 8: gráfico del pronóstico con la banda del IC 95 %.]

[DIAPOSITIVA 8.6-7]

Ajustar no es el final. Si el modelo ha capturado toda la estructura, lo que queda, los residuos, debería ser ruido blanco: sin tendencia, con varianza estable y sin autocorrelación.

Piensa en los residuos como en lo que el modelo no ha sabido explicar. Si en ellos aún se ve un patrón, por ejemplo un pico cada doce meses, el modelo se ha dejado algo por el camino, y ese algo es información gratis que podrías aprovechar.

El notebook lo comprueba con cuatro gráficos. Residuos en el tiempo: oscilan alrededor de cero sin patrón. Histograma y gráfico Q-Q: cercanos a la normal. Y el correlograma: barras dentro de la banda. Si quedara autocorrelación, significaría que hay información que el modelo no ha usado. La prueba de Ljung-Box formaliza esto último: un p-valor alto es buena noticia.

[DIAPOSITIVA 8.6-8]

Y llegamos a los intervalos. En el gráfico del pronóstico, la banda sombreada es el intervalo del 95 %. ¿Ves cómo se abre? Se ensancha con el horizonte. ¿Por qué? Porque para predecir el mes 2 usamos la predicción del mes 1, que ya es incierta; para el mes 3, la del 2, y así. Los errores se acumulan. En el ejercicio 1, con toda la serie, verás que el intervalo pasa de unas 0,6 partes por millón arriba o abajo en el primer mes a 1,8 a los dos años.

Moraleja para el informe: comunica el intervalo del horizonte que se va a usar, no el del primer mes.

Y un matiz importante: el intervalo cubre la incertidumbre que el modelo conoce, la del ruido. No cubre que el propio modelo esté mal elegido ni que llegue un cambio de régimen. Por eso, en la práctica, los intervalos suelen quedarse algo cortos. Si en el backtesting ves que el valor real se sale del intervalo del 95 % mucho más de una vez de cada veinte, tus intervalos son demasiado optimistas y conviene decirlo.

### [17:00–18:45] Ejemplo de negocio y errores frecuentes

[CÁMARA]

Volvamos a la distribuidora eléctrica. Con el SARIMA y su intervalo del 80 %, cubre con contratos a plazo hasta el límite inferior, la parte casi segura del consumo, y deja la incertidumbre restante al mercado diario. El intervalo se convierte directamente en una decisión de compra.

Y fíjate en por qué el intervalo vale dinero. Sin él, la distribuidora tendría que elegir entre comprar el pronóstico central, arriesgándose a quedarse corta la mitad de las veces, o comprar de más "por si acaso", sin saber cuánto. Con el intervalo, el margen de seguridad deja de ser una corazonada y pasa a ser una cifra que se puede discutir y auditar.

Errores frecuentes: comparar AIC entre modelos con distintas diferencias; elegir solo por AIC; ignorar los residuos; e interpretar los coeficientes como causas.

### [18:45–20:00] Resumen y siguiente paso

Resumen: AR usa el pasado de la serie, MA los errores pasados, I diferencia; SARIMA añade una capa estacional; los órdenes se eligen con ADF, ACF, PACF y AIC, y se validan con backtesting y residuos; y los intervalos se abren con el horizonte.

Ya tenemos dos modelos que baten a las referencias. Pero, ¿cómo estamos seguros de que no nos engañamos al evaluarlos? En el próximo vídeo, validación temporal y métricas.

---

## Vídeo 8.7 · Validación temporal y métricas (MAE, MAPE) (duración objetivo: 15 min)

**Objetivo del vídeo:** que el participante evite la fuga de información en la evaluación, sepa implementar un backtesting de origen móvil y elija la métrica de error adecuada al problema de negocio.

**Material:** diapositivas 8.7-1 a 8.7-8; notebook, secciones 4, 8 y 9; ejercicios 2 y 3.

### [00:00–01:30] Gancho

[CÁMARA]

Un proveedor te enseña su herramienta de pronóstico: un 3 % de error en sus pruebas. La contratas. Tres meses después, en producción, el error real ronda el 15 %. ¿Qué ha pasado?

Casi siempre, lo mismo: en las pruebas, el modelo vio información del futuro sin que nadie se diera cuenta. Hoy vamos a aprender a no caer en esa trampa, y a detectarla cuando otros caen. Probablemente es la lección más importante del módulo.

### [01:30–04:00] Por qué no sirve la partición aleatoria

[DIAPOSITIVA 8.7-1]

En los módulos de regresión y clasificación separabas al azar un 20 % de las filas para el test. En series temporales eso es un error grave.

Piénsalo: si mezclas al azar, el modelo puede entrenar con datos de marzo y "predecir" febrero. Conoce lo que vino después. Es como hacer un examen con las respuestas de la semana siguiente. La nota sale espectacular, pero en el mundo real nunca tendrás esa ventaja.

La regla es sencilla: el entrenamiento siempre es anterior a la prueba. Y no solo para el modelo: cualquier cosa que "aprenda" de los datos, como un escalado, una imputación o una selección de variables, se calcula solo con el pasado.

Hay fugas más sutiles que la partición aleatoria. Por ejemplo, normalizar la serie con la media de todo el periodo, o calcular una media móvil centrada, que usa valores posteriores al día que quieres predecir. Parecen detalles inocentes, pero cuelan información del futuro en el pasado.

[DIAPOSITIVA 8.7-2]

[DEMO: notebook, sección 4. Se muestra la partición `serie[:-H]`, `serie[-H:]` con H = 24 y las funciones `mae` y `mape`.]

En el notebook, la partición es una línea: todo menos los últimos 24 meses para entrenar; los últimos 24, para evaluar.

### [04:00–08:00] Backtesting de origen móvil

[DIAPOSITIVA 8.7-3]

Pero una única partición tiene un problema: depende del azar del corte. Si los dos últimos años fueron raros, la conclusión también lo será.

La solución es el backtesting de origen móvil. Simulamos lo que habría pasado si hubiéramos usado el modelo cada año. Nos colocamos en diciembre de 1994, entrenamos con todo lo anterior y pronosticamos 1995. Luego avanzamos a diciembre de 1995, reentrenamos con un año más y pronosticamos 1996. Y así hasta el año 2000. Siete evaluaciones en lugar de una.

La ventana puede ser expansiva, acumulando toda la historia, como en el notebook, o deslizante, usando solo los últimos años si el pasado lejano ya no se parece al presente.

¿Cuántos orígenes usar? Los suficientes para cubrir situaciones variadas sin que el cálculo se eternice; con series mensuales, entre cinco y diez cortes suelen bastar. Y el horizonte del backtesting tiene que ser el del uso real. Si el negocio necesita pronósticos a doce meses, evalúa a doce meses. En el ejercicio 1 lo comprobarás: con un horizonte de 24 meses, el error medio del SARIMA sube de 0,44 a 0,66 partes por millón.

[DIAPOSITIVA 8.7-4]

[DEMO: notebook, sección 9. Se recorre el bucle sobre `pd.date_range("1994-12-01", "2000-12-01", freq="12MS")`, señalando que en cada vuelta se reentrena con `serie[:corte]`. Se muestra la tabla por origen y el MAE medio.]

Veamos el resultado. Ingenuo estacional: 1,71 de error medio. Holt-Winters: 0,45. SARIMA: 0,44.

Dos lecciones. Primera: en el test único, Holt-Winters ganaba con claridad, 0,24 frente a 0,36. En el backtesting, empatan. La partición única exageraba la diferencia. Si hubiéramos decidido con ella, habríamos sacado una conclusión más fuerte de lo que los datos permiten.

Esto tiene una consecuencia práctica muy concreta. Si alguien te presenta un modelo que gana a otro en un único periodo de prueba, la pregunta que debes hacer es: ¿y en el backtesting? Si la ventaja desaparece al repetir la evaluación en varios cortes, no hay ventaja real, hay suerte.

Segunda: mira la tabla por año. El origen de 1997, que pronostica 1998, es malo para todos los modelos. Aquel año el CO₂ creció mucho más deprisa de lo habitual. La dispersión del error también es información: te dice cuánto puede fallar el modelo en un año malo.

### [08:00–11:30] Métricas de error

[DIAPOSITIVA 8.7-5]

Ahora, ¿cómo medimos el error? Hay varias métricas y cada una cuenta una historia distinta.

El MAE, error absoluto medio: la media de los errores sin signo. Está en las unidades de la serie, "nos equivocamos de media 0,44 partes por millón" o "120 unidades al día". Es claro y robusto.

El RMSE eleva los errores al cuadrado antes de promediar. Penaliza mucho los errores grandes. Úsalo si un error grande es desproporcionadamente caro.

Un ejemplo para ver la diferencia. Un modelo comete errores de 2, 2, 2 y 2 unidades; otro, de 0, 0, 0 y 8. Los dos tienen un MAE de 2. Pero el RMSE del primero es 2 y el del segundo es 4. Si ese error de 8 te deja sin stock en Navidad, el RMSE te avisa y el MAE no.

El MAPE expresa el error en porcentaje del valor real. Permite comparar series de distinta escala. Pero tiene un talón de Aquiles: cuando el valor real es cero o casi cero, el porcentaje explota.

Además, el MAPE tiene una asimetría curiosa. Un pronóstico demasiado alto puede tener un error de cientos por cien, pero uno demasiado bajo nunca pasa del cien por cien. Así que, si eliges el modelo optimizando el MAPE, tenderás a premiar los pronósticos que se quedan cortos.

El MASE divide el MAE del modelo entre el del método ingenuo. Si es menor que uno, mejoras a la referencia. Es la métrica recomendada para comparar muchas series distintas.

[DIAPOSITIVA 8.7-6]

Esta tabla resume cuándo usar cada una. Añado el WAPE, muy usado en retail: la suma de errores absolutos entre la suma de valores reales. No explota con ceros.

Mi recomendación práctica: reporta siempre el MAE, porque se entiende en las unidades del negocio, y acompáñalo de una métrica relativa, como el MAPE o el WAPE, si vas a comparar series de distinta escala. Y nunca presentes un error sin decir a qué horizonte corresponde y con qué referencia se compara.

### [11:30–13:30] La métrica refleja el coste

[DIAPOSITIVA 8.7-7]

Un caso real. Un comercio electrónico compara dos modelos de demanda por artículo. El A tiene mejor MAPE; el B, mejor WAPE. ¿Cuál elegir? Investigan y descubren que el MAPE del B está inflado por cientos de artículos que venden cero o una unidad al día, donde fallar por una unidad es un error del cien por cien. Pero el dinero se juega en los artículos de alta rotación. Eligen el B.

Y si quedarse corto cuesta mucho más que pasarse, como con un medicamento en una farmacia, ninguna métrica simétrica lo recoge. Ahí se usan pérdidas asimétricas o pronósticos por cuantiles. Elegir la métrica es una decisión de negocio, no técnica.

### [13:30–15:00] Errores frecuentes, resumen y siguiente paso

[DIAPOSITIVA 8.7-8]

Errores que verás: usar validación cruzada estándar, con KFold, en series; calcular variables con toda la serie antes de partir; elegir el modelo mirando el test y luego reportar ese mismo error como si fuera independiente; y comparar modelos en horizontes distintos, cuando el error siempre crece con el horizonte.

[CÁMARA]

En resumen: el entrenamiento siempre antes que la prueba; backtesting en lugar de un único corte; y una métrica que refleje el coste real del error.

En el último vídeo del módulo abrimos el foco: variables externas, miles de series a la vez y modelos de machine learning.

---

## Vídeo 8.8 · Variables externas, múltiples series y modelos de machine learning (duración objetivo: 10 min)

**Objetivo del vídeo:** que el participante conozca cómo se amplía el flujo de trabajo con variables exógenas, muchas series y modelos de machine learning, y sepa cuándo compensa cada enfoque.

**Material:** diapositivas 8.8-1 a 8.8-8; README del módulo (caso práctico).

### [00:00–01:00] Gancho

[CÁMARA]

Una cadena de restaurantes pronostica cuántos comensales tendrá cada local cada día, para comprar producto fresco. Con un modelo clásico por local, se equivoca un 14 %. Pero el gerente sabe cosas que el modelo no: que el sábado hay partido, que el martes es festivo local, que va a llover. ¿Cómo metemos ese conocimiento en el pronóstico?

### [01:00–03:00] Variables exógenas

[DIAPOSITIVA 8.8-1]

Hasta ahora, nuestros modelos eran univariantes: la serie solo miraba su propio pasado. En la empresa casi siempre sabemos más.

Piensa en todo lo que sabe un jefe de tienda y no aparece en la serie de ventas: que el viernes empieza la campaña de vuelta al cole, que han abierto un centro comercial al lado, que la semana que viene cambian los precios. Parte de ese conocimiento se puede convertir en columnas de datos. Y cuando se puede, suele ser lo que más mejora el pronóstico.

[DIAPOSITIVA 8.8-2]

SARIMAX, con X de exógeno, es una regresión sobre esas variables cuyos errores siguen un SARIMA. Le pasas columnas como promoción o festivo, y aprende su efecto.

Por ejemplo, si las promociones elevan las ventas un 20 % de media, el coeficiente de la variable promoción lo recogerá, y podrás pronosticar la semana de la próxima promoción en lugar de llevarte la sorpresa.

Pero hay una condición crítica que se olvida a menudo: para pronosticar, necesitas el valor futuro de esas variables. El calendario de festivos o de promociones, lo conoces. La temperatura de dentro de tres meses, no: habría que pronosticarla también, y su error se suma. Y si usas una variable que solo se conoce a posteriori, como el tráfico web del mismo día, tienes una fuga de información de manual.

### [03:00–05:00] Muchas series

[DIAPOSITIVA 8.8-3]

Una cadena con 300 tiendas y 5.000 productos tiene un millón y medio de series. Dos enfoques.

Con estas cifras, revisar modelos uno a uno es imposible. La pregunta deja de ser "¿qué modelo es mejor para esta serie?" y pasa a ser "¿qué proceso automático da buenos resultados en el conjunto, y cómo detecto las series en las que falla?". Las métricas relativas, como el MASE o el WAPE de la lección anterior, son las que permiten responderla.

Local: un modelo por serie, como un ETS o un ARIMA automáticos. Librerías como statsforecast, de Nixtla, los ajustan a gran velocidad. Global: un único modelo, normalmente de machine learning, entrenado con todas las series a la vez. Aprende patrones compartidos y brilla con series cortas o productos nuevos.

Y una ventaja práctica de los modelos globales: si mañana lanzas un producto nuevo, sin historia, el modelo puede apoyarse en lo que aprendió de productos parecidos. Un modelo local, en cambio, no tiene nada de lo que aprender.

[DIAPOSITIVA 8.8-4]

Además, las series forman jerarquías: tienda, región, país. Los pronósticos tienen que cuadrar; si la suma de las tiendas no coincide con el total, negocio dejará de confiar en ellos. Para eso existen técnicas de reconciliación jerárquica.

### [05:00–07:30] Machine learning

[DIAPOSITIVA 8.8-5]

¿Cómo usamos un LightGBM o una red neuronal para pronosticar? Convirtiendo la serie en una tabla. Cada fila es un día. El objetivo, las ventas. Y las columnas son variables construidas mirando solo al pasado: las ventas de ayer, las de hace una semana, la media de los últimos siete días, el día de la semana, si hay promoción.

Ese "solo al pasado" es crucial. Una media móvil que incluye el valor de hoy es una fuga.

Y no olvides la frecuencia de actualización. Si el modelo se va a ejecutar cada lunes con los datos hasta el domingo, la variable "ventas de ayer" para predecir el miércoles no existirá en el momento real del pronóstico. Construye las variables pensando en qué sabrás exactamente cuando lances la predicción.

[DIAPOSITIVA 8.8-6]

Para varios pasos hay dos estrategias: recursiva, que predice mañana y usa esa predicción como dato para pasado mañana; o directa, con un modelo distinto para cada horizonte. Librerías como skforecast o mlforecast lo automatizan, incluido el backtesting.

La recursiva es más sencilla, pero los errores se van acumulando, igual que en los intervalos de SARIMA. La directa evita esa acumulación, a cambio de entrenar y mantener más modelos. No hay una ganadora universal: de nuevo, decide el backtesting.

¿Cuándo compensa? Con muchas series, muchas variables externas y efectos no lineales. Con una serie mensual corta, como el CO₂, los clásicos suelen ser igual de buenos, más rápidos y más fáciles de explicar.

### [07:30–08:45] Modelos fundacionales y combinación

[DIAPOSITIVA 8.8-7]

En los últimos años han aparecido modelos fundacionales de series temporales, preentrenados con millones de series, como TimeGPT, Chronos o TimesFM. Pronostican una serie nueva sin entrenamiento específico. Son un punto de partida interesante, pero se evalúan exactamente igual: backtesting y comparación con las referencias.

Mi consejo: trátalos como un candidato más en tu tabla de backtesting, junto al ingenuo estacional, Holt-Winters y SARIMA. Si ganan con claridad, adelante. Si no, ya sabes qué hacer.

Y un consejo con mucha evidencia detrás: promediar pronósticos de modelos distintos suele ser más preciso que elegir el mejor, porque sus errores se compensan.

Volviendo a los restaurantes: con un modelo global y variables de partidos, festivos y lluvia, el error baja al 10 %. Y un SARIMAX con las mismas variables se queda en el 11 %. La mejora venía sobre todo de las variables, no del algoritmo.

### [08:45–10:00] Cierre del módulo

[DIAPOSITIVA 8.8-8]

[CÁMARA]

Cerramos el módulo. Tu caso práctico: el pronóstico a 24 meses del ejercicio 1, presentado en una página para un responsable no técnico. Con el gráfico, el intervalo, el error esperado según el backtesting, la mejora frente a la referencia ingenua y tres frases de interpretación. Y si te animas, aplica todo el flujo a una serie de tu empresa.

Recuerda las ideas que atraviesan todo el módulo: referencias primero, validación sin mirar al futuro, e incertidumbre siempre. Con eso, cualquier técnica nueva que aparezca la sabrás evaluar. Nos vemos en el módulo de IA generativa.
