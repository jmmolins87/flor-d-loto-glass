import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex min-h-9 items-center justify-center gap-1 rounded-full border px-3 py-1 text-base font-medium whitespace-nowrap transition-all [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary/10 text-primary shadow-[0_12px_30px_-22px_rgba(34,98,66,0.55)]",
        secondary:
          "border-secondary/30 bg-secondary/20 text-secondary-foreground shadow-[0_12px_30px_-22px_rgba(159,132,55,0.45)]",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive",
        outline: "border-primary/18 bg-white/70 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
