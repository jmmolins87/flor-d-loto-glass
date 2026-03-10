import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contacto",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
    defineField({
      name: "heroTitle",
      title: "Titulo principal",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroText",
      title: "Texto de apertura",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactBlocks",
      title: "Bloques de contacto",
      type: "array",
      of: [{ type: "contactBlock" }],
    }),
    defineField({
      name: "formText",
      title: "Texto sobre el formulario",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mapEmbed",
      title: "Mapa embebido",
      type: "url",
      description: "Pega aqui la URL de Google Maps si quieres mostrar un mapa.",
    }),
    defineField({
      name: "locationText",
      title: "Texto de ubicacion",
      type: "text",
      rows: 3,
    }),
  ],
});
