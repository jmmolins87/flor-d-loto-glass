import Link from "next/link";

import { ContactForm } from "@/components/forms/contact-form";
import { ContactSection } from "@/components/sections/contact-section";
import { SectionHeading } from "@/components/sections/section-heading";
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
  });
}

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <section className="shell section-space">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <SectionHeading eyebrow="Contacto" title={page.heroTitle} description={page.heroText} />
          <ContactSection blocks={page.contactBlocks} />
          <div className="surface p-6 text-base leading-7 text-foreground/72">
            <p className="font-medium text-foreground">Ubicacion</p>
            <p className="mt-2">
              {page.locationText ||
                "Atendemos con cita previa y gestionamos entregas locales desde Madrid."}
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
        </div>
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Formulario"
            title="Cuéntanos que necesitas"
            description={page.formText}
          />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
