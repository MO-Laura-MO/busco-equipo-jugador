import campusJson from "@/data/campus.json";

export type Temporada = "navidad" | "semana-santa" | "verano" | "otra";

/**
 * Campus de voleibol. Se publican como las vacantes: para dar visibilidad al
 * organizador, no para vender plazas. Inscripción y pago, siempre fuera.
 */
export interface Campus {
  id: string;
  nombre: string;
  /** Club del directorio que lo organiza, si lo hay: enlaza a su ficha. */
  clubId?: string;
  organizador: string;
  temporada: Temporada;
  municipio: string;
  provincia: string;
  pabellon?: string;
  fechaInicio: string; // AAAA-MM-DD, primer día
  fechaFin: string; // AAAA-MM-DD, último día
  /** Días exactos en texto, cuando no son seguidos. */
  dias?: string;
  edades: string;
  horario?: string;
  /** Solo si el organizador lo publica. Nunca se compara ni se ordena por él. */
  precioOrientativo?: string;
  inscripcion?: string;
  email?: string;
  web?: string;
  notas?: string;
  origen: "club" | "fuentes-publicas";
  fechaActualizacion: string;
}

export const campus = (campusJson as Campus[])
  .slice()
  .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));

export const TEMPORADAS: Record<Temporada, string> = {
  navidad: "Navidad",
  "semana-santa": "Semana Santa",
  verano: "Verano",
  otra: "Otras fechas",
};

export function separarCampus(hoy: string) {
  return {
    proximos: campus.filter((c) => c.fechaFin >= hoy),
    pasados: campus.filter((c) => c.fechaFin < hoy).reverse(),
  };
}

const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export function columnaFechaCampus(c: Campus) {
  const [, m, d] = c.fechaInicio.split("-").map(Number);
  return { dia: String(d), mes: MESES_CORTOS[m - 1] };
}

/** "Del 23 de diciembre de 2026 al 8 de enero de 2027". */
export function rangoCampus(c: Campus): string {
  const [ai, mi, di] = c.fechaInicio.split("-").map(Number);
  const [af, mf, df] = c.fechaFin.split("-").map(Number);
  if (c.fechaInicio === c.fechaFin) return `${di} de ${MESES[mi - 1]} de ${ai}`;
  const ini = ai === af ? `${di} de ${MESES[mi - 1]}` : `${di} de ${MESES[mi - 1]} de ${ai}`;
  return `Del ${ini} al ${df} de ${MESES[mf - 1]} de ${af}`;
}

export function ultimaActualizacionCampus(): string {
  return campus.map((c) => c.fechaActualizacion).sort().at(-1) ?? "";
}

/** Campus vigentes de un club del directorio, para su ficha. */
export function campusDeClub(clubId: string, hoy: string): Campus[] {
  return campus.filter((c) => c.clubId === clubId && c.fechaFin >= hoy);
}
