# Módulo CL1 · Cloud para datos e IA

**N2 optativo / N3 · ~10 horas** · Llevar tu modelo del portátil a la nube, sin gastar de más y sin abrir una brecha de seguridad. Es la pieza que convierte el repositorio del módulo I8 en «desplegado en la nube», que es lo que piden las ofertas de *ML Engineer*, *AI Engineer* y *Data Engineer*.

## Qué piden las ofertas (oct. 2026)
Revisando ofertas en España, la nube aparece casi siempre con nombre y apellidos. Tres ejemplos del análisis del plan v3:
- **AWS** (el más pedido): *Lambda, S3, ECS, Bedrock* (Provectus), *SageMaker* y *Kubernetes* (Wallapop).
- **Azure** (muy frecuente en banca, seguros y consultoras): *Azure ML, Functions, Data Factory* (Reale y otras).
- **GCP**: menos frecuente, pero conviene reconocer *Cloud Run* y *Vertex AI*.

El mensaje del módulo: **los conceptos son los mismos en las tres nubes** (almacenamiento de objetos, cómputo sin servidor, contenedores gestionados, identidades y permisos, secretos, observabilidad, costes). Aprende el patrón una vez, con AWS como idioma principal y Azure como segundo, y traducirás.

## Objetivos
Al terminar este módulo podrás:
- Explicar el **modelo de responsabilidad compartida** y dejar una cuenta nueva segura: MFA, sin usar la cuenta raíz y **alarma de presupuesto** el primer día.
- Usar **almacenamiento de objetos** (S3 / Blob Storage / Cloud Storage) con cifrado, versionado y URLs prefirmadas, y guardar un modelo con su ficha.
- Escribir una política de **mínimo privilegio** (IAM / RBAC) y razonar qué permite y qué deniega.
- Gestionar **secretos** fuera del código y de la imagen.
- Elegir entre **funciones sin servidor**, **contenedores gestionados** y **máquinas/clústeres** según tráfico, latencia y coste.
- **Desplegar la imagen del módulo I8** en AWS (ECR + App Runner) y en Azure (ACR + Container Apps), y **apagarla** para no pagar.
- Saber **cuándo usar** Bedrock / Foundry / Vertex AI (LLMs gestionados) y cuándo SageMaker / Azure ML (plataforma de ML).
- Estimar costes con fórmulas y vigilar el gasto.
- Describir la infraestructura como código (Terraform, Bicep) y traducir servicios entre AWS, Azure y GCP.

## Prerrequisitos
Módulo **I8** (Docker, FastAPI, CI) y manejo básico de terminal (F5). Para la parte real: una cuenta de AWS y/o Azure y una tarjeta bancaria (se exige para verificar la cuenta, aunque uses la capa gratuita).

## Lecciones
| # | Lección | Vídeo |
|---|---|---|
| 1.1 | El mapa de la nube: regiones, responsabilidad compartida y una cuenta segura | 15 min |
| 1.2 | Almacenamiento de objetos: S3, Blob Storage y Cloud Storage | 15 min |
| 1.3 | Identidades y permisos: IAM, Entra ID, RBAC y el mínimo privilegio | 20 min |
| 1.4 | Secretos y redes básicas | 15 min |
| 1.5 | Cómputo sin servidor: Lambda y Functions | 15 min |
| 1.6 | Contenedores gestionados y registro de imágenes (ECR, ACR, App Runner, ECS Fargate, Container Apps, Cloud Run) | 20 min |
| 1.7 | IA gestionada: Bedrock, Foundry, Vertex AI; SageMaker y Azure ML (cuándo sí y cuándo no) | 20 min |
| 1.8 | Observabilidad y costes: CloudWatch, Monitor, presupuestos y alarmas | 15 min |
| 1.9 | Infraestructura como código y despliegue continuo: Terraform y Bicep | 15 min |
| 1.10 | Elegir nube y camino profesional: certificaciones | 10 min |

## Materiales del módulo
| Material | Para qué sirve |
|---|---|
| [`apuntes.md`](apuntes.md) | Teoría de cada lección, tabla de equivalencias y glosario |
| [`diapositivas.md`](diapositivas.md) | Diapositivas (Marp; el PDF se genera con `scripts/generar_diapositivas.sh`) |
| [`notebook.ipynb`](notebook.ipynb) | Práctica guiada **sin credenciales ni red** (AWS simulado con `moto`) |
| [`cuestionario.md`](cuestionario.md) | Cuestionario evaluable (10 preguntas) |
| [`recursos-abiertos.md`](recursos-abiertos.md) | Documentación y cursos gratuitos recomendados |
| [`guiones.md`](guiones.md) | *Instructores:* guiones para grabar los vídeos |
| [`soluciones.ipynb`](soluciones.ipynb) | *Instructores:* soluciones de los ejercicios |

