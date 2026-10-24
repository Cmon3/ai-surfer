# Módulo DS1 · Inferencia causal

**N3-DS · Data Science avanzada · ~10 horas** · El módulo que separa al analista que describe («los clientes con app gastan más») del *data scientist* que decide («¿qué pasa si la app llega a todos?»). Aparece en las ofertas de *Data Scientist* de producto, de marketing y de *pricing* como «experiencia en inferencia causal, *uplift*, experimentación», y casi nadie lo domina de verdad.

## Objetivos
Al terminar este módulo podrás:
- Dibujar un **DAG** y aplicar el **criterio de la puerta trasera** para decidir por qué variables ajustar (y por cuáles no).
- Distinguir **confusores, mediadores y colisionadores**, y demostrar con simulaciones cómo ajustar mal *crea* sesgo.
- Estimar efectos con datos observacionales mediante **regresión con ajuste**, ***propensity score*** (emparejamiento e IPW) y estimadores doblemente robustos, comprobando **solapamiento y equilibrio**.
- Aplicar **diferencias en diferencias** y contrastar las **tendencias paralelas** con un estudio de eventos.
- Usar **variables instrumentales (2SLS)** e interpretar su resultado (LATE) y los instrumentos débiles.
- Estimar un efecto en un umbral con **regresión discontinua**.
- Construir y evaluar un **modelo de *uplift*** (S-learner y T-learner), leer una **curva Qini** y convertirla en una decisión de negocio (¿a quién enviamos el cupón?).
- Elegir el método según **cómo se generaron los datos**, no según la moda.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| DS1.1 | Correlación, causalidad y resultados potenciales; DAGs y criterio de la puerta trasera | 20 min |
| DS1.2 | Confusores, mediadores y colisionadores (con simulaciones) | 15 min |
| DS1.3 | Regresión con ajuste y sus límites | 10 min |
| DS1.4 | *Propensity score*: emparejamiento, IPW, solapamiento y equilibrio | 20 min |
| DS1.5 | Diferencias en diferencias y tendencias paralelas | 20 min |
| DS1.6 | Variables instrumentales y 2SLS | 15 min |
| DS1.7 | Regresión discontinua (visión breve) | 10 min |
| DS1.8 | *Uplift modeling*: T-learner, S-learner y curva Qini | 20 min |
| DS1.9 | Qué método usar y cómo contarlo: diseño, supuestos y comunicación | 10 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; el PDF se genera con `scripts/generar_diapositivas.sh DS1`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con datos simulados de efecto conocido y 5 ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Libros, cursos y documentación gratuitos |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — **TiendaSur** te hace tres preguntas: *¿cuánto vende de más la app?* (datos observacionales con autoselección), *¿funcionó el nuevo escaparate en las tiendas piloto?* (panel de tiendas, DiD), *¿a quién enviamos el cupón?* (experimento aleatorizado, *uplift*). Todos los datos están **simulados con el efecto causal conocido**, de modo que cada sección imprime «estimación frente a verdad» y ves qué método acierta y cuál no (la diferencia de medias ingenua da +19 € cuando el efecto real es +8 €). Solo usa `numpy`, `pandas`, `statsmodels`, `scikit-learn` y `matplotlib`; no hace falta DoWhy ni EconML (en las lecturas verás cuándo conviene usarlos). Se ejecuta en unos 10 segundos en CPU.

## Caso práctico (entregable)
**Estudio causal para una decisión.** Elige un problema con datos públicos o simulados por ti donde haya una decisión detrás (p. ej. «¿una campaña de descuentos aumenta la recompra?», «¿el cambio de política en una ciudad redujo X?»). Entrega un notebook + un informe de 2 páginas que contenga:
1. La **pregunta causal** y el efecto que quieres estimar (ATE, ATT, LATE), con el **DAG** y la justificación de cada flecha.
2. Al menos **dos métodos** distintos (p. ej. regresión + IPW, o DiD + evento) y un análisis de **sensibilidad o robustez** (otro conjunto de ajuste, otro ancho de banda, un test placebo).
3. Los **diagnósticos** del método: solapamiento y equilibrio, tendencias previas, fuerza del instrumento…
4. Una **decisión recomendada** con su incertidumbre y los supuestos no verificables explicados en lenguaje no técnico.

**Criterios:** identificación y DAG razonados 30 % · corrección técnica y diagnósticos 30 % · robustez / sensibilidad 20 % · comunicación de la decisión y de los supuestos 20 %.

> Pieza de portafolio: un estudio causal bien contado con sus limitaciones es justo lo que se pregunta en las entrevistas de *Data Scientist* senior («¿cómo sabes que el efecto es causal?»).

## Autoevaluación
1. En el DAG `fidelidad → app`, `fidelidad → gasto`, `app → pedidos → gasto`, ¿por qué variables ajustas para estimar el efecto **total** de `app` sobre `gasto`, y por qué no por `pedidos`?
2. ¿Por qué ajustar por un colisionador puede crear una asociación que no existía?
3. ¿Qué dos comprobaciones haces antes de fiarte de un *propensity score*?
4. En DiD, ¿qué significa «tendencias paralelas» y cómo buscas evidencia a favor?
5. ¿Qué tres condiciones debe cumplir un instrumento y cuáles puedes comprobar con datos?
6. ¿En qué se diferencia un modelo de respuesta de un modelo de *uplift*? ¿Por qué el primero puede mandar cupones a «clientes seguros»?

<details><summary>Respuestas</summary>

1. Por `fidelidad` (cierra la puerta trasera `app ← fidelidad → gasto`). No por `pedidos`: es un mediador, parte del efecto que quieres medir; ajustar lo eliminaría y solo quedaría el efecto directo.
2. Porque dos causas independientes de C quedan asociadas entre sí al fijar C (si C es alto y una causa es baja, la otra debe ser alta). Esa asociación espuria contamina el efecto.
3. Solapamiento (¿hay clientes parecidos en ambos grupos? Si no, hay que recortar o acotar la población) y equilibrio de covariables tras emparejar/ponderar (|SMD| < 0,1).
4. Que, sin tratamiento, tratadas y control habrían evolucionado igual. No es contrastable, pero se busca evidencia con varios periodos previos: gráfico y coeficientes de estudio de eventos ≈ 0 antes del tratamiento.
5. Relevancia (se comprueba: F de la primera etapa), exogeneidad (se argumenta o la da el azar) y restricción de exclusión (se argumenta). Con datos solo se verifica la primera.
6. El de respuesta predice quién comprará con cupón; el de *uplift* predice cuánto **cambia** la compra por el cupón. Un cliente que comprará de todos modos tiene alta respuesta y uplift ≈ 0: el cupón es dinero regalado.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: *Causal Inference: What If* (Hernán y Robins), *The Effect* (Huntington-Klein) y el curso de Brady Neal.
