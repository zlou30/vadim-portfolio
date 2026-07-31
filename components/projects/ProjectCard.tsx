import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Project, ProjectCatalogItem } from "../../types/project";
import { Tag } from "../ui/Tag";

type HomeProject = Project | ProjectCatalogItem;

type DefaultProjectCardProps = {
  project: Project;
  variant?: "default";
};

type HomeProjectCardProps = {
  project: HomeProject;
  variant: "featured" | "secondary";
};

type CatalogProjectCardProps = {
  project: ProjectCatalogItem;
  variant: "catalog";
};

type ProjectCardProps =
  | DefaultProjectCardProps
  | HomeProjectCardProps
  | CatalogProjectCardProps;

type ProjectCoverProps = {
  project: HomeProject;
  featured: boolean;
};

type ProjectContentProps = {
  project: HomeProject;
  featured: boolean;
  stretch?: boolean;
};

const threeLineClampStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
};

const UNCONFIRMED_PERIOD = "Период уточняется";

function getHomeProjectDescription(project: HomeProject): string {
  if ("description" in project && typeof project.description === "string") {
    const description = project.description.trim();

    if (description.length > 0) {
      return description;
    }
  }

  if ("summary" in project && typeof project.summary === "string") {
    return project.summary.trim();
  }

  return "";
}

function getHomeProjectTags(project: HomeProject): readonly string[] {
  if (
    "featuredTags" in project &&
    Array.isArray(project.featuredTags) &&
    project.featuredTags.length > 0
  ) {
    return project.featuredTags;
  }

  if ("tags" in project && Array.isArray(project.tags)) {
    return project.tags;
  }

  return [];
}

function getHomeProjectCoverAlt(project: HomeProject): string {
  if (
    "coverAlt" in project &&
    typeof project.coverAlt === "string" &&
    project.coverAlt.trim().length > 0
  ) {
    return project.coverAlt;
  }

  return `Обложка проекта «${project.title}»`;
}

function getHomeProjectCoverNumber(project: HomeProject): string | null {
  if ("coverNumber" in project && typeof project.coverNumber === "string") {
    return project.coverNumber;
  }

  return null;
}

function ProjectCover({ project, featured }: ProjectCoverProps) {
  const projectHref = `/projects/${project.slug}`;

  const imageSizes = featured
    ? [
        "(min-width: 1280px) 650px,",
        "(min-width: 1024px) 52vw,",
        "(min-width: 640px) calc(100vw - 96px),",
        "calc(100vw - 60px)",
      ].join(" ")
    : [
        "(min-width: 1280px) 560px,",
        "(min-width: 1024px) 46vw,",
        "(min-width: 640px) calc(100vw - 96px),",
        "calc(100vw - 60px)",
      ].join(" ");

  const coverSizeClasses = featured
    ? [
        "aspect-video",
        "sm:aspect-auto sm:h-[260px]",
        "md:h-[300px]",
        "lg:h-[360px]",
        "xl:h-[410px]",
      ].join(" ")
    : [
        "aspect-video",
        "sm:aspect-auto sm:h-[240px]",
        "md:h-[280px]",
        "lg:h-[270px]",
        "xl:h-[292px]",
      ].join(" ");

  const coverNumber = getHomeProjectCoverNumber(project);

  return (
    <Link
      href={projectHref}
      aria-label={`Открыть кейс «${project.title}»`}
      className={[
        "group/cover relative block",
        "w-full min-w-0",
        "overflow-hidden",
        coverSizeClasses,
        featured ? "rounded-[18px] lg:rounded-[20px]" : "rounded-[20px]",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-[3px]",
        "focus-visible:outline-[var(--color-accent)]",
      ].join(" ")}
    >
      {project.cover ? (
        <Image
          src={project.cover}
          alt={getHomeProjectCoverAlt(project)}
          fill
          sizes={imageSizes}
          className={[
            "block h-full w-full",
            "object-cover object-center",
            "transition-transform duration-200",
            "group-hover/cover:scale-[1.01]",
            "motion-reduce:transform-none",
            "motion-reduce:transition-none",
          ].join(" ")}
        />
      ) : (
        <div
          aria-hidden="true"
          className={[
            "flex h-full w-full",
            "flex-col justify-between",
            "bg-[#E9E2DA]",
            featured ? "p-6 sm:p-8 lg:p-7 xl:p-9" : "p-6 sm:p-8 lg:p-6 xl:p-7",
          ].join(" ")}
        >
          <span
            className={[
              "h-0.5 w-7 rounded-full",
              "bg-[var(--color-accent)]",
            ].join(" ")}
          />

          {coverNumber ? (
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
              {coverNumber}
            </span>
          ) : null}
        </div>
      )}
    </Link>
  );
}

