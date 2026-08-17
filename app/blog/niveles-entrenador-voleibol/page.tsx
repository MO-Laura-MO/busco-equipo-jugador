import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS } from "@/lib/blog";

const ART = ARTICULOS.find((a) => a.slug === "niveles-entrenador-voleibol")!;

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
      name: "¿Qué categorías puedo entrenar con el nivel 1 de voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El reglamento de la RFEVB habilita el nivel 1 para dirigir equipos de las categorías infantil y cadete en competición estatal. En la liga autonómica madrileña el nivel 1 se exige desde infantil hasta las categorías sénior autonómicas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué se necesita para hacer el curso de entrenador de voleibol de nivel 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tener el título definitivo de nivel 1. También se accede con una diplomatura en Educación Física o acreditando cinco temporadas dirigiendo en competiciones estatales absolutas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Sirve un curso online de entrenador de voleibol para entrenar en la federación?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, si no lo convoca una federación. La licencia de entrenador en competición federada se tramita con el título federativo de nivel 0, 1, 2 o 3, que requiere además un periodo de prácticas certificado por un club.",
      },
    },
    {
      "@type": "Question",
      name: "¿Existe el título de Técnico Deportivo en Voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. El voleibol no tiene título oficial de Técnico Deportivo dentro de las enseñanzas deportivas de régimen especial, así que la formación de referencia para la competición federada es la federativa, admitida por la normativa mientras no exista el título oficial.",
      },
    },
    {
      "@type": "Question",
      name: "¿Valen estos niveles para entrenar en una escuela o en liga municipal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los niveles federativos regulan la competición federada. En escuelas deportivas y en los Juegos Deportivos Municipales las condiciones las fija el club, el colegio o el ayuntamiento, y para la iniciación sin competición la ley de profesiones del deporte de la Comunidad de Madrid pide titulaciones como TSEAS, TAFAD o el grado en CAFyD.",
      },
    },
  ],
};

const NIVELES = [
  {
    nombre: "Nivel 1",
    dirigir: "Infantil y cadete",
    acceso: "Cumplir 16 años en el año del curso",
    horas: "40 lectivas, 20 presenciales",
    practicas: "Una temporada con equipo federado",
    expide: "Federación autonómica",
  },
  {
    nombre: "Nivel 2",
    dirigir:
      "Juvenil, júnior y absolutos en fases nacionales de 2ª división",
    acceso:
      "Título definitivo de nivel 1, o diplomatura en Educación Física, o 5 temporadas en competición estatal absoluta",
    horas: "80 lectivas, 40 presenciales",
    practicas: "Una temporada",
    expide: "Federación autonómica",
  },
  {
    nombre: "Nivel 3",
    dirigir: "División de Honor, Superliga 2 y Primera División",
    acceso:
      "Título de nivel 2, o grado en CAFyD, o 40 partidos internacionales absolutos",
    horas: "120, 70 presenciales",
    practicas: "Una temporada",
    expide: "Solo la RFEVB",
  },
];

