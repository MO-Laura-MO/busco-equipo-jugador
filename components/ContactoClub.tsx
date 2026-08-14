"use client";

import { useState } from "react";
import { ClipboardList, Mail, Phone } from "lucide-react";
import type { ColoresClub } from "@/lib/color";

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
  colores,
}: {
  email: string;
  telefono: string;
  emailsExtra?: EmailExtra[];
  formularioUrl?: string;
  formularioNota?: string;
  colores?: ColoresClub | null;
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
        className={`rounded-[6px] px-4 py-[8px] text-[13.5px] font-medium hover:opacity-90 ${
          colores ? "" : "bg-acento text-white"
        }`}
        style={colores ? { backgroundColor: colores.acento, color: colores.textoBoton } : undefined}
      >
        {formularioUrl ? "Contacto e inscripción" : "Ver contacto"}
      </button>
    );
  }

  const textoBase = colores ? "text-white" : "text-tinta";
  const textoHover = colores ? "hover:text-white/80" : "hover:text-tinta-2";
  const textoSecundario = colores ? "text-white/60" : "text-tinta-3";
  const etiquetaFondo = colores ? "bg-white/15 text-white" : "bg-borde text-tinta-2";

  return (
    <div className="space-y-[6px]">
      {formularioUrl && (
        <div className="mb-[10px]">
          <a
            href={formularioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-[13.5px] font-medium hover:underline underline-offset-2 ${textoBase}`}
          >
            <ClipboardList size={15} strokeWidth={1.75} />
            Formulario de inscripción
          </a>
          {formularioNota && (
            <p
              className={`mt-[3px] pl-[23px] text-[12.5px] leading-relaxed ${
                colores ? "text-white/70" : "text-tinta-3"
              }`}
            >
              {formularioNota}
            </p>
          )}
        </div>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className={`flex items-center gap-2 text-[13.5px] ${textoBase} ${textoHover}`}
        >
          <Mail size={15} strokeWidth={1.75} className={textoSecundario} />
          {email}
        </a>
      )}
      {emailsExtra.map((e) => (
        <a
          key={e.email}
          href={`mailto:${e.email}`}
          className={`flex items-center gap-2 text-[13.5px] ${textoBase} ${textoHover}`}
        >
          <Mail size={15} strokeWidth={1.75} className={textoSecundario} />
          <span>
            {e.email}
            <span className={`ml-2 rounded-[4px] px-[6px] py-[2px] text-[11px] ${etiquetaFondo}`}>
              {e.etiqueta}
            </span>
          </span>
        </a>
      ))}
      {telefono && (
        <a
          href={`tel:${telefono.replace(/\s/g, "")}`}
          className={`flex items-center gap-2 text-[13.5px] ${textoBase} ${textoHover}`}
        >
          <Phone size={15} strokeWidth={1.75} className={textoSecundario} />
          {telefono}
        </a>
      )}
    </div>
  );
}
