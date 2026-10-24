# Módulo CL1 · Cloud para datos e IA — Apuntes

> Objetivo: que sepas llevar un modelo a la nube con criterio —seguro, barato y reversible— y que lo que aprendas en una nube te sirva en las otras dos. Los precios y límites de este documento son **órdenes de magnitud**: comprueba siempre la documentación vigente.

---

## 1.1 · El mapa de la nube: regiones, responsabilidad compartida y una cuenta segura

**Qué es la nube, en una frase:** alquilar recursos de cómputo, almacenamiento y servicios gestionados a través de una API, pagando por lo que usas. Todo lo que haces en la consola web se puede hacer con una línea de comandos o con código, y eso es lo que permite automatizar.

**Tres capas de servicio**
- **IaaS** (máquinas virtuales, discos, redes): tú gestionas el sistema operativo. Máxima flexibilidad, máximo trabajo.
- **PaaS / contenedores gestionados / funciones**: tú aportas código o una imagen; el proveedor gestiona servidores, parches y escalado.
- **SaaS / servicios de IA gestionados**: consumes una capacidad ya hecha (por ejemplo, un LLM por API).

Regla práctica: **sube por la escalera** (más gestionado) mientras no necesites algo que ese nivel no te deje hacer.

**Regiones y zonas.** Una *región* es una zona geográfica con varios centros de datos (*zonas de disponibilidad*). Eliges región por tres razones: **latencia** (cerca de tus usuarios), **normativa** (datos personales de ciudadanos de la UE: mejor en una región europea; el RGPD condiciona dónde y cómo se tratan) y **precio** (varía entre regiones). No todos los servicios están en todas las regiones: comprueba la tabla de disponibilidad.

**Modelo de responsabilidad compartida.** El proveedor es responsable *de* la nube (edificios, hardware, red física, el servicio gestionado). Tú eres responsable *en* la nube: quién tiene acceso, qué datos subes, cómo configuras cada recurso. Casi todas las filtraciones de datos en la nube vienen de **configuración del cliente** (un bucket público, una clave publicada en GitHub), no de que el proveedor sea hackeado.

**Cuenta segura el primer día (checklist)**
1. MFA en el usuario raíz/propietario; no lo uses para el trabajo diario.
2. Un usuario o rol con permisos limitados para trabajar (nada de claves de acceso del usuario raíz).
3. **Alarma de presupuesto** (ver 1.8).
4. Etiquetar (*tag*) los recursos con proyecto y responsable: sin etiquetas no sabes qué borrar ni quién gasta.
5. Nunca subir credenciales a Git. Si ocurre, **rótalas ya**: los bots las encuentran en minutos.

---

## 1.2 · Almacenamiento de objetos: S3, Blob Storage y Cloud Storage

El almacenamiento de objetos guarda archivos (*objetos*) dentro de contenedores (*buckets* en AWS y GCP; *contenedores* dentro de una *cuenta de almacenamiento* en Azure), accesibles por HTTP. No es un disco: no editas un byte en el sitio, reemplazas el objeto entero. A cambio es barato, prácticamente ilimitado y muy duradero. Es la base de los **lagos de datos**, los registros de modelos, los *datasets* y los resultados de procesos por lotes.

**Claves de un objeto:** `bucket + clave` (p. ej. `tiendasur-modelos-dev` + `churn/modelo.joblib`). Los «directorios» son solo prefijos en la clave.

**Ajustes que haces SIEMPRE al crear un bucket**
- **Bloquear el acceso público** (en AWS, *Block Public Access*; en Azure, desactivar acceso anónimo a nivel de cuenta).
- **Cifrado en reposo** (hoy suele estar activado por defecto; compruébalo; claves gestionadas por el proveedor o por ti).
- **Versionado**: cada escritura crea una versión nueva; «borrar» pone una marca, no destruye. Te permite deshacer un despliegue de modelo defectuoso o recuperar un archivo borrado por error. Cuesta almacenamiento extra: combínalo con **reglas de ciclo de vida** (pasar a clases más baratas y borrar versiones antiguas tras N días).

**Clases de almacenamiento.** Acceso frecuente → estándar; poco frecuente → clase más barata con coste por lectura; archivo → muy barato pero con espera para recuperar. Cada nube las nombra distinto (en Azure, niveles *hot/cool/cold/archive*).

