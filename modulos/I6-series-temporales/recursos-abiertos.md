# Módulo I6 · Recursos abiertos

> Verificado el 13/10/2026. Todos los enlaces se han comprobado (página abierta o URL exacta en resultados de búsqueda). Las duraciones son estimaciones de lectura o práctica. Si una licencia no aparece declarada en la fuente, se indica "sin licencia abierta declarada" y el uso permitido es solo **enlazar**.
>
> ⚠️ Las licencias **NC** (no comercial) no permiten reutilizar el material en un curso de pago sin permiso del autor; sí se puede enlazar.

## Recomendación por lección

| Lección | Recurso | Tipo | Idioma | Duración aprox. | Licencia | Uso permitido |
|---|---|---|---|---|---|---|
| 8.1–8.7 (base de todo el módulo) | [Forecasting: Principles and Practice, 3.ª ed. (Hyndman y Athanasopoulos)](https://otexts.com/fpp3/) | Libro online gratuito (código en R) | Inglés | 1–2 h por capítulo | Lectura gratuita; sin licencia abierta declarada verificable | Enlazar/insertar |
| 8.1–8.8 (versión Python) | [Forecasting: Principles and Practice, the Pythonic Way](https://otexts.com/fpppy/) · [anuncio oficial (IIF)](https://forecasters.org/blog/2025/04/25/forecasting-principles-and-practice-the-pythonic-way) | Libro online gratuito (código en Python, librerías Nixtla) | Inglés | 1–2 h por capítulo | Lectura gratuita; sin licencia abierta declarada verificable | Enlazar/insertar |
| 8.1–8.7 (apoyo docente) | [Diapositivas de FPP3 (Rob Hyndman, GitHub)](https://github.com/robjhyndman/fpp3_slides) | Diapositivas PDF/Rmd por capítulo | Inglés | 15–30 min por tema | Sin licencia declarada | Enlazar/insertar |
| 8.3, 8.5, 8.6 | [STAT 510 · Applied Time Series Analysis (Penn State)](https://online.stat.psu.edu/stat510/) | Curso abierto (apuntes) | Inglés | 10–15 h en total | CC BY-NC 4.0 ⚠️ | Reutilizar citando, ⚠️ solo uso NO comercial |
| 8.2 | [Notebook "STL decomposition" (statsmodels)](https://github.com/statsmodels/statsmodels/blob/main/examples/notebooks/stl_decomposition.ipynb) | Notebook oficial de ejemplo | Inglés | 20–30 min | BSD-3-Clause (repositorio) | Reutilizar y adaptar citando (comercial OK) |
| 8.5 | [Notebook "Exponential smoothing" (statsmodels)](https://github.com/statsmodels/statsmodels/blob/main/examples/notebooks/exponential_smoothing.ipynb) | Notebook oficial de ejemplo | Inglés | 30–45 min | BSD-3-Clause (repositorio) | Reutilizar y adaptar citando (comercial OK) |
| 8.6, 8.8 | [Notebook "SARIMAX" (statsmodels)](https://github.com/statsmodels/statsmodels/blob/main/examples/notebooks/statespace_sarimax_stata.ipynb) | Notebook oficial de ejemplo | Inglés | 30–45 min | BSD-3-Clause (repositorio) | Reutilizar y adaptar citando (comercial OK) |
| 8.2–8.6 (referencia) | [Documentación de statsmodels](https://www.statsmodels.org/stable/) | Documentación oficial | Inglés | Consulta | BSD-3-Clause (repositorio) | Reutilizar y adaptar citando (comercial OK) |
| 8.7, 8.8 | [Forecasting con Python (cienciadedatos.net)](https://cienciadedatos.net/forecasting-python) | Curso/serie de tutoriales gratuitos | **Español** | 5–10 h en total | Sin licencia verificada en el sitio | Enlazar/insertar |
| 8.8 | [skforecast (Amat Rodrigo y Escobar Ortiz)](https://github.com/skforecast/skforecast) | Librería + documentación con ejemplos en español, inglés y chino | Español / Inglés | 1–3 h | Código BSD-3-Clause; documentación CC BY-NC-SA 4.0 ⚠️ | Código: reutilizar y adaptar citando (comercial OK). Documentación: reutilizar citando, ⚠️ solo uso NO comercial |
| 8.6, 8.8 | [StatsForecast (Nixtla): documentación](https://nixtlaverse.nixtla.io/statsforecast) · [repositorio](https://github.com/Nixtla/statsforecast) | Librería + guías | Inglés | 1–2 h | Apache-2.0 (repositorio) | Reutilizar y adaptar citando (comercial OK) |
| 8.7 | [StatsForecast: tutorial de validación cruzada](https://nixtlaverse.nixtla.io/statsforecast/docs/tutorials/crossvalidation.html) | Tutorial oficial | Inglés | 30–45 min | Apache-2.0 (repositorio) | Reutilizar y adaptar citando (comercial OK) |
| 8.8 | [MLForecast (Nixtla)](https://github.com/Nixtla/mlforecast) | Librería de ML para series | Inglés | 1–2 h | Apache-2.0 | Reutilizar y adaptar citando (comercial OK) |
| 8.1–8.6 (puente R → Python) | [fpp3 Python read-along (zgana)](https://github.com/zgana/fpp3-python-readalong) | Notebooks que siguen los caps. 2–10 de FPP3 | Inglés | 1 h por capítulo | Sin licencia declarada | Enlazar/insertar |

## Detalle de los recursos

**Forecasting: Principles and Practice, 3.ª ed. (otexts.com/fpp3).** El manual de referencia del módulo, escrito por Rob J. Hyndman y George Athanasopoulos y gratuito en la web. Muy práctico y orientado a negocio. Capítulos recomendados: 1 (introducción al pronóstico) para 8.1; 3 (descomposición, incluida STL) para 8.2; 5 (métodos de referencia, métricas de error y validación cruzada temporal) para 8.4 y 8.7; 8 (suavizado exponencial y ETS) para 8.5; 9 (ARIMA, estacionariedad, ACF/PACF) para 8.3 y 8.6; 10 (regresión dinámica) para 8.8. El código está en R; si solo usas Python, combínalo con la edición *Pythonic Way* o con el *read-along*. No hemos podido verificar una licencia abierta: enlázalo, no lo copies.

**Forecasting: Principles and Practice, the Pythonic Way (otexts.com/fpppy).** Versión en Python del mismo libro, con Hyndman y Athanasopoulos más Azul Garza, Cristian Challu, Max Mergenthaler y Kin Olivares (equipo de Nixtla). Usa statsforecast y el resto de librerías de Nixtla, e incorpora capítulos nuevos sobre redes neuronales y modelos fundacionales, muy útiles para la lección 8.8. Es la mejor opción para quien quiera seguir el libro en el mismo lenguaje que el curso.

**Diapositivas de FPP3 (GitHub de Rob Hyndman).** Diapositivas organizadas por capítulo y sección del libro (benchmarks, SES, ARIMA...). Útiles para el profesorado como guion de repaso y para el alumnado como resumen visual. Sin licencia declarada: solo enlazar.

**STAT 510 · Applied Time Series Analysis (Penn State).** Apuntes completos de un curso universitario de series temporales: identificación de modelos ARIMA con ACF/PACF, diferenciación, pronóstico con intervalos, suavizado y descomposición. Más formal que FPP3, ideal para quien quiera profundizar en la lección 8.6. Licencia CC BY-NC 4.0 ⚠️: se puede enlazar libremente, pero no reutilizar en un curso de pago sin permiso.

**Notebooks oficiales de statsmodels (STL, suavizado exponencial, SARIMAX).** Son la documentación práctica de las mismas clases que usa nuestro notebook (`STL`, `ExponentialSmoothing`, `SARIMAX`). El de suavizado exponencial recorre suavizado simple, Holt, Holt-Winters, sus parámetros internos y simulaciones para intervalos; el de SARIMAX muestra modelos estacionales y con variables exógenas. Al estar en el repositorio con licencia BSD-3-Clause, el código se puede adaptar citando la fuente.

**Documentación de statsmodels.** Referencia de todas las funciones del módulo `statsmodels.tsa` (ADF, ACF/PACF, SARIMAX, ETS). Consúltala cuando necesites el significado exacto de un parámetro o de una salida.

**Forecasting con Python (cienciadedatos.net).** El mejor recurso en español que hemos encontrado: una serie de tutoriales gratuitos de Joaquín Amat Rodrigo y Javier Escobar Ortiz (autores de skforecast), enlazada desde el repositorio oficial de skforecast. Cubre *backtesting*, variables exógenas, modelos de *machine learning* para series y múltiples series. Recomendado para las lecciones 8.7 y 8.8. No hemos podido verificar la licencia del sitio: solo enlazar.

**skforecast.** Librería de Python para pronóstico con modelos de scikit-learn, LightGBM, XGBoost, etc., con utilidades de *backtesting* sin fugas. Su documentación incluye ejemplos en español. Ojo con la doble licencia: el código es BSD-3-Clause (uso comercial permitido), pero la documentación es CC BY-NC-SA 4.0 ⚠️.

**StatsForecast (Nixtla).** Implementaciones muy rápidas de AutoARIMA, AutoETS, Theta y otros modelos clásicos para miles de series a la vez. La guía rápida y el tutorial de validación cruzada son la continuación natural del notebook del módulo cuando se pasa de una serie a muchas (lecciones 8.7 y 8.8). Licencia Apache-2.0.

**MLForecast (Nixtla).** Librería para pronóstico con modelos de *machine learning* globales: construye retardos y ventanas móviles y entrena un único modelo para muchas series. Ilustra en código lo que se explica en la lección 8.8. Licencia Apache-2.0.

**fpp3 Python read-along (zgana).** Notebooks en Python que siguen los capítulos 2 a 10 de FPP3. El propio autor recomienda ahora la edición *Pythonic Way* para un estudio serio, así que úsalo solo como complemento puntual. Sin licencia declarada: solo enlazar.

**Nota sobre vídeos.** No hemos podido verificar en esta revisión vídeos de YouTube en español de calidad suficiente con su URL exacta, por lo que no se incluyen. Se recomienda una revisión adicional antes de publicar el módulo si se quieren añadir vídeos externos.
