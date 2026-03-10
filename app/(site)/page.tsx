import Link from "next/link";
import {
  Flower2,
  Gift,
  HandHelping,
  House,
  MapPin,
  RefreshCw,
  Sparkles,
  Truck,
} from "lucide-react";

import { CollectionCard } from "@/components/cards/collection-card";
import { OccasionCard } from "@/components/cards/occasion-card";
import { CTASection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PromoBanner } from "@/components/sections/promo-banner";
import { SectionHeading } from "@/components/sections/section-heading";
import { CmsImage } from "@/components/shared/cms-image";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo/metadata";
import { getHomePage, getSiteSettings } from "@/lib/sanity/fetch";

const services = [
  {
    title: "Servicio a domicilio Premium",
    icon: Truck,
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
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);

  return (
    <>
      <HeroSection hero={home.hero} />
      <section className="shell section-space">
        <div className="section-grid items-start lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="El arte de las flores"
            title="Las flores son nuestras mejores aliadas para sorprender, emocionar y transmitir emociones."
            description="Siempre trabajamos con total atencion al detalle y al acabado para que cada ramo, centro o composicion se sienta especial desde el primer vistazo."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Flores frescas seleccionadas con criterio de temporada.",
              "Colecciones claras para decidir rapido sin sacrificar gusto.",
              "Contacto directo para resolver encargos personalizados.",
              "Entrega local y experiencia editorial coherente de punta a punta.",
            ].map((item) => (
              <div
                key={item}
                className="surface flex min-h-32 items-end p-5 text-base leading-7 text-foreground/72"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <SectionHeading
          eyebrow="Nuestros servicios"
          title="Servicio floral completo para regalar, mantener y asesorar con criterio."
          description="Flor de Loto no se limita a vender flores. Tambien entrega, mantiene y acompaña cada decision floral para que el resultado se vea bien y funcione de verdad en el contexto donde va a vivir."
        />
        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div key={service.title} className="surface p-7">
                <Badge className="rounded-full px-4 py-2">
                  <Icon className="mr-2 size-4" />
                  Servicio destacado
                </Badge>
                <h3 className="mt-5 text-3xl text-foreground">{service.title}</h3>
                <p className="mt-4 text-base leading-8 text-foreground/72">
                  {service.description}
                </p>
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
            );
          })}
        </div>
      </section>

      <section className="shell section-space">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Colecciones"
            title="Ramos y arreglos pensados para vivir bien en casa o regalar mejor."
          />
          <Link href="/catalogo" className="hidden text-base font-medium text-primary md:inline-flex">
            Ver todo el catalogo
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {home.featuredCollections.map((item) => (
            <CollectionCard key={item.slug.current} collection={item} />
          ))}
        </div>
      </section>

      <section className="shell section-space">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Ocasiones"
            title="Guias sutiles para regalar flores con sentido y sin duda."
          />
          <Link href="/ocasiones" className="hidden text-base font-medium text-primary md:inline-flex">
            Ver ocasiones
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {home.featuredOccasions.map((item) => (
            <OccasionCard key={item.slug.current} occasion={item} />
          ))}
        </div>
      </section>

      <PromoBanner banner={home.promoBanner} />

      <section className="shell section-space">
        <div className="surface overflow-hidden">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-5 p-8 md:p-12">
              <SectionHeading
                eyebrow="Diferencial de marca"
                title={home.brandSection.title}
                description={home.brandSection.text}
              />
              <ul className="grid gap-3 pt-2 text-base leading-7 text-foreground/72">
                {home.brandSection.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-2xl border border-border/70 bg-white/55 px-4 py-3"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[360px]">
              <CmsImage
                image={home.brandSection.image}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-8">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <div className="surface p-8">
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
            <Link className="mt-6 inline-flex text-base font-medium text-primary" href="/contacto">
              Ir a contacto
            </Link>
          </div>
          <div className="surface p-8">
            <p className="eyebrow">Horario</p>
            <div className="mt-4 space-y-3 text-foreground/72">
              {settings.openingHours?.map((item) => (
                <p key={`${item.day}-${item.hours}`}>
                  {item.day} · {item.hours}
                </p>
              ))}
              <p>Pedidos personalizados con atencion directa por WhatsApp.</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Badge className="rounded-full px-4 py-2">
                <Flower2 className="mr-2 size-4" />
                Flor fresca
              </Badge>
              <Badge className="rounded-full px-4 py-2" variant="outline">
                <Sparkles className="mr-2 size-4" />
                Acabado cuidado
              </Badge>
            </div>
          </div>
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