**URL prefirmada (SAS en Azure).** Para dar acceso temporal a UN objeto sin hacer público el bucket ni compartir credenciales: el servidor genera una URL firmada con caducidad (`generate_presigned_url` en `boto3`; *Shared Access Signature* en Azure; *signed URL* en GCP). Ejemplo típico: la web de TiendaSur permite descargar un informe durante 10 minutos.

**Qué guardar con un modelo:** el binario (`modelo.joblib`) **y** su ficha (`ficha.json`): versión, métricas, huella de los datos, umbral, limitaciones. Una convención útil: `modelos/<nombre>/<versión>/modelo.joblib`. Para modelos con muchos cambios, un registro de modelos (MLflow, SageMaker Model Registry, Azure ML) añade estados y aprobaciones.

**Cuidado con los costes ocultos:** la salida de datos a Internet (*egress*), las peticiones muy numerosas y las versiones que nadie borra.

---

## 1.3 · Identidades y permisos: IAM, Entra ID, RBAC y el mínimo privilegio

**Autenticación** responde a «¿quién eres?»; **autorización** a «¿qué puedes hacer?». En la nube todo es una llamada a una API y cada llamada se autoriza.

**Piezas en AWS (IAM)**
- **Usuario**: una persona (hoy se prefiere *IAM Identity Center* con inicio de sesión único en lugar de usuarios con claves duraderas).
- **Rol**: una identidad que *se asume* temporalmente; la usan servicios (una Lambda, un contenedor) y personas. **No tiene contraseña ni claves fijas**: recibe credenciales temporales. Es la forma correcta de dar permisos a tu código en la nube.
- **Política**: un documento JSON con sentencias `Effect` (`Allow`/`Deny`), `Action` (`s3:GetObject`), `Resource` (un ARN) y, opcionalmente, `Condition`.
- **Política de confianza** (de un rol): quién puede asumirlo (p. ej. el servicio `lambda.amazonaws.com`).

**Cómo decide IAM (simplificado)**
1. Todo está **denegado por defecto**.
2. Un `Allow` que coincida permite.
3. Un **`Deny` explícito siempre gana**.

Eso es lo que implementa la función `evaluar()` del notebook. Merece la pena escribirla una vez para interiorizarlo.

**Mínimo privilegio.** Da solo las acciones y sobre solo los recursos que hacen falta. Una política con `"Action": "*"` y `"Resource": "*"` es un administrador total; en un servicio de producción es una brecha esperando a ocurrir. Método: empieza sin nada, ejecuta, mira qué acciones deniega, y añade solo esas (las herramientas de análisis de accesos de cada nube ayudan a afinar con el uso real).

**Azure: Entra ID y RBAC.** Entra ID (antes Azure Active Directory) es el directorio de identidades. Los permisos sobre recursos se dan con **RBAC**: asignas un **rol** (p. ej. *Storage Blob Data Reader*) a una **identidad** (usuario, grupo, *identidad gestionada* de un servicio) en un **ámbito** (suscripción > grupo de recursos > recurso). La **identidad gestionada** es el equivalente al rol de servicio de AWS: tu aplicación se autentica sin contraseñas.

**GCP:** Cloud IAM con *cuentas de servicio* y roles asignados a nivel de proyecto o recurso.

**Errores clásicos:** claves de acceso en el código o en Git; usar el usuario raíz; un `s3:*` «para que funcione»; compartir una cuenta entre varias personas.

---

## 1.4 · Secretos y redes básicas

**Secretos.** Una clave de API, una contraseña de base de datos, un token. Reglas:
- **Nunca** en el código, en el repositorio, en un `Dockerfile` ni en la imagen (queda en las capas y es extraíble).
- Se guardan en un **gestor de secretos**: *AWS Secrets Manager* (o *Systems Manager Parameter Store* para valores simples), *Azure Key Vault*, *GCP Secret Manager*. Cifrados, versionados, auditados.
- La aplicación los lee **en ejecución** con el permiso de su rol/identidad gestionada; el servicio puede inyectarlos como variables de entorno al arrancar.
- **Rotación**: se crea una versión nueva y la antigua queda marcada como anterior. Si rotas, la aplicación debe poder leer la nueva sin redesplegar.
- En desarrollo local usa un `.env` en el `.gitignore`; en CI, los secretos cifrados de la plataforma (GitHub *Secrets*), y si es posible federación OIDC en lugar de claves duraderas.

