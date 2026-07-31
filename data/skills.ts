export type SkillModuleSize = "wide" | "compact" | "full";

export type SkillModuleData = {
  number: string;
  title: string;
  description: string;
  skills: readonly string[];
  size: SkillModuleSize;
  highlight?: string;
};

export const skillsIntro = {
  title: "Навыки",
} as const;

export const skillModules: readonly SkillModuleData[] = [
  {
    number: "01",
    title: "AI и автоматизация",
    description:
      "Анализирую и структурирую материалы, продумываю логику и упрощаю повторяющиеся рабочие процессы с помощью LLM.",
    skills: [
      "LLM",
      "ChatGPT",
      "Prompt Engineering",
      "AI Automation",
      "Анализ информации",
    ],
    size: "wide",
  },
  {
    number: "02",
    title: "Разработка",
    description:
      "Собираю Telegram-сервисы, подключаю базу данных и запускаю рабочий проект на сервере.",
    skills: ["Python", "aiogram", "MySQL", "Git", "Linux", "VPS"],
    size: "compact",
  },
  {
    number: "03",
    title: "Аналитика и проектирование",
    description:
      "Разбираю требования, рынок, конкурентов и аудиторию, превращая собранную информацию в понятную структуру и задачи.",
    skills: [
      "Анализ требований",
      "Анализ рынка",
      "Анализ конкурентов",
      "Анализ целевой аудитории",
      "Постановка задач",
      "Структурирование информации",
    ],
    size: "wide",
  },
  {
    number: "04",
    title: "Интернет-маркетинг",
    description:
      "Работаю с поисковым спросом, контентом и маркетплейсами: создаю и SEO-оптимизирую карточки товаров, анализирую конкурентов и веду магазин на площадках.",
    skills: [
      "SEO",
      "Wordstat",
      "Mutagen",
      "Маркетплейсы",
      "Карточки товаров",
      "Ведение магазина",
      "Анализ конкурентов",
      "SMM",
    ],
    size: "compact",
  },
  {
    number: "05",
    title: "Преподавание и наставничество",
    highlight: "3 года преподавания",
    description:
      "Преподавал интернет-маркетинг, объяснял материал студентам, помогал применять знания на практике и готовил студента к чемпионату профессионального мастерства „Профессионалы“.",
    skills: [
      "Преподавание",
      "Наставничество",
      "Интернет-маркетинг",
      "Подготовка к чемпионату",
    ],
    size: "full",
  },
];

export const workTools = {
  title: "Инструменты и платформы",
  items: [
    "Microsoft Excel",
    "Google Таблицы",
    "Bitrix24",
    "Adobe Photoshop",
    "Telegram API",
    "HTML",
    "CSS",
    "SQL — базовый уровень",
    "Ozon",
    "Яндекс Маркет",
  ],
} as const;
