import { siteConfig } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/sanity/types";

export function SeoSchema({ settings }: { settings: SiteSettings }) {
  const organizationId = `${siteConfig.url}#organization`;
  const websiteId = `${siteConfig.url}#website`;
  const logoUrl = settings.logo?.url || `${siteConfig.url}/logo.png`;
  const openingHoursSpecification = settings.openingHours
    ?.map((item) => {
      const [opens, closes] = item.hours.split(" - ");

      if (!opens || !closes || opens.includes("Cerrado")) {
        return null;
      }

      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: item.day,
        opens,
        closes,
      };
    })
    .filter(Boolean);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Florist",
      "@id": organizationId,
      name: settings.siteName,
      description: settings.siteDescription,
      url: siteConfig.url,
      image: logoUrl,
      logo: logoUrl,
      telephone: settings.phone,
      email: settings.email,
      address: settings.address
        ? {
            "@type": "PostalAddress",
            streetAddress: settings.address,
            addressLocality: "Segovia",
            addressCountry: siteConfig.country,
          }
        : undefined,
      areaServed: {
        "@type": "City",
        name: "Segovia",
      },
      contactPoint: [
        settings.phone
          ? {
              "@type": "ContactPoint",
              contactType: "customer service",
              telephone: settings.phone,
              areaServed: siteConfig.country,
              availableLanguage: siteConfig.language,
            }
          : null,
        settings.email
          ? {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: settings.email,
              availableLanguage: siteConfig.language,
            }
          : null,
      ].filter(Boolean),
      openingHoursSpecification,
      sameAs: settings.socialLinks?.map((item) => item.href),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: settings.siteName,
      description: settings.siteDescription,
      inLanguage: siteConfig.language,
      publisher: {
        "@id": organizationId,
      },
    },
  ];

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  );
}
