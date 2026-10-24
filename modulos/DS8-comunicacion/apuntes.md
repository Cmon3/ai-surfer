# Módulo DS8 · Comunicación y producto de datos — Apuntes

> Objetivo: que tu análisis cambie una decisión. Un resultado correcto que nadie entiende vale lo mismo que uno que no se hizo.

Los ejemplos usan **TiendaSur** y las cifras salen del notebook (datos sintéticos).

---

## 8.1 · Diseño de métricas: métrica norte y árbol

### Qué es una buena métrica
Una métrica es un **acuerdo** sobre cómo contar algo. Antes de calcularla, escribe su definición: qué cuenta, en qué periodo, a quién incluye y quién la mueve. «Cliente activo» puede significar «compró este mes» o «abrió la app»: sin definición, dos informes dan números distintos y se pierde confianza.

Una métrica útil es:
- **Comprensible** para quien decide.
- **Accionable:** alguien puede hacer algo para moverla.
- **Comparable** en el tiempo y entre grupos.
- **Resistente a trampas:** no se puede mejorar sin mejorar de verdad el negocio.
- **Oportuna:** llega a tiempo de influir (las variables *adelantadas* avisan antes que las *rezagadas*).

### Métrica norte
La **métrica norte** (*north star*) es la que mejor resume el valor que recibe el cliente y que, si crece de forma sostenida, hace crecer el negocio. Ejemplos: «minutos de música escuchados» (streaming), «noches reservadas» (alojamientos), «pedidos entregados a tiempo» (reparto). Para TiendaSur proponemos **ingresos netos** (ventas menos devoluciones), aunque en un negocio de suscripción sería mejor «clientes que recompran».

Cómo elegirla:
1. ¿Refleja valor **para el cliente**, no solo para nosotros?
2. ¿Es un **líder** del ingreso a largo plazo?
3. ¿Pueden **influir** en ella los equipos?
4. ¿Se puede **medir** con regularidad y sin disputa?

Cuidado con las «métricas de vanidad» (descargas, visitas totales, seguidores): suben sin que el negocio mejore.

### Árbol de métricas
Descompone la métrica norte en factores que mueven distintos equipos:

```
ingresos netos = clientes activos × pedidos por cliente × valor medio del pedido × (1 − tasa de devolución)
                 captación         fidelización          catálogo y precios         calidad y logística
```

Ventajas: da **un lenguaje común**, localiza dónde está el problema y convierte «¿por qué subieron las ventas?» en un cálculo.

**Descomposición logarítmica.** Si la métrica es un producto de factores, el cambio relativo total es (aproximadamente) la suma de los cambios relativos de cada factor. Con logaritmos es **exacto**: `ln(B/A) = Σ ln(f_i,B / f_i,A)`, y la aportación de cada factor es su parte del total. En el notebook, de octubre a noviembre (Black Friday) los ingresos netos suben un 93 %: clientes activos aportan el 86 %, pedidos por cliente el 17 %, valor medio el 1 % y devoluciones restan un 4 %. La suma es 100 % por construcción; un factor negativo indica que ese factor restó.

> Si la métrica es una suma (ingresos por canal) y no un producto, se descompone por contribución a la suma (diferencia de cada parte dividida por el total anterior).

---

## 8.2 · Guardarraíles y métricas trampa

### Ley de Goodhart
«Cuando una medida se convierte en objetivo, deja de ser una buena medida.» Si premias los ingresos, alguien regalará margen; si premias los tickets cerrados, se cerrarán sin resolver.

### Guardarraíles (*guardrail metrics*)
Métricas que **no deben empeorar** mientras persigues la principal. Para TiendaSur: margen por visitante, tasa de devolución, plazo de entrega y reclamaciones. Son parte del **diseño** del experimento, no un añadido posterior; se definen **antes** con su umbral.

Regla de decisión para lanzar un cambio:
1. La métrica principal **mejora** con evidencia (el intervalo de confianza no cruza el cero).
2. **Ningún** guardarraíl se rompe más allá de la tolerancia acordada.

Ejemplo del notebook: el «envío gratis» sube los ingresos por visitante (+0,21 €, con intervalo [+0,02; +0,39]), pero el margen por visitante cae 0,14 € (intervalo [−0,19; −0,09]) y el plazo de entrega crece. Decisión: **no lanzar tal cual**; se propone probar con un mínimo de compra.

