---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# F5 · Herramientas del oficio
## Terminal · Git · GitHub · venv · Notebooks

*AI Surfer · N1 Fundamentos*

---

# Mapa del módulo

1. La terminal sin miedo
2. Git (el 90 %)
3. Ramas y PR
4. GitHub
5. Entornos (venv)
6. Notebooks que salvan

---

<!-- _class: lead -->
# La terminal

## 3 comandos para moverse: pwd · ls · cd
## 4 para leer: cat · head · tail · wc

---

# Pipes: el superpoder

```bash
cat datos.csv | head -100 | wc -l
grep "Madrid" clientes.csv > madrid.csv
```

Un pipe encadena herramientas: cada una hace una cosa y la hace bien.

---

<!-- _class: lead -->
# Git

## Un "guardar como" con memoria perfecta

---

# El flujo del 90 %

```bash
git init          # una vez
git add fichero   # preparar
git commit -m "…"  # guardar
git log --oneline # revisar
```

Y `git status` siempre antes de commitear.

---

# Ramas: no rompes lo estable

```
main ──●────●────●── (estable)
        \
         ●─●  feature (experimentos)
              └── git merge → main
```

- `git switch -c feature-x` para crear
- PR para revisar antes de mezclar

---

# Conflicto de merge

Git marca el trozo con `<<<<<<<` y `>>>>>>>`.
No es error: es una **petición** para que tú decidas.

---

# GitHub

- El repo es la cara del proyecto: **README** con qué/cómo/ejemplo.
- push/pull para sincronizar.
- **PR** para cambios revisados (incluso en proyectos propios).

---

<!-- _class: lead -->
# Entornos virtuales

## Un venv por proyecto: nunca pip global

---

# venv en 3 comandos

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

`pip freeze > requirements.txt` al terminar — es el "contrato" del proyecto.

---

# Notebooks que salvan

1. Restart & Run All antes de entregar
2. Clear outputs antes de commitear
3. Semillas fijas (`default_rng(42)`)
4. Secciones markdown con la pregunta de negocio
5. Celda de conclusiones al final

---

<!-- _class: lead -->
# Resumen

**Terminal → Git → GitHub → venv → notebook reproducible**

Con esto tu trabajo es reproducible, revisable y compartible.
