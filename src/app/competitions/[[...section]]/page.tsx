import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CompetitionsHero from "@/components/CompetitionsHero";
import CompetitionSection from "@/components/CompetitionSection";
import ScrollToSection from "@/components/ScrollToSection";
import Footer from "@/components/Footer";
import { getCompetitions } from "@/sanity/fetch";

export const metadata = {
  title: "Competitions — PDI",
  description:
    "Full results for the PDI, WPDI, Shield, and Hall of Fame — every winner since 2004.",
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default async function CompetitionsPage({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;
  const slug = section?.[0];

  const competitions = await getCompetitions();
  const validSlugs = competitions.map((c) => slugify(c.name));

  if (slug && !validSlugs.includes(slug)) {
    notFound();
  }

  const targetId = slug ? `comp-${slug}` : undefined;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <CompetitionsHero />

        <section className="bg-pdi-dark px-6 py-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-12">
            {competitions.map((competition) => (
              <CompetitionSection
                key={competition.name}
                competition={competition}
                sectionId={`comp-${slugify(competition.name)}`}
              />
            ))}
          </div>
        </section>
        <ScrollToSection targetId={targetId} />
      </main>

      <Footer />
    </>
  );
}
