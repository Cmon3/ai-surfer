# Módulo AI7 · Inferencia y despliegue

**Semana 11 de N3-AI · ~10 horas** · Del checkpoint al servicio: qué pasa dentro de un servidor de LLM (prefill, decode, KV-cache, batching), cómo se cuantiza, cuánta memoria hace falta, cuánto cuesta cada millón de tokens y cómo se prueba que aguanta carga. Es el módulo que respalda la línea de CV «despliegue y optimización de LLM (vLLM, cuantización)», un plus salarial en el nicho de ingeniería de modelos.

## Objetivos
Al terminar este módulo podrás:
- Distinguir **prefill** y **decode**, y medir **TTFT**, tokens/s y latencia p95 de un modelo.
- Implementar una **KV-cache** de verdad, comprobar que da la misma salida y medir cuánto acelera (y por qué el coste pasa de O(t²) a O(t) por paso).
- Explicar el **batching** y el ***continuous batching***, y simularlo con una cola para ver el efecto en TTFT y aprovechamiento.
- Cuantizar a **int8 y 4 bits a mano**, con escala global, por canal y por grupos, y medir el **error numérico y la calidad** del modelo.
- **Estimar la memoria** de pesos y de KV-cache de un modelo de 7–8 B con contexto largo, y cuántas peticiones simultáneas caben en una GPU.
- Calcular el **coste por millón de tokens** de servir tú mismo frente a una API, incluida la utilización de equilibrio.
- Hacer una **prueba de carga** a una API FastAPI local (sin servidores colgados) y leer la curva peticiones/s frente a p95.
- Levantar **vLLM en Colab** (esqueleto) sabiendo qué mirar y qué comprobar de la versión.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 7.1 | Anatomía de la inferencia: prefill, decode y las métricas que importan (TTFT, tokens/s, p95) | 15 min |
| 7.2 | La KV-cache: qué se guarda, qué se ahorra y cuánto ocupa | 20 min |
| 7.3 | Batching, *continuous batching* y PagedAttention | 20 min |
| 7.4 | Cuantización: int8, 4 bits, escalas por canal y por grupo, y cómo se mide la calidad | 20 min |
| 7.5 | Presupuesto de memoria: pesos + KV-cache + GQA | 15 min |
| 7.6 | Servir en producción: vLLM, API, pruebas de carga y alertas | 20 min |
| 7.7 | Coste y decisión: servir tú o usar una API | 15 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección y glosario |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; el PDF se genera con `scripts/generar_diapositivas.sh`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada en CPU: KV-cache, batching, cuantización, memoria, coste y prueba de carga |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Documentación, papers y cursos gratuitos |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) — entrenamos en segundos un Transformer diminuto y construimos con él **las piezas de un servidor de inferencia**:
1. KV-cache implementada en el propio modelo, verificada (misma salida con y sin caché) y cronometrada.
2. Batching: tokens/s totales frente a tokens/s por usuario, y TTFT frente a longitud de prompt.
3. *Continuous batching* simulado con una cola de 80 peticiones de longitud desigual.
4. Cuantización int8/int4 a mano (con empaquetado de 4 bits) y su efecto sobre la calidad.
5. Memoria de KV-cache de modelos de 7–8 B con contextos de 8k a 128k y número de peticiones que caben en 24 y 80 GB.
6. Coste por millón de tokens propio frente a API y utilización de equilibrio.
7. Prueba de carga a una API FastAPI con `TestClient` y `httpx` (sin abrir puertos) y esqueleto de **vLLM en Colab**.

**Requisitos:** `requirements.txt` del curso (PyTorch, FastAPI, httpx, matplotlib). Todo corre en CPU en unos minutos y **sin clave de API**. Los tiempos absolutos dependen de tu máquina; las formas de las curvas, no.

## Notas de cómputo
- La parte de GPU (vLLM) está como esqueleto comentado para Colab (T4 gratuita): el resto del notebook no depende de él.
- vLLM cambia de versión con frecuencia: anota la versión que instales y comprueba su documentación vigente.

## Caso práctico (entregable)
**Informe de despliegue de un modelo abierto pequeño** (puedes usar el del AI5 o `Qwen2.5-0.5B-Instruct` en Colab). El informe incluye:
1. Medidas de **TTFT, tokens/s y p95** con 1, 8 y 32 peticiones concurrentes (con tu propio servicio o con vLLM en Colab), y qué ocurre con la curva.
2. Una **comparación de cuantización**: modelo original frente a una variante cuantizada, con calidad medida sobre tu conjunto de evaluación del AI4 (no solo tamaño).
3. Un **presupuesto de memoria** (pesos + KV-cache) para tu modelo y un contexto objetivo, con el número de peticiones simultáneas que caben en una GPU concreta.
4. Una **tabla de coste** por millón de tokens con tus supuestos explícitos y la utilización de equilibrio frente a una API; recomendación razonada: ¿servir o comprar?

**Criterios:** medidas correctas y reproducibles 30 % · calidad evaluada tras cuantizar 25 % · presupuesto de memoria y de coste con supuestos explícitos 25 % · recomendación y limitaciones honestas 20 %.

> Pieza de portafolio: un README con gráficas de latencia/throughput y una tabla de coste demuestra criterio de ingeniería, no solo «sé lanzar vLLM».

## Autoevaluación
1. ¿Por qué un batch mayor sube el throughput total pero baja los tokens/s que ve cada usuario?
2. ¿Qué cálculo evita la KV-cache y qué paga a cambio?
3. ¿Por qué cuantizar los pesos a 4 bits no soluciona un servidor que se queda sin memoria con contextos largos?
4. Tu servicio tiene buen throughput pero los usuarios dicen que «tarda en empezar a responder». ¿Qué miras y qué tocas?
5. Tu GPU alquilada cuesta 2 €/h y sirve 1500 tokens/s agregados. ¿Qué dos cosas necesitas saber para decidir si sale más barato que una API?

<details><summary>Respuestas</summary>

1. Porque una lectura de los pesos sirve a varias peticiones (más tokens por segundo en total), pero cada paso de decodificación procesa más trabajo y cada petición avanza más despacio. Es un compromiso entre coste (throughput) y experiencia (velocidad individual).
2. Evita recalcular las claves y valores de todo el prefijo en cada paso: el coste por paso baja de O(t²) a O(t). A cambio ocupa memoria que crece con la longitud de contexto, las capas, las cabezas KV y el número de peticiones activas.
3. Porque la KV-cache es otra memoria distinta de los pesos: depende del contexto y de la concurrencia. Cuantizar pesos libera VRAM, pero con contextos largos hay que reducir también la caché (8 bits), usar GQA, limitar contexto o repartir en más GPU.
4. El **TTFT**, que depende del prefill (longitud del prompt) y de la espera en cola. Se mejora con *streaming*, prefix caching, prompts más cortos, *continuous batching*, más capacidad o limitando la concurrencia por réplica.
5. La **utilización** real (fracción del tiempo con carga) y el **precio de la API** en tu mezcla de tokens de entrada/salida. Además, los costes que no salen en la factura de la GPU: redundancia, guardias e ingeniería.
</details>

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: la documentación de vLLM, el paper de PagedAttention y la guía visual de cuantización de Maarten Grootendorst.
