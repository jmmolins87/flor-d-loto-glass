import "server-only";

import { draftMode } from "next/headers";

import type {
  AboutPageData,
  BodySection,
  Collection,
  ContactPageData,
  HomePage,
  ImageAsset,
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
  void query;
  void params;
  return fallback;
}

function hasImage(image?: ImageAsset | null) {
  return Boolean(image?.asset || image?.url);
}

function mergeImage<T extends { image?: ImageAsset | null }>(value: T, fallback: T): T {
  return {
    ...fallback,
    ...value,
    image: hasImage(value.image) ? value.image : fallback.image,
  };
}

function mergeCollectionWithFallback(collection: Collection, fallback?: Collection): Collection {
  if (!fallback) {
    return collection;
  }

  return {
    ...fallback,
    ...collection,
    coverImage: hasImage(collection.coverImage) ? collection.coverImage : fallback.coverImage,
    gallery: Array.isArray(collection.gallery) && collection.gallery.length > 0
      ? collection.gallery
      : fallback.gallery,
  };
}

function mergeOccasionWithFallback(occasion: Occasion, fallback?: Occasion): Occasion {
  if (!fallback) {
    return occasion;
  }

  return {
    ...fallback,
    ...occasion,
    image: hasImage(occasion.image) ? occasion.image : fallback.image,
  };
}

function mergeBodySections(sections: BodySection[] | undefined, fallback: BodySection[]) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return fallback;
  }

  return sections.map((section, index) =>
    mergeImage(section, fallback[index] || fallback[0] || section),
  );
}

function mergeHomePageWithFallback(page: HomePage): HomePage {
  const fallbackCollectionsBySlug = new Map(
    fallbackCollections.map((item) => [item.slug.current, item]),
  );
  const fallbackOccasionsBySlug = new Map(
    fallbackOccasions.map((item) => [item.slug.current, item]),
  );

  return {
    ...fallbackHomePage,
    ...page,
    hero: mergeImage(page.hero || fallbackHomePage.hero, fallbackHomePage.hero),
    featuredCollections:
      Array.isArray(page.featuredCollections) && page.featuredCollections.length > 0
        ? page.featuredCollections.map((item) =>
            mergeCollectionWithFallback(item, fallbackCollectionsBySlug.get(item.slug.current)),
          )
        : fallbackHomePage.featuredCollections,
    featuredOccasions:
      Array.isArray(page.featuredOccasions) && page.featuredOccasions.length > 0
        ? page.featuredOccasions.map((item) =>
            mergeOccasionWithFallback(item, fallbackOccasionsBySlug.get(item.slug.current)),
          )
        : fallbackHomePage.featuredOccasions,
    promoBanner: page.promoBanner
      ? mergeImage(page.promoBanner, fallbackHomePage.promoBanner || page.promoBanner)
      : fallbackHomePage.promoBanner,
    brandSection: page.brandSection
      ? mergeImage(page.brandSection, fallbackHomePage.brandSection)
      : fallbackHomePage.brandSection,
  };
}

export function getSiteSettings(): Promise<SiteSettings> {
  return fetchOrFallback(siteSettingsQuery, fallbackSiteSettings).then((settings) => ({
    ...fallbackSiteSettings,
    ...settings,
    logo: hasImage(settings.logo) ? settings.logo : fallbackSiteSettings.logo,
  }));
}

export function getNavigationSettings(): Promise<NavigationSettings> {
  return fetchOrFallback(navigationQuery, fallbackNavigation);
}

export function getHomePage(): Promise<HomePage> {
  return fetchOrFallback(homePageQuery, fallbackHomePage).then(mergeHomePageWithFallback);
}

export function getCollections(): Promise<Collection[]> {
  return fetchOrFallback(collectionsQuery, fallbackCollections).then((collections) => {
    if (!Array.isArray(collections) || collections.length === 0) {
      return fallbackCollections;
    }

    const fallbackBySlug = new Map(fallbackCollections.map((item) => [item.slug.current, item]));

    return collections.map((item) =>
      mergeCollectionWithFallback(item, fallbackBySlug.get(item.slug.current)),
    );
  });
}

export async function getCollectionBySlug(slug: string) {
  const collections = await getCollections();
  const fallback =
    collections.find((item) => item.slug.current === slug) || collections[0] || null;

  return fetchOrFallback(collectionBySlugQuery, fallback, { slug }).then((collection) =>
    collection && fallback ? mergeCollectionWithFallback(collection, fallback) : collection,
  );
}

export function getOccasions(): Promise<Occasion[]> {
  return fetchOrFallback(occasionsQuery, fallbackOccasions).then((occasions) => {
    if (!Array.isArray(occasions) || occasions.length === 0) {
      return fallbackOccasions;
    }

    const fallbackBySlug = new Map(fallbackOccasions.map((item) => [item.slug.current, item]));

    return occasions.map((item) =>
      mergeOccasionWithFallback(item, fallbackBySlug.get(item.slug.current)),
    );
  });
}

export async function getOccasionBySlug(slug: string) {
  const occasions = await getOccasions();
  const fallback =
    occasions.find((item) => item.slug.current === slug) || occasions[0] || null;

  return fetchOrFallback(occasionBySlugQuery, fallback, { slug }).then((occasion) =>
    occasion && fallback ? mergeOccasionWithFallback(occasion, fallback) : occasion,
  );
}

export function getAboutPage(): Promise<AboutPageData> {
  return fetchOrFallback(aboutPageQuery, fallbackAboutPage).then((page) => ({
    ...fallbackAboutPage,
    ...page,
    mainImage: hasImage(page.mainImage) ? page.mainImage : fallbackAboutPage.mainImage,
    bodySections: Array.isArray(page.bodySections)
      ? mergeBodySections(page.bodySections, fallbackAboutPage.bodySections)
      : fallbackAboutPage.bodySections,
  }));
}

export function getContactPage(): Promise<ContactPageData> {
  return fetchOrFallback(contactPageQuery, fallbackContactPage);
}

export function getLegalPage(type: "cookies" | "privacy"): Promise<LegalPageData> {
  return fetchOrFallback(legalPageByTypeQuery, fallbackLegalPages[type], { type });
}
