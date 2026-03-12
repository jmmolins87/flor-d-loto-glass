import { CollectionCard } from "@/components/cards/collection-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbSchema, ItemListSchema, WebPageSchema } from "@/components/shared/page-schema";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCollections } from "@/lib/sanity/fetch";

export const metadata = buildMetadata({
  title: "Catalogo de colecciones | Flor de Loto Segovia",
  description:
    "Catalogo de flores en Segovia con ramos, centros, plantas y arreglos florales para regalo, eventos y encargos a domicilio.",
  path: "/catalogo",
  keywords: [
    "catalogo de flores segovia",
    "ramos en segovia",
    "flores a domicilio segovia",
    "colecciones florales",
  ],
});

export default async function CatalogPage() {
  const collections = await getCollections();
  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: "Catalogo", path: "/catalogo" },
  ];

  return (
    <section className="shell section-space">
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        type="CollectionPage"
        name="Catalogo de colecciones florales"
        description="Catalogo de ramos, centros, plantas y arreglos florales en Segovia."
        path="/catalogo"
      />
      <ItemListSchema
        name="Colecciones florales"
        path="/catalogo"
        items={collections.map((item) => ({
          name: item.title,
          path: `/catalogo/${item.slug.current}`,
          description: item.excerpt,
          image: item.coverImage,
        }))}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <ScrollReveal distance={34}>
        <SectionHeading
          eyebrow="Catalogo"
          title="Colecciones para comprar con rapidez y seguir sintiendo que has elegido bien."
          description="Cada bloque responde a un uso real: regalo, casa, mesa o evento intimo. La lectura es clara y la estetica se mantiene serena."
        />
      </ScrollReveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          "Ramos frescos y plantas para regalo inmediato o encargo.",
          "Flores de boda, cestas y centros para momentos especiales.",
          "Coronas y composiciones funerarias con trato rapido y respetuoso.",
        ].map((item, index) => (
          <ScrollReveal key={item} delay={index * 90} distance={26}>
            <div className="surface p-5 text-base leading-7 text-foreground/72">
              {item}
            </div>
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-10 section-grid items-start lg:grid-cols-[0.95fr_1.05fr]">
        <ScrollReveal className="space-y-4 text-base leading-8 text-foreground/72" distance={30}>
          <p>
            El catalogo esta pensado para que puedas entender rapido que tipo de
            solucion floral necesitas sin revisar opciones redundantes. Cada
            coleccion agrupa encargos reales: regalo, casa, evento, boda,
            condolencia o detalle duradero.
          </p>
          <p>
            No trabajamos el catalogo como una lista cerrada de productos
            rigidos, sino como una base clara para orientar la compra. Eso nos
            permite adaptar tamaño, paleta, flor disponible y nivel de gesto sin
            perder coherencia visual.
          </p>
          <p>
            Si dudas entre varias lineas, lo mas util suele ser pensar en el
            contexto: a quien va dirigido, donde se va a colocar, cuanto debe
            durar y si buscas una presencia discreta o una pieza con mas impacto.
          </p>
        </ScrollReveal>
        <div className="grid gap-4">
          {[
            {
              title: "Compra con criterio",
              text: "Cada coleccion responde a un uso concreto para que elegir sea mas rapido y con menos friccion.",
            },
            {
              title: "Adaptacion real",
              text: "Podemos ajustar formato, gama cromatica, presupuesto y nivel de presencia segun el encargo.",
            },
            {
              title: "Entrega local",
              text: "Preparamos propuestas pensadas para funcionar bien en Segovia y en encargos de proximidad.",
            },
            {
              title: "Acompañamiento",
              text: "Si el catalogo no resuelve del todo tu caso, usamos estas lineas como punto de partida para afinar.",
            },
          ].map((item, index) => (
            <ScrollReveal
              key={item.title}
              className="w-full"
              delay={index * 90}
              direction="left"
              distance={28}
            >
              <div className="surface p-5">
                <p className="eyebrow text-primary">{item.title}</p>
                <p className="mt-3 text-base leading-7 text-foreground/72">
                  {item.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((item, index) => (
          <ScrollReveal key={item.slug.current} delay={index * 70} distance={24}>
            <CollectionCard collection={item} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
