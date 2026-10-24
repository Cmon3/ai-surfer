---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# AI9 · Multimodal
## Facturas en imagen y agentes de voz, medidos

*AI Surfer · N3-AI Engineering*

---

# Qué piden las ofertas (oct. 2026)

- LLM por API + **voz** (transcripción, voces sintéticas)
- **Visión** de documentos
- Integraciones con terceros y **trato con el cliente**
- Perfiles *Forward Deployed* y *AI/ML Engineer* junior

Al terminar: un extractor evaluado y un diseño de agente de voz medido.

---

# Mapa del módulo

| Bloque | Pieza de portafolio |
|---|---|
| Visión-lenguaje | Extractor de facturas con evaluación campo a campo |
| Voz | Presupuesto de latencia, turnos, interrupciones |
| Riesgos | Redacción de datos personales, contenido hostil |

El modelo es **una pieza**: el trabajo está alrededor.

---

# Imagen → objeto validado

```python
client.messages.parse(
    model=MODELO, max_tokens=4000,
    messages=[{"role": "user", "content": [
        {"type": "image", "source": {...}},
        {"type": "text", "text": "Extrae los datos…"}]}],
    output_format=Factura)
```

**Forma ≠ verdad:** Pydantic valida tipos, no importes.

---

# La revisión determinista

- Suma de líneas = base imponible
- Base + IVA = total
- Formato de CIF, número de factura; fecha válida
- Si algo falla → **revisión humana**

La aritmética no se equivoca.

---

# OCR + reglas vs VLM

| | OCR + reglas | VLM |
|---|---|---|
| Coste | Muy bajo | Mayor |
| Formatos nuevos | Reglas nuevas | Suele generalizar |
| Privacidad | Local | Sale a un proveedor |

**Estrategia:** reglas → VLM si falla → persona si dudas.

---

# Evaluar campo a campo

- Exactitud por campo y **por calidad de imagen**
- Matriz error / aviso:

| | Con aviso | Sin aviso |
|---|---|---|
| Error | bien | **silencioso** |
| Correcto | falsa alarma | bien |

8 documentos = una factura mueve 12 puntos.

---

<!-- _class: lead -->
# Voz

---

# El pipeline y su presupuesto

```
usuario → endpointing → STT → LLM → TTS → agente
```

Objetivo orientativo: **~1 s** hasta el primer sonido.

| Etapa | Depende de |
|---|---|
| Silencio | Tu umbral |
| LLM 1.er token | Modelo y contexto |
| TTS 1.er audio | Proveedor |

---

# Streaming por frases

- El TTS empieza con la **primera frase**
- No acelera etapas: las **solapa**
- Mira el **p95**, no la mediana

En el notebook: de ~2,8 s en serie a ~1,2 s por frases.

---

# Turnos: no hay umbral perfecto

| Silencio | Frases cortadas | Espera añadida |
|---|---|---|
| 200 ms | 4/5 | 200 ms |
| 1000 ms | 0/5 | 1000 ms |

Soluciones: criterio **adaptativo**, STT en streaming, modelos de fin de turno.

---

# Interrupciones (*barge-in*)

1. Una tos **no** es interrupción (voz sostenida ≥ ~300 ms)
2. Callar rápido y **vaciar el búfer**
3. Historial: **solo lo que se llegó a decir**
4. Cancelar lo que LLM/TTS seguían generando

---

# STT: WER no basta

- «pedido 1042» → «pedido 1402»: **WER 0,11** y llamada rota
- Mide **entidades** (números, nombres, importes)
- Confirma los datos críticos a viva voz

---

# Riesgos

- **Datos personales:** minimiza, consentimiento, redacta antes de registrar, retención
- La **voz** es dato personal (y puede ser biométrico)
- **Suplantación:** la voz no prueba identidad
- **Inyección por contenido:** el modelo extrae; **tu código decide**

---

<!-- _class: lead -->
# Resumen

**Imagen → objeto validado → revisión → evaluación**
**Voz → presupuesto → turnos → interrupciones → privacidad**

Siguiente: FS1 · full-stack, y el caso práctico con README para un cliente.
