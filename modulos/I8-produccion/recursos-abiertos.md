# Módulo I8 · Recursos abiertos recomendados

Complemento a los apuntes y al notebook. Todo gratuito. Revisa la licencia de cada recurso en [docs/recursos-y-licencias.md](../../docs/recursos-y-licencias.md) antes de incrustarlo en una plataforma de pago.

## Por lección

| Lección | Recurso | Tipo |
|---|---|---|
| 8.1 | Python Packaging User Guide: *Packaging Python Projects* — https://packaging.python.org/en/latest/tutorials/packaging-projects/ | documentación |
| 8.2 | scikit-learn: *Pipelines and composite estimators* y *Common pitfalls: data leakage* — https://scikit-learn.org/stable/common_pitfalls.html | documentación |
| 8.3 | FastAPI: *Tutorial – User Guide* (en español) — https://fastapi.tiangolo.com/es/tutorial/ | tutorial |
| 8.4 | pytest: *Get started* y *Fixtures* — https://docs.pytest.org | documentación |
| 8.4 | Ribeiro et al., *Beyond Accuracy: Behavioral Testing of NLP Models with CheckList* (2020) — tests direccionales e invariancia | artículo |
| 8.5 | Docker: *Get started* y *Python language guide* — https://docs.docker.com/guides/python/ | tutorial |
| 8.6 | GitHub Actions: *Building and testing Python* — https://docs.github.com/en/actions | documentación |
| 8.7 | MLflow: *Tracking quickstart* — https://mlflow.org/docs/latest/ | documentación |
| 8.8 | Evidently AI: guías abiertas sobre *data drift* y monitorización de ML — https://www.evidentlyai.com/ml-in-production | lectura |
| 8.9 | Documentación de Claude Code: *Best practices* y archivos `CLAUDE.md` — https://code.claude.com/docs | documentación |

## Cursos completos (para profundizar)

- **MLOps Zoomcamp** (DataTalks.Club) — curso gratuito con cohortes, MLflow, orquestación, despliegue y monitorización: https://github.com/DataTalksClub/mlops-zoomcamp
- **Made With ML** (Goku Mohandas) — del notebook a producción con buenas prácticas: https://madewithml.com
- **Full Stack Deep Learning** — vídeos y apuntes abiertos sobre despliegue y monitorización.

## Práctica extra (recomendada)

- Despliega tu imagen en un servicio gestionado con capa gratuita (Google Cloud Run, AWS App Runner o Azure Container Apps) y añade la URL al README. Apaga el servicio al terminar para no generar costes.
- Añade a tu CI un paso que falle si el PSI de un conjunto de «datos nuevos» supera 0,2.
