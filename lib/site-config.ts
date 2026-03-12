export const siteConfig = {
  name: "Flor de Loto Segovia",
  description:
    "Floristeria en Segovia con ramos a domicilio, flores frescas, arreglos para bodas, eventos y detalles cuidados para regalar, celebrar y decorar.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  locale: "es_ES",
  language: "es",
  country: "ES",
  ogImage: "/opengraph-image",
  keywords: [
    "flor de loto segovia",
    "floristeria en Segovia",
    "floristeria segovia",
    "floreria segovia",
    "ramos a domicilio",
    "flores a domicilio segovia",
    "flores frescas",
    "ramos de flores segovia",
    "bodas segovia flores",
    "floristeria moderna",
    "flores para eventos",
    "floristeria local",
  ],
} as const;
