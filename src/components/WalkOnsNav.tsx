"use client";

import { useMemo } from "react";
import { useScrollPillNav } from "@/hooks/useScrollPillNav";

interface WalkOnsNavProps {
  years: number[];
  basePath?: string;
}

export default function WalkOnsNav({ years, basePath }: WalkOnsNavProps) {
  const sectionIds = useMemo(() => years.map((y) => `year-${y}`), [years]);
  const { activeId, scrollRef, pillRefs, canScrollLeft, canScrollRight, jumpTo } =
    useScrollPillNav({
      sectionIds,
      basePath,
      formatSlug: (id) => id.replace("year-", ""),
    });

  return (
    <nav
      aria-label="Walk-on years"
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
          {years.map((year) => {
            const sectionId = `year-${year}`;
            const isActive = activeId === sectionId;
            return (
              <button
                key={year}
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
                {year}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
