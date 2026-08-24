import Link from "next/link";
import Image from "next/image";
import { CalendarClock, ChevronRight, MapPin, RefreshCw } from "lucide-react";
import {
  Convocatoria,
  etiquetaCategoria,
  etiquetaSexo,
  etiquetasConvocatoria,
  partesFecha,
  textoAnios,
} from "@/lib/datos";
import EtiquetaEstado from "./EtiquetaEstado";
import InsigniaVerificado from "./InsigniaVerificado";

interface Props {
  convocatoria: Convocatoria;
  nombreClub: string;
  municipio: string;
  /** Ruta del escudo del club, solo si lo ha mandado él. Sin escudo, no se pinta nada. */
  logoClub?: string;
  /** Si es false, la fila no enlaza a la ficha (se usa dentro de la propia ficha). */
  enlazar?: boolean;
}

function ColumnaFecha({ c }: { c: Convocatoria }) {
  const { diaSemana, dia, mes } = partesFecha(c);

  if (c.tipoFecha === "abierta") {
    return (
      <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
        <RefreshCw size={17} className="mt-[10px] text-acento" strokeWidth={1.75} />
      </div>
    );
  }

  if (c.tipoFecha === "mes") {
    return (
      <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
        <span className="text-[11px] uppercase leading-[1.4] text-tinta-3">{mes}</span>
        <CalendarClock size={17} className="mt-[4px] text-tinta-3" strokeWidth={1.75} />
      </div>
    );
  }

  if (c.tipoFecha === "por-confirmar") {
    return (
      <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
        <CalendarClock size={17} className="mt-[10px] text-tinta-3" strokeWidth={1.75} />
      </div>
    );
  }

  return (
    <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
      <span className="text-[11px] uppercase leading-[1.4] text-tinta-3">{diaSemana}</span>
      <span className="text-[22px] font-medium leading-[1.15] text-tinta">{dia}</span>
      <span className="text-[11px] leading-[1.4] text-tinta-3">{mes}</span>
    </div>
  );
}

export default function FilaConvocatoria({
  convocatoria: c,
  nombreClub,
  municipio,
  logoClub,
  enlazar = true,
}: Props) {
  const etiquetas = etiquetasConvocatoria(c).filter((e) => e !== "verificado");
  const anios = textoAnios(c);
  const linea2 = [
    `${etiquetaCategoria(c.categoria)} ${etiquetaSexo(c.sexo).toLowerCase()}`,
    c.nivel || null,
  ]
    .filter(Boolean)
    .join(" · ");

  const lugar = [c.pabellon, municipio].filter(Boolean).join(" · ");

  const contenido = (
    <div className="flex gap-3 px-4 py-[14px]">
      <ColumnaFecha c={c} />
      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-[5px] text-[15px] font-medium leading-snug text-tinta">
          {logoClub && (
            <Image
              src={logoClub}
              alt=""
              width={26}
              height={26}
              className="h-[26px] w-[26px] shrink-0 rounded-full border border-borde-fila bg-white object-contain p-[2px]"
            />
          )}
          <span className="truncate">{nombreClub}</span>
          {c.origen === "club" && <InsigniaVerificado />}
        </h3>
        <p className="mt-[2px] text-[13.5px] leading-snug text-tinta-2">{linea2}</p>
        {anios && (
          <p className="mt-[2px] text-[12.5px] leading-snug text-tinta-2">{anios}</p>
        )}
        {lugar && (
          <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
            <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
            <span className="truncate">{lugar}</span>
          </p>
        )}
        {etiquetas.length > 0 && (
          <div className="mt-[7px] flex flex-wrap gap-[6px]">
            {etiquetas.map((e) => (
              <EtiquetaEstado key={e} estado={e} />
            ))}
          </div>
        )}
        {enlazar && (
          <span className="mt-[10px] inline-flex items-center gap-[4px] rounded-[6px] bg-acento px-3 py-[7px] text-[12.5px] font-medium text-white">
            Ver contacto
            <ChevronRight size={13} strokeWidth={2} />
          </span>
        )}
      </div>
    </div>
  );

  if (!enlazar) {
    return <div className="border-b border-borde-fila last:border-b-0">{contenido}</div>;
  }

  return (
    <Link
      href={`/clubes/${c.clubId}`}
      data-umami-event="fila-convocatoria"
      data-umami-event-club={c.clubId}
      className="block border-b border-borde-fila last:border-b-0 hover:bg-barra/60"
    >
      {contenido}
    </Link>
  );
}
