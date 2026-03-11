import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ContactBlock } from "@/lib/sanity/types";

function getIcon(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("whatsapp")) {
    return <MessageCircle className="size-4" />;
  }

  if (normalized.includes("telefono")) {
    return <Phone className="size-4" />;
  }

  if (normalized.includes("email")) {
    return <Mail className="size-4" />;
  }

  return <MapPin className="size-4" />;
}

export function ContactSection({ blocks }: { blocks: ContactBlock[] }) {
  return (
    <section className="section-grid grid-cols-1">
      {blocks.map((block, index) => (
        <ScrollReveal key={`${block.title}-${block.value}`} delay={index * 90} distance={28}>
          <Card className="w-full rounded-[1.5rem] border-white/80 bg-white/80">
            <CardContent className="space-y-3 p-6">
              <Badge className="w-fit rounded-full px-3 py-1.5" variant="outline">
                {getIcon(block.title)}
                <span className="ml-1">{block.title}</span>
              </Badge>
              <h3 className="text-2xl text-foreground">{block.title}</h3>
              {block.description ? (
                <p className="text-base leading-7 text-foreground/72">
                  {block.description}
                </p>
              ) : null}
              {block.href && block.label ? (
                <Link className="inline-flex text-base font-medium text-primary" href={block.href}>
                  {block.label}: {block.value}
                </Link>
              ) : block.value ? (
                <p className="text-base font-medium text-foreground">{block.value}</p>
              ) : null}
            </CardContent>
          </Card>
        </ScrollReveal>
      ))}
    </section>
  );
}
