import clubesJson from "@/data/clubes.json";
import convocatoriasJson from "@/data/convocatorias.json";

export type Zona = "norte" | "sur" | "este" | "oeste" | "centro";
export type Categoria = "benjamin" | "alevin" | "infantil" | "cadete" | "juvenil";
export type Sexo = "femenino" | "masculino" | "mixto";
export type TipoFecha = "exacta" | "mes" | "abierta";
export type EstadoFecha = "confirmada" | "provisional";
export type Origen = "club" | "fuentes-publicas";
export type TipoRed = "instagram" | "tiktok" | "facebook" | "youtube" | "x" | "otra";

export interface Club {
  id: string;
  nombre: string;
  municipio: string;
  zona: Zona;
  web: string;
  redes: { tipo: TipoRed; url: string }[];
  email: string;
  telefono: string;
  logo: string;
  descripcion: string;
  fechaActualizacion: string;
}

export interface Convocatoria {
  clubId: string;
  categoria: Categoria;
  sexo: Sexo;
  tipoEntidad: "federado" | "escuela";
  nivel: string;
  tipoFecha: TipoFecha;
  fecha: string;
  mesAprox: string;
  estadoFecha: EstadoFecha;
  hora: string;
  pabellon: string;
  direccion: string;
  mapsUrl: string;
  avisoPrevio: boolean;
  cuotaOrientativa: string;
  notas: string;
  origen: Origen;
  fechaActualizacion: string;
}

export const clubes = clubesJson as Club[];
export const convocatorias = convocatoriasJson as Convocatoria[];

export function clubPorId(id: string): Club | undefined {
  return clubes.find((c) => c.id === id);
}

export function convocatoriasDeClub(clubId: string): Convocatoria[] {
  return ordenarConvocatorias(convocatorias.filter((c) => c.clubId === clubId));
}

/**
 * Orden del listado:
 * 1. fechas exactas confirmadas → 2. exactas provisionales → 3. por mes → 4. abiertas.
 * Dentro de cada grupo, por fecha/mes ascendente.
 */
export function grupoOrden(c: Convocatoria): number {
  if (c.tipoFecha === "exacta" && c.estadoFecha === "confirmada") return 0;
  if (c.tipoFecha === "exacta") return 1;
  if (c.tipoFecha === "mes") return 2;
  return 3;
}

export function ordenarConvocatorias(
  lista: Convocatoria[],
  direccion: "asc" | "desc" = "asc"
): Convocatoria[] {
  const factor = direccion === "asc" ? 1 : -1;
  return [...lista].sort((a, b) => {
    const g = grupoOrden(a) - grupoOrden(b);
    if (g !== 0) return g;
    const ka = a.fecha || a.mesAprox || "9999";
    const kb = b.fecha || b.mesAprox || "9999";
    return ka.localeCompare(kb) * factor;
  });
}

/* ---------- etiquetas de texto ---------- */

export const CATEGORIAS: { valor: Categoria; etiqueta: string }[] = [
  { valor: "benjamin", etiqueta: "Benjamín" },
  { valor: "alevin", etiqueta: "Alevín" },
  { valor: "infantil", etiqueta: "Infantil" },
  { valor: "cadete", etiqueta: "Cadete" },
  { valor: "juvenil", etiqueta: "Juvenil" },
];

export const SEXOS: { valor: Sexo; etiqueta: string }[] = [
  { valor: "femenino", etiqueta: "Femenino" },
  { valor: "masculino", etiqueta: "Masculino" },
  { valor: "mixto", etiqueta: "Mixto" },
];

export const ZONAS: { valor: Zona; etiqueta: string }[] = [
  { valor: "norte", etiqueta: "Norte" },
  { valor: "sur", etiqueta: "Sur" },
  { valor: "este", etiqueta: "Este" },
  { valor: "oeste", etiqueta: "Oeste" },
  { valor: "centro", etiqueta: "Centro" },
];

export function etiquetaCategoria(c: Categoria): string {
  return CATEGORIAS.find((x) => x.valor === c)?.etiqueta ?? c;
}

export function etiquetaSexo(s: Sexo): string {
  return SEXOS.find((x) => x.valor === s)?.etiqueta ?? s;
}

const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const DIAS_CORTOS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

/** Partes de fecha para la columna izquierda de cada fila. */
export function partesFecha(c: Convocatoria): {
  diaSemana: string;
  dia: string;
  mes: string;
} {
  if (c.tipoFecha === "exacta" && c.fecha) {
    const d = new Date(c.fecha + "T12:00:00");
    return {
      diaSemana: DIAS_CORTOS[d.getDay()],
      dia: String(d.getDate()),
      mes: MESES_CORTOS[d.getMonth()],
    };
  }
  if (c.tipoFecha === "mes" && c.mesAprox) {
    const [, mes] = c.mesAprox.split("-");
    return { diaSemana: "", dia: "", mes: MESES_CORTOS[Number(mes) - 1] ?? "" };
  }
  return { diaSemana: "", dia: "", mes: "" };
}

export function fechaLarga(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

/** Meses (AAAA-MM) con alguna convocatoria de fecha exacta o aproximada, para el filtro Mes. */
export function mesesDisponibles(lista: Convocatoria[]): { valor: string; etiqueta: string }[] {
  const meses = new Set<string>();
  for (const c of lista) {
    if (c.tipoFecha === "exacta" && c.fecha) meses.add(c.fecha.slice(0, 7));
    if (c.tipoFecha === "mes" && c.mesAprox) meses.add(c.mesAprox);
  }
  const nombres = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  return [...meses].sort().map((m) => {
    const [anio, mes] = m.split("-");
    return { valor: m, etiqueta: `${nombres[Number(mes) - 1]} ${anio}` };
  });
}

/** Etiqueta de estado de una convocatoria (una sola por fila). */
export type Estado =
  | "verificado"
  | "provisional"
  | "por-confirmar"
  | "abierta"
  | null;

export function estadoConvocatoria(c: Convocatoria): Estado {
  if (c.tipoFecha === "abierta") return "abierta";
  if (c.tipoFecha === "mes") return "por-confirmar";
  if (c.estadoFecha === "provisional") return "provisional";
  if (c.origen === "club") return "verificado";
  return null;
}
