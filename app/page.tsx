import { Info, Volleyball } from "lucide-react";
import Link from "next/link";
import Listado from "@/components/Listado";
import { AMBITO, NOMBRE_MARCA } from "@/lib/config";
import { clubes, convocatorias } from "@/lib/datos";

export default function Home() {
  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-[6px] text-[13px] font-medium text-acento">
            <Volleyball size={17} strokeWidth={1.75} />
            {NOMBRE_MARCA}
          </span>
          <Link
            href="/aviso-legal"
            aria-label="Información sobre esta web"
            className="text-tinta-3 hover:text-tinta-2"
          >
            <Info size={17} strokeWidth={1.75} />
          </Link>
        </div>
        <h1 className="mt-3 text-[20px] font-medium leading-snug text-tinta">
          Encuentra equipo de voleibol en {AMBITO}
        </h1>
        <p className="mt-[3px] text-[13.5px] leading-relaxed text-tinta-2">
          Convocatorias de pruebas de clubes y escuelas, de benjamín a máster.
        </p>
      </header>
      <Listado clubes={clubes} convocatorias={convocatorias} />
    </main>
  );
}
