import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pdi-dark border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              className="font-display text-3xl tracking-wide text-pdi-text"
            >
              PDI
            </Link>
            <p className="mt-2 max-w-sm text-sm text-pdi-muted">
              All proceeds to Children&apos;s Health Foundation Crumlin.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <a
              href="https://childrenshealth.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-pdi-muted transition-colors hover:text-pdi-text"
            >
              childrenshealth.ie
            </a>
            <div className="flex gap-6">
              <span className="text-sm text-pdi-muted">Instagram</span>
              <span className="text-sm text-pdi-muted">Twitter</span>
              <span className="text-sm text-pdi-muted">Facebook</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-pdi-muted">
            &copy; {new Date().getFullYear()} Paddy&apos;s Day Invitational.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
