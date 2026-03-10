import { PageTransitionShell } from "@/components/shared/page-transition-shell";

export default function SiteTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PageTransitionShell>{children}</PageTransitionShell>;
}
