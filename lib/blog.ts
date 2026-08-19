/**
 * A quién va dirigido un artículo. Es una LISTA, igual que `tipoEntidad` en
 * las convocatorias: un mismo artículo puede servir a la madre que apunta a su
 * hija y a la jugadora de quince años que se busca la vida sola. El primer
 * valor de la lista es el que manda en la etiqueta de la tarjeta.
 */
export type Publico = "familias" | "jugadores" | "entrenadores";

export const PUBLICOS: { valor: Publico; etiqueta: string; chip: string }[] = [
  { valor: "familias", etiqueta: "Guía para familias", chip: "Familias" },
  { valor: "jugadores", etiqueta: "Guía para jugadores", chip: "Jugadores" },
  { valor: "entrenadores", etiqueta: "Guía para entrenadores", chip: "Entrenadores" },
];

export function etiquetaPublico(p: Publico): string {
  return PUBLICOS.find((x) => x.valor === p)?.etiqueta ?? p;
}

/** Índice de artículos del blog. Añadir aquí cada artículo nuevo. */
export interface Articulo {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string; // AAAA-MM-DD
  /** Uno o varios. El primero da la etiqueta de la tarjeta. */
  publico: Publico[];
  /** Minutos de lectura, contados sobre el texto real del artículo. */
  minutos: number;
}

