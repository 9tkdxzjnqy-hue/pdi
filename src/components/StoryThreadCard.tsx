import Link from "next/link";

interface StoryThreadCardProps {
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

export default function StoryThreadCard({
  title,
  description,
  href,
  comingSoon,
}: StoryThreadCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl bg-pdi-navy p-8 transition hover:bg-white/5"
    >
      <h3 className="font-display text-2xl text-pdi-text">{title}</h3>
      <p className="mt-3 text-pdi-muted">{description}</p>
      {comingSoon && (
        <span className="mt-6 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-pdi-muted">
          Coming soon
        </span>
      )}
    </Link>
  );
}
