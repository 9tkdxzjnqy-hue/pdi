import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import GalleryHero from "@/components/GalleryHero";
import GalleryNav from "@/components/GalleryNav";
import GallerySection from "@/components/GallerySection";
import ScrollToSection from "@/components/ScrollToSection";
import BookletsPage from "@/components/BookletsPage";
import Footer from "@/components/Footer";
import { getAllGalleryItems } from "@/sanity/fetch";
import type { GalleryItem } from "@/sanity/types";

export const metadata = {
  title: "Gallery — PDI",
  description: "Scenes from twenty years of the PDI.",
};

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;
  const slug = section?.[0];

  // --- Booklets sub-page ---
  if (slug === "booklets") {
    return (
      <>
        <Navbar />
        <main id="main-content" className="bg-pdi-dark">
          <BookletsPage />
        </main>
        <Footer />
      </>
    );
  }

  // --- Year-based gallery ---
  const allItems = await getAllGalleryItems();

  // All years the gallery covers (descending), skipping 2020/2021 (no event)
  const ALL_YEARS = [2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013];

  // Group items into year buckets and Early Years
  const byYear = new Map<number, GalleryItem[]>();
  const earlyYears: GalleryItem[] = [];

  for (const item of allItems) {
    if (item.year) {
      if (!byYear.has(item.year)) byYear.set(item.year, []);
      byYear.get(item.year)!.push(item);
    } else if (!item.isWalkOn) {
      earlyYears.push(item);
    }
  }

  // Build sections for nav and validation
  const yearSections = ALL_YEARS.map((y) => ({
    id: `year-${y}`,
    label: String(y),
  }));
  yearSections.push({ id: "year-early-years", label: "The Early Years" });

  const validSlugs = [
    ...ALL_YEARS.map(String),
    "early-years",
    "booklets",
  ];

  if (slug && !validSlugs.includes(slug)) {
    notFound();
  }

  const targetId = slug ? `year-${slug}` : undefined;

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-pdi-dark">
        <GalleryHero />
        <GalleryNav
          sections={yearSections}
          basePath="/gallery"
          links={[{ label: "Booklets", href: "/gallery/booklets" }]}
        />
        <ScrollToSection targetId={targetId} />

        {ALL_YEARS.map((year) => (
          <GallerySection
            key={year}
            id={`year-${year}`}
            label={String(year)}
            items={byYear.get(year) ?? []}
          />
        ))}

        <GallerySection
          id="year-early-years"
          label="The Early Years"
          items={earlyYears}
        />

        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-3xl text-pdi-text">
              Got photos?
            </h2>
            <p className="mt-4 text-lg text-pdi-muted">
              We&rsquo;re crowdsourcing the gallery from every era of the PDI.
              Dig out your old photos and drop them in the shared drive &mdash;
              the more the better.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1-kvii3GsJKUeMsDYhd8q2ZqTzYvJU_M7?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-semibold text-pdi-green transition-colors hover:text-pdi-text"
            >
              Upload photos here &rarr;
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
