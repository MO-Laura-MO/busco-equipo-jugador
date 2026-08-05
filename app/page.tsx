import { ClipboardList, Info, Search, Volleyball } from "lucide-react";
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
        {/* Hero estrecho: la imagen vive en public/hero.webp (1440×576). */}
        <img
          src="/hero.webp"
          alt=""
          className="mt-4 aspect-[5/2] w-full rounded-[8px] object-cover"
        />
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Link
            href="/alta"
            className="flex items-center justify-center gap-2 rounded-[8px] bg-acento px-4 py-[10px] text-[13.5px] font-medium text-white hover:bg-acento/90"
          >
            <ClipboardList size={16} strokeWidth={1.75} />
            Soy un club: publicar pruebas
          </Link>
          <a
            href="#convocatorias"
            className="flex items-center justify-center gap-2 rounded-[8px] border border-borde-control px-4 py-[10px] text-[13.5px] font-medium text-tinta hover:border-tinta-3"
          >
            <Search size={16} strokeWidth={1.75} />
            Soy jugador/a: buscar pruebas
          </a>
        </div>
      </header>
      <div id="convocatorias">
        <Listado clubes={clubes} convocatorias={convocatorias} />
      </div>
    </main>
  );
}
