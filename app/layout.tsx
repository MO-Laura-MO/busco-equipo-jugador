import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import Link from "next/link";
import { Volleyball } from "lucide-react";
import {
  AMBITO,
  NOMBRE_AMBITO_LARGO,
  NOMBRE_MARCA,
  TITULO_SITIO,
  URL_SITIO,
} from "@/lib/config";
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
    template: `%s · Pruebas de voleibol ${AMBITO}`,
  },
  description: `Directorio de convocatorias de pruebas de voleibol base en ${NOMBRE_AMBITO_LARGO}. Busca por categoría, sexo, zona y mes, y contacta directamente con el club.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans text-tinta bg-fondo">
        <div className="mx-auto min-h-screen w-full max-w-[720px]">
          <header className="flex items-center justify-between gap-3 border-b border-borde px-4 py-3">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-[6px] text-[13px] font-medium text-acento"
            >
              <Volleyball size={17} strokeWidth={1.75} />
              {NOMBRE_MARCA}
            </Link>
            <nav className="sin-scrollbar flex items-center gap-3 overflow-x-auto text-[13px]">
              <Link href="/#convocatorias" className="shrink-0 text-tinta-2 hover:text-tinta">
                Pruebas
              </Link>
              <Link href="/clubes" className="shrink-0 text-tinta-2 hover:text-tinta">
                Clubes
              </Link>
              <Link href="/alta" className="shrink-0 text-tinta-2 hover:text-tinta">
                Soy un club
              </Link>
              <Link href="/blog" className="shrink-0 text-tinta-2 hover:text-tinta">
                Blog
              </Link>
            </nav>
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
