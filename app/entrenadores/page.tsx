import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import FilaVacante from "@/components/FilaVacante";
import { URL_FORMULARIO_ALTA } from "@/lib/config";
import { vacantesOrdenadas } from "@/lib/datos";

const DESCRIPCION =
  "Vacantes de entrenador o entrenadora abiertas ahora mismo en clubes de voleibol de la Comunidad de Madrid. Escribes directamente al club: sin registro, sin intermediarios y sin coste.";

const FILAS = vacantesOrdenadas();

export const metadata: Metadata = {
  title: { absolute: "Clubes que buscan entrenador de voleibol en Madrid" },
  description: DESCRIPCION,
  alternates: { canonical: "/entrenadores" },
  // Nunca dejamos indexada una página sin contenido de verdad.
  ...(FILAS.length === 0 ? { robots: { index: false } } : {}),
};

function Captacion() {
  return (
    <div className="bg-barra px-4 py-5">
      <h2 className="text-[15px] font-medium text-tinta">
        ¿Tu club busca entrenador o entrenadora?
      </h2>
      <p className="mt-1 max-w-[520px] text-[13px] leading-relaxed text-tinta-2">
        Publícalo aquí gratis, tengas o no pruebas abiertas.
      </p>
      <a
        href={URL_FORMULARIO_ALTA}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-[8px] bg-acento px-4 py-[10px] text-[13.5px] font-medium text-white hover:opacity-90"
      >
        Ir al formulario de alta
        <ExternalLink size={14} strokeWidth={1.75} />
      </a>
    </div>
  );
}

export default function Entrenadores() {
  if (FILAS.length === 0) {
    return (
      <main>
        <Captacion />
      </main>
    );
  }

  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">
          Clubes que buscan entrenador o entrenadora en Madrid
        </h1>
        <p className="mt-[2px] text-[13.5px] text-tinta-2">{DESCRIPCION}</p>
      </header>

      <div className="bg-barra px-4 py-[9px]">
        <span className="text-[12.5px] text-tinta-2">
          {FILAS.length}{" "}
          {FILAS.length === 1 ? "vacante de entrenador" : "vacantes de entrenador"}
        </span>
      </div>

      <ul>
        {FILAS.map(({ vacante, club }, i) => (
          <li key={`${vacante.clubId}-${vacante.puesto}-${i}`}>
            <FilaVacante vacante={vacante} club={club} />
          </li>
        ))}
      </ul>

      <Captacion />

      <div className="border-t border-borde px-4 py-4">
        <p className="text-[12.5px] text-tinta-3">
          Información facilitada por los clubes. voley.app solo publica: el
          contacto y el acuerdo son directamente con el club.
        </p>
      </div>
    </main>
  );
}
