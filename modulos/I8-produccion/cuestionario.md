# Módulo I8 · Del notebook a producción — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** Escalas todas las variables con `StandardScaler().fit_transform(X)` y después haces `train_test_split`. ¿Qué problema hay?
- a) Ninguno: el escalado no depende de la variable objetivo.
- b) Fuga de información: la media y la desviación incluyen los datos de test, y la métrica sale optimista.
- c) El modelo será más lento.
- d) `StandardScaler` no funciona antes de separar.

**2.** ¿Por qué se guarda el `Pipeline` completo (preprocesado + modelo) y no solo el clasificador?
- a) Porque ocupa menos.
- b) Porque así la API recibe datos crudos y aplica exactamente el mismo preprocesado que en el entrenamiento, sin reescribirlo.
- c) Porque joblib no puede guardar clasificadores sueltos.
- d) Por compatibilidad con Docker.

**3.** Un cliente envía `{"plan": "oro"}` a tu API, que valida la entrada con Pydantic usando `Literal["basico", "plus", "premium"]`. ¿Qué ocurre?
- a) El modelo predice con una categoría desconocida.
- b) La API devuelve un `500`.
- c) La API responde `422` indicando que el campo `plan` no es válido, sin llamar al modelo.
- d) La petición se ignora en silencio.

**4.** ¿Dónde debe cargarse el modelo en una API de FastAPI?
- a) Dentro de la función `/predict`, en cada petición.
- b) Una vez al arrancar el servicio (por ejemplo, en el `lifespan`).
- c) En el `Dockerfile`, con `RUN python -c "joblib.load(...)"`.
- d) En el navegador del usuario.

**5.** ¿Cuál de estos es un **test de comportamiento**?
- a) Comprobar que el archivo `modelo.joblib` existe.
- b) Comprobar que, a igualdad de lo demás, un cliente con más incidencias de soporte no tiene menor riesgo de abandono.
- c) Comprobar que el código no tiene imports sin usar.
- d) Comprobar que la API tarda menos de 1 s.

**6.** En un `Dockerfile`, ¿por qué se copia `requirements.txt` e instalan las dependencias **antes** de copiar el código?
- a) Por orden alfabético.
- b) Para aprovechar la caché de capas: si solo cambia el código, no se reinstalan las dependencias.
- c) Porque Docker lo exige.
- d) Para que la imagen corra como root.

**7.** Necesitas una clave de API en el contenedor. ¿Qué haces?
- a) La escribes en el código.
- b) La copias en la imagen con `COPY .env .`.
- c) La inyectas al ejecutar como variable de entorno o desde el gestor de secretos de la plataforma, y `.env` va en `.dockerignore`.
- d) La pones en el README para que el equipo la encuentre.

**8.** Tu flujo de CI ejecuta: lint → tests → entrenamiento → construcción de la imagen. Un compañero baja el umbral de AUC del test de 0,75 a 0,60 para que su cambio pase. ¿Qué está mal?
- a) Nada, el umbral es arbitrario.
- b) El umbral es un acuerdo de calidad con negocio: bajarlo para que pase un test oculta una regresión del modelo.
- c) Los tests de modelo no deberían estar en el CI.
- d) Debería haberlo subido a 0,90.

**9.** El PSI de la variable `ticket_medio` entre el entrenamiento y el último mes es 0,43. ¿Qué haces primero?
- a) Reentrenar inmediatamente.
- b) Nada: el PSI no importa si no hay errores.
- c) Comprobar si es un cambio real (por ejemplo, una subida de precios) o un error de datos, y medir el impacto en las predicciones y, cuando lleguen, en la métrica real.
- d) Eliminar la variable del modelo.

**10.** Le pides a un agente de código que añada un endpoint. ¿Qué práctica reduce más el riesgo?
- a) Aceptar los cambios sin leerlos si el agente dice que funcionan.
- b) Tener tests que actúen como especificación, un archivo de instrucciones del proyecto (`AGENTS.md`/`CLAUDE.md`) y revisar el diff antes de fusionar.
- c) Darle tus credenciales de producción para que pruebe en real.
- d) Desactivar el lint para que no moleste.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | El preprocesado se ajusta solo con train; el `Pipeline` lo garantiza por construcción. |
| 2 | b | Reescribir el preprocesado en la API es una fuente clásica de errores silenciosos. |
| 3 | c | El contrato de entrada rechaza lo inválido antes del modelo, con un mensaje útil. |
| 4 | b | Cargar el modelo en cada petición multiplica la latencia. |
| 5 | b | Comprueba que el modelo respeta lo que sabemos del negocio. |
| 6 | b | Las capas se cachean en orden; lo que cambia poco va primero. |
| 7 | c | Los secretos nunca viajan dentro del código ni de la imagen. |
| 8 | b | Los tests de calidad existen precisamente para impedir eso. |
| 9 | c | Deriva no implica siempre reentrenar: primero se diagnostica. |
| 10 | b | La estructura (tests, instrucciones, revisión) es lo que hace seguro trabajar con agentes. |
</details>
