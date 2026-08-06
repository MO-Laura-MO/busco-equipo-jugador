"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search, Users } from "lucide-react";
import { Club, ZONAS, Zona } from "@/lib/datos";

interface ClubConDatos extends Club {
  numConvocatorias: number;
}

/** Iniciales para el avatar cuando el club no tiene escudo subido. */
function iniciales(nombre: string): string {
  const SIGLAS = new Set([
    "CV", "CDE", "CD", "CDB", "CDV", "AD", "ADV", "ADC", "SAD", "CP", "ABV",
    "C.D.", "C.D.E", "C.D", "CLUB", "DEPORTIVO", "ELEMENTAL", "DE", "DEL",
    "LA", "EL", "LOS", "LAS", "Y",
  ]);
  const palabras = nombre
    .split(/\s+/)
    .filter((p) => !SIGLAS.has(p.toUpperCase().replace(/\.+$/, "")));
  const base = palabras.length > 0 ? palabras : nombre.split(/\s+/);
  return base
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function ListadoClubes({ clubes }: { clubes: ClubConDatos[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [zona, setZona] = useState<Zona | null>(null);
  const [soloConPruebas, setSoloConPruebas] = useState(false);

  const hayPruebas = useMemo(
    () => clubes.some((c) => c.numConvocatorias > 0),
    [clubes]
  );

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return clubes.filter((c) => {
      if (zona && c.zona !== zona) return false;
      if (soloConPruebas && c.numConvocatorias === 0) return false;
      if (q && !`${c.nombre} ${c.municipio}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [busqueda, zona, soloConPruebas, clubes]);

  return (
    <div>
      {/* Búsqueda */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-[8px] border border-borde-control px-3 py-[9px] focus-within:border-tinta-3">
          <Search size={16} strokeWidth={1.75} className="shrink-0 text-tinta-3" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar club o municipio"
            className="w-full bg-transparent text-[14px] text-tinta outline-none placeholder:text-tinta-3"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="border-b border-borde pb-3">
        <div className="sin-scrollbar flex gap-2 overflow-x-auto px-4">
          {ZONAS.map((z) => (
            <button
              key={z.valor}
              type="button"
              onClick={() => setZona(zona === z.valor ? null : z.valor)}
              className={`shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12.5px] leading-none whitespace-nowrap ${
                zona === z.valor
                  ? "bg-acento text-white"
                  : "border border-borde-control text-tinta-2 hover:border-tinta-3"
              }`}
            >
              {z.etiqueta}
            </button>
          ))}
          {hayPruebas && (
            <button
              type="button"
              onClick={() => setSoloConPruebas(!soloConPruebas)}
              className={`shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12.5px] leading-none whitespace-nowrap ${
                soloConPruebas
                  ? "bg-acento text-white"
                  : "border border-borde-control text-tinta-2 hover:border-tinta-3"
              }`}
            >
              Con pruebas publicadas
            </button>
          )}
        </div>
      </div>

      {/* Barra de resultados */}
      <div className="bg-barra px-4 py-[9px]">
        <span className="text-[12.5px] text-tinta-2">
          {filtrados.length} {filtrados.length === 1 ? "club" : "clubes"}
        </span>
      </div>

      {/* Listado */}
      {filtrados.length > 0 ? (
        <ul>
          {filtrados.map((c) => {
            const z =
              ZONAS.find((x) => x.valor === c.zona)?.etiqueta.toLowerCase() ??
              c.zona;
            return (
              <li key={c.id}>
                <Link
                  href={`/clubes/${c.id}`}
                  className="block border-b border-borde-fila hover:bg-barra/60"
                >
                  <div className="flex items-center gap-3 px-4 py-[12px]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-acento-tinte text-[14px] font-medium text-acento">
                      {iniciales(c.nombre)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-[14.5px] font-medium leading-snug text-tinta">
                        {c.nombre}
                      </h2>
                      <p className="mt-[2px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
                        <MapPin size={12} strokeWidth={1.75} className="shrink-0" />
                        <span className="truncate">
                          {c.municipio} · zona {z}
                        </span>
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-[4px]">
                      {c.numConvocatorias > 0 && (
                        <span className="rounded-[5px] bg-amarillo px-[7px] py-[3px] text-[11px] font-medium leading-[1.3] text-[#111827]">
                          {c.numConvocatorias}{" "}
                          {c.numConvocatorias === 1 ? "prueba" : "pruebas"}
                        </span>
                      )}
                      {c.buscaEntrenador && (
                        <span className="flex items-center gap-[4px] rounded-[5px] bg-verificado-tinte px-[7px] py-[3px] text-[11px] leading-[1.3] text-verificado">
                          <Users size={11} strokeWidth={1.75} />
                          entrenador
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-4 py-10 text-center text-[13.5px] text-tinta-3">
          No hay clubes con esos filtros.
        </p>
      )}
    </div>
  );
}
