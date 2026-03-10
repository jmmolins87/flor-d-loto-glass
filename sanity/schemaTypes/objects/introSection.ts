import { defineField, defineType } from "sanity";

export const introSection = defineType({
  name: "introSection",
  title: "Bloque introductorio",
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
  ],
});
