# AI Surfer · web

Sitio estático (Astro 7) que presenta el curso y hace interactivo su contenido. **La fuente de verdad es el repositorio**:
los módulos viven en `../modulos/`, los itinerarios en `../itinerarios/`, y la web los lee en tiempo de *build*. No hay base de datos ni servidor:
el progreso del alumno se guarda en `localStorage` del navegador (fase 1 del [plan v3](../docs/plan-v3-plataforma-y-empleabilidad.md); las cuentas llegarán en la fase 2).

## Qué hay

| Ruta | Qué es |
|---|---|
| `/` | Portada: itinerarios con progreso, rutas por rol y lista de espera |
| `/itinerarios/<slug>/` | Un itinerario con sus módulos |
| `/rutas/` | Las 5 rutas por rol (módulos aún sin publicar marcados «en preparación») |
| `/modulos/<codigo>/` | README del módulo, botón «marcar completado» y enlaces a lo siguiente |
| `/modulos/<codigo>/apuntes/` | Apuntes (`apuntes.md`) y enlace a Colab |
| `/modulos/<codigo>/cuestionario/` | Cuestionario **interactivo** con corrección inmediata (o el Markdown tal cual si no se puede interpretar) |
| `/modulos/<codigo>/ejercicios/` | Ejercicios de código que se ejecutan **en el navegador** (solo módulos con `ejercicios.yml`) |
| `/prueba-de-nivel/` | Test + 3 retos de código para recomendar por dónde empezar |
| `/mi-progreso/` | Resumen del progreso guardado en este navegador |

## Comandos

Requiere Node ≥ 22.23.4 (ver `engines` en `package.json`).

```bash
cd web
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/ y falla si un ejercicios.yml está mal formado
npm run preview    # sirve dist/

npm run verificar:ejercicios   # soluciones de referencia con el Python del ../.venv
npm run verificar:pyodide      # las mismas soluciones, con el Pyodide REAL (descarga paquetes del CDN)
```

## Estructura

```
web/
├── public/ejercicios/
│   ├── harness.py          # arnés de corrección (Python): lo usan el navegador Y los scripts de verificación
│   └── worker.js           # Web Worker que carga Pyodide y ejecuta el arnés
├── scripts/
│   ├── verificar_ejercicios.py          # soluciones vs tests, con el Python local (lo ejecuta el CI)
│   └── verificar_ejercicios_pyodide.mjs # lo mismo con Pyodide (CI semanal)
└── src/
    ├── config.ts           # ← repositorio, correo de la lista de espera, versión de Pyodide
    ├── data/
    │   ├── catalogo.ts     # itinerarios y módulos (código, carpeta, estado)
    │   ├── rutas.ts        # rutas por rol (solo códigos; título y estado salen del catálogo)
    │   ├── ejercicios.ts   # lee y valida modulos/*/ejercicios.yml
    │   ├── cuestionario.ts # parser de cuestionario.md
    │   ├── modulos-md.ts   # lee los Markdown de los módulos
    │   └── prueba-nivel.ts # preguntas de la prueba de nivel
    ├── components/         # MotorEjercicios, ListaEspera
    ├── scripts/            # lado cliente: motor-ejercicios.ts, motor-cuestionario.ts
    ├── layouts/ pages/ styles/
```

## Configuración: un solo sitio

Todo lo que depende de decisiones pendientes está en **`src/config.ts`**:

- `REPO_USUARIO` / `REPO_NOMBRE` / `REPO_RAMA`: de aquí salen los enlaces a Colab. Mientras `REPO_USUARIO` valga el marcador `TU-USUARIO`,
  esos enlaces **no funcionan**. Cámbialo cuando exista el repositorio público (plan v3, D8).
- `LISTA_ESPERA_EMAIL`: buzón de la lista de espera. Sin backend: el formulario abre el correo del visitante con un mensaje ya escrito (`mailto:`).
  Vacío = el bloque aparece como «pendiente de configurar» y el botón desactivado.
- `PYODIDE_VERSION`: versión **fijada** de Pyodide servida desde `cdn.jsdelivr.net`.

## Añadir un módulo

1. Crea `../modulos/<Codigo>-<nombre>/` con `README.md` (obligatorio), `apuntes.md`, `cuestionario.md`, `notebook.ipynb`…
2. Añádelo a `src/data/catalogo.ts` con `estado: "disponible"` y su `carpeta`. Aparecerán solos sus páginas, el cuestionario y los ejercicios si existen.
3. Si es de una ruta por rol, comprueba que su código figura en `src/data/rutas.ts` (los códigos que no estén en el catálogo se muestran «en preparación»).

## Ejercicios en el navegador

Cada módulo puede incluir `modulos/<carpeta>/ejercicios.yml`. La página `/modulos/<codigo>/ejercicios/` se genera sola.

