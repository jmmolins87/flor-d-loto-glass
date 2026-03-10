import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Inicio",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
    defineField({ name: "hero", title: "Hero", type: "heroSection" }),
    defineField({
      name: "introSection",
      title: "Intro",
      type: "introSection",
    }),
    defineField({
      name: "featuredCollections",
      title: "Colecciones destacadas",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "collection" }],
        },
      ],
      description: "Selecciona las colecciones que quieres destacar en la home.",
    }),
    defineField({
      name: "featuredOccasions",
      title: "Ocasiones destacadas",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "occasion" }],
        },
      ],
    }),
    defineField({
      name: "promoBanner",
      title: "Banner promocional",
      type: "reference",
      to: [{ type: "promotionalBanner" }],
    }),
    defineField({
      name: "brandSection",
      title: "Bloque de marca",
      type: "brandSection",
    }),
    defineField({
      name: "finalCta",
      title: "CTA final",
      type: "finalCta",
    }),
  ],
});
