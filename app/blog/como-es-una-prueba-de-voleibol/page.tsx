import type { Metadata } from "next";
import Link from "next/link";
import Articulo from "@/components/Articulo";
import { ARTICULOS } from "@/lib/blog";

const ART = ARTICULOS.find((a) => a.slug === "como-es-una-prueba-de-voleibol")!;

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
      name: "¿Qué hay que llevar a una prueba de voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ropa deportiva cómoda, zapatillas de pabellón con suela limpia, botella de agua y rodilleras si se tienen. No hace falta balón propio ni equipación del club.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué miran los entrenadores en una prueba de voleibol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende de la edad. En categorías pequeñas: coordinación, actitud y ganas de aprender. En categorías mayores: técnica básica (toque de dedos, antebrazos, saque), desplazamientos, físico y comportamiento con el grupo. La actitud pesa siempre más de lo que las familias creen.",
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
          La palabra "prueba" impone, pero en el voleibol base es mucho menos
          dramática de lo que suena: en la mayoría de los casos es un
          entrenamiento abierto donde el club conoce a los nuevos y organiza
          sus equipos. Esto es lo que puedes esperar, y cómo ir preparado.
        </p>

        <h2>Qué llevar</h2>
        <ul>
          <li>Ropa deportiva cómoda (camiseta y pantalón corto).</li>
          <li>
            Zapatillas de pabellón con suela limpia — muchas instalaciones no
            dejan entrar con el calzado de la calle.
          </li>
          <li>Botella de agua.</li>
          <li>Rodilleras, si ya las tiene (si no, no pasa nada).</li>
          <li>
            Nada más: el balón lo pone el club, y la equipación llega después,
            si hay plaza.
          </li>
        </ul>

        <h2>Cómo suele organizarse</h2>
        <p>
          Lo habitual es una sesión de entre una hora y hora y media:
          calentamiento en grupo, ejercicios básicos por parejas (toque de
          dedos, antebrazos), algo de saque y recepción, y un rato de juego
          real en equipos mezclados. En categorías pequeñas los entrenadores
          plantean juegos; en cadete o juvenil el formato se parece más a un
          entrenamiento normal. Algunos clubes citan a todos los interesados
          un mismo día; otros invitan a entrenar con el grupo durante una
          semana antes de decidir.
        </p>

        <h2>Qué miran los entrenadores (de verdad)</h2>
        <p>
          Menos de lo que las familias temen y otras cosas distintas de las
          que imaginan. En benjamín, alevín e infantil, los entrenadores
          buscan sobre todo <strong>coordinación general, actitud y ganas</strong>:
          a esas edades la técnica se enseña, el entusiasmo no. En cadete y
          juvenil ya se valora la <strong>técnica básica</strong> (toque de
          dedos, antebrazos, saque seguro), los desplazamientos y la altura o
          el salto — pero también cómo escucha, cómo anima y cómo encaja los
          errores. Un consejo honesto: el jugador que va a todas las bolas y
          celebra los puntos de los demás deja mejor impresión que el que
          remata fuerte y protesta.
        </p>

        <h2>¿Y si no hay plaza?</h2>
        <p>
          Los equipos tienen plazas limitadas por categoría, y no entrar en un
          club concreto no significa no poder jugar. Pregunta al entrenador si
          conoce clubes cercanos con hueco en esa categoría (se conocen todos
          entre sí), mira las escuelas municipales de tu zona — inscripción
          abierta casi todo el año — y consulta el{" "}
          <Link href="/clubes">directorio de clubes de voley.app</Link> para
          contactar con otros clubes cercanos.
        </p>

        <h2>Antes de ir: confirma</h2>
        <p>
          Las fechas y pabellones de las pruebas cambian con facilidad.
          Confirma siempre con el club por email o teléfono antes de acudir, y
          pregunta si hace falta inscripción previa. En{" "}
          <Link href="/">voley.app</Link> publicamos las convocatorias con su
          contacto directo y avisamos de si el club pide aviso previo.
        </p>

        <div className="aviso">
          ¿Tu club hace pruebas y no aparece en voley.app?{" "}
          <Link href="/alta">Publícalas gratis aquí</Link>.
        </div>
      </Articulo>
    </>
  );
}
