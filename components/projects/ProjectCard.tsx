import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import type {
  Project,
  ProjectCatalogItem,
  ProjectCoverFit,
} from "../../types/project";
import { Tag } from "../ui/Tag";

type HomeProjectCardVariant = "default" | "featured" | "secondary";

type HomeProjectSource = Project | ProjectCatalogItem;

type HomeProjectCardProps = {
  project: HomeProjectSource;
  variant?: HomeProjectCardVariant;
};

type CatalogProjectCardProps = {
  project: ProjectCatalogItem;
  variant: "catalog";
};

type ProjectCardProps = HomeProjectCardProps | CatalogProjectCardProps;

type HomeProjectView = {
  slug: string;
  title: string;
  direction: string;
  summary: string;
  resultLabel: string;
  result: string | null;
  featuredTags: readonly string[];
  cover: string | null;
  coverAlt: string;
  coverFit: ProjectCoverFit;
  coverNumber: string | null;
};

type ProjectCoverProps = {
  project: HomeProjectView;
  featured: boolean;
};

type ProjectContentProps = {
  project: HomeProjectView;
  featured: boolean;
  stretch?: boolean;
};

const threeLineClampStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
};

const UNCONFIRMED_PERIOD = "Период уточняется";

function isLegacyProject(project: HomeProjectSource): project is Project {
  return "summary" in project;
}

function normalizeHomeProject(project: HomeProjectSource): HomeProjectView {
  if (isLegacyProject(project)) {
    return {
      slug: project.slug,
      title: project.title,
      direction: project.direction,
      summary: project.summary,
      resultLabel: project.resultLabel,
      result: project.result,
      featuredTags: project.featuredTags,
      cover: project.cover,
      coverAlt: project.coverAlt,
      coverFit: project.coverFit,
      coverNumber: project.coverNumber,
    };
  }

  return {
    slug: project.slug,
    title: project.title,
    direction: project.direction,
    summary: project.description,
    resultLabel: "Подтверждённый факт",
    result: project.fact,
    featuredTags: project.tags.slice(0, 4),
    cover: project.cover,
    coverAlt: project.coverAlt ?? `Обложка проекта «${project.title}»`,
    coverFit: "cover",
    coverNumber: null,
  };
}

