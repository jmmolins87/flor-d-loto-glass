import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero principal",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Texto superior",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Titulo principal",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitulo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryCta",
      title: "Boton principal",
      type: "linkItem",
    }),
    defineField({
      name: "secondaryCta",
      title: "Boton secundario",
      type: "linkItem",
    }),
    defineField({
      name: "image",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
});
