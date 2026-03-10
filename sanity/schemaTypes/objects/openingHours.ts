import { defineField, defineType } from "sanity";

export const openingHours = defineType({
  name: "openingHours",
  title: "Horario",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Dia o rango de dias",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Horario",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
