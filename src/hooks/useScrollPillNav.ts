import { useCallback, useEffect, useRef, useState } from "react";

interface UseScrollPillNavOptions {
  sectionIds: string[];
  basePath?: string;
  formatSlug?: (id: string) => string;
}

export function useScrollPillNav({
  sectionIds,
  basePath,
  formatSlug,
}: UseScrollPillNavOptions) {
  const [activeId, setActiveId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const ignoreObserver = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Store formatSlug in a ref to avoid re-triggering effects for inline functions
  const formatSlugRef = useRef(formatSlug);
  formatSlugRef.current = formatSlug;

  // Scroll fade detection
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

  // IntersectionObserver — track visible sections, pick topmost
  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

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
        for (const id of sectionIds) {
          if (visible.has(id)) {
            setActiveId(id);
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
  }, [sectionIds]);

  // Auto-scroll active pill into view + optional URL sync
  useEffect(() => {
    if (!activeId) return;
    const pill = pillRefs.current.get(activeId);
    if (pill) {
      pill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
    if (basePath) {
      const slug = formatSlugRef.current
        ? formatSlugRef.current(activeId)
        : activeId;
      history.replaceState(null, "", `${basePath}/${slug}`);
    }
  }, [activeId, basePath]);

  // Instant jump to a section
  const jumpTo = useCallback((sectionId: string) => {
    setActiveId(sectionId);
    ignoreObserver.current = true;
    const section = document.getElementById(sectionId);
    if (section) {
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      section.scrollIntoView({ block: "start" });
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = prev;
        ignoreObserver.current = false;
      });
    }
  }, []);

  return {
    activeId,
    scrollRef,
    pillRefs,
    canScrollLeft,
    canScrollRight,
    jumpTo,
  };
}
