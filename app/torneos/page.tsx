import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import Actualizado from "@/components/Actualizado";
import FilaTorneo from "@/components/FilaTorneo";
import ListadoTorneos from "@/components/ListadoTorneos";
import { EMAIL_CORRECCIONES } from "@/lib/config";
import { separarTorneos, ultimaActualizacionTorneos } from "@/lib/torneos";

export const metadata: Metadata = {
  title: { absolute: "Torneos de voleibol base 2026-27: Copa de España y torneos para clubes" },
  description:
    "Copa de España, MADCUP, ZGZ Volley Cup, Espinho y otros torneos de voleibol base a los que pueden apuntarse los clubes esta temporada: fechas, sedes, categorías e inscripción.",
  alternates: { canonical: "/torneos" },
};

// La etiqueta de inscripción depende del día: se recalcula cada hora.
export const revalidate = 3600;

export default function Torneos() {
  const hoy = new Date().toISOString().slice(0, 10);
  const { proximos, celebrados } = separarTorneos(hoy);

  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Torneos de voleibol base</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-tinta-2">
          Copas y torneos a los que cualquier club puede apuntarse esta temporada, en Madrid,
          en el resto de España y alguno fuera. Los iremos ampliando a medida que se publiquen.
        </p>
        <div className="mt-3 flex items-start gap-[10px] rounded-[8px] bg-ambar-tinte px-3 py-[10px]">
          <Info size={16} strokeWidth={1.75} className="mt-[1px] shrink-0 text-ambar" />
          <p className="text-[12.5px] leading-relaxed text-ambar">
            Información recopilada de fuentes públicas. Confirma siempre fechas, categorías y
            plazos de inscripción en la web del organizador.
          </p>
        </div>
      </header>

      <ListadoTorneos torneos={proximos} hoy={hoy} />

      {celebrados.length > 0 && (
        <section>
          <h2 className="border-t border-borde bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
            Ya celebrados esta temporada
          </h2>
          <ul>
            {celebrados.map((t) => (
              <FilaTorneo key={t.id} t={t} hoy={hoy} celebrado />
            ))}
          </ul>
        </section>
      )}

      <div className="border-t border-borde bg-barra px-4 py-4">
        <p className="text-[13px] leading-relaxed text-tinta-2">
          ¿Organizas un torneo de voleibol base o falta alguno?{" "}
          <a
            href={`mailto:${EMAIL_CORRECCIONES}?subject=Torneo para voley.app`}
            className="text-acento underline underline-offset-2"
          >
            Escríbenos
          </a>{" "}
          y lo añadimos. Para la Copa de España, tienes los detalles en{" "}
          <Link href="/blog/copa-de-espana-voleibol-2026" className="text-acento underline underline-offset-2">
            nuestro artículo
          </Link>
          .
        </p>
      </div>

      <Actualizado fecha={ultimaActualizacionTorneos()} />
      <p className="px-4 pb-3 text-[12.5px] text-tinta-3">
        ¿Hay algún dato incorrecto?{" "}
        <a
          href={`mailto:${EMAIL_CORRECCIONES}?subject=Corrección de datos: Torneos`}
          className="text-acento underline"
        >
          Escríbenos
        </a>
        .
      </p>
    </main>
  );
}
