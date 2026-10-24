# Módulo DS1 · Inferencia causal — Apuntes

> Objetivo: que cuando alguien te diga «los clientes que usan la app gastan más», sepas qué pregunta hacer, qué datos necesitas y qué método usar para responder si **la app** es la causa.

---

## DS1.1 · Correlación, causalidad y DAGs

### Resultados potenciales
Para cada cliente existen dos gastos posibles: Y(1) si usa la app e Y(0) si no. Nunca vemos los dos: el que no ocurrió es el **contrafactual**. El **efecto causal individual** es Y(1) − Y(0) y no se observa jamás; lo que estimamos son promedios:
- **ATE**: efecto medio en toda la población.
- **ATT**: efecto medio en los que reciben el tratamiento.
- **LATE**: efecto medio en los «cumplidores» (lo que estima un instrumento).

Comparar usuarios con no usuarios estima E[Y|T=1] − E[Y|T=0] = ATT + **sesgo de selección**. La inferencia causal es el arte de eliminar o acotar ese sesgo.

### DAGs: dibujar lo que crees
Un **DAG** es un grafo dirigido sin ciclos donde una flecha A → B significa «A causa B directamente». El DAG no se aprende de los datos: es tu **hipótesis**, razonada con conocimiento del negocio. Ventaja: obliga a explicitar supuestos que de otro modo están ocultos en «qué variables meto en el modelo».

Tres piezas de construcción:
| Estructura | Nombre | Asociación entre A y C | Si condicionas en B |
|---|---|---|---|
| A → B → C | cadena (mediador) | sí | se bloquea |
| A ← B → C | bifurcación (confusor) | sí | se bloquea |
| A → B ← C | colisionador | **no** | **se abre** |

### Criterio de la puerta trasera
Un conjunto Z permite estimar el efecto de T sobre Y ajustando por Z si:
1. Z **bloquea todos los caminos de puerta trasera** (los que empiezan con una flecha que *entra* en T), y
2. Z **no incluye descendientes de T**.

Un camino se bloquea si contiene un no-colisionador en Z, o un colisionador que ni él ni sus descendientes están en Z. El notebook implementa estas reglas en unas 30 líneas (`criterio_puerta_trasera`) para que lo veas funcionar con el DAG de TiendaSur.

> Ejemplo: `fidelidad → app`, `fidelidad → gasto`, `app → pedidos → gasto`. Efecto total de `app`: ajusta por `fidelidad`; **no** por `pedidos` (mediador, descendiente de `app`).

### Errores frecuentes
- «Controlar por todo lo que tengo.» Puede crear sesgo (colisionadores) o eliminar el efecto (mediadores).
- Confundir *predecir* con *explicar*: una variable puede predecir muy bien y ser un pésimo control.
- Creer que más datos arreglan un confusor: solo dan una estimación más precisa del número equivocado.

---

## DS1.2 · Confusores, mediadores y colisionadores

| Papel | Pregunta que contesta | Decisión |
|---|---|---|
| **Confusor** (causa común de T e Y) | ¿Hay algo que explique por qué T e Y se mueven juntas sin que una cause la otra? | Ajustar. Sin ajustar se obtiene un efecto inflado (o invertido: paradoja de Simpson). |
| **Mediador** (T → M → Y) | ¿Por qué mecanismo actúa T? | Para el efecto **total**, no ajustar. Para el **directo**, ajustar (y exige supuestos extra). |
| **Colisionador** (T → C ← Y) | ¿Estoy seleccionando o filtrando por una consecuencia común? | No ajustar ni filtrar. Es el *sesgo de selección* típico: analizar solo clientes que dejaron reseña, solo los que compraron, solo los contratados. |

En el notebook, con un efecto verdadero de 2: sin ajustar el confusor da 3,47; ajustar por el mediador da 1,01 (solo el directo); ajustar por el colisionador da 0,48. Tres decisiones opuestas con la misma herramienta (regresión).

---

## DS1.3 · Regresión con ajuste

Si conoces los confusores y los has medido, añadirlos a la regresión estima el efecto bajo dos supuestos: **(1) no hay confusión no observada** (ignorabilidad condicional) y **(2) la forma funcional es razonable** (aquí, lineal y sin interacciones con el tratamiento).

Interpretación: el coeficiente de `app` es «la diferencia de gasto entre dos clientes con las *mismas* covariables, uno con app y otro sin ella».

Límites:
- Si el efecto es heterogéneo, el coeficiente es un promedio ponderado difícil de interpretar.
- Extrapola donde no hay datos comparables (no avisa de falta de solapamiento).
- No resuelve confusores **no observados**; para eso hacen falta DiD, instrumentos, discontinuidades o aleatorización.

Usa errores estándar robustos (`cov_type="HC1"`) o agrupados (clúster) cuando haya correlación dentro de grupos.

---

## DS1.4 · *Propensity score*

### Idea
El **propensity score** e(x) = P(T=1 | X=x) es la probabilidad de recibir el tratamiento dadas las covariables. Rosenbaum y Rubin (1983) demostraron que basta con equilibrar *e(x)* para equilibrar todas las covariables: pasamos de ajustar por muchas variables a ajustar por una.

