import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS } from "@/lib/blog";

const ART = ARTICULOS.find((a) => a.slug === "voleibol-masculino-madrid")!;

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
      name: "¿Hay equipos de voleibol masculino en Madrid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. En España hay más de 35.000 licencias masculinas de voleibol y en Madrid existen equipos de chicos en todas las categorías, aunque están más repartidos entre clubes y se anuncian menos que los femeninos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Se puede empezar a jugar al voleibol a los 15 años siendo chico?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Hay clubes madrileños que tienen dificultades para completar los equipos cadete y juvenil masculinos, así que es una edad razonable para empezar aunque no se haya jugado nunca. Eso sí, el nivel de algunos grupos ya es alto, así que puede hacer falta probar en más de un club.",
      },
    },
    {
      "@type": "Question",
      name: "¿Los equipos de voleibol base son mixtos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En las categorías de iniciación, benjamín y alevín, es frecuente que los grupos sean mixtos. A partir de infantil lo habitual es que se separen en femenino y masculino.",
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
          En España actualmente hay unas 121.000 licencias de voleibol y
          85.657 son de mujeres. Siete de cada diez. Ese dato explica muchas
          cosas, entre ellas por qué un padre que busca dónde puede jugar su
          hijo se encuentra con webs de clubes donde solo aparecen equipos
          femeninos, y acaba pensando que el voleibol masculino no existe.
        </p>
        <p>
          Existe. Son más de treinta y cinco mil licencias en el país, y en
          Madrid hay equipos de chicos en{" "}
          <Link href="/blog/categorias-voleibol-por-edad">
            todas las categorías
          </Link>
          . Lo que pasa es que están más repartidos y se anuncian peor.
        </p>

        <h2>Por qué cuesta encontrarlos</h2>
        <p>
          Un club con cinco equipos femeninos y uno masculino comunica sobre
          todo lo primero. No es mala intención, es aritmética: la mayoría de
          sus familias son de niñas. El equipo masculino existe, entrena y
          compite, pero aparece en un párrafo perdido de la web o directamente
          no aparece.
        </p>
        <p>
          A eso se suma que en las categorías de iniciación muchos grupos son
          mixtos, así que un club puede tener chicos jugando sin tener un
          equipo llamado "masculino" en ninguna parte.
        </p>

        <h2>El nivel está, y la competición también</h2>
        <p>
          Que haya menos equipos no significa que se juegue peor. La
          Federación de Madrid organiza competición masculina con primera y
          segunda división en casi todas las categorías desde infantil hacia
          arriba, así que un chico que entra en un club federado compite todo
          el año contra equipos de su nivel, con clasificación, jornadas y
          fase final. No es un torneo de relleno: es una liga de verdad, y hay
          equipos muy buenos.
        </p>
        <p>
          Y por si alguien piensa que el voleibol masculino español juega en
          otra liga: en la temporada 2025-26, el CV Guaguas se metió entre los
          ocho mejores equipos de Europa en la Champions League masculina. Eso
          es lo que hay arriba del todo del camino que empieza en un infantil
          de Madrid.
        </p>
        <p>
          Hay además una segunda vía que casi nadie cuenta: las competiciones
          de <Link href="/blog/federado-o-escuela-de-voleibol">escuelas</Link>
          , que también tienen categorías masculinas. Para quien prefiere
          jugar y competir sin meterse en el ritmo del federado, con menos
          entrenamientos y menos desplazamientos, es una opción muy razonable.
        </p>

        <h2>Dónde mirar</h2>
        <p>Tres sitios, en este orden.</p>
        <p>
          El <Link href="/pruebas">buscador de nuestra web voley.app</Link>,
          filtrando por masculino y también por mixto. En las categorías
          inferiores sobre todo, merece la pena explorar también la opción de
          equipo mixto.
        </p>
        <p>
          La <Link href="/clubes">ficha del club</Link>, aunque su
          convocatoria diga femenino. Muchos clubes que convocan chicas
          también tienen grupo de chicos y no lo han publicado.
        </p>
        <p>
          El mensaje directo. Escribir o llamar a cinco clubes de tu zona
          preguntando si tienen equipo masculino de la categoría que sea es
          media hora de trabajo y suele dar más resultado que cualquier
          búsqueda.
        </p>
        <p>
          Y una cosa sobre el mapa: la oferta masculina no está repartida por
          igual por la Comunidad. En algunas zonas, y el sur es un buen
          ejemplo, hay bastante más donde elegir que en otras. Antes de dar
          por hecho que en tu municipio no hay nada, mira también los
          municipios de al lado con el buscador filtrado por masculino.
        </p>

        <h2>Qué preguntar</h2>
        <p>
          Si el club tiene un solo equipo masculino por categoría, conviene
          saber cuánta gente hay. Un grupo de ocho jugadores es frágil: si
          tres lo dejan, el equipo desaparece a mitad de temporada. No es para
          descartar al club, es para saber dónde te metes. Los equipos
          federados pueden tener hasta 14 fichas por equipo, por lo que se
          suele poder encontrar un hueco. Es verdad que en categorías
          superiores, sobre todo si el equipo es federado, puede ser más
          complicado conseguir plaza y el nivel de juego puede orientar la
          balanza.
        </p>
        <p>
          Pregunta también si el equipo masculino entrena con el femenino de
          la misma edad. Es habitual en clubes pequeños, en equipos que no
          están federados, funciona bien y no tiene nada de malo, pero mejor
          saberlo antes.
        </p>

        <h2>Si tienes trece o catorce y no has jugado nunca</h2>
        <p>
          Es una edad estupenda para entrar. En infantil y en los primeros
          años de cadete los grupos todavía se están formando, hay clubes que
          buscan gente para completar equipo y la técnica se aprende desde
          cero sin que nadie te mire raro.
        </p>
        <p>
          Con quince o dieciséis también se puede, pero conviene saber cómo
          está el patio: en cadete y juvenil hay equipos con jugadores que
          llevan cinco años entrenando, y el nivel de algunos grupos es alto.
          No es imposible, ni mucho menos, pero puede que el primer club al
          que escribas no tenga sitio y haya que probar en dos o tres. Merece
          la pena preguntar en clubes que tengan más de un equipo por
          categoría o grupo de iniciación.
        </p>
        <p>
          En cualquier caso, lo que funciona es escribir al club y contarlo
          tal cual: año de nacimiento, si se ha jugado antes a algo, y las
          ganas de probar. Aquí puedes ver{" "}
          <Link href="/blog/como-es-una-prueba-de-voleibol">
            cómo es una prueba
          </Link>{" "}
          para llegar sabiendo qué te vas a encontrar.
        </p>

        <h2>En resumen</h2>
        <p>
          El voleibol masculino en Madrid está, pero hay que buscarlo con más
          paciencia. En <Link href="/">nuestra web voley.app</Link> aparece
          con la misma etiqueta y el mismo tamaño que el femenino, que es
          justo la razón por la que existe esta web. La vamos actualizando
          conforme los clubes nos pasan sus convocatorias.
        </p>
      </Articulo>
    </>
  );
}
