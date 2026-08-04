/**
 * Configuración editable del sitio.
 * TODO: sustituir por los valores reales antes de publicar.
 */

/**
 * Ámbito geográfico actual. Cuando el directorio se amplíe a otras
 * comunidades, este valor pasará a depender de la sección que se muestre;
 * de momento todo el sitio es Madrid.
 */
export const AMBITO = "Madrid";
export const NOMBRE_AMBITO_LARGO = "la Comunidad de Madrid";

/** Título visible del sitio (cabecera y metadatos). */
export const TITULO_SITIO = `Pruebas de voleibol · ${AMBITO}`;

/** URL pública del sitio (para metadatos, sitemap y JSON-LD). */
export const URL_SITIO = "https://busco-equipo-jugador.vercel.app";

/** Formulario externo de alta de clubes (Tally). */
export const URL_FORMULARIO_ALTA = "https://tally.so/r/CAMBIAR";

/** Email al que llegan las correcciones de datos. */
export const EMAIL_CORRECCIONES = "hola@cambiar.example";
