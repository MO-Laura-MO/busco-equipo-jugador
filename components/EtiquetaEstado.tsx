import type { Estado } from "@/lib/datos";

const ESTILOS: Record<Exclude<Estado, null>, { texto: string; clases: string }> = {
  verificado: {
    texto: "Verificado por el club",
    clases: "bg-verificado-tinte text-verificado",
  },
  federado: {
    texto: "Federado",
    clases: "bg-gris-tinte text-gris-etiqueta",
  },
  municipal: {
    texto: "Liga municipal",
    clases: "bg-gris-tinte text-gris-etiqueta",
  },
  escuela: {
    texto: "Escuela",
    clases: "bg-gris-tinte text-gris-etiqueta",
  },
  provisional: {
    texto: "Fecha provisional",
    clases: "bg-ambar-tinte text-ambar",
  },
  "por-confirmar": {
    texto: "Día por confirmar",
    clases: "bg-gris-tinte text-gris-etiqueta",
  },
  "fecha-por-confirmar": {
    texto: "Fecha por confirmar",
    clases: "bg-gris-tinte text-gris-etiqueta",
  },
  abierta: {
    texto: "Inscripción abierta",
    clases: "bg-azul-tinte text-azul",
  },
};

export default function EtiquetaEstado({ estado }: { estado: Estado }) {
  if (!estado) return null;
  const { texto, clases } = ESTILOS[estado];
  return (
    <span
      className={`inline-block rounded-[5px] px-[8px] py-[3px] text-[11.5px] leading-[1.3] ${clases}`}
    >
      {texto}
    </span>
  );
}
