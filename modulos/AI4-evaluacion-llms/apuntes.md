# Módulo AI4 · Evaluación de LLMs — Apuntes

> Objetivo: reemplazar "me parece mejor" por números y criterios. Es el skill que separa un AI engineer de un promptero: poder **regresiónar** su producto cada vez que cambia una palabra del prompt, un modelo o un parámetro.

---

## 4.1 · Por qué eval

Cuando cambias un prompt, dos cosas pasan: se arregla el caso que estabas probando y **se rompen silenciosamente cinco casos que no estabas viendo**. Sin golden set, cada cambio es una rueda rusa. Con him: regresión automática y decisiones comparables.

**Analogía de tests:** un prompt es código; la eval es su suite. Nadie mergea sin tests en software; los LLM no son la excepción.

---

## 4.2 · El golden set (30–100 casos)

Un caso es **(entrada, contexto, salida esperada, categoría, criterios)**. Realismo: usa correos/tickets reales anonimizados — no "hola, ¿cómo estás?".

**Cobertura (4 categorías mín.):**
1. **Happy path** — lo que la mayoría pide.
2. **Edge cases** — fechas raras, unidades 0, nombres propios mal escritos.
3. **Fuera de dominio** — pregunta de capital de Francia → frase de escape.
4. **Ataques/abuso** — intentar que invente datos, ignorar reglas, inyecciones básicas (AI8 el profundiza).

Si no puedes escribir la respuesta esperada, al menos escribe las **criterios** (debe citar, debe ser < 3 frases, no debe inventar ids).

---

## 4.3 · Métricas objetivas (sin LLM, deterministas)

- **Cobertura de citas:** ¿la respuesta citó los chunks correctos? *(RAG)*
- **Validación estructural (Pydantic):** ¿el JSON parsea y cumple? *(extracción)*
- **Preciso de recuperación:** hit rate del top-k contra chunks marcados; MRR si quieres ser fino.
- **Reglas del prompt:** ¿apareció la frase de escape exacta en fuera de dominio? ¿aparecen emojis cuando dijiste que no? (regex)
- **Latencia/coste:** tokens y ms por caso — la optimización también se evalúa.

Todo esto se calcúlca con regex/diccionarios en CPU. Empieza aquí: el 70–80 % del valor de la eval es decir "esto ya no cumple X" automáticamente.

---

## 4.4 · Métricas con modelo (similitud y LLM-as-judge)

**Similitud semántica:** embedea la respuesta esperada y la del modelo, coseno > umbrales (0.8 p.ej.). Barato, detecta parafrasis. Falla: no detecta datos falsos con la misma estructura ("el pedido 1042 está en Girona").

**LLM-as-judge (para criterios subjetivos — utilidad, tono):**

```
Dado el caso (consulta + documentos + respuesta esperada),
puntúa la respuesta del 1 al 5 en: utilidad, tono, precisión.
Solo responde JSON: {"utilidad": 3, "tono": 4, "precision": 5, "motivo": "..."}
```

**Riesgos conocidos:**
- **Verborrea (length bias):** puntúa alto la respuesta larga.
- **Sesgo plantilla:** prefiere su propio estilo (si tú generas con Claude y juzgas con Claude, cuidado).
- **Distribución de puntas:** si todo sale 4-5, la escala no discrimina — calibra o usa escala con anclas ("3 = responde en general pero con errores...").

---

## 4.5 · Calibración del judge

Antes de fiarte: **compara el judge con las etiquetas humanas** en 20–30 casos etiquetados.

- `acuerdo = (judge == humano) / n` — si 60 %, no decide; si 85 %+, útil.
- Mira las discrepancias: ¿falla en categorías concretas (el judge es muy severo con respuestas cortas)? Ajustas el prompt del judge con el ejemplo que corrigió y recalibras (no con todos).

En el notebook simulamos juicios humanos mock y comparamos: verá cómo un judge "naif" (sin criterios) se desvía y cómo el ajustado converge.

---

## 4.6 · Regresión A/B con confianza

**Protocolo:**
1. **Golden set congelado** + **semilla** y temperatura 0 (determinismo).
2. Corre variante A (config actual) y B (candidata).
3. Tabla por métrica y por categoría: % casos que pasan.
4. Regla de decisión: B se mergea si **no rompe ninguna categoría** y mejora ≥ 1 con significación razonable (con 30 casos, una mejora de 3+ casos ya es señal; para fino, bootstrap).

**Anti-patrón:** cambiar el golden set entre A y B "porque el nuevo es más realista". Entonces ya no comparas nada.

---

## 4.7 · Análisis de fallos

No mire 3 fallos y pinte conclusiones. **Taxonomía:**

1. Cuenta los fallos por categoría (recuperación / formato / reglas del prompt / factual).
2. Prioriza por **frecuencia × impacto** — si el 40 % de los fallos son "cita el chunk equivocado", esa es la batalla, no el tono.
3. Para cada clase: causa probable (chunking, embeddings, prompt, modelo) y arregla ese, **no** el síntoma.

**El ciclo completo:** eval → taxonomía → fix → re-eval → regresión → (y vuelta a empezar).

---

## Resumen del módulo

- **Golden set congelado** (30–100 casos realistas, con categorías) es la vara de medir.
- **Métricas objetivas** primero (regex, Pydantic, recuperación); **judge** solo para lo subjetivo y **calibrado**.
- **Regresión A/B** con misma seed/casos; decisión por categorías, no promedio global.
- **Taxonomía de fallos** con frecuencia × impacto — arregla causas, no síntomas.
