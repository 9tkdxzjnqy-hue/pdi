import Image from "next/image";

const galleryImages = [
  {
    src: "/images/walkon-doors-purple.jpeg",
    alt: "Walk-on through doors with blue, green, and purple lighting",
  },
  {
    src: "/images/crowd-energy.jpeg",
    alt: "Crowd cheering with purple lights and dartboard visible",
  },
  {
    src: "/images/pints-mates.jpeg",
    alt: "Two lads with pints, crowd behind under purple light",
  },
  {
    src: "/images/bar-community.jpeg",
    alt: "Friends at the bar under purple and green ambient light",
  },
  {
    src: "/images/kids-batman.jpeg",
    alt: "Kids in costume by the doors — family-friendly community",
  },
  {
    src: "/images/cup-toast.jpeg",
    alt: "Group raising cups in celebration",
  },
];

export default function GalleryPreview() {
  return (
    <section id="gallery" className="bg-pdi-navy py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-4xl text-pdi-text md:text-5xl">
          Gallery
        </h2>
        <p className="mt-4 text-lg text-pdi-muted">
          Scenes from twenty years of the PDI.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <span className="text-sm font-semibold text-pdi-green">
            View Gallery &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
