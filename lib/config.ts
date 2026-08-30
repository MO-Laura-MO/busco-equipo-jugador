/**
 * Configuración editable del sitio.
 */

/**
 * Ámbito geográfico actual. Cuando el directorio se amplíe a otras
 * comunidades, este valor pasará a depender de la sección que se muestre;
 * de momento todo el sitio es Madrid.
 */
export const AMBITO = "Madrid";
export const NOMBRE_AMBITO_LARGO = "la Comunidad de Madrid";

/** Nombre de la marca (cabecera de la portada). */
export const NOMBRE_MARCA = "voley.app";

/** Título visible del sitio (metadatos). */
export const TITULO_SITIO = `Pruebas de voleibol · ${AMBITO}`;

/** URL pública del sitio (para metadatos, sitemap y JSON-LD). */
export const URL_SITIO = "https://voley.app";

/** Formulario externo de alta de clubes (Tally). */
export const URL_FORMULARIO_ALTA = "https://tally.so/r/680lMN";

/**
 * Apuntarse a amistosos entre clubes. Todavía no hay formulario externo:
 * de momento es un mailto directo. Sustituir por la URL del formulario
 * (Tally u otro) en cuanto exista.
 */
export const URL_FORMULARIO_AMISTOSOS =
  "mailto:voley.app.es@gmail.com?subject=Amistosos%20entre%20clubes";

/** Email al que llegan las correcciones de datos. */
export const EMAIL_CORRECCIONES = "voley.app.es@gmail.com";

/** Canal de WhatsApp donde se avisa de cada convocatoria nueva. */
export const URL_CANAL_WHATSAPP =
  "https://whatsapp.com/channel/0029Vb8BzKk4tRrsGOYbUR04";

/** Instagram del directorio. */
export const URL_INSTAGRAM = "https://instagram.com/voley.app";
