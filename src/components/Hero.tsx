import Image from "next/image";

interface HeroProps {
  variant?: "gradient" | "image";
  imageSrc?: string;
  imageAlt?: string;
}

export default function Hero({ variant = "gradient", imageSrc, imageAlt = "" }: HeroProps) {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-pdi-dark">
      {variant === "image" && imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay: bottom-heavy gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-pdi-dark via-pdi-dark/60 to-transparent" />
          {/* Noise texture */}
          <div className="noise absolute inset-0" />
        </>
      ) : (
        <>
          {/* Abstract atmospheric gradient — evokes stage lighting without a photo */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-pdi-purple/30 via-pdi-dark to-pdi-green/20" />
            <div className="animate-drift absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full bg-pdi-purple/15 blur-[120px]" />
            <div className="animate-drift absolute -right-1/4 -bottom-1/4 h-[70vh] w-[70vh] rounded-full bg-pdi-green/10 blur-[120px] [animation-delay:4s]" />
            <div className="animate-drift absolute top-1/2 left-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pdi-teal/8 blur-[100px] [animation-delay:2s]" />
          </div>

          {/* Subtle noise texture overlay */}
          <div className="noise absolute inset-0" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight text-pdi-text md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>
          Twenty Years of Arrows, Walk-ons and Heart
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pdi-muted md:text-xl">
          Templeogue&apos;s legendary charity darts tournament — all proceeds to
          Children&apos;s Health Foundation Crumlin.
        </p>
        <p className="mt-8 font-display text-4xl font-bold text-pdi-green md:text-5xl">
          &euro;XX,XXX
        </p>
        <p className="mt-2 text-lg text-pdi-muted">
          raised and counting
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-pdi-muted"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
