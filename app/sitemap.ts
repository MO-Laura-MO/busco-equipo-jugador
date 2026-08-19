import type { MetadataRoute } from "next";
import { ARTICULOS } from "@/lib/blog";
import {
  ZONAS,
  clubes,
  convocatorias,
  hayVacantes,
  municipiosConPagina,
  paresCategoriaSexo,
  slug,
  ultimaActualizacion,
} from "@/lib/datos";
import { URL_SITIO } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const fichas = clubes.map((c) => ({
    url: `${URL_SITIO}/clubes/${c.id}`,
    lastModified: new Date(c.fechaActualizacion),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Solo las páginas de categoría con convocatorias vivas: una noindex no
  // puede estar en el sitemap.
  const paginasCategoria = paresCategoriaSexo()
    .map((p) => ({
      slug: p.slug,
      lista: convocatorias.filter((c) => c.categoria === p.categoria && c.sexo === p.sexo),
    }))
    .filter((p) => p.lista.length > 0)
    .map((p) => ({
      url: `${URL_SITIO}/pruebas/${p.slug}`,
      lastModified: new Date(ultimaActualizacion(p.lista)),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const paginasMunicipio = municipiosConPagina().map((m) => {
    const clubesMunicipio = clubes.filter((c) => c.municipio === m);
    const convocatoriasMunicipio = convocatorias.filter((c) =>
      clubesMunicipio.some((club) => club.id === c.clubId)
    );
    return {
      url: `${URL_SITIO}/voleibol-en/${slug(m)}`,
      lastModified: new Date(ultimaActualizacion([...clubesMunicipio, ...convocatoriasMunicipio])),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const paginasZona = ZONAS.map((z) => ({
    url: `${URL_SITIO}/voleibol-en/zona/${z.valor}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: URL_SITIO,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${URL_SITIO}/pruebas`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...paginasCategoria,
    ...(hayVacantes
      ? [
          {
            url: `${URL_SITIO}/entrenadores`,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    {
      url: `${URL_SITIO}/clubes`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...fichas,
    ...paginasMunicipio,
    ...paginasZona,
    {
      url: `${URL_SITIO}/blog`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    ...ARTICULOS.map((a) => ({
      url: `${URL_SITIO}/blog/${a.slug}`,
      lastModified: new Date(a.fecha),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${URL_SITIO}/alta`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${URL_SITIO}/aviso-legal`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
