# Módulo AI7 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh AI7`. Las demos se hacen con `notebook.ipynb` abierto (ten ya ejecutada la celda de preparación: entrena el modelo en unos segundos). Aviso a quien graba: los tiempos concretos dependen de tu máquina; di siempre «en mi equipo sale esto, mira la forma de la curva».

## 7.1 · Anatomía de la inferencia (15 min)
- [0–2] Gancho: el chat que «piensa» 8 segundos antes de escribir la primera palabra y luego escribe rapidísimo. Dos sensaciones, dos causas.
- [2–7] Prefill frente a decode: una tabla en pantalla (qué limita a cada uno). Idea clave: en decode, cada token obliga a leer todos los pesos.
- [7–12] Métricas: TTFT, tokens/s, p50/p95, throughput. Por qué la media engaña. Demo: tabla TTFT por longitud de prompt del notebook.
- [12–15] Regla de oro: mide con tu tráfico real. Adelanta el entregable.

## 7.2 · La KV-cache (20 min)
- [0–4] Dibujo del paso *t* sin caché: se reprocesan *t* tokens. Contar pares consulta-clave en la pizarra.
- [4–9] Con caché: un token nuevo mira *t* claves. Celda de teoría: la tabla del ratio (11× → 171×). Corregir la idea errónea «es lineal»: es O(t) por paso y O(T²) en total.
- [9–15] Demo: `generar` con y sin caché. Primero `torch.equal` (¡correctitud antes que velocidad!), luego las aceleraciones y la gráfica mental de tiempo por paso.
- [15–20] El precio: memoria. Fórmula de bytes por token; 128 KiB por token en un 8 B con GQA; 4 GiB para 32k tokens. Adelanta 7.5.

## 7.3 · Batching, continuous batching y PagedAttention (20 min)
- [0–5] Analogía del autobús: un viaje con más pasajeros cuesta casi lo mismo. Por qué el decode se beneficia.
- [5–10] Demo: tabla de lote 1…64; total sube, por usuario baja. Enseñar el gráfico (ejes logarítmicos).
- [10–16] Batching estático frente a continuo con la simulación: los huecos vacíos, el TTFT de las que esperan. Leer la tabla de resultados.
- [16–20] PagedAttention en dos minutos: memoria virtual para la caché. Mencionar prefix caching, chunked prefill y decodificación especulativa como «nombres que reconocer».

## 7.4 · Cuantización (20 min)
- [0–4] Idea: guardar con menos bits. Escala = max/qmax. Un ejemplo con 5 números a mano.
- [4–10] Demo: global frente a canal con un canal 30× mayor (14 % frente a 0,5 %). Después, grupos y empaquetado de 4 bits (comprobar que ocupa la mitad de bytes).
- [10–16] La tabla de calidad: int8 gratis, int4 aguanta, 3 y 2 bits se rompen y la KL lo avisa antes que el acierto. Mensaje: el error numérico no es calidad; mide con tu eval (AI4).
- [16–20] Mapa de formatos (GPTQ, AWQ, GGUF, bitsandbytes, FP8) y cuándo no cuantizar.

## 7.5 · Presupuesto de memoria (15 min)
- [0–4] Fórmulas de pesos y de KV-cache en la pizarra. Dónde mirar `config.json`.
- [4–10] Demo: tabla de KV por token y por petición (GQA frente a no GQA) y peticiones concurrentes en 24 y 80 GB.
- [10–15] Palancas en orden de efecto (GQA, KV a 8 bits, pesos, límites, más GPU). Ejercicio 3 como adelanto.

## 7.6 · Servir en producción (20 min)
- [0–5] Mapa de opciones: vLLM, SGLang, TensorRT-LLM, llama.cpp/Ollama, servicios gestionados. «Comprueba siempre la versión».
- [5–11] Arquitectura mínima y límites (concurrencia, longitud, timeouts, streaming, health). Código de `crear_app`.
- [11–17] Prueba de carga con `httpx` + ASGI: sin puertos ni procesos colgados. Leer la tabla: el throughput no crece y el p95 sí. Explicar por qué el paralelismo sin batching no es magia.
- [17–20] Esqueleto de Colab con vLLM: qué se ejecuta, qué se anota (versión), y apagar el servidor.

## 7.7 · Coste y decisión (15 min)
- [0–4] La fórmula y el ejemplo del cuestionario (0,67 €/M). Después, el mismo ejemplo al 15 % de utilización.
- [4–10] Demo: tabla por utilización, punto de equilibrio frente a la API con precios *de ejemplo* (decir explícitamente que son supuestos).
- [10–15] Lo que no sale en la factura de la GPU; cuándo sí compensa servir. Cierre: el entregable es un informe con recomendación, no solo medidas.

Nota del instructor: el notebook corre sin API ni GPU (CPU, unos minutos). La celda de vLLM es un esqueleto comentado para Colab; si la ejecutas en directo, avisa de que depende de la versión instalada.