function ProjectCover({ project, featured }: ProjectCoverProps) {
  const imageSizes = featured
    ? "(min-width: 1280px) 650px, (min-width: 1024px) 52vw, 100vw"
    : "(min-width: 1024px) 46vw, 100vw";

  const coverSizeClasses = featured
    ? [
        "h-[200px]",
        "sm:h-[260px]",
        "md:h-[300px]",
        "lg:h-[360px]",
        "xl:h-[410px]",
      ].join(" ")
    : [
        "h-[200px]",
        "sm:h-[240px]",
        "md:h-[280px]",
        "lg:h-[270px]",
        "xl:h-[292px]",
      ].join(" ");

  return (
    <div
      className={[
        "relative block w-full min-w-0",
        "overflow-hidden",
        coverSizeClasses,
        featured ? "rounded-[18px] lg:rounded-[20px]" : "rounded-[20px]",
      ].join(" ")}
    >
      {project.cover ? (
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes={imageSizes}
          className={[
            project.coverFit === "cover" ? "object-cover" : "object-contain",
            "bg-[#E9E2DA]",
            "transition-transform duration-[220ms]",
            "ease-out",
            "group-hover/home-project:scale-[1.02]",
            "motion-reduce:transform-none",
            "motion-reduce:transition-none",
          ].join(" ")}
        />
      ) : (
        <div
          aria-hidden="true"
          className={[
            "flex h-full w-full flex-col",
            "justify-between bg-[#E9E2DA]",
            featured ? "p-6 sm:p-8 lg:p-7 xl:p-9" : "p-6 sm:p-8 lg:p-6 xl:p-7",
          ].join(" ")}
        >
          <span
            className={[
              "h-0.5 w-7 rounded-full",
              "bg-[var(--color-accent)]",
            ].join(" ")}
          />

          {project.coverNumber ? (
            <span
              className={[
                "font-semibold leading-none",
                "tracking-[-0.035em]",
                "text-[var(--color-text-primary)]",
                featured
                  ? "text-[34px] sm:text-[40px]"
                  : "text-[30px] sm:text-[34px]",
              ].join(" ")}
            >
              {project.coverNumber}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

function ProjectTags({ tags }: { tags: readonly string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul
      aria-label="Технологии и инструменты проекта"
      className={[
        "mt-5 flex flex-wrap items-center",
        "text-[13px] leading-6",
        "text-[var(--color-text-secondary)]",
        "lg:text-sm",
      ].join(" ")}
    >
      {tags.map((tag, index) => (
        <li key={`${tag}-${index}`} className="flex max-w-full">
          <span className="break-words">{tag}</span>

          {index < tags.length - 1 ? (
            <span
              aria-hidden="true"
              className={["mx-2 shrink-0", "text-[var(--color-line)]"].join(
                " ",
              )}
            >
              ·
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function ProjectCaseLabel() {
  return (
    <span
      className={[
        "mt-4 inline-flex min-h-11",
        "items-center gap-2",
        "text-[15px] font-semibold leading-5",
        "text-[var(--color-text-primary)]",
        "transition-colors duration-[220ms]",
        "ease-out",
        "group-hover/home-project:text-[var(--color-accent-hover)]",
        "motion-reduce:transition-none",
        "lg:text-base",
      ].join(" ")}
    >
      <span>Смотреть кейс</span>

      <span
        aria-hidden="true"
        className={[
          "text-lg leading-none",
          "transition-transform duration-[220ms]",
          "ease-out",
          "group-hover/home-project:translate-x-1",
          "motion-reduce:transform-none",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        →
      </span>
    </span>
  );
}

function ProjectContent({
  project,
  featured,
  stretch = false,
}: ProjectContentProps) {
  return (
    <div
      className={[
        "min-w-0",
        featured ? "lg:py-1" : "pt-5 sm:pt-6",
        stretch ? "lg:flex lg:flex-1 lg:flex-col" : "",
      ].join(" ")}
    >
      <p
        className={[
          "text-[13px] font-semibold leading-5",
          "text-[var(--color-accent)]",
          "lg:text-sm",
        ].join(" ")}
      >
        {project.direction}
      </p>

      <h3
        className={[
          "mt-2 font-semibold",
          "tracking-[-0.035em]",
          "text-[var(--color-text-primary)]",
          "transition-colors duration-[220ms]",
          "ease-out",
          "group-hover/home-project:text-[var(--color-accent-hover)]",
          "motion-reduce:transition-none",
          featured
            ? [
                "text-[30px] leading-[1.08]",
                "lg:text-[34px]",
                "xl:text-[38px]",
              ].join(" ")
            : [
                "text-[27px] leading-[1.1]",
                "lg:text-[28px]",
                "xl:text-[29px]",
              ].join(" "),
        ].join(" ")}
      >
        {project.title}
      </h3>

      <p
        className={[
          "mt-4 font-normal",
          "text-base leading-[26px]",
          "text-[var(--color-text-primary)]",
          "lg:text-[18px] lg:leading-[29px]",
        ].join(" ")}
      >
        {project.summary}
      </p>

      {project.result ? (
        <div
          className={[
            "mt-5 border-l-2",
            "border-[var(--color-accent)]",
            "pl-4",
          ].join(" ")}
        >
          <p
            className={[
              "text-[13px] font-semibold leading-5",
              "text-[var(--color-text-secondary)]",
            ].join(" ")}
          >
            {project.resultLabel}
          </p>

          <p
            className={[
              "mt-2 text-[15px] leading-6",
              "text-[var(--color-text-primary)]",
              "lg:text-base lg:leading-[26px]",
            ].join(" ")}
          >
            {project.result}
          </p>
        </div>
      ) : null}

      <div className={stretch ? "lg:mt-auto lg:pt-5" : ""}>
        <ProjectTags tags={project.featuredTags} />

        <ProjectCaseLabel />
      </div>
    </div>
  );
}

function DefaultProjectCard({ project }: { project: HomeProjectSource }) {
  const normalizedProject = normalizeHomeProject(project);

  const tags = isLegacyProject(project) ? project.tags : project.tags;

  const isTemporary = isLegacyProject(project) ? project.isTemporary : false;

  return (
    <article
      className={[
        "flex h-full flex-col",
        "rounded-xl border",
        "border-slate-200 bg-white p-6",
      ].join(" ")}
    >
      {isTemporary ? (
        <p
          className={[
            "mb-4 text-xs font-semibold",
            "uppercase tracking-wide",
            "text-slate-500",
          ].join(" ")}
        >
          Временные данные
        </p>
      ) : null}

      <h3 className="text-xl font-semibold text-slate-950">
        {normalizedProject.title}
      </h3>

      <p className="mt-3 flex-1 leading-7 text-slate-600">
        {normalizedProject.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <Link
        href={`/projects/${normalizedProject.slug}`}
        aria-label={`Смотреть кейс «${normalizedProject.title}»`}
        className={[
          "mt-6 inline-flex min-h-11 items-center",
          "font-medium text-slate-900",
          "underline decoration-slate-300",
          "underline-offset-4",
          "transition-colors",
          "hover:decoration-slate-900",
          "focus-visible:rounded-md",
          "focus-visible:outline",
          "focus-visible:outline-2",
          "focus-visible:outline-offset-[3px]",
          "focus-visible:outline-[var(--color-accent)]",
        ].join(" ")}
      >
        Смотреть кейс
      </Link>
    </article>
  );
}

function CatalogProjectTags({ tags }: { tags: readonly string[] }) {
  const visibleTags = tags.slice(0, 4);

  if (visibleTags.length === 0) {
    return null;
  }

  return (
    <ul
      aria-label="Технологии и инструменты"
      className={[
        "flex min-w-0 flex-wrap",
        "text-xs font-medium leading-5",
        "text-[var(--color-text-secondary)]",
        "sm:text-[13px]",
      ].join(" ")}
    >
      {visibleTags.map((tag, index) => (
        <li
          key={tag}
          className={["inline-flex max-w-full", "items-center"].join(" ")}
        >
          <span className="break-words">{tag}</span>

          {index < visibleTags.length - 1 ? (
            <span
              aria-hidden="true"
              className={["mx-1.5 shrink-0", "text-[var(--color-line)]"].join(
                " ",
              )}
            >
              ·
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function CatalogProjectCard({ project }: { project: ProjectCatalogItem }) {
  const hasConfirmedPeriod = project.period.trim() !== UNCONFIRMED_PERIOD;

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Смотреть кейс «${project.title}»`}
      className={[
        "group/catalog flex h-full w-full min-w-0",
        "flex-col overflow-hidden",
        "rounded-[20px] border",
        "border-[var(--color-line)]",
        "bg-[var(--color-surface)]",
        "shadow-[0_10px_24px_rgba(34,34,32,0.035)]",
        "transition-[transform,border-color,box-shadow]",
        "duration-200",
        "hover:-translate-y-0.5",
        "hover:border-[var(--color-accent)]",
        "hover:shadow-[0_14px_30px_rgba(34,34,32,0.065)]",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-[3px]",
        "focus-visible:outline-[var(--color-accent)]",
        "motion-reduce:transform-none",
        "motion-reduce:transition-[border-color,box-shadow]",
        "sm:rounded-[22px]",
      ].join(" ")}
    >
      <div
        className={[
          "relative aspect-video w-full shrink-0",
          "overflow-hidden border-b",
          "border-[var(--color-line)]",
          "bg-[#E9E2DA]",
          "transition-colors duration-200",
          "group-hover/catalog:border-[var(--color-accent)]",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.coverAlt ?? `Обложка проекта «${project.title}»`}
            fill
            sizes={[
              "(min-width: 1280px) 300px,",
              "(min-width: 960px) 31vw,",
              "(min-width: 640px) 48vw,",
              "calc(100vw - 32px)",
            ].join(" ")}
            className={[
              "object-cover",
              "transition-transform duration-200",
              "group-hover/catalog:scale-[1.01]",
              "motion-reduce:transform-none",
              "motion-reduce:transition-none",
            ].join(" ")}
          />
        ) : (
          <div aria-hidden="true" className="h-full w-full p-4 sm:p-[18px]">
            <span
              className={[
                "block h-0.5 w-7 rounded-full",
                "bg-[var(--color-accent)]",
              ].join(" ")}
            />
          </div>
        )}
      </div>

      <div
        className={["flex min-w-0 flex-1", "flex-col p-4 sm:p-[18px]"].join(
          " ",
        )}
      >
        <div className="min-w-0">
          {hasConfirmedPeriod ? (
            <p
              className={[
                "text-xs leading-[18px]",
                "text-[var(--color-text-secondary)]",
                "sm:text-[13px] sm:leading-5",
              ].join(" ")}
            >
              {project.period}
            </p>
          ) : null}

          <p
            className={[
              "min-w-0 text-xs font-semibold",
              "leading-[18px]",
              "text-[var(--color-accent)]",
              "sm:text-[13px] sm:leading-5",
              hasConfirmedPeriod ? "mt-1" : "",
            ].join(" ")}
          >
            {project.direction}
          </p>
        </div>

        <h3
          className={[
            "mt-2 font-semibold",
            "text-[22px] leading-[1.15]",
            "tracking-[-0.035em]",
            "text-[var(--color-text-primary)]",
            "transition-colors duration-200",
            "group-hover/catalog:text-[var(--color-accent-hover)]",
            "motion-reduce:transition-none",
            "sm:text-[23px]",
            "xl:text-2xl",
          ].join(" ")}
        >
          {project.title}
        </h3>

        <p
          style={threeLineClampStyle}
          className={[
            "mt-3 overflow-hidden",
            "text-sm leading-[1.55]",
            "text-[var(--color-text-primary)]",
            "sm:text-[15px]",
          ].join(" ")}
        >
          {project.description}
        </p>

        {project.fact ? (
          <p
            style={threeLineClampStyle}
            className={[
              "mt-4 overflow-hidden border-l-2",
              "border-[var(--color-accent)]",
              "pl-3.5 text-sm leading-[1.55]",
              "text-[var(--color-text-secondary)]",
            ].join(" ")}
          >
            {project.fact}
          </p>
        ) : null}

        <div className="mt-auto pt-4">
          <CatalogProjectTags tags={project.tags} />

          <span
            className={[
              "mt-3 inline-flex min-h-11",
              "items-center gap-2",
              "text-sm font-semibold leading-5",
              "text-[var(--color-text-primary)]",
              "transition-colors duration-200",
              "group-hover/catalog:text-[var(--color-accent-hover)]",
              "motion-reduce:transition-none",
              "sm:text-[15px]",
            ].join(" ")}
          >
            <span>Смотреть кейс</span>

            <span
              aria-hidden="true"
              className={[
                "text-lg leading-none",
                "text-[var(--color-text-secondary)]",
                "transition-[color,transform]",
                "duration-200",
                "group-hover/catalog:translate-x-1",
                "group-hover/catalog:text-[var(--color-accent)]",
                "motion-reduce:transform-none",
                "motion-reduce:transition-none",
              ].join(" ")}
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedHomeProjectCard({ project }: { project: HomeProjectView }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Смотреть кейс «${project.title}»`}
      className={[
        "group/home-project grid min-w-0",
        "rounded-[24px] border",
        "border-[var(--color-line)]",
        "bg-[var(--color-surface)]",
        "p-3.5 sm:p-6 lg:p-7 xl:p-8",
        "transition-[transform,border-color,box-shadow]",
        "duration-[220ms] ease-out",
        "hover:-translate-y-1",
        "hover:border-[var(--color-accent)]",
        "hover:shadow-[0_14px_30px_rgba(34,34,32,0.06)]",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-[3px]",
        "focus-visible:outline-[var(--color-accent)]",
        "motion-reduce:transform-none",
        "motion-reduce:transition-[border-color,box-shadow]",
        "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]",
        "lg:items-start lg:gap-8",
        "xl:gap-12",
      ].join(" ")}
    >
      <ProjectCover project={project} featured />

      <div className="mt-5 sm:mt-6 lg:mt-0">
        <ProjectContent project={project} featured />
      </div>
    </Link>
  );
}

function SecondaryHomeProjectCard({ project }: { project: HomeProjectView }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Смотреть кейс «${project.title}»`}
      className={[
        "group/home-project min-w-0",
        "transition-[transform,border-color,box-shadow]",
        "duration-[220ms] ease-out",
        "hover:-translate-y-1",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-[3px]",
        "focus-visible:outline-[var(--color-accent)]",
        "motion-reduce:transform-none",
        "motion-reduce:transition-[border-color,box-shadow]",
        "lg:flex lg:h-full lg:flex-col",
        "lg:rounded-[22px]",
        "lg:border lg:border-[var(--color-line)]",
        "lg:bg-[var(--color-surface)]",
        "lg:p-6 xl:p-7",
        "lg:hover:border-[var(--color-accent)]",
        "lg:hover:shadow-[0_14px_30px_rgba(34,34,32,0.055)]",
      ].join(" ")}
    >
      <ProjectCover project={project} featured={false} />

      <ProjectContent project={project} featured={false} stretch />
    </Link>
  );
}

export function ProjectCard(props: ProjectCardProps) {
  if (props.variant === "catalog") {
    return <CatalogProjectCard project={props.project} />;
  }

  const { project, variant = "default" } = props;

  if (variant === "default") {
    return <DefaultProjectCard project={project} />;
  }

  const normalizedProject = normalizeHomeProject(project);

  if (variant === "featured") {
    return <FeaturedHomeProjectCard project={normalizedProject} />;
  }

  return <SecondaryHomeProjectCard project={normalizedProject} />;
}
