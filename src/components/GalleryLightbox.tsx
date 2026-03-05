"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/sanity/types";

interface GalleryLightboxProps {
  items: GalleryItem[];
}

export default function GalleryLightbox({ items }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, prev, next]);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      {/* Image grid — masonry via CSS columns */}
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => open(index)}
            className="mb-3 block w-full cursor-zoom-in overflow-hidden rounded-lg md:mb-4"
          >
            <div className="relative">
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={400}
                className="w-full h-auto transition-transform duration-500 hover:scale-105"
                quality={85}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {item.year && (
                <span className="absolute bottom-2 right-2 rounded bg-pdi-dark/80 px-2 py-0.5 text-xs font-semibold text-pdi-text backdrop-blur-sm">
                  {item.year}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

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
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-pdi-text transition-colors hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Previous button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-pdi-text transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative max-h-[85dvh] max-w-[90vw]">
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                width={1200}
                height={800}
                className="max-h-[85dvh] w-auto object-contain"
                quality={85}
                sizes="90vw"
                priority
              />
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-pdi-text transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Caption */}
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
