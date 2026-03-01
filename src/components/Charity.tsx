import Image from "next/image";

export default function Charity() {
  return (
    <section id="charity" className="bg-pdi-cream/90 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 lg:gap-20">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-pdi-purple">
            All Proceeds To
          </p>
          <h2 className="mt-4 font-display text-4xl text-pdi-dark md:text-5xl">
            Children&apos;s Health Foundation Crumlin
          </h2>

          <p className="mt-8 font-display text-6xl text-pdi-green md:text-7xl lg:text-8xl">
            &euro;XX,XXX
          </p>
          <p className="mt-2 text-lg text-pdi-dark/70">
            raised and counting
          </p>

          <a
            href="https://childrenshealth.ie"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full border-2 border-pdi-purple px-6 py-3 text-sm font-semibold text-pdi-purple transition-colors hover:bg-pdi-purple hover:text-white"
          >
            Visit childrenshealth.ie &rarr;
          </a>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-pdi-dark/10">
          <Image
            src="/images/cup-toast.jpeg"
            alt="Group raising cups in celebration at the PDI"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
