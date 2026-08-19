import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import Link from "next/link";
import { Plus, Volleyball } from "lucide-react";
import Pestanas from "@/components/Pestanas";
import {
  NOMBRE_AMBITO_LARGO,
  NOMBRE_MARCA,
  TITULO_SITIO,
  URL_CANAL_WHATSAPP,
  URL_INSTAGRAM,
  URL_SITIO,
} from "@/lib/config";
import { hayVacantes } from "@/lib/datos";
import "./globals.css";

// Inter auto-alojada (sin peticiones a Google Fonts).
const inter = localFont({
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: {
    default: TITULO_SITIO,
    template: `%s · voley.app`,
  },
  description: `Directorio de convocatorias de pruebas de voleibol base en ${NOMBRE_AMBITO_LARGO}. Busca por categoría, sexo, zona y mes, y contacta directamente con el club.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pestanas = [
    { href: "/", etiqueta: "Inicio" },
    { href: "/pruebas", etiqueta: "Pruebas" },
    ...(hayVacantes ? [{ href: "/entrenadores", etiqueta: "Entrenadores" }] : []),
    { href: "/clubes", etiqueta: "Clubes" },
    { href: "/blog", etiqueta: "Blog" },
  ];

  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans text-tinta bg-fondo">
        <div className="mx-auto min-h-screen w-full max-w-[720px]">
          <header className="sticky top-0 z-20 bg-fondo">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <Link
                href="/"
                className="flex shrink-0 items-center gap-[6px] text-[13px] font-medium text-acento"
              >
                <Volleyball size={17} strokeWidth={1.75} />
                {NOMBRE_MARCA}
              </Link>
              <Link
                href="/alta"
                className="flex shrink-0 items-center gap-[5px] rounded-[7px] border border-borde-control px-[10px] py-[6px] text-[12.5px] text-tinta hover:border-tinta-3"
              >
                <Plus size={13} strokeWidth={1.75} />
                Añadir club
              </Link>
            </div>
            <Pestanas pestanas={pestanas} />
          </header>
          {children}
          <footer className="border-t border-borde px-4 py-5">
            <p className="text-[12.5px] leading-relaxed text-tinta-3">
              Información recopilada de fuentes públicas y de los propios
              clubes. Confirma siempre fecha y lugar antes de acudir.
            </p>
            <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px]">
              <Link href="/alta" className="text-tinta-2 underline underline-offset-2 decoration-borde-control hover:text-tinta">
                Dar de alta un club
              </Link>
              <Link href="/blog" className="text-tinta-2 underline underline-offset-2 decoration-borde-control hover:text-tinta">
                Blog
              </Link>
              <a
                href={URL_CANAL_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tinta-2 underline underline-offset-2 decoration-borde-control hover:text-tinta"
              >
                Canal de WhatsApp
              </a>
              <a
                href={URL_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tinta-2 underline underline-offset-2 decoration-borde-control hover:text-tinta"
              >
                Instagram
              </a>
              <Link href="/aviso-legal" className="text-tinta-2 underline underline-offset-2 decoration-borde-control hover:text-tinta">
                Aviso legal y privacidad
              </Link>
            </nav>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
