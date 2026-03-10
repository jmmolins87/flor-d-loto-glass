import { StudioShell } from "@/components/shared/studio-shell";
import { sanityEnabled } from "@/lib/sanity/env";

export default function StudioPage() {
  if (!sanityEnabled) {
    return (
      <main className="shell section-space">
        <div className="surface max-w-3xl p-8 md:p-10">
          <p className="eyebrow">Sanity Studio</p>
          <h1 className="mt-4 text-4xl text-foreground">Falta conectar el proyecto de Sanity.</h1>
          <p className="mt-4 text-lg leading-8 text-foreground/72">
            Añade `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET` en tu `.env.local`
            para abrir el panel editorial principal en `/admin`.
          </p>
        </div>
      </main>
    );
  }

  return <StudioShell />;
}
