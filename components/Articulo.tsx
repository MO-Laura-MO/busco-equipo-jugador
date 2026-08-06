import Link from "next/link";
import { ArrowLeft, Volleyball } from "lucide-react";
import { fechaLarga } from "@/lib/datos";

/**
 * Maqueta común de los artículos del blog: cabecera en azul de marca con
 * el hilo conductor amarillo, y prosa con los acentos del sitio.
 */
export default function Articulo({
  titulo,
  fecha,
  etiqueta = "Guía para familias",
  children,
}: {
  titulo: string;
  fecha: string;
  etiqueta?: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <article className="pb-8">
        <header className="relative overflow-hidden bg-acento px-4 pb-7 pt-5">
          <Volleyball
            size={150}
            strokeWidth={1.2}
            className="absolute -right-6 -top-6 text-white/10"
          />
          <Link
            href="/blog"
            className="relative mb-5 flex items-center gap-1 text-[12.5px] text-white/80 hover:text-white"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            Blog
          </Link>
          <p className="relative text-[11.5px] font-medium uppercase tracking-[0.18em] text-amarillo">
            {etiqueta}
          </p>
          <h1 className="relative mt-2 max-w-[560px] text-[23px] font-medium leading-snug text-white">
            {titulo}
          </h1>
          <p className="relative mt-3 text-[12.5px] text-white/70">
            voley.app · {fechaLarga(fecha)}
          </p>
        </header>
        <div className="prose-voley mt-5 px-4">{children}</div>
      </article>
    </main>
  );
}
