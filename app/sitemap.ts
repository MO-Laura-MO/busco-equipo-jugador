import type { MetadataRoute } from "next";
import { ARTICULOS } from "@/lib/blog";
import { clubes, hayVacantes } from "@/lib/datos";
import { URL_SITIO } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const fichas = clubes.map((c) => ({
    url: `${URL_SITIO}/clubes/${c.id}`,
    lastModified: new Date(c.fechaActualizacion),
    changeFrequency: "weekly" as const,
    priority: 0.8,
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
