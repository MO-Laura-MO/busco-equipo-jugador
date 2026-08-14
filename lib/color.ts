import type { Club } from "@/lib/datos";

const TINTA = "#111827";

/** Luminancia relativa según WCAG. */
function luminancia(hex: string): number {
  const c = hex.replace("#", "");
  const v = [0, 2, 4].map((i) => {
    const s = parseInt(c.slice(i, i + 2), 16) / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}

/** Contraste entre dos colores, de 1 a 21. */
export function contraste(a: string, b: string): number {
  const [hi, lo] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function normalizarHex(valor?: string): string | null {
  if (!valor) return null;
  const limpio = valor.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(limpio)) return null;
  return `#${limpio.toLowerCase()}`;
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { h: h * 60, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  const S = s / 100;
  const L = l / 100;
  const c = (1 - Math.abs(2 * L - 1)) * S;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = L - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Oscurece `hex` en pasos de 2% de luminosidad hasta dar 4,5:1 con el
 * blanco, sin tocarlo si ya lo cumple. Null si no lo consigue al 10%.
 */
function ajustarFondo(hex: string): string | null {
  if (contraste(hex, "#ffffff") >= 4.5) return hex;
  const { h, s, l } = hexToHsl(hex);
  for (let L = Math.round(l) - 2; L >= 10; L -= 2) {
    const candidato = hslToHex(h, s, L);
    if (contraste(candidato, "#ffffff") >= 4.5) return candidato;
  }
  return null;
}

/**
 * Aclara `hex` en pasos de 2% de luminosidad hasta dar 4,5:1 con `fondo`,
 * sin tocarlo si ya lo cumple. Blanco si no lo consigue.
 */
function ajustarAcento(hex: string, fondo: string): string {
  if (contraste(hex, fondo) >= 4.5) return hex;
  const { h, s, l } = hexToHsl(hex);
  for (let L = Math.round(l) + 2; L < 100; L += 2) {
    const candidato = hslToHex(h, s, L);
    if (contraste(candidato, fondo) >= 4.5) return candidato;
  }
  return "#ffffff";
}

export interface ColoresClub {
  fondo: string; // fondo de la cabecera
  acento: string; // enlaces, aviso de entrenador y relleno del botón
  textoBoton: string; // TINTA o #FFFFFF, el que más contraste dé con el acento
}

/**
 * Devuelve los colores ya corregidos, o null si la ficha va en blanco.
 *
 * Devuelve null si el club no tiene `colorFondo` o `colorAcento`, si algún
 * hex no es válido, o si `verificado` es false: los colores son un extra de
 * los clubes que han confirmado sus datos.
 *
 * Si los devuelve:
 * - fondo: se oscurece en pasos de 2% de luminosidad, conservando el tono,
 *   hasta llegar a 4,5:1 con el blanco, porque encima va el nombre del club.
 *   Si no lo consigue al 10% de luminosidad, devuelve null (mejor blanco que
 *   una cabecera ilegible).
 * - acento: se aclara hasta llegar a 4,5:1 con el fondo ya corregido. Si no lo
 *   consigue, blanco.
 * - textoBoton: entre TINTA y blanco, el que más contraste dé con el acento.
 */
export function coloresClub(club: Club, verificado: boolean): ColoresClub | null {
  if (!verificado) return null;
  const fondoHex = normalizarHex(club.colorFondo);
  const acentoHex = normalizarHex(club.colorAcento);
  if (!fondoHex || !acentoHex) return null;

  const fondo = ajustarFondo(fondoHex);
  if (!fondo) return null;

  const acento = ajustarAcento(acentoHex, fondo);
  const textoBoton = contraste(TINTA, acento) >= contraste("#ffffff", acento) ? TINTA : "#ffffff";

  return { fondo, acento, textoBoton };
}
