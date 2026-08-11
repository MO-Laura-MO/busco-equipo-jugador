"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export interface EmailExtra {
  etiqueta: string;
  email: string;
}

export default function ContactoClub({
  email,
  telefono,
  emailsExtra = [],
}: {
  email: string;
  telefono: string;
  emailsExtra?: EmailExtra[];
}) {
  const [visible, setVisible] = useState(false);

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="rounded-[6px] bg-acento px-4 py-[8px] text-[13.5px] font-medium text-white hover:opacity-90"
      >
        Ver contacto
      </button>
    );
  }

  return (
    <div className="space-y-[6px]">
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-[13.5px] text-tinta hover:text-acento"
        >
          <Mail size={15} strokeWidth={1.75} className="text-tinta-3" />
          {email}
        </a>
      )}
      {emailsExtra.map((e) => (
        <a
          key={e.email}
          href={`mailto:${e.email}`}
          className="flex items-center gap-2 text-[13.5px] text-tinta hover:text-acento"
        >
          <Mail size={15} strokeWidth={1.75} className="text-tinta-3" />
          <span>
            {e.email}
            <span className="ml-2 rounded-[4px] bg-acento-tinte px-[6px] py-[2px] text-[11px] text-acento">
              {e.etiqueta}
            </span>
          </span>
        </a>
      ))}
      {telefono && (
        <a
          href={`tel:${telefono.replace(/\s/g, "")}`}
          className="flex items-center gap-2 text-[13.5px] text-tinta hover:text-acento"
        >
          <Phone size={15} strokeWidth={1.75} className="text-tinta-3" />
          {telefono}
        </a>
      )}
    </div>
  );
}
