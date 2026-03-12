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
  const metadataKeywords = Array.from(new Set([...siteConfig.keywords, ...(keywords || [])]));
  const noIndex = seo?.noIndex || false;
  const shouldIndex = !noIndex && !siteConfig.url.includes("localhost");
  const url = absoluteUrl(path);
  const image = resolveImage(seo || undefined);

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: metaTitle,
    description: metaDescription,
    keywords: metadataKeywords,
    category: "floristeria",
    referrer: "origin-when-cross-origin",
    creator: siteConfig.name,
    publisher: siteConfig.name,
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
    other: {
      "geo.region": "ES-SG",
      "geo.placename": "Segovia",
      "language": siteConfig.language,
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
