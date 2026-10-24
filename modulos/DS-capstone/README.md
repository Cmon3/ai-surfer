# Capstone DS · Una decisión de negocio con evidencia causal o experimental

**Entregable final de la especialización Data Science avanzada (N3-DS).** Individual o en parejas · ~30–40 horas repartidas en 4 semanas.

## Objetivo
Responder con rigor a **una pregunta de decisión real** del tipo «¿debemos hacer X?» o «¿qué efecto tuvo X?», donde una correlación no basta. Es la pieza de portafolio que demuestra lo que distingue a un *data scientist* senior: **diseñar o identificar la evidencia causal, cuantificar la incertidumbre y convencer a quien decide**.

Integra los módulos del bloque:
| Módulo | Qué aporta al capstone |
|---|---|
| DS1 · Inferencia causal | Marco causal, DAGs, emparejamiento, diferencias en diferencias, variables instrumentales, *uplift* |
| DS2 · Experimentación avanzada | Potencia y tamaño muestral, CUPED, pruebas secuenciales, guardarraíles |
| DS3 · Estadística bayesiana | A/B bayesiano, modelos jerárquicos, intervalos creíbles |
| DS6 · Forecasting avanzado | Contrafactuales con series temporales (si la opción lo requiere) |
| DS7 · Datos a escala | Pipeline reproducible, tests de datos, capas |
| DS8 · Comunicación y producto de datos | Métricas, memo, gráficos honestos, presentación a no técnicos |

## Elige una opción

### Opción A · Diseñar y analizar un experimento (A/B)
Plantea un experimento sobre un producto o proceso, **diséñalo** (hipótesis, métrica principal, guardarraíles, aleatorización, potencia y duración) y **analízalo** con datos reales o simulados con efectos conocidos.
- Datos sugeridos: un conjunto público de experimentos de marketing (por ejemplo, el *Hillstrom Email Marketing* o el *Criteo Uplift*; comprueba su disponibilidad y licencia vigentes) o un simulador propio basado en TiendaSur, en cuyo caso **documenta el proceso generador** y comprueba que tu análisis recupera el efecto verdadero.

