# Módulo 03 · Regresión y predicción — Guiones de los vídeos

Convenciones: las indicaciones de producción van entre corchetes en su propia línea. [DIAPOSITIVA N.M-k] remite a `diapositivas.md`; [DEMO] describe lo que se muestra en el notebook (no se narra línea a línea); [PANTALLA] indica otro contenido en pantalla; [CÁMARA] indica plano del presentador. Ritmo de referencia: ~100 palabras por minuto.

---

## Vídeo 3.1 · De la correlación a la recta de regresión; mínimos cuadrados (duración objetivo: 15 min)

**Objetivo del vídeo:** que el alumno entienda qué es una recta de regresión, cómo la elige el criterio de mínimos cuadrados y cómo se interpretan pendiente e intercepto, sin confundir asociación con causa.

**Material:** diapositivas 3.1-1 a 3.1-7; notebook del módulo, secciones 1 y 2.

### [00:00–01:30] Gancho

[CÁMARA]

Imagina que diriges la unidad de endocrinología de un hospital. Tienes cuatrocientos pacientes con diabetes y recursos para hacer seguimiento intensivo a muy pocos. ¿A quién llamas primero?

Podrías hacerlo por orden de llegada. O por intuición. Pero tienes datos: edad, índice de masa corporal, presión arterial, analíticas. Y tienes, para pacientes anteriores, cuánto progresó su enfermedad al cabo de un año.

La pregunta de esta semana es: ¿podemos convertir esos datos en una regla que nos diga qué esperar de cada paciente nuevo? La herramienta más sencilla y, sinceramente, la más usada del mundo para hacerlo es la regresión lineal. Hoy vamos a construirla desde cero.

Y no es solo cosa de hospitales. Una tienda que quiere estimar cuánto venderá el mes que viene, un banco que quiere anticipar el gasto de un cliente, una empresa de energía que quiere prever el consumo de mañana. Todos tienen el mismo problema: un número que quieren anticipar y unas cuantas variables que creen que lo explican.

En este módulo trabajaremos con datos reales: 442 pacientes y diez variables clínicas. Al final de la semana tendrás un modelo validado y un memorando para la dirección médica.

### [01:30–04:00] De la correlación a una regla

[DIAPOSITIVA 3.1-1]

En el módulo de estadística vimos la correlación. En nuestros datos, la correlación entre el IMC y la progresión de la diabetes es 0,59. Positiva y bastante clara: más IMC, más progresión.

Pero fíjate en lo que la correlación no te dice. Si entra por la puerta un paciente con un IMC de 30, ¿qué progresión espero? La correlación no da un número en las unidades que me interesan. Solo dice «van juntas».

Lo que necesitamos es una regla. Algo del estilo: dame el IMC y te devuelvo una predicción. La regla más sencilla posible es una recta. Y-gorro igual a beta cero más beta uno por x.

Beta cero es el intercepto: lo que predice la recta cuando x vale cero. Beta uno es la pendiente: cuánto cambia la predicción cuando x sube una unidad. Y ese gorrito sobre la y nos recuerda que es una predicción, no el valor real.

¿Por qué una recta y no una curva? Por dos motivos. Primero, porque muchas relaciones, en el rango que nos interesa, son aproximadamente rectas. Segundo, porque una recta se interpreta con una sola frase: «por cada unidad más de x, tanto más de y». Esa sencillez vale oro cuando tienes que explicar el modelo a alguien que no es analista. Más adelante veremos cómo doblar la recta cuando haga falta.

### [04:00–06:30] Residuos y mínimos cuadrados

[DIAPOSITIVA 3.1-2]

Ahora, por una nube de puntos pasan infinitas rectas. ¿Cuál elegimos?

Para cada paciente miramos la distancia vertical entre su valor real y lo que predice la recta. Esa distancia se llama residuo. Si es positiva, el paciente progresó más de lo previsto. Si es negativa, menos.

[DIAPOSITIVA 3.1-3]

Una buena recta tendrá residuos pequeños. Pero ¿cómo resumimos cuatrocientos residuos en un solo número? El criterio clásico es sumar los residuos al cuadrado y elegir la recta que hace esa suma lo más pequeña posible. Es el método de mínimos cuadrados ordinarios, MCO; en inglés, OLS.

¿Por qué al cuadrado? Primero, para que los positivos y los negativos no se cancelen. Segundo, porque así un error grande pesa mucho más que varios pequeños: equivocarte en cien puntos es peor que equivocarte diez veces en diez. Y tercero, porque con cuadrados el problema tiene una solución exacta, sin necesidad de probar recta a recta.

Podrías elegir otro criterio, como sumar los valores absolutos de los residuos. Existe, y es más resistente a valores extremos. Pero los mínimos cuadrados son el estándar por su sencillez matemática y porque, cuando los errores se comportan bien, dan las estimaciones más precisas posibles. Quédate con la idea: la recta de regresión es la que deja los residuos al cuadrado más pequeños, en conjunto.

### [06:30–08:30] La pendiente es una correlación con unidades

[DIAPOSITIVA 3.1-4]

Esa solución exacta tiene una forma muy bonita. La pendiente es la correlación multiplicada por el cociente de desviaciones típicas: la de y entre la de x.

¿Qué significa? Que la pendiente es, en el fondo, la correlación traducida a las unidades de tus variables. Si estandarizas ambas variables, la pendiente es exactamente la correlación.

Y el intercepto se calcula para que la recta pase por el punto medio: la media de x y la media de y. Siempre.

Un último detalle que nos servirá en la lección 3.3: en regresión simple, el R cuadrado, la proporción de variabilidad explicada, es la correlación al cuadrado.

Hay otra consecuencia interesante. Si la correlación es baja, la pendiente es pequeña en relación con la dispersión de y, y las predicciones se quedan cerca de la media. Es la famosa regresión a la media: los pacientes con valores extremos de x tienden a tener valores de y menos extremos. No es magia, es lo que ocurre cuando la relación no es perfecta.

### [08:30–11:30] Demo: IMC y progresión

[DEMO: notebook, sección 1. Mostrar el histograma de la progresión y el gráfico de barras de correlaciones. Señalar que IMC y triglicéridos encabezan la lista.]

Vamos al notebook. Primero, un vistazo a los datos. La progresión va de 25 a unos 350 puntos. Y si ordenamos las variables por su correlación con la progresión, arriba del todo están el IMC y los triglicéridos.

[DEMO: notebook, sección 2. Ejecutar el `regplot` y la celda de `sm.OLS`. Resaltar `add_constant`.]

Dibujamos la nube IMC contra progresión, con la recta encima. Y ajustamos con statsmodels. Un detalle práctico: statsmodels no añade el intercepto por su cuenta; por eso usamos `add_constant`. Scikit-learn, en cambio, sí lo añade.

[DIAPOSITIVA 3.1-5]

Resultado: pendiente de 10,2. Léelo así: por cada punto adicional de IMC, la progresión esperada es 10,2 puntos mayor. El R cuadrado es 0,34: el IMC por sí solo explica alrededor de un tercio de la variabilidad.

¿Y un paciente con IMC 30? Menos 117,8 más 10,2 por 30. Unos 189 puntos.

Párate un momento en esa cifra de 0,34. Significa que dos tercios de las diferencias entre pacientes no tienen nada que ver con el IMC, o al menos no linealmente. Si el hospital priorizara solo por IMC, se equivocaría bastante. Por eso, en el próximo vídeo, añadiremos el resto de variables.

[DEMO: en una celda nueva, calcular `simple.predict([[1, 30]])` para comprobar la cifra.]

### [11:30–13:30] Tres errores frecuentes

[DIAPOSITIVA 3.1-6]

Antes de seguir, tres trampas en las que cae casi todo el mundo.

Primera: interpretar el intercepto a ciegas. Menos 117,8 sería la progresión de alguien con IMC cero. Esa persona no existe. El intercepto es un ajuste de altura de la recta; no lo leas fuera del rango de los datos, que aquí va de 18 a 42.

Segunda: pensar que una pendiente grande significa una relación fuerte. La pendiente depende de las unidades. Si midiera el IMC en décimas, la pendiente se dividiría por diez y la relación sería exactamente igual de fuerte. Para la fuerza, mira la correlación o el R cuadrado.

Tercera, y la más importante: leer la pendiente como una causa. «Si este paciente baja un punto de IMC, su progresión bajará diez». Eso no lo dicen los datos. La pendiente compara pacientes distintos que tienen IMC distinto, y que probablemente se diferencian en muchas otras cosas: hábitos, edad, otras enfermedades. Para afirmar un efecto causal necesitarías un diseño adecuado, como un ensayo aleatorizado.

[CÁMARA]

