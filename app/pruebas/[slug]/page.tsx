import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Actualizado from "@/components/Actualizado";
import FilaConvocatoria from "@/components/FilaConvocatoria";
import Seguir from "@/components/Seguir";
import {
  Categoria,
  Convocatoria,
  clubPorId,
  convocatorias,
  etiquetaCategoria,
  etiquetaSexo,
  ordenCategoria,
  ordenarConvocatorias,
  paresCategoriaSexo,
  textoAnios,
  ultimaActualizacion,
} from "@/lib/datos";
import { URL_SITIO } from "@/lib/config";

/** Temporada actual del sitio: se usa también en el resto de páginas de pruebas. */
const TEMPORADA = "2026-27";

export function generateStaticParams() {
  return paresCategoriaSexo().map((p) => ({ slug: p.slug }));
}

function buscarPar(slug: string) {
  return paresCategoriaSexo().find((p) => p.slug === slug);
}

function listaConY(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

function municipiosDeLista(lista: Convocatoria[]): string[] {
  const municipios = new Set<string>();
  for (const c of lista) {
    const club = clubPorId(c.clubId);
    if (club) municipios.add(club.municipio);
  }
  return [...municipios].sort((a, b) => a.localeCompare(b, "es"));
}

function fraseResumen(categoria: Categoria, sexo: Convocatoria["sexo"], lista: Convocatoria[]): string {
  const municipios = municipiosDeLista(lista);
  const textoConvocatorias =
    lista.length === 1 ? "1 convocatoria" : `${lista.length} convocatorias`;
  const textoMunicipios = municipios.length === 1 ? "1 municipio" : `${municipios.length} municipios`;
  const categoriaTexto = etiquetaCategoria(categoria).toLowerCase();
  const sexoTexto = etiquetaSexo(sexo).toLowerCase();
  return `Hay ${textoConvocatorias} de pruebas de voleibol ${categoriaTexto} ${sexoTexto} abiertas en ${textoMunicipios} de la Comunidad de Madrid.`;
}

function fraseIntro(categoria: Categoria, sexo: Convocatoria["sexo"], lista: Convocatoria[]): string {
  const municipios = municipiosDeLista(lista);
  const frases = [fraseResumen(categoria, sexo, lista)];

  const textoEdad = textoAnios({ anios: undefined, temporada: TEMPORADA, categoria, sexo } as Convocatoria);
  if (textoEdad) {
    frases.push(`En la temporada ${TEMPORADA} esta categoría es para ${textoEdad}.`);
  }

  if (municipios.length > 0) {
    frases.push(`Convocan pruebas clubes de ${listaConY(municipios)}.`);
  }

  return frases.join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const par = buscarPar(slug);
  if (!par) return {};
  const { categoria, sexo } = par;
  const lista = ordenarConvocatorias(
    convocatorias.filter((c) => c.categoria === categoria && c.sexo === sexo)
  );
  const categoriaTexto = etiquetaCategoria(categoria).toLowerCase();
  const sexoTexto = etiquetaSexo(sexo).toLowerCase();

  const description =
    lista.length > 0
      ? fraseResumen(categoria, sexo, lista)
      : `Ahora mismo no hay convocatorias de pruebas de ${categoriaTexto} ${sexoTexto} publicadas en Madrid.`;

  return {
    title: { absolute: `Pruebas de voleibol ${categoriaTexto} ${sexoTexto} en Madrid (${TEMPORADA})` },
    description,
    alternates: { canonical: `/pruebas/${slug}` },
    ...(lista.length === 0 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function PruebasCategoriaSexo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const par = buscarPar(slug);
  if (!par) notFound();
  const { categoria, sexo } = par;

  const lista = ordenarConvocatorias(
    convocatorias.filter((c) => c.categoria === categoria && c.sexo === sexo)
  );
  const categoriaTexto = etiquetaCategoria(categoria).toLowerCase();
  const sexoTexto = etiquetaSexo(sexo).toLowerCase();
  const fechaModificacion = ultimaActualizacion(lista);

  const pares = paresCategoriaSexo();
  const idx = ordenCategoria(categoria);
  const anterior = pares.find((p) => p.sexo === sexo && ordenCategoria(p.categoria) === idx - 1);
  const siguiente = pares.find((p) => p.sexo === sexo && ordenCategoria(p.categoria) === idx + 1);
  const otroSexo = pares.filter((p) => p.categoria === categoria && p.sexo !== sexo);

  const hayNav = Boolean(anterior || siguiente || otroSexo.length > 0);

  const collectionJsonLd =
    lista.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Pruebas de voleibol ${categoriaTexto} ${sexoTexto} en Madrid`,
          url: `${URL_SITIO}/pruebas/${slug}`,
          ...(fechaModificacion ? { dateModified: fechaModificacion } : {}),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: lista.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${URL_SITIO}/clubes/${c.clubId}`,
              name: clubPorId(c.clubId)?.nombre ?? "",
            })),
          },
        }
      : null;

  const breadcrumbJsonLd =
    lista.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: URL_SITIO },
            { "@type": "ListItem", position: 2, name: "Pruebas", item: `${URL_SITIO}/pruebas` },
            {
              "@type": "ListItem",
              position: 3,
              name: `${etiquetaCategoria(categoria)} ${etiquetaSexo(sexo).toLowerCase()}`,
              item: `${URL_SITIO}/pruebas/${slug}`,
            },
          ],
        }
      : null;

  return (
    <main>
      {collectionJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}

      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">
          Pruebas de voleibol {categoriaTexto} {sexoTexto} en Madrid
        </h1>
        {lista.length > 0 && (
          <p className="mt-[2px] text-[13.5px] leading-relaxed text-tinta-2">
            {fraseIntro(categoria, sexo, lista)}
          </p>
        )}
      </header>

      {lista.length > 0 ? (
        <>
          <ul>
            {lista.map((c, i) => {
              const club = clubPorId(c.clubId);
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

          {hayNav && (
            <nav className="border-t border-borde px-4 py-3">
              {anterior && (
                <Link
                  href={`/pruebas/${anterior.slug}`}
                  className="flex items-center gap-1 border-b border-borde-fila py-[10px] text-[13px] text-acento last:border-b-0"
                >
                  <ChevronLeft size={14} strokeWidth={1.75} />
                  {etiquetaCategoria(anterior.categoria)} {etiquetaSexo(anterior.sexo).toLowerCase()}
                </Link>
              )}
              {siguiente && (
                <Link
                  href={`/pruebas/${siguiente.slug}`}
                  className="flex items-center justify-between gap-1 border-b border-borde-fila py-[10px] text-[13px] text-acento last:border-b-0"
                >
                  {etiquetaCategoria(siguiente.categoria)} {etiquetaSexo(siguiente.sexo).toLowerCase()}
                  <ChevronRight size={14} strokeWidth={1.75} />
                </Link>
              )}
              {otroSexo.map((p) => (
                <Link
                  key={p.slug}
                  href={`/pruebas/${p.slug}`}
                  className="flex items-center justify-between gap-1 border-b border-borde-fila py-[10px] text-[13px] text-acento last:border-b-0"
                >
                  {etiquetaCategoria(p.categoria)} {etiquetaSexo(p.sexo).toLowerCase()}
                  <ChevronRight size={14} strokeWidth={1.75} />
                </Link>
              ))}
            </nav>
          )}

          <Actualizado fecha={fechaModificacion} />
        </>
      ) : (
        <div className="px-4 py-6">
          <p className="text-[13px] leading-relaxed text-tinta-3">
            Ahora mismo no hay convocatorias de pruebas de {categoriaTexto} {sexoTexto} publicadas
            en Madrid. Las pruebas de esta categoría suelen convocarse en mayo y junio y a finales
            de agosto y septiembre.
          </p>
          <Link
            href="/clubes"
            className="mt-3 inline-block text-acento underline underline-offset-2 decoration-acento/40 hover:decoration-acento"
          >
            Ver todos los clubes de Madrid
          </Link>
        </div>
      )}

      <Seguir />
    </main>
  );
}
