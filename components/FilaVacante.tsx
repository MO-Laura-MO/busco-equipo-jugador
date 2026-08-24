import Link from "next/link";
import Image from "next/image";
import { ChevronRight, MapPin, Users } from "lucide-react";
import {
  Club,
  Puesto,
  Vacante,
  ZONAS,
  etiquetaCategoria,
  etiquetaCompensacion,
  etiquetaSexo,
  tituloVacante,
} from "@/lib/datos";
import EtiquetaEstado from "./EtiquetaEstado";
import InsigniaVerificado from "./InsigniaVerificado";

interface Props {
  vacante: Vacante;
  club: Club;
  /** Si es false, no repite el nombre/municipio/zona del club (se usa dentro de su propia ficha). */
  mostrarClub?: boolean;
  /** Si es false, la fila no enlaza a la ficha (se usa dentro de la propia ficha). */
  enlazar?: boolean;
}

const ETIQUETAS_PUESTO: Record<Puesto, string> = {
  entrenador: "Entrenador/a",
  "segundo-entrenador": "Segundo entrenador/a",
  ayudante: "Ayudante",
  monitor: "Monitor/a",
  coordinador: "Coordinador/a",
  "preparador-fisico": "Preparador/a física",
};

export default function FilaVacante({
  vacante: v,
  club,
  mostrarClub = true,
  enlazar = true,
}: Props) {
  const compensacion = etiquetaCompensacion(v.compensacion);
  const diasHorario = [v.dias, v.horario].filter(Boolean).join(" · ");
  const zona = ZONAS.find((z) => z.valor === club.zona)?.etiqueta.toLowerCase() ?? club.zona;
  const logoClub = club.logo && v.origen === "club" ? club.logo : undefined;

  const equipo = [
    v.categoria
      ? `${etiquetaCategoria(v.categoria)}${v.sexo ? ` ${etiquetaSexo(v.sexo).toLowerCase()}` : ""}`
      : null,
    v.nivel || null,
  ]
    .filter(Boolean)
    .join(" · ");

  const contenido = mostrarClub ? (
    <div className="flex gap-3 px-4 py-[14px]">
      <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
        {logoClub ? (
          <Image
            src={logoClub}
            alt=""
            width={32}
            height={32}
            className="mt-[4px] h-8 w-8 rounded-full border border-borde-fila bg-white object-contain p-[3px]"
          />
        ) : (
          <Users size={17} className="mt-[8px] text-acento" strokeWidth={1.75} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-[5px] text-[15px] font-medium leading-snug text-tinta">
          <span className="truncate">{club.nombre}</span>
          {v.origen === "club" && <InsigniaVerificado />}
        </h3>
        {equipo && (
          <p className="mt-[2px] text-[13.5px] leading-snug text-tinta-2">{equipo}</p>
        )}
        {v.puesto !== "entrenador" && (
          <p className="mt-[2px] text-[12.5px] leading-snug text-tinta-2">
            {ETIQUETAS_PUESTO[v.puesto]}
          </p>
        )}
        {v.titulacion && (
          <p className="mt-[2px] text-[12.5px] leading-snug text-tinta-2">
            Titulación: {v.titulacion}
          </p>
        )}
        <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
          <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
          <span className="truncate">
            {club.municipio} · zona {zona}
          </span>
        </p>
        <div className="mt-[7px] flex flex-wrap gap-[6px]">
          {v.tipoEntidad.map((t) => (
            <EtiquetaEstado key={t} estado={t} />
          ))}
          {compensacion && (
            <span className="inline-block rounded-[5px] bg-gris-tinte px-[8px] py-[3px] text-[11.5px] leading-[1.3] text-gris-etiqueta">
              {compensacion}
            </span>
          )}
        </div>
        {enlazar && (
          <span className="mt-[10px] inline-flex items-center gap-[4px] rounded-[6px] bg-acento px-3 py-[7px] text-[12.5px] font-medium text-white">
            Ver contacto
            <ChevronRight size={13} strokeWidth={2} />
          </span>
        )}
      </div>
    </div>
  ) : (
    <div className="flex gap-3 px-4 py-[14px]">
      <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
        <Users size={17} className="mt-[8px] text-acento" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-medium leading-snug text-tinta">
          {tituloVacante(v)}
        </h3>
        {v.titulacion && (
          <p className="mt-[3px] text-[12.5px] leading-snug text-tinta-2">
            Titulación: {v.titulacion}
          </p>
        )}
        {v.requisitos && (
          <p className="mt-[3px] text-[12.5px] leading-snug text-tinta-2">{v.requisitos}</p>
        )}
        {diasHorario && (
          <p className="mt-[3px] text-[12.5px] text-tinta-3">{diasHorario}</p>
        )}
        {v.pabellon && (
          <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] text-tinta-3">
            <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
            {v.pabellon}
          </p>
        )}
        {v.incorporacion && (
          <p className="mt-[3px] text-[12.5px] text-tinta-3">
            Incorporación: {v.incorporacion}
          </p>
        )}
        {v.notas && (
          <p className="mt-[6px] text-[12.5px] leading-relaxed text-tinta-2">{v.notas}</p>
        )}
        <div className="mt-[7px] flex flex-wrap gap-[6px]">
          {v.origen === "club" && <EtiquetaEstado estado="verificado" />}
          {v.tipoEntidad.map((t) => (
            <EtiquetaEstado key={t} estado={t} />
          ))}
          {compensacion && (
            <span className="inline-block rounded-[5px] bg-gris-tinte px-[8px] py-[3px] text-[11.5px] leading-[1.3] text-gris-etiqueta">
              {compensacion}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (!enlazar) {
    return <div className="border-b border-borde-fila last:border-b-0">{contenido}</div>;
  }

  return (
    <Link
      href={`/clubes/${club.id}`}
      data-umami-event="fila-vacante"
      data-umami-event-club={club.id}
      className="block border-b border-borde-fila last:border-b-0 hover:bg-barra/60"
    >
      {contenido}
    </Link>
  );
}
