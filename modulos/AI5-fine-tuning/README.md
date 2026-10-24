# Módulo AI5 · Fine-tuning supervisado

**Semanas 8–9 de N3-AI · ~12 horas** · SFT (*supervised fine-tuning*), LoRA y QLoRA: cómo se prepara un dataset de instrucciones, se enmascara la pérdida, se entrena un adaptador y se decide con datos si ha funcionado. Primero a mano y en CPU con un modelo de juguete; después con `TRL` + `PEFT` en una GPU gratuita de Colab.

## Qué piden las ofertas
En las ofertas de AI/LLM Engineer (oct. 2026) el fine-tuning aparece como **plus**, casi nunca como requisito, y casi siempre con la misma redacción: «experiencia con LoRA/QLoRA, Hugging Face (`transformers`, `peft`, `trl`), preparación de datasets y evaluación». Lo que distingue a quien lo ha hecho de verdad es saber **cuándo no hacerlo** (el prompting o el RAG bastan en la mayoría de casos), cuidar los datos y evaluar frente al modelo base. Este módulo termina en una pieza de portafolio exactamente así: un modelo ajustado, medido contra su base.

## Objetivos
Al terminar este módulo podrás:
- Decidir entre **prompting, RAG y fine-tuning** con criterios y coste.
- Preparar un **dataset de instrucciones**: formato, calidad, deduplicación y división train/validación sin fugas.
- Aplicar un **chat template** y explicar por qué los tokens especiales y la plantilla deben coincidir en entrenamiento e inferencia.
- Implementar la **máscara de pérdida** (`-100`) y verificarla con un test.
- Implementar **LoRA a mano** (`W' = W + (α/r)·B·A`), comprobar que arranca igual que el base, fusionarlo y comparar parámetros entrenables con el ajuste completo.
- Estimar la memoria de **QLoRA** y elegir método según tu GPU.
- Leer **curvas de pérdida** y diagnosticar sobreajuste e infraajuste.
- Lanzar un SFT real con `SFTTrainer` + `peft` en Colab y evaluarlo contra el modelo base.

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 5.1 | ¿Fine-tuning, RAG o prompt? Cuándo ajustar (y cuándo no) | 15 min |
| 5.2 | Datos de instrucciones: formato, calidad y división sin fugas | 20 min |
| 5.3 | Chat templates, tokenizer y tokens especiales | 20 min |
| 5.4 | La pérdida enmascarada: la mecánica del SFT | 20 min |
| 5.5 | LoRA: la matemática y el código a mano | 25 min |
| 5.6 | QLoRA y el presupuesto de memoria | 15 min |
| 5.7 | Entrenar con criterio: hiperparámetros, curvas y sobreajuste | 20 min |
| 5.8 | SFT real con TRL + PEFT en Colab, evaluación y publicación | 20 min |

Total de vídeo: ~2 h 35 min. El resto de las ~12 h es práctica (notebook, ejercicios, Colab y caso práctico).

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría por lección + glosario |
| [`diapositivas.md`](diapositivas.md) | Presentación (Marp) |
| [`guiones.md`](guiones.md) | Guion de cada vídeo con minutos |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada (CPU) + 5 ejercicios con celdas vacías |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* mismo notebook con los ejercicios resueltos |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Recursos gratuitos por lección |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) construye un SFT completo para el asistente de **TiendaSur**, en CPU y sin descargas:
1. Dataset de 12 intenciones × 8 formulaciones, con auditoría de calidad y aumento de datos.
2. *Chat template* con Jinja y un **tokenizer BPE real** entrenado en local (librería `tokenizers`; si no está instalada, cae a caracteres).
3. Máscara de pérdida verificada token a token.
4. Un transformer de ~160 k parámetros: «preentrenamiento», SFT con y sin máscara, curvas de pérdida y una función de **diagnóstico de sobreajuste**.
5. **LoRA implementado a mano** (`LoRALinear`), con tests de equivalencia (B=0 y fusión) y comparación de parámetros entrenables y de pérdida frente al ajuste completo.
6. Calculadora de memoria para QLoRA y un **esqueleto de Colab** con `SFTTrainer` + `peft` + 4 bits (no se ejecuta en el notebook).

