import Link from "next/link";

import { Container } from "./Container";

const footerNavigation = [
  {
    label: "Проекты",
    href: "/projects",
  },
  {
    label: "Обо мне",
    href: "/#about",
  },
  {
    label: "Контакты",
    href: "/contacts",
  },
] as const;

export function Footer() {
  return (
    <footer
      className={[
        "w-full",
        "border-t border-[#D8D1C9]",
        "bg-[#F1ECE6]",
        "text-[var(--color-text-primary)]",
      ].join(" ")}
    >
      <Container>
        <div
          className={[
            "py-7",
            "sm:py-8",
            "lg:flex lg:items-center",
            "lg:justify-between lg:gap-12",
            "lg:py-9",
          ].join(" ")}
        >
          <div className="min-w-0">
            <Link
              href="/"
              className={[
                "inline-flex rounded-sm",
                "text-[20px] font-semibold",
                "leading-7 tracking-[-0.025em]",
                "text-[var(--color-text-primary)]",
                "transition-colors duration-[220ms]",
                "ease-out",
                "hover:text-[var(--color-accent)]",
                "focus-visible:outline",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-[4px]",
                "focus-visible:outline-[var(--color-accent)]",
                "motion-reduce:transition-none",
                "sm:text-[21px]",
              ].join(" ")}
            >
              Вадим Гуняков
            </Link>

            <p
              className={[
                "mt-2 max-w-[440px]",
                "text-[15px] font-normal leading-6",
                "text-[var(--color-text-secondary)]",
                "sm:text-base",
              ].join(" ")}
            >
              Разработка, AI, аналитика и интернет-маркетинг
            </p>
          </div>

          <nav
            aria-label="Навигация в подвале"
            className={[
              "mt-6",
              "sm:mt-7",
              "lg:ml-auto lg:mt-0 lg:shrink-0",
            ].join(" ")}
          >
            <ul
              className={[
                "border-b border-[var(--color-line)]",
                "sm:flex sm:items-center",
                "sm:gap-7 sm:border-b-0",
                "md:gap-9",
                "lg:justify-end lg:gap-10",
              ].join(" ")}
            >
              {footerNavigation.map((item) => (
                <li
                  key={item.href}
                  className={[
                    "border-t border-[var(--color-line)]",
                    "sm:border-t-0",
                  ].join(" ")}
                >
                  <Link
                    href={item.href}
                    className={[
                      "group/footer-link",
                      "flex min-h-12 w-full",
                      "items-center rounded-sm",
                      "text-[15px] font-medium leading-5",
                      "text-[var(--color-text-primary)]",
                      "transition-colors",
                      "duration-[220ms] ease-out",
                      "hover:text-[var(--color-accent)]",
                      "focus-visible:outline",
                      "focus-visible:outline-2",
                      "focus-visible:outline-offset-[3px]",
                      "focus-visible:outline-[var(--color-accent)]",
                      "motion-reduce:transition-none",
                      "sm:min-h-11 sm:w-auto",
                      "sm:text-base",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "relative",
                        "after:absolute",
                        "after:inset-x-0",
                        "after:-bottom-1",
                        "after:h-px",
                        "after:origin-left",
                        "after:scale-x-0",
                        "after:bg-[var(--color-accent)]",
                        "after:transition-transform",
                        "after:duration-[220ms]",
                        "after:ease-out",
                        "group-hover/footer-link:after:scale-x-100",
                        "group-focus-visible/footer-link:after:scale-x-100",
                        "motion-reduce:after:transition-none",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className={[
            "flex min-w-0 flex-col",
            "items-start gap-2",
            "border-t border-[var(--color-line)]",
            "py-4",
            "min-[360px]:flex-row",
            "min-[360px]:items-center",
            "min-[360px]:justify-between",
            "min-[360px]:gap-5",
            "sm:py-5",
          ].join(" ")}
        >
          <p
            className={[
              "min-w-0",
              "text-[13px] font-normal leading-5",
              "text-[var(--color-text-secondary)]",
              "sm:text-sm",
            ].join(" ")}
          >
            © 2026 Вадим Гуняков
          </p>

          <a
            href="#"
            aria-label="Вернуться к началу страницы"
            className={[
              "group/footer-top",
              "inline-flex min-h-11 shrink-0",
              "items-center gap-2 rounded-sm",
              "text-[14px] font-medium leading-5",
              "text-[var(--color-text-primary)]",
              "transition-[color,transform]",
              "duration-[220ms] ease-out",
              "hover:-translate-y-0.5",
              "hover:text-[var(--color-accent)]",
              "focus-visible:outline",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-[3px]",
              "focus-visible:outline-[var(--color-accent)]",
              "motion-reduce:transform-none",
              "motion-reduce:transition-colors",
              "sm:text-[15px]",
            ].join(" ")}
          >
            <span>Наверх</span>

            <span
              aria-hidden="true"
              className={[
                "text-base leading-none",
                "transition-transform",
                "duration-[220ms] ease-out",
                "group-hover/footer-top:-translate-y-0.5",
                "motion-reduce:transform-none",
                "motion-reduce:transition-none",
              ].join(" ")}
            >
              ↑
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
