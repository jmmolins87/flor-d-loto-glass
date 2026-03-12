export type StaticPageSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type StaticPageContent = {
  title: string;
  eyebrow: string;
  description: string;
  path: string;
  sections: StaticPageSection[];
};

export const faqsPage: StaticPageContent = {
  title: "FAQ's",
  eyebrow: "Ayuda",
  description:
    "Respuestas rápidas sobre encargos, entregas, personalización floral y tiempos habituales de preparación.",
  path: "/faqs",
  sections: [
    {
      title: "Encargos y disponibilidad",
      paragraphs: [
        "Trabajamos con flor fresca y colecciones estacionales, así que la disponibilidad puede variar según la semana y el tipo de encargo.",
        "Si necesitas una composición concreta, lo mejor es escribirnos con antelación para confirmar materiales, formato y fecha de entrega.",
      ],
    },
    {
      title: "Entregas y recogidas",
      paragraphs: [
        "Gestionamos entregas locales y también puedes recoger tu pedido en tienda cuando te resulte más cómodo.",
      ],
      bullets: [
        "Las entregas especiales o con franja concreta deben consultarse antes de confirmar.",
        "Para eventos o ceremonias recomendamos reservar con la máxima antelación posible.",
      ],
    },
    {
      title: "Personalización",
      paragraphs: [
        "Podemos adaptar paleta, volumen, estilo y mensaje según ocasión, presupuesto y destino del arreglo floral.",
      ],
    },
  ],
};

export const legalInfoPage: StaticPageContent = {
  title: "Legal",
  eyebrow: "Legal",
  description:
    "Información general sobre identificación del titular, uso del sitio y marco básico aplicable a esta web.",
  path: "/legal",
  sections: [
    {
      title: "Titularidad del sitio",
      paragraphs: [
        "Esta página reúne la información general de carácter legal relativa al uso del sitio web de Flor de Loto.",
        "Los datos completos del titular, contacto y condiciones aplicables deben mantenerse actualizados y coherentes con la actividad real del negocio.",
      ],
    },
    {
      title: "Uso de la web",
      paragraphs: [
        "El acceso a esta web implica un uso adecuado de sus contenidos, formularios y recursos, evitando cualquier actuación contraria a la ley o que perjudique al servicio.",
      ],
    },
  ],
};

export const termsPage: StaticPageContent = {
  title: "Términos de uso",
  eyebrow: "Legal",
  description:
    "Condiciones básicas de navegación, uso de contenidos y limitaciones aplicables a los servicios ofrecidos desde la web.",
  path: "/terminos-de-uso",
  sections: [
    {
      title: "Condiciones generales",
      paragraphs: [
        "El contenido del sitio tiene finalidad informativa y comercial vinculada a los servicios y productos de Flor de Loto.",
        "La navegación por la web no establece por sí misma una relación contractual distinta de la que pueda formalizarse posteriormente por encargo o compra.",
      ],
    },
    {
      title: "Propiedad intelectual",
      paragraphs: [
        "Textos, imágenes, marca, diseño y demás elementos del sitio están protegidos y no pueden reutilizarse sin autorización cuando resulte exigible.",
      ],
    },
  ],
};

export const securityPage: StaticPageContent = {
  title: "Seguridad",
  eyebrow: "Confianza",
  description:
    "Compromisos básicos sobre protección del sitio, tratamiento responsable de datos y buenas prácticas de seguridad.",
  path: "/seguridad",
  sections: [
    {
      title: "Protección del sitio",
      paragraphs: [
        "Aplicamos medidas razonables para proteger el sitio, reducir accesos no autorizados y mantener la continuidad del servicio.",
      ],
      bullets: [
        "Revisión periódica de accesos administrativos.",
        "Actualización de dependencias y servicios cuando procede.",
        "Uso limitado de datos personales a los fines informados.",
      ],
    },
    {
      title: "Comunicación de incidencias",
      paragraphs: [
        "Si detectas un problema de seguridad o un comportamiento anómalo, puedes escribirnos por los canales de contacto del sitio para revisarlo con la mayor rapidez posible.",
      ],
    },
  ],
};