### Opción B · Estudio causal con datos observacionales
Estima el efecto de una intervención que **no** se asignó al azar (una campaña, una política, un cambio de precios) con diferencias en diferencias, emparejamiento, variables instrumentales o un método de control sintético.
- Datos sugeridos: un experimento natural con datos abiertos (por ejemplo, un cambio normativo con grupos afectados y no afectados en datos de [datos.gob.es](https://datos.gob.es/) o del [INE](https://www.ine.es/)), o un conjunto clásico de evaluación de programas (*Lalonde / NSW*; comprueba su disponibilidad).

### Opción C · Propuesta propia
Un problema real de tu sector. Debe aprobarse en el hito 0 y cumplir los **requisitos comunes**.

## Requisitos comunes (todas las opciones)
1. **Pregunta de decisión** en una frase: quién decide, qué opciones tiene y qué métrica importa.
2. **Plan de análisis escrito antes de ver los resultados** (pre-registro ligero): hipótesis, métrica principal, guardarraíles, criterio de decisión y análisis de subgrupos permitidos. Se versiona en Git con fecha.
3. **Identificación causal explícita:** un DAG con las variables relevantes, los supuestos (por qué la comparación es válida) y las **amenazas** (confusores, interferencia, sesgo de selección, efecto novedad, atrición).
4. **Estimación con incertidumbre:** el efecto con su intervalo (de confianza o creíble), no solo una cifra. Una **comprobación de robustez** al menos (prueba placebo, tendencias previas paralelas, variación de especificación o análisis de sensibilidad a un confusor no observado).
5. **Guardarraíles y regla de decisión** (módulo DS8): cuándo se lanza, cuándo no y qué se haría con un resultado no concluyente.
6. **Datos reproducibles** (módulo DS7): un pipeline que parte de los datos crudos, con capas o pasos claros, **al menos 5 tests de datos** y un comando que reproduce todas las cifras del informe.
7. **Comunicación** (módulo DS8): memo de una página con la pirámide de Minto, tres gráficos honestos y un guion de presentación de 10 minutos para un público no técnico, con el resultado en frecuencias naturales.
8. **Ética y límites:** datos personales (RGPD), posibles daños de la decisión, a quién no se puede generalizar el resultado.

## Entregables (repositorio en GitHub)
| # | Entregable | Detalle |
|---|---|---|
| 1 | Repositorio público | Estructura clara (`datos/`, `src/`, `notebooks/`, `tests/`, `informe/`) y README con cómo reproducir en 3 comandos |
| 2 | Plan de análisis | `informe/plan-de-analisis.md`, con fecha de *commit* anterior al análisis |
| 3 | Notebook de análisis | Se ejecuta de principio a fin; explica cada decisión |
| 4 | Pipeline y tests de datos | Mínimo 5 tests (esquema, rangos, duplicados, integridad, balance entre grupos o tendencias previas) |
| 5 | Memo de una página | `informe/memo.md` o PDF: recomendación, tres razones con números, riesgos, decisión y fecha |
| 6 | Presentación | 10 minutos + 5 de preguntas, ante un público no técnico, con las diapositivas en el repositorio |
| 7 | Sección «Amenazas y límites» | Qué podría hacer que la conclusión fuera falsa y qué se comprobó |

## Hitos
| Semana | Hito | Resultado |
|---|---|---|
| 0 | **Propuesta** (1 página) | Pregunta, opción, datos, plan provisional. Aprobada por el tutor |
| 1 | **Diseño y plan de análisis** | DAG, métricas, guardarraíles, potencia (A) o estrategia de identificación (B); datos y pipeline inicial |
| 2 | **Análisis principal** | Estimación con incertidumbre; tests de datos en verde |
| 3 | **Robustez y límites** | Pruebas placebo/sensibilidad; amenazas; versión 1 del memo |
| 4 | **Comunicación y entrega** | Memo final, gráficos, ensayo de la presentación y presentación |

## Rúbrica (100 pts)
| Criterio | Máximo | Qué se valora |
|---|---|---|
| Pregunta de decisión y plan de análisis | 10 | Pregunta accionable; plan escrito y fechado antes del análisis |
| Identificación causal | 20 | DAG y supuestos justificados; elección del método adecuada al diseño; amenazas bien identificadas |
| Estimación e incertidumbre | 20 | Método bien aplicado; efecto con intervalo; potencia (A) o validación de supuestos (B) |
| Robustez y honestidad | 15 | Pruebas de robustez; límites declarados; no se ocultan resultados incómodos |
| Datos y reproducibilidad | 10 | Pipeline, tests de datos y comando de reproducción que funciona |
| Comunicación escrita | 15 | Memo con la pirámide, números concretos, sin jerga; gráficos honestos |
| Presentación | 10 | Claridad para un público no técnico, uso del tiempo, respuestas a preguntas difíciles |

**Mínimo para aprobar:** 70 puntos y los requisitos comunes 2, 3, 4 y 6 cumplidos.

## Errores que penalizan
- Concluir causalidad desde una correlación sin discutir confusores.
- Mirar los resultados y después escoger la métrica o el subgrupo «que sale» (*p-hacking*): por eso existe el plan fechado.
- Dar solo la estimación puntual.
- Un memo que empieza por el método en lugar de por la recomendación.
- Un repositorio que no se puede reproducir.

## Cómo se usa en la búsqueda de empleo
Es la pieza de portafolio del itinerario **Data Scientist**: «experimento A/B o estudio causal». En una entrevista permite contestar con detalle a «cuéntame un análisis que cambiara una decisión», «¿cómo sabes que el efecto es causal?» y «¿cómo se lo explicaste a negocio?». Prepárala con el módulo de empleabilidad (CAR) y publícala con un README de producto.
