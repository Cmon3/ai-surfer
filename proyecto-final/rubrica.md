# Rúbrica del proyecto N2

Puntuación total: **100 puntos**. Aprobado: ≥ 60 puntos y ningún criterio en «Insuficiente». Los criterios 5 y 6 reutilizan los del caso práctico del módulo [I8](../modulos/I8-produccion/README.md) (funciona de verdad, calidad de los tests, README y ficha, limpieza del código).

| Criterio | Peso | Excelente (100 %) | Bueno (75 %) | Suficiente (50 %) | Insuficiente (0–25 %) |
|---|---|---|---|---|---|
| **1. Planteamiento y métricas** | 10 | Pregunta precisa ligada a una decisión concreta; métrica de negocio y técnica coherentes; define cómo se consumirá la predicción | Pregunta clara y métrica adecuada; la conexión con la decisión es algo débil | Pregunta genérica o métrica poco justificada | No hay una pregunta de negocio identificable |
| **2. Datos y análisis exploratorio** | 10 | Limpieza documentada, problemas de calidad tratados con criterio, esquema validado en código, gráficos que revelan aspectos clave | Limpieza correcta y EDA útil con algunas lagunas | EDA superficial o problemas de calidad sin tratar | Datos sin revisar o inadecuados para la pregunta |
| **3. Método y validación** | 15 | Línea base sólida, al menos dos enfoques justificados, validación adecuada al tipo de datos y **preprocesado dentro del `Pipeline`, sin fugas** | Métodos apropiados y validación correcta; justificación mejorable | Un solo método o validación con debilidades | Validación incorrecta (evaluar en entrenamiento, fuga temporal o de preprocesado) |
| **4. Interpretación y análisis de errores** | 10 | Explica qué impulsa los resultados, analiza dónde y por qué falla, discute la incertidumbre | Interpretación correcta con análisis de errores parcial | Se limita a reportar métricas | Interpretaciones erróneas |
| **5. Servicio desplegado: funciona de verdad** | 20 | **CI en verde** (insignia), la imagen Docker construye y arranca, la API cumple su contrato (`/health`, `/predict`, `422` con datos inválidos, versión del modelo en la respuesta) y el modelo se carga una sola vez | CI en verde e imagen funcional; pequeños fallos del contrato (mensajes de error pobres, sin versión) | Funciona en local pero el CI o la imagen tienen fallos que se subsanan en la revisión | **El servicio no arranca o el CI está en rojo en la entrega** |
| **6. Calidad de los tests y del código** | 10 | ≥ 6 tests de datos, modelo (umbral de calidad justificado y test de comportamiento) y API que no dependen de artefactos; `ruff` sin errores; nombres claros, sin secretos | ≥ 6 tests útiles; algún test frágil o umbral sin justificar | Pocos tests o solo de «humo»; lint con avisos | Sin tests, o tests que no prueban nada (o umbral bajado para que pase) |
| **7. Recomendación e impacto** | 10 | Recomendación accionable; impacto cuantificado con supuestos explícitos y un rango; plan de implantación y de medición (prueba A/B o grupo de control) | Recomendación clara con impacto aproximado | Recomendación vaga | Sin recomendación o no se deriva del análisis |
| **8. Comunicación** | 5 | Informe y presentación claros para una audiencia no técnica; la demo en directo funciona y se explica; dentro del tiempo | Claros con pequeños excesos técnicos | Comprensible pero desordenado o demasiado técnico | Difícil de seguir; sin demo |
| **9. Ficha, monitorización, ética y reproducibilidad** | 10 | `ficha.json` completa (métricas, datos, versiones, uso previsto, limitaciones); informe de deriva con PSI y plan de reentrenamiento; riesgos, sesgos y RGPD analizados; README con ejecución en 3 comandos; declaración de uso de IA | Ficha y plan de monitorización correctos con pequeñas lagunas; ética mencionada con cierto detalle | Ficha incompleta o monitorización solo mencionada; ética superficial | Sin ficha, sin plan de monitorización, o secretos/datos personales en el repositorio |

## Preguntas guía para el evaluador
- ¿Tomaría una decisión distinta un directivo después de leer este informe?
- ¿Bate el modelo a la línea base de forma convincente y con una validación honesta?
- ¿Puedo clonar el repositorio, ejecutar tres comandos y obtener una predicción?
- ¿Qué pasa si mando datos inválidos? ¿Y si un compañero baja el umbral de un test para que el CI pase?
- ¿Sabe el estudiante cuándo **no** fiarse de su modelo, y cómo se enteraría de que se ha degradado?
- ¿Sabe explicar cada línea del código que entrega, incluida la que escribió un asistente?
