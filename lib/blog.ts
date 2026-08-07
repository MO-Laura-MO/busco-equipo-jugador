/** Índice de artículos del blog. Añadir aquí cada artículo nuevo. */
export interface Articulo {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string; // AAAA-MM-DD
  /** Etiqueta de la cabecera y de la tarjeta; si falta, "Guía para familias". */
  etiqueta?: string;
}

export const ARTICULOS: Articulo[] = [
  {
    slug: "elegir-deporte-futbol-baloncesto-voleibol",
    titulo: "Fútbol, baloncesto o voleibol: cómo elegir el deporte de este curso",
    descripcion:
      "Qué diferencia al voleibol del fútbol y el baloncesto, qué mirar antes de apuntar a nadie y cómo probar sin comprometerse. Guía para elegir deporte en Madrid.",
    fecha: "2026-08-07",
  },
  {
    slug: "haikyuu-empezar-a-jugar-voleibol",
    titulo: "Has visto Haikyuu y quieres jugar: por dónde se empieza de verdad",
    descripcion:
      "Qué cuenta bien Haikyuu del voleibol y qué no es exactamente así, y cómo empezar a jugar de verdad en Madrid aunque no hayas tocado un balón nunca.",
    fecha: "2026-08-07",
    etiqueta: "Guía para jugadores",
  },
  {
    slug: "federado-o-escuela-de-voleibol",
    titulo: "Federado o escuela de voleibol: cuál elegir según la edad y el momento",
    descripcion:
      "Diferencias entre un club federado y una escuela de voleibol en Madrid: cuándo se entra, cuánto se entrena, si hay competición y qué preguntar antes de apuntarse.",
    fecha: "2026-08-07",
  },
  {
    slug: "cuando-son-las-pruebas-de-voleibol-madrid",
    titulo: "Cuándo son las pruebas de voleibol en Madrid: calendario de la temporada 2026-27",
    descripcion:
      "Las dos ventanas de pruebas de los clubes de voleibol de Madrid, qué pasa si llegas fuera de plazo y cómo enterarte de las convocatorias de tu categoría.",
    fecha: "2026-08-07",
  },
  {
    slug: "voleibol-masculino-madrid",
    titulo: "Voleibol masculino en Madrid: dónde puede jugar un chico",
    descripcion:
      "Por qué cuesta encontrar equipos de voleibol masculino en Madrid, dónde buscar, qué preguntar a los clubes y qué opciones hay en cada categoría.",
    fecha: "2026-08-07",
  },
  {
    slug: "como-apuntar-a-tu-hijo-a-voleibol-en-madrid",
    titulo: "Cómo apuntar a tu hijo o hija a voleibol en Madrid: guía 2026-27",
    descripcion:
      "Los pasos para encontrar club de voleibol en la Comunidad de Madrid: categorías, tipos de club, cuándo son las pruebas y cómo contactar.",
    fecha: "2026-08-06",
  },
  {
    slug: "categorias-voleibol-por-edad",
    titulo: "Categorías del voleibol por edad: de benjamín a máster (2026-27)",
    descripcion:
      "Qué categoría corresponde a cada año de nacimiento en la temporada 2026-27: benjamín, alevín, infantil, cadete, juvenil, júnior, sénior y máster.",
    fecha: "2026-08-06",
  },
  {
    slug: "como-es-una-prueba-de-voleibol",
    titulo: "Cómo es una prueba de voleibol: qué llevar y qué miran los entrenadores",
    descripcion:
      "Qué esperar el día de la prueba de un club de voleibol: qué llevar, cómo suele organizarse y qué valoran los entrenadores en cada categoría.",
    fecha: "2026-08-06",
  },
];
