import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Story() {
  return (
    <section className="bg-pdi-cream py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 lg:gap-20">
        <AnimateOnScroll>
          <div>
            <h2 className="font-display text-4xl font-semibold text-pdi-dark md:text-5xl">
              Where It All Started
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-pdi-dark/80">
              What began as a few mates throwing darts on St Patrick&apos;s Day
              has grown into one of Dublin&apos;s most beloved charity events. The
              Paddy&apos;s Day Invitational — the PDI — brings together players,
              performers, and punters for a night that&apos;s equal parts sport,
              spectacle, and craic.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-pdi-dark/80">
              Over twenty years, the walk-ons have gotten bigger, the fancy dress
              more outrageous, and the cause more important. Every cent raised goes
              to Children&apos;s Health Foundation Crumlin.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-pdi-dark/80">
              It&apos;s never been about the darts — it&apos;s about what the
              darts make possible.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/gallery/early-event-03.jpg"
              alt="Early PDI group photo"
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
