"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { bookletYears, bookletPageSrc } from "@/data/booklets";
import type { GalleryItem } from "@/sanity/types";
import GalleryLightbox from "./GalleryLightbox";

export default function BookletsPage() {
  const [activeYear, setActiveYear] = useState<string>("");
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const scrollingTo = useRef<string | null>(null);

  useEffect(() => {
    const sections = bookletYears
      .map((b) => document.getElementById(`booklet-${b.year}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveYear(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeYear) return;
    const year = activeYear.replace("booklet-", "");
    const pill = pillRefs.current.get(year);
    if (pill) {
      pill.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
    if (scrollingTo.current && scrollingTo.current !== activeYear) return;
    if (scrollingTo.current === activeYear) scrollingTo.current = null;
  }, [activeYear]);

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
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
          {bookletYears.map((b) => {
            const sectionId = `booklet-${b.year}`;
            const isActive = activeYear === sectionId;
            return (
              <button
                key={b.year}
                type="button"
                ref={(el) => {
                  if (el) pillRefs.current.set(String(b.year), el);
                }}
                onClick={() => {
                  scrollingTo.current = sectionId;
                  const section = document.getElementById(sectionId);
                  section?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
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
      </nav>

      {/* Year sections */}
      {bookletYears.map((b) => {
        const items: GalleryItem[] = Array.from({ length: b.pages }, (_, i) => ({
          src: bookletPageSrc(b.year, i + 1),
          alt: `PDI ${b.year} booklet — page ${i + 1}`,
          era: "booklets",
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
                <GalleryLightbox
                  items={items}
                  columns="columns-3 gap-3 md:columns-4 md:gap-4 lg:columns-5"
                />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
