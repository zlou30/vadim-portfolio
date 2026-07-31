"use client";

import Image from "next/image";
import {
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import aboutEventPhoto from "../../public/images/profile/vadim-about-event.webp";
import aboutWorkPhoto from "../../public/images/profile/vadim-about-work.webp";
import type { AboutPhoto } from "../../data/about";

type AboutPhotoGalleryProps = {
  photos: readonly AboutPhoto[];
};

type PhotoFrameProps = {
  photo: AboutPhoto;
  imageSizes: string;
  main?: boolean;
  onOpen?: () => void;
};

type SwipeStart = {
  x: number;
  y: number;
};

type NavigationDirection = -1 | 0 | 1;

const LIGHTBOX_TRANSITION_DURATION = 200;
const PHOTO_SWITCH_DURATION = 110;
const SWIPE_THRESHOLD = 50;

function getPhotoNumber(photo: AboutPhoto): string {
  return String(photo.number).padStart(2, "0");
}

function isLightboxPhoto(photo: AboutPhoto): boolean {
  const number = getPhotoNumber(photo);

  return number === "02" || number === "03";
}

function getPhotoSource(photo: AboutPhoto): string | null {
  const number = getPhotoNumber(photo);

  if (number === "02") {
    return "/images/profile/vadim-about-work.webp";
  }

  if (number === "03") {
    return "/images/profile/vadim-about-event.webp";
  }

  return photo.src;
}

function getLightboxPhotoSource(photo: AboutPhoto) {
  const number = getPhotoNumber(photo);

  if (number === "02") {
    return aboutWorkPhoto;
  }

  if (number === "03") {
    return aboutEventPhoto;
  }

  return null;
}

function getPhotoAlt(photo: AboutPhoto): string {
  const number = getPhotoNumber(photo);

  if (number === "02") {
    return "Вадим Гуняков во время рабочего процесса";
  }

  if (number === "03") {
    return "Вадим Гуняков на профессиональном мероприятии";
  }

  return photo.alt ?? photo.placeholderLabel ?? "Фотография Вадима Гунякова";
}

function getPhotoLabel(photo: AboutPhoto): string {
  const number = getPhotoNumber(photo);

  if (number === "02") {
    return "Рабочий процесс";
  }

  if (number === "03") {
    return "Мероприятие";
  }

  return photo.placeholderLabel ?? "Фотография";
}

function getPhotoObjectPosition(photo: AboutPhoto): string | undefined {
  const number = getPhotoNumber(photo);

  if (number === "02") {
    return "center 36%";
  }

  if (number === "03") {
    return "center 32%";
  }

  return photo.objectPosition;
}

function hasEditorialOverlay(photo: AboutPhoto): boolean {
  const number = getPhotoNumber(photo);

  return number === "02" || number === "03";
}

function PhotoFrame({
  photo,
  imageSizes,
  main = false,
  onOpen,
}: PhotoFrameProps) {
  const source = getPhotoSource(photo);
  const alt = getPhotoAlt(photo);
  const label = getPhotoLabel(photo);
  const objectPosition = getPhotoObjectPosition(photo);
  const showEditorialOverlay = hasEditorialOverlay(photo);

  return (
    <figure
      className={[
        "group/photo relative h-full min-h-0 w-full",
        "overflow-hidden border border-[var(--color-line)]",
        "bg-[#E9E2DA]",
        "transition-colors duration-[240ms] ease-out",
        "[@media(hover:hover)]:hover:border-[var(--color-accent)]",
        "motion-reduce:transition-colors",
        main ? "rounded-[20px] sm:rounded-[24px]" : "rounded-[20px]",
      ].join(" ")}
    >
      {source !== null ? (
        <>
          <Image
            src={source}
            alt={alt}
            fill
            sizes={imageSizes}
            style={{ objectPosition }}
            className={[
              showEditorialOverlay || photo.fit === "cover"
                ? "object-cover"
                : "object-contain",
              "transition-[transform,filter] duration-[240ms] ease-out",
              "[@media(hover:hover)]:group-hover/photo:scale-[1.025]",
              "[@media(hover:hover)]:group-hover/photo:contrast-[1.025]",
              "motion-reduce:transform-none",
              "motion-reduce:transition-none",
            ].join(" ")}
          />

          {showEditorialOverlay ? (
            <>
              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute",
                  "inset-x-0 top-0 h-[34%]",
                  "bg-gradient-to-b",
                  "from-black/30 to-transparent",
                ].join(" ")}
              />

              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute",
                  "inset-x-0 bottom-0 h-[58%]",
                  "bg-gradient-to-t",
                  "from-black/55 via-black/20",
                  "to-transparent",
                  "opacity-90",
                  "transition-opacity",
                  "duration-[240ms] ease-out",
                  "[@media(hover:hover)]:group-hover/photo:opacity-100",
                  "motion-reduce:transition-none",
                ].join(" ")}
              />

              <div
                className={[
                  "pointer-events-none absolute",
                  "inset-x-0 top-0",
                  "flex items-center",
                  "justify-between gap-3",
                  "p-4 sm:p-3",
                  "min-[1200px]:p-4",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "h-0.5 w-6 shrink-0",
                    "rounded-full",
                    "bg-[var(--color-accent)]",
                    "sm:w-5",
                    "min-[1200px]:w-6",
                  ].join(" ")}
                />

                <span
                  className={[
                    "text-xs font-semibold",
                    "leading-4 text-white",
                    "sm:text-[11px]",
                    "min-[1200px]:text-xs",
                  ].join(" ")}
                >
                  {photo.number}
                </span>
              </div>

              <figcaption
                className={[
                  "pointer-events-none absolute",
                  "inset-x-0 bottom-0 p-4",
                  "text-sm font-medium",
                  "leading-5 text-white",
                  "sm:p-3",
                  "sm:text-[12px]",
                  "sm:leading-4",
                  "min-[960px]:text-[11px]",
                  "min-[960px]:leading-[15px]",
                  "min-[1200px]:p-4",
                  "min-[1200px]:text-xs",
                  "min-[1200px]:leading-4",
                  "min-[1400px]:text-[13px]",
                  "min-[1400px]:leading-[17px]",
                ].join(" ")}
              >
                {label}
              </figcaption>
            </>
          ) : photo.caption ? (
            <figcaption
              className={[
                "pointer-events-none absolute",
                "bottom-3 left-3 right-3",
                "w-fit",
                "max-w-[calc(100%-24px)]",
                "rounded-lg",
                "bg-[var(--color-surface)]",
                "px-3 py-2",
                "text-xs leading-4",
                "text-[var(--color-text-secondary)]",
              ].join(" ")}
            >
              {photo.caption}
            </figcaption>
          ) : null}

          {onOpen ? (
            <button
              type="button"
              aria-label={`Открыть фотографию: ${label}`}
              onClick={onOpen}
              className={[
                "absolute inset-0 z-20",
                "cursor-pointer",
                "rounded-[inherit]",
                "focus-visible:outline",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-[-4px]",
                "focus-visible:outline-[var(--color-accent)]",
              ].join(" ")}
            />
          ) : null}
        </>
      ) : (
        <div
          role="img"
          aria-label={`Временная заглушка фотографии: ${label}`}
          className={[
            "flex h-full w-full",
            "flex-col justify-between",
            "p-5 sm:p-6",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-4">
            <span
              aria-hidden="true"
              className={[
                "h-0.5 w-6 rounded-full",
                "bg-[var(--color-accent)]",
              ].join(" ")}
            />

            <span
              className={[
                "text-sm font-semibold",
                "text-[var(--color-accent)]",
              ].join(" ")}
            >
              {photo.number}
            </span>
          </div>

          <p
            className={[
              "max-w-[180px]",
              "text-sm font-medium",
              "leading-5",
              "text-[var(--color-text-secondary)]",
            ].join(" ")}
          >
            {label}
          </p>
        </div>
      )}
    </figure>
  );
}

