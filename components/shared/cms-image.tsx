import Image from "next/image";

type CmsImageProps = {
  image?: { alt?: string; filename?: string; asset?: unknown; url?: string } | null;
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
  const src = image?.url || image?.filename;

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
