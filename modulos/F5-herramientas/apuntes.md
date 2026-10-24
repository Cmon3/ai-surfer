# Módulo F5 · Herramientas del oficio — Apuntes

> Objetivo: que los comandos deje de ser misterio y se conviertan en tus manos para todo lo que hagas con datos.

---

## 5.1 · La terminal sin miedo

**Sistema de ficheros en 3 comandos.**

```bash
pwd        # dónde estoy (print working directory)
ls         # qué hay aquí (-l con detalles, -a incluye ocultos)
cd carpeta # moverme (cd .. para subir; cd ~ a tu casa)
```

**Ver contenido:**

```bash
cat fichero.txt          # volcar el archivo entero
head -n 5 datos.csv      # las primeras 5 líneas
tail -n 20 log.txt       # las últimas 20
wc -l datos.csv          # contar líneas (la forma más rápida de saber cuántos registros)
```

**Pipes y redirección (el superpoder).**

```bash
cat pedidos.csv | head -100 | wc -l        # encadenar: cat → head → wc
grep "Madrid" clientes.csv | head -5       # líneas que contienen "Madrid"
grep -i madrid clientes.csv > madrid.csv   # escribir el resultado en un archivo
```

Un pipe (`|`) toma la salida de un comando y la pasa al siguiente. En la práctica 90 % de lo que haces con `grep | sort | head` lo harás también con Python — pero a veces un pipe te ahorra escribir 20 líneas de código.

**Atajos que salvan el día:** ↑ para el comando anterior, `Tab` para autocompletar rutas nombres, `Ctrl+C` para cancelar lo que corra, `Ctrl+L` para limpiar pantalla.

---

## 5.2 · Git: qué es y por qué

Git guarda **instantáneas (commits)** de tu proyecto con quién, cuándo y qué cambió. Es como "guardar como" con memoria perfecta.

**El flujo mínimo (el 90 % de las veces):**

```bash
git init                    # la primera vez, en la carpeta del proyecto
git status                  # qué hay por confirmar y qué confirmado
git add nota.md             # "quiero guardar este cambio"
git commit -m "primer borrador de nota"   # guardo con mensaje
git log --oneline           # reviso la historia
```

**Mensaje de commit:** qué cambió y por qué, en una línea (`"Ajustar tasa de aprendizaje del ejemplo a 0.001"`), no "cambios".

**Archivos que NO van a git:** `.venv/`, `__pycache__/`, `node_modules/`, datos grandes. Se declaran en un archivo `.gitignore`.

---

## 5.3 · Ramas y merge básico

Una **rama** es una línea de trabajo independiente. Se usa para no romper lo estable:

```bash
git switch -c feature-visualizacion    # crear y entrar a una rama
# ... editas, commit...
git switch main                        # vuelves a "lo estable"
git merge feature-visualizacion        # traes esos cambios a main
```

**Cuando hay conflicto:** Git marca con `<<<<<<< HEAD` y `>>>>>>> rama` el trozo que ambos han cambiado. Es una petición, no un error: decides qué se hace, guardas el archivo correcto y haces `git add` + `commit`.

**Para salir de un lío (receta de emergencia):**

```bash
git log --oneline          # ver dónde estás en la historia
git reset --soft HEAD~1    # deshacer el último commit (sin borrar los cambios del disco)
```

---

## 5.4 · GitHub: publicar y colaborar

```bash
git remote add origin git@github.com:tusuario/analisis-tiendas.git   # enlaza el repo local
git push -u origin main       # sube el historial
git pull                      # baja lo nuevo (si trabajas desde varias máquinas)
```

- **README.md es la cara del repo**: qué hace, cómo ejecutar (dependencias), ejemplo de uso. Sin él, el repo es una caja negra.
- **Pull request (PR):** propones cambios desde una rama para que se revisen con comentários y diff. También en un proyecto propio — es la forma de dejar rastro del razonamiento.
- **Convención**: `main` siempre estable; trabajo en ramas; PR para lo que va a main.

---

## 5.5 · Entornos: el venv y las requirements

**El problema:** Python instala librerías globalmente. Dos proyectos con versiones distintas de la misma librería se pisan.

**La solución:** cada proyecto tiene su propio entorno (una carpeta con su Python y sus paquetes):

```bash
python3 -m venv .venv          # crear
source .venv/bin/activate      # activar (Windows: .venv\Scripts\activate)
pip install -r requirements.txt  # instalar desde el archivo
pip freeze > requirements.txt    # congelar las versiones al terminar
```

**Regla de oro:** si hay un `requirements.txt`, respeta sus versiones; si no lo hay, créalo al final del proyecto (`pip freeze >> requirements.txt`) — pero revisa su contenido: el freeze incluye todo lo instalado en ese entorno.

---

## 5.6 · Notebooks que salvan

Un notebook bien hecho es un **informe reproducible**; mal hecho, un lío que solo tú entiendes.

