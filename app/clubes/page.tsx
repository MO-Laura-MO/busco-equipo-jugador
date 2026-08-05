import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { AMBITO, URL_FORMULARIO_ALTA } from "@/lib/config";
import { ZONAS, clubes, convocatorias } from "@/lib/datos";

export const metadata: Metadata = {
  title: `Clubes de voleibol de ${AMBITO}`,
  description: `Clubes y escuelas de voleibol de ${AMBITO} con pruebas publicadas: contacto, zona y convocatorias de cada club.`,
};

export default function Clubes() {
  const lista = [...clubes].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es")
  );

  return (
    <main>
      <header className="px-4 pb-3 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Clubes</h1>
        <p className="mt-[2px] text-[13.5px] text-tinta-2">
          Clubes y escuelas con pruebas publicadas en {AMBITO}.
        </p>
      </header>

      {lista.length > 0 ? (
        <ul className="border-t border-borde">
          {lista.map((c) => {
            const zona =
              ZONAS.find((z) => z.valor === c.zona)?.etiqueta.toLowerCase() ??
              c.zona;
            const numConvocatorias = convocatorias.filter(
              (x) => x.clubId === c.id
            ).length;
            return (
              <li key={c.id}>
                <Link
                  href={`/clubes/${c.id}`}
                  className="block border-b border-borde-fila hover:bg-barra/60"
                >
                  <div className="px-4 py-[14px]">
                    <h2 className="text-[15px] font-medium leading-snug text-tinta">
                      {c.nombre}
                    </h2>
                    <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
                      <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
                      {c.municipio} · zona {zona}
                      {numConvocatorias > 0 && (
                        <>
                          {" · "}
                          {numConvocatorias}{" "}
                          {numConvocatorias === 1
                            ? "convocatoria"
                            : "convocatorias"}
                        </>
                      )}
                    </p>
                    {c.buscaEntrenador && (
                      <div className="mt-[7px]">
                        <span className="inline-flex items-center gap-[5px] rounded-[5px] bg-acento-tinte px-[8px] py-[3px] text-[11.5px] leading-[1.3] text-acento">
                          <Users size={12} strokeWidth={1.75} />
                          Busca entrenador
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
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
