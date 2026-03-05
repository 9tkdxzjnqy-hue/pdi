"use client";

import { useState } from "react";
import type { Story } from "@/sanity/types";

export default function LetterAccordion({ letters }: { letters: Story[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {letters.map((letter, i) => {
        const isOpen = openIndex === i;
        const firstSentence = letter.body
          ? letter.body.split(/(?<=[.!?])\s/)[0]
          : "";

        return (
          <article
            key={`${letter.title}-${letter.year}`}
            className="rounded-xl bg-pdi-navy"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-start gap-4 p-8 text-left"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  {letter.year && (
                    <span className="rounded-full bg-pdi-green/10 px-3 py-1 text-sm font-semibold text-pdi-green">
                      {letter.year}
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-2xl text-pdi-text">
                  {letter.title}
                </h2>
                {letter.author && (
                  <p className="mt-1 text-sm text-pdi-muted italic">
                    by {letter.author}
                  </p>
                )}
                {!isOpen && firstSentence && (
                  <p className="mt-3 line-clamp-1 text-sm text-pdi-muted">
                    {firstSentence}
                  </p>
                )}
              </div>
              <svg
                className={`mt-1 h-5 w-5 shrink-0 text-pdi-muted transition-transform duration-300 motion-reduce:duration-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 motion-reduce:duration-0 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/10 px-8 pt-6 pb-8">
                  <div className="space-y-4 text-pdi-text/90 leading-relaxed">
                    {letter.body!.split("\n\n").map((paragraph, j) => (
                      <p key={j}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
