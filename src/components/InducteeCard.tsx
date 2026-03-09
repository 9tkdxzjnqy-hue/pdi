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

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={() => setExpanded((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded((prev) => !prev);
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

        <p
          className={`mt-3 text-pdi-muted ${expanded ? "" : "line-clamp-2"}`}
        >
          {contribution}
        </p>
      </div>
    </div>
  );
}
