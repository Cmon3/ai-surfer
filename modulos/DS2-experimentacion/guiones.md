# Módulo DS2 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh DS2`. Todas las demos se hacen en `notebook.ipynb` (se ejecuta entero en ~10 s).

## DS2.1 · Repaso: potencia y tamaño de muestra (15 min)
- [0–3] Gancho: «producto quiere detectar un +2 % en una semana. ¿Se puede?».
- [3–8] α, potencia, MDE; la tabla del notebook y la regla n ∝ 1/MDE².
- [8–12] Demo: simular 5 000 experimentos; potencia empírica 79,9 % y falsos positivos 4,9 %.
- [12–15] Qué se fija antes del experimento y semanas completas.

## DS2.2 · CUPED (20 min)
- [0–4] Idea: restar lo que ya sabíamos del usuario.
- [4–9] Fórmula, θ, 1 − ρ². Demo con un solo experimento: IC antes y después.
- [9–15] Demo de 2 000 repeticiones: media (sin sesgo) y desviación (menor) según ρ.
- [15–20] Cuándo funciona y cuándo no (eventos raros, usuarios nuevos); ejercicio 1.

## DS2.3 · Pruebas secuenciales (25 min)
- [0–5] Gancho: el panel verde que aparece el martes. «Paramos, ¿no?».
- [5–11] Demo: A/A con 10 miradas → ≈ 20 % falsos positivos. Dibujar por qué se acumula.
- [11–17] Límites de Pocock y O'Brien-Fleming calibrados por simulación; tabla de límites; resultados con y sin efecto.
- [17–23] SPRT: umbrales A y B, demo bajo H0 y H1; tamaño medio frente al fijo.
- [23–25] Cuándo usar cada uno; recomendación de librerías.

## DS2.4 · Comparaciones múltiples (15 min)
- [0–4] 20 métricas → 64 %.
- [4–10] FWER vs FDR; tabla de comparación con 4 efectos reales.
- [10–15] Regla de producto: métrica principal + secundarias; segmentos como múltiples encubiertas.

## DS2.5 · Guardarraíles y SRM (20 min)
- [0–4] SRM: qué es y causas.
- [4–11] Demo: tres experimentos, uno con SRM; la simulación que fabrica un efecto inexistente.
- [11–17] Guardarraíl por no inferioridad: demo con +20 ms (pasa) y +45 ms (falla).
- [17–20] Matriz de decisión.

## DS2.6 · Novedad e interferencia (15 min)
- [0–5] Efecto novedad: gráfico diario, semana 1 frente a semana 4.
- [5–12] Interferencia: la historia del reparto; demo usuario vs zona (+1,0 vs +0,2).
- [12–15] Diseños: cluster, *switchback*, geo-experimentos.

## DS2.7 · Bandits (20 min)
- [0–4] Explorar vs explotar y qué es el regret.
- [4–10] ε-greedy y Thompson sampling: el código en 10 líneas.
- [10–16] Curvas de regret; tabla de resultados; barrido de ε (ejercicio 5).
- [16–20] Cuándo bandit y cuándo A/B; riesgos.

## DS2.8 · Del análisis a la decisión (10 min)
- [0–6] Orden del informe con el caso integrado del carrito: SRM → CUPED → Holm → guardarraíl.
- [6–9] Redacción de la recomendación (efecto, IC, decisión, seguimiento).
- [9–10] Presentar el caso práctico y los criterios.
