"use client";

import { useState } from "react";
import { ClipboardList, Mail, Phone } from "lucide-react";

export interface EmailExtra {
  etiqueta: string;
  email: string;
}

export default function ContactoClub({
  email,
  telefono,
  emailsExtra = [],
  formularioUrl,
  formularioNota,
}: {
  email: string;
  telefono: string;
  emailsExtra?: EmailExtra[];
  formularioUrl?: string;
  formularioNota?: string;
}) {
  const [visible, setVisible] = useState(false);

  // Sin ningún dato de contacto no se muestra el botón: pulsarlo no revelaría
  // nada. En esos clubes la vía de contacto son sus redes, ya visibles arriba.
  if (!email && !telefono && emailsExtra.length === 0 && !formularioUrl)
    return null;

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="rounded-[6px] bg-acento-claro px-4 py-[8px] text-[13.5px] font-medium text-acento hover:opacity-90"
      >
        {formularioUrl ? "Contacto e inscripción" : "Ver contacto"}
      </button>
    );
  }

  return (
    <div className="space-y-[6px]">
      {formularioUrl && (
        <div className="mb-[10px]">
          <a
            href={formularioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13.5px] font-medium text-white hover:underline underline-offset-2"
          >
            <ClipboardList size={15} strokeWidth={1.75} />
            Formulario de inscripción
          </a>
          {formularioNota && (
            <p className="mt-[3px] pl-[23px] text-[12.5px] leading-relaxed text-white/70">
              {formularioNota}
            </p>
          )}
        </div>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-[13.5px] text-white hover:text-white/80"
        >
          <Mail size={15} strokeWidth={1.75} className="text-white/60" />
          {email}
        </a>
      )}
      {emailsExtra.map((e) => (
        <a
          key={e.email}
          href={`mailto:${e.email}`}
          className="flex items-center gap-2 text-[13.5px] text-white hover:text-white/80"
        >
          <Mail size={15} strokeWidth={1.75} className="text-white/60" />
          <span>
            {e.email}
            <span className="ml-2 rounded-[4px] bg-white/15 px-[6px] py-[2px] text-[11px] text-white">
              {e.etiqueta}
            </span>
          </span>
        </a>
      ))}
      {telefono && (
        <a
          href={`tel:${telefono.replace(/\s/g, "")}`}
          className="flex items-center gap-2 text-[13.5px] text-white hover:text-white/80"
        >
          <Phone size={15} strokeWidth={1.75} className="text-white/60" />
          {telefono}
        </a>
      )}
    </div>
  );
}
