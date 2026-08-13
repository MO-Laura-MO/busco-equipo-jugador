import type { Metadata } from "next";
import Link from "next/link";
import { Volleyball } from "lucide-react";
import { ARTICULOS } from "@/lib/blog";
import { fechaLarga } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Blog — guías de voleibol para familias y jugadores",
  description:
    "Guías prácticas sobre el voleibol base en Madrid: categorías por edad, cómo apuntarse a un club, cómo son las pruebas y más.",
};

export default function Blog() {
  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Blog</h1>
        <p className="mt-[2px] text-[13.5px] text-tinta-2">
          Guías prácticas para familias y jugadores de voleibol.
        </p>
      </header>
      <ul className="space-y-4 px-4 pb-6">
        {ARTICULOS.map((a, i) => {
          const azul = i % 2 === 0;
          return (
            <li key={a.slug}>
              <Link
                href={`/blog/${a.slug}`}
                className="block overflow-hidden rounded-[12px] border border-borde-fila shadow-[0_1px_3px_rgba(17,24,39,0.09)]"
              >
                <div
                  className={`relative overflow-hidden px-4 pb-5 pt-4 ${
                    azul ? "bg-acento" : "bg-amarillo"
                  }`}
                >
                  <Volleyball
                    size={110}
                    strokeWidth={1.2}
                    className={`absolute -right-5 -top-5 ${
                      azul ? "text-white/10" : "text-acento/15"
                    }`}
                  />
                  <p
                    className={`relative text-[11px] font-medium uppercase tracking-[0.18em] ${
                      azul ? "text-amarillo" : "text-acento"
                    }`}
                  >
                    {a.etiqueta ?? "Guía para familias"}
                  </p>
                  <h2
                    className={`relative mt-2 max-w-[520px] text-[17px] font-medium leading-snug ${
                      azul ? "text-white" : "text-[#111827]"
                    }`}
                  >
                    {a.titulo}
                  </h2>
                </div>
                <div className="bg-fondo px-4 py-3">
                  <p className="text-[13px] leading-snug text-tinta-2">
                    {a.descripcion}
                  </p>
                  <p className="mt-[6px] text-[12px] text-tinta-3">
                    {fechaLarga(a.fecha)} · leer en 4 min
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
