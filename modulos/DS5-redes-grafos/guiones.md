# Módulo 07 · Redes y grafos — Guiones de los vídeos

Convenciones de producción:

- [DIAPOSITIVA N.M-k]: mostrar la diapositiva con ese id de `diapositivas.md`.
- [PANTALLA: ...]: captura o grabación de pantalla.
- [DEMO: ...]: ejecución en directo del notebook del módulo (`notebook.ipynb`); se describe lo que se muestra, no se narra línea a línea.
- [CÁMARA]: plano del presentador.

Duración total: 105 minutos (7 vídeos).

---

## Vídeo 7.1 · Datos como redes: ejemplos en negocio (fraude, logística, redes sociales) (duración objetivo: 10 min)

**Objetivo del vídeo:** que el estudiante reconozca cuándo un problema de negocio se modela mejor como red, sepa qué son nodos y aristas, distinga los tipos de redes y conozca el caso del club de kárate.

**Material:** diapositivas 7.1-1 a 7.1-6; notebook del módulo (celda inicial); tabla de ejemplo de transferencias.

### [00:00–01:30] Gancho

[CÁMARA]

Imagina que trabajas en el equipo de fraude de un banco. Tienes millones de transferencias en una tabla: importe, fecha, cuenta de origen, cuenta de destino. Ya sabes entrenar un clasificador, lo hiciste en el módulo cuatro. Y tu modelo aprende cosas razonables: que las transferencias de madrugada son raras, que los importes redondos son sospechosos.

Pero los defraudadores no son tontos. Abren diez cuentas, se mandan dinero en círculo con importes normales, a horas normales. Cada transferencia, mirada sola, parece perfectamente inocente. ¿Cómo lo detectas?

[DIAPOSITIVA 7.1-1]

La respuesta es que el patrón no está en ninguna fila. Está en las conexiones entre filas. Y para trabajar con conexiones necesitamos una herramienta nueva: el grafo, o red. De eso va este módulo.

Y no es solo fraude. Cada vez que tus datos hablan de quién hace algo con quién, hay una red escondida en tu tabla. Pedidos entre empresas, llamadas entre clientes, correos entre empleados, rutas entre almacenes. Hoy vamos a aprender a verla.

### [01:30–03:30] Nodos y aristas

[DIAPOSITIVA 7.1-2]

Un grafo tiene solo dos ingredientes. Los nodos, que son las entidades: clientes, cuentas, almacenes, páginas web, personas. Y las aristas, que son las relaciones entre pares de nodos: un pago, una ruta de camión, un enlace, una amistad.

Mira el esquema. La cuenta A paga a la B y a la C. La C paga a la D. Y la D vuelve a pagar a la A. ¿Lo ves? Hay un ciclo. El dinero sale de A y vuelve a A. En una tabla son cinco filas sin nada especial. Dibujado como red, el ciclo salta a la vista.

Fíjate también en que las aristas pueden llevar información: aquí, el importe. Y en que tienen sentido: no es lo mismo que A pague a B que al revés.

### [03:30–05:30] Las mismas técnicas, muchos negocios

[DIAPOSITIVA 7.1-3]

Lo bonito de las redes es que la misma caja de herramientas sirve para negocios que no se parecen en nada. En logística, los nodos son plantas y almacenes, y la pregunta es qué nodo, si falla, deja sin servicio a más clientes. En marketing, los nodos son usuarios, y la pregunta es a quién le doy la muestra gratis para que el mensaje llegue más lejos. En telecomunicaciones, si tus contactos frecuentes se han dado de baja, tú tienes más riesgo de irte. En la web, qué página es más relevante: eso es PageRank, lo veremos en la lección cinco. Y en recursos humanos, quién conecta departamentos.

¿Te has fijado? La medida que identifica al empleado que conecta dos departamentos es exactamente la misma que identifica al puerto del que depende media cadena de suministro. Aprendes una vez, aplicas en todas partes.

### [05:30–07:00] Tipos de redes

[DIAPOSITIVA 7.1-4]

Antes de construir una red, tienes que tomar cuatro decisiones. ¿Tiene sentido la relación? La amistad es simétrica; un pago, no. ¿Tiene peso? Saber que dos clientes se llaman no es lo mismo que saber que se llaman cuarenta veces al mes. ¿Hay un tipo de nodo o dos? Clientes y productos forman una red bipartita, y es justo la matriz de valoraciones del módulo seis vista de otra forma. ¿Y el tiempo importa? Si las aristas tienen fecha, puedes preguntarte qué conexiones aparecerán mañana.

Elegir mal tiene consecuencias. Si en una red de pagos olvidas el sentido, el patrón de la cuenta mula, muchos pagos que entran y uno que sale, desaparece: solo verás una cuenta con muchos contactos. Y si olvidas el peso, el cliente que llama a su madre todos los días cuenta lo mismo que el que llamó una vez a un fontanero.

### [07:00–08:30] De la tabla al grafo

[DIAPOSITIVA 7.1-5]

En la práctica casi nunca te dan un grafo. Te dan una tabla con columnas origen y destino. Con NetworkX, la librería que usaremos todo el módulo, la conviertes en grafo en una línea.

[PANTALLA: celda con `nx.from_pandas_edgelist` sobre la tabla de transferencias y el resultado: 4 nodos, 5 aristas]

Pero ojo: la decisión importante no es técnica. Es qué cuenta como nodo y qué cuenta como arista. ¿Dos clientes están conectados si compraron el mismo producto? ¿Si comparten dirección? ¿Si se transfirieron dinero este trimestre? Cada elección da una red distinta y responde una pregunta distinta. Escribe la pregunta antes de construir nada.

Un ejemplo. En una cadena de supermercados, si conectas a dos clientes cuando compran el mismo producto, todos acaban conectados con todos a través del pan y la leche. Una bola de pelo inútil. Si los conectas solo cuando comparten tarjeta de fidelización o dirección de envío, de repente aparecen hogares, familias, quizá cuentas duplicadas. Misma tabla, red distinta, respuesta distinta.

### [08:30–09:30] El caso del módulo

[DIAPOSITIVA 7.1-6]

[DEMO: ejecutar la celda inicial del notebook y mostrar el dibujo del club de kárate coloreado por facción]

Nuestro caso de estudio es una red pequeña pero famosísima: el club de kárate de Zachary. Treinta y cuatro personas. Un sociólogo apuntó durante dos años quién se relacionaba con quién fuera de clase. Y en medio del estudio, el instructor, el nodo cero, y el presidente, el nodo treinta y tres, se pelearon. El club se partió en dos. La pregunta que nos va a acompañar todo el módulo: ¿podríamos haber anticipado quién se iría con quién, solo mirando la red de amistades?

### [09:30–10:00] Resumen y siguiente paso

[CÁMARA]

Resumiendo: cuando la información está en las relaciones, modela tus datos como red. Nodos para las entidades, aristas para las relaciones, y una pregunta de negocio que guíe la construcción. En el próximo vídeo aprendemos el vocabulario básico: grados, caminos y componentes.

---

## Vídeo 7.2 · Grafos: nodos, aristas, grados, caminos, componentes (duración objetivo: 15 min)

**Objetivo del vídeo:** que el estudiante sepa representar un grafo, calcular e interpretar grado, densidad, distancias, diámetro, componentes y coeficiente de agrupamiento, y evite los errores típicos al calcularlos.

**Material:** diapositivas 7.2-1 a 7.2-8; notebook, sección 1 (Métricas básicas).

