# Módulo DS2 · Experimentación avanzada — Apuntes

> Objetivo: que sepas diseñar un experimento que no se pueda atacar estadísticamente, leerlo en el orden correcto y decidir qué hacer cuando el A/B clásico no basta.

Caso de todo el módulo: **rediseño del carrito de TiendaSur**. Métrica principal: gasto por usuario (o conversión del carrito). Guardarraíles: tiempo de carga y devoluciones.

---

## DS2.1 · Repaso: hipótesis, potencia, MDE y tamaño de muestra

- **H0:** el rediseño no cambia la métrica. **H1:** la cambia.
- **α** (error de tipo I): probabilidad de declarar efecto cuando no lo hay. Convención: 5 %.
- **Potencia** (1 − β): probabilidad de detectar un efecto real del tamaño del MDE. Convención: 80 %.
- **MDE** (*minimum detectable effect*): el menor efecto que te importa por negocio. No es «el que esperas», es «el menor por el que tomarías una decisión distinta».

Para una proporción, con p₀ y un MDE relativo m: n ≈ 2·(z₁₋α/₂ + z₁₋β)² · p(1−p) / (p₀·m)². Para una media: n ≈ 2·(z₁₋α/₂ + z₁₋β)² σ² / δ². Lo importante: **n crece con 1/MDE²**. En el notebook, con p₀ = 10 %: detectar +10 % relativo cuesta 14 744 usuarios por grupo; +2 %, 356 326.

### Buenas prácticas de diseño
- Fija **antes** del experimento: hipótesis, métrica principal, MDE, tamaño, duración y regla de parada.
- Duración en **semanas completas** (ciclo semanal de comportamiento).
- La unidad de aleatorización debe coincidir con la unidad de análisis (usuario, no sesión).
- Calcula la potencia con un A/A (sin efecto) para validar que el 5 % se cumple (el notebook hace 4,9 %).

---

## DS2.2 · CUPED

### Idea
**CUPED** (*Controlled-experiment Using Pre-Experiment Data*, Deng et al., 2013) usa una covariable X medida antes del experimento, correlacionada con la métrica Y, para eliminar la parte de la varianza que ya era predecible:

Y' = Y − θ·(X − X̄), con θ = Cov(Y, X) / Var(X).

