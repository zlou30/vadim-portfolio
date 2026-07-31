import Link from "next/link";

type ProjectBackLinkProps = {
  variant?: "plain" | "navigation";
};

export function ProjectBackLink({ variant = "plain" }: ProjectBackLinkProps) {
  const isNavigationVariant = variant === "navigation";

  return (
    <Link
      href="/projects"
      className={[
        "group/project-back inline-flex min-h-11",
        "items-center gap-2",
        "text-[15px] font-semibold leading-5",
        "text-[var(--color-text-primary)]",
        "transition-[color,transform,border-color]",
        "duration-[220ms] ease-out",
        "hover:text-[var(--color-accent-hover)]",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-[3px]",
        "focus-visible:outline-[var(--color-accent)]",
        "motion-reduce:transform-none",
        "motion-reduce:transition-colors",
        "md:text-base",
        isNavigationVariant
          ? [
              "w-full justify-start",
              "rounded-[15px] border",
              "border-[var(--color-line)]",
              "bg-transparent px-4 py-3",
              "hover:-translate-y-0.5",
              "hover:border-[var(--color-accent)]",
              "sm:w-fit sm:rounded-md",
              "sm:border-transparent",
              "sm:px-0 sm:py-0",
              "sm:hover:translate-y-0",
              "sm:hover:border-transparent",
            ].join(" ")
          : "w-fit rounded-md",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "shrink-0 text-lg leading-none",
          "transition-transform duration-[220ms]",
          "ease-out",
          "group-hover/project-back:-translate-x-[3px]",
          "motion-reduce:transform-none",
          "motion-reduce:transition-none",
        ].join(" ")}
      >
        ←
      </span>

      <span>Все проекты</span>
    </Link>
  );
}
