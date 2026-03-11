import Link from "next/link";
import {
  Gift,
  HandHelping,
  House,
  MapPin,
  RefreshCw,
  Truck,
} from "lucide-react";

import { CollectionCard } from "@/components/cards/collection-card";
import { OccasionCard } from "@/components/cards/occasion-card";
import { CTASection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HoursOverview } from "@/components/sections/hours-overview";
import { PromoBanner } from "@/components/sections/promo-banner";
import { SectionHeading } from "@/components/sections/section-heading";
import { CmsImage } from "@/components/shared/cms-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo/metadata";
import { getHomePage } from "@/lib/sanity/fetch";
import { deliveryHours, formatHoursRow, weekdayLabels } from "@/lib/store-hours";

const services = [
  {
    title: "Servicio a domicilio Premium",
    icon: Truck,
    badge: "Entrega cuidada",
    details: [
      {
        label: "Pensado para",
        text: "Regalos, detalles urgentes y encargos para casa sin desplazarte.",
      },
      {
        label: "Cobertura",
        text: "Segovia y alrededores con entrega clara y preparacion cuidada.",
      },
    ],
    description:
      "Quieres sorprender a alguien especial o decorar tu hogar sin moverte del sofa. En Flor de Loto llevamos tus flores donde nos digas, con una entrega cuidada y una experiencia clara desde el pedido hasta la recepcion.",
    bullets: [
      "Ramos personalizados",
      "Entregas en el mismo dia segun disponibilidad",
      "Servicio en Segovia y alrededores",
      "Tarjeta dedicatoria y envoltorios especiales",
    ],
  },
  {
    title: "Servicio de Mantenimiento",
    icon: RefreshCw,
    badge: "Cuidado recurrente",
    details: [
      {
        label: "Pensado para",
        text: "Negocios y espacios que necesitan verse vivos de forma constante.",
      },
      {
        label: "Frecuencia",
        text: "Plan semanal, quincenal o mensual segun el ritmo del espacio.",
      },
    ],
    description:
      "No solo creamos arreglos florales: tambien los cuidamos para que luzcan siempre perfectos. Es una solucion pensada para negocios, eventos y espacios que quieren verse vivos, cuidados y coherentes cada semana.",
    bullets: [
      "Oficinas, despachos, hoteles y restaurantes",
      "Visitas periodicas para renovar y mantener arreglos",
      "Riego, limpieza y sustitucion segun necesidad",
      "Frecuencia semanal, quincenal o mensual",
    ],
  },
  {
    title: "Asesoramiento Personalizado",
    icon: HandHelping,
    badge: "Guia floral",
    details: [
      {
        label: "Pensado para",
        text: "Bodas, eventos, regalos y decisiones florales con mas contexto.",
      },
      {
        label: "Resultado",
        text: "Propuestas afinadas a estilo, ocasion, presupuesto y espacio real.",
      },
    ],
    description:
      "Te ayudamos a elegir las flores adecuadas para cada ocasion, espacio o persona. Nuestro asesoramiento floral esta pensado para quienes quieren transmitir emociones, decorar con sentido o construir un momento inolvidable.",
    bullets: [
      "Decoracion floral para bodas, eventos y celebraciones",
      "Ideas para hogar o negocio con flores y plantas",
      "Combinaciones de color, flor y estilo adaptadas a ti",
      "Consejos de cuidado, mantenimiento y duracion",
    ],
  },
];

export async function generateMetadata() {
  const home = await getHomePage();
  return buildMetadata({ seo: home.seo, path: "/" });
}

