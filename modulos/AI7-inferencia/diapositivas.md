---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI7 · Inferencia y despliegue

---

# La ecuación del throughput

Batching: una pasada de pesos sirve a N peticiones → throughput ↑, latencia por petición ↑. Cola + TTL.

---

# KV-cache

Sin cache: atención O(T²). Con cache: solo el nuevo token → ~11× menos cómputo en T=32 (medido).
El cuello en producción: memoria de KV-cache (PagedAttention en vLLM).

---

# Cuantización int8 por canal

escala = max|fila|/127 → error ~0.6 %, memoria 4× menos. Per-canal > global (outliers).
Mide calidad con tu eval (AI4) antes de desplegar.
