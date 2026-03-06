import Navbar from "@/components/Navbar";
import WalkOnsHero from "@/components/WalkOnsHero";
import WalkOnsNav from "@/components/WalkOnsNav";
import WalkOnYearSection from "@/components/WalkOnYearSection";
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

export default async function WalkOnsPage() {
  const items = await getGalleryByEra("walk-ons");
  const years = walkOnEra.allYears ?? [];

  // Group items by year
  const byYear = new Map<number, GalleryItem[]>();
  for (const item of items) {
    const y = item.year ?? 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(item);
  }

  // Index competition results by year
  const resultsByYear = new Map(
    walkOnCompetition.results.map((r) => [r.year, r])
  );

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-pdi-dark">
        <WalkOnsHero />
        <WalkOnsNav years={years} />
        {years.map((year) => {
          const result = resultsByYear.get(year);
          return (
            <WalkOnYearSection
              key={year}
              year={year}
              winner={result?.winner}
              walkOnName={result?.walkOnName}
              items={byYear.get(year) ?? []}
            />
          );
        })}
      </main>
      <Footer />
    </>
  );
}
