import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Actualizado from "@/components/Actualizado";
import FilaConvocatoria from "@/components/FilaConvocatoria";
import Seguir from "@/components/Seguir";
import {
  clubes,
  convocatorias,
  etiquetaCategoria,
  etiquetaZona,
  municipiosConPagina,
  ordenCategoria,
  ordenarConvocatorias,
  slug,
  ultimaActualizacion,
} from "@/lib/datos";
import { URL_SITIO } from "@/lib/config";

const TEMPORADA = "2026-27";

export function generateStaticParams() {
  return municipiosConPagina().map((m) => ({ municipio: slug(m) }));
}

function buscarMunicipio(param: string): string | undefined {
  return municipiosConPagina().find((m) => slug(m) === param);
}

function listaConY(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

function datosMunicipio(municipio: string) {
  const clubesMunicipio = clubes.filter((c) => c.municipio === municipio);
  const convocatoriasMunicipio = ordenarConvocatorias(
    convocatorias.filter((c) => clubesMunicipio.some((club) => club.id === c.clubId))
  );
  const zona = clubesMunicipio[0]?.zona;
  const categorias = [...new Set(convocatoriasMunicipio.map((c) => c.categoria))].sort(
    (a, b) => ordenCategoria(a) - ordenCategoria(b)
  );
  return { clubesMunicipio, convocatoriasMunicipio, zona, categorias };
}

function fraseResumen(
  municipio: string,
  clubesMunicipio: ReturnType<typeof datosMunicipio>["clubesMunicipio"],
  convocatoriasMunicipio: ReturnType<typeof datosMunicipio>["convocatoriasMunicipio"],
  zona: ReturnType<typeof datosMunicipio>["zona"]
): string {
  const textoClubes =
    clubesMunicipio.length === 1
      ? "1 club de voleibol"
      : `${clubesMunicipio.length} clubes y escuelas de voleibol`;
  return `En ${municipio} hay ${textoClubes}, en la zona ${zona ? etiquetaZona(zona).toLowerCase() : ""} de la Comunidad de Madrid.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ municipio: string }>;
}): Promise<Metadata> {
  const { municipio: param } = await params;
  const municipio = buscarMunicipio(param);
  if (!municipio) return {};
  const { clubesMunicipio, convocatoriasMunicipio, zona } = datosMunicipio(municipio);

  return {
    title: { absolute: `Voleibol en ${municipio}: clubes y pruebas (${TEMPORADA})` },
    description: fraseResumen(municipio, clubesMunicipio, convocatoriasMunicipio, zona),
    alternates: { canonical: `/voleibol-en/${param}` },
  };
}

export default async function VoleibolEnMunicipio({
  params,
}: {
  params: Promise<{ municipio: string }>;
}) {
  const { municipio: param } = await params;
  const municipio = buscarMunicipio(param);
  if (!municipio) notFound();

  const { clubesMunicipio, convocatoriasMunicipio, zona, categorias } = datosMunicipio(municipio);
  const fechaModificacion = ultimaActualizacion([...clubesMunicipio, ...convocatoriasMunicipio]);

  const otrosMunicipiosZona = zona
    ? municipiosConPagina().filter((m) => m !== municipio && clubes.some((c) => c.municipio === m && c.zona === zona))
    : [];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Voleibol en ${municipio}: clubes y pruebas`,
    url: `${URL_SITIO}/voleibol-en/${param}`,
    ...(fechaModificacion ? { dateModified: fechaModificacion } : {}),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: clubesMunicipio.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${URL_SITIO}/clubes/${c.id}`,
        name: c.nombre,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: URL_SITIO },
      { "@type": "ListItem", position: 2, name: "Clubes", item: `${URL_SITIO}/clubes` },
      { "@type": "ListItem", position: 3, name: municipio, item: `${URL_SITIO}/voleibol-en/${param}` },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">
          Voleibol en {municipio}: clubes y pruebas
        </h1>
        <p className="mt-[2px] text-[13.5px] leading-relaxed text-tinta-2">
          {fraseResumen(municipio, clubesMunicipio, convocatoriasMunicipio, zona)}{" "}
          {convocatoriasMunicipio.length > 0
            ? `Ahora mismo hay ${
                convocatoriasMunicipio.length === 1
                  ? "1 convocatoria"
                  : `${convocatoriasMunicipio.length} convocatorias`
              } de pruebas abiertas, de ${listaConY(categorias.map((c) => etiquetaCategoria(c).toLowerCase()))}.`
            : `Ahora mismo no hay convocatorias de pruebas publicadas en ${municipio}, pero puedes escribir directamente a los clubes.`}
        </p>
      </header>

      <section>
        <h2 className="bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
          {clubesMunicipio.length === 1
            ? "1 club de voleibol"
            : `${clubesMunicipio.length} clubes de voleibol`}
        </h2>
        <ul>
          {clubesMunicipio.map((c) => {
            const numConvocatorias = convocatorias.filter((x) => x.clubId === c.id).length;
            return (
              <li key={c.id}>
                <Link
                  href={`/clubes/${c.id}`}
                  className="flex items-center justify-between gap-3 border-b border-borde-fila px-4 py-[12px] last:border-b-0 hover:bg-barra/60"
                >
                  <span className="truncate text-[14.5px] font-medium leading-snug text-tinta">
                    {c.nombre}
                  </span>
                  {numConvocatorias > 0 && (
                    <span className="shrink-0 rounded-[5px] bg-amarillo px-[7px] py-[3px] text-[11px] font-medium leading-[1.3] text-[#111827]">
                      {numConvocatorias} {numConvocatorias === 1 ? "prueba" : "pruebas"}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {convocatoriasMunicipio.length > 0 && (
        <section>
          <h2 className="bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
            {convocatoriasMunicipio.length === 1
              ? "1 convocatoria de pruebas"
              : `${convocatoriasMunicipio.length} convocatorias de pruebas`}
          </h2>
          <ul>
            {convocatoriasMunicipio.map((c, i) => {
              const club = clubesMunicipio.find((x) => x.id === c.clubId);
              if (!club) return null;
              return (
                <li key={`${c.clubId}-${i}`}>
                  <FilaConvocatoria convocatoria={c} nombreClub={club.nombre} municipio={club.municipio} />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {(zona || otrosMunicipiosZona.length > 0) && (
        <nav className="border-t border-borde px-4 py-3">
          {zona && (
            <Link
              href={`/voleibol-en/zona/${zona}`}
              className="flex items-center gap-1 border-b border-borde-fila py-[10px] text-[13px] text-acento last:border-b-0"
            >
              <MapPin size={14} strokeWidth={1.75} />
              Voleibol en la zona {etiquetaZona(zona).toLowerCase()}
            </Link>
          )}
          {otrosMunicipiosZona.map((m) => (
            <Link
              key={m}
              href={`/voleibol-en/${slug(m)}`}
              className="block border-b border-borde-fila py-[10px] text-[13px] text-acento last:border-b-0"
            >
              Voleibol en {m}
            </Link>
          ))}
        </nav>
      )}

      <Actualizado fecha={fechaModificacion} />

      <Seguir />
    </main>
  );
}
