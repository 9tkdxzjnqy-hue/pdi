import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pdi-dark px-6 text-center">
      <h1 className="font-display text-6xl font-bold text-pdi-text">404</h1>
      <p className="mt-4 text-lg text-pdi-muted">
        This page doesn&apos;t exist — like a perfect nine-darter at the PDI.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-pdi-green px-6 py-3 text-sm font-semibold text-pdi-dark transition-colors hover:bg-pdi-teal"
      >
        Back to Home
      </Link>
    </div>
  );
}
