import type { Metadata } from "next";
import ListadoBlog from "@/components/ListadoBlog";
import { ARTICULOS } from "@/lib/blog";

export const metadata: Metadata = {
  title: {
    absolute:
      "Blog de voleibol en Madrid: guías para familias, jugadores y entrenadores",
  },
  description:
    "Guías prácticas sobre el voleibol en Madrid: categorías por edad, cómo apuntarse a un club, cómo son las pruebas y qué hace falta para entrenar.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <main>
      <header className="px-4 pb-3 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">
          Blog de voleibol en Madrid
        </h1>
        <p className="mt-[2px] text-[13.5px] text-tinta-2">
          Guías prácticas para familias, jugadores y entrenadores.
        </p>
      </header>

      <ListadoBlog articulos={ARTICULOS} />
    </main>
  );
}
