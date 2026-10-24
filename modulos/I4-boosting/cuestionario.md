# Módulo I4 · Ingeniería de variables, pipelines y gradient boosting — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Calculas `df.groupby("cliente_id").devuelto.transform("mean")` sobre todo el dataset y lo usas como variable. En validación el AUC pasa de 0,74 a 0,88. ¿Qué ha ocurrido?
- a) El modelo ha descubierto una variable muy potente y conviene desplegarla.
- b) Hay fuga: la variable incluye la etiqueta del propio pedido y la de pedidos futuros, que en producción no existirán.
- c) Es un caso de sobreajuste que se arregla con más árboles.
- d) El AUC no es una buena métrica para este problema.

**2.** ¿Por qué el *target encoding* debe ir dentro de un `Pipeline` y con `TargetEncoder(cv=5)`?
- a) Para que sea más rápido.
- b) Porque scikit-learn no permite otra cosa.
- c) Para que cada fila se codifique sin ver su propia etiqueta y el encoder se reajuste en cada pliegue de la validación cruzada.
- d) Para evitar que el modelo reciba valores ausentes.

**3.** Cada cliente tiene unos 13 pedidos y el modelo usa una codificación del cliente. Con `KFold(shuffle=True)` obtienes AUC 0,76 y con `GroupKFold` 0,70. ¿Qué número te creerías para clientes nuevos?
- a) 0,76, porque el aleatorio usa más datos.
- b) La media de ambos.
- c) 0,70, porque ningún cliente aparece a la vez en entrenamiento y validación.
- d) Ninguno: el AUC no sirve para clientes.

**4.** La etiqueta «devuelto» se conoce 30 días después del pedido. Al construir la «tasa de devolución previa» de un pedido, ¿qué pedidos anteriores del cliente puedes usar?
- a) Todos los anteriores, incluidos los de ayer.
- b) Solo los que tengan al menos 30 días de antigüedad, cuya etiqueta ya se conocía en ese momento.
- c) Solo los del mismo mes.
- d) Todos, si luego aplicas un `StandardScaler`.

**5.** Para validar un modelo que predice el futuro de pedidos con fechas, lo más adecuado es:
- a) `KFold` aleatorio con 10 pliegues.
- b) `TimeSeriesSplit` con un `gap` del tamaño del plazo de etiquetado.
- c) Un único `train_test_split` aleatorio 80/20.
- d) Validar con los mismos datos con los que se entrena.

**6.** ¿Qué papel tiene el conjunto de parada temprana (*early stopping*)?
- a) Medir el rendimiento final del modelo.
- b) Decidir cuántos árboles añadir: se detiene cuando el error en ese conjunto deja de mejorar.
- c) Sustituir al conjunto de entrenamiento.
- d) Calibrar las probabilidades.

**7.** Con un 12 % de devoluciones, activas `scale_pos_weight` ≈ 7. Resultado típico:
- a) AUC y AP mejoran mucho y las probabilidades quedan mejor.
- b) El orden apenas mejora (o empeora) y las probabilidades se inflan, empeorando Brier y calibración.
- c) El modelo deja de necesitar parada temprana.
- d) Se eliminan las fugas de datos.

**8.** SHAP muestra que a mayor `descuento_pct`, mayor riesgo de devolución. ¿Qué conclusión es correcta?
- a) Quitar los descuentos reducirá las devoluciones.
- b) El modelo utiliza el descuento como señal de riesgo; saber si quitarlo reduce devoluciones exige un experimento.
- c) El descuento causa devoluciones en todos los clientes.
- d) La variable es una fuga y hay que eliminarla.

**9.** Una acción preventiva cuesta 1,2 €, evita el 40 % de las devoluciones y cada devolución cuesta 18 €. Con probabilidades calibradas, ¿a partir de qué probabilidad compensa actuar?
- a) 0,50.
- b) 0,40.
- c) Aproximadamente 0,17 (1,2 / (0,4 × 18)).
- d) 0,07 (1,2 / 18).

**10.** Tu modelo tiene un AUC alto, pero cuando dice «30 %» solo se devuelve el 15 % de esos pedidos. ¿Qué problema tiene y cómo se corrige?
- a) Fuga de datos; hay que eliminar variables.
- b) Falta de calibración; se corrige con sigmoide o isotónica ajustada con datos no usados para entrenar.
- c) Sobreajuste; se corrige aumentando `learning_rate`.
- d) Desequilibrio; se corrige con `GroupKFold`.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | Un salto grande al añadir una variable «agregada» es señal clásica de fuga: usa la etiqueta propia y el futuro. |
| 2 | c | El cruce interno evita que la etiqueta de la fila entre en su propia variable; en el pipeline se reajusta en cada pliegue. |
| 3 | c | `GroupKFold` imita el caso de clientes nuevos; el aleatorio deja al mismo cliente a ambos lados y lo memoriza. |
| 4 | b | Las etiquetas recientes aún no están cerradas; usarlas es una fuga temporal. |
| 5 | b | Hacia delante en el tiempo y con hueco, tal como se usará el modelo. |
| 6 | b | Fija el nº de árboles con datos distintos de los de entrenamiento (y distintos de los de prueba). |
| 7 | b | Ponderar altera las probabilidades sin mejorar el orden; hay que no ponderar o calibrar. |
| 8 | b | SHAP explica el modelo, no el mundo: correlación no es causalidad. |
| 9 | c | Compensa si p · e · D > c, es decir p > c / (e · D) ≈ 0,167. |
| 10 | b | Ordena bien pero sus probabilidades no son fiables: es un problema de calibración. |
</details>
