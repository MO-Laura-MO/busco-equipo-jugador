import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Amistosos entre clubes de voleibol en Madrid" },
  description:
    "Clubes de voleibol de Madrid que buscan jugar partidos amistosos con otros clubes.",
  alternates: { canonical: "/amistosos" },
  // Sin listado real todavía, no la indexamos.
  robots: { index: false },
};

export default function Amistosos() {
  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Amistosos entre clubes</h1>
        <p className="mt-[2px] text-[13.5px] text-tinta-2">
          Estamos calentando... atent@ que empieza el partido en breve!
        </p>
      </header>
    </main>
  );
}
