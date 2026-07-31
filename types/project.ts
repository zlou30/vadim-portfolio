export type ProjectSection = {
  title: string;
  content: string;
};

export type ProjectCoverFit = "cover" | "contain";

/**
 * Старая структура проекта пока остаётся для компонентов
 * главной страницы, которые ещё используют data/projects.ts.
 */
export type Project = {
  slug: string;
  title: string;
  direction: string;
  summary: string;
  contribution: string;
  resultLabel: string;
  result: string;
  tags: string[];
  featuredTags: string[];
  featured: boolean;
  isTemporary: boolean;
  coverNumber: string;
  cover: string | null;
  coverAlt: string;
  coverFit: ProjectCoverFit;
  sections: ProjectSection[];
};

/**
 * Единые метаданные проекта из MDX-frontmatter.
 * Используются и каталогом, и подробной страницей.
 */
export type ProjectCatalogItem = {
  title: string;
  slug: string;
  sortDate: string | null;
  period: string;
  direction: string;
  description: string;
  fact: string | null;

  role: string | null;
  task: string | null;
  tools: readonly string[];

  cover: string | null;
  coverAlt: string | null;

  tags: readonly string[];
  published: boolean;
  featured: boolean;

  /**
   * Стабильный резервный порядок для проектов,
   * у которых пока отсутствует sortDate.
   */
  order: number | null;
};

export type ProjectDocument = {
  metadata: ProjectCatalogItem;

  /**
   * Исходное MDX-содержимое без YAML-frontmatter.
   */
  content: string;
};

export type ProjectYearGroup = {
  key: string;
  title: string;
  projects: readonly ProjectCatalogItem[];
};

export type ProjectNavigation = {
  previous: ProjectCatalogItem | null;
  next: ProjectCatalogItem | null;
};