### [00:00–01:30] Gancho

[CÁMARA]

Te paso una red de doscientos proveedores, doce almacenes y novecientas tiendas, y te pregunto: ¿está bien conectada? ¿Hay tiendas que dependen de un único almacén? ¿Cuántos saltos hace de media un producto hasta llegar a la estantería? Antes de algoritmos sofisticados, necesitas un puñado de métricas básicas que respondan estas preguntas en segundos. Son el equivalente al `describe` de pandas, pero para redes.

### [01:30–03:30] Tres formas de guardar un grafo

[DIAPOSITIVA 7.2-1]

Primero, ¿cómo se guarda un grafo en el ordenador? Hay tres formas. La lista de aristas: pares de nodos, uno por fila. Es lo que tienes en tu base de datos. La lista de adyacencia: para cada nodo, sus vecinos. Es lo que usa NetworkX por dentro; si escribes `G[0]` te devuelve los vecinos del nodo cero. Y la matriz de adyacencia, que llamaremos A: una matriz cuadrada con un uno en la fila i, columna j si hay arista entre i y j. Si la red tiene pesos, en lugar del uno va el peso.

La matriz es la que usaremos para PageRank y para el clustering espectral, porque nos deja usar álgebra lineal. Pero cuidado: en una red real casi todo son ceros. Un usuario de una red social no conoce ni a una millonésima parte del resto. Por eso, en redes grandes, siempre matrices dispersas.

Para que te hagas una idea: una red de un millón de clientes con cien contactos cada uno tiene cien millones de aristas. Como lista, cabe en la memoria de un portátil. Como matriz completa, serían un billón de casillas, casi todas a cero. Ningún portátil lo aguanta.

### [03:30–05:30] Grado y densidad

[DIAPOSITIVA 7.2-2]

La métrica más básica de un nodo es su grado: cuántos vecinos tiene. En redes dirigidas distinguimos el grado de entrada, cuántos apuntan a mí, y el de salida, a cuántos apunto yo. El grado medio es dos por el número de aristas entre el número de nodos. ¿Por qué dos? Porque cada arista suma uno al grado de sus dos extremos.

La densidad es la fracción de aristas posibles que realmente existen. En el kárate: treinta y cuatro nodos, setenta y ocho aristas, grado medio cuatro coma seis, densidad cero coma catorce. Es decir, solo el catorce por ciento de los pares posibles se relacionan. Y eso que es un club pequeño y unido. En redes grandes la densidad es minúscula.

[DIAPOSITIVA 7.2-3]

La primera gráfica que debes mirar siempre es la distribución de grados. En el kárate, la mayoría tiene entre dos y cinco contactos. Y hay tres nodos que destacan: el treinta y dos con doce, el cero con dieciséis y el treinta y tres con diecisiete. ¿Te suenan? El instructor y el presidente. La distribución de grados ya te está señalando a los líderes.

Y piensa en la red de proveedores del principio. Si una tienda tiene grado de entrada uno, es decir, solo la abastece un almacén, ya sabes que depende de un único punto. Esa lista sale con una línea de código y vale oro para el equipo de operaciones.

### [05:30–08:00] Caminos y distancias

[DIAPOSITIVA 7.2-4]

Un camino es una secuencia de nodos unidos por aristas. La distancia entre dos nodos es la longitud del camino más corto, contando aristas. Con ella definimos dos métricas globales. La distancia media, que en el kárate es dos coma cuatro: de media, cualquier miembro está a dos o tres saltos de cualquier otro. Y el diámetro, la mayor distancia de todas, que aquí es cinco. Por ejemplo, para ir del nodo dieciséis al veinticinco hay que pasar por el cinco, el cero y el treinta y uno.

¿Cómo se calcula? Si no hay pesos, con una búsqueda en anchura. Si los pesos son costes, kilómetros o minutos, con el algoritmo de Dijkstra. Y aquí un aviso que causa muchos errores: si tu peso significa intensidad, por ejemplo número de llamadas, un peso alto debería acercar a los nodos, no alejarlos. Tendrías que usar como distancia algo como uno entre el peso.

¿Para qué sirve la distancia media en negocio? En logística, es el número medio de manipulaciones que sufre un producto; cada salto es tiempo y coste. En una organización, es cuántos intermediarios hacen falta para que una información llegue de un punto a otro. Y en una red social, es lo rápido que puede viajar un rumor.

### [08:00–09:30] Componentes conexas

[DIAPOSITIVA 7.2-5]

Una red es conexa si puedes llegar de cualquier nodo a cualquier otro. Si no, se divide en componentes. Lo típico en redes reales es una componente gigante con casi todos los nodos y muchas pequeñitas alrededor.

En redes dirigidas hay un matiz: la componente fuertemente conexa exige poder ir y volver respetando el sentido. Y aquí vuelve el fraude: un grupo de cuentas nuevas que forman una componente fuertemente conexa significa que el dinero puede dar vueltas entre ellas. Señal de alarma.

Lo primero que conviene hacer con una red nueva es contar sus componentes y mirar sus tamaños. Si tu red de clientes tiene una componente gigante y miles de parejas sueltas, esas parejas son probablemente clientes que solo se relacionan entre sí, y cualquier análisis de centralidad las va a ignorar. El club de kárate, por suerte, es una única componente.

### [09:30–11:30] Agrupamiento

[DIAPOSITIVA 7.2-6]

Última métrica, y muy importante: el coeficiente de agrupamiento. Para un nodo, mira a sus vecinos y pregúntate: ¿cuántos de ellos se conocen entre sí? Si tus amigos son amigos entre ellos, tu agrupamiento es alto. Técnicamente, cuenta qué fracción de los posibles triángulos alrededor del nodo están cerrados.

En el kárate, el agrupamiento medio es cero coma cincuenta y siete. Si dos personas son amigas de una tercera, más de la mitad de las veces son amigas entre sí. ¿Es mucho? Compáralo con una red aleatoria con los mismos nodos y aristas: daría cero coma catorce. Cuatro veces menos. Ese exceso de triángulos es la huella de los grupos, y lo explotaremos en la lección de comunidades.

¿Por qué hay tantos triángulos en las redes sociales? Porque nos presentan a gente a través de amigos comunes, porque coincidimos en los mismos sitios, porque compartimos clase, equipo u oficina. En una red de proveedores, en cambio, los triángulos son más raros, y cuando aparecen suelen indicar un clúster industrial: empresas de la misma zona que se suministran entre sí.

### [11:30–13:30] Demo en el notebook

[DIAPOSITIVA 7.2-7]

[DEMO: ejecutar la sección 1 del notebook; mostrar las cinco métricas impresas y el gráfico de barras de la distribución de grados]

Vamos al notebook. En la sección uno tienes las métricas en cinco líneas: número de nodos y aristas, densidad, grado medio, distancia media y coeficiente de agrupamiento. Cada una es una función de NetworkX. Y debajo, la distribución de grados como gráfico de barras. Fíjate en la cola de la derecha: esos tres nodos solitarios con muchísimas conexiones.

[PANTALLA: añadir en una celda `nx.number_connected_components(G)` y `nx.diameter(G)` y mostrar 1 y 5]

### [13:30–14:30] Errores frecuentes

[DIAPOSITIVA 7.2-8]

