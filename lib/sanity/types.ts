import type { PortableTextBlock } from "@portabletext/react";

export type LinkItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type ImageAsset = {
  alt?: string;
  asset?: unknown;
  url?: string;
};

export type SeoData = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: ImageAsset | null;
  noIndex?: boolean;
};

export type HeroData = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: LinkItem;
  secondaryCta?: LinkItem;
  image?: ImageAsset | null;
};

export type IntroBlock = {
  title: string;
  text: string;
};

export type Collection = {
  _id?: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  description?: PortableTextBlock[];
  coverImage?: ImageAsset | null;
  gallery?: ImageAsset[];
  featured?: boolean;
  seo?: SeoData;
};

export type Occasion = {
  _id?: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  description?: PortableTextBlock[];
  image?: ImageAsset | null;
  featured?: boolean;
  seo?: SeoData;
};

export type PromoBannerData = {
  title: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: ImageAsset | null;
  active?: boolean;
};

export type BodySection = {
  title: string;
  text?: string;
  image?: ImageAsset | null;
};

export type ContactBlock = {
  title: string;
  description?: string;
  label?: string;
  value?: string;
  href?: string;
};

export type SiteSettings = {
  siteName: string;
  siteDescription: string;
  logo?: ImageAsset | null;
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  socialLinks?: LinkItem[];
  openingHours?: { day: string; hours: string }[];
  defaultSeo?: SeoData | null;
};

export type NavigationSettings = {
  headerLinks: LinkItem[];
  footerLinks: LinkItem[];
};

export type HomePage = {
  seo?: SeoData;
  hero: HeroData;
  introSection: IntroBlock;
  featuredCollections: Collection[];
  featuredOccasions: Occasion[];
  promoBanner?: PromoBannerData | null;
  brandSection: {
    title: string;
    text: string;
    points: string[];
    image?: ImageAsset | null;
  };
  finalCta: {
    title: string;
    text: string;
    primaryCta?: LinkItem;
    secondaryCta?: LinkItem;
  };
};

export type AboutPageData = {
  seo?: SeoData;
  heroTitle: string;
  heroText: string;
  mainImage?: ImageAsset | null;
  bodySections: BodySection[];
};

export type ContactPageData = {
  seo?: SeoData;
  heroTitle: string;
  heroText: string;
  contactBlocks: ContactBlock[];
  formText?: string;
  locationText?: string;
  mapEmbed?: string;
};

export type LegalPageData = {
  title: string;
  type: "cookies" | "privacy";
  body: PortableTextBlock[];
  seo?: SeoData;
};
