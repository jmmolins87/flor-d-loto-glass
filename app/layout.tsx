import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";

import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...buildMetadata({}),
  title: {
    default: "Flor de Loto | Floristeria premium en Segovia",
    template: "%s | Flor de Loto",
  },
  icons: {
    icon: "/icon.png?v=3",
    shortcut: "/icon.png?v=3",
    apple: "/apple-icon.png?v=3",
  },
  manifest: "/manifest.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="es">
      <body>
        {children}
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
