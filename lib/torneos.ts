import torneosJson from "@/data/torneos.json";
import { Categoria, Origen, Sexo, etiquetaCategoria, ordenCategoria } from "@/lib/datos";

/**
 * Torneos y copas a los que un club puede apuntarse por decisión propia.
 * Los campeonatos a los que se llega por clasificación (Campeonatos de
 * España de clubes, CESA) no entran aquí.
 */
export interface Torneo {
  id: string;
  nombre: string;
  organizador: string;
  lugar: string;
  pais: string;
  /** exacta: fechaInicio (y fechaFin si dura más de un día). mes: solo mesAprox. */
  tipoFecha: "exacta" | "mes";
  fechaInicio?: string; // AAAA-MM-DD
  fechaFin?: string; // AAAA-MM-DD
  mesAprox?: string; // AAAA-MM
  /** Texto corto que acompaña a una fecha aproximada: "Semana Santa". */
  periodo?: string;
  /** Vacía si el organizador no las ha publicado. */
  categorias: Categoria[];
  /** Texto que sustituye a las categorías cuando el torneo va por edades (U13, U15…). `categorias` sigue mandando en el filtro. */
  categoriasTexto?: string;
  sexos: Sexo[];
  /** Último día de inscripción, si el organizador lo publica. */
  inscripcionHasta?: string;
  /** Inscripción abierta sin fecha de cierre publicada. */
  inscripcionAbierta?: boolean;
  inscripcion?: string;
  notas?: string;
  web: string;
  origen: Origen;
  fechaActualizacion: string;
}

export const torneos = torneosJson as Torneo[];

/** Último día del torneo (para saber si ya se ha jugado). */
function fechaFinal(t: Torneo): string {
  if (t.tipoFecha === "exacta") return t.fechaFin ?? t.fechaInicio ?? "";
  // Fecha aproximada: se da por jugado cuando acaba el mes.
  return `${t.mesAprox}-31`;
}

/** Clave de orden: fecha exacta antes que aproximada dentro del mismo mes. */
function claveOrden(t: Torneo): string {
  return t.tipoFecha === "exacta" ? t.fechaInicio ?? "" : `${t.mesAprox}-99`;
}

export function separarTorneos(hoy: string): { proximos: Torneo[]; celebrados: Torneo[] } {
  const proximos = torneos
    .filter((t) => fechaFinal(t) >= hoy)
    .sort((a, b) => claveOrden(a).localeCompare(claveOrden(b)));
  const celebrados = torneos
    .filter((t) => fechaFinal(t) < hoy)
    .sort((a, b) => claveOrden(b).localeCompare(claveOrden(a)));
  return { proximos, celebrados };
}

export type EstadoInscripcion = "abierta" | "cerrada" | null;

export function estadoInscripcion(t: Torneo, hoy: string): EstadoInscripcion {
  if (t.inscripcionHasta) return t.inscripcionHasta >= hoy ? "abierta" : "cerrada";
  if (t.inscripcionAbierta) return "abierta";
  return null;
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function partes(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return { anio: a, mes: m - 1, dia: d };
}

/** "27-30 de diciembre de 2026", "Semana Santa · marzo de 2027". */
export function textoFecha(t: Torneo): string {
  if (t.tipoFecha === "mes" && t.mesAprox) {
    const { anio, mes } = partes(`${t.mesAprox}-01`);
    const base = `${MESES[mes]} de ${anio}`;
    return t.periodo ? `${t.periodo} · ${base}` : base;
  }
  const ini = partes(t.fechaInicio!);
  if (!t.fechaFin || t.fechaFin === t.fechaInicio) {
    return `${ini.dia} de ${MESES[ini.mes]} de ${ini.anio}`;
  }
  const fin = partes(t.fechaFin);
  if (ini.mes === fin.mes) return `${ini.dia}-${fin.dia} de ${MESES[fin.mes]} de ${fin.anio}`;
  return `${ini.dia} de ${MESES[ini.mes]} - ${fin.dia} de ${MESES[fin.mes]} de ${fin.anio}`;
}

/** Día y mes corto para la columna de fecha de la fila. */
export function columnaFecha(t: Torneo): { dia?: string; mes: string } {
  if (t.tipoFecha === "mes" && t.mesAprox) {
    return { mes: MESES_CORTOS[partes(`${t.mesAprox}-01`).mes] };
  }
  const ini = partes(t.fechaInicio!);
  return { dia: String(ini.dia), mes: MESES_CORTOS[ini.mes] };
}

/** "Benjamín a infantil · femenino y masculino". Vacío si no hay datos. */
export function textoCategorias(t: Torneo): string {
  const cats = [...t.categorias].sort((a, b) => ordenCategoria(a) - ordenCategoria(b));
  let c = "";
  if (t.categoriasTexto) c = t.categoriasTexto;
  else if (cats.length === 1) c = etiquetaCategoria(cats[0]);
  else if (cats.length === 2) c = `${etiquetaCategoria(cats[0])} y ${etiquetaCategoria(cats[1]).toLowerCase()}`;
  else if (cats.length > 2) {
    // Rango solo si las categorías son consecutivas en el orden de edad.
    const consecutivas = cats.every((x, i) => i === 0 || ordenCategoria(x) === ordenCategoria(cats[i - 1]) + 1);
    c = consecutivas
      ? `${etiquetaCategoria(cats[0])} a ${etiquetaCategoria(cats[cats.length - 1]).toLowerCase()}`
      : cats.map((x, i) => (i === 0 ? etiquetaCategoria(x) : etiquetaCategoria(x).toLowerCase())).join(", ");
  }
  const s =
    t.sexos.length === 2
      ? "femenino y masculino"
      : t.sexos.length === 1
        ? t.sexos[0]
        : "";
  return [c, s].filter(Boolean).join(" · ");
}

/** Fecha de la entrada más reciente, para el pie de la página. */
export function ultimaActualizacionTorneos(): string {
  return torneos.map((t) => t.fechaActualizacion).sort().at(-1) ?? "";
}
