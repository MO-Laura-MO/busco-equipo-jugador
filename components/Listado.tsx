"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import {
  CATEGORIAS,
  Categoria,
  Club,
  Convocatoria,
  SEXOS,
  Sexo,
  ZONAS,
  Zona,
  mesesDisponibles,
  normalizar,
  ordenarConvocatorias,
  temporadasDisponibles,
} from "@/lib/datos";
import FilaConvocatoria from "./FilaConvocatoria";

interface Props {
  clubes: Club[];
  convocatorias: Convocatoria[];
}

type Filtro = "categoria" | "sexo" | "zona" | "mes" | "temporada";

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

export default function Listado({ clubes, convocatorias }: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [sexo, setSexo] = useState<Sexo | null>(null);
  const [zona, setZona] = useState<Zona | null>(null);
  const [mes, setMes] = useState<string | null>(null);
  const [temporada, setTemporada] = useState<string | null>(null);
  const [desplegado, setDesplegado] = useState<Filtro | null>(null);
  const [orden, setOrden] = useState<"asc" | "desc">("asc");

  const meses = useMemo(() => mesesDisponibles(convocatorias), [convocatorias]);
  const temporadas = useMemo(
    () => temporadasDisponibles(convocatorias),
    [convocatorias]
  );
  // El filtro de temporada solo aparece cuando conviven varias temporadas.
  const filtros: Filtro[] = temporadas.length > 1
    ? ["categoria", "sexo", "zona", "mes", "temporada"]
    : ["categoria", "sexo", "zona", "mes"];
  const clubesPorId = useMemo(
    () => new Map(clubes.map((c) => [c.id, c])),
    [clubes]
  );

  const filtradas = useMemo(() => {
    const q = normalizar(busqueda.trim());
    const lista = convocatorias.filter((c) => {
      const club = clubesPorId.get(c.clubId);
      if (!club) return false;
      if (categoria && c.categoria !== categoria) return false;
      if (sexo && c.sexo !== sexo) return false;
      if (zona && club.zona !== zona) return false;
      if (temporada && c.temporada !== temporada) return false;
      if (mes) {
        const suMes =
          c.tipoFecha === "exacta"
            ? c.fecha.slice(0, 7)
            : c.tipoFecha === "mes"
              ? c.mesAprox
              : null;
        // Las de inscripción abierta encajan en cualquier mes.
        if (suMes !== null && suMes !== mes) return false;
      }
      if (q) {
        const texto = normalizar(`${club.nombre} ${club.municipio}`);
        if (!texto.includes(q)) return false;
      }
      return true;
    });
    return ordenarConvocatorias(lista, orden);
  }, [busqueda, categoria, sexo, zona, mes, temporada, orden, convocatorias, clubesPorId]);

  const alternarDesplegable = (f: Filtro) =>
    setDesplegado((actual) => (actual === f ? null : f));

  const hayFiltros =
    busqueda.trim() !== "" ||
    categoria !== null ||
    sexo !== null ||
    zona !== null ||
    mes !== null ||
    temporada !== null;

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoria(null);
    setSexo(null);
    setZona(null);
    setMes(null);
    setTemporada(null);
    setDesplegado(null);
  };

  const opciones: Record<
    Filtro,
    { valor: string; etiqueta: string; activo: boolean; elegir: () => void }[]
  > = {
    categoria: CATEGORIAS.map((c) => ({
      valor: c.valor,
      etiqueta: c.etiqueta,
      activo: categoria === c.valor,
      elegir: () => setCategoria(categoria === c.valor ? null : c.valor),
    })),
    sexo: SEXOS.map((s) => ({
      valor: s.valor,
      etiqueta: s.etiqueta,
      activo: sexo === s.valor,
      elegir: () => setSexo(sexo === s.valor ? null : s.valor),
    })),
    zona: ZONAS.map((z) => ({
      valor: z.valor,
      etiqueta: z.etiqueta,
      activo: zona === z.valor,
      elegir: () => setZona(zona === z.valor ? null : z.valor),
    })),
    mes: meses.map((m) => ({
      valor: m.valor,
      etiqueta: m.etiqueta,
      activo: mes === m.valor,
      elegir: () => setMes(mes === m.valor ? null : m.valor),
    })),
    temporada: temporadas.map((t) => ({
      valor: t.valor,
      etiqueta: t.etiqueta,
      activo: temporada === t.valor,
      elegir: () => setTemporada(temporada === t.valor ? null : t.valor),
    })),
  };

  const etiquetaChip: Record<Filtro, string> = {
    categoria:
      CATEGORIAS.find((c) => c.valor === categoria)?.etiqueta ?? "Categoría",
    sexo: SEXOS.find((s) => s.valor === sexo)?.etiqueta ?? "Sexo",
    zona: zona
      ? `Zona ${ZONAS.find((z) => z.valor === zona)?.etiqueta.toLowerCase()}`
      : "Zona",
    mes: meses.find((m) => m.valor === mes)?.etiqueta ?? "Mes",
    temporada: temporada ?? "Temporada",
  };

  const activoChip: Record<Filtro, boolean> = {
    categoria: categoria !== null,
    sexo: sexo !== null,
    zona: zona !== null,
    mes: mes !== null,
    temporada: temporada !== null,
  };

  // Sin convocatorias cargadas (lanzamiento): mensaje con enlace al directorio.
  const sinDatos = convocatorias.length === 0;
  if (sinDatos) {
    return (
      <div className="border-t border-borde px-4 py-10 text-center">
        <p className="text-[13.5px] leading-relaxed text-tinta-2">
          Estamos recopilando las convocatorias de la temporada 2026-27 y
          aparecerán aquí muy pronto. Mientras tanto, ya puedes explorar los{" "}
          <a
            href="/clubes"
            className="text-acento underline underline-offset-2 decoration-acento/40 hover:decoration-acento"
          >
            {clubes.length > 0 ? `${clubes.length} clubes` : "clubes"} de Madrid
          </a>{" "}
          y contactar con ellos.
        </p>
        <p className="mt-3 text-[13.5px] text-tinta-2">
          ¿Eres un club?{" "}
          <a
            href="/alta"
            className="text-acento underline underline-offset-2 decoration-acento/40 hover:decoration-acento"
          >
            Publica tus pruebas gratis
          </a>
          .
        </p>
      </div>
    );
  }

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
          {filtros.map((f) => (
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
      <div className="flex items-center justify-between bg-barra px-4 py-[9px]">
        <span className="flex items-center gap-3 text-[12.5px] text-tinta-2">
          {filtradas.length} {filtradas.length === 1 ? "convocatoria" : "convocatorias"}
          {hayFiltros && (
            <button
              type="button"
              onClick={limpiarFiltros}
              className="flex items-center gap-[3px] font-medium text-acento hover:underline"
            >
              <X size={13} strokeWidth={2} />
              Quitar filtros
            </button>
          )}
        </span>
        <button
          type="button"
          onClick={() => setOrden(orden === "asc" ? "desc" : "asc")}
          className="flex items-center gap-1 text-[12.5px] text-tinta-2 hover:text-tinta"
        >
          Por fecha
          {orden === "asc" ? (
            <ArrowDown size={13} strokeWidth={1.75} />
          ) : (
            <ArrowUp size={13} strokeWidth={1.75} />
          )}
        </button>
      </div>

      {filtradas.length > 0 ? (
        <ul>
          {filtradas.map((c, i) => {
            const club = clubesPorId.get(c.clubId)!;
            return (
              <li key={`${c.clubId}-${c.categoria}-${c.sexo}-${i}`}>
                <FilaConvocatoria
                  convocatoria={c}
                  nombreClub={club.nombre}
                  municipio={club.municipio}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-4 py-10 text-center text-[13.5px] text-tinta-3">
          No hay convocatorias con esos filtros.{" "}
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
