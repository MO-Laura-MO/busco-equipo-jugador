import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EMAIL_CORRECCIONES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Aviso legal y privacidad",
  description:
    "Aviso legal, política de privacidad y condiciones de uso del directorio de pruebas de voleibol base de la Comunidad de Madrid.",
};

export default function AvisoLegal() {
  return (
    <main className="px-4 pb-8 pt-5">
      <Link
        href="/"
        className="mb-4 flex items-center gap-1 text-[12.5px] text-tinta-2 hover:text-tinta"
      >
        <ArrowLeft size={14} strokeWidth={1.75} />
        Todas las convocatorias
      </Link>

      <h1 className="text-[19px] font-medium text-tinta">
        Aviso legal y privacidad
      </h1>

      <div className="mt-4 space-y-6 text-[13.5px] leading-relaxed text-tinta-2">
        <section>
          <h2 className="mb-2 text-[15px] font-medium text-tinta">Qué es esta web</h2>
          <p>
            Este sitio es un directorio informativo de convocatorias de pruebas
            de voleibol de categorías base en la Comunidad de Madrid. Su único
            fin es poner en contacto a familias y jugadores con los clubes. No
            gestionamos inscripciones, no cobramos a nadie y no intermediamos
            en la relación entre el club y las familias: el contacto se produce
            siempre fuera de esta web, con los datos públicos del club.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[15px] font-medium text-tinta">
            Exactitud de la información
          </h2>
          <p>
            La información se recopila de fuentes públicas y de los propios
            clubes, y puede contener errores o quedar desactualizada. Las
            fechas, horarios y lugares publicados son orientativos:{" "}
            <span className="text-tinta">
              confirma siempre con el club antes de acudir a una prueba
            </span>
            . Cada ficha indica su fecha de última actualización y un enlace
            para avisarnos de datos incorrectos.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[15px] font-medium text-tinta">
            Datos personales
          </h2>
          <p>
            Esta web no tiene registro de usuarios, no publica perfiles de
            jugadores y no trata datos de menores. Los únicos datos publicados
            son los de contacto de los clubes como entidades (email y teléfono
            de contacto general), facilitados por ellos mismos o disponibles
            públicamente. La navegación es totalmente pública y no requiere
            identificarse.
          </p>
          <p className="mt-2">
            Si representas a un club y quieres modificar o retirar tus datos,
            escribe a{" "}
            <a
              href={`mailto:${EMAIL_CORRECCIONES}`}
              className="underline underline-offset-2 decoration-borde-control hover:text-tinta"
            >
              {EMAIL_CORRECCIONES}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[15px] font-medium text-tinta">Cookies</h2>
          <p>
            Esta web no usa cookies propias ni de terceros con fines
            publicitarios o de seguimiento.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[15px] font-medium text-tinta">Titularidad</h2>
          <p>
            Proyecto independiente y sin ánimo comercial, sin relación con la
            Federación Madrileña de Voleibol ni con ninguna otra entidad
            deportiva. Los nombres y logotipos de los clubes pertenecen a sus
            titulares y se muestran con fines exclusivamente informativos.
          </p>
        </section>
      </div>
    </main>
  );
}
