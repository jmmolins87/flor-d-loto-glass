import { SectionHeading } from "@/components/sections/section-heading";
import { CmsImage } from "@/components/shared/cms-image";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAboutPage } from "@/lib/sanity/fetch";

export async function generateMetadata() {
  const page = await getAboutPage();
  return buildMetadata({
    title: "Sobre nosotros",
    description: page.heroText,
    seo: page.seo,
    path: "/sobre-nosotros",
  });
}

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <section className="shell section-space">
      <div className="section-grid items-start lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <SectionHeading eyebrow="Sobre nosotros" title={page.heroTitle} description={page.heroText} />
          <div className="space-y-4">
            {page.bodySections.map((section) => (
              <div key={section.title} className="surface p-6">
                <h3 className="text-2xl text-foreground">{section.title}</h3>
                {section.text ? (
                  <p className="mt-3 text-base leading-8 text-foreground/72">{section.text}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/80">
          <CmsImage
            image={page.mainImage}
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
