import Navbar from "@/components/Navbar";
import StoriesHero from "@/components/StoriesHero";
import StoryThreadCard from "@/components/StoryThreadCard";
import Footer from "@/components/Footer";
import { getStoryThreads } from "@/sanity/fetch";

export const metadata = {
  title: "Stories — PDI",
  description: "The threads that make the PDI what it is.",
};

const fallbackThreads = [
  {
    title: "The Chairman's Address",
    description:
      "The annual state of the union — history, tribute, and the year ahead.",
    slug: "chairmans-address",
  },
  {
    title: "The Letters",
    description:
      "Letters, articles, and correspondence from the PDI community over the years.",
    slug: "letters",
  },
  {
    title: "Reviews",
    description:
      "Looking back on the year that was.",
    slug: "reviews",
  },
  {
    title: "Where Are They Now?",
    description:
      "Catching up with familiar faces from PDIs past.",
    slug: "where-are-they-now",
  },
  {
    title: "The Auction",
    description:
      "'The Gun' sells a bag of potatoes for a fortune. And that's just the start.",
    slug: "auction",
    comingSoon: true,
  },
  {
    title: "The Videos",
    description:
      "Intimidation videos, comedy entries, and productions that have no business being that good.",
    slug: "videos",
    comingSoon: true,
  },
];

export default async function StoriesPage() {
  const sanityThreads = await getStoryThreads();
  const threads = sanityThreads.length > 0 ? sanityThreads : fallbackThreads;

  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <StoriesHero />
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {threads.map((thread) => (
                <StoryThreadCard
                  key={thread.title}
                  title={thread.title}
                  description={thread.description}
                  href={`/stories/${thread.slug}`}
                  comingSoon={thread.comingSoon}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
