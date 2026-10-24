# Módulo DS1 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh DS1`. Las demos se hacen en `notebook.ipynb`; ten abiertos el notebook y las diapositivas. Cada demo termina con la línea «estimación frente a verdad».

## DS1.1 · Resultados potenciales, DAGs y puerta trasera (20 min)
- [0–3] Gancho: «los clientes con app gastan 19 € más; el director quiere dársela a todos». ¿Cuánto ganará de verdad? (spoiler: 8 €).
- [3–8] Resultados potenciales y el contrafactual; ATE, ATT, LATE; sesgo de selección.
- [8–14] DAG de TiendaSur: dibujarlo en pizarra; cadena, bifurcación, colisionador.
- [14–20] Demo de `criterio_puerta_trasera` con los cuatro conjuntos de ajuste; ver cuál falla y por qué.

## DS1.2 · Confusores, mediadores y colisionadores (15 min)
- [0–4] Tabla de los tres papeles y qué hacer con cada uno.
- [4–12] Demo de la simulación: leer la tabla de sesgos fila a fila; énfasis en «ajustar por más variables no es más seguro».
- [12–15] Ejemplo real de colisionador (analizar solo clientes que dejaron reseña).

## DS1.3 · Regresión con ajuste (10 min)
- [0–4] Interpretación del coeficiente, ignorabilidad condicional.
- [4–8] Demo: 19 → 8,45 al incluir los confusores. IC robusto.
- [8–10] Límites: no ve confusores no observados ni falta de solapamiento.

## DS1.4 · Propensity score (20 min)
- [0–5] Idea del ps; por qué resume las covariables.
- [5–10] Demo: histograma de solapamiento; tabla SMD antes y después.
- [10–16] Emparejamiento vs IPW vs AIPW; los tres recuperan ≈ 8.
- [16–20] Qué pasa con ps extremos (ejercicio 2) y bootstrap del procedimiento completo.

## DS1.5 · Diferencias en diferencias (20 min)
- [0–5] Intuición: dos tiendas, antes y después, con una tabla 2×2.
- [5–10] Demo DiD a mano y por regresión con errores agrupados; comparación ingenua (+17) vs DiD (6,1).
- [10–17] Estudio de eventos: gráfico con tendencias paralelas y gráfico con pendiente distinta.
- [17–20] Qué hacer si falla; aviso sobre adopción escalonada.

## DS1.6 · Variables instrumentales (15 min)
- [0–4] Confusor no observado; las tres condiciones del instrumento.
- [4–9] Demo: OLS 12,7 vs 2SLS 7,8; Wald a mano; F de la primera etapa.
- [9–13] Demo de instrumento débil: 300 repeticiones, dispersión.
- [13–15] LATE: para quién vale el resultado.

## DS1.7 · Regresión discontinua (10 min)
- [0–4] Regla del umbral y el «casi experimento».
- [4–8] Demo: diferencia ingenua +28 vs RDD ≈ 4; varios anchos de banda.
- [8–10] Manipulación del corte y validez local.

## DS1.8 · Uplift modeling (20 min)
- [0–5] Los cuatro tipos de cliente; respuesta vs uplift.
- [5–11] Demo: S-learner y T-learner; correlación con el uplift real (solo posible en simulación).
- [11–16] Curva Qini; comparación con el modelo de respuesta.
- [16–20] Beneficio incremental: óptimo en ≈ 25 %, enviar a todos pierde dinero. Cambiar el coste del cupón (ejercicio 5).

## DS1.9 · Qué método usar y cómo contarlo (10 min)
- [0–5] Tabla diseño → método → supuesto.
- [5–8] Guion de entrevista de 6 puntos.
- [8–10] Presentar el caso práctico y los criterios; DoWhy/EconML como siguiente paso.
