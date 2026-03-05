"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pdi-dark px-6 text-center">
      <h1 className="font-display text-6xl font-bold text-pdi-text">Oops</h1>
      <p className="mt-4 text-lg text-pdi-muted">
        Something went wrong. The walk-on music cut out mid-entrance.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-pdi-green px-6 py-3 text-sm font-semibold text-pdi-dark transition-colors hover:bg-pdi-teal"
      >
        Try Again
      </button>
    </div>
  );
}
