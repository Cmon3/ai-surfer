# Módulo DS6 · Forecasting avanzado — Apuntes

> Objetivo: pasar de «pronostico una serie» a «mantengo un sistema que pronostica miles, mide su error y da cifras coherentes».

---

## 6.1 · De una serie a cientos

Con una serie ajustas un modelo a mano. Con 100 (o 100 000) series necesitas:
- Un **protocolo de evaluación** común (métricas comparables, backtesting).
- Modelos que **comparten información** entre series (globales) o procesos automáticos por serie (locales).
- **Coherencia** entre niveles (producto, tienda, total).
- **Incertidumbre** para decidir stock.

Caso TiendaSur: 20 productos × 5 tiendas = 100 series diarias, horizonte de 4 semanas. Los efectos de **promociones y festivos** son conocidos con antelación: un modelo que los reciba como variables ganará a uno que solo mira el histórico.

---

## 6.2 · Métricas

- **MASE** = MAE del modelo / MAE del ingenuo estacional *en el entrenamiento* (aquí, lag 7). Sin escala; < 1 = mejor que repetir la semana anterior. Se promedia entre series.
- **WAPE** = Σ|error| / Σ ventas. Ponderada por volumen, no explota con ceros (el MAPE sí) y se explica sola.
- **Sesgo** = Σ(previsión − real) / Σ real. Positivo = sobrestima. Importa: un modelo con buen WAPE pero sesgo negativo sistemático genera roturas de stock.
- **Evita MAPE** con series con ceros o pequeñas.
- Reporta siempre por **segmentos** (categoría, tamaño de serie): la media esconde dónde falla.

---

## 6.3 · Backtesting con origen rodante

En un **origen** `o` el modelo solo ve datos ≤ `o` y predice `o+1…o+H`. Se repite desplazando el origen (aquí 4 orígenes separados 28 días). Reglas:
- Nada del futuro en las variables: retardos y ventanas calculados **en el origen**; el calendario y las promociones planificadas del día objetivo sí se conocen.
- Entrenar con filas cuyo **objetivo** sea ≤ origen (en el global).
- No elegir hiperparámetros ni ponderaciones con los mismos pliegues con que evalúas (ejercicio 5).
- Mira la métrica por pliegue: la variabilidad es parte del resultado.

---

## 6.4 · Modelos locales

Referencias que hay que batir: **ingenuo** (último valor), **ingenuo estacional** (misma semana pasada), **media de las últimas 4 semanas por día de la semana**. Después, un **ETS/Holt-Winters** por serie (tendencia amortiguada + estacionalidad semanal).

Resultado en el notebook (media de 4 pliegues): MASE 0,90 / 0,87 / 0,71 / 0,69 respectivamente. El ETS mejora al ingenuo, pero no conoce ni promos ni festivos y no aprovecha lo que otras series enseñan. Si tienes pocas series, series largas y estables, un local sigue siendo difícil de batir.

---

## 6.5 · Modelos globales con ML

Un único modelo para todas las series. Cada fila: serie × origen × horizonte `h`. Variables:
- **Retardos y ventanas** del origen: medias de 7/28/91 días, mismo día de la semana 1–4 semanas atrás, mismas fechas hace un año, dispersión reciente.
- **Calendario/eventos del día objetivo:** día de la semana, mes, día del año, festivo, Navidad, Black Friday, cierre, **promoción**.
- **Identificadores** (producto, tienda, categoría) como categóricas.
- **Horizonte `h`** (estrategia *directa*: un modelo para todos los horizontes; la *recursiva* realimenta predicciones y acumula error).

Dos decisiones que se olvidan: **escalar por serie** (objetivo = ventas / media de 28 días) y usar una **pérdida adecuada a conteos** (Poisson).

Resultado: WAPE ≈ 0,29 frente a ≈ 0,33 del ETS y ≈ 0,42 del ingenuo estacional; sesgo ≈ 0. Gana en todas las categorías y tamaños de serie, y más en las grandes por las promos. `HistGradientBoostingRegressor` (scikit-learn) y LightGBM son casi intercambiables; para producción masiva existen `mlforecast` y `statsforecast` (Nixtla), que automatizan estas tablas y modelos locales rápidos.

---

## 6.6 · Intervalos de predicción

- **Cuantílica:** modelos con `loss="quantile"` para q10 y q90. Directo, pero un modelo por cuantil y calibración no garantizada.
- **Conformal (split):** calibrar con residuos fuera de muestra de un periodo anterior; aquí el pliegue previo, **escalando** el error y agrupando por tamaño de serie. Funciona con cualquier modelo de punto.
- **Métricas:** cobertura (¿80 % de los reales dentro?), anchura relativa y *interval score* (anchura + penalización por fallos).

En el notebook ambos dan cobertura ≈ 0,77–0,80 para un objetivo de 0,80 y ancho similar; la cobertura **cae con el horizonte** (semana 1 ≈ 0,80, semana 4 ≈ 0,73–0,75). Garantía conformal: vale si el futuro se parece a la calibración; con cambios de régimen se rompe.

---

## 6.7 · Jerarquías y reconciliación

Previsiones independientes por nivel **no cuadran** (ETS: total ≠ suma de tiendas, ~2,7 %). Con la matriz de suma **S** (`y = S·b`):
- **Bottom-up:** suma de las series base.
- **Top-down:** reparte el total con proporciones fijas. Coherente pero pierde la dinámica de cada serie (WAPE base 0,32 frente a 0,29 del global).
- **Reconciliación por mínimos cuadrados** (OLS/WLS/MinT): proyecta las previsiones de todos los niveles al espacio coherente.

Resultados del notebook: reconciliar previsiones ETS aporta coherencia y mejoras pequeñas; con un modelo global fuerte en la base, el **bottom-up** gana a todo en todos los niveles (WAPE total ≈ 0,04). Moraleja: reconciliar no es magia; se decide con backtesting, nivel por nivel.

---

## 6.8 · Modelos fundacionales de series temporales

Modelos preentrenados con enormes colecciones de series que predicen series nuevas sin entrenar (*zero-shot*). Familias: Chronos (Amazon), TimesFM (Google), Moirai (Salesforce), Lag-Llama, TimeGPT (Nixtla, API). **Comprueba el modelo y la versión vigentes antes de usarlos.**

- **Sirven** para: series cortas o nuevas, muchas series sin tiempo de modelar, *baseline* fuerte en minutos.
- **No siempre ganan** si tu señal está en variables externas (promos, precio) o tienes mucho histórico propio.
- **Se evalúan igual:** mismo backtesting y métricas, frente al ingenuo estacional y a tu modelo global. El notebook incluye `evaluar_modelo` y un esqueleto comentado para Colab.
- Cuidado con la **contaminación**: si el modelo vio tus datos (o similares) al preentrenarse, la evaluación sale optimista.

---

## Glosario
- **MASE / WAPE:** errores escalados / ponderados. **Sesgo:** error medio relativo con signo.
- **Origen rodante:** ventana de backtesting que avanza.
- **Modelo local / global:** uno por serie / uno para todas.
- **Estrategia directa / recursiva:** un modelo por horizonte (o con `h` como variable) / realimentar predicciones.
- **Conformal:** calibrar intervalos con errores fuera de muestra.
- **Interval score:** anchura más penalización por fallos.
- **Reconciliación:** hacer coherentes las previsiones de una jerarquía.
- **Zero-shot:** predecir sin entrenar con tus datos.
