# Módulo I7 · IA generativa y modelos de lenguaje — Cuestionario evaluable

10 preguntas · una sola respuesta correcta por pregunta · 1 punto cada una.

---

**1.** En el mecanismo de atención de un transformer, ¿qué mide el producto escalar entre la *consulta* del token $i$ y la *clave* del token $j$?

a) La probabilidad de que el token $j$ sea el siguiente token generado.
b) La distancia entre las posiciones de los tokens $i$ y $j$ en el texto.
c) Cuán relevante es la información del token $j$ para actualizar la representación del token $i$.
d) El número de veces que los tokens $i$ y $j$ aparecen juntos en los datos de entrenamiento.

---

**2.** ¿Por qué un modelo de lenguaje generativo usa atención *causal* (enmascarada)?

a) Porque se entrena para predecir el siguiente token y, si cada posición pudiera ver los tokens posteriores, la tarea sería trivial (vería la respuesta).
b) Porque reduce el número de parámetros del modelo a la mitad.
c) Porque permite que el modelo cite las fuentes que ha usado en su respuesta.
d) Porque evita que el modelo alucine al obligarle a mirar solo el prompt de sistema.

---

**3.** En el esquema `Ticket` del notebook, el campo se define como `numero_pedido: str | None`. ¿Cuál es el motivo principal de permitir `None`?

a) Que la API procese la llamada más rápido al haber menos campos obligatorios.
b) Que Pydantic pueda convertir automáticamente el número de pedido a entero.
c) Que el modelo pueda devolver el número de pedido en varios formatos distintos.
d) Que, cuando el correo no contiene número de pedido, el modelo pueda devolver `null` en lugar de verse forzado a inventar uno.

---

**4.** ¿Cuál de estas afirmaciones describe mejor la diferencia entre un *flujo de trabajo* y un *agente*?

a) Un flujo de trabajo usa un LLM y un agente no.
b) En un flujo de trabajo los pasos los fija el código; en un agente, el modelo decide en bucle qué herramientas usar y en qué orden.
c) Un agente siempre es más barato porque hace menos llamadas al modelo.
d) Un flujo de trabajo no puede usar herramientas ni salidas estructuradas.

---

**5.** Al evaluar la recuperación del notebook se obtiene esta tabla. La función `responder_rag` pasa al modelo los **3** primeros documentos del buscador por caracteres.

| Buscador | acierto@1 | acierto@2 | acierto@3 |
|---|---|---|---|
| palabras | 0,4 | 0,6 | 0,7 |
| caracteres | 0,7 | 0,8 | 0,9 |

¿Qué interpretación es correcta?

a) El 90 % de las respuestas generadas por el modelo serán correctas.
b) En 1 de cada 10 preguntas de evaluación, el modelo no recibe el documento que contiene la respuesta, así que no podrá responder bien con la documentación.
c) Conviene pasar solo 1 documento, porque el acierto@1 es el más alto de la fila.
d) El buscador por palabras es mejor porque sus valores crecen más rápido al aumentar $k$.

---

**6.** Un servicio procesa 2.000 correos al día. Cada llamada usa de media 500 tokens de entrada y 100 de salida. Supón un precio de 4 $ por millón de tokens de entrada y 20 $ por millón de tokens de salida. ¿Cuál es el coste diario aproximado?

a) 2,40 $
b) 4,00 $
c) 12,00 $
d) 8,00 $

---

**7.** En el ejercicio 3 se enriquecen las políticas con listas de sinónimos. Resultados del buscador por caracteres (acierto@1):

| | 10 preguntas originales | 8 preguntas nuevas |
|---|---|---|
| sin sinónimos | 0,70 | 0,50 |
| con sinónimos | 1,00 | 0,75 |

Los sinónimos se escribieron después de leer las 10 preguntas originales. ¿Qué conclusión es la más adecuada?

a) El 1,00 está inflado por fuga de información; la estimación honesta de la mejora es la de las preguntas nuevas (de 0,50 a 0,75), y con solo 8 preguntas sigue siendo orientativa.
b) El buscador ya es perfecto y no hace falta seguir evaluando.
c) Los sinónimos empeoran el buscador, porque con preguntas nuevas el acierto es menor que con las originales.
d) Las preguntas nuevas están mal escritas, porque dan peor resultado que las originales.

---

**8.** Con la función del ejercicio 4 de las soluciones:

```python
evaluar_por_reglas(
    "El envío a Canarias tarda de 2 a 4 días laborables [POL-02].",
    "POL-02 Envíos",
    ["5", "7"],
)
```

¿Qué devuelve? (La política POL-02 dice que a Canarias se tarda de 5 a 7 días laborables.)

a) `{'cita_correcta': False, 'datos_clave': False, 'aprobada': False}`
b) `{'cita_correcta': True, 'datos_clave': True, 'aprobada': True}`
c) `{'cita_correcta': True, 'datos_clave': False, 'aprobada': False}`
d) `{'cita_correcta': False, 'datos_clave': True, 'aprobada': False}`

---

