import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Sobre nosotros",
  type: "document",
  description: "Contenido editorial de la pagina de marca y presentacion del negocio.",
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
      name: "mainImage",
      title: "Imagen principal",
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
    defineField({
      name: "bodySections",
      title: "Bloques de contenido",
      type: "array",
      of: [{ type: "bodySection" }],
    }),
  ],
});