## Práctica guiada
[`notebook.ipynb`](notebook.ipynb) usa **moto**, una librería que simula AWS en memoria: ejecutas código `boto3` idéntico al real, pero no hay cuenta, ni red, ni coste. Practicas:
1. **S3**: crear un bucket seguro, subir el modelo y la ficha del módulo I8, versionado (volver a una versión anterior) y URL prefirmada.
2. **IAM**: escribir una política de mínimo privilegio en JSON y una función propia `evaluar()` que imita cómo decide IAM (denegado por defecto, `Allow`, `Deny` explícito).
3. **Secrets Manager**: guardar, leer y rotar un secreto.
4. **Lambda** (conceptual): un *handler* que carga el modelo desde S3, testeable en local, con arranque en frío medido.
5. **Costes**: fórmulas de pago por uso frente a instancia fija y punto de equilibrio (precios orientativos), más una alarma de presupuesto.
6. **Plantillas** en `proyecto-cloud/`: scripts de AWS CLI y de `az`, Bicep y Terraform para App Runner / Container Apps (se escriben, **no se aplican**).

Requisitos: `requirements.txt` del curso más `moto` y `boto3` (`pip install moto boto3`).

## Guía: hazlo de verdad con la capa gratuita (y apágalo)
Hazlo **después** del notebook. Una hora, coste esperado cercano a cero si sigues el orden, sobre todo el último paso. Las condiciones de la capa gratuita y de los créditos iniciales **cambian**: lee la oferta vigente en la web de cada proveedor antes de registrarte.

**Antes de empezar (obligatorio, 15 min)**
1. Crea la cuenta con un correo propio y activa **MFA** en el usuario raíz. No uses el usuario raíz para trabajar: crea un usuario/rol con permisos limitados (en AWS, IAM Identity Center o un usuario IAM; en Azure, tu usuario de Entra ID con el rol *Contributor* solo sobre un grupo de recursos).
2. Crea la **alarma de presupuesto** (AWS Budgets / Azure Cost Management) con un tope de 5 € y aviso al 80 %. Un presupuesto *avisa*, no corta el gasto: por eso el último paso es borrar.
3. Elige región cercana (por ejemplo `eu-west-1` o `eu-south-2` en AWS; `westeurope` o `spaincentral` en Azure; comprueba que los servicios existen allí).

**Opción A · AWS (ECR + App Runner)** — sigue `proyecto-cloud/aws/desplegar-apprunner.sh`
1. Prepara la imagen de I8 (`docker build` en `modulos/I8-produccion/proyecto-churn`). Si usas Mac con chip Apple, construye con `--platform linux/amd64`.
2. Crea el repositorio en **ECR** y sube la imagen (`docker push`).
3. Crea el servicio **App Runner** con el tamaño mínimo y comprobación de salud en `/health`.
4. Prueba `curl https://<url>/health` y una petición a `/predict`.
5. **Apaga**: elimina el servicio de App Runner, el repositorio de ECR (`--force`) y el rol. Comprueba en *Billing* que no queda nada en marcha.

**Opción B · Azure (ACR + Container Apps)** — sigue `proyecto-cloud/azure/desplegar-containerapps.sh`
1. Crea un **grupo de recursos** (todo irá dentro).
2. Crea un registro **ACR** y construye la imagen en la nube con `az acr build` (no necesitas Docker local).
3. Crea el entorno y la **Container App** con `--min-replicas 0` (escala a cero: sin tráfico, sin cómputo).
4. Prueba la URL pública.
5. **Apaga**: `az group delete --name rg-tiendasur-churn --yes`. Borrar el grupo de recursos elimina todo lo que contiene.

**Opcional (ECS Fargate)**: es la alternativa a App Runner que más aparece en ofertas; más piezas (clúster, definición de tarea, balanceador, red) y más control. Repite el despliegue con la consola de ECS una vez dominado App Runner.

> **Regla de oro**: lo que no se apaga se factura. Apunta en tu calendario «borrar recursos» para esa misma tarde.

