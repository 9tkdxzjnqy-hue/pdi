"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useScrollPillNav } from "@/hooks/useScrollPillNav";

interface Section {
  id: string;
  label: string;
}

interface GalleryNavProps {
  sections: Section[];
  basePath?: string;
  links?: { label: string; href: string }[];
}

export default function GalleryNav({ sections, basePath, links }: GalleryNavProps) {
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const { activeId, scrollRef, pillRefs, canScrollLeft, canScrollRight, jumpTo } =
    useScrollPillNav({
      sectionIds,
      basePath,
      formatSlug: (id) => id.replace("year-", ""),
    });

  return (
    <nav
      aria-label="Gallery sections"
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
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                ref={(el) => {
                  if (el) pillRefs.current.set(s.id, el);
                }}
                onClick={() => jumpTo(s.id)}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-5 py-2.5 text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-pdi-green/15 text-pdi-green"
                    : "bg-white/5 text-pdi-muted hover:text-pdi-text"
                }`}
              >
                {s.label}
              </button>
            );
          })}
          {links?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full bg-white/5 px-5 py-2.5 text-sm whitespace-nowrap text-pdi-muted transition-colors hover:text-pdi-text"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
