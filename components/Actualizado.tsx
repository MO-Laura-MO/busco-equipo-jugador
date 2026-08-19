import { fechaLarga } from "@/lib/datos";

/** Línea de "última actualización" que va al pie de cualquier listado. */
export default function Actualizado({ fecha }: { fecha: string }) {
  if (!fecha) return null;
  return (
    <p className="px-4 py-3 text-[12.5px] text-tinta-3">
      Listado actualizado por última vez el <time dateTime={fecha}>{fechaLarga(fecha)}</time>.
    </p>
  );
}
