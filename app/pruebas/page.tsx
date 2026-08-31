import type { Metadata } from "next";
import Link from "next/link";
import Actualizado from "@/components/Actualizado";
import Listado from "@/components/Listado";
import Seguir from "@/components/Seguir";
import { AMBITO } from "@/lib/config";
import {
  ZONAS,
  clubes,
  convocatorias,
  etiquetaCategoria,
  etiquetaSexo,
  paresCategoriaSexo,
  ultimaActualizacion,
} from "@/lib/datos";

const DESCRIPCION = `Convocatorias de pruebas de voleibol de clubes y escuelas de ${AMBITO}, de benjamín a máster. Filtra por categoría, sexo, zona y mes, y escribe directamente al club.`;

export const metadata: Metadata = {
  title: { absolute: "Pruebas de voleibol en la Comunidad de Madrid (2026-27)" },
  description: DESCRIPCION,
  alternates: { canonical: "/pruebas" },
};

export default function Pruebas() {
  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">
          Pruebas de voleibol en la Comunidad de Madrid
        </h1>
        <p className="mt-[2px] text-[13.5px] text-tinta-2">{DESCRIPCION}</p>
      </header>

      <Listado clubes={clubes} convocatorias={convocatorias} />

      <div className="border-t border-borde px-4 py-4">
        <h2 className="text-[12.5px] font-medium text-acento">Pruebas por categoría</h2>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
          {paresCategoriaSexo().map((p) => (
            <Link
              key={p.slug}
              href={`/pruebas/${p.slug}`}
              className="text-[13px] text-acento hover:underline"
            >
              {etiquetaCategoria(p.categoria)} {etiquetaSexo(p.sexo).toLowerCase()}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <h2 className="text-[12.5px] font-medium text-acento">Voleibol por zona</h2>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
          {ZONAS.map((z) => (
            <Link
              key={z.valor}
              href={`/voleibol-en/zona/${z.valor}`}
              className="text-[13px] text-acento hover:underline"
            >
              {z.etiqueta}
            </Link>
          ))}
        </div>
      </div>

      <Actualizado fecha={ultimaActualizacion(convocatorias)} />

      <Seguir />
    </main>
  );
}
