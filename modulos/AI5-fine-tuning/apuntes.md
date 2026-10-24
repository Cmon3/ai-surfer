# Módulo AI5 · Fine-tuning supervisado — Apuntes

> Objetivo: que puedas entrenar un SFT sabiendo qué hace cada línea, y decidir con datos si ha merecido la pena. Lo aprendes en pequeño (el notebook, en CPU) porque el mecanismo es **el mismo** que en un modelo de miles de millones de parámetros; solo cambia la escala.

---

## 5.1 · ¿Fine-tuning, RAG o prompt?

Un LLM puede fallar de tres formas distintas, y cada una tiene su remedio:

| Síntoma | Causa | Remedio habitual |
|---|---|---|
| Responde bien pero no conoce **tus datos** (políticas, catálogo) o están desactualizados | Falta de conocimiento | **RAG** (módulo AI3) |
| Sabe lo que debe, pero no sigue **el formato o el tono** que quieres | Falta de control | **Prompt** con ejemplos; si no basta, **SFT** |
| Hace bien la tarea con un modelo grande, pero es **caro o lento** | Coste/latencia | **SFT** (o destilación) de un modelo pequeño |

Reglas prácticas:
- Empieza siempre por el prompt y por un conjunto de evaluación (AI4). Sin evaluación no sabrás si el ajuste mejora.
- El fine-tuning enseña **comportamiento** (estilo, formato, tarea), no es una buena forma de inyectar **hechos** que cambian: eso es RAG.
- Ajustar un modelo pequeño para una tarea estrecha (clasificar, extraer, responder con un estilo) y bien definida es el caso donde más compensa.
- Se pueden combinar: SFT para el formato + RAG para el conocimiento.

**Coste de oportunidad:** preparar buenos datos suele costar más que el entrenamiento. Si no puedes reunir unos cientos de buenos ejemplos, aún no es el momento.

---

## 5.2 · Datos de instrucciones

Un ejemplo SFT es un par **(instrucción, respuesta)**, a menudo con un mensaje de sistema. Hoy se escribe en formato conversacional:

```json
{"prompt": [{"role": "system", "content": "Eres el asistente de TiendaSur."},
            {"role": "user", "content": "¿Cuánto tarda el envío?"}],
 "completion": [{"role": "assistant", "content": "El envío estándar tarda 3-5 días laborables."}]}
```

**La calidad manda sobre la cantidad.** Unos cientos de ejemplos buenos y variados superan a miles mediocres. Lista de comprobación antes de entrenar:
- **Sin duplicados** (ni casi-duplicados): memorizan y dan una validación engañosa.
- **Sin fuga** entre entrenamiento y validación: dividir **por formulación o por documento**, nunca al azar sobre filas casi idénticas.
- **Respuestas consistentes**: si dos ejemplos contradicen el mismo hecho, el modelo aprende a dudar.
- **Variedad** real: distintas formas de preguntar, casos límite, también ejemplos de «no lo sé / fuera de dominio».
- **Longitudes razonables**: revisa mínimos, mediana y máximos; descarta vacíos.
- **Datos personales**: anonimiza antes de entrenar (el modelo puede memorizarlos).
- **Licencia y origen**: si las respuestas las generó otro modelo, revisa sus condiciones de uso.

**Aumento de datos.** Variaciones de superficie (saludos, cortesías, mayúsculas) ayudan a que el modelo no se ate a la redacción exacta. No inventa información nueva, así que no sustituye a datos variados de verdad. Se aplica **solo a entrenamiento**: la validación se queda tal cual.

---

## 5.3 · Chat templates y tokens especiales

Un modelo solo ve números. El **tokenizer** parte el texto en *tokens* (piezas frecuentes aprendidas con **BPE**, *byte-pair encoding*); el **chat template** decide cómo se escribe una conversación como texto antes de tokenizar. Ejemplo estilo ChatML:

```
<|im_start|>system
Eres el asistente de TiendaSur.<|im_end|>
<|im_start|>user
¿Cuánto tarda el envío?<|im_end|>
<|im_start|>assistant
El envío estándar tarda 3-5 días laborables.<|im_end|>
```

- `<|im_start|>` y `<|im_end|>` son **tokens especiales**: ids propios que el modelo aprende a tratar como marcadores de turno. `<|im_end|>` además es la señal de **parar**.
- En Hugging Face, la plantilla es una cadena **Jinja** guardada en `tokenizer.chat_template`, y se usa con `tokenizer.apply_chat_template(messages, add_generation_prompt=True)`. Cada familia de modelos tiene la suya: **no inventes una; usa la del modelo base**.
- `add_generation_prompt=True` añade la cabecera del asistente al final: es justo donde el modelo empieza a escribir en inferencia.

**Error clásico:** entrenar con una plantilla e inferir con otra (o sin la cabecera del asistente). El modelo no sabe dónde empieza ni acaba su turno: respuestas que no paran, mezcla de roles, calidad inexplicablemente peor. Se evita usando siempre `apply_chat_template` y comprobando en un test que el texto de entrenamiento y el de inferencia comparten el prefijo.

