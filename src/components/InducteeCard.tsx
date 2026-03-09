"use client";

import { useState } from "react";
import Image from "next/image";
import { Inductee } from "@/sanity/types";

function SilhouetteSvg() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-pdi-muted/20"
      aria-hidden="true"
    >
      <circle cx="60" cy="42" r="20" fill="currentColor" />
      <ellipse cx="60" cy="95" rx="35" ry="25" fill="currentColor" />
    </svg>
  );
}

export default function InducteeCard({
  nickname,
  contribution,
  year,
  photo,
}: Inductee) {
  const [expanded, setExpanded] = useState(false);
  const label = year ? `Inducted ${year}` : undefined;

  const paragraphs = contribution ? contribution.split("\n\n") : [];
  const isLong = paragraphs.length > 1;
  const firstParagraph = paragraphs[0] ?? "";
  const remainingParagraphs = paragraphs.slice(1);

  function toggle() {
    setExpanded((prev) => !prev);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="cursor-pointer rounded-xl bg-pdi-navy transition-colors hover:bg-pdi-navy/80"
    >
      {/* Thumbnail */}
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-t-xl bg-white/5">
        {photo ? (
          <Image
            src={photo}
            alt={nickname}
            width={400}
            height={400}
            quality={85}
            className="h-full w-full object-cover"
          />
        ) : (
          <SilhouetteSvg />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-2xl text-pdi-text">{nickname}</h3>

        {label && (
          <span className="mt-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-pdi-muted">
            {label}
          </span>
        )}

        <p className={`mt-3 text-pdi-muted ${!expanded && isLong ? "line-clamp-2" : ""}`}>
          {firstParagraph}
        </p>

        {isLong && (
          <div
            className={`grid transition-[grid-template-rows] duration-300 motion-reduce:duration-0 ${
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="mt-3 space-y-3">
                {remainingParagraphs.map((para, i) => (
                  <p key={i} className="text-pdi-muted">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {isLong && (
          <span className="mt-3 inline-block text-sm font-semibold text-pdi-green">
            {expanded ? "Read less" : "Read more"}
          </span>
        )}
      </div>
    </div>
  );
}
