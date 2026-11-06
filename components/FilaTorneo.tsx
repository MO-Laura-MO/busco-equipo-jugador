import { CalendarClock, ExternalLink, MapPin, Users } from "lucide-react";
import {
  Torneo,
  columnaFecha,
  estadoInscripcion,
  textoCategorias,
  textoFecha,
} from "@/lib/torneos";

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

export default function FilaTorneo({ t, hoy, celebrado = false }: { t: Torneo; hoy: string; celebrado?: boolean }) {
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
          <p className="mt-[2px] text-[12.5px] leading-snug text-tinta-2">
            {categorias || "Categorías por confirmar"}
          </p>
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

