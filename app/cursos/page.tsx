import type { Metadata } from "next";
import { EMAIL_CORRECCIONES } from "@/lib/config";

export const metadata: Metadata = {
  title: { absolute: "Cursos para entrenadores de voleibol en Madrid" },
  description:
    "Próximamente: cursos y formación para entrenadores y entrenadoras de voleibol en la Comunidad de Madrid.",
  alternates: { canonical: "/cursos" },
  // Sin contenido real todavía, no la indexamos.
  robots: { index: false },
};

export default function Cursos() {
  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Cursos para entrenadores</h1>
        <p className="mt-[2px] text-[13.5px] text-tinta-2">
          Estamos calentando para el partido: aquí encontrarás cursos y
          formación para entrenadores y entrenadoras de voleibol en Madrid.
        </p>
        <p className="mt-3 text-[13.5px] text-tinta-2">
          ¿Tienes un curso que publicar o alguna idea? Escríbenos a{" "}
          <a
            href={`mailto:${EMAIL_CORRECCIONES}`}
            className="text-acento underline underline-offset-2"
          >
            {EMAIL_CORRECCIONES}
          </a>
          .
        </p>
      </header>
    </main>
  );
}
