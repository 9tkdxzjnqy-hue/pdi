"use client";

import { useEffect, useRef, useState } from "react";

interface GalleryNavProps {
  eras: { eraId: string; label: string }[];
  basePath?: string;
}

export default function GalleryNav({ eras, basePath }: GalleryNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const scrollingTo = useRef<string | null>(null);

  useEffect(() => {
    const sections = eras
      .map((era) => document.getElementById(`era-${era.eraId}`))
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
  }, [eras]);

  // Auto-scroll active pill into view + sync URL
  useEffect(() => {
    if (!activeId) return;
    const eraId = activeId.replace("era-", "");
    const pill = pillRefs.current.get(eraId);
    if (pill) {
      pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    if (basePath) {
      // During a click scroll, only update URL when we reach the destination
      if (scrollingTo.current && scrollingTo.current !== eraId) return;
      if (scrollingTo.current === eraId) scrollingTo.current = null;
      history.replaceState(null, "", `${basePath}/${eraId}`);
    }
  }, [activeId, basePath]);

  return (
    <nav
      aria-label="Gallery sections"
      className="sticky top-16 z-40 border-b border-white/5 bg-pdi-dark/90 backdrop-blur-md"
    >
      <div
        ref={scrollRef}
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        {eras.map((era) => {
          const isActive = activeId === `era-${era.eraId}`;
          return (
            <button
              key={era.eraId}
              type="button"
              ref={(el) => {
                if (el) pillRefs.current.set(era.eraId, el);
              }}
              onClick={() => {
                scrollingTo.current = era.eraId;
                const section = document.getElementById(`era-${era.eraId}`);
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
                if (basePath) {
                  history.replaceState(null, "", `${basePath}/${era.eraId}`);
                }
              }}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-pdi-green/15 text-pdi-green"
                  : "bg-white/5 text-pdi-muted hover:text-pdi-text"
              }`}
            >
              {era.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
