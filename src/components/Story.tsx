import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

const defaultBody = [
  "What began as a few mates throwing darts on St Patrick\u2019s Day has grown into one of Dublin\u2019s most beloved charity events. The Paddy\u2019s Day Invitational \u2014 the PDI \u2014 brings together players, performers, and punters for a night that\u2019s equal parts sport, spectacle, and craic.",
  "Over twenty years, the walk-ons have gotten bigger, the fancy dress more outrageous, and the cause more important. Every cent raised goes to Children\u2019s Health Foundation Crumlin.",
  "It\u2019s never been about the darts \u2014 it\u2019s about what the darts make possible.",
];

interface StoryProps {
  title?: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Story({ title, body, imageSrc, imageAlt }: StoryProps) {
  const paragraphs = body ? body.split("\n\n") : defaultBody;
  return (
    <section className="bg-pdi-cream py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 lg:gap-20">
        <AnimateOnScroll>
          <div>
            <h2 className="font-display text-4xl font-semibold text-pdi-dark md:text-5xl">
              {title ?? "Where It All Started"}
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} text-lg leading-relaxed text-pdi-dark/80`}>
                {p}
              </p>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={imageSrc ?? "/gallery/early-event-03.jpg"}
              alt={imageAlt ?? "Early PDI group photo"}
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
