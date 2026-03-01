import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Letters — PDI",
};

export default function LettersPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <section className="pt-32 pb-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-5xl text-pdi-text">
              The Letters
            </h1>
            <p className="mt-4 text-lg text-pdi-muted">
              Correspondence with high-profile figures in the early days of the
              PDI.
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