Piénsalo con un ejemplo de negocio: una cadena de gimnasios ve que los centros que más invierten en publicidad tienen más altas. Quizás la publicidad funciona. O quizás los centros que más invierten están en zonas más pobladas. La recta resume la asociación; para la causa, hay que experimentar.

¿Cómo sería ese experimento? Elegir al azar la mitad de los centros, subirles la inversión y comparar con la otra mitad. Como el azar decide quién recibe más publicidad, las dos mitades se parecen en todo lo demás, y la diferencia en altas sí se puede atribuir a la publicidad. Lo veremos con detalle en el módulo 4, con las pruebas A/B.

### [13:30–15:00] Resumen y qué viene después

[DIAPOSITIVA 3.1-7]

Recapitulemos. La regresión convierte una asociación en una regla de predicción. Mínimos cuadrados elige la recta que minimiza la suma de residuos al cuadrado. La pendiente se lee como la diferencia media en y por cada unidad de x. Y eso es una asociación, no una causa.

Pero un tercio de variabilidad explicada sabe a poco. La progresión no depende solo del IMC. En el próximo vídeo añadiremos más variables a la vez, y descubriremos que la frase más importante de toda la regresión es: «manteniendo el resto constante».

---

## Vídeo 3.2 · Regresión múltiple: «manteniendo el resto constante» (duración objetivo: 15 min)

**Objetivo del vídeo:** interpretar correctamente los coeficientes de una regresión múltiple como asociaciones parciales, entender por qué cambian según las variables incluidas y reconocer la multicolinealidad.

**Material:** diapositivas 3.2-1 a 3.2-7; notebook, sección 3 (tabla de statsmodels y coeficientes estandarizados).

### [00:00–01:30] Gancho

[CÁMARA]

Una inmobiliaria ajusta un modelo de precios de pisos con tres variables: superficie, número de habitaciones y barrio. Y el coeficiente de las habitaciones sale negativo. ¿Una habitación más hace que el piso valga menos? El director comercial no se lo cree. ¿Está mal el modelo?

No. El modelo está diciendo algo muy razonable, pero hay que saber leerlo. Y la clave está en cinco palabras: manteniendo el resto constante. Hoy vamos a entenderlas a fondo.

### [01:30–03:30] De la recta al hiperplano

[DIAPOSITIVA 3.2-1]

La regresión múltiple es la misma idea que ya conoces, con más variables. Y-gorro igual a beta cero, más beta uno por x uno, más beta dos por x dos, y así hasta p variables.

El criterio no cambia: mínimos cuadrados. Lo que cambia es la geometría. Con dos variables ya no ajustamos una recta, sino un plano; con más, un hiperplano que no podemos dibujar, pero que el ordenador calcula sin problema con una fórmula matricial.

No necesitas memorizar esa fórmula. Lo que sí necesitas es saber leer lo que sale de ella.

Una pregunta que surge siempre: ¿por qué no ajustar diez regresiones simples, una por variable, en lugar de una múltiple? Porque las variables no son independientes entre sí. Los pacientes con más IMC tienen también más presión. Si analizas cada variable por separado, cada una se apunta el mérito de las demás y acabas contando lo mismo varias veces. La regresión múltiple reparte el mérito de forma coherente.

### [03:30–06:30] Coeficientes parciales

[DIAPOSITIVA 3.2-2]

Cada coeficiente beta j es la diferencia esperada en y cuando x j sube una unidad y todas las demás variables del modelo se quedan quietas. Es un coeficiente parcial: la asociación de esa variable con y una vez descontado lo que comparte con las demás.

[DEMO: notebook, sección 3. Ejecutar `train_test_split` y `ols.summary()`. Señalar en la tabla la fila de `imc`.]

En el notebook ajustamos el modelo con las diez variables clínicas, usando los 331 pacientes de entrenamiento. Mira la fila del IMC: 5,7. En la regresión simple era 10,2. ¿Qué ha pasado?

Pues que los pacientes con más IMC también tienden a tener la presión más alta y peores analíticas. En la regresión simple, el IMC se llevaba el mérito de todo eso. Ahora que la presión y las analíticas están en el modelo, cada una se lleva su parte. Lo que queda para el IMC es su asociación «a igualdad de lo demás».

Una forma intuitiva de verlo: imagina que agrupas a los pacientes con la misma presión, la misma edad y las mismas analíticas, y dentro de cada grupo miras cómo se relaciona el IMC con la progresión. El coeficiente de la regresión múltiple es, aproximadamente, un promedio de esas pendientes dentro de los grupos. Por eso es más pequeño: dentro de un grupo homogéneo, el IMC tiene menos que explicar.

### [06:30–08:30] Los coeficientes dependen de los controles

[DIAPOSITIVA 3.2-3]

Un ejemplo aún más llamativo es el sexo. Si ajustas un modelo solo con IMC y sexo, el coeficiente del sexo es menos 1,3 y su p-valor 0,82: nada. En el modelo completo pasa a menos 23 y es claramente significativo.

¿Cuál es el bueno? Los dos. Responden a preguntas distintas. El primero compara grupos con igual IMC. El segundo compara grupos con igual IMC, presión, edad y analíticas.

Esto tiene una consecuencia seria. Si en tu modelo falta una variable que influye en la respuesta y está correlacionada con otra que sí está, el coeficiente de esta última absorberá parte de ese efecto. Se llama sesgo por variable omitida, y es la razón número uno por la que los coeficientes de una regresión no son efectos causales.

Un ejemplo de negocio. Una cadena de cafeterías ve que los locales con terraza venden más. Pero los locales con terraza están en calles peatonales con mucho paso. Si el modelo no incluye el tráfico peatonal, el coeficiente de la terraza se lleva el mérito del tráfico. Y si la empresa invierte en poner terrazas en calles sin paso, se llevará una decepción.

### [08:30–10:00] Lo que «constante» no significa

[DIAPOSITIVA 3.2-4]

Tres matices sobre la frase mágica.

Uno: solo controla lo que está en el modelo. Lo que no has medido no se mantiene constante.

Dos: a veces es una ficción. Colesterol total y LDL tienen una correlación de 0,90. «Subir el colesterol manteniendo fijo el LDL» describe a muy pocos pacientes reales.

Tres: no es una intervención. Aunque metieras todas las variables del mundo, el coeficiente sigue comparando pacientes distintos. No te dice qué pasaría si cambias el IMC de un paciente concreto. Para eso hace falta un experimento o un diseño causal explícito.

### [10:00–12:30] Multicolinealidad

[DIAPOSITIVA 3.2-5]

Y aquí llegamos a uno de los problemas más comunes en la práctica. Cuando dos variables están muy correlacionadas, el modelo no sabe cómo repartir el mérito entre ellas.

[DEMO: notebook, sección 3. Volver a la tabla y señalar los coeficientes de `colesterol` (−1,26) y `ldl` (+0,80), y la nota final sobre el *condition number*.]

En la tabla, el colesterol total sale con coeficiente negativo. ¿Tener más colesterol protege? Claro que no. Lo que pasa es que colesterol y LDL se están compensando: uno sube y el otro baja para dar la misma predicción. Statsmodels incluso nos avisa abajo: el número de condición es grande, posible multicolinealidad.

Una forma de medirlo es el VIF, el factor de inflación de la varianza. Por encima de cinco o diez, alarma. El colesterol tiene 54. El LDL, 36. El IMC, 1,5.

Lo importante: la multicolinealidad no estropea las predicciones del modelo en conjunto. Estropea la interpretación de los coeficientes por separado.

¿Qué puedes hacer? Varias opciones. Quitar una de las variables redundantes, si tiene sentido clínico. Combinarlas en un índice, como ya hace el cociente colesterol-HDL. O usar regularización, que veremos en el vídeo 3.7 y que maneja muy bien este problema. Lo que no debes hacer es contar una historia a partir del signo de un coeficiente con un VIF de 54.

### [12:30–14:00] Comparar importancias

[DIAPOSITIVA 3.2-6]

Última pregunta: ¿qué variable es más importante? No puedes comparar 63 de los triglicéridos con 5,7 del IMC: están en unidades distintas.

[DEMO: notebook, sección 3. Ejecutar la celda de `StandardScaler` y mostrar el gráfico de coeficientes estandarizados.]

La solución es estandarizar: poner todas las variables con media cero y desviación típica uno. Ahora cada coeficiente es el cambio en la progresión por cada desviación típica de la variable. En el gráfico destacan colesterol, triglicéridos, IMC y LDL. Pero ojo, tres de ellos están afectados por la multicolinealidad que acabamos de ver. Las variables más estables son el IMC, los triglicéridos y la presión.

[CÁMARA]

¿Y el piso con más habitaciones que vale menos? A igual superficie, más habitaciones significa habitaciones más pequeñas. Ahí lo tienes.

