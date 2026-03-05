import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getStoriesByThread } from "@/sanity/fetch";

export const metadata = {
  title: "Reviews — PDI",
  description: "Looking back on the year that was.",
};

const fallbackReviews = [
  {
    title: "2017",
    year: 2017,
    images: [
      { src: "/gallery/review-2017-01.jpg", alt: "Review of the 2017 PDI" },
    ],
  },
  {
    title: "2016",
    year: 2016,
    images: [
      { src: "/gallery/review-2016-01.jpg", alt: "Review of the 2016 PDI — page 1" },
      { src: "/gallery/review-2016-02.jpg", alt: "Review of the 2016 PDI — page 2" },
      { src: "/gallery/review-2016-03.jpg", alt: "Review of the 2016 PDI — page 3" },
      { src: "/gallery/review-2016-04.jpg", alt: "Review of the 2016 PDI — page 4" },
    ],
  },
  {
    title: "2015",
    year: 2015,
    images: [
      { src: "/gallery/review-2015-01.jpg", alt: "Review of the 2015 PDI" },
    ],
  },
  {
    title: "2014",
    year: 2014,
    images: [
      { src: "/gallery/review-2014-01.jpg", alt: "Review of the 2014 PDI — page 1" },
      { src: "/gallery/review-2014-02.jpg", alt: "Review of the 2014 PDI — page 2" },
      { src: "/gallery/review-2014-03.jpg", alt: "Review of the 2014 PDI — page 3" },
    ],
  },
];

export default async function ReviewsPage() {
  const sanityStories = await getStoriesByThread("reviews");
  const reviews = sanityStories.length > 0 ? sanityStories : fallbackReviews;

  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <section className="pt-32 pb-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-5xl text-pdi-text">Reviews</h1>
            <p className="mt-4 text-lg text-pdi-muted">
              Looking back on the year that was.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl space-y-10">
            {reviews.map((group) => (
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
