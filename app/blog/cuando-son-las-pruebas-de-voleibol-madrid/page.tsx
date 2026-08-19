import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS, etiquetaDe } from "@/lib/blog";

const ART = ARTICULOS.find(
  (a) => a.slug === "cuando-son-las-pruebas-de-voleibol-madrid"
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
      name: "¿Cuándo hacen las pruebas los clubes de voleibol en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hay dos ventanas principales. La grande es en mayo y junio, cuando los clubes forman los equipos de la temporada siguiente. La segunda es a finales de agosto y en septiembre, para completar plantillas. Las escuelas deportivas suelen tener inscripción abierta durante todo el curso.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo apuntarme a un club de voleibol en octubre?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En un club federado depende de que quede plaza en la categoría y de que se pueda tramitar la licencia. En una escuela deportiva casi siempre se puede entrar durante el curso.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hay pruebas de voleibol en enero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Algunos clubes hacen captaciones cortas en diciembre y enero cuando les falta gente en alguna categoría, pero no es sistemático ni suele anunciarse con antelación.",
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
          La pregunta llega casi siempre en el mismo momento, a finales de
          agosto, y casi siempre con la misma frase: ¿llego tarde? La
          respuesta corta es que depende de a qué. Estas son las dos ventanas
          reales del voleibol madrileño, y si nunca has ido a una, aquí
          contamos{" "}
          <Link href="/blog/como-es-una-prueba-de-voleibol">
            cómo es una prueba por dentro
          </Link>
          .
        </p>

        <h2>Mayo y junio: la ventana grande</h2>
        <p>
          Es la que casi nadie conoce y la que de verdad importa. Los clubes
          forman los equipos de la temporada siguiente al final de la
          anterior, mientras todavía están entrenando. En mayo y junio hacen
          las pruebas, cierran plantillas y saben en julio con quién cuentan
          en septiembre.
        </p>
        <p>
          Si llegas en esta ventana tienes el mapa entero delante:{" "}
          <Link href="/blog/categorias-voleibol-por-edad">
            todas las categorías
          </Link>
          , todos los niveles y todos los sitios libres.
        </p>

        <h2>Finales de agosto y septiembre: la segunda oportunidad</h2>
        <p>
          En septiembre los clubes vuelven a abrir para completar lo que se ha
          quedado cojo: gente que se ha mudado, que lo ha dejado, que ha
          subido de categoría o equipos nuevos que se montan. Es una ventana
          más pequeña pero muy real, y es donde entra la mayoría de la gente
          que empieza de cero.
        </p>
        <p>
          Aquí el orden importa. Los equipos que ya están completos dejan de
          convocar, así que lo que hay disponible cambia de una semana a otra:
          una convocatoria que estaba abierta el día 1 puede haberse cerrado
          el día 20. Conviene mirar cada pocos días y, sobre todo, escribir en
          cuanto veas algo que encaje.
        </p>

        <h2>Y si llego en octubre, o en enero</h2>
        <p>
          Pasa mucho y no es el final del mundo. Las{" "}
          <Link href="/blog/federado-o-escuela-de-voleibol">
            escuelas deportivas
          </Link>{" "}
          suelen tener inscripción abierta todo el curso, y algunos clubes
          federados admiten a alguien a mitad de temporada si queda plaza en
          su categoría y la licencia se puede tramitar. Merece la pena
          escribir y preguntar, aunque la web del club no diga nada: un equipo
          al que se le lesiona una jugadora en noviembre agradece el mensaje.
        </p>
        <p>
          Lo que no funciona es esperar a que el club publique algo. La
          mayoría no anuncia nada fuera de temporada, y sin embargo contesta
          si le escribes.
        </p>

        <h2>Diciembre y enero: la ventana pequeña</h2>
        <p>
          Algunos clubes hacen una captación corta en el cambio de año, sobre
          todo en categorías donde les falta gente. No es sistemática y casi
          nunca se anuncia con antelación, así que la única forma de enterarse
          es estar suscrito a algo que te avise.
        </p>

        <h2>Cómo enterarte a tiempo</h2>
        <p>
          En <Link href="/pruebas">nuestra web voley.app</Link> puedes filtrar las
          convocatorias por categoría, sexo, zona y mes, y cada ficha lleva el
          contacto directo del club. Las que tienen fecha exacta salen
          primero, después las provisionales, luego las que solo tienen mes y
          al final las de inscripción abierta todo el año. La vamos
          actualizando conforme los clubes nos pasan sus convocatorias.
        </p>
        <p>
          Si prefieres que te avisemos, tenemos un canal de WhatsApp donde
          publicamos cada convocatoria nueva de Madrid en cuanto entra. Es
          solo de avisos: nadie ve tu número y puedes salir cuando quieras.
        </p>
        <p>
          <a
            href="https://whatsapp.com/channel/0029Vb8BzKk4tRrsGOYbUR04"
            target="_blank"
            rel="noopener noreferrer"
          >
            Canal de WhatsApp de voley.app
          </a>
        </p>
        <p>
          Y si es la primera vez que hacéis esto, la{" "}
          <Link href="/blog/como-apuntar-a-tu-hijo-a-voleibol-en-madrid">
            guía de cómo apuntar a tu hijo o hija
          </Link>{" "}
          explica el proceso completo.
        </p>
      </Articulo>
    </>
  );
}
