# Plantilla · README de un proyecto de portafolio

> Copia este archivo como `README.md` en la raíz de tu repositorio y sustituye lo que está entre `[corchetes]`. Borra las notas en cursiva. Regla de oro: **un reclutador técnico dedica menos de dos minutos al README; la primera pantalla tiene que contestar «qué es, funciona y qué sabe hacer esta persona».**

---

# [Nombre del proyecto]: [qué hace en una frase, con el resultado]

[![CI](https://github.com/[usuario]/[repo]/actions/workflows/ci.yml/badge.svg)](https://github.com/[usuario]/[repo]/actions)
![Python](https://img.shields.io/badge/python-3.12-blue)

*Insignia de CI en verde: es la prueba más barata de que el proyecto funciona. Si el CI está en rojo, arréglalo antes de enseñar el repositorio.*

**Demo:** [enlace a la demo, a un vídeo de 60 s o a una captura/GIF]

## El problema
[Dos o tres frases en lenguaje de negocio: quién tiene el problema, cuánto le cuesta y qué decisión se toma con el resultado. Ejemplo: «TiendaSur pierde clientes sin saberlo. Marketing necesita una lista semanal de los 200 clientes con más riesgo de abandono para ofrecerles una oferta de retención».]

## Resultado
| Métrica | Línea base | Este proyecto |
|---|---|---|
| [métrica técnica, p. ej. PR-AUC] | [valor] | [valor] |
| [métrica de negocio, p. ej. margen retenido estimado] | [valor] | [valor, con supuestos] |

*Siempre frente a una línea base. Un 92 % de exactitud sin comparar con nada no dice nada.*

## Cómo ejecutarlo en 3 comandos
```bash
git clone https://github.com/[usuario]/[repo] && cd [repo]
pip install -r requirements.txt        # o: docker build -t [nombre] .
python -m [paquete].entrenar && uvicorn [paquete].api:app   # o: docker run -p 8000:8000 [nombre]
```

Ejemplo de petición:
```bash
curl -X POST localhost:8000/predict -H "content-type: application/json" -d '{"[campo]": [valor]}'
```

## Cómo está hecho
- **Datos:** [origen, periodo, tamaño, licencia; cómo se validan].
- **Modelo:** [qué se probó, por qué se eligió este, cómo se validó sin fugas].
- **Servicio:** [FastAPI, Docker, CI con lint + tests + entrenamiento + imagen].
- **Decisiones y descartes:** [2–3 viñetas: «probé X y lo descarté porque Y»]. *Esto es lo que más se valora en una entrevista.*

```
[árbol de carpetas de 8–12 líneas]
```

## Limitaciones y siguientes pasos
- [Qué no hace bien el modelo y en qué casos no debe usarse].
- [Riesgos: sesgos, privacidad, deriva].
- [Qué harías con una semana más].

## Qué demuestra este proyecto
*Una línea por competencia y evidencia. Usa las palabras de las ofertas a las que aspiras (cuando sea verdad).*
- Python y tests (`tests/`, [n] pruebas, CI en verde).
- APIs y contenedores: FastAPI + Docker.
- [Evaluación / RAG / agentes / MLflow...]: [dónde está en el repositorio].

## Licencia y autoría
[MIT u otra] · [Tu nombre] · [LinkedIn] · [correo]
