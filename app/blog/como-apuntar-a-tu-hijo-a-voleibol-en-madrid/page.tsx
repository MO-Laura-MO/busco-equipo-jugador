import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS } from "@/lib/blog";

const ART = ARTICULOS.find(
  (a) => a.slug === "como-apuntar-a-tu-hijo-a-voleibol-en-madrid"
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
      name: "¿Cuándo se hacen las pruebas de voleibol en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hay dos grandes ventanas. La principal es al final de la temporada, en mayo y junio, cuando los clubes forman los equipos del curso siguiente. La segunda es al arranque, entre finales de agosto y finales de septiembre, para completar plantillas. Además, algunos clubes hacen captaciones en diciembre-enero y muchas escuelas tienen inscripción abierta durante todo el curso.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta jugar en un club de voleibol de Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende del club y de la categoría. Como orientación, las cuotas de los clubes base de Madrid suelen moverse entre 25 y 60 euros al mes, más posibles matrículas, equipación y licencia federativa. Cada club informa de sus cuotas al contactar.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hace falta experiencia para entrar en un club de voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No necesariamente. En las escuelas y en los equipos de iniciación se empieza desde cero, y también hay clubes federados que incorporan jugadores sin experiencia. En los equipos de más nivel sí se valora la experiencia previa, pero muchos clubes tienen varios equipos por categoría con distintos niveles, así que suele haber un hueco adecuado para cada jugador.",
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
          Cada temporada, miles de familias madrileñas buscan dónde puede
          jugar al voleibol su hijo o su hija. Y cada vez más, son los propios
          jugadores y jugadoras adolescentes quienes buscan club por su
          cuenta. La información está repartida entre webs de clubes, cuentas
          de Instagram y el boca a boca, así que aquí va la guía corta y
          práctica, paso a paso.
        </p>

        <h2>1. Averigua qué categoría le corresponde</h2>
        <p>
          Las categorías del voleibol base van por año de nacimiento, no por
          curso escolar. Para la temporada 2026-27: benjamín (2017-2018),
          alevín (2015-2016), infantil (2013-2014), cadete (2011-2012) y
          juvenil (2009-2010). Tienes la tabla completa y las equivalencias en
          nuestra guía de{" "}
          <Link href="/blog/categorias-voleibol-por-edad">
            categorías del voleibol por edad
          </Link>
          .
        </p>

        <h2>2. Decide entre club federado o escuela</h2>
        <p>
          Los{" "}
          <strong>
            <Link href="/blog/federado-o-escuela-de-voleibol">
              clubes federados
            </Link>
          </strong>{" "}
          compiten en las ligas de la Federación Madrileña de Voleibol:
          entrenan dos o tres días por semana y juegan partido casi todos los
          fines de semana. Las <strong>escuelas</strong> (muchas municipales)
          ofrecen grupos por edades, menos exigencia e inscripción abierta
          casi todo el año. Para{" "}
          <Link href="/blog/elegir-deporte-futbol-baloncesto-voleibol">
            quien nunca ha jugado
          </Link>
          , una escuela o los equipos de iniciación de un
          club pueden ser una buena opción, aunque también se puede empezar
          directamente en un club federado: la elección depende sobre todo de
          las ganas de competir. Si ya juega y quiere competición regular, el
          club federado es el camino.
        </p>

        <h2>3. Busca clubes cerca de casa (o donde encajes mejor)</h2>
        <p>
          El voleibol vive de entrenar dos o tres veces por semana, y la
          distancia importa más de lo que parece. En Madrid hay clubes en
          todas las zonas: capital, norte, sur, este y oeste, sierra incluida.
          Dicho esto, también hay familias y jugadores que eligen desplazarse
          un poco más porque un club concreto les encaja mejor por su
          ambiente, su proyecto deportivo o su nivel. Al final no se trata
          solo de cercanía, sino de encontrar el sitio donde estar a gusto, y
          donde el club cumpla{" "}
          <Link href="/blog/requisitos-entrenar-menores-voleibol">
            lo que la ley exige para trabajar con menores
          </Link>
          . En{" "}
          <Link href="/clubes">el directorio de clubes de voley.app</Link>{" "}
          puedes ver los de cada zona con su municipio y su contacto directo.
        </p>

        <h2>4. Localiza sus pruebas o captaciones</h2>
        <p>
          Hay{" "}
          <Link href="/blog/cuando-son-las-pruebas-de-voleibol-madrid">
            dos grandes ventanas de pruebas
          </Link>
          . La principal es al{" "}
          <strong>final de la temporada, en mayo y junio</strong>: es cuando
          los clubes forman los equipos del curso siguiente y se mueven más
          fichas. La segunda es al arranque, entre{" "}
          <strong>finales de agosto y finales de septiembre</strong>, para
          completar las plantillas. Y no te asustes con la palabra "prueba":
          suele ser simplemente un entrenamiento abierto para conocer al grupo
          y organizar los equipos. En <Link href="/pruebas">voley.app</Link> vamos
          publicando las convocatorias de cada club con fecha, pabellón y
          contacto, filtrables por categoría, zona y mes. Te contamos qué
          esperar en{" "}
          <Link href="/blog/como-es-una-prueba-de-voleibol">
            cómo es una prueba de voleibol
          </Link>
          .
        </p>

        <h2>5. Contacta con el club</h2>
        <p>
          Escribe o llama antes de presentarte: confirma día, hora, pabellón y
          si hay que inscribirse previamente. El email y el teléfono de cada
          club están en su ficha del directorio. Pregunta también por las
          cuotas (orientativamente, entre 25 y 60 €/mes en la mayoría de
          clubes base, más equipación y licencia) y los días de entrenamiento.
        </p>

        <h2>6. El primer día</h2>
        <p>
          Ropa deportiva, zapatillas de suela limpia para pabellón, botella de
          agua y, si las tiene, rodilleras. Para quien empieza de cero, los
          entrenadores buscan sobre todo ganas y actitud. Y si ya ha jugado,
          se fijan también en que la técnica sea correcta para el nivel del
          equipo al que aspira. En cualquier caso: cero presión, que de eso ya
          se encarga la emoción del primer día.
        </p>

        <div className="aviso">
          La información de clubes y convocatorias puede cambiar. Confirma
          siempre fecha y lugar con el club antes de acudir.
        </div>
      </Articulo>
    </>
  );
}