Tres errores que verás mucho. Uno: calcular la distancia media en una red que no es conexa. Entre componentes distintas la distancia es infinita, y NetworkX te devuelve un error. Calcúlala en la componente gigante o usa la eficiencia global, que lo verás en el ejercicio dos. Dos: comparar densidades de redes de tamaños muy distintos; la densidad cae casi siempre al crecer la red. Y tres: confundir el agrupamiento medio con la transitividad. Suenan parecido, pero en el kárate una da cero coma cincuenta y siete y la otra cero coma veintiséis.

### [14:30–15:00] Resumen y siguiente paso

[CÁMARA]

Ya tienes el vocabulario: grado, densidad, distancia, diámetro, componentes y agrupamiento. En el próximo vídeo usamos estas métricas para descubrir dos propiedades sorprendentes de casi todas las redes reales: que son mundos pequeños y que tienen hubs.

---

## Vídeo 7.3 · Mundos pequeños y redes libres de escala (duración objetivo: 10 min)

**Objetivo del vídeo:** que el estudiante entienda qué es un mundo pequeño y una red libre de escala, los modelos que los explican (Erdős–Rényi, Watts–Strogatz, Barabási–Albert) y sus consecuencias para difusión y robustez.

**Material:** diapositivas 7.3-1 a 7.3-8; notebook, sección 1; simulación auxiliar con `nx.connected_watts_strogatz_graph` y `nx.barabasi_albert_graph`.

### [00:00–01:00] Gancho

[CÁMARA]

¿Por qué un bulo llega a todo el país en una tarde? ¿Por qué un problema en un único puerto de Asia deja sin piezas a fábricas en media Europa? Las dos preguntas tienen la misma respuesta: la forma que tienen las redes reales. Y esa forma tiene dos rasgos que vamos a ver hoy.

### [01:00–02:30] Dos sorpresas y una referencia

[DIAPOSITIVA 7.3-1]

Cuando en los noventa se empezaron a analizar redes reales enormes, aparecieron dos regularidades. Primera: todo el mundo está a muy pocos saltos de todo el mundo. Segunda: unos pocos nodos acaparan muchísimas conexiones.

[DIAPOSITIVA 7.3-2]

Para saber si algo es sorprendente, necesitamos una referencia. La más simple es la red aleatoria de Erdős y Rényi: cada par de nodos se conecta con la misma probabilidad, como lanzando una moneda trucada. En una red así, casi todos los nodos tienen un grado parecido a la media, no hay hubs. Las distancias son cortas. Pero casi no hay triángulos: el agrupamiento es minúsculo.

### [02:30–05:00] Mundos pequeños

[DIAPOSITIVA 7.3-3]

En 1967, el psicólogo Stanley Milgram pidió a personas del centro de Estados Unidos que hicieran llegar una carta a un desconocido en Boston, pero solo a través de conocidos personales. Las cartas que llegaron lo hicieron en unos seis pasos. De ahí viene lo de los seis grados de separación.

Pero lo sorprendente no es solo que las distancias sean cortas. Es que lo son a la vez que hay muchísimos triángulos. Tus amigos se conocen entre sí, y aun así estás a seis pasos del resto del planeta.

[DIAPOSITIVA 7.3-4]

Watts y Strogatz lo explicaron con un experimento mental precioso. Pon mil personas en un anillo; cada una conoce solo a sus diez vecinos más próximos. Muchos triángulos, pero para cruzar el anillo necesitas cincuenta pasos. Ahora recablea al azar solo el uno por ciento de las aristas: unos pocos atajos. La distancia media cae de cincuenta a menos de diez, y el agrupamiento casi no se mueve. Unos pocos atajos lo cambian todo.

En tu empresa, esos atajos son las personas que tienen contactos fuera de su equipo: el comercial que habla con producción, la ingeniera que estuvo antes en marketing. Son pocas, pero son las que hacen que la organización sea un mundo pequeño. Si se van, las distancias se disparan.

[DIAPOSITIVA 7.3-5]

¿Y nuestro club? Distancia media dos coma cuatro, igual que una red aleatoria del mismo tamaño. Agrupamiento cero coma cincuenta y siete, cuatro veces más. Es un mundo pequeño de manual.

### [05:00–07:30] Redes libres de escala

[DIAPOSITIVA 7.3-6]

Segunda sorpresa. En muchas redes reales, la distribución de grados no es una campana. Tiene una cola larguísima: la mayoría tiene pocos contactos y unos pocos tienen miles. Matemáticamente, la probabilidad de tener grado k cae como una potencia de k. Si lo dibujas en escala logarítmica en los dos ejes, sale casi una recta.

Para que lo veas con números: simulé dos redes de diez mil nodos con grado medio cuatro. En la aleatoria, el nodo más conectado tiene catorce contactos. En la libre de escala, unos doscientos sesenta.

[DIAPOSITIVA 7.3-7]

¿De dónde salen esos hubs? Barabási y Albert propusieron dos ingredientes: la red crece, y los nodos nuevos se conectan preferentemente a los que ya tienen muchas conexiones. El rico se hace más rico. Piensa en las webs más enlazadas, en los aeropuertos con más rutas, en las cuentas con más seguidores.

Si eres una aerolínea nueva, ¿adónde abres rutas? A los aeropuertos que ya tienen más conexiones, porque ahí está el tráfico. Y al hacerlo, esos aeropuertos ganan todavía más conexiones. Así nacen los hubs.

Un matiz honesto: lo de «libre de escala» se ha usado con alegría. Ajustar una ley de potencias a datos reales es delicado. Para tus decisiones, lo que importa no es el exponente exacto, sino si hay hubs y cuánto dependes de ellos.

### [07:30–09:30] Consecuencias para el negocio

[DIAPOSITIVA 7.3-8]

Tres consecuencias. Primera: la difusión es rapidísima, y si siembras en un hub, más. Segunda: estas redes son robustas a fallos aleatorios, porque si falla un nodo al azar casi seguro es uno pequeño. Pero son frágiles ante ataques dirigidos: si cae un hub, la red se rompe. En el ejercicio dos del notebook lo vas a comprobar quitando un solo nodo del club.

Y tercera, mi favorita: la paradoja de la amistad. De media, tus amigos tienen más amigos que tú. No es que seas poco popular, es aritmética: los hubs aparecen en muchísimas listas de amigos. En el kárate, el grado medio es cuatro coma seis, pero el grado medio de «un amigo de alguien» es siete coma ocho. Se ha usado para detectar brotes epidémicos antes: en lugar de vigilar a gente al azar, vigilas a sus amigos.

[DEMO: en la sección 1 del notebook, señalar de nuevo la cola de la distribución de grados y comentar que con 34 nodos no se puede ajustar una ley de potencias]

### [09:30–10:00] Resumen y siguiente paso

[CÁMARA]

Las redes reales son mundos pequeños, con distancias cortas y muchos triángulos, y suelen tener hubs. Eso las hace rápidas para difundir y frágiles ante ataques a sus nodos clave. ¿Cómo encontramos esos nodos clave? Con las centralidades, en el próximo vídeo.

---

## Vídeo 7.4 · Centralidades: grado, intermediación, cercanía, autovector (duración objetivo: 20 min)

**Objetivo del vídeo:** que el estudiante sepa calcular e interpretar las cuatro centralidades clásicas, entienda qué pregunta responde cada una y sepa elegir la adecuada para un problema de negocio.

**Material:** diapositivas 7.4-1 a 7.4-8; notebook, sección 2 (Centralidad); ejercicio 4.

