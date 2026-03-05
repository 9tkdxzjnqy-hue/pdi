import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cabinetGrotesk = localFont({
  src: "../../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet-grotesk",
  display: "swap",
  weight: "100 900",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Variable.woff2",
      style: "normal",
      weight: "300 900",
    },
    {
      path: "../../public/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
      weight: "300 900",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thepdi.ie"),
  title: "PDI — Paddy's Day Invitational",
  description:
    "Twenty years of darts, community, and raising funds for Children's Health Foundation Crumlin.",
  openGraph: {
    title: "PDI — Paddy's Day Invitational",
    description:
      "Twenty years of darts, community, and raising funds for Children's Health Foundation Crumlin.",
    url: "https://thepdi.ie",
    siteName: "PDI",
    type: "website",
    images: [{ url: "/images/hero-walkon-blue.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDI — Paddy's Day Invitational",
    description:
      "Twenty years of darts, community, and raising funds for Children's Health Foundation Crumlin.",
    images: ["/images/hero-walkon-blue.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabinetGrotesk.variable} ${satoshi.variable}`}>
      <body className="bg-pdi-cream text-pdi-dark antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-pdi-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-pdi-dark"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
