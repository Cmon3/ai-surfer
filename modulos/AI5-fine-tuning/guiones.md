# Módulo AI5 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh AI5`. Las demos usan `notebook.ipynb` (CPU); la lección 5.8 se graba en Colab.

## 5.1 · ¿Fine-tuning, RAG o prompt? (15 min)
- [0–3] Gancho: «mi jefe quiere un modelo propio». Preguntas que hay que hacer antes de entrenar nada.
- [3–9] Tabla síntoma → causa → remedio (conocimiento / control / coste). Ejemplos de TiendaSur.
- [9–13] Regla: primero prompt + evaluación (AI4); el SFT enseña comportamiento, no hechos cambiantes.
- [13–15] El verdadero coste: los datos. Avance del módulo.

## 5.2 · Datos de instrucciones (20 min)
- [0–4] Formato prompt/completion conversacional. Mostrar el JSON.
- [4–10] Demo en el notebook: las 12 intenciones × 8 formulaciones; división por formulación; la función `auditar`.
- [10–15] Aumento de datos con `aumentar`: qué hace y qué no hace. La validación no se toca.
- [15–20] Defectos silenciosos: duplicados, fuga train/val (ejercicio 1), datos personales, licencias.

## 5.3 · Chat templates y tokenizer (20 min)
- [0–5] Qué ve realmente el modelo: tokens. Entrenar un BPE en local y ver `tokens(...)`.
- [5–11] La plantilla Jinja; `aplicar_plantilla` frente a `tokenizer.apply_chat_template`; `add_generation_prompt`.
- [11–16] Tokens especiales y `<|im_end|>` como señal de parada.
- [16–20] El error clásico: plantilla distinta en inferencia. Cómo detectarlo con un test.

## 5.4 · La pérdida enmascarada (20 min)
- [0–5] Cross-entropy causal: `ids[:-1]` frente a `ids[1:]`. Dibujar el desplazamiento.
- [5–12] `codificar`: construir `labels` con `-100`; la tabla token/label del notebook; `verificar_mascara`.
- [12–17] SFT con máscara frente a sin máscara: resultados y por qué la diferencia es pequeña aquí (prompts cortos) y grande con RAG.
- [17–20] El test que nunca debe faltar: decodificar los tokens con label ≠ -100.

## 5.5 · LoRA a mano (25 min)
- [0–6] Del ajuste completo al rango bajo: dibujar `W + BA` con las dimensiones.
- [6–14] `LoRALinear` línea a línea: `A` aleatoria, `B = 0`, escala `α/r`, congelado de `W`.
- [14–20] Las tres verificaciones: B=0 ⇒ idéntico al base; fusión ⇒ misma salida; `W` intacta.
- [20–25] Tabla de parámetros: juguete y 7B (0,4 %). `r`, `alpha`, módulos objetivo, `lr`.

## 5.6 · QLoRA y memoria (15 min)
- [0–5] Dónde se va la memoria: pesos, gradientes, estados de Adam, activaciones.
- [5–11] La calculadora del notebook: completo 84 GB, LoRA 15 GB, QLoRA 4,5 GB. NF4 y cuantización doble en una frase.
- [11–15] Árbol de decisión según tu GPU (T4 de Colab, 24 GB, 80 GB).

## 5.7 · Entrenar con criterio (20 min)
- [0–6] Hiperparámetros por orden de importancia. Planificador y *warmup*.
- [6–14] Curvas: gráfico del notebook con 12 pares frente a 72 + aumento. `diagnostico()` y qué dice.
- [14–18] Parar en el mínimo (ejercicio 2). Sobreajuste, infraajuste, oscilación.
- [18–20] La pérdida no es la calidad: generar y medir el dato clave; olvido catastrófico.

## 5.8 · SFT real en Colab (20 min)
- [0–4] Elegir modelo: comprobar el vigente en el Hub, tamaño y licencia.
- [4–12] Recorrer el esqueleto: `BitsAndBytesConfig`, `LoraConfig`, `SFTConfig`, `SFTTrainer`. Tabla de correspondencias con el notebook.
- [12–17] Lanzar el entrenamiento de humo (20 pasos); leer `loss`/`eval_loss`.
- [17–20] Evaluar base frente a ajustado, guardar el adaptador, tarjeta de modelo y licencia. Enlace con AI4 y AI7.

Nota del instructor: el notebook corre sin API ni GPU; los resultados son de un modelo de juguete, así que insiste en que lo que se transfiere es el **mecanismo y los diagnósticos**, no los números.
