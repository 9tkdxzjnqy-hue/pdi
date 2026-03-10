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

  // Group by year, with undated items separate
  const byYear = new Map<number, GalleryItem[]>();
  const undated: GalleryItem[] = [];

  for (const item of allItems) {
    if (item.year) {
      if (!byYear.has(item.year)) byYear.set(item.year, []);
      byYear.get(item.year)!.push(item);
    } else {
      undated.push(item);
    }
  }

  const years = [...byYear.keys()].sort((a, b) => b - a);

  // Build sections for nav and validation
  const yearSections = years.map((y) => ({
    id: `year-${y}`,
    label: String(y),
  }));
  if (undated.length > 0) {
    yearSections.push({ id: "year-undated", label: "Undated" });
  }

  const validSlugs = [
    ...years.map(String),
    ...(undated.length > 0 ? ["undated"] : []),
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

        {years.map((year) => (
          <GallerySection
            key={year}
            id={`year-${year}`}
            label={String(year)}
            items={byYear.get(year)!}
          />
        ))}

        {undated.length > 0 && (
          <GallerySection
            id="year-undated"
            label="Undated"
            items={undated}
          />
        )}

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
