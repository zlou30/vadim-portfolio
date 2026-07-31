import type { Metadata } from "next";
import { Manrope, Onest } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import "./globals.css";

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
  title: {
    default: "Вадим Гуняков — портфолио",
    template: "%s | Вадим Гуняков",
  },
  description:
    "Личный сайт-портфолио Вадима Гунякова: разработка, AI, аналитика и интернет-маркетинг.",
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
