import type {
  AboutPageData,
  Collection,
  ContactPageData,
  HomePage,
  LegalPageData,
  NavigationSettings,
  Occasion,
  SiteSettings,
} from "@/lib/sanity/types";

const heroImage =
  "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1400&q=80";
const studioImage =
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80";
const bouquetImage =
  "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80";
const peoniesImage =
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80";
const eventImage =
  "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80";
const bridalImage =
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80";
const preservedImage =
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80";
const plantsImage =
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80";
const funeralImage =
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80";
const basketImage =
  "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1200&q=80";
const atelierImage =
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80";

export const fallbackSiteSettings: SiteSettings = {
  siteName: "Flor de Loto",
  siteDescription:
    "Ramos contemporaneos, flores frescas y arreglos con sensibilidad artesanal para regalar y celebrar.",
  phone: "+34 691 26 41 12",
  email: "flordelotosegovia@gmail.com",
  whatsapp: "+34 691 26 41 12",
  address: "P.º Conde de Sepulveda, 24, 40006 Segovia, Segovia",
  socialLinks: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/flordelotosegovia/",
      openInNewTab: true,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100093329264769",
      openInNewTab: true,
    },
  ],
  openingHours: [
    { day: "Estado actual", hours: "Cerrado · Apertura: 10:00 (mie)" },
    { day: "Provincia", hours: "Segovia" },
  ],
  defaultSeo: {
    metaTitle: "Flor de Loto | Floristeria premium en Segovia",
    metaDescription:
      "Ramos de temporada, arreglos para ocasiones y atencion cercana para comprar flores con estilo.",
  },
};

export const fallbackNavigation: NavigationSettings = {
  headerLinks: [
    { label: "Inicio", href: "/" },
    { label: "Catalogo", href: "/catalogo" },
    { label: "Ocasiones", href: "/ocasiones" },
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  footerLinks: [
    { label: "Politica de privacidad", href: "/politica-privacidad" },
    { label: "Politica de cookies", href: "/politica-cookies" },
  ],
};

export const fallbackCollections: Collection[] = [
  {
    _id: "collection-1",
    title: "Ramos de temporada",
    slug: { current: "ramos-de-temporada" },
    excerpt: "Selecciones frescas y ligeras con flor cambiante cada semana.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Ramos pensados para regalar con naturalidad, usando texturas suaves y una paleta refinada.",
          },
        ],
      },
    ],
    coverImage: { url: bouquetImage, alt: "Ramo de temporada con flores suaves" },
    featured: true,
    seo: {
      metaTitle: "Ramos de temporada | Flor de Loto",
      metaDescription:
        "Ramos frescos con flor de temporada y composiciones elegantes para regalo o casa.",
    },
  },
  {
    _id: "collection-2",
    title: "Ramos de novia",
    slug: { current: "ramos-de-novia" },
    excerpt: "Diseños delicados para bodas con lectura romantica, limpia y actual.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Flor de Loto trabaja ramos de novia, prendidos y pequeños apoyos florales para ceremonias con una direccion cuidada y nada recargada.",
          },
        ],
      },
    ],
    coverImage: { url: bridalImage, alt: "Ramo de novia en tonos suaves" },
    featured: true,
  },
  {
    _id: "collection-3",
    title: "Flores para casa",
    slug: { current: "flores-para-casa" },
    excerpt: "Arreglos limpios para vestir salones, mesas y rincones con calma.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Pensado para clientes que quieren un detalle floral estable, bonito y facil de renovar.",
          },
        ],
      },
    ],
    coverImage: { url: peoniesImage, alt: "Centro floral para interior" },
    featured: true,
  },
  {
    _id: "collection-4",
    title: "Eventos intimistas",
    slug: { current: "eventos-intimistas" },
    excerpt: "Piezas para cenas, pedidas, firmas y celebraciones de aforo pequeno.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Diseñamos arreglos delicados para mesas, rincones de bienvenida y pequeños altares.",
          },
        ],
      },
    ],
    coverImage: { url: eventImage, alt: "Decoracion floral para evento" },
  },
  {
    _id: "collection-5",
    title: "Rosas preservadas",
    slug: { current: "rosas-preservadas" },
    excerpt: "Detalles de larga duracion para regalo, escritorio o rincon especial.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Una coleccion pensada para quienes buscan un gesto floral mas duradero, con acabados premium y presentacion cuidada.",
          },
        ],
      },
    ],
    coverImage: { url: preservedImage, alt: "Caja de rosas preservadas" },
  },
  {
    _id: "collection-6",
    title: "Cestas y centros florales",
    slug: { current: "cestas-y-centros-florales" },
    excerpt: "Formatos generosos para regalar en empresa, familia o celebracion.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Cestas de flores, centros decorativos y combinaciones listas para entregar con una presencia mas amplia y ceremonial.",
          },
        ],
      },
    ],
    coverImage: { url: basketImage, alt: "Cesta floral preparada para regalo" },
  },
  {
    _id: "collection-7",
    title: "Plantas para hogar y regalo",
    slug: { current: "plantas-para-hogar-y-regalo" },
    excerpt: "Seleccion de plantas para interior y exterior con asesoramiento sencillo.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Plantas faciles de mantener, opciones decorativas y regalos verdes para casa, oficina o terraza.",
          },
        ],
      },
    ],
    coverImage: { url: plantsImage, alt: "Plantas decorativas en maceta" },
  },
  {
    _id: "collection-8",
    title: "Coronas y flor funeral",
    slug: { current: "coronas-y-flor-funeral" },
    excerpt: "Arreglos sobrios y respetuosos para despedidas y homenajes.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Coronas, centros y composiciones funerarias preparadas con sensibilidad, rapidez y una presentacion digna.",
          },
        ],
      },
    ],
    coverImage: { url: funeralImage, alt: "Composicion floral sobria para homenaje" },
  },
];

