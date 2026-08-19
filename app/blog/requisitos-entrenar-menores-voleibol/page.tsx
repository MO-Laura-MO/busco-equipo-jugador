import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS, etiquetaDe } from "@/lib/blog";

const ART = ARTICULOS.find(
  (a) => a.slug === "requisitos-entrenar-menores-voleibol"
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
      name: "¿Es obligatorio el certificado de delitos sexuales para entrenar a niños?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. La Ley Orgánica 8/2021 de protección integral a la infancia exige la certificación negativa del Registro Central de delincuentes sexuales para cualquier actividad que implique contacto habitual con menores, sea retribuida o no, e incluye por tanto a los voluntarios de un club deportivo, compita este en liga federada, municipal o en una escuela.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta y cuánto tarda el certificado de delitos sexuales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Es gratuito. Se solicita en la sede electrónica del Ministerio de Justicia con Cl@ve o certificado electrónico y en el caso general se emite en el momento.",
      },
    },
    {
      "@type": "Question",
      name: "¿Caduca el certificado de delitos de naturaleza sexual?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No tiene fecha de caducidad legal, aunque acredita la situación en la fecha en que se expide y muchas entidades deportivas piden renovarlo cada temporada por protocolo propio.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo entrenar a un equipo de voleibol federado sin título de entrenador?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No de forma ordinaria. Las bases de competición exigen un entrenador con el nivel correspondiente en el acta, aunque la federación puede conceder autorizaciones temporales a quien todavía no tiene la titulación.",
      },
    },
    {
      "@type": "Question",
      name: "¿Y en un equipo municipal o en una escuela deportiva?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La normativa de voleibol de los Juegos Deportivos Municipales no fija titulación para el técnico; el requisito lo pone el ayuntamiento o la entidad que inscribe al equipo. En escuelas e iniciación sin competición, la ley de profesiones del deporte de la Comunidad de Madrid regula la figura de monitor deportivo y exige titulaciones como TSEAS, TAFAD o el grado en CAFyD.",
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
          Antes de tu primer entrenamiento, un club bien llevado te va a pedir
          tres o cuatro cosas. Ninguna es complicada, casi todas son gratis y
          conviene tenerlas antes de septiembre, porque en septiembre no hay
          tiempo para nada.
        </p>
        <p>
          Una de ellas es obligatoria siempre, entrenes donde entrenes. Las
          demás dependen de dónde compita el equipo.
        </p>

        <h2>1. El certificado de delitos de naturaleza sexual (siempre)</h2>
        <p>
          Es obligatorio y no admite matices. La{" "}
          <a
            href="https://www.boe.es/buscar/act.php?id=BOE-A-2021-9347"
            target="_blank"
            rel="noopener noreferrer"
          >
            ley de protección integral a la infancia
          </a>{" "}
          exige que quien trabaje en contacto habitual con menores acredite
          que no tiene{" "}
          <a
            href="https://www.mjusticia.gob.es/es/ciudadania/tramites/certificado-delitos"
            target="_blank"
            rel="noopener noreferrer"
          >
            condena firme por delitos contra la libertad e indemnidad sexuales
          </a>
          , y lo dice expresamente para actividades{" "}
          <strong>retribuidas o no</strong>: los voluntarios están incluidos.
          Y prohíbe a las entidades dar ocupación a quien tenga antecedentes.
        </p>
        <p>
          Da igual que sea un club federado, un equipo de los Juegos
          Deportivos Municipales o una extraescolar de un colegio. Si hay
          menores y el contacto es habitual, aplica.
        </p>
        <p>
          Se pide en la{" "}
          <a
            href="https://sede.mjusticia.gob.es/tramites/certificado-registro-central"
            target="_blank"
            rel="noopener noreferrer"
          >
            sede electrónica del Ministerio de Justicia
          </a>{" "}
          con Cl@ve o certificado digital, <strong>es gratuito</strong> y en
          el caso general se emite en el momento. También lo puede solicitar
          el club como entidad, pero necesita tu permiso.
        </p>
        <p>
          Un detalle que se pregunta mucho: el certificado{" "}
          <strong>no caduca</strong>. Lo que sí ocurre es que muchos clubes y
          federaciones piden renovarlo cada temporada por protocolo propio,
          que es razonable, porque acredita una situación en una fecha
          concreta.
        </p>

        <h2>2. El título de entrenador (depende de dónde compitas)</h2>
        <p>
          <strong>En liga federada</strong> el entrenador tiene que estar en
          el acta con{" "}
          <Link href="/blog/como-ser-entrenador-de-voleibol-madrid">
            el nivel que corresponda a la categoría
          </Link>
          :{" "}
          <Link href="/blog/niveles-entrenador-voleibol">
            nivel 0 en benjamín y alevín federado, nivel 1 desde infantil
            hasta las categorías sénior autonómicas, y nivel 2 en las
            divisiones sénior superiores
          </Link>
          . El nivel 0 aparece en la tabla de las bases pero no está definido
          en ninguna parte, así que en esas dos categorías conviene preguntar
          al club qué acepta la federación. Y si no tienes título todavía,
          existe la figura de la autorización federativa, que es un permiso
          temporal mientras te formas.
        </p>
        <p>
          <strong>En los Juegos Deportivos Municipales</strong> la normativa
          específica de voleibol no fija titulación para el técnico. El
          requisito, si lo hay, lo pone el ayuntamiento o la entidad que
          inscribe al equipo.
        </p>
        <p>
          <strong>
            En escuelas deportivas y actividades de iniciación sin
            competición
          </strong>{" "}
          no hay acta federativa, pero sí hay una ley autonómica que regula la
          figura de monitor deportivo y le exige titulación. Lo vemos abajo.
        </p>

        <h2>3. La licencia federativa (solo en federado)</h2>
        <p>
          La tramita el club, no tú, pero necesita tus datos y tu título. Sin
          licencia no puedes sentarte en el banquillo en un partido oficial, y
          al equipo le pueden caer sanciones económicas por presentarse sin
          entrenador en el acta.
        </p>

        <h2>4. El delegado de protección del club (esto le toca al club)</h2>
        <p>
          La misma ley de infancia obliga a las entidades que hacen
          actividades deportivas con menores a aplicar protocolos frente a la
          violencia, tener un sistema para comprobar que se cumplen y{" "}
          <strong>
            designar un delegado o delegada de protección
          </strong>{" "}
          a quien los chavales puedan acudir.
        </p>
        <p>
          No es papeleo tuyo, pero sí es una buena pregunta cuando{" "}
          <Link href="/entrenadores">entras en un club</Link>: quién es el
          delegado de protección y qué protocolo hay. Un club que no sepa
          responder tiene un problema, y tú también, porque el protocolo
          también te protege a ti como entrenador.
        </p>

        <h2>¿Es legal entrenar sin título en Madrid?</h2>
        <p>Depende de los tres escenarios de siempre.</p>
        <p>
          <strong>Liga federada.</strong> No, de forma ordinaria.{" "}
          <a
            href="https://fmvoley.com/media/2k1ib1ll/basesgeneralescompeticion-2025-26-v250625.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Las bases de competición
          </a>{" "}
          exigen un entrenador con nivel en el acta, y la ley de profesiones
          del deporte de la Comunidad de Madrid exige titulación para ejercer
          como entrenador deportivo en competición federada. El voleibol no
          tiene título oficial de Técnico Deportivo (esa titulación de
          Formación Profesional no existe para esta modalidad), y por eso la
          propia ley admite las formaciones federativas para el deporte en
          edad escolar mientras no exista el título oficial. Esa es la vía por
          la que se entrena en todo el voleibol base madrileño: el nivel 1 de
          la federación no es "un cursillo", es lo que te habilita.
        </p>
        <p>
          <strong>Competición municipal.</strong> La normativa de voleibol de
          los Juegos Deportivos Municipales no exige título. Eso no significa
          que nadie te lo vaya a pedir: el ayuntamiento, el colegio o el club
          que inscribe al equipo puede tener sus propias condiciones, y
          muchos las tienen.
        </p>
        <p>
          <strong>Escuelas e iniciación.</strong> La{" "}
          <a
            href="https://www.boe.es/buscar/act.php?id=BOE-A-2017-3069"
            target="_blank"
            rel="noopener noreferrer"
          >
            ley madrileña
          </a>{" "}
          regula aquí la figura de monitor deportivo, para la enseñanza que no
          está orientada a la competición, y le pide titulación: TSEAS o
          TAFAD, Técnico Superior en Acondicionamiento Físico, grado en CAFyD
          o el título de técnico deportivo de la modalidad. Las formaciones
          federativas de primer nivel también permiten ejercer funciones de
          monitor. Además, esa ley obliga a hacer una comunicación previa a la
          Dirección General de Deportes antes de empezar a ejercer.
        </p>

        <h2>La lista, resumida</h2>
        <p>
          Certificado de delitos de naturaleza sexual, gratuito, en el momento
          y para todos. Título del nivel que pida la categoría si el equipo
          compite en liga federada, o autorización de la federación.
          Licencia, que tramita el club. Y saber quién es el delegado de
          protección.
        </p>
      </Articulo>
    </>
  );
}
