import type { Metadata } from "next";
import { ExternalLink, Megaphone, Search, Users } from "lucide-react";
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

const PUNTOS = [
  {
    icono: Users,
    texto: "Un espacio para que los clubes de Madrid encuentren rivales con quien jugar amistosos.",
  },
  {
    icono: Megaphone,
    texto:
      "Nos dices qué buscas —categoría, zona y fechas— y lo publicamos en la página para que otros clubes puedan encontrarte.",
  },
  {
    icono: Search,
    texto:
      "Mira qué otros clubes buscan también amistosos: sus datos de contacto están en su ficha, así que habláis directamente y organizáis el partido.",
  },
];

export default function Amistosos() {
  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Amistosos entre clubes</h1>
        <ul className="mt-3 space-y-3">
          {PUNTOS.map((p, i) => (
            <li key={i} className="flex items-start gap-[10px]">
              <p.icono size={17} strokeWidth={1.75} className="mt-[1px] shrink-0 text-acento" />
              <span className="text-[13px] leading-relaxed text-tinta-2">{p.texto}</span>
            </li>
          ))}
        </ul>
      </header>
      <div className="px-4 py-5 text-center">
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