export default async function HomePage() {
  const home = await getHomePage();

  return (
    <>
      <HeroSection hero={home.hero} />
      <section className="shell section-space">
        <div className="section-grid items-center lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal distance={34}>
            <SectionHeading
              eyebrow="El arte de las flores"
              title="Las flores son nuestras mejores aliadas para sorprender, emocionar y transmitir emociones."
              description="Siempre trabajamos con total atencion al detalle y al acabado para que cada ramo, centro o composicion se sienta especial desde el primer vistazo."
            />
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Flores frescas seleccionadas con criterio de temporada.",
              "Colecciones claras para decidir rapido sin sacrificar gusto.",
              "Contacto directo para resolver encargos personalizados.",
              "Entrega local y experiencia editorial coherente de punta a punta.",
            ].map((item, index) => (
              <ScrollReveal key={item} delay={index * 90} direction="left" distance={24}>
                <div className="surface p-5">
                  <p className="text-base leading-7 text-foreground/72">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <ScrollReveal distance={34}>
          <SectionHeading
            eyebrow="Nuestros servicios"
            title="Servicio floral completo para regalar, mantener y asesorar con criterio."
            description="Flor de Loto no se limita a vender flores. Tambien entrega, mantiene y acompaña cada decision floral para que el resultado se vea bien y funcione de verdad en el contexto donde va a vivir."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <ScrollReveal key={service.title} className="h-full" delay={index * 110} distance={28}>
                <div className="surface flex h-full flex-col p-7">
                  <Badge className="rounded-full px-4 py-2">
                    <Icon className="mr-2 size-4" />
                    {service.badge}
                  </Badge>
                  <h3 className="mt-5 text-3xl text-foreground">{service.title}</h3>
                  <p className="mt-4 text-base leading-8 text-foreground/72">
                    {service.description}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    {service.details.map((detail) => (
                      <div
                        key={detail.label}
                        className="rounded-[1.25rem] border border-primary/10 bg-white/38 px-4 py-4"
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
                          {detail.label}
                        </p>
                        <p className="mt-2 text-base leading-7 text-foreground/72">
                          {detail.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-3">
                    {service.bullets.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.25rem] border border-white/70 bg-white/45 px-4 py-3 text-base leading-7 text-foreground/72"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="shell section-space">
        <div className="mb-10 flex items-end justify-between gap-6">
          <ScrollReveal distance={30}>
            <SectionHeading
              eyebrow="Colecciones"
              title="Ramos y arreglos pensados para vivir bien en casa o regalar mejor."
            />
          </ScrollReveal>
          <Link href="/catalogo" className="hidden text-base font-medium text-primary md:inline-flex">
            Ver todo el catalogo
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {home.featuredCollections.map((item, index) => (
            <ScrollReveal key={item.slug.current} delay={index * 80} distance={24}>
              <CollectionCard collection={item} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="shell section-space">
        <div className="mb-10 flex items-end justify-between gap-6">
          <ScrollReveal distance={30}>
            <SectionHeading
              eyebrow="Ocasiones"
              title="Guias sutiles para regalar flores con sentido y sin duda."
            />
          </ScrollReveal>
          <Link href="/ocasiones" className="hidden text-base font-medium text-primary md:inline-flex">
            Ver ocasiones
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {home.featuredOccasions.map((item, index) => (
            <ScrollReveal key={item.slug.current} delay={index * 80} distance={24}>
              <OccasionCard occasion={item} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <PromoBanner banner={home.promoBanner} />

      <section className="shell section-space">
        <ScrollReveal className="surface overflow-hidden" distance={36}>
          <div className="p-8 md:p-12">
            <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
              <ScrollReveal distance={28}>
                <SectionHeading
                  eyebrow="Diferencial de marca"
                  title={home.brandSection.title}
                  description={home.brandSection.text}
                />
              </ScrollReveal>
              <ScrollReveal
                className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/80"
                delay={120}
                direction="left"
                distance={36}
              >
                <CmsImage
                  image={home.brandSection.image}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </ScrollReveal>
            </div>
            <ul className="mt-8 grid gap-3 text-base leading-7 text-foreground/72 md:grid-cols-3">
              {home.brandSection.points.map((point, index) => (
                <ScrollReveal key={point} as="li" delay={index * 80} distance={22}>
                  <div className="rounded-2xl border border-border/70 bg-white/55 px-4 py-3">
                    {point}
                  </div>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      <section className="shell pb-8">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <ScrollReveal className="surface p-8" distance={34}>
            <p className="eyebrow">Contacto resumido</p>
            <h2 className="mt-4 text-4xl text-foreground">Compra facil, trato cercano.</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-foreground/72">
              Escríbenos para encargos express, regalos con entrega local o propuestas para eventos pequeños.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Badge className="rounded-full px-4 py-2">
                <MapPin className="mr-2 size-4" />
                Segovia
              </Badge>
              <Badge className="rounded-full px-4 py-2" variant="secondary">
                <Gift className="mr-2 size-4" />
                Pedido online
              </Badge>
              <Badge className="rounded-full px-4 py-2" variant="outline">
                <House className="mr-2 size-4" />
                Entrega a domicilio
              </Badge>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-border/70 bg-white/45 p-5">
              <p className="text-lg font-semibold text-foreground">Entregas a domicilio</p>
              <div className="mt-4 grid gap-3 text-sm leading-6 text-foreground/72 sm:grid-cols-2">
                {weekdayLabels.map((day, index) => (
                  <div
                    key={day}
                    className="rounded-xl border border-white/70 bg-white/55 px-3 py-2"
                  >
                    <p className="font-medium text-foreground">{day}</p>
                    <p>{formatHoursRow(deliveryHours[index])}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link className="mt-6 inline-flex text-base font-medium text-primary" href="/contacto">
              Ir a contacto
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={140} direction="left" distance={34}>
            <div className="space-y-4">
              <HoursOverview />
              <div className="surface p-6">
                <div className="grid gap-3">
                  <div className="rounded-[1.35rem] border border-white/70 bg-white/58 px-4 py-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
                      Ubicacion
                    </p>
                    <p className="mt-2 text-base leading-7 text-foreground/72">
                      Paseo Conde de Sepulveda, 24. Atendemos tienda, encargos locales y recogidas.
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/70 bg-white/58 px-4 py-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
                      Encargos
                    </p>
                    <p className="mt-2 text-base leading-7 text-foreground/72">
                      Si necesitas preparar un regalo o confirmar una entrega, lo mas agil es escribirnos antes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        title={home.finalCta.title}
        text={home.finalCta.text}
        primaryCta={home.finalCta.primaryCta}
        secondaryCta={home.finalCta.secondaryCta}
      />
    </>
  );
}
