import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityClient } from "@/lib/sanity/client";
import { sanityEnabled } from "@/lib/sanity/env";

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: unknown) {
  if (!sanityEnabled || !source) {
    return null;
  }

  return builder.image(source);
}

export function resolveImageUrl(image?: { asset?: unknown; url?: string } | null) {
  if (!image) {
    return null;
  }

  if (image.url) {
    return image.url;
  }

  return urlForImage(image)?.width(1600).quality(85).url() || null;
}
