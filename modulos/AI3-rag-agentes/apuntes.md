# Módulo AI3 · RAG y agentes — Apuntes

> Objetivo: dos patrones distintos y complementarios. **RAG** da conocimiento externo al modelo *antes* de responder. **Agentes** dan acción al modelo *durante* la respuesta. Saber cuándo usar cada uno (y cuándo ninguno) es la mitad de la competencia del AI engineer.

---

## 3.1 · Por qué RAG

El modelo escribe con lo que aprendió hace meses. Tus datos (manual de TiendaSur, tickets, documentación interna) no están. Tres opciones:

1. **Fine-tuning (AI5–AI6):** cara, lenta, mal para datos que cambian.
2. **Contexto directo:** meter todo en el prompt — caro y limitado por la ventana.
3. **RAG (Retrieval-Augmented Generation):** buscar los trozos relevantes y darlos al modelo en el prompt.

**Flujo completo:**

```
Documentos → chunking → embeddings → índice
Consulta → consulta embedida → búsqueda top-k → chunks en el prompt → respuesta citada
```

**Ventajas:** barato, actualizable al instante (reíndexas y listo, no hay que reentrenar), trazable (la respuesta cita de dónde salió). **Riesgo:** si la recuperación falla, la respuesta falla — *garbage in, confident garbage out*.

---

## 3.2 · Embeddings: texto → vector

Un **embedding** convierte texto en un vector de R^n (típicamente 384–1536 dimensiones) donde *cercanía = similitud semántica*. "¿Cuánto tarda el envío?" queda cerca de "el plazo de entrega es de 3-5 días" aunque no compartan palabras.

**Cómo se mide la cercanía:** similitud coseno · `cos(θ) = (a·b)/(‖a‖‖b‖)` — 1 si apuntan igual, 0 independientes.

**Fuentes de embeddings:**
- **API** (OpenAI/Voyage/Anthropic…): calidad alta, coste por token.
- **Locales** (`sentence-transformers`): gratis, corren en CPU para frases cortas, hay modelos multilingües pequeños.
- **Stand-in pedagógico (el notebook): TF-IDF** — bag of words, sin semántica; sirve para entender el pipeline sin descargar modelos. Cuando cambias TF-IDF por embeddings reales, **el resto del código no cambia**: sólo la función `encodar(texto) -> vector`.

**Nota clave:** **el mismo modelo** produce embeddings de consulta y de chunks. Mezclar modelos invalida la comparación.

---

## 3.3 · Chunking: trocear sin romper

Mal chunking = RAG malo. Reglas prácticas:

- **Tamaño:** ~200–500 tokens por chunk (el embedding de un documento entero diluye; de una línea, no da contexto).
- **Solape (overlap):** 10–20 % entre chunks consecutivos — para que una frase que cruza el corte aparezca completa en algún chunk.
- **Cortar por estructura cuando exista:** secciones, títulos, párrafos. Los chunks deben *empezar en una idea*, no a mitad de tabla.
- **Metadatos:** guarda de qué documento y sección salió — para citar y para filtrar.

**El error nº 1:** trocear por longitud fija sin mirar el contenido. El chunk que corta una tabla a la mitad nunca se recupera completo.

---

## 3.4 · Índice: top-k y reranking

**Búsqueda:** embedear la consulta → coseno contra todos los chunks → ordenar → top-k (k entre 3 y 10).

**Coste:** para 10k chunks, cálculo directo con NumPy es instantáneo. Para millones, índices optimizados (FAISS, pgvector, Turbopuffer, Qdrant…) — pero el patrón es idéntico.

**Reranking (cuando importa):** los embeddings son *rápidos pero burdos*. Con un **cross-encoder** (modelo que ve consulta+chunk juntos) reordenas los 20 mejores y te quedas con 3. Más caro, más preciso — se aplica después, no antes.

---

## 3.5 · Generación con contexto citado

El prompt con contexto:

```
Responde con la información de los fragmentos entre <docs>.
No uses conocimiento externo. Si no está en los fragmentos, di "no lo sé".
Cita: [doc1], [doc2]…

<docs id="pedidos.md#3">
El envío estándar tarda 3-5 días laborables...
</docs>
```

**Reglas de oro:** 1) permite al modelo decir "no lo sé" (evita el hallucination de cortesía); 2) exige citas — así el usuario verifica y tú depuras; 3) ordena los chunks por relevancia (los primeros pesan más en la atención).

---

## 3.6 · Agentes: el bucle

Un **agente** es un LLM con herramientas que corre en bucle hasta resolver la tarea:

```
Tarea → pensamiento (LLM) → si necesita dato/acción: herramienta → resultado → vuelve al LLM → … → respuesta final
```

**Componentes (todos del AI2, ahora en bucle):**
1. **Rol y meta:** "Eres el agente de soporte de TiendaSur. Resuelve la incidencia".
2. **Herramientas:** `buscar_docs` (el RAG de antes), `get_pedido`, `crear_ticket`.
3. **Bucle con límite:** `for vuelta in range(MAX)` y devolución de `tool_result`.
4. **Memoria:** el mensaje del asistente con su tool_use y el tool_result van al historial — así "recuerda".

**Diferencia con el AI2:** ahí una interacción (1 llamada o 1 herramienta). Aquí el modelo **planifica**: decide si mira docs, consulta pedido, crea ticket, y en qué orden.

---

## 3.7 · Límites: cuándo NO agente

El agente gasta tokens y comete errores nuevos (no siempre usa la herramienta correcta). **Antes de crear agente, preguntar:**

- ¿El flujo es **determinista**? → script normal (búsqueda → prompt → respuesta). Casi siempre mejor.
- ¿Hay una sola decisión? → function calling simple (AI2), sin bucle.
- ¿Hay **planificación real** (orden no predecible, varias herramientas condicionadas)? → sí, agente.

**Fallos típicos:** bucles infinitos (límite de vueltas y coste), herramientas ambiguas (descripciones solapadas — el modelo elige "la que suena bien"), y el "agente teatro": un bucle que ya tenías pre-planificado en tu código. Un buen *routing* explícito (¿es pregunta sobre pedidos? busca docs; ¿reclamación? crea ticket) **sin LLM** resuelve el 80 % de los agentes que se venden como "autónomos".

---

## Resumen del módulo

- **RAG** = chunking bien hecho + embeddings + top-k + generación con citas y permiso para "no lo sé".
- **TF-IDF** como stand-in: cambia `encodar()` por embeddings reales y el pipeline es idéntico.
- **Agente** = el bucle de herramientas del AI2 con planificación; límites de iteración siempre.
- **El 80 % de los "agentes"** son un script con dos ifs — y funcionan mejor.