### Otras trampas habituales
- **Promedios que esconden grupos** (paradoja de Simpson): mira siempre el desglose por segmentos clave.
- **Métricas ratio con denominador cambiante** (tasa de conversión cuando cambia el tráfico).
- **Sesgo de supervivencia:** medir solo a quien se queda.
- **Demasiadas métricas:** si todo es prioritario, nada lo es. Una norte, 3–5 de apoyo y unos pocos guardarraíles.

---

## 8.3 · Storytelling con datos

Una **historia** tiene contexto, tensión y resolución. En datos:
1. **Contexto:** a quién ayuda, qué decisión está pendiente.
2. **Tensión:** qué ha pasado o qué hallazgo cambia lo que creíamos.
3. **Resolución:** qué propones y qué pides.

### De exploración a comunicación
En **exploración** haces decenas de gráficos para ti. En **comunicación** eliges uno por idea y lo dejas listo para que se entienda en cinco segundos:

| Elemento | Exploración | Comunicación |
|---|---|---|
| Título | Descriptivo («Ventas por canal») | **La conclusión** («La web aporta el 55 % de las ventas…») |
| Color | Una paleta por categorías | **Un color de énfasis** y el resto en gris |
| Etiquetas | Leyenda a un lado | **Anotación directa** sobre las líneas |
| Contenido | Todo lo que se puede dibujar | Solo lo que apoya el mensaje |
| Texto | Ejes con nombres de columnas | Ejes y unidades legibles |

### Estructura de una presentación
- **Una idea por diapositiva**, titulada con la conclusión.
- Orden: *situación → hallazgo → recomendación → qué necesito*. Si el tiempo es corto, empieza por la recomendación.
- Cada gráfico responde a «¿y qué?». Si no cambia ninguna decisión, sobra.
- Anticipa **las preguntas difíciles** y llévalas en un anexo.

---

## 8.4 · Gráficos que convencen (y los que engañan)

### Elegir el gráfico según la pregunta
| Pregunta | Gráfico habitual |
|---|---|
| ¿Cómo evoluciona en el tiempo? | Líneas |
| ¿Cómo se comparan categorías? | Barras horizontales ordenadas |
| ¿Cómo se distribuye? | Histograma, caja, densidad |
| ¿Hay relación entre dos variables? | Dispersión |
| ¿Qué parte es de qué total? | Barras apiladas o una sola barra (evita tartas con muchas partes) |

Evita 3D, sombras, degradados y ejes secundarios: añaden ruido y casi nunca información.

### Engaños comunes (y cómo detectarlos)
1. **Eje truncado en barras.** La longitud de la barra representa el valor: si el eje no empieza en cero, exagera. **Factor de mentira** (Tufte) = (cambio visual) / (cambio real). Con el eje empezando en 3,05, una conversión de 3,10 % frente a 3,20 % (+3 %) tiene factor 62. Un gráfico honesto vale 1 (aceptable entre 0,95 y 1,05). *Excepción:* en gráficos de **líneas** no es obligatorio empezar en cero si lo que se muestra es el cambio, pero sí advertirlo.
2. **Eje doble.** Cada eje se puede escalar a conveniencia para que dos series «coincidan». Alternativa: **indexa ambas a 100** en el mismo origen, o usa dos paneles con eje x compartido.
3. **Ventana temporal escogida.** Los últimos 3 meses «suben sin parar» y la serie completa muestra estacionalidad. Enseña siempre el contexto suficiente y compara con el mismo periodo del año anterior.
4. **Correlación espuria.** Dos series con tendencia parecen relacionadas aunque no lo estén (en el notebook, dos paseos aleatorios independientes dan una correlación de −0,46). Correlación no es causalidad; en la serie temporal, diferencia o desestacionaliza antes de comparar.
5. **Áreas y volúmenes mal escalados** (iconos que crecen en dos dimensiones) y **tartas** con demasiadas porciones.
6. **Omitir la incertidumbre:** un número sin su rango sugiere una precisión que no existe.

