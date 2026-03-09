import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import WalkOnsHero from "@/components/WalkOnsHero";
import WalkOnsNav from "@/components/WalkOnsNav";
import WalkOnYearSection from "@/components/WalkOnYearSection";
import ScrollToSection from "@/components/ScrollToSection";
import Footer from "@/components/Footer";
import { getGalleryByEra } from "@/sanity/fetch";
import { walkOnEra } from "@/data/gallery";
import { walkOnCompetition } from "@/data/competitions";
import type { GalleryItem } from "@/sanity/types";

export const metadata = {
  title: "Walk-Ons — PDI",
  description:
    "The centrepiece of the PDI — every player's theatrical entrance through the double doors. Photos, videos, and Walk-on of the Year winners.",
};

export default async function WalkOnsPage({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;
  const slug = section?.[0];

  const years = walkOnEra.allYears ?? [];
  const validYears = years.map(String);

  if (slug && !validYears.includes(slug)) {
    notFound();
  }

  const targetId = slug ? `year-${slug}` : undefined;

  const items = await getGalleryByEra("walk-ons");

  // Index competition results by year
  const resultsByYear = new Map(
    walkOnCompetition.results.map((r) => [r.year, r])
  );

  // Collect winner photos so we can exclude them from the gallery grid
  const winnerPhotos = new Set(
    walkOnCompetition.results.map((r) => r.photo).filter(Boolean)
  );

  // Group items by year, excluding any that are used as winner photos
  const byYear = new Map<number, GalleryItem[]>();
  for (const item of items) {
    if (item.src && winnerPhotos.has(item.src)) continue;
    const y = item.year ?? 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(item);
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-pdi-dark">
        <WalkOnsHero />
        <WalkOnsNav years={years} basePath="/walk-ons" />
        <ScrollToSection targetId={targetId} />
        {years.map((year) => {
          const result = resultsByYear.get(year);
          return (
            <WalkOnYearSection
              key={year}
              year={year}
              winner={result?.winner}
              walkOnName={result?.walkOnName}
              winnerPhoto={result?.photo}
              items={byYear.get(year) ?? []}
            />
          );
        })}
      </main>
      <Footer />
    </>
  );
}
