import type { Metadata } from "next";
import Link from "next/link";
import ListadoClubes from "@/components/ListadoClubes";
import { URL_FORMULARIO_ALTA } from "@/lib/config";
import { ZONAS, clubes, convocatorias, municipiosConPagina, slug, vacantes } from "@/lib/datos";

export const metadata: Metadata = {
  title: { absolute: "Clubes de voleibol en Madrid: directorio por municipio" },
  description:
    "Directorio de clubes y escuelas de voleibol de la Comunidad de Madrid, municipio a municipio, con contacto directo, zona y pruebas de cada club.",
  alternates: { canonical: "/clubes" },
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
  const numMunicipios = new Set(clubes.map((c) => c.municipio)).size;

  return (
    <main>
      <header className="px-4 pb-3 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Clubes de voleibol en Madrid</h1>
        <p className="mt-2 text-[13.5px] text-tinta-2">
          Este es el directorio de clubes y escuelas de voleibol de la
          Comunidad de Madrid: {lista.length} entidades en {numMunicipios}{" "}
          municipios, cada una con su municipio, su zona, su web, sus redes
          y su contacto directo. No cobramos nada a nadie y no hacemos de
          intermediarios: escribes tú al club.
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

      <div className="border-t border-borde px-4 py-4">
        <h2 className="text-[12.5px] font-medium text-tinta-2">Sobre este directorio</h2>
        <div className="mt-2 space-y-2 text-[13.5px] leading-relaxed text-tinta-2">
          <p>
            Puedes buscar por nombre o municipio, filtrar por zona (norte,
            sur, este, oeste y centro) y quedarte solo con los clubes que
            tienen pruebas convocadas ahora mismo. Cada ficha lleva las
            convocatorias abiertas del club, con categoría, sexo, fecha y
            pabellón.
          </p>
          <p>
            No todos los clubes hacen lo mismo. Los federados compiten en la
            liga de la Federación de Madrid y necesitan licencia federativa;
            los municipales juegan los juegos deportivos de su ayuntamiento;
            los de liga mancomunada forman equipo juntando jugadores de
            varias entidades para completar una categoría; y las escuelas son
            formación e iniciación, sin competición o solo interna. Cada
            ficha dice de qué tipo es, porque cambia la cuota, los
            desplazamientos y el compromiso de fin de semana.
          </p>
          <p>
            Si falta tu club o hay algo mal, escríbenos y lo corregimos.{" "}
            <Link
              href="/alta"
              className="text-acento underline underline-offset-2 decoration-acento/40 hover:decoration-acento"
            >
              Dar de alta un club
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-borde px-4 py-4">
        <h2 className="text-[12.5px] font-medium text-tinta-2">Clubes por municipio</h2>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
          {municipiosConPagina().map((m) => (
            <Link
              key={m}
              href={`/voleibol-en/${slug(m)}`}
              className="text-[13px] text-acento hover:underline"
            >
              {m}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        <h2 className="text-[12.5px] font-medium text-tinta-2">Voleibol por zona</h2>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
          {ZONAS.map((z) => (
            <Link
              key={z.valor}
              href={`/voleibol-en/zona/${z.valor}`}
              className="text-[13px] text-acento hover:underline"
            >
              {z.etiqueta}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
