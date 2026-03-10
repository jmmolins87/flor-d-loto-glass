export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const useCdn = process.env.NODE_ENV === "production";

export const studioUrl = process.env.SANITY_STUDIO_PREVIEW_URL || "";

export const sanityEnabled = Boolean(projectId && dataset);
