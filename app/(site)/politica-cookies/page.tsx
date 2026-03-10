import { SectionHeading } from "@/components/sections/section-heading";
import { PortableTextContent } from "@/components/shared/portable-text";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLegalPage } from "@/lib/sanity/fetch";

export async function generateMetadata() {
  const page = await getLegalPage("cookies");
  return buildMetadata({
    title: page.title,
    seo: page.seo,
    path: "/politica-cookies",
  });
}

export default async function CookiesPolicyPage() {
  const page = await getLegalPage("cookies");

  return (
    <section className="shell section-space">
      <div className="surface max-w-4xl p-8 md:p-10">
        <SectionHeading eyebrow="Legal" title={page.title} />
        <div className="mt-8">
          <PortableTextContent value={page.body} />
        </div>
      </div>
    </section>
  );
}
