import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS, etiquetaDe } from "@/lib/blog";

const ART = ARTICULOS.find((a) => a.slug === "copa-de-espana-voleibol-2026")!;

export const metadata: Metadata = {
  title: ART.titulo,
  description: ART.descripcion,
};

const URL_RFEVB_COPAS = "https://esvoley.es/voleibol/competiciones-de-menores/copas-de-espana";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuándo es la Copa de España de voleibol 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Del 27 al 30 de diciembre de 2026, en tres sedes a la vez: Valladolid, Almería y Guadalajara.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué categorías juegan en cada sede de la Copa de España?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Valladolid acoge benjamín, alevín e infantil; Almería, cadete; y Guadalajara, juvenil, júnior, sénior y máster. Todas en femenino y masculino.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hasta cuándo se puede inscribir un equipo en la Copa de España 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hasta el 10 de noviembre de 2026 en las tres sedes. La inscripción la hace el club, no el jugador, y las plazas se adjudican por orden de inscripción.",
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
          Entre Navidad y Nochevieja, miles de jugadores de voleibol base de toda España se van
          de torneo. Es la Copa de España que organiza la Real Federación Española de Voleibol,
          y este año se juega del 27 al 30 de diciembre en tres sedes a la vez.
        </p>
        <p>
          No es un campeonato al que se llegue por clasificación: es un torneo al que se apunta
          el club que quiere ir, y para muchos equipos es el viaje más esperado de la temporada.
        </p>

        <h2>Qué categoría juega en cada sede</h2>
        <p>
          El reparto es el mismo que el año pasado. Todas las categorías tienen competición
          femenina y masculina.
        </p>
        <ul>
          <li>
            <strong>Valladolid:</strong> benjamín, alevín e infantil.
          </li>
          <li>
            <strong>Almería:</strong> cadete. Los partidos se reparten entre Almería, Roquetas de
            Mar y Aguadulce.
          </li>
          <li>
            <strong>Guadalajara:</strong> juvenil, júnior, sénior y máster, con pabellones en
            Guadalajara y en el Corredor del Henares, incluido Alcalá de Henares.
          </li>
        </ul>

        <h2>Quién se puede apuntar y hasta cuándo</h2>
        <p>
          La inscripción la hace siempre el club, nunca el jugador por su cuenta. Los clubes
          federados se inscriben desde la intranet de la federación española y los que no están
          federados, mediante un formulario. Es decir, también pueden ir equipos que no juegan en
          liga federada.
        </p>
        <p>
          <strong>El plazo termina el 10 de noviembre de 2026 en las tres sedes.</strong> Las
          plazas son limitadas y se adjudican por orden de inscripción, así que cuando una
          categoría se llena, se cierra aunque quede plazo.
        </p>

        <h2>Si tu hijo o hija juega en un club</h2>
        <p>
          Lo normal es que sea el club quien proponga ir y organice el viaje: alojamiento,
          transporte y quién acompaña al equipo. Si te interesa y nadie lo ha mencionado,
          pregúntalo al entrenador cuanto antes, porque con el plazo de inscripción tan cerca
          la decisión ya está tomada o a punto de tomarse.
        </p>
        <p>
          Y pregunta también qué incluye el precio. La cuota que cobra el club a cada familia
          puede variar mucho según se viaje en autobús, se duerma en hotel o en un pabellón, o
          se coma por libre.
        </p>

        <h2>Dónde está toda la información</h2>
        <p>
          La normativa, la lista de pabellones y el acceso a la inscripción están en la{" "}
          <a href={URL_RFEVB_COPAS} target="_blank" rel="noopener noreferrer">
            página de las Copas de España de la RFEVB
          </a>
          . Confirma ahí cualquier dato antes de organizar nada.
        </p>
        <p>
          Y si buscas más torneos para tu equipo a lo largo de la temporada, los estamos
          reuniendo en nuestra nueva <Link href="/torneos">sección de torneos</Link>, con fechas,
          sedes y categorías.
        </p>
      </Articulo>
    </>
  );
}
