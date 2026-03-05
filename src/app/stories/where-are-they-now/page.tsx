import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getStoriesByThread } from "@/sanity/fetch";

export const metadata = {
  title: "Where Are They Now? — PDI",
  description: "Catching up with familiar faces from PDIs past.",
};

const fallbackWatn = [
  {
    title: "2016",
    year: 2016,
    images: [
      { src: "/gallery/watn-2016-01.jpg", alt: "Where are they now — 2016" },
      { src: "/gallery/watn-2016-02.jpg", alt: "Where are they now — 2016" },
      { src: "/gallery/watn-2016-03.jpg", alt: "Where are they now — 2016" },
    ],
  },
  {
    title: "2015",
    year: 2015,
    images: [
      { src: "/gallery/watn-2015-01.jpg", alt: "Where are they now — 2015" },
      { src: "/gallery/watn-2015-02.jpg", alt: "Where are they now — 2015" },
      { src: "/gallery/watn-2015-03.jpg", alt: "Where are they now — 2015" },
      { src: "/gallery/watn-2015-04.jpg", alt: "Where are they now — 2015" },
    ],
  },
];

export default async function WhereAreTheyNowPage() {
  const sanityStories = await getStoriesByThread("where-are-they-now");
  const groups = sanityStories.length > 0 ? sanityStories : fallbackWatn;

  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <section className="pt-32 pb-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-5xl text-pdi-text">
              Where Are They Now?
            </h1>
            <p className="mt-4 text-lg text-pdi-muted">
              Catching up with familiar faces from PDIs past.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl space-y-10">
            {groups.map((group) => (
              <article key={group.year ?? group.title} className="rounded-xl bg-pdi-navy p-8">
                <div className="mb-6">
                  {group.year && (
                    <span className="rounded-full bg-pdi-green/10 px-3 py-1 text-sm font-semibold text-pdi-green">
                      {group.year}
                    </span>
                  )}
                </div>
                {group.images && group.images.length > 0 && (
                  <div className="space-y-4">
                    {group.images.map((img) => (
                      <Image
                        key={img.src}
                        src={img.src}
                        alt={img.alt}
                        width={1200}
                        height={800}
                        className="w-full h-auto rounded-lg"
                        quality={85}
                        sizes="(max-width: 768px) 100vw, 672px"
                      />
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
