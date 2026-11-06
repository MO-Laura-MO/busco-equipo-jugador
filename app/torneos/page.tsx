import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, ExternalLink, Info, MapPin, Users } from "lucide-react";
import Actualizado from "@/components/Actualizado";
import { EMAIL_CORRECCIONES } from "@/lib/config";
import {
  Torneo,
  columnaFecha,
  estadoInscripcion,
  separarTorneos,
  textoCategorias,
  textoFecha,
  ultimaActualizacionTorneos,
} from "@/lib/torneos";

export const metadata: Metadata = {
  title: { absolute: "Torneos de voleibol base 2026-27: Copa de España y torneos para clubes" },
  description:
    "Copa de España, MADCUP, ZGZ Volley Cup, Espinho y otros torneos de voleibol base a los que pueden apuntarse los clubes esta temporada: fechas, sedes, categorías e inscripción.",
  alternates: { canonical: "/torneos" },
};

// La etiqueta de inscripción depende del día: se recalcula cada hora.
export const revalidate = 3600;

function Etiqueta({ texto, tono }: { texto: string; tono: "azul" | "gris" }) {
  const clases = tono === "azul" ? "bg-azul-tinte text-azul" : "bg-gris-tinte text-gris-etiqueta";
  return (
    <span className={`inline-block rounded-[5px] px-[8px] py-[3px] text-[11.5px] leading-[1.3] ${clases}`}>
      {texto}
    </span>
  );
}

function fechaCorta(iso: string): string {
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const [, m, d] = iso.split("-").map(Number);
  return `${d} de ${meses[m - 1]}`;
}

function FilaTorneo({ t, hoy, celebrado = false }: { t: Torneo; hoy: string; celebrado?: boolean }) {
  const col = columnaFecha(t);
  const categorias = textoCategorias(t);
  const inscripcion = celebrado ? null : estadoInscripcion(t, hoy);

  const etiquetas: { texto: string; tono: "azul" | "gris" }[] = [];
  if (inscripcion === "abierta") {
    etiquetas.push({
      texto: t.inscripcionHasta
        ? `Inscripción hasta el ${fechaCorta(t.inscripcionHasta)}`
        : "Inscripción abierta",
      tono: "azul",
    });
  }
  if (inscripcion === "cerrada") etiquetas.push({ texto: "Inscripción cerrada", tono: "gris" });
  if (!celebrado && t.tipoFecha === "mes") etiquetas.push({ texto: "Fechas por confirmar", tono: "gris" });
  if (t.pais !== "España") etiquetas.push({ texto: `En ${t.pais}`, tono: "gris" });

  return (
    <li className="border-b border-borde-fila last:border-b-0">
      <div className="flex gap-3 px-4 py-[14px]">
        <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
          {col.dia ? (
            <>
              <span className="text-[22px] font-medium leading-[1.15] text-tinta">{col.dia}</span>
              <span className="text-[11px] leading-[1.4] text-tinta-3">{col.mes}</span>
            </>
          ) : (
            <>
              <span className="text-[11px] uppercase leading-[1.4] text-tinta-3">{col.mes}</span>
              <CalendarClock size={17} className="mt-[4px] text-tinta-3" strokeWidth={1.75} />
            </>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`text-[15px] font-medium leading-snug ${celebrado ? "text-tinta-2" : "text-tinta"}`}>
            {t.nombre}
          </h3>
          <p className="mt-[2px] text-[13.5px] leading-snug text-tinta-2">{textoFecha(t)}</p>
          {categorias && (
            <p className="mt-[2px] text-[12.5px] leading-snug text-tinta-2">{categorias}</p>
          )}
          <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
            <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
            <span>{t.lugar}</span>
          </p>
          <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] leading-snug text-tinta-3">
            <Users size={13} strokeWidth={1.75} className="shrink-0" />
            <span>Organiza: {t.organizador}</span>
          </p>
          {!celebrado && t.inscripcion && (
            <p className="mt-[6px] text-[12.5px] leading-relaxed text-tinta-2">{t.inscripcion}</p>
          )}
          {!celebrado && t.notas && (
            <p className="mt-[4px] text-[12.5px] leading-relaxed text-tinta-3">{t.notas}</p>
          )}
          {etiquetas.length > 0 && (
            <div className="mt-[7px] flex flex-wrap gap-[6px]">
              {etiquetas.map((e) => (
                <Etiqueta key={e.texto} texto={e.texto} tono={e.tono} />
              ))}
            </div>
          )}
          {!celebrado && (
            <a
              href={t.web}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[10px] inline-flex items-center gap-[5px] rounded-[6px] bg-acento px-3 py-[7px] text-[12.5px] font-medium text-white"
            >
              Web del organizador
              <ExternalLink size={13} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Torneos() {
  const hoy = new Date().toISOString().slice(0, 10);
  const { proximos, celebrados } = separarTorneos(hoy);

  return (
    <main>
      <header className="px-4 pb-4 pt-5">
        <h1 className="text-[19px] font-medium text-tinta">Torneos de voleibol base</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-tinta-2">
          Copas y torneos a los que cualquier club puede apuntarse esta temporada, en Madrid,
          en el resto de España y alguno fuera. Los iremos ampliando a medida que se publiquen.
        </p>
        <div className="mt-3 flex items-start gap-[10px] rounded-[8px] bg-ambar-tinte px-3 py-[10px]">
          <Info size={16} strokeWidth={1.75} className="mt-[1px] shrink-0 text-ambar" />
          <p className="text-[12.5px] leading-relaxed text-ambar">
            Información recopilada de fuentes públicas. Confirma siempre fechas, categorías y
            plazos de inscripción en la web del organizador.
          </p>
        </div>
      </header>

      <section>
        <h2 className="border-t border-borde bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
          {proximos.length === 1 ? "1 torneo próximo" : `${proximos.length} torneos próximos`}
        </h2>
        <ul>
          {proximos.map((t) => (
            <FilaTorneo key={t.id} t={t} hoy={hoy} />
          ))}
        </ul>
      </section>

      {celebrados.length > 0 && (
        <section>
          <h2 className="border-t border-borde bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
            Ya celebrados esta temporada
          </h2>
          <ul>
            {celebrados.map((t) => (
              <FilaTorneo key={t.id} t={t} hoy={hoy} celebrado />
            ))}
          </ul>
        </section>
      )}

      <div className="border-t border-borde bg-barra px-4 py-4">
        <p className="text-[13px] leading-relaxed text-tinta-2">
          ¿Organizas un torneo de voleibol base o falta alguno?{" "}
          <a
            href={`mailto:${EMAIL_CORRECCIONES}?subject=Torneo para voley.app`}
            className="text-acento underline underline-offset-2"
          >
            Escríbenos
          </a>{" "}
          y lo añadimos. Para la Copa de España, tienes los detalles en{" "}
          <Link href="/blog/copa-de-espana-voleibol-2026" className="text-acento underline underline-offset-2">
            nuestro artículo
          </Link>
          .
        </p>
      </div>

      <Actualizado fecha={ultimaActualizacionTorneos()} />
      <p className="px-4 pb-3 text-[12.5px] text-tinta-3">
        ¿Hay algún dato incorrecto?{" "}
        <a
          href={`mailto:${EMAIL_CORRECCIONES}?subject=Corrección de datos: Torneos`}
          className="text-acento underline"
        >
          Escríbenos
        </a>
        .
      </p>
    </main>
  );
}
