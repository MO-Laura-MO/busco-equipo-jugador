import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ExternalLink, Info, Mail, MapPin, Users } from "lucide-react";
import Actualizado from "@/components/Actualizado";
import { EMAIL_CORRECCIONES } from "@/lib/config";
import {
  Campus,
  TEMPORADAS,
  columnaFechaCampus,
  rangoCampus,
  separarCampus,
  ultimaActualizacionCampus,
} from "@/lib/campus";

export const metadata: Metadata = {
  title: { absolute: "Campus de voleibol: Navidad, Semana Santa y verano" },
  description:
    "Campus de voleibol para chicos y chicas en Madrid y en el resto de España: fechas, edades, horario, lugar y cómo inscribirse.",
  alternates: { canonical: "/campus" },
};

// Los campus pasan a "ya celebrados" solos cuando acaba el último día.
export const revalidate = 3600;

function FilaCampus({ c, pasado = false }: { c: Campus; pasado?: boolean }) {
  const col = columnaFechaCampus(c);
  const lugar = [c.pabellon, c.municipio, c.provincia !== c.municipio && c.provincia !== "Madrid" ? c.provincia : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="border-b border-borde-fila last:border-b-0">
      <div className="flex gap-3 px-4 py-[14px]">
        <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
          <span className="text-[22px] font-medium leading-[1.15] text-tinta">{col.dia}</span>
          <span className="text-[11px] leading-[1.4] text-tinta-3">{col.mes}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`text-[15px] font-medium leading-snug ${pasado ? "text-tinta-2" : "text-tinta"}`}>
            {c.nombre}
          </h3>
          <p className="mt-[2px] text-[13.5px] leading-snug text-tinta-2">{c.dias ?? rangoCampus(c)}</p>
          <p className="mt-[2px] text-[12.5px] leading-snug text-tinta-2">{c.edades}</p>
          <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
            <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
            <span>{lugar}</span>
          </p>
          {c.horario && (
            <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
              <Clock size={13} strokeWidth={1.75} className="shrink-0" />
              <span>{c.horario}</span>
            </p>
          )}
          <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
            <Users size={13} strokeWidth={1.75} className="shrink-0" />
            <span>
              Organiza:{" "}
              {c.clubId ? (
                <Link href={`/clubes/${c.clubId}`} className="text-acento underline underline-offset-2">
                  {c.organizador}
                </Link>
              ) : (
                c.organizador
              )}
            </span>
          </p>
          {!pasado && (
            <>
              <p className="mt-[6px] text-[12.5px] leading-relaxed text-tinta-2">
                {c.precioOrientativo
                  ? `Precio orientativo: ${c.precioOrientativo}`
                  : "Consulta el precio con el organizador."}
              </p>
              {c.inscripcion && (
                <p className="mt-[4px] text-[12.5px] leading-relaxed text-tinta-2">{c.inscripcion}</p>
              )}
              {c.notas && <p className="mt-[4px] text-[12.5px] leading-relaxed text-tinta-3">{c.notas}</p>}
              <div className="mt-[7px] flex flex-wrap gap-[6px]">
                <span className="inline-block rounded-[5px] bg-gris-tinte px-[8px] py-[3px] text-[11.5px] leading-[1.3] text-gris-etiqueta">
                  {TEMPORADAS[c.temporada]}
                </span>
              </div>
              <div className="mt-[10px] flex flex-wrap gap-2">
                {c.web && (
                  <a
                    href={c.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[5px] rounded-[6px] bg-acento px-3 py-[7px] text-[12.5px] font-medium text-white"
                  >
                    Información del campus
                    <ExternalLink size={13} strokeWidth={2} />
                  </a>
                )}
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex items-center gap-[5px] rounded-[6px] border border-acento/40 px-3 py-[7px] text-[12.5px] text-acento"
                  >
                    <Mail size={13} strokeWidth={2} />
                    Escribir
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

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
              <FilaCampus key={c.id} c={c} />
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
              <FilaCampus key={c.id} c={c} pasado />
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
