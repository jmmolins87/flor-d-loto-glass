import Link from "next/link";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { buttonVariants } from "@/lib/button-styles";

export function EmptyState({
  title,
  description,
  href = "/contacto",
  cta = "Contactar",
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <ScrollReveal className="surface flex flex-col items-start gap-4 p-8 md:p-10" distance={28}>
      <span className="eyebrow">Contenido pendiente</span>
      <div className="space-y-2">
        <h2 className="text-3xl text-foreground">{title}</h2>
        <p className="max-w-2xl text-foreground/72">{description}</p>
      </div>
      <Link className={buttonVariants()} href={href}>
        {cta}
      </Link>
    </ScrollReveal>
  );
}
