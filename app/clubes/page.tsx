import type { Metadata } from "next";
import ListadoClubes from "@/components/ListadoClubes";
import { AMBITO, URL_FORMULARIO_ALTA } from "@/lib/config";
import { clubes, convocatorias, vacantes } from "@/lib/datos";

export const metadata: Metadata = {
  title: `Clubes de voleibol de ${AMBITO}`,
  description: `Clubes y escuelas de voleibol de ${AMBITO}: contacto, zona y convocatorias de pruebas de cada club.`,
};

export default function Clubes() {
  const lista = [...clubes]
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
    .map((c) => {
      const suyas = convocatorias.filter((x) => x.clubId === c.id);
      return {
        ...c,
        numConvocatorias: suyas.length,
        // Mismo criterio que la ficha: el club está verificado si al menos una
        // convocatoria o vacante suya viene de origen "club". El escudo, igual
        // que los colores, solo se enseña si lo está.
        verificado:
          suyas.some((x) => x.origen === "club") ||
          vacantes.some((v) => v.clubId === c.id && v.origen === "club"),
      };
    });

  return (
    <main>
      <header className="px-4 pb-3 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Clubes</h1>
        <p className="mt-[2px] text-[13.5px] text-tinta-2">
          {lista.length} clubes y escuelas de voleibol de {AMBITO}, con su
          contacto directo.
        </p>
      </header>

      {lista.length > 0 ? (
        <ListadoClubes clubes={lista} />
      ) : (
        <div className="border-t border-borde px-4 py-10 text-center">
          <p className="text-[13.5px] leading-relaxed text-tinta-2">
            Todavía no hay clubes publicados. Estamos contactando con los
            primeros.
          </p>
          <p className="mt-3 text-[13.5px] text-tinta-2">
            ¿Eres un club?{" "}
            <a
              href={URL_FORMULARIO_ALTA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-acento underline underline-offset-2 decoration-acento/40 hover:decoration-acento"
            >
              Publica tus pruebas gratis
            </a>
            .
          </p>
        </div>
      )}
    </main>
  );
}
