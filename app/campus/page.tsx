import type { Metadata } from "next";
import { Info } from "lucide-react";
import Actualizado from "@/components/Actualizado";
import FilaCampus from "@/components/FilaCampus";
import { clubPorId } from "@/lib/datos";
import { EMAIL_CORRECCIONES } from "@/lib/config";
import { Campus, separarCampus, ultimaActualizacionCampus } from "@/lib/campus";

/** Escudo del club organizador: solo con perfil verificado y escudo enviado, como en las pruebas. */
function logoDe(c: Campus): string | undefined {
  const club = c.clubId ? clubPorId(c.clubId) : undefined;
  return club?.logo && club.verificado === true ? club.logo : undefined;
}

export const metadata: Metadata = {
  title: { absolute: "Campus de voleibol: Navidad, Semana Santa y verano" },
  description:
    "Campus de voleibol para chicos y chicas en Madrid y en el resto de España: fechas, edades, horario, lugar y cómo inscribirse.",
  alternates: { canonical: "/campus" },
};

// Los campus pasan a "ya celebrados" solos cuando acaba el último día.
export const revalidate = 3600;

export default function PaginaCampus() {
  const hoy = new Date().toISOString().slice(0, 10);
  const { proximos, pasados } = separarCampus(hoy);

  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Campus de voleibol</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-tinta-2">
          Campus de Navidad, Semana Santa y verano para seguir jugando en vacaciones, en Madrid y
          en el resto de España. La inscripción se hace siempre con el organizador.
        </p>
        <div className="mt-3 flex items-start gap-[10px] rounded-[8px] bg-ambar-tinte px-3 py-[10px]">
          <Info size={16} strokeWidth={1.75} className="mt-[1px] shrink-0 text-ambar" />
          <p className="text-[12.5px] leading-relaxed text-ambar">
            Información recopilada de fuentes públicas y de los propios clubes. Confirma siempre
            fechas, precio y plazas con el organizador antes de inscribirte.
          </p>
        </div>
      </header>

      <section>
        <h2 className="border-t border-borde bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
          {proximos.length === 1 ? "1 campus próximo" : `${proximos.length} campus próximos`}
        </h2>
        {proximos.length === 0 ? (
          <p className="px-4 py-6 text-[13px] text-tinta-2">
            Ahora mismo no hay campus publicados. Los iremos añadiendo en cuanto salgan.
          </p>
        ) : (
          <ul>
            {proximos.map((c) => (
              <FilaCampus key={c.id} c={c} logo={logoDe(c)} />
            ))}
          </ul>
        )}
      </section>

      {pasados.length > 0 && (
        <section>
          <h2 className="border-t border-borde bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
            Ya celebrados
          </h2>
          <ul>
            {pasados.map((c) => (
              <FilaCampus key={c.id} c={c} pasado logo={logoDe(c)} />
            ))}
          </ul>
        </section>
      )}

      <div className="border-t border-borde bg-barra px-4 py-4">
        <p className="text-[13px] leading-relaxed text-tinta-2">
          ¿Tu club organiza un campus?{" "}
          <a
            href={`mailto:${EMAIL_CORRECCIONES}?subject=Campus para voley.app`}
            className="text-acento underline underline-offset-2"
          >
            Escríbenos
          </a>{" "}
          y lo publicamos gratis.
        </p>
      </div>

      <Actualizado fecha={ultimaActualizacionCampus()} />
      <p className="px-4 pb-3 text-[12.5px] text-tinta-3">
        ¿Hay algún dato incorrecto?{" "}
        <a
          href={`mailto:${EMAIL_CORRECCIONES}?subject=Corrección de datos: Campus`}
          className="text-acento underline"
        >
          Escríbenos
        </a>
        .
      </p>
    </main>
  );
}
