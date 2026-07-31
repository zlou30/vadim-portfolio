import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCase } from "../../../components/projects/ProjectCase";
import {
  getProjectDocumentBySlug,
  getProjectMetadataBySlug,
  getProjectNavigation,
  getPublishedProjectSlugs,
} from "../../../lib/projects";

const SITE_URL = "https://www.vadimgunyakov.ru";
const SITE_NAME = "Вадим Гуняков";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedProjectSlugs().map((slug) => ({
    slug,
  }));
}

function getAbsoluteUrl(pathname: string): string {
  return new URL(pathname, `${SITE_URL}/`).toString();
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = getProjectMetadataBySlug(slug);

  if (!project) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;
  const socialTitle = `${project.title} — ${SITE_NAME}`;

  const socialImage = project.cover
    ? {
        url: getAbsoluteUrl(project.cover),
        alt: project.coverAlt ?? `Обложка проекта «${project.title}»`,
      }
    : null;

  return {
    title: project.title,
    description: project.description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "article",
      locale: "ru_RU",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: socialTitle,
      description: project.description,
      ...(socialImage
        ? {
            images: [socialImage],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: project.description,
      ...(socialImage
        ? {
            images: [socialImage.url],
          }
        : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = getProjectDocumentBySlug(slug);

  if (!project) {
    notFound();
  }

  const navigation = getProjectNavigation(slug);

  return <ProjectCase project={project} nextProject={navigation.next} />;
}
