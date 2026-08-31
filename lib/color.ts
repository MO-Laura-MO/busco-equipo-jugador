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
 * Oscurece `hex` en pasos de 2% de luminosidad hasta dar 4,5:1 con
 * `fondo`, sin tocarlo si ya lo cumple. Null si no lo consigue antes de
 * `minL`.
 */
function oscurecerHastaLegible(hex: string, fondo: string, minL = 5): string | null {
  if (contraste(hex, fondo) >= 4.5) return hex;
  const { h, s, l } = hexToHsl(hex);
  for (let L = Math.round(l) - 2; L >= minL; L -= 2) {
    const candidato = hslToHex(h, s, L);
    if (contraste(candidato, fondo) >= 4.5) return candidato;
  }
  return null;
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
 * Ajusta `hex` hasta dar 4,5:1 con `fondo`, sin tocarlo si ya lo cumple.
 * Se mueve en la dirección contraria a `fondo` (lo aclara si el fondo es
 * oscuro, lo oscurece si es claro) para no perder el tono. Si no lo
 * consigue moviéndose hasta el extremo, cae en blanco o TINTA.
 */
function ajustarAcento(hex: string, fondo: string, fondoEsClaro: boolean): string {
  if (contraste(hex, fondo) >= 4.5) return hex;
  const { h, s, l } = hexToHsl(hex);
  if (fondoEsClaro) {
    for (let L = Math.round(l) - 2; L >= 0; L -= 2) {
      const candidato = hslToHex(h, s, L);
      if (contraste(candidato, fondo) >= 4.5) return candidato;
    }
    return TINTA;
  }
  for (let L = Math.round(l) + 2; L < 100; L += 2) {
    const candidato = hslToHex(h, s, L);
    if (contraste(candidato, fondo) >= 4.5) return candidato;
  }
  return "#ffffff";
}

export interface ColoresClub {
  fondo: string; // fondo de la cabecera: el del club, tal cual si se lee, si no ajustado
  texto: string; // blanco o TINTA, el que se lea sobre `fondo`
  textoRgb: string; // "R G B" de `texto`, para las variantes con opacidad (rgb(var(..)/NN%))
  claro: boolean; // true si la cabecera terminó en modo claro (fondo real, letra oscura)
  oscuro: string; // versión oscura del tono del club: barras, y borde del botón en modo claro
  acento: string; // enlaces, aviso de entrenador y relleno del botón (en modo oscuro)
  textoBoton: string; // TINTA o #FFFFFF, el que más contraste dé con el acento
  barra: string; // fondo de las barras de sección: colorFondo original al 10% sobre blanco
  barraTexto: string; // texto e icono de las barras de sección
}

/** Mezcla `hex` con blanco: proporcion 0.1 devuelve un 10% de color. */
function sobreBlanco(hex: string, proporcion: number): string {
  const c = hex.replace("#", "");
  const canal = (i: number) => {
    const v = parseInt(c.slice(i, i + 2), 16);
    return Math.round(v * proporcion + 255 * (1 - proporcion));
  };
  return (
    "#" +
    [0, 2, 4]
      .map((i) => canal(i).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** "#rrggbb" → "R G B", para meter en una variable CSS y poder hacer rgb(var(..)/NN%). */
function hexToRgbTriplet(hex: string): string {
  const c = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16)).join(" ");
}

/**
 * Devuelve los colores ya corregidos, o null si la ficha va en blanco.
 *
 * Devuelve null si el club no tiene `colorFondo` o `colorAcento`, si algún
 * hex no es válido, o si `verificado` es false: los colores son un extra de
 * los clubes que han confirmado sus datos.
 *
 * Si los devuelve:
 * - fondo y texto: el color del club se queda tal cual si ya se lee con
 *   blanco o con TINTA encima (se usa el que funcione). Si no se lee con
 *   ninguno de los dos, se oscurece conservando el tono hasta dar 4,5:1 con
 *   blanco, como antes. Si ni oscureciéndolo al máximo lo consigue, null
 *   (mejor blanco que una cabecera ilegible).
 * - acento: se ajusta hasta llegar a 4,5:1 con el fondo ya corregido,
 *   aclarándolo si el fondo quedó oscuro u oscureciéndolo si quedó claro.
 * - textoBoton: entre TINTA y blanco, el que más contraste dé con el acento.
 * - barra y barraTexto: mismo criterio en fichas claras y oscuras, y
 *   siempre distinto de `fondo`. Un tinte al 10% del `colorFondo` original
 *   del club (nunca de la versión ya oscurecida de la cabecera), con el
 *   propio tono oscurecido lo justo para leerse encima. Oscurecer el tono
 *   para un fondo sólido, en vez de aclararlo hacia blanco, se probó y se
 *   descartó: en amarillos y verdes da un oliva/marrón que ya no se
 *   reconoce como el color del club.
 */
export function coloresClub(club: Club, verificado: boolean): ColoresClub | null {
  if (!verificado) return null;
  const fondoHex = normalizarHex(club.colorFondo);
  const acentoHex = normalizarHex(club.colorAcento);
  if (!fondoHex || !acentoHex) return null;

  let fondo: string;
  let texto: string;
  if (contraste(fondoHex, "#ffffff") >= 4.5) {
    fondo = fondoHex;
    texto = "#ffffff";
  } else if (contraste(fondoHex, TINTA) >= 4.5) {
    fondo = fondoHex;
    texto = TINTA;
  } else {
    const oscurecido = ajustarFondo(fondoHex);
    if (!oscurecido) return null;
    fondo = oscurecido;
    texto = "#ffffff";
  }
  const fondoEsClaro = texto === TINTA;

  const acento = ajustarAcento(acentoHex, fondo, fondoEsClaro);
  const textoBoton = contraste(TINTA, acento) >= contraste("#ffffff", acento) ? TINTA : "#ffffff";

  const oscuro = fondoEsClaro ? ajustarFondo(fondoHex) ?? TINTA : fondo;

  // La barra usa siempre un tinte al 10% del color ORIGINAL del club (no
  // `oscuro`, que puede venir ya oscurecido para la cabecera): mismo
  // criterio para fichas claras y oscuras, y nunca coincide con la
  // cabecera. Se probó oscurecer el tono para un fondo sólido en cabeceras
  // claras (el mismo tratamiento que usa `fondo` en modo oscuro) y se
  // descartó: en amarillos y verdes da un oliva/marrón que ya no se
  // reconoce como el color del club. El tinte hacia blanco no tiene ese
  // problema en ningún tono probado.
  const barra = sobreBlanco(fondoHex, 0.1);
  const barraTexto = oscurecerHastaLegible(fondoHex, barra) ?? TINTA;

  return {
    fondo,
    texto,
    textoRgb: hexToRgbTriplet(texto),
    claro: fondoEsClaro,
    oscuro,
    acento,
    textoBoton,
    barra,
    barraTexto,
  };
}