**Redes básicas (lo mínimo para entender conversaciones y entrevistas)**
- **VPC / VNet**: tu red privada virtual en la nube, dividida en *subredes*. Las **públicas** tienen salida a Internet directa; las **privadas** no son accesibles desde fuera.
- **Grupos de seguridad / NSG**: cortafuegos con estado asociados a recursos. Por defecto, denegar entrada y abrir solo lo necesario (p. ej. el puerto 443 al balanceador, no el 22 a todo el mundo).
- **Balanceador** y **DNS**: reparten el tráfico y dan un nombre estable al servicio. Los servicios gestionados (App Runner, Container Apps, Cloud Run) te dan HTTPS y URL sin montar nada de esto.
- **Endpoints privados**: acceso a un servicio (almacenamiento, base de datos) sin pasar por Internet.
- Principio: lo que no necesita ser público, no es público. Las bases de datos y los buckets de datos de clientes, nunca.

---

## 1.5 · Cómputo sin servidor: Lambda y Functions

**Idea:** subes una función; el proveedor la ejecuta cuando llega un **evento** (una petición HTTP, un archivo nuevo en S3, un mensaje en una cola, un cron) y la escala de 0 a miles de instancias. Pagas por **invocaciones y por tiempo × memoria** (GB-segundo). Sin tráfico, no pagas.

**Equivalentes:** AWS Lambda · Azure Functions · GCP Cloud Run functions (antes Cloud Functions).

**Anatomía de un handler (Python en Lambda)**
```python
def handler(event, context):
    # event: datos del disparador (p. ej. cuerpo de una petición HTTP)
    # context: metadatos de la invocación
    return {"statusCode": 200, "body": "..."}
```
Es una función normal: **se prueba en local** llamándola con un diccionario, como hace el notebook. Haz eso siempre antes de desplegar.

**Arranque en frío.** La primera invocación (o la primera tras un periodo sin uso) crea el entorno, importa librerías y carga el modelo; las siguientes («calientes») reutilizan todo. Consecuencias de diseño:
- Crea clientes (`boto3`) y carga el modelo **fuera** del handler, en el ámbito del módulo, para reutilizarlos.
- Reduce el tamaño del paquete y las dependencias.
- Si la latencia debe ser estable, existen opciones de «concurrencia aprovisionada» (pagas por tenerla caliente) o elige contenedores.

**Límites típicos** (comprueba los vigentes): tiempo máximo por invocación (minutos, no horas), memoria máxima, tamaño del paquete. Un modelo con scikit-learn o PyTorch **no cabe** en el límite de un `.zip` con facilidad; la solución es empaquetar la función como **imagen de contenedor** (hasta 10 GB en Lambda) o usar un contenedor gestionado.

**Cuándo sí:** tráfico irregular, procesos disparados por eventos (procesar un CSV cuando se sube), prototipos, glue entre servicios. **Cuándo no:** latencia muy baja y estable, procesos largos, cargas constantes y altas (sale más barato un servicio siempre encendido), modelos grandes con inferencia pesada.

---

## 1.6 · Contenedores gestionados y registro de imágenes

Aquí se despliega la imagen que construiste en **I8**. Dos pasos: subir la imagen a un **registro** y decirle a un servicio que la ejecute.

**Registros de imágenes:** AWS **ECR** · Azure **ACR** (Container Registry) · GCP **Artifact Registry**. También sirve GHCR (GitHub). Buenas prácticas: etiquetar con versión (no solo `latest`), escanear vulnerabilidades al subir, política de ciclo de vida para borrar imágenes antiguas (se cobra almacenamiento).

**Flujo de AWS (resumen)**
```
docker build --platform linux/amd64 -t <cuenta>.dkr.ecr.<región>.amazonaws.com/churn:v1 .
aws ecr get-login-password | docker login --username AWS --password-stdin <registro>
docker push <imagen>
```
Detalle importante: si construyes en un Mac con chip Apple (ARM) y el servicio ejecuta x86, la imagen no arrancará. Usa `--platform` o construye en CI.

**Qué servicio elegir**

