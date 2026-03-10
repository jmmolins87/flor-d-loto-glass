import { siteConfig } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/sanity/types";

export function SeoSchema({ settings }: { settings: SiteSettings }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: settings.siteName,
    description: settings.siteDescription,
    url: siteConfig.url,
    telephone: settings.phone,
    email: settings.email,
    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: "Madrid",
          addressCountry: "ES",
        }
      : undefined,
    openingHoursSpecification: settings.openingHours?.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.day,
      opens: item.hours.split(" - ")[0],
      closes: item.hours.split(" - ")[1],
    })),
    sameAs: settings.socialLinks?.map((item) => item.href),
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  );
}
