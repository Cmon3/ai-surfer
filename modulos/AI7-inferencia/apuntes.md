# Módulo AI7 · Inferencia y despliegue — Apuntes

> Objetivo: que sepas qué hace un servidor de LLM por dentro, qué le limita (casi siempre la **memoria**, no el cálculo) y cómo decidir con números si servir tú el modelo o pagar una API.

---

## 7.1 · Anatomía de la inferencia

Generar texto con un Transformer *decoder* tiene dos fases con comportamientos muy distintos:

| Fase | Qué hace | Limitada por | Métrica |
|---|---|---|---|
| **Prefill** | Procesa el prompt entero de una vez y genera el primer token | **Cálculo** (muchos tokens en paralelo) | **TTFT** (*time to first token*) |
| **Decode** | Genera un token por paso, cada uno depende del anterior | **Ancho de banda de memoria** (para producir un token hay que leer todos los pesos y la KV-cache) | **Tokens/s** o latencia entre tokens (ITL/TPOT) |

Por eso hay dos sensaciones de «rapidez» distintas. Un chat se siente rápido cuando el **TTFT** es bajo (y con *streaming*, el usuario ve texto enseguida); una tarea por lotes solo mira el **throughput** total.

**Métricas que debes poder dar de un servicio:**
- **TTFT** (p50 y p95), **tokens/s por petición** y **tokens/s totales** (*throughput*).
- **Latencia de extremo a extremo** (p50, p95, p99): la media oculta las colas largas.
- **Peticiones por segundo**, **errores**, **longitud de cola** y **uso de la KV-cache**.
- **Coste por millón de tokens** (7.7).

Regla de oro: **mide con tu patrón real** (longitudes de prompt y de salida, concurrencia, mezcla de peticiones). Un benchmark con una frase repetida no dice nada de tu producción.

---

## 7.2 · La KV-cache

En cada capa, la atención de un token nuevo necesita las **claves (K)** y **valores (V)** de todos los tokens anteriores. Sin caché, en el paso *t* se recalculan K y V de los *t* tokens del prefijo: se procesan *t* tokens y cada uno mira hasta *t* claves, es decir **O(t²)** por paso y **O(T³)** para generar *T* tokens en la atención (y, además, las capas lineales y el MLP también reprocesan todo el prefijo).

Con KV-cache se **guardan K y V de los tokens ya procesados** y en cada paso solo se calcula el token nuevo, que atiende a las *t* claves guardadas: **O(t)** por paso y **O(T²)** en total. El ratio entre ambos crece con la longitud (≈ (T+2)/3 en pares consulta-clave: 11× con T=32, unos 170× con T=512).

```python
if cache is not None:
    if "k" in cache:
        k = torch.cat([cache["k"], k], dim=2)     # prefijo guardado + token nuevo
        v = torch.cat([cache["v"], v], dim=2)
    cache["k"], cache["v"] = k, v
```

**Dos comprobaciones obligatorias al implementarla:**
1. **Correctitud:** la salida con y sin caché debe ser idéntica (en el notebook: `torch.equal(...) == True`). Si no, hay un error de posiciones o de máscara.
2. **Forma de la curva:** el tiempo por paso sin caché crece con la longitud; con caché se mantiene casi plano.

**El precio es memoria.** Por token se guarda `2 × capas × cabezas_KV × head_dim × bytes`. Para un modelo tipo Llama de ~8 B con GQA (32 capas, 8 cabezas KV, `head_dim` 128) en fp16 son **128 KiB por token**: una sola petición de 32k tokens ocupa unos **4 GiB** solo de caché. Sin GQA (32 cabezas KV) serían 4× más.

> En producción, la caché de una petición se reutiliza entre peticiones con el mismo prefijo (*prefix caching*): por eso conviene que el prompt de sistema vaya siempre al principio y sea idéntico.

---

## 7.3 · Batching, *continuous batching* y PagedAttention

**Por qué el batching ayuda.** En el decode, el coste dominante es **leer los pesos** de la memoria. Si en una pasada procesas *B* peticiones, esa lectura se reparte entre *B*: el **throughput total** sube casi linealmente al principio. El precio: cada paso es algo más lento, así que la velocidad **por usuario** baja. En el notebook lo ves medido: el total sube con *B* y los tokens/s por usuario bajan.

**Batching estático.** El servidor forma un lote y espera a que **termine la petición más larga** antes de admitir nada nuevo: los huecos de las que acaban pronto se quedan vacíos y las nuevas esperan (TTFT alto).

**Continuous batching** (o *in-flight batching*). El lote se reorganiza **en cada paso**: cuando una petición termina, su hueco se rellena de inmediato con otra de la cola. En la simulación del notebook (80 peticiones, 8 huecos, longitudes muy desiguales) el continuo casi duplica los tokens por paso y reduce el TTFT medio a una fracción.