Si el director comercial hubiera leído el coeficiente sin ese matiz, quizá habría recomendado tirar tabiques en todos los pisos de la cartera. Y si lo hubiera leído como causa, también se habría equivocado: el modelo compara pisos distintos, no lo que pasa al reformar uno. La interpretación correcta es más modesta: entre pisos de igual superficie y barrio, los que tienen más habitaciones se venden, de media, algo más baratos.

Y una pregunta para que la pienses antes del próximo vídeo: si el coeficiente de la glucosa es casi cero en el modelo completo, ¿quiere decir que la glucosa no tiene nada que ver con la diabetes? Obviamente no. Quiere decir que, una vez conocidas las demás variables, la glucosa añade poca información para predecir la progresión. Son preguntas muy distintas.

### [14:00–15:00] Resumen y qué viene después

[DIAPOSITIVA 3.2-7]

En regresión múltiple cada coeficiente es una asociación parcial, con el resto de variables del modelo fijas. Cambia cuando añades o quitas variables. La multicolinealidad lo vuelve inestable. Para comparar, estandariza. Y para hablar de causas, diseño causal.

En el próximo vídeo leeremos el resto de la tabla: errores estándar, p-valores y R cuadrado. Es decir, cuánto podemos fiarnos de estos números.

---

## Vídeo 3.3 · Inferencia: errores estándar, p-valores, R² (duración objetivo: 15 min)

**Objetivo del vídeo:** leer la tabla de resultados de statsmodels, entender qué miden el error estándar, el intervalo de confianza, el p-valor y el R², y evitar las malas interpretaciones habituales.

**Material:** diapositivas 3.3-1 a 3.3-7; notebook, sección 3 (`ols.summary()`).

### [00:00–01:30] Gancho

[CÁMARA]

Un analista presenta al comité de dirección de un banco: «La antigüedad del cliente influye significativamente en el gasto con tarjeta, p igual a 0,02». El comité aprueba una campaña de fidelización. Seis meses después, nada ha cambiado.

Cuando alguien revisa el modelo descubre que el coeficiente era 40 céntimos de gasto por año de antigüedad. Significativo, sí. Irrelevante, también.

Hoy aprenderemos a leer la tabla de una regresión sin caer en esto.

[PANTALLA: tabla completa de `ols.summary()` con tres zonas resaltadas: cabecera (R², F), bloque de coeficientes y pie (diagnósticos).]

La tabla de statsmodels asusta la primera vez: decenas de números. Pero tiene tres zonas. Arriba, medidas globales del modelo. En medio, una fila por variable. Abajo, diagnósticos que usaremos en el próximo vídeo. Hoy nos centramos en las dos primeras.

### [01:30–03:30] De la muestra a la población

[DIAPOSITIVA 3.3-1]

Nuestros 331 pacientes de entrenamiento son una muestra. Si el hospital hubiera recogido otros 331, los coeficientes saldrían algo distintos. Es lo mismo que vimos con la media en el módulo 1, ahora aplicado a cada coeficiente.

Por eso escribimos el modelo con un término de error, épsilon. Los betas son los valores de la población, que no conocemos. Los beta-gorro son nuestras estimaciones. Y la inferencia responde: ¿cuánto podrían variar esas estimaciones de una muestra a otra?

Una forma de visualizarlo, que ya usaste con el bootstrap en el módulo 1: imagina que repites el estudio cien veces, con cien muestras distintas de pacientes, y ajustas cien regresiones. Obtendrías cien pendientes del IMC, todas parecidas pero no iguales. La dispersión de esas cien pendientes es lo que queremos cuantificar. La buena noticia es que no hace falta repetir el estudio: con una sola muestra y unos supuestos razonables, la teoría nos da esa dispersión directamente.

### [03:30–06:00] Error estándar e intervalo de confianza

[DIAPOSITIVA 3.3-2]

La columna `std err` es el error estándar: cuánto bailaría el coeficiente entre muestras.

¿De qué depende? Crece con el ruido: si los residuos son muy dispersos, hay más incertidumbre. Crece con la multicolinealidad: por eso el colesterol tenía un error estándar enorme. Y decrece con el tamaño de muestra y con la variabilidad de la propia x.

Con el error estándar construimos el intervalo de confianza al 95 %. La regla rápida: coeficiente más menos dos errores estándar.

[DEMO: notebook, sección 3. En la tabla de `ols.summary()`, resaltar la fila de `imc` y las columnas `std err`, `[0.025` y `0.975]`.]

Para el IMC: 5,73 más menos dos por 0,85. Entre 4,06 y 7,41. Estamos razonablemente seguros de que la asociación es positiva y de un tamaño entre 4 y 7 puntos por punto de IMC. Eso es mucho más informativo que decir «es significativo».

Compáralo con el colesterol: coeficiente menos 1,26, intervalo de menos 2,5 a menos 0,01. Un intervalo que casi toca el cero y que, además, sabemos que está afectado por la multicolinealidad. Y el HDL: de menos 1,3 a más 2,2. Ese intervalo dice «no sabemos ni el signo». Leer intervalos te da en un vistazo cuánto sabes y cuánto no.

### [06:00–09:00] Estadístico t y p-valor

[DIAPOSITIVA 3.3-3]

Las dos columnas siguientes son t y P mayor que t. Para cada coeficiente se contrasta la hipótesis nula de que vale cero, es decir, de que la variable no aporta nada una vez incluidas las demás. El estadístico t es simplemente el coeficiente dividido entre su error estándar: cuántos errores estándar se aleja de cero.

El p-valor es la probabilidad de ver un t tan extremo si de verdad el coeficiente fuera cero. En nuestra tabla, IMC, presión y triglicéridos tienen p-valores minúsculos. Glucosa, HDL o edad, no.

[DIAPOSITIVA 3.3-4]

Y ahora, cómo no leer un p-valor. Atento, porque esto sale en el cuestionario y, sobre todo, en la vida real.

Un p-valor de 0,3 no significa que la variable no influya. Puede que la muestra sea pequeña, que la variable esté correlacionada con otras, como el HDL con el cociente colesterol-HDL, o que su relación no sea lineal.

Un p-valor menor que 0,05 no significa que el efecto sea grande. Con muestras enormes, cualquier efecto minúsculo es significativo. Es el caso del banco.

Y un p-valor pequeño no significa causalidad. Ni de lejos.

Volvamos al HDL, el colesterol «bueno». Su correlación simple con la progresión es de menos 0,40, claramente negativa. Pero en el modelo completo tiene un p-valor de 0,62. ¿Contradicción? No. El modelo ya incluye el cociente colesterol-HDL, que contiene casi toda la información del HDL. Una vez conocido ese cociente, el HDL por separado añade poco. Es irrelevante para el modelo, no para la medicina.

Además, con diez variables estás haciendo diez contrastes a la vez. Las posibilidades de un falso positivo se multiplican. Lo veremos en el módulo 4.

Mi consejo: traduce siempre a magnitud de negocio, con su intervalo.

Por ejemplo, en lugar de «la presión arterial es significativa, p menor que 0,001», di: «cada 10 mmHg más de presión se asocian con entre 8 y 18 puntos más de progresión esperada, a igualdad del resto». Eso sí lo entiende un médico. Y deja claro que es una asociación.

### [09:00–11:30] R² y R² ajustado

[DIAPOSITIVA 3.3-5]

Arriba a la derecha de la tabla está el R cuadrado. Compara los errores del modelo con los de una estrategia ingenua: predecir siempre la media. Si el modelo no mejora nada, R cuadrado es cero; si acierta perfecto, uno. Aquí vale 0,52: el modelo explica algo más de la mitad de la variabilidad.

Dos trampas. La primera: el R cuadrado nunca baja al añadir variables, aunque sean puro ruido. Por eso existe el R cuadrado ajustado, que penaliza cada variable extra. Aquí es 0,50.

La segunda: ambos se calculan con los mismos datos del ajuste. Un R cuadrado alto ahí no garantiza buenas predicciones con pacientes nuevos. Esa pregunta la responderemos en el vídeo 3.6.

¿Y es bueno un 0,5? En física, poco. En medicina o comportamiento humano, puede ser muy útil. La pregunta correcta es si mejora la decisión frente a no tener modelo.

[PANTALLA: en la tabla, señalar también el estadístico F y su p-valor, del orden de 10⁻⁴⁵.]

Por cierto, el estadístico F contrasta si todas las pendientes son cero a la vez. Su p-valor aquí es astronómicamente pequeño: el modelo en conjunto sí explica algo.

