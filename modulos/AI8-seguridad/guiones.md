# Módulo AI8 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh AI8`. Todas las demos salen de `notebook.ipynb` (corre en segundos y sin clave de API). Recordatorio ético para quien graba: los ataques se muestran contra un asistente de juguete; no enseñes cómo atacar sistemas ajenos y recalca que el objetivo es defender.

## 8.1 · La superficie de ataque (15 min)
- [0–3] Gancho: «mi asistente es seguro porque le dije que lo fuera». Mostrar un prompt de sistema con una regla y un mensaje que la rompe.
- [3–8] El contexto mezcla cosas de confianza distinta: dibujo con cinco fuentes (sistema, usuario, documentos, herramientas, descripciones MCP).
- [8–12] Modelo de amenazas en cuatro preguntas y la trifecta letal. Ejercicio rápido: ¿qué pata quitarías en el asistente de TiendaSur?
- [12–15] Mapa OWASP en un minuto y aviso: consulta la versión vigente.

## 8.2 · Moderación (20 min)
- [0–4] El filtro de palabras: demo con «¿cómo evito que hackeen mi cuenta?» y «h4ck3ar».
- [4–10] Reglas en el notebook: precisión 0,71 y recall 0,23. Leer la lista de falsos negativos (¡todos son paráfrasis!).
- [10–16] Modelo ligero: n-gramas de caracteres, umbral elegido por coste con validación cruzada (no mirar el test para elegirlo). Tabla de costes: de 854 € a unas decenas de euros. Explicar FN = 50 € y FP = 2 € como supuestos.
- [16–20] Intervalo de Wilson (pocos datos) y Claude como clasificador: mensaje como dato, salida estructurada. Revisión humana como parte del diseño.

## 8.3 · Inyección directa e indirecta (20 min)
- [0–4] Directa en pantalla: «Ignora tus instrucciones…». Después, el giro: el usuario es honesto y el ataque llega por un documento.
- [4–11] Los cuatro canales con un caso de cada uno (D1, R1, H1, M1). Poner énfasis en la descripción de herramienta MCP, *tool shadowing* y *rug pull*.
- [11–16] El asistente simulado del peor caso: por qué se construye así (medir lo que ocurre si el modelo falla) y su límite.
- [16–20] Resultados «sin defensa»: 17 de 17. Pausa para que el espectador prediga qué hará el detector.

## 8.4 · Defensas estructurales (20 min)
- [0–5] Detector heurístico: baja a 10 de 17; leer qué ataques pasan y por qué (paráfrasis). Coste: documento legítimo en cuarentena.
- [5–13] Cada capa en código: allowlist por tarea, validación de argumentos, confirmación humana, filtro de salida, pin de descripciones. Tabla final: 0 de 17 con 5 de 6 o 6 de 6 tareas.
- [13–17] Los límites: pin y caso M4; la confirmación humana a ciegas; ataque a la propia persona que aprueba.
- [17–20] Defensas por prompt: ayudan, no son el control.

## 8.5 · Red teaming (15 min)
- [0–5] Qué es y qué no es: ataque sistemático y autorizado; objetivos y canales.
- [5–10] Éxito del atacante objetivo y comprobable. Antes y después como en la tabla. Los casos nuevos del ejercicio 2.
- [10–15] Del hallazgo al caso de evaluación en CI (AI4); herramientas (Garak, PyRIT, Promptfoo); caducidad de los resultados.

## 8.6 · Logs y privacidad (15 min)
- [0–4] Qué guardar y qué no; el prompt es dato personal.
- [4–10] Seudonimización con HMAC: mismo valor, mismo seudónimo; clave fuera del repositorio. Validar la letra del DNI/NIE. Evaluación de la detección y el límite de «Lucía» y la dirección.
- [10–15] Registro estructurado de ejemplo, retención y derecho de supresión por seudónimo. Seudonimizar no es anonimizar.

## 8.7 · LLMOps: métricas y alertas (15 min)
- [0–4] Se degrada sin errores: las cuatro familias de métricas.
- [4–10] Tráfico simulado de 14 días con degradación desde el día 10; tabla diaria; PSI.
- [10–15] Alertas: línea base robusta (mostrar que con media y desviación la de latencia no salta), persistencia de 2 días, una alerta una acción. Ejercicio 4 como tarea.

## 8.8 · Cumplimiento: RGPD y Reglamento de IA (20 min)
- [0–2] Aviso: no es asesoramiento jurídico; **no decir fechas** del Reglamento, remitir al calendario vigente.
- [2–9] RGPD: finalidad y base jurídica, transparencia, minimización, plazo, derechos, encargados y transferencias, EIPD.
- [9–16] Reglamento de IA: niveles de riesgo; qué cambia para un chatbot (transparencia) y para un preseleccionador de CV (alto riesgo); rol de proveedor frente a desplegador; modelos de propósito general.
- [16–20] La ficha del notebook: pendientes reales. Ejercicio 5. Cierre del módulo y entregable: informe de seguridad con pendientes honestos.

Nota del instructor: el notebook corre sin API (camino simulado). Con `ANTHROPIC_API_KEY`, la celda del clasificador llama a Claude; menciona que los resultados pueden diferir de los mostrados.
