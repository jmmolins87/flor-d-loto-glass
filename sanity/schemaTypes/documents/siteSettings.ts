import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ajustes del sitio",
  type: "document",
  description: "Datos globales de marca, contacto, logo y configuracion general.",
  fields: [
    defineField({
      name: "siteName",
      title: "Nombre del sitio",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Descripcion corta",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
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
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Opcional si quieres subir un icono propio para el navegador.",
    }),
    defineField({
      name: "phone",
      title: "Telefono",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      description: "Formato internacional, por ejemplo +34600111222",
    }),
    defineField({
      name: "address",
      title: "Direccion",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Redes sociales",
      type: "array",
      of: [{ type: "linkItem" }],
    }),
    defineField({
      name: "openingHours",
      title: "Horarios",
      type: "array",
      of: [{ type: "openingHours" }],
    }),
    defineField({
      name: "defaultSeo",
      title: "SEO por defecto",
      type: "reference",
      to: [{ type: "reusableSeo" }],
      description: "Se usa como base cuando una pagina no tiene SEO propio.",
    }),
  ],
});
