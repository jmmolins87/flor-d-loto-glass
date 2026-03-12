import { Toaster } from "sonner";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CookieBanner } from "@/components/shared/cookie-banner";
import { RouteScrollTop } from "@/components/shared/route-scroll-top";
import { SeoSchema } from "@/components/shared/seo-schema";
import { getNavigationSettings, getSiteSettings } from "@/lib/sanity/fetch";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigationSettings(),
  ]);

  return (
    <>
      <RouteScrollTop />
      <SeoSchema settings={settings} />
      <SiteHeader navigation={navigation} settings={settings} />
      <main>{children}</main>
      <SiteFooter settings={settings} />
      <CookieBanner />
      <Toaster position="top-right" richColors />
    </>
  );
}
