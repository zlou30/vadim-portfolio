"use client";

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
} from "react";

import type { SkillModuleData } from "../../data/skills";
import styles from "./SkillsPreview.module.css";

type SkillModuleProps = {
  skill: SkillModuleData;
};

type SkillListProps = {
  skills: readonly string[];
};

const initialTransformVariables = {
  "--skill-rotate-x": "0deg",
  "--skill-rotate-y": "0deg",
} as CSSProperties;

function SkillList({ skills }: SkillListProps) {
  return (
    <ul
      aria-label="Навыки и инструменты направления"
      className="mt-5 flex min-w-0 flex-wrap gap-1.5 sm:gap-2"
    >
      {skills.map((skill) => (
        <li
          key={skill}
          className={[
            "inline-flex max-w-full items-center",
            "rounded-[9px] border border-[var(--color-line)]",
            "bg-[var(--color-background)]",
            "px-2.5 py-1.5 sm:px-3 sm:py-2",
            "text-[13px] font-medium leading-[19px]",
            "text-[var(--color-text-secondary)]",
            "sm:text-sm sm:leading-5",
            "break-words",
          ].join(" ")}
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}

export function SkillModule({ skill }: SkillModuleProps) {
  const moduleRef = useRef<HTMLElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  function resetTransform() {
    const element = moduleRef.current;

    if (!element) {
      return;
    }

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);

      animationFrameRef.current = null;
    }

    element.style.setProperty("--skill-rotate-x", "0deg");
    element.style.setProperty("--skill-rotate-y", "0deg");
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const element = moduleRef.current;

    if (!element) {
      return;
    }

    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!supportsHover || prefersReducedMotion) {
      resetTransform();
      return;
    }

    const bounds = element.getBoundingClientRect();

    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }

    const relativeX = (event.clientX - bounds.left) / bounds.width;

    const relativeY = (event.clientY - bounds.top) / bounds.height;

    const rotateY = (relativeX - 0.5) * 1.8;
    const rotateX = (0.5 - relativeY) * 1.8;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      element.style.setProperty("--skill-rotate-x", `${rotateX.toFixed(2)}deg`);

      element.style.setProperty("--skill-rotate-y", `${rotateY.toFixed(2)}deg`);

      animationFrameRef.current = null;
    });
  }

  const isFullModule = skill.size === "full";
  const isCompactModule = skill.size === "compact";

  const paddingClasses = isCompactModule
    ? ["p-5 min-[390px]:p-[22px]", "md:p-6", "min-[1000px]:p-6", "xl:p-7"].join(
        " "
      )
    : ["p-5 min-[390px]:p-[22px]", "md:p-6", "min-[1000px]:p-7", "xl:p-8"].join(
        " "
      );

  const titleClasses = isCompactModule
    ? [
        "text-[22px] leading-[1.15]",
        "min-[1000px]:text-[25px]",
        "xl:text-[26px]",
      ].join(" ")
    : [
        "text-[23px] leading-[1.15]",
        "min-[1000px]:text-[28px]",
        "xl:text-[30px]",
      ].join(" ");

  return (
    <article
      ref={moduleRef}
      style={initialTransformVariables}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTransform}
      onPointerCancel={resetTransform}
      className={[
        styles.skillModule,
        "h-full min-w-0",
        "rounded-[20px] border",
        "border-[var(--color-line)]",
        "bg-[var(--color-surface)]",
        "sm:rounded-[22px]",
        paddingClasses,
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <span
          className={[
            "text-sm font-semibold leading-5",
            "text-[var(--color-accent)]",
            "sm:text-[15px]",
          ].join(" ")}
        >
          {skill.number}
        </span>

        <span
          aria-hidden="true"
          className={[
            styles.skillMarker,
            "h-0.5 w-8 rounded-full",
            "bg-[var(--color-accent)]",
          ].join(" ")}
        />
      </div>

      {isFullModule ? (
        <div
          className={[
            "mt-5",
            "min-[1000px]:grid",
            "min-[1000px]:grid-cols-[minmax(0,0.72fr)_minmax(0,1.15fr)]",
            "min-[1000px]:gap-12",
            "xl:gap-14",
          ].join(" ")}
        >
          <div className="min-w-0">
            <h3
              className={[
                "font-semibold tracking-[-0.025em]",
                "text-[var(--color-text-primary)]",
                titleClasses,
              ].join(" ")}
            >
              {skill.title}
            </h3>

            {skill.highlight ? (
              <p
                className={[
                  "mt-4 text-[18px] font-semibold",
                  "leading-6",
                  "text-[var(--color-accent)]",
                  "sm:text-[19px]",
                  "xl:text-[21px]",
                  "xl:leading-7",
                ].join(" ")}
              >
                {skill.highlight}
              </p>
            ) : null}
          </div>

          <div className="mt-4 min-w-0 min-[1000px]:mt-0">
            <p
              className={[
                "max-w-[650px]",
                "text-[15px] leading-6",
                "text-[var(--color-text-secondary)]",
                "sm:text-base sm:leading-[25px]",
                "xl:text-[17px] xl:leading-[27px]",
              ].join(" ")}
            >
              {skill.description}
            </p>

            <SkillList skills={skill.skills} />
          </div>
        </div>
      ) : (
        <>
          <h3
            className={[
              "mt-5 font-semibold",
              "tracking-[-0.025em]",
              "text-[var(--color-text-primary)]",
              titleClasses,
            ].join(" ")}
          >
            {skill.title}
          </h3>

          <p
            className={[
              "mt-4 max-w-[650px]",
              "text-[15px] leading-6",
              "text-[var(--color-text-secondary)]",
              "sm:text-base sm:leading-[25px]",
              "xl:text-[17px] xl:leading-[27px]",
            ].join(" ")}
          >
            {skill.description}
          </p>

          <SkillList skills={skill.skills} />
        </>
      )}
    </article>
  );
}
