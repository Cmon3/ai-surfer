---
marp: true
theme: default
paginate: true
---

<!-- _class: lead -->
# CL1 · Cloud para datos e IA
## Almacenamiento · IAM · Secretos · Serverless · Contenedores · Costes

*AI Surfer · N2 optativo / N3*

---

# Por qué este módulo

- Las ofertas piden nube con nombre: **AWS** (Lambda, S3, ECS, Bedrock, SageMaker) y **Azure** (Functions, Azure ML)
- Un repo I8 **desplegado** pesa más que uno que solo corre en tu portátil
- Los conceptos son los mismos en las tres nubes: aprende el patrón una vez

---
<style scoped>section { font-size: 26px; }</style>
# Mapa del módulo

1. Mapa de la nube y cuenta segura
2. Almacenamiento de objetos
3. Identidades y mínimo privilegio
4. Secretos y redes
5. Cómputo sin servidor
6. Contenedores gestionados
7. IA gestionada
8. Observabilidad y costes
9. Infraestructura como código
10. Camino profesional

---

# 1.1 · Responsabilidad compartida

- Proveedor: la nube (edificios, hardware, servicio)
- Tú: **lo que pones en la nube** (permisos, datos, configuración)
- Casi todas las filtraciones: un bucket público o una clave en GitHub
- Día 1: **MFA · no usar la cuenta raíz · alarma de presupuesto**

---

# 1.2 · Almacenamiento de objetos

`S3` · `Blob Storage` · `Cloud Storage`

- Bucket + clave; los «directorios» son prefijos
- Siempre: **sin acceso público · cifrado · versionado**
- **URL prefirmada**: acceso temporal a un objeto, sin abrir el bucket
- Modelo + ficha: subir ambos

---

# 1.3 · Mínimo privilegio

Denegado por defecto → `Allow` permite → **`Deny` explícito siempre gana**

```json
{"Effect": "Allow", "Action": ["s3:GetObject"],
 "Resource": ["arn:aws:s3:::bucket/churn/*"]}
```

- Servicios: **roles** (credenciales temporales), no claves fijas
- Azure: RBAC = rol + identidad + ámbito; identidad gestionada

---

# 1.4 · Secretos y redes

- Secretos: **ni en código, ni en Git, ni en el Dockerfile**
- Gestor de secretos + permiso de lectura para el rol del servicio
- VPC/VNet, subredes, grupos de seguridad
- Lo que no necesita ser público, no lo es

---

# 1.5 · Sin servidor

`Lambda` · `Functions` · `Cloud Run functions`

- Evento → función → pagas por GB-segundo
- **Arranque en frío**: carga el modelo fuera del handler
- El handler se prueba en local
- Modelos grandes: función como imagen de contenedor

---

# 1.6 · Contenedores gestionados

| AWS | Azure | GCP |
|---|---|---|
| ECR | ACR | Artifact Registry |
| App Runner / ECS Fargate | Container Apps | Cloud Run |

- Puerto declarado, `/health`, config por variables de entorno, logs a stdout
- Mac ARM → `--platform linux/amd64`

---

# 1.7 · IA gestionada

- **LLM por API**: Bedrock · Foundry · Vertex AI
- **Plataforma de ML**: SageMaker · Azure ML · Vertex AI
- ¿Un modelo pequeño con poco tráfico? Contenedor gestionado
- Un endpoint encendido se factura 24 h

---

# 1.8 · Observabilidad y costes

- CloudWatch · Monitor · Cloud Monitoring: logs JSON de I8 listos
- Coste = cómputo + almacenamiento + **salida de red**
- Pago por uso vs instancia fija: **punto de equilibrio**
- Presupuesto **avisa, no corta**: borra lo que no uses

---

# 1.9 · Infraestructura como código

- Terraform: `init → plan → apply → destroy` (lee el `plan`)
- Bicep (Azure) · CloudFormation/CDK (AWS)
- CD sin claves duraderas: **OIDC** entre GitHub y la nube

---

# 1.10 · Camino profesional

- AWS principal, Azure segundo, GCP para reconocer equivalentes
- Portafolio desplegado > certificado
- Certificaciones: **comprueba el nombre vigente** en las webs oficiales

---

# Entregable

- Imagen en un registro y servicio desplegado (o evidencias si lo apagas)
- Política de mínimo privilegio · secretos fuera del código
- Estimación de costes + alarma de presupuesto
- IaC + **cómo apagar todo**
