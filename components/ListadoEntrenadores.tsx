"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  Club,
  TIPOS_ENTIDAD,
  TipoEntidad,
  Vacante,
  ZONAS,
  Zona,
} from "@/lib/datos";
import FilaVacante from "./FilaVacante";

interface Fila {
  vacante: Vacante;
  club: Club;
}

export default function ListadoEntrenadores({ filas }: { filas: Fila[] }) {
  const [zona, setZona] = useState<Zona | null>(null);
  const [tipo, setTipo] = useState<TipoEntidad | null>(null);

  const hayFiltros = zona !== null || tipo !== null;

  const limpiarFiltros = () => {
    setZona(null);
    setTipo(null);
  };

  const filtradas = useMemo(() => {
    return filas.filter(({ vacante, club }) => {
      if (zona && club.zona !== zona) return false;
      if (tipo && !vacante.tipoEntidad.includes(tipo)) return false;
      return true;
    });
  }, [filas, zona, tipo]);

  return (
    <div>
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
        </div>
        <div className="sin-scrollbar mt-2 flex gap-2 overflow-x-auto px-4">
          {TIPOS_ENTIDAD.map((t) => (
            <button
              key={t.valor}
              type="button"
              onClick={() => setTipo(tipo === t.valor ? null : t.valor)}
              className={`shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12.5px] leading-none whitespace-nowrap ${
                tipo === t.valor
                  ? "bg-acento text-white"
                  : "border border-borde-control text-tinta-2 hover:border-tinta-3"
              }`}
            >
              {t.etiqueta}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de resultados */}
      <div className="flex items-center gap-3 bg-barra px-4 py-[9px]">
        <span className="text-[12.5px] text-tinta-2">
          {filtradas.length}{" "}
          {filtradas.length === 1 ? "vacante de entrenador" : "vacantes de entrenador"}
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
      {filtradas.length > 0 ? (
        <ul>
          {filtradas.map(({ vacante, club }, i) => (
            <li key={`${vacante.clubId}-${vacante.puesto}-${i}`}>
              <FilaVacante vacante={vacante} club={club} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-10 text-center text-[13.5px] text-tinta-3">
          No hay vacantes con esos filtros.{" "}
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
