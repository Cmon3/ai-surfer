# Módulo I5 · Deep learning — Cuestionario evaluable

10 preguntas tipo test. Cada pregunta tiene una única respuesta correcta. Tiempo orientativo: 20 minutos.

---

**1.** ¿Por qué se prefiere ReLU a la sigmoide en las capas ocultas de una red profunda?

a) Porque ReLU produce probabilidades entre 0 y 1, que son más fáciles de interpretar.
b) Porque su pendiente no se aplana para valores positivos, lo que reduce el problema del gradiente que se desvanece.
c) Porque ReLU convierte la red en un modelo lineal, más fácil de optimizar.
d) Porque ReLU elimina la necesidad de una función de pérdida.

---

**2.** En una capa convolucional, el hecho de que el mismo filtro se aplique en todas las posiciones de la imagen (pesos compartidos) implica que:

a) Cada píxel de la imagen tiene su propio peso independiente.
b) La capa solo puede detectar patrones en el centro de la imagen.
c) El número de parámetros crece con el tamaño de la imagen.
d) Un patrón aprendido se detecta esté donde esté en la imagen, con muy pocos parámetros.

---

**3.** ¿Qué ocurre con una capa `nn.Dropout(0.3)` cuando el modelo está en modo evaluación (`modelo.eval()`)?

a) Se desactiva: todas las neuronas participan en la predicción.
b) Sigue apagando al azar un 30 % de las neuronas en cada predicción.
c) Apaga siempre el mismo 30 % de neuronas, elegido al final del entrenamiento.
d) Duplica la salida de las neuronas para compensar las apagadas.

---

**4.** ¿Cuál es la diferencia principal entre usar una red preentrenada como **extractor de características** y hacer **ajuste fino** (*fine-tuning*)?

a) El extractor de características requiere más datos etiquetados que el ajuste fino.
b) En el ajuste fino se reinician todos los pesos de forma aleatoria antes de entrenar.
c) En el extractor se congelan los pesos preentrenados y solo se entrena la nueva cabeza; en el ajuste fino también se siguen entrenando capas preentrenadas, con una tasa de aprendizaje pequeña.
d) El extractor de características solo funciona con texto y el ajuste fino solo con imágenes.

---

**5.** ¿Cuántos parámetros entrenables tiene la capa `nn.Linear(64, 32)`?

a) 2 048
b) 2 080
c) 96
d) 2 112

---

**6.** Una imagen de forma (8, 16, 16) —8 canales de 16×16— pasa por `nn.Conv2d(8, 16, kernel_size=3, padding=1)` y después por `nn.MaxPool2d(2)`. ¿Cuál es la forma de salida y cuántos parámetros tiene la capa convolucional?

a) Salida (16, 16, 16); 1 168 parámetros.
b) Salida (16, 8, 8); 160 parámetros.
c) Salida (8, 8, 8); 1 152 parámetros.
d) Salida (16, 8, 8); 1 168 parámetros.

---

**7.** Un clasificador asigna a la clase correcta una probabilidad de 0,8 en un ejemplo y de 0,2 en otro. ¿Cuál es la entropía cruzada media de estos dos ejemplos (logaritmo natural)?

a) ≈ 0,92
b) ≈ 0,50
c) ≈ 1,61
d) ≈ 0,22

---

**8.** Entrenas el MLP del notebook con Adam durante 40 épocas y obtienes este historial de pérdida de entrenamiento (cada 10 épocas):

```
época    1: 2.301
época   10: 2.104
época   20: 1.712
época   30: 1.203
época   40: 0.861
exactitud validación final: 0.83
```

¿Cuál es el diagnóstico y la acción más razonable?

a) Sobreajuste: añadir dropout y reducir el número de neuronas.
b) El modelo no ha terminado de aprender (tasa de aprendizaje probablemente pequeña o pocas épocas): aumentar la tasa de aprendizaje (p. ej., ×10) o entrenar más épocas, y comparar curvas.
c) La tasa de aprendizaje es demasiado alta: dividirla entre 10.
d) Los datos están mal etiquetados, porque la pérdida inicial debería ser 0.

---

**9.** Una operadora de telecomunicaciones quiere predecir qué clientes se darán de baja. Tiene una tabla con 40 000 clientes y 35 variables (antigüedad, consumo, incidencias, tarifa...). Un miembro del equipo propone entrenar directamente una red neuronal profunda "porque es lo más avanzado". ¿Qué recomendarías?

a) Entrenar la red profunda directamente: con 40 000 filas siempre supera a cualquier modelo clásico.
b) Convertir la tabla en imágenes para poder usar una CNN preentrenada.
c) Descartar cualquier modelo y usar reglas manuales, porque las redes no funcionan con tablas.
d) Empezar con una línea base clásica (regresión logística y *gradient boosting*), validarla con la métrica de negocio y solo probar una red si hay motivos para esperar una mejora que compense su coste y menor interpretabilidad.

