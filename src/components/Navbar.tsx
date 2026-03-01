"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Competitions", href: "/competitions" },
  { label: "Hall of Fame", href: "/hall-of-fame" },
  { label: "Gallery", href: "/gallery" },
  { label: "Stories", href: "/stories" },
  { label: "Remembering", href: "/remembering" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pdi-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-pdi-text"
        >
          PDI
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-pdi-muted transition-colors hover:text-pdi-text"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#charity"
            className="rounded-full bg-pdi-green px-5 py-2 text-sm font-semibold text-pdi-dark transition-opacity hover:opacity-90"
          >
            Donate
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-pdi-text transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-pdi-text transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-pdi-text transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 px-6 pb-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-3 text-pdi-muted transition-colors hover:text-pdi-text"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#charity"
            className="mt-2 inline-block rounded-full bg-pdi-green px-5 py-2 text-sm font-semibold text-pdi-dark"
            onClick={() => setMenuOpen(false)}
          >
            Donate
          </Link>
        </div>
      )}
    </nav>
  );
}