### [00:00–01:30] Gancho

[CÁMARA]

Eres la directora de Recursos Humanos. La empresa va a hacer una reestructuración y te piden la lista de las diez personas que no te puedes permitir perder. ¿Cogerías a los diez con más reuniones en el calendario? ¿A los diez con más cargo? Hoy vamos a ver que la palabra «importante» tiene al menos cuatro significados distintos en una red, y que elegir el equivocado puede salir muy caro.

Y no es un problema solo de personas. El mismo dilema lo tiene el responsable de compras que decide qué proveedores auditar primero, el equipo de seguridad que decide qué servidores proteger, o la agencia de marketing que decide a qué creadores de contenido pagar. Todos necesitan ordenar nodos por importancia. Y todos tienen que decidir antes qué significa importancia para ellos.

### [01:30–03:30] Importante depende de la pregunta

[DIAPOSITIVA 7.4-1]

Piensa en cuatro preguntas. ¿Quién tiene más contactos? Eso es la centralidad de grado. ¿Quién conecta grupos que, sin él, no se hablarían? Intermediación. ¿Quién puede llegar más rápido a todos los demás? Cercanía. ¿Quién está rodeado de gente que a su vez es importante? Autovector.

Las cuatro son razonables. Las cuatro responden preguntas distintas. Y como vamos a ver, a veces señalan a personas diferentes. La regla de oro de esta lección: primero la pregunta, después la medida.

Ponlo en tu empresa. Si quieres lanzar un anuncio interno, te interesa quien tiene más contactos. Si te preocupa la continuidad del negocio, te interesa quien conecta áreas. Si necesitas que una alerta de seguridad llegue a todos en minutos, te interesa quien está cerca de todos. Y si buscas a quién convencer primero de un cambio, te interesa quien influye sobre los influyentes. Cuatro preguntas de negocio, cuatro medidas, y potencialmente cuatro listas distintas de personas.

### [03:30–05:30] Grado

[DIAPOSITIVA 7.4-2]

La más sencilla: cuántos vecinos tienes, dividido entre el máximo posible, que es n menos uno. Mide popularidad, exposición directa. En el kárate, el presidente tiene cero coma cincuenta y uno: conoce a la mitad del club. El instructor, cero coma cuarenta y ocho.

Es barata y sorprendentemente útil. Pero tiene un punto ciego: solo mira el vecindario inmediato. Una persona con diez contactos todos metidos en la misma esquina de la red puntúa igual que otra con diez contactos repartidos por todas partes. Y para muchas preguntas, eso no es lo mismo.

Un ejemplo de negocio donde el grado funciona muy bien: en una red de llamadas de una operadora, el número de contactos distintos de un cliente predice bastante bien su influencia en el barrio. Y donde funciona mal: en una red de proveedores, el proveedor con más clientes puede ser perfectamente sustituible, mientras que uno con dos clientes puede ser el único que fabrica una pieza crítica.

### [05:30–09:00] Intermediación

[DIAPOSITIVA 7.4-3]

La intermediación mira otra cosa. Toma todos los pares de nodos de la red, calcula los caminos más cortos entre ellos y cuenta qué fracción pasa por ti. Si muchos caminos pasan por ti, eres un puente, un cuello de botella, alguien que controla el flujo.

En el kárate, aquí el orden cambia: el instructor, el nodo cero, lidera con cero coma cuarenta y cuatro, claramente por delante del presidente. ¿Por qué? Porque hay un grupito de miembros periféricos que solo se conectan con el club a través de él.

Esta es la medida para la pregunta: ¿qué pasa si este nodo desaparece? El proveedor único de un componente. El técnico que es el único enlace entre la sede y la fábrica. El router por el que pasa todo el tráfico de una oficina.

Un detalle práctico: el cálculo exacto es caro, porque hay que calcular caminos más cortos desde todos los nodos. En redes de millones de nodos se aproxima muestreando una parte; en NetworkX, con el parámetro `k`.

Piensa en lo que significa una intermediación alta en una cadena de suministro. Es un punto por el que pasa una parte grande del flujo. Si funciona, todo va bien y nadie se acuerda de él. Si falla, se para media red. Por eso los equipos de riesgos deberían tener esta lista actualizada, con un plan B para cada nodo de la parte de arriba.

### [09:00–10:30] Cercanía

[DIAPOSITIVA 7.4-4]

La cercanía es la inversa de tu distancia media al resto. Si estás a pocos pasos de todos, tu cercanía es alta. Sirve para preguntas de rapidez: dónde pongo un almacén central, a quién le cuento una información urgente para que llegue rápido a todos.

En el kárate los valores están muy apretados, entre cero coma cinco y cero coma cincuenta y siete los primeros. Normal: en una red tan pequeña todos están cerca de todos. En redes grandes, la cercanía discrimina mucho más.

Un aviso técnico: si la red no es conexa, la distancia a los nodos de otra componente es infinita y la fórmula se rompe. NetworkX calcula la cercanía de cada nodo solo dentro de su componente, con una corrección por el tamaño. Si tu red tiene varias componentes, lee la documentación antes de interpretar los números.

### [10:30–13:30] Autovector

[DIAPOSITIVA 7.4-5]

Y la más elegante: la centralidad de autovector. La idea es recursiva. Tu importancia es proporcional a la suma de las importancias de tus vecinos. No basta con tener muchos amigos: importa que tus amigos sean importantes.

Si escribimos eso como ecuación, sale que el vector de importancias multiplicado por la matriz de adyacencia da el mismo vector multiplicado por un número. Es decir, es un autovector de A. Concretamente, el asociado al mayor autovalor, que en redes conexas tiene todas sus componentes positivas. ¿Te acuerdas de PCA en el módulo dos? Mismo tipo de herramienta, otra aplicación.

En el kárate, el presidente supera ligeramente al instructor. El presidente está rodeado de miembros que a su vez están muy conectados entre sí.

En negocio, esta medida es la que más se parece a la idea intuitiva de influencia. Un comercial que conoce a pocos directivos, pero directivos muy bien conectados, puede ser más valioso que otro con una agenda enorme de contactos irrelevantes. Y en una red de inversores, el que coinvierte con los fondos más activos suele tener mejor información.

Tiene un problema en redes dirigidas: si nadie te apunta, tu importancia es cero, y transmites cero a quien apuntas. En la web eso es un desastre. La solución se llama PageRank, y es el próximo vídeo.

### [13:30–17:00] Comparación y demo

[DIAPOSITIVA 7.4-6]

Pongamos las cuatro medidas juntas. Arriba coinciden: el cero y el treinta y tres son los más centrales con cualquier criterio. Pero en medio discrepan. Mira el nodo treinta y uno: solo tiene seis contactos, pero su intermediación es casi igual que la del treinta y dos, que tiene doce. Es un puente entre grupos. Si miraras solo el grado, se te escaparía.

Y mira el nodo dos: por grado está en cuarta posición, pero por cercanía es el segundo, por delante incluso del presidente. Está a muy pocos pasos de todo el club porque tiene amigos en las dos facciones. Si quisieras que una información llegara rápido a ambos bandos sin pasar por los líderes, sería un buen candidato.

[DIAPOSITIVA 7.4-7]

[DEMO: ejecutar la sección 2 del notebook; mostrar la tabla de centralidades ordenada por intermediación y los dos grafos con el tamaño de nodo proporcional a grado e intermediación]

