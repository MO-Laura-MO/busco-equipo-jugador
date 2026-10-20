import type { Metadata } from "next";
import { Info } from "lucide-react";
import ListadoPartidos from "@/components/ListadoPartidos";
import { EMAIL_CORRECCIONES } from "@/lib/config";
import { URL_RFEVB, partidos } from "@/lib/partidos";

export const metadata: Metadata = {
  title: { absolute: "Partidos de Superliga de voleibol en Madrid (2026-27)" },
  description:
    "Calendario de los partidos de Superliga y Superliga 2 de voleibol que se juegan en la Comunidad de Madrid esta temporada, por fin de semana.",
  alternates: { canonical: "/partidos" },
};

export default function Partidos() {
  const hoy = new Date().toISOString().slice(0, 10);

  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Partidos de Superliga en Madrid</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-tinta-2">
          Los partidos de Superliga y Superliga 2, masculina y femenina, que se juegan en la
          Comunidad de Madrid esta temporada.
        </p>
        <div className="mt-3 flex items-start gap-[10px] rounded-[8px] bg-ambar-tinte px-3 py-[10px]">
          <Info size={16} strokeWidth={1.75} className="mt-[1px] shrink-0 text-ambar" />
          <p className="text-[12.5px] leading-relaxed text-ambar">
            Calendario basado en la información publicada por la RFEVB en su web. Confirma
            siempre la hora y el lugar del partido en la{" "}
            <a
              href={URL_RFEVB}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              web de la Real Federación Española de Voleibol
            </a>
            .
          </p>
        </div>
      </header>

      <ListadoPartidos partidos={partidos} hoyServidor={hoy} />

      <p className="px-4 py-3 text-[12.5px] text-tinta-3">
        ¿Hay algún dato incorrecto?{" "}
        <a
          href={`mailto:${EMAIL_CORRECCIONES}?subject=Corrección de datos: Partidos`}
          className="text-acento underline"
        >
          Escríbenos
        </a>
        .
      </p>
    </main>
  );
}