**Regla de oro: ejecutar de arriba a abajo tras reiniciar el kernel** (Kernel → Restart & Run All). Si el notebook solo funciona en tu sesión (por orden de ejecución manual), no está acabado.

**Prácticas que salvan:**
1. **Secciones con markdown** — título de cada bloque, la pregunta de negocio que responde.
2. **RNG con semilla** (`np.random.default_rng(42)`) para que la otra persona obtenga los mismos datos.
3. **Sin salidas guardadas en el commit** (Kernel → Clear outputs) — los outputs se recrean.
4. **Nombres que dicen algo** (`tabla_ventas`, `df_limpio`) y no `df2`, `aux`.
5. Una **celda de conclusiones** al final (o arriba): qué se concluye, en lenguaje de negocio.

**Cuándo NO usar notebook:** scripts de producción, lógica reutilizable (funciones que importarás en otros sitios), y pipelines grandes — ahí va un `.py` modular (eso llega en I8).

---

## 5.7 · Tu primer día con un agente de código

Las ofertas de 2026 lo piden como requisito, no como extra: la de Galadrim (AI/ML junior, Madrid) pide fluidez con **Cursor o Claude Code** y la de Provectus cita el ecosistema Claude (`CLAUDE.md`, *hooks*, *skills*) y el desarrollo guiado por especificaciones. Esta lección es la versión de primer día; el I8 (lección 8.9) la lleva a un proyecto de ML completo.

**Qué es un agente de código.** Un programa que usa un modelo de lenguaje para **leer tu repositorio, editar archivos y ejecutar comandos** (tests, linters) en bucle hasta cumplir lo que le pides. Claude Code se usa desde la terminal; Cursor es un editor con agente integrado. Un chat que te devuelve un fragmento para copiar *no* es un agente: aquí el programa actúa directamente sobre tus archivos, y por eso importan los cuatro hábitos siguientes. (Comprueba en la documentación vigente cómo se instala cada herramienta: cambia con frecuencia.)

**1. Instrucciones del proyecto: `CLAUDE.md` / `AGENTS.md`.** Es un archivo de texto en la raíz del repositorio que el agente lee al empezar. Claude Code lee `CLAUDE.md`; `AGENTS.md` es una convención abierta que leen otras herramientas (Cursor entre ellas). Si usas varias, mantén una sola fuente y haz que la otra la referencie. Contenido útil y corto:
- **Comandos**: cómo se ejecutan los tests y el lint.
- **Estructura**: dónde está cada cosa.
- **Reglas que no se rompen**: «no debilites los tests para que pasen», «nada de secretos en el código», «sin dependencias nuevas sin avisar».

*Por qué funciona:* el agente no sabe nada de tu proyecto que no pueda leer. Lo que te sabes de memoria (cómo se prueba esto) tiene que estar escrito.

**2. Pide un cambio pequeño con los tests como especificación.** Flujo recomendado:
1. Escribe tú el test que describe el comportamiento nuevo y comprueba que **falla**.
2. Pide al agente: objetivo, archivos que puede tocar, criterio de aceptación («`pytest -q` en verde») y una restricción («no modifiques los tests»).
3. Un objetivo por petición. Un diff de 20 líneas se revisa; uno de 600 se acepta sin mirar.

*Por qué:* sin test, «funciona» significa «lo parece». Con test, es una comprobación que cualquiera repite.

**3. Revisa el diff como el de un compañero.** `git diff` antes de aceptar. Señales de alarma típicas: aserciones borradas o relajadas (el camino más corto para «arreglar» un test es cambiarlo), dependencias nuevas, archivos que no tienen que ver con la petición, claves en el código y código que no sabrías explicar. Haz commits pequeños antes y después: Git es tu botón de deshacer (`git checkout -- archivo`, `git restore`). La responsabilidad del código es tuya; en una entrevista te pedirán que lo expliques.

**4. Permisos mínimos y cero secretos.**
- Las herramientas piden confirmación antes de ejecutar comandos o editar; no la desactives por comodidad. Concede permisos solo a lo que hace falta (leer, ejecutar tests) y revisa la documentación vigente de permisos de tu herramienta.
- Trabaja en una **rama** y sobre una copia sin credenciales de producción.
- Las claves van en variables de entorno o en un archivo `.env` listado en `.gitignore`; nunca en el código ni en el chat con el agente. Si una clave llega a un commit, **aunque la borres después sigue en el historial**: revócala y crea otra.
- Desconfía de texto que el agente lea en archivos o páginas web y que le «ordene» hacer cosas: es una forma de ataque (*prompt injection*; se estudia en AI8).

**Receta de primer día:** crea una rama → `AGENTS.md` con comandos y reglas → test que falla → petición pequeña → `git diff` + tests → commit con un mensaje tuyo.

*En el notebook:* un agente simulado aplica un parche; tú escribes el test antes, revisas el diff y una función detecta tests debilitados y secretos.
