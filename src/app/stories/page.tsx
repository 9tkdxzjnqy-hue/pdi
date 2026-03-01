import Navbar from "@/components/Navbar";
import StoriesHero from "@/components/StoriesHero";
import StoryThreadCard from "@/components/StoryThreadCard";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Stories — PDI",
  description: "The threads that make the PDI what it is.",
};

const threads = [
  {
    title: "The Auction",
    description:
      "'The Gun' sells a bag of potatoes for a fortune. And that's just the start.",
    href: "/stories/auction",
    comingSoon: true,
  },
  {
    title: "The Videos",
    description:
      "Intimidation videos, comedy entries, and productions that have no business being that good.",
    href: "/stories/videos",
    comingSoon: true,
  },
  {
    title: "The Letters",
    description:
      "Correspondence with high-profile figures in the early days of the PDI.",
    href: "/stories/letters",
    comingSoon: true,
  },
];

export default function StoriesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <StoriesHero />
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {threads.map((thread) => (
                <StoryThreadCard key={thread.title} {...thread} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
