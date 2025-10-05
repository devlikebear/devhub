import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CloudflareAnalytics from "@/components/analytics/CloudflareAnalytics";
import ServiceWorkerRegistration from "@/components/pwa/ServiceWorkerRegistration";
import CommandPalette from "@/components/shortcuts/CommandPalette";
import KeyboardShortcutsHelp from "@/components/shortcuts/KeyboardShortcutsHelp";
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo/meta";
import { getCurrentLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ClientProviders from "@/components/ClientProviders";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - 개발자 유틸리티 플랫폼`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getCurrentLocale();
  const dictionary = getDictionary(locale);
  const serializableDictionary = JSON.parse(JSON.stringify(dictionary));

  return (
    <html lang={locale} className={inter.variable}>
      <body className="antialiased font-sans">
        <ClientProviders locale={locale} dictionary={serializableDictionary}>
          <Navbar />
          {children}
          <Footer />
          <CommandPalette />
          <KeyboardShortcutsHelp />
        </ClientProviders>
        <CloudflareAnalytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
