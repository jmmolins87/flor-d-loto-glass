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

  return `${siteConfig.url}${siteConfig.ogImage}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  seo,
  keywords,
  openGraphType = "website",
}: {
  title?: string;
  description?: string;
  path?: string;
  seo?: SeoData | null;
  keywords?: string[];
  openGraphType?: "article" | "profile" | "website";
}): Metadata {
  const metaTitle = seo?.metaTitle || title || siteConfig.name;
  const metaDescription =
    seo?.metaDescription || description || siteConfig.description;
  const noIndex = seo?.noIndex || false;
  const shouldIndex = !noIndex && !siteConfig.url.includes("localhost");
  const url = absoluteUrl(path);
  const image = resolveImage(seo || undefined);

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: metaTitle,
    description: metaDescription,
    keywords: [...siteConfig.keywords, ...(keywords || [])],
    category: "floristeria",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: url,
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: openGraphType,
      locale: siteConfig.locale,
      url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [image],
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
