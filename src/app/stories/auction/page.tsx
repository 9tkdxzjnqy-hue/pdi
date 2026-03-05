import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Auction — PDI",
  description:
    "The legendary PDI charity auction — where a bag of potatoes can fetch a fortune.",
};

export default function AuctionPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-pdi-dark">
        <section className="pt-32 pb-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-5xl text-pdi-text">
              The Auction
            </h1>
            <p className="mt-4 text-lg text-pdi-muted">
              &lsquo;The Gun&rsquo; sells a bag of potatoes for a fortune. And
              that&rsquo;s just the start.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl bg-pdi-navy p-8">
              <p className="text-pdi-muted">
                This story is still being pieced together. If you were there and
                want to contribute, get in touch with the committee.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
