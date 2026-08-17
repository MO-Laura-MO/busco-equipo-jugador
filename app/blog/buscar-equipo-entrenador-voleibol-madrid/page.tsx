import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS } from "@/lib/blog";
import { URL_FORMULARIO_ALTA } from "@/lib/config";

const ART = ARTICULOS.find(
  (a) => a.slug === "buscar-equipo-entrenador-voleibol-madrid"
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
      name: "¿Cuándo buscan entrenador los clubes de voleibol en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La mayoría cierra su cuerpo técnico en mayo y junio, al mismo tiempo que las plantillas. La segunda ventana, y la más accesible para alguien de fuera del club, es a finales de agosto y en septiembre, cuando se cubren las bajas de última hora.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo entrenar en un club de voleibol sin experiencia previa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En categorías de base es habitual. Muchos clubes madrileños aceptan a entrenadores sin experiencia como segundos entrenadores o al frente de equipos de iniciación, y tramitan la autorización federativa mientras la persona hace el curso.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde se publican las vacantes de entrenador de voleibol en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No existe un tablón oficial de la federación de voleibol equivalente al de otros deportes. Las vacantes circulan por contacto directo entre clubes; en voley.app publicamos las que nos comunican los clubes de la Comunidad de Madrid.",
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
      <Articulo titulo={ART.titulo} fecha={ART.fecha} etiqueta={ART.etiqueta}>
        <p>
          Si tienes nivel 1 o nivel 2 y quieres banquillo esta temporada, el
          problema no es que no haya sitios. Es que no hay ningún lugar donde
          estén publicados. En baloncesto, la federación madrileña mantiene un
          tablón de equipos que buscan entrenador. En voleibol no existe, y
          las vacantes se mueven por WhatsApp entre gente que ya se conoce.
        </p>
        <p>Esto es lo que sabemos de cómo funciona ese mercado invisible.</p>

        <h2>El calendario real</h2>
        <p>
          <strong>Mayo y junio.</strong> Los clubes cierran plantillas de la
          temporada siguiente y descubren qué entrenadores siguen y cuáles
          no. Es cuando se decide casi todo, y casi nadie lo anuncia.
        </p>
        <p>
          <strong>Finales de agosto y septiembre.</strong> La ventana
          urgente. Un entrenador se cae por trabajo o por mudanza, un club
          monta un equipo nuevo, una categoría se queda sin nadie tres
          semanas antes de empezar la liga. Aquí la disposición a contratar a
          alguien de fuera es máxima, y es el mejor momento para escribir en
          frío.
        </p>
        <p>
          <strong>Enero.</strong> Pequeña y real. Los abandonos de mitad de
          temporada existen también entre entrenadores.
        </p>

        <h2>Qué piden de verdad los clubes</h2>
        <p>
          Por orden de lo que vemos en las convocatorias que publicamos:{" "}
          <Link href="/blog/como-ser-entrenador-de-voleibol-madrid">
            el nivel que exige la categoría
          </Link>
          , disponibilidad en el horario concreto de esa franja (que suele ser
          de 17:30 a 21:30 entre semana y sábado por la mañana) y que vivas
          razonablemente cerca del pabellón. Ese tercer punto pesa más de lo
          que parece: un club de la zona sur descarta antes por distancia que
          por currículum.
        </p>
        <p>
          La experiencia previa se pide en sénior y en los equipos de nivel
          alto. En base, la mayoría de clubes prefiere a alguien con ganas y
          sin título que a nadie, y le tramita la autorización federativa
          mientras se saca el nivel.
        </p>

        <h2>Cómo se escribe un mensaje que se responde</h2>
        <p>
          Corto y con los datos que el club necesita para decidir en diez
          segundos: tu nivel de titulación, qué categorías has entrenado y
          cuántas temporadas, en qué franjas horarias puedes, en qué zona te
          mueves y desde cuándo estás disponible. Sin currículum adjunto en el
          primer mensaje.
        </p>
        <p>
          Escribe a diez clubes, no a dos. Y escribe también a los que no han
          publicado nada: la mayoría de las vacantes de voleibol base en
          Madrid nunca se publican.
        </p>

        <h2>Qué preguntar antes de decir que sí</h2>
        <p>
          Cuántos equipos son y cuántas horas semanales en total, contando
          partidos y desplazamientos.
        </p>
        <p>
          Si hay segundo entrenador, o si el equipo es tuyo solo. En base,
          estar solo con catorce niñas de doce años es una faena, y es
          habitual.
        </p>
        <p>
          En qué compite el equipo: liga federada, Juegos Deportivos
          Municipales o escuela. Cambia el nivel de título que te van a exigir
          y cambia el fin de semana.
        </p>
        <p>
          Quién es el{" "}
          <Link href="/blog/requisitos-entrenar-menores-voleibol">
            delegado de protección
          </Link>{" "}
          y qué protocolo tiene el club, que es una pregunta que además te
          protege a ti.
        </p>
        <p>
          Y si el club te va a apuntar al{" "}
          <Link href="/blog/cursos-entrenador-voleibol-madrid">
            curso del nivel siguiente
          </Link>{" "}
          en caso de que lo necesites. Muchos lo hacen y casi ninguno lo
          ofrece si no se pregunta.
        </p>

        <h2>Dónde mirar</h2>
        <p>
          En voley.app publicamos{" "}
          <Link href="/entrenadores">
            los clubes de la Comunidad de Madrid que buscan entrenador
          </Link>
          , con la categoría, la zona y el contacto directo del club.
        </p>
        <p>
          Si tu club busca a alguien,{" "}
          <a href={URL_FORMULARIO_ALTA} target="_blank" rel="noopener noreferrer">
            mándanos la vacante
          </a>{" "}
          y la publicamos.
        </p>
      </Articulo>
    </>
  );
}
