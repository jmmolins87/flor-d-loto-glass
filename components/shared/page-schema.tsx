import { siteConfig } from "@/lib/site-config";
import type { ImageAsset } from "@/lib/sanity/types";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ListEntry = {
  name: string;
  path: string;
  description?: string;
  image?: ImageAsset | null;
};

function absoluteUrl(path: string) {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

function imageUrl(image?: ImageAsset | null) {
  return image?.url || undefined;
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function WebPageSchema({
  type = "WebPage",
  name,
  description,
  path,
}: {
  type?:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "ItemPage";
  name: string;
  description?: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        name,
        description,
        url: absoluteUrl(path),
        inLanguage: siteConfig.language,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.url}#website`,
        },
      }}
    />
  );
}

export function ItemListSchema({
  name,
  path,
  items,
}: {
  name: string;
  path: string;
  items: ListEntry[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name,
        url: absoluteUrl(path),
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(item.path),
          name: item.name,
          description: item.description,
          image: imageUrl(item.image),
        })),
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  path,
  image,
  serviceType,
}: {
  name: string;
  description?: string;
  path: string;
  image?: ImageAsset | null;
  serviceType: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: absoluteUrl(path),
        image: imageUrl(image),
        serviceType,
        areaServed: {
          "@type": "City",
          name: "Segovia",
        },
        provider: {
          "@type": "Florist",
          "@id": `${siteConfig.url}#organization`,
        },
      }}
    />
  );
}
