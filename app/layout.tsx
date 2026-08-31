import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import Link from "next/link";
import Script from "next/script";
import { Volleyball } from "lucide-react";
import NavAudiencias from "@/components/NavAudiencias";
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
  // Sin title/description propios: la miniatura es común y el texto del
  // enlace lo hereda cada página del suyo.
  openGraph: {
    siteName: "voley.app",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "voley.app · Pruebas de voleibol en la Comunidad de Madrid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
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
          <header className="flex items-center justify-between gap-3 border-b border-borde bg-barra px-4 py-3">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-[6px] text-[16px] font-medium text-tinta"
            >
              <Volleyball size={18} strokeWidth={1.75} className="text-acento" />
              {NOMBRE_MARCA}
            </Link>
            <Link
              href="/alta"
              className="shrink-0 border border-borde-control px-[10px] py-[5px] text-[13px] text-acento hover:border-tinta-3"
            >
              Añadir club
            </Link>
          </header>
          {/* Fuera del <header>, a propósito: el nav sticky necesita que su
              contenedor abarque toda la página para poder quedar fijo al
              hacer scroll; dentro del header (~44px) se saldría de pantalla
              en cuanto se superase esa altura. */}
          <NavAudiencias hayVacantes={hayVacantes} />
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
        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id="479e677a-8d57-4b2b-a1a0-dc47acda684c"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
