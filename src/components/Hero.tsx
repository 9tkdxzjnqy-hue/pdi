export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-pdi-dark">
      {/* Abstract atmospheric gradient — evokes stage lighting without a photo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pdi-purple/30 via-pdi-dark to-pdi-green/20" />
        <div className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full bg-pdi-purple/15 blur-[120px]" />
        <div className="absolute -right-1/4 -bottom-1/4 h-[70vh] w-[70vh] rounded-full bg-pdi-green/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pdi-amber/5 blur-[100px]" />
      </div>

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="font-display text-5xl font-normal tracking-tight text-pdi-text md:text-7xl lg:text-[5.5rem] lg:leading-[1.1]">
          Twenty Years of Arrows, Walk-ons and Heart
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-pdi-muted md:text-xl">
          Templeogue&apos;s legendary charity darts tournament — all proceeds to
          Children&apos;s Health Foundation Crumlin.
        </p>
        <p className="mt-8 font-display text-4xl text-pdi-green md:text-5xl">
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