En el notebook, la sección dos calcula las cinco medidas, incluida PageRank, en un único DataFrame. Mira los dos dibujos: a la izquierda el tamaño es el grado y a la derecha la intermediación. A la derecha el nodo cero crece y aparecen nodos medianos, como el treinta y uno, que hacen de puente.

[PANTALLA: añadir `centralidades.corr(method="spearman").round(2)` y mostrar la correlación de 0,90 entre grado e intermediación y de 0,69 entre intermediación y autovector]

Un truco útil: la correlación de rangos entre medidas. Grado e intermediación tienen cero coma noventa. Intermediación y autovector bajan a cero coma sesenta y nueve. Cuanto más baja, más importa elegir bien.

Fíjate también en cómo cambian los rankings. Por grado, el treinta y tres es el primero. Por intermediación, el cero. Por cercanía, el cero. Por autovector, el treinta y tres. Si tuvieras que elegir a una sola persona para una misión concreta, la medida decidiría por ti. Por eso, en un informe, no digas solo «el nodo más central»: di «el más central según tal medida, porque la pregunta es tal».

### [17:00–19:00] Ejemplo de negocio

[DIAPOSITIVA 7.4-8]

Volvamos a Recursos Humanos. Con la red de correos y reuniones de dos mil empleados, el grado saca a los directivos y a sus asistentes: mucha comunicación. Pero la intermediación saca dos perfiles inesperados: un técnico de sistemas y una responsable de compras, que son los únicos enlaces entre la sede y dos fábricas. Si se van, la coordinación se resiente, aunque su cargo no sea alto. Para un plan de sucesión, esa es la lista que importa.

Y aquí hay una lección de comunicación. Cuando presentes este análisis a dirección, no hables de «centralidad de intermediación». Habla de «personas que son el único puente entre áreas» y enseña el dibujo de la red con ellas resaltadas. Una imagen con dos nodos pequeños sujetando media empresa convence más que cualquier tabla.

En el ejercicio cuatro del notebook harás lo mismo con los personajes de *Los miserables*. Te adelanto que no todas las medidas eligen al mismo protagonista.

Y un consejo práctico para tus informes: presenta siempre una tabla con varias medidas, como la del notebook, y comenta las discrepancias. Si un nodo aparece arriba en todas, es claramente crítico. Si solo aparece en intermediación, es un puente: poca visibilidad, mucho impacto si falla. Esos son justo los que nadie tiene en el radar.

### [19:00–20:00] Resumen y siguiente paso

[CÁMARA]

Grado es popularidad. Intermediación, puente. Cercanía, rapidez. Autovector, influencia. Coinciden en los extremos y discrepan en medio, y esas discrepancias son información. En el próximo vídeo, el algoritmo que convirtió la centralidad de autovector en una empresa de un billón de dólares: PageRank.

---

## Vídeo 7.5 · PageRank (duración objetivo: 15 min)

**Objetivo del vídeo:** que el estudiante entienda PageRank como distribución estacionaria de un paseo aleatorio con teletransporte, sepa implementarlo por iteración de potencias y conozca el PageRank personalizado y sus usos en negocio.

**Material:** diapositivas 7.5-1 a 7.5-8; notebook, sección 3 (PageRank desde cero).

### [00:00–01:30] Gancho

[CÁMARA]

Finales de los noventa. Buscas «hotel barato en Madrid» y el primer resultado es una página que repite «hotel barato» mil veces en letra blanca sobre fondo blanco. Los buscadores de la época ordenaban por palabras, y eso era facilísimo de trucar. Dos estudiantes de doctorado en Stanford, Larry Page y Sergey Brin, tuvieron una idea distinta: no preguntes a la página qué dice de sí misma, pregunta a la web qué opina de ella. Esa idea es PageRank.

Y fíjate en que esa idea va mucho más allá de la web. Valorar artículos científicos por quién los cita. Ordenar jugadores de ajedrez por a quién han ganado. Detectar qué cuentas de un banco están más cerca del dinero sucio. Todas son la misma idea: tu importancia depende de la importancia de quien te señala.

### [01:30–03:00] La idea

[DIAPOSITIVA 7.5-1]

La intuición es la de la centralidad de autovector del vídeo anterior: una página es relevante si la enlazan páginas relevantes. Un enlace es como un voto, y los votos de páginas importantes valen más. Pero la web es una red dirigida, gigantesca y llena de rincones raros. Hay que hacer algunos ajustes.

### [03:00–05:30] El paseante aleatorio

[DIAPOSITIVA 7.5-2]

Imagina a un internauta aburrido. Empieza en una página cualquiera y hace clic en un enlace al azar. Y en otro. Y en otro. Durante muchísimo tiempo. Ahora pregúntate: ¿qué fracción del tiempo pasa en cada página?

Las páginas con muchos enlaces de entrada se visitan más. Y si esos enlaces vienen de páginas muy visitadas, más todavía. Esa fracción del tiempo, a largo plazo, es exactamente el PageRank.

Es como medir la popularidad de los bares de una ciudad soltando a miles de turistas que van de bar en bar siguiendo recomendaciones. Al cabo de un tiempo, cuentas cuántos turistas hay en cada bar. Los bares recomendados por bares concurridos acaban llenos.

[DIAPOSITIVA 7.5-3]

En lenguaje matemático, el paseo es una cadena de Markov. Construimos una matriz de transición M: en cada columna j, la probabilidad de saltar de j a cada vecino, que es uno entre el número de enlaces de salida de j. Si r es el vector de probabilidades de estar en cada nodo, un paso del paseo es multiplicar M por r. Y lo que buscamos es el vector que ya no cambia: r igual a M por r. La distribución estacionaria.

Un detalle que da muchos errores: las columnas de M tienen que sumar uno, porque desde cada nodo el paseante tiene que ir a algún sitio. Si al programarlo normalizas por filas y multiplicas por columnas, obtendrás números que parecen razonables pero están mal. Comprueba siempre que tu vector r suma uno.

### [05:30–08:00] Problemas y teletransporte

[DIAPOSITIVA 7.5-4]

El paseo puro tiene dos problemas. Primero, los callejones sin salida: páginas sin enlaces. El paseante llega y no puede seguir; la probabilidad se pierde. Segundo, las trampas: un grupo de páginas que solo se enlazan entre ellas. El paseante entra y ya no sale, y todo el PageRank acaba atrapado ahí. Un spammer podría crear mil páginas que se enlazan entre sí precisamente para eso.

[DIAPOSITIVA 7.5-5]

La solución es el teletransporte. En cada paso, con probabilidad d, que suele ser cero coma ochenta y cinco, el paseante sigue un enlace. Y con probabilidad uno menos d, se aburre y salta a una página cualquiera al azar. La ecuación queda: r igual a uno menos d entre n, más d por M por r.

Esto garantiza que exista una única solución, y que llegues a ella empieces donde empieces. Y tiene una lectura bonita: con d igual a cero coma ochenta y cinco, el paseante sigue de media unos seis o siete enlaces antes de aburrirse.

### [08:00–11:00] Iteración de potencias: demo

[DIAPOSITIVA 7.5-6]

¿Cómo se calcula con miles de millones de páginas? No invirtiendo matrices. Se coge la ecuación y se aplica una y otra vez, empezando por una distribución uniforme. Se llama iteración de potencias, y converge rápido: con cincuenta o cien vueltas sobra.

