# Módulo 07 · Redes y grafos

**Semana 9 · 6–8 horas**

## Objetivos
- Representar datos relacionales como grafos y calcular sus métricas básicas.
- Medir la importancia de los nodos con distintas centralidades y elegir la adecuada según la pregunta.
- Entender PageRank como paseo aleatorio e implementarlo por iteración de potencias.
- Detectar comunidades con optimización de modularidad y clustering espectral.
- Predecir enlaces futuros con heurísticas de vecindad.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 7.1 | Datos como redes: ejemplos en negocio (fraude, logística, redes sociales) | 10 min |
| 7.2 | Grafos: nodos, aristas, grados, caminos, componentes | 15 min |
| 7.3 | Mundos pequeños y redes libres de escala | 10 min |
| 7.4 | Centralidades: grado, intermediación, cercanía, autovector | 20 min |
| 7.5 | PageRank | 15 min |
| 7.6 | Comunidades: modularidad, Louvain y clustering espectral | 20 min |
| 7.7 | Predicción de enlaces y difusión en redes | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección, para estudiar y repasar |
| [`diapositivas.pdf`](diapositivas.pdf) ([fuente editable](diapositivas.md)) | Diapositivas de los vídeos y de las sesiones en vivo |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada con ejercicios |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable de la semana (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Vídeos y lecturas gratuitas recomendadas para cada lección |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios del notebook |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — el club de kárate de Zachary: métricas de la red, comparación de centralidades, PageRank desde cero, detección de las dos facciones que surgieron tras la ruptura del club usando solo la estructura de amistades, y predicción de enlaces ocultos.

## Caso práctico (entregable)
Informe (máx. 2 páginas) que responda a una de estas preguntas:
- **Difusión (ejercicio 1):** ¿a qué 3 personas contactarías para difundir un mensaje en el club? Compara tu estrategia con una selección aleatoria mediante simulación.
- **Robustez (ejercicio 2):** ¿qué nodos son críticos para que la red siga conectada? Traslada la conclusión a una cadena de suministro.

## Autoevaluación
1. ¿Qué tipo de centralidad usarías para encontrar a un intermediario cuya baja dejaría incomunicados a dos departamentos?
2. ¿Por qué PageRank incluye una probabilidad de «teletransporte»?
3. ¿Qué mide la modularidad?
4. ¿Qué información aporta el vector de Fiedler de la matriz laplaciana?
5. ¿Por qué Adamic-Adar pondera menos a los amigos comunes que tienen muchos contactos?

<details><summary>Respuestas</summary>

1. Intermediación (*betweenness*).
2. Para que el paseo no quede atrapado en nodos sin salida o en grupos cerrados, y para que exista una distribución estacionaria única.
3. Cuánto más densas son las conexiones dentro de los grupos respecto a lo esperable en una red aleatoria con los mismos grados.
4. Su signo divide el grafo en dos partes con pocas aristas entre ellas: es la base del clustering espectral.
5. Porque compartir un contacto muy popular (que conoce a todo el mundo) es poco informativo; compartir uno con pocos contactos sugiere un vínculo más estrecho.
</details>

## Lecturas y recursos
- D. Easley, J. Kleinberg, *Networks, Crowds, and Markets* (gratis en línea) — caps. 1–3 y 14.
- A.-L. Barabási, *Network Science* (gratis: networksciencebook.com) — caps. 2–4 y 9.
- Tutorial oficial de NetworkX.
