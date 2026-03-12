import { SectionHeading } from "@/components/sections/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbSchema, WebPageSchema } from "@/components/shared/page-schema";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import type { StaticPageContent } from "@/lib/static-pages";

export function StaticContentPage({ page }: { page: StaticPageContent }) {
  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: page.title, path: page.path },
  ];

  return (
    <section className="shell section-space">
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema name={page.title} description={page.description} path={page.path} />
      <Breadcrumbs items={breadcrumbItems} />
      <ScrollReveal className="surface w-full p-8 md:p-10" distance={34}>
        <SectionHeading eyebrow={page.eyebrow} title={page.title} description={page.description} />
        <div className="mt-8 space-y-6">
          {page.sections.map((section, index) => (
            <ScrollReveal key={section.title} className="space-y-3" delay={index * 70} distance={20}>
              <h3 className="text-2xl text-foreground">{section.title}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-foreground/72">
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="space-y-2 pl-5 text-base leading-7 text-foreground/72">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
