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
        text: "La Federación de Madrid de Voleibol ha convocado el curso de Técnico de Competición de Nivel I del 13 al 24 de octubre de 2026, con inscripción abierta hasta el 7 de octubre a las 12:00.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el curso de entrenador de voleibol de nivel 1 en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "210 euros la tarifa general, 189 euros para titulados en TSEAS o TAFAD y 105 euros para quien acude autorizado por un club federado. Una asignatura suelta cuesta 55 euros.",
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
          <strong>Actualizado el 17 de agosto de 2026.</strong>
        </p>

        <h2>Convocatoria abierta: nivel 1, octubre de 2026</h2>
        <p>
          Es el curso federativo de{" "}
          <a
            href="https://fmvoley.com/media/e45jp5bg/convocatoria-técnico-deportivo-de-voleibol-ni-octubre-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Técnico de Competición de Voleibol de Nivel I
          </a>
          .
        </p>
        <ul>
          <li>
            <strong>Fechas:</strong> del 13 al 24 de octubre de 2026.
          </li>
          <li>
            <strong>Inscripción:</strong> hasta el 7 de octubre a las 12:00.
          </li>
          <li>
            <strong>Formato:</strong> teoría por videoconferencia en directo
            los días 13, 14, 16, 19, 21 y 23, de 16:00 a 20:00, más una
            jornada presencial de prácticas el sábado 24, de 10:00 a 14:00 y
            de 16:00 a 20:00.
          </li>
          <li>
            <strong>Dónde:</strong> la parte presencial, en las instalaciones
            deportivas del Canal de Isabel II, Avenida de Filipinas 54,
            Madrid.
          </li>
          <li>
            <strong>Precio:</strong> 210 € general, 189 € con TSEAS o TAFAD,
            105 € para quien acude autorizado por un club federado, 55 € la
            asignatura suelta.
          </li>
          <li>
            <strong>Requisitos:</strong> cumplir 16 años durante 2026. No hace
            falta experiencia previa.
          </li>
          <li>
            <strong>Para aprobar:</strong> asistir al 80 % de las horas y
            sacar al menos un 5. El curso se imparte si hay un mínimo de 15
            alumnos.
          </li>
          <li>
            <strong>Qué habilita:</strong>{" "}
            <Link href="/blog/niveles-entrenador-voleibol">
              dirigir equipos de categoría infantil y cadete
            </Link>
            , una vez obtenido el título definitivo, que requiere una
            temporada de prácticas.
          </li>
        </ul>

        <h2>Nivel 2</h2>
        <p>
          Sin{" "}
          <a
            href="https://fmvoley.com/formacion/cursos-de-tecnico-de-competicion"
            target="_blank"
            rel="noopener noreferrer"
          >
            convocatoria abierta
          </a>{" "}
          en el momento de actualizar esta página. En la última publicada por
          la federación costaba 265 euros, con una fase teórica de 32 horas
          repartida en ocho tardes y 20 horas de prácticas. Las tasas del
          título definitivo van aparte. Para acceder hace falta el título
          definitivo de nivel 1, salvo excepciones por titulación
          universitaria o trayectoria como jugador.
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
          Dos cosas que ahorran disgustos. La primera: si un club te quiere,
          puede apuntarte como autorizado y la matrícula baja a 105 euros.
          Pregúntalo antes de pagar. La segunda: el curso no te da el título
          definitivo, sino el provisional; el definitivo llega tras una
          temporada de prácticas con un equipo federado, así que conviene{" "}
          <Link href="/entrenadores">tener club antes de empezar</Link>.
        </p>
      </Articulo>
    </>
  );
}