| Servicio | Qué es | Cuándo |
|---|---|---|
| **AWS App Runner** | Das la imagen, te devuelve una URL HTTPS con escalado automático | Lo más simple en AWS para una API |
| **Amazon ECS Fargate** | Orquestador de contenedores sin gestionar servidores: defines *tarea* y *servicio*, red y balanceador | Lo más pedido en ofertas; más control (varios contenedores, redes privadas) |
| **Amazon EKS** | Kubernetes gestionado | Equipos que ya usan Kubernetes (p. ej. Wallapop); más complejidad |
| **Azure Container Apps** | Contenedores sin servidor, escalan a 0, basado en Kubernetes (que no gestionas) | La opción simple en Azure |
| **Azure App Service / AKS** | PaaS web clásico / Kubernetes gestionado | App Service para webs; AKS para equipos con Kubernetes |
| **GCP Cloud Run** | Contenedores sin servidor, escala a 0 | Referente de simplicidad |

**Requisitos de tu contenedor para que funcione bien en estos servicios**
- Escucha en el puerto que declaras (`8000` en I8) y en `0.0.0.0`.
- Expone `/health` (el servicio lo usa para saber si está sano; I8 ya lo tiene).
- Configuración por **variables de entorno**, secretos desde el gestor de secretos.
- Registra por **stdout** (los servicios recogen los logs y los envían a CloudWatch / Monitor).
- Sin estado local importante: las instancias se crean y destruyen.
- El modelo va en la imagen (simple) o se descarga de S3/Blob al arrancar (más flexible; actualizas el modelo sin reconstruir la imagen; necesita permiso de lectura del rol).

**Escalar a cero** (Container Apps, Cloud Run) ahorra dinero pero introduce arranque en frío; en App Runner mantienes al menos una instancia con memoria aprovisionada (coste base bajo, pero no cero).

---

## 1.7 · IA gestionada: Bedrock, Foundry, Vertex AI; SageMaker y Azure ML

Hay dos familias de servicios de IA en la nube y conviene no mezclarlas.

**A) LLMs y modelos de fundación como servicio (consumo por API)**
- AWS **Bedrock**: acceso por API a modelos de varios proveedores (incluido Claude), con guardarraíles, bases de conocimiento y agentes. Facturación por tokens.
- Azure **Foundry** (antes Azure AI Studio / Azure AI Foundry; comprueba el nombre vigente): catálogo de modelos (entre ellos los de Azure OpenAI), evaluación y agentes.
- GCP **Vertex AI** (con *Model Garden*).

Cuándo: asistentes, extracción, resumen, RAG, agentes. Ventajas para una empresa: los datos no salen del perímetro del proveedor/contrato, control de acceso con IAM/RBAC, auditoría, facturación unificada, cumplimiento. Es el equivalente «corporativo» de llamar a la API del módulo AI2.

**B) Plataformas de ML para entrenar, registrar y servir tus propios modelos**
- AWS **SageMaker**: cuadernos, trabajos de entrenamiento y ajuste, *endpoints* de inferencia, registro de modelos, *pipelines*, monitorización.
- **Azure Machine Learning**: lo equivalente (espacio de trabajo, trabajos, *endpoints* gestionados).
- **Vertex AI** (también cubre esta familia).

Cuándo SÍ: equipo de varias personas, entrenamientos grandes o con GPU, reentrenamientos periódicos, necesitas registro de modelos, linaje, aprobaciones y monitorización integrados, o la empresa ya lo ha estandarizado (ofertas que piden SageMaker o Azure ML).
Cuándo NO: un solo modelo pequeño con tráfico moderado: un contenedor gestionado (sección 1.6) es más simple y barato. SageMaker no es mala idea, pero añade conceptos y costes (un *endpoint* encendido se factura 24 h aunque nadie lo llame).

**Heurística de decisión**
1. ¿Basta con un LLM existente? → Bedrock / Foundry / Vertex (no entrenes nada).
2. ¿Tu propio modelo clásico (scikit-learn, XGBoost) con poco tráfico? → contenedor gestionado o función.
3. ¿Entrenamiento pesado, equipo y gobierno de modelos? → SageMaker / Azure ML / Vertex AI.
4. ¿Inferencia con GPU, picos grandes y latencia estricta? → endpoints gestionados o Kubernetes con autoescalado (y los consejos del módulo AI7).

