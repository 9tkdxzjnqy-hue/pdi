"use client";

import { useState } from "react";
import Image from "next/image";

interface MemberTributeProps {
  name: string;
  nickname: string;
  photo?: string;
  tribute: string;
  quote?: string;
  quoteAttribution?: string;
  poem?: {
    title: string;
    author: string;
    lines: string[];
  };
}

const PREVIEW_PARAGRAPHS = 2;

export default function MemberTribute({
  name,
  nickname,
  photo,
  tribute,
  quote,
  quoteAttribution,
  poem,
}: MemberTributeProps) {
  const [expanded, setExpanded] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const paragraphs = tribute ? tribute.split("\n\n") : [];
  const isLong = paragraphs.length > PREVIEW_PARAGRAPHS;
  const previewParagraphs = paragraphs.slice(0, PREVIEW_PARAGRAPHS);
  const remainingParagraphs = paragraphs.slice(PREVIEW_PARAGRAPHS);

  return (
    <article className="border-b border-white/5 last:border-b-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Photo or placeholder */}
        <div className="relative aspect-[4/5] max-h-[70vh] overflow-hidden rounded-xl bg-pdi-navy">
          {photo ? (
            <Image
              src={photo}
              alt={`${name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <span className="font-display text-6xl text-pdi-muted/30">
                {initials}
              </span>
              <span className="mt-3 text-sm text-pdi-muted/40">
                Photo coming soon
              </span>
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl text-pdi-text md:text-4xl">
            {nickname}
          </h2>

          {paragraphs.length > 0 && (
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-pdi-text/80">
              {previewParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {isLong && (
                <>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 motion-reduce:duration-0 ${
                      expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-4">
                        {remainingParagraphs.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    className="cursor-pointer text-sm font-semibold text-pdi-green hover:text-pdi-teal transition-colors"
                  >
                    {expanded ? "Read less" : "Read more"}
                  </button>
                </>
              )}
            </div>
          )}

          {poem && (
            <blockquote className="mt-6 border-l-2 border-pdi-green/30 pl-5">
              <div className="space-y-4 text-lg leading-relaxed text-pdi-text/80 italic">
                {poem.lines.map((stanza, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {stanza}
                  </p>
                ))}
              </div>
              <cite className="mt-4 block text-sm text-pdi-muted/60 not-italic">
                &mdash; {poem.author}
              </cite>
            </blockquote>
          )}

          {quote && (
            <blockquote className="mt-8 border-l-2 border-pdi-green/30 pl-5">
              <p className="italic text-pdi-muted">&ldquo;{quote}&rdquo;</p>
              {quoteAttribution && (
                <cite className="mt-2 block text-sm text-pdi-muted/60 not-italic">
                  &mdash; {quoteAttribution}
                </cite>
              )}
            </blockquote>
          )}
        </div>
      </div>
    </article>
  );
}