**PagedAttention** (vLLM). La KV-cache de cada petición crece de forma impredecible; reservar un bloque contiguo del tamaño máximo desperdicia mucha memoria por fragmentación. PagedAttention la divide en **bloques (páginas)** que se asignan según se necesitan, como la memoria virtual de un sistema operativo. No reduce la caché necesaria: **evita desperdiciarla**, y permite compartir bloques entre peticiones con el mismo prefijo.

**Otras técnicas que conviene reconocer:** *chunked prefill* (partir prompts largos para no bloquear el decode de los demás), decodificación **especulativa** (un modelo pequeño propone varios tokens que el grande verifica a la vez), FlashAttention (atención sin materializar la matriz completa) y separar prefill y decode en máquinas distintas en sistemas grandes.

---

## 7.4 · Cuantización

Cuantizar es guardar los números con menos bits. En su forma más simple (**simétrica**):

```
escala   = max|w| / qmax            (qmax = 127 en int8, 7 en int4)
entero   = redondear(w / escala)    # se guarda
w ≈ entero × escala                 # se reconstruye al usar
```

**Memoria:** fp32 → int8 son 4× menos; fp16 → int4, ~4× menos (más las escalas).

**Granularidad (la decisión clave):**
- **Global:** una escala para toda la matriz. Un solo valor extremo fija la escala y destruye la precisión del resto.
- **Por canal (fila):** una escala por canal de salida; aísla los canales con valores grandes.
- **Por grupos** (32–128 valores): una escala por trozo de cada fila; es lo habitual en 4 bits (GPTQ, AWQ, GGUF). Más escalas que guardar, pero mucha menos pérdida.

En el notebook, con un canal 30× mayor, int8 global tiene un error de ~14 % en el resto de filas frente a ~0,5 % por canal.

**Qué se cuantiza:**
- **Solo pesos** (*weight-only*, 4 u 8 bits): lo más común para servir LLM; reduce VRAM y tiempo de carga, y acelera el decode porque se lee menos memoria.
- **Pesos y activaciones** (W8A8, FP8 en GPUs recientes): permite usar unidades de cálculo de enteros/FP8; las activaciones tienen atípicos, de ahí métodos como LLM.int8, SmoothQuant o AWQ.
- **KV-cache** (8 bits): reduce la memoria de la caché, que es el cuello de la concurrencia.

**Formatos y herramientas que verás en ofertas y repositorios:** GPTQ y AWQ (4 bits para GPU), **GGUF** con `llama.cpp`/Ollama (CPU y GPU modestas; nombres tipo `Q4_K_M`), `bitsandbytes` (NF4, el de QLoRA) y FP8. Comprueba qué soporta tu servidor y tu GPU.

**La regla de oro: mide la calidad.** El error numérico de una matriz no es la calidad del modelo. En el juguete, int8 e int4 apenas cambian el acierto y la divergencia (KL) sube poco, pero a 3 y 2 bits la KL se dispara aunque el acierto de una tarea fácil siga intacto: **la KL avisa antes**. Con un modelo real, evalúa con tu **conjunto del AI4** (tus casos difíciles, no un benchmark genérico) y compara con el modelo sin cuantizar antes de desplegar. Toda optimización de inferencia es un cambio de modelo.

**Cuándo no cuantizar:** si el cuello no es la memoria (modelo pequeño que ya cabe de sobra), si la tarea es muy sensible a la precisión numérica, o si no puedes evaluar el efecto.

---

## 7.5 · Presupuesto de memoria

Memoria de una GPU ≈ **pesos + KV-cache + activaciones y huecos**. Como orientación:

```
pesos      ≈ parámetros × bytes por parámetro        (8 B en fp16 → ~16 GB; en 4 bits → ~4–5 GB)
KV-cache   ≈ tokens_en_vuelo × (2 × capas × cabezas_KV × head_dim × bytes)
tokens_en_vuelo ≈ peticiones simultáneas × longitud de contexto
```

Ejemplo (modelo de ~8 B con GQA, contexto de 32k, GPU de 24 GB con el 90 % utilizable): en fp16 apenas cabe **1** petición larga; con pesos en 4 bits caben unas **4**; con KV-cache en 8 bits, unas **8**. Con una GPU de 80 GB, decenas. Los números del notebook son ilustrativos: **mira el `config.json` del modelo que uses** (capas, cabezas KV, `head_dim`).

**Palancas para ganar concurrencia**, de mayor a menor efecto típico con contextos largos:
1. **GQA/MQA** (decisión de arquitectura al elegir el modelo): menos cabezas KV, caché proporcionalmente menor.
2. **Cuantizar la KV-cache** a 8 bits (la mitad).
3. **Cuantizar los pesos** (libera VRAM para caché).
4. **Limitar el contexto máximo** y la concurrencia por réplica; *prefix caching* y recortar prompts.
5. **Más GPU** (paralelismo de tensor) o más réplicas.

