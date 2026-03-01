import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
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
    <html lang="en" className={inter.variable}>
      <body className="bg-pdi-cream text-pdi-dark antialiased">
        {children}
      </body>
    </html>
  );
}
