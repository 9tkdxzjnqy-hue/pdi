import Image from "next/image";

const competitions = [
  {
    name: "The PDI",
    description: "The main event. Walk-ons, arrows, and glory.",
    image: "/images/walkon-smoke-red.jpeg",
    alt: "Walk-on through doors with smoke and red/blue lights",
  },
  {
    name: "The Shield",
    description: "Pairs competition — double the craic.",
    image: "/images/walkon-green-smoke.jpeg",
    alt: "Walk-on at doors with green smoke and lights",
  },
  {
    name: "WPDI",
    description: "The women's invitational. Fierce and fabulous.",
    image: "/images/walkon-blue-green.jpeg",
    alt: "Walk-on in blue and green atmospheric lighting",
  },
  {
    name: "Walk-on of the Year",
    description: "The most theatrical entrance takes the crown.",
    image: "/images/walkon-elvis-red.jpeg",
    alt: "Elvis costume walk-on through red lit doors",
  },
];

export default function CompetitionsPreview() {
  return (
    <section id="competitions" className="bg-pdi-dark py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-4xl text-pdi-text md:text-5xl">
          The Competitions
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-pdi-muted">
          Four ways to compete, one mission — raise as much as possible for
          Crumlin.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {competitions.map((comp) => (
            <div
              key={comp.name}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl"
            >
              <Image
                src={comp.image}
                alt={comp.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pdi-dark via-pdi-dark/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl text-pdi-text">
                  {comp.name}
                </h3>
                <p className="mt-1 text-sm text-pdi-muted">
                  {comp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <span className="text-sm font-semibold text-pdi-green">
            Explore Competitions &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
