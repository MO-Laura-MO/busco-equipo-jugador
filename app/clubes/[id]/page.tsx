import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarClock,
  Clock,
  Facebook,
  Globe,
  Instagram,
  Link2,
  MapPin,
  RefreshCw,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import ContactoClub from "@/components/ContactoClub";
import EtiquetaEstado from "@/components/EtiquetaEstado";
import {
  Convocatoria,
  TipoRed,
  ZONAS,
  clubPorId,
  clubes,
  convocatoriasDeClub,
  etiquetaCategoria,
  etiquetaSexo,
  etiquetasConvocatoria,
  fechaLarga,
  partesFecha,
  textoAnios,
} from "@/lib/datos";
import { EMAIL_CORRECCIONES, URL_SITIO } from "@/lib/config";

export function generateStaticParams() {
  return clubes.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const club = clubPorId(id);
  if (!club) return {};
  return {
    title: `${club.nombre} — pruebas de voleibol en ${club.municipio}`,
    description: `Convocatorias de pruebas de voleibol de ${club.nombre} (${club.municipio}). Categorías, fechas, pabellón y contacto del club.`,
  };
}

const ICONO_RED: Record<TipoRed, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  x: Twitter,
  tiktok: Link2,
  otra: Link2,
};

const NOMBRE_RED: Record<TipoRed, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
  tiktok: "TikTok",
  otra: "Web",
};

function FechaConvocatoria({ c }: { c: Convocatoria }) {
  const { diaSemana, dia, mes } = partesFecha(c);
  if (c.tipoFecha === "abierta") {
    return (
      <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
        <RefreshCw size={17} className="mt-[8px] text-acento" strokeWidth={1.75} />
      </div>
    );
  }
  if (c.tipoFecha === "mes") {
    return (
      <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
        <span className="text-[11px] uppercase leading-[1.4] text-tinta-3">{mes}</span>
        <CalendarClock size={17} className="mt-[4px] text-tinta-3" strokeWidth={1.75} />
      </div>
    );
  }

  if (c.tipoFecha === "por-confirmar") {
    return (
      <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
        <CalendarClock size={17} className="mt-[8px] text-tinta-3" strokeWidth={1.75} />
      </div>
    );
  }
  return (
    <div className="flex w-[46px] shrink-0 flex-col items-center pt-[3px]">
      <span className="text-[11px] uppercase leading-[1.4] text-tinta-3">{diaSemana}</span>
      <span className="text-[22px] font-medium leading-[1.15] text-tinta">{dia}</span>
      <span className="text-[11px] leading-[1.4] text-tinta-3">{mes}</span>
    </div>
  );
}

