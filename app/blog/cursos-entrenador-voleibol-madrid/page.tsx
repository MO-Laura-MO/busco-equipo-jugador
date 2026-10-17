import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS, etiquetaDe } from "@/lib/blog";

const ART = ARTICULOS.find(
  (a) => a.slug === "cursos-entrenador-voleibol-madrid"
)!;

export const metadata: Metadata = {
  title: ART.titulo,
  description: ART.descripcion,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuándo es el próximo curso de entrenador de voleibol en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Federación de Madrid de Voleibol ha convocado el curso de Técnico Deportivo de Nivel II del 9 al 27 de noviembre de 2026, por videoconferencia, con inscripción hasta el 3 de noviembre. El de nivel 1 de octubre ya tiene la inscripción cerrada.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el curso de entrenador de voleibol de nivel 1 en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "210 euros la tarifa general, 189 euros para titulados en TSEAS o TAFAD, 105 euros si ya estás autorizado en un club federado y 55 euros la asignatura suelta.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde se hace el curso de entrenador de voleibol de la Federación de Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La parte teórica es por videoconferencia en directo y la jornada de prácticas es presencial, en las instalaciones deportivas del Canal de Isabel II, en la Avenida de Filipinas 54 de Madrid.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué requisitos hay para apuntarse al curso de nivel 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cumplir 16 años durante el año en que se imparte el curso. No se exige experiencia previa ni haber jugado en competición.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué requisitos hay para apuntarse al curso de nivel 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tener el título definitivo de nivel 1. También pueden acceder los diplomados en Educación Física con un curso de voleibol, quien haya jugado 10 partidos internacionales absolutos y quien haya tenido licencia cinco años en categoría absoluta de ligas nacionales.",
      },
    },
  ],
};

export default function Pagina() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Articulo titulo={ART.titulo} fecha={ART.fecha} etiqueta={etiquetaDe(ART)}>
        <p>
          La Federación de Madrid de Voleibol convoca sus{" "}
          <Link href="/blog/como-ser-entrenador-de-voleibol-madrid">
            cursos de entrenador
          </Link>{" "}
          varias veces al año, sin calendario fijo y sin apenas antelación: la
          información sale en un PDF y en un listado de su web que los
          buscadores no leen bien. Aquí la recogemos ordenada y con la fecha
          en la que la hemos comprobado.
        </p>
        <p>
          <strong>Actualizado el 14 de octubre de 2026.</strong>
        </p>

        <h2>Convocatoria abierta: nivel 2, noviembre de 2026</h2>
        <p>
          Es el curso federativo de{" "}
          <a
            href="https://fmvoley.com/media/xfhd2r4d/convocatoria-t%C3%A9cnico-deportivo-de-voleibol-n2-noviembre-2026-fmvb.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Técnico Deportivo de Voleibol de Nivel II
          </a>
          , el título que hace falta para dirigir equipos juveniles y
          absolutos en la liga autonómica y en las fases nacionales de
          Segunda División.
        </p>
        <ul>
          <li>
            <strong>Fechas:</strong> del 9 al 27 de noviembre de 2026.
          </li>
          <li>
            <strong>Inscripción:</strong> hasta el 3 de noviembre de 2026, con
            el formulario de la web de la federación.
          </li>
          <li>
            <strong>Formato:</strong> 100 % por videoconferencia en directo,
            sin grabaciones: ocho tardes de 16:00 a 20:00 (9, 11, 13, 17, 19,
            23, 25 y 27 de noviembre). Después, 20 horas de prácticas en pista
            con la federación, en fechas por determinar.
          </li>
          <li>
            <strong>Quién puede apuntarse:</strong> quien tenga el título
            definitivo de nivel 1, diplomados en Educación Física con un curso
            de voleibol, jugadores con 10 partidos internacionales absolutos o
            quien haya jugado cinco años con licencia en categoría absoluta de
            ligas nacionales.
          </li>
          <li>
            <strong>Para aprobar:</strong> asistir al 85 % de las horas, no
            faltar a más de un bloque por área y sacar al menos un 5. El curso
            sale adelante con un mínimo de 15 alumnos.
          </li>
          <li>
            <strong>Qué habilita:</strong> al aprobar tienes el título
            provisional y ya puedes entrenar con él. El definitivo llega tras
            una temporada de prácticas con un equipo federado.
          </li>
        </ul>
        <p>
          El precio, las tarifas reducidas y las convalidaciones están en la
          convocatoria de la federación.
        </p>

        <h2>Nivel 1</h2>
        <p>
          La convocatoria de octubre de 2026 tiene la inscripción cerrada y el
          curso se imparte del 13 al 24 de octubre. Se puede hacer desde el
          año en que cumples 16 y no pide experiencia previa. La federación
          no anuncia la siguiente con antelación; la añadiremos aquí en cuanto
          salga.
        </p>

        <h2>Nivel 3</h2>
        <p>
          Lo convoca la federación española, no la madrileña. La convocatoria
          de 2026 costaba 750 euros, con 60 plazas y sede fuera de Madrid; en
          2025 la fase presencial se celebró aquí, en la Universidad Europea.
          Se anuncia en el{" "}
          <a
            href="https://voleibol-esp.olimpiada.es/cursos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            portal de cursos de la RFEVB
          </a>
          .
        </p>

        <h2>Otras vías</h2>
        <p>
          El Ayuntamiento de Madrid programa cursos de nivel 1 de voleibol
          dentro de sus campañas de actividades para jóvenes, con condiciones
          distintas a las de la federación. Si tienes menos de 30 años,
          merece la pena comprobarlo antes de pagar la matrícula ordinaria.
        </p>

        <h2>Antes de matricularte</h2>
        <p>
          Antes de matricularte, una cosa que ahorra disgustos: el curso no
          te da el título definitivo, sino el provisional. Para el definitivo
          vale una temporada completa en un equipo federado, o una temporada
          en un equipo no federado más un trimestre en uno federado; si
          vienes de TSEyAS o TAFAD, tiene que ser la temporada completa en
          federado. El definitivo llega tras una temporada de prácticas con
          un equipo federado, así que conviene{" "}
          <Link href="/entrenadores">tener club antes de empezar</Link>.
          ¿Y si lo que quieres es estar en la cancha sin dirigir un equipo?
          Están las otras dos vías:{" "}
          <Link href="/blog/como-ser-arbitro-de-voleibol-madrid">
            árbitro y anotador
          </Link>
          .
        </p>
      </Articulo>
    </>
  );
}
