# Módulo 00 · Fundamentos de Python para datos — Cuestionario

10 preguntas tipo test. Cada pregunta tiene **una sola respuesta correcta**. Tiempo orientativo: 20 minutos.
Puedes usar el notebook para comprobar tus respuestas, pero intenta razonarlas primero.

---

**1.** Abres el notebook al día siguiente, reinicias el kernel y ejecutas directamente una celda de la sección 5 que usa la tabla `ventas`. Obtienes `NameError: name 'ventas' is not defined`. ¿Cuál es la causa?

- a) El fichero de datos se ha borrado de Colab y hay que volver a descargarlo.
- b) Al reiniciar, el kernel ha olvidado todas las variables y la celda que crea `ventas` todavía no se ha ejecutado.
- c) pandas no está instalado en el entorno virtual.
- d) La celda tiene un error de sangría que impide definir la variable.

---

**2.** En la sección 3 del notebook se crea el generador con `rng = np.random.default_rng(42)`. ¿Para qué sirve el `42`?

- a) Limita los números aleatorios al intervalo de 0 a 42.
- b) Indica que se generen 42 tickets por día.
- c) Hace que los datos sean más realistas que con otra semilla.
- d) Fija la secuencia de números aleatorios para que cualquiera que ejecute el notebook obtenga exactamente los mismos datos.

---

**3.** Para las ventas de una semana, `v.std()` (NumPy) devuelve 49,7 y `pd.Series(v).std()` (pandas) devuelve 53,7. ¿Por qué?

- a) NumPy divide entre $n$ por defecto (`ddof=0`) y pandas entre $n-1$ (`ddof=1`).
- b) pandas ignora el valor más alto de la serie.
- c) Uno de los dos tiene un error de redondeo por usar `float`.
- d) pandas calcula la varianza y NumPy la desviación típica.

---

**4.** Haces `ventas.merge(tiendas, on="tienda_id", validate="many_to_one")`. ¿Qué te protege el argumento `validate`?

- a) Que no haya valores nulos en la columna `tienda_id`.
- b) Que ambas tablas tengan el mismo número de filas.
- c) Que la tabla `tiendas` no tenga identificadores repetidos que multiplicarían filas de `ventas` sin avisar.
- d) Que la columna `tienda_id` sea de tipo entero en ambas tablas.

---

**5.** ¿Qué devuelve este código?

```python
import numpy as np
v = np.array([120, 135, 98, 160, 210, 250, 190])
round((v > 150).mean(), 3)
```

- a) `4`
- b) `0.429`
- c) `0.571`
- d) `array([160, 210, 250, 190])`

---

**6.** ¿Qué devuelve `ventas_semana[2:5]` si `ventas_semana = [120, 135, 98, 160, 210, 250, 190]`?

- a) `[98, 160, 210]`
- b) `[135, 98, 160, 210]`
- c) `[98, 160, 210, 250]`
- d) `[135, 98, 160]`

---

**7.** Al diagnosticar la tabla de ventas obtienes:

```text
Index: 20080 entries, 0 to 3198
precio_unitario    19930 non-null   float64
Filas duplicadas: 87
```

Ejecutas `drop_duplicates()` y después imputas los precios ausentes con la mediana de su categoría. ¿Cuántas filas y cuántos nulos tendrá la tabla?

- a) 20.080 filas y 0 nulos.
- b) 19.930 filas y 0 nulos.
- c) 19.993 filas y 150 nulos.
- d) 19.993 filas y 0 nulos.

---

**8.** El notebook muestra esta tabla:

```text
           unidades  precio_unitario  ingreso
promocion
False          3.01            16.09    48.80
True           3.84            13.58    51.78
```

¿Qué afirmación es correcta?

- a) Las promociones aumentan el ingreso por ticket en un 28 %.
- b) El ingreso medio por ticket es unos 6 % mayor en promoción, pero esta tabla por sí sola no demuestra que la promoción cause ese aumento.
- c) Como el precio medio baja, las promociones reducen el ingreso de la cadena.
- d) Las promociones no tienen ningún efecto sobre las unidades vendidas.

---

**9.** Dirección quiere decidir en qué tienda ampliar la sección de Electrónica. Tienes estos datos:

| Tienda | m² | Ingreso de Electrónica (€) |
|---|---|---|
| Centro | 450 | 107.278 |
| Aeropuerto | 150 | 54.753 |