Fíjate en una aparente paradoja que verás a menudo: un modelo puede tener un F muy significativo y, a la vez, varias variables con p-valores altos. No hay contradicción. El conjunto explica, pero algunas variables no aportan nada que no aporten ya las demás. Es otra cara de la multicolinealidad.

### [11:30–13:30] Confianza frente a predicción

[DIAPOSITIVA 3.3-6]

Última idea, muy práctica. Vuelve al paciente con IMC 30 y la regresión simple: predicción de 189. ¿Con qué incertidumbre?

Hay dos respuestas. El intervalo de confianza dice dónde está la progresión media de todos los pacientes con IMC 30: más o menos ocho puntos. Estrecho.

El intervalo de predicción dice dónde caerá la progresión de un paciente concreto. Va de 66 a 312. Enorme. Porque además de la incertidumbre sobre la media incluye toda la variabilidad entre personas.

[DEMO: ejecutar en una celda nueva `simple.get_prediction(...).summary_frame()` y señalar las columnas `mean_ci` y `obs_ci`.]

Si vas a tomar decisiones sobre individuos, el que importa es el segundo. Y suele ser una cura de humildad.

Piensa en un ejemplo de negocio. Un modelo prevé que la tienda media de cierto tipo venderá 50.000 euros al mes, con un intervalo de confianza de 48.000 a 52.000. Suena preciso. Pero si vas a decidir el stock de una tienda concreta, el intervalo relevante puede ir de 30.000 a 70.000. Confundir ambos lleva a planificar con una precisión que no existe.

### [13:30–15:00] Resumen y qué viene después

[DIAPOSITIVA 3.3-7]

Resumen: el error estándar mide la incertidumbre de cada coeficiente; el intervalo es aproximadamente coeficiente más menos dos errores estándar. El p-valor no mide importancia ni causalidad. El R cuadrado mide el ajuste en los datos usados, no la capacidad de predecir. Y el intervalo de predicción individual es ancho.

[CÁMARA]

Todo esto descansa en unos supuestos. Si no se cumplen, los p-valores e intervalos pueden engañarnos. En el próximo vídeo aprenderemos a comprobarlos mirando lo que el modelo no explica: los residuos.

---

## Vídeo 3.4 · Supuestos y diagnóstico de residuos (duración objetivo: 15 min)

**Objetivo del vídeo:** conocer los supuestos del modelo lineal, saber diagnosticarlos con gráficos de residuos y QQ-plot, y conocer los remedios habituales.

**Material:** diapositivas 3.4-1 a 3.4-7; notebook, sección 4.

### [00:00–01:30] Gancho

[CÁMARA]

Una empresa de reparto ajusta un modelo del tiempo de entrega según la distancia. Error medio: diez minutos. Así que promete a sus clientes: «entrega en la hora indicada, más o menos diez minutos».

Al mes, las reclamaciones se disparan. Pero solo en las rutas largas. En las cortas, todo perfecto. ¿Qué ha pasado? El modelo estaba bien de media, pero tenía un problema que se veía a simple vista... si alguien hubiera mirado los residuos.

### [01:30–03:00] ¿Para qué sirven los supuestos?

[DIAPOSITIVA 3.4-1]

Mínimos cuadrados siempre te devuelve una recta. Siempre. Aunque los datos tengan forma de plátano. Que esa recta sea una buena descripción, y que los errores estándar y los p-valores sean fiables, depende de unos supuestos.

Una distinción útil. Si solo quieres predecir y vas a validar fuera de muestra, los supuestos importan menos: manda el error en datos nuevos. Pero si quieres explicar, leer coeficientes, p-valores e intervalos, los supuestos son imprescindibles.

Hay una frase famosa del estadístico George Box: todos los modelos son erróneos, pero algunos son útiles. Los supuestos nunca se cumplen a la perfección. La pregunta no es si se cumplen, sino si se incumplen tanto como para cambiar nuestras conclusiones. Para responderla, miramos los residuos.

### [03:00–05:30] LINE

[DIAPOSITIVA 3.4-2]

Una regla mnemotécnica: LINE.

L de linealidad: la media de y es una función lineal de las x. Si falla, el modelo se equivoca sistemáticamente en algunas zonas.

I de independencia: los errores de distintas observaciones no están relacionados. Si tienes varias mediciones del mismo paciente, o de la misma tienda a lo largo del tiempo, esto falla. Y el efecto es traicionero: errores estándar demasiado pequeños, falsa precisión. La independencia casi nunca se diagnostica con un gráfico: se razona a partir de cómo se recogieron los datos.

N de normalidad de los errores. Importa para intervalos y p-valores con muestras pequeñas. Con muestras grandes, mucho menos.

Y E de *equal variance*, varianza constante u homocedasticidad. Si falla, los intervalos de predicción quedan mal calibrados. Es justo lo que le pasó a la empresa de reparto.

Fíjate en algo: ninguno de los supuestos dice que las variables x tengan que ser normales, ni que y tenga que ser normal. Es un error muy común comprobar la distribución de las variables originales. Lo que debe comportarse bien son los errores, y los estimamos con los residuos.

### [05:30–08:30] Residuos frente a ajustados

[DIAPOSITIVA 3.4-3]

No podemos ver los errores verdaderos, pero sí sus estimaciones: los residuos. Si el modelo es adecuado, los residuos deberían parecer ruido sin estructura.

El gráfico rey es residuos frente a valores ajustados. Lo que queremos es una nube horizontal, centrada en cero, de anchura constante.

Dos patrones de alarma. Un embudo, que se abre a medida que crece la predicción: heterocedasticidad. Muy típico con importes, donde los clientes grandes tienen errores grandes. Y una curva, una sonrisa o un ceño: falta un término no lineal.

[DEMO: notebook, sección 4. Ejecutar la celda de residuos y QQ-plot. Recorrer con el cursor el gráfico de residuos de izquierda a derecha.]

Veamos el nuestro. No hay curva. La nube está centrada en cero.

Si hubiera una curva, la veríamos como una sonrisa: residuos positivos en los extremos y negativos en el centro, o al revés. Eso nos diría que alguna variable tiene una relación curva con la progresión que la recta no capta. Aquí no la hay. Pero fíjate en la parte izquierda: para las predicciones más bajas, la dispersión es menor. Si lo calculamos, la desviación típica de los residuos en el cuartil inferior de predicciones es unos 36 puntos, frente a 55 a 60 en el resto. En parte es lógico: la progresión no puede bajar de 25, así que por abajo hay un suelo.

¿Es grave? No demasiado. No es el embudo dramático de la empresa de reparto. Pero es el tipo de detalle que conviene anotar en las limitaciones: los intervalos de predicción serán algo conservadores para los pacientes de bajo riesgo y algo optimistas para los demás.

Y otra cosa que buscamos en este gráfico: puntos muy alejados del resto, residuos de más de 150 puntos. Aquí el mayor ronda los 160; ninguno parece un disparate, pero son los primeros que revisaríamos.

### [08:30–10:00] QQ-plot y contrastes

[DIAPOSITIVA 3.4-4]

A la derecha, el QQ-plot. Compara los cuantiles de nuestros residuos con los de una distribución normal. Si caen sobre la diagonal, la normalidad es razonable. Aquí están casi perfectamente alineados.

Los contrastes formales lo confirman. Al pie de la tabla de statsmodels, Jarque-Bera da un p-valor de 0,38: sin evidencia contra la normalidad. Y el test de Breusch-Pagan para la heterocedasticidad da 0,05, justo en el límite, coherente con lo que hemos visto.

Un consejo: mira siempre los gráficos. Con muchos datos, los tests detectan desviaciones irrelevantes; con pocos, no detectan nada.

Y recuerda que la independencia no aparece en estos gráficos. Aquí cada fila es un paciente distinto, medido una vez, así que es razonable suponerla. Si tuviéramos varias visitas por paciente, tendríamos que tratarlas de otra forma.

### [10:00–12:00] Puntos influyentes

[DIAPOSITIVA 3.4-5]

Otra cosa que revisar: si unos pocos pacientes están condicionando todo el resultado.

Un punto con un valor de x muy extremo tiene mucho apalancamiento: puede tirar de la recta hacia él. Si además tiene un residuo grande, es influyente. La distancia de Cook combina ambas cosas.

[PANTALLA: celda con `ols.get_influence().cooks_distance[0]` y los cinco valores más altos.]

¿Qué haces con un punto influyente? No lo borres sin más. Averigua si es un error de datos, y entonces corrígelo. Si es un caso real, informa de cómo cambian las conclusiones con él y sin él. Borrar puntos para que suba el R cuadrado es hacerse trampas al solitario.

Un ejemplo real de negocio: en un modelo de ventas por tienda, una tienda con ventas diez veces superiores a las demás resultó ser el almacén central, que se había colado en los datos como si fuera una tienda. Error de datos: fuera. En cambio, una tienda con ventas muy altas por estar en un aeropuerto es un caso real: se queda, y quizá merece su propia variable.

