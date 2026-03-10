import { OccasionCard } from "@/components/cards/occasion-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { getOccasions } from "@/lib/sanity/fetch";

export const metadata = buildMetadata({
  title: "Flores por ocasion | Flor de Loto",
  description: "Ideas florales para cumpleaños, aniversarios, agradecimientos y momentos especiales.",
  path: "/ocasiones",
});

export default async function OccasionsPage() {
  const occasions = await getOccasions();

  return (
    <section className="shell section-space">
      <SectionHeading
        eyebrow="Ocasiones"
        title="Regalar flores tambien puede ser una decision tranquila."
        description="Agrupamos propuestas por tipo de momento para ayudar a encontrar el tono adecuado sin caer en lo generico."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "Cumpleaños, aniversarios y agradecimientos con una lectura actual.",
          "Opciones faciles de adaptar a presupuesto, tono y formato de entrega.",
          "Atencion directa para resolver rapido cuando necesitas regalar bien.",
        ].map((item) => (
          <div key={item} className="surface p-5 text-base leading-7 text-foreground/72">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {occasions.map((item) => (
          <OccasionCard key={item.slug.current} occasion={item} />
        ))}
      </div>
    </section>
  );
}
