import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import WalkOnsHero from "@/components/WalkOnsHero";
import WalkOnsNav from "@/components/WalkOnsNav";
import WalkOnYearSection from "@/components/WalkOnYearSection";
import ScrollToSection from "@/components/ScrollToSection";
import Footer from "@/components/Footer";
import { getWalkOnGalleryItems } from "@/sanity/fetch";
import { WALK_ON_YEARS } from "@/data/gallery";
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

  const years = WALK_ON_YEARS;
  const validYears = years.map(String);

  if (slug && !validYears.includes(slug)) {
    notFound();
  }

  const targetId = slug ? `year-${slug}` : undefined;

  const items = await getWalkOnGalleryItems();

  // Index competition results by year
  const resultsByYear = new Map(
    walkOnCompetition.results.map((r) => [r.year, r])
  );

  // Collect winner photo URLs so we can exclude them from the gallery grid.
  const winnerPhotos = new Set(
    walkOnCompetition.results.map((r) => r.photo).filter(Boolean)
  );

  // Build a map of winner photo filenames (without path) so we can match
  // Sanity CDN URLs that correspond to the same local image.
  const winnerFilenames = new Set(
    walkOnCompetition.results
      .map((r) => r.photo)
      .filter(Boolean)
      .map((p) => p!.split("/").pop()!.replace(/\.[^.]+$/, ""))
  );

  // Group items by year, excluding any that are used as winner photos
  const byYear = new Map<number, GalleryItem[]>();
  for (const item of items) {
    if (item.src && winnerPhotos.has(item.src)) continue;
    // Also exclude Sanity CDN items whose _id matches a winner photo filename
    if (item.src?.startsWith("http") && item._id) {
      const docId = item._id.replace(/^gallery-/, "");
      if (winnerFilenames.has(docId)) continue;
    }
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
