"use client";

import { useEffect, useRef, useState } from "react";

interface WalkOnsNavProps {
  years: number[];
}

export default function WalkOnsNav({ years }: WalkOnsNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const pillRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const sections = years
      .map((year) => document.getElementById(`year-${year}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
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

  // Auto-scroll active pill into view
  useEffect(() => {
    if (!activeId) return;
    const year = Number(activeId.replace("year-", ""));
    const pill = pillRefs.current.get(year);
    if (pill) {
      pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeId]);

  return (
    <nav
      aria-label="Walk-on years"
      className="sticky top-16 z-40 border-b border-white/5 bg-pdi-dark/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
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
                const section = document.getElementById(`year-${year}`);
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
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
    </nav>
  );
}
