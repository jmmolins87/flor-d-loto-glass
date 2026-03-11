import Link from "next/link";

import { ContactForm } from "@/components/forms/contact-form";
import { ContactHours } from "@/components/sections/contact-hours";
import { ContactSection } from "@/components/sections/contact-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbSchema, WebPageSchema } from "@/components/shared/page-schema";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { buttonVariants } from "@/lib/button-styles";
import { orderLinks } from "@/lib/order-links";
import { buildMetadata } from "@/lib/seo/metadata";
import { getContactPage } from "@/lib/sanity/fetch";

export async function generateMetadata() {
  const page = await getContactPage();
  return buildMetadata({
    title: "Contacto",
    description: page.heroText,
    seo: page.seo,
    path: "/contacto",
    keywords: ["contacto floristeria Segovia", "encargar flores", "pedido de flores"],
  });
}

export default async function ContactPage() {
  const page = await getContactPage();
  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <section className="shell section-space">
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema
        type="ContactPage"
        name={page.heroTitle}
        description={page.heroText}
        path="/contacto"
      />
      <Breadcrumbs items={breadcrumbItems} />
      <ScrollReveal distance={34}>
        <SectionHeading eyebrow="Contacto" title={page.heroTitle} description={page.heroText} />
      </ScrollReveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <ContactSection blocks={page.contactBlocks} />
        </div>
        <div className="space-y-6">
          <ScrollReveal delay={120} direction="left" distance={32}>
            <ContactHours />
          </ScrollReveal>
          <ScrollReveal delay={210} direction="left" distance={32}>
            <div className="surface p-6 text-base leading-7 text-foreground/72">
              <p className="font-medium text-foreground">Ubicacion</p>
              <p className="mt-2">
                {page.locationText ||
                  "Atendemos con cita previa y gestionamos entregas locales desde Segovia."}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                {page.mapEmbed ? (
                  <Link
                    className={buttonVariants({
                      variant: "outline",
                      className: "rounded-full px-5",
                    })}
                    href={page.mapEmbed}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Abrir en Google Maps
                  </Link>
                ) : null}
                <Link
                  className={buttonVariants({
                    variant: "secondary",
                    className: "rounded-full px-5",
                  })}
                  href={orderLinks.glovo}
                  rel="noreferrer"
                  target="_blank"
                >
                  Pedir en Glovo
                </Link>
                <Link
                  className={buttonVariants({
                    variant: "outline",
                    className: "rounded-full px-5",
                  })}
                  href={orderLinks.justEat}
                  rel="noreferrer"
                  target="_blank"
                >
                  Pedir en Just Eat
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <div className="mt-6">
        <ScrollReveal className="surface p-6 md:p-8" distance={34}>
          <SectionHeading
            eyebrow="Formulario"
            title="Cuéntanos que necesitas"
            description={page.formText}
          />
          <div className="mt-6">
            <ContactForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