export default async function FichaClub({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const club = clubPorId(id);
  if (!club) notFound();

  const lista = convocatoriasDeClub(club.id);
  const zona = ZONAS.find((z) => z.valor === club.zona)?.etiqueta ?? club.zona;

  const eventosJsonLd = lista
    .filter((c) => c.tipoFecha === "exacta" && c.fecha)
    .map((c) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: `Prueba de voleibol ${etiquetaCategoria(c.categoria).toLowerCase()} ${etiquetaSexo(c.sexo).toLowerCase()} — ${club.nombre}`,
      startDate: c.hora ? `${c.fecha}T${c.hora}:00+02:00` : c.fecha,
      eventStatus:
        c.estadoFecha === "confirmada"
          ? "https://schema.org/EventScheduled"
          : "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: c.pabellon || club.municipio,
        address: c.direccion || club.municipio,
      },
      organizer: { "@type": "SportsOrganization", name: club.nombre },
      url: `${URL_SITIO}/clubes/${club.id}`,
    }));

  return (
    <main>
      {eventosJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventosJsonLd) }}
        />
      )}

      <header className="px-4 pb-4 pt-5">
        <Link
          href="/"
          className="mb-4 flex items-center gap-1 text-[12.5px] text-tinta-2 hover:text-tinta"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          Todas las convocatorias
        </Link>
        <h1 className="text-[19px] font-medium text-tinta">{club.nombre}</h1>
        <p className="mt-[2px] flex items-center gap-[5px] text-[13.5px] text-tinta-2">
          <MapPin size={14} strokeWidth={1.75} className="text-tinta-3" />
          {club.municipio} · zona {zona.toLowerCase()}
        </p>
        {club.descripcion && (
          <p className="mt-3 text-[13.5px] leading-relaxed text-tinta-2">
            {club.descripcion}
          </p>
        )}

        {club.buscaEntrenador && (
          <div className="mt-3 rounded-[6px] bg-acento-tinte px-3 py-[9px]">
            <p className="flex items-center gap-[6px] text-[13px] font-medium text-acento">
              <Users size={14} strokeWidth={1.75} className="shrink-0" />
              Este club busca entrenador
            </p>
            {club.notasEntrenador && (
              <p className="mt-[3px] text-[12.5px] leading-relaxed text-tinta-2">
                {club.notasEntrenador}
              </p>
            )}
          </div>
        )}

        {(club.web || club.redes.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {club.web && (
              <a
                href={club.web}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[5px] text-[12.5px] text-tinta-2 hover:text-acento"
              >
                <Globe size={14} strokeWidth={1.75} />
                Web
              </a>
            )}
            {club.redes.map((r) => {
              const Icono = ICONO_RED[r.tipo];
              return (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-[5px] text-[12.5px] text-tinta-2 hover:text-acento"
                >
                  <Icono size={14} strokeWidth={1.75} />
                  {NOMBRE_RED[r.tipo]}
                </a>
              );
            })}
          </div>
        )}

        <div className="mt-4">
          <ContactoClub
            email={club.email}
            telefono={club.telefono}
            emailsExtra={club.emailsExtra}
          />
        </div>
      </header>

      <section>
        <h2 className="bg-barra px-4 py-[9px] text-[12.5px] text-tinta-2">
          {lista.length === 1
            ? "1 convocatoria"
            : `${lista.length} convocatorias`}
        </h2>
        {lista.length === 0 && (
          <p className="px-4 py-6 text-[13px] leading-relaxed text-tinta-3">
            Este club todavía no tiene convocatorias publicadas en voley.app.
            Contacta directamente con el club para preguntar por pruebas, o si
            eres del club,{" "}
            <Link
              href="/alta"
              className="text-acento underline underline-offset-2 decoration-acento/40 hover:decoration-acento"
            >
              publícalas gratis aquí
            </Link>
            .
          </p>
        )}
        {lista.map((c, i) => {
          const etiquetas = etiquetasConvocatoria(c);
          const anios = textoAnios(c);
          const linea = [
            `${etiquetaCategoria(c.categoria)} ${etiquetaSexo(c.sexo).toLowerCase()}`,
            c.nivel || null,
          ]
            .filter(Boolean)
            .join(" · ");
          return (
            <article
              key={i}
              className="border-b border-borde-fila px-4 py-[14px] last:border-b-0"
            >
              <div className="flex gap-3">
                <FechaConvocatoria c={c} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-medium leading-snug text-tinta">
                    {linea}
                  </h3>
                  {anios && (
                    <p className="mt-[2px] text-[12.5px] leading-snug text-tinta-2">
                      {anios}
                    </p>
                  )}
                  {c.temporada && (
                    <p className="mt-[2px] text-[12.5px] text-tinta-3">
                      Temporada {c.temporada}
                    </p>
                  )}
                  {c.hora && (
                    <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] text-tinta-3">
                      <Clock size={13} strokeWidth={1.75} />
                      {c.hora} h
                    </p>
                  )}
                  {c.pabellon && (
                    <p className="mt-[3px] flex items-center gap-[5px] text-[12.5px] text-tinta-3">
                      <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
                      {c.mapsUrl ? (
                        <a
                          href={c.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 decoration-borde-control hover:text-acento"
                        >
                          {c.pabellon}
                          {c.direccion ? ` · ${c.direccion}` : ""}
                        </a>
                      ) : (
                        <span>
                          {c.pabellon}
                          {c.direccion ? ` · ${c.direccion}` : ""}
                        </span>
                      )}
                    </p>
                  )}
                  {c.cuotaOrientativa && (
                    <p className="mt-[3px] text-[12.5px] text-tinta-3">
                      Cuota orientativa: {c.cuotaOrientativa}
                    </p>
                  )}
                  {c.avisoPrevio && (
                    <p className="mt-[3px] text-[12.5px] text-tinta-3">
                      Hay que avisar al club antes de acudir.
                    </p>
                  )}
                  {c.notas && (
                    <p className="mt-[6px] text-[12.5px] leading-relaxed text-tinta-2">
                      {c.notas}
                    </p>
                  )}
                  {etiquetas.length > 0 && (
                    <div className="mt-[7px] flex flex-wrap gap-[6px]">
                      {etiquetas.map((e) => (
                        <EtiquetaEstado key={e} estado={e} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div className="border-t border-borde px-4 py-4">
        <p className="text-[12.5px] text-tinta-3">
          Última actualización: {fechaLarga(club.fechaActualizacion)}
        </p>
        <a
          href={`mailto:${EMAIL_CORRECCIONES}?subject=Corrección de datos: ${club.nombre}`}
          className="mt-1 inline-block text-[12.5px] text-tinta-2 underline underline-offset-2 decoration-borde-control hover:text-tinta"
        >
          ¿Hay algún dato incorrecto?
        </a>
      </div>
    </main>
  );
}
