"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Walk-Ons", href: "/walk-ons" },
  { label: "Gallery", href: "/gallery" },
  { label: "Stories", href: "/stories" },
  { label: "Roll of Honour", href: "/competitions" },
  { label: "Hall of Fame", href: "/hall-of-fame" },
  { label: "Remembering", href: "/remembering" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-pdi-dark/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-wide text-pdi-text"
        >
          PDI
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors hover:text-pdi-text ${isActive ? "text-pdi-text" : "text-pdi-muted"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="#charity"
            className="glow-green rounded-full bg-pdi-green px-5 py-2 text-sm font-semibold text-pdi-dark"
          >
            Donate
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
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
        <div className="border-t border-white/10 bg-pdi-dark/95 px-6 pb-6 backdrop-blur-md md:hidden">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`block py-3 transition-colors hover:text-pdi-text ${isActive ? "text-pdi-text" : "text-pdi-muted"}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
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