### [12:00–13:30] Remedios

[DIAPOSITIVA 3.4-6]

¿Y si encuentras un problema? Una pequeña caja de herramientas.

Si ves una curva: añade transformaciones, como logaritmos o cuadrados, o interacciones. Lo veremos en el próximo vídeo.

Si ves un embudo: transforma la variable respuesta, normalmente con un logaritmo, o usa errores estándar robustos. En statsmodels basta con `cov_type="HC3"` al ajustar.

Si hay dependencia: modelos para datos agrupados o temporales.

Y si hay colas pesadas: revisa los atípicos o usa regresión robusta.

[CÁMARA]

¿Y la empresa de reparto? Con el logaritmo del tiempo, o con intervalos que crecen con la distancia, habría prometido márgenes realistas a cada ruta.

### [13:30–15:00] Resumen y qué viene después

[DIAPOSITIVA 3.4-7]

Los supuestos LINE importan sobre todo para interpretar. Los residuos deben parecer ruido: sin curva y sin embudo. Revisa los residuos, no la distribución de y. Y los puntos influyentes se investigan, no se borran.

En el próximo vídeo ampliamos la caja de herramientas: variables categóricas, interacciones y transformaciones. Con ellas, un modelo «lineal» puede capturar relaciones sorprendentemente ricas.

[CÁMARA]

Antes de irte, un hábito para toda tu carrera: no entregues nunca un modelo de regresión sin haber mirado, al menos, el gráfico de residuos frente a ajustados. Son treinta segundos. Y te pueden ahorrar un mes de reclamaciones.

---

## Vídeo 3.5 · Variables categóricas, interacciones y transformaciones (duración objetivo: 15 min)

**Objetivo del vídeo:** incorporar variables categóricas mediante indicadoras, modelar interacciones e interpretar transformaciones logarítmicas y polinómicas.

**Material:** diapositivas 3.5-1 a 3.5-7; notebook, ejercicio 2 (y `soluciones.ipynb` para la interacción centrada).

### [00:00–01:30] Gancho

[CÁMARA]

Una tienda online quiere saber si sus cupones de descuento funcionan igual en la app que en el ordenador. El equipo de marketing dice que sí. El de producto, que en el móvil funcionan mejor. Tienen datos de miles de pedidos y una regresión lineal. ¿Pueden responder con ella?

Sí. Pero necesitan tres herramientas que vamos a ver hoy: variables indicadoras, interacciones y transformaciones.

### [01:30–02:30] Lineal en los coeficientes

[DIAPOSITIVA 3.5-1]

Una aclaración que libera mucho: la regresión lineal es lineal en los coeficientes, no necesariamente en las variables. Puedes meter el logaritmo de una variable, su cuadrado o el producto de dos, y el modelo sigue siendo lineal y se ajusta igual, con mínimos cuadrados.

### [02:30–05:00] Variables indicadoras

[DIAPOSITIVA 3.5-2]

Empecemos por las categóricas. Una variable como la región, con valores Norte, Centro y Sur, no se puede meter tal cual. Y desde luego no codificándola como 1, 2 y 3, porque eso le diría al modelo que el Sur es «tres veces» el Norte.

Lo correcto es crear variables indicadoras, también llamadas *dummies*: columnas de ceros y unos. Una por categoría, menos una. La que falta es la categoría de referencia.

¿Por qué menos una? Porque si incluyes las tres, su suma siempre vale uno, que es exactamente la columna del intercepto. Multicolinealidad perfecta: la trampa de las variables ficticias.

Así, el coeficiente de «Sur» es la diferencia media entre Sur y Norte, manteniendo el resto constante. En pandas, `get_dummies` con `drop_first=True`; en las fórmulas de statsmodels, `C(region)`.

¿Y qué categoría elijo como referencia? Matemáticamente da igual: las predicciones son idénticas. Pero para comunicar conviene elegir la más natural: la más frecuente, el grupo de control o la situación actual. Así todos los coeficientes se leen como «diferencia frente a lo habitual».

Y si una categórica tiene muchísimas categorías, como el código postal, cuidado: cada una consume un coeficiente. Con pocos datos por categoría, sobreajustarás. Agrupa las poco frecuentes o usa regularización.

En nuestros datos, el sexo ya es una indicadora. Su coeficiente, menos 23, significa que el grupo codificado como uno tiene una progresión esperada 23 puntos menor que el grupo cero, a igualdad de las demás variables.

### [05:00–09:00] Interacciones

[DIAPOSITIVA 3.5-3]

El modelo que hemos usado hasta ahora es aditivo: supone que la asociación del IMC con la progresión es la misma a los 30 años que a los 70. ¿Y si no fuera así?

Para permitirlo, añadimos el producto: IMC por edad. Ahora la pendiente del IMC ya no es un número fijo, sino beta uno más beta tres por la edad. Beta tres dice cuánto cambia la pendiente del IMC por cada año adicional.

[DEMO: notebook, ejercicio 2. Crear `df["imc_edad"] = df.imc * df.edad`, ajustar con statsmodels sobre el conjunto de entrenamiento y mostrar la tabla. Señalar el coeficiente de `imc_edad` (0,05; p = 0,36) y que el de `imc` ha caído a 3,4 con p = 0,20.]

Hagámoslo. El coeficiente de la interacción es 0,05, con p-valor 0,36. No significativo. Y, curiosamente, el coeficiente del IMC ha caído a 3,4 y ya no es significativo. ¿Ha dejado de importar el IMC?

No. Es un problema de interpretación. Con la interacción, el coeficiente del IMC pasa a ser su pendiente cuando la edad vale cero. Un recién nacido con diabetes. Absurdo.

[DEMO: abrir `soluciones.ipynb`, ejercicio 2, versión centrada. Mostrar que `imc_c` vuelve a 5,9 con p < 0,001 y que la interacción no cambia.]

La solución es centrar: restar la media a cada variable antes de multiplicar. Ahora el coeficiente del IMC es su pendiente en la edad media: 5,9, muy significativo. Y la interacción sigue igual.

Conclusión: no hay evidencia de que la relación del IMC dependa de la edad en esta muestra. Lo cual no prueba que no exista: detectar interacciones requiere bastantes datos.

[DEMO: en `soluciones.ipynb`, mostrar las pendientes del IMC a los 30, 50 y 70 años: +4,95, +5,97 y +6,99.]

Si leyéramos la interacción literalmente, la pendiente del IMC iría de unos 5 puntos a los 30 años a unos 7 a los 70. Parece una diferencia interesante, pero el intervalo de confianza de la interacción incluye el cero. Así que no lo contaríamos como hallazgo; como mucho, como hipótesis para un estudio con más pacientes.

Dos reglas prácticas. Centra antes de multiplicar. Y si incluyes una interacción, incluye siempre sus dos efectos principales.

Las interacciones también funcionan entre una variable categórica y una numérica. Por ejemplo, tipo de cliente por antigüedad: permitiría que la relación entre antigüedad y gasto sea distinta para particulares y empresas. Gráficamente, son dos rectas con pendientes diferentes. Y entre dos categóricas, como canal por cupón, que es el caso de la tienda online.

Un aviso: con diez variables hay 45 interacciones posibles. Si las pruebas todas, alguna saldrá significativa por puro azar. Plantea solo las interacciones que tengan sentido de negocio o clínico antes de mirar los datos.

### [09:00–11:30] Logaritmos

[DIAPOSITIVA 3.5-4]

Los logaritmos son la transformación estrella. Arreglan variables asimétricas, como rentas o ventas, a menudo corrigen embudos en los residuos, y convierten efectos absolutos en porcentuales.

La tabla resume cómo cambia la lectura. Logaritmo en la x: un 1 % más de x se asocia con beta entre cien unidades más de y. Logaritmo en la y: una unidad más de x se asocia con aproximadamente cien por beta por ciento más de y. Logaritmo en ambas: elasticidad, un 1 % más de x se asocia con beta por ciento más de y.

[CÁMARA]

Volvamos a la tienda online. Si modelan el logaritmo del importe y el coeficiente del móvil es menos 0,15, los pedidos desde el móvil son en torno a un 14 % menores. Y si la interacción móvil por cupón es más 0,10, el cupón rinde más en el móvil. Un buen motivo para lanzar un test A/B, que es lo que de verdad confirmaría el efecto.

### [11:30–13:00] Un detalle de nuestros datos

[DIAPOSITIVA 3.5-5]

Ahora te cuento algo que se pasa por alto con facilidad. La variable `trigliceridos` de nuestro conjunto ya viene en escala logarítmica. Sus valores van de 3,3 a 6,1.