### Lista de comprobación antes de publicar
- [ ] ¿El título dice la conclusión?
- [ ] ¿Las barras empiezan en cero?
- [ ] ¿Hay unidades, periodo y fuente?
- [ ] ¿Hay un solo énfasis?
- [ ] ¿Es legible en blanco y negro y para personas con daltonismo (no solo rojo/verde)?
- [ ] ¿Se enseña la incertidumbre cuando importa?
- [ ] ¿Se lo he enseñado a alguien que no conoce los datos?

---

## 8.5 · Dashboards

### Principios
1. **Una pregunta, una persona.** «¿Cómo va el mes y debo preocuparme?» para el director comercial. Un dashboard para todos no sirve a nadie.
2. **Lo más importante arriba a la izquierda** (así se lee). Pocos números grandes con su **comparación** (frente al mes anterior o al objetivo).
3. **De lo general a lo particular:** KPIs → tendencia → desglose → detalle.
4. **Guardarraíles visibles** con su umbral.
5. **Consistencia:** mismos colores para la misma cosa, mismas unidades.
6. **Quitar antes de añadir.** Cada elemento nuevo compite por la atención con los demás.
7. **Tiempo de carga y frescura:** indica «datos hasta…» y cada cuánto se actualizan.

### Herramientas
- **Código:** Plotly, Dash, Streamlit, matplotlib.
- **BI:** Power BI, Tableau, Looker Studio (gratuito), Metabase (de código abierto). Las ofertas piden con frecuencia Power BI o Tableau: practica con la versión gratuita o de prueba disponible y comprueba las condiciones vigentes.

### Mantenimiento: lo que nadie cuenta
Un dashboard se **estropea**: cambia una definición, falla una fuente, nadie lo mira. Define **responsable**, **fuente única de las métricas** (idealmente la capa oro del módulo DS7) y **fecha de revisión**; elimina los que nadie abre en un trimestre.

En el notebook se construye uno con Plotly (4 KPIs con delta, tendencia, desglose por canal y guardarraíl con umbral) y se guarda en un único `dashboard.html`.

---

## 8.6 · Escribir para ejecutivos: pirámide y memo

### La pirámide de Minto
Barbara Minto formalizó la regla de oro de la escritura ejecutiva: **primero la respuesta**.

```
            Recomendación / respuesta
          /            |             \
   Razón 1         Razón 2         Razón 3        (cada una con sus datos)
```

Un directivo lee el principio y decide si sigue. Si tienes que contar el método antes de la conclusión, perderás a tu lector.

### El memo de una página
Estructura recomendada (como en el notebook):
1. **Recomendación** (una o dos frases; incluye la acción).
2. **Por qué:** tres razones, cada una con un número concreto.
3. **Riesgos** y cómo se controlan.
4. **Decisión que necesito** y **fecha**.

Reglas de estilo:
- **≤ 350 palabras.** El anexo técnico va aparte.
- **Números concretos y comparables** (+7 compras por cada 1.000 visitantes), no adjetivos («notable»).
- **Sin jerga:** nada de «p-valor», «regresión», «hiperparámetro»; si hace falta un término técnico, se explica en una frase.
- Voz activa, frases cortas, un párrafo por idea.
- Pide algo: un memo sin decisión es un informe.

El notebook incluye `revisar_memo`, que comprueba mecánicamente longitud, que la recomendación aparece en las primeras palabras y que no hay jerga. No sustituye a un lector humano, pero detecta lo evidente.

### Correos y mensajes
La misma pirámide: asunto con la acción («Decisión necesaria antes del jueves: prueba de envío gratis»), primera frase con la petición, contexto después.

---

## 8.7 · Presentar a un público no técnico

Las ofertas de Reale, ICF y muchas más piden «comunicar resultados a perfiles no técnicos». Significa:

### 1. Conoce a tu audiencia
¿Qué decisión toma?, ¿cuánto tiempo tiene?, ¿qué sabe ya?, ¿qué le preocupa? Prepara la versión de 1 minuto, la de 10 y el anexo.

### 2. Traduce la estadística
- **Frecuencias naturales** en lugar de probabilidades: «De cada 1.000 visitantes, 47 compran con la versión nueva y 40 con la actual» se entiende mejor que «la tasa pasa del 4,0 % al 4,7 %», y mucho mejor que «OR = 1,18».
- **Incertidumbre en una frase:** «La diferencia real podría estar entre 2 y 12 compras más por cada 1.000». Evita «p < 0,05» y «estadísticamente significativo»; si lo usas, di qué significa en la práctica.
- **Comparaciones con algo conocido:** «equivale a unos 300 pedidos más al mes».
- **Probabilidad de error de un modelo:** «de 100 clientes que el modelo marca como riesgo, 70 se van de verdad y 30 no».

