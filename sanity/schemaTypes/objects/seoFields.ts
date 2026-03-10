import { defineField, defineType } from "sanity";

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Titulo SEO",
      type: "string",
      description: "Idealmente entre 50 y 60 caracteres.",
    }),
    defineField({
      name: "metaDescription",
      title: "Descripcion SEO",
      type: "text",
      rows: 3,
      description: "Resumen corto para Google y redes.",
    }),
    defineField({
      name: "ogImage",
      title: "Imagen para compartir",
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
      name: "noIndex",
      title: "No indexar esta pagina",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
