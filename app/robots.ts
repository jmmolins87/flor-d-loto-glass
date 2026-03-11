import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = !siteConfig.url.includes("localhost");

  return {
    rules: {
      userAgent: "*",
      allow: allowIndexing ? "/" : "",
      disallow: allowIndexing ? undefined : "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
