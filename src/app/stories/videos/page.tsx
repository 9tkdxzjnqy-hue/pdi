import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Videos — PDI",
  description:
    "Intimidation videos, comedy entries, and productions that have no business being that good.",
};

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-pdi-dark">
        <section className="pt-32 pb-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-5xl text-pdi-text">The Videos</h1>
            <p className="mt-4 text-lg text-pdi-muted">
              Intimidation videos, comedy entries, and productions that have no
              business being that good.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl flex flex-col gap-12">
            <div className="rounded-xl bg-pdi-navy p-8">
              <h2 className="font-display text-2xl text-pdi-text">
                Marty Morrissey Introduces the 2012 PDI
              </h2>
              <p className="mt-3 text-pdi-muted">
                The one and only Marty Morrissey lends his voice to the
                eighth edition of the PDI. If the GAA had walk-ons, this is
                what they&rsquo;d sound like.
              </p>
              <div className="mt-6 aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.youtube.com/embed/0hoDNFfy60g"
                  title="Marty Morrissey Introduces the 2012 PDI"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="rounded-xl bg-pdi-navy p-8">
              <h2 className="font-display text-2xl text-pdi-text">
                Hollywood Hedzer Hogan
              </h2>
              <p className="mt-3 text-pdi-muted">
                Hedzer channels the spirit of Hulk Hogan, calling out his
                opponents in true Hollywood fashion. Whatcha gonna do,
                brother?
              </p>
              <div className="mt-6 aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.youtube.com/embed/RasKhcKHtkw"
                  title="Hollywood Hedzer Hogan"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="rounded-xl bg-pdi-navy p-8">
              <h2 className="font-display text-2xl text-pdi-text">
                Hollywood Hedzer Hogan — 2012
              </h2>
              <p className="mt-3 text-pdi-muted">
                Hedzer Hogan returns for the 2012 PDI. The legend wasn&rsquo;t
                done yet.
              </p>
              <div className="mt-6 aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.youtube.com/embed/I3NpP-4ZdIQ"
                  title="Hollywood Hedzer Hogan — 2012"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="rounded-xl bg-pdi-navy p-8">
              <h2 className="font-display text-2xl text-pdi-text">
                The 2012 PDI Taster
              </h2>
              <p className="mt-3 text-pdi-muted">
                A taste of what was to come at the 2012 PDI.
              </p>
              <div className="mt-6 aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.youtube.com/embed/nPIO9qr_dw8"
                  title="The 2012 PDI Taster"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="rounded-xl bg-pdi-navy p-8">
              <h2 className="font-display text-2xl text-pdi-text">
                The Bat&rsquo;s 2012 PDI Preview
              </h2>
              <p className="mt-3 text-pdi-muted">
                The Bat gives his preview of the 2012 PDI.
              </p>
              <div className="mt-6 aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.youtube.com/embed/endSbAqmbpE"
                  title="The Bat's 2012 PDI Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>

          </div>
        </section>

        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-3xl text-pdi-text">
              Got videos?
            </h2>
            <p className="mt-4 text-lg text-pdi-muted">
              Intimidation videos, walk-on clips, behind-the-scenes footage
              &mdash; we want it all. Drop them in the shared drive.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1-kvii3GsJKUeMsDYhd8q2ZqTzYvJU_M7?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-semibold text-pdi-green transition-colors hover:text-pdi-text"
            >
              Upload videos here &rarr;
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
