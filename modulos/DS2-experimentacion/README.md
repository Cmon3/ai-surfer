# Módulo DS2 · Experimentación avanzada

**N3-DS · Data Science avanzada · ~10 horas** · Los A/B básicos ya los sabes hacer (F3 y I3). Este módulo cubre lo que se pregunta en las entrevistas de *Data Scientist* de producto y senior: cómo ser más rápido sin hacer trampas, cómo saber que un experimento está roto y cómo decidir cuando el A/B clásico no encaja. Es lo que distingue a quien *ejecuta* tests de quien *diseña* un programa de experimentación.

## Objetivos
Al terminar este módulo podrás:
- Calcular **potencia y tamaño de muestra** (proporciones y métricas continuas) y verificarlos con simulación.
- Aplicar **CUPED** y **medir** la reducción de varianza y su equivalencia en tráfico.
- Explicar y **simular** por qué mirar los resultados antes de tiempo infla el error de tipo I, y corregirlo con **límites de grupos secuenciales** (Pocock, O'Brien-Fleming, *alpha spending*) o con un **SPRT**.
- Tratar las **comparaciones múltiples** (Bonferroni, Holm, Benjamini-Hochberg) y declarar una métrica principal.
- Definir **métricas de guardarraíl** con tests de no inferioridad y detectar un **SRM** (*sample ratio mismatch*).
- Reconocer el **efecto novedad** y la **interferencia** entre unidades (efectos de red) y elegir un diseño (cluster, *switchback*).
- Comparar A/B con ***bandits*** (ε-greedy y Thompson sampling) mediante el *regret* y saber cuándo usar cada uno.
- Redactar el **informe de decisión** de un experimento: el orden de comprobaciones y la recomendación.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| DS2.1 | Repaso: hipótesis, potencia, MDE y tamaño de muestra | 15 min |
| DS2.2 | CUPED: reducción de varianza con datos previos | 20 min |
| DS2.3 | Pruebas secuenciales y el problema de mirar antes de tiempo (alpha spending, SPRT) | 25 min |
| DS2.4 | Comparaciones múltiples: FWER y FDR | 15 min |
| DS2.5 | Guardarraíles y *sample ratio mismatch* | 20 min |
| DS2.6 | Efecto novedad y efectos de red / interferencia | 15 min |
| DS2.7 | *Bandits*: ε-greedy, Thompson sampling y *regret* | 20 min |
| DS2.8 | Del análisis a la decisión: el informe del experimento | 10 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; el PDF se genera con `scripts/generar_diapositivas.sh DS2`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con simulaciones y 5 ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Lecturas y documentación gratuitas |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — **rediseño del carrito de TiendaSur**. Todo es simulación con la verdad conocida: el notebook comprueba que la potencia empírica es del 80 % cuando promete el 80 %, que CUPED reduce la varianza lo que predice 1 − ρ², que mirar 10 veces dispara los falsos positivos al 20 %, que Pocock y O'Brien-Fleming lo devuelven al 5 %, que un SRM puede fabricar un efecto inexistente, que la aleatorización por usuario da +1,0 cuando el lanzamiento completo solo aporta +0,2, y que Thompson pierde mucho menos que un A/B/n uniforme. Termina con un análisis integrado en el orden de un informe real. Usa `numpy`, `pandas`, `scipy`, `statsmodels` y `matplotlib`; se ejecuta en unos 10 segundos en CPU.

## Caso práctico (entregable)
**Plan y análisis de un experimento.** Elige un cambio de producto (real o ficticio) y entrega un notebook + un documento de 2 páginas con:
1. **Hipótesis, métrica principal, guardarraíles y secundarias**, con el MDE justificado por negocio.
2. **Diseño:** tamaño de muestra (con y sin CUPED), duración (semanas completas) y regla de parada (análisis único, secuencial o bandit) razonada.
3. **Simulación** que demuestre que tu procedimiento mantiene el 5 % de falsos positivos y la potencia prometida.
4. **Análisis** de un conjunto de datos simulado por ti: SRM, métrica principal con CUPED, secundarias corregidas, guardarraíles.
5. **Recomendación** de lanzar / no lanzar / iterar, con la incertidumbre y los riesgos (novedad, interferencia).

**Criterios:** diseño y potencia 25 % · corrección estadística (secuencial, múltiples, CUPED) 30 % · calidad de los controles (SRM, guardarraíles) 20 % · claridad de la decisión y de la incertidumbre 25 %.

> Pieza de portafolio: «programa de experimentación» es una de las cosas más valoradas en un perfil senior de producto; este documento demuestra que sabes hacerlo sin trampas.

## Autoevaluación
1. ¿Por qué CUPED no introduce sesgo, y de qué depende cuánto reduce la varianza?
2. Un compañero mira el panel cada día y para el test cuando p < 0,05. ¿Qué tasa de falsos positivos esperas con 10 miradas y por qué?
3. Tienes 20 métricas. ¿Qué diferencia hay entre controlar el FWER y el FDR? ¿Cuál usarías para la métrica principal?
4. Esperabas 50/50 y obtienes 50 000 / 48 800. ¿Qué haces con el resultado del experimento?
5. ¿Por qué «no hay diferencia significativa» en el tiempo de carga no basta para un guardarraíl?
6. Aleatorizas por usuario en un servicio de reparto con repartidores compartidos. ¿Qué sesgo temes y qué alternativa tienes?
7. ¿En qué casos preferirías un *bandit* a un A/B? ¿Qué pierdes?

<details><summary>Respuestas</summary>

1. La covariable es previa al experimento, así que el tratamiento no puede afectarla: el ajuste no mueve la media del efecto. La varianza se multiplica por (1 − ρ²), siendo ρ la correlación entre la covariable y la métrica.
2. Cerca del 20 % (en la simulación del notebook, ≈ 19,6 %): cada mirada es otra oportunidad de cruzar el umbral por azar y el error se acumula. Solución: diseño secuencial (Pocock, O'Brien-Fleming) o SPRT, o esperar al tamaño fijado.
3. FWER (Bonferroni, Holm): probabilidad de al menos un falso positivo. FDR (Benjamini-Hochberg): proporción esperada de falsos entre los descubrimientos. La métrica principal se declara de antemano y se evalúa a α completo; la corrección se aplica a las secundarias.
4. Lo descartas hasta encontrar la causa: p = 0,0001 indica un fallo de asignación o registro. Los grupos ya no son comparables aunque el efecto parezca significativo.
5. Falta de potencia no es ausencia de daño. Se exige no inferioridad: que el límite del IC deje fuera un empeoramiento mayor que el margen acordado.
6. Interferencia: los tratados quitan recursos a los no tratados, y la diferencia entre grupos no es el efecto del lanzamiento completo. Alternativa: aleatorizar por zona (cluster) o con *switchback*.
7. Cuando importa reducir el coste de explorar, hay muchas variantes y su vida es corta (titulares, banners). Pierdes inferencia limpia sobre las variantes poco mostradas y sufres si la métrica no es estable en el tiempo.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: *Trustworthy Online Controlled Experiments* (Kohavi, Tang y Xu), el artículo original de CUPED (Deng et al., 2013) y el libro abierto de Daniël Lakens sobre inferencia estadística, que cubre el análisis secuencial.
