import { clubes } from "@/lib/datos";

/**
 * Lista pública de clubes registrados (id y nombre), pensada para
 * sincronizar el desplegable del formulario externo de alta.
 * Se genera de forma estática en el build.
 */
export const dynamic = "force-static";

export async function GET() {
  const lista = clubes.map(({ id, nombre }) => ({ id, nombre }));
  return Response.json(lista, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
