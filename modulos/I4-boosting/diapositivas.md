---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# I4 · Variables, fugas y gradient boosting
## XGBoost · LightGBM · SHAP · Calibración · Umbral por coste

*AI Surfer · N2 Intermedio*

---

# Por qué este módulo

- En datos tabulares, el boosting es el estándar de la industria
- Las ofertas piden: *XGBoost/LightGBM, feature engineering, validación, interpretabilidad*
- Lo que de verdad distingue a un buen perfil: **una métrica que no miente**
- Al terminar: un modelo con informe para negocio en tu portafolio

---

# Caso TiendaSur

**¿Qué pedidos se devolverán?** Actuar antes (verificar talla, avisar, enviar con comprobación)

- ~24.000 pedidos, 1.800 clientes, 2 años (simulados)
- Varios pedidos por cliente + fechas
- ~12 % de devoluciones
- Cada devolución cuesta 18 €; cada acción, 1,2 €

---

# 4.1 · Variables para datos tabulares

- **Fechas:** mes, día de la semana, festivos (no la fecha en bruto)
- **Ratios:** ahorro en €, importe por artículo, importe vs. lo habitual del cliente
- **Agregados por cliente:** pedidos previos, días desde el anterior, tasa de devolución previa
- Pregunta de control: *¿tendré este valor, así, al predecir?*

---

# El detalle del historial

La etiqueta de un pedido **no se conoce hasta 30 días después**

- Tasa previa = solo pedidos con ≥ 30 días
- Suavizado: `(dev + prior·k) / (n + k)`
- `NaN` en «primer pedido» **es** información

---

# 4.2 · Categorías

| Técnica | Cuándo |
|---|---|
| One-hot | pocas, sin orden |
| Ordinal | con orden natural |
| Nativa (`category`) | boosting moderno |
| Target encoding | muchas (cliente, CP, SKU) |

---

# Target encoding: la trampa

- Media de la etiqueta por categoría
- Si entra la propia fila → **le das la respuesta**
- `TargetEncoder(cv=5)` en un **Pipeline**
- `fit_transform` ≠ `fit().transform()`

Correlación con la etiqueta: ~0,2 (con cruce) vs ~0,4 (sin cruce)

---

# 4.3 · Cuatro fugas

1. **De objetivo:** columna posterior al hecho
2. **Temporal:** variable que mira al futuro
3. **De preprocesado:** encoder/escalado con todos los datos
4. **Por grupo:** mismo cliente en train y validación

---

# Las fugas, en números (AUC)

| Escenario | AUC |
|---|---|
| Referencia honesta (temporal) | ~0,74 |
| KFold aleatorio | ~0,76 |
| Columna posterior | **1,00** |
| Tasa de cliente con el futuro | ~0,88 |
| Target encoding fuera del CV | ~0,87 |
| TE en pipeline: KFold → GroupKFold | 0,76 → 0,70 |

*Mismo modelo. Solo cambia qué entra y cómo se valida.*

---

# Cómo se evitan

- Momento de disponibilidad por variable
- Todo el preprocesado **dentro del Pipeline**
- Validación que imita el uso (temporal / por grupo)
- *Gap* = plazo de etiquetado
- AUC de cada variable sola: ≈ 1 ⇒ sospecha

---

# 4.4 · Validación honesta

```
entrenar → hueco → parada temprana → hueco → validación → hueco → prueba
```

- `TimeSeriesSplit(gap=…)`, `GroupKFold`
- Validación: se mira muchas veces
- Prueba: **una sola vez**

---

# 4.5 · Tres motores, una idea

- Árboles pequeños en serie, cada uno corrige al anterior
- **HistGradientBoosting** (sklearn) · **LightGBM** · **XGBoost**
- Diferencias pequeñas entre ellos; **las variables y la validación pesan más**
- Siempre contra un baseline lineal (I3)
- macOS: `brew install libomp`

---

# Hiperparámetros que importan

| | |
|---|---|
| `learning_rate` | 0,03-0,1 |
| nº árboles | **parada temprana** |
| `num_leaves` | 8-31 |
| `min_child_samples` | 20-200 |
| `reg_lambda` | 1-30 |
| `subsample`, `colsample` | 0,6-1 |

---

# 4.6 · ¿Ponderar la clase positiva?

- AUC/AP: no mejoran
- Probabilidades: **se inflan** (Brier peor)
- Si decides por coste: no ponderes, o calibra
- Alternativas: métrica AP + umbral bien elegido

---

# Búsqueda de hiperparámetros

- Rejilla: no. **Aleatoria**: sí. **Optuna (TPE)**: mejor con más presupuesto
- Sobre CV temporal del pasado
- Presupuesto fijo (8-50 pruebas)
- Retornos decrecientes: **más datos > más pruebas**

---

# 4.7 · Permutación y SHAP

- **Permutación:** baraja una columna, mira cuánto cae la métrica
- **SHAP:** reparte la predicción de cada pedido entre variables
- Global (barras, abejas) · dependencia · local (cascada)
- Contrasta dos métodos

---

# Lo que SHAP no dice

- **Correlación ≠ causalidad:** explica el modelo, no el mundo
- Variables correlacionadas se reparten el mérito
- Log-odds, no probabilidad
- No arregla fugas (las delata)
- Causalidad ⇒ experimento A/B

---

# 4.8 · Calibración

- Ordenar bien ≠ probabilidades fiables
- Curva de fiabilidad, Brier, ECE
- `CalibratedClassifierCV(FrozenEstimator(m))`: sigmoide / isotónica
- Con datos **no** usados para entrenar
- Cambia los valores, no el orden

---

# Umbral por coste

`p · eficacia · coste_dev > coste_acción`

`umbral = 1,2 / (0,4 · 18) = 0,167`

- No es 0,5
- Elegir en validación, confirmar en prueba
- Sensibilidad ±50 % y capacidad del equipo

---

# Informe para negocio

1. Qué predice y cuánto acierta
2. Qué empuja el riesgo (en lenguaje de negocio)
3. Un caso concreto
4. Qué hacer y cuánto vale
5. Límites: causalidad, deriva, supuestos

---

# Caso práctico

Pieza de portafolio: modelo tabular + informe de interpretabilidad

- Variables documentadas · fugas demostradas
- 2 motores + baseline · búsqueda con presupuesto
- SHAP + calibración + umbral por coste

---

<!-- _class: lead -->
# Resumen

**Variables sin trampas → validación honesta → boosting → explicar → decidir por coste**
