import clubesJson from "@/data/clubes.json";
import convocatoriasJson from "@/data/convocatorias.json";
import vacantesJson from "@/data/vacantes.json";

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
/**
 * Tipo de competición en la que juega el equipo de la convocatoria:
 * - federado: liga de la Federación Madrileña de Voleibol (licencia federativa).
 * - municipal: juegos deportivos municipales u otra liga de ayuntamiento.
 * - mancomunada: liga mancomunada, equipos formados juntando jugadores de
 *   varias entidades para poder completar una categoría.
 * - escuela: formación e iniciación, sin competición o solo interna.
 * No son lo mismo: un equipo municipal compite, una escuela no.
 *
 * Se guarda como lista porque una misma convocatoria puede dar acceso a más
 * de una liga: hay clubes con equipos federados y municipales en la misma
 * categoría, y una sola prueba sirve para las dos.
 */
export type TipoEntidad = "federado" | "mancomunada" | "municipal" | "escuela";
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
  /** Formulario de inscripción del club. Se muestra tras el botón de contacto, sin enseñar la URL. */
  formularioUrl?: string;
  /** Nota corta bajo el formulario, p. ej. la vía alternativa por redes. */
  formularioNota?: string;
  /** Color de fondo de la cabecera de su ficha, tal como lo ha dado el club.
   *  Solo se usa si el club tiene perfil verificado. Puede venir ilegible:
   *  `coloresClub()` lo corrige. */
  colorFondo?: string;
  /** Color de los enlaces, el aviso de entrenador y el botón de contacto. */
  colorAcento?: string;
  fechaActualizacion: string;
}