¿Qué métrica y qué recomendación preliminar son más adecuadas?

- a) Ingreso de Electrónica por m²: Aeropuerto (≈365 €/m²) supera claramente a Centro (≈238 €/m²), así que Aeropuerto es la candidata, si hay espacio físico disponible.
- b) Ingreso total de Electrónica: Centro, porque vende casi el doble.
- c) Número de m²: Centro, porque es la tienda con más espacio.
- d) Ninguna: con datos de ventas no se puede decir nada sobre el espacio.

---

**10.** Revisando los 150 precios ausentes descubres que casi todos corresponden a tickets de Electrónica registrados a mano en caja. Tienes que entregar mañana el informe de ingresos a Dirección. ¿Qué haces?

- a) Rellenar los precios ausentes con 0 para no inventar datos.
- b) Eliminar esas filas sin mencionarlo, porque son menos del 1 % del total.
- c) Imputar con la mediana de su categoría, marcar las filas imputadas con una columna indicadora, mencionarlo en el informe y avisar al responsable del sistema de caja para corregir el origen.
- d) Imputar con la media global de todos los precios, que es el método más neutral.

---

<details><summary>Solucionario (para instructores)</summary>

| Pregunta | Respuesta | Tipo |
|---|---|---|
| 1 | b | Conceptual |
| 2 | d | Conceptual |
| 3 | a | Conceptual |
| 4 | c | Conceptual |
| 5 | c | Aplicación |
| 6 | a | Aplicación |
| 7 | d | Aplicación |
| 8 | b | Interpretación |
| 9 | a | Decisión de negocio |
| 10 | c | Decisión de negocio |

**1 → b.** El kernel guarda el estado; al reiniciarlo, olvida todas las variables y hay que ejecutar las celdas en orden desde arriba. (a) no aplica porque los datos se generan en el propio notebook; (c) daría `ModuleNotFoundError`, no `NameError`; (d) daría `IndentationError`.

**2 → d.** La semilla hace reproducible la secuencia aleatoria. No limita el rango de valores (a) ni el número de tickets (b), y ninguna semilla es "más realista" que otra (c).

**3 → a.** Es la diferencia de `ddof`: NumPy usa la desviación poblacional ($n$) y pandas la muestral ($n-1$), por eso pandas da un valor algo mayor. No es un problema de redondeo (c) y ambos calculan desviaciones típicas (d).

**4 → c.** `validate="many_to_one"` lanza un error si la tabla de la derecha tiene claves repetidas, el caso en que el merge duplicaría filas silenciosamente. No comprueba nulos (a), tamaños (b) ni tipos (d); para esto último hay que revisar `dtypes`.

**5 → c.** La máscara tiene 4 valores `True` (160, 210, 250, 190) de 7; su media es la proporción 4/7 ≈ 0,571. (a) sería `.sum()`; (b) es la proporción por encima de la media (3/7), no de 150; (d) sería `v[v > 150]`.

**6 → a.** Las rebanadas incluyen el inicio y excluyen el final: posiciones 2, 3 y 4. (b) olvida que se empieza en 0; (c) incluye el final como si fuera `loc`.

**7 → d.** 20.080 − 87 = 19.993 filas; la imputación por mediana de categoría rellena los nulos sin eliminar filas. (b) confunde el número de no nulos con el de filas; (c) olvida la imputación; (a) olvida la deduplicación.

**8 → b.** 51,78 / 48,80 ≈ 1,06. Es una asociación descriptiva: puede ser ruido o un efecto mezcla de categorías, y se analizará con intervalos de confianza y pruebas de hipótesis. (a) confunde el aumento de unidades (≈ +28 %) con el de ingreso; (c) contradice la tabla; (d) es falso: las unidades suben.

**9 → a.** La decisión es de espacio, así que la métrica relevante es la productividad por m² (54.753/150 ≈ 365; 107.278/450 ≈ 238). (b) solo refleja el tamaño de la tienda; (c) no mide demanda; (d) es demasiado pesimista: los datos permiten una recomendación preliminar con sus limitaciones.

**10 → c.** Los nulos no son aleatorios (se concentran en una categoría y un proceso), así que hay que imputar con criterio, marcar, ser transparente y corregir el origen. (a) hunde el ingreso de Electrónica; (b) sesga a la baja precisamente la categoría más valiosa y oculta la decisión; (d) imputa a Electrónica un precio muy inferior al real.

</details>
