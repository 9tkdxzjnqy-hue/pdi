"use client";

import { useEffect } from "react";

export default function ScrollToSection({ targetId }: { targetId?: string }) {
  useEffect(() => {
    if (!targetId) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (!el) return;

      // Override smooth scrolling for instant jump on direct link
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";

      el.scrollIntoView({ block: "start" });

      // Restore after a frame
      requestAnimationFrame(() => {
        html.style.scrollBehavior = prev;
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [targetId]);

  return null;
}
