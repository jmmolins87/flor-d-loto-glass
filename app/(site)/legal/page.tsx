import { StaticContentPage } from "@/components/shared/static-content-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { legalInfoPage } from "@/lib/static-pages";

export function generateMetadata() {
  return buildMetadata({
    title: legalInfoPage.title,
    description: legalInfoPage.description,
    path: legalInfoPage.path,
    keywords: ["informacion legal", "aviso legal floristeria"],
  });
}

export default function LegalPage() {
  return <StaticContentPage page={legalInfoPage} />;
}