[DEMO: ejecutar la sección 3 del notebook; recorrer la función `pagerank`: matriz de adyacencia, normalización por columnas, vector inicial uniforme, bucle de 100 iteraciones; mostrar la diferencia máxima con `nx.pagerank`]

En el notebook está implementado en seis líneas. Construimos la matriz de adyacencia, dividimos cada columna por su suma para tener la matriz de transición, empezamos con todos los nodos a uno entre n y aplicamos la ecuación cien veces. Comparamos con la función de NetworkX y la diferencia es del orden de diez a la menos cinco. Has reimplementado el corazón del primer Google en seis líneas.

Prueba tú a cambiar d. Con d igual a cero coma cinco, el teletransporte pesa mucho y todos los nodos se acercan a uno entre treinta y cuatro. Con d cerca de uno, los nodos centrales se llevan todavía más, pero la convergencia es más lenta. El cero coma ochenta y cinco es un compromiso que funciona bien en la práctica.

Un detalle: tanto nuestra versión como la de NetworkX usan los pesos de las aristas. El paseante elige con más probabilidad las relaciones más intensas.

### [11:00–12:30] Resultado en el kárate

[DIAPOSITIVA 7.5-7]

¿Qué sale en el club? El treinta y tres, el cero, el treinta y dos y el dos, en ese orden. Prácticamente el mismo ranking que por grado. ¿Decepcionante? No: en una red no dirigida, el PageRank sin teletransporte es exactamente proporcional al grado. Donde PageRank brilla es en redes dirigidas, como la web o una red de pagos, donde no es lo mismo recibir un enlace de una página importante que de una página basura.

### [12:30–14:30] PageRank personalizado

[DIAPOSITIVA 7.5-8]

Y ahora el truco más útil para negocio. ¿Qué pasa si el paseante, cuando se aburre, no salta a cualquier sitio, sino solo a un conjunto concreto de nodos? Entonces el PageRank mide lo cerca que está cada nodo de ese conjunto. Se llama PageRank personalizado.

Ejemplo: un banco tiene trescientas cuentas confirmadas como fraude. Calcula un PageRank personalizado sobre la red de transferencias con teletransporte solo a esas trescientas. Las cuentas con puntuación alta son las que más dinero intercambian, directa o indirectamente, con los defraudadores. Esas van a revisión. Sin entrenar ningún modelo, la red propaga la sospecha.

Además, el resultado es fácil de explicar a un auditor o a un regulador: esta cuenta está aquí porque recibe dinero de cuentas que a su vez reciben dinero de defraudadores confirmados. Esa explicabilidad, en banca, vale tanto como la precisión. Lo mismo sirve para recomendar productos cercanos a lo que ha comprado un cliente.

En NetworkX es un único parámetro: `personalization`.

Y no hace falta ser un banco. Una tienda online puede construir una red de productos que se compran juntos y calcular un PageRank personalizado desde el carrito de cada cliente. Lo que sale arriba son los productos más cercanos a lo que ya ha elegido. Es una forma sencilla y muy explicable de recomendar, que conecta directamente con lo que viste en el módulo seis.

### [14:30–15:00] Resumen y siguiente paso

[CÁMARA]

PageRank es la fracción de tiempo que un paseante aleatorio pasa en cada nodo. El teletransporte lo hace robusto, la iteración de potencias lo hace calculable y la personalización lo hace útil más allá de la web. En el próximo vídeo cambiamos de pregunta: ya no quién es importante, sino qué grupos hay. Y vamos a predecir la ruptura del club.

---

## Vídeo 7.6 · Comunidades: modularidad, Louvain y clustering espectral (duración objetivo: 20 min)

**Objetivo del vídeo:** que el estudiante entienda qué es una comunidad y la modularidad, sepa aplicar Louvain y el clustering espectral con el vector de Fiedler, interprete sus resultados con ARI y sepa cuándo usar cada método.

**Material:** diapositivas 7.6-1 a 7.6-9; notebook, sección 4 (Detección de comunidades).

### [00:00–01:30] Gancho

[CÁMARA]

Una aseguradora tiene doscientos mil siniestros al año. En algún sitio, escondidos entre ellos, hay grupos organizados: los mismos testigos, los mismos talleres, los mismos abogados, una y otra vez, con nombres de asegurados distintos. Nadie le ha dicho a la aseguradora cuántos grupos hay ni quién está en ellos. ¿Cómo los encuentra? Buscando zonas de la red mucho más densas de lo normal. Eso es detectar comunidades.

### [01:30–03:00] Qué es una comunidad

[DIAPOSITIVA 7.6-1]

Una comunidad es un grupo de nodos con muchas aristas dentro y pocas hacia fuera. Es como el clustering del módulo dos, con una diferencia: no tenemos coordenadas ni distancias, solo sabemos quién está conectado con quién.

Y el club de kárate es el ejemplo perfecto, porque aquí sabemos la respuesta: después de la ruptura, cada miembro se fue con el instructor o con el presidente. Así que podemos comprobar si los algoritmos aciertan.

Esto es poco habitual. En la vida real casi nunca tienes la respuesta, y una comunidad es una hipótesis que hay que validar. Por eso el kárate es tan valioso para aprender: nos deja medir el acierto con el ARI, el índice de Rand ajustado que ya conoces del módulo dos.

### [03:00–06:00] Modularidad

[DIAPOSITIVA 7.6-2]

Primero necesitamos una forma de decir si una partición es buena. ¿Contar las aristas que quedan dentro de los grupos? No funciona: si meto a todos en un único grupo, todas las aristas quedan dentro. Necesitamos comparar con algo.

La modularidad compara las aristas internas con las que esperarías por puro azar. Pero no cualquier azar: un azar que respeta los grados. Si dos nodos tienen muchos contactos, es normal que estén conectados aunque no haya ninguna comunidad. El término k i por k j entre dos m es precisamente cuántas aristas esperarías entre ellos.

Así que la modularidad suma, para cada par de nodos del mismo grupo, la arista real menos la esperada. Si sale cerca de cero, tus grupos no son más densos que el azar. Por encima de cero coma tres, hay estructura clara. En el kárate, la partición real en dos facciones tiene modularidad cero coma treinta y nueve.

Una forma de pensarlo: la modularidad responde a la pregunta «¿cuánto me sorprendería ver tantas aristas dentro de estos grupos si la red fuera aleatoria?». Si nada, la partición no aporta. Si mucho, los grupos son reales.

### [06:00–09:30] Louvain

[DIAPOSITIVA 7.6-3]

Encontrar la partición con máxima modularidad es un problema computacionalmente intratable. Así que usamos heurísticas, y la más popular se llama Louvain, por la universidad belga donde se inventó.

Funciona en dos fases. En la primera, cada nodo empieza solo en su propio grupo. Vamos recorriendo los nodos y moviendo cada uno al grupo vecino que más sube la modularidad, hasta que nadie quiere moverse. En la segunda fase, cada grupo se convierte en un supernodo, y repetimos sobre la red encogida. Y así hasta que la modularidad deja de subir.

Es rapidísimo, funciona con millones de nodos, y decide solo cuántos grupos hay. Dos avisos: tiene una parte aleatoria, así que fija siempre la semilla. Y su sucesor, Leiden, corrige algunos defectos; si trabajas con redes grandes, échale un ojo.

¿Por qué funciona tan bien? Porque mover un nodo de un grupo a otro solo cambia la modularidad en una cantidad que se calcula mirando a sus vecinos. No hay que recalcular nada de la red entera. Por eso cada paso es baratísimo, y por eso se puede aplicar a la red de llamadas de un país entero. De hecho, el artículo original lo probó con una red de millones de clientes de telefonía belgas.