export default function Pagina() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Articulo titulo={ART.titulo} fecha={ART.fecha} etiqueta={ART.etiqueta}>
        <p>
          Los títulos de entrenador de voleibol en España los ordena el{" "}
          <a
            href="https://esvoley.es/media/pdzg3fpz/reglamento-de-entrenadores-cne.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Comité Nacional de Entrenadores de la Real Federación Española
          </a>
          . Son tres niveles, más una formación inicial para las categorías
          más pequeñas.
        </p>
        <p>
          Antes de la tabla, la aclaración que hace falta para leerla bien:{" "}
          <strong>estos niveles regulan la competición federada</strong>. Son
          los que te habilitan para figurar en el acta de un partido oficial.
          En los Juegos Deportivos Municipales y en las escuelas deportivas no
          se aplican; ahí las condiciones las pone el ayuntamiento, el
          colegio o el propio club, y{" "}
          <Link href="/blog/requisitos-entrenar-menores-voleibol">
            la ley madrileña de profesiones del deporte
          </Link>{" "}
          pide para la iniciación sin competición titulaciones del sistema
          educativo, tipo TSEAS, TAFAD o CAFyD.
        </p>

        <h2>La tabla</h2>
        <div className="mt-3 border-t border-borde-fila">
          {NIVELES.map((n) => (
            <div key={n.nombre} className="border-b border-borde-fila py-3">
              <p className="font-medium text-tinta">{n.nombre}</p>
              <ul className="mt-1">
                <li>
                  <strong>Permite dirigir (competición estatal):</strong>{" "}
                  {n.dirigir}.
                </li>
                <li>
                  <strong>Acceso:</strong> {n.acceso}.
                </li>
                <li>
                  <strong>Horas mínimas:</strong> {n.horas}.
                </li>
                <li>
                  <strong>Prácticas:</strong> {n.practicas}.
                </li>
                <li>
                  <strong>Quién lo expide:</strong> {n.expide}.
                </li>
              </ul>
            </div>
          ))}
        </div>
        <p>
          Debajo del nivel 1, las bases madrileñas exigen un{" "}
          <strong>nivel 0</strong> para dirigir en benjamín y alevín federado.
          Aparece en la tabla de titulaciones de la federación, pero ni{" "}
          <a
            href="https://fmvoley.com/media/2k1ib1ll/basesgeneralescompeticion-2025-26-v250625.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            las bases madrileñas
          </a>{" "}
          lo definen ni hay una convocatoria pública con ese nombre, así que
          lo razonable es preguntar en el club o en la federación qué
          formación aceptan. Con el nivel 1 esas categorías quedan cubiertas
          de todos modos.
        </p>
        <p>
          Dos precisiones que importan en Madrid. La primera: lo que habilita
          cada nivel en la competición <strong>estatal</strong> es lo de la
          tabla, pero la liga <strong>autonómica madrileña</strong> tiene sus
          propias exigencias, algo más suaves, y con el nivel 1 se puede
          dirigir hasta las categorías sénior autonómicas. La segunda: las
          horas de las convocatorias reales suelen ser menores que esos
          mínimos reglamentarios, porque el cómputo incluye trabajo no
          presencial y prácticas.
        </p>

        <h2>Cuánto cuesta subir de nivel</h2>
        <p>
          El <strong>nivel 1</strong> de la Federación de Madrid cuesta 210
          euros, con tarifa de 189 euros para TAFAD y TSEAS y de 105 euros
          para quien va{" "}
          <Link href="/entrenadores">autorizado por un club federado</Link>.{" "}
          <Link href="/blog/cursos-entrenador-voleibol-madrid">
            La convocatoria abierta es la de octubre de 2026
          </Link>
          : curso del 13 al 24 de octubre, seis tardes por videoconferencia
          más una jornada presencial de prácticas el sábado 24, e{" "}
          <a
            href="https://fmvoley.com/media/e45jp5bg/convocatoria-técnico-deportivo-de-voleibol-ni-octubre-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            inscripción hasta el 7 de octubre a las 12:00
          </a>
          .
        </p>
        <p>
          El <strong>nivel 2</strong>, en su última convocatoria publicada,
          costaba 265 euros, con una fase teórica de 32 horas y 20 horas de
          prácticas. Las tasas del título definitivo van aparte. La
          federación no publica el calendario del curso con antelación, así
          que hay que estar pendiente de sus convocatorias.
        </p>
        <p>
          El <strong>nivel 3</strong> lo convoca{" "}
          <a
            href="https://voleibol-esp.olimpiada.es/cursos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            la federación española
          </a>
          , no la madrileña: 750 euros de matrícula y 60 plazas en la
          convocatoria de 2026, que se celebró fuera de Madrid. En 2025 la
          fase presencial sí fue aquí, en la Universidad Europea.
        </p>

        <h2>El título provisional y el definitivo</h2>
        <p>
          Aprobar el curso te da el provisional. El definitivo exige una
          temporada de prácticas con un equipo federado, certificada por el
          club. Y ese título definitivo es el que te pide la federación para
          matricularte en el nivel siguiente, así que no se pueden encadenar
          el nivel 1 y el nivel 2 en el mismo año.
        </p>
        <p>
          Hay excepciones para quien viene de Educación Física, de CAFyD o de
          una carrera larga como jugador internacional. Están en el
          reglamento del comité nacional y merece la pena mirarlas antes de
          pagar un curso que no necesitas.
        </p>

        <h2>¿Y los cursos online de entrenador de voleibol que salen en Google?</h2>
        <p>
          Es la pregunta que ninguna de esas academias responde en su página,
          así que la respondemos aquí: un curso de una academia privada no
          federativa <strong>no te habilita para dirigir un equipo en
          competición federada</strong>. Puede estar bien como formación y
          puede sumar en un currículum, pero la licencia de entrenador se
          tramita con el título de la federación.
        </p>
        <p>
          Antes de pagar, la comprobación es sencilla: si el curso no lo
          convoca una federación autonómica o la española, y no habla de un
          periodo de prácticas certificado por un club, no es el título que
          necesitas para el banquillo federado.
        </p>

        <h2>¿Y el TAFAD o el grado en CAFyD?</h2>
        <p>
          Son títulos oficiales del sistema educativo y sirven para cosas que
          el federativo no cubre: trabajar en instalaciones, en colegios, en
          escuelas municipales, puntuar en bolsas públicas. Y son, de hecho,
          lo que la ley madrileña pide para ejercer de monitor deportivo en
          iniciación.
        </p>
        <p>
          El voleibol, a diferencia del baloncesto o el fútbol, no tiene
          título oficial de Técnico Deportivo, así que para el banquillo
          federado se sigue necesitando el nivel de la federación. Lo normal
          en quien vive de esto en Madrid es tener las dos cosas: TSEAS o
          CAFyD por un lado,{" "}
          <Link href="/blog/como-ser-entrenador-de-voleibol-madrid">
            nivel 1
          </Link>{" "}
          o 2 por otro.
        </p>
      </Articulo>
    </>
  );
}
