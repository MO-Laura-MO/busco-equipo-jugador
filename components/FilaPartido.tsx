import { MapPin } from "lucide-react";
import { COMPETICIONES, EQUIPOS_MADRID, Partido, nombrePabellon } from "@/lib/partidos";

const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

const MADRID = new Set(EQUIPOS_MADRID);

/**
 * Una fila de partido. La usan el listado de /partidos y la ficha del club.
 * No tiene estado: se pinta igual en el servidor y en el cliente.
 */
export default function FilaPartido({ p }: { p: Partido }) {
  const d = new Date(p.fecha + "T12:00:00");
  const comp = COMPETICIONES.find((c) => c.valor === p.competicion)!;
  const derbi = MADRID.has(p.visitante);

  return (
    <li className="flex gap-3 border-b border-borde-fila px-4 py-3">
      <div className="w-[52px] shrink-0 tabular-nums">
        <div className="text-[15px] font-medium text-tinta">{p.hora}</div>
        <div className="text-[12px] text-tinta-3">
          {DIAS[d.getDay()]} {d.getDate()} {MESES[d.getMonth()]}
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[14px] font-medium text-tinta">
          {p.local}
          <span className="px-1 font-normal text-tinta-3">vs</span>
          {p.visitante}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-tinta-3">
          <span className="rounded-[4px] bg-acento-tinte px-[6px] py-[1px] text-[11px] font-medium text-acento">
            {comp.corta}
            {p.grupo ? ` · grupo ${p.grupo}` : ""}
          </span>
          {derbi && (
            <span className="rounded-[4px] bg-gris-tinte px-[6px] py-[1px] text-[11px] font-medium text-gris-etiqueta">
              Derbi madrileño
            </span>
          )}
          <span>Jornada {p.jornada}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
            {nombrePabellon(p.pabellon)}
          </span>
        </div>
      </div>
    </li>
  );
}
