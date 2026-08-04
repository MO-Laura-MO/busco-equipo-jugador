/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sitio 100% estático: todas las páginas se generan en build.
  // No usamos `output: "export"` para poder servir /api/clubes como
  // route handler estático en Vercel; si algún día se quiere export
  // puro, basta con añadirlo y mover el endpoint a /public.
};

export default nextConfig;
