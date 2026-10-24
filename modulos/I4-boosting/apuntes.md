# Módulo I4 · Ingeniería de variables, pipelines y gradient boosting — Apuntes

> Objetivo: que tu métrica diga la verdad, y que puedas explicar el modelo a quien decide con él.

**Caso TiendaSur:** predecir, al registrar un pedido, si se devolverá. Datos simulados: ~24.000 pedidos de 1.800 clientes (2024-2025), con fecha, importe, categoría, canal, descuento, plazo de entrega y el historial de cada cliente. Las cifras que se citan son las del notebook (semillas fijadas): son ilustrativas, lo importante es el orden de magnitud.

## Índice
- 4.1 Ingeniería de variables
- 4.2 Codificar categorías y *target encoding*
- 4.3 Fugas de datos
- 4.4 Validación honesta
- 4.5 Gradient boosting en la práctica
- 4.6 Desequilibrio e hiperparámetros
- 4.7 Interpretabilidad: permutación y SHAP
- 4.8 Calibración y umbral por coste
- Glosario

---

## 4.1 · Ingeniería de variables para datos tabulares

En datos tabulares, **las variables suelen importar más que el algoritmo**. Un árbol no sabe qué es «julio» ni «el cliente suele comprar 40 € y hoy compra 400 €»: se lo tienes que dar tú.

### Fechas
No uses la fecha en bruto. Extrae lo que tiene significado: mes, día de la semana, fin de semana, festivos, días hasta Navidad, antigüedad del cliente. En TiendaSur, enero-febrero y diciembre tienen más devoluciones: `mes` lo captura. Cuidado con la **fecha en bruto como número**: el modelo la usaría para ubicarse en el tiempo y no generalizará a fechas futuras.

### Ratios y diferencias
`ahorro_eur = importe × descuento / 100`, `importe_por_articulo`, `importe / importe_medio_del_cliente`. Un árbol necesita muchos cortes para aproximar un cociente; entregárselo hecho es gratis y suele ayudar. Los modelos lineales lo necesitan aún más.

### Agregados por cliente (con historial)
Cuando hay varias filas por entidad, el pasado de la entidad es la variable más potente: nº de pedidos previos, días desde el anterior, pedidos en los últimos 90 días, tasa de devolución previa. Pero hay una **regla de oro**: cada variable debe calcularse **con lo que se sabía en el momento de predecir**.

Dos errores típicos:
1. `groupby("cliente").devuelto.mean()` sobre todo el dataset: incluye al propio pedido y al futuro (fuga).
2. Usar la etiqueta de pedidos recientes: un pedido de hace 10 días aún puede devolverse. En el notebook, la tasa previa solo cuenta pedidos con ≥ 30 días (`VENTANA_DEV`), y se **suaviza** con una tasa de partida para clientes con poca historia: `(devoluciones + prior × k) / (pedidos + k)`.

### Pregunta de control para cada variable
> «¿Tendré este valor, exactamente así, en el momento de usar el modelo en producción?»

Documenta el *momento de disponibilidad* de cada variable. Es el mejor antídoto contra las fugas.

### Valores ausentes
LightGBM, XGBoost e HistGradientBoosting aceptan `NaN` y aprenden qué hacer con ellos. «No tiene pedido previo» es información (primer pedido), no un fallo a imputar.

---

## 4.2 · Codificar categorías

| Técnica | Cómo | Cuándo | Riesgo |
|---|---|---|---|
| **One-hot** | una columna 0/1 por categoría | pocas categorías sin orden | explosión de columnas |
| **Ordinal** | enteros con orden (bajo=0, medio=1, alto=2) | orden natural | inventar un orden que no existe |
| **Nativa** | dtype `category` | boosting moderno (LightGBM, XGBoost con `enable_categorical`, HistGB con `categorical_features="from_dtype"`) | categorías muy raras |
| ***Target encoding*** | sustituir la categoría por la media de la etiqueta | muchas categorías (cliente, código postal, SKU) | **fuga** |

### *Target encoding* y por qué fuga
Un cliente con 3 pedidos, 2 devueltos, se codifica como 0,67. Si en el mismo cálculo entra el pedido que estás codificando, **la etiqueta de esa fila está dentro de su propia variable**: el modelo aprende «mira la variable y acertarás», y en producción esa pista no existe. Cuanto menos frecuente la categoría, peor.