Por eso su coeficiente es tan grande, 63. Un punto más en el logaritmo significa multiplicar los triglicéridos por 2,7. Una lectura más útil: un 10 % más de triglicéridos se asocia con unos 6 puntos más de progresión.

Moraleja: antes de interpretar un coeficiente, averigua en qué escala está la variable.

[PANTALLA: `df["trigliceridos"].describe()` mostrando mínimo 3,26 y máximo 6,11.]

Esto pasa constantemente en la empresa. Variables que alguien transformó hace años, columnas en miles de euros en lugar de euros, porcentajes guardados como 0,15 o como 15. Un coeficiente correcto con una escala malinterpretada produce conclusiones absurdas. Cinco minutos con el diccionario de datos te ahorran el bochorno.

### [13:00–14:00] Polinomios

[DIAPOSITIVA 3.5-6]

Por último, los polinomios. Añadir x al cuadrado permite curvas, como los rendimientos decrecientes de la publicidad.

Piensa en la inversión publicitaria: los primeros mil euros generan muchas ventas; los siguientes, algo menos; y llega un punto en que más inversión apenas añade nada. Una recta no lo capta. Una parábola, con un coeficiente negativo en el término al cuadrado, sí. Y el modelo sigue siendo lineal en los coeficientes, así que se ajusta exactamente igual. Pero cuidado: si añades todos los cuadrados y todas las interacciones de grado 2 de nuestras diez variables, tienes 65 términos para 331 pacientes. Mucha flexibilidad. ¿Demasiada? Lo veremos enseguida.

La regla general: cada transformación o interacción que añades hace el modelo más flexible y, potencialmente, más capaz de ajustarse al ruido. Por eso conviene que cada término tenga una justificación, y que el modelo final se evalúe con datos que no ha visto.

### [14:00–15:00] Resumen y qué viene después

[DIAPOSITIVA 3.5-7]

Categóricas: k menos uno indicadoras frente a una referencia. Interacciones: la pendiente de una variable depende de otra; centra para interpretarla. Logaritmos: efectos porcentuales. Y comunica siempre en la escala original: «un 14 %», no «0,15».

En el próximo vídeo cambiamos de pregunta. Dejamos de preguntar qué explica el modelo y empezamos a preguntar: ¿cómo predice con pacientes que nunca ha visto?

---

## Vídeo 3.6 · Sobreajuste, train/test y validación cruzada (duración objetivo: 20 min)

**Objetivo del vídeo:** distinguir explicar de predecir, entender el sobreajuste y el equilibrio sesgo-varianza, y evaluar modelos fuera de muestra con train/test y validación cruzada, siempre frente a una referencia ingenua.

**Material:** diapositivas 3.6-1 a 3.6-8; notebook, secciones 5 y 6; ejercicios 1 y 4.

### [00:00–02:00] Gancho

[CÁMARA]

Un equipo de *pricing* presenta a la dirección su nuevo modelo de demanda: R cuadrado de 0,97. Aplausos. Se pone en producción. Tres meses después, sus previsiones fallan más que la sencilla media móvil que usaban antes.

¿Cómo es posible que un modelo que explica el 97 % prediga peor que una media? Tenían 200 variables y 300 semanas de datos. Y habían medido el R cuadrado con los mismos datos con los que ajustaron el modelo.

Hoy vamos a entender qué les pasó, y cómo evitarlo. Probablemente sea la lección más importante de todo el curso para quien quiera construir modelos que funcionen en el mundo real.

### [02:00–05:00] Explicar no es predecir

[DIAPOSITIVA 3.6-1]

Hasta ahora hemos evaluado el modelo con los mismos datos que usamos para ajustarlo. Para explicar, está bien. Pero el hospital no quiere describir a sus 442 pacientes: quiere usar el modelo con los que lleguen mañana.

Y aquí hay una trampa. Cuanto más flexible es un modelo, mejor se ajusta a los datos que ha visto. Pero los datos tienen señal y ruido. Un modelo muy flexible aprende las dos cosas. Y el ruido, por definición, no se repite.

Eso es el sobreajuste: el modelo memoriza peculiaridades de la muestra. Es como el estudiante que se aprende de memoria las soluciones de los exámenes de años anteriores: saca un diez en esos y suspende el de verdad.

El extremo opuesto es el infraajuste: un modelo tan simple que no capta ni la señal. Malo en entrenamiento y malo con datos nuevos.

Lo que buscamos está en medio: bueno en entrenamiento y bueno con datos nuevos.

¿Cómo se ve el sobreajuste en una gráfica? Imagina diez puntos que siguen más o menos una recta. Una recta pasa cerca de todos. Un polinomio de grado nueve pasa exactamente por los diez, con un error de entrenamiento de cero. Pero entre punto y punto hace curvas salvajes. Y si llega un punto nuevo, la predicción del polinomio puede estar a kilómetros. La recta, en cambio, seguirá cerca.

La clave es que el error de entrenamiento siempre mejora al añadir complejidad. Siempre. Por eso no sirve para elegir el modelo.

### [05:00–07:30] Sesgo y varianza

[DIAPOSITIVA 3.6-2]

Hay una forma elegante de pensar en esto. El error de un modelo con datos nuevos se puede descomponer en tres partes.

El sesgo: el error por simplificar demasiado. Una recta para describir una curva tendrá siempre sesgo, por muchos datos que tengas.

La varianza: cuánto cambiaría el modelo si lo entrenaras con otra muestra. Un modelo con muchos parámetros y pocos datos cambia muchísimo. Es inestable.

Y el ruido irreducible: lo que ninguna variable disponible puede explicar. Contra eso no hay nada que hacer.

Al aumentar la complejidad, el sesgo baja y la varianza sube. El error total tiene forma de U. Nuestro trabajo es encontrar el fondo de esa U.

¿Y de qué depende dónde está el fondo? Sobre todo, de cuántos datos tienes. Con muchos datos, puedes permitirte modelos más complejos porque la varianza baja. Con pocos, como nuestros 331 pacientes, los modelos sencillos suelen ganar. La complejidad adecuada no es una propiedad del problema, sino del problema y de los datos disponibles.

### [07:30–09:30] Train y test

[DIAPOSITIVA 3.6-3]

¿Cómo medimos el error con datos nuevos si no los tenemos? Fácil: los fabricamos. Antes de hacer nada, apartamos una parte de los datos y no la tocamos.

Es un simulacro: hacemos como si esos pacientes fueran los que llegarán mañana. El modelo no los ve durante el ajuste, así que su error en ellos es una estimación razonable de su error futuro, siempre que los pacientes futuros se parezcan a los de nuestra muestra. Ese «siempre que» es importante: si mañana el hospital atiende a una población distinta, ninguna validación interna te protege.

[DEMO: notebook, sección 3. Señalar la línea de `train_test_split` con `test_size=0.25` y `random_state=42`.]

En el notebook lo hicimos al principio de la sección 3: 75 % para entrenar, 331 pacientes, y 25 % para test, 111 pacientes.

La regla de oro: el test se usa una vez, al final. Si lo miras para decidir qué variables meter o qué modelo elegir, ya no es una estimación honesta. Lo has contaminado.

Pero una sola partición tiene un problema: con 111 pacientes, si por azar te tocan unos cuantos fáciles o difíciles, la métrica se mueve bastante. Lo veremos en las soluciones: en nuestro reparto, el test resulta un poco más fácil que la media.

### [09:30–12:30] Validación cruzada

[DIAPOSITIVA 3.6-4]

La solución es la validación cruzada. Divides los datos de entrenamiento en k bloques, típicamente cinco. Entrenas con cuatro y evalúas con el quinto. Luego rotas: otro bloque hace de validación. Así cinco veces. Y promedias.

¿Cinco o diez bloques? Con más bloques, cada modelo se entrena con más datos, pero el cálculo es más lento y las estimaciones pueden ser algo más variables. Cinco o diez son los valores habituales y funcionan bien. En el caso extremo, un bloque por observación, se llama *leave-one-out*.

Un matiz importante: barajamos los datos antes de partir, con `shuffle=True`. Si los datos estuvieran ordenados, por ejemplo por fecha de ingreso, los bloques no serían representativos. Y si son datos temporales, no se barajan: se valida siempre con el futuro. Lo veremos en el módulo 8.

Ventajas: todos los datos se usan para entrenar y para validar, y el resultado es mucho más estable que una sola partición.

El reparto de papeles queda así: la validación cruzada sirve para elegir, ya sea el modelo, las variables o los hiperparámetros. El test sirve para confirmar, una vez, al final.

