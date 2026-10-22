# Módulo F5 · Herramientas del oficio: terminal, Git y entornos

**Semana 5 de N1 · ~6 horas** · El módulo que te hará parecer (y ser) un profesional, no un aficionado.

## Objetivos
Al terminar este módulo podrás:
- Moverte con soltura en la terminal: cd/ls/cat, pipes y redirección básica.
- Iniciar un repo Git, hacer commits con mensajes decentes y crear ramas.
- Publicar tu trabajo en GitHub con un README que otra persona entienda.
- Crear y gestionar entornos virtuales de Python sin romper tu sistema.
- Reconocer las prácticas de notebook que salvan (y las que arruinan) un proyecto.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 5.1 | La terminal sin miedo: sistema de ficheros, pipes y historia | 15 min |
| 5.2 | Git I: qué es, init, add, commit, log | 20 min |
| 5.3 | Git II: ramas, merge básico y cómo salir de un lío | 20 min |
| 5.4 | GitHub: push, pull request y README decente | 15 min |
| 5.5 | Entornos: venv, requirements.txt y por qué nunca `pip install` global | 15 min |
| 5.6 | Notebooks que salvan: organización, semillas, orden lineal y salida limpia | 20 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada: todo el flujo (git + venv + notebook) desde Python |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos recomendados |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — levantamos un mini-proyecto "analisis-tiendas" desde cero: creamos el repo, el entorno, un script, un README y lo versionamos paso a paso. Como ejecutamos comandos de shell desde el notebook (`%%bash`), ves de primera mano cómo encajan las piezas.

## Caso práctico (entregable)
Mismo flujo con un proyecto **tuyo**: un repo en GitHub con 3 commits, un README que explique qué hace y un `requirements.txt`. Entrega el enlace al repo y, en un párrafo, qué harías distinto ahora (y qué hiciste mal la primera vez: eso también cuenta).

**Criterios:** repo existe y limpia (30 %), README/requirements legibles (30 %), historia de commits razonable (20 %), reflexión honesta (20 %).

## Autoevaluación
1. ¿Por qué no se confirma en Git un notebook con salidas ejecutadas (outputs)?
2. ¿Qué problema resuelve un `venv` y qué le pasaría a tu proyecto si no lo usas?
3. ¿Qué significa `git log --oneline` y para qué lo mirarías antes de hacer push?
4. Un compañero te dice "pull Request": ¿a qué flujo se refiere y por qué no un push directo?
5. Tu notebook se ejecuta de arriba abajo sin errores tras reiniciar el kernel. ¿Por qué es el criterio nº 1 de calidad para un notebook entregable?

<details><summary>Respuestas</summary>

1. Porque infla el repositorio (imágenes/tablas a veces megas) y provoca conflictos absurdos al re-executar. Se limpia con "Clear outputs" antes del commit; si el repo es entregable, se ejecuta de arriba abajo una última vez y se guarda sin outputs.
2. Aísla dependencias por proyecto. Sin él, dos proyectos con versiones distintas de pandas/numpy se pisan: el último que instala rompe al primero. Y pip global puede romper herramientas del sistema.
3. Muestra el historial en una línea por commit. Antes de push sirve para revisar mensajes ("fix", "cambios"...) y evitar subir basura.
4. Un flujo donde propones cambios desde tu rama para que alguien los revise/merge. Facilita revisión, evita romper main y deja rastro discutible.
5. Porque reproducibilidad manda: si un notebook solo funciona en tu sesión (porque se ejecutó de arriba abajo en el orden equivocado, "porque sí"), no es un artefacto profesional.
</details>

## Lecturas y recursos
- *Pro Git* (gratis en git-scm.com/book) — caps. 1–3.
- *The Missing Semester* de MIT — "Data wrangling" y "Shell tools".
- Docs de GitHub: *Hello World* (primer PR).
