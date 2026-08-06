/** Índice de artículos del blog. Añadir aquí cada artículo nuevo. */
export interface Articulo {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string; // AAAA-MM-DD
}

export const ARTICULOS: Articulo[] = [
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
