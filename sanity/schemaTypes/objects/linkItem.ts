import { defineField, defineType } from "sanity";

export const linkItem = defineType({
  name: "linkItem",
  title: "Enlace",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Texto del enlace",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL o ruta",
      type: "string",
      description: "Ejemplo: /contacto o https://instagram.com/tu-cuenta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Abrir en una nueva pestana",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});
