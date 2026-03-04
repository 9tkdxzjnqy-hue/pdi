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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabinetGrotesk.variable} ${satoshi.variable}`}>
      <body className="bg-pdi-cream text-pdi-dark antialiased">
        {children}
      </body>
    </html>
  );
}