En el notebook, `traducir_ab` convierte (tasa de control, tasa de la variante, tamaño) en esa frase y avisa cuando **no hay evidencia suficiente** para afirmar nada.

### 3. Estructura de una charla de 10 minutos
| Minutos | Contenido |
|---|---|
| 0–1 | La decisión y mi recomendación |
| 1–3 | Por qué importa (contexto, un gráfico) |
| 3–7 | Tres razones, una diapositiva por razón |
| 7–9 | Riesgos y qué haremos |
| 9–10 | Lo que necesito de vosotros y para cuándo |

Prepara las **preguntas difíciles** («¿y si el resultado es casualidad?», «¿cuánto cuesta?», «¿qué pasa si no hacemos nada?») y responde primero con una frase, después con detalle.

### 4. IA responsable (se pregunta en entrevistas)
Cuando presentes un modelo, di **qué no hace**, dónde puede fallar, qué datos usa y quién revisa sus decisiones. La ficha del modelo del módulo I8 es el soporte: transparencia es parte de comunicar bien. Si el resultado viene de un modelo de lenguaje, di cómo se ha contrastado con la fuente.

---

## 8.8 · *Make or buy*: construir o comprar

Una decisión recurrente: ¿desarrollamos esta herramienta (panel, plataforma de experimentos, almacén) o contratamos una existente? Tres herramientas para decidirlo con claridad.

### 1. Matriz ponderada
Lista los **criterios** (encaje, tiempo hasta tener valor, mantenimiento, control, dependencia del proveedor, cumplimiento y control de datos), asigna **pesos** que sumen 1 y puntúa de 1 a 5 cada opción. La puntuación total no es la respuesta: es la forma de **discutir los pesos** en lugar de las opiniones. En el notebook sale casi un empate (3,85 frente a 3,80), lo que indica que la decisión depende de los pesos.

### 2. Coste total de propiedad (TCO) a 3 años
- **Construir:** desarrollo (personas × meses) + mantenimiento anual (típicamente 15–25 % del desarrollo) + infraestructura + coste de oportunidad.
- **Comprar:** licencias (por usuario, por volumen) + implantación y formación + integraciones + coste de salida (*lock-in*).

Los números del notebook son **hipótesis ilustrativas**: sustitúyelas por las de tu caso.

### 3. Sensibilidad
Pregunta: ¿qué hipótesis, si cambia, invierte la decisión? En el ejemplo, el número de usuarios: con 25 usuarios compensa comprar y con 100 construir. El punto de cruce es el dato valioso para presentar.

### Criterios cualitativos que pesan
- **Diferenciación:** si es parte de lo que nos hace distintos, tiende a construirse; si es una commodity (nómina, correo), comprar.
- **Capacidad:** ¿tenemos el equipo para mantenerlo durante años?
- **Riesgos de seguridad y cumplimiento:** quién guarda los datos y dónde (RGPD).
- **Salida:** ¿qué cuesta cambiar de opinión en 2 años?
- Una tercera vía: **comprar y personalizar** (código abierto con servicio gestionado).

---

## Glosario

- **Árbol de métricas:** descomposición de una métrica en factores que mueven distintos equipos.
- **Eje truncado:** eje vertical que no empieza en cero y exagera las diferencias.
- **Factor de mentira:** relación entre el cambio visual y el cambio real en un gráfico (1 = honesto).
- **Frecuencias naturales:** expresar probabilidades como «x de cada 1.000».
- **Guardarraíl:** métrica que no debe empeorar mientras se optimiza la principal.
- **Ley de Goodhart:** una medida usada como objetivo deja de ser buena medida.
- **Métrica de vanidad:** métrica que sube sin reflejar mejora del negocio.
- **Métrica norte (*north star*):** la métrica que resume el valor que reciben los clientes.
- **Pirámide de Minto:** estructura que empieza por la conclusión, sigue con argumentos y deja el detalle para el final.
- **TCO:** coste total de propiedad (compra o desarrollo, operación y salida).
