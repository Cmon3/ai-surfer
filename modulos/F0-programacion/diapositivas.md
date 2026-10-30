---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# F0 · Fundamentos de programación
## Lo común a Python, JavaScript, Java y C++

*AI Surfer · N1 Fundamentos*

---

# La idea del módulo

**Los conceptos se transfieren. La sintaxis se consulta.**

- Variables · condiciones · bucles · funciones · colecciones · errores
- Cada concepto, en 4 lenguajes a la vez
- El mismo programa da la misma salida en los 4

---

# Mapa del módulo

1. Qué es programar
2. Variables, tipos y operadores
3. Condicionales
4. Bucles
5. Funciones
6. Listas y diccionarios
7. Errores y depuración
8. Aprender un lenguaje nuevo

---

# F0.1 · Dos preguntas para cada lenguaje

| | Ejecución | Tipos |
|---|---|---|
| Python | Interpretado | Dinámico |
| JavaScript | Compilado sobre la marcha | Dinámico |
| Java | Máquina virtual | Estático |
| C++ | Compilado | Estático |

**Trazar:** seguir el programa a mano anotando cada variable

---

# F0.2 · Una variable, cuatro lenguajes

| Lenguaje | Código |
|---|---|
| Python | `precio = 12.5` |
| JavaScript | `const precio = 12.5;` |
| Java | `double precio = 12.5;` |
| C++ | `double precio = 12.5;` |

Con tipado estático, se declara el tipo

---

# Tres trampas universales

- `7 / 2` → `3` en Java y C++, `3.5` en Python y JavaScript
- `0.1 + 0.2` → `0.30000000000000004` en los cuatro
- `=` guarda, `==` compara; en JavaScript usa `===`

**Dinero:** céntimos enteros o tipo decimal

---

# F0.3 · Decidir

```python
if importe > 50:          # Python: sangría
    envio = 0
else:
    envio = 4
```

```javascript
if (importe > 50) {       // JS, Java, C++: llaves
  envio = 0;
} else {
  envio = 4;
}
```

Y/O/NO: `and or not` · `&& || !`

---

# F0.4 · Repetir

```python
for importe in importes:         # Python
    total += importe
```

```java
for (double importe : importes) {   // Java y C++
    total += importe;
}
```

**Trampas:** uno de más · bucle infinito · modificar lo que recorres

---

# F0.5 · Funciones

- Entradas → **parámetros** · salida → **`return`**
- `print` enseña; `return` entrega
- Las variables internas no existen fuera (**ámbito**)
- Una función, una responsabilidad, un buen nombre

---

# F0.6 · Lista o diccionario

| Tu pregunta | Usa |
|---|---|
| ¿Qué hay en la posición 3? | Lista |
| ¿Cuánto vale esta clave? | Diccionario |
| ¿Ya he visto este elemento? | Diccionario o conjunto |

Buscar en lista **O(n)** · en diccionario **O(1)**

---

# F0.7 · Tres tipos de error

| Tipo | Cuándo |
|---|---|
| Sintaxis | Antes de ejecutar |
| Ejecución | Con el programa en marcha |
| Lógica | Nunca avisa |

**Depurar:** reproducir → hipótesis → comprobar → arreglar la causa

---

# F0.8 · Aprender un lenguaje nuevo

1. Imprimir, variables, funciones
2. Compilado o no, tipos
3. Listas y diccionarios
4. Errores y pruebas
5. Dependencias

Y traducir un programa que ya conozcas

---

<!-- _class: lead -->
# Entregable

Traduce `ventas.py` a un lenguaje nuevo
**La salida debe coincidir exactamente**
