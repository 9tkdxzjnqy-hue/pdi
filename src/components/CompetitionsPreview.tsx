import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

const competitions = [
  {
    name: "The PDI",
    description: "The main event. Who can hold their nerve?",
    image: "/images/PDITrophy.jpeg",
    alt: "The PDI trophy",
  },
  {
    name: "WPDI",
    description: "The women's invitational. In it to win it.",
    image: "/images/bar-community.jpeg",
    alt: "Three women at the PDI under purple and green ambient light",
  },
  {
    name: "Walk-on of the Year",
    description: "The most theatrical entrance takes the Pat the Bat Memorial Trophy.",
    image: "/images/WalkOnTrophy.jpeg",
    alt: "The Pat the Bat Memorial Trophy for Walk-on of the Year",
  },
  {
    name: "The Shield",
    description: "The Europa League of the PDI.",
    image: "/images/walkon-green-smoke.jpeg",
    alt: "Walk-on at doors with green smoke and lights",
  },
];

export default function CompetitionsPreview() {
  return (
    <section id="competitions" className="bg-pdi-dark py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <h2 className="font-display text-4xl font-semibold text-pdi-text md:text-5xl">
            The Competitions
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-pdi-muted">
            Four ways to compete, one mission — raise as much as possible for
            Crumlin.
          </p>
        </AnimateOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {competitions.map((comp, i) => (
            <AnimateOnScroll key={comp.name} delay={0.1 * (i + 1)}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={comp.image}
                  alt={comp.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pdi-dark via-pdi-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-semibold text-pdi-text">
                    {comp.name}
                  </h3>
                  <p className="mt-1 text-sm text-pdi-muted">
                    {comp.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="mt-10">
            <Link
              href="/competitions"
              className="text-sm font-semibold text-pdi-green transition-colors hover:text-pdi-text"
            >
              Explore Competitions &rarr;
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
