import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { URL_FORMULARIO_ALTA } from "@/lib/config";

export const metadata: Metadata = {
  title: "Dar de alta un club",
  description:
    "Publica las pruebas de tu club de voleibol en el directorio de la Comunidad de Madrid. Alta gratuita a través de un formulario.",
};

export default function Alta() {
  return (
    <main className="px-4 pb-8 pt-5">
      <Link
        href="/"
        className="mb-4 flex items-center gap-1 text-[12.5px] text-tinta-2 hover:text-tinta"
      >
        <ArrowLeft size={14} strokeWidth={1.75} />
        Todas las convocatorias
      </Link>

      <h1 className="text-[19px] font-medium text-tinta">Dar de alta un club</h1>

      <div className="mt-3 space-y-3 text-[13.5px] leading-relaxed text-tinta-2">
        <p>
          Si tu club hace pruebas para completar equipos de categorías base
          (benjamín a juvenil) en la Comunidad de Madrid, puedes publicarlas
          aquí gratis.
        </p>
        <p>
          Rellena el formulario con los datos del club y de las convocatorias.
          Revisamos cada alta a mano antes de publicarla, así que puede tardar
          unos días en aparecer.
        </p>
        <p>
          Solo publicamos datos de contacto del club (email y teléfono de la
          entidad), nunca información de jugadores ni de menores.
        </p>
      </div>

      <a
        href={URL_FORMULARIO_ALTA}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-[6px] bg-acento px-4 py-[9px] text-[13.5px] font-medium text-white hover:opacity-90"
      >
        Ir al formulario de alta
        <ExternalLink size={14} strokeWidth={1.75} />
      </a>

      <p className="mt-4 text-[12.5px] text-tinta-3">
        ¿Tu club ya está publicado y quieres corregir o añadir algo? Usa el
        enlace «¿Hay algún dato incorrecto?» de su ficha.
      </p>
    </main>
  );
}
