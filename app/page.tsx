import { ClipboardList, Search } from "lucide-react";
import Link from "next/link";
import Listado from "@/components/Listado";
import { AMBITO } from "@/lib/config";
import { clubes, convocatorias } from "@/lib/datos";

export default function Home() {
  return (
    <main>
      {/* Hero a sangre completa: la imagen vive en public/hero.webp (1440×576). */}
      <section className="relative">
        <img
          src="/hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Velo suave para que el texto se lea sobre cualquier imagen. */}
        <div className="absolute inset-0 bg-[#0B1F1A]/35" />
        <div className="relative px-4 py-14 sm:py-16">
          <h1 className="max-w-[420px] text-[24px] font-medium leading-snug text-white">
            Tu próximo equipo te está buscando
          </h1>
          <p className="mt-2 max-w-[440px] text-[13.5px] leading-relaxed text-white/85">
            La nueva forma de encontrar equipo de voleibol en {AMBITO}: pruebas
            de clubes y escuelas, de benjamín a máster, en un solo sitio.
          </p>
        </div>
      </section>

      <div className="grid gap-2 px-4 pb-4 pt-4 sm:grid-cols-2">
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

      <div id="convocatorias">
        <Listado clubes={clubes} convocatorias={convocatorias} />
      </div>
    </main>
  );
}
