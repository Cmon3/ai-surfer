# Módulo DS2 · Experimentación avanzada — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Quieres detectar una mejora relativa del 2 % en lugar del 10 % con la misma potencia y α. El tamaño de muestra necesario:
- a) Se reduce a la mitad.
- b) Se mantiene.
- c) Se multiplica aproximadamente por 25 (crece con 1/MDE²).
- d) Se multiplica por 2.

**2.** La correlación entre el gasto de la semana previa y el gasto durante el experimento es ρ = 0,6. Con CUPED, la varianza de la métrica ajustada es aproximadamente:
- a) 60 % de la original.
- b) 36 % de la original.
- c) 64 % de la original.
- d) 40 % de la original.

**3.** ¿Por qué CUPED no introduce sesgo en la estimación del efecto?
- a) Porque aumenta el tamaño de muestra.
- b) Porque la covariable se mide antes del experimento y el tratamiento no puede afectarla.
- c) Porque elimina los valores atípicos.
- d) Porque se ajusta con el grupo de tratamiento solamente.

**4.** Miras el panel 10 veces durante el test y paras en la primera mirada con p < 0,05. Sin efecto real, la tasa de falsos positivos será aproximadamente:
- a) 5 %.
- b) 10 %.
- c) 20 %.
- d) 50 %.

**5.** ¿Qué distingue un límite estilo O'Brien-Fleming de uno de Pocock?
- a) O'Brien-Fleming es más exigente al principio y casi 1,96 al final; Pocock usa un límite constante.
- b) Pocock no controla el error de tipo I.
- c) O'Brien-Fleming solo sirve para proporciones.
- d) No hay diferencia, son sinónimos.

**6.** Con 20 métricas independientes y sin efecto real, la probabilidad de que al menos una salga con p < 0,05 es aproximadamente:
- a) 5 %.
- b) 20 %.
- c) 64 %.
- d) 95 %.

**7.** ¿Qué controla el procedimiento de Benjamini-Hochberg?
- a) La probabilidad de al menos un falso positivo.
- b) La proporción esperada de falsos descubrimientos entre las hipótesis rechazadas.
- c) La potencia.
- d) El tamaño de muestra.

**8.** Diseñaste 50/50 y observas 50 000 vs 48 800 (p ≈ 0,0001 en el test de SRM). ¿Qué haces?
- a) Lo ignoras: el reparto es casi igual.
- b) Concluyes que el tratamiento funciona mejor.
- c) Investigas el fallo de asignación o registro; no te fías del resultado hasta resolverlo.
- d) Aumentas α.

**9.** Para un guardarraíl de latencia, ¿qué criterio es correcto?
- a) Que no haya diferencia significativa (p > 0,05).
- b) Que el límite superior del IC de la diferencia quede por debajo de un margen de empeoramiento acordado de antemano.
- c) Que la latencia media sea la menor.
- d) Que se mida solo el primer día.

**10.** En el experimento de Thompson sampling frente al A/B/n uniforme con 4 variantes, ¿qué ocurre con el *regret* acumulado?
- a) El uniforme crece linealmente; Thompson crece mucho más despacio porque dirige el tráfico a las variantes que parecen mejores.
- b) Es idéntico en ambos.
- c) Thompson siempre es peor porque explora.
- d) El uniforme tiene regret cero.

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | c | n ∝ 1/MDE²: pasar de 10 % a 2 % multiplica por (10/2)² = 25 (tabla del notebook: 14 744 → 356 326). |
| 2 | c | Varianza × (1 − ρ²) = 1 − 0,36 = 0,64. |
| 3 | b | La covariable es anterior al tratamiento: no puede estar influida por él. |
| 4 | c | Cada mirada es una nueva oportunidad; con 10 miradas el error se acumula hasta ≈ 20 % (simulación: 19,6 %). |
| 5 | a | O'Brien-Fleming gasta poco alfa al principio; Pocock lo reparte de forma uniforme. Ambos mantienen α = 5 % global. |
| 6 | c | 1 − 0,95²⁰ ≈ 64 %. |
| 7 | b | BH controla el FDR. Bonferroni/Holm controlan el FWER (la probabilidad de algún falso positivo). |
| 8 | c | Un SRM indica que los grupos no son comparables; el resultado no es fiable. |
| 9 | b | No inferioridad: descartar un empeoramiento relevante, no solo «no ver diferencia». |
| 10 | a | El A/B uniforme sigue mostrando variantes malas; Thompson reduce el tráfico hacia ellas. |
</details>
