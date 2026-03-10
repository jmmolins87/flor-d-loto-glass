import "server-only";

import type {
  AboutPageData,
  Collection,
  ContactPageData,
  HomePage,
  LegalPageData,
  NavigationSettings,
  Occasion,
  SiteSettings,
} from "@/lib/sanity/types";
import {
  fallbackAboutPage,
  fallbackCollections,
  fallbackContactPage,
  fallbackHomePage,
  fallbackLegalPages,
  fallbackNavigation,
  fallbackOccasions,
  fallbackSiteSettings,
} from "@/lib/fallback-content";
import { sanityClient } from "@/lib/sanity/client";
import { sanityEnabled } from "@/lib/sanity/env";
import {
  aboutPageQuery,
  collectionBySlugQuery,
  collectionsQuery,
  contactPageQuery,
  homePageQuery,
  legalPageByTypeQuery,
  navigationQuery,
  occasionBySlugQuery,
  occasionsQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";

async function fetchOrFallback<T>(
  query: string,
  fallback: T,
  params?: Record<string, unknown>,
) {
  if (!sanityEnabled) {
    return fallback;
  }

  try {
    const data = await sanityClient.fetch<T | null>(query, params || {}, {
      next: { revalidate: 60 },
    });

    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export function getSiteSettings(): Promise<SiteSettings> {
  return fetchOrFallback(siteSettingsQuery, fallbackSiteSettings);
}

export function getNavigationSettings(): Promise<NavigationSettings> {
  return fetchOrFallback(navigationQuery, fallbackNavigation);
}

export function getHomePage(): Promise<HomePage> {
  return fetchOrFallback(homePageQuery, fallbackHomePage);
}

export function getCollections(): Promise<Collection[]> {
  return fetchOrFallback(collectionsQuery, fallbackCollections);
}

export async function getCollectionBySlug(slug: string) {
  const collections = await getCollections();
  const fallback =
    collections.find((item) => item.slug.current === slug) || collections[0] || null;

  return fetchOrFallback(collectionBySlugQuery, fallback, { slug });
}

export function getOccasions(): Promise<Occasion[]> {
  return fetchOrFallback(occasionsQuery, fallbackOccasions);
}

export async function getOccasionBySlug(slug: string) {
  const occasions = await getOccasions();
  const fallback =
    occasions.find((item) => item.slug.current === slug) || occasions[0] || null;

  return fetchOrFallback(occasionBySlugQuery, fallback, { slug });
}

export function getAboutPage(): Promise<AboutPageData> {
  return fetchOrFallback(aboutPageQuery, fallbackAboutPage);
}

export function getContactPage(): Promise<ContactPageData> {
  return fetchOrFallback(contactPageQuery, fallbackContactPage);
}

export function getLegalPage(type: "cookies" | "privacy"): Promise<LegalPageData> {
  return fetchOrFallback(legalPageByTypeQuery, fallbackLegalPages[type], { type });
}
