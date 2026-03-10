import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

interface CharityProps {
  label?: string;
  heading?: string;
  donationAmount?: string;
  donationLabel?: string;
  linkText?: string;
  linkUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Charity({ label, heading, donationAmount, donationLabel, linkText, linkUrl, imageSrc, imageAlt }: CharityProps) {
  return (
    <section id="charity" className="bg-pdi-cream/90 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 lg:gap-20">
        <AnimateOnScroll>
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-pdi-purple">
              {label ?? "All Proceeds To"}
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-pdi-dark md:text-5xl">
              {heading ?? "Children\u2019s Health Foundation Crumlin"}
            </h2>

            <p className="mt-8 font-display text-6xl font-bold text-pdi-green md:text-7xl lg:text-8xl">
              {donationAmount ?? "\u20ACXX,XXX"}
            </p>
            <p className="mt-2 text-lg text-pdi-dark/70">
              {donationLabel ?? "raised and counting"}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 md:items-start">
              <a
                href={linkUrl ?? "https://childrenshealth.ie"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border-2 border-pdi-purple px-6 py-3 text-sm font-semibold text-pdi-purple transition-colors hover:bg-pdi-purple hover:text-white"
              >
                {linkText ?? "Visit childrenshealth.ie \u2192"}
              </a>
              <a
                href="https://childrenshealth.enthuse.com/cf/pdi---templeogue-s-legendary-charity-darts-tournam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border-2 border-pdi-purple bg-pdi-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-pdi-purple"
              >
                Our fundraiser page &rarr;
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-pdi-dark/10">
            <Image
              src={imageSrc ?? "/images/cheque-2015.jpg"}
              alt={imageAlt ?? "PDI committee presenting cheque to Children's Health Foundation Crumlin, 2015"}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
