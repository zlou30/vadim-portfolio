import { AboutPreview } from "../components/home/AboutPreview";
import { ContactCallout } from "../components/home/ContactCallout";
import { FeaturedProjects } from "../components/home/FeaturedProjects";
import { Hero } from "../components/home/Hero";
import { SkillsPreview } from "../components/home/SkillsPreview";

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
