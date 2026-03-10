import { defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Pagina legal",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Tipo de pagina",
      type: "string",
      options: {
        list: [
          { title: "Politica de cookies", value: "cookies" },
          { title: "Politica de privacidad", value: "privacy" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
    },
  },
});
