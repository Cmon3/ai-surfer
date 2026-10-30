# Módulo EP1 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh EP1`. Graba siempre resolviendo en directo sobre la página de ejercicios, pensando en voz alta: es la conducta que se quiere enseñar.

## EP.1 · El método (15 min)
- [0–3] Gancho: dos candidatos con el mismo código; uno pasa porque explica lo que hace.
- [3–11] Los seis pasos aplicados a `dos_sumas`, sin saltarse ninguno.
- [11–15] Qué hacer si te quedas en blanco. Procesos con y sin asistente de IA (remitir a CAR.4).

## EP.2 · Complejidad (15 min)
- [0–5] Tabla de órdenes con n = 1 millón: por qué O(n²) es inviable.
- [5–11] Calcular el coste de tres fragmentos. La búsqueda en lista dentro de un bucle.
- [11–15] Memoria: cambiar espacio por tiempo.

## EP.3 · Tablas hash y conjuntos (15 min)
- [0–10] `dos_sumas` paso a paso: cambiar la pregunta.
- [10–15] `primer_repetido`: cuándo basta un conjunto.

## EP.4 · Pilas y búsqueda binaria (15 min)
- [0–7] `equilibrado` y por qué es LIFO.
- [7–15] `buscar`: invariante de la zona, `<=` y `+ 1`/`- 1`. Provocar un bucle infinito quitando el `+ 1`.

## EP.5 · Ventana deslizante y dos punteros (15 min)
- [0–8] `mejor_racha`: dibujar la ventana y ver qué entra y qué sale.
- [8–15] `fusionar`: dos punteros y el resto de la lista.

## EP.6 · Ordenar, contar e intervalos (15 min)
- [0–7] `top_k`: clave compuesta y empates.
- [7–15] `fusionar_turnos`: por qué ordenar simplifica, y el caso del turno contenido.

## EP.7 · Grafos y programación dinámica (20 min)
- [0–10] `saltos`: capas, cola y cuándo marcar visitado.
- [10–20] `menos_monedas`: fallo del voraz, tabla `mejor[x]` rellenada a mano.

## EP.8 · SQL y pandas (15 min)
- [0–8] Top-N por grupo: por qué `LIMIT` no sirve y por qué se filtra fuera de la CTE.
- [8–15] `top_clientes`: granularidad, agregar primero y resolver.
