# Busco equipo — directorio de pruebas de voleibol base

Directorio de convocatorias de pruebas de voleibol base, empezando por la
Comunidad de Madrid (el ámbito se define en `lib/config.ts` y la idea es
ampliarlo a otras comunidades más adelante). Los clubes publican qué
categorías buscan completar y cuándo hacen
las pruebas; las familias las encuentran filtrando por categoría, sexo, zona
y mes. Sin base de datos, sin CMS, sin registro: el contenido vive en dos
archivos JSON de este repo y el contacto ocurre fuera de la plataforma.

## Stack

- Next.js (App Router) + Tailwind CSS 4, TypeScript
- Desplegado en Vercel; GitHub como fuente de verdad
- Sitio 100% estático (SSG); un route handler estático expone `/api/clubes`

## Editar contenido

Todo el contenido está en `data/`:

- `data/clubes.json` — un objeto por club
- `data/convocatorias.json` — un objeto por convocatoria, enlazada por `clubId`

Editar directamente en GitHub y hacer commit; Vercel redespliega solo.

Reglas del modelo de datos:

- `zona`: `norte | sur | este | oeste | centro`
- `categoria`: `benjamin | alevin | infantil | cadete | juvenil`
- `sexo`: `femenino | masculino | mixto`
- `tipoFecha`: `exacta` (usa `fecha` AAAA-MM-DD), `mes` (usa `mesAprox`
  AAAA-MM) o `abierta` (inscripción todo el año)
- `estadoFecha`: `confirmada | provisional`
- `origen`: `club` (lo confirmó el propio club → etiqueta verde
  "Verificado por el club") o `fuentes-publicas`
- `nivel` es texto libre corto y opcional ("Primera Autonómica"…); si está
  vacío no se muestra nada
- `temporada`: temporada de la prueba, formato "2026-27". El filtro
  Temporada solo aparece en la web cuando conviven dos o más temporadas
  en los datos
- `descripcion` del club: máximo 300 caracteres

Etiquetas de estado que pinta la web (hasta dos por fila): la verde
"Verificado por el club" siempre que `origen: club`, y además la de
fecha que corresponda — abierta → azul; mes → gris "Día por confirmar";
exacta provisional → ámbar.

## Configurar antes de publicar

En `lib/config.ts`:

- `URL_SITIO` — dominio real (afecta a metadatos, sitemap y JSON-LD)
- `URL_FORMULARIO_ALTA` — URL del formulario de Tally
- `EMAIL_CORRECCIONES` — buzón de correcciones de datos

## Endpoint de clubes

`GET /api/clubes` devuelve `[{ "id", "nombre" }]` con CORS abierto, para
sincronizar el desplegable del formulario externo de alta. Se regenera en
cada build.

## Desarrollo

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # build de producción
```

## Desplegar

1. Crear un repo en GitHub y hacer push.
2. En Vercel: New Project → importar el repo → framework Next.js
   (sin configuración extra).
3. Cada push a `main` publica automáticamente.
