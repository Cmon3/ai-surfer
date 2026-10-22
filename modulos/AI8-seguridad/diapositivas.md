---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI8 · Seguridad, moderación y LLMOps

---

# Inyección de instrucciones

La defensa por prompt se rompe. La estructural no: canal de sistema separado + allowlist + frase de escape.

---

# Moderación en capas

regex barato → clasificador → revisión humana (falsos positivos siempre existen).

---

# Acciones destructivas

Modelo propone **→ humano confirma →** se ejecuta. Irreversible nunca sin humano.

---

# LLMOps

Log sin PII: entrada hash, coste, latencia, tools, versión del modelo. Sin log no hay deriva visible.
