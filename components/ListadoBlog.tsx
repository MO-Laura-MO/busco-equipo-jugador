"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Volleyball } from "lucide-react";
import { Articulo, PUBLICOS, Publico, etiquetaPublico } from "@/lib/blog";
import { fechaLarga } from "@/lib/datos";

/**
 * Índice del blog con filtro por público. Sin filtro seleccionado se ven
 * todos los artículos: el chip acota, nunca esconde nada de partida.
 */
export default function ListadoBlog({ articulos }: { articulos: Articulo[] }) {
  const [publico, setPublico] = useState<Publico | null>(null);

  const filtrados = useMemo(
    () => (publico ? articulos.filter((a) => a.publico.includes(publico)) : articulos),
    [publico, articulos]
  );

  return (
    <div>
      {/* Filtros por público */}
      <div className="border-b border-borde pb-3">
        <div className="sin-scrollbar flex gap-2 overflow-x-auto px-4">
          {PUBLICOS.map((p) => (
            <button
              key={p.valor}
              type="button"
              onClick={() => setPublico(publico === p.valor ? null : p.valor)}
              aria-pressed={publico === p.valor}
              className={`shrink-0 rounded-[6px] px-[10px] py-[5px] text-[12.5px] leading-none whitespace-nowrap ${
                publico === p.valor
                  ? "bg-acento text-white"
                  : "border border-borde-control text-tinta-2 hover:border-tinta-3"
              }`}
            >
              {p.chip}
            </button>
          ))}
        </div>
      </div>

      <p className="bg-acento-tinte px-4 py-[9px] text-[12.5px] text-tinta-2">
        {filtrados.length === 1 ? "1 artículo" : `${filtrados.length} artículos`}
        {publico
          ? ` para ${PUBLICOS.find((p) => p.valor === publico)!.chip.toLowerCase()}`
          : ""}
      </p>

      <ul className="space-y-4 px-4 py-4">
        {filtrados.map((a, i) => {
          const azul = i % 2 === 0;
          return (
            <li key={a.slug}>
              <Link
                href={`/blog/${a.slug}`}
                className="block overflow-hidden rounded-[12px] border border-borde-fila shadow-[0_1px_3px_rgba(17,24,39,0.09)]"
              >
                <div
                  className={`relative overflow-hidden px-4 pb-5 pt-4 ${
                    azul ? "bg-acento" : "bg-amarillo"
                  }`}
                >
                  <Volleyball
                    size={110}
                    strokeWidth={1.2}
                    className={`absolute -right-5 -top-5 ${
                      azul ? "text-white/10" : "text-acento/15"
                    }`}
                  />
                  <p
                    className={`relative text-[11px] font-medium uppercase tracking-[0.18em] ${
                      azul ? "text-amarillo" : "text-acento"
                    }`}
                  >
                    {etiquetaPublico(a.publico[0])}
                  </p>
                  <h2
                    className={`relative mt-2 max-w-[520px] text-[17px] font-medium leading-snug ${
                      azul ? "text-white" : "text-[#111827]"
                    }`}
                  >
                    {a.titulo}
                  </h2>
                </div>
                <div className="bg-fondo px-4 py-3">
                  <p className="text-[13px] leading-snug text-tinta-2">
                    {a.descripcion}
                  </p>
                  <p className="mt-[6px] text-[12px] text-tinta-3">
                    {fechaLarga(a.fecha)} ·{" "}
                    {a.minutos === 1 ? "leer en 1 min" : `leer en ${a.minutos} min`}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