## Notas de cómputo
- **Notebook:** CPU, sin clave de API, unos 2–3 minutos. Es determinista (semillas fijas).
- **Colab (opcional):** GPU T4 gratuita. Modelo abierto de 0,5 a 3 B parámetros (familias Qwen, SmolLM, Gemma o Llama). **Comprueba el modelo vigente en el Hub** antes de empezar: se renuevan cada pocos meses; elige uno `-Instruct` con una licencia que te permita usarlo.
- Dependencia nueva respecto a otros módulos: `tokenizers` (opcional; el notebook funciona sin ella).

## Caso práctico (entregable)
**Ajusta un modelo abierto pequeño a un dominio tuyo y demuestra con números que mejora al base.**
1. Dataset de **al menos 100 pares** (instrucción, respuesta) de tu dominio, con formato *prompt/completion*, auditoría de calidad (duplicados, fugas, longitudes) y división train/validación por formulación o por documento.
2. SFT con `SFTTrainer` + LoRA/QLoRA en Colab, con curvas de pérdida de entrenamiento y validación y justificación de `r`, `alpha`, `lr` y número de épocas.
3. Evaluación **base frente a ajustado** sobre un golden set de al menos 20 casos que no están en el entrenamiento (con las métricas objetivas del módulo AI4), más un análisis de 3 fallos.
4. Repositorio con README: datos (o cómo reconstruirlos), configuración, resultados y limitaciones. Opcional: publica el adaptador en el Hub con su tarjeta de modelo.

**Criterios de evaluación:** calidad y auditoría del dataset (25 %), entrenamiento correcto y curvas bien interpretadas (25 %), evaluación honesta frente al base (30 %), reproducibilidad y documentación (20 %).

## Autoevaluación
1. ¿Por qué se enmascara la pérdida en la parte del prompt?
2. ¿Cuántos parámetros entrena LoRA en una matriz de 4096×4096 con `r = 8`, y por qué `B` se inicializa a cero?
3. ¿Qué se cuantiza exactamente en QLoRA?
4. Tu pérdida de entrenamiento baja a casi cero pero la de validación sube desde el paso 30. ¿Diagnóstico y dos remedios?
5. ¿Por qué el chat template de entrenamiento debe ser idéntico al de inferencia?
6. Tu dataset de 500 pares tiene la pregunta de validación repetida en train. ¿Qué pasa con tu métrica?

<details><summary>Respuestas</summary>

1. Para que el gradiente se dedique a aprender a **responder**, no a predecir el prompt. Con prompts largos (RAG) la mayor parte de los tokens serían prompt, y sin máscara el modelo aprendería a imitar preguntas en vez de responderlas.
2. `r·(in + out) = 8·8192 = 65 536` parámetros frente a 16,8 M de la matriz (0,4 %). `B = 0` hace que `ΔW = BA = 0` al empezar: el modelo ajustado parte **exactamente** del base y la optimización arranca sin perturbarlo. `A` no puede ser cero también, porque entonces el gradiente de ambas sería cero.
3. Los **pesos del modelo base**, congelados, se guardan a 4 bits (NF4). El adaptador LoRA y los estados del optimizador siguen en precisión normal; los gradientes atraviesan la base cuantizada.
4. Sobreajuste (memoriza el entrenamiento). Remedios: parar en el mínimo de validación (*early stopping*), menos épocas o `lr` más bajo, más datos y más variados, aumento de datos, `lora_dropout`, menor rango.
5. Porque el modelo aprende dónde empieza su turno y cuándo parar con esos marcadores exactos; si en inferencia faltan o cambian, el comportamiento se degrada (no se calla, mezcla roles, repite).
6. Hay **fuga**: la validación sale artificialmente buena porque el modelo ha visto la pregunta. Es un error silencioso, el más peligroso de los defectos de datos.
</details>

## Lecturas
- Hu et al., *LoRA: Low-Rank Adaptation of Large Language Models* (2021), arXiv 2106.09685.
- Dettmers et al., *QLoRA: Efficient Finetuning of Quantized LLMs* (2023), arXiv 2305.14314.
- Documentación de Hugging Face: [PEFT](https://huggingface.co/docs/peft), [TRL `SFTTrainer`](https://huggingface.co/docs/trl/sft_trainer) y *Chat templates* en la documentación de `transformers`.
- [HF Alignment Handbook](https://github.com/huggingface/alignment-handbook): recetas reproducibles de SFT y alineación.
- Módulos relacionados: **AI4** (evaluar el resultado), **AI6** (alinear con preferencias tras el SFT), **AI7** (servir el modelo ajustado).
