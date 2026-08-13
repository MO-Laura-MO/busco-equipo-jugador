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
- `data/vacantes.json` — un objeto por vacante de entrenador/a, enlazada por
  `clubId`

Editar directamente en GitHub y hacer commit; Vercel redespliega solo.

Reglas del modelo de datos:

- `zona`: `norte | sur | este | oeste | centro`
- `categoria`: `benjamin | alevin | infantil | cadete | juvenil | junior | senior | master`
  — siempre en orden de edad, nunca alfabético (el orden lo fija
  `CATEGORIAS` en `lib/datos.ts`)
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
- `tipoEntidad` (convocatoria y vacante): lista, no texto — un equipo puede
  jugar en varias ligas a la vez. Valores: `federado | mancomunada |
  municipal | escuela`
- Las vacantes de entrenador/a caducan a los 45 días sin actualizar
  (`fechaActualizacion`); pasado ese plazo dejan de mostrarse solas, igual
  que las convocatorias caducan por fecha

Etiquetas de estado que pinta la web (hasta dos por fila): la verde
"Verificado por el club" siempre que `origen: club`, y además la de
fecha que corresponda — abierta → azul; mes → gris "Día por confirmar";
exacta provisional → ámbar.

### Plantilla de club (copiar dentro de `data/clubes.json`)

```json
{
  "id": "nombre-del-club",
  "nombre": "Nombre del Club",
  "municipio": "Municipio",
  "zona": "sur",
  "web": "https://www.ejemplo.com",
  "redes": [{ "tipo": "instagram", "url": "https://instagram.com/ejemplo" }],
  "email": "contacto@ejemplo.com",
  "telefono": "+34 600 000 000",
  "logo": "",
  "descripcion": "Descripción breve del club (máx. 300 caracteres).",
  "fechaActualizacion": "2026-08-05"
}
```

El `id` se escribe en minúsculas con guiones, sin acentos, y es el que
enlaza las convocatorias y forma la URL de la ficha (`/clubes/<id>`).

### Plantilla de convocatoria (copiar dentro de `data/convocatorias.json`)

```json
{
  "clubId": "nombre-del-club",
  "categoria": "cadete",
  "sexo": "femenino",
  "tipoEntidad": ["federado"],
  "nivel": "",
  "temporada": "2026-27",
  "tipoFecha": "exacta",
  "fecha": "2026-09-12",
  "mesAprox": "",
  "anios": "",
  "estadoFecha": "confirmada",
  "hora": "10:00",
  "pabellon": "Pabellón Ejemplo",
  "direccion": "C. Ejemplo, 1, 28000 Municipio",
  "mapsUrl": "https://maps.google.com/?q=Pabellón+Ejemplo",
  "avisoPrevio": false,
  "cuotaOrientativa": "",
  "notas": "",
  "origen": "fuentes-publicas",
  "fechaActualizacion": "2026-08-05"
}
```

Si `tipoFecha` es `mes`, deja `fecha` vacía y rellena `mesAprox`
("2026-09"). Si es `abierta`, deja las dos vacías. Con los archivos
vacíos (`[]`), la portada muestra un mensaje de lanzamiento que invita
a los clubes a darse de alta.

### Plantilla de vacante (copiar dentro de `data/vacantes.json`)

```json
{
  "clubId": "nombre-del-club",
  "puesto": "entrenador",
  "categoria": "cadete",
  "sexo": "femenino",
  "tipoEntidad": ["federado"],
  "nivel": "",
  "titulacion": "",
  "requisitos": "",
  "dias": "",
  "horario": "",
  "pabellon": "",
  "compensacion": "por-determinar",
  "incorporacion": "",
  "notas": "",
  "origen": "fuentes-publicas",
  "fechaActualizacion": "2026-08-05"
}
```

`puesto`: `entrenador | segundo-entrenador | ayudante | monitor |
coordinador | preparador-fisico`. `categoria` y `sexo` se dejan vacíos si la
vacante no es de un equipo concreto (por ejemplo, de escuelas en general).
`compensacion`: `remunerada | ayuda-gastos | voluntaria | por-determinar`;
solo se muestra en la web si no es `por-determinar`. Las vacantes caducan a
los 45 días sin actualizar `fechaActualizacion`.

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
