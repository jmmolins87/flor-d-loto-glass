import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import type { SeoData } from "@/lib/sanity/types";

function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

function resolveImage(seo?: SeoData) {
  const candidate = seo?.ogImage;

  if (candidate?.url) {
    return candidate.url;
  }

  return `${siteConfig.url}/opengraph-image.png`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  seo,
}: {
  title?: string;
  description?: string;
  path?: string;
  seo?: SeoData | null;
}): Metadata {
  const metaTitle = seo?.metaTitle || title || siteConfig.name;
  const metaDescription =
    seo?.metaDescription || description || siteConfig.description;
  const noIndex = seo?.noIndex || false;
  const url = absoluteUrl(path);
  const image = resolveImage(seo || undefined);

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [...siteConfig.keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