Un detalle técnico que causa muchos disgustos. Cualquier paso que aprenda de los datos, como escalar las variables, debe hacerse dentro de cada iteración, solo con los bloques de entrenamiento. Si escalas todo antes de partir, se filtra información del bloque de validación. Se llama fuga de información, *data leakage*. Por eso en el notebook usamos `make_pipeline`: el escalado viaja dentro del modelo.

[DEMO: notebook, sección 5. Mostrar la función `evaluar` y señalar `cross_val_score` con `KFold(5, shuffle=True, random_state=0)`.]

### [12:30–15:30] El caso del notebook

[DEMO: notebook, sección 5. Ejecutar la celda que construye `resultados` y mostrar la tabla.]

[DIAPOSITIVA 3.6-5]

Comparamos cuatro modelos. La regresión lineal con diez variables: R cuadrado de validación cruzada 0,48, en test 0,485, error absoluto medio de 41,5.

Ahora la polinómica de grado 2, con esos 65 términos del vídeo anterior. En entrenamiento alcanza un R cuadrado de 0,60, mejor que la lineal. Pero en validación cruzada se hunde a 0,17. Y en test, 0,42, peor que la lineal. Ese salto entre entrenamiento y validación es la firma del sobreajuste. Con 65 coeficientes para 331 pacientes, el modelo ha memorizado ruido.

Las otras dos filas, polinómica con Ridge y Lasso, son modelos regularizados. Los explicamos en el próximo vídeo. Adelanto: Ridge rescata a la polinómica.

Observa también otra cosa: para la polinómica, el R cuadrado de validación cruzada, 0,17, y el de test, 0,42, son muy distintos. Los modelos sobreajustados son inestables: su rendimiento depende mucho de qué pacientes caen en cada partición. Para la lineal, en cambio, validación y test coinciden casi exactamente. La estabilidad es otra señal de un buen modelo.

[DIAPOSITIVA 3.6-6]

Sobre las métricas. El MAE, error absoluto medio, está en las unidades de la variable y se comunica genial: «nos equivocamos de media en 41 puntos». El RMSE penaliza más los errores grandes. Y el R cuadrado en test puede ser incluso negativo si el modelo es peor que predecir la media.

### [15:30–18:30] Siempre contra una referencia

[DIAPOSITIVA 3.6-7]

Ahora, ¿un MAE de 41 es bueno? Así, en el vacío, no significa nada. Necesitamos una referencia.

[DEMO: notebook, sección 6. Ejecutar la comparación con la media de entrenamiento.]

La referencia más ingenua posible: predecir a todo el mundo la media. Su MAE es 65,5. El modelo baja a 41,5. Un 37 % menos de error. Esa es la cifra que entiende una dirección médica.

Pero podemos ir más lejos y conectar con la decisión real. El hospital solo puede hacer seguimiento intensivo al 20 % de los pacientes. ¿A cuántos de los que de verdad van a progresar más captura el modelo?

[DEMO: abrir `soluciones.ipynb`, ejercicio 4. Mostrar la captura del 68 %, la de solo IMC (55 %) y la del azar (20 %), y la curva de captura.]

Es el ejercicio 4. Eligiendo al azar capturarías el 20 %. Ordenando solo por IMC, el 55 %. Con el modelo, el 68 %: 15 de los 22 pacientes de mayor progresión. Más del triple que el azar.

Y otra lección del ejercicio 1: un modelo con solo tres variables, IMC, presión y triglicéridos, predice prácticamente igual que el de diez. Más simple, más estable y más fácil de explicar a un médico.

[DEMO: `soluciones.ipynb`, ejercicio 1. Mostrar la tabla comparativa: R² test 0,502 frente a 0,485; R² CV 0,451 frente a 0,480; MAE 42,2 frente a 41,5.]

De hecho, en el test el modelo reducido sale incluso un poco mejor, y en validación cruzada un poco peor. Diferencias de centésimas, dentro del ruido. Cuando dos modelos predicen igual, elige el más simple.

Y un último aviso sobre el ejercicio 4. El 68 % sale de solo 22 pacientes de test. Con otra partición podría ser 60 o 75. En el memorando, comunícalo como una cifra aproximada, no como una verdad exacta. Y deja claro que el modelo sirve para priorizar, no para excluir a nadie de la atención: casi un tercio de los pacientes de mayor progresión se escaparían.

[CÁMARA]

¿Y el equipo de *pricing*? Con validación, temporal en su caso, porque sus datos son series, lo habrían detectado antes de desplegar. Lo veremos en el módulo 8.

Y otra señal de alarma que deberían haber visto: 200 variables para 300 semanas. Cuando el número de variables se acerca al de observaciones, el sobreajuste está prácticamente garantizado. Una regla orientativa: desconfía de cualquier modelo con menos de 10 o 20 observaciones por coeficiente, salvo que esté regularizado.

### [18:30–20:00] Resumen y qué viene después

[DIAPOSITIVA 3.6-8]

Juzga un modelo con datos que no ha visto. El sobreajuste se reconoce por la brecha entre entrenamiento y validación. La validación cruzada sirve para elegir; el test, para confirmar una sola vez. Y compara siempre con una referencia ingenua, traduciendo la mejora a la decisión.

En el próximo y último vídeo veremos cómo domar a los modelos demasiado flexibles sin renunciar a ellos: la regularización, con Ridge y Lasso.

---

## Vídeo 3.7 · Regularización: Ridge y Lasso (duración objetivo: 20 min)

**Objetivo del vídeo:** entender la regularización como penalización de la complejidad, distinguir Ridge y Lasso, elegir α por validación cruzada e interpretar con prudencia los modelos regularizados.

**Material:** diapositivas 3.7-1 a 3.7-8; notebook, sección 5 y ejercicio 3 (`soluciones.ipynb`).

### [00:00–02:00] Gancho

[CÁMARA]

Una cadena de distribución quiere prever las ventas semanales de sus dos mil tiendas. Tiene trescientas variables: demografía del barrio, competencia, clima, promociones, accesos, aparcamiento... Ajusta una regresión con todas. Resultado: coeficientes enormes, algunos con signos absurdos, y unas predicciones que fallan en cuanto llega una tienda nueva.

¿Tiran a la basura las trescientas variables? ¿Eligen diez a ojo? Hay una tercera vía, mucho más elegante: dejar que el propio modelo decida cuánto confiar en cada variable. Se llama regularización.

Y no es un problema raro. En cuanto una empresa empieza a cruzar fuentes de datos, el número de variables candidatas se dispara: datos del CRM, de la web, del entorno, de terceros. La regularización es la herramienta estándar para trabajar en ese mundo, y es también la base de muchas técnicas que verás en deep learning.

### [02:00–05:00] Ponerle precio a la complejidad

[DIAPOSITIVA 3.7-1]

En el vídeo anterior vimos que el sobreajuste viene de coeficientes demasiado libres. La idea de la regularización es ponerles un precio.

Al criterio de mínimos cuadrados, que mide el ajuste, le sumamos una penalización por el tamaño de los coeficientes. Ahora el modelo tiene que negociar: cada coeficiente grande tiene que «pagarse» con una buena mejora del ajuste.

El hiperparámetro alfa controla el precio. Con alfa igual a cero, la penalización desaparece: mínimos cuadrados de siempre. Con alfa pequeño, poca penalización y riesgo de sobreajuste. Con alfa enorme, los coeficientes se aplastan contra cero y el modelo acaba prediciendo la media: infraajuste.

Fíjate en lo que estamos haciendo. Aceptamos un poco de sesgo a cambio de reducir mucho la varianza. Es el equilibrio sesgo-varianza en acción.

Una nota de notación: scikit-learn lo llama alfa; el libro ISLP lo llama lambda. Es lo mismo.

Una analogía que suele ayudar. Piensa en un presupuesto. Mínimos cuadrados es un comprador sin límite de gasto: compra todos los coeficientes grandes que le apetezcan si mejoran un poquito el ajuste. La regularización le impone un presupuesto. Ahora solo «compra» coeficientes grandes cuando de verdad merecen la pena. Alfa es lo estricto que es el presupuesto.

### [05:00–07:30] Ridge

[DIAPOSITIVA 3.7-2]

La primera forma de penalizar es sumar los coeficientes al cuadrado. Es la regresión Ridge, o penalización L2.

Ridge encoge todos los coeficientes hacia cero, pero casi nunca los deja exactamente en cero. Y tiene una virtud especial con variables correlacionadas: en lugar de dar más cuarenta a una y menos treinta y ocho a su gemela, como hacía mínimos cuadrados con el colesterol y el LDL, reparte el peso entre ambas de forma estable.

[DEMO: notebook, sección 5. Volver a la tabla de resultados y señalar la fila «Polinómica + Ridge».]

