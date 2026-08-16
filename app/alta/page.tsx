import type { Metadata } from "next";
import {
  BadgeCheck,
  ClipboardList,
  ExternalLink,
  Megaphone,
  ShieldCheck,
  Users,
  Volleyball,
} from "lucide-react";
import { URL_FORMULARIO_ALTA } from "@/lib/config";

export const metadata: Metadata = {
  title: "Dar de alta un club",
  description:
    "Publica las pruebas de tu club de voleibol en el directorio de la Comunidad de Madrid. Alta gratuita a través de un formulario.",
};

const PASOS = [
  {
    titulo: "Rellena el formulario",
    texto: "Datos del club y de vuestras convocatorias. Cinco minutos.",
  },
  {
    titulo: "Lo revisamos a mano",
    texto: "Comprobamos cada alta antes de publicarla; puede tardar unos días.",
  },
  {
    titulo: "Publicado, gratis",
    texto:
      "Vuestra ficha, vuestras pruebas y vuestras vacantes, visibles para las familias y los entrenadores que buscan equipo.",
  },
];

const VENTAJAS = [
  {
    icono: Megaphone,
    texto:
      "Las familias que buscan “pruebas de voleibol” en tu zona te encuentran a ti.",
  },
  {
    icono: Users,
    texto:
      "¿Buscáis entrenador o entrenadora? Publicamos también vuestras vacantes, y quien busca equipo técnico las encuentra por categoría y por zona.",
  },
  {
    icono: BadgeCheck,
    texto:
      "Etiqueta “Verificado por el club” y difusión de tus convocatorias en nuestras redes.",
  },
  {
    icono: ShieldCheck,
    texto:
      "Solo publicamos datos de contacto de la entidad. Nunca información de jugadores ni de menores.",
  },
];

export default function Alta() {
  return (
    <main className="pb-8">
      <header className="relative overflow-hidden bg-acento px-4 pb-7 pt-6">
        <Volleyball
          size={150}
          strokeWidth={1.2}
          className="absolute -right-6 -top-6 text-white/10"
        />
        <p className="relative text-[11.5px] font-medium uppercase tracking-[0.18em] text-amarillo">
          Para clubes y escuelas
        </p>
        <h1 className="relative mt-2 text-[23px] font-medium leading-snug text-white">
          Añade tu club donde te están buscando
        </h1>
        <p className="relative mt-3 max-w-[520px] text-[13.5px] leading-relaxed text-white/85">
          Si tu club o escuela está en la Comunidad de Madrid, añádelo gratis:
          tendrá su perfil en voley.app y podrás publicar convocatorias de
          pruebas y vacantes de entrenador. Así, jugadores y entrenadores lo
          encontrarán fácilmente.
        </p>
        <a
          href={URL_FORMULARIO_ALTA}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-5 inline-flex items-center gap-2 rounded-[8px] bg-amarillo px-5 py-[11px] text-[14px] font-medium text-[#111827] hover:bg-amarillo/90"
        >
          <ClipboardList size={16} strokeWidth={1.75} />
          Ir al formulario de alta
          <ExternalLink size={14} strokeWidth={1.75} />
        </a>
      </header>

      <section className="px-4 pt-6">
        <h2 className="text-[15px] font-medium text-tinta">Cómo funciona</h2>
        <ol className="mt-3 space-y-3">
          {PASOS.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-acento-tinte text-[14px] font-medium text-acento">
                {i + 1}
              </span>
              <div>
                <p className="text-[14px] font-medium text-tinta">{p.titulo}</p>
                <p className="mt-[2px] text-[13px] leading-snug text-tinta-2">
                  {p.texto}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 border-t border-borde px-4 pt-5">
        <h2 className="text-[15px] font-medium text-tinta">
          Qué gana tu club
        </h2>
        <ul className="mt-3 space-y-3">
          {VENTAJAS.map((v, i) => (
            <li key={i} className="flex gap-3">
              <v.icono
                size={20}
                strokeWidth={1.75}
                className="mt-[2px] shrink-0 text-acento"
              />
              <p className="text-[13.5px] leading-relaxed text-tinta-2">
                {v.texto}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-4 mt-6 rounded-[10px] bg-barra px-4 py-3">
        <p className="text-[12.5px] leading-relaxed text-tinta-3">
          ¿Tu club ya está publicado y quieres corregir o añadir algo? Usa el
          enlace «¿Hay algún dato incorrecto?» de su ficha, o responde al
          formulario indicando que ya existís.
        </p>
      </div>
    </main>
  );
}
