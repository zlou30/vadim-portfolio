import Link from "next/link";
import Image from "next/image";

import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className={[
        "bg-[var(--color-background)]",
        "pb-12 pt-[22px]",
        "sm:pb-14 sm:pt-10",
        "lg:pb-14 lg:pt-[52px]",
      ].join(" ")}
    >
      <Container>
        <div
          className={[
            "grid items-start",
            "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
            "lg:gap-12 xl:gap-[68px]",
          ].join(" ")}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 lg:gap-3">
              <span
                aria-hidden="true"
                className={[
                  "h-0.5 w-5 shrink-0 rounded-full",
                  "bg-[var(--color-accent)]",
                  "lg:w-7",
                ].join(" ")}
              />

              <p
                className={[
                  "text-sm font-medium leading-5",
                  "text-[var(--color-text-primary)]",
                  "lg:text-base lg:leading-6",
                ].join(" ")}
              >
                Привет, я Вадим Гуняков
              </p>
            </div>

            <h1
              id="hero-title"
              className={[
                "mt-[13px] font-semibold",
                "text-[var(--color-text-primary)]",
                "text-[clamp(2rem,9.75vw,2.6875rem)]",
                "leading-[1.03] tracking-[-0.035em]",
                "sm:text-5xl",
                "md:text-[3.5rem]",
                "lg:mt-5",
                "lg:text-[clamp(3.25rem,5vw,4.25rem)]",
                "lg:leading-[1]",
                "lg:tracking-[-0.04em]",
              ].join(" ")}
            >
              <span className="block whitespace-nowrap">Вникаю в задачу.</span>

              <span className="block whitespace-nowrap">Навожу порядок.</span>

              <span className="block whitespace-nowrap">Собираю решение.</span>
            </h1>

            <p
              className={[
                "mt-5 max-w-[610px]",
                "text-base font-normal leading-[25px]",
                "text-[var(--color-text-secondary)]",
                "lg:mt-7 lg:text-xl lg:leading-[30px]",
              ].join(" ")}
            >
              Работаю на стыке разработки, AI, аналитики и интернет-маркетинга —
              подбираю инструменты под задачу и довожу проекты до рабочего
              результата.
            </p>

            <div
              className={[
                "mt-6 flex flex-col items-start gap-2",
                "min-[350px]:flex-row",
                "min-[350px]:items-center",
                "min-[350px]:gap-5",
                "lg:mt-8 lg:gap-6",
              ].join(" ")}
            >
              <Button href="/projects" showArrow className="shrink-0">
                Смотреть проекты
              </Button>

              <Link
                href="/#about"
                className={[
                  "group inline-flex min-h-11 items-center gap-2",
                  "whitespace-nowrap rounded-sm",
                  "text-[15px] font-semibold leading-5",
                  "text-[var(--color-text-primary)]",
                  "transition-colors duration-200",
                  "hover:text-[var(--color-accent)]",
                  "focus-visible:outline focus-visible:outline-2",
                  "focus-visible:outline-offset-[3px]",
                  "focus-visible:outline-[var(--color-accent)]",
                ].join(" ")}
              >
                <span className="decoration-[var(--color-accent)] underline-offset-4 group-hover:underline">
                  Обо мне
                </span>

                <span
                  aria-hidden="true"
                  className={[
                    "text-lg leading-none",
                    "transition-transform duration-200",
                    "group-hover:translate-x-1",
                    "motion-reduce:transition-none",
                  ].join(" ")}
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          <div
            className={[
              "relative mt-6 aspect-[4/5] w-full",
              "sm:mx-auto",
              "sm:aspect-[4/5]",
              "sm:h-auto",
              "sm:max-w-[440px]",
              "lg:mx-0",
              "lg:mt-[44px]",
              "lg:aspect-[4/5]",
              "lg:h-auto",
              "lg:max-w-[470px]",
              "lg:justify-self-end",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className={[
                "absolute inset-0",
                "translate-x-2 translate-y-2",
                "rounded-[22px]",
                "bg-[var(--color-photo-backdrop)]",
                "sm:translate-x-[10px]",
                "sm:translate-y-[10px]",
                "lg:translate-x-3",
                "lg:translate-y-3",
                "lg:rounded-[24px]",
              ].join(" ")}
            />

            <div
              role="img"
              aria-label="Фотография Вадима Гунякова"
              className={[
                "relative z-10 flex h-full w-full",
                "items-center justify-center",
                "overflow-hidden rounded-[22px]",
                "border border-[var(--color-line)]",
                "bg-[var(--color-surface)]",
                "p-0 text-center",
                "sm:border-0",
                "sm:bg-transparent",
                "sm:px-0",
                "lg:rounded-[24px]",
              ].join(" ")}
            >
              <div
                className={[
                  "relative h-full w-full",
                  "overflow-hidden rounded-[20px]",
                  "bg-[#E8D2CA]",
                  "sm:h-auto sm:aspect-[4/5]",
                  "sm:rounded-[28px]",
                ].join(" ")}
              >
                <Image
                  src="/images/profile/vadim-hero.webp"
                  alt="Вадим Гуняков — специалист по разработке, аналитике и проектированию цифровых решений"
                  fill
                  priority
                  sizes={[
                    "(max-width: 639px) calc(100vw - 32px),",
                    "(max-width: 1023px) 440px,",
                    "470px",
                  ].join(" ")}
                  className={[
                    "object-cover object-top",
                    "sm:object-center",
                  ].join(" ")}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
