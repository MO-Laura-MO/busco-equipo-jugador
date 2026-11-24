import Image from "next/image";
import Link from "next/link";
import { Clock, ExternalLink, Mail, MapPin, Users } from "lucide-react";
import { Campus, TEMPORADAS, columnaFechaCampus, rangoCampus } from "@/lib/campus";

export default function FilaCampus({
  c,
  pasado = false,
  logo,
  mostrarOrganizador = true,
}: {
  c: Campus;
  pasado?: boolean;
  /** Escudo del club organizador, solo si tiene perfil verificado con escudo. */
  logo?: string;
  /** En la ficha del propio club sobra decir quién organiza. */
  mostrarOrganizador?: boolean;
}) {
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
          <h3
            className={`flex items-center gap-[6px] text-[15px] font-medium leading-snug ${
              pasado ? "text-tinta-2" : "text-tinta"
            }`}
          >
            {logo && (
              <Image
                src={logo}
                alt=""
                width={26}
                height={26}
                className="h-[26px] w-[26px] shrink-0 rounded-full border border-borde-fila bg-white object-contain p-[2px]"
              />
            )}
            <span>{c.nombre}</span>
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
          {mostrarOrganizador && (
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
          )}
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

