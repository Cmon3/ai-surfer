/**
 * Configuración única de la web. Si cambia el repositorio, el correo de la
 * lista de espera o la versión de Pyodide, se cambia AQUÍ y en ningún otro sitio.
 */

// ─── Repositorio público ──────────────────────────────────────────────────
// Repositorio público en GitHub (los enlaces a Colab solo funcionan con repos públicos).
export const REPO_USUARIO = "Cmon3";
export const REPO_NOMBRE = "ai-surfer";
export const REPO_RAMA = "main";

export const REPO_CONFIGURADO = REPO_USUARIO !== "TU-USUARIO";
export const REPO_URL = `https://github.com/${REPO_USUARIO}/${REPO_NOMBRE}`;

/** Enlace para abrir un notebook de modulos/<carpeta>/ en Google Colab. */
export function colabUrl(carpeta: string, archivo = "notebook.ipynb"): string {
  return `https://colab.research.google.com/github/${REPO_USUARIO}/${REPO_NOMBRE}/blob/${REPO_RAMA}/modulos/${carpeta}/${archivo}`;
}

// ─── Lista de espera (sin backend) ────────────────────────────────────────
// MARCADOR: pon aquí un buzón real (p. ej. "hola@tudominio.es"). El formulario
// de la portada solo abre el cliente de correo del visitante con un mensaje
// prefabricado (`mailto:`); no se guarda nada en ningún servidor. Mientras
// esté vacío, la portada muestra el bloque como «pendiente de configurar».
export const LISTA_ESPERA_EMAIL = "";

// ─── Motor de ejercicios (Pyodide) ────────────────────────────────────────
// Versión fijada de Pyodide en cdn.jsdelivr.net (D11). Para actualizarla,
// cambia el número y vuelve a ejecutar `verificar_ejercicios` (ver web/README.md):
// cada versión trae otras versiones de numpy/pandas/scikit-learn.
// 0.28.3 = Python 3.13. Comprobada en Chrome real (oct. 2026): la 314.0.7 NO carga
// con importScripts dentro de un Worker aunque sí en Node; verifica siempre en navegador.
export const PYODIDE_VERSION = "0.28.3";
export const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
/** Segundos máximos que puede tardar una ejecución antes de abortar el Worker. */
export const EJERCICIOS_TIMEOUT_S = 20;
