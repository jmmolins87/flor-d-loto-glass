import { notFound } from "next/navigation";

import { CTASection } from "@/components/sections/cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CmsImage } from "@/components/shared/cms-image";
import { BreadcrumbSchema, ServiceSchema, WebPageSchema } from "@/components/shared/page-schema";
import { PortableTextContent } from "@/components/shared/portable-text";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCollectionBySlug, getCollections } from "@/lib/sanity/fetch";

const collectionGuides: Record<
  string,
  {
    intro: string;
    details: string[];
    highlights: { label: string; text: string }[];
  }
> = {
  "ramos-de-temporada": {
    intro:
      "Esta coleccion funciona bien cuando buscas flor fresca con un resultado natural, actual y facil de regalar. La gracia esta en trabajar con lo mejor de cada momento, no en repetir siempre la misma formula.",
    details: [
      "Solemos construir estos ramos con flor cambiante, verdes ligeros y una lectura limpia para que el conjunto se vea fresco y no excesivamente armado.",
      "Es una buena opcion tanto para regalo espontaneo como para casa, porque mantiene una presencia elegante sin pedir un montaje demasiado ceremonial.",
    ],
    highlights: [
      {
        label: "Ideal para",
        text: "Cumpleanos, detalles de agradecimiento, visitas y regalos de ultima hora con buen gusto.",
      },
      {
        label: "Sensacion",
        text: "Ligereza, frescura visual y composiciones que se sienten vivas en lugar de rigidas.",
      },
      {
        label: "Formato",
        text: "Ramo de mano con envoltura cuidada y tamaño adaptado al presupuesto o a la ocasion.",
      },
    ],
  },
  "ramos-de-novia": {
    intro:
      "Aqui el trabajo no consiste solo en hacer un ramo bonito. Hay que ajustar escala, caida, color y textura al vestido, al tipo de ceremonia y a la forma en que quieres recordar ese dia.",
    details: [
      "Planteamos propuestas romanticas y actuales, evitando soluciones recargadas o demasiado clasicas si no encajan con la estetica de la boda.",
      "Tambien podemos extender el lenguaje floral a prendidos, tocados, pequeños centros o detalles de apoyo para mantener coherencia visual en todo el conjunto.",
    ],
    highlights: [
      {
        label: "Ideal para",
        text: "Bodas civiles, ceremonias intimas y celebraciones donde importa mucho la delicadeza del acabado.",
      },
      {
        label: "Enfoque",
        text: "Paletas suaves, flor refinada y lectura editorial para que la pieza envejezca bien en foto y en directo.",
      },
      {
        label: "Proceso",
        text: "Se adapta a vestido, temporada, presupuesto y nivel de protagonismo que buscas en el ramo.",
      },
    ],
  },
  "flores-para-casa": {
    intro:
      "No todo arreglo floral para casa necesita grandilocuencia. Esta coleccion esta pensada para introducir color, textura y calma en espacios reales que se usan cada dia.",
    details: [
      "Priorizamos formatos comodos de colocar en mesa, recibidor, cocina o salon, con composiciones que decoran sin saturar el ambiente.",
      "Es una linea util para quien quiere renovar su casa con frecuencia y mantener una estetica cuidada sin complicarse con montajes muy exigentes.",
    ],
    highlights: [
      {
        label: "Ideal para",
        text: "Salones, mesas de comedor, rincones de lectura, recibidores y pequeños espacios de trabajo.",
      },
      {
        label: "Estilo",
        text: "Composiciones sobrias, limpias y faciles de integrar en interiores contemporaneos o calidos.",
      },
      {
        label: "Mantenimiento",
        text: "Se buscan flores y formatos razonables de cuidar para que el resultado dure bien en el dia a dia.",
      },
    ],
  },
  "eventos-intimistas": {
    intro:
      "Cuando el evento es pequeño, cada gesto se nota mas. Por eso esta coleccion pone el foco en piezas precisas, proporcionadas y con una presencia muy afinada.",
    details: [
      "Trabajamos arreglos para mesas, puntos de bienvenida, rincones de firma o celebraciones privadas donde el ambiente necesita un apoyo floral elegante y discreto.",
      "La clave suele estar en la coherencia: menos volumen innecesario y mas atencion al tono, a la escala y a la relacion entre flores, mobiliario y luz.",
    ],
    highlights: [
      {
        label: "Ideal para",
        text: "Pedidas, cenas especiales, firmas, bautizos pequenos y celebraciones privadas.",
      },
      {
        label: "Estetica",
        text: "Piezas serenas, bien proporcionadas y pensadas para acompañar sin invadir.",
      },
      {
        label: "Cobertura",
        text: "Se puede resolver desde un par de centros hasta una direccion floral ligera del conjunto.",
      },
    ],
  },
  "rosas-preservadas": {
    intro:
      "Esta coleccion responde a una necesidad distinta: regalar flores con una duracion mucho mayor sin perder sensacion de detalle premium.",
    details: [
      "Las rosas preservadas funcionan especialmente bien en formatos de caja, cúpula o pieza de escritorio, donde el acabado y la presentacion pesan tanto como la flor.",
      "Es una opcion muy util para regalos con vocacion de permanencia, detalles de pareja o gestos corporativos que quieren dejar una huella mas duradera.",
    ],
    highlights: [
      {
        label: "Ideal para",
        text: "Aniversarios, regalos de despacho, detalles de marca y ocasiones donde importa la permanencia.",
      },
      {
        label: "Ventaja",
        text: "Aporta impacto visual y recuerdo prolongado con poco mantenimiento.",
      },
      {
        label: "Presentacion",
        text: "Cajas, piezas compactas y acabados muy cuidados listos para entregar.",
      },
    ],
  },
  "cestas-y-centros-florales": {
    intro:
      "Cuando hace falta una presencia mas generosa o una entrega mas ceremonial, esta coleccion ofrece formatos con mayor cuerpo y lectura de regalo importante.",
    details: [
      "Las cestas y centros permiten trabajar mejor el volumen, el gesto y la estabilidad visual, por eso suelen encajar bien en regalos familiares, empresas o celebraciones.",
      "Tambien son una buena via cuando la pieza va a colocarse directamente en una mesa o en un espacio visible y conviene que llegue ya resuelta.",
    ],
    highlights: [
      {
        label: "Ideal para",
        text: "Regalos colectivos, celebraciones familiares, nacimientos, empresas y visitas señaladas.",
      },
      {
        label: "Presencia",
        text: "Mayor volumen y sensacion de abundancia sin caer en composiciones toscas.",
      },
      {
        label: "Entrega",
        text: "Formato comodo para recibir y colocar directamente en casa o en un negocio.",
      },
    ],
  },
  "plantas-para-hogar-y-regalo": {
    intro:
      "Las plantas cubren un terreno diferente al de la flor cortada: decoran, duran mas y permiten regalar algo vivo con un uso cotidiano muy claro.",
    details: [
      "Seleccionamos opciones decorativas y asumibles de cuidar, buscando que funcionen tanto para quien ya convive con plantas como para quien empieza.",
      "Esta linea encaja muy bien en regalos de casa nueva, escritorio, terraza o pequeños gestos donde se valora la continuidad mas que el impacto puntual.",
    ],
    highlights: [
      {
        label: "Ideal para",
        text: "Hogar, oficina, terrazas, regalos de bienvenida y detalles faciles de mantener.",
      },
      {
        label: "Criterio",
        text: "Plantas decorativas con lectura limpia y asesoria sencilla para no fallar en la eleccion.",
      },
      {
        label: "Duracion",
        text: "Una opcion mas estable para quien quiere color y vida durante mas tiempo.",
      },
    ],
  },
  "coronas-y-flor-funeral": {
    intro:
      "En esta coleccion importa tanto la sensibilidad como la rapidez. El objetivo es resolver con respeto, claridad y una presencia sobria adecuada al contexto.",
    details: [
      "Preparamos coronas, centros y composiciones de condolencia con un lenguaje contenido, evitando excesos y priorizando una lectura digna y serena.",
      "Tambien acompañamos la eleccion del formato segun destino, tipo de ceremonia y tiempo disponible, porque suele ser un encargo que necesita respuesta agil.",
    ],
    highlights: [
      {
        label: "Ideal para",
        text: "Funerales, velatorios, homenajes y mensajes florales de condolencia o despedida.",
      },
      {
        label: "Tono",
        text: "Sobriedad, respeto y presentacion cuidada sin dramatizacion innecesaria.",
      },
      {
        label: "Gestion",
        text: "Resolucion rapida y orientacion clara en un momento donde conviene simplificar decisiones.",
      },
    ],
  },
};

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
    keywords: [collection.title, "catalogo floral", "flores en Segovia", "ramos a domicilio"],
  });
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  const guide = collectionGuides[slug];

  if (!collection) {
    notFound();
  }

  const path = `/catalogo/${collection.slug.current}`;
  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: "Catalogo", path: "/catalogo" },
    { name: collection.title, path },
  ];

  return (
    <>
      <section className="shell section-space">
        <BreadcrumbSchema items={breadcrumbItems} />
        <WebPageSchema
          type="ItemPage"
          name={collection.title}
          description={collection.excerpt}
          path={path}
        />
        <ServiceSchema
          name={collection.title}
          description={collection.excerpt}
          path={path}
          image={collection.coverImage}
          serviceType="Coleccion floral"
        />
        <Breadcrumbs items={breadcrumbItems} />
        <div className="section-grid items-start lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal className="space-y-6" distance={34}>
            <SectionHeading
              eyebrow="Coleccion"
              title={collection.title}
              description={collection.excerpt}
            />
            <ScrollReveal delay={80} distance={24}>
              <PortableTextContent value={collection.description} />
            </ScrollReveal>
            {guide ? (
              <div className="space-y-6">
                <ScrollReveal className="space-y-4 text-base leading-8 text-foreground/72" delay={140} distance={24}>
                  <p>{guide.intro}</p>
                  {guide.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </ScrollReveal>
                <div className="grid gap-4 md:grid-cols-3">
                  {guide.highlights.map((item, index) => (
                    <ScrollReveal key={item.label} delay={index * 90} distance={22}>
                      <div className="surface p-5">
                        <p className="eyebrow text-primary">{item.label}</p>
                        <p className="mt-3 text-base leading-7 text-foreground/72">
                          {item.text}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ) : null}
          </ScrollReveal>
          <ScrollReveal
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/80"
            delay={140}
            direction="left"
            distance={38}
          >
            <CmsImage
              image={collection.coverImage}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </ScrollReveal>
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