export function AboutPhotoGallery({ photos }: AboutPhotoGalleryProps) {
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  const lightboxRef = useRef<HTMLDivElement>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const previousFocusRef = useRef<HTMLElement | null>(null);

  const pointerStartRef = useRef<SwipeStart | null>(null);

  const openingFrameRef = useRef<number | null>(null);

  const photoFrameRef = useRef<number | null>(null);

  const switchTimerRef = useRef<number | null>(null);

  const closeTimerRef = useRef<number | null>(null);

  const isLightboxVisibleRef = useRef(false);

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  const [isPhotoVisible, setIsPhotoVisible] = useState(false);

  const [navigationDirection, setNavigationDirection] =
    useState<NavigationDirection>(0);

  const lightboxPhotos = photos.filter(isLightboxPhoto);

  const lightboxPhotoCount = lightboxPhotos.length;

  const activePhoto =
    activePhotoIndex === null
      ? null
      : (lightboxPhotos[activePhotoIndex] ?? null);

  const activePhotoSource =
    activePhoto === null ? null : getLightboxPhotoSource(activePhoto);

  const isLightboxMounted =
    activePhotoIndex !== null &&
    activePhoto !== null &&
    activePhotoSource !== null;

  isLightboxVisibleRef.current = isLightboxVisible;

  const closeLightbox = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }

    if (switchTimerRef.current !== null) {
      window.clearTimeout(switchTimerRef.current);

      switchTimerRef.current = null;
    }

    if (photoFrameRef.current !== null) {
      window.cancelAnimationFrame(photoFrameRef.current);

      photoFrameRef.current = null;
    }

    setIsLightboxVisible(false);
    setIsPhotoVisible(false);

    closeTimerRef.current = window.setTimeout(() => {
      setActivePhotoIndex(null);
      setNavigationDirection(0);

      closeTimerRef.current = null;
    }, LIGHTBOX_TRANSITION_DURATION);
  }, []);

  const changePhoto = useCallback(
    (direction: -1 | 1) => {
      if (lightboxPhotoCount < 2 || !isLightboxVisibleRef.current) {
        return;
      }

      if (switchTimerRef.current !== null) {
        window.clearTimeout(switchTimerRef.current);
      }

      if (photoFrameRef.current !== null) {
        window.cancelAnimationFrame(photoFrameRef.current);

        photoFrameRef.current = null;
      }

      setNavigationDirection(direction);
      setIsPhotoVisible(false);

      switchTimerRef.current = window.setTimeout(() => {
        setActivePhotoIndex((currentIndex) => {
          if (currentIndex === null) {
            return null;
          }

          return (
            (currentIndex + direction + lightboxPhotoCount) % lightboxPhotoCount
          );
        });

        photoFrameRef.current = window.requestAnimationFrame(() => {
          setIsPhotoVisible(true);

          photoFrameRef.current = null;
        });

        switchTimerRef.current = null;
      }, PHOTO_SWITCH_DURATION);
    },
    [lightboxPhotoCount],
  );

  useEffect(() => {
    if (!isLightboxMounted) {
      return;
    }

    const body = document.body;

    const previousOverflow = body.style.overflow;

    const previousPaddingRight = body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    function handleDocumentKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        changePhoto(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        changePhoto(1);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const lightbox = lightboxRef.current;

      if (!lightbox) {
        return;
      }

      const focusableElements = Array.from(
        lightbox.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        lightbox.focus();
        return;
      }

      const firstElement = focusableElements[0];

      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      window.clearTimeout(focusTimer);

      body.style.overflow = previousOverflow;

      body.style.paddingRight = previousPaddingRight;

      document.removeEventListener("keydown", handleDocumentKeyDown);

      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [changePhoto, closeLightbox, isLightboxMounted]);

  useEffect(() => {
    return () => {
      if (openingFrameRef.current !== null) {
        window.cancelAnimationFrame(openingFrameRef.current);
      }

      if (photoFrameRef.current !== null) {
        window.cancelAnimationFrame(photoFrameRef.current);
      }

      if (switchTimerRef.current !== null) {
        window.clearTimeout(switchTimerRef.current);
      }

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  if (photos.length === 0) {
    return null;
  }

  const mainPhoto = photos.find((photo) => photo.featured) ?? photos[0];

  const secondaryPhotos = photos
    .filter((photo) => photo.id !== mainPhoto.id)
    .slice(0, 2);

  function openPhoto(photoId: AboutPhoto["id"]) {
    const photoIndex = lightboxPhotos.findIndex(
      (photo) => photo.id === photoId,
    );

    if (photoIndex < 0) {
      return;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);

      closeTimerRef.current = null;
    }

    if (openingFrameRef.current !== null) {
      window.cancelAnimationFrame(openingFrameRef.current);
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setNavigationDirection(0);
    setIsLightboxVisible(false);
    setIsPhotoVisible(false);
    setActivePhotoIndex(photoIndex);

    openingFrameRef.current = window.requestAnimationFrame(() => {
      openingFrameRef.current = window.requestAnimationFrame(() => {
        setIsLightboxVisible(true);
        setIsPhotoVisible(true);

        openingFrameRef.current = null;
      });
    });
  }

  function handleGalleryKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const gallery = mobileGalleryRef.current;

    if (!gallery || gallery.scrollWidth <= gallery.clientWidth) {
      return;
    }

    const behavior: ScrollBehavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? "auto"
      : "smooth";

    const scrollStep = Math.min(gallery.clientWidth * 0.84, 330);

    if (event.key === "ArrowRight") {
      event.preventDefault();

      gallery.scrollBy({
        left: scrollStep,
        behavior,
      });
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      gallery.scrollBy({
        left: -scrollStep,
        behavior,
      });
    }

    if (event.key === "Home") {
      event.preventDefault();

      gallery.scrollTo({
        left: 0,
        behavior,
      });
    }

    if (event.key === "End") {
      event.preventDefault();

      gallery.scrollTo({
        left: gallery.scrollWidth,
        behavior,
      });
    }
  }

  function handleLightboxPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") {
      return;
    }

    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleLightboxPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const pointerStart = pointerStartRef.current;

    pointerStartRef.current = null;

    if (
      !pointerStart ||
      (event.pointerType !== "touch" && event.pointerType !== "pen")
    ) {
      return;
    }

    const horizontalDistance = event.clientX - pointerStart.x;

    const verticalDistance = event.clientY - pointerStart.y;

    const isHorizontalSwipe =
      Math.abs(horizontalDistance) >= SWIPE_THRESHOLD &&
      Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.2;

    if (!isHorizontalSwipe) {
      return;
    }

    changePhoto(horizontalDistance > 0 ? -1 : 1);
  }

  function handleLightboxPointerCancel() {
    pointerStartRef.current = null;
  }

  const hiddenPhotoClasses =
    navigationDirection === 1
      ? "translate-x-2 opacity-0"
      : navigationDirection === -1
        ? "-translate-x-2 opacity-0"
        : "scale-[0.985] opacity-0";

  return (
    <>
      <p id="about-photos-instructions" className="sr-only">
        Горизонтальную ленту можно прокручивать свайпом или клавишами со
        стрелками. Фотографии рабочего процесса и мероприятия можно открыть в
        полноэкранном режиме.
      </p>

      <div
        ref={mobileGalleryRef}
        role="region"
        aria-label="Фотографии Вадима"
        aria-describedby="about-photos-instructions"
        tabIndex={0}
        onKeyDown={handleGalleryKeyDown}
        className={[
          "max-w-full overflow-x-auto",
          "overscroll-x-contain pb-2",
          "snap-x snap-mandatory",
          "scroll-smooth",
          "focus-visible:rounded-[20px]",
          "focus-visible:outline",
          "focus-visible:outline-2",
          "focus-visible:outline-offset-[3px]",
          "focus-visible:outline-[var(--color-accent)]",
          "motion-reduce:scroll-auto",
          "sm:hidden",
        ].join(" ")}
      >
        <ul className="flex w-max gap-3 pr-4">
          {photos.map((photo) => (
            <li
              key={photo.id}
              className={[
                "w-[76vw]",
                "min-w-[270px]",
                "max-w-[332px]",
                "shrink-0 snap-start",
              ].join(" ")}
            >
              <div className="aspect-[4/5]">
                <PhotoFrame
                  photo={photo}
                  main={photo.featured}
                  imageSizes="76vw"
                  onOpen={
                    isLightboxPhoto(photo)
                      ? () => openPhoto(photo.id)
                      : undefined
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {photos.length === 1 ? (
        <ul
          aria-label="Фотографии Вадима"
          className={[
            "hidden sm:block",
            "max-w-[330px]",
            "min-[960px]:max-w-[230px]",
            "min-[1200px]:max-w-[300px]",
            "min-[1400px]:max-w-[330px]",
          ].join(" ")}
        >
          <li className="aspect-[3/4]">
            <PhotoFrame
              photo={mainPhoto}
              main
              imageSizes="(min-width: 1400px) 330px, (min-width: 1200px) 300px, (min-width: 960px) 230px, 330px"
            />
          </li>
        </ul>
      ) : null}

      {photos.length === 2 ? (
        <ul
          aria-label="Фотографии Вадима"
          className={[
            "hidden items-center sm:grid",
            "max-w-[500px]",
            "grid-cols-[330px_146px]",
            "gap-6",
            "min-[960px]:max-w-[350px]",
            "min-[960px]:grid-cols-[230px_100px]",
            "min-[960px]:gap-5",
            "min-[1200px]:max-w-[456px]",
            "min-[1200px]:grid-cols-[300px_134px]",
            "min-[1200px]:gap-[22px]",
            "min-[1400px]:max-w-[502px]",
            "min-[1400px]:grid-cols-[330px_148px]",
            "min-[1400px]:gap-6",
          ].join(" ")}
        >
          <li className="aspect-[3/4]">
            <PhotoFrame
              photo={mainPhoto}
              main
              imageSizes="(min-width: 1400px) 330px, (min-width: 1200px) 300px, (min-width: 960px) 230px, 330px"
            />
          </li>

          <li className="aspect-[4/5]">
            <PhotoFrame
              photo={secondaryPhotos[0]}
              imageSizes="(min-width: 1400px) 148px, (min-width: 1200px) 134px, (min-width: 960px) 100px, 146px"
              onOpen={
                isLightboxPhoto(secondaryPhotos[0])
                  ? () => openPhoto(secondaryPhotos[0].id)
                  : undefined
              }
            />
          </li>
        </ul>
      ) : null}

      {photos.length >= 3 ? (
        <ul
          aria-label="Фотографии Вадима"
          className={[
            "hidden sm:grid",
            "max-w-[500px]",
            "grid-cols-[330px_146px]",
            "grid-rows-[176px_240px]",
            "gap-x-6 gap-y-6",
            "min-[960px]:max-w-[350px]",
            "min-[960px]:grid-cols-[230px_100px]",
            "min-[960px]:grid-rows-[126px_174px]",
            "min-[960px]:gap-x-5",
            "min-[960px]:gap-y-5",
            "min-[1200px]:max-w-[456px]",
            "min-[1200px]:grid-cols-[300px_134px]",
            "min-[1200px]:grid-rows-[158px_220px]",
            "min-[1200px]:gap-[22px]",
            "min-[1400px]:max-w-[502px]",
            "min-[1400px]:grid-cols-[330px_148px]",
            "min-[1400px]:grid-rows-[176px_240px]",
            "min-[1400px]:gap-6",
          ].join(" ")}
        >
          <li className="row-span-2 min-h-0">
            <PhotoFrame
              photo={mainPhoto}
              main
              imageSizes="(min-width: 1400px) 330px, (min-width: 1200px) 300px, (min-width: 960px) 230px, 330px"
            />
          </li>

          {secondaryPhotos.map((photo) => (
            <li key={photo.id} className="min-h-0">
              <PhotoFrame
                photo={photo}
                imageSizes="(min-width: 1400px) 148px, (min-width: 1200px) 134px, (min-width: 960px) 100px, 146px"
                onOpen={
                  isLightboxPhoto(photo) ? () => openPhoto(photo.id) : undefined
                }
              />
            </li>
          ))}
        </ul>
      ) : null}

      {isLightboxMounted &&
      activePhoto &&
      activePhotoSource &&
      activePhotoIndex !== null ? (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Просмотр фотографии: ${getPhotoLabel(activePhoto)}`}
          tabIndex={-1}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
          className={[
            "fixed inset-0 z-[100]",
            "flex items-center",
            "justify-center",
            "overflow-hidden",
            "px-3 py-6",
            "sm:px-20 sm:py-8",
            "bg-[rgba(34,34,32,0.2)]",
            "backdrop-blur-[5px]",
            "transition-opacity",
            "duration-200 ease-out",
            isLightboxVisible
              ? ["pointer-events-auto", "opacity-100"].join(" ")
              : ["pointer-events-none", "opacity-0"].join(" "),
            "motion-reduce:transition-none",
          ].join(" ")}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            aria-label="Закрыть просмотр фотографии"
            style={{
              top: "max(12px, env(safe-area-inset-top))",
              right: "max(12px, env(safe-area-inset-right))",
            }}
            className={[
              "absolute z-30",
              "flex h-11 w-11",
              "items-center justify-center",
              "rounded-[13px] border",
              "border-[rgba(216,209,201,0.82)]",
              "bg-[rgba(252,250,247,0.86)]",
              "backdrop-blur-sm",
              "text-[26px] font-light",
              "leading-none",
              "text-[var(--color-text-primary)]",
              "transition-[background-color,border-color,color]",
              "duration-200 ease-out",
              "hover:border-[var(--color-accent)]",
              "hover:bg-[var(--color-surface)]",
              "hover:text-[var(--color-accent)]",
              "focus-visible:outline",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-[3px]",
              "focus-visible:outline-[var(--color-accent)]",
              "motion-reduce:transition-none",
            ].join(" ")}
          >
            ×
          </button>

          <div
            className={[
              "relative flex flex-col",
              "items-center",
              "transition-[opacity,transform]",
              "duration-200 ease-out",
              isLightboxVisible
                ? "scale-100 opacity-100"
                : "scale-[0.98] opacity-0",
              "motion-reduce:transform-none",
              "motion-reduce:transition-none",
            ].join(" ")}
          >
            <div className="relative overflow-visible">
              <div
                onPointerDown={handleLightboxPointerDown}
                onPointerUp={handleLightboxPointerUp}
                onPointerCancel={handleLightboxPointerCancel}
                className={[
                  "relative inline-flex",
                  "touch-pan-y select-none",
                ].join(" ")}
              >
                <div
                  className={[
                    "inline-flex",
                    "transition-[opacity,transform]",
                    "duration-150 ease-out",
                    isPhotoVisible
                      ? ["translate-x-0", "scale-100", "opacity-100"].join(" ")
                      : hiddenPhotoClasses,
                    "motion-reduce:transform-none",
                    "motion-reduce:transition-none",
                  ].join(" ")}
                >
                  <Image
                    key={activePhoto.id}
                    src={activePhotoSource}
                    alt={getPhotoAlt(activePhoto)}
                    width={activePhotoSource.width}
                    height={activePhotoSource.height}
                    sizes="(max-width: 639px) 88vw, (max-width: 1279px) 68vw, 610px"
                    className={[
                      "pointer-events-none",
                      "block h-auto w-auto",
                      "max-h-[70dvh]",
                      "max-w-[88vw]",
                      "rounded-[20px]",
                      "object-contain",
                      "object-center",
                      "shadow-[0_18px_48px_rgba(34,34,32,0.14)]",
                      "sm:max-h-[72.5dvh]",
                      "sm:max-w-[min(68vw,58dvh)]",
                      "sm:rounded-[24px]",
                    ].join(" ")}
                    draggable={false}
                  />
                </div>
              </div>

              {lightboxPhotoCount > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => changePhoto(-1)}
                    aria-label="Предыдущая фотография"
                    className={[
                      "group/previous",
                      "absolute left-1",
                      "top-1/2 z-30",
                      "-mt-[22px]",
                      "flex h-11 w-11",
                      "items-center",
                      "justify-center",
                      "cursor-pointer",
                      "rounded-full",
                      "focus-visible:outline",
                      "focus-visible:outline-2",
                      "focus-visible:outline-offset-[3px]",
                      "focus-visible:outline-[var(--color-accent)]",
                      "sm:-left-16",
                      "sm:-mt-6",
                      "sm:h-12 sm:w-12",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "flex h-9 w-9",
                        "items-center",
                        "justify-center",
                        "rounded-full border",
                        "border-[rgba(216,209,201,0.78)]",
                        "bg-[rgba(252,250,247,0.86)]",
                        "backdrop-blur-sm",
                        "text-[17px]",
                        "leading-none",
                        "text-[var(--color-text-primary)]",
                        "transition-[background-color,border-color,color,transform]",
                        "duration-200 ease-out",
                        "group-hover/previous:-translate-x-0.5",
                        "group-hover/previous:border-[var(--color-accent)]",
                        "group-hover/previous:bg-[var(--color-surface)]",
                        "group-hover/previous:text-[var(--color-accent)]",
                        "motion-reduce:transform-none",
                        "motion-reduce:transition-colors",
                        "sm:h-11 sm:w-11",
                        "sm:text-xl",
                      ].join(" ")}
                    >
                      ←
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => changePhoto(1)}
                    aria-label="Следующая фотография"
                    className={[
                      "group/next",
                      "absolute right-1",
                      "top-1/2 z-30",
                      "-mt-[22px]",
                      "flex h-11 w-11",
                      "items-center",
                      "justify-center",
                      "cursor-pointer",
                      "rounded-full",
                      "focus-visible:outline",
                      "focus-visible:outline-2",
                      "focus-visible:outline-offset-[3px]",
                      "focus-visible:outline-[var(--color-accent)]",
                      "sm:-right-16",
                      "sm:-mt-6",
                      "sm:h-12 sm:w-12",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        "flex h-9 w-9",
                        "items-center",
                        "justify-center",
                        "rounded-full border",
                        "border-[rgba(216,209,201,0.78)]",
                        "bg-[rgba(252,250,247,0.86)]",
                        "backdrop-blur-sm",
                        "text-[17px]",
                        "leading-none",
                        "text-[var(--color-text-primary)]",
                        "transition-[background-color,border-color,color,transform]",
                        "duration-200 ease-out",
                        "group-hover/next:translate-x-0.5",
                        "group-hover/next:border-[var(--color-accent)]",
                        "group-hover/next:bg-[var(--color-surface)]",
                        "group-hover/next:text-[var(--color-accent)]",
                        "motion-reduce:transform-none",
                        "motion-reduce:transition-colors",
                        "sm:h-11 sm:w-11",
                        "sm:text-xl",
                      ].join(" ")}
                    >
                      →
                    </span>
                  </button>
                </>
              ) : null}
            </div>

            <div
              aria-live="polite"
              className={[
                "mt-3 inline-flex",
                "min-w-0 items-baseline",
                "justify-center gap-3",
                "rounded-full border",
                "border-[rgba(216,209,201,0.72)]",
                "bg-[rgba(252,250,247,0.78)]",
                "px-3 py-2 text-center",
                "backdrop-blur-sm",
                "sm:mt-4",
              ].join(" ")}
            >
              <p
                className={[
                  "text-[15px]",
                  "font-semibold leading-5",
                  "text-[var(--color-text-primary)]",
                  "sm:text-base",
                ].join(" ")}
              >
                {getPhotoLabel(activePhoto)}
              </p>

              <p
                className={[
                  "shrink-0 text-[13px]",
                  "font-medium leading-5",
                  "text-[var(--color-text-secondary)]",
                ].join(" ")}
              >
                {activePhotoIndex + 1} / {lightboxPhotoCount}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
