import Image from "next/image";
import Link from "next/link";

import type { ProjectCatalogItem, ProjectDocument } from "../../types/project";
import { CaseMdxRenderer } from "../mdx/CaseMdxRenderer";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { ProjectBackLink } from "./ProjectBackLink";

type ProjectCaseProps = {
  project: ProjectDocument;
  nextProject: ProjectCatalogItem | null;
};

type CaseDetail = {
  label: string;
  value: string;
};

const UNCONFIRMED_PERIOD = "Период уточняется";

function hasConfirmedPeriod(period: string): boolean {
  const normalizedPeriod = period.trim();

  return normalizedPeriod.length > 0 && normalizedPeriod !== UNCONFIRMED_PERIOD;
}

function TechnologyList({ technologies }: { technologies: readonly string[] }) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <ul
      aria-label="Технологии проекта"
      className={[
        "mt-6 flex min-w-0 flex-wrap",
        "text-sm font-medium leading-6",
        "text-[var(--color-text-secondary)]",
        "md:text-[15px]",
      ].join(" ")}
    >
      {technologies.map((technology, index) => (
        <li
          key={`${technology}-${index}`}
          className={["inline-flex max-w-full", "items-center"].join(" ")}
        >
          <span className="break-words">{technology}</span>

          {index < technologies.length - 1 ? (
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

function ProjectDetails({ details }: { details: readonly CaseDetail[] }) {
  if (details.length === 0) {
    return null;
  }

  return (
    <dl
      className={[
        "min-w-0 divide-y",
        "divide-[var(--color-line)]",
        "border-y",
        "border-[var(--color-line)]",
      ].join(" ")}
    >
      {details.map((detail) => (
        <div
          key={detail.label}
          className={[
            "grid min-w-0 gap-2 py-[18px]",
            "md:grid-cols-[160px_minmax(0,1fr)]",
            "md:gap-8 md:py-5",
            "min-[1100px]:grid-cols-1",
            "min-[1100px]:gap-0",
            "min-[1100px]:py-[18px]",
          ].join(" ")}
        >
          <dt
            className={[
              "text-[13px] font-semibold leading-5",
              "text-[var(--color-text-secondary)]",
              "md:text-sm",
            ].join(" ")}
          >
            {detail.label}
          </dt>

          <dd
            className={[
              "min-w-0 break-words",
              "text-base leading-[26px]",
              "text-[var(--color-text-primary)]",
              "min-[1100px]:mt-2",
            ].join(" ")}
          >
            {detail.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectCase({ project, nextProject }: ProjectCaseProps) {
  const { metadata, content } = project;

  const confirmedPeriod = hasConfirmedPeriod(metadata.period);

  const technologies =
    metadata.tools.length > 0 ? metadata.tools : metadata.tags;

  const details: CaseDetail[] = [];

  if (metadata.role) {
    details.push({
      label: "Роль",
      value: metadata.role,
    });
  }

  if (metadata.task) {
    details.push({
      label: "Задача",
      value: metadata.task,
    });
  }

  if (technologies.length > 0) {
    details.push({
      label: "Инструменты",
      value: technologies.join(" · "),
    });
  }

  if (confirmedPeriod) {
    details.push({
      label: "Период",
      value: metadata.period,
    });
  }

  const hasProjectDetails = details.length > 0;

  return (
    <article
      className={[
        "bg-[var(--color-background)]",
        "pb-20 pt-8",
        "md:pb-24 md:pt-10",
        "xl:pb-28 xl:pt-12",
      ].join(" ")}
    >
      <Container>
        <ProjectBackLink />

        <header className="mt-7 max-w-[980px] md:mt-8">
          <div
            className={["flex flex-wrap items-center", "gap-x-3 gap-y-1"].join(
              " ",
            )}
          >
            <p
              className={[
                "text-sm font-semibold leading-5",
                "text-[var(--color-accent)]",
                "md:text-[15px]",
              ].join(" ")}
            >
              {metadata.direction}
            </p>

            {confirmedPeriod ? (
              <>
                <span aria-hidden="true" className="text-[var(--color-line)]">
                  ·
                </span>

                <p
                  className={[
                    "text-sm leading-5",
                    "text-[var(--color-text-secondary)]",
                    "md:text-[15px]",
                  ].join(" ")}
                >
                  {metadata.period}
                </p>
              </>
            ) : null}
          </div>

          <h1
            className={[
              "mt-4 max-w-[960px]",
              "text-[38px] font-semibold",
              "leading-[1.06]",
              "tracking-[-0.04em]",
              "text-[var(--color-text-primary)]",
              "sm:text-[44px]",
              "md:text-[52px]",
              "xl:text-[64px]",
            ].join(" ")}
          >
            {metadata.title}
          </h1>

          <p
            className={[
              "mt-5 max-w-[760px]",
              "text-base leading-[26px]",
              "text-[var(--color-text-secondary)]",
              "md:mt-6 md:text-[18px]",
              "md:leading-[29px]",
            ].join(" ")}
          >
            {metadata.description}
          </p>

          <TechnologyList technologies={technologies} />
        </header>

        <div
          className={[
            "mt-9 grid min-w-0 gap-10",
            "md:mt-12 md:gap-12",
            "min-[1100px]:mt-14",
            hasProjectDetails
              ? [
                  "min-[1100px]:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)]",
                  "min-[1100px]:items-start",
                  "min-[1100px]:gap-x-12",
                  "min-[1100px]:gap-y-0",
                ].join(" ")
              : "",
          ].join(" ")}
        >
          {metadata.cover ? (
            <figure
              className={[
                "relative aspect-video",
                "w-full min-w-0",
                "overflow-hidden",
                "rounded-[20px]",
                "bg-transparent",
                "md:rounded-[22px]",
                hasProjectDetails ? "" : "mx-auto max-w-[1040px]",
              ].join(" ")}
            >
              <Image
                src={metadata.cover}
                alt={metadata.coverAlt ?? `Обложка проекта «${metadata.title}»`}
                fill
                priority
                sizes="(min-width: 1100px) 700px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
                className={[
                  "block border-0",
                  "rounded-[inherit]",
                  "object-cover object-center",
                ].join(" ")}
              />
            </figure>
          ) : (
            <figure
              role="img"
              aria-label="Обложка проекта будет добавлена позже"
              className={[
                "relative w-full min-w-0",
                "h-[clamp(170px,46vw,190px)]",
                "overflow-hidden",
                "rounded-[22px]",
                "border",
                "border-[var(--color-line)]",
                "bg-[#E9E2DA]",
                "md:h-[clamp(230px,30vw,280px)]",
                "lg:h-[clamp(280px,25vw,340px)]",
                "xl:rounded-[24px]",
                hasProjectDetails ? "" : "mx-auto max-w-[1040px]",
              ].join(" ")}
            >
              <div className="h-full w-full p-5 sm:p-7">
                <span
                  aria-hidden="true"
                  className={[
                    "block h-0.5 w-8",
                    "rounded-full",
                    "bg-[var(--color-accent)]",
                  ].join(" ")}
                />
              </div>
            </figure>
          )}

          {hasProjectDetails ? (
            <div className="min-w-0">
              <ProjectDetails details={details} />
            </div>
          ) : null}
        </div>

        {content ? (
          <div className="mt-16 md:mt-20">
            <div className={["mx-auto min-w-0", "max-w-[740px]"].join(" ")}>
              <CaseMdxRenderer source={content} />
            </div>
          </div>
        ) : null}

        <nav
          aria-label="Навигация по проектам"
          className={[
            "mt-16 border-t",
            "border-[var(--color-line)]",
            "pt-6",
            "md:mt-20 md:pt-8",
          ].join(" ")}
        >
          <div
            className={[
              "flex w-full flex-col gap-3",
              "sm:grid sm:items-end sm:gap-6",
              nextProject
                ? ["sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"].join(" ")
                : "sm:grid-cols-1",
            ].join(" ")}
          >
            <div
              className={[
                "flex min-w-0 flex-col",
                "items-start justify-end",
              ].join(" ")}
            >
              <span
                className={[
                  "hidden text-xs font-medium",
                  "leading-5",
                  "text-[var(--color-text-secondary)]",
                  "sm:block sm:text-[13px]",
                ].join(" ")}
              >
                Каталог
              </span>

              <ProjectBackLink variant="navigation" />
            </div>

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                aria-label={`Следующий проект: ${nextProject.title}`}
                className={[
                  "group/next-project",
                  "flex min-h-11 w-full min-w-0",
                  "flex-col justify-center",
                  "rounded-[16px] border",
                  "border-[var(--color-line)]",
                  "bg-[var(--color-surface)]",
                  "px-4 py-4",
                  "transition-[transform,border-color]",
                  "duration-[220ms] ease-out",
                  "hover:-translate-y-0.5",
                  "hover:border-[var(--color-accent)]",
                  "focus-visible:outline",
                  "focus-visible:outline-2",
                  "focus-visible:outline-offset-[3px]",
                  "focus-visible:outline-[var(--color-accent)]",
                  "motion-reduce:transform-none",
                  "motion-reduce:transition-colors",
                  "sm:items-end sm:bg-transparent",
                  "sm:px-0 sm:py-0 sm:text-right",
                  "sm:border-transparent",
                  "sm:hover:translate-y-0",
                  "sm:hover:border-transparent",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-xs font-medium leading-5",
                    "text-[var(--color-text-secondary)]",
                    "sm:text-[13px]",
                  ].join(" ")}
                >
                  Следующий проект
                </span>

                <span
                  className={[
                    "mt-1 flex w-full min-w-0",
                    "items-end justify-between gap-4",
                    "sm:justify-end sm:gap-2",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "min-w-0 break-words",
                      "text-left text-[15px]",
                      "font-semibold leading-[1.35]",
                      "text-[var(--color-text-primary)]",
                      "transition-colors",
                      "duration-[220ms] ease-out",
                      "group-hover/next-project:text-[var(--color-accent-hover)]",
                      "motion-reduce:transition-none",
                      "sm:text-right md:text-base",
                    ].join(" ")}
                  >
                    {nextProject.title}
                  </span>

                  <span
                    aria-hidden="true"
                    className={[
                      "mb-px shrink-0",
                      "text-lg leading-none",
                      "text-[var(--color-text-secondary)]",
                      "transition-[color,transform]",
                      "duration-[220ms] ease-out",
                      "group-hover/next-project:translate-x-1",
                      "group-hover/next-project:text-[var(--color-accent)]",
                      "motion-reduce:transform-none",
                      "motion-reduce:transition-none",
                    ].join(" ")}
                  >
                    →
                  </span>
                </span>
              </Link>
            ) : null}
          </div>
        </nav>

        <section
          aria-labelledby="project-contact-title"
          className={[
            "mt-10 rounded-[20px]",
            "border",
            "border-[var(--color-line)]",
            "bg-[var(--color-surface)]",
            "p-6",
            "sm:flex sm:items-center",
            "sm:justify-between sm:gap-8",
            "md:p-7",
          ].join(" ")}
        >
          <h2
            id="project-contact-title"
            className={[
              "max-w-[620px]",
              "text-[24px] font-semibold",
              "leading-[1.2]",
              "tracking-[-0.03em]",
              "text-[var(--color-text-primary)]",
              "md:text-[28px]",
            ].join(" ")}
          >
            Есть похожая задача — давайте обсудим.
          </h2>

          <div
            className={[
              "mt-6 shrink-0",
              "[&>a]:w-full",
              "[&>a]:justify-center",
              "sm:mt-0",
              "sm:[&>a]:w-auto",
            ].join(" ")}
          >
            <Button href="/contacts" variant="primary">
              Связаться
            </Button>
          </div>
        </section>
      </Container>
    </article>
  );
}
