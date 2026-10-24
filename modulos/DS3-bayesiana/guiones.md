# Módulo DS3 · Guiones de grabación

Diapositivas con Marp: `scripts/generar_diapositivas.sh DS3`. Demos sobre `notebook.ipynb`; ten el notebook abierto y ejecutado de antemano (tarda segundos).

## 3.1 · Pensar en bayesiano (15 min)
- [0–3] Gancho: «p = 0,063: ¿despliego o no?». Un director no sabe qué hacer con eso.
- [3–9] Prior, verosimilitud, posterior con el ejemplo de la conversión; el prior como «visitas imaginarias».
- [9–15] Qué se gana (respuestas directas) y qué cuesta (prior, cómputo).

## 3.2 · Beta-Binomial y el prior (15 min)
- [0–5] La fórmula `Beta(a+k, b+n−k)`; demo de la gráfica con tres priors.
- [5–10] Con 5/50 el prior manda; con 100/2000 casi no. Tabla del notebook.
- [10–15] Análisis de sensibilidad y la regla: «justifica el prior con datos».

## 3.3 · A/B bayesiano (20 min)
- [0–6] Simulación del posterior de A y B; `P(B>A)` y uplift.
- [6–12] Pérdida esperada y regla de decisión con ε. Contraste con el p-valor 0,063.
- [12–17] Simulación de «mirar cada día»: falsos positivos en ambos enfoques.
- [17–20] A euros: ejercicio 2.

## 3.4 · Metropolis (15 min)
- [0–5] Algoritmo en pantalla, función `metropolis`.
- [5–10] Dos pasos distintos, cuatro cadenas dispersas: trazas, aceptación, R-hat, ESS.
- [10–15] Compara con la solución exacta. Idea: por qué NUTS será mejor.

## 3.5 · PyMC (15 min)
- [0–6] El modelo en 4 líneas; `pm.sample`; `az.summary`.
- [6–11] Compara con la conjugada. Qué significan mean, sd, hdi/eti, r_hat, ess.
- [11–15] A/B en PyMC con `pm.Deterministic("uplift")`.

## 3.6 · Jerárquicos (20 min)
- [0–5] El problema: tiendas con 70 visitas. La tienda con 0 compras.
- [5–12] Modelo no centrado línea a línea.
- [12–17] Gráfico de encogimiento y RMSE por tamaño.
- [17–20] Tienda nueva sin datos (ejercicio 4).

## 3.7 · Diagnóstico (15 min)
- [0–4] Checklist: R-hat, ESS, divergencias, trazas.
- [4–11] Caso «ocho tiendas»: centrado frente a no centrado; el embudo con divergencias en rojo.
- [11–15] Comprobación predictiva y sensibilidad al prior de σ (ejercicio 5).

## 3.8 · Frente al frecuentista (10 min)
- [0–5] Tabla de diferencias; cobertura con prior acertado y equivocado.
- [5–10] Cómo comunicar a un no técnico: probabilidad, riesgo, regla. Presentar el entregable.