### Por qué funciona y por qué no sesga
- Var(Y') = Var(Y)·(1 − ρ²). Con ρ = 0,7 queda el 51 % de la varianza: **equivale a duplicar el tráfico**.
- X es anterior al tratamiento, así que E[X] es igual en ambos grupos y el término que restamos tiene esperanza cero en la diferencia de medias: el estimador del efecto es insesgado. En el notebook: efecto real 1,0; medias estimadas 0,98 con y sin CUPED.

### Práctica
- Mejores covariables: la **misma métrica** en un periodo previo (gasto semana −1, sesiones). Se pueden usar varias (regresión).
- Usuarios nuevos sin histórico: X = 0 o la media; CUPED rinde menos.
- Funciona en métricas continuas persistentes; poco en eventos raros (conversión de un solo día).
- Calcula θ con **ambos** grupos juntos (sin mirar la asignación).
- CUPED permite reducir el tamaño de muestra o la duración: el cálculo previo del tamaño usa σ·√(1 − ρ²).

---

## DS2.3 · Pruebas secuenciales y el problema de mirar antes de tiempo

### El problema
El contraste estándar asume un **tamaño de muestra fijo y un único análisis**. Si miras cada día y paras en cuanto p < 0,05, cada mirada es una oportunidad extra. Con 10 miradas el error de tipo I sube de 5 % a ≈ 20 % (la simulación da 19,6 %). Uno de cada cinco «ganadores» sería ruido.

### Solución 1: grupos secuenciales con *alpha spending*
Se fijan K miradas y un **límite** de decisión en cada una, de modo que la probabilidad de cruzar alguno bajo H0 sea α en total.
- **Pocock:** límite constante (≈ 2,56 con K = 10; 2,41 con K = 5). Facilita parar pronto, pero exige más en la última mirada.
- **O'Brien-Fleming:** muy exigente al principio y casi 1,96 al final (6,6 en la primera mirada de 10; 2,09 en la última). Casi no pierde potencia; es la opción habitual.
- **Lan-DeMets:** define una función de gasto de alfa α(t) que permite miradas en fechas no previstas.
En el notebook los límites se **calibran por simulación**; en producción se usan paquetes (`gsDesign`, `rpact`) o la plataforma de experimentación.

Resultados del notebook (K = 10): sin efecto → falsos positivos 5,1 % (análisis único), 19,6 % (mirar con 1,96), 5,1 % (Pocock), 5,0 % (O'Brien-Fleming). Con efecto real → potencia 72 %, 81 % (inflada por el error), 58 % y 70 %.

### Solución 2: SPRT (*Sequential Probability Ratio Test*)
Contrasta H0: δ = 0 contra H1: δ = δ₁ acumulando el logaritmo del cociente de verosimilitudes tras cada dato. Se para al cruzar A = ln((1−β)/α) (acepta H1) o B = ln(β/(1−α)) (acepta H0). Ventajas: se puede mirar **continuamente**; el tamaño medio es mucho menor que el fijo (≈ 3 100 frente a 6 280 por grupo bajo H1, ≈ 2 200 bajo H0). Inconvenientes: hay que elegir δ₁; el tamaño no está acotado; en la práctica se trunca. Variantes modernas: **mSPRT** y **valores-p siempre válidos** (usados por plataformas comerciales), que no necesitan fijar δ₁.

### Cuándo usar qué
| Situación | Opción |
|---|---|
| Decisión rara y cara, equipo disciplinado | Análisis único con tamaño fijo |
| Quieres poder parar pronto si es muy bueno o muy malo | Grupos secuenciales (O'Brien-Fleming) |
| Monitorización continua (p. ej. despliegue gradual con riesgo) | SPRT / mSPRT |
| Bajar riesgo de un lanzamiento con guardarraíles | Mirar guardarraíles de forma secuencial, y la métrica principal solo al final |

---

## DS2.4 · Comparaciones múltiples

Con m hipótesis independientes y α = 5 %, P(al menos un falso positivo) = 1 − 0,95ᵐ. Con m = 20, 64 % (simulado: 62,7 %).

| Método | Controla | Cómo | Cuándo |
|---|---|---|---|
| Bonferroni | FWER | p < α/m | Pocas pruebas, máxima prudencia |
| **Holm** | FWER | Descenso paso a paso; siempre ≥ Bonferroni en potencia | Opción por defecto para FWER |
| **Benjamini-Hochberg** | FDR | Ordena los p; rechaza hasta el mayor k con p₍ₖ₎ ≤ k·α/m | Muchas métricas, exploración |

En la simulación (20 métricas, 4 con efecto real): sin corregir detecta el 85 % de los reales pero produce 0,8 falsos positivos por experimento (56 % de experimentos con alguno); Holm detecta el 50 % con 0,05 falsos; BH detecta el 62 % con 0,16 falsos.

### Práctica en producto
1. Declara **una métrica principal** y evalúa a α completo.
2. Guardarraíles y secundarias, en familias; corrige dentro de cada una.
3. Los análisis por segmentos son comparaciones múltiples encubiertas: «funciona en Android en Sevilla» entre 40 segmentos es ruido hasta que se replique.

---

## DS2.5 · Guardarraíles y SRM

### Sample ratio mismatch
Si el diseño es 50/50 y observas un reparto significativamente distinto (test chi-cuadrado, umbral estricto p < 0,001), **algo está roto**: redirecciones, filtros de bots que afectan a un grupo, errores de registro de una variante, caída de una versión en ciertos dispositivos. El resultado deja de ser fiable porque los grupos ya no son comparables. En el notebook: el efecto real es 0 € y, perdiendo el 90 % de los móviles lentos (usuarios de bajo gasto) solo en tratamiento, se «mide» +1,8 € con p ≈ 0 y un SRM de p ≈ 10⁻⁷¹. **Primer paso del análisis: mirar el SRM.**

Causas habituales y comprobaciones: segmentar el desequilibrio por navegador, país, versión y hora para localizar dónde ocurre.

### Guardarraíles
Métricas que **no deben empeorar** por encima de un margen: latencia, errores, devoluciones, quejas, cancelaciones, ingresos a largo plazo.
- No basta con «no significativo»: falta de potencia no es ausencia de daño.
- Se evalúan con **no inferioridad**: el extremo del IC unilateral debe quedar dentro del margen acordado antes (+30 ms de carga, +0,2 puntos de devoluciones…).
- Si un guardarraíl falla: no se lanza, o se itera.

### Matriz de decisión
| Principal | Guardarraíles | Decisión |
|---|---|---|
| Mejora | OK | Lanzar |
| Mejora | Fallan | Iterar o no lanzar |
| Sin cambio | OK | Decidir por coste y simplicidad |
| Cualquiera | SRM / datos rotos | Investigar, no decidir |

---

## DS2.6 · Efecto novedad y efectos de red

### Novedad (y primacía)
Los usuarios prueban lo nuevo por curiosidad y la mejora decae; o al revés, a los usuarios habituales les cuesta adaptarse (primacía). Si paras a los 7 días, el efecto estimado puede ser el de la novedad. En el notebook: +8,0 % la primera semana frente a ≈ +3 % real a largo plazo.

Qué hacer: mirar el efecto **por día** o por semana; comparar usuarios nuevos con antiguos; mantener el test lo bastante para ver el efecto estable; estimar con la última semana, no con el promedio.

### Interferencia (efectos de red)
El A/B supone **SUTVA**: el resultado de un usuario no depende de la asignación de otros. Se rompe en:
- Redes sociales (mi experiencia depende de mis amigos).
- Mercados de dos lados y logística (repartidores, stock o conductores compartidos).
- Subastas y precios.

En el notebook, con efecto directo +1,0 y competencia de −0,8 por fracción tratada de la zona, el lanzamiento completo aporta +0,2. Aleatorizar por usuario da +0,99 (**sobrestima 5 veces**); aleatorizar por zona da +0,20.

Diseños: **cluster** (zona, ciudad, comunidad de grafo; menos potencia), ***switchback*** (alternar entre versiones por franjas de tiempo; vigila los efectos persistentes), **geo-experimentos** y modelos de interferencia explícitos.

---

## DS2.7 · *Bandits*

### Idea
Un A/B reparte el tráfico de forma fija durante todo el test. Un **bandit** lo reparte de forma adaptativa: explora variantes inciertas y explota las que parecen mejores. Se mide con el **regret**: la diferencia entre lo que habrías conseguido mostrando siempre la mejor variante y lo que conseguiste.

### Estrategias
- **ε-greedy:** con probabilidad ε muestra una variante al azar; si no, la de mayor media. Sencillo, pero un ε fijo desperdicia una fracción del tráfico para siempre; con ε muy pequeño puede quedarse con una variante mediocre.
- **Thompson sampling:** mantiene una distribución posterior (Beta para conversiones) de cada variante, extrae una muestra de cada una y muestra la mayor. Explora donde hay incertidumbre y deja de hacerlo cuando aprende. Rinde muy bien en la práctica.
- Otros: UCB (límite superior de confianza), bandits contextuales (la mejor variante depende del usuario).

### Resultados del notebook (4 variantes, 10 000 sesiones, 100 repeticiones)
| Estrategia | Regret final | % de sesiones con la mejor |
|---|---|---|
| A/B/n uniforme | 162 | 25 % |
| ε = 0,10 | 91 | 53 % |
| ε = 0,02 | 121 | 45 % |
| Thompson | 60 | 69 % (83 % en las últimas 1 000) |

### Cuándo bandit y cuándo A/B
| Bandit | A/B |
|---|---|
| Muchas variantes, vida corta (titulares, banners, notificaciones) | Decisiones de producto con efectos a largo plazo |
| El coste de mostrar una variante mala es alto | Necesitas inferencia limpia sobre todas las variantes |
| Métrica rápida y estable | Métricas lentas, efecto novedad, interferencia |
| Optimizar | Aprender |

Riesgo: los intervalos de las variantes poco mostradas son malos; si la métrica deriva en el tiempo, el bandit puede equivocarse (hay variantes no estacionarias).

---

## DS2.8 · Del análisis a la decisión

Orden de lectura de un experimento:
1. **Calidad:** SRM, registro de eventos, bots, exposición real.
2. **Métrica principal** (con CUPED): efecto, IC, relevancia práctica frente al MDE.
3. **Secundarias y segmentos**, corregidas por comparaciones múltiples.
4. **Guardarraíles** (no inferioridad).
5. **Tendencia temporal:** novedad, estacionalidad.
6. **Decisión:** lanzar / iterar / no lanzar, con riesgos y seguimiento.

Una frase de resultado tiene siempre: efecto estimado, intervalo, qué se comparó, y qué decisión se recomienda. Evita «es significativo»; di «el gasto sube 0,9 € por usuario (IC95% 0,7–1,1 €), por encima del MDE de 0,5 €».

---

## Glosario
- **MDE:** efecto mínimo detectable relevante para el negocio.
- **CUPED:** reducción de varianza con una covariable previa al experimento.
- **Mirar antes de tiempo (*peeking*):** analizar repetidamente y parar al primer p < α.
- **Alpha spending:** reparto del error de tipo I entre las miradas planificadas.
- **SPRT:** test secuencial de razón de verosimilitudes.
- **FWER / FDR:** probabilidad de algún falso positivo / proporción de falsos entre los descubrimientos.
- **SRM:** reparto observado distinto del diseñado.
- **Guardarraíl:** métrica que no debe empeorar.
- **No inferioridad:** test para descartar un empeoramiento mayor que un margen.
- **SUTVA:** un usuario no se ve afectado por la asignación de otros.
- ***Switchback*:** alternar tratamiento y control en el tiempo para unidades que interfieren.
- **Regret:** pérdida acumulada frente a la mejor opción desde el principio.
- **Thompson sampling:** elegir la variante con la mayor muestra de su posterior.