function ProjectTags({ tags }: { tags?: readonly string[] }) {
  const safeTags = tags ?? [];

  if (safeTags.length === 0) {
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
      {safeTags.map((tag, index) => (
        <li key={`${tag}-${index}`} className="flex whitespace-nowrap">
          <span>{tag}</span>

          {index < safeTags.length - 1 ? (
            <span
              aria-hidden="true"
              className={["mx-2", "text-[var(--color-line)]"].join(" ")}
            >
              ·
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function ProjectCaseLink({ project }: { project: HomeProject }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Смотреть кейс «${project.title}»`}
      className={[
        "group/link mt-4 inline-flex",
        "min-h-11 items-center gap-2",
        "rounded-[6px]",
        "text-[15px] font-semibold leading-5",
        "text-[var(--color-text-primary)]",
        "transition-colors duration-200",
        "hover:text-[var(--color-accent)]",
        "active:text-[var(--color-accent-active)]",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-[3px]",
        "focus-visible:outline-[var(--color-accent)]",
        "motion-reduce:transition-none",
        "lg:text-base",
      ].join(" ")}
    >
      <span>Смотреть кейс</span>

      <span
        aria-hidden="true"
        className={[
          "text-lg leading-none",
          "transition-transform duration-200",
          "group-hover/link:translate-x-1",
          "group-active/link:translate-x-0",
          "motion-reduce:transform-none",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        →
      </span>
    </Link>
  );
}

function ProjectContent({
  project,
  featured,
  stretch = false,
}: ProjectContentProps) {
  const description = getHomeProjectDescription(project);

  const projectTags = getHomeProjectTags(project);

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
        <Link
          href={`/projects/${project.slug}`}
          className={[
            "rounded-[6px]",
            "transition-colors duration-200",
            "hover:text-[var(--color-accent)]",
            "focus-visible:outline",
            "focus-visible:outline-2",
            "focus-visible:outline-offset-[3px]",
            "focus-visible:outline-[var(--color-accent)]",
          ].join(" ")}
        >
          {project.title}
        </Link>
      </h3>

      {description ? (
        <p
          className={[
            "mt-4 font-normal",
            "text-base leading-[26px]",
            "text-[var(--color-text-primary)]",
            "lg:text-[18px]",
            "lg:leading-[29px]",
          ].join(" ")}
        >
          {description}
        </p>
      ) : null}

      <div className={stretch ? "lg:mt-auto lg:pt-5" : ""}>
        <ProjectTags tags={projectTags} />

        <ProjectCaseLink project={project} />
      </div>
    </div>
  );
}

function DefaultProjectCard({ project }: { project: Project }) {
  const tags = project.tags ?? [];

  return (
    <article
      className={[
        "flex h-full flex-col",
        "rounded-xl border",
        "border-slate-200",
        "bg-white p-6",
      ].join(" ")}
    >
      {project.isTemporary ? (
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

      <h3 className={["text-xl font-semibold", "text-slate-950"].join(" ")}>
        {project.title}
      </h3>

      <p className={["mt-3 flex-1 leading-7", "text-slate-600"].join(" ")}>
        {project.summary}
      </p>

      {tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`}>{tag}</Tag>
          ))}
        </div>
      ) : null}

      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Смотреть кейс «${project.title}»`}
        className={[
          "mt-6 inline-flex min-h-11",
          "items-center",
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

function CatalogProjectTags({ tags }: { tags?: readonly string[] }) {
  const visibleTags = (tags ?? []).slice(0, 4);

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
          key={`${tag}-${index}`}
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
        "group/catalog flex h-full",
        "w-full min-w-0 flex-col",
        "overflow-hidden",
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
          "relative aspect-video w-full",
          "shrink-0 overflow-hidden",
          "border-b",
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
              "object-cover object-center",
              "transition-transform duration-200",
              "group-hover/catalog:scale-[1.01]",
              "motion-reduce:transform-none",
              "motion-reduce:transition-none",
            ].join(" ")}
          />
        ) : (
          <div
            aria-hidden="true"
            className={["h-full w-full", "p-4 sm:p-[18px]"].join(" ")}
          >
            <span
              className={[
                "block h-0.5 w-7",
                "rounded-full",
                "bg-[var(--color-accent)]",
              ].join(" ")}
            />
          </div>
        )}
      </div>

      <div
        className={["flex min-w-0 flex-1", "flex-col p-4", "sm:p-[18px]"].join(
          " ",
        )}
      >
        <div className="min-w-0">
          {hasConfirmedPeriod ? (
            <p
              className={[
                "text-xs leading-[18px]",
                "text-[var(--color-text-secondary)]",
                "sm:text-[13px]",
                "sm:leading-5",
              ].join(" ")}
            >
              {project.period}
            </p>
          ) : null}

          <p
            className={[
              "min-w-0 text-xs",
              "font-semibold leading-[18px]",
              "text-[var(--color-accent)]",
              "sm:text-[13px]",
              "sm:leading-5",
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
              "mt-4 overflow-hidden",
              "border-l-2",
              "border-[var(--color-accent)]",
              "pl-3.5 text-sm",
              "leading-[1.55]",
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

export function ProjectCard(props: ProjectCardProps) {
  if (props.variant === "catalog") {
    return <CatalogProjectCard project={props.project} />;
  }

  if (props.variant === undefined || props.variant === "default") {
    return <DefaultProjectCard project={props.project} />;
  }

  const { project, variant } = props;

  const isFeatured = variant === "featured";

  if (isFeatured) {
    return (
      <article
        className={[
          "grid min-w-0",
          "rounded-[24px]",
          "border",
          "border-[var(--color-line)]",
          "bg-[var(--color-surface)]",
          "p-3.5",
          "sm:p-6",
          "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]",
          "lg:items-start",
          "lg:gap-8 lg:p-7",
          "xl:gap-12 xl:p-8",
        ].join(" ")}
      >
        <ProjectCover project={project} featured />

        <div className="mt-5 sm:mt-6 lg:mt-0">
          <ProjectContent project={project} featured />
        </div>
      </article>
    );
  }

  return (
    <article
      className={[
        "min-w-0",
        "rounded-[24px]",
        "border",
        "border-[var(--color-line)]",
        "bg-[var(--color-surface)]",
        "p-3.5",
        "sm:p-6",
        "lg:flex lg:h-full",
        "lg:flex-col",
        "lg:rounded-[22px]",
        "lg:p-6",
        "xl:p-7",
      ].join(" ")}
    >
      <ProjectCover project={project} featured={false} />

      <ProjectContent project={project} featured={false} stretch />
    </article>
  );
}
