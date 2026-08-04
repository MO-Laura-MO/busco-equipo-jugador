import type { MetadataRoute } from "next";
import { clubes } from "@/lib/datos";
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
    ...fichas,
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
