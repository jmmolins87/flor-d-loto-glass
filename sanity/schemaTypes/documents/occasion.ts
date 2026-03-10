import { defineField, defineType } from "sanity";

export const occasion = defineType({
  name: "occasion",
  title: "Ocasion",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre de la ocasion",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumen corto",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripcion completa",
      type: "array",
      of: [{ type: "block" }],
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
    defineField({
      name: "featured",
      title: "Destacar en listados",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "excerpt",
    },
  },
});
