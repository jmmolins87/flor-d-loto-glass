import { defineField, defineType } from "sanity";

export const navigationSettings = defineType({
  name: "navigationSettings",
  title: "Navegacion",
  type: "document",
  fields: [
    defineField({
      name: "headerLinks",
      title: "Enlaces del header",
      type: "array",
      of: [{ type: "linkItem" }],
    }),
    defineField({
      name: "footerLinks",
      title: "Enlaces del footer",
      type: "array",
      of: [{ type: "linkItem" }],
    }),
  ],
});
