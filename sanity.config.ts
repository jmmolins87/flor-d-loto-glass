import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId, studioUrl } from "@/lib/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { presentationLocations } from "@/sanity/presentation/locations";
import { deskStructure } from "@/sanity/structure";
import { singletonActions, singletonTypes } from "@/sanity/singletons";

export default defineConfig({
  basePath: "/admin",
  projectId: projectId || "missing-project-id",
  dataset: dataset || "production",
  title: "Flor de Loto Studio",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    presentationTool({
      previewUrl: {
        initial: studioUrl || "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: presentationLocations,
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    actions: (previousActions, context) =>
      singletonTypes.has(context.schemaType)
        ? previousActions.filter(
            (action) => action.action && singletonActions.has(action.action),
          )
        : previousActions,
    newDocumentOptions: (previousOptions, context) =>
      context.creationContext.type === "global"
        ? previousOptions.filter(
            (option) => !singletonTypes.has(option.templateId),
          )
        : previousOptions,
  },
});
