import Link from "next/link";

import { CmsImage } from "@/components/shared/cms-image";
import { Card, CardContent } from "@/components/ui/card";
import type { Occasion } from "@/lib/sanity/types";

export function OccasionCard({ occasion }: { occasion: Occasion }) {
  return (
    <Link href={`/ocasiones/${occasion.slug.current}`}>
      <Card className="group h-full overflow-hidden rounded-[1.75rem] border-white/80 bg-[#fffaf6] pt-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-45px_rgba(120,96,35,0.32)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <CmsImage
            image={occasion.image}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <CardContent className="space-y-3 p-6">
          <h3 className="text-2xl text-foreground">{occasion.title}</h3>
          <p className="text-base leading-7 text-foreground/70">{occasion.excerpt}</p>
          <span className="inline-flex text-base font-medium text-primary transition-colors group-hover:text-secondary">
            Explorar ocasion
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
