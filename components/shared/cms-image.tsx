import Image from "next/image";

import { resolveImageUrl } from "@/lib/sanity/image";

type CmsImageProps = {
  image?: { alt?: string; asset?: unknown; url?: string } | null;
  className?: string;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function CmsImage({
  image,
  className,
  fill,
  sizes,
  width = 1200,
  height = 900,
  priority,
}: CmsImageProps) {
  const src = resolveImageUrl(image);

  if (!src) {
    return null;
  }

  return (
    <Image
      alt={image?.alt || ""}
      className={className}
      fill={fill}
      height={fill ? undefined : height}
      priority={priority}
      sizes={sizes}
      src={src}
      width={fill ? undefined : width}
    />
  );
}
