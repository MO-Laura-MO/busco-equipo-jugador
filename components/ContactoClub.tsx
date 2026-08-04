"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export default function ContactoClub({
  email,
  telefono,
}: {
  email: string;
  telefono: string;
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
