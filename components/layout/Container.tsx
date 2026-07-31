import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-[1240px]",
        "px-4 md:px-8 xl:px-12 min-[1400px]:px-0",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
