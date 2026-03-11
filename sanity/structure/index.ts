import type { StructureResolver } from "sanity/structure";
import {
  BookIcon,
  CogIcon,
  ComposeIcon,
  DocumentsIcon,
  HomeIcon,
  SearchIcon,
} from "@sanity/icons";

import { EditorialGuide } from "@/sanity/structure/editorial-guide";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Dashboard editorial")
    .items([
      S.listItem()
        .title("Guia editorial")
        .icon(BookIcon)
        .child(S.component().id("editorial-guide").title("Guia editorial").component(EditorialGuide)),
      S.listItem()
        .title("Web")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Web")
            .items([
              S.listItem()
                .title("Inicio")
                .icon(HomeIcon)
                .child(S.document().schemaType("homePage").documentId("homePage")),
              S.listItem()
                .title("Sobre nosotros")
                .icon(DocumentsIcon)
                .child(
                  S.document().schemaType("aboutPage").documentId("aboutPage"),
                ),
              S.listItem()
                .title("Contacto")
                .icon(DocumentsIcon)
                .child(
                  S.document().schemaType("contactPage").documentId("contactPage"),
                ),
              S.listItem()
                .title("Paginas legales")
                .icon(DocumentsIcon)
                .child(S.documentTypeList("legalPage").title("Paginas legales")),
            ]),
        ),
      S.listItem()
        .title("Catalogo y ocasiones")
        .icon(ComposeIcon)
        .child(
          S.list()
            .title("Catalogo y ocasiones")
            .items([
              S.listItem()
                .title("Colecciones")
                .icon(DocumentsIcon)
                .child(S.documentTypeList("collection").title("Colecciones")),
              S.listItem()
                .title("Ocasiones")
                .icon(ComposeIcon)
                .child(S.documentTypeList("occasion").title("Ocasiones")),
              S.listItem()
                .title("Banners promocionales")
                .icon(ComposeIcon)
                .child(
                  S.documentTypeList("promotionalBanner").title(
                    "Banners promocionales",
                  ),
                ),
            ]),
        ),
      S.listItem()
        .title("Ajustes globales")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Ajustes globales")
            .items([
              S.listItem()
                .title("Ajustes del sitio")
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings"),
                ),
              S.listItem()
                .title("Navegacion")
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType("navigationSettings")
                    .documentId("navigationSettings"),
                ),
              S.listItem()
                .title("SEO reutilizable")
                .icon(SearchIcon)
                .child(S.documentTypeList("reusableSeo").title("SEO reutilizable")),
            ]),
        ),
    ]);
