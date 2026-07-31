import type { Project } from "../types/project";

type ProjectInput = Omit<Project, "sections">;

function createProject(project: ProjectInput): Project {
  return {
    ...project,
    sections: [
      {
        title: "Описание",
        content: project.summary,
      },
      {
        title: "Вклад",
        content: project.contribution,
      },
      {
        title: project.resultLabel,
        content: project.result,
      },
    ],
  };
}

export const projects: Project[] = [
  createProject({
    slug: "telegram-service",
    title: "Telegram-сервис",
    direction: "Разработка и автоматизация",
    summary:
      "Работающий сервис с собственной логикой и базой данных, самостоятельно разработанный и запущенный на VPS.",
    contribution:
      "Отвечал за полный технический цикл: разработку на Python, подключение MySQL, настройку сервера и развёртывание проекта.",
    resultLabel: "Подтверждённый факт",
    result:
      "Сервис был доведён до рабочего состояния и запущен на удалённом сервере.",
    tags: ["Python", "aiogram", "MySQL", "Linux", "VPS"],
    featuredTags: ["Python", "aiogram", "MySQL", "VPS"],
    featured: true,
    isTemporary: false,
    coverNumber: "01",
    cover: null,
    coverAlt: "Обложка проекта Telegram-сервис",
    coverFit: "contain",
  }),

  createProject({
    slug: "3d-torg",
    title: "«3Д Торг»",
    direction: "Интернет-маркетинг и маркетплейсы",
    summary:
      "Вёл магазин автотоваров брендов Brave и Golland на Ozon и Яндекс Маркете — от подготовки товаров до продвижения карточек в поиске площадок.",
    contribution:
      "Фотографировал товары, создавал и оптимизировал карточки, анализировал конкурентов и поисковые запросы, работал с ценами и информацией поставщиков.",
    resultLabel: "Результат",
    result:
      "Пять карточек попадали в топ-10 Ozon, а товары занимали позиции в топ-5 Яндекс Маркета по целевым запросам.",
    tags: ["Ozon", "Яндекс Маркет", "SEO", "Wordstat", "Mutagen"],
    featuredTags: ["Ozon", "SEO", "Маркетплейсы"],
    featured: false,
    isTemporary: false,
    coverNumber: "02",
    cover: null,
    coverAlt: "Обложка проекта «3Д Торг»",
    coverFit: "contain",
  }),

  createProject({
    slug: "8-bit",
    title: "Компьютерный клуб «8 Бит»",
    direction: "Интернет-маркетинг и SMM",
    summary:
      "Полное ведение сообщества клуба во ВКонтакте: стратегия, публикации, визуальное оформление и активности для аудитории.",
    contribution:
      "Разрабатывал стратегию продвижения, создавал контент и участвовал в организации конкурсов, розыгрышей и фан-зоны для просмотра турнира UFC.",
    resultLabel: "Подтверждённый факт",
    result:
      "Публикации, оформление и материалы проведённых активностей сохранились в сообществе.",
    tags: ["ВКонтакте", "SMM", "Контент", "Мероприятия"],
    featuredTags: ["ВКонтакте", "SMM", "Мероприятия"],
    featured: false,
    isTemporary: false,
    coverNumber: "03",
    cover: null,
    coverAlt: "Обложка проекта компьютерного клуба «8 Бит»",
    coverFit: "contain",
  }),
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
