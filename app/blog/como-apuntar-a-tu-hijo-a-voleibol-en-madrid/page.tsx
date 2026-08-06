import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS } from "@/lib/blog";
import { URL_SITIO } from "@/lib/config";

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
        text: "La mayoría de los clubes de la Comunidad de Madrid hacen sus pruebas y captaciones entre finales de agosto y finales de septiembre, antes del inicio de la liga. Algunos clubes hacen una segunda captación en diciembre-enero y muchas escuelas tienen inscripción abierta durante todo el curso.",
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
        text: "No en las categorías pequeñas ni en las escuelas, donde se empieza desde cero. En categorías mayores (cadete, juvenil) los equipos federados suelen valorar experiencia previa, pero muchos clubes tienen varios equipos por categoría con distintos niveles.",
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
          Cada septiembre, miles de familias madrileñas buscan dónde puede
          jugar al voleibol su hijo o su hija. La información está repartida
          entre webs de clubes, cuentas de Instagram y el boca a boca — así
          que aquí va la guía corta y práctica, paso a paso.
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
          Los <strong>clubes federados</strong> compiten en las ligas de la
          Federación Madrileña de Voleibol: entrenan dos o tres días por
          semana y juegan partido casi todos los fines de semana. Las{" "}
          <strong>escuelas</strong> (muchas municipales) son la puerta de
          entrada ideal para empezar: menos exigencia, inscripción abierta casi
          todo el año y grupos por edades. Si tu peque nunca ha jugado, una
          escuela o los equipos de iniciación de un club son el mejor comienzo;
          si ya juega y quiere competir, busca club federado.
        </p>

        <h2>3. Busca clubes cerca de casa</h2>
        <p>
          El voleibol vive de entrenar dos o tres veces por semana: la
          distancia importa más de lo que parece. En Madrid hay clubes en
          todas las zonas — capital, norte, sur, este y oeste (sierra
          incluida). En{" "}
          <Link href="/clubes">el directorio de clubes de voley.app</Link>{" "}
          puedes ver los de tu zona con su municipio y su contacto directo.
        </p>

        <h2>4. Localiza sus pruebas o captaciones</h2>
        <p>
          La mayoría de los clubes hacen pruebas entre finales de agosto y
          finales de septiembre. No te asustes con la palabra "prueba": en
          categorías pequeñas suele ser simplemente un entrenamiento abierto
          para conocer al grupo y formar equipos. En{" "}
          <Link href="/">voley.app</Link> vamos publicando las convocatorias
          de cada club con fecha, pabellón y contacto, y puedes filtrar por
          categoría, zona y mes. Te contamos qué esperar en{" "}
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
          agua y, si las tiene, rodilleras. Y sobre todo: cero presión. Los
          entrenadores de base buscan ganas y actitud, no acrobacias.
        </p>

        <div className="aviso">
          La información de clubes y convocatorias puede cambiar. Confirma
          siempre fecha y lugar con el club antes de acudir.
        </div>
      </Articulo>
    </>
  );
}
