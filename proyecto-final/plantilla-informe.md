# [Título: la recomendación en una frase]

**Autor/a(s):** · **Fecha:** · **Mentor/a:** · **Repositorio:** [enlace] · **CI:** [insignia]

> Informe de negocio de **máx. 4 páginas**. El README técnico del repositorio cubre la ejecución y los detalles de ingeniería; aquí interesa lo que entiende un comité de dirección. Anexa lo técnico, no lo mezcles con el cuerpo.

---

## 1. Resumen ejecutivo (máx. 150 palabras)
- **Problema:** ¿qué decisión hay que tomar y por qué importa? (incluye una cifra: coste, ingresos, tiempo…)
- **Qué hicimos:** datos, método y servicio en una frase («un modelo X desplegado como API que puntúa a cada cliente cada semana»).
- **Resultado:** el hallazgo principal, cuantificado y comparado con la situación actual (la línea base).
- **Recomendación:** qué hacer, a partir de cuándo y cómo medir el éxito.

## 2. Contexto y pregunta de negocio
- Situación actual y cómo se decide hoy.
- Pregunta concreta que responde el análisis.
- Métrica de éxito de negocio (p. ej., € ahorrados, clientes retenidos) y métrica técnica (p. ej., PR-AUC, MAPE).

## 3. Datos
- Origen, periodo, tamaño, variables principales y licencia.
- Calidad: problemas encontrados y cómo se resolvieron; validación del esquema en código.
- 1–2 gráficos del análisis exploratorio que ayuden a entender el problema.

## 4. Método y validación
- Línea base (qué se compara).
- Modelos probados y por qué; preprocesado dentro del `Pipeline`.
- Cómo se validó (partición temporal, validación cruzada, *backtesting*), por qué es adecuado y cómo se evitaron las fugas de datos.

## 5. Resultados
- Tabla comparativa de modelos frente a la línea base.
- Interpretación: qué variables o patrones explican el resultado.
- Análisis de errores: ¿en qué casos falla el modelo?

## 6. El servicio: cómo se usa
- **Cómo lo consume el negocio** (lote o petición a petición, quién llama, con qué frecuencia).
- Contrato de la API en 5 líneas (entradas, salida, versión del modelo) y un ejemplo de petición `curl` con su respuesta.
- Arquitectura en un esquema sencillo: datos → entrenamiento → imagen Docker → API → usuario.
- Garantías de calidad: nº de tests (datos, modelo, API), umbral de calidad acordado y por qué, CI en verde.

## 7. Recomendación e impacto
- Acción concreta propuesta.
- Impacto estimado (con supuestos explícitos y un rango, no una única cifra).
- Coste de operación estimado (infraestructura, mantenimiento, reentrenamiento) y quién lo asume.
- Plan de implantación y de seguimiento (¿cómo sabremos que funciona? ¿prueba A/B o grupo de control?).

## 8. Operación y monitorización
- Qué se vigila: salud del servicio (latencia, errores), **deriva** (PSI de variables clave y de la puntuación), métrica real cuando llegan las etiquetas.
- Umbrales y respuesta: qué pasa cuando el PSI supera el umbral acordado (diagnóstico antes que reentrenar).
- Cuándo y cómo se reentrena y se vuelve atrás (*rollback*).

## 9. Limitaciones, riesgos y ética
- Limitaciones de los datos y del método; cuándo **no** hay que fiarse del modelo.
- Riesgos de un uso incorrecto, sesgos posibles y colectivos afectados; coste de los falsos positivos y negativos.
- Privacidad y cumplimiento normativo (RGPD); qué datos personales trata el servicio y cómo se registran los logs.
- Ficha del modelo: enlace a `ficha.json`.

## 10. Próximos pasos

## Anexos
- Enlace al repositorio y al notebook.
- Informe de deriva y ficha del modelo.
- Fuentes y bibliografía.
- **Declaración de uso de herramientas de IA** (qué asistentes o agentes de código se usaron, para qué, y qué revisaste y decidiste tú).
