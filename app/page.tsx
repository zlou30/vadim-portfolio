import type { Metadata } from "next";

import { AboutPreview } from "../components/home/AboutPreview";
import { ContactCallout } from "../components/home/ContactCallout";
import { FeaturedProjects } from "../components/home/FeaturedProjects";
import { Hero } from "../components/home/Hero";
import { SkillsPreview } from "../components/home/SkillsPreview";

const SITE_URL = "https://www.vadimgunyakov.ru";
const SITE_NAME = "Вадим Гуняков";
const HOME_TITLE = "Вадим Гуняков — разработка, AI, аналитика и автоматизация";
const HOME_DESCRIPTION =
  "Анализирую задачи, проектирую и собираю цифровые решения на стыке разработки, AI, аналитики и интернет-маркетинга.";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },

  description: HOME_DESCRIPTION,

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <SkillsPreview />
      <ContactCallout />
    </>
  );
}
