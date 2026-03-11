import { ComposeIcon, CogIcon, HomeIcon, SearchIcon } from "@sanity/icons";
import type { ComponentType } from "react";

type GuideSection = {
  title: string;
  icon: ComponentType;
  tone: "primary" | "positive" | "caution";
  items: Array<{
    label: string;
    description: string;
    href: string;
  }>;
};

const guideSections: GuideSection[] = [
  {
    title: "Web",
    icon: HomeIcon,
    tone: "primary",
    items: [
      {
        label: "Inicio",
        description: "Controla hero, secciones editoriales, bloques destacados y CTA final de la home.",
        href: "/",
      },
      {
        label: "Sobre nosotros",
        description: "Edita el relato de marca, la presentacion del negocio y el contenido institucional.",
        href: "/sobre-nosotros",
      },
      {
        label: "Contacto",
        description: "Actualiza mensajes de contacto, ayuda editorial, mapa y bloque final de formulario.",
        href: "/contacto",
      },
    ],
  },
  {
    title: "Catalogo y ocasiones",
    icon: ComposeIcon,
    tone: "positive",
    items: [
      {
        label: "Colecciones",
        description: "Cada coleccion genera su ficha propia en catalogo y puede aparecer destacada en la home.",
        href: "/catalogo",
      },
      {
        label: "Ocasiones",
        description: "Cada ocasion crea una landing especifica con su slug y su contenido comercial.",
        href: "/ocasiones",
      },
      {
        label: "Banners promocionales",
        description: "Afectan a mensajes promocionales visibles en la home o en bloques destacados.",
        href: "/",
      },
    ],
  },
  {
    title: "Ajustes globales",
    icon: CogIcon,
    tone: "caution",
    items: [
      {
        label: "Ajustes del sitio",
        description: "Marca, datos de contacto, logo, SEO base y configuracion transversal de toda la web.",
        href: "/",
      },
      {
        label: "Navegacion",
        description: "Header, footer y enlaces globales visibles en toda la experiencia.",
        href: "/",
      },
      {
        label: "SEO reutilizable",
        description: "Recursos SEO comunes para reutilizar en varias paginas sin duplicar trabajo.",
        href: "/",
      },
    ],
  },
];

export function EditorialGuide() {
  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          border: "1px solid #d6d1c4",
          borderRadius: "20px",
          padding: "24px",
          background: "#f7f2e8",
          marginBottom: "24px",
        }}
      >
        <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Guia editorial
        </p>
        <h2 style={{ margin: "12px 0 0", fontSize: "28px", lineHeight: 1.2 }}>
          Que documento editar para cambiar cada zona de la web
        </h2>
        <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: 1.6, color: "#5f5a52" }}>
          Usa esta vista como referencia rapida antes de entrar a editar. Si tienes preview activado,
          abre la ruta correspondiente para revisar el cambio en contexto.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          marginBottom: "24px",
        }}
      >
        {guideSections.map((section) => {
          const Icon = section.icon;

          return (
            <section
              key={section.title}
              style={{
                border: "1px solid #d6d1c4",
                borderRadius: "20px",
                padding: "20px",
                background: "#fffdfa",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "12px",
                    background:
                      section.tone === "primary"
                        ? "#efe7d6"
                        : section.tone === "positive"
                          ? "#e8f2ea"
                          : "#f5ecd9",
                  }}
                >
                  <Icon />
                </div>
                <h3 style={{ margin: 0, fontSize: "18px" }}>{section.title}</h3>
              </div>

              <div style={{ display: "grid", gap: "12px" }}>
                {section.items.map((item) => (
                  <article
                    key={item.label}
                    style={{
                      border: "1px solid #e6e0d4",
                      borderRadius: "16px",
                      padding: "16px",
                      background: "#ffffff",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>{item.label}</p>
                    <p style={{ margin: "8px 0 0", fontSize: "14px", lineHeight: 1.6, color: "#5f5a52" }}>
                      {item.description}
                    </p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: "12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#1d4ed8",
                        textDecoration: "none",
                      }}
                    >
                      Ver ruta {item.href}
                    </a>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div
        style={{
          border: "1px solid #d6d1c4",
          borderRadius: "20px",
          padding: "20px",
          background: "#fffdfa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              background: "#efe7d6",
            }}
          >
            <SearchIcon />
          </div>
          <h3 style={{ margin: 0, fontSize: "18px" }}>Flujo recomendado</h3>
        </div>
        <p style={{ margin: "0 0 8px", fontSize: "14px", lineHeight: 1.6 }}>
          1. Entra en el documento correcto desde el menu lateral.
        </p>
        <p style={{ margin: "0 0 8px", fontSize: "14px", lineHeight: 1.6 }}>
          2. Edita titulo, textos, imagenes o enlaces del bloque correspondiente.
        </p>
        <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6 }}>
          3. Usa Presentation para abrir la ruta afectada y revisar el resultado antes de publicar.
        </p>
      </div>
    </div>
  );
}
