import Navbar from "@/components/Navbar";
import CompetitionsHero from "@/components/CompetitionsHero";
import CompetitionSection from "@/components/CompetitionSection";
import Footer from "@/components/Footer";
import { competitions } from "@/data/competitions";

export const metadata = {
  title: "Competitions | PDI",
};

export default function CompetitionsPage() {
  return (
    <>
      <Navbar />
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

      <Footer />
    </>
  );
}
