"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Seccion {
  label: string;
  href: string;
}

interface Audiencia {
  id: string;
  nombre: string; // minúscula, para "soy {nombre}"
  nombreCorto: string; // sustantivo capitalizado, para la fila comprimida
  href: string;
  prefijos: string[]; // prefijos de ruta que cuentan como esta audiencia activa
  secciones: Seccion[]; // subnav; "Directorio" va siempre el primero, en las tres
  visible: boolean;
}

// Presente en el subnav de las tres audiencias, siempre en primer lugar: el
// directorio de clubes no cambia aunque se cambie de pestaña (pedido
// explícito, ya especificado en Design).
const DIRECTORIO: Seccion = { label: "Directorio", href: "/clubes" };

function coincide(pathname: string, prefijo: string): boolean {
  return pathname === prefijo || pathname.startsWith(prefijo + "/");
}

export default function NavAudiencias({ hayVacantes }: { hayVacantes: boolean }) {
  const pathname = usePathname();
  const [compacta, setCompacta] = useState(false);

  // La forma de dos líneas es el estado por defecto en cualquier carga de página.
  useEffect(() => {
    setCompacta(false);
  }, [pathname]);

  useEffect(() => {
    let pendiente = false;
    function onScroll() {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setCompacta((actual) => {
          if (!actual && y > 64) return true;
          if (actual && y < 16) return false;
          return actual;
        });
        pendiente = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const audiencias: Audiencia[] = [
    {
      id: "jugador",
      nombre: "jugador",
      nombreCorto: "Jugador",
      href: "/pruebas",
      prefijos: ["/pruebas"],
      secciones: [DIRECTORIO, { label: "Pruebas", href: "/pruebas" }],
      visible: true,
    },
    {
      id: "entrenador",
      nombre: "entrenador",
      nombreCorto: "Entrenador",
      href: "/entrenadores",
      prefijos: ["/entrenadores", "/cursos"],
      secciones: [
        DIRECTORIO,
        { label: "Vacantes", href: "/entrenadores" },
        { label: "Cursos", href: "/cursos" },
      ],
      visible: hayVacantes,
    },
    {
      id: "un-club",
      nombre: "un club",
      nombreCorto: "Club",
      href: "/clubes",
      prefijos: ["/clubes", "/alta", "/amistosos"],
      secciones: [DIRECTORIO, { label: "Amistosos", href: "/amistosos" }],
      visible: true,
    },
    // "árbitro", "afición" y "campeonatos" no se pintan: sin contenido todavía.
  ];

  const visibles = audiencias.filter((a) => a.visible);
  const activa = visibles.find((a) =>
    pathname === "/" ? a.id === "jugador" : a.prefijos.some((p) => coincide(pathname, p))
  );
  // La portada no lleva subnav ni título: ese contexto es propio de estar
  // dentro de la sección, no de la home (así lo marca la referencia).
  const dentroDeSeccion = pathname !== "/";

  return (
    <div className="sticky top-0 z-20 bg-fondo">
      {!compacta ? (
        <nav className="flex gap-[18px] border-b border-borde px-4">
          {visibles.map((a) => {
            const on = a === activa;
            return (
              <Link
                key={a.id}
                href={a.href}
                className={`inline-block shrink-0 py-2 pb-[9px] ${
                  on ? "-mb-px border-b-2 border-acento" : ""
                }`}
              >
                <span
                  className={`hidden min-[720px]:block whitespace-nowrap text-[14px] leading-[1.25] ${
                    on ? "font-medium text-tinta" : "text-tinta-2"
                  }`}
                >
                  Soy {a.nombre}
                </span>
                <span className="block min-[720px]:hidden whitespace-nowrap text-[11px] leading-[1.3] text-tinta-3">
                  soy
                </span>
                <span
                  className={`block min-[720px]:hidden whitespace-nowrap text-[14px] leading-[1.25] ${
                    on ? "font-medium text-tinta" : "text-tinta-2"
                  }`}
                >
                  {a.nombre}
                </span>
              </Link>
            );
          })}
        </nav>
      ) : (
        <nav className="flex gap-4 bg-barra px-4 py-[9px]">
          {visibles.map((a) => {
            const on = a === activa;
            return (
              <Link
                key={a.id}
                href={a.href}
                className={`shrink-0 whitespace-nowrap text-[13px] ${
                  on
                    ? "border-b-2 border-acento pb-[2px] font-medium text-tinta"
                    : "text-tinta-3"
                }`}
              >
                {a.nombreCorto}
              </Link>
            );
          })}
        </nav>
      )}
      {dentroDeSeccion && activa?.secciones && (
        <div className="sin-scrollbar flex gap-2 overflow-x-auto border-b border-borde bg-barra px-4 py-[9px]">
          {activa.secciones.map((s) => {
            const on = coincide(pathname, s.href);
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`shrink-0 whitespace-nowrap rounded-[6px] px-[10px] py-[6px] text-[12px] ${
                  on
                    ? "border border-borde-control bg-fondo font-medium text-tinta"
                    : "border border-borde text-tinta-2"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
