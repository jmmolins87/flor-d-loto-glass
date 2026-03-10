import groq from "groq";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  siteDescription,
  logo,
  phone,
  email,
  whatsapp,
  address,
  socialLinks[]{
    label,
    href,
    openInNewTab
  },
  openingHours[]{
    day,
    hours
  },
  "defaultSeo": defaultSeo->{
    metaTitle,
    metaDescription,
    ogImage,
    noIndex
  }
}`;

export const navigationQuery = groq`*[_type == "navigationSettings"][0]{
  headerLinks[]{
    label,
    href,
    openInNewTab
  },
  footerLinks[]{
    label,
    href,
    openInNewTab
  }
}`;

export const promoBannerQuery = groq`*[_type == "promotionalBanner" && active == true][0]{
  title,
  text,
  ctaLabel,
  ctaHref,
  image,
  active
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  seo{
    metaTitle,
    metaDescription,
    ogImage,
    noIndex
  },
  hero{
    eyebrow,
    title,
    subtitle,
    primaryCta,
    secondaryCta,
    image
  },
  introSection,
  "featuredCollections": featuredCollections[]->{
    _id,
    title,
    slug,
    excerpt,
    description,
    coverImage,
    gallery,
    featured,
    seo
  },
  "featuredOccasions": featuredOccasions[]->{
    _id,
    title,
    slug,
    excerpt,
    description,
    image,
    featured,
    seo
  },
  "promoBanner": promoBanner->{
    title,
    text,
    ctaLabel,
    ctaHref,
    image,
    active
  },
  brandSection{
    title,
    text,
    points,
    image
  },
  finalCta
}`;

export const collectionsQuery = groq`*[_type == "collection"] | order(featured desc, title asc){
  _id,
  title,
  slug,
  excerpt,
  description,
  coverImage,
  gallery,
  featured,
  seo
}`;

export const collectionBySlugQuery = groq`*[_type == "collection" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  description,
  coverImage,
  gallery,
  featured,
  seo
}`;

export const occasionsQuery = groq`*[_type == "occasion"] | order(featured desc, title asc){
  _id,
  title,
  slug,
  excerpt,
  description,
  image,
  featured,
  seo
}`;

export const occasionBySlugQuery = groq`*[_type == "occasion" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  description,
  image,
  featured,
  seo
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  seo,
  heroTitle,
  heroText,
  mainImage,
  bodySections[]{
    title,
    text,
    image
  }
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  seo,
  heroTitle,
  heroText,
  contactBlocks[]{
    title,
    description,
    label,
    value,
    href
  },
  formText,
  mapEmbed,
  locationText
}`;

export const legalPageByTypeQuery = groq`*[_type == "legalPage" && type == $type][0]{
  title,
  type,
  body,
  seo
}`;
