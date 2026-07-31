import type { MetadataRoute } from "next";

import { getAllPublishedProjects } from "../lib/projects";

const SITE_URL = "https://www.vadimgunyakov.ru";
const SEO_UPDATED_AT = new Date("2026-07-31T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: SEO_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: SEO_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contacts`,
      lastModified: SEO_UPDATED_AT,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllPublishedProjects().map(
    (project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: SEO_UPDATED_AT,
      changeFrequency: "yearly",
      priority: 0.8,
    }),
  );

  return [...staticRoutes, ...projectRoutes];
}
