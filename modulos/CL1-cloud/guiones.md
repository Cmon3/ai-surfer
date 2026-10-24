# Módulo CL1 · Guiones de grabación

Duración de cada vídeo en el README. Diapositivas con Marp: `scripts/generar_diapositivas.sh CL1`. Demos con el notebook (moto) para los conceptos y, para las lecciones 1.6 y 1.8, una cuenta real con presupuesto de 5 € ya configurado. **Antes de grabar, comprueba que la consola no muestra datos personales ni ids de cuenta (tapa el número de cuenta).** Al acabar la grabación, borra los recursos.

## 1.1 · El mapa de la nube y una cuenta segura (15 min)
- [0–2] Gancho: la historia de la clave publicada en GitHub y la factura de miles de euros en una noche.
- [2–6] Regiones, zonas, IaaS/PaaS/SaaS en un esquema; dónde cae cada servicio que usaremos.
- [6–10] Responsabilidad compartida con ejemplos (bucket público = tuyo).
- [10–15] Demo: checklist de cuenta segura (MFA, usuario sin privilegios, etiquetas) y creación de la alarma de presupuesto.

## 1.2 · Almacenamiento de objetos (15 min)
- [0–3] Qué es un objeto y por qué no es un disco.
- [3–10] Notebook secciones 1–2: crear bucket seguro, subir modelo y ficha, ver versiones, volver a la anterior.
- [10–13] URL prefirmada: abrirla en el navegador, esperar a que caduque (o mostrar el parámetro).
- [13–15] Clases de almacenamiento, ciclo de vida y el coste oculto de las versiones.

## 1.3 · Identidades y permisos (20 min)
- [0–4] Autenticación frente a autorización; usuario, rol, política.
- [4–10] Anatomía de una política JSON; la regla de tres pasos (denegado, `Allow`, `Deny`).
- [10–16] Notebook sección 3: la función `evaluar()`, la tabla de pruebas; romper la política con `s3:*` y ver qué se abre.
- [16–20] Equivalente en Azure (RBAC, identidad gestionada) y errores clásicos.

## 1.4 · Secretos y redes básicas (15 min)
- [0–5] Por qué no en el `Dockerfile` (`docker history` muestra las variables `ENV`: demostrarlo con una imagen de I8 modificada a propósito).
- [5–9] Notebook sección 4: guardar, leer, rotar; imprimir nombres, nunca valores.
- [9–15] VPC/subredes/grupos de seguridad con un dibujo; qué te ahorran los servicios gestionados.

## 1.5 · Cómputo sin servidor (15 min)
- [0–3] Eventos y pago por uso.
- [3–10] Notebook sección 5: el handler, arranque en frío frente a caliente (leer los milisegundos), casos 400/422.
- [10–13] Límites: por qué un modelo de scikit-learn no cabe en un `.zip`; la imagen de contenedor.
- [13–15] Cuándo sí y cuándo no.

## 1.6 · Contenedores gestionados y registro (20 min)
- [0–3] Del Dockerfile de I8 al registro: ECR, ACR, Artifact Registry.
- [3–9] Demo AWS: crear repositorio, `docker push`, crear servicio App Runner, probar `/health`. Mostrar el error típico de arquitectura (ARM frente a x86) y su solución.
- [9–15] Demo Azure: `az acr build` y `az containerapp create` con `--min-replicas 0`; comparar con App Runner.
- [15–18] ECS Fargate, EKS y AKS: cuándo hacen falta (mapa de decisión).
- [18–20] **Apagar todo en directo** (`az group delete`, borrar el servicio y el repositorio) y comprobar la facturación.

## 1.7 · IA gestionada (20 min)
- [0–4] Dos familias: LLM por API frente a plataforma de ML.
- [4–10] Bedrock, Foundry y Vertex: qué ofrecen y qué ventaja tienen para una empresa (datos, IAM, auditoría). Mostrar el catálogo en consola, sin ejecutar nada de pago.
- [10–16] SageMaker y Azure ML: capacidades y, sobre todo, cuándo NO usarlos.
- [16–20] Mapa de decisión de la diapositiva; ejercicio mental con tres casos de TiendaSur.

## 1.8 · Observabilidad y costes (15 min)
- [0–5] Logs JSON de la API en CloudWatch/Monitor; una consulta de latencia p95.
- [5–11] Notebook sección 6: fórmulas, tabla, punto de equilibrio; cambiar de 120 ms a 800 ms y ver cómo se mueve.
- [11–15] Presupuestos, etiquetas, anomalías y lista de «cosas que cobran estando encendidas».

## 1.9 · Infraestructura como código y CD (15 min)
- [0–4] Por qué no por clics: reproducible, revisable, borrable.
- [4–11] Leer `main.tf` y `main.bicep` de `proyecto-cloud/`; ciclo `plan → apply → destroy` (mostrar un `plan` sin aplicarlo).
- [11–15] CD con OIDC desde GitHub Actions: la idea de los tokens temporales.

## 1.10 · Elegir nube y camino profesional (10 min)
- [0–4] Qué nube primero según las ofertas del plan; la tabla de equivalencias como chuleta de entrevista.
- [4–8] Certificaciones: para qué sirven, dónde ver los nombres vigentes, orden recomendado.
- [8–10] Presentar el entregable y cómo contarlo en una entrevista (servicio elegido, coste, apagado).
