# Módulo I4 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh I4`. Ten abiertos el notebook y los apuntes; ejecuta el notebook entero antes de grabar. Las cifras exactas pueden variar ligeramente con las versiones: léelas en pantalla.

## 4.1 · Ingeniería de variables (20 min)
- [0–3] Gancho: «Dos analistas, el mismo algoritmo, 10 puntos de AUC de diferencia: la diferencia son las variables.» Presenta TiendaSur y el problema.
- [3–8] Fechas (mes, día de la semana) y ratios (`ahorro_eur`, `importe_por_articulo`). Por qué el árbol no los saca solo.
- [8–15] Agregados por cliente: abrir `historial_cliente`. Mostrar el cliente 3 y la diferencia entre `n_pedidos_prev` y `dev_resueltas`. Explicar la ventana de 30 días y el suavizado.
- [15–20] Pregunta de control («¿tendré este valor al predecir?») y `NaN` como información.

## 4.2 · Codificar categorías (15 min)
- [0–4] One-hot y ordinal en 1 minuto cada uno; tabla de cuándo usar cada técnica.
- [4–11] *Target encoding*: dibujar un cliente con 3 pedidos. Ejecutar la celda de CODIF y comparar las dos correlaciones (con y sin cruce).
- [11–15] Regla: siempre en `Pipeline`; nunca `groupby` a mano.

## 4.3 · Fugas de datos (20 min)
- [0–3] Gancho: «El AUC es 1,00. ¿Enhorabuena?» Mostrar la fuga de objetivo.
- [3–12] Las cuatro fugas, una a una, con la tabla del notebook. Insistir en que el modelo es el mismo.
- [12–17] Gráfico de barras `fugas.png`. Señales de alarma.
- [17–20] Cómo se evitan. Enlazar con el ejercicio 2 (auditoría con AUC de cada variable sola).

## 4.4 · Validación honesta (15 min)
- [0–4] Los cuatro conjuntos y sus papeles. Por qué los huecos de un mes.
- [4–9] `TimeSeriesSplit`: ejecutar la celda y leer las fechas de cada pliegue.
- [9–12] `GroupKFold` y la comprobación de que no se solapan clientes.
- [12–15] AP frente a AUC; comparar siempre con la tasa base y con el baseline.

## 4.5 · Gradient boosting en la práctica (20 min)
- [0–4] Idea en 3 minutos (recordar I3).
- [4–10] Código de `ajustar` para los tres motores; parada temprana; tabla de comparación. Mensaje: diferencias pequeñas.
- [10–15] Los hiperparámetros que importan, con la tabla de apuntes.
- [15–20] Aviso de macOS (`libomp`) y qué hace el notebook sin él. Mostrar que la regresión logística es un baseline fuerte.

## 4.6 · Desequilibrio e hiperparámetros (15 min)
- [0–6] Demo de `scale_pos_weight`: AUC/AP no mejoran, la probabilidad media se infla.
- [6–12] Búsqueda aleatoria frente a Optuna con el mismo objetivo. Explicar por qué se evalúa con CV temporal del pasado.
- [12–15] Retornos decrecientes y presupuesto.

## 4.7 · Interpretabilidad (20 min)
- [0–5] Permutación: explicar con el ejemplo de barajar `tasa_dev_prev`.
- [5–12] SHAP: abejas, barras, dependencia. Leer el gráfico en voz alta.
- [12–16] Cascada de un pedido concreto; el texto para atención al cliente (ejercicio 5).
- [16–20] Lo que SHAP no dice: causalidad, correlaciones, log-odds. Pregunta al público: «¿quitamos los descuentos?»

## 4.8 · Calibración y umbral por coste (15 min)
- [0–6] Curva de fiabilidad del modelo ponderado antes y después de calibrar; ECE y Brier.
- [6–12] Fórmula `c / (e·D)`, barrido de umbrales, tabla de políticas (nada, todos, 0,5, óptimo). Gráfico de beneficio.
- [12–15] Sensibilidad (ejercicio 4) y cierre: el informe para negocio y el caso práctico.
