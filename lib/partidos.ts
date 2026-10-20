import partidosJson from "@/data/partidos.json";

export type Competicion =
  | "superliga-masculina"
  | "superliga-femenina"
  | "superliga-2-masculina"
  | "superliga-2-femenina";

/** Un partido que se juega en un pabellón de la Comunidad de Madrid. */
export interface Partido {
  fecha: string; // AAAA-MM-DD
  hora: string; // HH:MM
  competicion: Competicion;
  grupo?: string; // Superliga 2 se juega por grupos (A, B, C)
  /** Número de partido de la RFEVB: único dentro de cada competición y grupo. */
  partido: number;
  /** Jornada a la que pertenece; en los aplazados, la original ("Procedente de la J…"). */
  jornada: number;
  local: string;
  visitante: string;
  pabellon: string;
}

export const partidos = (partidosJson as Partido[])
  .slice()
  .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));

/**
 * Día en que se copiaron los calendarios de la RFEVB. No se muestra en la
 * página; sirve para saber cuándo toca repasarlos.
 */
export const PARTIDOS_REVISADOS = "2026-10-14";

/**
 * Competiciones sin ningún equipo con pabellón en la Comunidad de Madrid esta
 * temporada. Su filtro se muestra igual, con un aviso en lugar del listado.
 */
export const SIN_EQUIPOS_MADRID: Competicion[] = ["superliga-femenina"];

/** Página oficial donde la federación publica calendarios y resultados. */
export const URL_RFEVB = "https://www.rfevb.com";

export const COMPETICIONES: { valor: Competicion; etiqueta: string; corta: string }[] = [
  { valor: "superliga-masculina", etiqueta: "Superliga masculina", corta: "Superliga masc." },
  {
    valor: "superliga-femenina",
    etiqueta: "Superliga femenina (Liga Iberdrola)",
    corta: "Liga Iberdrola",
  },
  { valor: "superliga-2-masculina", etiqueta: "Superliga 2 masculina", corta: "Superliga 2 masc." },
  { valor: "superliga-2-femenina", etiqueta: "Superliga 2 femenina", corta: "Superliga 2 fem." },
];

/** Equipos con pabellón en Madrid: un partido entre dos de ellos es un derbi. */
export const EQUIPOS_MADRID = Array.from(new Set(partidos.map((p) => p.local))).sort((a, b) =>
  a.localeCompare(b, "es")
);

/**
 * La RFEVB escribe muchos pabellones en mayúsculas. Se muestran en
 * mayúsculas y minúsculas sin tocar el JSON, que se queda como en el original.
 */
const MINUSCULAS = new Set(["de", "del", "la", "las", "los", "el", "y", "e"]);
export function nombrePabellon(p: string): string {
  if (p !== p.toUpperCase()) return p;
  return p
    .toLowerCase()
    .split(" ")
    .map((w, i) => {
      if (i > 0 && MINUSCULAS.has(w)) return w;
      if (/^[a-záéíóúñ]{1,4}\.$/.test(w) || w === "cdm" || w === "ceip") return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}
