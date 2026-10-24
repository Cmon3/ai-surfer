# Módulo DS1 · Inferencia causal — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Los clientes de TiendaSur que usan la app gastan 19 € más al trimestre. El efecto causal real es 8 €. ¿Cuál es la explicación más probable de la diferencia?
- a) La app tiene un efecto distinto en cada cliente.
- b) Los clientes más fieles y activos usan más la app y también gastan más: un confusor.
- c) El tamaño de muestra es demasiado grande.
- d) La app reduce el gasto de los clientes que no la usan.

**2.** En el DAG `Z → X`, `Z → Y`, `X → Y`, ¿qué conjunto de ajuste identifica el efecto de X sobre Y?
- a) El conjunto vacío.
- b) {Z}.
- c) {Y}.
- d) Ningún conjunto: no es identificable.

**3.** Quieres el efecto **total** de X sobre Y y existe `X → M → Y`. ¿Qué ocurre si incluyes M como control en la regresión?
- a) Mejora la estimación, porque ajustas por más variables.
- b) Estimas solo el efecto directo y eliminas la parte que pasa por M.
- c) Se duplica el efecto.
- d) No cambia nada, M se ignora.

**4.** `X → C ← Y` y X no causa Y. Si regresas Y sobre X y C, ¿qué sucede?
- a) Aparece una asociación espuria entre X e Y.
- b) El coeficiente de X es exactamente cero.
- c) C actúa como confusor y debe incluirse.
- d) Sale lo mismo que sin C.

**5.** Tras ponderar por IPW, el |SMD| de «antigüedad» entre grupos es 0,02. ¿Qué indica?
- a) Que el efecto estimado es significativo.
- b) Que esa covariable está bien equilibrada tras la ponderación.
- c) Que hay que descartar la covariable.
- d) Que el solapamiento es insuficiente.

**6.** En IPW aparecen clientes con propensity score de 0,002 y pesos enormes. ¿Qué haces?
- a) Nada: el estimador es insesgado y eso basta.
- b) Revisas el solapamiento; puedes recortar los pesos o restringir la población, sabiendo que introduces algo de sesgo para reducir varianza.
- c) Eliminas el tratamiento.
- d) Aumentas el nivel de significación.

**7.** En una DiD, el estudio de eventos muestra coeficientes previos al tratamiento que suben de forma sostenida. ¿Qué concluyes?
- a) El supuesto de tendencias paralelas es dudoso y la estimación puede estar sesgada.
- b) El tratamiento funciona muy bien.
- c) Hay que usar más periodos posteriores.
- d) El supuesto se confirma.

**8.** Un instrumento tiene F = 2 en la primera etapa. ¿Qué problema anticipas?
- a) El instrumento es perfectamente válido.
- b) Instrumento débil: estimaciones muy dispersas y sesgo hacia el OLS.
- c) El efecto es nulo.
- d) El instrumento viola la exogeneidad.

**9.** En una regresión discontinua con umbral en 100 € de gasto anual, ¿qué supuesto es crucial?
- a) Que todos los clientes tengan el mismo gasto.
- b) Que los clientes no puedan manipular su posición respecto al corte, y que los demás factores varíen suavemente en él.
- c) Que el umbral sea un número redondo.
- d) Que el efecto sea el mismo lejos del umbral.

**10.** Tu modelo de respuesta tiene mucha precisión prediciendo quién comprará con el cupón, pero la curva Qini es casi la diagonal. ¿Qué significa?
- a) Que es un excelente modelo de *uplift*.
- b) Que predice quién compra, pero no a quién el cupón le cambia la decisión: ordena mal para decidir.
- c) Que el cupón no cuesta dinero.
- d) Que el experimento no estaba aleatorizado.

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | Autoselección: los fieles usan la app y gastan más aunque la app no hiciera nada. |
| 2 | b | Ajustar por Z cierra la puerta trasera X ← Z → Y. Con el conjunto vacío el camino queda abierto. |
| 3 | b | M es mediador: parte del efecto pasa por él. Controlarlo da el efecto directo, no el total. |
| 4 | a | C es un colisionador; condicionar en él abre el camino X → C ← Y y crea asociación espuria. |
| 5 | b | |SMD| < 0,1 se considera equilibrio; 0,02 es excelente. |
| 6 | b | Es un problema de solapamiento: se recorta o se acota la población, con el compromiso sesgo-varianza. |
| 7 | a | Las tendencias previas ya divergen: el contrafactual «seguirían igual» no es creíble. |
| 8 | b | Con F ≪ 10 el instrumento es débil; las estimaciones oscilan muchísimo. |
| 9 | b | La asignación es «como aleatoria» solo si no hay manipulación del corte y lo demás es continuo. |
| 10 | b | Predecir la respuesta no es predecir el efecto; el uplift es la diferencia entre dos probabilidades. |
</details>
