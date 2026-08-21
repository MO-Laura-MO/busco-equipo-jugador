"use client";

import { useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  Club,
  TIPOS_ENTIDAD,
  TipoEntidad,
  Vacante,
  ZONAS,
  Zona,
  etiquetaTipoEntidad,
} from "@/lib/datos";
import FilaVacante from "./FilaVacante";

interface Fila {
  vacante: Vacante;
  club: Club;
}

type Filtro = "zona" | "tipo";

function Chip({
  activo,
  conChevron,
  abierto,
  onClick,
  children,
}: {
  activo?: boolean;
  conChevron?: boolean;
  abierto?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={conChevron ? abierto : undefined}
      className={`flex shrink-0 items-center gap-[3px] rounded-[6px] px-[10px] py-[5px] text-[12.5px] leading-none whitespace-nowrap ${
        activo
          ? "bg-acento text-white"
          : "border border-borde-control text-tinta-2 hover:border-tinta-3"
      }`}
    >
      {children}
      {conChevron && (
        <ChevronDown
          size={13}
          strokeWidth={1.75}
          className={abierto ? "rotate-180" : ""}
        />
      )}
    </button>
  );
}

export default function ListadoEntrenadores({ filas }: { filas: Fila[] }) {
  const [zona, setZona] = useState<Zona | null>(null);
  const [tipo, setTipo] = useState<TipoEntidad | null>(null);
  const [desplegado, setDesplegado] = useState<Filtro | null>(null);

  const hayFiltros = zona !== null || tipo !== null;

  const limpiarFiltros = () => {
    setZona(null);
    setTipo(null);
    setDesplegado(null);
  };

  const alternarDesplegable = (f: Filtro) =>
    setDesplegado((actual) => (actual === f ? null : f));

  const filtradas = useMemo(() => {
    return filas.filter(({ vacante, club }) => {
      if (zona && club.zona !== zona) return false;
      if (tipo && !vacante.tipoEntidad.includes(tipo)) return false;
      return true;
    });
  }, [filas, zona, tipo]);

  const opciones: Record<
    Filtro,
    { valor: string; etiqueta: string; activo: boolean; elegir: () => void }[]
  > = {
    zona: ZONAS.map((z) => ({
      valor: z.valor,
      etiqueta: z.etiqueta,
      activo: zona === z.valor,
      elegir: () => setZona(zona === z.valor ? null : z.valor),
    })),
    tipo: TIPOS_ENTIDAD.map((t) => ({
      valor: t.valor,
      etiqueta: t.etiqueta,
      activo: tipo === t.valor,
      elegir: () => setTipo(tipo === t.valor ? null : t.valor),
    })),
  };

  const etiquetaChip: Record<Filtro, string> = {
    zona: zona
      ? `Zona ${ZONAS.find((z) => z.valor === zona)?.etiqueta.toLowerCase()}`
      : "Zona",
    tipo: tipo ? etiquetaTipoEntidad(tipo) : "Tipo de liga",
  };

  const activoChip: Record<Filtro, boolean> = {
    zona: zona !== null,
    tipo: tipo !== null,
  };

  return (
    <div>
      {/* Filtros */}
      <div className="border-b border-borde pb-3">
        <div className="sin-scrollbar flex gap-2 overflow-x-auto px-4">
          {(["zona", "tipo"] as Filtro[]).map((f) => (
            <Chip
              key={f}
              activo={activoChip[f]}
              conChevron
              abierto={desplegado === f}
              onClick={() => alternarDesplegable(f)}
            >
              {etiquetaChip[f]}
            </Chip>
          ))}
        </div>
        {desplegado && (
          <div className="sin-scrollbar mt-2 flex gap-2 overflow-x-auto px-4">
            {opciones[desplegado].map((o) => (
              <Chip
                key={o.valor}
                activo={o.activo}
                onClick={() => {
                  o.elegir();
                  setDesplegado(null);
                }}
              >
                {o.etiqueta}
              </Chip>
            ))}
          </div>
        )}
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
