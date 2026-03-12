import { SectionHeading } from "@/components/sections/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbSchema, WebPageSchema } from "@/components/shared/page-schema";
import { PortableTextContent } from "@/components/shared/portable-text";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLegalPage } from "@/lib/sanity/fetch";

export async function generateMetadata() {
  const page = await getLegalPage("cookies");
  return buildMetadata({
    title: page.title,
    seo: page.seo,
    path: "/politica-cookies",
  });
}

export default async function CookiesPolicyPage() {
  const page = await getLegalPage("cookies");
  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: "Politica de cookies", path: "/politica-cookies" },
  ];

  return (
    <section className="shell section-space">
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        name={page.title}
        description="Informacion sobre cookies, consentimiento y preferencias de seguimiento."
        path="/politica-cookies"
      />
      <Breadcrumbs items={breadcrumbItems} />
      <ScrollReveal className="surface w-full p-8 md:p-10" distance={34}>
        <SectionHeading eyebrow="Legal" title={page.title} />
        <ScrollReveal className="mt-8" delay={90} distance={22}>
          <PortableTextContent value={page.body} />
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}
