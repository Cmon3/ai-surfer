---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# DS8 · Comunicación y producto de datos
## Métricas · Storytelling · Gráficos · Dashboards · Memos · Make or buy

*AI Surfer · N3 Data Science*

---

# Por qué este módulo

- Un análisis que nadie entiende **no cambia ninguna decisión**
- Las ofertas piden «presentar a público no técnico» (Reale, ICF…)
- Al terminar: un **informe-producto** para tu portafolio
- Caso: **TiendaSur**

---

# Mapa del módulo

1. Métrica norte y árbol
2. Guardarraíles
3. Storytelling
4. Gráficos que convencen (y engañan)
5. Dashboards
6. Escribir para ejecutivos
7. Presentar a no técnicos
8. Make or buy

---

# 8.1 · Métrica norte

> Resume el **valor para el cliente** y, si crece, crece el negocio

- Comprensible · accionable · comparable · difícil de falsear
- Cuidado con las **métricas de vanidad**
- Escribe su **definición** antes de calcularla

---

# 8.1 · Árbol de métricas

```
ingresos netos =
  clientes activos      (captación)
× pedidos por cliente   (fidelización)
× valor medio pedido    (catálogo y precios)
× (1 − devoluciones)    (calidad y logística)
```

Oct → nov: **+93 %** = clientes 86 % · pedidos/cliente 17 % · valor medio 1 % · devoluciones −4 %

---

# 8.2 · Guardarraíles

**Ley de Goodhart:** una medida usada como objetivo deja de ser buena medida

Lanzar solo si:
1. La principal **mejora** con evidencia
2. **Ningún** guardarraíl se rompe

*Envío gratis: +0,21 € por visitante… pero −0,14 € de margen → no lanzar tal cual*

---

# 8.3 · De exploración a comunicación

| | Exploración | Comunicación |
|---|---|---|
| Título | «Ventas por canal» | **La conclusión** |
| Color | muchos | **uno de énfasis** + grises |
| Leyenda | al lado | **directa** |
| Contenido | todo | solo lo que apoya |

---

# 8.3 · Estructura de la historia

1. **Contexto:** a quién ayuda y qué decide
2. **Tensión:** el hallazgo que cambia lo que creíamos
3. **Resolución:** propuesta y petición

Una idea por diapositiva, titulada con la conclusión

---

# 8.4 · Cuatro engaños clásicos

1. **Eje truncado** en barras
2. **Eje doble**
3. **Ventana** temporal escogida
4. **Correlación espuria**

(+ áreas mal escaladas, tartas con 9 porciones, incertidumbre omitida)

---

# 8.4 · Factor de mentira

$$\text{factor} = \frac{\text{cambio visual}}{\text{cambio real}}$$

- Eje desde 3,05 con 3,10 % → 3,20 %: **factor 62**
- Eje desde 0: **factor 1,0**
- Aceptable: 0,95 – 1,05

---

# 8.4 · Antes de publicar

- [ ] ¿El título dice la conclusión?
- [ ] ¿Barras desde cero?
- [ ] ¿Unidades, periodo y fuente?
- [ ] ¿Un solo énfasis?
- [ ] ¿Legible en blanco y negro?
- [ ] ¿Se lo he enseñado a alguien ajeno?

---

# 8.5 · Dashboards

- **Una pregunta, una persona**
- Lo importante arriba a la izquierda, con comparación
- KPIs → tendencia → desglose → detalle
- **Guardarraíles** visibles con su umbral
- **Quitar antes de añadir**
- Responsable, fuente única y fecha de revisión

---

# 8.5 · Nuestro dashboard

- 4 KPIs con variación respecto al mes anterior
- Tendencia de ingresos netos
- Ventas por canal (último mes)
- Devoluciones frente al **umbral del 7 %**

*Plotly → un único `dashboard.html`*

---

# 8.6 · Pirámide de Minto

```
        Recomendación
      /       |       \
  Razón 1  Razón 2  Razón 3     ← con números
```

**Primero la respuesta.** El directivo decide leyendo el principio

---

# 8.6 · El memo de una página

1. **Recomendación** (con la acción)
2. **Por qué:** 3 razones con números
3. **Riesgos** y cómo se controlan
4. **Decisión que necesito** y **fecha**

≤ 350 palabras · sin jerga · voz activa

---

# 8.7 · Traducir la estadística

| Técnico | Para negocio |
|---|---|
| «Dif. 0,007, IC95 [0,002; 0,012], p = 0,003» | «De cada 1.000 visitantes, **47** compran con la versión nueva y **40** con la actual; la diferencia real está entre **2 y 12** más» |

Frecuencias naturales · incertidumbre en una frase · una decisión

---

# 8.7 · Charla de 10 minutos

| Min | Contenido |
|---|---|
| 0–1 | Decisión y recomendación |
| 1–3 | Por qué importa |
| 3–7 | Tres razones |
| 7–9 | Riesgos |
| 9–10 | Qué necesito y para cuándo |

Prepara las **preguntas difíciles**

---

# 8.8 · Make or buy

1. **Matriz ponderada:** discute los pesos, no las opiniones
2. **TCO a 3 años:** construir vs comprar
3. **Sensibilidad:** ¿qué hipótesis invierte la decisión?

*Ejemplo: 25 usuarios → comprar · 100 usuarios → construir*

---

# Caso práctico

**Informe-producto** para una persona que decide:

1. Memo de una página (pirámide)
2. Árbol de métricas + guardarraíles
3. Tres gráficos honestos + uno engañoso medido
4. Dashboard
5. Guion de 10 minutos

---

# Llévate esto

1. Una métrica norte, con **guardarraíles**
2. **Título = conclusión**
3. Si el eje no empieza en 0, **mides el factor de mentira**
4. **Primero la respuesta**
5. Frecuencias naturales, no p-valores
6. Make or buy: **sensibilidad**
