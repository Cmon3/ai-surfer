# Módulo AI3 · Guiones de grabación

Duraciones según README. Regla: demostrar el pipeline con TF-IDF y mostrar la frontera con embeddings reales.

## 3.1 · Por qué RAG (15 min)
- [0–4] Gancho: "pregúntale al modelo algo que pasó ayer"
- [4–9] Las tres opciones: fine-tuning / prompt directo / RAG; tabla comparativa
- [9–13] El pipeline completo en un diagrama
- [13–15] Riesgo: "responde confiado aunque la recuperación esté vacía"

## 3.2 · Embeddings (20 min)
- [0–5] El mapa semántico: "reenvío" cerca de "se envió de nuevo"
- [5–11] TF-IDF como stand-in del notebook (y por qué basta para aprender)
- [11–16] Coseno: demostración numérica en el notebook
- [16–20] Mismo modelo para chunks y consulta

## 3.3 · Chunking (20 min)
- [0–4] El error nº 1: cortar sin mirar el contenido
- [4–11] Chunking por secciones, con título como prefijo
- [11–16] Solape: por qué y cuánto
- [16–20] Metadatos para citar

## 3.4 y 3.5 · Índice y generación (30 min)
- [0–5] Top-k y por qué NumPy basta para juguete
- [5–13] Reranking: rápido y burdo vs. fino y caro
- [13–22] Prompt de generación con citaciones y "no lo sé"
- [22–30] Casos en vivo: "capital de Francia" → no lo sé

## 3.6 y 3.7 · Agentes y límites (35 min)
- [0–6] El bucle de AI2 recordado; qué añade el agente
- [6–15] Agent en el notebook: buscar_docs + get_pedido + crear_ticket
- [15–22] El router determinista (anti-teatro): 2 ifs que resuelven el 80 %
- [22–30] Fallos: bucles infinitos, tools ambiguas
- [30–35] Cuando un agente sí se justifica

Nota del instructor: la celda [API] del agente se salta sin clave — el "mock" enseña el plan del agente y evita gastar sin querer.
