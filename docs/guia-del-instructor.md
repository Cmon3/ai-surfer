# Guía del instructor y de los mentores

## Roles del equipo docente

| Rol | Responsabilidades | Dedicación por cohorte de 100 estudiantes |
|---|---|---|
| **Director/a académico/a** | Contenidos, grabación de vídeos, calidad del programa, casos difíciles | 4–6 h/semana durante la edición (más la producción inicial) |
| **Mentores** (1 por cada 25 estudiantes) | Sesión en vivo semanal, corrección de entregas, revisiones del proyecto final | 5–6 h/semana cada uno |
| **Coordinador/a de programa** | Calendario, comunicaciones, seguimiento de estudiantes en riesgo, soporte de la plataforma | 8–10 h/semana |

## Sesión en vivo semanal (90 minutos)

Estructura recomendada:

| Minutos | Bloque | Descripción |
|---|---|---|
| 0–10 | Bienvenida | Repaso de los 3 conceptos clave de la semana con una pregunta rápida (encuesta) |
| 10–30 | Dudas | Dudas recogidas en el foro durante la semana, ordenadas por votos |
| 30–75 | Caso en grupo | Grupos de 4–5 personas en salas separadas trabajan una pregunta del caso; el mentor rota por las salas |
| 75–85 | Puesta en común | Cada grupo comparte su conclusión en 1 minuto |
| 85–90 | Cierre | Qué se entrega el domingo y avance de la semana siguiente |

**Buenas prácticas**
- Comparte el notebook ejecutado antes de la sesión; no programes en directo más de 10 minutos seguidos.
- Pide siempre la **conclusión de negocio**, no solo el número.
- Graba la sesión para quien no pueda asistir.

## Notas didácticas por módulo

| Módulo | Dificultades habituales | Sugerencia para la sesión en vivo |
|---|---|---|
| 00 Python | Entorno de trabajo, errores de indentación, `SettingWithCopyWarning` | Dedica los primeros 20 minutos a resolver problemas de instalación; recomienda Colab a quien se atasque |
| 01 Estadística | Interpretar intervalos de confianza; confundir desviación típica y error estándar | Juego: cada grupo construye un IC con su muestra y se comprueba cuántos contienen el valor real |
| 02 Clustering | Esperar que exista un *k* «correcto»; sobreinterpretar t-SNE | Debate: dos grupos presentan segmentaciones con *k* distinto y el resto decide cuál usaría marketing |
| 03 Regresión | Interpretar coeficientes como causales; evaluar en el conjunto de entrenamiento | Mostrar un modelo con R² = 0,99 en train y pésimo en test |
| 04 Clasificación | Usar exactitud con clases desbalanceadas; malinterpretar el p-valor | Role play: el grupo «médico» y el grupo «gerente» negocian el umbral |
| 05 Deep learning | Formas de los tensores; expectativas irreales sobre su rendimiento | Comparar coste/beneficio frente al modelo clásico |
| 06 Recomendación | Confundir mejor RMSE con mejor negocio | Diseñar en grupo la prueba A/B de un recomendador |
| 07 Redes | Elegir la centralidad sin pensar en la pregunta | Cada grupo recibe una pregunta (difundir, bloquear, encontrar puentes) y elige centralidad |
| 08 Series temporales | Particiones aleatorias; no comparar con el ingenuo | Concurso de pronósticos: gana quien más bata al ingenuo en el backtesting |
| 09 IA generativa | Confiar en respuestas sin verificar; enviar datos sensibles | Ataque y defensa: un grupo diseña inyecciones de instrucciones, otro el prompt de sistema |

## Corrección de entregas
- Plazo de corrección: 7 días como máximo.
- Usa los criterios del README de cada módulo y deja **un comentario positivo, uno de mejora y una pregunta** en cada entrega.
- Calibración: al inicio de cada módulo, los mentores corrigen las mismas 3 entregas y comparan notas para unificar criterios.

## Seguimiento de estudiantes
- Considera en riesgo a quien no entregue dos semanas seguidas o no acceda a la plataforma en 10 días: el coordinador le escribe personalmente.
- La semana 7 sirve para recuperar entregas atrasadas.
- Las tasas de finalización de los cursos online mejoran mucho con contacto humano regular: no lo subestimes.

## Mantenimiento del material entre ediciones
- Ejecuta `python scripts/ejecutar_notebooks.py` tras actualizar dependencias.
- Revisa el modelo de IA del módulo 09 (constante `MODELO`) y los precios de la API.
- Recoge el feedback de la encuesta final y actualiza al menos un caso práctico por edición.