### Pasos
1. **Estimar e(x)** con regresión logística (o *gradient boosting* si la relación es compleja; cuidado con ps extremos).
2. **Comprobar el solapamiento:** deben existir clientes de ambos grupos en todo el rango de e(x). Sin solapamiento, no hay contrafactual: se acota la población (p. ej. e(x) ∈ [0,05; 0,95]) y se dice que la conclusión es solo para esa región.
3. **Usar e(x):**
   - **Emparejamiento:** a cada tratado se le asigna uno (o varios) control(es) de ps parecido. Estima el ATT. Parámetros: vecinos, *caliper*, con o sin reemplazo.
   - **IPW:** peso 1/e(x) a los tratados y 1/(1−e(x)) a los controles. Estima el ATE. La versión normalizada (Hájek) es más estable. Los **pesos estabilizados** y el recorte reducen la varianza.
   - **Doblemente robusto (AIPW):** combina un modelo de resultado y un modelo de ps; basta con que **uno** de los dos esté bien especificado.
4. **Comprobar el equilibrio:** diferencia media tipificada (SMD) de cada covariable tras emparejar/ponderar; |SMD| < 0,1 se considera aceptable.
5. **Incertidumbre:** bootstrap que repita *todo* el procedimiento (incluida la estimación del ps).

### Qué no hace
No corrige confusores **no medidos**. Un ps perfecto con una covariable clave ausente da un resultado perfectamente sesgado. Por eso importa el DAG antes de la técnica.

---

## DS1.5 · Diferencias en diferencias

### Idea
Un grupo recibe un tratamiento en un momento dado y otro no. Se compara el **cambio** en el tratado con el cambio en el control:

DiD = (Ȳ_trat,después − Ȳ_trat,antes) − (Ȳ_ctrl,después − Ȳ_ctrl,antes)

Esto elimina las diferencias fijas entre grupos (las tiendas tratadas eran más grandes) y los shocks comunes en el tiempo (estacionalidad).

### Supuesto de tendencias paralelas
Sin el tratamiento, ambos grupos habrían evolucionado igual. **No se puede probar** (el contrafactual no existe), pero sí buscar evidencia:
- **Gráfico** de las series de ambos grupos antes del tratamiento.
- **Estudio de eventos:** estimar un efecto por periodo relativo al inicio, tomando como referencia el último periodo previo. Los coeficientes previos deberían ser ≈ 0 y planos; un test conjunto da un p-valor.
- **Placebos:** repetir el análisis con un inicio falso o con un grupo no tratado.

En el notebook: con tendencias paralelas el DiD da 6,10 (verdad 6,0); con una diferencia de pendiente de 0,4 k€/mes da 8,50, y el estudio de eventos lo delata (p ≈ 0).

