import { StaticContentPage } from "@/components/shared/static-content-page";
import { buildMetadata } from "@/lib/seo/metadata";
import { securityPage } from "@/lib/static-pages";

export function generateMetadata() {
  return buildMetadata({
    title: securityPage.title,
    description: securityPage.description,
    path: securityPage.path,
    keywords: ["seguridad web", "proteccion de datos floristeria"],
  });
}

export default function SecurityPage() {
  return <StaticContentPage page={securityPage} />;
}
