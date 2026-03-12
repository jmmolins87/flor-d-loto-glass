import { SectionHeading } from "@/components/sections/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CmsImage } from "@/components/shared/cms-image";
import { BreadcrumbSchema, WebPageSchema } from "@/components/shared/page-schema";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAboutPage } from "@/lib/sanity/fetch";

export async function generateMetadata() {
  const page = await getAboutPage();
  return buildMetadata({
    title: "Sobre nosotros",
    description: page.heroText,
    seo: page.seo,
    path: "/sobre-nosotros",
    keywords: ["floristeria en Segovia", "sobre Flor de Loto Segovia", "flores artesanales Segovia"],
  });
}

export default async function AboutPage() {
  const page = await getAboutPage();
  const bodySections = Array.isArray(page.bodySections) ? page.bodySections : [];
  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: "Sobre nosotros", path: "/sobre-nosotros" },
  ];

  return (
    <section className="shell section-space">
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        type="AboutPage"
        name={page.heroTitle}
        description={page.heroText}
        path="/sobre-nosotros"
      />
      <Breadcrumbs items={breadcrumbItems} />
      <div className="section-grid items-start lg:grid-cols-[0.85fr_1.15fr]">
        <ScrollReveal className="space-y-6" distance={36}>
          <SectionHeading eyebrow="Sobre nosotros" title={page.heroTitle} description={page.heroText} />
          <div className="space-y-4">
            {bodySections.map((section, index) => (
              <ScrollReveal key={section.title} delay={index * 90} distance={26}>
                <div className="surface p-6">
                  <h3 className="text-2xl text-foreground">{section.title}</h3>
                  {section.text ? (
                    <p className="mt-3 text-base leading-8 text-foreground/72">{section.text}</p>
                  ) : null}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/80"
          delay={140}
          direction="left"
          distance={42}
        >
          <CmsImage
            image={page.mainImage}
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
