import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";

import type {
  ProjectCatalogItem,
  ProjectDocument,
  ProjectNavigation,
  ProjectYearGroup,
} from "../types/project";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content", "projects");

const PROJECT_FILE_EXTENSION = ".mdx";
const SORT_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type ParsedProjectDocument = ProjectDocument & {
  sourceFile: string;
};

function createFrontmatterError(fileName: string, message: string): Error {
  return new Error(`[content/projects/${fileName}] ${message}`);
}

function readRequiredString(
  value: unknown,
  field: string,
  fileName: string,
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw createFrontmatterError(
      fileName,
      `Поле "${field}" обязательно и должно быть непустой строкой.`,
    );
  }

  return value.trim();
}

function readOptionalString(
  value: unknown,
  field: string,
  fileName: string,
): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw createFrontmatterError(
      fileName,
      `Поле "${field}" должно быть строкой.`,
    );
  }

  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : null;
}

function readRequiredBoolean(
  value: unknown,
  field: string,
  fileName: string,
): boolean {
  if (typeof value !== "boolean") {
    throw createFrontmatterError(
      fileName,
      `Поле "${field}" обязательно и должно иметь значение true или false.`,
    );
  }

  return value;
}

function readRequiredStringArray(
  value: unknown,
  field: string,
  fileName: string,
): readonly string[] {
  if (!Array.isArray(value)) {
    throw createFrontmatterError(
      fileName,
      `Поле "${field}" обязательно и должно быть массивом строк.`,
    );
  }

  return value.map((item, index) => {
    if (typeof item !== "string" || item.trim().length === 0) {
      throw createFrontmatterError(
        fileName,
        `Элемент ${field}[${index}] должен быть непустой строкой.`,
      );
    }

    return item.trim();
  });
}

function readOptionalStringArray(
  value: unknown,
  field: string,
  fileName: string,
): readonly string[] {
  if (value === undefined || value === null) {
    return [];
  }

  return readRequiredStringArray(value, field, fileName);
}

function readOptionalOrder(value: unknown, fileName: string): number | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw createFrontmatterError(
      fileName,
      'Поле "order" должно быть положительным целым числом.',
    );
  }

  return value;
}

function normalizeSortDate(value: unknown, fileName: string): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  let normalizedDate: string;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw createFrontmatterError(
        fileName,
        'Поле "sortDate" содержит некорректную дату.',
      );
    }

    normalizedDate = value.toISOString().slice(0, 10);
  } else if (typeof value === "string") {
    normalizedDate = value.trim();
  } else {
    throw createFrontmatterError(
      fileName,
      'Поле "sortDate" должно иметь формат YYYY-MM-DD.',
    );
  }

  if (!SORT_DATE_PATTERN.test(normalizedDate)) {
    throw createFrontmatterError(
      fileName,
      'Поле "sortDate" должно иметь формат YYYY-MM-DD.',
    );
  }

  const parsedDate = new Date(`${normalizedDate}T00:00:00.000Z`);

  const dateIsValid =
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === normalizedDate;

  if (!dateIsValid) {
    throw createFrontmatterError(
      fileName,
      `Дата "${normalizedDate}" не существует.`,
    );
  }

  return normalizedDate;
}

function parseProjectFile(fileName: string): ParsedProjectDocument {
  const filePath = path.join(PROJECTS_DIRECTORY, fileName);

  const source = readFileSync(filePath, "utf8");
  const parsedFile = matter(source);

  const data = parsedFile.data as Record<string, unknown>;

  const slug = readRequiredString(data.slug, "slug", fileName);

  if (!SLUG_PATTERN.test(slug)) {
    throw createFrontmatterError(
      fileName,
      `Slug "${slug}" должен содержать только строчные латинские буквы, цифры и дефисы.`,
    );
  }

  return {
    sourceFile: fileName,

    metadata: {
      title: readRequiredString(data.title, "title", fileName),

      slug,

      sortDate: normalizeSortDate(data.sortDate, fileName),

      period: readRequiredString(data.period, "period", fileName),

      direction: readRequiredString(data.direction, "direction", fileName),

      description: readRequiredString(
        data.description,
        "description",
        fileName,
      ),

      fact: readOptionalString(data.fact, "fact", fileName),

      role: readOptionalString(data.role, "role", fileName),

      task: readOptionalString(data.task, "task", fileName),

      tools: readOptionalStringArray(data.tools, "tools", fileName),

      cover: readOptionalString(data.cover, "cover", fileName),

      coverAlt: readOptionalString(data.coverAlt, "coverAlt", fileName),

      tags: readRequiredStringArray(data.tags, "tags", fileName),

      published: readRequiredBoolean(data.published, "published", fileName),

      featured: readRequiredBoolean(data.featured, "featured", fileName),

      order: readOptionalOrder(data.order, fileName),
    },

    content: parsedFile.content.trim(),
  };
}

