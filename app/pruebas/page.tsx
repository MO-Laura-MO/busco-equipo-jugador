import type { Metadata } from "next";
import Actualizado from "@/components/Actualizado";
import Listado from "@/components/Listado";
import Seguir from "@/components/Seguir";
import { AMBITO } from "@/lib/config";
import { clubes, convocatorias, ultimaActualizacion } from "@/lib/datos";

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

      <Actualizado fecha={ultimaActualizacion(convocatorias)} />

      <Seguir />
    </main>
  );
}
