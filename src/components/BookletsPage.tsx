"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { bookletYears, bookletPageSrc } from "@/data/booklets";
import { useScrollPillNav } from "@/hooks/useScrollPillNav";
import type { GalleryItem } from "@/sanity/types";

export default function BookletsPage() {
  const sectionIds = useMemo(
    () => bookletYears.map((b) => `booklet-${b.year}`),
    []
  );
  const { activeId, scrollRef, pillRefs, canScrollLeft, canScrollRight, jumpTo } =
    useScrollPillNav({ sectionIds });

  return (
    <>
      {/* Hero */}
      <section className="bg-pdi-dark pt-32 pb-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/gallery"
            className="mb-6 inline-block text-sm font-semibold text-pdi-muted transition-colors hover:text-pdi-text"
          >
            &larr; Back to Gallery
          </Link>
          <h1 className="font-display text-4xl text-pdi-text md:text-5xl lg:text-6xl">
            The PDI Booklets
          </h1>
          <p className="mt-6 text-lg text-pdi-muted">
            Every year, the PDI produced a booklet packed with player profiles,
            chairman&rsquo;s addresses, letters, ads, and the occasional roast.
            Eight years of booklets, cover to cover.
          </p>
        </div>
      </section>

      {/* Year nav pills */}
      <nav
        aria-label="Booklet years"
        className="sticky top-16 z-40 border-b border-white/5 bg-pdi-dark/90 backdrop-blur-md"
      >
        <div className="relative mx-auto max-w-7xl">
          {/* Left fade */}
          {canScrollLeft && (
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-pdi-dark/90 to-transparent" />
          )}
          {/* Right fade */}
          {canScrollRight && (
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-pdi-dark/90 to-transparent" />
          )}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
          >
            {bookletYears.map((b) => {
              const sectionId = `booklet-${b.year}`;
              const isActive = activeId === sectionId;
              return (
                <button
                  key={b.year}
                  type="button"
                  ref={(el) => {
                    if (el) pillRefs.current.set(sectionId, el);
                  }}
                  onClick={() => jumpTo(sectionId)}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-5 py-2.5 text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-pdi-green/15 text-pdi-green"
                      : "bg-white/5 text-pdi-muted hover:text-pdi-text"
                  }`}
                >
                  {b.year}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Year sections */}
      {bookletYears.map((b) => {
        const items: GalleryItem[] = Array.from({ length: b.pages }, (_, i) => ({
          src: bookletPageSrc(b.year, i + 1),
          alt: `PDI ${b.year} booklet — page ${i + 1}`,
        }));

        return (
          <section
            key={b.year}
            id={`booklet-${b.year}`}
            className="scroll-mt-32 border-t border-white/5 py-16"
          >
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="font-display text-3xl text-pdi-text md:text-4xl">
                {b.year}
              </h2>
              <p className="mt-2 text-pdi-muted">
                {b.pages} pages
              </p>
              <div className="mt-10">
                <BookletGrid items={items} />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

/**
 * Booklet-specific grid with fixed A5 aspect ratio to prevent layout shift.
 * Uses the same lightbox as the gallery but reserves space for each page.
 */
const PREVIEW_COUNT = 10;

function BookletGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = expanded ? items : items.slice(0, PREVIEW_COUNT);

  const open = useCallback((index: number) => {
    setActiveIndex(index);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setActiveIndex(null);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : items.length - 1));
  }, [items.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : 0));
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, prev, next]);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      {/* Grid with fixed aspect ratio slots — prevents layout shift */}
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
        {visible.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => open(index)}
            className="relative cursor-zoom-in overflow-hidden rounded-lg"
            style={{ aspectRatio: "210 / 297" }}
          >
            <Image
              src={item.src!}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              quality={85}
              sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          </button>
        ))}
      </div>

      {!expanded && items.length > PREVIEW_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-6 text-sm text-pdi-muted transition-colors hover:text-pdi-text"
        >
          View all {items.length} pages &rarr;
        </button>
      )}

      {/* Lightbox dialog */}
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="fixed inset-0 m-0 h-dvh w-dvw max-h-none max-w-none bg-black/90 backdrop-blur-sm p-0 [&::backdrop]:bg-transparent"
      >
        {activeItem && (
          <div className="flex h-full w-full items-center justify-center">
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-pdi-text transition-colors hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-pdi-text transition-colors hover:bg-white/20"
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="relative max-h-[85dvh] max-w-[90vw]">
              <Image
                src={activeItem.src!}
                alt={activeItem.alt}
                width={1200}
                height={1697}
                className="max-h-[85dvh] w-auto object-contain"
                quality={85}
                sizes="90vw"
                priority
              />
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-pdi-text transition-colors hover:bg-white/20"
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-pdi-dark/80 px-4 py-2 text-center backdrop-blur-sm">
              <p className="text-sm text-pdi-text">{activeItem.alt}</p>
              <p className="mt-1 text-xs text-pdi-muted">
                {activeIndex! + 1} / {items.length}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
