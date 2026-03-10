import { defineField, defineType } from "sanity";

export const contactBlock = defineType({
  name: "contactBlock",
  title: "Bloque de contacto",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripcion",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "label",
      title: "Texto del enlace",
      type: "string",
    }),
    defineField({
      name: "value",
      title: "Valor visible",
      type: "string",
    }),
    defineField({
      name: "href",
      title: "Enlace",
      type: "string",
      description: "Ejemplo: tel:+34900000000, mailto:hola@marca.com o https://wa.me/34600000000",
    }),
  ],
});
