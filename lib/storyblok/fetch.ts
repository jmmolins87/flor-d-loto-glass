import "server-only";

import { draftMode } from "next/headers";

import type {
  AboutPageData,
  BodySection,
  Collection,
  ContactPageData,
  ContactBlock,
  HomePage,
  ImageAsset,
  LegalPageData,
  LinkItem,
  NavigationSettings,
  Occasion,
  PromoBannerData,
  SeoData,
  SiteSettings,
} from "@/lib/cms/types";
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
import { getConfiguredStoryblokApi } from "@/lib/storyblok/client";
import { getStoryblokVersion, storyblokEnabled } from "@/lib/storyblok/env";

type StoryblokStory<T = Record<string, unknown>> = {
  content: T;
  full_slug: string;
  name: string;
  published_at?: string;
  slug: string;
  uuid: string;
};

const fetchOptions =
  process.env.NODE_ENV === "production"
    ? { next: { revalidate: 60 } }
    : { cache: "no-store" as const };

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasImage(image?: ImageAsset | null) {
  return Boolean(image?.asset || image?.url || image?.filename);
}

function normalizeImage(image?: unknown): ImageAsset | null | undefined {
  if (!image) {
    return undefined;
  }

  if (typeof image === "string") {
    return { url: image };
  }

  if (!isRecord(image)) {
    return undefined;
  }

  const filename =
    typeof image.filename === "string"
      ? image.filename
      : typeof image.url === "string"
        ? image.url
        : undefined;

  return {
    ...image,
    alt:
      typeof image.alt === "string"
        ? image.alt
        : typeof image.alt_text === "string"
          ? image.alt_text
          : undefined,
    filename,
    url: filename,
  };
}

function normalizeLink(link?: unknown): LinkItem | undefined {
  if (!isRecord(link)) {
    return undefined;
  }

  const href =
    typeof link.href === "string"
      ? link.href
      : typeof link.url === "string"
        ? link.url
        : typeof link.cached_url === "string"
          ? `/${link.cached_url.replace(/^\/+/, "")}`.replace(/\/$/, "") || "/"
          : undefined;

  if (!href || typeof link.label !== "string") {
    return undefined;
  }

  return {
    label: link.label,
    href,
    openInNewTab: Boolean(link.openInNewTab || link.target === "_blank"),
  };
}

function normalizeLinks(value: unknown): LinkItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(normalizeLink).filter(Boolean) as LinkItem[];
}

function normalizeSeo(seo?: unknown): SeoData | undefined {
  if (!isRecord(seo)) {
    return undefined;
  }

  return {
    metaTitle:
      typeof seo.metaTitle === "string"
        ? seo.metaTitle
        : typeof seo.title === "string"
          ? seo.title
          : undefined,
    metaDescription:
      typeof seo.metaDescription === "string"
        ? seo.metaDescription
        : typeof seo.description === "string"
          ? seo.description
          : undefined,
    ogImage: normalizeImage(seo.ogImage || seo.image),
    noIndex: Boolean(seo.noIndex),
  };
}

function normalizeContactBlocks(value: unknown): ContactBlock[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!isRecord(item) || typeof item.title !== "string") {
        return null;
      }

      return {
        title: item.title,
        description: typeof item.description === "string" ? item.description : undefined,
        label: typeof item.label === "string" ? item.label : undefined,
        value: typeof item.value === "string" ? item.value : undefined,
        href: typeof item.href === "string" ? item.href : undefined,
      };
    })
    .filter(Boolean) as ContactBlock[];
}

function normalizeBodySections(value: unknown): BodySection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!isRecord(item) || typeof item.title !== "string") {
        return null;
      }

      return {
        title: item.title,
        text: typeof item.text === "string" ? item.text : undefined,
        image: normalizeImage(item.image),
      };
    })
    .filter(Boolean) as BodySection[];
}

function normalizeCollection(story: StoryblokStory): Collection {
  const content = isRecord(story.content) ? story.content : {};
  const slug = story.full_slug.split("/").pop() || story.slug;

  return {
    _id: story.uuid,
    _updatedAt: story.published_at,
    title: typeof content.title === "string" ? content.title : story.name,
    slug: { current: slug },
    excerpt: typeof content.excerpt === "string" ? content.excerpt : undefined,
    description: content.description as Collection["description"],
    coverImage: normalizeImage(content.coverImage || content.image),
    gallery: Array.isArray(content.gallery)
      ? content.gallery.map((item) => normalizeImage(item)).filter(Boolean) as ImageAsset[]
      : undefined,
    featured: Boolean(content.featured),
    seo: normalizeSeo(content.seo),
  };
}

