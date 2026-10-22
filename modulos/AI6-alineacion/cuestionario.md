# Módulo AI6 · Alineación — Cuestionario

**1.** DPO necesita π_ref congelada para… (a) ahorrar cómputo (b) no desbarrar: compara con la política inicial (c) el dataset lo exige.
**2.** GRPO respecto a PPO… (a) usa value model (b) normaliza la recompensa dentro del grupo, sin crítico (c) es más caro.
**3.** β alto en DPO… (a) respuestas tibias/cercanas a la referencia (b) respuestas locas (c) nada.
**4.** Los pares de preferencia comparten instrucción porque… el modelo aprendería a preferir instrucciones, no respuestas.
**5.** La pérdida de preferencia del DPO es… −logσ(β·Δ) con Δ = (logπ−logπ_ref)_w − (…)_l.
**6.** Un RM logístico r(x)=w·x se entrena con… −logσ(r_w−r_l).
**7.** Datos de preferencia anotados por el mismo modelo que genera causan… sesgo de auto-preferencia.
**8.** Reproducibilidad exige registrar… seed, versión de datos, β/lr y judge.
**9.** La alineación sobre-correge si… dataset conservador o β alta.
**10.** El orden correcto del post-entrenamiento: SFT → (RM) → DPO/GRPO.
<details><summary>Soluciones</summary>1b 2b 3a 4✓ 5✓ 6✓ 7✓ 8✓ 9✓ 10✓ (todas las respuestas marcadas son las correctas)</details>
