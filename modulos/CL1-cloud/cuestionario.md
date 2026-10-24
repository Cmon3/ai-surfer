# Módulo CL1 · Cloud para datos e IA — Cuestionario

10 preguntas. Una sola respuesta correcta. Tiempo orientativo: 20 min.

---

**1.** En el modelo de responsabilidad compartida, ¿quién es responsable de configurar bien los permisos de un bucket de almacenamiento?
- a) El proveedor de nube, siempre.
- b) Nadie: los buckets son privados por naturaleza en todos los casos.
- c) El cliente: el proveedor protege la infraestructura, pero la configuración de tus recursos es tuya.
- d) El navegador del usuario.

**2.** Una función solo debe leer el archivo `churn/modelo.joblib` de un bucket. ¿Qué política respeta el mínimo privilegio?
- a) `Allow` de `s3:GetObject` sobre `arn:aws:s3:::bucket/churn/modelo.joblib` (o el prefijo `churn/*`).
- b) `Allow` de `s3:*` sobre `*`.
- c) `Allow` de `s3:GetObject` sobre `*`.
- d) `Allow` de `s3:*` sobre el bucket entero.

**3.** Una política tiene un `Allow` de `s3:GetObject` sobre un objeto y otra sentencia con `Deny` de `s3:*` sobre el mismo objeto. ¿Qué ocurre?
- a) Se permite: el `Allow` es más específico.
- b) Se permite la primera vez y se deniega después.
- c) Depende del orden en que estén escritas.
- d) Se deniega: un `Deny` explícito siempre gana.

**4.** ¿Para qué sirve una URL prefirmada de S3?
- a) Para hacer público el bucket entero.
- b) Para dar acceso temporal a un objeto concreto sin compartir credenciales ni abrir el bucket.
- c) Para cifrar el objeto.
- d) Para acelerar las descargas.

**5.** ¿Dónde debe guardarse la contraseña de una base de datos que usa tu API en la nube?
- a) En una variable `ENV` del `Dockerfile`.
- b) En el repositorio, en un archivo `config.py` privado.
- c) En un gestor de secretos (Secrets Manager, Key Vault, Secret Manager), con permiso de lectura solo para el rol del servicio.
- d) En el nombre del bucket.

**6.** Una función Lambda tarda mucho más en su primera invocación que en las siguientes. ¿Por qué?
- a) El proveedor penaliza a los clientes nuevos.
- b) El código se compila cada vez.
- c) Es un fallo de red.
- d) Es el arranque en frío: hay que crear el entorno y cargar dependencias y modelo; las invocaciones calientes los reutilizan.

**7.** Tienes una API con tráfico bajo e irregular y quieres pagar lo mínimo, sin gestionar servidores. ¿Qué opción encaja mejor?
- a) Un contenedor gestionado que escala a cero (Container Apps, Cloud Run) o una función sin servidor.
- b) Un clúster de Kubernetes dimensionado para el pico.
- c) Una máquina virtual grande siempre encendida.
- d) Un servidor físico propio.

**8.** ¿Cuál es el equivalente aproximado de **Amazon ECR** en Azure y en GCP?
- a) Blob Storage y Cloud Storage.
- b) Azure Functions y Cloud Run.
- c) Azure Container Registry (ACR) y Artifact Registry.
- d) Key Vault y Secret Manager.

**9.** Tu equipo necesita incorporar un asistente que resuma tickets de soporte usando un LLM de un proveedor, sin entrenar ni alojar el modelo. ¿Qué servicio es el más adecuado?
- a) SageMaker para entrenar un LLM desde cero.
- b) Un LLM gestionado por API (Bedrock, Foundry o Vertex AI), con control de acceso y de datos del proveedor.
- c) Una instancia con GPU montada a mano.
- d) Una hoja de cálculo.

**10.** Has creado un presupuesto de 5 € con alertas. Te olvidas un servicio encendido. ¿Qué pasa?
- a) El proveedor apaga el servicio automáticamente al llegar a 5 €.
- b) El servicio se vuelve gratuito.
- c) El presupuesto lo borra por ti.
- d) Recibes avisos, pero el servicio sigue facturando hasta que lo borres o lo pares.

---

<details><summary>Soluciones</summary>

| # | Respuesta | Por qué |
|---|---|---|
| 1 | c | El proveedor asegura «la nube»; tú aseguras lo que pones **en** la nube (permisos, datos, configuración). |
| 2 | a | Limita acción y recurso: solo leer, solo ese objeto o prefijo. |
| 3 | d | Un `Deny` explícito siempre prevalece sobre cualquier `Allow`. |
| 4 | b | Acceso temporal y acotado a un objeto, con caducidad, sin hacer público el bucket. |
| 5 | c | Los secretos no viajan en el código ni en la imagen; el servicio los lee en ejecución con su propio permiso. |
| 6 | d | El primer arranque inicializa el entorno y carga el modelo; luego se reutiliza. |
| 7 | a | Escalar a cero y pagar por uso encaja con tráfico irregular y sin administrar servidores. |
| 8 | c | Registro de imágenes de contenedor en cada nube. |
| 9 | b | Para consumir un LLM existente no hace falta entrenarlo ni alojarlo: se usa un servicio gestionado. |
| 10 | d | Los presupuestos avisan; no detienen recursos por sí solos. |
</details>
