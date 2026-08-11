import clubesJson from "@/data/clubes.json";
import convocatoriasJson from "@/data/convocatorias.json";

export type Zona = "norte" | "sur" | "este" | "oeste" | "centro";
export type Categoria =
  | "benjamin"
  | "alevin"
  | "infantil"
  | "cadete"
  | "juvenil"
  | "junior"
  | "senior"
  | "master";
export type Sexo = "femenino" | "masculino" | "mixto";
export type TipoFecha = "exacta" | "mes" | "por-confirmar" | "abierta";
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
  /** Emails adicionales con etiqueta (p. ej. Formación / Rendimiento); se muestran tras "Ver contacto". */
  emailsExtra?: { etiqueta: string; email: string }[];
  /** true si el club busca entrenador/a; se muestra en la ficha y en el filtro de portada. */
  buscaEntrenador?: boolean;
  /** Detalle corto y opcional (máx ~150 car.), p. ej. "Cadete femenino, martes y jueves". */
  notasEntrenador?: string;
  fechaActualizacion: string;
}

export interface Convocatoria {
  clubId: string;
  categoria: Categoria;
  sexo: Sexo;
  tipoEntidad: "federado" | "escuela";
  nivel: string;
  /** Temporada a la que pertenece la prueba, p. ej. "2026-27". */
  temporada: string;
  tipoFecha: TipoFecha;
  fecha: string;
  mesAprox: string;
  /**
   * Años de nacimiento que convoca el club, p. ej. "2017 a 2021". Si falta,
   * se calculan con ANIOS_POR_TEMPORADA; el dato del club manda sobre la tabla.
   */
  anios?: string;
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
/**
 * Las convocatorias con fecha exacta ya pasada (más de 3 días) se ocultan
 * automáticamente. El filtro se evalúa en cada build (la web se reconstruye
 * con cada cambio de contenido), así el listado nunca muestra pruebas caducadas.
 */
const CORTE = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

export const convocatorias = (convocatoriasJson as Convocatoria[]).filter(
  (c) => !(c.tipoFecha === "exacta" && c.fecha && c.fecha < CORTE)
);

export function clubPorId(id: string): Club | undefined {
  return clubes.find((c) => c.id === id);
}

export function convocatoriasDeClub(clubId: string): Convocatoria[] {
  return ordenarConvocatorias(convocatorias.filter((c) => c.clubId === clubId));
}

/**
 * Orden del listado:
 * 1. fechas exactas confirmadas → 2. exactas provisionales → 3. por mes →
 * 4. fecha por confirmar → 5. inscripción abierta todo el año.
 * Dentro de cada grupo, por fecha/mes ascendente.
 */
export function grupoOrden(c: Convocatoria): number {
  if (c.tipoFecha === "exacta" && c.estadoFecha === "confirmada") return 0;
  if (c.tipoFecha === "exacta") return 1;
  if (c.tipoFecha === "mes") return 2;
  if (c.tipoFecha === "por-confirmar") return 3;
  return 4;
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
    const f = ka.localeCompare(kb) * factor;
    if (f !== 0) return f;
    // A igual fecha, por edad de la categoría (nunca alfabético).
    return ordenCategoria(a.categoria) - ordenCategoria(b.categoria);
  });
}

/* ---------- etiquetas de texto ---------- */

/**
 * Categorías en ORDEN DE EDAD (de menor a mayor), nunca alfabético.
 * Este orden manda en los chips de filtro y en cualquier listado por categoría.
 */
export const CATEGORIAS: { valor: Categoria; etiqueta: string }[] = [
  { valor: "benjamin", etiqueta: "Benjamín" },
  { valor: "alevin", etiqueta: "Alevín" },
  { valor: "infantil", etiqueta: "Infantil" },
  { valor: "cadete", etiqueta: "Cadete" },
  { valor: "juvenil", etiqueta: "Juvenil" },
  { valor: "junior", etiqueta: "Júnior" },
  { valor: "senior", etiqueta: "Sénior" },
  { valor: "master", etiqueta: "Máster" },
];

/** Posición de una categoría en el orden de edad (para ordenar, nunca alfabético). */
export function ordenCategoria(c: Categoria): number {
  const i = CATEGORIAS.findIndex((x) => x.valor === c);
  return i === -1 ? CATEGORIAS.length : i;
}

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

/** Etiquetas de estado de una convocatoria. */
export type Estado =
  | "verificado"
  | "provisional"
  | "por-confirmar"
  | "fecha-por-confirmar"
  | "abierta"
  | null;

/**
 * Una convocatoria puede llevar hasta dos etiquetas:
 * - "Verificado por el club" (verde), siempre que origen = club.
 * - La de estado de fecha que corresponda: abierta (azul), día por
 *   confirmar (gris, hay mes pero no día), fecha por confirmar (gris,
 *   sin fecha anunciada) o fecha provisional (ámbar).
 */
export function etiquetasConvocatoria(c: Convocatoria): Exclude<Estado, null>[] {
  const etiquetas: Exclude<Estado, null>[] = [];
  if (c.origen === "club") etiquetas.push("verificado");
  if (c.tipoFecha === "abierta") etiquetas.push("abierta");
  else if (c.tipoFecha === "por-confirmar") etiquetas.push("fecha-por-confirmar");
  else if (c.tipoFecha === "mes") etiquetas.push("por-confirmar");
  else if (c.estadoFecha === "provisional") etiquetas.push("provisional");
  return etiquetas;
}

/**
 * Años de nacimiento de cada categoría por temporada.
 * ACTUALIZAR CADA TEMPORADA: al preparar una temporada nueva hay que añadir
 * aquí su fila con los cortes de edad de la normativa federativa vigente.
 * Júnior, sénior y máster no llevan años fijos y quedan fuera a propósito.
 */
export const ANIOS_POR_TEMPORADA: Record<
  string,
  Partial<Record<Categoria, string>>
> = {
  "2026-27": {
    benjamin: "2017 y 2018",
    alevin: "2015 y 2016",
    infantil: "2013 y 2014",
    cadete: "2011 y 2012",
    juvenil: "2009 y 2010",
  },
};

/**
 * Línea de años de nacimiento de una convocatoria ("nacidas en 2013 y 2014").
 * El campo `anios` del club manda sobre la tabla; sin dato del club ni fila
 * en la tabla (júnior, sénior, máster o temporada desconocida) no se muestra.
 */
export function textoAnios(c: Convocatoria): string | null {
  const anios = c.anios || ANIOS_POR_TEMPORADA[c.temporada]?.[c.categoria];
  if (!anios) return null;
  const prefijo =
    c.sexo === "femenino"
      ? "nacidas"
      : c.sexo === "masculino"
        ? "nacidos"
        : "nacidos y nacidas";
  // Rango ("2017 a 2021") → "de 2017 a 2021"; pareja ("2015 y 2016") → "en 2015 y 2016".
  const preposicion = anios.includes(" a ") ? "de" : "en";
  return `${prefijo} ${preposicion} ${anios}`;
}

/** Clubes que buscan entrenador/a, ordenados por nombre. */
export function clubesBuscanEntrenador(lista: Club[]): Club[] {
  return lista
    .filter((c) => c.buscaEntrenador)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

/** Temporadas presentes en los datos (p. ej. "2026-27"), ordenadas. */
export function temporadasDisponibles(
  lista: Convocatoria[]
): { valor: string; etiqueta: string }[] {
  const temporadas = new Set<string>();
  for (const c of lista) if (c.temporada) temporadas.add(c.temporada);
  return [...temporadas].sort().map((t) => ({ valor: t, etiqueta: t }));
}
