export type AboutPhotoFit = "cover" | "contain";

type AboutPhotoBase = {
  id: string;
  number: string;
  featured: boolean;
  fit: AboutPhotoFit;
  objectPosition: string;
  caption?: string;
};

type AboutRealPhoto = AboutPhotoBase & {
  src: string;
  alt: string;
  placeholderLabel?: never;
};

type AboutPlaceholderPhoto = AboutPhotoBase & {
  src: null;
  alt?: never;
  placeholderLabel: string;
};

export type AboutPhoto = AboutRealPhoto | AboutPlaceholderPhoto;

export type AboutPrinciple = {
  number: string;
  title: string;
  description: string;
};

export const aboutContent = {
  label: "Обо мне",

  statement:
    "Мне нравится заходить в незнакомую задачу и выходить из неё с понятным планом и работающим решением.",

  body: "Я не делаю вид, что знаю всё. Сначала разбираюсь, как устроен процесс, задаю вопросы и стараюсь понять, что действительно нужно бизнесу. Затем сравниваю варианты и выбираю инструменты под задачу — разработку, AI, аналитику или маркетинг. Если для результата нужно освоить что-то новое, быстро погружаюсь, проверяю на практике и довожу работу до состояния, которым можно пользоваться.",
} as const;

export const aboutPhotos: readonly AboutPhoto[] = [
  {
    id: "portrait",
    number: "01",
    featured: true,
    src: null,
    placeholderLabel: "Портрет",
    fit: "cover",
    objectPosition: "50% 35%",
  },
  {
    id: "work-process",
    number: "02",
    featured: false,
    src: null,
    placeholderLabel: "Рабочий процесс",
    fit: "cover",
    objectPosition: "50% 50%",
  },
  {
    id: "project-event",
    number: "03",
    featured: false,
    src: null,
    placeholderLabel: "Проект или мероприятие",
    fit: "contain",
    objectPosition: "50% 50%",
  },
];

export const aboutPrinciples: readonly AboutPrinciple[] = [
  {
    number: "01",
    title: "Быстро погружаюсь в новую тему",
    description:
      "Не боюсь незнакомых задач и умею самостоятельно находить нужную информацию.",
  },
  {
    number: "02",
    title: "Смотрю на задачу глазами бизнеса",
    description:
      "Стараюсь понять не только что нужно сделать, но и какую пользу это должно принести.",
  },
  {
    number: "03",
    title: "Не обещаю лишнего — довожу до результата",
    description:
      "Честно оцениваю свои возможности и отвечаю за то, что можно показать и использовать.",
  },
];