function assertUniqueSlugs(documents: readonly ParsedProjectDocument[]): void {
  const slugSources = new Map<string, string>();

  for (const document of documents) {
    const { slug } = document.metadata;
    const existingSource = slugSources.get(slug);

    if (existingSource) {
      throw new Error(
        [
          `Обнаружен повторяющийся slug "${slug}".`,
          `Файлы: content/projects/${existingSource}`,
          `и content/projects/${document.sourceFile}.`,
        ].join(" "),
      );
    }

    slugSources.set(slug, document.sourceFile);
  }
}

/**
 * Все публичные функции ниже используют один загрузчик.
 * Благодаря cache повторные обращения во время одного
 * серверного рендера не перечитывают каталог заново.
 */
const readAllProjectDocuments = cache((): readonly ParsedProjectDocument[] => {
  if (!existsSync(PROJECTS_DIRECTORY)) {
    throw new Error(`Каталог проектов не найден: ${PROJECTS_DIRECTORY}`);
  }

  const projectFiles = readdirSync(PROJECTS_DIRECTORY, {
    withFileTypes: true,
  })
    .filter(
      (entry) => entry.isFile() && entry.name.endsWith(PROJECT_FILE_EXTENSION),
    )
    .map((entry) => entry.name)
    .sort((firstFile, secondFile) =>
      firstFile.localeCompare(secondFile, "ru", {
        numeric: true,
        sensitivity: "base",
      }),
    );

  const documents = projectFiles.map(parseProjectFile);

  assertUniqueSlugs(documents);

  return documents;
});

function compareOrder(
  firstProject: ProjectCatalogItem,
  secondProject: ProjectCatalogItem,
): number {
  const firstOrder = firstProject.order ?? Number.MAX_SAFE_INTEGER;

  const secondOrder = secondProject.order ?? Number.MAX_SAFE_INTEGER;

  if (firstOrder !== secondOrder) {
    return firstOrder - secondOrder;
  }

  return firstProject.title.localeCompare(secondProject.title, "ru", {
    numeric: true,
    sensitivity: "base",
  });
}

function compareProjects(
  firstProject: ProjectCatalogItem,
  secondProject: ProjectCatalogItem,
): number {
  if (firstProject.sortDate && secondProject.sortDate) {
    const dateComparison = secondProject.sortDate.localeCompare(
      firstProject.sortDate,
    );

    return dateComparison !== 0
      ? dateComparison
      : compareOrder(firstProject, secondProject);
  }

  if (firstProject.sortDate) {
    return -1;
  }

  if (secondProject.sortDate) {
    return 1;
  }

  return compareOrder(firstProject, secondProject);
}

export function getAllPublishedProjects(): ProjectCatalogItem[] {
  return readAllProjectDocuments()
    .filter((document) => document.metadata.published)
    .map((document) => document.metadata)
    .sort(compareProjects);
}

export function getProjectMetadataBySlug(
  slug: string,
): ProjectCatalogItem | undefined {
  return readAllProjectDocuments().find(
    (document) =>
      document.metadata.slug === slug && document.metadata.published,
  )?.metadata;
}

export function getProjectDocumentBySlug(
  slug: string,
): ProjectDocument | undefined {
  const document = readAllProjectDocuments().find(
    (item) => item.metadata.slug === slug && item.metadata.published,
  );

  if (!document) {
    return undefined;
  }

  return {
    metadata: document.metadata,
    content: document.content,
  };
}

export function getPublishedProjectSlugs(): string[] {
  return getAllPublishedProjects().map((project) => project.slug);
}

export function getProjectNavigation(slug: string): ProjectNavigation {
  const projects = getAllPublishedProjects();

  const projectIndex = projects.findIndex((project) => project.slug === slug);

  if (projectIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: projectIndex > 0 ? projects[projectIndex - 1] : null,

    next:
      projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null,
  };
}

export function groupProjectsByYear(
  projects: readonly ProjectCatalogItem[],
): ProjectYearGroup[] {
  const datedGroups = new Map<number, ProjectCatalogItem[]>();

  const projectsWithoutDate: ProjectCatalogItem[] = [];

  for (const project of projects) {
    if (!project.sortDate) {
      projectsWithoutDate.push(project);
      continue;
    }

    const year = Number(project.sortDate.slice(0, 4));

    const currentGroup = datedGroups.get(year) ?? [];

    currentGroup.push(project);
    datedGroups.set(year, currentGroup);
  }

  const groups: ProjectYearGroup[] = Array.from(datedGroups.entries())
    .sort(([firstYear], [secondYear]) => secondYear - firstYear)
    .map(([year, yearProjects]) => ({
      key: String(year),
      title: String(year),
      projects: yearProjects.sort(compareProjects),
    }));

  if (projectsWithoutDate.length > 0) {
    groups.push({
      key: "undated",
      title: "Период уточняется",
      projects: projectsWithoutDate.sort(compareProjects),
    });
  }

  return groups;
}
