import { SectionHeading } from "@/components/sections/section-heading";
import { PortableTextContent } from "@/components/shared/portable-text";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLegalPage } from "@/lib/sanity/fetch";

export async function generateMetadata() {
  const page = await getLegalPage("privacy");
  return buildMetadata({
    title: page.title,
    seo: page.seo,
    path: "/politica-privacidad",
  });
}

export default async function PrivacyPolicyPage() {
  const page = await getLegalPage("privacy");

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
