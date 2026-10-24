---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# DS2 · Experimentación avanzada
## CUPED · Secuenciales · Múltiples · SRM · Bandits

*AI Surfer · N3 Data Science avanzada*

---

# Por qué este módulo

- Hacer un A/B es fácil; hacerlo **sin trampas** y a tiempo, no
- Diferencia entre *ejecutar* tests y *diseñar* un programa de experimentación
- Caso: **rediseño del carrito de TiendaSur**
- Todo simulado: sabemos la verdad y medimos si funciona

---

# Mapa del módulo

1. Potencia y tamaño de muestra
2. CUPED
3. Mirar antes de tiempo: secuenciales y SPRT
4. Comparaciones múltiples
5. Guardarraíles y SRM
6. Novedad e interferencia
7. Bandits
8. Del análisis a la decisión

---

# Potencia y tamaño

- α = 5 % · potencia = 80 % · **MDE** = el menor efecto que cambia la decisión
- n ∝ 1 / MDE²
- Conversión 10 %: +10 % relativo → 14 744 por grupo · +2 % → 356 326
- Valida con simulación: potencia 79,9 %, falsos positivos 4,9 %

---

# CUPED

Y' = Y − θ (X − X̄), con X = métrica **previa**

- Sin sesgo: X no puede verse afectada por el tratamiento
- Var(Y') = Var(Y)(1 − ρ²)
- ρ = 0,7 → 51 % de la varianza ≈ **el doble de tráfico**
- Simulado: efecto 1,0 recuperado con y sin CUPED; dispersión baja un 30 %

---

# Mirar antes de tiempo

- Cada mirada es otra oportunidad de equivocarse
- A/A con 10 miradas, parando al primer p < 0,05: **≈ 20 %** de falsos positivos
- Pocock (límite constante): 5,1 %
- O'Brien-Fleming (exigente al principio): 5,0 %, casi sin perder potencia

---

# SPRT

- Acumula el log del cociente de verosimilitudes y para al cruzar A o B
- Se puede mirar **continuamente**
- Mismo α y potencia, ≈ la mitad de muestra en media
- Coste: elegir δ₁, tamaño no acotado → mSPRT, valores-p siempre válidos

---

# Comparaciones múltiples

- 20 métricas sin efecto: **64 %** de que alguna salga significativa
- **FWER** (Bonferroni, Holm): ningún falso positivo
- **FDR** (Benjamini-Hochberg): pocos falsos entre los descubrimientos
- Regla de producto: una métrica principal + secundarias corregidas

---

# SRM: la alarma barata

- Diseño 50/50, observado 50 000 / 48 800 → p ≈ 0,0001
- Simulación: efecto real 0 €; con SRM se «mide» **+1,8 €**
- Primer paso del análisis. Si hay SRM: **no decidas**

---

# Guardarraíles

- Latencia, devoluciones, quejas, ingresos a largo plazo
- No basta «no significativo»: falta de potencia ≠ ausencia de daño
- **No inferioridad:** el límite del IC dentro de un margen acordado antes

| Principal | Guardarraíles | Decisión |
|---|---|---|
| Mejora | OK | Lanzar |
| Mejora | Fallan | Iterar |

---

# Novedad e interferencia

- Novedad: +8 % la primera semana, +3 % real
- SUTVA rota (reparto, mercados, redes): aleatorizar por usuario da **+1,0**; el lanzamiento completo, **+0,2**
- Soluciones: cluster, *switchback*, geo-experimentos

---

# Bandits

- Reparto adaptativo: explorar vs explotar; se mide con el **regret**
- ε-greedy: explora una fracción fija
- **Thompson sampling:** muestrear de la posterior de cada variante
- Regret final: A/B/n 162 · ε 0,10 → 91 · Thompson 60
- Úsalos para optimizar (titulares, banners); A/B para aprender

---

# El informe del experimento

1. SRM y calidad de datos
2. Métrica principal con CUPED
3. Secundarias corregidas
4. Guardarraíles
5. Novedad y estacionalidad
6. Decisión + incertidumbre + seguimiento

---

<!-- _class: lead -->
# Caso práctico

Plan y análisis de un experimento: diseño, simulación, SRM, CUPED, guardarraíles y recomendación
