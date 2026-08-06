import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS } from "@/lib/blog";

const ART = ARTICULOS.find((a) => a.slug === "categorias-voleibol-por-edad")!;

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
      name: "¿Qué categoría de voleibol le corresponde a mi hijo en la temporada 2026-27?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En la temporada 2026-27: benjamín para nacidos en 2017-2018, alevín para 2015-2016, infantil para 2013-2014, cadete para 2011-2012 y juvenil para 2009-2010. Después vienen júnior, sénior y máster. La categoría va por año de nacimiento, no por curso escolar.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puede un jugador jugar en una categoría superior a la suya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, la normativa federativa permite jugar en categorías superiores a la que corresponde por edad (con autorizaciones en algunos casos). Lo que no se permite es jugar en categorías inferiores.",
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
          La primera duda de toda familia que llega al voleibol: ¿qué es
          "alevín"? ¿qué es "cadete"? ¿dónde encaja mi hijo o mi hija? La
          respuesta corta: las categorías van por <strong>año de
          nacimiento</strong> — no por curso escolar — y cambian cada
          temporada. Esta es la tabla de la temporada 2026-27.
        </p>

        <h2>Tabla de categorías 2026-27</h2>
        <table>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Año de nacimiento</th>
              <th>Edad aproximada</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Benjamín</td><td>2017-2018</td><td>8-9 años</td></tr>
            <tr><td>Alevín</td><td>2015-2016</td><td>10-11 años</td></tr>
            <tr><td>Infantil</td><td>2013-2014</td><td>12-13 años</td></tr>
            <tr><td>Cadete</td><td>2011-2012</td><td>14-15 años</td></tr>
            <tr><td>Juvenil</td><td>2009-2010</td><td>16-17 años</td></tr>
            <tr><td>Júnior</td><td>según normativa anual</td><td>18-20 años</td></tr>
            <tr><td>Sénior</td><td>sin límite superior</td><td>desde ~18 años</td></tr>
            <tr><td>Máster / veteranos</td><td>según competición</td><td>+30/35 años</td></tr>
          </tbody>
        </table>

        <h2>Cómo leer la tabla</h2>
        <p>
          Cada categoría abarca dos años de nacimiento, y la temporada
          deportiva (de septiembre a junio) manda sobre el año natural: un
          niño nacido en diciembre de 2014 juega toda la temporada 2026-27
          como infantil aunque cumpla años a mitad de curso. Cuando la
          temporada cambie, la tabla se desplaza un año — por eso conviene
          comprobarla cada septiembre.
        </p>

        <h2>¿Se puede jugar "hacia arriba"?</h2>
        <p>
          Sí. La normativa permite que un jugador compita en categorías
          superiores a la suya (una infantil puede jugar con cadetes, por
          ejemplo), algo habitual en clubes con pocos efectivos o con
          jugadoras destacadas. Lo que no se permite es jugar en categorías
          inferiores a la que corresponde por edad.
        </p>

        <h2>¿Y antes de benjamín, o si nunca ha jugado?</h2>
        <p>
          Muchas escuelas y clubes tienen grupos de iniciación o "minivoley"
          para los más pequeños, a menudo mixtos y sin competición federada.
          Si tu peque quiere empezar, no hace falta esperar a ninguna edad:
          pregunta directamente a los clubes de tu zona — puedes encontrarlos,
          con su contacto, en el{" "}
          <Link href="/clubes">directorio de clubes de voley.app</Link>.
        </p>

        <h2>Siguiente paso: encontrar equipo</h2>
        <p>
          Con la categoría clara, toca buscar club con hueco en ella. En{" "}
          <Link href="/">voley.app</Link> publicamos las pruebas y
          captaciones de los clubes de Madrid filtrables por categoría, zona y
          fecha. Y si quieres saber cómo es ese primer día, aquí lo contamos:{" "}
          <Link href="/blog/como-es-una-prueba-de-voleibol">
            cómo es una prueba de voleibol
          </Link>
          .
        </p>

        <div className="aviso">
          Los cortes de edad son los aplicables a la temporada 2026-27 en la
          Comunidad de Madrid y cambian cada temporada. Ante cualquier duda,
          confirma con el club o con la normativa federativa vigente.
        </div>
      </Articulo>
    </>
  );
}
