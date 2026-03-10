import Link from "next/link";
import Image from "next/image";

import { MobileNav } from "@/components/layout/mobile-nav";
import { buttonVariants } from "@/lib/button-styles";
import { orderLinks } from "@/lib/order-links";
import type { NavigationSettings, SiteSettings } from "@/lib/sanity/types";

export function SiteHeader({
  settings,
  navigation,
}: {
  settings: SiteSettings;
  navigation: NavigationSettings;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-24 w-full max-w-[1500px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center">
          <div className="relative h-16 w-16 sm:h-20 sm:w-20">
            <Image
              alt={`Logo de ${settings.siteName}`}
              className="object-contain"
              fill
              sizes="(max-width: 640px) 64px, 80px"
              src="/logo.png"
            />
          </div>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-10 lg:flex xl:gap-12">
          {navigation.headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-base font-medium text-foreground/78 transition-colors hover:bg-secondary/18 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            className={buttonVariants({
              variant: "secondary",
              className: "hidden rounded-full px-6 lg:inline-flex",
            })}
            href={orderLinks.glovo}
            rel="noreferrer"
            target="_blank"
          >
            Hacer un pedido
          </Link>
          <MobileNav links={navigation.headerLinks} />
        </div>
      </div>
    </header>
  );
}
