import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

type CaseImageProps = ResponsiveImageProps & {
  variant?: "default" | "portrait";
};

type ImagePairProps = {
  leftSrc: string;
  leftAlt: string;
  leftCaption?: string;
  rightSrc: string;
  rightAlt: string;
  rightCaption?: string;
};

type FactProps = {
  children: ReactNode;
};

type ResultProps = {
  title?: string;
  children: ReactNode;
};

type QuoteProps = {
  author?: string;
  children: ReactNode;
};

type MediaPlaceholderProps = {
  label?: string;
};

function joinClasses(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

function resolveAspectRatio(width?: number, height?: number): string {
  if (width && height && width > 0 && height > 0) {
    return `${width} / ${height}`;
  }

  return "16 / 9";
}

export function CaseImage({
  src,
  alt,
  caption,
  width,
  height,
  variant = "default",
}: CaseImageProps) {
  if (variant === "portrait") {
    return (
      <figure
        className={["mx-auto my-10 w-full max-w-full", "sm:max-w-[520px]"].join(
          " ",
        )}
      >
        <div
          className={[
            "relative aspect-[3/4] w-full",
            "overflow-hidden rounded-[16px]",
            "border-0 bg-transparent",
            "p-0 shadow-none outline-none",
            "sm:rounded-[18px]",
          ].join(" ")}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 639px) calc(100vw - 32px), 520px"
            className={[
              "block h-full w-full",
              "rounded-[inherit] border-0",
              "object-cover object-center",
            ].join(" ")}
          />
        </div>

        {caption ? (
          <figcaption
            className={[
              "mt-3 text-left",
              "text-sm leading-5",
              "text-[var(--color-text-secondary)]",
            ].join(" ")}
          >
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="my-10">
      <div
        style={{
          aspectRatio: resolveAspectRatio(width, height),
        }}
        className={[
          "relative w-full overflow-hidden",
          "rounded-[18px] border",
          "border-[var(--color-line)]",
          "bg-[var(--color-surface)]",
        ].join(" ")}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 740px, calc(100vw - 32px)"
          className="object-contain"
        />
      </div>

      {caption ? (
        <figcaption className="mt-3 text-sm leading-5 text-[var(--color-text-secondary)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function WideImage({
  src,
  alt,
  caption,
  width,
  height,
}: ResponsiveImageProps) {
  return (
    <figure
      className={[
        "relative left-1/2 my-12",
        "w-[min(calc(100vw-32px),1200px)]",
        "-translate-x-1/2",
        "sm:w-[min(calc(100vw-48px),1200px)]",
      ].join(" ")}
    >
      <div
        style={{
          aspectRatio: resolveAspectRatio(width, height),
        }}
        className={[
          "relative w-full overflow-hidden",
          "rounded-[18px] border",
          "border-[var(--color-line)]",
          "bg-[var(--color-surface)]",
          "md:rounded-[22px]",
        ].join(" ")}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={[
            "(min-width: 1280px) 1200px,",
            "(min-width: 768px) calc(100vw - 48px),",
            "calc(100vw - 32px)",
          ].join(" ")}
          className="object-contain"
        />
      </div>

      {caption ? (
        <figcaption className="mt-3 text-sm leading-5 text-[var(--color-text-secondary)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ImagePair({
  leftSrc,
  leftAlt,
  leftCaption,
  rightSrc,
  rightAlt,
  rightCaption,
}: ImagePairProps) {
  const images = [
    {
      src: leftSrc,
      alt: leftAlt,
      caption: leftCaption,
    },
    {
      src: rightSrc,
      alt: rightAlt,
      caption: rightCaption,
    },
  ];

  return (
    <div
      className={[
        "relative left-1/2 my-12",
        "grid w-[min(calc(100vw-32px),1000px)]",
        "-translate-x-1/2 gap-6",
        "min-[720px]:grid-cols-2",
        "sm:w-[min(calc(100vw-48px),1000px)]",
      ].join(" ")}
    >
      {images.map((image) => (
        <figure key={image.src} className="min-w-0">
          <div
            className={[
              "relative aspect-[4/3]",
              "w-full overflow-hidden",
              "rounded-[18px] border",
              "border-[var(--color-line)]",
              "bg-[var(--color-surface)]",
            ].join(" ")}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={[
                "(min-width: 1000px) 488px,",
                "(min-width: 720px) calc(50vw - 36px),",
                "calc(100vw - 32px)",
              ].join(" ")}
              className="object-contain"
            />
          </div>

          {image.caption ? (
            <figcaption className="mt-3 text-sm leading-5 text-[var(--color-text-secondary)]">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

export function MediaPlaceholder({
  label = "Медиа будет добавлено позже.",
}: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={[
        "my-10 flex aspect-video w-full",
        "flex-col justify-between",
        "rounded-[18px] border",
        "border-[var(--color-line)]",
        "bg-[#E9E2DA]",
        "p-5 sm:p-6",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="h-0.5 w-7 rounded-full bg-[var(--color-accent)]"
      />

      <p className="max-w-[320px] text-sm leading-5 text-[var(--color-text-secondary)]">
        {label}
      </p>
    </div>
  );
}

export function Fact({ children }: FactProps) {
  return (
    <aside
      className={[
        "my-10 border-l-2",
        "border-[var(--color-accent)]",
        "pl-5 sm:pl-6",
        "text-[18px] font-medium",
        "leading-[1.55]",
        "text-[var(--color-text-primary)]",
        "md:text-[20px]",
      ].join(" ")}
    >
      {children}
    </aside>
  );
}

export function Result({ title, children }: ResultProps) {
  return (
    <section
      className={[
        "my-10 rounded-[18px] border",
        "border-[var(--color-line)]",
        "bg-[var(--color-surface)]",
        "p-6 sm:p-7",
        "md:rounded-[20px]",
      ].join(" ")}
    >
      {title ? (
        <h3
          className={[
            "text-[22px] font-semibold",
            "leading-[1.2]",
            "tracking-[-0.025em]",
            "text-[var(--color-text-primary)]",
            "md:text-[25px]",
          ].join(" ")}
        >
          {title}
        </h3>
      ) : null}

      <div
        className={joinClasses(
          "text-base leading-[26px]",
          "text-[var(--color-text-primary)]",
          "md:text-[17px] md:leading-[28px]",
          title ? "mt-4" : undefined,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function Quote({ author, children }: QuoteProps) {
  return (
    <blockquote
      className={[
        "my-10 border-l-2",
        "border-[var(--color-line)]",
        "pl-5 sm:pl-6",
      ].join(" ")}
    >
      <div className="text-[18px] leading-[1.6] text-[var(--color-text-primary)]">
        {children}
      </div>

      {author ? (
        <footer className="mt-4 text-sm leading-5 text-[var(--color-text-secondary)]">
          {author}
        </footer>
      ) : null}
    </blockquote>
  );
}

export const caseMdxComponents: MDXComponents = {
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className={joinClasses(
        "mt-16 font-semibold",
        "text-[29px] leading-[1.15]",
        "tracking-[-0.03em]",
        "text-[var(--color-text-primary)]",
        "md:mt-20 md:text-[36px]",
        "md:leading-[1.12]",
        className,
      )}
    />
  ),

  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className={joinClasses(
        "mt-10 font-semibold",
        "text-[23px] leading-[1.2]",
        "tracking-[-0.025em]",
        "text-[var(--color-text-primary)]",
        "md:text-[26px]",
        className,
      )}
    />
  ),

  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      className={joinClasses(
        "mt-5 text-base leading-[26px]",
        "text-[var(--color-text-primary)]",
        "md:text-[18px] md:leading-[29px]",
        className,
      )}
    />
  ),

  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong
      {...props}
      className={joinClasses(
        "font-semibold",
        "text-[var(--color-text-primary)]",
        className,
      )}
    />
  ),

  em: ({ className, ...props }: ComponentPropsWithoutRef<"em">) => (
    <em {...props} className={joinClasses("italic", className)} />
  ),

  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className={joinClasses(
        "mt-5 list-disc space-y-2",
        "pl-6 text-base leading-[26px]",
        "text-[var(--color-text-primary)]",
        "marker:text-[var(--color-accent)]",
        "md:text-[18px] md:leading-[29px]",
        className,
      )}
    />
  ),

  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className={joinClasses(
        "mt-5 list-decimal space-y-2",
        "pl-6 text-base leading-[26px]",
        "text-[var(--color-text-primary)]",
        "marker:font-semibold",
        "marker:text-[var(--color-accent)]",
        "md:text-[18px] md:leading-[29px]",
        className,
      )}
    />
  ),

  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className={joinClasses("pl-1", className)} />
  ),

  a: ({ className, href, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

    return (
      <a
        {...props}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={joinClasses(
          "rounded-sm text-[var(--color-accent)]",
          "underline decoration-current/40",
          "underline-offset-4",
          "transition-colors duration-200",
          "hover:text-[var(--color-accent-hover)]",
          "focus-visible:outline",
          "focus-visible:outline-2",
          "focus-visible:outline-offset-[3px]",
          "focus-visible:outline-[var(--color-accent)]",
          "motion-reduce:transition-none",
          className,
        )}
      />
    );
  },

  blockquote: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className={joinClasses(
        "my-10 border-l-2",
        "border-[var(--color-line)]",
        "pl-5 text-[18px] leading-[1.6]",
        "text-[var(--color-text-primary)]",
        "sm:pl-6",
        className,
      )}
    />
  ),

  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div
      role="region"
      aria-label="Прокручиваемая таблица"
      tabIndex={0}
      className={[
        "my-10 max-w-full overflow-x-auto",
        "rounded-[14px] border",
        "border-[var(--color-line)]",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-[3px]",
        "focus-visible:outline-[var(--color-accent)]",
      ].join(" ")}
    >
      <table
        {...props}
        className={joinClasses(
          "w-full min-w-[640px]",
          "border-collapse text-left",
          "text-sm leading-6",
          "text-[var(--color-text-primary)]",
          className,
        )}
      />
    </div>
  ),

  thead: ({ className, ...props }: ComponentPropsWithoutRef<"thead">) => (
    <thead
      {...props}
      className={joinClasses("bg-[var(--color-surface)]", className)}
    />
  ),

  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className={joinClasses(
        "border-b border-[var(--color-line)]",
        "px-4 py-3 font-semibold",
        className,
      )}
    />
  ),

  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      className={joinClasses(
        "border-b border-[var(--color-line)]",
        "px-4 py-3 align-top",
        className,
      )}
    />
  ),

  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className={joinClasses(
        "rounded-md",
        "bg-[var(--color-surface)]",
        "px-1.5 py-0.5",
        "font-mono text-[0.9em]",
        className,
      )}
    />
  ),

  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className={joinClasses(
        "my-8 max-w-full overflow-x-auto",
        "rounded-[14px] border",
        "border-[var(--color-line)]",
        "bg-[#222220]",
        "p-5 text-sm leading-6",
        "text-[#FCFAF7]",
        "[&_code]:bg-transparent",
        "[&_code]:p-0",
        className,
      )}
    />
  ),

  CaseImage,
  WideImage,
  ImagePair,
  Fact,
  Result,
  Quote,
  MediaPlaceholder,
};
