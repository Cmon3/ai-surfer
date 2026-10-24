# Módulo AI9 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh AI9`. Ten abierto el notebook y, si puedes, una cuenta con clave para mostrar las celdas **[API]**. **Regla del módulo:** todo lo que se promete («funciona», «responde en un segundo») se muestra con una medición.

## 9.1 · Por qué multimodal ahora (10 min)
- [0–3] Gancho: dos ofertas reales (voz y visión) y lo que piden. Qué hace un *Forward Deployed Engineer* con un cliente.
- [3–7] Mapa del módulo: factura (imagen) y agente de voz; el modelo es una pieza, el trabajo está alrededor.
- [7–10] Los dos entregables y cómo se evalúan.

## 9.2 · Visión-lenguaje: de la imagen a un objeto validado (20 min)
- [0–5] Generar la factura con Pillow: por qué generarla (tenemos la verdad). Mostrar la versión degradada.
- [5–12] El modelo Pydantic `Factura` y la llamada con `messages.parse` y un bloque `image`. Con clave: ejecutar y leer el resultado.
- [12–17] **Forma ≠ verdad:** `revisar()`; demo rompiendo un importe a mano y viendo el aviso.
- [17–20] Reglas de la instrucción: copiar, no recalcular; fecha ISO; el texto de la imagen es dato.

## 9.3 · OCR + reglas frente a VLM (15 min)
- [0–5] Tabla comparativa. Cuándo gana cada uno.
- [5–12] El OCR simulado (decir en voz alta que es simulado) y el extractor por regex: corregir confusiones solo donde esperas dígitos.
- [12–15] El camino híbrido: reglas primero, VLM si falla, persona para lo dudoso.

## 9.4 · Evaluar la extracción campo a campo (15 min)
- [0–5] Conjunto de 8 facturas, 4 degradadas. La tabla por campo y por calidad.
- [5–11] La matriz error/aviso: el error silencioso. Ejemplo del `1 kg` → `l kg`.
- [11–15] Con clave: tabla OCR frente a Claude. Cuántas facturas salen 100 % bien. Ruido de la muestra pequeña.

## 9.5 · Audio: STT, Whisper, WER y entidades (15 min)
- [0–5] Qué hace un STT; Whisper y el *streaming*.
- [5–11] WER a mano con un ejemplo; después la trampa del número de pedido (WER 0,11 y llamada rota).
- [11–15] Qué degrada el STT y cómo se mitiga (confirmaciones, vocabulario).

## 9.6 · Agentes de voz: presupuesto de latencia (20 min)
- [0–4] El pipeline y el objetivo de ~1 s.
- [4–11] Ejecutar los 6 turnos medidos: leer la tabla por etapa; en serie frente a por frases.
- [11–17] Distribución de 2000 turnos: p50 y p95; el gráfico de barras apiladas. Con clave, sustituir el LLM por la medición real.
- [17–20] Palancas y lo que cuesta cada una.

## 9.7 · Turnos e interrupciones (20 min)
- [0–5] Audio sintético y VAD por energía: qué ve la máquina.
- [5–11] La tabla de endpointing: cuántas frases se cortan con cada silencio. No hay valor óptimo.
- [11–17] Interrupciones: filtrar tos y «mm-hm»; callar rápido; guardar en el historial solo lo dicho.
- [17–20] Mejoras reales: endpointing adaptativo (ejercicio 4) y modelos de fin de turno.

## 9.8 · Voz y visión con modelos abiertos (10 min)
- [0–5] Esqueletos de Colab: `faster-whisper`, TTS abierto, VLM abierto. Qué cambia (sin salida estructurada garantizada).
- [5–10] Cómo medir latencia real y llevar las medianas a la tabla `ETAPAS`. Licencias de los modelos de voz.

## 9.9 · Riesgos (15 min)
- [0–6] Datos personales en facturas y llamadas; la voz como dato personal/biométrico. Minimizar, consentimiento, retención. Aviso: no es asesoramiento jurídico.
- [6–11] El redactor: patrones con validación (letra del DNI, Luhn); lo que NO cubre (nombres).
- [11–15] Suplantación con voces sintéticas y la inyección por el contenido: modelo que solo extrae; acciones en código.

Nota del instructor: sin clave el notebook enseña lo mismo con el camino simulado; con clave, deja a la vista la medición real del LLM y la tabla OCR frente a Claude. Cuenta siempre qué partes son simuladas.