---

## 5.4 · La pérdida enmascarada

Un modelo de lenguaje causal se entrena prediciendo cada token a partir de los anteriores: `entrada = ids[:-1]`, `objetivo = ids[1:]`, con pérdida de entropía cruzada media. En SFT **solo nos interesa que aprenda a responder**, así que las posiciones cuyo objetivo es parte del prompt se etiquetan con `-100`, y PyTorch las ignora (`ignore_index=-100`):

```
entrada :  <|im_start|> user ¿ cuánto … <|im_start|> assistant \n   El   envío …
objetivo:  user         ¿    cuánto …  <|im_start|> assistant \n   El   envío …
label   :  -100        -100  -100   …  -100        -100      -100  El   envío …  <|im_end|>
```

Se aprende de la respuesta **y de `<|im_end|>`** (para saber parar). El relleno (*padding*) de los lotes también va con `-100`.

**¿Cuánto importa?** En el notebook la diferencia en validación es pequeña porque los prompts son cortos. Importa mucho cuando el prompt es largo (RAG con miles de tokens de contexto): sin máscara, casi todo el gradiente se gasta en predecir contexto que ya tienes. En TRL se consigue con el formato *prompt/completion* (`completion_only_loss`) o con `assistant_only_loss`.

**Test imprescindible:** decodifica los tokens con label ≠ -100 y comprueba que son exactamente la respuesta (más `<|im_end|>`). Un desajuste de un token en la frontera es un fallo silencioso.

---

## 5.5 · LoRA

**Idea.** El ajuste completo actualiza todas las matrices `W` (`out × in`) y necesita guardar gradientes y estados del optimizador de cada una. La hipótesis de LoRA (Hu et al., 2021): para adaptar un modelo a una tarea, el cambio `ΔW` tiene **rango bajo**. Congelamos `W` y aprendemos

```
W' = W + (α/r) · B · A        A: (r × in)   B: (out × r)   r ≪ min(in, out)
```

- **Parámetros entrenables:** `r·(in + out)` por matriz en lugar de `in·out`. Con 4096×4096 y `r = 8`: 65 536 frente a 16,8 M (0,4 %).
- **Inicialización:** `A` aleatoria pequeña, `B = 0`. Así `ΔW = 0` al empezar: el modelo ajustado es **idéntico** al base en el paso 0. Si ambas fueran cero, el gradiente de las dos sería cero y no aprenderían.
- **Escala `α/r`:** controla la intensidad de la corrección. Convención habitual: `α = 2r` (o `α = r`). Subir `r` sin tocar `α` reduce el efecto de cada parámetro.
- **Fusión:** tras entrenar, `W ← W + (α/r)BA` y se puede servir como un modelo normal, **sin coste extra** de inferencia. O se guarda solo el adaptador (megabytes) y se carga sobre el base: un adaptador por cliente o tarea sobre el mismo modelo.
- **Dónde se aplica:** lo clásico son `q_proj`/`v_proj`; hoy se suele aplicar a **todas las lineales** (`q,k,v,o,gate,up,down`), que da mejores resultados con poco coste.
- **`lora_dropout`** (0,05–0,1) regulariza; **learning rate** típico de LoRA: 1e-4 a 3e-4 (mucho mayor que el del ajuste completo, 1e-5 a 5e-5).

**Verificaciones que hacemos en el notebook** (hazlas siempre con tu implementación):
1. Con `B = 0`, la salida del modelo con LoRA es idéntica a la del base.
2. `x·(W + (α/r)BA)ᵀ + b` es igual a la salida del adaptador sin fusionar.
3. Tras entrenar, los pesos `W` congelados no han cambiado ni un bit.

**Cuándo LoRA no basta:** si la tarea exige cambiar mucho el comportamiento del modelo (idioma nuevo, dominio muy lejano) puede necesitar rangos altos o continuar el preentrenamiento. En el notebook, con un modelo diminuto que parte de un base que no sabe enrutar preguntas, hace falta un rango alto para acercarse al ajuste completo; en LLMs reales, rangos 8–64 suelen bastar para tareas estrechas.

---

## 5.6 · QLoRA y presupuesto de memoria

La memoria de entrenamiento se reparte entre: **pesos**, **gradientes**, **estados del optimizador** (Adam guarda dos números por parámetro) y **activaciones**.

Para un modelo de 7 000 M de parámetros (estimación gruesa, sin activaciones):

| Método | Memoria | Comentario |
|---|---|---|
| Ajuste completo, bf16 + AdamW | ~80 GB | pesos 2 B + gradientes 2 B + Adam fp32 8 B por parámetro |
| LoRA, base en bf16 | ~15 GB | pesos congelados 14 GB + adaptador |
| **QLoRA**, base en 4 bits | ~4–5 GB | pesos congelados a 4 bits (~3,5 GB) + adaptador |

