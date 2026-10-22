# Módulo AI7 · Inferencia — Cuestionario
**1.** Batching: ↑ throughput total, ↑ latencia por petición. ✓
**2.** KV-cache elimina… re-calcular K/V del prefijo en cada paso. ✓
**3.** Cuantización por canal… contiene outliers por columna. ✓
**4.** int8 con escala = maxabs/127 ⇒ error ~0.6 % en la W de la práctica. ✓
**5.** vLLM sirve porque… continuous batching + PagedAttention (KV-cache paginada). ✓
**6.** El cuello de la concurrencia suele ser… memoria de KV-cache. ✓
**7.** Cuantización de pesos NO reduce… el coste de KV-cache. ✓
**8.** Latencia del primer token se mejora con… streaming + serving optimizado (no con cuantizar solo pesos).
**9.** Coste por token ≈ coste_hora / tokens_del_mes × tokens petición. ✓
**10.** Antes de cuantizar, mide… calidad con tu eval (AI4).
<details><summary>Soluciones</summary>1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7✓ 8✓ 9✓ 10✓</details>
