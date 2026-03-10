import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "@/lib/sanity/env";

export const sanityClient = createClient({
  apiVersion,
  dataset,
  projectId: projectId || "placeholder",
  useCdn,
  perspective: "published",
  stega: {
    enabled: false,
  },
  token: process.env.SANITY_API_READ_TOKEN,
});
