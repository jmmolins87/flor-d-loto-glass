import { defineField, defineType } from "sanity";

export const promotionalBanner = defineType({
  name: "promotionalBanner",
  title: "Banner promocional",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Texto",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaLabel",
      title: "Texto del boton",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "Enlace del boton",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "active",
      title: "Mostrar banner",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
