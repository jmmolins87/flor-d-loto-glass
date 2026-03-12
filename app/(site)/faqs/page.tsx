import { StaticContentPage } from "@/components/shared/static-content-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqsPage } from "@/lib/static-pages";

export function generateMetadata() {
  return buildMetadata({
    title: faqsPage.title,
    description: faqsPage.description,
    path: faqsPage.path,
    keywords: ["preguntas frecuentes", "faq floristeria", "entrega de flores"],
  });
}

export default function FaqsPage() {
  return <StaticContentPage page={faqsPage} />;
}
