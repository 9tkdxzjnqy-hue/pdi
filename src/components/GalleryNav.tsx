"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
  const [activeId, setActiveId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const scrollingTo = useRef<string | null>(null);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

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

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  // Auto-scroll active pill into view + sync URL
  useEffect(() => {
    if (!activeId) return;
    const pill = pillRefs.current.get(activeId);
    if (pill) {
      pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    if (basePath) {
      // During a click scroll, only update URL when we reach the destination
      if (scrollingTo.current && scrollingTo.current !== activeId) return;
      if (scrollingTo.current === activeId) scrollingTo.current = null;
      // Derive URL slug from section ID (e.g. "year-2025" → "2025", "year-undated" → "undated")
      const slug = activeId.replace("year-", "");
      history.replaceState(null, "", `${basePath}/${slug}`);
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
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              ref={(el) => {
                if (el) pillRefs.current.set(s.id, el);
              }}
              onClick={() => {
                scrollingTo.current = s.id;
                const section = document.getElementById(s.id);
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
                if (basePath) {
                  const slug = s.id.replace("year-", "");
                  history.replaceState(null, "", `${basePath}/${slug}`);
                }
              }}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
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
            className="rounded-full bg-white/5 px-4 py-2 text-sm whitespace-nowrap text-pdi-muted transition-colors hover:text-pdi-text"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
