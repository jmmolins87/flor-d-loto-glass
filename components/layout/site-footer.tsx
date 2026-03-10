import Link from "next/link";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import type { NavigationSettings, SiteSettings } from "@/lib/sanity/types";

export function SiteFooter({
  settings,
  navigation,
}: {
  settings: SiteSettings;
  navigation: NavigationSettings;
}) {
  return (
    <footer className="shell pb-10 pt-6">
      <div className="surface px-8 py-10 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/70">
                <Image
                  alt={`Logo de ${settings.siteName}`}
                  className="object-contain p-1"
                  fill
                  sizes="48px"
                  src="/logo.png"
                />
              </div>
              <h2 className="font-serif text-3xl text-foreground">{settings.siteName}</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-foreground/72">
              {settings.siteDescription}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-semibold uppercase tracking-[0.22em] text-foreground/60">
              Contacto
            </h3>
            <div className="space-y-2 text-base text-foreground/72">
              {settings.phone ? <p>{settings.phone}</p> : null}
              {settings.email ? <p>{settings.email}</p> : null}
              {settings.address ? <p>{settings.address}</p> : null}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-semibold uppercase tracking-[0.22em] text-foreground/60">
              Navegacion
            </h3>
            <div className="flex flex-col gap-2 text-base">
              {navigation.footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/72 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-3 text-base text-foreground/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {settings.siteName}. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-4">
            {settings.socialLinks?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noreferrer" : undefined}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
