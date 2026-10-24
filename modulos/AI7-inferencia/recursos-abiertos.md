# Módulo AI7 · Recursos abiertos recomendados

Complemento a los apuntes y al notebook. Todo gratuito. Revisa la licencia de cada recurso en [docs/recursos-y-licencias.md](../../docs/recursos-y-licencias.md) antes de incrustarlo en una plataforma de pago. Los proyectos de inferencia cambian muy rápido: comprueba la versión y la documentación vigente antes de seguir una guía.

## Por lección

| Lección | Recurso | Tipo |
|---|---|---|
| 7.1 | NVIDIA Technical Blog: *Mastering LLM Techniques: Inference Optimization* (búscalo por el título en https://developer.nvidia.com/blog) | lectura |
| 7.2 | Kwon et al., *Efficient Memory Management for Large Language Model Serving with PagedAttention* (2023) — https://arxiv.org/abs/2309.06180 | paper |
| 7.2 | Dao et al., *FlashAttention* (2022) — https://arxiv.org/abs/2205.14135 | paper |
| 7.3 | vLLM: documentación (*continuous batching*, *prefix caching*, servidor compatible con OpenAI) — https://docs.vllm.ai | documentación |
| 7.4 | Maarten Grootendorst, *A Visual Guide to Quantization* — https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-quantization | lectura con figuras |
| 7.4 | Frantar et al., *GPTQ* (2022) — https://arxiv.org/abs/2210.17323 · Lin et al., *AWQ* (2023) — https://arxiv.org/abs/2306.00978 | papers |
| 7.4 | Dettmers et al., *LLM.int8()* (2022) — https://arxiv.org/abs/2208.07339 · Xiao et al., *SmoothQuant* (2022) — https://arxiv.org/abs/2211.10438 | papers (atípicos en activaciones) |
| 7.4 | llama.cpp: formatos GGUF y cuantización — https://github.com/ggml-org/llama.cpp | repositorio |
| 7.5 | Ainslie et al., *GQA: Training Generalized Multi-Query Transformer Models* (2023) — https://arxiv.org/abs/2305.13245 | paper |
| 7.5 | Hugging Face: `config.json` de cualquier modelo (capas, cabezas KV, `head_dim`) — https://huggingface.co/models | práctica |
| 7.6 | FastAPI: *Testing* (`TestClient`) — https://fastapi.tiangolo.com/tutorial/testing/ | documentación |
| 7.6 | Locust (pruebas de carga en Python) — https://locust.io | herramienta |
| 7.6 | Leviathan et al., *Fast Inference from Transformers via Speculative Decoding* (2022) — https://arxiv.org/abs/2211.17192 | paper |
| 7.7 | Tarifas vigentes de GPU en la nube y de API de tu proveedor (compara siempre en la página oficial; los precios cambian) | consulta propia |

## Cursos y lecturas para profundizar

- **Hugging Face LLM Course** (gratuito) — capítulos de uso e inferencia de modelos: https://huggingface.co/learn
- **Andrej Karpathy, *Let's build GPT*** (vídeo) — para entender el modelo cuya inferencia optimizas.
- **Made With ML** (Goku Mohandas) — despliegue y monitorización: https://madewithml.com

## Práctica extra (recomendada)

- En Colab, sirve `Qwen2.5-0.5B-Instruct` con vLLM y repite la tabla de TTFT/tokens/s con 1, 8 y 32 peticiones; compara con la curva de tu servicio de juguete. Anota la versión de vLLM y apaga el servidor al terminar.
- Descarga el mismo modelo en dos cuantizaciones (por ejemplo, GGUF Q8 y Q4) y compáralas con tu conjunto de evaluación del AI4: ¿dónde aparece la pérdida de calidad?
- Calcula el presupuesto de KV-cache del modelo que más te interese leyendo su `config.json`.
