import Link from "next/link";

import { buttonVariants } from "@/lib/button-styles";
import type { LinkItem } from "@/lib/sanity/types";

export function CTASection({
  title,
  text,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  text: string;
  primaryCta?: LinkItem;
  secondaryCta?: LinkItem;
}) {
  return (
    <section className="shell section-space">
      <div className="surface px-8 py-10 md:px-12 md:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="eyebrow">CTA final</span>
            <h2 className="text-4xl leading-tight text-foreground md:text-5xl">
              {title}
            </h2>
            <p className="text-lg leading-8 text-foreground/72">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {primaryCta ? (
              <Link
                className={buttonVariants({ size: "lg", className: "rounded-full px-7" })}
                href={primaryCta.href}
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "rounded-full border-primary/20 bg-white/60 px-7",
                })}
                href={secondaryCta.href}
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
