import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero principal",
  type: "object",
  description: "Bloque principal visible nada mas entrar en la home.",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Texto superior",
      type: "string",
      description: "Pequeño texto de contexto sobre el titular principal.",
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
      description: "Texto de apoyo que explica la propuesta de valor del hero.",
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
      description: "Imagen destacada del primer bloque de la home.",
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
