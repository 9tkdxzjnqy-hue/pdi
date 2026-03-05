"use client";

import { useEffect, useRef, useState } from "react";

interface GalleryNavProps {
  eras: { eraId: string; label: string }[];
}

export default function GalleryNav({ eras }: GalleryNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

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

  // Auto-scroll active pill into view
  useEffect(() => {
    if (!activeId) return;
    const eraId = activeId.replace("era-", "");
    const pill = pillRefs.current.get(eraId);
    if (pill) {
      pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeId]);

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
            <a
              key={era.eraId}
              href={`#era-${era.eraId}`}
              ref={(el) => {
                if (el) pillRefs.current.set(era.eraId, el);
              }}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-pdi-green/15 text-pdi-green"
                  : "bg-white/5 text-pdi-muted hover:text-pdi-text"
              }`}
            >
              {era.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