export const fallbackOccasions: Occasion[] = [
  {
    _id: "occasion-1",
    title: "Cumpleanos con color",
    slug: { current: "cumpleanos-con-color" },
    excerpt: "Ramos alegres con gesto generoso y lectura actual.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Una opcion fresca para regalar sin caer en composiciones previsibles. Trabajamos gamas vivas, flor de temporada y formatos que se sienten festivos sin resultar estridentes.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Puede resolverse como ramo de mano, centro compacto o cesta floral, segun el tipo de regalo, la edad de la persona y el presupuesto disponible.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Que solemos recomendar" }],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Mezclas luminosas en rosas, melocoton, fucsia o amarillo suave, con verdes ligeros y una presentacion muy cuidada para entregar el mismo dia cuando es posible.",
          },
        ],
      },
    ],
    image: { url: peoniesImage, alt: "Flores de colores para cumpleanos" },
    featured: true,
  },
  {
    _id: "occasion-2",
    title: "Aniversarios serenos",
    slug: { current: "aniversarios-serenos" },
    excerpt: "Texturas suaves y una paleta elegante para celebrar con intimidad.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Pensado para regalos con tono sensible y duradero. Esta ocasion funciona especialmente bien con rosas, lisianthus, peonias y flor de gesto suave.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "La idea no es impresionar con volumen sin sentido, sino construir una pieza refinada, intima y facil de leer como un regalo importante.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Formatos disponibles" }],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Ramo premium, centro bajo para cena especial o composicion en caja, segun quieras un gesto romantico, domestico o mas ceremonial.",
          },
        ],
      },
    ],
    image: { url: bouquetImage, alt: "Ramo delicado para aniversario" },
    featured: true,
  },
  {
    _id: "occasion-3",
    title: "Gracias con estilo",
    slug: { current: "gracias-con-estilo" },
    excerpt: "Detalles florales faciles de regalar a equipos, clientes o anfitriones.",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Una linea sobria, actual y muy facil de recibir. Ideal para agradecimientos profesionales, visitas, profesores, anfitriones o pequeños gestos de cierre.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Priorizamos formatos limpios, faciles de transportar y con una lectura elegante para que el regalo se perciba cuidado desde el primer momento.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Opciones habituales" }],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Mini ramo premium, cesta floral de escritorio, planta decorativa o detalle preservado con presentacion lista para entregar.",
          },
        ],
      },
    ],
    image: { url: studioImage, alt: "Flores elegantes para agradecer" },
  },
];

export const fallbackHomePage: HomePage = {
  seo: {
    metaTitle: "Floristeria premium en Segovia | Flor de Loto",
    metaDescription:
      "Ramos de temporada, colecciones delicadas y una experiencia de compra clara y elegante.",
  },
  hero: {
    eyebrow: "Floristeria contemporanea en Segovia",
    title: "Flores con gesto sereno, composicion cuidada y compra facil.",
    subtitle:
      "Diseñamos ramos y arreglos con una mirada actual: frescos, elegantes y listos para regalar o llenar de vida cualquier espacio.",
    primaryCta: { label: "Ver colecciones", href: "/catalogo" },
    secondaryCta: { label: "Hablar por WhatsApp", href: "/contacto" },
    image: { url: heroImage, alt: "Ramo premium sobre mesa de piedra" },
  },
  introSection: {
    title: "Una floristeria local con servicio real para regalo, boda, hogar y despedida.",
    text: "Flor de Loto trabaja ramos, plantas, composiciones de boda, flor funeral, centros y detalles preservados con atencion cercana desde Segovia y opciones de pedido online.",
  },
  featuredCollections: fallbackCollections.slice(0, 3),
  featuredOccasions: fallbackOccasions.slice(0, 3),
  promoBanner: {
    title: "Entregas locales y encargos personalizados",
    text: "Ramos de novia, centros de mesa, plantas, cestas, rosas preservadas y encargos funerarios con compra online o atencion directa.",
    ctaLabel: "Cuéntanos tu idea",
    ctaHref: "/contacto",
    image: { url: atelierImage, alt: "Entrega y preparacion de encargos florales" },
    active: true,
  },
  brandSection: {
    title: "Trabajamos con ritmo editorial, no con catalogo rigido.",
    text: "La marca vive entre la naturalidad de la flor fresca y una direccion estetica contemporanea. Por eso cada seccion se siente limpia, premium y facil de recorrer.",
    points: [
      "Ramos, plantas y detalles florales para el dia a dia",
      "Flor para bodas, ceremonias y celebraciones especiales",
      "Coronas y arreglos funerarios preparados con rapidez y sensibilidad",
    ],
    image: { url: studioImage, alt: "Interior de estudio floral" },
  },
  finalCta: {
    title: "Cuéntanos qué necesitas y te ayudamos a prepararlo.",
    text: "Escribe, cuentanos la ocasion y te proponemos una solucion floral afinada, clara y lista para producir.",
    primaryCta: { label: "Contactar", href: "/contacto" },
    secondaryCta: { label: "Explorar ocasiones", href: "/ocasiones" },
  },
};