Solución en scikit-learn: `TargetEncoder(cv=5)`. En `fit_transform` codifica cada fila con estadísticos de los otros pliegues (validación cruzada interna, *cross-fitting*); en `transform` (predicción) usa el ajuste completo. Por eso:
- **Siempre dentro de un `Pipeline`**, de modo que se reajuste en cada pliegue de la validación cruzada.
- Nunca calcules la media por tu cuenta con `groupby` sobre todo el dataset.

En el notebook, la correlación del encoding con la etiqueta sube de ~0,2 (con cruce) a ~0,4 (sin cruce): esa diferencia es información robada.

---

## 4.3 · Fugas de datos (*data leakage*)

Hay fuga cuando el modelo usa información que **no tendrá al predecir en la vida real**. Efecto: métrica espectacular en validación, decepción en producción. Es la causa número uno de «el modelo funcionaba en el notebook».

### Cuatro tipos (y los números del notebook)
| Fuga | Qué pasa | AUC en el notebook |
|---|---|---|
| *(referencia honesta: variables legítimas, validación temporal)* | — | ~0,74 |
| **De objetivo** | una columna que solo existe tras el evento (`motivo_devolucion`) | **1,00** |
| **Temporal** | una variable que mira al futuro (tasa del cliente con todos sus pedidos) | ~0,88 |
| **De preprocesado** | *target encoding* o escalado ajustado con todos los datos antes de validar | ~0,87 |
| **Por grupo** | la misma entidad (cliente) en entrenamiento y validación | 0,76 con `KFold` frente a 0,70 con `GroupKFold` |

Señales de alarma: AUC casi perfecto; una variable con importancia desproporcionada; el modelo rinde mucho menos al probarlo «de verdad» más adelante; una variable cuyo nombre sugiere «después» (reembolso, estado final, días hasta devolución).

### Cómo se evitan
1. Pregunta de disponibilidad por variable (4.1).
2. **Todo el preprocesado dentro del `Pipeline`** (escalado, imputación, codificación, selección de variables).
3. Validación que imite el uso: **temporal** si se predice el futuro; **por grupo** si habrá clientes nuevos; ambas si procede.
4. **Hueco (*gap*)** entre entrenamiento y validación del tamaño del plazo de etiquetado (30 días aquí).
5. Auditoría rápida: AUC de cada variable *sola*. Una variable con AUC ≈ 1 casi nunca es legítima.
6. Revisar la importancia: si manda una variable rara, desconfía antes de celebrar.

---

## 4.4 · Validación honesta

### Cuatro conjuntos, cuatro papeles
```
entrenar → [hueco] → parada temprana → [hueco] → validación → [hueco] → prueba
```
- **Entrenamiento:** ajusta los árboles.
- **Parada temprana:** vigila cuándo parar de añadir árboles.
- **Validación:** elegir modelo, hiperparámetros, calibración y umbral. Se mira muchas veces.
- **Prueba:** se mira **una vez**, al final. Es la estimación honesta de lo que verás en producción.

### `TimeSeriesSplit`
Cada pliegue entrena con el pasado y valida con el futuro inmediato. Parámetro clave: `gap`, filas que se omiten entre ambos. Los datos deben estar ordenados por fecha. Los primeros pliegues entrenan con poco: es lo esperable.

### `GroupKFold`
Garantiza que todas las filas de un grupo (cliente) caen en el mismo lado. Úsalo cuando el modelo vaya a ver clientes nuevos, o cuando haya variables de identidad (directa o a través de *target encoding*). Si el modelo siempre va a predecir para clientes ya conocidos, pregúntate qué parte del problema es realmente «nuevo» (el tiempo, casi siempre) y valida temporalmente.

### Aleatorio frente a honesto
`KFold(shuffle=True)` mezcla futuro y pasado y reparte los clientes entre ambos lados: da un número más alto que cualquier uso real. En el notebook: ~0,76 (aleatorio) frente a ~0,74 (temporal) con las mismas variables y el mismo modelo.

### Métricas
Con un 12-15 % de devoluciones:
- **AUC:** orden global; no depende de la tasa base.
- **Average precision (AP):** área bajo la curva precisión-recall; compara con la tasa base (un modelo inútil obtiene AP = tasa base).
- **Brier / log-loss:** calidad de las **probabilidades** (importan para decidir por coste).
- Y siempre contra un **baseline** (tasa base y regresión logística de I3).

---

## 4.5 · Gradient boosting en la práctica

