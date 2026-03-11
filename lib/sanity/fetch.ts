import "server-only";

import { draftMode } from "next/headers";

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
import { sanityEnabled, useCdn } from "@/lib/sanity/env";
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

const sanityFetchOptions =
  process.env.NODE_ENV === "production"
    ? { next: { revalidate: 60 } }
    : { cache: "no-store" as const };

const SANITY_FETCH_TIMEOUT_MS = 8_000;

async function withTimeout<T>(promise: Promise<T>, timeoutMs = SANITY_FETCH_TIMEOUT_MS) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Sanity fetch timed out"));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

async function fetchOrFallback<T>(
  query: string,
  fallback: T,
  params?: Record<string, unknown>,
) {
  if (!sanityEnabled) {
    return fallback;
  }

  try {
    const isDraftMode = (await draftMode()).isEnabled;
    const client = sanityClient.withConfig({
      perspective: isDraftMode ? "drafts" : "published",
      stega: { enabled: isDraftMode },
      token: process.env.SANITY_API_READ_TOKEN,
      useCdn: isDraftMode ? false : useCdn,
    });
    const fetchClient = isDraftMode ? client : sanityClient;
    const fetchOptions = isDraftMode ? { cache: "no-store" as const } : sanityFetchOptions;
    const data = await withTimeout(
      fetchClient.fetch<T | null>(query, params || {}, fetchOptions),
    );

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
  return fetchOrFallback(aboutPageQuery, fallbackAboutPage).then((page) => ({
    ...fallbackAboutPage,
    ...page,
    bodySections: Array.isArray(page.bodySections)
      ? page.bodySections
      : fallbackAboutPage.bodySections,
  }));
}

export function getContactPage(): Promise<ContactPageData> {
  return fetchOrFallback(contactPageQuery, fallbackContactPage);
}

export function getLegalPage(type: "cookies" | "privacy"): Promise<LegalPageData> {
  return fetchOrFallback(legalPageByTypeQuery, fallbackLegalPages[type], { type });
}
