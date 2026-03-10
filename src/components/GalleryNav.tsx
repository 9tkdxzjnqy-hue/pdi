"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    // Track which sections are currently in the detection band
    const visible = new Set<string>();

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
        // Pick the topmost visible section (DOM order via sections array)
        for (const s of sections) {
          if (visible.has(s.id)) {
            setActiveId(s.id);
            return;
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
      const slug = activeId.replace("year-", "");
      history.replaceState(null, "", `${basePath}/${slug}`);
    }
  }, [activeId, basePath]);

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
                onClick={() => {
                  setActiveId(s.id);
                  // Suppress observer during the jump so it doesn't
                  // flicker to an intermediate section
                  ignoreObserver.current = true;
                  const section = document.getElementById(s.id);
                  if (section) {
                    // Instant jump — immune to lazy-image layout shifts
                    const prev = document.documentElement.style.scrollBehavior;
                    document.documentElement.style.scrollBehavior = "auto";
                    section.scrollIntoView({ block: "start" });
                    // Re-enable after the browser has settled
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
