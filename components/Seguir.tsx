import { Instagram, MessageCircle } from "lucide-react";
import { URL_CANAL_WHATSAPP, URL_INSTAGRAM } from "@/lib/config";

/**
 * Bloque para seguir el directorio por WhatsApp o Instagram.
 *
 * Se coloca donde alguien acaba de mirar convocatorias y puede no haber
 * encontrado la suya: al final de la portada, al final de la ficha de club y
 * al cerrar cada artículo del blog. El titular se puede ajustar al sitio con
 * la prop `titulo`.
 */
export default function Seguir({
  titulo = "Te avisamos de las nuevas pruebas",
  texto = "Publicamos cada convocatoria nueva en el canal de WhatsApp y en Instagram. Gratis, y puedes salir cuando quieras.",
}: {
  titulo?: string;
  texto?: string;
}) {
  return (
    <section className="border-t border-borde bg-barra px-4 py-5">
      <h2 className="text-[15px] font-medium text-tinta">{titulo}</h2>
      <p className="mt-1 max-w-[520px] text-[13px] leading-relaxed text-tinta-2">
        {texto}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <a
          href={URL_CANAL_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="seguir-whatsapp"
          className="flex items-center justify-center gap-2 rounded-[8px] bg-whatsapp px-4 py-[10px] text-[13.5px] font-medium text-[#111827] hover:opacity-90"
        >
          <MessageCircle size={16} strokeWidth={1.75} />
          Canal de WhatsApp
        </a>
        <a
          href={URL_INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="seguir-instagram"
          className="flex items-center justify-center gap-2 rounded-[8px] bg-instagram px-4 py-[10px] text-[13.5px] font-medium text-[#111827] hover:opacity-90"
        >
          <Instagram size={16} strokeWidth={1.75} />
          Instagram
        </a>
      </div>
    </section>
  );
}
