import type { Metadata } from "next";

import { Container } from "../../components/layout/Container";
import { ProjectGrid } from "../../components/projects/ProjectGrid";
import { Button } from "../../components/ui/Button";
import {
  getAllPublishedProjects,
  groupProjectsByYear,
} from "../../lib/projects";

const SITE_URL = "https://www.vadimgunyakov.ru";
const SITE_NAME = "Вадим Гуняков";
const PROJECTS_URL = `${SITE_URL}/projects`;
const PROJECTS_TITLE = "Проекты";
const PROJECTS_SOCIAL_TITLE = `${PROJECTS_TITLE} — ${SITE_NAME}`;
const PROJECTS_DESCRIPTION =
  "Кейсы Вадима Гунякова в разработке, AI, аналитике, автоматизации и интернет-маркетинге.";

export const metadata: Metadata = {
  title: PROJECTS_TITLE,
  description: PROJECTS_DESCRIPTION,

  alternates: {
    canonical: PROJECTS_URL,
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: PROJECTS_URL,
    siteName: SITE_NAME,
    title: PROJECTS_SOCIAL_TITLE,
    description: PROJECTS_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: PROJECTS_SOCIAL_TITLE,
    description: PROJECTS_DESCRIPTION,
  },
};

export default function ProjectsPage() {
  const projects = getAllPublishedProjects();
  const projectGroups = groupProjectsByYear(projects);

  return (
    <section
      aria-labelledby="projects-page-title"
      className={[
        "bg-[var(--color-background)]",
        "pb-20 pt-8",
        "md:pb-24 md:pt-10",
        "lg:pt-12",
        "xl:pb-28 xl:pt-14",
      ].join(" ")}
    >
      <Container>
        <header className="max-w-[760px]">
          <h1
            id="projects-page-title"
            className={[
              "font-semibold tracking-[-0.035em]",
              "text-[var(--color-text-primary)]",
              "text-[38px] leading-[1.08]",
              "sm:text-[44px]",
              "md:text-[50px]",
              "xl:text-[56px]",
            ].join(" ")}
          >
            Проекты
          </h1>

          <p
            className={[
              "mt-5 max-w-[620px]",
              "text-base leading-[26px]",
              "text-[var(--color-text-secondary)]",
              "md:mt-6",
              "md:text-[18px] md:leading-[29px]",
            ].join(" ")}
          >
            Задачи, в которых я соединял разработку, AI, аналитику и
            интернет-маркетинг.
          </p>
        </header>

        {projectGroups.length > 0 ? (
          <div className="mt-10 md:mt-11 lg:mt-14">
            {projectGroups.map((group, groupIndex) => {
              const headingId = `projects-group-${group.key}`;

              return (
                <section
                  key={group.key}
                  aria-labelledby={headingId}
                  className={
                    groupIndex === 0
                      ? ""
                      : ["mt-14", "md:mt-16", "lg:mt-[72px]", "xl:mt-20"].join(
                          " ",
                        )
                  }
                >
                  <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                    <h2
                      id={headingId}
                      className={[
                        "shrink-0 font-semibold",
                        "tracking-[-0.035em]",
                        "text-[var(--color-text-primary)]",
                        group.key === "undated"
                          ? [
                              "text-[27px] leading-[1.15]",
                              "sm:text-[30px]",
                              "xl:text-[34px]",
                            ].join(" ")
                          : [
                              "text-[30px] leading-none",
                              "sm:text-[32px]",
                              "xl:text-[36px]",
                            ].join(" "),
                      ].join(" ")}
                    >
                      {group.title}
                    </h2>

                    <span
                      aria-hidden="true"
                      className={[
                        "h-px min-w-0 flex-1",
                        "bg-[var(--color-line)]",
                      ].join(" ")}
                    />
                  </div>

                  <div className="mt-6 md:mt-8">
                    <ProjectGrid projects={group.projects} />
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-base leading-7 text-[var(--color-text-secondary)] md:mt-11">
            Опубликованные проекты пока не добавлены.
          </p>
        )}

        <section
          aria-labelledby="projects-contact-title"
          className={[
            "mt-14 border-t",
            "border-[var(--color-line)]",
            "pt-8",
            "sm:flex sm:items-center",
            "sm:justify-between sm:gap-8",
            "md:mt-16 md:pt-10",
            "xl:mt-20",
          ].join(" ")}
        >
          <h2
            id="projects-contact-title"
            className={[
              "max-w-[650px]",
              "text-[25px] font-semibold",
              "leading-[1.2]",
              "tracking-[-0.03em]",
              "text-[var(--color-text-primary)]",
              "md:text-[30px]",
            ].join(" ")}
          >
            Есть задача или предложение — давайте обсудим.
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
    </section>
  );
}
