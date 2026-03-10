import { notFound } from "next/navigation";
import { Clock3, Flower2, PackageCheck } from "lucide-react";

import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { CmsImage } from "@/components/shared/cms-image";
import { PortableTextContent } from "@/components/shared/portable-text";
import { buildMetadata } from "@/lib/seo/metadata";
import { getOccasionBySlug, getOccasions } from "@/lib/sanity/fetch";

const occasionHighlights: Record<
  string,
  { label: string; text: string; icon: typeof Flower2 }[]
> = {
  "cumpleanos-con-color": [
    {
      label: "Tono",
      text: "Propuestas vivas, alegres y muy faciles de regalar.",
      icon: Flower2,
    },
    {
      label: "Entrega",
      text: "Ideal para sorpresas, visitas o celebraciones del mismo dia.",
      icon: Clock3,
    },
    {
      label: "Formato",
      text: "Ramo, cesta o centro segun el tipo de regalo.",
      icon: PackageCheck,
    },
  ],
  "aniversarios-serenos": [
    {
      label: "Estilo",
      text: "Paletas suaves y composiciones de lectura romantica.",
      icon: Flower2,
    },
    {
      label: "Detalle",
      text: "Pensado para regalos con mas carga emocional y estetica.",
      icon: PackageCheck,
    },
    {
      label: "Adaptacion",
      text: "Se ajusta a cena, sorpresa en casa o celebracion especial.",
      icon: Clock3,
    },
  ],
  "gracias-con-estilo": [
    {
      label: "Uso",
      text: "Perfecto para agradecer a clientes, equipos o anfitriones.",
      icon: Flower2,
    },
    {
      label: "Presentacion",
      text: "Formatos limpios y muy comodos de recibir o transportar.",
      icon: PackageCheck,
    },
    {
      label: "Rapidez",
      text: "Una solucion clara cuando necesitas acertar sin complicarte.",
      icon: Clock3,
    },
  ],
};

export async function generateStaticParams() {
  const items = await getOccasions();
  return items.map((item) => ({ slug: item.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const occasion = await getOccasionBySlug(slug);

  if (!occasion) {
    return {};
  }

  return buildMetadata({
    title: occasion.title,
    description: occasion.excerpt,
    seo: occasion.seo,
    path: `/ocasiones/${occasion.slug.current}`,
  });
}

export default async function OccasionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const occasion = await getOccasionBySlug(slug);

  if (!occasion) {
    notFound();
  }

  return (
    <>
      <section className="shell section-space">
        <div className="section-grid items-start lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Ocasion"
              title={occasion.title}
              description={occasion.excerpt}
            />
            <PortableTextContent value={occasion.description} />
          </div>
          <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] border border-white/80">
            <CmsImage
              image={occasion.image}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {(occasionHighlights[occasion.slug.current] || []).map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="surface p-5">
                <div className="flex items-center gap-2 text-primary">
                  <Icon className="size-4" />
                  <span className="text-base font-semibold uppercase tracking-[0.18em]">
                    {item.label}
                  </span>
                </div>
                <p className="mt-3 text-base leading-7 text-foreground/72">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <CTASection
        title="Podemos adaptar esta idea a tu presupuesto, paleta o fecha."
        text="Comparte el contexto y te proponemos una solucion floral afinada, no una respuesta automatica."
        primaryCta={{ label: "Pedir propuesta", href: "/contacto" }}
      />
    </>
  );
}