**QLoRA** (Dettmers et al., 2023) = base **congelada y cuantizada a 4 bits** (formato NF4, con cuantización doble) + adaptadores LoRA en precisión normal. Los gradientes atraviesan la base cuantizada hacia el adaptador. Hace que un 7B quepa en una GPU de 16 GB (una T4 de Colab) y modelos mayores en una GPU de consumo; paga con algo más de tiempo por paso y una pequeña pérdida de calidad. Se activa con `BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4")`.

Regla para elegir: ¿cabe el ajuste completo? Hazlo solo si lo justifica (modelo pequeño, mucha tarea). ¿No cabe? LoRA. ¿Sigue sin caber? QLoRA, menos longitud de secuencia, *gradient checkpointing* o lote menor con acumulación de gradiente.

---

## 5.7 · Entrenar con criterio

**Hiperparámetros que importan (por orden):**
1. **Datos** (calidad, variedad, tamaño).
2. **Learning rate** y su planificador (coseno con *warmup* corto, 3–5 % de los pasos).
3. **Épocas**: en SFT suelen ser 1–3. Más épocas con pocos datos = memorización.
4. **Tamaño de lote efectivo** (lote × acumulación): 16–64 suele ir bien.
5. **Rango `r` y `alpha`**: importan menos de lo que parece.

**Leer las curvas** (siempre con un conjunto de validación):

| Curvas | Diagnóstico | Remedio |
|---|---|---|
| Train y val bajan juntas | Aprendiendo | Seguir |
| Train baja, val **sube** tras un mínimo | **Sobreajuste** | Parar en el mínimo, menos épocas o `lr`, más datos, aumento, dropout |
| Ambas altas y planas | **Infraajuste** | Más pasos, más `lr`, más capacidad |
| Val oscila mucho | `lr` alto / lote pequeño | Bajar `lr`, subir lote |

En el notebook, `diagnostico()` convierte estas reglas en código: encuentra el paso mínimo de validación y avisa si la validación acaba claramente peor que su mínimo.

**La pérdida no es la calidad.** Una validación baja no garantiza buenas respuestas. Evalúa **generando** (decodificación voraz para comparar de forma determinista) y con métricas objetivas de tu dominio (¿contiene el dato clave? ¿cumple el formato?) además del juez calibrado de AI4.

**Olvido catastrófico.** Un SFT agresivo sobre un dominio estrecho puede degradar capacidades generales. Mide también un pequeño conjunto de tareas generales antes y después; LoRA y un `lr` moderado lo mitigan.

---

## 5.8 · SFT real con TRL + PEFT

Receta mínima (la tienes comentada en el notebook):

```python
bnb = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4", bnb_4bit_compute_dtype=torch.bfloat16)
modelo = AutoModelForCausalLM.from_pretrained(BASE_ID, quantization_config=bnb, device_map="auto")
lora = LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05, task_type="CAUSAL_LM", target_modules=[...])
args = SFTConfig(output_dir=..., num_train_epochs=3, learning_rate=2e-4, eval_strategy="steps", ...)
trainer = SFTTrainer(model=modelo, args=args, train_dataset=train, eval_dataset=val,
                     processing_class=tok, peft_config=lora)
trainer.train(); trainer.save_model(...)
```

Correspondencia con lo que hiciste a mano: plantilla (`apply_chat_template`), máscara (*prompt/completion* + `completion_only_loss`), `LoRALinear` (`LoraConfig`), curvas (`eval_strategy`), guardado del adaptador.

**Antes de lanzar:** (1) elige un modelo `-Instruct` pequeño **vigente** en el Hub (0,5–3 B; comprueba licencia); (2) revisa la versión de TRL: algunos argumentos cambian de nombre entre versiones (`max_length` frente a `max_seq_length`); (3) haz un entrenamiento de humo con 20 pasos para ver que el flujo funciona.

**Después:** evalúa base frente a ajustado sobre tu golden set, guarda el adaptador (MB), escribe la tarjeta de modelo (datos, límites, licencia) y, si lo publicas, recuerda que **hereda la licencia del modelo base**. Para servirlo, el módulo AI7.

---

## Glosario
- **SFT:** *supervised fine-tuning*; ajuste con pares (instrucción, respuesta).
- **Chat template:** plantilla Jinja que convierte una conversación en el texto de entrenamiento/inferencia.
- **Token especial:** token reservado (`<|im_start|>`, `<|im_end|>`, `<|pad|>`) que marca estructura.
- **BPE:** *byte-pair encoding*, algoritmo de tokenización por fusión de pares frecuentes.
- **Máscara de pérdida:** etiqueta `-100` en posiciones que no deben contribuir a la pérdida.
- **LoRA:** *low-rank adaptation*; adaptadores de bajo rango sobre pesos congelados.
- **QLoRA:** LoRA sobre una base cuantizada a 4 bits.
- **Rango (`r`) / `alpha`:** tamaño del adaptador / factor de escala (`α/r`).
- **Fusión (*merge*):** sumar `(α/r)BA` a `W` para servir sin adaptador.
- **Sobreajuste:** el modelo memoriza el entrenamiento y empeora en validación.
- **Early stopping:** parar el entrenamiento en el mínimo de validación.
- **Olvido catastrófico:** pérdida de capacidades generales tras un ajuste estrecho.
