# Capstone AI · Fine-tune + eval + deploy

**Entregable final de la especialización AI Engineering.**

## Objetivo
Ajustar un **modelo abierto pequeño** (0.5–1.5B) para un caso de uso concreto, con evaluación propia y despliegue funcional. Se publica en Hugging Face.

## Entregables (repo GitHub + HF)
| Requisito | Detalle |
|---|---|
| Caso de uso | 1 párrafo: tarea, dominio, usuario y criterio de éxito |
| Dataset SFT | ≥ 50 pares (instrucción, respuesta) propios, con chat template consistente |
| Fine-tune | QLoRA (TRL+PEFT) en Colab T4, con config registrada (seed, β, épocas) |
| Evaluación | Golden set ≥ 30 casos (AI4) + métricas objetivas + judge calibrado |
| Comparativa | Base vs fine-tune en la tabla de regresión (por categoría) |
| Despliegue | Opción A: HF Inference API; Opción B: vLLM server + endpoint FastAPI |
| Seguridad | Moderador + defensa anti-inyección + acciones con confirmación (AI8) |
| README | Qué hace, cómo ejecutar, coste, limitaciones |

## Rúbrica (100 pts)
| Criterio | Máximo |
|---|---|
| Caso y dataset (calidad, consistencia de template) | 20 |
| Fine-tune correcto y reproducible (config registrada) | 20 |
| Evaluación honesta (golden set + calibración del judge) | 25 |
| Mejora demostrable vs base en regresión | 15 |
| Despliegue funcional + seguridad mínima | 15 |
| README y limitaciones | 5 |
