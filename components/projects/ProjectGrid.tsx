import type { ProjectCatalogItem } from "../../types/project";
import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = {
  projects: readonly ProjectCatalogItem[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul
      className={[
        "flex min-w-0 flex-wrap",
        "items-stretch justify-center",
        "gap-5",
        "min-[960px]:gap-6",
      ].join(" ")}
    >
      {projects.map((project) => (
        <li
          key={project.slug}
          className={[
            "flex min-w-0 shrink-0 grow-0",
            "basis-full",
            "sm:basis-[calc((100%_-_20px)/2)]",
            "min-[960px]:basis-[calc((100%_-_48px)/3)]",
            "xl:basis-[calc((100%_-_72px)/4)]",
          ].join(" ")}
        >
          <ProjectCard project={project} variant="catalog" />
        </li>
      ))}
    </ul>
  );
}
