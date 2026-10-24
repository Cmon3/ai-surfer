# Módulo F5 · Guiones de grabación

Duración de cada vídeo en el README; las diapositivas van con Marp y se regeneran con `scripts/generar_diapositivas.sh F5`.

## 5.1 · La terminal sin miedo (15 min)
- [0–2] Gancho: "el 90 % de los servidores de datos solo tienen terminal".
- [2–8] pwd/ls/cd + cat/head/tail/wc sobre el CSV de pedidos del notebook.
- [8–13] Pipes: filtrar un CSV con grep y contar con wc.
- [13–15] Atajos (Tab, ↑, Ctrl+C) y regla psicólogica: "en terminal no hay magia, solo hay texto".

## 5.2 · Git básico (20 min)
- [0–3] Qué es un commit: instantánea con quién/cuándo/qué.
- [3–9] Fluent: init, status, add, commit, log con el sandbox del notebook.
- [9–15] Mensajes de commit decentes y .gitignore.
- [15–20] Qué NO entra en git (venv, datasets, pycache).

## 5.3 · Ramas y líos (20 min)
- [0–5] Diagrama de ramas, switch -c.
- [5–12] Merge sin conflicto; conflicto resuelto a mano en el editor.
- [12–17] Receta de emergencia: reset --soft, log --oneline.
- [17–20] Por qué siempre en rama y merge a main.

## 5.4 · GitHub y PR (15 min)
- [0–5] Push/pull con remoto; repo visible.
- [5–10] README con qué/cómo/ejemplo.
- [10–15] PR: flujo, revisión, por qué sirve incluso en proyectos personales.

## 5.5 · Entornos (15 min)
- [0–3] El problema: dos proyectos, dos versiones de pandas.
- [3–10] venv y activate; pip install -r y pip freeze.
- [10–15] requirements.txt como "contrato" del entorno.

## 5.6 · Notebooks reproducibles (20 min)
- [0–4] El criterio nº 1: Restart & Run All.
- [4–9] Secciones, semillas, nombres y Clear outputs.
- [9–16] Cuándo NO a notebook (scripts/py modular) — anticipación a I8.
- [16–20] Cierre del módulo y presentación del proyecto N1.

## 5.7 · Tu primer día con un agente de código (15 min)
- [0–2] Gancho: la oferta de Galadrim pide «Cursor o Claude Code con fluidez». Pregunta: ¿qué diferencia a quien lo usa bien de quien «le pide cosas y reza»? Respuesta: la estructura del proyecto.
- [2–5] Qué es un agente (lee, edita, ejecuta en bucle) frente a un chat. Ejemplo real de Claude Code en terminal sobre `analisis-tiendas`.
- [5–8] `AGENTS.md`/`CLAUDE.md`: abrir el del notebook, leerlo línea a línea y explicar por qué cada regla existe.
- [8–12] Demo en el notebook: test que falla, petición pequeña, `git diff`, tests en verde. Después el agente «tramposo»: borra aserciones y deja una clave; `revisar_diff` lo detecta; `git checkout` lo deshace.
- [12–15] Permisos mínimos, rama, `.env` en `.gitignore`, clave filtrada = clave revocada. Cierre: «tú firmas el commit».

