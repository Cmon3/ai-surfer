# Módulo DS6 · Forecasting avanzado — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Un MASE de 1,3 en una serie significa…
- a) Que el modelo se equivoca un 1,3 %.
- b) Que predice peor que el ingenuo estacional medido en el entrenamiento.
- c) Que el sesgo es del 30 %.
- d) Que el modelo es excelente.

**2.** ¿Por qué se prefiere WAPE a MAPE en ventas diarias con días de cero?
- a) Porque el MAPE es siempre menor.
- b) Porque el MAPE no está definido o explota con reales cero o pequeños, y WAPE pondera por volumen.
- c) Porque WAPE ignora los errores grandes.
- d) Porque WAPE no necesita datos reales.

**3.** Un modelo tiene buen WAPE y sesgo de −12 %. ¿Qué riesgo de negocio hay?
- a) Exceso de stock sistemático.
- b) Roturas de stock sistemáticas, por subestimar.
- c) Ninguno: el WAPE ya lo cubre.
- d) Solo afecta a series pequeñas.

**4.** En un backtesting de origen rodante, ¿qué es una fuga?
- a) Usar más de un pliegue.
- b) Calcular una ventana móvil con datos posteriores al origen o elegir hiperparámetros con los pliegues de evaluación.
- c) Usar el calendario del día objetivo.
- d) Usar promociones planificadas conocidas con antelación.

**5.** ¿Por qué se divide el objetivo por la media reciente de cada serie en un modelo global?
- a) Para acelerar el entrenamiento.
- b) Para que series de tamaños muy distintos sean comparables para el modelo.
- c) Para evitar usar el calendario.
- d) Para eliminar la estacionalidad.

**6.** Estrategia *directa* con el horizonte `h` como variable frente a *recursiva*:
- a) La recursiva evita cualquier acumulación de error.
- b) La directa no acumula el error de realimentar predicciones.
- c) La directa exige un modelo distinto por serie.
- d) Son idénticas.

**7.** Al calibrar un intervalo conformal con los residuos del pliegue anterior, ¿por qué se escalan y se agrupan por tamaño de serie?
- a) Porque la incertidumbre relativa depende del tamaño de la serie.
- b) Porque así la cobertura es siempre exacta.
- c) Para evitar entrenar el modelo.
- d) Porque los residuos son siempre positivos.

**8.** Las previsiones ETS independientes de cada tienda y del total:
- a) Siempre cuadran.
- b) No tienen por qué sumar el total; reconciliar las hace coherentes.
- c) Son siempre mejores que las reconciliadas.
- d) No se pueden comparar.

**9.** Si el modelo de las series base es mucho mejor que los de los niveles altos, ¿qué suele pasar?
- a) El *bottom-up* puede ganar a la reconciliación OLS.
- b) La reconciliación siempre gana.
- c) El *top-down* siempre gana.
- d) La jerarquía no tiene solución.

**10.** ¿Cómo debe evaluarse un modelo fundacional de series temporales?
- a) Con un único ejemplo bonito.
- b) Con el mismo backtesting y métricas que tus modelos, frente al ingenuo estacional y al global, vigilando la contaminación de datos.
- c) No hace falta evaluarlo: está preentrenado.
- d) Solo con su propia métrica interna.

---
<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | MASE > 1: peor que el ingenuo estacional del entrenamiento. |
| 2 | b | El MAPE divide por el real. |
| 3 | b | Subestimar de forma sistemática deja al cliente sin producto. |
| 4 | b | Cualquier información posterior al origen o la elección con el propio test. |
| 5 | b | Hace comparables series de 3 y de 50 unidades/día. |
| 6 | b | La directa evita realimentar predicciones. |
| 7 | a | Una serie pequeña tiene mucha más incertidumbre relativa. |
| 8 | b | Los modelos independientes no garantizan coherencia. |
| 9 | a | En el notebook, el bottom-up del global gana a todos los niveles. |
| 10 | b | Mismo protocolo que cualquier modelo; la contaminación infla la evaluación. |
</details>
