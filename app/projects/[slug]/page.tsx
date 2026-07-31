import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCase } from "../../../components/projects/ProjectCase";
import {
  getProjectDocumentBySlug,
  getProjectMetadataBySlug,
  getProjectNavigation,
  getPublishedProjectSlugs,
} from "../../../lib/projects";

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

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = getProjectMetadataBySlug(slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.description,
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
