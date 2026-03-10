import { defineField, defineType } from "sanity";

export const finalCta = defineType({
  name: "finalCta",
  title: "CTA final",
  type: "object",
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
      rows: 4,
      validation: (rule) => rule.required(),
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
  ],
});
