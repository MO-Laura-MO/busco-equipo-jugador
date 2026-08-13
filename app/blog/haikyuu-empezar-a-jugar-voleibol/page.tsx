import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS } from "@/lib/blog";

const ART = ARTICULOS.find(
  (a) => a.slug === "haikyuu-empezar-a-jugar-voleibol"
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
      name: "¿Se parece Haikyuu al voleibol real?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En lo esencial sí: los tres toques por jugada, la rotación, la importancia del saque y de la recepción y el peso del error dentro del juego. Lo que exagera es el ritmo de aprendizaje, porque gestos como el toque de dedos o el saque en salto tardan meses o años en salir bien.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo empezar a jugar al voleibol a los 14 años sin experiencia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. En el voleibol base se entra sin saber nada y es lo habitual. Muchos jugadores llegan en infantil o cadete desde otros deportes.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hace falta ser alto para jugar al voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No es imprescindible. La altura ayuda, sobre todo cerca de la red, y hay jugadores altos en todas las posiciones, pero el voleibol es un deporte muy técnico y la técnica, la lectura del juego y la rapidez se entrenan. Además, en categorías de formación muchos jugadores todavía están creciendo.",
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
          Te ha pasado lo que a mucha gente este año: terminas un capítulo, te
          levantas del sofá y te sale solo hacer el gesto de dedos contra la
          pared. Y luego viene la pregunta incómoda, que es si eso que has
          visto tiene algo que ver con ir a un pabellón un martes por la
          tarde.
        </p>
        <p>Tiene bastante que ver. No en todo, y por eso vale la pena contarlo.</p>
        <p>
          No eres el único, por cierto. La serie se ha convertido en la puerta
          de entrada al voleibol de un montón de chicos y chicas que nunca se
          habían planteado este deporte, y en los clubes se nota: cada
          temporada llega gente nueva que empezó viendo partidos animados
          antes que reales.
        </p>

        <h2>Lo que Haikyuu cuenta bien</h2>
        <p>
          <strong>Que ninguna jugada la hace uno solo.</strong> Es
          literalmente así. Tu equipo tiene tres toques antes de devolver el
          balón, y lo normal es usarlos: alguien recibe, alguien coloca,
          alguien remata. Por eso en voleibol se habla tanto en pista. Los
          gritos de la serie no son dramatismo, es información.
        </p>
        <p>
          <strong>Que la rotación te obliga a saber de todo.</strong> Todos
          los jugadores van rotando de posición y a casi todos les toca sacar.
          La excepción es el líbero, que aparece a partir de cadete, juega
          solo en defensa y no saca. No existe el sitio donde esconderse ni el
          sitio donde acaparar, así que si eres nuevo vas a tocar balón desde
          el primer día.
        </p>
        <p>
          <strong>Que un equipo pequeño le puede ganar a uno grande.</strong>{" "}
          Pasa. No siempre, pero pasa. En voleibol el saque y la recepción
          deciden partidos enteros, y un equipo ordenado que no regala puntos
          le complica la vida a otro con más talento individual.
        </p>
        <p>
          <strong>Que la altura ayuda pero no lo es todo.</strong> Ayuda,
          sobre todo en la red, y encontrarás jugadores altos en todas las
          posiciones. Pero el voleibol es un deporte muy técnico y la técnica
          se entrena: colocar bien, recibir, leer al rival y moverte a tiempo
          pesan muchísimo. Y en categorías de formación, de benjamín a
          infantil e incluso en cadete, hay mucha gente que todavía no ha
          pegado el estirón, así que la altura del primer día dice poco de
          dónde vas a acabar.
        </p>
        <p>
          <strong>Que el error es parte del juego.</strong> Cada punto acaba
          con un error o con un acierto, y a los pocos segundos empieza otro.
          En un partido de verdad se falla muchísimo. Lo que se entrena es
          seguir después.
        </p>

        <h2>Lo que no es exactamente así</h2>
        <p>
          <strong>La recepción pica al principio.</strong> Los antebrazos se
          ponen rojos y escuecen las primeras semanas, hasta que la técnica
          mejora y el balón deja de caer siempre en el mismo sitio. Se pasa
          antes de lo que parece.
        </p>
        <p>
          <strong>El toque de dedos no sale a la primera.</strong> Ni a la
          segunda. Es un gesto técnico que necesita repetición, y es normal
          tardar semanas en que salga limpio. Si esperas colocar bien el
          primer día, vas a frustrarte por nada.
        </p>
        <p>
          <strong>El saque en salto tarda años, no episodios.</strong> Lo
          primero que aprenderás es un saque de seguridad que entre siempre,
          que es lo que de verdad gana partidos en categorías de formación.
        </p>
        <p>
          <strong>Nadie te va a gritar frases épicas cada punto.</strong> Los
          entrenamientos son repetitivos por diseño: mucho desplazamiento,
          mucho toque, muchos circuitos. Es divertido, pero es entrenamiento,
          no un torneo nacional cada tarde.
        </p>
        <p>
          <strong>Y no hay un rival mítico esperándote.</strong> Hay una liga,
          jornadas, y equipos que a veces te ganan por mucho. Eso también
          engancha, solo que tarda un poco más.
        </p>

        <h2>Vale, ¿y cómo empiezo?</h2>
        <p>
          Lo primero, quitarte dos ideas de la cabeza: que hace falta ser muy
          alto y que hace falta haber jugado antes. Ninguna de las dos es
          verdad. En voleibol base se entra sin saber nada, y de hecho es lo
          normal.
        </p>
        <p>
          Lo segundo, saber en qué categoría te toca. Va por{" "}
          <Link href="/blog/categorias-voleibol-por-edad">
            año de nacimiento
          </Link>
          , no por curso.
        </p>
        <p>
          Lo tercero, entender que{" "}
          <Link href="/blog/federado-o-escuela-de-voleibol">
            hay dos caminos
          </Link>
          : una escuela deportiva, donde se entra durante todo el curso y se
          entrena uno o dos días, o un club federado, con licencia, más
          entrenamientos y liga los fines de semana. Si te ha dado fuerte y
          quieres competir, el segundo. Si quieres probar antes de comprometer
          los fines de semana, el primero.
        </p>
        <p>
          Y lo cuarto, ponerte en contacto con el club. Entra en{" "}
          <Link href="/pruebas">nuestra web voley.app</Link>, filtra por tu
          categoría, tu sexo y tu zona, y escribe o llama al club que te
          encaje. En cada ficha está su email y su teléfono.
        </p>
        <p>
          Aquí te contamos{" "}
          <Link href="/blog/como-es-una-prueba-de-voleibol">
            cómo es una prueba por dentro
          </Link>
          , para que llegues sabiendo lo que va a pasar.
        </p>

        <h2>Si eres chico, algo que juega a tu favor</h2>
        <p>
          Siete de cada diez licencias de voleibol en España son femeninas,
          así que hay menos equipos masculinos y a veces cuesta encontrarlos.
          La cara buena es que los clubes que tienen equipo de chicos suelen
          estar buscando gente para completarlo.
        </p>
        <p>
          Y para que quede claro dónde puede acabar todo esto: en la temporada
          2025-26, el CV Guaguas se metió entre los ocho mejores equipos de
          Europa en la Champions League masculina. Aquí lo contamos con más
          detalle:{" "}
          <Link href="/blog/voleibol-masculino-madrid">
            voleibol masculino en Madrid
          </Link>
          .
        </p>

        <h2>Lo último</h2>
        <p>
          Empezar tarde no es un problema en este deporte. Mucha gente que hoy
          juega en cadete y juvenil llegó a los trece o catorce sin haber
          tocado un balón, desde el baloncesto, desde el atletismo o desde el
          sofá y una serie.
        </p>
        <p>
          Las convocatorias de los clubes de Madrid están en{" "}
          <Link href="/pruebas">voley.app</Link>, y son gratis, sin registro y con el
          contacto directo del club. Lo único que hay que hacer es
          contactarles.
        </p>
      </Articulo>
    </>
  );
}