[DIAPOSITIVA 7.6-4]

[DEMO: ejecutar la primera celda de la sección 4 del notebook; mostrar «Louvain: 4 comunidades | modularidad = 0.444»]

En el kárate, Louvain encuentra cuatro comunidades con modularidad cero coma cuarenta y cuatro. Más alta que la de la partición real. Y el ARI frente a las facciones reales es cero coma cincuenta y uno. ¿Ha fallado? No. Si miras el dibujo, verás que cada facción real aparece partida en dos subgrupos. Louvain ha encontrado una estructura más fina. La lección: la partición de máxima modularidad no tiene por qué ser la que a ti te interesa.

En negocio pasa constantemente. Le pides al algoritmo segmentos de clientes y te devuelve veinte. Para la dirección comercial quizá solo tengan sentido cuatro. Puedes ajustar la resolución, agrupar comunidades parecidas o pasar al método espectral si sabes cuántos grupos quieres. Lo importante es no tomar la salida del algoritmo como un dogma.

Y una pregunta que te harán siempre: ¿cuál es la buena, la de cuatro grupos o la de dos? Las dos. La de dos describe el conflicto principal; la de cuatro, los grupitos de amigos dentro de cada bando. Depende de la decisión que tengas que tomar. Si eres el instructor y quieres saber quién se queda contigo, te sirve la de dos. Si organizas los turnos de entrenamiento, quizá te sirva más la de cuatro.

### [09:30–14:00] Clustering espectral

[DIAPOSITIVA 7.6-5]

Segundo enfoque, con otra pregunta: ¿cómo parto la red en dos cortando el menor número de aristas, sin que uno de los lados sea ridículamente pequeño?

La herramienta es la matriz laplaciana: L igual a D menos A, donde D es la matriz diagonal con los grados. Tiene una propiedad mágica. Si asignas a cada nodo un número x, la expresión x traspuesto por L por x es la suma, sobre todas las aristas, de la diferencia al cuadrado entre los extremos. Si pones más uno a un grupo y menos uno al otro, esa suma cuenta exactamente las aristas que cortas.

Así que minimizar esa expresión es minimizar el corte. Exigir valores más uno y menos uno es intratable, pero si permitimos números reales, la solución es un autovector de la laplaciana. El primero no sirve, es constante. El segundo, el llamado vector de Fiedler, es la mejor partición en dos. Y su autovalor, lambda dos, te dice lo fácil que es partir la red: cuanto más cerca de cero, más fácil.

No te asustes con el álgebra. La idea es: queremos asignar un número a cada nodo de forma que los nodos conectados tengan números parecidos. El vector de Fiedler es la forma más suave de hacerlo sin que todos tengan el mismo número. Los nodos de un grupo acaban con valores positivos y los del otro con negativos, y la frontera pasa por donde hay menos aristas.

[DIAPOSITIVA 7.6-6]

En código son cuatro líneas: construyes la laplaciana, calculas autovalores y autovectores con `eigh`, coges la segunda columna y miras el signo. Positivo, a un lado. Negativo, al otro.

[DIAPOSITIVA 7.6-7]

[DEMO: ejecutar la segunda celda de la sección 4; mostrar los tres grafos lado a lado (facción real, Louvain, espectral) y la línea «Aciertos del corte espectral: 97 % de los miembros»]

Y el resultado es espectacular. El corte espectral acierta la facción de treinta y tres de los treinta y cuatro miembros. ARI de cero coma ochenta y ocho. Solo falla el nodo ocho, que tiene amigos en los dos bandos. Piénsalo: sin preguntar a nadie, sin saber nada del conflicto, solo con la red de amistades, se anticipa cómo se va a romper el club.

Si quieres más de dos grupos, coges los k primeros autovectores, usas cada fila como coordenadas del nodo y aplicas k-means, el del módulo dos. Es lo que hace `SpectralClustering` de scikit-learn.

Y ya que estamos, fíjate en la conexión con el módulo dos: allí usábamos autovectores de la matriz de covarianzas para reducir dimensión con PCA. Aquí usamos autovectores de la laplaciana para encontrar grupos. Los autovectores aparecen una y otra vez en ciencia de datos: en PCA, en la centralidad de autovector, en PageRank y en el clustering espectral.

### [14:00–16:30] ¿Cuál uso?

[DIAPOSITIVA 7.6-8]

¿Louvain o espectral? Louvain decide el número de grupos y escala a millones de nodos: ideal cuando exploras sin saber qué hay. El espectral necesita que le digas cuántos grupos, y calcular autovectores se vuelve caro en redes enormes. Pero cuando sabes que buscas dos bandos, como aquí, es difícil de batir.

Volviendo a la aseguradora: Louvain sobre la red de siniestros, testigos, talleres y abogados encuentra cientos de comunidades. La mayoría son una familia o un taller de barrio. Pero una comunidad muy densa de cuarenta siniestros que comparten tres testigos y dos talleres es una candidata clarísima a investigar. Ojo con la palabra: candidata. La comunidad no prueba el fraude; prioriza dónde mirar.

### [16:30–19:00] Errores frecuentes

[DIAPOSITIVA 7.6-9]

Cuatro errores. Uno: creer que la modularidad máxima es la verdad. La modularidad tiene un límite de resolución, en redes grandes tiende a fusionar comunidades pequeñas que son reales. Louvain tiene un parámetro de resolución para ajustarlo. Dos: comparar etiquetas directamente. El grupo cero de un método puede ser el grupo uno de otro; por eso usamos ARI, que no depende de los nombres. Tres: olvidar la semilla y obtener una partición distinta cada vez que ejecutas. Y cuatro: actuar sin describir la comunidad. Una comunidad es una hipótesis: mira quiénes son, qué comparten, y entonces decide.

### [19:00–20:00] Resumen y siguiente paso

[CÁMARA]

Una comunidad es un grupo denso por dentro y poco conectado hacia fuera. La modularidad lo cuantifica comparando con el azar. Louvain la optimiza a gran escala. Y el vector de Fiedler de la laplaciana da el mejor corte en dos, que en el kárate predice la ruptura casi a la perfección. En el último vídeo pasamos de la foto a la película: qué enlaces aparecerán y cómo se propaga algo por la red.

---

## Vídeo 7.7 · Predicción de enlaces y difusión en redes (duración objetivo: 15 min)

**Objetivo del vídeo:** que el estudiante sepa puntuar pares no conectados con heurísticas de vecindad, evaluarlas ocultando aristas, simular la difusión con modelos SI y de cascada independiente y elegir semillas para maximizar el alcance.

**Material:** diapositivas 7.7-1 a 7.7-8; notebook, sección 5 (Predicción de enlaces); ejercicios 1 y 3.

### [00:00–01:30] Gancho

[CÁMARA]

Tienes presupuesto para regalar el móvil nuevo a quinientos clientes a cambio de que lo recomienden. ¿A quién eliges? ¿A los que más gastan? ¿A los que más llaman? ¿Y cuántas altas puedes esperar? Y otra pregunta, de la misma familia: ¿qué clientes que hoy no se conocen acabarán conectados? Hoy cerramos el módulo con las dos preguntas dinámicas de las redes: predecir enlaces y simular la difusión.

### [01:30–02:30] Dos preguntas

[DIAPOSITIVA 7.7-1]

