import { Info } from "lucide-react";
import Link from "next/link";
import Listado from "@/components/Listado";
import { clubes, convocatorias } from "@/lib/datos";

export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between px-4 pb-3 pt-5">
        <h1 className="text-[15px] font-medium text-tinta">
          Pruebas de voleibol · Madrid
        </h1>
        <Link
          href="/aviso-legal"
          aria-label="Información sobre esta web"
          className="text-tinta-3 hover:text-tinta-2"
        >
          <Info size={17} strokeWidth={1.75} />
        </Link>
      </header>
      <Listado clubes={clubes} convocatorias={convocatorias} />
    </main>
  );
}
