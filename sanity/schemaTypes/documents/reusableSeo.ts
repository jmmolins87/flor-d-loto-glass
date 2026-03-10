import { defineField, defineType } from "sanity";

export const reusableSeo = defineType({
  name: "reusableSeo",
  title: "SEO reutilizable",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Titulo SEO",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Descripcion SEO",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ogImage",
      title: "Imagen Open Graph",
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
      title: "No indexar",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
