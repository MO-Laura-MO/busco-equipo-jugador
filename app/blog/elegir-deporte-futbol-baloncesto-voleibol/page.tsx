import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS, etiquetaDe } from "@/lib/blog";

const ART = ARTICULOS.find(
  (a) => a.slug === "elegir-deporte-futbol-baloncesto-voleibol"
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
      name: "¿A qué edad se puede empezar a jugar al voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En la mayoría de los clubes y escuelas de Madrid se empieza entre los seis y los ocho años, en grupos de iniciación y minivoley, y en algunos clubes incluso antes. La categoría benjamín de la temporada 2026-27 corresponde a nacidos en 2017 y 2018.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué deporte elegir para un niño o una niña de diez años?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No hay uno mejor en abstracto. Lo que más decide si alguien sigue practicando deporte al cabo de unos meses es el horario de los entrenamientos, la distancia hasta la instalación y el coste real de la temporada. Después vienen las diferencias propias de cada deporte, como el contacto físico, el ritmo de juego o si se juega en pista cubierta.",
      },
    },
    {
      "@type": "Question",
      name: "¿El voleibol es un deporte de contacto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Los dos equipos están separados por la red y no hay contacto entre rivales, a diferencia del fútbol o el baloncesto.",
      },
    },
    {
      "@type": "Question",
      name: "¿Es tarde para empezar a jugar al voleibol a los 14 años?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Muchos jugadores y jugadoras llegan al voleibol en cadete o juvenil desde otros deportes. La técnica de los primeros meses exige paciencia, pero la base física y de juego colectivo que traen se aprovecha desde el principio.",
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
          En septiembre, en muchas casas de Madrid, se abre la misma
          conversación: hay que apuntar a alguien a algo. Y la pregunta que se
          hace en voz alta, cuál es el mejor deporte, no tiene respuesta. La
          que sí la tiene es otra: cuál encaja con esta persona, en esta casa
          y en este curso.
        </p>

        <h2>Antes de escoger deporte, tres cosas a tener en cuenta</h2>
        <p>Suenan poco épicas y pesan mucho.</p>
        <p>
          <strong>A qué hora se entrena y cuántos días.</strong> Con el
          colegio o el instituto de por medio, es importante tener en cuenta
          los horarios de entrenamiento y de estudio, y ver si encajan con el
          resto de la semana.
        </p>
        <p>
          <strong>Cuánto se tarda en llegar.</strong> Van a ser dos o tres
          viajes por semana durante nueve meses, más los partidos del fin de
          semana. Veinte minutos de más es algo importante a tener en cuenta.
        </p>
        <p>
          <strong>Qué cuesta la temporada entera.</strong> La cuota mensual no
          es todo. Hay licencia federativa, equipación y, según el deporte,
          material propio que hay que comprar y reponer. En voleibol, basta
          con zapatillas de interior y rodilleras, porque los balones y las
          redes los pone el club. Pregunta siempre qué está incluido y qué se
          paga aparte.
        </p>

        <h2>Lo que diferencia al voleibol del fútbol y el baloncesto</h2>
        <p>
          <strong>No hay contacto con el rival.</strong> Hay una red en medio
          y los dos equipos juegan en campos separados. No existe el cuerpo a
          cuerpo ni la falta que te tira al suelo. Para mucha gente esto es
          determinante, y para otra es justamente lo que echa de menos, que
          también es una razón válida para elegir otra cosa.
        </p>
        <p>
          <strong>Todo el mundo pasa por todos los sitios.</strong> La
          rotación es obligatoria: cada jugadora y cada jugador va cambiando
          de posición y a todos les toca sacar. Y como el balón vuelve del
          otro campo sin avisar, puede caer en cualquiera en cualquier
          momento. No hay forma de esconderse en una esquina ni de acaparar el
          juego, ni siquiera queriendo.
        </p>
        <p>
          <strong>Una jugada son tres toques.</strong> El equipo tiene tres
          toques antes de devolver el balón, así que casi ninguna jugada se
          resuelve sola: hay que pasarse el balón entre varios para construir
          el ataque. Eso hace que todos tengan oportunidad de participar en el
          punto.
        </p>
        <p>
          <strong>El error no se queda pegado.</strong> El voleibol es un
          deporte de errores, y eso no es un defecto, es su ritmo: cada punto
          termina y a los pocos segundos empieza otro limpio. Se falla, se
          aprende y se sigue jugando, sin cargar con el fallo durante media
          hora como puede pasar en deportes de juego continuo. En edades de
          formación eso vale mucho.
        </p>
        <p>
          <strong>Se juega en pabellón.</strong> En enero, con lluvia y con
          quien acompaña esperando fuera, esto no es un detalle menor.
        </p>

        <h2>Lo que el voleibol no te va a dar</h2>
        <p>Por honestidad, porque esto casi nunca se cuenta.</p>
        <p>
          <strong>Al principio cuesta más entrar en el juego.</strong> En
          fútbol o en baloncesto alguien que empieza puede correr, defender y
          participar desde el primer día aunque no tenga técnica. En voleibol,
          hasta que el toque de dedos y la recepción salen mínimamente, el
          juego se corta a menudo. Ahora bien, eso no significa entrenamientos
          aburridos, más bien al contrario: los entrenamientos de iniciación
          son muy dinámicos, con juegos, circuitos y mucho trabajo de
          coordinación desde el primer día, y el aprendizaje suele ir rápido
          precisamente porque se repite mucho en poco tiempo.
        </p>
        <p>
          <strong>Hay menos equipos masculinos.</strong> Siete de cada diez
          licencias de voleibol en España son femeninas, así que en algunas
          categorías encontrar{" "}
          <Link href="/blog/voleibol-masculino-madrid">equipo de chicos</Link>{" "}
          cuesta más y a veces obliga a mirar en el municipio de al lado. La
          contrapartida es real y conviene saberla: los clubes que sí tienen
          equipo masculino están deseando completarlo, así que a un chico que
          llega con ganas casi siempre le hacen sitio. En las categorías
          femeninas pasa lo contrario: hay mucho donde elegir, y por eso en
          algunos clubes grandes las plazas están más disputadas.
        </p>
        <p>
          <strong>Se ve menos por la tele</strong>, lo que significa menos
          referentes a mano y menos conversación en el patio. Está cambiando,
          pero es así.
        </p>

        <h2>Una ventaja que casi nadie cuenta: ver voleibol en directo</h2>
        <p>
          Aquí el voleibol gana de calle. Ir a ver un partido de Superliga o
          de Superliga 2, masculina o femenina, es mucho más accesible y mucho
          más barato que un partido de fútbol o de baloncesto de máximo nivel.
          Se entra sin odiseas, se ve el juego de cerca de verdad y el
          ambiente es familiar.
        </p>
        <p>
          Y hay algo que engancha más que cualquier charla: al acabar, los
          jugadores y las jugadoras se quedan. Hacerse una foto con ellos, que
          te firmen el balón o preguntarles algo es normal y pasa todos los
          fines de semana. Para una niña o un niño que empieza, ver de cerca a
          alguien que juega en la máxima categoría y que además le dedica dos
          minutos vale más que diez vídeos.
        </p>

        <h2>Cómo probar sin comprometerse a nada</h2>
        <p>Lo mejor de esta época del año es que probar no obliga a nada.</p>
        <p>
          Las{" "}
          <Link href="/blog/federado-o-escuela-de-voleibol">
            escuelas deportivas
          </Link>{" "}
          admiten gente durante todo el curso, entrenan uno o dos días por
          semana y no exigen licencia ni competición. Es la vía natural para
          ver si engancha.
        </p>
        <p>
          Los clubes federados hacen pruebas abiertas, sobre todo{" "}
          <Link href="/blog/cuando-son-las-pruebas-de-voleibol-madrid">
            en mayo y junio y en una segunda ventana a finales de agosto y en
            septiembre
          </Link>
          .{" "}
          <Link href="/blog/como-es-una-prueba-de-voleibol">
            Ir a una prueba
          </Link>{" "}
          no compromete: es un entrenamiento donde el club conoce a los que
          llegan nuevos.
        </p>
        <p>
          Y no hace falta elegir para toda la vida. Mucha gente que hoy juega
          al voleibol llegó a los trece o catorce años desde otro deporte, y
          esa base de coordinación y de vida de equipo no se pierde por el
          camino.
        </p>
        <p>
          Si no sabes{" "}
          <Link href="/blog/categorias-voleibol-por-edad">
            qué categoría le toca
          </Link>
          , va por año de nacimiento y no por curso escolar.
        </p>

        <h2>Si os decidís por el voleibol</h2>
        <p>
          En <Link href="/pruebas">nuestra web voley.app</Link> están las pruebas y
          captaciones de los clubes y escuelas de la Comunidad de Madrid, con
          categoría, sexo, zona, fecha, pabellón y el contacto directo de cada
          club. Es gratis, no hay que registrarse y se habla directamente con
          el club, sin intermediarios.
        </p>
        <p>
          La vamos actualizando conforme los clubes nos pasan sus
          convocatorias, así que si hoy no encuentras la de tu categoría,
          vuelve en unos días o suscríbete al{" "}
          <a
            href="https://whatsapp.com/channel/0029Vb8BzKk4tRrsGOYbUR04"
            target="_blank"
            rel="noopener noreferrer"
          >
            canal de WhatsApp
          </a>{" "}
          para que te avisemos.
        </p>
        <p>
          Y si acabáis en fútbol o en baloncesto, también está bien. Lo
          importante es que dentro de tres meses siga yendo con ganas.
        </p>
      </Articulo>
    </>
  );
}