**9.** *TiendaSur* quiere que su asistente apruebe automáticamente los reembolsos de productos dañados de menos de 20 €, que según POL-03 no requieren devolver el producto. ¿Qué diseño es el más adecuado?

a) Añadir al prompt de sistema "Aprueba solo los reembolsos que cumplan la política" y dar al modelo una herramienta que ejecute el reembolso directamente.
b) No usar IA en atención al cliente, porque cualquier automatización incumple el RGPD.
c) Dejar que el modelo decida libremente, ya que con RAG no puede equivocarse.
d) Que el modelo extraiga los datos y proponga el reembolso; reglas deterministas comprueban importe, plazo de 7 días y fotos contra el sistema de pedidos; los casos fuera de regla o dudosos van a una persona; y todo queda registrado y se informa al cliente de cómo pedir revisión humana.

---

**10.** Una empresa quiere usar un LLM para leer currículums y descartar automáticamente el 60 % de los candidatos antes de que los vea nadie de RR. HH. ¿Qué afirmación es correcta?

a) Es un uso de alto riesgo según el Reglamento europeo de IA (empleo, anexo III) y además una decisión basada únicamente en tratamiento automatizado con efectos significativos (art. 22 RGPD): exige, entre otras cosas, supervisión humana efectiva, pruebas de sesgo y documentación.
b) No le aplica el Reglamento de IA porque el modelo lo ha desarrollado un proveedor externo, que es el único responsable.
c) Basta con informar a los candidatos de que interactúan con una IA (art. 50), porque es un sistema de riesgo mínimo.
d) Es una práctica prohibida en todos los casos por el artículo 5 del Reglamento de IA.

---

<details><summary>Solucionario (para instructores)</summary>

1. **c.** El producto escalar consulta·clave mide el encaje entre lo que busca el token $i$ y lo que ofrece el token $j$; tras el softmax se convierte en el peso con el que $j$ contribuye al nuevo vector de $i$. La (a) confunde atención con la distribución de salida sobre el vocabulario; la (b) describe la posición, que se codifica aparte.

2. **a.** El objetivo de entrenamiento es predecir el siguiente token; si una posición viera las posteriores, copiaría la respuesta. La (d) es un distractor atractivo, pero la máscara no tiene nada que ver con las alucinaciones ni con el prompt de sistema; la (b) es falsa: la máscara no cambia el número de parámetros.

3. **d.** Un campo obligatorio fuerza al modelo a producir un valor aunque no exista en el texto, lo que invita a inventar. Permitir `null` es una defensa contra la alucinación. La (c) es lo contrario de lo que busca un esquema (un formato único) y la (a) no es el motivo.

4. **b.** La diferencia está en quién controla los pasos: el código (flujo de trabajo) o el modelo (agente). La (a) es falsa porque ambos usan LLMs, y la (c) también: los agentes suelen hacer más llamadas y ser más caros.

5. **b.** acierto@3 = 0,9 significa que en 1 de cada 10 preguntas el documento correcto no está entre los 3 que se pasan al modelo. La (a) confunde recuperar el documento con responder bien (la generación puede fallar aunque el documento esté). La (c) es errónea porque acierto@1 (0,7) es menor que acierto@3; con 1 documento perderíamos más respuestas.

6. **d.** Entrada: $2.000 \times 500 = 1.000.000$ tokens → 4 $. Salida: $2.000 \times 100 = 200.000$ tokens → $0{,}2 \times 20 = 4$ $. Total: 8 $/día. La (b) solo cuenta la entrada (o solo la salida); la (a) aplica mal el precio de salida.

7. **a.** Escribir los sinónimos mirando las preguntas de evaluación es una fuga de información equivalente a evaluar con datos de entrenamiento; la mejora real se mide con preguntas nuevas (0,50 → 0,75). La (c) compara columnas distintas: lo relevante es la comparación dentro de cada columna, y con preguntas nuevas los sinónimos mejoran. La (b) ignora que 8 preguntas son muy pocas.

8. **c.** La respuesta contiene `[POL-02]` (cita correcta), pero no contiene "5" ni "7" (dato erróneo), así que no se aprueba. Es justo el caso que el evaluador por reglas detecta y que un juez poco cuidadoso podría pasar por alto. La (b) sería el resultado de una respuesta correcta.

9. **d.** El modelo es útil para leer y proponer, pero la ejecución de una acción con efectos económicos debe validarse con reglas deterministas y revisión humana de excepciones; además, una decisión sobre el cliente basada únicamente en tratamiento automatizado debe ofrecer garantías como la intervención humana (art. 22 RGPD). La (a) confía la seguridad solo al prompt, lo que es vulnerable a la inyección; la (c) es falsa porque RAG reduce, no elimina, los errores.

10. **a.** El empleo (selección y filtrado de candidaturas) figura en el anexo III como ámbito de alto riesgo, y descartar candidatos sin intervención humana es una decisión automatizada con efectos significativos. La (b) es falsa porque la empresa que despliega el sistema tiene obligaciones propias (art. 26) y es responsable del tratamiento. La (c) infravalora el riesgo, y la (d) lo exagera: no es una práctica prohibida del art. 5, sino un uso de alto riesgo sujeto a obligaciones.

</details>