---

**10.** Una CNN de inspección de calidad alcanza un 98 % de exactitud en validación con fotos de la línea de producción A. La dirección quiere desplegarla mañana en la línea B, que tiene otra iluminación y otra cámara. ¿Cuál es la decisión más sensata?

a) Etiquetar una muestra de fotos de la línea B para medir el rendimiento real allí; si cae, aplicar aumento de datos (brillo, contraste) y ajuste fino con esas fotos, y desplegar enviando a revisión humana los casos de baja confianza.
b) Desplegar mañana: un 98 % en validación garantiza el mismo resultado en cualquier línea.
c) Reentrenar la red desde cero solo con las fotos de la línea A, pero durante más épocas.
d) Bajar el umbral de decisión para que la red marque más piezas como defectuosas, sin medir nada en la línea B.

---

<details><summary>Solucionario (para instructores)</summary>

| Pregunta | Tipo | Respuesta |
|---|---|---|
| 1 | Conceptual | b |
| 2 | Conceptual | d |
| 3 | Conceptual | a |
| 4 | Conceptual | c |
| 5 | Aplicación | b |
| 6 | Aplicación | d |
| 7 | Aplicación | a |
| 8 | Aplicación | b |
| 9 | Negocio | d |
| 10 | Negocio | a |

**1 → b.** La sigmoide se satura para valores grandes de $|z|$ (pendiente ≈ 0) y, al multiplicarse capa a capa, los gradientes se desvanecen; ReLU tiene pendiente 1 en la zona positiva. La (a) describe la sigmoide, no ReLU; la (c) es falsa: ReLU es no lineal y precisamente por eso la profundidad sirve.

**2 → d.** Compartir el filtro permite reconocer el patrón en cualquier posición y el número de parámetros depende del tamaño del filtro, no de la imagen. La (a) y la (c) describen una capa densa; la (b) es lo contrario de lo que ocurre.

**3 → a.** Dropout solo actúa durante el entrenamiento; en evaluación se desactiva (PyTorch ya reescala las activaciones durante el entrenamiento, por eso la (d) es incorrecta). La (b) es justo el error que se produce si se olvida llamar a `eval()`.

**4 → c.** El extractor congela la red y entrena solo la cabeza; el ajuste fino sigue entrenando capas preentrenadas con tasa pequeña para no destruir lo aprendido. La (a) está invertida (el extractor necesita menos datos) y la (b) describe entrenar desde cero.

**5 → b.** $64 \times 32 = 2\,048$ pesos más 32 sesgos $= 2\,080$. La (a) olvida los sesgos; la (c) suma entradas y salidas en lugar de multiplicarlas; la (d) suma 64 sesgos en vez de 32.

**6 → d.** Con `padding=1` y filtro 3×3 la convolución conserva 16×16 con 16 canales; el *pooling* deja (16, 8, 8). Parámetros: $8 \times 16 \times 3 \times 3 + 16 = 1\,168$. La (a) olvida el *pooling*; la (b) calcula los parámetros como si hubiera 1 canal de entrada; la (c) confunde canales de entrada y salida y olvida los sesgos.

**7 → a.** $-\tfrac{1}{2}\left[\ln 0{,}8 + \ln 0{,}2\right] = \tfrac{1}{2}(0{,}223 + 1{,}609) \approx 0{,}92$. La (c) es solo la pérdida del ejemplo malo y la (d) solo la del ejemplo bueno; la (b) promedia las probabilidades en lugar de los logaritmos.

**8 → b.** La pérdida empieza en ≈ ln 10 (correcto) y baja de forma lenta y sostenida sin estabilizarse: el modelo aún no ha convergido, típico de una tasa de aprendizaje pequeña (en el notebook de soluciones, con $10^{-4}$ ocurre algo muy parecido). No hay sobreajuste (a): no hay señal de que la validación empeore mientras la pérdida baja tan despacio. Bajar la tasa (c) lo empeoraría, y la pérdida inicial esperable es ≈ 2,30, no 0 (d).

**9 → d.** Con datos tabulares, los modelos clásicos suelen igualar o superar a las redes, son más baratos e interpretables; siempre se mide primero una línea base. La (a) es falsa en general; la (b) añade complejidad sin sentido (las columnas no tienen estructura espacial) y la (c) descarta sin motivo modelos que funcionan bien con tablas.

**10 → a.** Un cambio de iluminación y cámara es un cambio de dominio: hay que medir con datos de la línea B, adaptar el modelo (aumento de datos, ajuste fino) y mantener supervisión humana en los casos dudosos. La (b) ignora el cambio de dominio; la (c) no aporta información de la línea B; la (d) cambia el umbral a ciegas, sin conocer los costes ni el rendimiento real.

</details>
