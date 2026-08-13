import type { Metadata } from "next";
import {
  Building2,
  ChevronRight,
  ClipboardList,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import FilaConvocatoria from "@/components/FilaConvocatoria";
import Seguir from "@/components/Seguir";
import { clubes, convocatorias, hayVacantes } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Voleibol en Madrid: pruebas de clubes y entrenadores",
  description:
    "Pruebas de voleibol de clubes y escuelas, vacantes de entrenador y directorio de clubes de la Comunidad de Madrid. Gratis, sin registro y sin intermediarios.",
};

interface Acceso {
  icono: typeof Search;
  titulo: string;
  descripcion: string;
  href: string;
}

const ACCESOS: Acceso[] = [
  {
    icono: Search,
    titulo: "Pruebas de clubes y escuelas",
    descripcion:
      "Convocatorias abiertas a jugadores, por categoría, sexo y zona de Madrid",
    href: "/pruebas",
  },
  {
    icono: Users,
    titulo: "Clubes que buscan entrenador",
    descripcion: "Vacantes de entrenador y entrenadora en toda la Comunidad",
    href: "/entrenadores",
  },
  {
    icono: Building2,
    titulo: "Directorio de clubes",
    descripcion: "Los clubes de Madrid, municipio a municipio",
    href: "/clubes",
  },
];

export default function Home() {
  const clubesPorId = new Map(clubes.map((c) => [c.id, c]));
  const ultimas = [...convocatorias]
    .sort((a, b) => b.fechaActualizacion.localeCompare(a.fechaActualizacion))
    .slice(0, 4);

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
        <div className="absolute inset-0 bg-[#101A33]/45" />
        <div className="relative px-4 py-14 sm:py-16">
          <h1
            className="max-w-[420px] text-[24px] font-medium leading-snug text-white"
            style={{ textShadow: "0 1px 12px rgba(11, 31, 26, 0.55)" }}
          >
            Tu próximo equipo te está buscando
          </h1>
          <p
            className="mt-2 max-w-[440px] text-[13.5px] leading-relaxed text-white/90"
            style={{ textShadow: "0 1px 10px rgba(11, 31, 26, 0.55)" }}
          >
            Seas jugador o entrenador, aquí está tu próximo equipo: clubes y
            escuelas de la Comunidad de Madrid, de benjamín a máster.
          </p>
        </div>
      </section>

      <nav>
        {ACCESOS.filter((a) => a.href !== "/entrenadores" || hayVacantes).map(
          (a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center gap-3 border-b border-borde-fila px-4 py-[14px] hover:bg-barra/60"
            >
              <a.icono size={19} strokeWidth={1.75} className="shrink-0 text-acento" />
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium leading-snug text-tinta">
                  {a.titulo}
                </p>
                <p className="mt-[2px] text-[12.5px] leading-snug text-tinta-3">
                  {a.descripcion}
                </p>
              </div>
              <ChevronRight size={16} strokeWidth={1.75} className="shrink-0 text-tinta-3" />
            </Link>
          )
        )}
      </nav>

      <div className="px-4 py-4">
        <Link
          href="/alta"
          className="flex items-center justify-center gap-2 rounded-[8px] bg-amarillo px-4 py-[10px] text-[13.5px] font-medium text-[#111827] hover:bg-amarillo/90"
        >
          <ClipboardList size={16} strokeWidth={1.75} />
          Soy un club: añadir mi club
        </Link>
      </div>

      {ultimas.length > 0 && (
        <section className="border-t border-borde">
          <h2 className="bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
            Últimas convocatorias publicadas
          </h2>
          <ul>
            {ultimas.map((c, i) => {
              const club = clubesPorId.get(c.clubId);
              if (!club) return null;
              return (
                <li key={`${c.clubId}-${c.categoria}-${c.sexo}-${i}`}>
                  <FilaConvocatoria
                    convocatoria={c}
                    nombreClub={club.nombre}
                    municipio={club.municipio}
                  />
                </li>
              );
            })}
          </ul>
          <div className="px-4 py-4">
            <Link href="/pruebas" className="text-[13px] text-acento hover:underline">
              Ver todas las convocatorias
            </Link>
          </div>
        </section>
      )}

      <Seguir
        titulo="¿No está todavía la prueba que buscas?"
        texto="Cargamos clubes cada semana. Te avisamos de cada convocatoria nueva en el canal de WhatsApp y en Instagram: gratis, y puedes salir cuando quieras."
      />
    </main>
  );
}
