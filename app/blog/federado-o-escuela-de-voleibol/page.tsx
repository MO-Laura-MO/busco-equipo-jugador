import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS } from "@/lib/blog";

const ART = ARTICULOS.find((a) => a.slug === "federado-o-escuela-de-voleibol")!;

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
      name: "¿Qué diferencia hay entre una escuela de voleibol y un club federado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La escuela suele entrenar uno o dos días por semana, admite inscripciones durante todo el curso y compite poco o en ligas escolares. El club federado inscribe a sus equipos en la competición de la Federación de Madrid, exige licencia federativa, entrena dos o tres días por semana y juega los fines de semana.",
      },
    },
    {
      "@type": "Question",
      name: "¿Se puede entrar en un club federado a mitad de temporada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende de que quede plaza en la categoría. Los equipos se forman en las pruebas de mayo y junio y en la ventana de septiembre, pero un equipo federado puede seguir dando de alta fichas una vez empezada la liga mientras no se supere el máximo permitido y no se pase el plazo de inscripción de licencias de esa temporada, así que si hay hueco merece la pena preguntar.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hace falta licencia federativa para jugar en una escuela?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. La licencia se necesita para competir en la liga federada, no para entrenar en una escuela deportiva.",
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
      <Articulo titulo={ART.titulo} fecha={ART.fecha}>
        <p>
          Cuando una familia empieza a buscar voleibol en Madrid se encuentra
          con dos cosas que parecen lo mismo y no lo son: los clubes federados
          y las escuelas. Elegir mal no es grave, pero cuesta una temporada, y
          a veces cuesta que un chaval se aburra y lo deje. Esta es la
          diferencia, en corto.
        </p>

        <h2>La escuela deportiva</h2>
        <p>
          Una escuela puede ser una buena forma de empezar y de tener los
          primeros contactos con el deporte. Se suele entrenar uno o dos días
          por semana, se admite gente durante todo el curso, no hace falta
          licencia federativa y se compite poco o nada; cuando se compite es
          en encuentros amistosos o en ligas escolares del propio
          ayuntamiento.
        </p>
        <p>
          Encaja bien si no se ha jugado nunca, si la edad es de{" "}
          <Link href="/blog/categorias-voleibol-por-edad">iniciación</Link> o
          si en casa no se quiere comprometer el fin de semana. También es la
          salida razonable cuando alguien llega en enero y los equipos
          federados están cerrados.
        </p>

        <h2>El club federado</h2>
        <p>
          Un club federado inscribe a sus equipos en la competición de la
          Federación de Madrid. Eso significa licencia federativa, dos o tres
          entrenamientos por semana y partidos los fines de semana, con
          desplazamientos por la comunidad. El nivel de exigencia es mayor y
          el compromiso también: un equipo cuenta con sus jugadoras y
          jugadores todas las jornadas.
        </p>
        <p>
          La entrada natural es por{" "}
          <Link href="/blog/cuando-son-las-pruebas-de-voleibol-madrid">
            las pruebas
          </Link>
          , que se concentran al final de la temporada anterior, en mayo y
          junio, y en una segunda ventana a finales de agosto y en septiembre.
        </p>

        <h2>Cómo decidir</h2>
        <p>
          La pregunta no es cuál es mejor, sino qué toca ahora. Tres
          situaciones frecuentes:
        </p>
        <p>
          Nunca ha jugado y tiene diez años. Aquí caben las dos opciones y
          depende sobre todo de las ganas y del tiempo que haya en casa. Si lo
          que apetece es probar sin comprometer los fines de semana, la
          escuela va perfecta. Si le pica la competición y puede entrenar dos
          o tres días, un{" "}
          <Link href="/blog/categorias-voleibol-por-edad">alevín</Link>{" "}
          federado es un sitio estupendo para aprender, porque se entrena más
          horas y se juega todas las semanas. Muchos clubes tienen las dos
          cosas bajo el mismo techo, así que pregunta por las dos.
        </p>
        <p>
          Juega en el colegio, se le da bien y quiere competir. Club federado.
          En el colegio va a tocar el balón dos horas a la semana y eso se le
          queda corto enseguida.
        </p>
        <p>
          Tiene quince años, no ha jugado nunca y quiere probar. Aquí depende
          del club. Algunos tienen grupo de iniciación en categorías mayores y
          otros no. Merece la pena preguntar directamente, porque en cadete y
          juvenil hay clubes que buscan gente alta aunque venga sin técnica.
        </p>

        <h2>Qué preguntar antes de decir que sí</h2>
        <p>
          Da igual la opción, estas cuatro preguntas ahorran disgustos en
          noviembre:
        </p>
        <p>
          Cuántos días se entrena y a qué hora. Con instituto de por medio, el
          horario decide más que el nivel.
        </p>
        <p>
          Qué incluye la cuota. La licencia y la equipación suelen ir aparte,
          y conviene saberlo antes.
        </p>
        <p>
          Si hay competición los fines de semana y si hay desplazamientos
          largos.
        </p>
        <p>
          Si hay más de un equipo por categoría. Cuando hay equipos en
          diferentes divisiones, un jugador que empieza tiene sitio donde
          crecer sin quedarse fuera.
        </p>
        <p>
          Y si vais a ir a una prueba, aquí contamos{" "}
          <Link href="/blog/como-es-una-prueba-de-voleibol">
            cómo es y qué llevar
          </Link>
          .
        </p>

        <h2>Y después</h2>
        <p>
          En <Link href="/">nuestra web voley.app</Link> cada convocatoria
          indica si es de club federado o de escuela, y puedes filtrar por
          categoría, sexo, zona y mes. El contacto de cada club está en su
          ficha: no hay intermediarios, se escribe directamente. La vamos
          actualizando conforme los clubes nos pasan sus convocatorias.
        </p>
        <p>
          Si estás empezando de cero con todo esto, la{" "}
          <Link href="/blog/como-apuntar-a-tu-hijo-a-voleibol-en-madrid">
            guía de cómo apuntar a tu hijo o hija
          </Link>{" "}
          va paso a paso.
        </p>
      </Articulo>
    </>
  );
}
