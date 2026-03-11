import { defineField, defineType } from "sanity";

export const finalCta = defineType({
  name: "finalCta",
  title: "CTA final",
  type: "object",
  description: "Ultimo bloque de accion al final de la home.",
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
      description: "Accion principal recomendada para cerrar la visita.",
    }),
    defineField({
      name: "secondaryCta",
      title: "Boton secundario",
      type: "linkItem",
      description: "Accion alternativa si el usuario aun no quiere contactar.",
    }),
  ],
});
