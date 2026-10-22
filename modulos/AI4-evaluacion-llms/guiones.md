# Módulo AI4 · Guiones de grabación

## 4.1 · Por qué eval (15 min)
- [0–4] Gancho: "cambiaste una palabra del prompt y cinco clientes te lo agradecen... y ocho se fueron".
- [4–10] Analogía con tests de software; qué es regresión aquí.
- [10–15] El ciclo eval→fix→re-eval.

## 4.2 · Golden set (20 min)
- [0–5] Caso = consulta + categoría + salida esperada; realismo (emails reales anonimizados).
- [5–13] Las 4 categorías con ejemplos de TiendaSur (incluido abuso).
- [13–20] Cuántos casos: 30 para empezar, 100 para decidir fino.

## 4.3 · Métricas objetivas (20 min)
- [0–6] Regex para escape y contenido clave; por qué es el 70 % del valor.
- [6–13] Validación Pydantic y recuperación marcada.
- [13–20] Latencia y coste: la optimización se evalúa.

## 4.4 + 4.5 · Judge y calibración (35 min)
- [0–5] ¿Para qué sirve el judge? Criterios subjetivos.
- [5–13] Sesgos: verborrea, auto-preferencia; demo con el mock.
- [13–22] Calibración: acuerdo con humanos; qué hacer si <70 %.
- [22–30] Prompt con anclas ("3 = responde con errores...").
- [30–35] Por qué juzgar con otro modelo o plantilla ayuda.

## 4.6 + 4.7 · Regresión y taxonomía (30 min)
- [0–6] Protocolo A/B: set congelado, seed, temperature 0.
- [6–14] Tabla por categorías; decisión de merge.
- [14–22] Taxonomía: frecuencia × impacto; arregla causas no síntomas.
- [22–30] El entregable: evals de tu dominio.

Nota del instructor: el notebook corre sin API (mock determinista). Con API, la celda del judge usa Claude.
