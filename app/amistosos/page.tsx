import type { Metadata } from "next";
import { ExternalLink, MapPin, Megaphone, Search, Users } from "lucide-react";
import Link from "next/link";
import Actualizado from "@/components/Actualizado";
import EtiquetaEstado from "@/components/EtiquetaEstado";
import {
  Amistosos as AmistososValor,
  Categoria,
  Sexo,
  TIPOS_ENTIDAD,
  ZONAS,
  clubesConAmistosos,
  convocatorias,
  etiquetaCategoria,
  iniciales,
  vacantes,
} from "@/lib/datos";
import { EMAIL_CORRECCIONES, URL_FORMULARIO_AMISTOSOS } from "@/lib/config";

export const metadata: Metadata = {
  title: { absolute: "Amistosos entre clubes de voleibol en Madrid" },
  description:
    "Clubes de voleibol de Madrid que buscan jugar partidos amistosos con otros clubes.",
  alternates: { canonical: "/amistosos" },
  // Con solo dos clubes todavía no hay masa mínima, no la indexamos.
  robots: { index: false },
};

const PUNTOS = [
  {
    icono: Users,
    texto: "Un espacio para que los clubes de Madrid encuentren rivales con quien jugar amistosos.",
  },
  {
    icono: Megaphone,
    texto:
      "Nos dices qué buscas —categoría, zona y fechas— y lo publicamos en la página para que otros clubes puedan encontrarte.",
  },
  {
    icono: Search,
    texto:
      "Mira qué otros clubes buscan también amistosos: sus datos de contacto están en su ficha, así que habláis directamente y organizáis el partido.",
  },
];

const ETIQUETA_SEXO_CORTA: Record<Sexo, string> = {
  femenino: "FEM",
  masculino: "MASC",
  mixto: "MIXTO",
};

const ETIQUETA_AMISTOSOS: Record<AmistososValor, string> = {
  "recibe-y-visita": "Recibe en casa y se desplaza",
  "solo-recibe": "Recibe en casa",
  "solo-visita": "Se desplaza",
  no: "",
};

export default function Amistosos() {
  const grupos = clubesConAmistosos();

  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Amistosos entre clubes</h1>
        <ul className="mt-3 space-y-3">
          {PUNTOS.map((p, i) => (
            <li key={i} className="flex items-start gap-[10px]">
              <p.icono size={17} strokeWidth={1.75} className="mt-[1px] shrink-0 text-acento" />
              <span className="text-[13px] leading-relaxed text-tinta-2">{p.texto}</span>
            </li>
          ))}
        </ul>
      </header>

      {grupos.length > 0 && (
        <section>
          <h2 className="border-t border-borde bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
            {grupos.length === 1
              ? "1 club busca amistosos"
              : `${grupos.length} clubes buscan amistosos`}
          </h2>
          <ul>
            {grupos.map(({ club, equipos: equiposClub }) => {
              const verificado =
                club.verificado === true ||
                convocatorias.some((c) => c.clubId === club.id && c.origen === "club") ||
                vacantes.some((v) => v.clubId === club.id && v.origen === "club");

              const porSexo = new Map<Sexo, Categoria[]>();
              for (const eq of equiposClub) {
                const lista = porSexo.get(eq.sexo) ?? [];
                lista.push(eq.categoria);
                porSexo.set(eq.sexo, lista);
              }

              const tipos = TIPOS_ENTIDAD.filter((t) =>
                equiposClub.some((eq) => eq.tipoEntidad.includes(t.valor))
              ).map((t) => t.valor);

              const desplazamiento = ETIQUETA_AMISTOSOS[equiposClub[0].amistosos];
              const disponibilidad = equiposClub[0].disponibilidad;
              const zona = ZONAS.find((z) => z.valor === club.zona)?.etiqueta ?? club.zona;

              return (
                <li key={club.id}>
                  <Link
                    href={`/clubes/${club.id}`}
                    className="block border-b border-borde-fila hover:bg-barra/60"
                  >
                    <div className="flex gap-3 px-4 py-[14px]">
                      {club.logo && verificado ? (
                        <img
                          src={club.logo}
                          alt=""
                          className="h-11 w-11 shrink-0 rounded-full border border-borde-fila bg-white object-contain p-[3px]"
                        />
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-acento-tinte text-[14px] font-medium text-acento">
                          {iniciales(club.nombre)}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="flex items-center gap-[5px] text-[15px] font-medium leading-snug text-tinta">
                          <span className="truncate">{club.nombre}</span>
                          {verificado && <EtiquetaEstado estado="verificado" />}
                        </h3>
                        {[...porSexo.entries()].map(([sexo, categorias]) => (
                          <p
                            key={sexo}
                            className="mt-[2px] text-[13px] leading-snug text-tinta-2"
                          >
                            <span className="text-tinta-3">{ETIQUETA_SEXO_CORTA[sexo]}</span>{" "}
                            {categorias.map((c) => etiquetaCategoria(c).toLowerCase()).join(", ")}
                          </p>
                        ))}
                        {desplazamiento && (
                          <p className="mt-[2px] text-[12.5px] leading-snug text-tinta-2">
                            {desplazamiento}
                          </p>
                        )}
                        <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
                          <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
                          <span className="truncate">
                            {club.municipio} · Zona {zona}
                          </span>
                        </p>
                        <div className="mt-[7px] flex flex-wrap gap-[6px]">
                          {tipos.map((t) => (
                            <EtiquetaEstado key={t} estado={t} />
                          ))}
                          {disponibilidad && (
                            <span className="inline-block rounded-[5px] bg-gris-tinte px-[8px] py-[3px] text-[11.5px] leading-[1.3] text-gris-etiqueta">
                              {disponibilidad}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Actualizado
            fecha={grupos
              .flatMap((g) => g.equipos)
              .reduce((max, e) => (e.fechaActualizacion > max ? e.fechaActualizacion : max), "")}
          />
          <p className="px-4 pb-3 text-[12.5px] text-tinta-3">
            Información facilitada por los propios clubes. voley.app solo publica la
            disponibilidad: el acuerdo del amistoso es directamente entre los dos clubes.
          </p>
          <a
            href={`mailto:${EMAIL_CORRECCIONES}?subject=Corrección de datos: Amistosos`}
            className="mx-4 mb-4 inline-block text-[12.5px] text-tinta-2 underline underline-offset-2 decoration-borde-control hover:text-tinta"
          >
            ¿Hay algún dato incorrecto?
          </a>
        </section>
      )}

      <div className="px-4 py-5 text-center">
        <a
          href={URL_FORMULARIO_AMISTOSOS}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[8px] bg-amarillo px-4 py-[10px] text-[13.5px] font-medium text-[#111827] hover:bg-amarillo/90"
        >
          Apuntarnos a amistosos
          <ExternalLink size={14} strokeWidth={1.75} />
        </a>
        <p className="mt-3 text-[13px] leading-relaxed text-tinta-2">
          Sólo se pueden apuntar clubes de la Comunidad de Madrid.
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-tinta-2">
          Si tu club todavía no está dado de alta en voley.app,{" "}
          <Link href="/alta" className="text-acento underline underline-offset-2">
            date de alta primero
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
