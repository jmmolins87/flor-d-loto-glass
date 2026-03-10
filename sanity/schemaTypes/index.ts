import { aboutPage } from "@/sanity/schemaTypes/documents/aboutPage";
import { collection } from "@/sanity/schemaTypes/documents/collection";
import { contactPage } from "@/sanity/schemaTypes/documents/contactPage";
import { homePage } from "@/sanity/schemaTypes/documents/homePage";
import { legalPage } from "@/sanity/schemaTypes/documents/legalPage";
import { navigationSettings } from "@/sanity/schemaTypes/documents/navigationSettings";
import { occasion } from "@/sanity/schemaTypes/documents/occasion";
import { promotionalBanner } from "@/sanity/schemaTypes/documents/promotionalBanner";
import { reusableSeo } from "@/sanity/schemaTypes/documents/reusableSeo";
import { siteSettings } from "@/sanity/schemaTypes/documents/siteSettings";
import { bodySection } from "@/sanity/schemaTypes/objects/bodySection";
import { brandSection } from "@/sanity/schemaTypes/objects/brandSection";
import { contactBlock } from "@/sanity/schemaTypes/objects/contactBlock";
import { finalCta } from "@/sanity/schemaTypes/objects/finalCta";
import { heroSection } from "@/sanity/schemaTypes/objects/heroSection";
import { introSection } from "@/sanity/schemaTypes/objects/introSection";
import { linkItem } from "@/sanity/schemaTypes/objects/linkItem";
import { openingHours } from "@/sanity/schemaTypes/objects/openingHours";
import { seoFields } from "@/sanity/schemaTypes/objects/seoFields";

export const schemaTypes = [
  siteSettings,
  homePage,
  collection,
  occasion,
  aboutPage,
  contactPage,
  legalPage,
  promotionalBanner,
  reusableSeo,
  navigationSettings,
  seoFields,
  linkItem,
  heroSection,
  introSection,
  brandSection,
  finalCta,
  bodySection,
  contactBlock,
  openingHours,
];
