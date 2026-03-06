import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import type { Competition } from "@/sanity/types";
import { urlFor } from "@/sanity/image";

interface CompetitionsPreviewProps {
  competitions?: Competition[];
  title?: string;
  description?: string;
  linkText?: string;
}

export default function CompetitionsPreview({ competitions, title, description, linkText }: CompetitionsPreviewProps) {
  const items = competitions ?? fallbackCompetitions;

  return (
    <section id="competitions" className="bg-pdi-dark py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <h2 className="font-display text-4xl font-semibold text-pdi-text md:text-5xl">
            {title ?? "The Competitions"}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-pdi-muted">
            {description ?? "Every player finds their stage."}
          </p>
        </AnimateOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((comp, i) => {
            const imgSrc = comp.image?.asset?._ref
              ? urlFor(comp.image).width(600).height(800).url()
              : (comp as Record<string, unknown>)._fallbackImage as string ?? "";

            return (
              <AnimateOnScroll key={comp.name} delay={0.1 * (i + 1)}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src={imgSrc}
                    alt={comp.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pdi-dark via-pdi-dark/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl font-semibold text-pdi-text">
                      {comp.name}
                    </h3>
                    <p className="mt-1 text-sm text-pdi-muted">
                      {comp.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll>
          <div className="mt-10">
            <Link
              href="/competitions"
              className="text-sm font-semibold text-pdi-green transition-colors hover:text-pdi-text"
            >
              {linkText ?? "Explore Competitions \u2192"}
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

const fallbackCompetitions = [
  {
    name: "The PDI",
    description: "The main event. Who can hold their nerve?",
    image: { _type: "image" as const, asset: { _ref: "", _type: "reference" as const } },
    _fallbackImage: "/images/PDITrophy.jpeg",
    results: [],
  },
  {
    name: "WPDI",
    description: "The women's invitational. In it to win it.",
    image: { _type: "image" as const, asset: { _ref: "", _type: "reference" as const } },
    _fallbackImage: "/images/bar-community.jpeg",
    results: [],
  },
  {
    name: "The Shield",
    description: "The Europa League of the PDI.",
    image: { _type: "image" as const, asset: { _ref: "", _type: "reference" as const } },
    _fallbackImage: "/images/walkon-green-smoke.jpeg",
    results: [],
  },
  {
    name: "Hall of Fame",
    description: "One name added each year for their contribution to the PDI.",
    image: { _type: "image" as const, asset: { _ref: "", _type: "reference" as const } },
    _fallbackImage: "/images/hero-walkon-blue.jpeg",
    results: [],
  },
];
