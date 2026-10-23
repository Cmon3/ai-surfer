---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI4 · Evaluación de LLMs
## Golden set · métricas · LLM-as-judge · regresión

*AI Surfer · N3-AI Engineering*

---

# Mapa del módulo

| Pieza | Qué aporta |
|---|---|
| Golden set | La vara de medir congelada |
| Métricas objetivas | Regex/Pydantic/recuperación: el 70 % |
| LLM-as-judge | Criterios subjetivos (con sesgos) |
| Calibración | ¿Confío en el judge? midiendo |
| Regresión A/B | Cambiar sin miedo |

---

# Regresión: el ciclo completo

```
eval → taxonomía de fallos → fix → re-eval → merge
```

Sin golden set, cada cambio de prompt es una rueda rusa.

---

# Golden set: 4 categorías mínimas

1. Happy path (lo que la mayoría pide)
2. Edge cases (unidades 0, fechas raras)
3. Fuera de dominio (frase de escape)
4. Abuso (ignora reglas, inventa datos)

30–100 casos realistas, congelados.

---

# Métricas objetivas (sin LLM)

- ¿Aparece la frase de escape exacta? (regex)
- ¿El JSON valida con Pydantic?
- ¿Recupera los chunks marcados? (hit rate/MRR)
- ¿El contenido clave aparece?

Deterministas, baratas, reproducibles.

---

# LLM-as-judge: con sesgos

- **Verborrea:** premia lo largo
- **Auto-preferencia:** prefiere su propio estilo
- **Distribución puntada:** si todo es 4-5, no discrimina

Mitigación: escala con anclas + **calibración contra humanos**.

---

# Calibración: acuerdo con humanos

```
acuerdo = (judge == humano) / n
```

- <70 %: no sirve para decidir
- 85 %+: útil para regresión

En el notebook: judge mock con sesgo + calibración binarizada.

---

# Regresión A/B

- Mismos casos, modelo fijado (id exacto), prompt versionado; repetir N veces y comparar medias (la API actual no admite `temperature`)
- Tabla por categoría: % casos pasan
- Decisión: B si **no rompe categoría** y mejora ≥ 1

Anti-patrón: cambiar el set entre A y B.

---

<!-- _class: lead -->
# Resumen

**Golden set → métricas → judge calibrado → regresión → taxonomía**

Sin eval, tu RAG/fine-tune es una opinión. Con eval, es un producto.
