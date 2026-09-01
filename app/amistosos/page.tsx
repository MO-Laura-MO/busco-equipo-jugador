import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { URL_FORMULARIO_AMISTOSOS } from "@/lib/config";

export const metadata: Metadata = {
  title: { absolute: "Amistosos entre clubes de voleibol en Madrid" },
  description:
    "Clubes de voleibol de Madrid que buscan jugar partidos amistosos con otros clubes.",
  alternates: { canonical: "/amistosos" },
  // Sin listado real todavía, no la indexamos.
  robots: { index: false },
};

export default function Amistosos() {
  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Amistosos entre clubes</h1>
        <ul className="mt-3 list-disc space-y-[6px] pl-5 text-[13px] leading-relaxed text-tinta-2">
          <li>Un espacio para que los clubes de Madrid encuentren rivales con quien jugar amistosos.</li>
          <li>Nos dices qué buscas (categoría, zona, fechas) y avisamos en cuanto haya un club compatible.</li>
          <li>
            No hacemos de intermediarios: encontráis los datos de contacto en la
            ficha de cada club y habláis directamente entre vosotros.
          </li>
        </ul>
      </header>
      <div className="bg-barra px-4 py-5 text-center">
        <a
          href={URL_FORMULARIO_AMISTOSOS}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[8px] bg-amarillo px-4 py-[10px] text-[13.5px] font-medium text-[#111827] hover:bg-amarillo/90"
        >
          Apuntarnos a amistosos
          <ExternalLink size={14} strokeWidth={1.75} />
        </a>
        <p className="mt-3 text-[13px] leading-relaxed text-tinta-2">
          Sólo se pueden apuntar clubes de la Comunidad de Madrid.
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-tinta-2">
          Si tu club todavía no está dado de alta en voley.app,{" "}
          <Link href="/alta" className="text-acento underline underline-offset-2">
            date de alta primero
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
