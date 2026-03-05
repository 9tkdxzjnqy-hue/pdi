import Image from "next/image";

interface MemberTributeProps {
  name: string;
  nickname: string;
  photo?: string;
  tribute: string;
  quote?: string;
  quoteAttribution?: string;
}

export default function MemberTribute({
  name,
  nickname,
  photo,
  tribute,
  quote,
  quoteAttribution,
}: MemberTributeProps) {
  const [firstName] = name.split(" ");
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <article className="border-b border-white/5 last:border-b-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Photo or placeholder */}
        <div className="relative aspect-[4/5] max-h-[70vh] overflow-hidden rounded-xl bg-pdi-navy">
          {photo ? (
            <Image
              src={photo}
              alt={`${name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <span className="font-display text-6xl text-pdi-muted/30">
                {initials}
              </span>
              <span className="mt-3 text-sm text-pdi-muted/40">
                Photo coming soon
              </span>
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl text-pdi-text md:text-4xl">
            {firstName}{" "}
            <span className="text-pdi-green">&ldquo;{nickname}&rdquo;</span>{" "}
            {name.split(" ").slice(1).join(" ")}
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-pdi-text/80">
            {tribute}
          </p>

          {quote && (
            <blockquote className="mt-8 border-l-2 border-pdi-green/30 pl-5">
              <p className="italic text-pdi-muted">&ldquo;{quote}&rdquo;</p>
              {quoteAttribution && (
                <cite className="mt-2 block text-sm text-pdi-muted/60 not-italic">
                  &mdash; {quoteAttribution}
                </cite>
              )}
            </blockquote>
          )}
        </div>
      </div>
    </article>
  );
}