export const ARTICULOS: Articulo[] = [
  {
    slug: "como-ser-entrenador-de-voleibol-madrid",
    titulo:
      "Cómo ser entrenador de voleibol federado en Madrid: titulación, cursos y por dónde se empieza",
    descripcion:
      "Qué título hace falta para entrenar a un equipo de voleibol federado en Madrid, cuánto cuesta el curso de nivel 1 de la federación, cuándo es la próxima convocatoria y cómo se hacen las prácticas.",
    fecha: "2026-08-17",
    publico: ["entrenadores"],
    minutos: 5,
  },
  {
    slug: "cursos-entrenador-voleibol-madrid",
    titulo: "Cursos de entrenador de voleibol en Madrid: convocatorias, precios y plazos",
    descripcion:
      "Convocatorias abiertas de los cursos de entrenador de voleibol de la Federación de Madrid: fechas, precio, plazo de inscripción y qué habilita cada nivel. Actualizado en agosto de 2026.",
    fecha: "2026-08-17",
    publico: ["entrenadores"],
    minutos: 1,
  },
  {
    slug: "requisitos-entrenar-menores-voleibol",
    titulo: "Qué necesitas legalmente para entrenar a menores en un club de voleibol",
    descripcion:
      "Certificado de delitos de naturaleza sexual, título, licencia federativa y LOPIVI: lo que te va a pedir un club de voleibol antes de dejarte entrenar a niños, en liga federada, municipal o escuela.",
    fecha: "2026-08-17",
    publico: ["entrenadores"],
    minutos: 3,
  },
  {
    slug: "niveles-entrenador-voleibol",
    titulo: "Los niveles de entrenador de voleibol, explicados: qué te deja entrenar cada uno",
    descripcion:
      "Nivel 0, 1, 2 y 3 de entrenador de voleibol: requisitos, precios, prácticas y hasta qué categoría federada habilita cada título. Y por qué un curso online no federativo no sirve para el banquillo.",
    fecha: "2026-08-17",
    publico: ["entrenadores"],
    minutos: 3,
  },
  {
    slug: "buscar-equipo-entrenador-voleibol-madrid",
    titulo:
      "Buscar equipo como entrenador de voleibol en Madrid: cuándo y cómo se mueven los banquillos",
    descripcion:
      "Cuándo buscan entrenador los clubes de voleibol de Madrid, qué piden, cómo se escribe un mensaje que se responde y qué preguntar antes de aceptar un equipo.",
    fecha: "2026-08-17",
    publico: ["entrenadores"],
    minutos: 2,
  },
  {
    slug: "elegir-deporte-futbol-baloncesto-voleibol",
    titulo: "Fútbol, baloncesto o voleibol: cómo elegir el deporte de este curso",
    descripcion:
      "Qué diferencia al voleibol del fútbol y el baloncesto, qué mirar antes de apuntar a nadie y cómo probar sin comprometerse. Guía para elegir deporte en Madrid.",
    fecha: "2026-08-07",
    publico: ["familias"],
    minutos: 5,
  },
  {
    slug: "haikyuu-empezar-a-jugar-voleibol",
    titulo: "Has visto Haikyuu y quieres jugar: por dónde se empieza de verdad",
    descripcion:
      "Qué cuenta bien Haikyuu del voleibol y qué no es exactamente así, y cómo empezar a jugar de verdad en Madrid aunque no hayas tocado un balón nunca.",
    fecha: "2026-08-07",
    publico: ["jugadores"],
    minutos: 4,
  },
  {
    slug: "federado-o-escuela-de-voleibol",
    titulo: "Federado o escuela de voleibol: cuál elegir según la edad y el momento",
    descripcion:
      "Diferencias entre un club federado y una escuela de voleibol en Madrid: cuándo se entra, cuánto se entrena, si hay competición y qué preguntar antes de apuntarse.",
    fecha: "2026-08-07",
    publico: ["familias", "jugadores"],
    minutos: 2,
  },
  {
    slug: "cuando-son-las-pruebas-de-voleibol-madrid",
    titulo: "Cuándo son las pruebas de voleibol en Madrid: calendario de la temporada 2026-27",
    descripcion:
      "Las dos ventanas de pruebas de los clubes de voleibol de Madrid, qué pasa si llegas fuera de plazo y cómo enterarte de las convocatorias de tu categoría.",
    fecha: "2026-08-07",
    publico: ["familias", "jugadores"],
    minutos: 2,
  },
  {
    slug: "voleibol-masculino-madrid",
    titulo: "Voleibol masculino en Madrid: dónde puede jugar un chico",
    descripcion:
      "Por qué cuesta encontrar equipos de voleibol masculino en Madrid, dónde buscar, qué preguntar a los clubes y qué opciones hay en cada categoría.",
    fecha: "2026-08-07",
    publico: ["familias", "jugadores"],
    minutos: 4,
  },
  {
    slug: "como-apuntar-a-tu-hijo-a-voleibol-en-madrid",
    titulo: "Cómo apuntar a tu hijo o hija a voleibol en Madrid: guía 2026-27",
    descripcion:
      "Los pasos para encontrar club de voleibol en la Comunidad de Madrid: categorías, tipos de club, cuándo son las pruebas y cómo contactar.",
    fecha: "2026-08-06",
    publico: ["familias"],
    minutos: 2,
  },
  {
    slug: "categorias-voleibol-por-edad",
    titulo: "Categorías del voleibol por edad: de benjamín a máster (2026-27)",
    descripcion:
      "Qué categoría corresponde a cada año de nacimiento en la temporada 2026-27, de benjamín a máster, y qué clubes de Madrid tienen pruebas abiertas en cada una.",
    fecha: "2026-08-06",
    publico: ["familias", "jugadores"],
    minutos: 2,
  },
  {
    slug: "como-es-una-prueba-de-voleibol",
    titulo: "Cómo es una prueba de voleibol: qué llevar y qué miran los entrenadores",
    descripcion:
      "Qué esperar el día de la prueba de un club de voleibol: qué llevar, cómo suele organizarse y qué valoran los entrenadores en cada categoría.",
    fecha: "2026-08-06",
    publico: ["familias", "jugadores"],
    minutos: 2,
  },
];

/** Etiqueta que se muestra en la tarjeta y en la cabecera del artículo. */
export function etiquetaDe(a: Articulo): string {
  return etiquetaPublico(a.publico[0]);
}