### Idea (recordatorio de I3)
Árboles pequeños en serie; cada uno corrige el error residual de los anteriores, ponderado por una **tasa de aprendizaje**. Predicción = suma de árboles. Es lo que más se usa en tabla porque captura **no linealidades e interacciones** sin que las especifiques y tolera escalas distintas, `NaN` y categorías.

### Los tres motores
| | HistGradientBoosting (sklearn) | LightGBM | XGBoost |
|---|---|---|---|
| Crecimiento | por hojas | por hojas (*leaf-wise*) | niveles o hojas |
| Categorías | `categorical_features` | nativas | `enable_categorical=True` |
| Velocidad | media | muy alta | alta (GPU) |
| Instalación | incluido | `pip install lightgbm` | `pip install xgboost` |
| Nota | sin dependencias | en macOS necesita `libomp` | en macOS necesita `libomp` |

En el notebook los tres quedan muy cerca (AUC ~0,77 en validación y AP ~0,37-0,38), y por encima de la regresión logística en AP (~0,35). **La elección del motor importa mucho menos que las variables y la validación.** Mejoran más cuando hay interacciones (descuento alto *en web*, máquinas con entrega lenta) que un modelo lineal no ve.

### Hiperparámetros que importan
| Parámetro | Efecto | Valor de partida |
|---|---|---|
| `learning_rate` | paso de cada árbol; menor = más árboles, más estable | 0,03-0,1 |
| nº de árboles | **lo decide la parada temprana** | grande (1000) + `early_stopping` |
| `num_leaves` / `max_depth` | complejidad de cada árbol | 8-31 hojas / profundidad 3-6 |
| `min_child_samples` | filas mínimas por hoja (frena el sobreajuste) | 20-200 |
| `reg_lambda` | regularización L2 | 1-30 |
| `subsample`, `colsample_bytree` | submuestreo de filas y columnas | 0,6-1,0 |

### Parada temprana (*early stopping*)
Se entrena con muchos árboles y se vigila un conjunto aparte; se para cuando no mejora en `n` rondas (50). El número de árboles deja de ser un hiperparámetro que adivinar. Detalles:
- El conjunto de parada **no** debe ser el de prueba; aquí es un tramo temporal posterior al entrenamiento.
- Si afinas con validación cruzada, fija `n_estimators` en cada prueba o aplica parada temprana dentro de cada pliegue.

### Reproducibilidad
Fija `random_state`, anota versiones (`xgboost`, `lightgbm`, `scikit-learn`) y guarda el modelo y la lista de variables (módulo I8).

---

## 4.6 · Desequilibrio de clases e hiperparámetros

### ¿Ponderar la clase positiva?
`scale_pos_weight` (XGBoost/LightGBM) o `class_weight` (scikit-learn) multiplican el peso de los positivos. En el notebook (12 % de positivos):
- AUC y AP **no mejoran** (empeoran algo).
- Las probabilidades se **inflan**: la media predicha se aleja de la tasa real y sube el Brier.

Regla: el desequilibrio por sí solo **no** obliga a ponderar. Si tu decisión depende de una probabilidad o de un coste, no ponderes o calibra después. Con positivos de 0,1 % puede merecer la pena; mídelo. Alternativas: elegir bien el umbral (4.8) y la métrica (AP).

### Búsqueda de hiperparámetros con cabeza
- **Rejilla:** mala idea (explora pocos valores de cada cosa).
- **Aleatoria:** punto de partida muy fuerte y fácil de explicar.
- **Optuna (TPE):** modelo bayesiano ligero que propone las siguientes pruebas según las anteriores; mejor con presupuestos medios.
- Siempre sobre **validación cruzada temporal del pasado**, sin tocar validación ni prueba.
- Fija un **presupuesto** (8-50 pruebas) y para. Los retornos decrecen; en el notebook, de 0,34 a 0,36 de AP en CV, y casi nada en validación. Más datos y mejores variables pesan más que 200 pruebas.
- Espacios en **escala logarítmica** para `learning_rate` y `reg_lambda`.

---

## 4.7 · Interpretabilidad

### Importancia por permutación
Baraja los valores de **una** columna en datos no vistos y mide cuánto empeora la métrica. Si cae mucho, el modelo dependía de ella. Ventajas: sirve para cualquier modelo, mide lo que importa (la métrica) y se calcula sobre validación (no sobre lo memorizado). Limitación: con variables correlacionadas, barajar una deja que la otra «supla»: reparte mal el mérito.

