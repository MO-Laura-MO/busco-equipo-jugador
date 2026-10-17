"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import {
  COMPETICIONES,
  Competicion,
  EQUIPOS_MADRID,
  Partido,
  nombrePabellon,
} from "@/lib/partidos";

const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function fecha(iso: string): Date {
  return new Date(iso + "T12:00:00");
}

function hoyLocal(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Sábado del fin de semana al que pertenece una fecha (el domingo cuenta con el sábado anterior). */
function sabadoDe(iso: string): string {
  const d = fecha(iso);
  const dia = d.getDay();
  d.setDate(d.getDate() + (dia === 0 ? -1 : 6 - dia));
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function tituloFinde(sabado: string): string {
  const s = fecha(sabado);
  const d = new Date(s);
  d.setDate(s.getDate() + 1);
  const mesSab = s.getMonth() !== d.getMonth() ? ` ${MESES[s.getMonth()]}` : "";
  return `Fin de semana ${s.getDate()}${mesSab}-${d.getDate()} ${MESES[d.getMonth()]}`;
}

const MADRID = new Set(EQUIPOS_MADRID);

export default function ListadoPartidos({
  partidos,
  hoyServidor,
}: {
  partidos: Partido[];
  hoyServidor: string;
}) {
  // La página es estática: la fecha de la compilación vale para el primer
  // pintado, y en el navegador se sustituye por la de hoy de verdad.
  const [hoy, setHoy] = useState(hoyServidor);
  useEffect(() => setHoy(hoyLocal()), []);

  const [competicion, setCompeticion] = useState<Competicion | null>(null);
  const [equipo, setEquipo] = useState("");
  const [verJugados, setVerJugados] = useState(false);

  const filtrados = useMemo(
    () =>
      partidos.filter(
        (p) =>
          (!competicion || p.competicion === competicion) &&
          (!equipo || p.local === equipo || p.visitante === equipo) &&
          (verJugados || p.fecha >= hoy)
      ),
    [partidos, competicion, equipo, verJugados, hoy]
  );

  const grupos = useMemo(() => {
    const m = new Map<string, Partido[]>();
    for (const p of filtrados) {
      const k = sabadoDe(p.fecha);
      m.set(k, [...(m.get(k) ?? []), p]);
    }
    return Array.from(m.entries());
  }, [filtrados]);

  const esteFinde = sabadoDe(hoy);

  return (
    <div>
      <div className="space-y-3 border-b border-borde pb-3">
        <div className="sin-scrollbar flex gap-2 overflow-x-auto px-4">
          {COMPETICIONES.map((c) => (
            <button
              key={c.valor}
              type="button"
              onClick={() => setCompeticion(competicion === c.valor ? null : c.valor)}
              aria-pressed={competicion === c.valor}
              className={`shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12.5px] leading-none whitespace-nowrap ${
                competicion === c.valor
                  ? "bg-acento text-white"
                  : "border border-borde-control text-tinta-2 hover:border-tinta-3"
              }`}
            >
              {c.etiqueta}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4">
          <select
            id="equipo-partidos"
            value={equipo}
            onChange={(e) => setEquipo(e.target.value)}
            aria-label="Equipo"
            className="max-w-full rounded-[6px] border border-borde-control bg-fondo px-2 py-[6px] text-[16px] text-tinta sm:text-[13px]"
          >
            <option value="">Todos los equipos de Madrid</option>
            {EQUIPOS_MADRID.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-[13px] text-tinta-2">
            <input
              id="ver-jugados"
              type="checkbox"
              checked={verJugados}
              onChange={(e) => setVerJugados(e.target.checked)}
            />
            Ver también los ya jugados
          </label>
        </div>
      </div>

      {grupos.length === 0 ? (
        <p className="px-4 py-6 text-[13px] text-tinta-3">No hay partidos con estos filtros.</p>
      ) : (
        grupos.map(([sabado, lista]) => (
          <section key={sabado}>
            <h2 className="flex flex-wrap items-baseline gap-x-2 border-b border-borde bg-barra px-4 py-2 text-[13px] font-medium text-tinta">
              {tituloFinde(sabado)}
              {sabado === esteFinde && (
                <span className="rounded-[4px] bg-amarillo px-[6px] py-[1px] text-[11px] font-medium text-[#111827]">
                  Este finde
                </span>
              )}
              <span className="text-[12px] font-normal text-tinta-3">
                {lista.length} {lista.length === 1 ? "partido" : "partidos"}
              </span>
            </h2>
            <ul>
              {lista.map((p) => {
                const d = fecha(p.fecha);
                const comp = COMPETICIONES.find((c) => c.valor === p.competicion)!;
                const derbi = MADRID.has(p.visitante);
                return (
                  <li
                    key={`${p.competicion}-${p.grupo ?? ""}-${p.jornada}-${p.local}`}
                    className="flex gap-3 border-b border-borde-fila px-4 py-3"
                  >
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
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
