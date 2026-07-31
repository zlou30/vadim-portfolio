import Link from "next/link";

import { getAllPublishedProjects } from "../../lib/projects";
import type { ProjectCatalogItem } from "../../types/project";
import { Container } from "../layout/Container";
import { ProjectCard } from "../projects/ProjectCard";

const featuredProjectSlugs = [
  "telegram-service",
  "postroy-rudu-hackathon",
  "teaching-internet-marketing",
] as const;

function isProjectDefined(
  project: ProjectCatalogItem | undefined,
): project is ProjectCatalogItem {
  return project !== undefined;
}

export function FeaturedProjects() {
  const publishedFeaturedProjects = getAllPublishedProjects().filter(
    (project) => project.featured,
  );

  const projectsBySlug = new Map(
    publishedFeaturedProjects.map((project) => [project.slug, project]),
  );

  const selectedProjects = featuredProjectSlugs
    .map((slug) => projectsBySlug.get(slug))
    .filter(isProjectDefined);

  const [leadingProject, ...secondaryProjects] = selectedProjects;

  if (!leadingProject) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-projects-title"
      className={[
        "bg-[var(--color-background)]",
        "pb-8 pt-20",
        "md:pb-10 md:pt-24",
        "lg:pt-28",
        "xl:pb-12",
      ].join(" ")}
    >
      <Container>
        <div className="lg:px-4 xl:px-0">
          <h2
            id="featured-projects-title"
            className={[
              "font-semibold tracking-[-0.035em]",
              "text-[var(--color-text-primary)]",
              "text-[32px] leading-[1.1]",
              "md:text-[38px] md:leading-[1.1]",
              "lg:text-[42px] lg:leading-[1.08]",
              "xl:text-[46px]",
            ].join(" ")}
          >
            Избранные проекты
          </h2>

          <div className="mt-12 md:mt-9 lg:mt-10">
            <ProjectCard project={leadingProject} variant="featured" />
          </div>

          {secondaryProjects.length > 0 ? (
            <div
              className={[
                "mt-16 grid gap-16",
                "lg:mt-[68px] lg:grid-cols-2 lg:gap-8",
                "xl:mt-[72px] xl:gap-10",
              ].join(" ")}
            >
              {secondaryProjects.slice(0, 2).map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="secondary"
                />
              ))}
            </div>
          ) : null}

          <div className="mt-10 md:mt-12">
            <Link
              href="/projects"
              className={[
                "group/all-projects inline-flex min-h-12 w-full",
                "items-center justify-center gap-2.5",
                "rounded-[14px] border",
                "border-[var(--color-line)]",
                "bg-[var(--color-surface)]",
                "px-6 text-[15px] font-semibold leading-5",
                "text-[var(--color-text-primary)]",
                "transition-[border-color,color] duration-200",
                "hover:border-[var(--color-accent)]",
                "hover:text-[var(--color-accent)]",
                "active:text-[var(--color-accent-hover)]",
                "focus-visible:outline focus-visible:outline-2",
                "focus-visible:outline-offset-[3px]",
                "focus-visible:outline-[var(--color-accent)]",
                "motion-reduce:transition-none",
                "sm:w-auto lg:text-base",
              ].join(" ")}
            >
              <span>Смотреть все проекты</span>

              <span
                aria-hidden="true"
                className={[
                  "text-lg leading-none",
                  "transition-transform duration-200",
                  "group-hover/all-projects:translate-x-1",
                  "motion-reduce:transform-none",
                  "motion-reduce:transition-none",
                ].join(" ")}
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
