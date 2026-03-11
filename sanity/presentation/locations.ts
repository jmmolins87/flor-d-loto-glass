import { defineLocations } from "sanity/presentation";

export const presentationLocations = {
  homePage: defineLocations({
    locations: [{ title: "Inicio", href: "/" }],
  }),
  aboutPage: defineLocations({
    locations: [{ title: "Sobre nosotros", href: "/sobre-nosotros" }],
  }),
  contactPage: defineLocations({
    locations: [{ title: "Contacto", href: "/contacto" }],
  }),
  navigationSettings: defineLocations({
    message: "Este documento afecta al header y footer globales de toda la web.",
    tone: "positive",
  }),
  siteSettings: defineLocations({
    message: "Este documento afecta a toda la web: marca, contacto, SEO base y datos globales.",
    tone: "positive",
  }),
  collection: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (value) => {
      if (!value?.slug) {
        return {
          message: "Añade un slug para poder previsualizar esta coleccion en la web.",
          tone: "caution",
        };
      }

      return {
        locations: [
          { title: "Catalogo", href: "/catalogo" },
          { title: value.title || "Coleccion", href: `/catalogo/${value.slug}` },
        ],
      };
    },
  }),
  occasion: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (value) => {
      if (!value?.slug) {
        return {
          message: "Añade un slug para poder previsualizar esta ocasion en la web.",
          tone: "caution",
        };
      }

      return {
        locations: [
          { title: "Ocasiones", href: "/ocasiones" },
          { title: value.title || "Ocasion", href: `/ocasiones/${value.slug}` },
        ],
      };
    },
  }),
  promotionalBanner: defineLocations({
    locations: [{ title: "Inicio", href: "/" }],
  }),
  legalPage: defineLocations({
    select: {
      title: "title",
      type: "type",
    },
    resolve: (value) => {
      const href =
        value?.type === "privacy" ? "/politica-privacidad" : "/politica-cookies";

      return {
        locations: [{ title: value?.title || "Pagina legal", href }],
      };
    },
  }),
};
