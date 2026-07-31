import type { Metadata } from "next";
import { Manrope, Onest } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import "./globals.css";

const SITE_URL = "https://www.vadimgunyakov.ru";
const SITE_NAME = "Вадим Гуняков";
const DEFAULT_TITLE =
  "Вадим Гуняков — разработка, AI, аналитика и автоматизация";
const DEFAULT_DESCRIPTION =
  "Анализирую задачи, проектирую и собираю цифровые решения на стыке разработки, AI, аналитики и интернет-маркетинга.";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Технологии",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className={`${onest.variable} ${manrope.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
