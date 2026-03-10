import type { StructureResolver } from "sanity/structure";
import { CogIcon, ComposeIcon, DocumentsIcon, HomeIcon, SearchIcon } from "@sanity/icons";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Ajustes del sitio")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Inicio")
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Colecciones")
        .icon(DocumentsIcon)
        .child(S.documentTypeList("collection").title("Colecciones")),
      S.listItem()
        .title("Ocasiones")
        .icon(ComposeIcon)
        .child(S.documentTypeList("occasion").title("Ocasiones")),
      S.listItem()
        .title("Sobre nosotros")
        .icon(DocumentsIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Contacto")
        .icon(DocumentsIcon)
        .child(
          S.document().schemaType("contactPage").documentId("contactPage"),
        ),
      S.listItem()
        .title("Banners promocionales")
        .icon(ComposeIcon)
        .child(
          S.documentTypeList("promotionalBanner").title("Banners promocionales"),
        ),
      S.listItem()
        .title("Paginas legales")
        .icon(DocumentsIcon)
        .child(S.documentTypeList("legalPage").title("Paginas legales")),
      S.listItem()
        .title("Navegacion")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("navigationSettings")
            .documentId("navigationSettings"),
        ),
      S.divider(),
      S.listItem()
        .title("SEO reutilizable")
        .icon(SearchIcon)
        .child(S.documentTypeList("reusableSeo").title("SEO reutilizable")),
    ]);
