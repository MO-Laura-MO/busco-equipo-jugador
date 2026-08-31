import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Actualizado from "@/components/Actualizado";
import FilaConvocatoria from "@/components/FilaConvocatoria";
import Seguir from "@/components/Seguir";
import {
  ZONAS,
  Zona,
  clubes,
  convocatorias,
  etiquetaZona,
  municipiosConPagina,
  ordenarConvocatorias,
  slug,
  ultimaActualizacion,
} from "@/lib/datos";
import { URL_SITIO } from "@/lib/config";

const TEMPORADA = "2026-27";

export function generateStaticParams() {
  return ZONAS.map((z) => ({ zona: z.valor }));
}

function listaConY(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

function datosZona(zona: Zona) {
  const clubesZona = clubes.filter((c) => c.zona === zona);
  const convocatoriasZona = ordenarConvocatorias(
    convocatorias.filter((c) => clubesZona.some((club) => club.id === c.clubId))
  );
  const municipios = [...new Set(clubesZona.map((c) => c.municipio))].sort((a, b) =>
    a.localeCompare(b, "es")
  );
  return { clubesZona, convocatoriasZona, municipios };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zona: string }>;
}): Promise<Metadata> {
  const { zona: param } = await params;
  const zona = ZONAS.find((z) => z.valor === param)?.valor;
  if (!zona) return {};
  const { clubesZona, municipios } = datosZona(zona);
  const zonaTexto = etiquetaZona(zona).toLowerCase();

  return {
    title: { absolute: `Voleibol en la zona ${zonaTexto} de Madrid: clubes y pruebas (${TEMPORADA})` },
    description: `${clubesZona.length} clubes y escuelas de voleibol en ${listaConY(municipios)}, en la zona ${zonaTexto} de la Comunidad de Madrid.`,
    alternates: { canonical: `/voleibol-en/zona/${zona}` },
  };
}

export default async function VoleibolEnZona({
  params,
}: {
  params: Promise<{ zona: string }>;
}) {
  const { zona: param } = await params;
  const zona = ZONAS.find((z) => z.valor === param)?.valor;
  if (!zona) notFound();

  const { clubesZona, convocatoriasZona, municipios } = datosZona(zona);
  const zonaTexto = etiquetaZona(zona).toLowerCase();
  const fechaModificacion = ultimaActualizacion([...clubesZona, ...convocatoriasZona]);

  const municipiosConPropiaPagina = municipiosConPagina().filter((m) => municipios.includes(m));
  const otrasZonas = ZONAS.filter((z) => z.valor !== zona);

  const municipiosClubes = municipios.map((m) => ({
    municipio: m,
    clubes: clubesZona.filter((c) => c.municipio === m),
  }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Voleibol en la zona ${zonaTexto} de Madrid`,
    url: `${URL_SITIO}/voleibol-en/zona/${zona}`,
    ...(fechaModificacion ? { dateModified: fechaModificacion } : {}),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: clubesZona.map((c, i) => ({
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
      {
        "@type": "ListItem",
        position: 3,
        name: `Zona ${etiquetaZona(zona)}`,
        item: `${URL_SITIO}/voleibol-en/zona/${zona}`,
      },
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
          Voleibol en la zona {zonaTexto} de Madrid
        </h1>
        <p className="mt-[2px] text-[13.5px] leading-relaxed text-tinta-2">
          En la zona {zonaTexto} hay{" "}
          {clubesZona.length === 1 ? "1 club de voleibol" : `${clubesZona.length} clubes y escuelas de voleibol`}{" "}
          en {municipios.length === 1 ? "1 municipio" : `${municipios.length} municipios`}
          {": "}
          {listaConY(municipios)}.{" "}
          {convocatoriasZona.length > 0
            ? `Ahora mismo hay ${
                convocatoriasZona.length === 1 ? "1 convocatoria" : `${convocatoriasZona.length} convocatorias`
              } de pruebas abiertas.`
            : `Ahora mismo no hay convocatorias de pruebas publicadas en esta zona, pero puedes escribir directamente a los clubes.`}
        </p>
      </header>

      <section>
        <h2 className="bg-acento-tinte px-4 py-[9px] text-[12.5px] text-tinta-2">
          {clubesZona.length === 1 ? "1 club de voleibol" : `${clubesZona.length} clubes de voleibol`}
        </h2>
        {municipiosClubes.map(({ municipio, clubes: clubesMunicipio }) => (
          <div key={municipio}>
            <h3 className="px-4 pb-1 pt-3 text-[12.5px] font-medium text-tinta-2">{municipio}</h3>
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
          </div>
        ))}
      </section>

      {convocatoriasZona.length > 0 && (
        <section>
          <h2 className="bg-acento-tinte px-4 py-[9px] text-[12.5px] text-tinta-2">
            {convocatoriasZona.length === 1
              ? "1 convocatoria de pruebas"
              : `${convocatoriasZona.length} convocatorias de pruebas`}
          </h2>
          <ul>
            {convocatoriasZona.map((c, i) => {
              const club = clubesZona.find((x) => x.id === c.clubId);
              if (!club) return null;
              return (
                <li key={`${c.clubId}-${i}`}>
                  <FilaConvocatoria
                    convocatoria={c}
                    nombreClub={club.nombre}
                    municipio={club.municipio}
                    logoClub={club.logo && c.origen === "club" ? club.logo : undefined}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <nav className="border-t border-borde px-4 py-3">
        {municipiosConPropiaPagina.map((m) => (
          <Link
            key={m}
            href={`/voleibol-en/${slug(m)}`}
            className="block border-b border-borde-fila py-[10px] text-[13px] text-acento last:border-b-0"
          >
            Voleibol en {m}
          </Link>
        ))}
        {otrasZonas.map((z) => (
          <Link
            key={z.valor}
            href={`/voleibol-en/zona/${z.valor}`}
            className="block border-b border-borde-fila py-[10px] text-[13px] text-acento last:border-b-0"
          >
            Voleibol en la zona {z.etiqueta.toLowerCase()}
          </Link>
        ))}
      </nav>

      <Actualizado fecha={fechaModificacion} />

      <Seguir />
    </main>
  );
}
