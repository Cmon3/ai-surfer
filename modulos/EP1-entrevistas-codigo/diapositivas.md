---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# EP1 · Entrevistas de programación guiadas
## Pocos patrones, muchas repeticiones

*AI Surfer · Transversal*

---

# Cómo se trabaja

1. **Guiado:** la explicación al lado de tu casilla
2. **Comprobado:** pruebas reales sobre tu programa
3. **Modo reto:** de memoria, sin referencia

Reconocer una solución no es poder escribirla

---

# EP.1 · El método

1. **Entender:** reformula y pregunta límites
2. **Ejemplos:** uno a mano y un caso límite
3. **Fuerza bruta:** dila y da su coste
4. **Optimizar:** ¿qué trabajo se repite?
5. **Escribir:** contando lo que haces
6. **Probar:** a mano, y da la complejidad

---

# EP.2 · Complejidad

| Orden | Ejemplo | n = 1 millón |
|---|---|---|
| O(1) | Clave en diccionario | 1 |
| O(log n) | Búsqueda binaria | ~20 |
| O(n) | Recorrer | 1 millón |
| O(n log n) | Ordenar | ~20 millones |
| O(n²) | Todos con todos | 1 billón |

---

# Chuleta de patrones (I)

| Pista | Patrón |
|---|---|
| ¿existe? ¿repetido? ¿pareja? | Tabla hash |
| anidado, abrir y cerrar | Pila |
| lista ordenada | Búsqueda binaria |
| contigua, k consecutivos | Ventana deslizante |

---

# Chuleta de patrones (II)

| Pista | Patrón |
|---|---|
| dos listas ordenadas | Dos punteros |
| los k más frecuentes | Contar y ordenar |
| rangos, turnos | Ordenar por inicio |
| menos pasos, red | BFS |
| mínimo o «cuántas formas» | Programación dinámica |

---

# EP.3 · Cambia la pregunta

«¿Hay dos que sumen X?» → **«¿He visto ya lo que me falta?»**

```python
for i, precio in enumerate(precios):
    falta = objetivo - precio
    if falta in vistos:
        return [vistos[falta], i]
    vistos[precio] = i
```

O(n²) → O(n)

---

# EP.5 · Ventana deslizante

```python
actual = sum(ventas[:k])
for i in range(k, len(ventas)):
    actual += ventas[i] - ventas[i - k]
```

Entra uno, sale otro: no recalcules

---

# EP.7 · BFS y programación dinámica

**BFS:** por capas; la primera llegada es la más corta

**Programación dinámica:**
- ¿Qué significa `mejor[x]`?
- ¿Cómo sale de casos menores?
- ¿Cuál es el caso base?

---

# EP.8 · Pruebas de datos

- Top-N por grupo → `ROW_NUMBER() OVER (PARTITION BY …)`
- Fila anterior → `LAG()` · `shift()`
- Sin pedidos → `LEFT JOIN … IS NULL`

**Pregunta primero:** ¿qué es una fila?

---

<!-- _class: lead -->
# Entregable

Vídeo de 10 minutos con un problema nuevo
**pensando en voz alta**
