/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sitio 100% estático: todas las páginas se generan en build.
  // No usamos `output: "export"` para poder servir /api/clubes como
  // route handler estático en Vercel; si algún día se quiere export
  // puro, basta con añadirlo y mover el endpoint a /public.
  async redirects() {
    return [
      {
        // La ficha de ABV Boadilla vivía en la URL de su nombre federativo
        // antiguo, "CDE Boadilla M. Dos de Mayo CV".
        source: "/clubes/boadilla-dos-de-mayo",
        destination: "/clubes/abv-boadilla",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
