import Image from "next/image";
import Link from "next/link";

import { contactCallout } from "../../data/contacts";
import { Container } from "../layout/Container";

type SocialIconName = "telegram" | "vk";

type SocialContactProps = {
  label: string;
  username: string | null;
  url: string | null;
  icon: SocialIconName;
};

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 shrink-0"
    >
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

function TelegramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 shrink-0"
    >
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

function VkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5 shrink-0"
    >
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

function ArrowIcon() {
  return (
    <span
      aria-hidden="true"
      className={[
        "text-lg leading-none",
        "transition-transform duration-200",
        "group-hover/contact-button:translate-x-1",
        "motion-reduce:transform-none",
        "motion-reduce:transition-none",
      ].join(" ")}
    >
      →
    </span>
  );
}

function SocialIcon({ name }: { name: SocialIconName }) {
  return name === "telegram" ? <TelegramIcon /> : <VkIcon />;
}

function SocialContact({ label, username, url, icon }: SocialContactProps) {
  const content = (
    <>
      <span
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center",
          "rounded-[10px]",
          "bg-[var(--color-background)]",
          "text-[var(--color-text-primary)]",
          "transition-colors duration-200",
          "group-hover/social:text-[var(--color-accent)]",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        <SocialIcon name={icon} />
      </span>

      <span className="min-w-0">
        <span
          className={[
            "block text-[15px] font-semibold leading-5",
            "text-[var(--color-text-primary)]",
            "transition-colors duration-200",
            "group-hover/social:text-[var(--color-accent)]",
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          {label}
        </span>

        <span
          className={[
            "mt-0.5 block break-words",
            "text-[13px] leading-5",
            "text-[var(--color-text-secondary)]",
            "transition-colors duration-200",
            "group-hover/social:text-[var(--color-accent-hover)]",
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          {username ?? "Ссылка будет добавлена"}
        </span>
      </span>
    </>
  );

  const commonClasses = [
    "flex min-h-11 min-w-0 items-center gap-3",
    "rounded-xl px-2 py-1",
  ].join(" ");

  if (!url) {
    return (
      <div
        aria-label={`${label}: ссылка будет добавлена`}
        className={commonClasses}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Открыть ${label}: ${username ?? label}`}
      className={[
        "group/social",
        commonClasses,
        "transition-colors duration-200",
        "hover:bg-[var(--color-background)]",
        "focus-visible:outline focus-visible:outline-2",
        "focus-visible:outline-offset-[3px]",
        "focus-visible:outline-[var(--color-accent)]",
        "motion-reduce:transition-none",
      ].join(" ")}
    >
      {content}
    </a>
  );
}

export function ContactCallout() {
  const { photo } = contactCallout;

  return (
    <section
      aria-labelledby="contact-callout-title"
      className={[
        "bg-[var(--color-background)]",
        "pb-16",
        "md:pb-20",
        "xl:pb-24",
      ].join(" ")}
    >
      <Container>
        <h2
          id="contact-callout-title"
          className={[
            "font-semibold tracking-[-0.035em]",
            "text-[var(--color-text-primary)]",
            "text-[33px] leading-[1.1]",
            "md:text-[37px]",
            "min-[1000px]:text-[40px]",
            "xl:text-[43px]",
            "min-[1400px]:text-[46px]",
          ].join(" ")}
        >
          {contactCallout.eyebrow}
        </h2>

        <div
          className={[
            "mt-7 grid min-w-0",
            "rounded-[22px] border",
            "border-[var(--color-line)]",
            "bg-[var(--color-surface)]",
            "p-4 sm:p-6",
            "md:mt-8",
            "min-[900px]:grid-cols-[minmax(260px,300px)_minmax(0,1fr)]",
            "min-[900px]:items-center",
            "min-[900px]:gap-10",
            "min-[900px]:p-8",
            "min-[1000px]:mt-10",
            "xl:grid-cols-[320px_minmax(0,1fr)]",
            "xl:gap-14",
            "xl:rounded-[24px]",
            "xl:p-10",
          ].join(" ")}
        >
          <div
            className={[
              "relative aspect-[4/3] w-full",
              "overflow-hidden rounded-[18px]",
              "border border-[var(--color-line)]",
              "bg-transparent",
              "sm:aspect-auto sm:h-[300px]",
              "min-[900px]:aspect-[4/5]",
              "min-[900px]:h-auto",
              "min-[900px]:rounded-[20px]",
            ].join(" ")}
          >
            {photo.src !== null ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={[
                  "(min-width: 1280px) 320px,",
                  "(min-width: 900px) 300px,",
                  "calc(100vw - 64px)",
                ].join(" ")}
                className={[
                  "origin-center scale-[1.17]",
                  "object-cover object-[center_30%]",
                  "sm:scale-[1.1]",
                ].join(" ")}
              />
            ) : (
              <Image
                src="/images/profile/vadim-contacts.webp"
                alt="Вадим Гуняков"
                fill
                sizes={[
                  "(min-width: 1280px) 320px,",
                  "(min-width: 900px) 300px,",
                  "calc(100vw - 64px)",
                ].join(" ")}
                className={[
                  "origin-center scale-[1.17]",
                  "object-cover object-[center_30%]",
                  "sm:scale-[1.1]",
                ].join(" ")}
              />
            )}
          </div>

          <div className="min-w-0 pt-7 min-[900px]:pt-0">
            <h3
              className={[
                "max-w-[700px]",
                "text-[30px] font-semibold leading-[1.12]",
                "tracking-[-0.035em]",
                "text-[var(--color-text-primary)]",
                "sm:text-[34px]",
                "min-[900px]:text-[40px]",
                "min-[900px]:leading-[1.1]",
                "xl:text-[44px]",
              ].join(" ")}
            >
              {contactCallout.title}
            </h3>

            <p
              className={[
                "mt-4 max-w-[620px]",
                "text-base leading-[25px]",
                "text-[var(--color-text-secondary)]",
                "sm:text-[17px] sm:leading-7",
              ].join(" ")}
            >
              {contactCallout.description}
            </p>

            <a
              href={contactCallout.phoneHref}
              aria-label={`Позвонить Вадиму: ${contactCallout.phoneDisplay}`}
              className={[
                "group/phone mt-6 flex min-h-[52px]",
                "w-full items-center gap-3",
                "rounded-[14px] border",
                "border-[var(--color-line)]",
                "bg-[var(--color-background)]",
                "px-4 py-3",
                "text-[18px] font-semibold leading-6",
                "text-[var(--color-text-primary)]",
                "transition-[border-color,color,transform]",
                "duration-200",
                "hover:-translate-y-px",
                "hover:border-[var(--color-accent)]",
                "hover:text-[var(--color-accent-hover)]",
                "focus-visible:outline focus-visible:outline-2",
                "focus-visible:outline-offset-[3px]",
                "focus-visible:outline-[var(--color-accent)]",
                "motion-reduce:transform-none",
                "motion-reduce:transition-none",
                "sm:w-fit sm:min-w-[270px]",
              ].join(" ")}
            >
              <PhoneIcon />

              <span>{contactCallout.phoneDisplay}</span>
            </a>

            <div
              className={[
                "mt-5 grid gap-2",
                "sm:grid-cols-2 sm:gap-4",
                "min-[900px]:max-w-[560px]",
              ].join(" ")}
            >
              <SocialContact
                label={contactCallout.telegramLabel}
                username={contactCallout.telegramUsername}
                url={contactCallout.telegramUrl}
                icon="telegram"
              />

              <SocialContact
                label={contactCallout.vkLabel}
                username={contactCallout.vkUsername}
                url={contactCallout.vkUrl}
                icon="vk"
              />
            </div>

            <Link
              href="/contacts"
              className={[
                "group/contact-button mt-6 inline-flex",
                "min-h-[50px] w-full",
                "items-center justify-center gap-2.5",
                "rounded-[14px] px-6",
                "bg-[var(--color-accent)]",
                "text-[15px] font-semibold leading-5",
                "text-white",
                "transition-colors duration-200",
                "hover:bg-[var(--color-accent-hover)]",
                "active:bg-[var(--color-accent-active)]",
                "focus-visible:outline focus-visible:outline-2",
                "focus-visible:outline-offset-[3px]",
                "focus-visible:outline-[var(--color-accent)]",
                "motion-reduce:transition-none",
                "sm:w-fit",
              ].join(" ")}
            >
              <span>Перейти к контактам</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
