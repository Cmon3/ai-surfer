# Programa del curso

**Ciencia de Datos e IA Aplicada: de los datos a las decisiones** · 14 semanas · 6–8 h/semana

## Resultados de aprendizaje

Al terminar el programa, cada participante será capaz de:

1. **Preparar datos**: cargar, limpiar, transformar y explorar conjuntos de datos con pandas, y comunicar hallazgos con visualizaciones claras.
2. **Razonar con incertidumbre**: estimar, construir intervalos de confianza, diseñar y analizar pruebas A/B, y evitar errores comunes (p-hacking, comparaciones múltiples, confusión correlación/causalidad).
3. **Descubrir estructura**: segmentar clientes o productos con clustering y reducir la dimensión de datos complejos con PCA y t-SNE.
4. **Predecir**: construir, regularizar y validar modelos de regresión y clasificación, eligiendo métricas alineadas con el coste de negocio de cada error.
5. **Aplicar deep learning**: entrenar redes neuronales sencillas (MLP y CNN) y saber cuándo compensan frente a modelos clásicos.
6. **Personalizar**: diseñar sistemas de recomendación basados en popularidad, filtrado colaborativo y factorización de matrices.
7. **Analizar relaciones**: modelar datos como grafos, medir centralidad, detectar comunidades y usar PageRank.
8. **Pronosticar**: descomponer series temporales, comparar modelos (ingenuo, suavizado exponencial, ARIMA) con validación temporal.
9. **Integrar IA generativa**: usar LLMs vía API con prompts robustos, salidas estructuradas y recuperación de contexto (RAG), y evaluar sus riesgos.
10. **Resolver un problema completo**: plantear la pregunta, elegir el método, validar y presentar recomendaciones accionables a una audiencia no técnica.

## Calendario semana a semana

Cada semana sigue el mismo ritmo:

| Día | Actividad | Tiempo aprox. |
|---|---|---|
| Lunes | Se publican los vídeos y lecturas del módulo | 2–3 h |
| Martes–Miércoles | Notebook guiado | 2 h |
| Jueves | Sesión en vivo con mentor (dudas + caso práctico en grupo) | 1,5 h |
| Domingo | Entrega del caso práctico y cuestionario | 1–2 h |

### Semanas 0–1 · Fundamentos de Python para datos
- **Contenido:** sintaxis básica, tipos, funciones, listas/diccionarios; NumPy; pandas (Series, DataFrame, selección, `groupby`, `merge`, fechas); visualización con matplotlib/seaborn.
- **Práctica:** análisis exploratorio de un conjunto de ventas de una cadena de tiendas.
- **Entrega:** notebook con 5 preguntas de negocio respondidas con código y gráficos.

### Semana 2 · Estadística para la toma de decisiones
- **Contenido:** variables aleatorias y distribuciones; ley de los grandes números y teorema central del límite; estimación e intervalos de confianza; bootstrap; correlación vs. causalidad; paradoja de Simpson.
- **Práctica:** estimar el ticket medio y su incertidumbre; simular el TCL.
- **Entrega:** informe de una página con un intervalo de confianza bien interpretado.

### Semana 3 · Datos no estructurados: clustering y reducción de dimensión
- **Contenido:** distancias y escalado; k-means, elección de *k* (codo, silueta); clustering jerárquico; PCA; t-SNE; interpretación de segmentos.
- **Práctica:** segmentación de clientes y visualización de imágenes de dígitos en 2D.
- **Entrega:** propuesta de segmentación con descripción de cada segmento y acción recomendada.

### Semana 4 · Regresión y predicción
- **Contenido:** regresión lineal (MCO), interpretación de coeficientes, supuestos y residuos; variables categóricas e interacciones; sobreajuste, validación cruzada; Ridge y Lasso.
- **Práctica:** predecir la progresión de una enfermedad a partir de variables clínicas.
- **Entrega:** modelo validado + explicación de las 3 variables más influyentes.

### Semana 5 · Clasificación y pruebas de hipótesis
- **Contenido:** regresión logística, árboles, random forest y gradient boosting; matriz de confusión, precisión, recall, AUC; umbral óptimo según costes; pruebas de hipótesis, p-valores, potencia, pruebas A/B y comparaciones múltiples.
- **Práctica:** diagnóstico de tumores y análisis de un test A/B de conversión.
- **Entrega:** recomendación de umbral con análisis coste-beneficio + conclusión del test A/B.

### Semana 6 · Deep learning
- **Contenido:** perceptrón y redes multicapa; funciones de activación; descenso de gradiente y retropropagación; PyTorch; redes convolucionales; regularización (dropout, early stopping); transferencia de aprendizaje.
- **Práctica:** clasificar dígitos manuscritos con un MLP y una CNN.
- **Entrega:** comparación MLP vs. CNN vs. modelo clásico, con curvas de aprendizaje.

### Semana 7 · Recuperación y entrega intermedia
- Semana sin contenido nuevo para ponerse al día.
- **Entrega:** propuesta del proyecto final (problema, datos, métrica de éxito).

### Semana 8 · Sistemas de recomendación
- **Contenido:** recomendación por popularidad; filtrado colaborativo usuario-usuario e ítem-ítem; factorización de matrices (SVD, ALS); problema de arranque en frío; métricas (RMSE, precisión@k).
- **Práctica:** recomendador de películas sobre una matriz de valoraciones.
- **Entrega:** comparar tres recomendadores y justificar cuál desplegar.

### Semana 9 · Redes y grafos
- **Contenido:** grafos, grados y caminos; centralidad (grado, intermediación, cercanía, autovector); PageRank; detección de comunidades; clustering espectral; predicción de enlaces.
- **Práctica:** análisis de una red social real (club de kárate de Zachary).
- **Entrega:** identificar a los actores clave de una red y justificar una estrategia de difusión.

### Semana 10 · Analítica predictiva con series temporales
- **Contenido:** tendencia, estacionalidad y ruido; estacionariedad; modelos ingenuos como referencia; suavizado exponencial (Holt-Winters); ARIMA/SARIMA; validación temporal (*backtesting*); métricas MAE/MAPE.
- **Práctica:** pronóstico de la concentración de CO₂ atmosférico.
- **Entrega:** pronóstico a 12 meses con intervalo y comparación frente a la referencia ingenua.

### Semana 11 · IA generativa y modelos de lenguaje
- **Contenido:** cómo funcionan los LLMs (tokens, transformers, preentrenamiento y ajuste); ingeniería de prompts; salidas estructuradas; RAG; evaluación de respuestas; riesgos (alucinaciones, privacidad, sesgo) y gobernanza.
- **Práctica:** asistente que responde preguntas sobre documentos internos con recuperación + API de Claude.
- **Entrega:** prototipo de caso de uso de IA generativa con evaluación de 10 preguntas de prueba.

### Semanas 12–14 · Proyecto final
- **Semana 12:** datos y análisis exploratorio. Revisión con mentor.
- **Semana 13:** modelado y validación. Revisión con mentor.
- **Semana 14:** informe ejecutivo + presentación de 10 minutos ante el grupo.
- Ver [proyecto-final/](proyecto-final/).

## Ponderación de la nota

| Componente | Peso |
|---|---|
| Cuestionarios semanales | 15 % |
| Casos prácticos semanales | 40 % |
| Participación en sesiones en vivo | 5 % |
| Proyecto final | 40 % |

Detalles y criterios en [docs/evaluacion-y-certificado.md](docs/evaluacion-y-certificado.md).
