"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search, X } from "lucide-react";
import { Club, ZONAS, Zona, iniciales, normalizar } from "@/lib/datos";
import InsigniaVerificado from "./InsigniaVerificado";

interface ClubConDatos extends Club {
  numConvocatorias: number;
  /** Vacantes de entrenador abiertas del club. */
  numVacantes: number;
  /** Perfil verificado por el club: es lo que da derecho a enseñar su escudo. */
  verificado: boolean;
}

export default function ListadoClubes({ clubes }: { clubes: ClubConDatos[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [zona, setZona] = useState<Zona | null>(null);
  const [soloConPruebas, setSoloConPruebas] = useState(false);

  const hayPruebas = useMemo(
    () => clubes.some((c) => c.numConvocatorias > 0),
    [clubes]
  );

  const hayFiltros = busqueda.trim() !== "" || zona !== null || soloConPruebas;

  const limpiarFiltros = () => {
    setBusqueda("");
    setZona(null);
    setSoloConPruebas(false);
  };

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda.trim());
    return clubes.filter((c) => {
      if (zona && c.zona !== zona) return false;
      if (soloConPruebas && c.numConvocatorias === 0) return false;
      if (q && !normalizar(`${c.nombre} ${c.municipio}`).includes(q)) return false;
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
            className="w-full bg-transparent text-[16px] text-tinta outline-none placeholder:text-tinta-3"
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
      <div className="flex items-center gap-3 bg-barra px-4 py-[9px]">
        <span className="text-[12.5px] text-tinta-2">
          {filtrados.length} {filtrados.length === 1 ? "club" : "clubes"}
        </span>
        {hayFiltros && (
          <button
            type="button"
            onClick={limpiarFiltros}
            className="flex items-center gap-[3px] text-[12.5px] font-medium text-acento hover:underline"
          >
            <X size={13} strokeWidth={2} />
            Quitar filtros
          </button>
        )}
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
                    {c.logo && c.verificado ? (
                      <img
                        src={c.logo}
                        alt=""
                        className="h-11 w-11 shrink-0 rounded-full border border-borde-fila bg-white object-contain p-[3px]"
                      />
                    ) : (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-acento-tinte text-[14px] font-medium text-acento">
                        {iniciales(c.nombre)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <h2 className="flex items-center gap-[5px] text-[14.5px] font-medium leading-snug text-tinta">
                        <span className="truncate">{c.nombre}</span>
                        {c.verificado && <InsigniaVerificado />}
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
                          {c.numConvocatorias === 1
                            ? "convocatoria jugadores"
                            : "convocatorias jugadores"}
                        </span>
                      )}
                      {c.numVacantes > 0 && (
                        <span className="rounded-[5px] bg-acento-tinte px-[7px] py-[3px] text-[11px] font-medium leading-[1.3] text-acento">
                          {c.numVacantes}{" "}
                          {c.numVacantes === 1 ? "vacante entrenador" : "vacantes entrenador"}
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
          No hay clubes con esos filtros.{" "}
          <button
            type="button"
            onClick={limpiarFiltros}
            className="text-acento underline underline-offset-2 decoration-acento/40 hover:decoration-acento"
          >
            Quitar filtros
          </button>
        </p>
      )}
    </div>
  );
}
