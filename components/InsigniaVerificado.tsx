"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";

/** Tic de "Verificado por el club": al tocarlo o pasar el ratón, muestra el texto. */
export default function InsigniaVerificado() {
  const [visible, setVisible] = useState(false);

  return (
    <span className="group relative inline-flex shrink-0">
      <span
        role="button"
        tabIndex={0}
        aria-label="Verificado por el club"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setVisible((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            setVisible((v) => !v);
          }
        }}
        onBlur={() => setVisible(false)}
        className="flex h-5 w-5 items-center justify-center rounded-full"
      >
        <BadgeCheck size={17} strokeWidth={2.5} className="fill-verificado text-white" />
      </span>
      <span
        className={`pointer-events-none absolute right-0 top-full z-10 mt-1 max-w-[min(220px,calc(100vw-32px))] whitespace-nowrap rounded-[6px] bg-tinta px-2 py-1 text-[11px] leading-none text-white transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100`}
      >
        Verificado por el club
      </span>
    </span>
  );
}
