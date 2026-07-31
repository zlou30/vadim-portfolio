export type ContactPhotoFit = "cover" | "contain";

export type ContactPhoto = {
  src: string | null;
  alt: string;
  placeholderLabel: string;
  objectPosition: string;
  fit: ContactPhotoFit;
};

export type ContactMethodIcon = "telegram" | "phone" | "vk";

export type ContactMethod = {
  id: "telegram" | "phone" | "vk";
  label: string;
  value: string;
  href: string;
  icon: ContactMethodIcon;
  external: boolean;
  description?: string;
};

export type ContactItem = {
  id: string;
  label: string;
  value: string;
  href?: string;
  isTemporary: boolean;
};

export type ContactResourceIcon = "download" | "github" | "external";

export type ContactResourceAction = "download" | "external";

export type ContactResource = {
  id: "resume" | "github" | "hh";
  title: string;
  description: string;
  href: string | null;
  icon: ContactResourceIcon;
  action: ContactResourceAction;
  unavailableLabel: string;
};

type ContactCalloutData = {
  eyebrow: string;
  title: string;
  description: string;

  phoneDisplay: string;
  phoneHref: string;

  telegramLabel: string;
  telegramUsername: string;
  telegramUrl: string;

  vkLabel: string;
  vkUsername: string;
  vkUrl: string;

  photo: ContactPhoto;
};

type ContactsPageData = {
  title: string;
  lead: string;
  description: string;
  topicsTitle: string;
  topics: readonly string[];
  projectsLinkLabel: string;
  projectsLinkHref: string;
  photo: ContactPhoto;
};

type ContactProfileLinks = {
  resumeUrl: string | null;
  githubUrl: string | null;
  hhUrl: string | null;
};

export const contactCallout: ContactCalloutData = {
  eyebrow: "Контакты",

  title: "Есть задача или идея — давайте обсудим.",

  description:
    "Быстрее всего отвечаю в Telegram. Также можно написать во ВКонтакте или позвонить.",

  phoneDisplay: "+7 961 390-41-11",
  phoneHref: "tel:+79613904111",

  telegramLabel: "Telegram",
  telegramUsername: "@VadimGunyakov",
  telegramUrl: "https://t.me/VadimGunyakov",

  vkLabel: "ВКонтакте",
  vkUsername: "vk.ru/vadimgunyakov",
  vkUrl: "https://vk.ru/vadimgunyakov",

  photo: {
    /**
     * Позже заменить на реальный файл, например:
     * /images/profile/contact/vadim-contact.webp
     */
    src: null,
    alt: "Портрет Вадима Гунякова",
    placeholderLabel: "Портрет для блока контактов",
    objectPosition: "50% 35%",
    fit: "cover",
  },
};

export const contactMethods: readonly ContactMethod[] = [
  {
    id: "telegram",
    label: contactCallout.telegramLabel,
    value: contactCallout.telegramUsername,
    href: contactCallout.telegramUrl,
    icon: "telegram",
    external: true,
    description: "Предпочтительный способ связи",
  },
  {
    id: "phone",
    label: "Телефон",
    value: contactCallout.phoneDisplay,
    href: contactCallout.phoneHref,
    icon: "phone",
    external: false,
  },
  {
    id: "vk",
    label: contactCallout.vkLabel,
    value: contactCallout.vkUsername,
    href: contactCallout.vkUrl,
    icon: "vk",
    external: true,
  },
];

/**
 * Добавить подтверждённые ссылки позднее.
 *
 * Для резюме предполагается путь к реальному файлу:
 * /documents/название-файла.pdf
 */
export const contactProfileLinks: ContactProfileLinks = {
  resumeUrl: "/documents/vadim-gunyakov-resume.pdf",
  githubUrl: null,
  hhUrl:
    "https://togliatti.hh.ru/resume/dadb8868ff10cebd6a0039ed1f336877593978",
};

export const contactResources: {
  title: string;
  items: readonly ContactResource[];
} = {
  title: "Резюме и профили",

  items: [
    {
      id: "resume",
      title: "Скачать резюме",
      description: "PDF",
      href: contactProfileLinks.resumeUrl,
      icon: "download",
      action: "download",
      unavailableLabel: "Ссылка будет добавлена",
    },
    {
      id: "github",
      title: "GitHub",
      description: "Проекты и исходный код",
      href: contactProfileLinks.githubUrl,
      icon: "github",
      action: "external",
      unavailableLabel: "Ссылка будет добавлена",
    },
    {
      id: "hh",
      title: "Резюме на HH.ru",
      description: "Открыть профиль",
      href: contactProfileLinks.hhUrl,
      icon: "external",
      action: "external",
      unavailableLabel: "Ссылка будет добавлена",
    },
  ],
};

export const contactsPage: ContactsPageData = {
  title: "Контакты",

  lead: "Расскажите о задаче — разберёмся, чем я могу помочь.",

  description:
    "Быстрее всего отвечаю в Telegram. Также можно написать во ВКонтакте или позвонить.",

  topicsTitle: "С какими вопросами можно обратиться",

  topics: [
    "Работа и сотрудничество",
    "AI и автоматизация",
    "Разработка Telegram-сервисов",
    "Аналитика и проектирование",
    "Интернет-маркетинг и маркетплейсы",
  ],

  projectsLinkLabel: "Посмотреть проекты",
  projectsLinkHref: "/projects",

  photo: {
    src: contactCallout.photo.src,
    alt: contactCallout.photo.alt,
    placeholderLabel: "Фотография Вадима",
    objectPosition: contactCallout.photo.objectPosition,
    fit: contactCallout.photo.fit,
  },
};

/**
 * Общий список для совместимости с другими частями проекта.
 */
export const contacts: ContactItem[] = [
  {
    id: "phone",
    label: "Телефон",
    value: contactCallout.phoneDisplay,
    href: contactCallout.phoneHref,
    isTemporary: false,
  },
  {
    id: "telegram",
    label: contactCallout.telegramLabel,
    value: contactCallout.telegramUsername,
    href: contactCallout.telegramUrl,
    isTemporary: false,
  },
  {
    id: "vk",
    label: contactCallout.vkLabel,
    value: contactCallout.vkUsername,
    href: contactCallout.vkUrl,
    isTemporary: false,
  },
];
