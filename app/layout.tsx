import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Manrope, Space_Grotesk } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";

import { buildMetadata } from "@/lib/seo/metadata";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const navFont = Space_Grotesk({
  variable: "--font-nav",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

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
    <html lang="es" className={`${bodyFont.variable} ${displayFont.variable} ${navFont.variable}`}>
      <body className={bodyFont.className}>
        {children}
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
