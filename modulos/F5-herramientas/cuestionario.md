# Módulo F5 · Herramientas del oficio — Cuestionario

12 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20–25 min.

---

**1.** En bash, `cat datos.csv | grep "Madrid" | wc -l` cuenta…
- a) las líneas de datos.csv que contienen "Madrid".
- b) las veces que se ejecuta el comando.
- c) los caracteres de datos.csv.
- d) las filas donde el primer campo es Madrid.

---

**2.** ¿Para qué sirve `git add`?
- a) Añadir un archivo nuevo a la nube.
- b) Marcar los cambios que quieres incluir en el próximo commit (staging).
- c) Añadir una rama.
- d) Añadir un merge.

---

**3.** `git commit -m "cambios"` es un mal mensaje de commit porque…
- a) Git no acepta mensajes de menos de 5 palabras.
- b) no explica qué cambió ni por qué; el log se vuelve inútil.
- c) va sin mayúscula alguna.
- d) es demasiado corto para el buffer.

---

**4.** `git switch -c feature-x` hace…
- a) cambiar a una rama existente feature-x.
- b) crear una rama nueva feature-x y entrar en ella.
- c) fusionar feature-x en main.
- d) eliminar feature-x.

---

**5.** Un conflicto de merge se resuelve…
- a) borrando la rama.
- b) reiniciando el equipo.
- c) editando el archivo para dejar el contenido correcto y confirmando.
- d) aceptando siempre la versión de main.

---

**6.** ¿Por qué NO se commitea un notebook con outputs?
- a) Porque infla el repo y provoca conflictos absurdos; se regenera ejecutando.
- b) Porque GitHub no acepta archivos .ipynb.
- c) Porque Jupyter lo impide.
- d) Porque los outputs contienen el código fuente y es redundante.

---

**7.** Un `.gitignore`…
- a) borra archivos del disco.
- b) lista archivos/carpetas que Git no debería subir (venv, cachés, datos grandes).
- c) hace que git clone sea más rápido.
- d) sirve para GitHub Pages.

---

**8.** El venv resuelve…
- a) la falta de espacio en disco.
- b) la velocidad de importación en Jupyter.
- c) el choque de versiones de dependencias entre proyectos.
- d) los permisos del sistema.

---

**9.** ¿Cuándo se ejecuta "Restart & Run All"?
- a) Cada vez que abres el notebook.
- b) Antes de entregar/comitear: comprueba que el notebook va de arriba abajo sin errores.
- c) Solo si hay errores.
- d) Nunca: es solo para instructores.

---

**10.** El README de un repo de datos debe contener, como mínimo…
- a) una foto del equipo.
- b) qué hace, cómo ejecutarlo (dependencias) y un ejemplo de uso.
- c) el código fuente completo.
- d) la licencia y el contrato laboral del autor.

---

**11.** Le pides a un agente de código que añada una regla y los tests pasan, pero el diff muestra que ha borrado dos aserciones de un test existente. ¿Qué haces?
- a) Aceptas: los tests están en verde.
- b) Restauras los tests, le pides que cambie el código y no los tests, y añades esa regla a `AGENTS.md`.
- c) Le das permisos para modificar cualquier archivo.
- d) Desactivas los tests porque el agente ya comprueba su código.

---

**12.** Has pegado por error una clave de API en un archivo y la has subido en un commit. Lo borras en el commit siguiente. ¿Está resuelto?
- a) Sí: la clave ya no está en el código.
- b) No: sigue en el historial de Git; hay que revocarla y crear otra.
- c) Sí, si el repositorio es privado.
- d) Sí, si añades `.env` al `.gitignore`.

---

<details><summary>Soluciones</summary>
1. **a** 2. **b** 3. **b** 4. **b** 5. **c** 6. **a** 7. **b** 8. **c** 9. **b** 10. **b** 11. **b** 12. **b**

- **11:** la especificación son los tests; si el agente los debilita, «en verde» no significa nada. La regla escrita en `AGENTS.md` evita que se repita.
- **12:** Git conserva el historial; cualquiera con acceso al repositorio (o a una copia) la puede recuperar. La única solución segura es revocar la clave.
</details>
