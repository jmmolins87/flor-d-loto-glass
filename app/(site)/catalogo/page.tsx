import { CollectionCard } from "@/components/cards/collection-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCollections } from "@/lib/sanity/fetch";

export const metadata = buildMetadata({
  title: "Catalogo de colecciones | Flor de Loto",
  description: "Colecciones florales premium para regalar, decorar o celebrar con sensibilidad contemporanea.",
  path: "/catalogo",
});

export default async function CatalogPage() {
  const collections = await getCollections();

  return (
    <section className="shell section-space">
      <SectionHeading
        eyebrow="Catalogo"
        title="Colecciones para comprar con rapidez y seguir sintiendo que has elegido bien."
        description="Cada bloque responde a un uso real: regalo, casa, mesa o evento intimo. La lectura es clara y la estetica se mantiene serena."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "Ramos frescos y plantas para regalo inmediato o encargo.",
          "Flores de boda, cestas y centros para momentos especiales.",
          "Coronas y composiciones funerarias con trato rapido y respetuoso.",
        ].map((item) => (
          <div key={item} className="surface p-5 text-base leading-7 text-foreground/72">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((item) => (
          <CollectionCard key={item.slug.current} collection={item} />
        ))}
      </div>
    </section>
  );
}
