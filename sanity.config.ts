import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "@/lib/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { deskStructure } from "@/sanity/structure";

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
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
