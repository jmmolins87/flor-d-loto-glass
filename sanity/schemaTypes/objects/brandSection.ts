import { defineField, defineType } from "sanity";

export const brandSection = defineType({
  name: "brandSection",
  title: "Bloque de marca",
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
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "points",
      title: "Puntos destacados",
      type: "array",
      of: [{ type: "string" }],
      description: "Ideas cortas para reforzar el valor de la marca.",
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
  ],
});
