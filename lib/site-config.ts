export const siteConfig = {
  name: "Flor de Loto",
  description:
    "Floristeria contemporanea con ramos cuidados, colecciones de temporada y asesoramiento cercano para regalar, celebrar y decorar.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  locale: "es_ES",
  language: "es",
  country: "ES",
  ogImage: "/opengraph-image",
  keywords: [
    "floristeria premium",
    "floristeria en Segovia",
    "ramos a domicilio",
    "flores frescas",
    "floristeria moderna",
    "flores para eventos",
    "floristeria local",
  ],
} as const;
