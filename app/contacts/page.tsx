import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import {
  contactMethods,
  contactResources,
  contactsPage,
  type ContactMethod,
  type ContactMethodIcon,
  type ContactResource,
  type ContactResourceIcon,
} from "../../data/contacts";

const SITE_URL = "https://www.vadimgunyakov.ru";
const SITE_NAME = "Вадим Гуняков";
const CONTACTS_URL = `${SITE_URL}/contacts`;
const CONTACTS_TITLE = "Контакты";
const CONTACTS_SOCIAL_TITLE = `${CONTACTS_TITLE} — ${SITE_NAME}`;
const CONTACTS_DESCRIPTION =
  "Контакты Вадима Гунякова, резюме и ссылки на профессиональные профили.";

export const metadata: Metadata = {
  title: CONTACTS_TITLE,
  description: CONTACTS_DESCRIPTION,

  alternates: {
    canonical: CONTACTS_URL,
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: CONTACTS_URL,
    siteName: SITE_NAME,
    title: CONTACTS_SOCIAL_TITLE,
    description: CONTACTS_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: CONTACTS_SOCIAL_TITLE,
    description: CONTACTS_DESCRIPTION,
  },
};

function TelegramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="m20.5 4.25-3.1 15.1c-.23 1.07-.85 1.33-1.72.83l-4.72-3.48-2.28 2.2c-.25.25-.46.46-.95.46l.34-4.8 8.73-7.9c.38-.34-.08-.53-.59-.19L5.42 13.26.78 11.81c-1.01-.32-1.03-1.01.21-1.5L19.15 3.3c.84-.31 1.58.2 1.35.95Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M7.2 3.5 9.4 8a1.5 1.5 0 0 1-.35 1.74l-1.4 1.22a14.2 14.2 0 0 0 5.4 5.4l1.22-1.4A1.5 1.5 0 0 1 16 14.6l4.5 2.2a1.5 1.5 0 0 1 .82 1.53v1.07a2 2 0 0 1-2 1.85C10.13 20.7 3.3 13.87 2.75 4.68a2 2 0 0 1 1.85-2h1.07A1.5 1.5 0 0 1 7.2 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect
        x="2.75"
        y="4.75"
        width="18.5"
        height="14.5"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M6.5 9c.5 3.8 2.45 6 5.65 6h.45v-2.15c1.5.15 2.62 1.2 3.08 2.15h2.07c-.6-1.42-2.18-2.6-3.17-3.05.99-.55 2.36-1.9 2.68-2.95h-1.9c-.42 1.12-1.6 2.47-2.76 2.57V9h-1.9v4.5C9.52 13.2 8.08 11.72 8 9H6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 3.5v11m0 0 4-4m-4 4-4-4M5 19.5h14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 2.75a9.25 9.25 0 0 0-2.92 18.03c.46.08.63-.2.63-.45v-1.8c-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.03-1.35-1.03-1.35-.84-.58.07-.57.07-.57.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.24-2.05-.23-4.21-1.02-4.21-4.57 0-1.01.36-1.84.95-2.48-.1-.23-.41-1.17.09-2.44 0 0 .78-.25 2.54.95A8.86 8.86 0 0 1 12 7.18a8.9 8.9 0 0 1 2.32.31c1.76-1.2 2.53-.95 2.53-.95.5 1.27.19 2.21.1 2.44.59.64.95 1.47.95 2.48 0 3.56-2.17 4.33-4.23 4.56.33.29.63.86.63 1.73v2.58c0 .25.17.54.64.45A9.25 9.25 0 0 0 12 2.75Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M14 5h5v5M19 5l-8 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M18 13.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V7.5A1.5 1.5 0 0 1 6 6h4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactIcon({ name }: { name: ContactMethodIcon }) {
  if (name === "telegram") {
    return <TelegramIcon />;
  }

  if (name === "phone") {
    return <PhoneIcon />;
  }

  return <VkIcon />;
}

