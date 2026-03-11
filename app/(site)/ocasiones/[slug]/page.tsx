import { notFound } from "next/navigation";
import { Clock3, Flower2, PackageCheck } from "lucide-react";

import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CmsImage } from "@/components/shared/cms-image";
import { BreadcrumbSchema, ServiceSchema, WebPageSchema } from "@/components/shared/page-schema";
import { PortableTextContent } from "@/components/shared/portable-text";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
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
    keywords: [occasion.title, "flores por ocasion", "floristeria Segovia", "regalar flores"],
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

  const path = `/ocasiones/${occasion.slug.current}`;
  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: "Ocasiones", path: "/ocasiones" },
    { name: occasion.title, path },
  ];

  return (
    <>
      <section className="shell section-space">
        <BreadcrumbSchema items={breadcrumbItems} />
        <WebPageSchema
          type="ItemPage"
          name={occasion.title}
          description={occasion.excerpt}
          path={path}
        />
        <ServiceSchema
          name={occasion.title}
          description={occasion.excerpt}
          path={path}
          image={occasion.image}
          serviceType="Flores por ocasion"
        />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="section-grid items-start lg:grid-cols-[0.95fr_1.05fr]">
          <ScrollReveal className="space-y-6" distance={34}>
            <SectionHeading
              eyebrow="Ocasion"
              title={occasion.title}
              description={occasion.excerpt}
            />
            <ScrollReveal delay={80} distance={24}>
              <PortableTextContent value={occasion.description} />
            </ScrollReveal>
          </ScrollReveal>
          <ScrollReveal
            className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] border border-white/80"
            delay={140}
            direction="left"
            distance={38}
          >
            <CmsImage
              image={occasion.image}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </ScrollReveal>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {(occasionHighlights[occasion.slug.current] || []).map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal key={item.label} delay={index * 90} distance={24}>
                <div className="surface p-5">
                  <div className="flex items-center gap-2 text-primary">
                    <Icon className="size-4" />
                    <span className="text-base font-semibold uppercase tracking-[0.18em]">
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-7 text-foreground/72">{item.text}</p>
                </div>
              </ScrollReveal>
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
