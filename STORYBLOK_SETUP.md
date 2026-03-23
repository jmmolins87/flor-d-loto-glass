# Storyblok Setup

## Variables de entorno
Define estas variables en `.env.local`:

```env
NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN=
NEXT_PUBLIC_STORYBLOK_REGION=eu
STORYBLOK_SPACE_ID=
STORYBLOK_EDITOR_URL=
STORYBLOK_PREVIEW_SECRET=
STORYBLOK_REVALIDATE_SECRET=
```

Notas:
- Usa `STORYBLOK_EDITOR_URL` si quieres forzar una URL concreta del panel.
- Si no la defines, `/admin` redirige al dashboard construido con `STORYBLOK_SPACE_ID`.
- `STORYBLOK_PREVIEW_SECRET` protege [`/api/preview`](/Users/juanmamolinscortes/Documentos/floristeria-premium/app/api/preview/route.ts).
- `STORYBLOK_REVALIDATE_SECRET` protege [`/api/revalidate`](/Users/juanmamolinscortes/Documentos/floristeria-premium/app/api/revalidate/route.ts).

## Estructura de stories
Crea estas stories exactas:

- `home`
- `global/site-settings`
- `global/navigation`
- `catalogo/<slug>`
- `ocasiones/<slug>`
- `sobre-nosotros`
- `contacto`
- `politica-cookies`
- `politica-privacidad`

## Campos por story
### `global/site-settings`
- `siteName`, `siteDescription`, `phone`, `email`, `whatsapp`, `address`: texto.
- `logo`: asset imagen.
- `socialLinks`: lista de objetos `{ label, href, openInNewTab }`.
- `openingHours`: lista de objetos `{ day, hours }`.
- `defaultSeo`: objeto `{ metaTitle, metaDescription, ogImage, noIndex }`.

### `global/navigation`
- `headerLinks`: lista de `{ label, href, openInNewTab }`.
- `footerLinks`: lista de `{ label, href, openInNewTab }`.

### `home`
- `seo`.
- `hero`: `{ eyebrow, title, subtitle, primaryCta, secondaryCta, image }`.
- `introSection`: `{ title, text }`.
- `promoBanner`: `{ title, text, ctaLabel, ctaHref, image, active }`.
- `brandSection`: `{ title, text, points[], image }`.
- `finalCta`: `{ title, text, primaryCta, secondaryCta }`.

La home no necesita seleccionar colecciones u ocasiones manualmente: la app toma las stories de `catalogo/*` y `ocasiones/*` con `featured = true`.

### `catalogo/<slug>`
- `title`, `excerpt`: texto.
- `description`: rich text Storyblok.
- `coverImage`: imagen.
- `gallery`: lista de imágenes.
- `featured`: boolean.
- `seo`.

### `ocasiones/<slug>`
- `title`, `excerpt`: texto.
- `description`: rich text Storyblok.
- `image`: imagen.
- `featured`: boolean.
- `seo`.

### `sobre-nosotros`
- `heroTitle`, `heroText`: texto.
- `mainImage`: imagen.
- `bodySections`: lista de `{ title, text, image }`.
- `seo`.

### `contacto`
- `heroTitle`, `heroText`, `formText`, `locationText`, `mapEmbed`: texto.
- `contactBlocks`: lista de `{ title, description, label, value, href }`.
- `seo`.

### `politica-cookies` y `politica-privacidad`
- `title`: texto.
- `type`: usa `cookies` o `privacy`.
- `body`: rich text Storyblok.
- `seo`.

## Preview y webhook
Configura preview con una URL tipo:

```text
https://tu-dominio.com/api/preview?secret=TU_SECRET&slug=/ruta
```

Configura un webhook de publicación a:

```text
POST https://tu-dominio.com/api/revalidate
Header: x-revalidate-secret: TU_SECRET
```

## Referencia de implementación
La app consume Storyblok desde [lib/storyblok/fetch.ts](/Users/juanmamolinscortes/Documentos/floristeria-premium/lib/storyblok/fetch.ts) y espera los tipos definidos en [lib/cms/types.ts](/Users/juanmamolinscortes/Documentos/floristeria-premium/lib/cms/types.ts).
