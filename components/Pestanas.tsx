"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Pestana {
  href: string;
  etiqueta: string;
}

export default function Pestanas({
  pestanas,
}: {
  pestanas: Pestana[];
}) {
  const pathname = usePathname();

  return (
    <nav className="sin-scrollbar flex items-center gap-4 overflow-x-auto border-b border-borde px-4 text-[13px]">
      {pestanas.map((p) => {
        const activa = p.href === "/" ? pathname === "/" : pathname.startsWith(p.href);
        return (
          <Link
            key={p.href}
            href={p.href}
            className={`shrink-0 border-b-2 py-[9px] ${
              activa
                ? "border-acento font-medium text-tinta"
                : "border-transparent text-tinta-2 hover:text-tinta"
            }`}
          >
            {p.etiqueta}
          </Link>
        );
      })}
    </nav>
  );
}
