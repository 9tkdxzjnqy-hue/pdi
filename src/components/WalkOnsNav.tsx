"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface WalkOnsNavProps {
  years: number[];
  basePath?: string;
}

export default function WalkOnsNav({ years, basePath }: WalkOnsNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  // Brief guard: suppress observer while a click-jump settles
  const ignoreObserver = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollFades();
    el.addEventListener("scroll", updateScrollFades, { passive: true });
    window.addEventListener("resize", updateScrollFades, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateScrollFades);
      window.removeEventListener("resize", updateScrollFades);
    };
  }, [updateScrollFades]);

  useEffect(() => {
    const sections = years
      .map((year) => document.getElementById(`year-${year}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    // Track which sections are currently in the detection band
    const visible = new Set<string>();
    const yearIds = years.map((y) => `year-${y}`);

    const observer = new IntersectionObserver(
      (entries) => {
        if (ignoreObserver.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Pick the topmost visible section (DOM order)
        for (const id of yearIds) {
          if (visible.has(id)) {
            setActiveId(id);
            return;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [years]);

  // Auto-scroll active pill into view + sync URL
  useEffect(() => {
    if (!activeId) return;
    const yearStr = activeId.replace("year-", "");
    const year = Number(yearStr);
    const pill = pillRefs.current.get(year);
    if (pill) {
      pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    if (basePath) {
      history.replaceState(null, "", `${basePath}/${year}`);
    }
  }, [activeId, basePath]);

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
            const isActive = activeId === `year-${year}`;
            return (
              <button
                key={year}
                type="button"
                ref={(el) => {
                  if (el) pillRefs.current.set(year, el);
                }}
                onClick={() => {
                  setActiveId(`year-${year}`);
                  ignoreObserver.current = true;
                  const section = document.getElementById(`year-${year}`);
                  if (section) {
                    const prev = document.documentElement.style.scrollBehavior;
                    document.documentElement.style.scrollBehavior = "auto";
                    section.scrollIntoView({ block: "start" });
                    requestAnimationFrame(() => {
                      document.documentElement.style.scrollBehavior = prev;
                      ignoreObserver.current = false;
                    });
                  }
                }}
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