export interface Convocatoria {
  clubId: string;
  categoria: Categoria;
  sexo: Sexo;
  /** Una o varias: un equipo puede jugar liga federada y municipal a la vez. */
  tipoEntidad: TipoEntidad[];
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

/**
 * Puesto que busca cubrir la vacante. La mayoría son de un equipo (entrenador
 * principal o segundo), pero también hay perfiles transversales como monitor
 * de escuela o preparador físico de todo el club.
 */
export type Puesto =
  | "entrenador"
  | "segundo-entrenador"
  | "ayudante"
  | "monitor"
  | "coordinador"
  | "preparador-fisico";
export type Compensacion =
  | "remunerada"
  | "ayuda-gastos"
  | "voluntaria"
  | "por-determinar";

/**
 * Vacante de entrenador/a de un club. Es una entidad propia, igual que la
 * convocatoria: un mismo club puede tener varias vacantes abiertas a la vez,
 * con requisitos y equipos distintos.
 */
export interface Vacante {
  clubId: string;
  puesto: Puesto;
  /** Vacío si el puesto no es de un equipo concreto (por ejemplo, escuelas). */
  categoria?: Categoria;
  sexo?: Sexo;
  tipoEntidad: TipoEntidad[];
  /** Texto libre corto: "Primera división autonómica", "Escuelas". */
  nivel: string;
  /** Texto libre corto: "Nivel 2 o 3". No se filtra por él. */
  titulacion: string;
  /** Texto libre corto con lo que pide el club. */
  requisitos: string;
  dias: string;
  horario: string;
  pabellon: string;
  compensacion: Compensacion;
  /** Texto libre corto: "Inmediata", "Septiembre". */
  incorporacion: string;
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

/**
 * Las vacantes caducan a los 45 días sin actualizar, igual que las
 * convocatorias caducan por fecha: un tablón con ofertas muertas se lleva
 * por delante la credibilidad del resto de la web.
 */
const CORTE_VACANTES = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

export const vacantes = (vacantesJson as Vacante[]).filter(
  (v) => v.fechaActualizacion >= CORTE_VACANTES
);

/** true si hay alguna vacante viva; la usan la cabecera y la portada. */
export const hayVacantes = vacantes.length > 0;

export function clubPorId(id: string): Club | undefined {
  return clubes.find((c) => c.id === id);
}

const SIGLAS_CLUB = new Set([
  "CV", "CDE", "CD", "CDB", "CDV", "AD", "ADV", "ADC", "SAD", "CP", "ABV",
  "C.D.", "C.D.E", "C.D", "CLUB", "DEPORTIVO", "ELEMENTAL", "DE", "DEL",
  "LA", "EL", "LOS", "LAS", "Y",
]);

/** Iniciales para el avatar de un club cuando no tiene escudo subido. */
export function iniciales(nombre: string): string {
  // El municipio entre paréntesis no son iniciales del club, y los signos
  // sueltos tampoco: sin esto, "CV Bulldogs (Villanueva del Pardillo)" da "B(".
  const limpio = nombre.replace(/\([^)]*\)/g, " ");
  const palabras = limpio
    .split(/\s+/)
    .map((p) => p.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter(Boolean)
    .filter((p) => !SIGLAS_CLUB.has(p.toUpperCase()));
  const base =
    palabras.length > 0
      ? palabras
      : limpio
          .split(/\s+/)
          .map((p) => p.replace(/[^\p{L}\p{N}]/gu, ""))
          .filter(Boolean);
  return base
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/**
 * Texto listo para buscar: en minúsculas y sin tildes ni diéresis, para que
 * "mostoles" encuentre "CV Móstoles" y "alcala" encuentre "CV Alcalá". Se
 * aplica a los dos lados de la comparación, así que también funciona al revés:
 * quien escriba "Móstoles" con tilde encuentra lo mismo.
 *
 * La eñe pierde la virgulilla y se compara como ene, que es justo lo que
 * queremos: "señora" y "senora" tienen que devolver lo mismo.
 */
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function convocatoriasDeClub(clubId: string): Convocatoria[] {
  return ordenarConvocatorias(convocatorias.filter((c) => c.clubId === clubId));
}

/** Posición de orden por categoría de una vacante; sin categoría va al final. */
function ordenCategoriaVacante(v: Vacante): number {
  return v.categoria ? ordenCategoria(v.categoria) : CATEGORIAS.length;
}

export function vacantesDeClub(clubId: string): Vacante[] {
  return vacantes
    .filter((v) => v.clubId === clubId)
    .sort((a, b) => ordenCategoriaVacante(a) - ordenCategoriaVacante(b));
}

/**
 * Vacantes ordenadas por nombre de club (A-Z) y, dentro de cada club, por
 * orden de categoría de edad; las que no tienen categoría, al final.
 */
export function vacantesOrdenadas(): { vacante: Vacante; club: Club }[] {
  return vacantes
    .map((vacante) => ({ vacante, club: clubPorId(vacante.clubId)! }))
    .filter((v) => v.club)
    .sort((a, b) => {
      const nombre = a.club.nombre.localeCompare(b.club.nombre, "es");
      if (nombre !== 0) return nombre;
      return ordenCategoriaVacante(a.vacante) - ordenCategoriaVacante(b.vacante);
    });
}

/**
 * Título de una vacante: "Categoría sexo" si tiene categoría (con el nivel
 * detrás separado por "·", igual que en las convocatorias de la ficha de
 * club); si no, el nivel; y si tampoco hay nivel, la etiqueta de su tipo de
 * competición.
 */
const ETIQUETAS_PUESTO: Record<Puesto, string> = {
  entrenador: "Entrenador/a",
  "segundo-entrenador": "Segundo entrenador/a",
  ayudante: "Ayudante",
  monitor: "Monitor/a",
  coordinador: "Coordinador/a",
  "preparador-fisico": "Preparador/a física",
};

export function tituloVacante(v: Vacante): string {
  const partes: string[] = [];
  // El entrenador principal no se nombra: es el caso por defecto y la barra de
  // la sección ya dice "vacantes de entrenador". Los demás puestos sí, porque
  // cambian por completo lo que se ofrece.
  if (v.puesto !== "entrenador") partes.push(ETIQUETAS_PUESTO[v.puesto]);
  if (v.categoria) {
    partes.push(
      [etiquetaCategoria(v.categoria), v.sexo ? etiquetaSexo(v.sexo).toLowerCase() : null]
        .filter(Boolean)
        .join(" ")
    );
    if (v.nivel) partes.push(v.nivel);
  } else if (v.nivel) {
    partes.push(v.nivel);
  } else {
    partes.push(etiquetaTipoEntidad(v.tipoEntidad[0]));
  }
  return partes.join(" · ");
}

const ETIQUETAS_COMPENSACION: Record<Compensacion, string> = {
  remunerada: "Remunerada",
  "ayuda-gastos": "Ayuda de gastos",
  voluntaria: "Voluntaria",
  "por-determinar": "",
};

/** Etiqueta de la compensación de una vacante; vacío si es "por-determinar" (no se muestra). */
export function etiquetaCompensacion(c: Compensacion): string {
  return ETIQUETAS_COMPENSACION[c];
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

/** Etiquetas del tipo de competición, en el orden en que deben mostrarse. */
export const TIPOS_ENTIDAD: { valor: TipoEntidad; etiqueta: string }[] = [
  { valor: "federado", etiqueta: "Federado" },
  { valor: "mancomunada", etiqueta: "Liga mancomunada" },
  { valor: "municipal", etiqueta: "Liga municipal" },
  { valor: "escuela", etiqueta: "Escuela" },
];

export function etiquetaTipoEntidad(t: TipoEntidad): string {
  return TIPOS_ENTIDAD.find((x) => x.valor === t)?.etiqueta ?? t;
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
  | "federado"
  | "mancomunada"
  | "municipal"
  | "escuela"
  | "provisional"
  | "por-confirmar"
  | "fecha-por-confirmar"
  | "abierta"
  | null;

/**
 * Etiquetas de una convocatoria, en este orden:
 * - "Verificado por el club" (verde), siempre que origen = club.
 * - El tipo o tipos de competición (gris).
 * - La de estado de fecha que corresponda: abierta (azul), día por
 *   confirmar (gris, hay mes pero no día), fecha por confirmar (gris,
 *   sin fecha anunciada) o fecha provisional (ámbar).
 *
 * El tipo de competición se muestra SIEMPRE, también cuando el equipo es solo
 * federado: es de lo primero que mira quien busca club, porque determina la
 * cuota, los desplazamientos y el compromiso de fin de semana. Si el equipo
 * juega en varias ligas se muestran todas.
 */
export function etiquetasConvocatoria(c: Convocatoria): Exclude<Estado, null>[] {
  const etiquetas: Exclude<Estado, null>[] = [];
  if (c.origen === "club") etiquetas.push("verificado");
  for (const t of TIPOS_ENTIDAD) {
    if ((c.tipoEntidad ?? []).includes(t.valor)) etiquetas.push(t.valor);
  }
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

/** Temporadas presentes en los datos (p. ej. "2026-27"), ordenadas. */
export function temporadasDisponibles(
  lista: Convocatoria[]
): { valor: string; etiqueta: string }[] {
  const temporadas = new Set<string>();
  for (const c of lista) if (c.temporada) temporadas.add(c.temporada);
  return [...temporadas].sort().map((t) => ({ valor: t, etiqueta: t }));
}

/**
 * Fecha de actualización más reciente entre una lista de convocatorias, en
 * formato ISO (AAAA-MM-DD). Vacío si la lista está vacía. La usan el listado
 * de pruebas y las páginas por categoría, municipio y zona para decir cuándo
 * se revisó por última vez lo que se está mostrando.
 */
export function ultimaActualizacion(lista: { fechaActualizacion: string }[]): string {
  if (lista.length === 0) return "";
  return lista.reduce(
    (max, c) => (c.fechaActualizacion > max ? c.fechaActualizacion : max),
    lista[0].fechaActualizacion
  );
}
