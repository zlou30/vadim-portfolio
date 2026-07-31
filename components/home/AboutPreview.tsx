import { aboutPhotos, aboutPrinciples } from "../../data/about";
import { Container } from "../layout/Container";
import { AboutPhotoGallery } from "./AboutPhotoGallery";

const aboutStatement =
  "Мой путь начался с программирования — сейчас я соединяю его с аналитикой и проектированием.";

const aboutParagraphs = [
  "Я получил среднее профессиональное образование по специальности «Информационные системы и программирование». С сентября 2026 года начинаю обучение в ТГУ по программе «Анализ бизнес-решений и проектирование IT-проектов».",

  "Мне важно понимать не только как реализовать решение, но и зачем оно нужно: какую задачу решает, кто будет им пользоваться и какие ограничения необходимо учитывать. Поэтому в проектах я соединяю техническое понимание, аналитику и проектирование.",

  "Могу самостоятельно разобраться в задаче и довести свою часть работы до результата. В команде — задавать вопросы, обсуждать решения, принимать обратную связь и учитывать работу других участников.",
] as const;

export function AboutPreview() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className={[
        "scroll-mt-[88px]",
        "border-y border-[#E5DED6]",
        "bg-[var(--color-surface)]",
        "pb-8 pt-8",
        "md:scroll-mt-[112px]",
        "md:pb-10 md:pt-10",
        "xl:pb-12 xl:pt-12",
      ].join(" ")}
    >
      <Container>
        <div
          className={[
            "min-w-0",
            "min-[900px]:mx-auto",
            "min-[900px]:w-full",
            "min-[900px]:max-w-[840px]",
            "xl:mx-0 xl:max-w-none",
          ].join(" ")}
        >
          <h2
            id="about-title"
            className={[
              "font-semibold tracking-[-0.035em]",
              "text-[var(--color-text-primary)]",
              "text-[32px] leading-[1.1]",
              "md:text-[38px] md:leading-[1.1]",
              "lg:text-[42px] lg:leading-[1.08]",
              "xl:text-[46px]",
            ].join(" ")}
          >
            Обо мне
          </h2>

          <div
            className={[
              "mt-10 grid items-start",
              "md:mt-12",
              "xl:mt-14",
              "xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]",
              "xl:items-center xl:gap-16",
              "2xl:gap-20",
            ].join(" ")}
          >
            <div
              className={[
                "order-1 min-w-0",
                "min-[900px]:mx-auto",
                "min-[900px]:w-full",
                "min-[900px]:max-w-[760px]",
                "xl:order-2",
                "xl:mx-0 xl:max-w-none",
              ].join(" ")}
            >
              <h3
                className={[
                  "max-w-[610px]",
                  "text-[29px] font-semibold leading-[35px]",
                  "tracking-[-0.025em]",
                  "text-[var(--color-text-primary)]",
                  "min-[390px]:text-[31px]",
                  "min-[390px]:leading-[37px]",
                  "sm:text-[33px] sm:leading-[39px]",
                  "md:text-[34px] md:leading-[40px]",
                  "lg:text-[36px] lg:leading-[42px]",
                  "min-[900px]:max-w-none",
                  "xl:max-w-[610px]",
                  "xl:text-[41px] xl:leading-[48px]",
                  "min-[1400px]:text-[44px]",
                  "min-[1400px]:leading-[51px]",
                ].join(" ")}
              >
                {aboutStatement}
              </h3>

              <div
                className={[
                  "mt-5 max-w-[600px] space-y-5",
                  "text-base leading-[25px]",
                  "text-[var(--color-text-secondary)]",
                  "md:mt-6 md:space-y-6",
                  "md:text-[17px] md:leading-7",
                  "lg:mt-[26px]",
                  "min-[900px]:max-w-none",
                  "xl:max-w-[600px]",
                  "min-[1400px]:text-[18px]",
                  "min-[1400px]:leading-[29px]",
                ].join(" ")}
              >
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div
              className={[
                "order-2 mt-9 min-w-0",
                "sm:mt-10",
                "min-[900px]:mx-auto",
                "min-[900px]:w-full",
                "min-[900px]:max-w-[580px]",
                "xl:order-1 xl:mt-0",
                "xl:mx-0 xl:max-w-none",
                "xl:self-center",
              ].join(" ")}
            >
              <AboutPhotoGallery photos={aboutPhotos} />
            </div>
          </div>

          <ol
            aria-label="Принципы работы"
            className={[
              "mt-10 grid",
              "sm:mt-12",
              "xl:mt-14",
              "xl:grid-cols-3 xl:gap-8",
              "2xl:mt-16 2xl:gap-12",
            ].join(" ")}
          >
            {aboutPrinciples.map((principle) => (
              <li
                key={principle.number}
                className={[
                  "border-t",
                  "border-[var(--color-line)]",
                  "pb-4 pt-5",
                  "last:border-b",
                  "xl:pb-0",
                  "xl:last:border-b-0",
                ].join(" ")}
              >
                <div
                  className={[
                    "grid",
                    "grid-cols-[40px_minmax(0,1fr)]",
                    "gap-x-3",
                    "xl:block",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "text-[15px] font-semibold",
                      "leading-6",
                      "text-[var(--color-accent)]",
                      "xl:text-[17px]",
                    ].join(" ")}
                  >
                    {principle.number}
                  </span>

                  <div className="min-w-0">
                    <h3
                      className={[
                        "text-[18px] font-semibold",
                        "leading-[25px]",
                        "text-[var(--color-text-primary)]",
                        "xl:mt-4",
                        "xl:text-[20px]",
                        "xl:leading-7",
                      ].join(" ")}
                    >
                      {principle.title}
                    </h3>

                    <p
                      className={[
                        "mt-2 text-[15px]",
                        "leading-[23px]",
                        "text-[var(--color-text-secondary)]",
                        "xl:text-base xl:leading-6",
                      ].join(" ")}
                    >
                      {principle.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
