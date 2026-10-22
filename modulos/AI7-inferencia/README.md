# Módulo AI7 · Inferencia y despliegue

**Semana 11 de N3-AI · ~10 horas** · Del checkpoint al servicio: cuantización, batching, KV-cache, latencia y coste — con medidas reales del juguete del AI5.

## Objetivos
- Medir latencia/tokens-per-segundo de un modelo PyTorch y entender el efecto del **batching**.
- Entender la **KV-cache**: por qué generación sin cache es cuadrática y con cache es lineal por token.
- Implementar cuantización **int8 por canal** a mano (escala = max/127) y medir el error.
- Razonar el despliegue: vLLM para producción, coste por token y presupuesto (AI4).

## Notas de cómputo
Todo en CPU con el modelo SFT juguete del AI5 (2 capas). El esqueleto vLLM queda en Colab.

## Autoevaluación
1. ¿Por qué batch alto reduce tokens/s por petición pero aumenta el throughput total?
2. ¿Qué parte del cómputo elimina la KV-cache en generación autoregresiva?
3. La cuantización int8 con escala por canal produce error ~0.1 %. ¿Por qué per-canal y no global?
4. ¿Cuándo NO vale la pena cuantizar?

<details><summary>Respuestas</summary>
1. Batching amortiza la lectura de pesos: la GPU hace una pasada para N peticiones → throughput total sube, pero cada petición individual espera más (latencia per-user sube). Trade-off UX vs coste.
2. El re-cálculo de keys/values de todo el prefijo en cada paso: con cachen se computa solo el nuevo token.
3. Los outliers están por canal (columna): la escala global la fija el outlier máximo y destruye la precisión del resto de canales.
4. Con modelos pequeñas donde la memoria no es cuello, o tareas sensibles a precisión numérica (ranking fino en producción se suele medir: AI4).
</details>

## Lecturas
- [vLLM docs](https://docs.vllm.ai) · [llama.cpp quantization](https://github.com/ggerganov/llama.cpp#quantization) · Quantization survey (arxiv 2407.12344).
