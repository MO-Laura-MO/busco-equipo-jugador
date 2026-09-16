import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS, etiquetaDe } from "@/lib/blog";

const ART = ARTICULOS.find(
  (a) => a.slug === "como-ser-arbitro-de-voleibol-madrid"
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
      name: "¿Cuánto cuesta el curso de árbitro de voleibol en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La matrícula del curso de árbitro de nivel 1 de la Federación de Madrid cuesta 210 euros. El curso de anotador cuesta 40 euros.",
      },
    },
    {
      "@type": "Question",
      name: "¿Se cobra por arbitrar o anotar en voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Tanto árbitros como anotadores son designados para los partidos y perciben derechos por ellos, según las tarifas que la Federación de Madrid publica cada temporada en sus bases generales de competición. En el caso del árbitro de nivel 1, las prácticas del propio curso ya son partidos de competición y la federación retiene los primeros 90 euros de esos derechos para cubrir el coste de la autorización arbitral.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué edad hay que tener para ser árbitro o anotador de voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Más de 16 años para el curso de árbitro. Para el de anotador basta con tener 16 o cumplirlos durante el año en que se imparte el curso.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuándo se convocan los cursos de árbitro y anotador de voleibol en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Federación de Madrid suele convocarlos a principios de septiembre, antes del arranque de la competición, aunque no publica un calendario fijo y puede abrir otra convocatoria durante la temporada. En 2026 el plazo del curso de árbitro cerró el 1 de septiembre y el de anotador el 9 de septiembre.",
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
          Para estar dentro de un partido de voleibol no hace falta jugar ni
          entrenar. Hay dos vías más, mucho menos conocidas, y las dos se abren
          con un curso corto de la Federación de Madrid: anotador y árbitro.
          Las dos acaban en el mismo sitio, que te designen partidos y cobrar
          por ellos. Lo que cambia es lo que cuesta el curso, lo que dura y
          hasta qué competición te llega.
        </p>
        <p>
          Lo contamos entero porque casi nadie lo cuenta: la información sale en
          dos PDF sueltos en la web de la federación, un par de semanas antes de
          que empiece cada curso.
        </p>
        <p>
          <strong>Actualizado el 16 de septiembre de 2026.</strong>
        </p>

        <h2>Anotador: 40 euros y cinco sesiones</h2>
        <p>
          Es la puerta de entrada más barata que existe al voleibol federado. El
          anotador lleva el acta del partido: quién saca, cómo van los sets, las
          rotaciones, los cambios.
        </p>
        <ul>
          <li>
            <strong>Qué cuesta:</strong> 40 euros.
          </li>
          <li>
            <strong>Cuánto dura:</strong> cuatro tardes de teoría por
            videoconferencia, de 16:00 a 20:00, más una jornada de prácticas.
          </li>
          <li>
            <strong>Quién puede:</strong> cualquiera que tenga 16 años o los
            cumpla ese mismo año. Hace falta NIF o NIE, un correo electrónico y
            conexión a internet.
          </li>
          <li>
            <strong>Qué habilita:</strong> anotar en las competiciones
            territoriales de la federación, de minivóley a sénior, y arbitrar en
            competiciones municipales.
          </li>
        </ul>
        <p>
          La convocatoria de la temporada 2026-27 fue del 16 al 26 de
          septiembre, con plazo hasta el 9 de septiembre, así que{" "}
          <strong>ya está cerrada</strong>.
        </p>

        <h2>Árbitro de nivel 1: 210 euros y nueve jornadas</h2>
        <p>
          El curso de árbitro es más largo y más caro, y tiene una
          particularidad que conviene entender antes de mirar el precio:{" "}
          <strong>las prácticas se hacen arbitrando partidos de competición de
          verdad, y esos partidos ya se cobran</strong>. De los primeros
          derechos arbitrales que te corresponden, la federación retiene 90
          euros de una vez para cubrir el coste de tu autorización arbitral. O
          sea, que una parte de lo que cuesta empezar se recupera arbitrando.
        </p>
        <p>
          Lo que se percibe por cada partido depende de la categoría y de la
          competición, y la federación lo publica cada temporada en sus{" "}
          <a
            href="https://fmvoley.com/voleibol/normativas-y-reglamentos"
            target="_blank"
            rel="noopener noreferrer"
          >
            bases generales de competición
          </a>
          , junto con lo que corresponde por desplazamiento.
        </p>
        <ul>
          <li>
            <strong>Qué cuesta:</strong> 210 euros de matrícula. Después, en la
            fase práctica, esa retención inicial fija de 90 euros sobre los
            primeros derechos arbitrales.
          </li>
          <li>
            <strong>Cuánto dura:</strong> ocho jornadas de teoría por
            videoconferencia, la mayoría de 16:00 a 20:00, más una jornada de
            exámenes.
          </li>
          <li>
            <strong>La fase práctica:</strong> cuatro semanas de competición en
            las que hay que dar disponibilidad un mínimo de cuatro jornadas
            completas, de mañana o de tarde, y arbitrar los encuentros para los
            que te designen.
          </li>
          <li>
            <strong>Quién puede:</strong> tener más de 16 años, NIF o NIE, correo
            electrónico y conexión a internet.
          </li>
          <li>
            <strong>Dónde:</strong> la teoría es online en directo; lo
            presencial, en las instalaciones deportivas del Canal de Isabel II,
            en la Avenida de Filipinas 54 de Madrid.
          </li>
          <li>
            <strong>Qué habilita:</strong> la licencia de nivel 1, para dirigir
            competiciones de minivóley, infantil, cadete y juvenil.
          </li>
        </ul>
        <p>
          La convocatoria de la temporada 2026-27 fue del 7 al 19 de septiembre,
          con plazo hasta el 1 de septiembre. <strong>También está cerrada.</strong>
        </p>

        <h2>Las dos vías, comparadas</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Anotador</th>
              <th>Árbitro nivel 1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Precio</td>
              <td>40 €</td>
              <td>210 €</td>
            </tr>
            <tr>
              <td>Duración</td>
              <td>4 tardes más prácticas</td>
              <td>8 jornadas más 4 semanas de prácticas</td>
            </tr>
            <tr>
              <td>Edad</td>
              <td>16 años o cumplirlos ese año</td>
              <td>Más de 16 años</td>
            </tr>
            <tr>
              <td>Habilita</td>
              <td>Anotar en territorial, arbitrar en municipal</td>
              <td>Arbitrar minivóley, infantil, cadete y juvenil</td>
            </tr>
          </tbody>
        </table>

        <h2>Cuándo hay que estar atento</h2>
        <p>
          La federación suele convocarlos <strong>a principios de
          septiembre</strong>, justo antes de que arranque la competición, pero
          no tiene un calendario fijo publicado y puede abrir otra convocatoria
          más adelante en la temporada, sobre todo si faltan oficiales. Cuando
          convoca, el plazo se cierra con muy poco margen: en 2026, el curso de
          árbitro cerró inscripciones el día 1 y empezó el día 7.
        </p>
        <p>
          Así que no hay mucho truco: hay que mirar de vez en cuando la{" "}
          <a
            href="https://fmvoley.com/formacion"
            target="_blank"
            rel="noopener noreferrer"
          >
            sección de formación de la federación
          </a>
          , y con más atención en la última semana de agosto. Nosotros avisamos
          de cada convocatoria nueva en el canal de WhatsApp y en Instagram de
          nuestra web voley.app.
        </p>

        <h2>Data Volley y video check: los cursos técnicos de la española</h2>
        <p>
          Hay una tercera familia de cursos, la de los puestos técnicos, y la
          convoca la Real Federación Española de Voleibol. No se dan en Madrid,
          pero están abiertos a cualquiera y ahora mismo tienen convocatoria.
        </p>
        <p>
          <strong>Operador de Data Volley.</strong> Data Volley es el programa
          con el que se registra en directo cada acción de un partido: saques,
          recepciones, ataques, bloqueos. El operador lo maneja durante el
          encuentro y le pasa al entrenador lo que está pasando en números, set a
          set. Es un puesto muy pedido y con poca gente formada.
        </p>
        <p>
          <strong>Operador de video check.</strong> El video check es el sistema
          de revisión por vídeo del voleibol: cuando un entrenador pide revisar
          una bola dudosa, alguien tiene que manejar las cámaras y servirle la
          repetición al árbitro.
        </p>
        <p>
          La convocatoria de octubre de 2026 es la misma para los dos cursos:
        </p>
        <ul>
          <li>
            <strong>Fechas:</strong> 3 y 4 de octubre de 2026.
          </li>
          <li>
            <strong>Dónde:</strong> Pabellón de Deportes La Libertad, Avenida de
            la Libertad 111, Huétor Vega (Granada).
          </li>
          <li>
            <strong>Precio:</strong> 75 euros.
          </li>
          <li>
            <strong>Formato:</strong> presencial, dos días.
          </li>
          <li>
            <strong>Organiza:</strong> la Real Federación Española de Voleibol,
            con la Federación Andaluza y el Ayuntamiento de Huétor Vega.
          </li>
        </ul>
        <p>
          La convocatoria no publica requisitos previos ni fecha de cierre de
          inscripciones. El detalle está en el dossier de cada curso, en las
          fichas de{" "}
          <a
            href="https://esvoley.es/plus-voley/formacion/cursos-voleibol/operador-data-voley"
            target="_blank"
            rel="noopener noreferrer"
          >
            operador de Data Volley
          </a>{" "}
          y{" "}
          <a
            href="https://esvoley.es/plus-voley/formacion/cursos-voleibol/operador-video-check"
            target="_blank"
            rel="noopener noreferrer"
          >
            operador de video check
          </a>
          , donde también se hace la inscripción. Hay que contar con el viaje hasta
          Granada, así que es una decisión de fin de semana completo.
        </p>

        <h2>Y si lo tuyo es dirigir un equipo</h2>
        <p>
          Entonces la vía es otra: el curso de técnico deportivo. Ese sí tiene
          convocatoria abierta ahora mismo, hasta el 7 de octubre. Lo tienes todo
          en nuestra guía de{" "}
          <Link href="/blog/cursos-entrenador-voleibol-madrid">
            cursos de entrenador de voleibol en Madrid
          </Link>
          , y si lo que buscas es equipo, en el{" "}
          <Link href="/entrenadores">tablón de vacantes de los clubes</Link>.
        </p>
      </Articulo>
    </>
  );
}
