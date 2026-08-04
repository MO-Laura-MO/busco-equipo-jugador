import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
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
  metadataBase: new URL("https://pruebas-voleibol-madrid.vercel.app"),
  title: {
    default: "Pruebas de voleibol · Madrid",
    template: "%s · Pruebas de voleibol Madrid",
  },
  description:
    "Directorio de convocatorias de pruebas de voleibol base en la Comunidad de Madrid. Busca por categoría, sexo, zona y mes, y contacta directamente con el club.",
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
              <Link href="/aviso-legal" className="text-tinta-2 underline underline-offset-2 decoration-borde-control hover:text-tinta">
                Aviso legal y privacidad
              </Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
