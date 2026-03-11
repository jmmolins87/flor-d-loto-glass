import Link from "next/link";
import { Flower2, MapPin, Sparkles } from "lucide-react";

import { CmsImage } from "@/components/shared/cms-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-styles";
import type { HeroData } from "@/lib/sanity/types";

export function HeroSection({ hero }: { hero: HeroData }) {
  return (
    <section className="shell section-space pt-10">
      <div className="section-grid items-center lg:grid-cols-[1.05fr_0.95fr]">
        <ScrollReveal className="space-y-8" distance={40}>
          <div className="space-y-6">
            {hero.eyebrow ? <Badge className="rounded-full px-3 py-1">{hero.eyebrow}</Badge> : null}
            <h1 className="max-w-3xl text-6xl leading-[0.92] text-foreground md:text-7xl">
              {hero.title}
            </h1>
            {hero.subtitle ? (
              <p className="max-w-2xl text-lg leading-8 text-foreground/72 md:text-xl">
                {hero.subtitle}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Badge className="rounded-full px-3 py-1.5">
                <Flower2 className="mr-1 size-3.5" />
                Flor fresca
              </Badge>
              <Badge className="rounded-full px-3 py-1.5" variant="secondary">
                <MapPin className="mr-1 size-3.5" />
                Segovia
              </Badge>
              <Badge className="rounded-full px-3 py-1.5" variant="outline">
                <Sparkles className="mr-1 size-3.5" />
                Encargos a medida
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {hero.primaryCta ? (
              <Link
                className={buttonVariants({ size: "lg", className: "rounded-full px-7" })}
                href={hero.primaryCta.href}
              >
                {hero.primaryCta.label}
              </Link>
            ) : null}
            {hero.secondaryCta ? (
              <Link
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "rounded-full border-primary/20 bg-white/60 px-7",
                })}
                href={hero.secondaryCta.href}
              >
                {hero.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </ScrollReveal>
        <ScrollReveal
          className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/58 p-3 shadow-[0_40px_100px_-50px_rgba(40,65,48,0.45)] backdrop-blur-xl"
          delay={140}
          direction="left"
          distance={48}
        >
          <div className="absolute -left-10 top-12 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(143,229,214,0.7),transparent_68%)] blur-2xl" />
          <div className="absolute -right-8 bottom-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(190,154,255,0.62),transparent_70%)] blur-2xl" />
          <div className="absolute inset-x-8 top-8 z-10 flex justify-between text-base uppercase tracking-[0.24em] text-white/90">
            <span>Flor fresca</span>
            <span>Entrega local</span>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <CmsImage
              image={hero.image}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
