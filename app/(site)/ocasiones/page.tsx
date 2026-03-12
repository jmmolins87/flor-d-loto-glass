import { OccasionCard } from "@/components/cards/occasion-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbSchema, ItemListSchema, WebPageSchema } from "@/components/shared/page-schema";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getOccasions } from "@/lib/sanity/fetch";

export const metadata = buildMetadata({
  title: "Flores por ocasion | Flor de Loto Segovia",
  description:
    "Flores por ocasion en Segovia para cumpleaños, aniversarios, agradecimientos y momentos especiales con entrega local.",
  path: "/ocasiones",
  keywords: [
    "flores por ocasion segovia",
    "regalar flores segovia",
    "floristeria segovia ocasiones",
    "ramos para regalo",
  ],
});

export default async function OccasionsPage() {
  const occasions = await getOccasions();
  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: "Ocasiones", path: "/ocasiones" },
  ];

  return (
    <section className="shell section-space">
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        type="CollectionPage"
        name="Flores por ocasion"
        description="Ideas florales para cumpleaños, aniversarios y agradecimientos en Segovia."
        path="/ocasiones"
      />
      <ItemListSchema
        name="Ocasiones florales"
        path="/ocasiones"
        items={occasions.map((item) => ({
          name: item.title,
          path: `/ocasiones/${item.slug.current}`,
          description: item.excerpt,
          image: item.image,
        }))}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <ScrollReveal distance={34}>
        <SectionHeading
          eyebrow="Ocasiones"
          title="Regalar flores tambien puede ser una decision tranquila."
          description="Agrupamos propuestas por tipo de momento para ayudar a encontrar el tono adecuado sin caer en lo generico."
        />
      </ScrollReveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "Cumpleaños, aniversarios y agradecimientos con una lectura actual.",
          "Opciones faciles de adaptar a presupuesto, tono y formato de entrega.",
          "Atencion directa para resolver rapido cuando necesitas regalar bien.",
        ].map((item, index) => (
          <ScrollReveal key={item} delay={index * 90} distance={26}>
            <div className="surface p-5 text-base leading-7 text-foreground/72">
              {item}
            </div>
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {occasions.map((item, index) => (
          <ScrollReveal key={item.slug.current} delay={index * 70} distance={24}>
            <OccasionCard occasion={item} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
