import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "OGZ System — Üretim ve Stok Takip Yazılımları",
  description: "Üretiminizi, stoklarınızı ve sevkiyatlarınızı tek ekrandan yönetin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans text-ink bg-neutral selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
