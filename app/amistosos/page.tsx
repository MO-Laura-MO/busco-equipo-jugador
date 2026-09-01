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
        <p className="mt-[2px] text-[13.5px] text-tinta-2">
          Estamos calentando... atent@ que empieza el partido en breve!
        </p>
        <ul className="mt-3 list-disc space-y-[6px] pl-5 text-[13px] leading-relaxed text-tinta-2">
          <li>Un espacio para que los clubes de Madrid encuentren rivales con quien jugar amistosos.</li>
          <li>Nos dices qué buscas (categoría, zona, fechas) y avisamos en cuanto haya un club compatible.</li>
          <li>Gratis y sin intermediarios: el contacto y el acuerdo son directamente entre los dos clubes.</li>
        </ul>
      </header>
      <div className="bg-barra px-4 py-5">
        <h2 className="text-[15px] font-medium text-tinta">
          ¿Tu club busca jugar amistosos?
        </h2>
        <p className="mt-1 max-w-[520px] text-[13px] leading-relaxed text-tinta-2">
          Apunta a tu club y te avisamos en cuanto encontremos rival.
        </p>
        <p className="mt-1 max-w-[520px] text-[13px] leading-relaxed text-tinta-2">
          Si tu club todavía no está dado de alta en voley.app,{" "}
          <Link href="/alta" className="text-acento underline underline-offset-2">
            date de alta primero
          </Link>
          .
        </p>
        <a
          href={URL_FORMULARIO_AMISTOSOS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-[8px] bg-acento px-4 py-[10px] text-[13.5px] font-medium text-white hover:opacity-90"
        >
          Apuntar mi club
          <ExternalLink size={14} strokeWidth={1.75} />
        </a>
      </div>
    </main>
  );
}
