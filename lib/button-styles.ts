import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-clip-padding text-base font-medium whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary/80 bg-primary text-primary-foreground shadow-[0_18px_40px_-26px_rgba(34,98,66,0.55)] hover:scale-[1.01] hover:bg-primary/92",
        outline:
          "border-primary/25 bg-white/70 text-primary shadow-[0_18px_38px_-30px_rgba(82,87,97,0.28)] hover:bg-primary/8 hover:text-primary aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "border-secondary/70 bg-secondary text-secondary-foreground shadow-[0_18px_40px_-28px_rgba(159,132,55,0.45)] hover:bg-secondary/92 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-white/60 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/12 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-9 gap-1 px-3 text-base [&_svg:not([class*='size-'])]:size-3",
        sm: "h-10 gap-1 px-4 text-base [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-1.5 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
