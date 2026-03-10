import Link from "next/link";

import { CmsImage } from "@/components/shared/cms-image";
import { buttonVariants } from "@/lib/button-styles";
import type { PromoBannerData } from "@/lib/sanity/types";

export function PromoBanner({ banner }: { banner?: PromoBannerData | null }) {
  if (!banner?.active) {
    return null;
  }

  return (
    <section className="shell section-space">
      <div className="surface overflow-hidden">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[320px] lg:min-h-[100%]">
            <CmsImage
              image={banner.image}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-5 p-8 md:p-12">
            <span className="eyebrow">Servicio destacado</span>
            <h2 className="text-4xl leading-tight text-foreground md:text-5xl">
              {banner.title}
            </h2>
            {banner.text ? (
              <p className="max-w-xl text-lg leading-8 text-foreground/72">
                {banner.text}
              </p>
            ) : null}
            {banner.ctaLabel && banner.ctaHref ? (
              <Link className={buttonVariants({ className: "rounded-full px-7" })} href={banner.ctaHref}>
                {banner.ctaLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