---

## 1.8 · Observabilidad y costes

**Observabilidad en la nube** = métricas + logs + trazas + alarmas.
- AWS **CloudWatch** (Logs, Metrics, Alarms), **X-Ray** para trazas; Azure **Monitor** con **Application Insights** y **Log Analytics**; GCP **Cloud Monitoring** y **Cloud Logging**.
- Tu API de I8 ya escribe **logs JSON** por stdout: con ellos puedes consultar latencia, tasa de errores o distribución de predicciones sin tocar nada. Consultas en CloudWatch Logs Insights o en KQL (Azure).
- Alarmas útiles para un servicio de ML: tasa de errores 5xx, latencia p95, instancias reiniciadas, y —métricas propias— deriva (PSI del módulo I8) enviada como métrica personalizada.
- Define **retención** de logs (por defecto en algunos servicios es «para siempre» y cuesta).

**Costes: cómo se factura**
- **Cómputo**: por hora/segundo de instancia, o por GB-segundo y número de invocaciones (sin servidor).
- **Almacenamiento**: GB-mes, más peticiones.
- **Red**: la entrada es gratis; la **salida a Internet** y entre regiones se cobra.
- **Servicios gestionados**: por uso (tokens en Bedrock/Foundry) o por tiempo encendido (endpoints de SageMaker/Azure ML).

**Fórmula base de funciones sin servidor**
`coste = (peticiones / 10^6) × precio_por_millón + peticiones × segundos × (memoria_MB / 1024) × precio_por_GB·s`
frente a `coste_fijo = instancias × precio_hora × 730`.
El notebook calcula el **punto de equilibrio**: por debajo, pago por uso; por encima, instancia fija. El punto cambia mucho con el tiempo por petición (un modelo de 800 ms lo mueve más de 5 veces).

**Controles de gasto (en orden de importancia)**
1. **Presupuesto con alertas** (AWS Budgets, Cost Management de Azure, presupuestos de facturación de GCP): umbral real al 80 % y alerta por **previsión** al 100 %. Avisa, no corta.
2. **Etiquetas** y vistas de costes por proyecto (Cost Explorer / Cost Analysis).
3. **Detección de anomalías** de costes (disponible en las tres nubes).
4. **Apagar**: borrar lo que no uses. Servicios que se facturan encendidos aunque no tengan tráfico: máquinas virtuales, balanceadores, *NAT gateways*, endpoints de SageMaker/Azure ML, bases de datos, clústeres.
5. **Capa gratuita y créditos**: útiles para aprender, pero con condiciones y fechas de caducidad que cambian; léelas. Y recuerda que un servicio fuera de la capa gratuita se factura.

---

## 1.9 · Infraestructura como código y despliegue continuo

Crear recursos con clics es rápido pero no es **reproducible** ni **revisable**. La **infraestructura como código** (IaC) describe los recursos en archivos versionados en Git:
- **Terraform** (HashiCorp; existe también el fork abierto OpenTofu): lenguaje declarativo multinube. Ciclo `init → plan → apply → destroy`. **`plan` te muestra qué cambiará antes de tocar nada: léelo siempre.** Mantiene un *estado* (qué recursos gestiona); en equipo se guarda en un almacén remoto con bloqueo.
- **CloudFormation / CDK** (AWS) y **Bicep / ARM** (Azure): nativos de cada nube.
- Plantillas de ejemplo en `proyecto-cloud/` tras ejecutar el notebook: `aws/main.tf`, `azure/main.tf`, `azure/main.bicep`.

**Despliegue continuo (CD)** sobre el CI de I8: tras lint, tests y construcción de la imagen, el flujo hace `push` al registro y actualiza el servicio. Autenticación **sin claves duraderas**: federación OIDC entre GitHub Actions y un rol de AWS / identidad federada de Azure (el flujo pide un token temporal). Para entornos: `dev` y `prod`, con aprobación manual antes de `prod`.

Buenas prácticas: variables en lugar de valores incrustados, módulos reutilizables, no meter secretos en el código ni en el estado, y **`destroy` o borrar el grupo de recursos** para entornos de aprendizaje.

---

## 1.10 · Elegir nube y camino profesional

