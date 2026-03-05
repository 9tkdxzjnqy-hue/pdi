import Navbar from "@/components/Navbar";
import CompetitionsHero from "@/components/CompetitionsHero";
import CompetitionSection from "@/components/CompetitionSection";
import Footer from "@/components/Footer";
import { getCompetitions } from "@/sanity/fetch";

export const metadata = {
  title: "Competitions — PDI",
  description:
    "Full results for the PDI, WPDI, Walk-on of the Year, Shield, and Hall of Fame — every winner since 2004.",
};

export default async function CompetitionsPage() {
  const competitions = await getCompetitions();

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
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
