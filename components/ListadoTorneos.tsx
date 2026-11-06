"use client";

import { useMemo, useState } from "react";
import FilaTorneo from "@/components/FilaTorneo";
import { CATEGORIAS, Categoria } from "@/lib/datos";
import { Torneo, estadoInscripcion } from "@/lib/torneos";

type FiltroEstado = "abierta" | "por-confirmar";

const ESTADOS: { valor: FiltroEstado; etiqueta: string }[] = [
  { valor: "abierta", etiqueta: "Inscripción abierta" },
  { valor: "por-confirmar", etiqueta: "Fechas por confirmar" },
];

function Chip({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12.5px] leading-none whitespace-nowrap ${
        activo
          ? "bg-acento text-white"
          : "border border-borde-control text-tinta-2 hover:border-tinta-3"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Filtros de la página de torneos. Un torneo sin categorías publicadas se
 * muestra con cualquier categoría: puede incluirla y no queremos esconderlo.
 */
export default function ListadoTorneos({ torneos, hoy }: { torneos: Torneo[]; hoy: string }) {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [estado, setEstado] = useState<FiltroEstado | null>(null);

  // Solo se ofrecen las categorías que aparecen en algún torneo.
  const categorias = CATEGORIAS.filter((c) => torneos.some((t) => t.categorias.includes(c.valor)));

  const filtrados = useMemo(
    () =>
      torneos.filter((t) => {
        if (categoria && t.categorias.length > 0 && !t.categorias.includes(categoria)) return false;
        if (estado === "abierta" && estadoInscripcion(t, hoy) !== "abierta") return false;
        if (estado === "por-confirmar" && t.tipoFecha !== "mes") return false;
        return true;
      }),
    [torneos, categoria, estado, hoy]
  );

  const hayFiltro = categoria !== null || estado !== null;

  return (
    <section>
      <div className="space-y-2 border-t border-borde py-3">
        <div className="sin-scrollbar flex gap-2 overflow-x-auto px-4">
          {categorias.map((c) => (
            <Chip
              key={c.valor}
              activo={categoria === c.valor}
              onClick={() => setCategoria(categoria === c.valor ? null : c.valor)}
            >
              {c.etiqueta}
            </Chip>
          ))}
        </div>
        <div className="sin-scrollbar flex gap-2 overflow-x-auto px-4">
          {ESTADOS.map((e) => (
            <Chip
              key={e.valor}
              activo={estado === e.valor}
              onClick={() => setEstado(estado === e.valor ? null : e.valor)}
            >
              {e.etiqueta}
            </Chip>
          ))}
        </div>
      </div>

      <h2 className="flex items-center justify-between border-t border-borde bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
        <span>
          {filtrados.length === 1 ? "1 torneo próximo" : `${filtrados.length} torneos próximos`}
        </span>
        {hayFiltro && (
          <button
            type="button"
            onClick={() => {
              setCategoria(null);
              setEstado(null);
            }}
            className="text-acento underline underline-offset-2"
          >
            Quitar filtros
          </button>
        )}
      </h2>
      {filtrados.length === 0 ? (
        <p className="px-4 py-6 text-[13px] text-tinta-2">
          No hay torneos con estos filtros por ahora. Iremos añadiendo más a lo largo de la temporada.
        </p>
      ) : (
        <ul>
          {filtrados.map((t) => (
            <FilaTorneo key={t.id} t={t} hoy={hoy} />
          ))}
        </ul>
      )}
    </section>
  );
}