Predicción de enlaces: qué conexiones aparecerán, o existen y no las vemos. Es el «personas que quizá conozcas» de cualquier red social, pero también detectar relaciones ocultas entre empresas o cuentas. Difusión: si algo empieza en unos pocos nodos, hasta dónde llega y a qué velocidad. Un mensaje, una oferta, un bulo, un impago.

Las dos preguntas tienen algo en común: dependen de la estructura que hemos estudiado en todo el módulo. Los triángulos que medíamos con el agrupamiento son la base de la predicción de enlaces. Y los hubs y las comunidades determinan cómo se propaga algo.

### [02:30–05:30] Heurísticas de vecindad

[DIAPOSITIVA 7.7-2]

La intuición de la predicción de enlaces es el cierre triádico: si dos personas tienen amigos en común, lo normal es que acaben conociéndose. De ahí salen varias puntuaciones. La más simple, vecinos comunes: cuántos amigos compartís. Jaccard divide eso por el total de amigos de los dos, para normalizar. Y Adamic-Adar es la más fina.

[DIAPOSITIVA 7.7-3]

Adamic-Adar suma los amigos comunes, pero cada uno pesa menos cuanto más popular es. Piénsalo: si Ana y Luis comparten como contacto a un influencer con cinco mil contactos, eso no dice casi nada; él conoce a todo el mundo. Pero si comparten a Pepe, que solo tiene tres contactos, es muy probable que Ana y Luis se muevan en el mismo círculo. Uno entre el logaritmo de tres pesa casi uno; uno entre el logaritmo de cinco mil, poco más de cero coma uno.

Esto es exactamente lo que hacíamos en el módulo seis con los productos populares en la recomendación: comprar el producto más vendido dice poco de tus gustos, comprar uno de nicho dice mucho. Misma intuición, otro contexto.

### [05:30–08:30] Cómo se evalúa

[DIAPOSITIVA 7.7-4]

No podemos esperar un año a ver qué amistades aparecen. Así que simulamos el futuro: escondemos el diez por ciento de las aristas, calculamos las puntuaciones con la red que queda y miramos si las aristas escondidas salen arriba en el ranking. Es la separación entre entrenamiento y prueba del módulo tres, pero en una red.

[DIAPOSITIVA 7.7-5]

[DEMO: ejecutar la sección 5 del notebook; mostrar «Aristas ocultas: 7 | recuperadas en el top-7: 1» y «Acierto esperado al azar: 0.10»]

En el notebook escondemos siete aristas. Hay cuatrocientos noventa pares no conectados. Adamic-Adar recupera una de las siete en su top siete. ¿Poco? El azar recuperaría cero coma uno de media. Es diez veces mejor que el azar.

Pero cuidado: con solo siete aristas escondidas, el resultado depende muchísimo de cuáles escondes. Por eso el ejercicio tres te pide repetirlo con veinte semillas y comparar las tres heurísticas, y por eso conviene usar una métrica más estable como el AUC. En la práctica, estas puntuaciones se usan como variables de entrada de un clasificador, junto con los atributos de los clientes.

### [08:30–10:30] Modelos de difusión

[DIAPOSITIVA 7.7-6]

Ahora la difusión. Dos modelos. El epidemiológico, SI o SIR: en cada ronda, cada persona informada intenta contagiar a cada vecino con una probabilidad p. Y la cascada independiente: cada persona, cuando se entera, tiene una única oportunidad de convencer a cada vecino; si no lo consigue, no insiste. Este último modela bien un reenvío.

La diferencia importa. En el modelo SI, alguien informado sigue insistiendo ronda tras ronda, así que con tiempo suficiente casi todo el mundo se entera. En la cascada independiente, cada uno tiene su oportunidad y punto, y el mensaje puede morir pronto. Elige el modelo que se parezca a tu situación: un virus se parece al primero; una oferta que se reenvía, al segundo.

Como todo es aleatorio, una simulación no dice nada. Se repite miles de veces y se promedia: Monte Carlo, como el bootstrap del módulo uno.

### [10:30–13:00] Elegir semillas

[DIAPOSITIVA 7.7-7]

[PANTALLA: tabla de resultados del ejercicio 1 en `soluciones.ipynb` con el alcance medio por estrategia a 5 y 2 rondas]

Este es el ejercicio uno del notebook: tienes que elegir a tres personas del club para difundir un mensaje, con probabilidad de contagio cero coma tres durante cinco rondas. Si eliges a los líderes, el cero, el treinta y tres y el treinta y dos, el mensaje llega de media al noventa y siete por ciento del club. Con tres personas al azar, al ochenta y nueve. Poca diferencia, porque el club es tan pequeño que se satura.

Pero si el mensaje solo tiene dos rondas de vida, una oferta flash por ejemplo, la cosa cambia: setenta por ciento frente a cuarenta. Moraleja: elegir bien importa más cuanto menos tiempo o menos contagio tiene tu mensaje.

Y fíjate en algo curioso: casi da igual qué centralidad uses para elegir. Grado, intermediación y PageRank eligen las mismas tres personas, y cercanía y autovector solo cambian una. En una red pequeña y tan unida, lo importante es tener a un líder de cada facción. En redes de millones de clientes, las diferencias entre criterios crecen y conviene probar varios en simulación.

Para que el resultado sea serio, fíjate en cómo está hecho: dos mil simulaciones por estrategia y un intervalo de confianza bootstrap para la diferencia con el azar. Con dos rondas, las semillas centrales informan a unas diez personas más que las aleatorias, y el intervalo va de diez a diez y medio. No es suerte.

Dos consejos más. Diversifica: dos hubs de la misma comunidad se pisan el alcance. Y si necesitas lo mejor posible, existe un algoritmo voraz que añade una a una la semilla que más alcance suma, con garantía de quedarte al menos al sesenta y tres por ciento del óptimo.

### [13:00–14:30] Hubs: viralizar o frenar

[DIAPOSITIVA 7.7-8]

Volvemos a los hubs de la lección tres. En redes con hubs, el umbral para que algo se propague a gran escala es muy bajo: incluso algo poco contagioso se extiende, porque los hubs lo amplifican. Si quieres viralizar, siembra en hubs de comunidades distintas. Si quieres frenar un bulo o un contagio financiero, protege primero a los hubs, no a nodos al azar.

Y una advertencia final: la probabilidad de contagio que pongas en la simulación casi siempre es inventada. Úsala para comparar estrategias entre sí. Si quieres predecir cifras de altas, calibra esa probabilidad con campañas anteriores, y valida con un test A/B.

En la práctica, la operadora del principio haría esto: detectar comunidades con Louvain, elegir en cada una a los clientes con más PageRank en proporción a su tamaño, simular la campaña para comparar con la selección por gasto y, finalmente, lanzar un test A/B por regiones. Red, simulación y experimento: tres módulos del curso trabajando juntos.

### [14:30–15:00] Resumen y cierre del módulo

[CÁMARA]

Predecimos enlaces con heurísticas de vecindad como Adamic-Adar y las evaluamos ocultando aristas. Simulamos la difusión con Monte Carlo y elegimos semillas centrales y diversas. Con esto cierras el módulo: ya sabes modelar datos como redes, medir la importancia de los nodos, calcular PageRank, encontrar comunidades y razonar sobre cómo evoluciona una red. Te toca: el caso práctico te pide una estrategia de difusión o un análisis de robustez. ¡A por ello!