### Implementación
`ventas ~ tratada * post` con errores estándar **agrupados por unidad** (la tienda). Con muchos periodos y adopción escalonada, el DiD clásico con efectos fijos puede dar pesos negativos (Goodman-Bacon, Callaway-Sant'Anna): consulta la literatura reciente antes de usarlo con tratamientos que empiezan en fechas distintas.

### Qué hacer si falla el supuesto
Tendencia lineal propia por grupo (supuesto más débil pero aún supuesto), control sintético, o buscar otro grupo de control.

---

## DS1.6 · Variables instrumentales (IV) y 2SLS

### Problema
Hay un confusor **no observado** U (la «motivación»): ajustar es imposible. Un **instrumento** Z es una variable que:
1. **Relevancia:** mueve a T (se comprueba: F > 10 en la primera etapa).
2. **Exogeneidad:** no está relacionada con U ni con otros determinantes de Y (la da el azar o se argumenta).
3. **Exclusión:** afecta a Y **solo a través de T** (se argumenta; no se comprueba).

Ejemplos: una invitación enviada al azar (diseño de «estímulo»), la distancia a la tienda, un sorteo, un cambio normativo.

### Estimación
**2SLS:** (1) regresión de T sobre Z → T̂; (2) regresión de Y sobre T̂. Con un solo instrumento binario equivale al **estimador de Wald**: efecto de Z sobre Y dividido por efecto de Z sobre T. Los errores estándar de la segunda etapa «a mano» son incorrectos; usa los residuos con T real o una librería (`linearmodels`, `statsmodels`).

### Interpretación: LATE
IV estima el efecto en los **cumplidores** (quienes cambian de T por culpa de Z), no en toda la población. Es válido y útil, pero no es el ATE.

### Instrumentos débiles
Si F es pequeño, las estimaciones son muy inestables y están sesgadas hacia el OLS. En el notebook: 300 repeticiones; con instrumento fuerte la media es 8,08 con desviación 2,5; con uno débil, desviación de 270. Un instrumento débil es peor que no tener instrumento, porque parece riguroso.

---

## DS1.7 · Regresión discontinua (RDD)

Cuando una regla asigna el tratamiento según una variable continua y un umbral (cupón si gasto anual ≥ 100 €), los clientes justo por encima y por debajo son prácticamente iguales. El salto en el resultado en el umbral es el efecto causal **local**.

Receta:
1. Gráfico de medias por tramo con el corte marcado.
2. Regresión **lineal local** (pendientes distintas a cada lado, núcleo triangular) en un ancho de banda *h*.
3. Probar varios *h* (los resultados deben ser estables).
4. Comprobar que no hay **manipulación**: densidad continua en el corte; covariables sin salto.

Límite: el efecto es válido solo cerca del umbral. En el notebook la diferencia de medias ingenua da +28 y el RDD ~4,2 (verdad 4).

---

## DS1.8 · *Uplift modeling*

### El problema
El cupón cuesta dinero. ¿A quién enviarlo? Los clientes se reparten en cuatro tipos:
| Tipo | Con cupón | Sin cupón | Uplift |
|---|---|---|---|
| Persuadibles | compra | no compra | **+** |
| Seguros | compra | compra | 0 (cupón regalado) |
| Causas perdidas | no compra | no compra | 0 |
| «Perros dormidos» | no compra | compra | **−** |

Un modelo de respuesta ordena por P(compra | cupón): coloca arriba a los **seguros**. El *uplift* es P(compra | cupón, x) − P(compra | sin cupón, x): el **efecto causal condicional** (CATE).

### Datos
Lo ideal es un **experimento aleatorizado** (cupón al azar a una muestra). Con datos observacionales hay que combinar uplift con las técnicas de ajuste anteriores.

### Modelos
- **S-learner:** un único modelo f(x, T). Uplift = f(x,1) − f(x,0). Simple, pero puede subestimar efectos pequeños si el modelo ignora T.
- **T-learner:** dos modelos (uno por grupo). Uplift = f₁(x) − f₀(x). Flexible, pero ruidoso con pocos datos.
- Otros: X-learner, R-learner, *causal forests*, DR-learner (en EconML y CausalML).

### Evaluación
No hay «uplift real» observable por cliente, así que se evalúa **en grupos**: ordena el conjunto de prueba (aleatorizado) por uplift predicho y calcula, al tratar al top-k %, las compras incrementales = compras de tratados − compras de controles reescaladas. Esa es la **curva Qini**. El **AUUC** (o el coeficiente Qini) es el área sobre la línea del azar.

### De la curva a la decisión
Beneficio incremental = (margen − cupón) · compras de tratados − margen · compras que habrían ocurrido sin cupón. Se calcula para cada fracción tratada y se elige el máximo. En el notebook: enviar a todos pierde dinero; el T-learner encuentra un óptimo cercano al 25 % de los clientes.

---

## DS1.9 · Qué método usar y cómo contarlo

| Situación | Método | Supuesto central |
|---|---|---|
| Puedes aleatorizar | **Experimento A/B** (ver DS2) | Aleatorización, no interferencia |
| Confusores observados, nada más | Regresión / PS / AIPW | Ignorabilidad condicional, solapamiento |
| Antes/después con grupo de control | **DiD** | Tendencias paralelas |
| Confusor no observado + instrumento | **IV / 2SLS** | Relevancia, exogeneidad, exclusión |
| Umbral que decide el tratamiento | **RDD** | Sin manipulación, continuidad |
| Decidir a quién tratar | **Uplift** | Experimento previo aleatorizado |

### Cómo contarlo (lo que se pregunta en entrevistas)
1. La **pregunta causal** en una frase y el efecto (ATE/ATT/LATE).
2. El **DAG** y por qué.
3. El **método** y el supuesto que no se puede comprobar.
4. Qué **diagnósticos** pasaste y qué pruebas de robustez hiciste.
5. La **incertidumbre** (IC) y el efecto en términos de negocio.
6. Qué **cambiaría tu conclusión**.

### DoWhy, EconML, CausalML
Son librerías útiles: DoWhy estructura el flujo (modelar, identificar, estimar, refutar), EconML y CausalML ofrecen estimadores de efectos heterogéneos. Aquí hemos implementado lo esencial con `statsmodels`/`scikit-learn` para que entiendas qué hay debajo; en tu trabajo usarás estas librerías, y sabrás qué supuestos hay detrás de sus resultados.

---

## Glosario
- **ATE / ATT / LATE:** efecto medio en todos / en los tratados / en los cumplidores.
- **Confusor:** causa común de tratamiento y resultado.
- **Mediador:** variable por la que el tratamiento actúa sobre el resultado.
- **Colisionador:** efecto común de dos variables; condicionar en él crea asociación.
- **Puerta trasera:** camino no causal entre T e Y que empieza con una flecha hacia T.
- **Solapamiento (*overlap*):** existencia de clientes comparables en ambos grupos.
- **SMD:** diferencia media tipificada; mide el equilibrio de una covariable.
- **IPW:** ponderación por el inverso de la probabilidad de tratamiento.
- **DiD:** diferencias en diferencias.
- **Instrumento:** variable que mueve el tratamiento y solo afecta al resultado a través de él.
- **2SLS:** mínimos cuadrados en dos etapas.
- **RDD:** regresión discontinua.
- **Uplift / CATE:** efecto causal condicional a las características del cliente.
- **Curva Qini / AUUC:** curva (y área) de ganancia incremental al ordenar por uplift.