**¿Cuál aprender primero?** La que piden las ofertas de tu objetivo. Con los datos del plan: **AWS** como principal (más ofertas de ML/AI en startups y tecnológicas), **Azure** como segunda (banca, seguros, consultoría y empresas con ecosistema Microsoft), **GCP** para reconocer los equivalentes. Si tu empresa objetivo ya usa una, esa.

**Cómo demostrarlo**
1. Un repositorio con el despliegue documentado (entregable del módulo) pesa más que cualquier certificado.
2. Certificaciones: aportan en consultoras y grandes empresas, que a veces exigen una determinada para licitar. Existen niveles de fundamentos, de asociado y profesional en AWS y Azure, con rutas de IA y de ML. **Los nombres, códigos, precios y caducidades cambian: comprueba el catálogo vigente en AWS Training, Microsoft Learn y Google Cloud Skills.** Orden razonable: fundamentos de la nube → fundamentos de IA de esa nube → certificación de ML/ingeniería de IA cuando tengas experiencia práctica.
3. En la entrevista: explica por qué elegiste ese servicio (por qué contenedor gestionado y no SageMaker), cuánto cuesta y cómo lo apagas.

---

## Tabla de equivalencias (AWS · Azure · GCP)

| Necesidad | AWS | Azure | GCP |
|---|---|---|---|
| Almacenamiento de objetos | S3 | Blob Storage | Cloud Storage |
| Identidad y permisos | IAM (roles, políticas) | Entra ID + RBAC | Cloud IAM |
| Secretos | Secrets Manager | Key Vault | Secret Manager |
| Funciones sin servidor | Lambda | Functions | Cloud Run functions |
| Registro de imágenes | ECR | Container Registry (ACR) | Artifact Registry |
| Contenedor gestionado (simple) | App Runner | Container Apps | Cloud Run |
| Contenedores orquestados | ECS Fargate / EKS | Container Apps / AKS | Cloud Run / GKE |
| Observabilidad | CloudWatch | Monitor + Application Insights | Cloud Monitoring / Logging |
| Presupuestos y costes | Budgets + Cost Explorer | Cost Management + Budgets | Billing budgets |
| LLMs gestionados | Bedrock | Foundry (Azure OpenAI y otros) | Vertex AI (Model Garden) |
| Plataforma de ML | SageMaker | Azure Machine Learning | Vertex AI |
| IaC nativa | CloudFormation / CDK | Bicep / ARM | Deployment Manager / Terraform |

Los nombres de producto cambian de vez en cuando (por ejemplo, Azure AI Studio pasó a Foundry): ante la duda, la documentación oficial manda.

---

## Glosario
- **Región / zona de disponibilidad:** ubicación geográfica / centro de datos aislado dentro de ella.
- **Responsabilidad compartida:** reparto entre proveedor (la nube) y cliente (lo que haces en ella).
- **Bucket / contenedor:** recipiente de objetos en el almacenamiento.
- **Versionado:** conservar versiones anteriores de cada objeto.
- **URL prefirmada / SAS:** enlace temporal firmado para un objeto.
- **IAM / RBAC:** gestión de identidades y accesos / control de acceso basado en roles.
- **Rol:** identidad temporal asumible por un servicio o persona.
- **Política:** documento que concede o deniega acciones sobre recursos.
- **Mínimo privilegio:** conceder solo lo imprescindible.
- **Identidad gestionada:** identidad de un servicio de Azure sin contraseñas.
- **Secreto:** credencial que no debe estar en el código.
- **VPC / VNet:** red privada virtual.
- **Sin servidor (*serverless*):** modelo en el que no gestionas servidores y pagas por uso.
- **Arranque en frío (*cold start*):** latencia extra de la primera invocación.
- **Registro de contenedores:** almacén de imágenes (ECR, ACR, Artifact Registry).
- **Fargate:** motor de contenedores de AWS sin gestionar máquinas.
- **Foundry / Bedrock / Vertex AI:** servicios gestionados de modelos de IA (Azure / AWS / GCP).
- **IaC:** infraestructura como código (Terraform, Bicep, CloudFormation).
- **Egress:** tráfico de salida de la nube, que se cobra.
- **Capa gratuita:** uso gratuito limitado en el tiempo o en volumen; cambia con frecuencia.