function ResourceIcon({ name }: { name: ContactResourceIcon }) {
  if (name === "download") {
    return <DownloadIcon />;
  }

  if (name === "github") {
    return <GithubIcon />;
  }

  return <ExternalLinkIcon />;
}

function ContactMethodLink({
  method,
  separated,
}: {
  method: ContactMethod;
  separated: boolean;
}) {
  return (
    <li className={separated ? "border-b border-[var(--color-line)]" : ""}>
      <a
        href={method.href}
        target={method.external ? "_blank" : undefined}
        rel={method.external ? "noopener noreferrer" : undefined}
        className={[
          "group/contact-method flex min-h-11",
          "w-full min-w-0 items-center gap-4",
          "border border-transparent",
          "px-5 py-5",
          "transition-[border-color,color,transform]",
          "duration-200",
          "hover:-translate-y-px",
          "hover:border-[var(--color-accent)]",
          "focus-visible:relative focus-visible:z-10",
          "focus-visible:outline focus-visible:outline-2",
          "focus-visible:outline-offset-[-2px]",
          "focus-visible:outline-[var(--color-accent)]",
          "motion-reduce:transform-none",
          "motion-reduce:transition-none",
          "sm:px-7 sm:py-6",
        ].join(" ")}
      >
        <span
          className={[
            "flex h-11 w-11 shrink-0",
            "items-center justify-center rounded-xl",
            "bg-[var(--color-background)]",
            "text-[var(--color-text-primary)]",
            "transition-colors duration-200",
            "group-hover/contact-method:text-[var(--color-accent)]",
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          <ContactIcon name={method.icon} />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={[
              "block text-sm font-semibold leading-5",
              "text-[var(--color-text-secondary)]",
            ].join(" ")}
          >
            {method.label}
          </span>

          {method.description ? (
            <span
              className={[
                "mt-1 block text-[13px]",
                "font-medium leading-5",
                "text-[var(--color-accent)]",
              ].join(" ")}
            >
              {method.description}
            </span>
          ) : null}

          <span
            className={[
              "mt-1 block",
              method.id === "phone" ? "whitespace-nowrap" : "break-words",
              "text-[17px] font-semibold leading-6",
              "text-[var(--color-text-primary)]",
              "transition-colors duration-200",
              "group-hover/contact-method:text-[var(--color-accent-hover)]",
              "motion-reduce:transition-none",
              "sm:text-[18px]",
            ].join(" ")}
          >
            {method.value}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={[
            "shrink-0 text-xl leading-none",
            "text-[var(--color-text-secondary)]",
            "transition-[color,transform] duration-200",
            "group-hover/contact-method:translate-x-1",
            "group-hover/contact-method:text-[var(--color-accent)]",
            "motion-reduce:transform-none",
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          →
        </span>
      </a>
    </li>
  );
}

function ContactResourceItem({
  resource,
  separated,
}: {
  resource: ContactResource;
  separated: boolean;
}) {
  const content = (
    <>
      <span
        className={[
          "flex h-10 w-10 shrink-0",
          "items-center justify-center rounded-xl",
          "bg-[var(--color-background)]",
          "text-[var(--color-text-primary)]",
          resource.href
            ? [
                "transition-colors duration-200",
                "group-hover/resource:text-[var(--color-accent)]",
                "motion-reduce:transition-none",
              ].join(" ")
            : "",
        ].join(" ")}
      >
        <ResourceIcon name={resource.icon} />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={[
            "block text-[15px] font-semibold leading-5",
            resource.href
              ? "text-[var(--color-text-primary)]"
              : "text-[var(--color-text-secondary)]",
          ].join(" ")}
        >
          {resource.title}
        </span>

        <span
          className={[
            "mt-1 block text-sm leading-5",
            "text-[var(--color-text-secondary)]",
          ].join(" ")}
        >
          {resource.description}
        </span>

        {!resource.href ? (
          <span
            className={[
              "mt-1.5 block text-[13px] leading-5",
              "text-[var(--color-text-secondary)]",
            ].join(" ")}
          >
            {resource.unavailableLabel}
          </span>
        ) : null}
      </span>

      <span
        aria-hidden="true"
        className={[
          "shrink-0 text-lg leading-none",
          resource.href
            ? [
                "text-[var(--color-text-secondary)]",
                "transition-[color,transform] duration-200",
                "group-hover/resource:translate-x-1",
                "group-hover/resource:text-[var(--color-accent)]",
                "motion-reduce:transform-none",
                "motion-reduce:transition-none",
              ].join(" ")
            : "text-[var(--color-line)]",
        ].join(" ")}
      >
        →
      </span>
    </>
  );

  const separatorClasses = separated
    ? [
        "border-t border-[var(--color-line)]",
        "min-[960px]:border-l",
        "min-[960px]:border-t-0",
      ].join(" ")
    : "";

  const commonClasses = [
    "flex min-h-11 min-w-0 items-center gap-4",
    "px-5 py-5 sm:px-6",
    separatorClasses,
  ].join(" ");

  if (!resource.href) {
    return (
      <li>
        <div
          aria-disabled="true"
          className={[commonClasses, "cursor-default select-text"].join(" ")}
        >
          {content}
        </div>
      </li>
    );
  }

  const isExternal = resource.action === "external";

  return (
    <li>
      <a
        href={resource.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        download={resource.action === "download" ? true : undefined}
        className={[
          "group/resource",
          commonClasses,
          "transition-[color,background-color,transform]",
          "duration-200",
          "hover:-translate-y-px",
          "hover:bg-[var(--color-background)]",
          "focus-visible:relative focus-visible:z-10",
          "focus-visible:outline focus-visible:outline-2",
          "focus-visible:outline-offset-[-2px]",
          "focus-visible:outline-[var(--color-accent)]",
          "motion-reduce:transform-none",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        {content}
      </a>
    </li>
  );
}

export default function ContactsPage() {
  const { photo } = contactsPage;

  return (
    <section
      aria-labelledby="contacts-page-title"
      className={[
        "bg-[var(--color-background)]",
        "py-16 md:py-20 xl:py-24",
      ].join(" ")}
    >
      <Container>
        <header className="max-w-[1040px]">
          <h1
            id="contacts-page-title"
            className={[
              "text-[32px] font-semibold leading-[1.1]",
              "tracking-[-0.035em]",
              "text-[var(--color-text-primary)]",
              "sm:text-[36px]",
              "md:text-[44px]",
              "xl:text-[50px]",
              "min-[1400px]:text-[52px]",
            ].join(" ")}
          >
            {contactsPage.title}
          </h1>

          <p
            className={[
              "mt-6 max-w-[1020px]",
              "text-[36px] font-semibold leading-[1.1]",
              "tracking-[-0.035em]",
              "text-[var(--color-text-primary)]",
              "min-[390px]:text-[38px]",
              "md:text-[48px]",
              "lg:text-[54px]",
              "xl:text-[62px]",
              "min-[1400px]:text-[64px]",
            ].join(" ")}
          >
            {contactsPage.lead}
          </p>

          <p
            className={[
              "mt-5 max-w-[650px]",
              "text-base leading-[25px]",
              "text-[var(--color-text-secondary)]",
              "md:text-[17px] md:leading-7",
              "xl:text-[18px] xl:leading-[29px]",
            ].join(" ")}
          >
            {contactsPage.description}
          </p>
        </header>

        <div
          className={[
            "mt-12 grid min-w-0 gap-8",
            "md:mt-14",
            "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]",
            "md:items-center md:gap-6",
            "min-[900px]:gap-7",
            "min-[960px]:grid-cols-[minmax(360px,440px)_minmax(0,1fr)]",
            "min-[960px]:items-start",
            "min-[960px]:gap-10",
            "xl:gap-14",
          ].join(" ")}
        >
          <figure
            className={[
              "order-2 relative aspect-[4/3]",
              "max-h-[250px] w-full",
              "overflow-hidden rounded-[22px]",
              "border border-[var(--color-line)]",
              "bg-[#E9E2DA]",
              "sm:max-w-[540px]",
              "md:order-1 md:aspect-[4/5]",
              "md:max-h-none md:max-w-none",
              "xl:rounded-[24px]",
            ].join(" ")}
          >
            {photo.src !== null ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes={[
                  "(min-width: 1280px) 440px,",
                  "(min-width: 960px) 40vw,",
                  "(min-width: 768px) 38vw,",
                  "calc(100vw - 32px)",
                ].join(" ")}
                style={{
                  objectPosition: photo.objectPosition,
                }}
                className={
                  photo.fit === "cover" ? "object-cover" : "object-contain"
                }
              />
            ) : (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px]">
                <Image
                  src="/images/profile/vadim-contacts.webp"
                  alt="Вадим Гуняков"
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 45vw, 520px"
                  className="object-cover object-center"
                />
              </div>
            )}
          </figure>

          <section
            aria-label="Способы связи"
            className={[
              "order-1 min-w-0 self-start overflow-hidden",
              "rounded-[22px] border",
              "border-[var(--color-line)]",
              "bg-[var(--color-surface)]",
              "md:order-2 md:self-center",
              "min-[960px]:self-start",
              "xl:rounded-[24px]",
            ].join(" ")}
          >
            <ul>
              {contactMethods.map((method, index) => (
                <ContactMethodLink
                  key={method.id}
                  method={method}
                  separated={index < contactMethods.length - 1}
                />
              ))}
            </ul>
          </section>
        </div>

        <section
          aria-labelledby="contact-resources-title"
          className="mt-12 md:mt-14 min-[960px]:mt-16 xl:mt-20"
        >
          <h2
            id="contact-resources-title"
            className={[
              "text-[28px] font-semibold leading-[1.15]",
              "tracking-[-0.03em]",
              "text-[var(--color-text-primary)]",
              "md:text-[34px]",
              "xl:text-[38px]",
            ].join(" ")}
          >
            {contactResources.title}
          </h2>

          <div
            className={[
              "mt-6 overflow-hidden",
              "rounded-[20px] border",
              "border-[var(--color-line)]",
              "bg-[var(--color-surface)]",
              "xl:rounded-[24px]",
            ].join(" ")}
          >
            <ul className="grid min-[960px]:grid-cols-3">
              {contactResources.items.map((resource, index) => (
                <ContactResourceItem
                  key={resource.id}
                  resource={resource}
                  separated={index > 0}
                />
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="contact-topics-title"
          className={[
            "mt-12",
            "md:mt-14",
            "min-[960px]:mt-[72px]",
            "xl:mt-20",
          ].join(" ")}
        >
          <h2
            id="contact-topics-title"
            className={[
              "max-w-[700px]",
              "text-[28px] font-semibold leading-[1.15]",
              "tracking-[-0.03em]",
              "text-[var(--color-text-primary)]",
              "md:text-[34px]",
              "xl:text-[38px]",
            ].join(" ")}
          >
            {contactsPage.topicsTitle}
          </h2>

          <ul
            className={[
              "mt-8 grid gap-x-10",
              "md:grid-cols-2",
              "xl:gap-x-16",
            ].join(" ")}
          >
            {contactsPage.topics.map((topic) => (
              <li
                key={topic}
                className={[
                  "border-t border-[var(--color-line)]",
                  "py-4 text-base font-medium leading-6",
                  "text-[var(--color-text-primary)]",
                  "md:py-5 md:text-[17px]",
                ].join(" ")}
              >
                {topic}
              </li>
            ))}
          </ul>

          <div
            className={[
              "mt-7",
              "[&>a]:w-full",
              "[&>a]:justify-center",
              "md:[&>a]:w-auto",
            ].join(" ")}
          >
            <Button href={contactsPage.projectsLinkHref} variant="primary">
              {contactsPage.projectsLinkLabel}
            </Button>
          </div>
        </section>
      </Container>
    </section>
  );
}