### SHAP
Valores de Shapley (teoría de juegos): reparte la predicción de **cada fila** entre las variables, de modo que `predicción = valor base + suma de contribuciones` (en escala log-odds). `TreeExplainer` lo calcula de forma exacta y rápida para árboles.

- **Global:** media del valor absoluto → ranking (gráfico de barras). Gráfico de abejas (*beeswarm*): dirección (color = valor de la variable, posición = efecto).
- **Dependencia:** efecto de una variable según su valor; la dispersión vertical sugiere interacciones.
- **Local (*waterfall*):** por qué este pedido concreto tiene riesgo alto. Útil para atención al cliente y auditoría.

### Qué NO dice SHAP
1. **Correlación no es causalidad.** Explica el modelo, no el mundo. «El descuento sube el riesgo» = el modelo lo usa para predecir. Para saber si quitar descuentos reduce devoluciones hay que **experimentar** (A/B).
2. **Variables correlacionadas** se reparten el mérito de forma inestable (en el notebook, `ahorro_eur` y `descuento_pct` comparten).
3. **Valores en log-odds**, no en puntos de probabilidad.
4. **No arregla un modelo con fugas:** SHAP te dirá que `motivo_devolucion` es importantísima. Úsalo también como detector.
5. **Varía con el modelo y la muestra:** comprueba que dos métodos (SHAP y permutación) coinciden en lo esencial.

### Cómo contarlo a negocio
Orden: qué predice y cuánto acierta → qué variables pesan y en qué sentido (en lenguaje de negocio) → un ejemplo concreto → qué hacer → límites. Sin jerga: «riesgo base 12 %; los descuentos ≥ 30 % en web añaden riesgo».

---

## 4.8 · Calibración y umbral por coste de negocio

### Calibración
Un modelo está **calibrado** si, entre los pedidos con probabilidad 0,3, se devuelve ~30 %. Un AUC alto no lo garantiza (ordenar ≠ probabilidades). Se mira con la **curva de fiabilidad** y el **ECE** (error de calibración esperado) o el Brier.

Para corregirlo: `CalibratedClassifierCV(FrozenEstimator(modelo), method="sigmoid" | "isotonic")` ajustado con datos **no usados para entrenar** (aquí, validación). Sigmoide (Platt) con pocos datos; isotónica con muchos (> 1.000 positivos aprox.). La calibración cambia los valores, no el orden: el AUC casi no se mueve.

Cuándo importa: cuando usas la probabilidad en una fórmula (valor esperado, umbral por coste, priorización de recursos) o la enseñas al usuario. Si solo ordenas, da igual.

### Umbral por coste (enlace con I3, lección 4.6)
Sea D el coste de una devolución, c el de la acción preventiva y e su eficacia. Actuar sobre un pedido con probabilidad p compensa si:

`p · e · D > c` → `umbral = c / (e · D)`

Con D = 18 €, c = 1,2 €, e = 40 %: umbral = 0,167, muy por debajo del 0,5 «de costumbre». Con una acción cara y poco eficaz (c = 5, e = 25 %, D = 30) sube a 0,67 y casi no compensa actuar.

Buenas prácticas:
- Elegir el umbral en **validación** (o con la fórmula), confirmarlo en **prueba**.
- Hacer **análisis de sensibilidad**: ¿qué pasa si D cambia ±50 %? La curva beneficio-umbral suele ser plana cerca del óptimo.
- Incluir **capacidad**: si el equipo solo puede revisar 100 pedidos al día, el umbral lo fija el cupo (top-k).
- Comparar con las políticas ingenuas: no hacer nada, marcar todo, umbral 0,5.

---

## Glosario
- **AP (average precision):** resumen de la curva precisión-recall.
- **Brier:** error cuadrático medio de las probabilidades.
- **Calibración:** concordancia entre probabilidad predicha y frecuencia real.
- **ECE:** error de calibración esperado.
- **Early stopping (parada temprana):** detener el entrenamiento cuando el conjunto de vigilancia deja de mejorar.
- **Fuga (*data leakage*):** uso de información no disponible al predecir.
- **GroupKFold:** validación cruzada que no separa las filas de un mismo grupo.
- **Gap:** hueco entre entrenamiento y validación en series temporales.
- **Importancia por permutación:** caída de la métrica al barajar una variable.
- **SHAP:** valores de Shapley que reparten una predicción entre las variables.
- **Target encoding:** codificar una categoría con la media de la etiqueta (con validación cruzada interna).
- **TimeSeriesSplit:** validación cruzada hacia delante en el tiempo.