export const fallbackAboutPage: AboutPageData = {
  seo: {
      metaTitle: "Sobre Flor de Loto",
    metaDescription:
      "Conoce la filosofia de una floristeria contemporanea que combina cercania, gusto y oficio.",
  },
  heroTitle: "Flores para momentos reales, sin artificio.",
  heroText:
    "Flor de Loto nace para acercar una floristeria actual a personas que buscan belleza, calma y una experiencia sencilla al comprar flores.",
  mainImage: { url: studioImage, alt: "Equipo floral preparando arreglos" },
  bodySections: [
    {
      title: "Nuestra mirada",
      text: "Creemos en composiciones con aire, materiales frescos y una elegancia que no necesita exceso. La web traslada esa misma idea: limpieza visual, buen ritmo y decisiones claras.",
    },
    {
      title: "Como trabajamos",
      text: "Escuchamos la ocasion, proponemos opciones concretas y afinamos el pedido contigo. El objetivo es que la compra sea fluida y el resultado se vea realmente cuidado.",
    },
  ],
};

export const fallbackContactPage: ContactPageData = {
  seo: {
    metaTitle: "Contacto | Flor de Loto",
    metaDescription:
      "Habla con la floristeria para pedidos, encargos personalizados y consultas sobre entregas o eventos.",
  },
  heroTitle: "Hablemos de tu ramo, tu regalo o tu evento.",
  heroText:
    "Puedes escribirnos para un encargo puntual, una entrega especial o una propuesta floral adaptada a tu idea.",
  contactBlocks: [
    {
      title: "Telefono",
      description: "Atencion de lunes a sabado en horario comercial.",
      label: "Llamar",
      value: "691 26 41 12",
      href: "tel:+34691264112",
    },
    {
      title: "WhatsApp",
      description: "La via mas rapida para resolver encargos y dudas.",
      label: "Escribir",
      value: "691 26 41 12",
      href: "https://wa.me/34691264112",
    },
    {
      title: "Email",
      description: "Ideal para eventos, presupuestos y colaboraciones.",
      label: "Enviar email",
      value: "flordelotosegovia@gmail.com",
      href: "mailto:flordelotosegovia@gmail.com",
    },
  ],
  formText:
    "Cuanto mas contexto nos des, mejor podremos proponerte una solucion floral ajustada.",
  locationText:
    "Estamos en P.º Conde de Sepulveda, 24, 40006 Segovia, con atencion local para recogidas, encargos y entregas en la zona.",
  mapEmbed:
    "https://www.google.de/maps/place/P.%C2%BA+Conde+de+Sep%C3%BAlveda,+24,+40006+Segovia/@40.9380204,-4.1174955,17z/data=!3m1!4b1!4m6!3m5!1s0xd413ee3709ba6af:0x313b9efdebadc9d5!8m2!3d40.9380204!4d-4.1149206!16s%2Fg%2F11bw44h0yb?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D",
};

export const fallbackLegalPages: Record<"cookies" | "privacy", LegalPageData> = {
  cookies: {
    title: "Politica de cookies",
    type: "cookies",
    seo: {
      metaTitle: "Politica de cookies | Flor de Loto",
      metaDescription: "Informacion sobre el uso de cookies y preferencias de consentimiento.",
    },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Esta web utiliza cookies tecnicas necesarias y, solo con tu consentimiento, cookies analiticas y de marketing para mejorar la experiencia.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Categorias" }],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Necesarias: permiten el funcionamiento basico del sitio. Analiticas: ayudan a entender el uso. Marketing: permiten personalizacion y seguimiento publicitario.",
          },
        ],
      },
    ],
  },
  privacy: {
    title: "Politica de privacidad",
    type: "privacy",
    seo: {
      metaTitle: "Politica de privacidad | Flor de Loto",
      metaDescription: "Tratamiento de datos personales en formularios y comunicaciones con la floristeria.",
    },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Los datos enviados por formulario o correo se utilizan unicamente para responder a tu consulta, gestionar presupuestos y mantener la comunicacion relacionada con el encargo.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Derechos" }],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Puedes solicitar acceso, rectificacion o eliminacion escribiendo a flordelotosegovia@gmail.com.",
          },
        ],
      },
    ],
  },
};
