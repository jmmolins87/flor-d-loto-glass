import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ShoppingBag } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { buttonVariants } from "@/lib/button-styles";
import { orderLinks } from "@/lib/order-links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NavigationSettings, SiteSettings } from "@/lib/sanity/types";

export function SiteHeader({
  settings,
  navigation,
}: {
  settings: SiteSettings;
  navigation: NavigationSettings;
}) {
  const headerLinks = navigation.headerLinks.filter((link) => link.href !== "/");

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
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 font-serif text-lg font-medium text-foreground/78 transition-colors hover:bg-secondary/18 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={buttonVariants({
                  variant: "secondary",
                  className:
                    "group rounded-full border-secondary/70 bg-secondary px-3 sm:px-5 font-serif text-sm sm:text-base text-white shadow-[0_18px_40px_-28px_rgba(159,132,55,0.45)] hover:bg-secondary/92 hover:text-white aria-expanded:bg-secondary aria-expanded:text-white",
                })}
                type="button"
              >
                <ShoppingBag className="size-4" />
                <span className="hidden sm:inline">Hacer pedido</span>
                <ChevronDown className="size-4 transition-transform duration-200 group-aria-expanded:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-screen max-w-screen rounded-none border-x-0 px-3 py-2 sm:w-88 sm:max-w-[calc(100vw-2rem)] sm:rounded-[1.25rem] sm:border-x"
            >
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-2xl border border-[#00a082]/20 bg-[#00a082]/10 p-0 focus:bg-[#00a082]/16"
              >
                <a
                  href={orderLinks.glovo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex cursor-pointer flex-col items-start p-4"
                >
                  <p className="font-serif text-lg text-[#007a64]">Glovo</p>
                  <p className="mt-1 text-sm leading-6 text-foreground/72">
                    Pedido rapido con entrega local.
                  </p>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="mt-2 cursor-pointer rounded-2xl border border-[#ff8000]/20 bg-[#ff8000]/10 p-0 focus:bg-[#ff8000]/16"
              >
                <a
                  href={orderLinks.justEat}
                  target="_blank"
                  rel="noreferrer"
                  className="flex cursor-pointer flex-col items-start p-4"
                >
                  <p className="font-serif text-lg text-[#d96d00]">JustEat</p>
                  <p className="mt-1 text-sm leading-6 text-foreground/72">
                    Otra via directa para hacer tu pedido.
                  </p>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <MobileNav links={headerLinks} siteName={settings.siteName} />
        </div>
      </div>
    </header>
  );
}