```yaml
intro: |                      # Markdown opcional que se muestra arriba
  Texto de presentación.

ejercicios:
  - id: f1-ticket-medio       # único dentro del módulo (es la clave del progreso)
    titulo: Ticket medio con funciones
    nivel: Básico             # opcional: insignia
    tipo: python              # python (por defecto) | sql
    paquetes: [numpy, pandas] # opcional: se cargan bajo demanda (scikit-learn, scipy…)
    setup: |                  # opcional, oculto: datos de partida. Sus variables las ven código y tests
      import pandas as pd
      ventas = pd.DataFrame({...})
    enunciado: |              # Markdown
      Escribe `ticket_medio(importes)`…
    inicial: |                # código inicial del editor
      def ticket_medio(importes):
          pass
    tests:
      - {expr: "ticket_medio([10, 20])", esperado: "15"}            # esperado = literal de Python
      - {expr: "...", esperado: "7.58", tol: 0.001}                  # tolerancia numérica (también en listas, dicts…)
      - asserts: |                                                   # o un bloque Python con `assert`
          assert ticket_medio([]) == 0, "lista vacía"
        nombre: "Maneja la lista vacía"
      - {expr: "...", esperado: "...", oculto: true}                 # no muestra el esperado si falla
    pistas:                   # graduadas: de la más vaga a la más concreta (Markdown en línea)
      - "Pista 1…"
      - "Pista 2…"
      - "Pista 3…"
    solucion: |               # solución de referencia: NO se publica; la usan los scripts de verificación
      def ticket_medio(importes): ...
```

Detalles útiles:

- **Tests con `expr`/`esperado`** comparan `eval(expr) == literal_eval(esperado)`; listas/arrays/tuplas se normalizan (un `np.ndarray` equivale a una lista) y `tol` se aplica a los números anidados.
- **Ejercicios SQL (`tipo: sql`)**: el alumno escribe una sentencia `SELECT`. El `setup` debe crear la conexión `con` (`sqlite3` en memoria); los tests ven `filas` (lista de tuplas) y `columnas`. La web carga el paquete `sqlite3` de Pyodide automáticamente para los ejercicios `tipo: sql`.
- **YAML y números:** escribe `tol: 0.000001`, no `1e-6` (PyYAML lo lee como texto, aunque la web no).
- Al **ejecutar** se usa un *Web Worker* con un Pyodide compartido por todos los ejercicios de la página; si el código tarda más de `EJERCICIOS_TIMEOUT_S` segundos (bucle infinito) se mata el Worker y se reinicia. Toda la salida se inserta con `textContent`, nunca como HTML.
- **Progreso:** `localStorage["ejercicios:<CODIGO>"]` guarda por ejercicio si está superado, el último código escrito y las pistas vistas. Todo va envuelto en `try/catch`: sin almacenamiento, funciona igual pero sin recordar.
- Los tests viajan al navegador (se puede mirar el código fuente): sirven para aprender, no para evaluar con nota. La evaluación formal será en el servidor (fase 2).

### Cómo se verifica un ejercicio nuevo

1. `../.venv/bin/python scripts/verificar_ejercicios.py [CARPETA]` (o `npm run verificar:ejercicios`): la `solucion` debe pasar todos los tests **y** el `inicial` no debe pasarlos. El CI lo ejecuta en cada push.
2. `npm run verificar:pyodide [-- CARPETA]`: lo mismo dentro de Pyodide, por si las versiones de NumPy/pandas/scikit-learn del navegador difieren de las de tu `.venv`.
3. Calcula los valores esperados **de forma independiente** (a mano, con otra librería) y no copies la salida de tu propia solución: así lo hicimos con los A/B (contrastado con `statsmodels`) o las consultas SQL (recalculadas con Python puro).

### Actualizar Pyodide (D11)

1. Elige una versión estable en <https://www.npmjs.com/package/pyodide> con al menos dos semanas de antigüedad.
2. Cambia `PYODIDE_VERSION` en `src/config.ts` **y** el `devDependency` `pyodide` de `package.json` (exacto, sin `^`): `verificar_ejercicios_pyodide.mjs` falla si no coinciden.
3. `npm install && npm run verificar:pyodide`. Si algún ejercicio falla, ajusta el ejercicio (no el arnés) o fija las versiones que importan.

> Pyodide está fijado en la 0.28.3. La 314.x pasa la verificación en Node pero **no carga en un Web Worker del navegador** (comprobado en Chrome, oct. 2026): antes de subir de versión, prueba siempre un ejercicio en un navegador real.

## Cuestionarios interactivos

`src/data/cuestionario.ts` interpreta `cuestionario.md` en el formato del módulo modelo (`modulos/I8-produccion/`):

```markdown
**1.** Enunciado…
- a) opción
- b) opción
…
<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | b | Explicación. |
</details>
```

También entiende las variantes de los módulos antiguos (opciones sin guion, `### Pregunta N`, solucionario en línea `1. **b** 2. **c**…`,
párrafos `**N → b.** explicación`…). Si no consigue interpretar el archivo (nº de preguntas, opciones o respuestas que no cuadran), la página muestra el
Markdown tal cual, como antes. El progreso del cuestionario se guarda en `localStorage["cuestionario:<CODIGO>"]`.

## CI y despliegue

- `.github/workflows/curso.yml` (cada push/PR): notebooks de los módulos tocados, soluciones de los ejercicios y `npm run build`.
- `.github/workflows/curso-semanal.yml`: todo lo anterior con dependencias recién resueltas, más la verificación con Pyodide real.
- **Despliegue público: pendiente** (plan v3, fase 1b, punto 4). Es una web estática: vale Vercel o GitHub Pages sirviendo `dist/`. Si se publica bajo un subdirectorio,
  define `base` en `astro.config.mjs`; hoy los enlaces internos son absolutos desde la raíz del dominio.
- Analítica respetuosa con la privacidad: pendiente.
