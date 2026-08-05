import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const display = Barlow_Condensed({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Kira Real Estate | Addis Ababa Property Demo", template: "%s | Kira Real Estate" },
  description: siteConfig.description,
  openGraph: {
    title: "Kira Real Estate",
    description: siteConfig.description,
    type: "website",
    locale: "en_ET",
    images: [{ url: "/images/kira-hero.png", width: 1680, height: 945, alt: "Contemporary apartment residence overlooking Addis Ababa at dusk" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${display.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