---

## 7.6 · Servir en producción

**Opciones de servidor** (comprueba la versión y el estado de cada proyecto antes de elegir):
- **vLLM**: PagedAttention, *continuous batching*, *prefix caching*, API compatible con OpenAI. El estándar de facto para servir en GPU.
- **SGLang**, **TensorRT-LLM**: alternativas con otras optimizaciones; TensorRT-LLM es específico de NVIDIA.
- **llama.cpp / Ollama**: CPU y GPUs modestas, modelos GGUF; ideal para local y prototipos, no para alta concurrencia.
- **Servicios gestionados** (Bedrock, Vertex AI, Azure AI Foundry, Hugging Face Inference Endpoints…): el proveedor opera el servidor (ver CL1).

**Arquitectura mínima de un servicio:**
```
cliente ──► API (FastAPI) ──► cola / límite de concurrencia ──► motor de inferencia (vLLM)
                │                                                  │
            auth, límites, logs                      métricas: TTFT, tokens/s, cola, KV-cache
```
Puntos a cuidar: **límite de concurrencia y de longitud** (evita que una petición larga tumbe a todos), **tiempos de espera**, ***streaming*** de tokens, *health checks* (¿el modelo está cargado?), versión del modelo en cada respuesta y logs sin datos personales (AI8).

**Prueba de carga.** Antes de producción, lanza peticiones concurrentes con tu patrón real y dibuja **peticiones/s frente a p95** para varias concurrencias. Verás tres zonas: carga baja (latencia estable), saturación (el throughput deja de crecer) y colapso (el p95 se dispara o hay errores). En el notebook, la API de juguete con un semáforo de huecos muestra algo contraintuitivo y real: **atender más peticiones en paralelo sin agruparlas en un lote no multiplica el rendimiento** (aquí incluso lo empeora al competir por la CPU); por eso los motores de LLM hacen el batching dentro del motor. Las pruebas de carga se hacen con `TestClient`, `httpx` con transporte ASGI o herramientas como Locust o k6, y **no deben dejar servidores en marcha**.

**Qué vigilar en producción** (conecta con AI8): TTFT p95, tiempo en cola, uso de la KV-cache, tasa de errores y de peticiones rechazadas por límite, coste por petición y **calidad** sobre una muestra.

---

## 7.7 · Coste: ¿servir tú o usar una API?

```
€ por millón de tokens (propio) = coste_hora / (tokens_por_segundo × 3600 × utilización) × 1.000.000
```

Ejemplo del cuestionario: 2 €/h y 3 millones de tokens por hora a plena carga → 0,67 € por millón. Pero **una GPU alquilada cuesta lo mismo esté ocupada o no**: a un 15 % de utilización, el coste efectivo se multiplica por 6,7.

**Procedimiento de decisión:**
1. Mide el **throughput real** de tu modelo y tu patrón de tráfico (no el del anuncio del servidor).
2. Estima la **utilización realista**: las cargas con picos y valles tienen utilización baja.
3. Calcula el **punto de equilibrio** con el precio de la API en tu mezcla de tokens de entrada y salida (suelen cobrarse a precios distintos; comprueba la tarifa vigente de tu proveedor).
4. Suma lo que no sale en la factura de la GPU: **redundancia** (al menos 2 réplicas para disponibilidad), guardias, ingeniería, monitorización, actualizaciones.
5. Compara también la **calidad**: un modelo abierto pequeño cuantizado no equivale a un modelo de frontera. Si necesitas esa calidad, la pregunta cambia.

**Cuándo suele salir a cuenta servir tú:** volumen alto y constante, requisitos de privacidad o de residencia de datos, necesidad de un modelo propio (ajustado, AI5) o latencias muy específicas. **Cuándo no:** tráfico bajo o irregular, equipo pequeño, necesidad de calidad de frontera, o cuando operar el servicio distrae del producto.

---

## Glosario

- **Prefill / decode:** fase de procesar el prompt / fase de generar token a token.
- **TTFT:** tiempo hasta el primer token. **ITL/TPOT:** tiempo entre tokens.
- **Throughput:** tokens (o peticiones) por segundo del servidor entero.
- **KV-cache:** claves y valores guardados de los tokens ya procesados.
- **GQA/MQA:** atención con menos cabezas de claves/valores que de consultas.
- **Continuous batching:** reorganizar el lote en cada paso, rellenando huecos.
- **PagedAttention:** gestionar la KV-cache en bloques para evitar fragmentación.
- **Cuantización:** representar con menos bits (int8, int4…). **Escala:** factor que convierte entero a valor real.
- **Utilización:** fracción del tiempo que el hardware trabaja con carga útil.
- **p95:** valor por debajo del cual está el 95 % de las peticiones.
