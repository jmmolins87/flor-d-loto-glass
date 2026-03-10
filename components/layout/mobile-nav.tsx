"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-styles";
import { orderLinks } from "@/lib/order-links";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { LinkItem } from "@/lib/sanity/types";

export function MobileNav({ links }: { links: LinkItem[] }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            aria-label="Abrir navegacion"
            className="rounded-full lg:hidden"
            size="icon"
            variant="outline"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent className="w-full max-w-sm border-l-white/80 bg-[#fffaf6]">
        <SheetHeader>
          <SheetTitle className="text-left font-serif text-3xl">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-10 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-border/60 bg-white/70 px-4 py-3 text-lg text-foreground transition-colors hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 grid gap-3">
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
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
