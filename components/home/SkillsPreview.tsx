import {
  skillModules,
  skillsIntro,
  workTools,
  type SkillModuleSize,
} from "../../data/skills";
import { Container } from "../layout/Container";
import { SkillModule } from "./SkillModule";

const gridClasses: Record<SkillModuleSize, string> = {
  wide: "min-[1000px]:col-span-7",
  compact: "min-[1000px]:col-span-5",
  full: "min-[1000px]:col-span-12",
};

function WorkToolList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
      {items.map((tool) => (
        <li
          key={tool}
          className={[
            "inline-flex max-w-full items-center",
            "rounded-[9px] border",
            "border-[var(--color-line)]",
            "bg-transparent",
            "px-2.5 py-1.5 sm:px-3 sm:py-2",
            "break-words",
            "text-[13px] font-medium leading-[19px]",
            "text-[var(--color-text-secondary)]",
            "sm:text-sm sm:leading-5",
          ].join(" ")}
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}

export function SkillsPreview() {
  return (
    <section
      aria-labelledby="skills-title"
      className={[
        "bg-[var(--color-background)]",
        "pb-16 pt-8",
        "md:pb-20 md:pt-10",
        "xl:pb-24 xl:pt-12",
      ].join(" ")}
    >
      <Container>
        <h2
          id="skills-title"
          className={[
            "font-semibold tracking-[-0.035em]",
            "text-[var(--color-text-primary)]",
            "text-[33px] leading-[39px]",
            "md:text-[37px] md:leading-[43px]",
            "min-[1000px]:text-[39px]",
            "min-[1000px]:leading-[45px]",
            "xl:text-[42px] xl:leading-[48px]",
            "min-[1400px]:text-[46px]",
            "min-[1400px]:leading-[52px]",
          ].join(" ")}
        >
          {skillsIntro.title}
        </h2>

        <ol
          aria-label="Карта компетенций"
          className={[
            "mt-8 grid grid-cols-1 gap-4",
            "md:mt-10 md:gap-5",
            "min-[1000px]:mt-12",
            "min-[1000px]:grid-cols-12",
            "min-[1000px]:gap-6",
          ].join(" ")}
        >
          {skillModules.map((skill) => (
            <li
              key={skill.number}
              className={["min-w-0", gridClasses[skill.size]].join(" ")}
            >
              <SkillModule skill={skill} />
            </li>
          ))}
        </ol>

        <section
          aria-labelledby="work-tools-title"
          className={[
            "mt-7 border-t",
            "border-[var(--color-line)]",
            "py-6",
            "md:mt-8 md:py-7",
            "min-[1000px]:mt-10",
            "min-[1000px]:grid",
            "min-[1000px]:grid-cols-[220px_minmax(0,1fr)]",
            "min-[1000px]:items-start",
            "min-[1000px]:gap-8",
          ].join(" ")}
        >
          <h3
            id="work-tools-title"
            className={[
              "text-[15px] font-semibold leading-[21px]",
              "text-[var(--color-text-primary)]",
            ].join(" ")}
          >
            {workTools.title}
          </h3>

          <div className="mt-3 min-w-0 min-[1000px]:mt-0">
            <WorkToolList items={workTools.items} />
          </div>
        </section>
      </Container>
    </section>
  );
}
