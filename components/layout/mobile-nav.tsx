"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-styles";
import { orderLinks } from "@/lib/order-links";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { LinkItem } from "@/lib/sanity/types";

export function MobileNav({
  links,
  siteName,
}: {
  links: LinkItem[];
  siteName: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Abrir navegacion"
          className="rounded-full lg:hidden"
          size="icon"
          variant="outline"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-sm border-l-white/80 bg-[#fffaf6]">
        <SheetHeader>
          <SheetTitle className="text-left font-serif text-3xl">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-10 flex flex-col gap-4">
          <SheetClose asChild>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3"
            >
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  alt={`Logo de ${siteName}`}
                  className="object-contain"
                  fill
                  sizes="48px"
                  src="/logo.png"
                />
              </div>
              <span className="font-serif text-2xl text-foreground">{siteName}</span>
            </Link>
          </SheetClose>
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="rounded-2xl border border-border/60 bg-white/70 px-4 py-3 font-serif text-xl text-foreground transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
          <div className="mt-4 grid gap-3">
            <SheetClose asChild>
              <Link
                className={buttonVariants({
                  variant: "secondary",
                  className: "justify-center",
                })}
                href={orderLinks.glovo}
                rel="noreferrer"
                target="_blank"
              >
                Pedir en Glovo
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                className={buttonVariants({
                  variant: "outline",
                  className: "justify-center",
                })}
                href={orderLinks.justEat}
                rel="noreferrer"
                target="_blank"
              >
                Pedir en Just Eat
              </Link>
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
