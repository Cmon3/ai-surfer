# Política de seguridad

AI Surfer es un curso abierto: el repositorio contiene materiales, notebooks y una web estática que aún no gestiona cuentas ni pagos.

## Versión mantenida

Solo se mantiene la rama `main`. La etiqueta `archivo/curso-14-semanas` guarda el curso original como archivo histórico y no recibe correcciones.

## Cómo avisar de un problema

Si encuentras una vulnerabilidad, no abras una *issue* pública. Avisa en privado desde [este formulario de GitHub](https://github.com/Cmon3/ai-surfer/security/advisories/new).

Incluye, si puedes:

- qué archivo o página está afectado;
- cómo reproducir el problema;
- qué podría hacer alguien que lo aprovechara.

Se revisará lo antes posible. Es un proyecto personal, así que no hay un plazo de respuesta garantizado.

## Qué entra

- El código de la web (`web/`), incluido el motor de ejercicios del navegador.
- Los scripts y la automatización del repositorio (`scripts/`, `.github/`).
- Cualquier secreto o dato personal publicado por error.

## Qué no entra

- Los fallos en dependencias de terceros: avisa antes a su proyecto. Dependabot vigila las de este repositorio.
- El código de ejercicios y ejemplos de los módulos, pensado para aprender y no para usarse en producción. Si un ejemplo enseña una mala práctica de seguridad sin avisarlo, abre una *issue* normal.
