# Módulo DS8 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh DS8`. Las demos salen del notebook; ten a mano `dashboard.html` abierto en el navegador y las imágenes de `proyecto-comunicacion/`.

## 8.1 · Métricas: norte y árbol (15 min)
- [0–2] Gancho: dos informes con «clientes activos» distintos en la misma reunión. Moraleja: definir antes de calcular.
- [2–7] Qué hace buena a una métrica; métrica norte para TiendaSur; las métricas de vanidad.
- [7–13] El árbol de ingresos netos y la descomposición logarítmica: ejecutar la celda de octubre a noviembre y leer la tabla (suma 100 %).
- [13–15] Ejercicio 1 como tarea: «¿qué factor explica julio → agosto?».

## 8.2 · Guardarraíles (10 min)
- [0–3] Ley de Goodhart con ejemplos (tickets cerrados, ingresos con descuento).
- [3–8] Demo del experimento «envío gratis»: leer la tabla con intervalos; ingresos mejoran, margen roto.
- [8–10] Regla de decisión y por qué los guardarraíles se definen **antes** del experimento.

## 8.3 · Storytelling con datos (15 min)
- [0–4] Contexto, tensión, resolución con un ejemplo real de un análisis aburrido convertido en historia.
- [4–10] Antes y después: gráfico de exploración frente a `historia.png` (título-conclusión, énfasis único, anotación directa).
- [10–15] Una idea por diapositiva y cómo preparar las preguntas difíciles.

## 8.4 · Gráficos que convencen y que engañan (20 min)
- [0–5] Elegir el gráfico según la pregunta; qué evitar (3D, tartas, ejes secundarios).
- [5–13] Los cuatro engaños con `eje_truncado.png` y `enganos.png`. Calcular el factor de mentira en directo (62 frente a 1,0).
- [13–17] Correlación espuria: dos paseos aleatorios con r = −0,46.
- [17–20] La lista de comprobación y por qué enseñar el gráfico a alguien que no conoce los datos.

## 8.5 · Dashboards (15 min)
- [0–5] Principios (una pregunta, una persona; quitar antes de añadir).
- [5–11] Abrir `dashboard.html`: KPIs con delta, tendencia, canal y guardarraíl con umbral. Recorrer el código de `construir_dashboard`.
- [11–15] Herramientas de BI (Power BI, Tableau, Looker Studio) y mantenimiento: responsable, fuente única, fecha de revisión.

## 8.6 · Escribir para ejecutivos (15 min)
- [0–4] La pirámide de Minto: primero la respuesta. Reescribir en directo un párrafo que empieza por el método.
- [4–11] El memo de una página: ejecutar la celda, leer el memo y la salida de `revisar_memo`.
- [11–15] Jerga a evitar; el mismo esquema para un correo; pedir una decisión con fecha.

## 8.7 · Presentar a un público no técnico (15 min)
- [0–4] Conocer a la audiencia; la versión de 1 minuto, la de 10 y el anexo.
- [4–10] `traducir_ab`: frecuencias naturales, incertidumbre en una frase, y el caso «no hay evidencia suficiente».
- [10–13] Estructura de la charla de 10 minutos y preguntas difíciles.
- [13–15] IA responsable: decir qué no hace el modelo y quién lo revisa.

## 8.8 · Make or buy (15 min)
- [0–4] Cuándo se plantea la decisión y los criterios cualitativos (diferenciación, capacidad, datos, salida).
- [4–11] Matriz ponderada: casi empate; la conversación es sobre los pesos.
- [11–15] TCO y sensibilidad: el cruce entre 25 y 50 usuarios. Cierre del módulo y presentación del caso práctico.
