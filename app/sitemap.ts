import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { getCollections, getOccasions } from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, occasions] = await Promise.all([
    getCollections(),
    getOccasions(),
  ]);

  const staticRoutes = [
    "",
    "/catalogo",
    "/ocasiones",
    "/sobre-nosotros",
    "/contacto",
    "/politica-cookies",
    "/politica-privacidad",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
    })),
    ...collections.map((item) => ({
      url: `${siteConfig.url}/catalogo/${item.slug.current}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
    })),
    ...occasions.map((item) => ({
      url: `${siteConfig.url}/ocasiones/${item.slug.current}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
    })),
  ];
}
