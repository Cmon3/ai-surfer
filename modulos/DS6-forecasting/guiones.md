# Módulo DS6 · Guiones de grabación

Diapositivas con Marp: `scripts/generar_diapositivas.sh DS6`. Ten el notebook abierto y ejecutado (1–2 min).

## 6.1 · De una serie a cientos (10 min)
- [0–4] Gancho: «tu jefe pide previsión por producto y tienda: 100 series. ¿Abres 100 notebooks?».
- [4–10] Los cuatro retos (evaluación, información compartida, coherencia, incertidumbre). Presentar el panel simulado.

## 6.2 · Métricas (15 min)
- [0–6] MASE: por qué escala; qué significa 1.
- [6–11] WAPE frente a MAPE con ceros; sesgo y roturas de stock.
- [11–15] Función `metricas` y qué reportar por segmento.

## 6.3 · Backtesting (15 min)
- [0–5] Un corte frente a cuatro orígenes. Tabla de fechas del notebook.
- [5–12] Fugas típicas: ventanas con el futuro, elegir parámetros con el test.
- [12–15] Variabilidad entre pliegues.

## 6.4 · Locales (10 min)
- [0–5] Las tres referencias; ejecutar y leer la tabla.
- [5–10] ETS por serie: qué no sabe (promos, festivos, otras series).

## 6.5 · Global con ML (25 min)
- [0–8] Estructura de la tabla directa; escalado por serie.
- [8–15] Variables una a una y por qué no hay fugas (`filas`).
- [15–20] Entrenamiento por pliegue y tabla de resultados.
- [20–25] Dónde gana (categoría, tamaño); LightGBM, `mlforecast`.

## 6.6 · Intervalos (20 min)
- [0–7] Cuantílica y conformal paso a paso.
- [7–14] Cobertura, anchura, interval score; el gráfico de la serie grande.
- [14–20] Cobertura por semana de horizonte (ejercicio 3) y límites de la garantía.

## 6.7 · Jerarquías (20 min)
- [0–6] Matriz S; incoherencia de ETS.
- [6–14] Bottom-up, OLS, WLS; leer la tabla por nivel.
- [14–20] Moraleja: no siempre mejora; top-down (ejercicio 4).

## 6.8 · Modelos fundacionales (10 min)
- [0–5] Qué son, cuándo sirven y cuándo no; contaminación.
- [5–10] `evaluar_modelo` y el esqueleto de Colab; presentar el entregable.