function normalizeOccasion(story: StoryblokStory): Occasion {
  const content = isRecord(story.content) ? story.content : {};
  const slug = story.full_slug.split("/").pop() || story.slug;

  return {
    _id: story.uuid,
    _updatedAt: story.published_at,
    title: typeof content.title === "string" ? content.title : story.name,
    slug: { current: slug },
    excerpt: typeof content.excerpt === "string" ? content.excerpt : undefined,
    description: content.description as Occasion["description"],
    image: normalizeImage(content.image || content.coverImage),
    featured: Boolean(content.featured),
    seo: normalizeSeo(content.seo),
  };
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
    gallery:
      Array.isArray(collection.gallery) && collection.gallery.length > 0
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

async function storyblokGet<T>(path: string, params?: Record<string, unknown>) {
  if (!storyblokEnabled) {
    return null;
  }

  const api = getConfiguredStoryblokApi();
  const isDraftMode = (await draftMode()).isEnabled;
  const { data } = await api.get(path, {
    version: getStoryblokVersion(isDraftMode),
    cv: isDraftMode ? Date.now() : undefined,
    ...params,
  }, fetchOptions);

  return data as T;
}

async function getStoryContent(path: string) {
  const data = await storyblokGet<{ story?: StoryblokStory }>(`cdn/stories/${path}`);
  return data?.story?.content;
}

async function getStories(startsWith: string) {
  const data = await storyblokGet<{ stories?: StoryblokStory[] }>("cdn/stories", {
    starts_with: startsWith,
    is_startpage: false,
    sort_by: "content.featured:desc,first_published_at:desc",
  });

  return data?.stories || [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const content = await getStoryContent("global/site-settings");

  if (!isRecord(content)) {
    return fallbackSiteSettings;
  }

  return {
    ...fallbackSiteSettings,
    ...content,
    logo: hasImage(normalizeImage(content.logo))
      ? normalizeImage(content.logo)
      : fallbackSiteSettings.logo,
    socialLinks: normalizeLinks(content.socialLinks).length
      ? normalizeLinks(content.socialLinks)
      : fallbackSiteSettings.socialLinks,
    openingHours: Array.isArray(content.openingHours)
      ? (content.openingHours as SiteSettings["openingHours"])
      : fallbackSiteSettings.openingHours,
    defaultSeo: normalizeSeo(content.defaultSeo) || fallbackSiteSettings.defaultSeo,
  };
}

export async function getNavigationSettings(): Promise<NavigationSettings> {
  const content = await getStoryContent("global/navigation");

  if (!isRecord(content)) {
    return fallbackNavigation;
  }

  return {
    headerLinks: normalizeLinks(content.headerLinks).length
      ? normalizeLinks(content.headerLinks)
      : fallbackNavigation.headerLinks,
    footerLinks: normalizeLinks(content.footerLinks).length
      ? normalizeLinks(content.footerLinks)
      : fallbackNavigation.footerLinks,
  };
}

export async function getHomePage(): Promise<HomePage> {
  const [content, collections, occasions] = await Promise.all([
    getStoryContent("home"),
    getCollections(),
    getOccasions(),
  ]);

  if (!isRecord(content)) {
    return fallbackHomePage;
  }

  const home: HomePage = {
    ...fallbackHomePage,
    ...content,
    seo: normalizeSeo(content.seo) || fallbackHomePage.seo,
    hero: {
      ...fallbackHomePage.hero,
      ...(isRecord(content.hero) ? content.hero : {}),
      image: normalizeImage(isRecord(content.hero) ? content.hero.image : undefined) || fallbackHomePage.hero.image,
      primaryCta:
        normalizeLink(isRecord(content.hero) ? content.hero.primaryCta : undefined) ||
        fallbackHomePage.hero.primaryCta,
      secondaryCta:
        normalizeLink(isRecord(content.hero) ? content.hero.secondaryCta : undefined) ||
        fallbackHomePage.hero.secondaryCta,
    },
    introSection: {
      ...fallbackHomePage.introSection,
      ...(isRecord(content.introSection) ? content.introSection : {}),
    },
    featuredCollections: collections.filter((item) => item.featured).slice(0, 3),
    featuredOccasions: occasions.filter((item) => item.featured).slice(0, 3),
    promoBanner: isRecord(content.promoBanner)
      ? ({
          ...(content.promoBanner as PromoBannerData),
          image: normalizeImage(content.promoBanner.image),
        } as PromoBannerData)
      : fallbackHomePage.promoBanner,
    brandSection: {
      ...fallbackHomePage.brandSection,
      ...(isRecord(content.brandSection) ? content.brandSection : {}),
      image:
        normalizeImage(isRecord(content.brandSection) ? content.brandSection.image : undefined) ||
        fallbackHomePage.brandSection.image,
      points:
        isRecord(content.brandSection) && Array.isArray(content.brandSection.points)
          ? (content.brandSection.points.filter((item) => typeof item === "string") as string[])
          : fallbackHomePage.brandSection.points,
    },
    finalCta: {
      ...fallbackHomePage.finalCta,
      ...(isRecord(content.finalCta) ? content.finalCta : {}),
      primaryCta:
        normalizeLink(isRecord(content.finalCta) ? content.finalCta.primaryCta : undefined) ||
        fallbackHomePage.finalCta.primaryCta,
      secondaryCta:
        normalizeLink(isRecord(content.finalCta) ? content.finalCta.secondaryCta : undefined) ||
        fallbackHomePage.finalCta.secondaryCta,
    },
  };

  return mergeHomePageWithFallback(home);
}

export async function getCollections(): Promise<Collection[]> {
  const stories = await getStories("catalogo/");

  if (!stories.length) {
    return fallbackCollections;
  }

  const fallbackBySlug = new Map(fallbackCollections.map((item) => [item.slug.current, item]));

  return stories.map((story) =>
    mergeCollectionWithFallback(
      normalizeCollection(story),
      fallbackBySlug.get(story.full_slug.split("/").pop() || story.slug),
    ),
  );
}

export async function getCollectionBySlug(slug: string) {
  const stories = await getStories("catalogo/");
  const story = stories.find((item) => (item.full_slug.split("/").pop() || item.slug) === slug);

  if (!story) {
    return fallbackCollections.find((item) => item.slug.current === slug) || null;
  }

  const fallback = fallbackCollections.find((item) => item.slug.current === slug);
  return mergeCollectionWithFallback(normalizeCollection(story), fallback);
}

export async function getOccasions(): Promise<Occasion[]> {
  const stories = await getStories("ocasiones/");

  if (!stories.length) {
    return fallbackOccasions;
  }

  const fallbackBySlug = new Map(fallbackOccasions.map((item) => [item.slug.current, item]));

  return stories.map((story) =>
    mergeOccasionWithFallback(
      normalizeOccasion(story),
      fallbackBySlug.get(story.full_slug.split("/").pop() || story.slug),
    ),
  );
}

export async function getOccasionBySlug(slug: string) {
  const stories = await getStories("ocasiones/");
  const story = stories.find((item) => (item.full_slug.split("/").pop() || item.slug) === slug);

  if (!story) {
    return fallbackOccasions.find((item) => item.slug.current === slug) || null;
  }

  const fallback = fallbackOccasions.find((item) => item.slug.current === slug);
  return mergeOccasionWithFallback(normalizeOccasion(story), fallback);
}

export async function getAboutPage(): Promise<AboutPageData> {
  const content = await getStoryContent("sobre-nosotros");

  if (!isRecord(content)) {
    return fallbackAboutPage;
  }

  return {
    ...fallbackAboutPage,
    ...content,
    seo: normalizeSeo(content.seo) || fallbackAboutPage.seo,
    mainImage: normalizeImage(content.mainImage) || fallbackAboutPage.mainImage,
    bodySections: mergeBodySections(normalizeBodySections(content.bodySections), fallbackAboutPage.bodySections),
  };
}

export async function getContactPage(): Promise<ContactPageData> {
  const content = await getStoryContent("contacto");

  if (!isRecord(content)) {
    return fallbackContactPage;
  }

  return {
    ...fallbackContactPage,
    ...content,
    seo: normalizeSeo(content.seo) || fallbackContactPage.seo,
    contactBlocks: normalizeContactBlocks(content.contactBlocks).length
      ? normalizeContactBlocks(content.contactBlocks)
      : fallbackContactPage.contactBlocks,
  };
}

export async function getLegalPage(type: "cookies" | "privacy"): Promise<LegalPageData> {
  const slug = type === "cookies" ? "politica-cookies" : "politica-privacidad";
  const content = await getStoryContent(slug);

  if (!isRecord(content)) {
    return fallbackLegalPages[type];
  }

  return {
    ...fallbackLegalPages[type],
    ...content,
    seo: normalizeSeo(content.seo) || fallbackLegalPages[type].seo,
    body: (content.body as LegalPageData["body"]) || fallbackLegalPages[type].body,
  };
}
