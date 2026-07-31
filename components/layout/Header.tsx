"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "./Container";

const navigation = [
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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="relative z-50 border-b border-[var(--color-line)] bg-[var(--color-background)]">
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            onClick={closeMenu}
            className={[
              "shrink-0 font-semibold text-[var(--color-text-primary)]",
              "text-base leading-[22px] md:text-lg md:leading-6",
              "transition-colors duration-200",
              "hover:text-[var(--color-accent)]",
              "focus-visible:rounded-sm focus-visible:outline",
              "focus-visible:outline-2 focus-visible:outline-offset-4",
              "focus-visible:outline-[var(--color-accent)]",
            ].join(" ")}
          >
            Вадим Гуняков
          </Link>

          <nav aria-label="Основная навигация" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "inline-flex min-h-11 items-center",
                      "text-[15px] font-medium leading-6",
                      "text-[var(--color-text-secondary)]",
                      "transition-colors duration-200",
                      "hover:text-[var(--color-accent)]",
                      "focus-visible:rounded-sm focus-visible:outline",
                      "focus-visible:outline-2 focus-visible:outline-offset-4",
                      "focus-visible:outline-[var(--color-accent)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setIsMenuOpen((current) => !current)}
            className={[
              "relative inline-flex h-11 w-11 shrink-0",
              "items-center justify-center rounded-xl",
              "border border-[var(--color-line)]",
              "bg-[var(--color-surface)]",
              "text-[var(--color-text-primary)]",
              "transition-colors duration-200",
              "hover:border-[var(--color-accent)]",
              "focus-visible:outline focus-visible:outline-2",
              "focus-visible:outline-offset-[3px]",
              "focus-visible:outline-[var(--color-accent)]",
              "md:hidden",
            ].join(" ")}
          >
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span
                className={[
                  "absolute left-0 top-[3px] h-[1.5px] w-5",
                  "rounded-full bg-current",
                  "transition-transform duration-200",
                  "motion-reduce:transition-none",
                  isMenuOpen ? "translate-y-[4.5px] rotate-45" : "",
                ].join(" ")}
              />

              <span
                className={[
                  "absolute bottom-[3px] left-0 h-[1.5px] w-5",
                  "rounded-full bg-current",
                  "transition-transform duration-200",
                  "motion-reduce:transition-none",
                  isMenuOpen ? "-translate-y-[4.5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </Container>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-[var(--color-line)] bg-[var(--color-surface)] md:hidden"
        >
          <Container className="py-3">
            <nav aria-label="Мобильная навигация">
              <ul className="flex flex-col">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={[
                        "flex min-h-11 items-center rounded-lg px-3",
                        "text-[15px] font-medium",
                        "text-[var(--color-text-primary)]",
                        "transition-colors duration-200",
                        "hover:bg-[var(--color-background)]",
                        "hover:text-[var(--color-accent)]",
                        "focus-visible:outline focus-visible:outline-2",
                        "focus-visible:outline-offset-[-2px]",
                        "focus-visible:outline-[var(--color-accent)]",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
