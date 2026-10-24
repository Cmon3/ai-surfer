# Módulo DS3 · Estadística bayesiana — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Prior `Beta(2, 58)` y datos de 9 compras en 200 visitas. ¿Cuál es el posterior?
- a) Beta(9, 200)
- b) Beta(11, 249)
- c) Beta(11, 258)
- d) Beta(2, 58)

**2.** ¿Qué indica `a + b` en un prior `Beta(a, b)`?
- a) La media del prior.
- b) El peso del prior, como un número de observaciones previas.
- c) La varianza de los datos.
- d) El número de cadenas necesarias.

**3.** Con 5 compras en 50 visitas y un prior informativo que pesa 1000 visitas, el posterior…
- a) Queda casi igual que la frecuencia observada.
- b) Queda cerca del prior, porque pesa mucho más que los datos.
- c) No se puede calcular.
- d) Es siempre uniforme.

**4.** ¿Qué es la pérdida esperada de elegir B en un A/B?
- a) La probabilidad de que A sea mejor que B.
- b) E[max(pA − pB, 0)]: lo que se pierde de media si B no era mejor.
- c) La diferencia de medias observada.
- d) El p-valor dividido entre dos.

**5.** Un A/B da p = 0,063 y `P(B>A)` = 97 %, con pérdida esperada de B muy por debajo del umbral pactado. ¿Qué es razonable?
- a) Descartar B: p > 0,05.
- b) Desplegar B según la regla pactada, comunicando el riesgo residual.
- c) Repetir hasta que p < 0,05.
- d) Cambiar el umbral tras ver los datos.

**6.** Miras un test A/B cada día y lo paras la primera vez que `P(B>A)` > 97,5 %. Sin diferencia real, los falsos positivos…
- a) Son del 2,5 % por construcción.
- b) Desaparecen en el enfoque bayesiano.
- c) Se inflan bastante, en ambos enfoques.
- d) Solo se inflan en el enfoque frecuentista.

**7.** En Metropolis, un paso de propuesta muy pequeño produce…
- a) Aceptación casi total pero cadenas muy correlacionadas y ESS bajo.
- b) Rechazo casi total.
- c) Cadenas perfectamente mezcladas.
- d) Un R-hat de 1,00 siempre.

**8.** ¿Qué hace el *partial pooling* con una tienda de 70 visitas?
- a) Mantiene su tasa observada.
- b) La encoge hacia la media de las tiendas, más cuanto menos datos tenga.
- c) La elimina del análisis.
- d) La sustituye por la tasa de la tienda más grande.

**9.** Tras muestrear ves 80 divergencias y ESS(σ) de 160 en un modelo jerárquico. ¿Qué haces primero?
- a) Interpretas los posteriores igualmente.
- b) Reparametrizas (no centrado) y/o subes `target_accept`, y vuelves a diagnosticar.
- c) Reduces el número de cadenas.
- d) Cambias a un prior plano en todo.

**10.** Con pocos datos (n = 30) y un prior fuerte pero equivocado, la cobertura de un intervalo creíble al 90 %…
- a) Sigue siendo ≈ 90 %.
- b) Puede caer a niveles muy bajos.
- c) Siempre es mayor del 90 %.
- d) No se puede medir.

---
<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | Beta(2+9, 58+200−9) = Beta(11, 249). |
| 2 | b | Es el tamaño muestral equivalente del prior. |
| 3 | b | El prior pesa 20 veces más que los datos. |
| 4 | b | Pondera la magnitud del error, no solo su probabilidad. |
| 5 | b | La regla se pactó antes; el p-valor no responde a la decisión. |
| 6 | c | Mirar y parar al primer éxito infla falsos positivos en ambos enfoques. |
| 7 | a | Casi todo se acepta pero se avanza muy poco. |
| 8 | b | Los datos ruidosos se complementan con los del resto. |
| 9 | b | Con diagnósticos malos no se interpreta el posterior. |
| 10 | b | Un prior equivocado arrastra el intervalo; con n pequeño no lo corrigen los datos. |
</details>