En el notebook, Ridge aplicado a la polinómica de 65 términos hace magia: el R cuadrado de validación cruzada pasa de 0,17 a 0,43, y en test, de 0,42 a 0,50. Mismo modelo flexible, pero domado.

Y fíjate en que la polinómica con Ridge obtiene en test el mejor R cuadrado de los cuatro modelos, 0,50, aunque su MAE, 42,2, es algo peor que el de la lineal. Diferencias pequeñas. En la práctica, con estos datos, un modelo lineal sencillo es tan bueno como uno flexible bien regularizado. Eso también es una conclusión valiosa: no siempre hace falta complicarse.

### [07:30–10:30] Lasso

[DIAPOSITIVA 3.7-3]

La segunda forma es sumar los valores absolutos de los coeficientes. Es Lasso, o penalización L1.

Parece un cambio menor, pero tiene una consecuencia enorme: Lasso puede poner coeficientes exactamente a cero. Es decir, selecciona variables.

¿Por qué? Una intuición geométrica. Imagina el conjunto de coeficientes «permitidos» por la penalización. Con L2 es un círculo, suave. Con L1 es un rombo, con esquinas puntiagudas justo sobre los ejes. La solución óptima tiende a caer en una esquina, y en una esquina algún coeficiente vale cero.

[DEMO: notebook, sección 5. Ejecutar la celda de Lasso y mostrar el gráfico de coeficientes y la lista de variables descartadas.]

En nuestros datos, LassoCV elige un alfa de 0,11 y descarta el HDL. El resto se mantiene. MAE en test: 41,5, igual que la regresión lineal, pero con una variable menos. Con un alfa mayor descartaría más.

¿Por qué el HDL? Recuerda el vídeo 3.3: su información ya está casi toda en el cociente colesterol-HDL. Lasso detecta que es redundante y prescinde de él. Pero fíjate: no ha eliminado ni el colesterol ni el LDL, a pesar de su colinealidad. Con este alfa tan pequeño, la penalización es suave. Si quisieras un modelo más compacto, podrías aumentar alfa y aceptar un pequeño aumento del error a cambio de menos variables.

[DIAPOSITIVA 3.7-4]

Resumiendo las diferencias. Ridge encoge; Lasso encoge y anula. Ridge no selecciona; Lasso sí. Con variables correlacionadas, Ridge reparte el peso y Lasso tiende a quedarse con una, de forma algo arbitraria. Ridge brilla cuando hay muchas variables con efectos pequeños; Lasso, cuando hay pocas relevantes entre muchas.

Y si dudas, Elastic Net combina ambas penalizaciones.

¿Cuál elegir en la práctica? Si necesitas un modelo compacto, con pocas variables que medir o explicar, Lasso. Si crees que casi todas las variables aportan algo y te preocupa la colinealidad, Ridge. Y si no lo tienes claro, prueba ambos con validación cruzada: es exactamente para lo que sirve.

### [10:30–12:30] Estandarizar es obligatorio

[DIAPOSITIVA 3.7-5]

Un requisito que no admite excepciones: estandarizar antes de regularizar.

La penalización suma coeficientes de variables distintas. Pero el tamaño de un coeficiente depende de las unidades. Si midieras la edad en meses en lugar de años, su coeficiente sería doce veces menor, y la penalización lo trataría de forma muy distinta, aunque el modelo sea exactamente el mismo. Sería una penalización arbitraria.

Al estandarizar, todas las variables tienen la misma escala y compiten en igualdad de condiciones.

[PANTALLA: resaltar `make_pipeline(StandardScaler(), LassoCV(...))` en el notebook.]

Por eso en el notebook siempre va `StandardScaler` dentro del pipeline. Dentro, no antes: recuerda la fuga de información.

Un efecto secundario útil: al estandarizar, los coeficientes de Lasso y Ridge quedan en una escala comparable, la misma que vimos en el vídeo 3.2. Por eso el gráfico de coeficientes Lasso del notebook se puede leer como un ranking orientativo de importancia. Orientativo, insisto.

Y otro detalle: el intercepto no se penaliza. Solo los coeficientes de las variables.

### [12:30–16:00] Elegir alfa con validación cruzada

[DIAPOSITIVA 3.7-6]

¿Cómo elegimos alfa? No con los datos de entrenamiento: ahí siempre gana alfa igual a cero, porque es el que mejor ajusta. Lo elegimos con validación cruzada. `RidgeCV` y `LassoCV` prueban una rejilla de valores y se quedan con el de menor error de validación.

[DEMO: abrir `soluciones.ipynb`, ejercicio 3. Mostrar la gráfica de MAE de entrenamiento, validación cruzada y test frente a alfa en escala logarítmica, con las zonas sombreadas.]

El ejercicio 3 lo hace visible. Es la polinómica con Ridge, con alfa desde 0,01 hasta 10.000.

A la izquierda, alfa pequeño: el error de entrenamiento es el más bajo, unos 39 puntos, pero el de validación cruzada es de 52. Brecha enorme: sobreajuste.

A la derecha, alfa enorme: las tres curvas suben juntas hacia 63, 64 puntos, acercándose al error de predecir la media. El modelo ya no aprende: infraajuste.

En medio, el valle. La validación cruzada encuentra su mínimo en torno a alfa igual a 35. Y fíjate en que la brecha entre entrenamiento y validación se va cerrando a medida que alfa crece.

Una observación honesta: en esta partición, el error de test es menor que el de validación cruzada en toda la curva. Nuestros 111 pacientes de test son algo más fáciles que la media. Otra razón para elegir con validación cruzada y no con una sola partición.

[PANTALLA: tabla impresa en el ejercicio 3 con los valores de MAE para seis valores de alfa.]

Repasa la tabla con los números. Alfa 0,01: entrenamiento 39, validación 52, test 44. Alfa en torno a 12: 40, 47 y 41. Alfa 400: los tres rondan 47 a 51. Alfa 10.000: los tres en 63 o 64. Es la U del vídeo anterior, ahora con alfa en el eje horizontal en lugar de la complejidad. De hecho, alfa es un mando de complejidad: alfa pequeño, modelo complejo; alfa grande, modelo simple.

### [16:00–18:30] Interpretar con cuidado

[DIAPOSITIVA 3.7-7]

Ahora, la letra pequeña.

Los coeficientes regularizados están sesgados hacia cero a propósito. No los compares con los de mínimos cuadrados como si midieran lo mismo.

Lasso elige entre variables correlacionadas de forma inestable. Si repites con otra muestra, puede quedarse con otra de la pareja. Que Lasso descarte una variable no significa que no importe; puede ser que otra ya cuente su historia.

Tras una selección automática, los p-valores clásicos dejan de ser válidos.

Y, por supuesto, que Lasso conserve una variable no la convierte en causa.

[CÁMARA]

Volvamos a la cadena de distribución.

Esto conecta con una idea que recorre todo el módulo: predecir bien y entender el porqué son objetivos distintos, y a veces en tensión. Un modelo puede predecir de maravilla apoyándose en variables que no son causas, sino indicadores. Por ejemplo, el número de búsquedas en internet de una tienda predice sus ventas, pero comprar búsquedas no las aumenta. Con Lasso, el modelo se queda con veinticinco variables, predice mejor en validación y da al equipo de expansión una lista corta en la que fijarse. Pero si la pregunta es «¿qué pasa si abrimos un aparcamiento?», eso no lo responde Lasso. Eso requiere un experimento o un análisis causal.

Regularizar es para predecir. Para explicar, úsalo solo como orientación.

Y un apunte para tu memorando: si te piden «las tres variables más influyentes», puedes apoyarte en los coeficientes estandarizados o en Lasso, pero justifícalo con criterio clínico y señala la multicolinealidad. En nuestros datos, IMC, triglicéridos y presión arterial aparecen fuertes en todos los enfoques: en la tabla de statsmodels, en los coeficientes estandarizados y en Lasso. Esa coherencia entre métodos es lo que da confianza.

### [18:30–20:00] Resumen del módulo y qué viene después

[DIAPOSITIVA 3.7-8]

La regularización añade un precio por la complejidad, controlado por alfa. Ridge encoge todos los coeficientes; Lasso además anula algunos y selecciona. Estandariza siempre y elige alfa por validación cruzada. Y no hagas lecturas causales.

Con esto cierras el módulo. Ya sabes ajustar, interpretar, diagnosticar, validar y regularizar un modelo de regresión. Tu caso práctico es un memorando para la dirección médica: qué modelo recomiendas, cuánto se equivoca frente a no usar modelo, qué variables pesan más y, muy importante, qué limitaciones tiene.

La semana que viene la variable respuesta deja de ser un número y pasa a ser una categoría: ¿enfermo o sano?, ¿compra o no compra? Entramos en la clasificación y en las pruebas de hipótesis.
