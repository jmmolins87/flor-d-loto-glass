import Link from "next/link";
import { Flower2, Sparkles } from "lucide-react";

import { CmsImage } from "@/components/shared/cms-image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Collection } from "@/lib/sanity/types";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link href={`/catalogo/${collection.slug.current}`}>
      <Card className="group h-full overflow-hidden rounded-[1.75rem] border-white/80 bg-white/78 pt-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-45px_rgba(38,60,48,0.45)]">
        <div className="relative aspect-[4/4.5] overflow-hidden">
          <CmsImage
            image={collection.coverImage}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-wrap gap-2">
            {collection.featured ? (
              <Badge variant="secondary">
                <Sparkles className="mr-1 size-3.5" />
                Destacada
              </Badge>
            ) : null}
            <Badge variant="outline">
              <Flower2 className="mr-1 size-3.5" />
              Producto floral
            </Badge>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl text-foreground">{collection.title}</h3>
            <p className="text-base leading-7 text-foreground/70">{collection.excerpt}</p>
          </div>
          <span className="inline-flex text-base font-medium text-primary transition-colors group-hover:text-secondary">
            Ver coleccion
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
