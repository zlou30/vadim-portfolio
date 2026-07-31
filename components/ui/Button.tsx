import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showArrow?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "border border-transparent",
    "bg-[var(--color-accent)]",
    "hover:-translate-y-px hover:bg-[var(--color-accent-hover)]",
    "active:translate-y-0 active:bg-[var(--color-accent-active)]",
  ].join(" "),

  secondary: [
    "border border-[var(--color-line)]",
    "bg-[var(--color-surface)]",
    "text-[var(--color-text-primary)]",
    "hover:bg-[var(--color-background)]",
  ].join(" "),
};

const variantStyles: Partial<Record<ButtonVariant, CSSProperties>> = {
  primary: {
    color: "#FFFFFF",
  },
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  showArrow = false,
}: ButtonProps) {
  return (
    <Link
      href={href}
      style={variantStyles[variant]}
      className={[
        "group inline-flex min-h-[52px] items-center justify-center",
        "gap-2.5 whitespace-nowrap rounded-[14px] px-6",
        "text-[15px] font-semibold leading-5",
        "transition-[background-color,border-color,color,transform]",
        "duration-200 motion-reduce:transition-none",
        "focus-visible:outline focus-visible:outline-2",
        "focus-visible:outline-offset-[3px]",
        "focus-visible:outline-[var(--color-accent)]",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      <span>{children}</span>

      {showArrow ? (
        <span
          aria-hidden="true"
          className={[
            "text-lg leading-none",
            "transition-transform duration-200",
            "group-hover:translate-x-1",
            "group-active:translate-x-0",
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          →
        </span>
      ) : null}
    </Link>
  );
}