## Caso práctico (entregable)
**«Mi modelo en la nube»**: añade a tu repositorio del módulo I8 una carpeta `despliegue/` y un README de despliegue con:
1. La **imagen publicada** en un registro (ECR, ACR o GHCR) y el servicio desplegado en un contenedor gestionado; incluye la URL en el README **o** capturas y la salida de `curl /health` si la has apagado (lo normal).
2. Una **política de mínimo privilegio** (JSON o Bicep/Terraform) para el servicio, con un párrafo que explique cada permiso.
3. Los **secretos** fuera del código: explica dónde viven y cómo los lee el servicio.
4. Una **estimación de costes** (tabla con tus supuestos: peticiones/mes, memoria, duración) y la **alarma de presupuesto** configurada (captura).
5. La infraestructura descrita como código (Terraform o Bicep), aunque no la hayas aplicado, y una sección «cómo apagar todo».
6. Una tabla «equivalente en la otra nube» para los servicios que has usado.

**Criterios:** despliegue funcionando y documentado 30 % · seguridad (mínimo privilegio, secretos, sin credenciales en Git) 25 % · costes y apagado 20 % · infraestructura como código 15 % · claridad del README 10 %.

> Este entregable es el que cierra el perfil **ML Engineer / MLOps** del plan: «repositorio I8 desplegado en la nube con monitorización».

## Autoevaluación
1. ¿Por qué se activa el versionado en un bucket que guarda modelos?
2. Una función solo necesita leer `churn/modelo.joblib`. ¿Qué dos dimensiones debes limitar en su política?
3. ¿Dónde guardas la clave de una API que usa tu servicio y por qué no en una variable del `Dockerfile`?
4. Tu modelo recibe 200 000 peticiones al mes con picos esporádicos. ¿Funciones sin servidor o instancia fija? ¿Qué cambiaría tu decisión?
5. ¿Por qué un presupuesto no te protege por sí solo de una factura inesperada?

<details><summary>Respuestas</summary>

1. Porque sobrescribir o borrar por error no destruye la versión anterior: puedes volver atrás (por ejemplo, restaurar el modelo previo si el nuevo falla) y queda un historial auditable.
2. La **acción** (`GetObject`, no `*`) y el **recurso** (solo el prefijo o el objeto necesario, no todo el bucket). Es el principio de mínimo privilegio.
3. En un gestor de secretos (Secrets Manager, Key Vault, Secret Manager); el servicio lo lee en ejecución con el permiso de su rol. Lo que va en el `Dockerfile` queda en las capas de la imagen y cualquiera con acceso a la imagen puede extraerlo.
4. Con tráfico bajo e irregular, funciones sin servidor (o un contenedor que escala a cero) casi siempre es más barato. Cambiaría si el tráfico fuera alto y constante (la instancia fija sale a cuenta), si la latencia exigida no tolera el arranque en frío o si el paquete del modelo supera los límites.
5. Porque avisa, no corta: el gasto sigue mientras el recurso exista. Hay que actuar (borrar recursos) y, en algunos servicios, añadir acciones automáticas o límites propios.
</details>

## Certificaciones (para tu CV)
Las certificaciones no sustituyen al portafolio, pero en consultoras y empresas grandes abren puertas. Los **nombres, códigos y precios cambian con frecuencia**: comprueba siempre el catálogo vigente en las webs oficiales.
- **AWS**: hay una línea de fundamentos de nube, otra de fundamentos de IA y un nivel *associate* orientado a ingeniería de ML (busca «AWS Certified» + «AI Practitioner» y «Machine Learning Engineer – Associate»).
- **Azure**: certificaciones de fundamentos de IA y de datos, y una orientada a científicos de datos en Azure y otra a ingeniería de soluciones de IA (busca en Microsoft Learn las rutas «Azure AI» y «Azure Data Scientist»).
- **GCP**: ruta de *Machine Learning Engineer* de Google Cloud.
Orden recomendado: portafolio desplegado primero; después la certificación de fundamentos de la nube que más aparezca en las ofertas que quieras.

## Lecturas y recursos
Ver [`recursos-abiertos.md`](recursos-abiertos.md). Imprescindibles: la documentación de *AWS Well-Architected* (pilares de seguridad y costes), *Microsoft Learn* (rutas gratuitas de Azure) y el curso gratuito *MLOps Zoomcamp* (DataTalks.Club) para la parte de despliegue.
