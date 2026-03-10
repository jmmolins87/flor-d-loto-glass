import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { CmsImage } from "@/components/shared/cms-image";
import { PortableTextContent } from "@/components/shared/portable-text";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCollectionBySlug, getCollections } from "@/lib/sanity/fetch";

export async function generateStaticParams() {
  const items = await getCollections();
  return items.map((item) => ({ slug: item.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return {};
  }

  return buildMetadata({
    title: collection.title,
    description: collection.excerpt,
    seo: collection.seo,
    path: `/catalogo/${collection.slug.current}`,
  });
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <>
      <section className="shell section-space">
        <div className="section-grid items-start lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Coleccion"
              title={collection.title}
              description={collection.excerpt}
            />
            <PortableTextContent value={collection.description} />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/80">
            <CmsImage
              image={collection.coverImage}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <CTASection
        title="Quieres encargar esta linea o adaptarla a una fecha concreta?"
        text="Escribenos y afinamos el estilo, la paleta y la entrega contigo."
        primaryCta={{ label: "Contactar", href: "/contacto" }}
        secondaryCta={{ label: "Ver ocasiones", href: "/ocasiones" }}
      />
    </>
  );
}
