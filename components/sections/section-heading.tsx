import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center",
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="max-w-3xl text-4xl leading-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-lg leading-8 text-foreground/72">
          {description}
        </p>
      ) : null}
    </div>
  );
}
