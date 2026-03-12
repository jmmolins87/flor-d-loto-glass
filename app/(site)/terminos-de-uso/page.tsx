import { StaticContentPage } from "@/components/shared/static-content-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { termsPage } from "@/lib/static-pages";

export function generateMetadata() {
  return buildMetadata({
    title: termsPage.title,
    description: termsPage.description,
    path: termsPage.path,
    keywords: ["terminos de uso", "condiciones web floristeria"],
  });
}

export default function TermsPage() {
  return <StaticContentPage page={termsPage} />;
}
