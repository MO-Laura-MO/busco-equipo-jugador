import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS, etiquetaDe } from "@/lib/blog";

const ART = ARTICULOS.find(
  (a) => a.slug === "como-ser-entrenador-de-voleibol-madrid"
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
      name: "¿Qué titulación necesito para entrenar a un equipo de voleibol federado en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El título federativo de entrenador. Las bases de competición de la Federación de Madrid de Voleibol exigen nivel 1 para dirigir en infantil, cadete, juvenil, júnior y las categorías sénior autonómicas, y nivel 0 en benjamín y alevín federado. En las divisiones sénior superiores se exige nivel 2. En los Juegos Deportivos Municipales y en las escuelas deportivas no se aplican estas bases.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuándo es el próximo curso de entrenador de voleibol de nivel 1 en Madrid y cuánto cuesta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Federación de Madrid de Voleibol ha convocado el curso de Técnico de Competición de Nivel I del 13 al 24 de octubre de 2026, con inscripción hasta el 7 de octubre a las 12:00. Cuesta 210 euros, 189 euros con TAFAD o TSEAS y 55 euros la asignatura suelta.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hace falta haber jugado al voleibol para ser entrenador?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. El curso de nivel 1 solo exige cumplir 16 años en el año en que se imparte. Lo que sí es obligatorio es hacer un periodo de prácticas entrenando a un equipo antes de obtener el título definitivo.",
      },
    },
    {
      "@type": "Question",
      name: "¿Se puede entrenar en una escuela de voleibol sin el título federativo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El título federativo se exige para dirigir en competición federada. En escuelas deportivas e iniciación sin competición, la ley de profesiones del deporte de la Comunidad de Madrid regula la figura de monitor deportivo y pide titulaciones como TSEAS, TAFAD o el grado en CAFyD. En la práctica, cada club o ayuntamiento fija lo que exige.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto se tarda en tener el título de entrenador de voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El curso de nivel 1 son seis tardes de teoría y una jornada de prácticas, concentradas en dos semanas. El título definitivo llega después de una temporada completa de prácticas con un equipo federado, así que en la práctica se tarda un curso deportivo entero.",
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
          Este artículo va sobre entrenar en <strong>competición federada</strong>:
          la liga que organiza la Federación de Madrid de Voleibol, con
          licencia, acta y arbitraje. Es donde hay reglas claras sobre qué
          título necesitas, y también donde están casi todos los equipos de
          club.
        </p>
        <p>
          No es lo único que existe. Al final está lo que pasa en los Juegos
          Deportivos Municipales y en las escuelas deportivas, que funcionan
          de otra manera.
        </p>

        <h2>En liga federada, el banquillo pide título</h2>
        <p>
          En la competición federada madrileña el entrenador tiene que
          figurar en el acta y tener nivel. No es una manía del club: está en
          las{" "}
          <a
            href="https://fmvoley.com/media/2k1ib1ll/basesgeneralescompeticion-2025-26-v250625.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            bases de competición
          </a>{" "}
          de la federación. Es obligatorio incluir a un entrenador en el acta
          en todas las competiciones de base, y a partir de la segunda vez que
          un equipo se presenta sin él hay multa.
        </p>
        <p>
          El <Link href="/blog/niveles-entrenador-voleibol">nivel exigido</Link>{" "}
          en la temporada 2025-26 es este:
        </p>
        <table>
          <thead>
            <tr>
              <th>Categoría (liga federada)</th>
              <th>Nivel mínimo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Benjamín y alevín federado</td>
              <td>Nivel 0</td>
            </tr>
            <tr>
              <td>Infantil, cadete, juvenil y júnior</td>
              <td>Nivel I</td>
            </tr>
            <tr>
              <td>Sénior autonómicas</td>
              <td>Nivel I</td>
            </tr>
            <tr>
              <td>Divisiones sénior superiores</td>
              <td>Nivel II o habilitado</td>
            </tr>
          </tbody>
        </table>
        <p>
          Traducido: para entrenar a un infantil federado hace falta el nivel
          1. Para benjamín y alevín federado basta con el nivel 0.
        </p>
        <p>
          Sobre ese nivel 0 conviene decir una cosa: las bases lo exigen, pero
          no explican en ningún sitio qué formación es. La federación tampoco
          publica una convocatoria con ese nombre. Si vas a entrenar a un
          benjamín o a un alevín federado, pregunta directamente al club o a
          la federación qué te van a pedir antes de matricularte en nada. Y si
          acabas haciendo el nivel 1, te sirve igualmente para esas categorías
          y para todo lo que viene después.
        </p>
        <p>
          Si no tienes el título todavía no estás fuera del todo: la
          federación puede conceder autorizaciones temporales mientras te
          formas. Es lo que hacen muchos clubes con la gente que acaba de
          empezar.
        </p>

        <h2>El curso de nivel 1: la próxima convocatoria</h2>
        <p>
          Lo organiza la Federación de Madrid. Se puede hacer desde los 16
          años (concretamente, quien cumpla 16 en el año en que se imparte el
          curso) y no hace falta haber jugado nunca en competición.
        </p>
        <p>
          La{" "}
          <a
            href="https://fmvoley.com/media/e45jp5bg/convocatoria-técnico-deportivo-de-voleibol-ni-octubre-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            convocatoria abierta
          </a>{" "}
          ahora mismo es la de{" "}
          <Link href="/blog/cursos-entrenador-voleibol-madrid">
            octubre de 2026
          </Link>
          :
        </p>
        <ul>
          <li>
            <strong>Curso:</strong> del 13 al 24 de octubre de 2026.
          </li>
          <li>
            <strong>Inscripción:</strong> hasta el <strong>7 de octubre a las 12:00</strong>.
          </li>
          <li>
            <strong>Formato:</strong> seis tardes de teoría por videoconferencia
            en directo (13, 14, 16, 19, 21 y 23 de octubre, de 16:00 a 20:00)
            más una jornada presencial de prácticas el sábado 24, mañana y
            tarde, en las instalaciones del Canal de Isabel II, en Avenida de
            Filipinas 54.
          </li>
          <li>
            <strong>Precio:</strong> 210 € general y <strong>189 €</strong> con
            TAFAD o TSEAS. Una asignatura suelta, 55 €.
          </li>
          <li>
            <strong>Requisitos para aprobar:</strong> asistir al menos al 80 %
            de las horas y sacar un 5. El curso sale adelante con un mínimo de
            15 alumnos.
          </li>
        </ul>
        <p>
          Las asignaturas cubren metodología, planificación, análisis técnico,
          táctica, minivoley, reglamento, psicología y dirección de grupo,
          condición física y primeros auxilios. Si vienes de TAFAD, TSEAS o de
          un grado de Educación Física, varias de esas asignaturas te las
          convalidan.
        </p>
        <p>
          La federación tiene otras tarifas para algunos casos, pero no
          dependen solo de que un club te apunte: pregunta en tu club y en la
          federación antes de matricularte, porque las condiciones cambian de
          una convocatoria a otra.
        </p>

        <h2>El título no es tuyo hasta que entrenas una temporada</h2>
        <p>
          Al aprobar el curso te dan un{" "}
          <a
            href="https://fmvoley.com/formacion/tramitacion-de-titulos-de-tecnico-de-competicion"
            target="_blank"
            rel="noopener noreferrer"
          >
            título provisional
          </a>
          . El definitivo llega después de un periodo de prácticas, y hay dos
          formas de hacerlo:
        </p>
        <p>
          <strong>La vía normal:</strong> una temporada completa entrenando a
          un equipo federado.
        </p>
        <p>
          <strong>La alternativa:</strong> una temporada en un equipo no
          federado (una escuela, un colegio, un equipo municipal) más un
          trimestre en un equipo federado.
        </p>
        <p>
          Con una excepción que conviene saber antes de matricularse:{" "}
          <strong>
            quien tiene o está cursando TAFAD o TSEAS no puede usar la vía
            alternativa
          </strong>
          . En su caso la federación exige la temporada completa en un equipo
          federado, sin sustitutos.
        </p>
        <p>
          En los dos casos el club firma y sella un certificado de prácticas.
          Y en los dos casos hace falta lo mismo: un club que te deje
          entrenar. Por eso el orden real de las cosas no es "me saco el
          título y luego busco equipo", sino "encuentro club, me apunto al
          curso y hago las prácticas allí".
        </p>

        <h2>Si vienes de TAFAD, TSEAS o CAFyD</h2>
        <p>
          Tienes tres cosas a favor: descuento en la matrícula, asignaturas
          convalidadas y, si estás estudiando, unas prácticas obligatorias que
          un club de voleibol probablemente esté encantado de firmarte. Un
          grado en CAFyD, además, da acceso directo al curso de nivel 3 sin
          pasar por el 2.
        </p>
        <p>
          Lo que no te dan esos estudios es el banquillo federado: para
          dirigir en la liga de la federación necesitas igualmente el título
          federativo. Son dos cosas distintas y complementarias, y la mayoría
          de quien vive de esto en Madrid tiene las dos.
        </p>

        <h2>Si eres jugadora o jugador sénior</h2>
        <p>
          Eres el perfil que los clubes buscan y casi nunca encuentran. Sabes
          jugar, conoces la competición y ya estás en un pabellón tres días
          por semana. Lo que falta es el título, y el club es justo quien
          puede orientarte sobre cómo sacártelo.
        </p>
        <p>
          Lo habitual es empezar como segundo entrenador de un equipo de base,
          con alguien delante, mientras haces la temporada de prácticas. No es
          mala idea aunque puedas ir de primero: entrenar a un alevín no se
          parece nada a jugar.
        </p>

        <h2>¿Y si no es liga federada?</h2>
        <p>Dos casos frecuentes, con reglas distintas.</p>
        <p>
          <strong>Juegos Deportivos Municipales.</strong> En voleibol se
          convocan para deportistas no federados en{" "}
          <Link href="/blog/categorias-voleibol-por-edad">
            benjamín, alevín, infantil y cadete
          </Link>
          . La normativa específica de voleibol de estos juegos no fija
          ninguna titulación para el técnico: quien pone el requisito, si lo
          pone, es el ayuntamiento o la entidad que inscribe al equipo. Es una
          vía habitual para empezar, y sirve como parte del periodo de
          prácticas por la vía alternativa.
        </p>
        <p>
          <strong>Escuelas deportivas y extraescolares.</strong> No hay acta
          federativa, así que no aplica la tabla de niveles de arriba. Pero sí
          aplica otra cosa: la Comunidad de Madrid tiene una ley de
          profesiones del deporte que regula la figura de monitor deportivo
          (iniciación e instrucción no orientada a la competición) y le pide
          titulación: TSEAS o TAFAD, Técnico Superior en Acondicionamiento
          Físico, grado en CAFyD o el título de técnico deportivo de la
          modalidad. En la práctica, las empresas de extraescolares y los
          ayuntamientos suelen pedir TAFAD o CAFyD, y los clubes, el nivel 1
          federativo.
        </p>
        <p>
          Y en los tres escenarios (federado, municipal y escuela) hay una
          obligación que no depende de con quién compitas: el certificado de
          delitos de naturaleza sexual. Lo contamos en{" "}
          <Link href="/blog/requisitos-entrenar-menores-voleibol">
            el artículo de requisitos legales
          </Link>
          .
        </p>

        <h2>Por dónde seguir</h2>
        <p>
          En voley.app publicamos dos cosas: las convocatorias de pruebas de
          los clubes de Madrid, con el contacto directo de cada uno, y los
          clubes que buscan entrenador o entrenadora. Están en{" "}
          <Link href="/entrenadores">la sección de entrenadores</Link>.
        </p>
        <p>
          Si quieres empezar, escribe a los clubes de tu zona aunque no hayan
          publicado ninguna vacante. La mayoría de los puestos de voleibol
          base en Madrid no se anuncian en ninguna parte.
        </p>
      </Articulo>
    </>
  );
}
