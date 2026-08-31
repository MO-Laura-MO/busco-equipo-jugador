"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { URL_CANAL_WHATSAPP, URL_INSTAGRAM } from "@/lib/config";

const ENLACE =
  "rounded-[6px] px-3 py-[9px] text-[13.5px] text-acento hover:bg-acento-tinte";

export default function MenuSitio() {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // El blog, el canal y demás no viven en el nav de audiencias: sin este
  // menú, en páginas largas (el directorio, por ejemplo) el pie con esos
  // enlaces queda a un scroll larguísimo de distancia.
  useEffect(() => {
    if (!abierto) return;
    function alClicarFuera(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false);
    }
    document.addEventListener("mousedown", alClicarFuera);
    return () => document.removeEventListener("mousedown", alClicarFuera);
  }, [abierto]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={abierto}
        className="flex items-center justify-center border border-borde-control p-[7px] text-acento hover:border-tinta-3"
      >
        {abierto ? (
          <X size={16} strokeWidth={1.75} />
        ) : (
          <Menu size={16} strokeWidth={1.75} />
        )}
      </button>
      {abierto && (
        <nav className="absolute right-0 top-[calc(100%+6px)] z-30 flex w-[210px] flex-col gap-1 rounded-[8px] border border-borde-control bg-fondo p-2 shadow-lg">
          <Link href="/" onClick={() => setAbierto(false)} className={ENLACE}>
            Volver a inicio
          </Link>
          <Link href="/blog" onClick={() => setAbierto(false)} className={ENLACE}>
            Blog
          </Link>
          <Link href="/alta" onClick={() => setAbierto(false)} className={ENLACE}>
            Dar de alta un club
          </Link>
          <a
            href={URL_CANAL_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAbierto(false)}
            className={ENLACE}
          >
            Canal de WhatsApp
          </a>
          <a
            href={URL_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAbierto(false)}
            className={ENLACE}
          >
            Instagram
          </a>
        </nav>
      )}
    </div>
  );
}
